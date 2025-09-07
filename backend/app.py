import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

from services.secrm import run_secrm
from services.eiga import run_eiga


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok"})

    @app.post("/api/secrm")
    def secrm_endpoint():
        data = request.get_json(silent=True) or {}
        text = data.get("text", "")
        components = run_secrm(text)
        return jsonify({"components": components})

    @app.post("/api/eiga")
    def eiga_endpoint():
        data = request.get_json(silent=True) or {}
        secrm_data = data.get("secrm_data", {})
        text = data.get("text", "")
        result = run_eiga(secrm_data=secrm_data, original_text=text)
        return jsonify(result)

    @app.post("/api/pipeline")
    def pipeline_endpoint():
        data = request.get_json(silent=True) or {}
        text = data.get("text", "")
        secrm_data = run_secrm(text)
        eiga_result = run_eiga(secrm_data=secrm_data, original_text=text)
        return jsonify({
            "secrm_analysis": secrm_data,
            "eiga_analysis": eiga_result,
            "components": secrm_data.get("components", []),
            **eiga_result
        })

    @app.get("/api/analytics")
    def analytics_endpoint():
        """Get analytics dashboard data"""
        import random
        from datetime import datetime, timedelta
        
        # Generate mock analytics data
        analytics_data = {
            "metrics": {
                "accuracy_rate": round(92.4 + random.uniform(-2, 2), 1),
                "avg_response_time": round(1.2 + random.uniform(-0.3, 0.3), 1),
                "customer_satisfaction": round(87 + random.uniform(-3, 3), 1),
                "cost_savings": round(2.4 + random.uniform(-0.2, 0.2), 1),
                "total_analyses": random.randint(15000, 25000),
                "active_issues": random.randint(45, 85)
            },
            "trends": {
                "sentiment_trend": [random.randint(60, 90) for _ in range(30)],
                "component_distribution": {
                    "battery": random.randint(25, 35),
                    "overheating": random.randint(15, 25),
                    "performance": random.randint(20, 30),
                    "display": random.randint(10, 20),
                    "network": random.randint(8, 15),
                    "audio": random.randint(5, 12),
                    "build_quality": random.randint(3, 8),
                    "software": random.randint(12, 18)
                }
            },
            "recent_activity": [
                {
                    "id": 1,
                    "type": "component_detected",
                    "component": "battery",
                    "confidence": 94,
                    "severity": "critical",
                    "timestamp": (datetime.now() - timedelta(minutes=2)).isoformat()
                },
                {
                    "id": 2,
                    "type": "response_generated",
                    "component": "overheating",
                    "quality_score": 91,
                    "timestamp": (datetime.now() - timedelta(minutes=5)).isoformat()
                },
                {
                    "id": 3,
                    "type": "trend_identified",
                    "description": "Performance issues increasing in Q4",
                    "impact": "high",
                    "timestamp": (datetime.now() - timedelta(minutes=10)).isoformat()
                }
            ],
            "model_performance": {
                "secrm_accuracy": round(94 + random.uniform(-2, 2), 1),
                "eiga_quality": round(91 + random.uniform(-2, 2), 1),
                "sentiment_accuracy": round(89 + random.uniform(-2, 2), 1),
                "urgency_detection": round(96 + random.uniform(-1, 1), 1)
            }
        }
        
        return jsonify(analytics_data)

    # Static front-end if served by Flask (optional)
    @app.get("/")
    def root():
        return send_from_directory("../frontend", "index.html")

    @app.get("/<path:path>")
    def static_proxy(path: str):
        return send_from_directory("../frontend", path)

    return app


if __name__ == "__main__":
    app = create_app()
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True)


