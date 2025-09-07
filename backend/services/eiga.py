from __future__ import annotations

from typing import Dict, List
import random


RESPONSE_TEMPLATES = {
    "battery": {
        "critical": "I understand your frustration with the battery life. This is a critical issue that needs immediate attention. Let me help you resolve this quickly.",
        "high": "Battery performance issues can be very concerning. I'll make sure we get this sorted out for you right away.",
        "medium": "I see you're experiencing some battery concerns. Let me provide some solutions to help improve your device's performance."
    },
    "overheating": {
        "critical": "Device overheating is a serious safety concern. I'm escalating this to our technical team immediately for urgent resolution.",
        "high": "Overheating issues can affect device performance and safety. Let me connect you with our technical specialists.",
        "medium": "I understand your concern about the device temperature. Let me provide some immediate solutions."
    },
    "performance": {
        "critical": "Performance issues can be incredibly frustrating, especially when you need your device for work. I'll prioritize this case.",
        "high": "I hear your frustration with the performance problems. Let me get our technical team involved to resolve this quickly.",
        "medium": "Performance issues can be annoying. Let me help you troubleshoot and improve your device's speed."
    },
    "display": {
        "critical": "Display issues can severely impact your user experience. I'm flagging this as a high-priority case for immediate resolution.",
        "high": "I understand how important a working display is. Let me get this resolved for you as quickly as possible.",
        "medium": "Display problems can be frustrating. Let me provide some solutions to get your screen working properly."
    },
    "build_quality": {
        "critical": "I sincerely apologize for the packaging and quality issues. This is not the experience we want you to have. Let me make this right immediately.",
        "high": "I'm sorry to hear about the quality concerns. Let me address this promptly and ensure you receive a replacement.",
        "medium": "I understand your concerns about the product quality. Let me help resolve this for you."
    }
}

BUSINESS_IMPACT = {
    "critical": {
        "churn_risk": "Very High (80-90%)",
        "action": "Immediate escalation to senior support",
        "priority": "P0 - Emergency",
        "response_time": "< 2 hours"
    },
    "high": {
        "churn_risk": "High (60-70%)",
        "action": "Priority support queue",
        "priority": "P1 - High",
        "response_time": "< 4 hours"
    },
    "medium": {
        "churn_risk": "Medium (30-40%)",
        "action": "Standard support process",
        "priority": "P2 - Medium",
        "response_time": "< 24 hours"
    },
    "low": {
        "churn_risk": "Low (10-20%)",
        "action": "Self-service resources",
        "priority": "P3 - Low",
        "response_time": "< 48 hours"
    }
}

TECHNICAL_RECOMMENDATIONS = {
    "battery": [
        "Run battery diagnostics to identify power consumption patterns",
        "Check for background apps draining battery",
        "Verify charging cable and adapter compatibility",
        "Consider battery replacement if diagnostics show degradation",
        "Provide power management optimization tips"
    ],
    "overheating": [
        "Check for thermal throttling in system logs",
        "Verify proper ventilation and cooling",
        "Scan for malware or resource-intensive processes",
        "Update thermal management firmware",
        "Consider thermal paste replacement for severe cases"
    ],
    "performance": [
        "Run system performance diagnostics",
        "Check for memory leaks or resource conflicts",
        "Update device drivers and firmware",
        "Optimize system settings for better performance",
        "Consider hardware upgrade if software optimization insufficient"
    ],
    "display": [
        "Run display diagnostics and pixel tests",
        "Check for loose connections or cable issues",
        "Update graphics drivers",
        "Test with external display to isolate issue",
        "Arrange screen replacement if hardware fault confirmed"
    ],
    "build_quality": [
        "Document packaging damage with photos",
        "Verify product authenticity and source",
        "Arrange immediate replacement with expedited shipping",
        "Provide quality assurance feedback to fulfillment team",
        "Offer compensation for inconvenience"
    ]
}


