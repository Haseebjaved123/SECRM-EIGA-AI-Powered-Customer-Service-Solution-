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


