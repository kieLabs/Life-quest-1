export const $=id=>document.getElementById(id);
export function show(id){["menu","quote-screen","pause-screen","result-screen","help-screen"].forEach(x=>$(x).classList.toggle("hidden",x!==id))}
export function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),1800)}
export function setHud(data,level){$("coin-count").textContent=data.coins;$("xp-count").textContent=data.xp;$("hud-coins").textContent=data.coins;$("hud-level").textContent="LEVEL "+level;$("health").textContent=3}