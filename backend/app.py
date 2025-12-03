from flask import Flask, request, jsonify
from model import pipeline
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()

    song = data.get("song")
    artist = data.get("artist")
    num_recs = data.get("num_recs", 5)

    if not song or not artist:
        return jsonify({"error": "song and artist are required"}), 400

    results = pipeline(song, artist, num_recs)

    # If model returns an error dict, pass it through
    if isinstance(results, dict) and "error" in results:
        return jsonify(results), 400

    # Convert to frontend format
    formatted = [
        {
            "title": r["track_name"],
            "artist": r["track_artist"],
            "mood": None
        }
        for r in results
    ]

    return jsonify({"recommendations": formatted})


if __name__ == "__main__":
    app.run(debug=True)