def generate_customer_response(components: List[Dict], sentiment: Dict, urgency: str) -> str:
    """Generate empathetic customer response based on analysis"""
    if not components:
        return "Thank you for your feedback. I'm here to help with any questions or concerns you may have about your product."
    
    # Find the highest severity component
    highest_severity = "low"
    primary_component = None
    
    for comp in components:
        severity = comp.get("severity", "low")
        if severity == "critical":
            highest_severity = "critical"
            primary_component = comp["label"]
            break
        elif severity == "high" and highest_severity != "critical":
            highest_severity = "high"
            primary_component = comp["label"]
        elif severity == "medium" and highest_severity not in ["critical", "high"]:
            highest_severity = "medium"
            primary_component = comp["label"]
    
    # Generate response based on primary component and severity
    if primary_component and primary_component in RESPONSE_TEMPLATES:
        base_response = RESPONSE_TEMPLATES[primary_component].get(highest_severity, 
                                                                 RESPONSE_TEMPLATES[primary_component].get("medium", ""))
    else:
        base_response = "I understand your concerns and I'm here to help resolve any issues you're experiencing."
    
    # Add urgency acknowledgment
    if urgency == "urgent":
        base_response += " I'm treating this as an urgent matter and will ensure you receive immediate assistance."
    elif urgency == "high":
        base_response += " I'm prioritizing your case to ensure a quick resolution."
    
    # Add sentiment acknowledgment
    if sentiment.get("negative", 0) > 0.5:
        base_response += " I sincerely apologize for any frustration this has caused."
    
    return base_response


def generate_business_recommendations(components: List[Dict], urgency: str) -> List[Dict[str, str]]:
    """Generate business-focused recommendations"""
    recommendations = []
    
    # Determine overall risk level
    risk_level = "low"
    if urgency == "urgent":
        risk_level = "critical"
    elif urgency == "high":
        risk_level = "high"
    elif any(comp.get("severity") == "critical" for comp in components):
        risk_level = "high"
    elif any(comp.get("severity") == "high" for comp in components):
        risk_level = "medium"
    
    # Business impact assessment
    impact = BUSINESS_IMPACT.get(risk_level, BUSINESS_IMPACT["low"])
    
    recommendations.append({
        "type": "Business Impact",
        "title": f"Customer Risk Assessment: {impact['churn_risk']}",
        "description": f"Priority: {impact['priority']} | Response Time: {impact['response_time']}",
        "action": impact['action']
    })
    
    # Technical recommendations for each component
    for comp in components:
        component_name = comp["label"]
        if component_name in TECHNICAL_RECOMMENDATIONS:
            tech_recs = TECHNICAL_RECOMMENDATIONS[component_name]
            recommendations.append({
                "type": "Technical Action",
                "title": f"Address {component_name.replace('_', ' ').title()} Issues",
                "description": f"Severity: {comp.get('severity', 'unknown').title()} | Confidence: {comp.get('confidence', 0)*100:.0f}%",
                "action": tech_recs[0]  # Primary recommendation
            })
    
    # Customer retention actions
    if risk_level in ["critical", "high"]:
        recommendations.append({
            "type": "Retention",
            "title": "Customer Retention Strategy",
            "description": "High churn risk detected - immediate retention actions required",
            "action": "Offer expedited replacement, compensation, or upgrade path"
        })
    
    return recommendations


def run_eiga(secrm_data: Dict, original_text: str) -> Dict[str, object]:
    """Enhanced EIGA with intelligent response generation"""
    components = secrm_data.get("components", [])
    sentiment = secrm_data.get("sentiment", {})
    urgency = secrm_data.get("urgency", "medium")
    
    # Generate customer response
    customer_response = generate_customer_response(components, sentiment, urgency)
    
    # Generate business recommendations
    business_recommendations = generate_business_recommendations(components, urgency)
    
    # Create detailed analysis
    analysis_parts = []
    if components:
        for comp in components:
            severity = comp.get("severity", "unknown")
            confidence = comp.get("confidence", 0)
            analysis_parts.append(f"{comp['label']} issue ({severity}, {confidence*100:.0f}% confidence)")
    
    if analysis_parts:
        final_analysis = f"Detected issues: {', '.join(analysis_parts)}. "
    else:
        final_analysis = "No critical issues detected. "
    
    # Add sentiment summary
    dominant_sentiment = max(sentiment.items(), key=lambda x: x[1]) if sentiment else ("neutral", 0)
    final_analysis += f"Customer sentiment: {dominant_sentiment[0]} ({dominant_sentiment[1]*100:.0f}%). "
    
    # Add urgency assessment
    final_analysis += f"Urgency level: {urgency.title()}."
    
    return {
        "customer_response": customer_response,
        "business_recommendations": business_recommendations,
        "final_analysis": final_analysis,
        "sentiment_breakdown": sentiment,
        "urgency_level": urgency,
        "component_count": len(components),
        "risk_assessment": BUSINESS_IMPACT.get(urgency, BUSINESS_IMPACT["medium"])
    }


