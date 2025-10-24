People often rely on music as an escape from their reality. But the problem arises when they get sick of listening to the same songs on repeat, but don’t know what else to do. The Spotify recommendations are not adjusted to their current mood, so they have no where else to turn. That’s where we have a solution. LyricCal hopes to deliver a machine learning web app that classifies songs based on their mood that the lyrics convey (such as happy, angry, edgy, etc.) and then implement the mood results alongside acoustic features to recommend songs based on the mood of the user and the most recent tracks they have listened to. Users can finally find those new songs they’ve been aching for with this project, and we hope to make it a reality.

📦 LyricCal — Full Stack Setup

Stack: React (Vite + Tailwind) + Flask + Firebase

1️⃣ Clone the Repo
git clone https://github.com/<your-username>/LyricCal.git
cd LyricCal

2️⃣ Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate   # or source venv/bin/activate
pip install -r requirements.txt
python app.py

3️⃣ Frontend Setup

In a new terminal:

cd frontend
npm install
npm run dev


Frontend → http://localhost:5173

Backend → http://127.0.0.1:5000

4️⃣ Environment Variables (if using Firebase)

Create frontend/.env.local:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id

5️⃣ Run Both

Flask serves your backend API.

React (Vite) serves your frontend and connects to Flask through fetch() calls.