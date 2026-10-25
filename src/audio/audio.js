// 25.10: звук, банк WAV/MP3, синтез SFX и музыка вынесены из монолита.
// Модуль держит AudioContext, кэш сэмплов и настройки; игровое состояние читает только для выбора трека.
export function createAudio({ S, clamp, rnd }) {
const AU={ctx:null,on:true,voice:true,vol:100,samples:{},loading:{},audioLoading:false,musicSrc:null,musicEl:null,musicNode:null,musicGain:null,musicTrack:'',lastSample:''};
try{if(localStorage.karnageVox!==undefined)AU.voice=localStorage.karnageVox==='1';if(localStorage.karnageVol!==undefined){const v=parseFloat(localStorage.karnageVol);if(Number.isFinite(v))AU.vol=clamp(v,0,100);}if(localStorage.karnageSnd!==undefined)AU.on=localStorage.karnageSnd==='1';}catch(e){}
const setVol=()=>{if(AU.master)AU.master.gain.value=AU.on ? .9*AU.vol/100 : 0;};// 08.09: применение громкости; 24.10: mute применяется сразу
const saveSet=()=>{try{localStorage.karnageSnd=AU.on?1:0;localStorage.karnageVox=AU.voice?1:0;localStorage.karnageVol=AU.vol;}catch(e){}};// 08.09
const MU={s:0,next:0};
function initA(){if(AU.ctx)return;try{AU.ctx=new(window.AudioContext||window.webkitAudioContext)();AU.master=AU.ctx.createGain();AU.master.gain.value=AU.on ? .9*AU.vol/100 : 0;AU.master.connect(AU.ctx.destination);AU.mg=AU.ctx.createGain();AU.mg.gain.value=.3;AU.mg.connect(AU.master);try{AU.musicGain=AU.ctx.createGain();AU.musicGain.gain.value=.3;AU.musicGain.connect(AU.master);AU.musicEl=document.createElement('audio');AU.musicEl.preload='auto';AU.musicNode=AU.ctx.createMediaElementSource(AU.musicEl);AU.musicNode.connect(AU.musicGain);}catch(e){AU.musicEl=null;AU.musicNode=null;AU.musicGain=null;}MU.next=AU.ctx.currentTime+.1;loadAudio();}catch(e){}}
function tone(o){if(!AU.ctx||!AU.on)return;const c=AU.ctx,t=c.currentTime+(o.w||0);const os=c.createOscillator(),gn=c.createGain();os.type=o.t||'square';os.frequency.setValueAtTime(o.f,t);if(o.f2)os.frequency.exponentialRampToValueAtTime(Math.max(1,o.f2),t+(o.d||.1));gn.gain.setValueAtTime(o.v||.3,t);gn.gain.exponentialRampToValueAtTime(.001,t+(o.d||.1));os.connect(gn);gn.connect(o.m?AU.mg:AU.master);os.start(t);os.stop(t+(o.d||.1)+.02);}
function nz(o){if(!AU.ctx||!AU.on)return;const c=AU.ctx,t=c.currentTime+(o.w||0),d=o.d||.1;const n=c.sampleRate*d|0,b=c.createBuffer(1,Math.max(1,n),c.sampleRate),ch=b.getChannelData(0);for(let i=0;i<n;i++)ch[i]=Math.random()*2-1;const s=c.createBufferSource();s.buffer=b;const f=c.createBiquadFilter();f.type=o.ft||'lowpass';f.frequency.setValueAtTime(o.fl||800,t);if(o.fl2)f.frequency.exponentialRampToValueAtTime(o.fl2,t+d);const gn=c.createGain();gn.gain.setValueAtTime(o.v||.3,t);gn.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(f);f.connect(gn);gn.connect(o.m?AU.mg:AU.master);s.start(t);s.stop(t+d+.02);}
const SFX={swing:()=>nz({d:.06,v:.09,ft:'highpass',fl:1500}),hit:()=>{nz({d:.09,v:.45,fl:520,fl2:120});tone({f:130,f2:55,d:.08,v:.24});},hitH:()=>{nz({d:.14,v:.55,fl:340,fl2:80});tone({f:95,f2:38,d:.12,v:.3});},block:()=>{tone({f:620,d:.04,v:.15});nz({d:.05,v:.12,ft:'highpass',fl:2600});},upper:()=>{tone({f:170,f2:640,d:.18,t:'sawtooth',v:.2});nz({d:.12,v:.2,fl:700,fl2:1800});},land:()=>nz({d:.09,v:.22,fl:300,fl2:90}),fire:()=>{nz({d:.3,v:.28,ft:'bandpass',fl:420,fl2:150});tone({f:100,f2:60,d:.25,t:'sawtooth',v:.11});},ice:()=>{tone({f:1150,f2:1750,d:.12,t:'triangle',v:.15});tone({f:1600,d:.07,t:'sine',v:.09,w:.05});},zap:()=>{for(let i=0;i<4;i++)tone({f:rnd(300,2400),d:.03,v:.11,w:i*.025});nz({d:.12,v:.18,ft:'highpass',fl:1800});},tele:()=>{tone({f:900,f2:90,d:.22,t:'sine',v:.2});nz({d:.15,v:.1,ft:'bandpass',fl:900,fl2:200});},boom:()=>{nz({d:.45,v:.6,fl:260,fl2:50});tone({f:70,f2:28,d:.4,t:'sine',v:.4});},net:()=>nz({d:.18,v:.2,ft:'highpass',fl:1000,fl2:3000}),slash:()=>{nz({d:.05,v:.28,ft:'highpass',fl:2200});nz({d:.05,v:.22,ft:'highpass',fl:1800,w:.05});},shoot:()=>{tone({f:240,f2:60,d:.05,v:.18});nz({d:.04,v:.2,ft:'highpass',fl:1500});},bone:()=>tone({f:190,f2:80,d:.06,v:.24}),sting:()=>{tone({f:82,d:1,t:'sawtooth',v:.2});tone({f:87,d:1,t:'sawtooth',v:.16});},menu:()=>tone({f:420,d:.04,v:.11}),sel:()=>tone({f:520,f2:760,d:.09,v:.13}),fatal:()=>{tone({f:60,d:1.2,t:'sawtooth',v:.3});nz({d:1,v:.2,fl:200,fl2:40});},rdy:()=>{tone({f:330,f2:880,d:.25,t:'sawtooth',v:.15});tone({f:660,f2:1320,d:.25,t:'sawtooth',v:.1,w:.08});},jump:()=>nz({d:.12,v:.1,ft:'bandpass',fl:300,fl2:1400}),freeze:()=>{tone({f:1400,d:.3,t:'triangle',v:.12});tone({f:2100,d:.25,t:'sine',v:.08,w:.06});nz({d:.2,v:.06,ft:'highpass',fl:4000});},supwave:()=>{nz({d:.5,v:.4,fl:400,fl2:60});tone({f:55,f2:30,d:.5,t:'sine',v:.35});},win:()=>{tone({f:392,d:.12,t:'square',v:.12});tone({f:523,d:.12,t:'square',v:.12,w:.12});tone({f:659,d:.22,t:'square',v:.12,w:.24});},step:()=>nz({d:.03,v:.05,fl:400}),
ko:()=>{nz({d:.7,v:.5,fl:200,fl2:40});tone({f:50,f2:24,d:.7,t:'sine',v:.4});},
cast:()=>{tone({f:220,f2:660,d:.2,t:'triangle',v:.09});nz({d:.15,v:.06,ft:'bandpass',fl:600,fl2:1800});},
combo:()=>{tone({f:660,f2:990,d:.12,t:'square',v:.12});tone({f:990,f2:1320,d:.12,t:'square',v:.09,w:.06});},
tick:()=>tone({f:880,d:.05,t:'square',v:.08}),
thunder:()=>{nz({d:1.4,v:.35,fl:120,fl2:35});tone({f:45,f2:28,d:1.2,t:'sine',v:.25});}};// 08.09: K.O.-удар, шиммер каста, тик таймера, гром// 08.09: свист прыжка, звон льда, ударная волна супера// 08.09: джингл готовности супера
Object.assign(SFX,{// 30.09: новые звуки — второй спец, тревога HP, вариант удара, промах, зеркала, разрыв комбо, рёв VS, монетка
cast2:()=>{tone({f:330,f2:990,d:.22,t:'square',v:.09});tone({f:660,f2:1320,d:.18,t:'triangle',v:.07,w:.06});nz({d:.14,v:.07,ft:'bandpass',fl:900,fl2:2400});},
heart:()=>{tone({f:62,d:.09,t:'sine',v:.3});tone({f:55,d:.11,t:'sine',v:.24,w:.14});},
hitV:()=>{nz({d:.11,v:.42,fl:640,fl2:130});tone({f:rnd(150,190),f2:60,d:.08,v:.22});},
whiff:()=>nz({d:.1,v:.07,ft:'bandpass',fl:600,fl2:2600}),
mirror:()=>{tone({f:880,f2:440,d:.16,t:'triangle',v:.12});tone({f:1320,f2:660,d:.16,t:'triangle',v:.08,w:.04});},
cbreak:()=>{tone({f:240,f2:120,d:.14,t:'sawtooth',v:.18});nz({d:.1,v:.14,ft:'highpass',fl:1200});},
vsroar:()=>{nz({d:.8,v:.3,fl:300,fl2:60});tone({f:110,f2:55,d:.7,t:'sawtooth',v:.14});},
coin:()=>{tone({f:988,d:.07,t:'square',v:.12});tone({f:1319,d:.18,t:'square',v:.12,w:.07});}});
const AUDIO_BASE='assets/audio/';
const SAMPLES={
hit:[AUDIO_BASE+'sfx/impact/impactPunch_heavy_000.wav',AUDIO_BASE+'sfx/impact/impactPunch_heavy_001.wav',AUDIO_BASE+'sfx/impact/impactPunch_medium_000.wav'],
hitH:[AUDIO_BASE+'sfx/impact/impactSoft_heavy_000.wav',AUDIO_BASE+'sfx/impact/impactMetal_heavy_000.wav',AUDIO_BASE+'sfx/impact/impactPunch_heavy_002.wav'],
hitV:[AUDIO_BASE+'sfx/impact/impactPunch_medium_001.wav',AUDIO_BASE+'sfx/impact/impactPunch_medium_002.wav'],
upper:[AUDIO_BASE+'sfx/impact/impactPunch_heavy_003.wav',AUDIO_BASE+'sfx/impact/impactMetal_heavy_001.wav'],
block:[AUDIO_BASE+'sfx/impact/impactPlate_medium_000.wav',AUDIO_BASE+'sfx/impact/impactMetal_light_000.wav',AUDIO_BASE+'sfx/impact/impactPlate_light_000.wav'],
step:[AUDIO_BASE+'sfx/footsteps/footstep_concrete_000.wav',AUDIO_BASE+'sfx/footsteps/footstep_concrete_001.wav',AUDIO_BASE+'sfx/footsteps/footstep_wood_000.wav',AUDIO_BASE+'sfx/footsteps/footstep_snow_000.wav'],
land:[AUDIO_BASE+'sfx/impact/impactSoft_medium_000.wav',AUDIO_BASE+'sfx/impact/impactSoft_medium_001.wav'],
menu:[AUDIO_BASE+'sfx/ui/interface/interface_click_002.wav',AUDIO_BASE+'sfx/ui/kenney/ui_click1.wav'],
sel:[AUDIO_BASE+'sfx/ui/interface/interface_confirmation_002.wav',AUDIO_BASE+'sfx/ui/interface/interface_select_003.wav'],
tick:[AUDIO_BASE+'sfx/ui/interface/interface_tick_001.wav'],
zap:[AUDIO_BASE+'sfx/digital/zap1.wav',AUDIO_BASE+'sfx/digital/zap2.wav'],
shoot:[AUDIO_BASE+'sfx/scifi/laserSmall_000.wav',AUDIO_BASE+'sfx/scifi/laserLarge_000.wav',AUDIO_BASE+'sfx/scifi/laserRetro_000.wav'],
slash:[AUDIO_BASE+'sfx/combat/knifeSlice.wav',AUDIO_BASE+'sfx/combat/chop.wav'],
fire:[AUDIO_BASE+'sfx/scifi/thrusterFire_000.wav',AUDIO_BASE+'sfx/scifi/explosionCrunch_003.wav'],
ice:[AUDIO_BASE+'sfx/scifi/forceField_000.wav',AUDIO_BASE+'sfx/scifi/forceField_001.wav'],
net:[AUDIO_BASE+'sfx/scifi/forceField_002.wav',AUDIO_BASE+'sfx/scifi/forceField_003.wav'],
tele:[AUDIO_BASE+'sfx/digital/phaseJump1.wav',AUDIO_BASE+'sfx/digital/phaseJump2.wav'],
boom:[AUDIO_BASE+'sfx/scifi/explosionCrunch_000.wav',AUDIO_BASE+'sfx/scifi/explosionCrunch_001.wav'],
ko:[AUDIO_BASE+'sfx/scifi/explosionCrunch_002.wav',AUDIO_BASE+'sfx/scifi/lowFrequency_explosion_000.wav'],
rdy:[AUDIO_BASE+'sfx/digital/powerUp1.wav',AUDIO_BASE+'sfx/digital/powerUp2.wav'],
coin:[AUDIO_BASE+'music/jingles/8-Bit jingles/jingles_NES00.mp3'],
win:[AUDIO_BASE+'music/jingles/Hit jingles/jingles_HIT00.mp3'],
fatal:[AUDIO_BASE+'sfx/scifi/explosionCrunch_004.wav',AUDIO_BASE+'sfx/scifi/lowFrequency_explosion_001.wav']
};
const MUSIC_TRACKS={
menu:{src:AUDIO_BASE+'music/sector-0.mp3',vol:.22},
battle:{src:AUDIO_BASE+'music/urgent-2.mp3',vol:.26},
battle8:{src:AUDIO_BASE+'music/8bit-battle-loop.mp3',vol:.24},
pause:{src:AUDIO_BASE+'music/airy-0.mp3',vol:.18},
victory:{src:AUDIO_BASE+'music/victory-5.mp3',vol:.32,loop:false}
};
function loadBuffer(path){
 if(!AU.ctx)return Promise.resolve(null);
 if(AU.samples[path])return Promise.resolve(AU.samples[path]);
 if(AU.loading[path])return AU.loading[path];
 const url=new URL(path,location.href).href;
 AU.loading[path]=fetch(url,{cache:'force-cache'}).then(r=>{if(!r.ok)throw new Error(r.status);return r.arrayBuffer();}).then(buf=>AU.ctx.decodeAudioData(buf)).then(buffer=>{AU.samples[path]=buffer;return buffer;}).catch(()=>null);
 return AU.loading[path];
}
// 25.10: сначала боевые SFX, тяжёлые треки и редкие сэмплы — по требованию; во время боя очередь стоит.
function loadAudio(){
 if(!AU.ctx||AU.audioLoading)return;
 AU.audioLoading=true;
 const paths=[...new Set([
  SAMPLES.hit[2],SAMPLES.hitH[1],SAMPLES.hitV[0],SAMPLES.block[1],SAMPLES.upper[1],
  SAMPLES.step[0],SAMPLES.land[0],SAMPLES.menu[1],SAMPLES.sel[1],SAMPLES.tick[0],
  SAMPLES.zap[0],SAMPLES.shoot[2],SAMPLES.slash[1],SAMPLES.fire[1],SAMPLES.ice[0],
  SAMPLES.net[0],SAMPLES.tele[1],SAMPLES.boom[0],SAMPLES.ko[0],SAMPLES.rdy[1]
 ].filter(Boolean))];
 (async()=>{
  for(const path of paths){
   while(S.GAME==='fight')await new Promise(resolve=>setTimeout(resolve,200));
   await loadBuffer(path);
   await new Promise(resolve=>setTimeout(resolve,0));
  }
 })().finally(()=>{AU.audioLoading=false;});
}
function playSample(key,volume=.5,pitch=.03){
 if(!AU.ctx||!AU.on||AU.vol<=0)return false;
 const list=SAMPLES[key];if(!list)return false;
 const ready=list.filter(path=>AU.samples[path]);
 if(!ready.length){loadBuffer(list[0]);return false;}
 const path=ready[Math.random()*ready.length|0];
 const c=AU.ctx,src=c.createBufferSource(),gain=c.createGain();
 src.buffer=AU.samples[path];
 const rate=1+(pitch?(Math.random()*2-1)*pitch:0);
 src.playbackRate.value=rate;
 const dur=Math.max(.04,src.buffer.duration/rate),t=c.currentTime;
 gain.gain.setValueAtTime(volume,t);
 gain.gain.setValueAtTime(volume,Math.max(t,t+dur-.03));
 gain.gain.linearRampToValueAtTime(.0001,t+dur);
 src.connect(gain);gain.connect(AU.master);
 src.start(t);src.stop(t+dur+.02);
 AU.lastSample=key;
 return true;
}
function stopMusic(){
 if(AU.musicSrc){
  try{
   AU.musicSrc.onended=null;
   if(typeof AU.musicSrc.stop==='function')AU.musicSrc.stop();
   else{AU.musicSrc.pause();AU.musicSrc.currentTime=0;}
  }catch(e){}
 }
 AU.musicSrc=null;AU.musicTrack='';
}
function startMusic(name){
 const track=MUSIC_TRACKS[name];if(!track||!AU.ctx||!AU.musicEl||!AU.musicGain)return false;
 if(AU.musicTrack===name&&AU.musicSrc)return true;
 stopMusic();
 const el=AU.musicEl;
 try{
  el.src=new URL(track.src,location.href).href;
  el.loop=track.loop!==false;
  AU.musicGain.gain.value=track.vol;
  AU.musicSrc=el;AU.musicTrack=name;
  el.onended=()=>{if(AU.musicSrc===el){AU.musicSrc=null;AU.musicTrack='';}};
  const played=el.play();
  if(played&&played.catch)played.catch(()=>{if(AU.musicSrc===el)stopMusic();});
 }catch(e){stopMusic();return false;}
 return true;
}
function musicTrackFor(md){
 if(md==='fight')return S.battle&&S.battle.mode==='arcade'?'battle8':'battle';
 if(md==='menu')return 'menu';
 if(md==='vs')return S.battle&&S.battle.mode==='arcade'?'battle8':'battle';
 if(md==='pause')return 'pause';
 if(md==='end')return S.GAME==='ending'?'victory':'pause';
 return '';
}
const SYNTH_SFX={...SFX};
const SAMPLE_SFX={
hit:['hit',.6,.04],hitH:['hitH',.72,.03],hitV:['hitV',.55,.05],
block:['block',.55,.02],upper:['upper',.65,.03],step:['step',.18,.12],
land:['land',.45,.06],menu:['menu',.38,0],sel:['sel',.48,0],
tick:['tick',.3,0],zap:['zap',.5,.03],shoot:['shoot',.45,.03],
slash:['slash',.55,.03],fire:['fire',.45,.03],ice:['ice',.4,.02],
net:['net',.45,.02],tele:['tele',.45,.02],boom:['boom',.72,.02],
ko:['ko',.85,.02],rdy:['rdy',.5,.02],coin:['coin',.42,0],
win:['win',.55,0],fatal:['fatal',.8,.02]
};
for(const [name,spec] of Object.entries(SAMPLE_SFX)){
 const synth=SYNTH_SFX[name];
 if(typeof synth==='function')SFX[name]=function(){if(!playSample(spec[0],spec[1],spec[2]))synth();};
}
let VOICES=[];if(window.speechSynthesis){try{speechSynthesis.onvoiceschanged=()=>{VOICES=speechSynthesis.getVoices().filter(v=>v.lang&&v.lang.startsWith('en'));};speechSynthesis.getVoices();}catch(e){}}
function say(t){if(!AU.on||!AU.voice||AU.vol<=0||!window.speechSynthesis)return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);const v=VOICES.find(v=>/david|daniel|fred|male|george/i.test(v.name));if(v)u.voice=v;u.pitch=.3;u.rate=.8;u.volume=AU.vol/100;u.lang='en-US';speechSynthesis.speak(u);}catch(e){}}
const BASS=[0,0,3,0,-2,-2,3,5,0,0,3,0,-4,-4,-2,2];const MBASS=[0,0,-2,0,3,3,5,3,0,0,-2,0,-4,-4,0,3];const VBASS=[0,0,3,5,0,0,3,2,0,0,3,5,7,5,3,2];const EBASS=[0,4,7,12,9,7,4,0];// 30.09: темы VS и победы
function music(){if(!AU.ctx||!AU.on){stopMusic();return;}const c=AU.ctx;
if(MU.next<c.currentTime-.25){MU.next=c.currentTime+.05;MU.s=0;}
const md=(S.GAME==='fight'&&S.battle)?(S.paused?'pause':'fight'):(S.GAME==='vs'?'vs':(S.GAME==='ending'||S.GAME==='continue'?'end':'menu'));// 30.09: +темы VS и финала
const track=musicTrackFor(md);if(track&&startMusic(track))return;
const tr=md==='fight'?S.battle.arena:0;
const dt=md==='pause'?.28:md==='vs'?.11:(md==='fight'&&S.battle.aiLvl>=7)?.115:md==='end'?.22:md==='menu'?.16:.13;// 30.09: VS быстрее, финальный босс — темп выше
while(MU.next<c.currentTime+.15){const s=MU.s%32,w=MU.next-c.currentTime;
if(md==='pause'){// 08.09: тема паузы — без бита, тихие тянущиеся аккорды
if(s%8===0)[0,3,7].forEach(n=>tone({f:82.4*Math.pow(2,n/12),d:2.8,t:'triangle',v:.05,w,m:1}));
if(s%16===4)tone({f:55,d:1.8,t:'sine',v:.09,w,m:1});}
else if(md==='vs'){// 30.09: тема VS-экрана — быстрый тревожный пульс
if(s%4===0)tone({f:110,f2:55,d:.1,t:'sawtooth',v:.15,w,m:1});
if(s%8===4)nz({d:.06,v:.13,ft:'bandpass',fl:1500,w,m:1});
if(s%2===0)tone({f:220*Math.pow(2,VBASS[s/2|0]/12),d:.07,t:'square',v:.05,w,m:1});}
else if(md==='end'){// 30.09: тема победы в турнире — мажорный, торжественный
if(s%16===0)[0,4,7,12].forEach(n=>tone({f:130.8*Math.pow(2,n/12),d:3.5,t:'triangle',v:.05,w,m:1}));
if(s%4===0)tone({f:261.6*Math.pow(2,EBASS[(s/4|0)%8]/12),d:.42,t:'triangle',v:.08,w,m:1});
if(s%8===2)nz({d:.04,v:.03,ft:'highpass',fl:6000,w,m:1});}
else if(md==='menu'){// 08.09: тема меню — медленнее и минорнее боевой
if([0,8,16,24].includes(s))tone({f:98,f2:40,d:.16,t:'sine',v:.35,w,m:1});
if(s%4===0)nz({d:.03,v:.03,ft:'highpass',fl:6000,w,m:1});
if(s%2===0)tone({f:49*Math.pow(2,MBASS[s/2|0]/12),d:.15,t:'sawtooth',v:.09,w,m:1});
if(s===0)[0,7,12].forEach(n=>tone({f:65.4*Math.pow(2,n/12),d:3.2,t:'triangle',v:.035,w,m:1}));}
else{if([0,6,8,14,16,22,24,28].includes(s))tone({f:110,f2:38,d:.14,t:'sine',v:.4,w,m:1});if([4,12,20,28].includes(s))nz({d:.09,v:.2,ft:'bandpass',fl:1800,w,m:1});if(s%2===0)nz({d:.03,v:.045,ft:'highpass',fl:6000,w,m:1});if(s%2===0)tone({f:41.2*Math.pow(2,(BASS[s/2|0]+tr)/12),d:.13,t:'sawtooth',v:.12,w,m:1});if(s===0)[0,3,7].forEach(n=>tone({f:82.4*Math.pow(2,(n+tr)/12),d:3.4,t:'triangle',v:.04,w,m:1}));}
MU.s++;MU.next+=dt;}}

return {
  AU, SFX, MU, initA, say, setVol, saveSet,
  startMusic, stopMusic, music, tone, nz,
  playSample, loadBuffer, loadAudio, musicTrackFor,
};
}
