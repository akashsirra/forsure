"use client";

import { useEffect, useState } from "react";
import { Check, ChevronRight, Code2, Lightbulb, Loader2, Play, Sparkles, Trophy } from "lucide-react";
import { firstLesson } from "@/lib/lesson";

type Stage = "goal" | "steps" | "computer" | "mastered";

export default function Home() {
  const [selected,setSelected]=useState<string|null>(null),[step,setStep]=useState(0),[mastered,setMastered]=useState(false);
  const [attempts,setAttempts]=useState(0),[stage,setStage]=useState<Stage>("goal"),[showHint,setShowHint]=useState(false);
  const [code,setCode]=useState('print("Pick up the apple")'),[output,setOutput]=useState(""),[running,setRunning]=useState(false),[pyReady,setPyReady]=useState(false),[pyError,setPyError]=useState("");

  const isCorrect=selected===firstLesson.challenge.answer;
  useEffect(()=>{setStage(step===0?"goal":step===1?"steps":"computer")},[step]);

  useEffect(()=>{
    let alive=true;
    import(/* webpackIgnore: true */ "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.mjs")
      .then(()=>{if(alive)setPyReady(true)}).catch(()=>{if(alive)setPyError("Python runtime could not load yet.")});
    return()=>{alive=false};
  },[]);

  function choose(option:string){
    setSelected(option);setAttempts(v=>v+1);setShowHint(option!==firstLesson.challenge.answer);setStage(option===firstLesson.challenge.answer?"steps":"goal");setMastered(false);
  }
  function continueLesson(){
    if(!isCorrect)return;
    if(step<firstLesson.steps.length-1){setStep(v=>v+1);setSelected(null);setShowHint(false)}
    else{setStage("mastered");setMastered(true)}
  }
  async function runPython(){
    setRunning(true);setOutput("");setPyError("");
    try{
      const mod=await import(/* webpackIgnore: true */ "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.mjs");
      const py=await mod.loadPyodide({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.27.2/full/"});
      const wrapped = [
        "import io, sys",
        "_forsure_out = io.StringIO()",
        "_forsure_err = io.StringIO()",
        "_forsure_old_out, _forsure_old_err = sys.stdout, sys.stderr",
        "sys.stdout, sys.stderr = _forsure_out, _forsure_err",
        "try:",
        "    exec(" + JSON.stringify(code) + ", {\"__name__\": \"__main__\"})",
        "finally:",
        "    sys.stdout, sys.stderr = _forsure_old_out, _forsure_old_err",
        "_forsure_text = _forsure_out.getvalue() + _forsure_err.getvalue()",
        "_forsure_text"
      ].join("\\n");
      const result=await py.runPythonAsync(wrapped);
      setOutput(result ? String(result) : "Program finished successfully.");
      if(code.includes("print(")&&code.includes("Pick up the apple"))setStage("computer");
    }catch(e){setPyError(e instanceof Error?e.message:String(e))}finally{setRunning(false)}
  }

  const activeStage=stage==="mastered"?"computer":stage;

  return <main className="app-shell">
    <aside className="sidebar"><div className="brand"><div className="brand-mark">F</div><div><b>Forsure</b><span>Code</span></div></div>
      <div className="course-label">PYTHON · ZERO TO ENGINEERING</div><div className="progress-card"><div className="progress-top"><span>Your journey</span><b>{mastered?"100%":"12%"}</b></div><div className="progress"><i style={{width:mastered?"100%":"12%"}}/></div><small>Foundations</small></div>
      <nav><div className="nav-title">FOUNDATIONS</div>{["What is programming?","How computers execute code","Python setup","print()","Values","Variables"].map((x,i)=><div key={x} className={"lesson-nav "+(i===0?"active":"")}><span>{i===0?"●":"○"}</span>{x}</div>)}</nav>
    </aside>
    <section className="content"><header className="topbar"><span>Python / Foundations</span><span className="streak">🔥 {attempts>0?"Learning in progress":"0 day streak"}</span></header>
      <div className="lesson"><div className="lesson-kicker"><Sparkles size={16}/> FIRST LESSON</div><h1>{firstLesson.title}</h1><p className="subtitle">{firstLesson.subtitle}</p>
        <div className="robot-card"><div className="robot"><span className="robot-face">🤖</span><i className="robot-signal"/></div><div><b>Meet your first student.</b><p>{firstLesson.story}</p></div></div>
        <div className="teacher"><div className="avatar">F</div><div className="bubble"><span className="speaker">Forsure</span><p key={step} className="lesson-text">{firstLesson.steps[step]}</p></div></div>
        <div className="visual"><div className="visual-label"><Lightbulb size={16}/> THE IDEA MOVES WITH YOU</div>
          <div className="window-scene"><div className="sun"/><div className="cloud cloud-a"><i/><i/><i/></div><div className="cloud cloud-b"><i/><i/><i/></div><div className="cloud cloud-c"><i/><i/><i/></div><div className="plane">✈</div><div className="window-ground"/>
            <div className="journey">{<div className={"journey-node node-goal "+(activeStage==="goal"?"is-active":"")}><span>🎯</span><b>Goal</b></div>}<div className={"journey-line "+(activeStage!=="goal"?"is-complete":"")}/><div className={"journey-node node-steps "+(activeStage==="steps"?"is-active":"")}><span>🧩</span><b>Steps</b></div><div className={"journey-line "+(activeStage==="computer"?"is-complete":"")}/><div className={"journey-node node-computer "+(activeStage==="computer"?"is-active":"")}><span>🤖</span><b>Computer</b></div></div><div className="window-shine"/><div className="scene-caption">{activeStage==="goal"?"Start with the goal.":activeStage==="steps"?"Now break it into a small step.":"The computer can follow the steps."}</div>
          </div>
        </div>
        <div className="challenge"><div className="challenge-head"><Code2 size={18}/><span>YOUR TURN · CHECK YOUR THINKING</span></div><h2>{firstLesson.challenge.prompt}</h2>
          <div className="options">{firstLesson.challenge.options.map(option=><button key={option} onClick={()=>choose(option)} className={selected===option?(option===firstLesson.challenge.answer?"correct":"wrong"):""}><span>{option}</span>{selected===option&&option===firstLesson.challenge.answer&&<Check size={20}/>}</button>)}</div>
          {selected&&<div className={"feedback "+(isCorrect?"good":"try-again")}>{isCorrect?"Exactly. You found the concrete step before the final goal. 🎉":firstLesson.challenge.misconceptions[selected as keyof typeof firstLesson.challenge.misconceptions]||"Not quite. Slow down and think about the next physical step."}</div>}
          {showHint&&<button className="hint" onClick={()=>setShowHint(false)}>Got it — let me try again</button>}
        </div>
        <button className="continue" onClick={continueLesson} disabled={!isCorrect}>{mastered?<><Trophy size={19}/> Lesson mastered</>:<>Continue <ChevronRight size={19}/></>}</button>
        {mastered&&<div className="mastery"><Trophy size={22}/><div><b>Understanding check passed.</b><p>Forsure recorded your first mastery signal after {attempts} attempt{attempts===1?"":"s"}.</p></div></div>}

        <section className="playground"><div className="playground-top"><div><div className="play-kicker"><Code2 size={15}/> BUILD THE IDEA</div><h2>Now tell the computer.</h2><p>Turn the instruction you just understood into Python.</p></div><span className={"python-status "+(pyReady?"ready":"")}>{pyReady?"● Python ready":"○ Loading Python"}</span></div>
          <div className="editor"><div className="editor-bar"><span>lesson_01.py</span><button onClick={runPython} disabled={running}>{running?<><Loader2 className="spin" size={15}/> Running</>:<><Play size={15}/> Run</>}</button></div><textarea value={code} onChange={e=>setCode(e.target.value)} spellCheck={false} aria-label="Python code editor"/><div className="output"><span>OUTPUT</span>{output?<pre>{output}</pre>:pyError?<pre className="error">{pyError}</pre>:<pre>Run your code to see what the computer does.</pre>}</div></div>
          <div className="coach-note"><span>F</span><div><b>Forsure coach</b><p>{output ? <>Nice. You gave the computer a concrete instruction. Next, we&apos;ll learn what <code>print()</code> actually does.</> : <>Try running the starter code. Then change the words inside <code>print()</code> and run it again. Watch what changes.</>}</p></div></div>
        </section>
      </div>
    </section>
  </main>;
}