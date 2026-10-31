const KEY="gamerkie_life_quest_v1";
const fresh=()=>({level:1,coins:0,xp:0,completed:0,health:3,best:0,streak:0,unlockedWorlds:1,seenQuotes:[],sound:true});
export const Store={
 load(){try{return {...fresh(),...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return fresh()}},
 save(data){try{localStorage.setItem(KEY,JSON.stringify(data));return true}catch{return false}},
 reset(){localStorage.removeItem(KEY);return fresh()}
};