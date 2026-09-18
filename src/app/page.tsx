"use client";

import { useState } from "react";
import { Check, ChevronRight, Code2, Lightbulb, Sparkles, Trophy } from "lucide-react";
import { firstLesson } from "@/lib/lesson";

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [mastered, setMastered] = useState(false);
  const isCorrect = selected === firstLesson.challenge.answer;

  function choose(option: string) { setSelected(option); setMastered(false); }
  function continueLesson() {
    if (step < firstLesson.steps.length - 1) { setStep(step + 1); setSelected(null); }
    else if (isCorrect) setMastered(true);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">F</div><div><b>Forsure</b><span>Code</span></div></div>
        <div className="course-label">PYTHON · ZERO TO ENGINEERING</div>
        <div className="progress-card">
          <div className="progress-top"><span>Your journey</span><b>{mastered ? "100%" : "12%"}</b></div>
          <div className="progress"><i style={{width: mastered ? "100%" : "12%"}} /></div><small>Foundations</small>
        </div>
        <nav><div className="nav-title">FOUNDATIONS</div>
          {["What is programming?","How computers execute code","Python setup","print()","Values","Variables"].map((x,i)=>
            <div key={x} className={"lesson-nav "+(i===0?"active":"")}><span>{i===0?"●":"○"}</span>{x}</div>)}
        </nav>
      </aside>

      <section className="content">
        <header className="topbar"><span>Python / Foundations</span><span className="streak">🔥 0 day streak</span></header>
        <div className="lesson">
          <div className="lesson-kicker"><Sparkles size={16}/> FIRST LESSON</div>
          <h1>{firstLesson.title}</h1><p className="subtitle">{firstLesson.subtitle}</p>

          <div className="robot-card">
            <div className="robot"><span className="robot-face">🤖</span><i className="robot-signal"/></div>
            <div><b>Meet your first student.</b><p>{firstLesson.story}</p></div>
          </div>

          <div className="teacher"><div className="avatar">F</div><div className="bubble">
            <span className="speaker">Forsure</span><p key={step} className="lesson-text">{firstLesson.steps[step]}</p>
          </div></div>

          <div className="visual">
            <div className="visual-label"><Lightbulb size={16}/> THINK ABOUT IT</div>
            <div className="window-scene" aria-label="Animated learning journey">
              <div className="sun"/>
              <div className="cloud cloud-a"><i/><i/><i/></div>
              <div className="cloud cloud-b"><i/><i/><i/></div>
              <div className="cloud cloud-c"><i/><i/><i/></div>
              <div className="plane">✈</div><div className="window-ground"/>
              <div className="journey">
                <div className="journey-node"><span>🎯</span><b>Goal</b></div><div className="journey-line"/>
                <div className="journey-node"><span>🧩</span><b>Steps</b></div><div className="journey-line"/>
                <div className="journey-node"><span>🤖</span><b>Computer</b></div>
              </div><div className="window-shine"/>
            </div>
          </div>

          <div className="challenge">
            <div className="challenge-head"><Code2 size={18}/><span>YOUR TURN</span></div>
            <h2>{firstLesson.challenge.prompt}</h2>
            <div className="options">{firstLesson.challenge.options.map(option =>
              <button key={option} onClick={()=>choose(option)} className={selected===option?(option===firstLesson.challenge.answer?"correct":"wrong"):""}>
                <span>{option}</span>{selected===option&&option===firstLesson.challenge.answer&&<Check size={20}/>}
              </button>)}</div>
            {selected&&<div className={"feedback "+(isCorrect?"good":"try-again")}>
              {isCorrect?"Exactly. You turned the goal into a concrete instruction. 🎉":"Not quite. Think about what the robot must physically do before it can eat."}
            </div>}
          </div>

          <button className="continue" onClick={continueLesson} disabled={!selected||(step===firstLesson.steps.length-1&&!isCorrect)}>
            {mastered?<><Trophy size={19}/> Lesson mastered</>:<>Continue <ChevronRight size={19}/></>}
          </button>
          {mastered&&<div className="mastery"><Trophy size={22}/><div><b>Understanding check passed.</b><p>Forsure will remember that you mastered instructions.</p></div></div>}
        </div>
      </section>
    </main>
  );
}