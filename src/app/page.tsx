"use client";

import { useEffect, useState } from "react";
import { Check, ChevronRight, Code2, Lightbulb, Sparkles, Trophy } from "lucide-react";
import { firstLesson } from "@/lib/lesson";

type Stage = "goal" | "steps" | "computer" | "mastered";

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [mastered, setMastered] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [stage, setStage] = useState<Stage>("goal");
  const [showHint, setShowHint] = useState(false);

  const isCorrect = selected === firstLesson.challenge.answer;

  useEffect(() => {
    if (step === 0) setStage("goal");
    else if (step === 1) setStage("steps");
    else setStage("computer");
  }, [step]);

  function choose(option: string) {
    setSelected(option);
    setAttempts((value) => value + 1);
    setShowHint(option !== firstLesson.challenge.answer);
    setStage(option === firstLesson.challenge.answer ? "steps" : "goal");
    setMastered(false);
  }

  function continueLesson() {
    if (!isCorrect) return;
    if (step < firstLesson.steps.length - 1) {
      setStep((value) => value + 1);
      setSelected(null);
      setShowHint(false);
    } else {
      setStage("mastered");
      setMastered(true);
    }
  }

  const activeStage = stage === "mastered" ? "computer" : stage;

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">F</div><div><b>Forsure</b><span>Code</span></div></div>
        <div className="course-label">PYTHON · ZERO TO ENGINEERING</div>
        <div className="progress-card">
          <div className="progress-top"><span>Your journey</span><b>{mastered ? "100%" : "12%"}</b></div>
          <div className="progress"><i style={{width: mastered ? "100%" : "12%"}} /></div>
          <small>Foundations</small>
        </div>
        <nav><div className="nav-title">FOUNDATIONS</div>
          {["What is programming?","How computers execute code","Python setup","print()","Values","Variables"].map((x,i)=>
            <div key={x} className={"lesson-nav "+(i===0?"active":"")}><span>{i===0?"●":"○"}</span>{x}</div>)}
        </nav>
      </aside>

      <section className="content">
        <header className="topbar"><span>Python / Foundations</span><span className="streak">🔥 {attempts > 0 ? "Learning in progress" : "0 day streak"}</span></header>
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
            <div className="visual-label"><Lightbulb size={16}/> THE IDEA MOVES WITH YOU</div>
            <div className="window-scene" aria-label="Animated learning journey">
              <div className="sun"/>
              <div className="cloud cloud-a"><i/><i/><i/></div>
              <div className="cloud cloud-b"><i/><i/><i/></div>
              <div className="cloud cloud-c"><i/><i/><i/></div>
              <div className="plane">✈</div><div className="window-ground"/>
              <div className={"journey active-"+activeStage}>
                <div className={"journey-node node-goal "+(activeStage==="goal"?"is-active":"")}><span>🎯</span><b>Goal</b></div>
                <div className={"journey-line "+(activeStage!=="goal"?"is-complete":"")} />
                <div className={"journey-node node-steps "+(activeStage==="steps"?"is-active":"")}><span>🧩</span><b>Steps</b></div>
                <div className={"journey-line "+(activeStage==="computer"?"is-complete":"")} />
                <div className={"journey-node node-computer "+(activeStage==="computer"?"is-active":"")}><span>🤖</span><b>Computer</b></div>
              </div><div className="window-shine"/>
              <div className="scene-caption">
                {activeStage==="goal" && "Start with the goal."}
                {activeStage==="steps" && "Now break it into a small step."}
                {activeStage==="computer" && "The computer can follow the steps."}
              </div>
            </div>
          </div>

          <div className="challenge">
            <div className="challenge-head"><Code2 size={18}/><span>YOUR TURN · CHECK YOUR THINKING</span></div>
            <h2>{firstLesson.challenge.prompt}</h2>
            <div className="options">{firstLesson.challenge.options.map(option =>
              <button key={option} onClick={()=>choose(option)} className={selected===option?(option===firstLesson.challenge.answer?"correct":"wrong"):""}>
                <span>{option}</span>{selected===option&&option===firstLesson.challenge.answer&&<Check size={20}/>}
              </button>)}</div>
            {selected&&<div className={"feedback "+(isCorrect?"good":"try-again")}>
              {isCorrect
                ? "Exactly. You found the concrete step before the final goal. 🎉"
                : firstLesson.challenge.misconceptions[selected as keyof typeof firstLesson.challenge.misconceptions] || "Not quite. Slow down and think about the next physical step."}
            </div>}
            {showHint && <button className="hint" onClick={()=>setShowHint(false)}>Got it — let me try again</button>}
          </div>

          <button className="continue" onClick={continueLesson} disabled={!isCorrect}>
            {mastered?<><Trophy size={19}/> Lesson mastered</>:<>Continue <ChevronRight size={19}/></>}
          </button>

          {mastered&&<div className="mastery"><Trophy size={22}/><div><b>Understanding check passed.</b><p>Forsure recorded your first mastery signal after {attempts} attempt{attempts===1?"":"s"}.</p></div></div>}
        </div>
      </section>
    </main>
  );
}