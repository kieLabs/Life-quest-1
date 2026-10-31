let ctx=null,enabled=true;
export const AudioFX={
 setEnabled(v){enabled=v},
 beep(freq=600,duration=.08,type="sine"){if(!enabled)return;try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(.08,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+duration);o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+duration)}catch{}},
 coin(){this.beep(880,.09);setTimeout(()=>this.beep(1200,.08),55)},
 jump(){this.beep(420,.1,"triangle")},
 win(){this.beep(523,.13);setTimeout(()=>this.beep(659,.13),120);setTimeout(()=>this.beep(784,.2),240)}
};