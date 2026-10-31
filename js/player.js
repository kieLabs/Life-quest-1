export class Player{
 constructor(){this.x=65;this.y=300;this.w=28;this.h=42;this.vx=0;this.vy=0;this.grounded=false;this.jumps=0;this.health=3;this.invuln=0;this.facing=1;this.sliding=0;this.attack=0}
 update(input,world,dt){
  const accel=1900, max=270;this.vx=0;
  if(input.left){this.vx=-max;this.facing=-1}if(input.right){this.vx=max;this.facing=1}
  if(input.jump&&this.jumps<2){this.vy=-610;this.grounded=false;this.jumps++;input.jump=false}
  if(input.slide&&this.grounded)this.sliding=0.35;
  if(input.attack)this.attack=0.2;
  this.sliding=Math.max(0,this.sliding-dt);this.attack=Math.max(0,this.attack-dt);
  this.vy+=1550*dt;this.x+=this.vx*dt;this.y+=this.vy*dt;
  this.x=Math.max(0,Math.min(world.width-this.w,this.x));
  this.grounded=false;
  for(const p of world.platforms){if(this.vy>=0&&this.x+this.w>p.x&&this.x<p.x+p.w&&this.y+this.h>=p.y&&this.y+this.h-this.vy*dt<=p.y){this.y=p.y-this.h;this.vy=0;this.grounded=true;this.jumps=0}}
  if(this.invuln>0)this.invuln-=dt;
 }
 hurt(){if(this.invuln>0)return false;this.health--;this.invuln=1.2;this.vy=-300;return true}
 draw(ctx,camera,t){
  if(this.invuln>0&&Math.floor(t*14)%2===0)return;
  const x=this.x-camera,y=this.y;ctx.save();ctx.translate(x+this.w/2,y+this.h/2);ctx.scale(this.facing,1);
  ctx.fillStyle="#09251f";ctx.beginPath();ctx.roundRect(-13,-18,26,34,9);ctx.fill();
  ctx.fillStyle="#75efbd";ctx.beginPath();ctx.roundRect(-12,-20,24,31,8);ctx.fill();
  ctx.fillStyle="#f4c89a";ctx.beginPath();ctx.arc(0,-23,10,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#183d33";ctx.fillRect(2,-25,3,3);
  ctx.fillStyle="#ffd36a";ctx.fillRect(-10,10,8,9);ctx.fillRect(3,10,8,9);
  if(this.attack>0){ctx.strokeStyle="#fff0a6";ctx.lineWidth=4;ctx.beginPath();ctx.arc(18,0,17,-1.2,1.2);ctx.stroke()}
  ctx.restore();
 }
}