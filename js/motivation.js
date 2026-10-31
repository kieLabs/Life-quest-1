export const themes = [
 {name:"THE FIRST STEP",quote:"Every great journey begins with one small step.",lesson:"You do not need to see the whole staircase. Take the next step, then the next. Small beginnings can lead to extraordinary places.",type:"start"},
 {name:"NEVER GIVE UP",quote:"A setback is a setup for a stronger comeback.",lesson:"Falling does not erase your progress. What matters is choosing to rise, learn and try once more.",type:"persist"},
 {name:"BELIEVE IN YOURSELF",quote:"Trust the strength you are still discovering.",lesson:"Other people's doubts do not define your potential. Give yourself the chance to prove what you can do.",type:"belief"},
 {name:"FACE YOUR FEARS",quote:"Courage is moving forward while fear is still beside you.",lesson:"Fear may warn you, but it does not have to lead you. Take a careful step beyond your comfort zone.",type:"courage"},
 {name:"HARD WORK",quote:"Dreams grow when effort becomes a habit.",lesson:"Talent can open a door, but consistent effort helps you walk through it. Keep showing up.",type:"effort"},
 {name:"PATIENCE",quote:"Growth takes time. Keep becoming.",lesson:"Not every good thing happens quickly. Learn to wait, prepare and move when the moment is right.",type:"patience"},
 {name:"DISCIPLINE",quote:"Your small daily choices are building your future.",lesson:"Motivation changes from day to day. A simple routine helps you keep your promise to yourself.",type:"discipline"},
 {name:"SELF CONFIDENCE",quote:"Stop asking if you are good enough. Start giving your best.",lesson:"Confidence is built through action. Each honest attempt gives you another reason to trust yourself.",type:"focus"},
 {name:"TURN FAILURE INTO POWER",quote:"Let every mistake teach you a better way forward.",lesson:"Failure is information, not your identity. Notice what happened, adjust your approach and continue.",type:"persist"},
 {name:"NEVER STOP LEARNING",quote:"Every day gives you a new chance to grow.",lesson:"Stay curious. A new skill, idea or perspective can turn today's challenge into tomorrow's strength.",type:"learn"}
];
const extra = ["DREAM BIG","STAY FOCUSED","BE STRONG","KEEP MOVING","OVERCOME CHALLENGES","TIME MANAGEMENT","SELF RESPECT","HONESTY","KINDNESS","LEADERSHIP","FRIENDSHIP","FAMILY","EDUCATION","SUCCESS","RESPONSIBILITY","HOPE","COURAGE","CONSISTENCY","POSITIVE THINKING","MENTAL STRENGTH","HARD DECISIONS","NEW BEGINNINGS","NEVER LOSE HOPE"];
const quotes = ["One brave choice can change the direction of your day.","Progress is built one honest effort at a time.","You are stronger than the excuse asking you to stop.","Keep your eyes on the path, not on the noise.","A better tomorrow begins with what you do today.","Your pace is valid. Keep moving with purpose.","Every challenge is a chance to practise becoming stronger."];
const lessons = ["Choose progress over perfection. The next attempt can be wiser than the last.","Protect your attention. Your energy grows where you place your focus.","Respect your journey. Real growth is often quiet before it becomes visible.","Be patient with the process and committed to the effort.","You cannot control every obstacle, but you can choose your next move."];
export function themeFor(level){
 if(level<=themes.length) return themes[level-1];
 const n=extra[(level-11)%extra.length], seed=(level*17)%quotes.length;
 return {name:n,quote:quotes[seed],lesson:lessons[(level*7)%lessons.length],type:["focus","persist","patience","effort"][level%4]};
}
export function quoteFor(level){return themeFor(level).quote}