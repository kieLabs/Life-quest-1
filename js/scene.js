import {Player} from "./player.js";
import {generateLevel} from "./generator.js";
export class Scene{
 constructor(canvas,callbacks){this.canvas=canvas;this.ctx=canvas.getContext("2d");this.callbacks=callbacks;this.running=false;this.input={left:false,right:false,jump:false,slide:false,attack:false};this.camera=0;this.particles=[];this.last=0;this.elapsed=0}
 start(level){this.world=generateLevel(level);this.player=new Player();this.player.health=3;this.camera=0;this.elapsed=0;this.running=true;this.last=performance.now();this.loop=this.loop.bind(this);requestAnimationFrame(this.loop)}
 stop(){this.running=false}
 resize(){const r=this.canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);this.canvas.width=Math.round(r.width*d);this.canvas.height=Math.round(r.height*d);this.ctx.setTransform(d,0,0,d,0,0);this.w=r.width;this.h=r.height}
 loop(now){if(!this.running)return;const dt=Math.min(.033,(now-this.last)/1000||0);this.last=now;this.update(dt);this.render(now/1000);requestAnimationFrame(this.loop)}
 update(dt){
  const p=this.player,w=this.world;this.elapsed+=dt;p.update(this.input,w,dt);
  const target=p.x-this.w*.35;this.camera=Math.max(0,Math.min(w.width-this.w,target));
  w.coins.forEach(c=>{if(!c.taken&&Math.abs((p.x+p.w/2)-c.x)<22&&Math.abs((p.y+p.h/2)-c.y)<28){c.taken=true;this.callbacks.coin()}});
  w.enemies.forEach(e=>{if(!e.alive)return;e.x+=e.dir*65*dt;if(e.x<e.min||e.x>e.max)e.dir*=-1;
   if(p.x<e.x+e.w&&p.x+p.w>e.x&&p.y<e.y+e.h&&p.y+p.h>e.y){if(p.attack>0){e.alive=false;this.callbacks.toast("You turned a challenge into strength!")}else if(p.hurt())this.callbacks.damage(p.health)}
  });
  w.hazards.forEach(h=>{if(p.x<h.x+h.w&&p.x+p.w>h.x&&p.y+p.h>h.y&&p.y<h.y+h.h+15){if(p.hurt())this.callbacks.damage(p.health)}});
  if(p.y>this.h+120){if(p.hurt()){p.x=Math.max(40,this.camera+45);p.y=180;p.vy=0;this.callbacks.damage(p.health)}}
  if(p.health<=0){this.running=false;this.callbacks.failed();return}
  if(p.x>w.goal.x-12){this.running=false;this.callbacks.complete(w)}
  this.callbacks.progress(Math.min(100,p.x/w.goal.x*100));
 }
 render(t){
  const c=this.ctx,w=this.world;c.clearRect(0,0,this.w,this.h);
  const grad=c.createLinearGradient(0,0,0,this.h);grad.addColorStop(0,"#173e4a");grad.addColorStop(1,"#74b58c");c.fillStyle=grad;c.fillRect(0,0,this.w,this.h);
  c.save();c.translate(-this.camera*.22,0);for(let i=0;i<9;i++){c.fillStyle=i%2?"#275d50":"#326c5b";c.beginPath();c.moveTo(i*360,360);c.lineTo(i*360+170,130+(i%3)*25);c.lineTo(i*360+340,360);c.fill()}c.restore();
  c.save();c.translate(-this.camera,0);
  // distant decorative sun
  c.fillStyle="#ffe29a";c.beginPath();c.arc(220,95,35,0,Math.PI*2);c.fill();
  w.platforms.forEach(p=>{c.fillStyle="#1b4d3d";c.fillRect(p.x,p.y,p.w,p.h);c.fillStyle="#79d6a5";c.fillRect(p.x,p.y,p.w,6);c.fillStyle="#ffffff12";c.fillRect(p.x,p.y+7,p.w,p.h-7)});
  w.hazards.forEach(h=>{c.fillStyle="#e77d63";c.beginPath();for(let x=0;x<h.w;x+=10){c.moveTo(h.x+x,h.y+h.h);c.lineTo(h.x+x+5,h.y-5);c.lineTo(h.x+x+10,h.y+h.h)}c.fill()});
  w.coins.forEach(q=>{if(q.taken)return;c.fillStyle="#ffd36a";c.beginPath();c.arc(q.x,q.y+Math.sin(t*5+q.x)*3,8,0,Math.PI*2);c.fill();c.fillStyle="#fff0ae";c.fillRect(q.x-2,q.y-5,2,9)});
  w.enemies.forEach(e=>{if(!e.alive)return;c.fillStyle="#392d56";c.beginPath();c.roundRect(e.x,e.y,e.w,e.h,8);c.fill();c.fillStyle="#ff9d9d";c.fillRect(e.x+5,e.y+8,4,4);c.fillRect(e.x+16,e.y+8,4,4)});
  c.fillStyle="#ffe28a";c.shadowColor="#ffe28a";c.shadowBlur=22;c.fillRect(w.goal.x,w.goal.y,w.goal.w,w.goal.h);c.shadowBlur=0;c.fillStyle="#fff7d2";c.fillRect(w.goal.x+10,w.goal.y+10,w.goal.w-20,w.goal.h-10);
  this.player.draw(c,this.camera,t);c.restore();
  // ground glow
  c.fillStyle="#08251f";c.fillRect(0,this.h-5,this.w,5);
 }
}