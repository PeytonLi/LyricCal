import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model
from tensorflow.keras import Model, layers
from sklearn.metrics.pairwise import cosine_similarity
from transformers import pipeline as hf_pipeline

# --------------------
# Load data
# --------------------
df = pd.read_csv("preprocessed_songs_df.csv")
songs_df = pd.read_csv("songs_df.csv")

Features = df.shape[1]
Latent_dim = 50


# --------------------
# Build autoencoder structure (only needed for loading)
# --------------------
def build_feature_encoder():
    input_data = layers.Input(shape=(Features,))
    x = layers.Dense(100, activation="relu")(input_data)
    latent = layers.Dense(Latent_dim, activation="relu")(x)
    x = layers.Dense(100, activation="relu")(latent)
    output = layers.Dense(Features, activation="relu")(x)
    return Model(input_data, output), Model(input_data, latent)


# --------------------
# Load trained model (NO TRAINING IN PRODUCTION)
# --------------------
try:
    autoencoder = load_model("autoencoder_model.keras", compile=False)
    encoder_model = load_model("encoder_model.keras", compile=False)
    print("Loaded trained autoencoder.")
except:
    # Fallback to architecture if weights aren't found
    autoencoder, encoder_model = build_feature_encoder()
    print("WARNING: Using untrained model structure!")


# --------------------
# Precompute latent space for entire dataset (HUGE SPEEDUP)
# --------------------
latent_df = pd.DataFrame(encoder_model.predict(df))
latent_df.index = df.index  # Keep same indexing


# --------------------
# Cosine similarity in latent space only
# --------------------
def get_similar(latent_vec, k):
    similarities = cosine_similarity(latent_vec.reshape(1, -1), latent_df)[0]
    
    # Exclude the song itself
    sim_df = pd.DataFrame({
        "index": latent_df.index,
        "score": similarities
    }).sort_values("score", ascending=False)

    return sim_df.iloc[1:k+1]["index"].tolist()


# --------------------
# HuggingFace classifier (lazy loading)
# --------------------
classifier = None

def get_classifier():
    global classifier
    if classifier is None:
        classifier = hf_pipeline(
            task="text-classification",
            model="j-hartmann/emotion-english-distilroberta-base",
            top_k=None,
            truncation=True
        )
    return classifier


# --------------------
# Helper – find song row
# --------------------
def find_row(song, artist):
    return songs_df[
        (songs_df["track_name"] == song) &
        (songs_df["track_artist"] == artist)
    ]


# --------------------
# MAIN PIPELINE
# --------------------
def pipeline(song, artist, num_recs=5):
    if num_recs > 1000:
        return {"error": "Over rec limit"}

    row_info = find_row(song, artist)
    if len(row_info) != 1:
        return {"error": "Song/Artist not found"}

    idx = row_info.index[0]

    # Get latent space vector
    latent_vec = latent_df.loc[idx].values

    # Get similar songs
    rec_indexes = get_similar(latent_vec, num_recs)

    recs = songs_df.loc[rec_indexes][["track_name", "track_artist"]]
    return recs.to_dict("records")
