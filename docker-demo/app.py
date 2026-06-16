"""Minimal Flask app for learning Docker basics."""

from flask import Flask, jsonify

app = Flask(__name__)

MESSAGES = [
    "Hello from inside a Docker container!",
    "Images are templates; containers are running instances.",
    "docker build creates an image; docker run starts a container.",
]


@app.get("/")
def home():
    return jsonify(
        {
            "message": MESSAGES[0],
            "tips": MESSAGES[1:],
            "endpoints": {
                "health": "/health",
                "info": "/info",
            },
        }
    )


@app.get("/health")
def health():
    return jsonify({"status": "ok"})


@app.get("/info")
def info():
    return jsonify(
        {
            "app": "docker-demo",
            "purpose": "Learn Docker image build, run, and compose",
            "python": "3.12-slim",
        }
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
