import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthForm, MainPage } from "./components";
import SearchPage from "./components/SearchPage"; // searchPage

function App() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} /> 
        <Route path="*" element={<AuthForm />} /> {/* fallback */}
      </Routes>
    </div>
  );
}

export default App;
