# backend/app.py
import os
from functools import wraps
from flask import Flask, jsonify, request, g
from flask_cors import CORS

# Firebase Admin
import firebase_admin
from firebase_admin import credentials, auth, firestore
from dotenv import load_dotenv

# Load .env if present
load_dotenv()
print("DEBUG: BACKEND_FIREBASE_KEY_PATH =", os.getenv("BACKEND_FIREBASE_KEY_PATH"))

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # allow Vite dev origin

# Initialize Firebase Admin
if os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
    cred = credentials.Certificate(os.getenv("GOOGLE_APPLICATION_CREDENTIALS"))
else:
    key_path = os.getenv("BACKEND_FIREBASE_KEY_PATH")
    if key_path and os.path.exists(key_path):
        cred = credentials.Certificate(key_path)
    else:
        raise Exception(
            "Firebase service account key path not found. "
            "Set GOOGLE_APPLICATION_CREDENTIALS or BACKEND_FIREBASE_KEY_PATH"
        )

firebase_admin.initialize_app(cred)
db = firestore.client()


# Decorator to verify Firebase ID token
def verify_firebase_token(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        auth_header = request.headers.get("Authorization", None)
        if not auth_header:
            return jsonify({"error": "Missing authorization header"}), 401

        parts = auth_header.split()
        if parts[0].lower() != "bearer" or len(parts) != 2:
            return jsonify({"error": "Invalid Authorization header"}), 401

        id_token = parts[1]
        try:
            decoded_token = auth.verify_id_token(id_token)
            g.user = decoded_token  # attach user info safely
        except Exception as e:
            return jsonify({"error": "Invalid token", "details": str(e)}), 401

        return f(*args, **kwargs)

    return decorator


@app.route("/")
def home():
    return jsonify({"message": "LyricCal backend running"})


# Public: get all lyrics
@app.route("/api/lyrics", methods=["GET"])
def get_lyrics():
    docs = (
        db.collection("lyrics")
        .order_by("created_at", direction=firestore.Query.DESCENDING)
        .stream()
    )
    items = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        items.append(data)
    return jsonify({"lyrics": items})


# Protected: create a lyric
@app.route("/api/lyrics", methods=["POST"])
@verify_firebase_token
def create_lyric():
    payload = request.get_json()
    title = payload.get("title")
    text = payload.get("text")
    user = g.user

    doc_ref = db.collection("lyrics").document()
    doc_ref.set(
        {
            "title": title,
            "text": text,
            "author_uid": user.get("uid"),
            "author_email": user.get("email"),
            "created_at": firestore.SERVER_TIMESTAMP,
        }
    )
    return jsonify({"success": True, "id": doc_ref.id}), 201


# Protected: return current user info
@app.route("/api/me", methods=["GET"])
@verify_firebase_token
def me():
    return jsonify({"user": g.user})


# Protected: search songs (mock example)
@app.route("/api/search", methods=["POST"])
@verify_firebase_token
def search_song():
    payload = request.get_json()
    query = payload.get("query", "")

    # Placeholder search results – replace with real API integration later
    mock_results = [
        {"title": f"{query} - Song 1", "lyrics": "La la la..."},
        {"title": f"{query} - Song 2", "lyrics": "Na na na..."},
    ]

    return jsonify({"success": True, "results": mock_results})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
