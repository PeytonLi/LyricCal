import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthForm, MainPage } from "./components";
import IntroPage from "./components/IntroPage";

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="*" element={<IntroPage />} /> {/* fallback */}
      </Routes>
    </div>
  );
}

export default App;
