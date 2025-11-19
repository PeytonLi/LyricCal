import React from "react";
import { useNavigate } from "react-router-dom";
import { Music } from "lucide-react";

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-950 via-purple-900 to-purple-800 text-white flex flex-col">
      {/* Header */}
      <header className="w-full px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center shadow-lg">
            <Music className="h-6 w-6 text-purple-100" />
          </div>
          <span className="relative inline-block font-extrabold tracking-tight text-2xl md:text-3xl">
            {/* 텍스트 */}
            <span className="text-white">Lyri</span>
            <span className="bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
              Cal
            </span>
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16 grid gap-12 md:grid-cols-[1.5fr,1fr] items-center">
          {/* Left: hero copy */}
          <section className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm text-purple-100 border border-white/15">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Mood-based music recommender
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight space-y-2">


                <span className="block">
                  Looking for a song that
                </span>


                <span className="block bg-gradient-to-r from-fuchsia-400 to-purple-200 bg-clip-text text-transparent">
                  fits your mood?
                </span>


                <span className="block">
                  LyriCal finds the track that feels right.
                </span>
              </h1>
            </div>

            {/* Example queries */}
            <div className="space-y-2 rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-sm md:text-base">
              <p className="text-white/80">
                “I want music to hype me up.”
              </p>
              <p className="text-white/80">
                “I want music that relaxes me after a long day.”
              </p>
              <p className="text-white/80">
                “I want to listen to crash-out music while I study.”
              </p>
            </div>
            {/* Arrow pointing down */}
            <div className="w-full flex justify-center py-6">
              <div className="text-4xl font-bold text-purple-300 animate-bounce">
                ↓
              </div>
            </div>

          </section>

          {/* Right: glassmorphism info card */}
          <aside className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-fuchsia-500/40 via-purple-400/40 to-indigo-500/40 rounded-3xl blur-2xl opacity-60" />
            <div className="relative rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/15 px-7 py-8 space-y-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-purple-50">
                We got you covered.
              </h2>
              <p className="text-sm md:text-base text-white/80 leading-relaxed">
                Whether you&apos;re working, unwinding, or getting ready to go
                out, LyriCal understands the emotions in lyrics and pairs them
                with acoustic features to recommend the perfect track.
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p className="text-xs text-white/60">Based on</p>
                  <p className="font-semibold">Mood + Lyrics</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p className="text-xs text-white/60">Tailored for</p>
                  <p className="font-semibold">Your vibe</p>
                </div>
              </div>

              <p className="text-xs md:text-sm text-white/60">
                No playlists to manage, no genres to guess. Just describe how
                you feel and let LyriCal handle the rest.
              </p>
            </div>
          </aside>
          {/* Team Message Section */}
          <section className="w-full max-w-5xl mx-auto px-6 md:px-10 mt-10">
            <div className="
    space-y-4 
    rounded-3xl 
    bg-white/5 
    backdrop-blur-xl
    border border-white/15
    shadow-[0_8px_32px_rgba(0,0,0,0.25)]
    px-8 py-10
  ">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Words from our team
              </h2>

              <p className="text-base md:text-lg leading-relaxed text-white/80">
                People often rely on music as an escape from their reality. But the problem
                arises when they get sick of listening to the same songs on repeat, but don’t
                know what else to do. That’s where we have a solution.
                <br /><br />
                LyriCal hopes to deliver a machine learning web app that classifies songs based
                on the emotions expressed in their lyrics — such as happiness, anger, calmness,
                or intensity — and pairs those results with acoustic features.
                <br /><br />
                With LyriCal, users will finally be able to discover new music that perfectly
                matches their vibe and emotional state.
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-white/20 my-4"></div>
            </div>
          </section>

          {/* CTA — We got you covered */}
          <div className="flex flex-col items-center mt-8">
            <button
              onClick={() => navigate("/app")}
              className="px-10 py-4 text-lg font-semibold rounded-full
      bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-400
      text-white shadow-xl shadow-purple-900/40
      hover:from-purple-400 hover:via-fuchsia-400 hover:to-purple-300
      active:scale-[0.98]
      transition-all duration-200"
            >
              Try LyriCal
            </button>

            <span className="mt-3 text-sm md:text-base text-white/60 text-center">
              One click to find songs that match your mood.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IntroPage;
