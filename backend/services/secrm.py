from __future__ import annotations

from typing import Dict, List
import re


KEYWORDS = {
    "battery": {
        "triggers": ["battery", "charge", "drain", "power", "dies", "dying", "lasts", "lunch", "whole day", "charging", "plugged"],
        "severity": "critical",
        "category": "power"
    },
    "overheating": {
        "triggers": ["overheat", "hot", "heat", "thermal", "burning", "warm", "temperature", "throttling"],
        "severity": "critical", 
        "category": "thermal"
    },
    "display": {
        "triggers": ["screen", "display", "pixel", "ghost", "cracked", "broken", "flicker", "dim", "brightness"],
        "severity": "high",
        "category": "visual"
    },
    "performance": {
        "triggers": ["lag", "slow", "freeze", "stutter", "hangs", "unresponsive", "delays", "keyboard", "typing"],
        "severity": "high",
        "category": "processing"
    },
    "network": {
        "triggers": ["wifi", "signal", "lte", "5g", "network", "connection", "internet", "data", "cellular"],
        "severity": "medium",
        "category": "connectivity"
    },
    "audio": {
        "triggers": ["speaker", "mic", "microphone", "sound", "volume", "audio", "calls", "ringtone"],
        "severity": "medium",
        "category": "audio"
    },
    "build_quality": {
        "triggers": ["packaging", "box", "torn", "opened", "durability", "cheap", "flimsy", "broken", "damaged"],
        "severity": "medium",
        "category": "physical"
    },
    "software": {
        "triggers": ["update", "software", "app", "crash", "bug", "glitch", "version", "firmware"],
        "severity": "high",
        "category": "software"
    }
}

SENTIMENT_KEYWORDS = {
    "positive": ["good", "great", "excellent", "love", "perfect", "amazing", "works", "fine", "happy"],
    "negative": ["bad", "terrible", "awful", "hate", "disappointed", "frustrated", "angry", "return", "refund"],
    "neutral": ["okay", "average", "decent", "acceptable", "normal", "standard"]
}


def extract_sentiment(text: str) -> Dict[str, float]:
    """Extract sentiment scores from text"""
    lowered = text.lower()
    scores = {"positive": 0, "negative": 0, "neutral": 0}
    
    for sentiment, keywords in SENTIMENT_KEYWORDS.items():
        for keyword in keywords:
            if keyword in lowered:
                scores[sentiment] += 1
    
    total = sum(scores.values())
    if total > 0:
        for key in scores:
            scores[key] = round(scores[key] / total, 2)
    
    return scores


def calculate_urgency(text: str, components: List[Dict]) -> str:
    """Calculate urgency level based on components and text"""
    urgent_words = ["urgent", "emergency", "critical", "immediately", "asap", "broken", "not working"]
    return_words = ["return", "refund", "exchange", "replace", "warranty"]
    
    lowered = text.lower()
    
    if any(word in lowered for word in urgent_words):
        return "urgent"
    elif any(word in lowered for word in return_words):
        return "high"
    elif any(comp.get("severity") == "critical" for comp in components):
        return "high"
    else:
        return "medium"


def run_secrm(text: str) -> List[Dict[str, object]]:
    """Enhanced SECRM with better component recognition"""
    lowered = text.lower()
    components: List[Dict[str, object]] = []
    
    for name, config in KEYWORDS.items():
        triggers = config["triggers"]
        hits = []
        
        # Check for exact matches and partial matches
        for trigger in triggers:
            if trigger in lowered:
                hits.append(trigger)
        
        if hits:
            # Calculate confidence based on number of hits and trigger specificity
            base_confidence = 0.3 + (len(hits) * 0.15)
            
            # Boost confidence for longer, more specific triggers
            for hit in hits:
                if len(hit.split()) > 1:  # Multi-word phrases
                    base_confidence += 0.1
            
            confidence = min(0.95, base_confidence)
            
            components.append({
                "label": name,
                "confidence": round(confidence, 2),
                "evidence": hits[:3],
                "severity": config["severity"],
                "category": config["category"]
            })
    
    # Sort by confidence
    components.sort(key=lambda x: x["confidence"], reverse=True)
    
    # Add sentiment analysis
    sentiment = extract_sentiment(text)
    
    # Add urgency assessment
    urgency = calculate_urgency(text, components)
    
    return {
        "components": components,
        "sentiment": sentiment,
        "urgency": urgency,
        "text_length": len(text),
        "word_count": len(text.split())
    }


