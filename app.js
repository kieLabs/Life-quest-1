import {Scene} from "./scene.js";
import {Store} from "./storage.js";
import {themeFor} from "./motivation.js";
import {show,$,toast,setHud} from "./ui.js";
import {AudioFX} from "./audio.js";
let data=Store.load(),scene,activeLevel=1;
const canvas=$("game"),hud=$("hud"),touch=$("touch-controls");
function sync(){Store.save(data);setHud(data,data.level);$("save-line").textContent=`Level ${data.level} · ${data.completed} challenges conquered · ${data.xp} XP`;$("continue-btn").disabled=data.completed===0&&data.level===1}
function startIntro(level){activeLevel=level;const t=themeFor(level);$("level-kicker").textContent=`LEVEL ${level} · ${t.name}`;$("level-title").textContent=t.name;$("level-quote").textContent=`“${t.quote}”`;show("quote-screen");}
function begin(){show("");hud.classList.remove("hidden");touch.classList.remove("hidden");scene.start(activeLevel);$("hud-level").textContent="LEVEL "+activeLevel}
function endGame(){hud.classList.add("hidden");touch.classList.add("hidden");show("menu");sync()}
function setup(){
 scene=new Scene(canvas,{coin(){data.coins++;AudioFX.coin();$("hud-coins").textContent=data.coins;$("coin-count").textContent=data.coins},damage(h){$("health").textContent=h;if(h<=0)toast("Every retry is another chance.")},progress(v){$("progress-fill").style.width=v+"%"},toast,failed(){hud.classList.add("hidden");touch.classList.add("hidden");show("result-screen");$("result-kicker").textContent="KEEP RISING";$("result-title").textContent="TRY AGAIN";$("result-lesson").textContent="A difficult attempt is not the end of your story. Learn the pattern, take a breath and try again.";$("reward-xp").textContent="0";$("reward-coins").textContent="0";$("next-btn").textContent="RETRY LEVEL";$("next-btn").onclick=()=>startIntro(activeLevel)},complete(world){hud.classList.add("hidden");touch.classList.add("hidden");data.completed=Math.max(data.completed,activeLevel);data.level=Math.max(data.level,activeLevel+1);data.xp+=100+activeLevel*5;data.coins+=25;data.best=Math.max(data.best,activeLevel);Store.save(data);AudioFX.win();const t=world.theme;$("result-kicker").textContent=`${world.world.toUpperCase()} · LEVEL ${activeLevel} COMPLETE`;$("result-title").textContent="YOU ROSE ABOVE IT!";$("result-lesson").textContent=t.lesson;$("reward-xp").textContent=100+activeLevel*5;$("reward-coins").textContent=25;$("next-btn").textContent="NEXT CHALLENGE →";$("next-btn").onclick=()=>startIntro(data.level);show("result-screen");sync()}});
 sync();window.addEventListener("resize",()=>scene.resize());scene.resize();
}
function bind(){
 $("play-btn").onclick=()=>startIntro(1);$("continue-btn").onclick=()=>startIntro(data.level);$("begin-btn").onclick=begin;
 $("pause-btn").onclick=()=>{scene.stop();show("pause-screen")};$("resume-btn").onclick=()=>{show("");scene.start(activeLevel)};$("restart-btn").onclick=()=>startIntro(activeLevel);$("home-btn").onclick=()=>{scene.stop();endGame()};$("result-home-btn").onclick=endGame;
 $("how-btn").onclick=()=>show("help-screen");$("help-back").onclick=()=>show("menu");
 $("next-btn").onclick=()=>startIntro(data.level);
 const keyMap={ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",Space:"jump",ArrowUp:"jump",KeyW:"jump",ArrowDown:"slide",KeyS:"slide",KeyX:"attack"};
 window.addEventListener("keydown",e=>{if(e.code==="Escape"&&!$("hud").classList.contains("hidden")){$("pause-btn").click();return}const k=keyMap[e.code];if(k){e.preventDefault();if(k==="jump"){if(!scene.input.jump)scene.input.jump=true}else scene.input[k]=true}});
 window.addEventListener("keyup",e=>{const k=keyMap[e.code];if(k&&k!=="jump")scene.input[k]=false;if(k==="jump")scene.input.jump=false});
 document.querySelectorAll("[data-key]").forEach(b=>{const k=b.dataset.key;const down=e=>{e.preventDefault();if(k==="jump"){scene.input.jump=true;setTimeout(()=>scene.input.jump=false,80)}else scene.input[k]=true};const up=e=>{e.preventDefault();if(k!=="jump")scene.input[k]=false};b.addEventListener("pointerdown",down);["pointerup","pointercancel","pointerleave"].forEach(ev=>b.addEventListener(ev,up))});
 document.addEventListener("visibilitychange",()=>{if(document.hidden&&!hud.classList.contains("hidden")){$("pause-btn").click()}});
}
setup();bind();