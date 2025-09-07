"""
LLM Service for SECRM-EIGA
Provides intelligent response generation using OpenAI GPT models
"""

import openai
import json
import random
from typing import Dict, List, Optional
from config import OPENAI_API_KEY, OPENAI_MODEL, OPENAI_TEMPERATURE, DEMO_MODE

class LLMService:
    def __init__(self):
        if not DEMO_MODE:
            openai.api_key = OPENAI_API_KEY
        self.model = OPENAI_MODEL
        self.temperature = OPENAI_TEMPERATURE
    
    def generate_response(self, 
                         user_query: str, 
                         components: List[Dict], 
                         sentiment: str, 
                         urgency: str,
                         language: str = "en") -> Dict:
        """
        Generate intelligent response using LLM
        """
        if DEMO_MODE:
            return self._generate_demo_response(user_query, components, sentiment, urgency, language)
        
        try:
            # Prepare context for LLM
            context = self._prepare_context(components, sentiment, urgency, language)
            
            # Create prompt for LLM
            prompt = self._create_prompt(user_query, context, language)
            
            # Call OpenAI API
            response = openai.ChatCompletion.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": self._get_system_prompt(language)},
                    {"role": "user", "content": prompt}
                ],
                temperature=self.temperature,
                max_tokens=500
            )
            
            llm_response = response.choices[0].message.content.strip()
            
            return {
                "response": llm_response,
                "confidence": 0.95,
                "model_used": self.model,
                "tokens_used": response.usage.total_tokens,
                "generation_time": 0.0  # Would be calculated in real implementation
            }
            
        except Exception as e:
            print(f"LLM Error: {e}")
            return self._generate_demo_response(user_query, components, sentiment, urgency, language)
    
    def _prepare_context(self, components: List[Dict], sentiment: str, urgency: str, language: str) -> str:
        """Prepare context information for LLM"""
        context_parts = []
        
        # Component information
        if components:
            component_names = [comp.get('component', 'unknown') for comp in components]
            context_parts.append(f"Detected components: {', '.join(component_names)}")
            
            # Add severity information
            severities = [comp.get('severity', 'unknown') for comp in components]
            context_parts.append(f"Severity levels: {', '.join(severities)}")
        
        # Sentiment and urgency
        context_parts.append(f"Customer sentiment: {sentiment}")
        context_parts.append(f"Urgency level: {urgency}")
        
        return " | ".join(context_parts)
    
    def _create_prompt(self, user_query: str, context: str, language: str) -> str:
        """Create prompt for LLM"""
        language_instruction = ""
        if language != "en":
            language_instruction = f" Please respond in {self._get_language_name(language)}."
        
        return f"""
Customer Query: "{user_query}"

Technical Context: {context}

Please provide a comprehensive, step-by-step customer service response that follows this structure:

1. **Opening**: Start with "Thank you for contacting us about this issue. I'm here to help you resolve this problem with your device. Let me provide you with some specific guidance based on the information you've shared."

2. **Urgency Assessment**: If urgent, add "Given the urgency of this issue, I recommend we address this immediately."

3. **Systematic Approach**: Include "Let's work through some systematic troubleshooting steps to identify and resolve this issue."

4. **Step-by-Step Instructions**: Provide 2-3 specific, actionable steps with:
   - Clear instructions (e.g., "First, please perform a soft reset by holding down the power button for 10-15 seconds")
   - Explanation of what each step does
   - What to expect after each step

5. **Professional Tone**: Maintain empathy while being technically accurate
6. **Next Steps**: Guide them on what to do if the issue persists{language_instruction}

Make the response detailed, helpful, and easy to follow for non-technical users.
"""
    
    def _get_system_prompt(self, language: str) -> str:
        """Get system prompt for LLM"""
        base_prompt = """You are an expert electronics customer service representative with deep technical knowledge. 
You specialize in diagnosing and resolving issues with consumer electronics, smartphones, laptops, gaming hardware, and smart home devices.

Your responses should be:
- Technically accurate and specific
- Empathetic and understanding
- Actionable with clear next steps
- Professional yet approachable
- Focused on customer satisfaction

Always prioritize customer safety and provide appropriate warnings for potentially dangerous situations."""
        
        if language != "en":
            base_prompt += f"\n\nRespond in {self._get_language_name(language)}."
        
        return base_prompt
    
    def _get_language_name(self, lang_code: str) -> str:
        """Convert language code to full name"""
        language_names = {
            "es": "Spanish",
            "fr": "French", 
            "de": "German",
            "zh": "Chinese",
            "ja": "Japanese"
        }
        return language_names.get(lang_code, "English")
    
    def _generate_demo_response(self, user_query: str, components: List[Dict], sentiment: str, urgency: str, language: str) -> Dict:
        """Generate demo response when OpenAI API is not available"""
        
        # Get primary component
        primary_component = components[0].get('component', 'general') if components else 'general'
        
        # Start with standard opening
        response = "Thank you for contacting us about this issue. I'm here to help you resolve this problem with your device. Let me provide you with some specific guidance based on the information you've shared."
        
        # Add urgency-specific content
        if urgency == "high":
            response += " Given the urgency of this issue, I recommend we address this immediately."
        elif urgency == "critical":
            response += " This appears to be a critical issue that requires immediate attention for your safety and device protection."
        
        # Add systematic approach
        response += " Let's work through some systematic troubleshooting steps to identify and resolve this issue."
        
        # Add component-specific detailed steps
        detailed_steps = self._get_detailed_troubleshooting_steps(primary_component)
        response += f" {detailed_steps}"
        
        return {
            "response": response,
            "confidence": 0.85,
            "model_used": "demo-mode",
            "tokens_used": 0,
            "generation_time": 0.1
        }
    
    def _get_detailed_troubleshooting_steps(self, component: str) -> str:
        """Get detailed step-by-step troubleshooting instructions"""
        steps = {
            "battery": """First, please perform a soft reset by holding down the power button for 10-15 seconds until the device restarts. This clears temporary system glitches without affecting your data. Next, check your battery usage in the settings menu to identify any apps consuming excessive power. Finally, ensure you're using the original charger and cable, as third-party accessories can cause charging issues. If the problem persists after these steps, we may need to run a battery diagnostic test.""",
            
            "overheating": """First, immediately turn off your device and let it cool down for at least 15 minutes in a well-ventilated area. Once cooled, restart the device and check for any pending software updates in the settings menu, as outdated firmware can cause thermal issues. Next, close all unnecessary applications and avoid using the device while charging. If overheating continues, please contact our technical support team immediately as this could indicate a hardware issue that needs professional attention.""",
            
            "performance": """First, please perform a soft reset by holding down the power button for 10-15 seconds until the device restarts. This clears temporary system glitches and frees up memory. Next, go to your device settings and clear the cache for recently used applications. Finally, check for any pending software updates in the settings menu, as outdated firmware can often cause performance problems. If the device is still running slowly after these steps, we can run deeper diagnostics to identify the specific cause.""",
            
            "display": """First, please perform a soft reset by holding down the power button for 10-15 seconds until the device restarts. This can resolve temporary display glitches. Next, check your display settings and adjust the brightness and resolution to see if that improves the issue. Finally, test the display by opening different applications to see if the problem is consistent across all screens. If you notice dead pixels or persistent display issues, we may need to arrange for a professional service appointment.""",
            
            "network": """First, please restart your device and your router by unplugging the router for 30 seconds, then plugging it back in. Next, check your network settings and ensure you're connected to the correct Wi-Fi network. Try forgetting the network and reconnecting with the correct password. Finally, check for any pending software updates in the settings menu, as outdated network drivers can cause connectivity issues. If the problem persists, we may need to update your device's network drivers.""",
            
            "audio": """First, please perform a soft reset by holding down the power button for 10-15 seconds until the device restarts. This can resolve temporary audio glitches. Next, check your audio settings and ensure the volume is turned up and not muted. Try using different audio outputs (speakers, headphones) to isolate the issue. Finally, check for any pending software updates in the settings menu, as outdated audio drivers can cause sound problems. If the issue continues, we may need to run audio diagnostics to identify the specific cause."""
        }
        return steps.get(component, """First, please perform a soft reset by holding down the power button for 10-15 seconds until the device restarts. This clears temporary system glitches without affecting your data. Next, check for any pending software updates in the settings menu, as outdated firmware can often cause various issues. Finally, if the problem persists, please contact our technical support team for further assistance.""")
    
    def _get_component_suggestions(self, component: str) -> str:
        """Get component-specific suggestions"""
        suggestions = {
            "battery": "I recommend checking your charging habits, running a battery diagnostic, and ensuring your device's software is up to date. These steps often resolve battery-related issues.",
            "overheating": "Please ensure your device has proper ventilation, close unnecessary applications, and avoid using it while charging. If the issue persists, we may need to check for hardware problems.",
            "performance": "Try restarting your device, clearing cache, and checking for software updates. If performance issues continue, we can run deeper diagnostics to identify the specific cause.",
            "display": "Let's check your display settings, test for dead pixels, and verify the connection. Display issues can often be resolved with simple adjustments or may require professional service.",
            "network": "Network connectivity issues can usually be resolved by checking your connection settings, restarting your router, or updating your device's network drivers.",
            "audio": "Audio problems often stem from software settings, driver issues, or hardware connections. Let's systematically test each component to identify the root cause."
        }
        return suggestions.get(component, "Let's work through some systematic troubleshooting steps to identify and resolve this issue.")
    
    def generate_suggestions(self, components: List[Dict], sentiment: str) -> List[str]:
        """Generate intelligent suggestions based on analysis"""
        suggestions = []
        
        for component in components:
            comp_name = component.get('component', '')
            severity = component.get('severity', 'medium')
            
            if comp_name == 'battery':
                if severity == 'high':
                    suggestions.append("🔋 Schedule immediate battery replacement - high degradation detected")
                else:
                    suggestions.append("🔋 Optimize charging habits and run battery calibration")
            
            elif comp_name == 'overheating':
                if severity == 'critical':
                    suggestions.append("🌡️ URGENT: Stop using device immediately - thermal protection needed")
                else:
                    suggestions.append("🌡️ Improve ventilation and reduce processor load")
            
            elif comp_name == 'performance':
                suggestions.append("⚡ Clear cache, update software, and optimize system settings")
            
            elif comp_name == 'display':
                suggestions.append("📱 Test display components and check for hardware issues")
            
            elif comp_name == 'network':
                suggestions.append("📶 Troubleshoot connectivity and update network drivers")
            
            elif comp_name == 'audio':
                suggestions.append("🔊 Test audio components and update sound drivers")
        
        # Add sentiment-based suggestions
        if sentiment == 'negative':
            suggestions.append("💬 Prioritize this customer for immediate follow-up")
        elif sentiment == 'positive':
            suggestions.append("⭐ Excellent opportunity for positive review and referral")
        
        return suggestions[:5]  # Limit to 5 suggestions
