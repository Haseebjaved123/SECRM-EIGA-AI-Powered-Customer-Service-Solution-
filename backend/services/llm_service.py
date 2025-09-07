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

Please provide a helpful, empathetic response that:
1. Acknowledges the customer's concern
2. Provides specific technical guidance based on the detected components
3. Offers actionable solutions
4. Maintains a professional yet understanding tone
5. Includes relevant troubleshooting steps{language_instruction}

Response should be concise but comprehensive, focusing on practical solutions.
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
        
        # Demo responses based on components and sentiment
        demo_responses = {
            "battery": {
                "positive": "I understand your concern about the battery performance. Based on our analysis, this appears to be a common issue that can often be resolved with some simple troubleshooting steps. Let me guide you through some solutions that have worked well for other customers.",
                "negative": "I'm sorry to hear about the battery issues you're experiencing. This is definitely frustrating, and I want to help you resolve this quickly. Let's work through some diagnostic steps to identify the root cause and get your device working properly again.",
                "neutral": "Thank you for reporting the battery issue. I can help you troubleshoot this systematically. Let's start with some basic diagnostics to determine the best solution for your specific situation."
            },
            "overheating": {
                "positive": "I appreciate you bringing the overheating concern to our attention. This is an important issue that we take seriously. Let me provide you with some immediate steps to address this and prevent any potential damage to your device.",
                "negative": "I'm concerned about the overheating issue you're experiencing. This can be serious and needs immediate attention. Let's get this resolved right away with some urgent troubleshooting steps to ensure your device's safety.",
                "neutral": "Overheating issues require prompt attention. I'll guide you through some diagnostic steps to identify the cause and implement the appropriate solution to prevent further problems."
            },
            "performance": {
                "positive": "Thank you for the detailed feedback about the performance issues. I can help optimize your device's performance with some targeted solutions that should make a noticeable difference.",
                "negative": "I understand your frustration with the performance problems. Let's work together to identify what's causing these issues and get your device running smoothly again.",
                "neutral": "Performance optimization is one of our specialties. Let me walk you through some diagnostic steps and solutions that should improve your device's responsiveness."
            }
        }
        
        # Get primary component
        primary_component = components[0].get('component', 'general') if components else 'general'
        
        # Select appropriate response
        if primary_component in demo_responses:
            base_response = demo_responses[primary_component].get(sentiment, demo_responses[primary_component]['neutral'])
        else:
            base_response = "Thank you for contacting us about this issue. I'm here to help you resolve this problem with your device. Let me provide you with some specific guidance based on the information you've shared."
        
        # Add urgency-specific content
        if urgency == "high":
            base_response += " Given the urgency of this issue, I recommend we address this immediately."
        elif urgency == "critical":
            base_response += " This appears to be a critical issue that requires immediate attention for your safety and device protection."
        
        # Add component-specific suggestions
        suggestions = self._get_component_suggestions(primary_component)
        if suggestions:
            base_response += f" {suggestions}"
        
        return {
            "response": base_response,
            "confidence": 0.85,
            "model_used": "demo-mode",
            "tokens_used": 0,
            "generation_time": 0.1
        }
    
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
