import {themeFor} from "./motivation.js";
const worlds=["Green Forest","Mountain Adventure","Desert Challenge","Snow Mountain","Ocean Adventure","Volcano","Dark Cave","Sky Islands","Ancient Temple","Cyber World","Dream World","Space Adventure"];
export function difficulty(level){return level<=10?"BEGINNER":level<=30?"EASY":level<=60?"INTERMEDIATE":level<=100?"ADVANCED":level<=250?"EXPERT":level<=500?"MASTER":level<=1000?"LEGEND":"INFINITE CHALLENGE"}
export function generateLevel(level, width=2600){
 const seed=(level*9301+49297)%233280, rand=(()=>{let s=seed;return()=>{s=(s*9301+49297)%233280;return s/233280}})();
 const theme=themeFor(level), world=worlds[Math.min(11,Math.floor((level-1)/10))];
 const platforms=[{x:0,y:390,w:430,h:30},{x:500,y:rand()*55+315,w:230,h:22},{x:810,y:rand()*65+285,w:220,h:22},{x:1110,y:rand()*70+300,w:240,h:22},{x:1450,y:rand()*55+280,w:220,h:22},{x:1770,y:rand()*65+300,w:240,h:22},{x:2100,y:390,w:500,h:30}];
 const coins=[]; platforms.slice(1,-1).forEach(p=>{for(let i=0;i<3;i++)coins.push({x:p.x+35+i*48,y:p.y-35-(i===1?18:0),taken:false})});
 const enemies=[];const count=Math.min(2+Math.floor(level/8),7);for(let i=0;i<count;i++){const p=platforms[1+(i%5)];enemies.push({x:p.x+70+rand()*70,y:p.y-27,w:25,h:27,dir:rand()>.5?1:-1,min:p.x+15,max:p.x+p.w-35,alive:true})}
 const hazards=[];for(let i=0;i<Math.min(2+Math.floor(level/12),5);i++){const p=platforms[1+(i%5)];hazards.push({x:p.x+rand()*(p.w-55),y:p.y-12,w:42,h:12})}
 return {level,theme,world,difficulty:difficulty(level),width,platforms,coins,enemies,hazards,goal:{x:2370,y:325,w:45,h:65},checkpoints:[1050,1850]};
}