import { CH, BOSS } from '../data/characters.js';
import { ENDINGS } from '../data/endings.js';
import { AR, initArenas } from '../data/arenas.js';
import { createArenaView } from './world/arena.js';
import { createState, createSelection, setScreen, beginBattle, resetRound } from './core/state.js';
import { createParticles } from './fx/particles.js';
import { ATK, WM, createFighter } from './fighter.js';
import { createCombat } from './combat.js';
import { createInput } from './input.js';

export function startKarnage(fxAssets = {}, arenaAssets = {}, uiAssets = {}) {
const RW=424,RH=240,FL=206,AW=760,GR=8,OUT='#0e0b08';
const FATAL_FRAMES=600,FATAL_INPUT=240;// 25.10: 10 секунд на добивание и 4 секунды на ввод — запас для спокойного набора
const FX=fxAssets||{},ARENA_IMG=arenaAssets||{},UI=uiAssets||{};
const S=createState();
const cv=document.getElementById('cv'),g=cv.getContext('2d');
function fit(){let s=Math.min(innerWidth/RW,innerHeight/RH);if(s>=2)s=Math.floor(s);cv.style.width=s*RW+'px';cv.style.height=s*RH+'px';document.body.classList.toggle('portrait',innerHeight>innerWidth);}
addEventListener('resize',fit);fit();
if(document.fonts)document.fonts.load('20px "Russo One"');
const clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t,rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.random()*a.length|0],blink=()=>((S.FRAME>>4)%2===0);
function mul(s){return function(){s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}
initArenas({ mul, RW, RH, FL, GR });
function colorParts(c){if(c[0]==='#')return[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];const m=/^rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c);return m?[+m[1],+m[2],+m[3]]:[0,0,0];}
function mix(a,b,t){const A=colorParts(a),B=colorParts(b);return'rgb('+(lerp(A[0],B[0],t)|0)+','+(lerp(A[1],B[1],t)|0)+','+(lerp(A[2],B[2],t)|0)+')';}
const shade=(h,k)=>mix(h,'#000000',1-k);
const arenaView=createArenaView({g,RW,RH,FL,AR,assets:ARENA_IMG,shade,mix});
/* ЗВУК */
// 25.10: звук включён по умолчанию; контекст создаётся после первого ввода
const OPT={crt:true,blood:true,shake:true,reduce:false};
try{const raw=JSON.parse(localStorage.karnageOpts||'{}');if(raw&&typeof raw==='object'){for(const k of['crt','blood','shake','reduce'])if(typeof raw[k]==='boolean')OPT[k]=raw[k];}}catch(e){}
const saveOpts=()=>{try{localStorage.karnageOpts=JSON.stringify(OPT);}catch(e){}};
const applyCrt=()=>{const el=document.getElementById('crt');if(el)el.style.display=OPT.crt?'block':'none';};
applyCrt();
const AU={ctx:null,on:true,voice:true,vol:100,samples:{},loading:{},audioLoading:false,musicSrc:null,musicGain:null,musicTrack:'',lastSample:''};
try{if(localStorage.karnageVox!==undefined)AU.voice=localStorage.karnageVox==='1';if(localStorage.karnageVol!==undefined){const v=parseFloat(localStorage.karnageVol);if(Number.isFinite(v))AU.vol=clamp(v,0,100);}if(localStorage.karnageSnd!==undefined)AU.on=localStorage.karnageSnd==='1';}catch(e){}
const setVol=()=>{if(AU.master)AU.master.gain.value=AU.on ? .9*AU.vol/100 : 0;};// 08.09: применение громкости; 24.10: mute применяется сразу

const saveSet=()=>{try{localStorage.karnageSnd=AU.on?1:0;localStorage.karnageVox=AU.voice?1:0;localStorage.karnageVol=AU.vol;}catch(e){}};// 08.09
const dayStamp=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
const topRaw=()=>{try{const raw=JSON.parse(localStorage.karnageTop||'[]');if(!Array.isArray(raw))return[];return raw.filter(e=>e&&Number.isInteger(e.id)&&e.id>=0&&e.id<CH.length&&Number.isFinite(e.step)&&e.step>=0);}catch(e){return[]}};
const topBest=()=>{const best=new Map();for(const e of topRaw()){const cur=best.get(e.id);if(!cur||e.step>cur.step)best.set(e.id,{id:e.id,step:e.step,...(typeof e.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(e.date)?{date:e.date}:{})});}return [...best.values()].sort((a,b)=>b.step-a.step||a.id-b.id);};// 25.10: одна лучшая запись на бойца
const TOP=()=>topBest().slice(0,5);
const addTop=(id,step,date)=>{try{if(!Number.isInteger(id)||id<0||id>=CH.length||!Number.isFinite(step)||step<0)return;const day=typeof date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(date)?date:dayStamp();const best=new Map();for(const e of topRaw()){const cur=best.get(e.id);if(!cur||e.step>cur.step)best.set(e.id,{id:e.id,step:e.step,...(typeof e.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(e.date)?{date:e.date}:{})});}const cur=best.get(id);if(!cur||step>cur.step)best.set(id,{id,step,date:day});localStorage.karnageTop=JSON.stringify([...best.values()].sort((a,b)=>b.step-a.step||a.id-b.id).slice(0,5));}catch(e){}};
const ARC_KEY='karnageArcRun',ARC_VERSION=1,ARC_TOTAL=CH.length-1;// 25.10: 11 обычных противников + финальный босс
function validArcRun(run){if(!run||run.v!==ARC_VERSION)return false;if(!Number.isInteger(run.c1)||run.c1<0||run.c1>=CH.length)return false;if(!Array.isArray(run.ladder)||run.ladder.length!==CH.length-2)return false;if(!run.ladder.every(id=>Number.isInteger(id)&&id>=0&&id<CH.length&&id!==run.c1&&id!==BOSS.id))return false;if(new Set(run.ladder).size!==run.ladder.length)return false;if(!Number.isInteger(run.step)||run.step<0||run.step>=ARC_TOTAL)return false;return true;}
function loadArcRun(){try{const run=JSON.parse(localStorage[ARC_KEY]||'null');return validArcRun(run)?run:null;}catch(e){return null}}
function saveArcRun(){try{if(!Number.isInteger(S.arcP1)||!S.ladder.length||!Number.isInteger(S.lStep))return;const run={v:ARC_VERSION,c1:S.arcP1,ladder:S.ladder.slice(),step:S.lStep};if(validArcRun(run))localStorage[ARC_KEY]=JSON.stringify(run);}catch(e){}}
function clearArcRun(){try{localStorage.removeItem(ARC_KEY);}catch(e){}}
function arcTotal(){return S.ladder.length?S.ladder.length+1:ARC_TOTAL;}
function initA(){if(AU.ctx)return;try{AU.ctx=new(window.AudioContext||window.webkitAudioContext)();AU.master=AU.ctx.createGain();AU.master.gain.value=AU.on ? .9*AU.vol/100 : 0;AU.master.connect(AU.ctx.destination);AU.mg=AU.ctx.createGain();AU.mg.gain.value=.3;AU.mg.connect(AU.master);MU.next=AU.ctx.currentTime+.1;loadAudio();}catch(e){}}
addEventListener('pointerdown',()=>{initA();if(AU.ctx&&AU.ctx.state==='suspended')AU.ctx.resume();if(S.GAME==='title'){toLobby('menu');SFX.sel();}});// 08.09: клик мыши на титуле тоже открывает меню
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
function loadAudio(){
 if(!AU.ctx||AU.audioLoading)return;
 AU.audioLoading=true;
 const paths=[...new Set([...Object.values(SAMPLES).flat(),...Object.values(MUSIC_TRACKS).map(t=>t.src)])];
 Promise.all(paths.map(loadBuffer)).finally(()=>{AU.audioLoading=false;});
}
function playSample(key,volume=.5,pitch=.03){
 if(!AU.ctx||!AU.on||AU.vol<=0)return false;
 const list=SAMPLES[key];if(!list)return false;
 const ready=list.filter(path=>AU.samples[path]);
 if(!ready.length){for(const path of list)loadBuffer(path);return false;}
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
 if(AU.musicSrc){try{AU.musicSrc.onended=null;AU.musicSrc.stop();}catch(e){}}
 AU.musicSrc=null;AU.musicGain=null;AU.musicTrack='';
}
function startMusic(name){
 const track=MUSIC_TRACKS[name];if(!track)return false;
 if(AU.musicTrack===name)return true;
 if(!AU.samples[track.src]){loadBuffer(track.src);return false;}
 stopMusic();
 const c=AU.ctx,src=c.createBufferSource(),gain=c.createGain();
 src.buffer=AU.samples[track.src];src.loop=track.loop!==false;
 gain.gain.value=track.vol;
 src.connect(gain);gain.connect(AU.master);
 src.onended=()=>{if(AU.musicSrc===src)AU.musicSrc=null;};
 src.start();
 AU.musicSrc=src;AU.musicGain=gain;AU.musicTrack=name;
 return true;
}
function musicTrackFor(md){
 if(md==='fight')return S.battle&&S.battle.mode==='arcade'?'battle8':'battle';
 if(md==='menu')return 'menu';
 if(md==='vs')return 'battle8';
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
const MU={s:0,next:0};const BASS=[0,0,3,0,-2,-2,3,5,0,0,3,0,-4,-4,-2,2];const MBASS=[0,0,-2,0,3,3,5,3,0,0,-2,0,-4,-4,0,3];const VBASS=[0,0,3,5,0,0,3,2,0,0,3,5,7,5,3,2];const EBASS=[0,4,7,12,9,7,4,0];// 30.09: темы VS и победы
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
/* ВВОД */
const {keys,TOUCH,KM1,KM2,Ctrl}=createInput();
function bindTouch(){const isTouch=('ontouchstart' in window)||navigator.maxTouchPoints>0;if(!isTouch)return;document.body.classList.add('touch');const root=document.createElement('div');root.id='touch';root.innerHTML='<div class="dpad"><button class="up" data-key="u">▲</button><button class="left" data-key="l">◀</button><button class="down" data-key="d">▼</button><button class="right" data-key="r">▶</button></div><div class="actions"><button class="punch" data-key="P">P</button><button class="kick" data-key="K">K</button><button class="block" data-key="B">БЛОК</button></div><button class="pause" data-key="pause">Ⅱ</button>';document.body.appendChild(root);const codes={l:'ArrowLeft',r:'ArrowRight',u:'ArrowUp',d:'ArrowDown',P:'Enter',K:'KeyK',B:'Escape'};for(const btn of root.querySelectorAll('button')){const key=btn.dataset.key;const down=e=>{e.preventDefault();e.stopPropagation();if(btn.setPointerCapture)try{btn.setPointerCapture(e.pointerId);}catch(err){}btn.classList.add('on');initA();if(AU.ctx&&AU.ctx.state==='suspended')AU.ctx.resume();if(key==='pause'){onKey('Escape');return;}TOUCH[key]=1;if(S.GAME!=='fight'||S.paused)onKey(codes[key]);else if(key==='P')onKey('KeyJ');};const up=e=>{e.preventDefault();btn.classList.remove('on');if(key!=='pause')TOUCH[key]=0;};btn.addEventListener('pointerdown',down);btn.addEventListener('pointerup',up);btn.addEventListener('pointercancel',up);btn.addEventListener('lostpointercapture',up);}}// 24.10: touch-управление
bindTouch();
addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();if(!e.repeat){keys[e.code]=true;initA();if(AU.ctx&&AU.ctx.state==='suspended')AU.ctx.resume();onKey(e.code);}});
addEventListener('keyup',e=>{keys[e.code]=false;});
addEventListener('blur',()=>{for(const k in keys)keys[k]=false;for(const k in TOUCH)TOUCH[k]=0;document.querySelectorAll('#touch button.on').forEach(btn=>btn.classList.remove('on'));if(S.GAME==='fight'&&!S.paused){S.paused=true;S.pauseIdx=0;}});
addEventListener('visibilitychange',()=>{if(document.hidden){for(const k in keys)keys[k]=false;for(const k in TOUCH)TOUCH[k]=0;document.querySelectorAll('#touch button.on').forEach(btn=>btn.classList.remove('on'));if(S.GAME==='fight'&&!S.paused){S.paused=true;S.pauseIdx=0;}}});
/* ПЕРСОНАЖИ: spec/fat строки (D вниз U вверх L влево R вправо P рука K нога) */
;
/* ВТОРЫЕ СПЕЦПРИЁМЫ (08.09): по одному на бойца, ввод — 3 кнопки */
/* АРЕНЫ */
;
function drawArena(ai,cam,t){if(arenaView.draw(ai,cam,t))return;const A=AR[ai],AS=ARENA_IMG[ai];
if(AS&&AS.ready){g.drawImage(AS.image,0,0,RW,RH);if(AS.props)g.drawImage(AS.props,0,0,RW,RH);const fg=g.createLinearGradient(0,FL-26,0,FL);fg.addColorStop(0,'rgba(178,188,208,0)');fg.addColorStop(1,'rgba(178,188,208,.08)');g.fillStyle=fg;g.fillRect(0,FL-26,RW,26);const gr=g.createLinearGradient(0,FL,0,RH);gr.addColorStop(0,A.gr);gr.addColorStop(1,shade(A.gr,.55));g.fillStyle=gr;g.fillRect(0,FL,RW,RH-FL);g.fillStyle=mix(A.gr,'#fff',.14);g.fillRect(0,FL,RW,1);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(0,FL,RW,2);return;}// 24.10: пилот арены на ассетах
const sky=g.createLinearGradient(0,0,0,FL);// 08.09: небо градиентом вместо плоских полос
sky.addColorStop(0,A.sky[0]);sky.addColorStop(.45,A.sky[1]);sky.addColorStop(.75,A.sky[2]);sky.addColorStop(1,A.sky[3]);
g.fillStyle=sky;g.fillRect(0,0,RW,FL+1);
g.fillStyle='#c8d0d8';for(const st of A.stars){g.globalAlpha=.25+.3*Math.sin(t*.03+st.p);g.fillRect(st.x,st.y,st.z,st.z);}g.globalAlpha=1;// 30.09: мерцающие звёзды
const mg2=g.createRadialGradient(330,42,4,330,42,34);mg2.addColorStop(0,'rgba(232,232,216,.32)');mg2.addColorStop(1,'rgba(232,232,216,0)');g.fillStyle=mg2;g.fillRect(292,4,80,80);// 30.09: гало луны
g.fillStyle=A.moon;g.beginPath();g.arc(330,42,11,0,7);g.fill();
g.fillStyle=A.sky[0];g.beginPath();g.arc(326,38,9,0,7);g.fill();
g.fillStyle=A.far;for(const s of A.fs){const x0=Math.round(((s.x-cam*.25)%1060+1060)%1060-40);
for(const x of[x0,x0-1060])if(x<RW&&x+s.w>0)g.fillRect(x,140-s.h,s.w,s.h+20);}// 08.09: вторая копия на стыке тайла — дальний слой не моргает
g.fillStyle=A.mc;for(const sp of A.ms){const bx0=Math.round(((sp.x-cam*.55)%1220+1220)%1220-70);const v=sp.v,m=A.mid;
for(const bx of[bx0,bx0-1220]){// 08.09: вторая копия на стыке тайла — средний слой не прыгает
if(bx<-140||bx>RW+90)continue;
if(m==='bldg'){g.fillRect(bx,92+v*20,42,114);g.fillStyle=A.far;for(let w=0;w<4;w++)for(let h=0;h<5;h++)if((sp.x+w*3+h)%3)g.fillRect(bx+5+w*10,100+h*18,6,9);g.fillStyle=A.mc;}
else if(m==='col'){g.fillRect(bx,80,14,126);g.fillRect(bx-4,76,22,8);g.fillRect(bx-4,198,22,8);}
else if(m==='roof'){g.fillRect(bx,110,30,96);g.fillRect(bx+12,70,3,44);g.fillStyle='#d84030';if((sp.x+(t/20|0))%4<2)g.fillRect(bx+11,68,5,4);g.fillStyle=A.mc;}
else if(m==='mtn'){g.beginPath();g.moveTo(bx-56,206);g.lineTo(bx+30,60+v*40);g.lineTo(bx+116,206);g.fill();}
else if(m==='bam'){for(let b=0;b<3;b++)g.fillRect(bx+b*16,50+((sp.x+b*17)%30),5,160);g.fillStyle='#4a6a2a';g.fillRect(bx-6,50+(sp.x%30),36,4);g.fillStyle=A.mc;}
else if(m==='dune'){g.beginPath();g.moveTo(bx-64,206);g.quadraticCurveTo(bx+30,108+v*30,bx+124,206);g.fill();}
else if(m==='lav'){g.fillRect(bx,120,50,86);g.fillStyle='#f06020';if((sp.x+(t/14|0))%5<2)g.fillRect(bx+8,190,34,4);g.fillStyle=A.mc;}
else if(m==='ice'){g.beginPath();g.moveTo(bx-44,206);g.lineTo(bx+20,48+v*40);g.lineTo(bx+74,206);g.fill();}
else if(m==='pipe'){g.fillRect(bx,60,12,146);g.fillRect(bx-6,70+(sp.x%3)*30,24,10);g.beginPath();g.arc(bx+6,60,10,0,7);g.fill();}
else{g.fillRect(bx,150,18,56);g.fillRect(bx+3,140,12,14);if(sp.x%3<1){g.fillRect(bx-2,120,4,40);g.fillRect(bx-12,130,24,5);}}}}// 08.09: +вторая копия слоя
g.strokeStyle='rgba(190,190,200,.22)';g.lineWidth=2;// 08.09: цепи с потолка — второй слой декора
for(const chx of[120,420,700]){const x=Math.round(chx-cam*.7);if(x<-10||x>RW+10)continue;const sw=Math.sin(t*.05+chx)*3,cl=40+chx%50;
g.beginPath();g.moveTo(x,0);g.lineTo(x+sw,cl);g.stroke();g.fillStyle='rgba(190,190,200,.3)';g.fillRect(x+sw-2,cl,5,4);}
const px1=Math.round(60-cam*.85),px2=Math.round(AW-60-cam*.85);
for(const px of[px1,px2]){if(px<-30||px>RW+30)continue;// 08.09: декор арены — каменные пьедесталы с живым огнём
g.fillStyle='#3a3128';g.fillRect(px-7,FL-64,14,64);g.fillStyle='#4a4038';g.fillRect(px-9,FL-68,18,6);
g.fillStyle='#2a221c';g.fillRect(px-5,FL-76,10,10);
const ff=Math.sin(t*.21+px)*1.5;g.fillStyle='#f06020';g.fillRect(px-3,FL-84+ff*.4,6,9);g.fillStyle='#f8d060';g.fillRect(px-1,FL-82+ff*.4,3,5);}
const fog=g.createLinearGradient(0,FL-26,0,FL);fog.addColorStop(0,'rgba(178,188,208,0)');fog.addColorStop(1,'rgba(178,188,208,.08)');g.fillStyle=fog;g.fillRect(0,FL-26,RW,26);// 30.09: туман у горизонта
const gr=g.createLinearGradient(0,FL,0,RH);g.fillStyle=gr;// 08.09: земля с объёмом — темнее к низу
gr.addColorStop(0,A.gr);gr.addColorStop(1,shade(A.gr,.55));g.fillRect(0,FL,RW,RH-FL);
g.fillStyle=mix(A.gr,'#fff',.14);g.fillRect(0,FL,RW,1);
g.globalAlpha=.14;g.fillStyle=mix(A.sky[3],'#fff',.5);g.fillRect(0,FL-12,RW,12);g.globalAlpha=1;// 08.09: свечение горизонта цветом неба арены
g.strokeStyle='rgba(0,0,0,.16)';g.lineWidth=1;const vx=RW/2-(cam-RW/2)*.35;// 08.09: псевдо-3D — перспективный пол, линии сходятся к точке, точка едет с камерой
for(let i=-8;i<=8;i++){g.beginPath();g.moveTo(vx+i*26,FL+2);g.lineTo(vx+i*72,RH);g.stroke();}
for(const y of[FL+5,FL+14,FL+26]){g.beginPath();g.moveTo(0,y);g.lineTo(RW,y);g.stroke();}
g.fillStyle=A.gr2;for(let i=0;i<26;i++){const x0=Math.round(((i*47-cam)%(RW+47)+RW+47)%(RW+47)-23);const y=FL+3+(i*13)%(RH-FL-8),w2=20+(i*7)%18;
for(const x of[x0,x0-(RW+47)])g.fillRect(x,y,w2,2);}
g.strokeStyle='rgba(0,0,0,.18)';g.lineWidth=1;for(const yy of[FL+9,FL+20,FL+32]){g.beginPath();g.moveTo(0,yy);g.lineTo(RW,yy);g.stroke();}// 30.09: швы плит
g.fillStyle=A.gr2;for(const rb of A.rb){const x=Math.round(((rb.x-cam)%(RW+40)+RW+40)%(RW+40)-20);g.globalAlpha=rb.a;g.fillRect(x,rb.y,rb.w,2);}g.globalAlpha=1;// 30.09: щебень с параллаксом
g.fillStyle='rgba(0,0,0,.25)';g.fillRect(0,FL,RW,2);g.fillStyle='rgba(255,255,255,.06)';g.fillRect(0,FL+2,RW,1);}// 30.09: кромка земли// 08.09: вторая копия крапинок на стыке
function ambient(){if(arenaView.ambient({arena:S.battle.arena,cam:S.cam,frame:S.FRAME,parts:S.parts}))return;const A=AR[S.battle.arena];
if(A.rain&&S.FRAME%2===0)S.parts.push({x:S.cam+rnd(-20,RW+30),y:-6,vx:-.6,vy:7,c:'rgba(170,190,215,.28)',l:60,s:1,gv:0,line:1,kf:1});
if(A.snow&&S.FRAME%2===0)S.parts.push({x:S.cam+rnd(-10,RW+10),y:-4,vx:rnd(-.3,.3),vy:rnd(.3,.6),c:'rgba(230,240,255,.7)',l:420,s:1,gv:0});
if(A.sand&&S.FRAME%8===0)S.parts.push({x:S.cam+RW+10,y:rnd(60,FL),vx:rnd(-2.6,-1.6),vy:0,c:'rgba(220,180,110,.2)',l:120,s:1,gv:0,line:1,kf:1});
if(A.ember&&S.FRAME%3===0)S.parts.push({x:S.cam+rnd(0,RW),y:FL+rnd(-4,10),vx:rnd(-.3,.3),vy:-rnd(.4,1),c:pick(['#f06020','#c84018','#f0a030']),l:rnd(60,120),s:rnd(1,2),gv:-.01});
if(A.rain&&Math.random()<.004){S.flashS=Math.max(S.flashS,3);SFX.thunder();}}// 08.09: молния и гром на грозовой арене
/* ЧАСТИЦЫ */
function spriteFx(name,x,y,opts){const a=FX[name];if(!a||!a.ready)return false;opts=opts||{};const frames=a.frames||1;const fps=a.fps||30;if(S.fx.length>40)S.fx.splice(0,S.fx.length-40);S.fx.push({ty:'sprite',img:a.image,x,y,t:0,dur:Math.max(1,Math.round(frames*60/fps)),frames,frameW:a.frameWidth,frameH:a.frameHeight,anchor:a.anchor||[a.frameWidth/2,a.frameHeight/2],blend:a.blend||'source-over',scale:opts.scale??a.scale??1,alpha:opts.alpha??a.alpha??1});return true;}
function impactFx(ty,x,y,color){if(ty==='ice'||(ty==='shard'&&(color==='#c8ecff'||color==='#9adcee')))return spriteFx('iceImpact',x,y,{scale:.8,alpha:.9});if(ty==='shadow'||(ty==='shard'&&(color==='#7a3aa8'||color==='#b89aff')))return spriteFx('shadowImpact',x,y,{scale:.8,alpha:.8});if(ty==='fire'||(ty==='shard'&&(color==='#f06020'||color==='#f8d060')))return spriteFx('fireImpact',x,y,{scale:.8,alpha:.85});return false;}
const {P,blood,updParts,drawParts,drawDecals}=createParticles({g,state:S,options:OPT,FL,GR,rnd});
/* БОЕЦ */
const {autoHit,resolveHit}=createCombat({S,SFX,P,blood,spriteFx,rnd,pick});
const F=createFighter({
  S, FL, GR, AW, clamp, lerp, rnd, pick, P, blood, spriteFx, SFX, smoke, resolveHit, autoHit,
});
function smoke(x,y){spriteFx('smoke',x,y,{scale:.85,alpha:.4});for(let i=0;i<10;i++)P(x+rnd(-8,8),y+rnd(-20,10),rnd(-1,1),rnd(-1.5,-.2),'#889',30,3,-.02);}
/* СНАРЯДЫ */
function updProjs(){if(S.battle&&['finish','fatal','over','ko'].includes(S.battle.phase)){S.projs.length=0;return;}if(S.projs.length>60)S.projs.splice(0,S.projs.length-60);// 08.09: страховочный лимит
for(let i=S.projs.length;i--;){const p=S.projs[i];p.l--;p.x+=p.vx;p.y+=p.vy;
if(S.FRAME%2===0){if(p.ty==='fire')P(p.x,p.y,rnd(-.4,.4),rnd(-.8,-.2),pick(['#f06020','#f8d060']),16,2,-.01);else if(p.ty==='ice')P(p.x,p.y,rnd(-.3,.3),rnd(-.5,.2),'#c8ecff',16,1,-.005);else if(p.ty==='shadow')P(p.x,p.y,rnd(-.3,.3),rnd(-.6,-.1),'#7a3aa8',18,2,-.01);else if(p.ty==='wave')P(p.x,FL+GR-2,rnd(-.5,.5),rnd(-1.6,-.5),'#9a9080',14,2,.06);}// 08.09: шлейфы снарядов
if(p.ty==='bomb'||p.ty==='meteor'||p.ty==='rocket')p.vy+=.12;
if(p.ty==='shard'&&S.FRAME%3===0)P(p.x,p.y,rnd(-.3,.3),rnd(-.4,.2),p.c,14,2,-.005);// 08.09: шлейф осколка
if(p.hom&&p.o&&p.o.foe&&p.l%2===0){const f2=p.o.foe;if(f2.state!=='down'){const dx2=f2.x-p.x,dy2=f2.y-f2.def.h*.5-p.y,dd2=Math.sqrt(dx2*dx2+dy2*dy2)||1;p.vx+=dx2/dd2*.45;p.vy+=dy2/dd2*.45;const sp2=Math.sqrt(p.vx*p.vx+p.vy*p.vy);if(sp2>4.6){p.vx*=4.6/sp2;p.vy*=4.6/sp2;}}}// 30.09: наведение с капом скорости — звёзды не пролетают мимо// 30.09: самонаведение звёзд Веги
const f=p.o.foe;
if(f&&!f.hidden&&!f.dodging&&f.state!=='down'&&f.state!=='victim'){const b=f.box;
if(p.ty!=='meteor'&&p.ty!=='rocket'&&p.ty!=='bomb'&&p.x>b.x-4&&p.x<b.x+b.w+4&&p.y>b.y-6&&p.y<b.y+b.h+4){
const wf=f.frozen>0;impactFx(p.ty,p.x,p.y,p.c);resolveHit(p.o,f,p.d,p.k?{knock:1}:{});// 08.09: shard с k:1 валит с ног; 24.10: спрайтовый импакт
const blk=f.state==='block';// 08.09: блок гасит контроль-эффекты снарядов
if(p.ty==='ice'&&!wf&&!blk&&f.hp>0){f.frozen=85;f.state='frozen';f.atk=null;SFX.freeze();}
// 08.09: баланс Крио — заморозка 100→85 кадров; звон льда; блок больше не замораживает
if(p.pois&&!blk&&f.hp>0){f.poison=120;f.poisonC='#7ac83a';}// 08.09: яд через блок не проходит; 30.09: цвет яда всегда зелёный
if(p.bl&&!blk&&f.hp>0){f.poison=150;f.poisonC='#d82040';}// 30.09: кровотечение от игл Кармин
if(p.ty==='net'&&!blk&&f.hp>0){f.netT=95;f.state='net';f.atk=null;}// 08.09: блок больше не опутывает
if(p.ty==='shadow'&&!blk){p.o.hp=Math.min(100,p.o.hp+p.d*.7);for(let j=0;j<6;j++)P(p.x,p.y,(p.o.x-p.x)*.04,rnd(-1,-.3),'#7a3aa8',26,2,0);}// 08.09: блок гасит вытягивание
S.projs.splice(i,1);continue;}}
if((p.ty==='meteor'||p.ty==='rocket'||p.ty==='bomb')&&p.y>=FL+GR-2){spriteFx('explosion',p.x,FL+GR-2,{scale:1.05,alpha:.9});S.fx.push({ty:'boom',x:p.x,y:FL+GR-4,t:0});SFX.boom();S.shake=6;const f=p.o.foe;if(f&&!f.dodging&&Math.abs(f.x-p.x)<30&&f.state!=='down'&&f.state!=='victim')resolveHit(p.o,f,p.d,{still:1});S.projs.splice(i,1);continue;}// 01.10: AoE 26→30, без отброса и без требования onGround (жертва подпрыгивает от попаданий)// 08.09: AoE бомб не должен трогать жертву фаталити
if(p.l<=0||p.x<-30||p.x>AW+30)S.projs.splice(i,1);}}
function drawProjs(cam){for(const p of S.projs){const x=p.x-cam,y=p.y;
const gl={fire:'#f06020',ice:'#88c8f0',shadow:'#7a3aa8',bolt:'#f8f860',meteor:'#f06020',rocket:'#d84030',bomb:'#f06020'}[p.ty]||p.c;if(gl){g.shadowColor=gl;g.shadowBlur=8;}// 08.09: свечение снарядов + цвет shard
if(p.ty==='fire'){g.fillStyle='#f06020';g.fillRect(x-5,y-5,10,10);g.fillStyle='#f8d060';g.fillRect(x-3,y-3,6,6);g.fillStyle='#a03010';g.fillRect(x-(p.vx>0?10:-10),y-2,6,4);}
else if(p.ty==='ice'){g.fillStyle='#88c8f0';g.beginPath();g.moveTo(x-7,y);g.lineTo(x,y-6);g.lineTo(x+7,y);g.lineTo(x,y+6);g.fill();g.fillStyle='#e8f8ff';g.fillRect(x-2,y-2,4,4);}
else if(p.ty==='shadow'){g.fillStyle='#3a1a5a';g.beginPath();g.arc(x,y,6,0,7);g.fill();g.fillStyle='#7a3aa8';g.beginPath();g.arc(x+Math.sin(p.l)*3,y-2,3,0,7);g.fill();}
else if(p.ty==='net'){g.strokeStyle='#c8c8a0';g.lineWidth=1;const s=8+(120-p.l)*.06;g.strokeRect(x-s/2,y-s/2,s,s);}
else if(p.ty==='wave'){g.fillStyle='#c8e0ff';for(let k=-1;k<=1;k++){const h=12-Math.abs(k)*4;g.beginPath();g.moveTo(x+k*9-5,FL+GR);g.lineTo(x+k*9,FL+GR-h);g.lineTo(x+k*9+5,FL+GR);g.fill();}g.fillStyle='#6aa0d8';g.fillRect(x-6,FL+GR-3,12,3);}
else if(p.ty==='bolt')drawBolt(x,y-90,x,y);
else if(p.ty==='meteor'){g.fillStyle='#f06020';g.fillRect(x-5,y-5,10,10);g.fillStyle='#f8d060';g.fillRect(x-2,y-2,5,5);}
else if(p.ty==='rocket'){g.fillStyle='#889';g.fillRect(x-3,y-8,6,12);g.fillStyle='#d84030';g.fillRect(x-2,y-8,4,3);}
else if(p.ty==='bomb'){const a=Math.sin(p.l*.4)*2;g.fillStyle='#2a2018';g.beginPath();g.arc(x,y,5,0,7);g.fill();g.fillStyle='#4a4038';g.fillRect(x-3,y-3,6,2);g.fillStyle='#f0a030';g.fillRect(x+3,y-6+a,2,2);g.fillStyle='#f8d060';g.fillRect(x+4,y-5+a,1,1);}else if(p.ty==='shard'){g.fillStyle=p.c;g.beginPath();g.arc(x,y,p.s||4,0,7);g.fill();g.fillStyle='#fff';g.fillRect(x-1,y-1,2,2);}g.shadowBlur=0;}}// 08.09: осколок — цветной шар с бликом
function drawBolt(x1,y1,x2,y2){g.strokeStyle='#f8f860';g.lineWidth=2;g.beginPath();g.moveTo(x1,y1);for(let i=1;i<=6;i++)g.lineTo(lerp(x1,x2,i/6)+rnd(-5,5),lerp(y1,y2,i/6));g.stroke();g.strokeStyle='#fff';g.lineWidth=1;g.stroke();}
function updFx(){for(let i=S.fx.length;i--;){const f=S.fx[i];f.t++;if(f.ty==='boom'&&f.t%3===0){const r=f.t*1.6;P(f.x+rnd(-r,r),f.y+rnd(-r,r)*.4,rnd(-1,1),rnd(-2,0),'#f06020',16,2);}if(f.t>80||(f.life&&f.t>f.life)||(f.ty==='rock'&&f.t>26)||(f.ty==='boom'&&f.t>22)||(f.ty==='nova'&&f.t>26)||(f.ty==='slash'&&f.t>10)||(f.ty==='boltfx'&&f.t>8)||(f.ty==='ring'&&f.t>14)||(f.ty==='castbolt'&&f.t>9)||(f.ty==='sprite'&&f.t>f.dur))S.fx.splice(i,1);
if(S.fx.length>200)S.fx.splice(0,S.fx.length-200);}}// 30.09: страховочный лимит эффектов; 08.09: +ring
function drawFx(cam){for(const f of S.fx){const x=f.x-cam;
if(f.ty==='sprite'){const frame=Math.min(f.frames-1,Math.floor(f.t/f.dur*f.frames));g.save();g.globalCompositeOperation=f.blend;g.globalAlpha=f.alpha;g.drawImage(f.img,frame*f.frameW,0,f.frameW,f.frameH,x-f.anchor[0]*f.scale,f.y-f.anchor[1]*f.scale,f.frameW*f.scale,f.frameH*f.scale);g.restore();}
else if(f.ty==='whiff'){const p=f.t/f.life,a=1-p;g.save();g.translate(x,f.y);g.scale(f.face||1,1);g.globalCompositeOperation='screen';g.globalAlpha=a;g.strokeStyle='rgba(220,238,255,.9)';g.lineWidth=2-p;g.beginPath();g.arc(0,0,9+p*10,-1,.45);g.stroke();g.globalAlpha=a*.5;g.lineWidth=1;g.beginPath();g.arc(0,0,5+p*6,-1.25,.7);g.stroke();g.globalAlpha=a*.6;g.strokeStyle=f.col;g.beginPath();g.moveTo(-2,0);g.lineTo(-10-p*4,0);g.stroke();g.restore();}
else if(f.ty==='super'){const p=f.t/f.life,a=1-p;g.save();g.globalCompositeOperation='lighter';g.translate(x,f.y);g.globalAlpha=a*.35;const rad=8+p*40,gr=g.createRadialGradient(0,0,2,0,0,rad);gr.addColorStop(0,'rgba(255,255,255,.9)');gr.addColorStop(.35,f.col);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,rad,0,7);g.fill();g.globalAlpha=a;g.strokeStyle=f.col;g.lineWidth=3;g.beginPath();g.arc(0,0,6+p*44,0,7);g.stroke();g.globalAlpha=a*.7;g.strokeStyle='#fff';g.lineWidth=1.5;g.beginPath();g.arc(0,0,3+p*30,0,7);g.stroke();for(let i=0;i<10;i++){const an=i*Math.PI/5+p*.3,r0=5+p*8,r1=12+p*40;g.beginPath();g.moveTo(Math.cos(an)*r0,Math.sin(an)*r0);g.lineTo(Math.cos(an)*r1,Math.sin(an)*r1);g.stroke();}g.globalAlpha=a*.55;g.strokeStyle=f.col;g.lineWidth=2;g.beginPath();g.ellipse(0,f.gy-f.y,10+p*34,3+p*7,0,0,7);g.stroke();g.globalAlpha=a;g.fillStyle='#fff';g.beginPath();g.arc(0,0,Math.max(0,5*(1-p)),0,7);g.fill();g.restore();}
else if(f.ty==='rock'){const h=Math.min(30,f.t*4);g.fillStyle='#6a5a44';g.fillRect(x-10,FL+GR-h,20,h);g.fillStyle='#8a7a5c';g.fillRect(x-6,FL+GR-h,5,h);if(f.t<8){g.fillStyle='#b01818';g.fillRect(x-10,FL+GR-h-4,20,3);}}
else if(f.ty==='boom'){const r=f.t*1.6;g.strokeStyle=f.t<8?'#f8d060':'#f06020';g.lineWidth=3;g.beginPath();g.arc(x,f.y,r,0,7);g.stroke();}
else if(f.ty==='nova'){g.strokeStyle='#c8ecff';g.lineWidth=2;g.beginPath();g.arc(x,f.y,f.t*3.4,0,7);g.stroke();}
else if(f.ty==='drain'){g.strokeStyle='#7a3aa8';g.lineWidth=2;g.beginPath();g.arc(x,FL-40+Math.sin(f.t*.15)*6,20+f.t*.2,0,7);g.stroke();}
else if(f.ty==='slash'){g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.moveTo(x-10,f.y-14);g.lineTo(x+10,f.y+10);g.stroke();}
else if(f.ty==='ring'){g.strokeStyle=f.col;g.lineWidth=2;g.beginPath();g.arc(x,f.y,f.t*3.2,0,7);g.stroke();}// 08.09: ударное кольцо
else if(f.ty==='name'){const pr=f.t/(f.life||60),a=1-pr;g.save();g.globalAlpha=a;g.font='9px "Russo One"';g.textAlign='center';g.fillStyle=f.col;g.fillText(f.txt,x,f.y-pr*14);g.restore();}// 25.10: название броска над бойцом
else if(f.ty==='boltfx')drawBolt(x,FL,x,FL-90);
if(f.ty==='castbolt'){const by2=f.y-(f.h||60);drawBolt(x,by2-6,x+Math.sin(f.t)*3,by2-72);g.fillStyle='rgba(248,248,96,.5)';g.fillRect(x-2,by2-8,4,4);}// 30.09: канал молнии из руки Вольта
}}
/* ОТРИСОВКА БОЙЦА */
function seg(x,y,a1,a2,l1,l2){const mx=x+Math.sin(a1)*l1,my=y+Math.cos(a1)*l1;const ex=mx+Math.sin(a1+a2)*l2,ey=my+Math.cos(a1+a2)*l2;g.beginPath();g.moveTo(x,y);g.lineTo(mx,my);g.lineTo(ex,ey);g.stroke();return[ex,ey];}
const lite=(c,t)=>mix(c,'#ffffff',t);
function limb(x,y,a1,a2,l1,l2,w,c){g.lineCap='round';g.strokeStyle=OUT;g.lineWidth=w+3;seg(x,y,a1,a2,l1,l2);g.strokeStyle=c;g.lineWidth=w;const e=seg(x,y,a1,a2,l1,l2);
const mx=x+Math.sin(a1)*l1,my=y+Math.cos(a1)*l1,hi=lite(c,.28);
if(hi){g.strokeStyle=hi;g.lineWidth=Math.max(1,w*.32);g.beginPath();g.moveTo(x,y-w*.3);g.lineTo(mx,my-w*.3);g.lineTo(e[0],e[1]-w*.3);g.stroke();}
return e;}
function boot(e,c){g.fillStyle=OUT;g.fillRect(e[0]-4,e[1]-3,9,6);g.fillStyle=c;g.fillRect(e[0]-3,e[1]-2,7,4);
const hi=lite(c,.3);if(hi){g.fillStyle=hi;g.fillRect(e[0]-3,e[1]-2,7,1);}g.fillStyle=OUT;g.fillRect(e[0]-4,e[1]+2,9,1);g.fillStyle=shade(c,.7);g.fillRect(e[0]+2,e[1]-1,3,3);}// 30.09: подошва, блик, носок
function fist(e,c){g.fillStyle=OUT;g.fillRect(e[0]-3,e[1]-3,7,7);g.fillStyle=c;g.fillRect(e[0]-2,e[1]-2,5,5);
const hi=lite(c,.25);if(hi){g.fillStyle=hi;g.fillRect(e[0]-2,e[1]-2,5,1);}g.fillStyle=shade(c,.75);g.fillRect(e[0]+1,e[1],3,3);}// 30.09: костяшки
function pose(f){const d=f.def,t=f.animT,s=f.state;
let p={hip:d.h*.47,lean:0,armF:[.7,1.9],armB:[-.5,2.1],legF:[.45,-.15],legB:[-.45,-.2],head:0};
const bob=Math.sin(t*.09)*1.4;
if(s==='idle'){p.hip+=bob*.4;p.armF[0]+=Math.sin(t*.09)*.08;
if(S.battle&&S.battle.phase==='intro'){// 08.09: уникальные вступительные позы перед раундом
const q=d.id;
if(q===0){p.armF=[1.5,.6];p.armB=[1.3,.6];p.lean=.08;}
else if(q===1){p.head=.3;p.armF=[.15,.5];p.armB=[-.15,.5];p.lean=.12;}
else if(q===2){p.armF=[1.9,.3];p.armB=[-1.9,.3];p.hip+=Math.sin(t*.6)*.8;}
else if(q===3){p.armF=[.7,1.3];p.armB=[-.7,1.3];p.hip=d.h*.42;}
else if(q===4){p.lean=.18;p.armF=[1.3,.4];p.armB=[-.4,1.6];p.hip=d.h*.42;}
else if(q===5){p.armF=[2.4,.15];p.armB=[-.3,1.8];p.head=-.05;}
else if(q===6){p.armF=[.9,1.6];p.armB=[.7,1.6];p.head=.08;}
else if(q===7){p.armF=[1.1,.9];p.armB=[1,.9];p.lean=.06;}
else if(q===8){p.armF=[.5,.4];p.armB=[-.5,.4];p.lean=-.08;}
else if(q===10){p.armF=[1.45,.35];p.armB=[1.25,.4];p.lean=-.05;p.head=-.05;}// Кармин: веер раскрыт у плеча
else if(q===11){p.armF=[1.2,.55];p.armB=[-.3,1.9];p.lean=.14;p.hip=d.h*.42;}// Аямэ: катана у бедра, стойка синоби
else if(q===12){p.armF=[1.5,.1];p.armB=[-.2,1.8];p.lean=-.04;p.head=-.06;}// Вега: лук натянут, взгляд к небу
else{p.armF=[1.4,.3];p.armB=[-.2,1.7];p.head=-.1;}}}// Эмбер мнёт кулаки, Гейст поник, Вольт искрит, Базальт скала, Фэнг пригнулся, Сахра посылает поцелуй зале, Крио дышит холодом, Ржавый хрустит костяшками, Ноктюрн распахнул мантию, Кайзер властный жест
else if(s==='walk'){const W=WM[d.id]||[.22,1,1,1.4,0];const c=Math.sin(t*W[0]),la=W[1],aa=W[2];
p.legF=[.45+c*.6*la,-.3];p.legB=[-.45-c*.6*la,-.3];p.armF=[.5-c*.4*aa,1.8];p.armB=[-.5+c*.4*aa,2];p.hip+=Math.abs(c)*W[3];p.lean=W[4];}// 30.09: индивидуальная походка
else if(s==='jump'){p.legF=[.9,-1.9];p.legB=[-.6,-1.7];p.armF=[1.8,-.4];p.armB=[-1.2,-.3];}
else if(s==='dash'){p.lean=.38;p.hip=d.h*.36;p.legF=[1.25,-.7];p.legB=[-1,-.35];p.armF=[-.9,1.4];p.armB=[1.3,1.1];p.head=.1;}// 30.09: поза рывка — низкий скользящий выпад
else if(s==='crouch'){p.hip=d.h*.24;p.legF=[1.1,-2.2];p.legB=[-1.1,-2];p.armF=[.9,2];p.armB=[-.3,2.2];}
else if(s==='block'){p.armF=[1.15,1.9];p.armB=[.95,2.1];p.legF=[.35,-.2];p.legB=[-.5,-.2];p.lean=.05;}
else if(s==='atk'){const ph=f.atk?Math.min(1,f.st/f.atk.A.wd):0;
if(f.atk&&f.atk.t==='punch'){p.armF=[lerp(-.4,1.55,ph),lerp(2.2,.05,ph)];p.armB=[-.7,2.1];p.lean=ph*.25;}
else if(f.atk&&(f.atk.t==='kick'||f.atk.t==='rh')){p.legF=[lerp(.3,1.5,ph),lerp(-.5,-.05,ph)];// 08.09: roundhouse — поза удара ногой
p.legB=[-.35,-.15];p.armF=[-.3,1.6];p.armB=[-.8,1.9];p.lean=ph*.2;p.hip=d.h*.44;}
else if(f.atk&&f.atk.t==='jkick'){p.legF=[lerp(.5,1.4,ph),-.1];p.legB=[-.8,-1.4];p.armF=[-.6,1.5];p.armB=[-1.3,-.4];}
else if(f.atk&&f.atk.t==='upper'){p.armF=[lerp(1.2,2.7,ph),.1];p.armB=[-.6,2];p.lean=-ph*.2;p.legF=[.4,-.2];p.legB=[-.5,-.2];}
else if(f.atk&&f.atk.t==='sweep'){p.hip=d.h*.18;p.legF=[lerp(.5,1.55,ph),-.05];p.legB=[-1.2,-1.9];p.armF=[.9,2.2];p.armB=[-.9,1.8];}
else if(f.atk&&f.atk.t==='throw'){const A=f.atk.A,th=(f.atk.grabbed||f.atk.thrown)?Math.min(1,(f.st-(A.wd+A.ac))/8):0;p.armF=[lerp(.7,1.95,ph)+th*.35,lerp(1.9,.15,ph)];p.armB=[lerp(-.5,1.25,ph)+th*.45,lerp(2.1,.25,ph)];p.lean=ph*.25-th*.42;p.hip=d.h*.44;p.legF=[.55,-.2];p.legB=[-.6,-.2];}}
else if(s==='grabbed'){p.lean=.28;p.armF=[.9,1.1];p.armB=[-.9,1];p.legF=[.85,-1.1];p.legB=[-.9,-.9];p.head=.25;}
else if(s==='hit'){p.lean=-.35;p.armF=[-.6,1.2];p.armB=[-1.1,1];p.head=-.3;p.legF=[.6,-.3];p.legB=[-.6,-.2];}
else if(s==='cast'||s==='super'){const ph=Math.min(1,f.st/12);p.armF=[lerp(-.5,1.5,ph),lerp(2,.1,ph)];p.armB=[lerp(-.8,1.3,ph),lerp(2,.2,ph)];p.lean=ph*.2;
const ci={1:[[.2,1.2],[.1,1.1]],2:[[2.6,0],[-2.6,.1]],3:[[1.8,.6],[-.5,1.8]],4:[[1.2,.5],[-.6,1.8]],5:[[.6,1.2],[-.6,1.3]],6:[[2.4,.3],[-.4,1.8]],7:[[1.5,.05],[1.2,.2]],8:[[1.6,.2],[-.9,1.6]],9:[[1.5,.1],[1.3,.2]],10:[[1.7,.35],[1.35,.45]],11:[[1.9,-.1],[-.4,2.1]],12:[[1.55,-.05],[-.5,1.7]]}[d.id];// 30.09: Вега — поза лучницы
if(ci){p.armF=[lerp(-.5,ci[0][0],ph),lerp(2,ci[0][1],ph)];p.armB=[lerp(-.8,ci[1][0],ph),lerp(2,ci[1][1],ph)];}}// 08.09: уникальные позы каста — Вольт руки вверх, Базальт бьёт в пол, Ржавый/Кайзер руки вперёд и т.д.
else if(s==='win'){// 08.09: уникальные позы победы — каждый боец празднует по-своему
const w0=d.id;
if(w0===0){p.armF=[2.8,.1];p.armB=[2.6,.1];p.hip+=Math.sin(t*.1)*1.2;}// Эмбер: оба кулака к небу
else if(w0===1){p.armF=[.9,1.4];p.armB=[-.9,1.3];p.head=.12;p.lean=.05;}// Гейст: руки скрещены, голова опущена
else if(w0===2){p.armF=[2.3,.2];p.armB=[-2.3,.2];p.hip+=Math.abs(Math.sin(t*.5))*1.5;}// Вольт: руки-молнии в стороны, дрожит
else if(w0===3){p.armF=[.7,1.5];p.armB=[-.7,1.5];p.hip=d.h*.4;}// Базальт: тяжёлая стойка, кулаки у груди
else if(w0===4){p.armF=[2.6,.1];p.armB=[1.2,.4];p.lean=.1;}// Фэнг: когти вверх, корпус вперёд
else if(w0===5){p.armF=[1.6,.3];p.armB=[-1.6,.3];p.lean=-.05;p.hip+=Math.sin(t*.08)*.8;}// Сахра: руки в стороны, покачивание
else if(w0===6){p.armF=[1.2,.6];p.armB=[1.05,.55];p.head=.1;}// Крио: ладони вперёд, дуновение
else if(w0===7){p.armF=[2.9,.1];p.armB=[-.5,1.8];p.hip+=Math.abs(Math.sin(t*.22))*1.6;}// Ржавый: быстрый кач кулака
else if(w0===8){p.armF=[.35,.3];p.armB=[-.35,.3];p.lean=-.06;p.head=-.08;}// Ноктюрн: руки опущены, зловеще спокоен
else if(w0===10){p.armF=[2.2,.15];p.armB=[-2.2,.15];p.lean=-.07;p.head=-.06;p.hip+=Math.sin(t*.07)*.7;}// Кармин: руки-крылья, величественный поклон
else if(w0===11){p.armF=[.6,1.5];p.armB=[-.7,2];p.lean=.06;p.head=.1;}// Аямэ: убирает клинок в ножны
else if(w0===12){p.armF=[1.9,-.3];p.armB=[-1.6,-.3];p.head=-.15;p.hip+=Math.sin(t*.06)*.9;}// Вега: стрелы к небу, парит
else{p.armF=[.9,1.2];p.armB=[-.6,1.2];p.head=-.06;p.lean=.04;}}// Кайзер: скрестил руки, надменный взгляд
else if(s==='fatal'){const ph=Math.min(1,f.st/30);p.armF=[lerp(-.5,2.6,ph),.2];p.armB=[lerp(-.7,2.2,ph),.3];p.lean=ph*.3;}
else if(s==='victim'){p.lean=.1;p.armF=[.15,.3];p.armB=[-.15,.25];p.head=.15;}
else if(s==='dizzy'){p.lean=Math.sin(t*.12)*.2;p.armF=[.2,1.2];p.armB=[-.2,1.1];p.head=Math.sin(t*.12)*.3;}
return p;}
function drawF(f,cam){if(f.hidden)return;
const d=f.def,sc=d.bulk*f.scale;
g.save();g.lineCap='round';g.translate(Math.round(f.x-cam),Math.round(f.y));
const shadowY=FL+GR-f.y;const shg=g.createRadialGradient(0,shadowY,1,0,shadowY,15*sc);shg.addColorStop(0,'rgba(0,0,0,.45)');shg.addColorStop(1,'rgba(0,0,0,0)');
g.fillStyle=shg;g.beginPath();g.ellipse(0,shadowY,15*sc,4.2,0,0,7);g.fill();
if(d.boss){g.save();g.globalCompositeOperation='lighter';const ay=-d.h*.55,ar=d.h*.9,ag=g.createRadialGradient(0,ay,2,0,ay,ar);ag.addColorStop(0,'rgba(240,200,80,.24)');ag.addColorStop(.55,'rgba(180,60,20,.1)');ag.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=ag;g.beginPath();g.arc(0,ay,ar,0,7);g.fill();g.restore();}// 25.10: аура финального босса
if(f.invis>0)g.globalAlpha=.25;
g.scale(f.face*sc,sc*f.squash);g.rotate(f.tilt*f.face);
if(f.state==='super'||f.frozen>0)g.translate(rnd(-1,1),rnd(-1,1));// 08.09: +дрожь замороженного
const p=pose(f);
const suit=f.charred?'#1c1712':(f.pale?shade(d.suit,.5):d.suit),skin=f.charred?'#241c12':(f.pale?'#d8ccc8':d.skin),dk=shade(suit,.6),ac=f.charred?'#4a4238':d.acc;
const hipY=-p.hip,shY=hipY-d.h*.3,shX=p.lean*10;
if(d.cape&&!f.charred){g.fillStyle=shade(suit,.4);g.beginPath();g.moveTo(-2,shY);g.quadraticCurveTo(-14-Math.sin(f.animT*.1)*3,shY+16,-10,hipY+14);g.lineTo(-2,shY+6);g.fill();g.fillStyle=shade(suit,.58);g.beginPath();g.moveTo(-2,shY);g.quadraticCurveTo(-9-Math.sin(f.animT*.1)*2,shY+12,-6,hipY+10);g.lineTo(-2,shY+6);g.fill();}// 30.09: освещённая подкладка плаща
const bl=limb(-1,hipY,p.legB[0],p.legB[1],d.h*.26,d.h*.24,5,dk);boot(bl,shade(suit,.35));
const ba=limb(-3+shX*.5,shY,p.armB[0],p.armB[1],d.h*.2,d.h*.18,4,dk);fist(ba,shade(skin,.7));
const tw=d.female?9:10;g.strokeStyle=OUT;g.lineWidth=tw+3;g.beginPath();g.moveTo(-1,hipY);g.lineTo(shX,shY+2);g.stroke();
const tg=g.createLinearGradient(-6,0,7,0);tg.addColorStop(0,shade(suit,.55));tg.addColorStop(.45,suit);tg.addColorStop(1,mix(suit,'#ffffff',.16));// 30.09: торс с боковым светом
g.strokeStyle=tg;g.lineWidth=tw;g.beginPath();g.moveTo(-1,hipY);g.lineTo(shX,shY+2);g.stroke();
if(!f.charred){if(d.female){g.fillStyle=shade(suit,.74);g.beginPath();g.ellipse(shX-2,shY+5,3,2,0,0,7);g.fill();g.beginPath();g.ellipse(shX+2,shY+5,3,2,0,0,7);g.fill();g.fillStyle=mix(suit,'#ffffff',.16);g.fillRect(shX-1,shY+4,2,1);g.fillStyle=shade(suit,.62);g.fillRect(shX-5,shY+10,2,5);g.fillRect(shX+3,shY+10,2,5);g.fillStyle=shade(suit,.86);g.fillRect(shX-3,shY+10,6,1);}else{g.fillStyle=shade(suit,.74);g.fillRect(shX-4,shY+5,4,2);g.fillRect(shX+1,shY+5,4,2);g.fillStyle=shade(suit,.82);g.fillRect(shX-1,shY+8,2,3);g.fillRect(shX-1,shY+11,2,1);}}// 30.09: грудные и пресс; 24.10: женский силуэт Веги
if(d.bulk>1.12){g.fillStyle=shade(suit,.75);g.fillRect(shX-7,shY-1,6,6);g.fillRect(shX+2,shY-1,6,6);g.fillStyle=ac;g.fillRect(shX-7,shY+4,6,1);g.fillRect(shX+2,shY+4,6,1);const hi2=lite(ac,.35);if(hi2){g.fillStyle=hi2;g.fillRect(shX-7,shY-1,6,1);g.fillRect(shX+2,shY-1,6,1);}}// 08.09: наплечники + 30.09: блик
g.fillStyle=d.female?ac:shade(suit,.45);g.fillRect(-5,hipY-3,10,4);
g.fillStyle=d.female?mix(ac,'#ffffff',.55):mix(ac,'#ffffff',.3);g.fillRect(-1,hipY-3,2,4);// 30.09: пряжка ремня; 24.10: пояс Веги
g.fillStyle=ac;g.fillRect(-4+shX*.5,shY+5,7,3);
g.fillStyle=shade(ac,.6);g.fillRect(-4+shX*.5,shY+7,7,1);// 08.09: кант на нагруднике
g.fillStyle=mix(ac,'#ffffff',.35);g.fillRect(-4+shX*.5,shY+5,7,1);// 30.09: блик нагрудника
if(d.dress){const dg2=g.createLinearGradient(-8,hipY,10,hipY+d.h*.4);dg2.addColorStop(0,shade(suit,.7));dg2.addColorStop(.5,suit);dg2.addColorStop(1,shade(suit,.55));// 30.09: платье только у Кармин (d.dress) — раньше рисовалось всем
g.fillStyle=dg2;g.beginPath();g.moveTo(-7,hipY+2);g.lineTo(7+shX*.5,hipY+2);g.lineTo(11+shX*.6,hipY+d.h*.36);g.lineTo(-9,hipY+d.h*.36);g.closePath();g.fill();}// 30.09: платье — расклешённая юбка с градиентом
if(d.skirt&&!f.charred){const sy=hipY-1,by=hipY+d.h*.22;const skg=g.createLinearGradient(0,sy,0,by);skg.addColorStop(0,shade(suit,.75));skg.addColorStop(1,shade(suit,.45));g.fillStyle=skg;g.beginPath();g.moveTo(-6,hipY);g.lineTo(6+shX*.4,hipY);g.lineTo(11+shX*.6,by);g.lineTo(-9,by);g.closePath();g.fill();g.fillStyle=mix(suit,'#ffffff',.12);g.fillRect(5,hipY+1,3,by-hipY-2);g.fillStyle=ac;g.fillRect(-9,by,20+shX*.6,1);g.fillStyle=shade(suit,.22);g.fillRect(-1,hipY,2,by-hipY);}// 24.10: боевая юбка Веги с боковым бликом
if(!d.skirt){g.fillStyle=ac;g.fillRect(-9,hipY+d.h*.32,20+shX*.6,1);}// алый кант подола
const fl=limb(1,hipY,p.legF[0],p.legF[1],d.h*.26,d.h*.24,5,suit);boot(fl,shade(suit,.5));
const fa=limb(2+shX,shY+2,p.armF[0],p.armF[1],d.h*.2,d.h*.18,4,skin);fist(fa,skin);
const fanOut=d.fan&&(f.state==='cast'||f.state==='super');// 30.09: веер Кармин
if(fanOut){const f0=fa;
g.fillStyle=OUT;g.beginPath();g.moveTo(f0[0],f0[1]);g.arc(f0[0],f0[1],14,-1.2,.15);g.closePath();g.fill();
const fg=g.createRadialGradient(f0[0],f0[1],2,f0[0],f0[1],13);fg.addColorStop(0,shade(suit,.6));fg.addColorStop(1,'#8a1424');
g.fillStyle=fg;g.beginPath();g.moveTo(f0[0],f0[1]);g.arc(f0[0],f0[1],12,-1.1,.05);g.closePath();g.fill();
g.strokeStyle=mix(ac,'#ffffff',.45);g.lineWidth=.7;for(let i=0;i<4;i++){const aa=-1.05+i*.31;g.beginPath();g.moveTo(f0[0],f0[1]);g.lineTo(f0[0]+Math.cos(aa)*12,f0[1]+Math.sin(aa)*12);g.stroke();}
g.fillStyle=ac;g.fillRect(f0[0]-1.5,f0[1]-1.5,3,3);g.strokeStyle='#3a2530';g.lineWidth=2;g.beginPath();g.moveTo(f0[0],f0[1]);g.lineTo(f0[0]-4,f0[1]+4);g.stroke();
}// 30.09: раскрытый веер Кармин — иглы вылетают из него// 30.09: +бледность после Алой жатвы
if(d.claws&&(f.state==='atk'||f.state==='cast')){g.fillStyle=ac;for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(fa[0],fa[1]+i*3);g.lineTo(fa[0]+7,fa[1]+i*3-1);g.lineTo(fa[0],fa[1]+i*3+2);g.fill();}g.fillStyle=mix(ac,'#ffffff',.4);g.fillRect(fa[0]+4,fa[1]-1,2,1);}// 30.09: блик когтей
if(d.blade&&(f.state==='atk'||f.state==='cast'||f.state==='dash')){const ka=fa,a1=p.armF[0],a2=p.armF[1],bx=Math.sin(a1+a2),by=Math.cos(a1+a2);g.strokeStyle=OUT;g.lineWidth=3.5;g.beginPath();g.moveTo(ka[0],ka[1]);g.lineTo(ka[0]+bx*21,ka[1]+by*21-2);g.stroke();g.strokeStyle='#c8d8e0';g.lineWidth=1.5;g.beginPath();g.moveTo(ka[0]+bx*2,ka[1]+by*2-.5);g.lineTo(ka[0]+bx*21,ka[1]+by*21-2);g.stroke();g.strokeStyle=mix('#c8d8e0','#ffffff',.5);g.lineWidth=.7;g.beginPath();g.moveTo(ka[0]+bx*3,ka[1]+by*3-1);g.lineTo(ka[0]+bx*19,ka[1]+by*19-2);g.stroke();g.fillStyle=ac;g.fillRect(ka[0]-1.5,ka[1]-1.5,3,3);g.fillStyle=OUT;g.fillRect(ka[0]-2,ka[1]+.5,4,1.5);g.strokeStyle='#5a4a3a';g.lineWidth=2;g.beginPath();g.moveTo(ka[0]-bx*5,ka[1]-by*5+1);g.lineTo(ka[0]-bx,ka[1]-by+1);g.stroke();}// 30.09: катана Аямэ следует за рукой — замах и удар читаются
else if(d.blade){g.strokeStyle=OUT;g.lineWidth=3;g.beginPath();g.moveTo(-8,shY+7);g.lineTo(-2,shY+19);g.stroke();g.strokeStyle=shade(suit,.5);g.lineWidth=1.8;g.beginPath();g.moveTo(-8,shY+7);g.lineTo(-2,shY+19);g.stroke();g.fillStyle=ac;g.fillRect(-9.5,shY+5,3,3);}// 30.09: ножны на спине в спокойных состояниях — меч берётся оттуда
if(d.bow&&f.state==='cast'){const b0=fa;
g.strokeStyle=OUT;g.lineWidth=3;g.beginPath();g.arc(b0[0]+3,b0[1],11,-1.25,1.25);g.stroke();
g.strokeStyle=ac;g.lineWidth=1.8;g.beginPath();g.arc(b0[0]+3,b0[1],11,-1.25,1.25);g.stroke();
g.strokeStyle='#e8e8ff';g.lineWidth=.7;g.beginPath();g.moveTo(b0[0]+3+Math.cos(-1.25)*11,b0[1]+Math.sin(-1.25)*11);g.lineTo(b0[0]+3+Math.cos(1.25)*11,b0[1]+Math.sin(1.25)*11);g.stroke();
g.strokeStyle='#e8e8ff';g.lineWidth=1;g.beginPath();g.moveTo(b0[0]-2,b0[1]);g.lineTo(b0[0]+13,b0[1]);g.stroke();
g.strokeStyle=OUT;g.lineWidth=2.5;g.beginPath();g.moveTo(b0[0]-2,b0[1]);g.lineTo(b0[0]+13,b0[1]);g.stroke();
g.fillStyle=ac;g.beginPath();g.moveTo(b0[0]+16,b0[1]);g.lineTo(b0[0]+11,b0[1]-2);g.lineTo(b0[0]+11,b0[1]+2);g.fill();
g.strokeStyle=ac;g.lineWidth=1.2;g.beginPath();g.moveTo(b0[0]+3,b0[1]-4);g.lineTo(b0[0]+3,b0[1]+4);g.stroke();
g.strokeStyle=shade(suit,.5);g.lineWidth=1.8;g.beginPath();g.moveTo(b0[0]-6,b0[1]+2);g.lineTo(b0[0]+2,b0[1]+8);g.stroke();
g.strokeStyle=OUT;g.lineWidth=3;g.beginPath();g.moveTo(b0[0]-6,b0[1]+2);g.lineTo(b0[0]+2,b0[1]+8);g.stroke();
}// 30.09: лук из лунного кристалла — дуга, тетива, звёздная стрела
const hx=shX+p.lean*6,hy=shY-8+p.head*8;
g.fillStyle=OUT;g.fillRect(hx-6,hy-11,13,16);
g.fillStyle=skin;g.fillRect(hx-5,hy-9,11,13);
if(d.female){g.fillStyle=shade(skin,.9);g.fillRect(hx-4,hy+3,9,1);}else{g.fillStyle=shade(skin,.82);g.fillRect(hx-5,hy+1,11,3);}// 24.10: без широкой тени челюсти у Веги
g.fillStyle=shade(skin,.7);g.fillRect(hx-6,hy-4,2,3);// ухо
if(d.female){g.fillStyle=ac;g.fillRect(hx-7,hy-1,1,2);}// 24.10: серьга Веги
if(d.longhair&&!f.charred&&!f.pale){g.fillStyle=OUT;g.fillRect(hx-9,hy-9,4,22);g.fillRect(hx+6,hy-9,4,22);g.fillStyle=d.hair;g.fillRect(hx-8,hy-8,3,20);g.fillRect(hx+6,hy-8,3,20);g.fillStyle=mix(d.hair,'#ffffff',.3);g.fillRect(hx-8,hy-8,3,1);g.fillRect(hx+6,hy-8,3,1);g.fillStyle=shade(d.hair,.75);g.fillRect(hx-8,hy+6,3,4);g.fillRect(hx+6,hy+6,3,4);}// 30.09: длинные волосы до лопаток с бликом
if(d.ponytail&&!f.charred&&!f.pale){const sw=Math.sin(f.animT*.08)*2;g.fillStyle=OUT;g.beginPath();g.moveTo(hx-6,hy-8);g.quadraticCurveTo(hx-11,hy-10+sw,hx-13,hy-2+sw);g.quadraticCurveTo(hx-15,hy+7+sw,hx-15,hy+18+sw);g.lineTo(hx-12,hy+17+sw);g.quadraticCurveTo(hx-11,hy+7+sw,hx-10,hy+sw);g.quadraticCurveTo(hx-9,hy-5+sw,hx-4,hy-6);g.closePath();g.fill();g.fillStyle=d.hair;g.beginPath();g.moveTo(hx-5,hy-7);g.quadraticCurveTo(hx-10,hy-8+sw,hx-12,hy-2+sw);g.quadraticCurveTo(hx-13,hy+7+sw,hx-13,hy+16+sw);g.lineTo(hx-12,hy+15+sw);g.quadraticCurveTo(hx-11,hy+6+sw,hx-10,hy+sw);g.quadraticCurveTo(hx-9,hy-4+sw,hx-4,hy-5);g.closePath();g.fill();g.strokeStyle=shade(d.hair,.78);g.lineWidth=.8;for(const q of[[-11,-2],[-12,3],[-13,8],[-13,13]]){g.beginPath();g.moveTo(hx+q[0]-1,hy+q[1]+sw*.4);g.lineTo(hx+q[0]+1,hy+q[1]+1+sw*.4);g.stroke();}g.strokeStyle=mix(d.hair,'#ffffff',.45);g.lineWidth=.7;g.beginPath();g.moveTo(hx-6,hy-7);g.quadraticCurveTo(hx-11,hy-9+sw,hx-13,hy-2+sw);g.quadraticCurveTo(hx-14,hy+7+sw,hx-14,hy+15+sw);g.stroke();g.fillStyle=ac;g.fillRect(hx-8,hy-9,2,5);g.beginPath();g.moveTo(hx-8,hy-7);g.lineTo(hx-12,hy-5+sw);g.lineTo(hx-9,hy-3);g.fill();g.fillStyle=ac;g.fillRect(hx-14,hy+16+sw,2,2);}// 24.10: длинный хвост с лентой и прядями
const expr=(f.state==='hit'||f.state==='victim'||f.state==='grabbed')?1:f.state==='dizzy'?2:0;// 30.09: выражение лица
if(expr===0){g.fillStyle='#f0e8e0';g.fillRect(hx+2,hy-5,3,2);g.fillStyle='#141414';g.fillRect(d.female?hx+4:hx+3,hy-5,d.female?1:2,2);if(d.female){g.fillStyle='#141414';g.fillRect(hx+4,hy-6,1,1);}}
else if(expr===1){g.fillStyle='#141414';g.fillRect(hx+2,hy-4,3,1);}// зажмурен
else{g.fillStyle='#141414';g.fillRect(hx+2,hy-5,1,2);g.fillRect(hx+4,hy-5,1,2);}// крестит
g.fillStyle=shade(skin,.72);g.fillRect(hx+2,expr===2||d.female?hy-7:hy-6,d.female?3:4,1);// бровь
if(d.female){g.fillStyle=shade(skin,.6);g.fillRect(hx-1,hy-5,1,2);g.fillStyle='#a85060';g.fillRect(hx,hy-1,2,1);}// 24.10: нос и губы
drawGear(f,hx,hy);
if(f.flash>0){g.globalAlpha=.12;g.fillStyle='#fff';g.beginPath();g.ellipse(0,-d.h*.5,12,d.h*.42,0,0,7);g.fill();g.globalAlpha=1;}
g.restore();
if(f.frozen>0){const b=f.box;g.fillStyle='rgba(120,190,240,.45)';g.fillRect(b.x-cam,b.y-2,b.w,b.h+4);g.fillStyle='rgba(225,245,255,.85)';for(let i=0;i<3;i++){const sx=b.x-cam+3+i*(b.w-6)/2;g.beginPath();g.moveTo(sx-3,b.y-2);g.lineTo(sx,b.y-8-(i*7%5));g.lineTo(sx+3,b.y-2);g.fill();}}
if(f.netT>0){g.strokeStyle='#c8c8a0';g.lineWidth=1;const b=f.box;for(let i=0;i<4;i++)g.strokeRect(b.x-cam+2+i*3,b.y+i*4,b.w-4-i*6,4);}
if(f.state==='dizzy'){for(let i=0;i<3;i++){const a=f.animT*.15+i*2.09;g.fillStyle='#f8d060';g.fillRect(f.x-cam+Math.cos(a)*12-1,f.y-d.h-8+Math.sin(a)*3,3,3);}}}
function drawGear(f,hx,hy){const d=f.def,ac=d.acc;
if(f.charred){g.fillStyle='#e8e0d0';g.fillRect(hx-1,hy-4,2,2);return;}
if(d.gear==='mask'){g.fillStyle=OUT;g.fillRect(hx-5,hy-7,11,5);g.fillStyle=ac;g.fillRect(hx-4,hy-6,9,4);g.fillStyle=shade(ac,.5);g.fillRect(hx-5,hy-7,2,8);g.fillRect(hx+4,hy-7,2,8);g.fillStyle='#141414';g.fillRect(hx+1,hy-5,2,2);g.fillStyle=mix(ac,'#ffffff',.45);g.fillRect(hx-3,hy-6,7,1);g.fillStyle=shade(ac,.75);g.fillRect(hx-4,hy-3,9,1);}// 30.09: блик и тень маски
else if(d.gear==='helm'){g.fillStyle=OUT;g.fillRect(hx-6,hy-10,12,7);g.fillStyle=ac;g.fillRect(hx-5,hy-10,11,6);g.fillStyle='#222';g.fillRect(hx-3,hy-5,8,3);g.fillStyle=ac;g.fillRect(hx-1,hy-13,2,4);g.fillStyle=mix(ac,'#ffffff',.4);g.fillRect(hx-5,hy-10,11,1);g.fillStyle=(S.FRAME%40<20)?'#e04020':'#601414';g.fillRect(hx-1,hy-14,2,1);g.fillStyle=shade(ac,.6);g.fillRect(hx-6,hy-6,2,3);g.fillRect(hx+5,hy-6,2,3);}// 30.09: блик, маячок антенны, щитки
else if(d.gear==='hood'){g.fillStyle=OUT;g.beginPath();g.moveTo(hx-7,hy+3);g.lineTo(hx-5,hy-10);g.lineTo(hx+6,hy-9);g.lineTo(hx+7,hy+3);g.fill();const hg2=g.createLinearGradient(hx-6,0,hx+6,0);hg2.addColorStop(0,shade(d.suit,.5));hg2.addColorStop(.6,shade(d.suit,.7));hg2.addColorStop(1,shade(d.suit,.9));g.fillStyle=hg2;g.beginPath();g.moveTo(hx-6,hy+2);g.lineTo(hx-4,hy-9);g.lineTo(hx+5,hy-8);g.lineTo(hx+6,hy+2);g.fill();g.fillStyle='#000';g.fillRect(hx-2,hy-5,6,4);const ec=d.id===8?'#c060e0':'#e04040';g.fillStyle=ec;g.fillRect(hx-1,hy-4,2,1);g.fillRect(hx+2,hy-4,2,1);g.globalAlpha=.5;g.fillRect(hx-2,hy-5,6,1);g.globalAlpha=1;}// 30.09: градиент капюшона, светящиеся глаза-пары
else if(d.gear==='horn'){g.fillStyle='#8a7a5c';g.beginPath();g.moveTo(hx-4,hy-8);g.lineTo(hx-8,hy-14);g.lineTo(hx-2,hy-9);g.fill();g.beginPath();g.moveTo(hx+5,hy-8);g.lineTo(hx+9,hy-14);g.lineTo(hx+3,hy-9);g.fill();g.fillStyle='#a89878';g.beginPath();g.moveTo(hx-5,hy-9);g.lineTo(hx-8,hy-14);g.lineTo(hx-3,hy-10);g.fill();g.beginPath();g.moveTo(hx+4,hy-9);g.lineTo(hx+8,hy-14);g.lineTo(hx+4,hy-10);g.fill();g.fillStyle='#141414';g.fillRect(hx-1,hy-5,3,2);}// 30.09: рога с светлыми гранями
else if(d.gear==='visor'){g.fillStyle=OUT;g.fillRect(hx-6,hy-10,12,8);g.fillStyle='#5a6450';g.fillRect(hx-5,hy-10,11,8);g.fillStyle=S.FRAME%14<7?ac:shade(ac,.5);g.fillRect(hx-4,hy-7,9,2);g.fillStyle='rgba(255,255,255,.3)';g.fillRect(hx-4,hy-7+((S.FRAME>>3)%2),9,1);g.fillStyle=shade('#5a6450',.7);g.fillRect(hx-5,hy-4,11,2);}// 30.09: бегущая строка визора
else if(d.gear==='band'){g.fillStyle=ac;g.fillRect(hx-5,hy-7,11,4);g.fillStyle=mix(ac,'#ffffff',.35);g.fillRect(hx-5,hy-7,11,1);g.fillStyle=shade(ac,.5);g.fillRect(hx+5,hy-7,3,7+Math.sin(f.animT*.15)*2);g.fillStyle='#141414';g.fillRect(hx-1,hy-5,3,2);g.fillStyle=shade(d.skin,.75);g.fillRect(hx+1,hy-4,1,3);g.fillStyle=shade(d.skin,.85);g.fillRect(hx+3,hy-3,1,2);}// 30.09: блик повязки, шрам
else if(d.gear==='halo'){const hb=Math.sin(f.animT*.07)*1.5;
g.save();g.translate(hx+1,hy-17+hb);g.rotate(f.animT*.04);
g.fillStyle=OUT;g.fillRect(-4.5,-4.5,9,9);g.fillStyle=ac;g.fillRect(-3.5,-3.5,7,7);g.fillStyle='#e8e8ff';g.fillRect(-1.5,-1.5,3,3);g.restore();
g.fillStyle=ac;g.fillRect(hx-1,hy-9,2,2);
if(!d.female){g.fillStyle='#141414';g.fillRect(hx-1,hy-5,3,2);g.fillStyle=shade(d.skin,.85);g.fillRect(hx-1,hy-3,3,1);}
g.fillStyle=d.hair;g.fillRect(hx-6,hy-11,12,5);g.fillStyle=mix(d.hair,'#ffffff',.3);g.fillRect(hx-6,hy-11,12,1);
if(d.female){g.fillStyle=shade(d.hair,.82);g.beginPath();g.moveTo(hx+3,hy-11);g.lineTo(hx+6,hy-11);g.lineTo(hx+6,hy-7);g.lineTo(hx+2,hy-8);g.fill();g.fillStyle=mix(d.hair,'#ffffff',.45);g.fillRect(hx+4,hy-10,1,2);g.fillStyle=shade(d.hair,.8);g.fillRect(hx-1,hy-11,1,3);}
}// 30.09: парящий нимб-звезда
else if(d.gear==='tail'){g.fillStyle=d.hair;g.fillRect(hx-6,hy-11,12,5);g.fillRect(hx-7,hy-8,14,3);g.fillStyle=mix(d.hair,'#ffffff',.25);g.fillRect(hx-6,hy-11,12,1);const sw=Math.sin(f.animT*.12)*3;g.strokeStyle=OUT;g.lineWidth=5;g.beginPath();g.moveTo(hx-6,hy-9);g.quadraticCurveTo(hx-14,hy-6+sw*.4,hx-17,hy+2+sw);g.stroke();g.strokeStyle=d.hair;g.lineWidth=3.5;g.beginPath();g.moveTo(hx-6,hy-9);g.quadraticCurveTo(hx-14,hy-6+sw*.4,hx-17,hy+2+sw);g.stroke();g.fillStyle=ac;g.fillRect(hx-8,hy-10,2,6);g.fillStyle='#141414';g.fillRect(hx-1,hy-5,3,2);g.fillStyle=shade(d.skin,.85);g.fillRect(hx-1,hy-3,3,1);}// 30.09: хвост синоби с качанием и алой подвязкой
else if(d.gear==='corona'){g.fillStyle=OUT;g.fillRect(hx-7,hy-11,14,4);g.fillStyle=ac;g.fillRect(hx-6,hy-10,12,2);for(let i=0;i<3;i++){g.beginPath();g.moveTo(hx-5+i*5,hy-10);g.lineTo(hx-2.5+i*5,hy-15);g.lineTo(hx+i*5,hy-10);g.fill();}g.fillStyle=mix(ac,'#ffffff',.45);g.fillRect(hx-6,hy-10,12,1);g.fillStyle='#f0d8d0';g.fillRect(hx-1,hy-11,2,1);g.fillStyle='#141414';g.fillRect(hx-1,hy-5,3,2);g.fillStyle=shade(d.skin,.75);g.fillRect(hx-6,hy-2,2,4);}// 30.09: корона Кармин + родинка
else{if(d.id===0){for(let i=0;i<3;i++){const fx2=hx-3+i*3,hg=4+Math.sin(S.FRAME*.3+i*2)*2;g.fillStyle='#f06020';g.beginPath();g.moveTo(fx2-1,hy-8);g.lineTo(fx2+1,hy-9-hg);g.lineTo(fx2+3,hy-8);g.fill();g.fillStyle='#f8d060';g.beginPath();g.moveTo(fx2,hy-8);g.lineTo(fx2+1,hy-8-hg*.5);g.lineTo(fx2+2,hy-8);g.fill();}}
else{g.fillStyle=OUT;g.fillRect(hx-6,hy-11,12,5);g.fillStyle=d.hair;g.fillRect(hx-5,hy-11,11,4);g.fillRect(hx-5,hy-8,3,5);g.fillStyle=mix(d.hair,'#ffffff',.22);g.fillRect(hx-5,hy-11,11,1);g.fillRect(hx-5,hy-8,1,4);}// 30.09: блик волос
g.fillStyle='#141414';g.fillRect(hx-1,hy-6,3,2);g.fillStyle=shade(d.skin,.85);g.fillRect(hx-1,hy-3,3,1);}}// 30.09: нос
function portraitTop(d){return d.gear==='halo'?-25:(d.gear==='horn'||d.gear==='corona')?-19:-15;}
function drawPort(d,x,y,s){g.save();g.lineCap='round';g.translate(x,y);g.scale(s,s);
const top=portraitTop(d),ph=15-top;
const bg2=g.createLinearGradient(0,top,0,15);bg2.addColorStop(0,shade(d.suit,.45));bg2.addColorStop(1,'#0c0a08');// 30.09: фон в цвете бойца
g.fillStyle=bg2;g.fillRect(-12,top,24,ph);
g.strokeStyle='#c8a040';g.lineWidth=1;g.strokeRect(-11.5,top+.5,23,ph-1);
g.fillStyle=OUT;g.fillRect(-4,3,8,13);g.fillStyle=shade(d.skin,.7);g.fillRect(-3,4,6,12);// шея
g.fillStyle=OUT;g.beginPath();g.moveTo(-11,15);g.lineTo(-8,1);g.lineTo(8,1);g.lineTo(11,15);g.closePath();g.fill();
const tg2=g.createLinearGradient(-8,0,8,0);tg2.addColorStop(0,shade(d.suit,.55));tg2.addColorStop(.5,d.suit);tg2.addColorStop(1,shade(d.suit,.85));
g.fillStyle=tg2;g.beginPath();g.moveTo(-10,15);g.lineTo(-7,2);g.lineTo(7,2);g.lineTo(10,15);g.closePath();g.fill();// торс с светом
g.fillStyle=d.acc;g.fillRect(-4,5,8,2);g.fillStyle=shade(d.acc,.6);g.fillRect(-4,6,8,1);// воротник
g.fillStyle=mix(d.acc,'#ffffff',.4);g.fillRect(-1,9,2,2);// эмблема
if(d.ponytail){const sw=Math.sin(S.FRAME*.06)*1;g.strokeStyle=OUT;g.lineWidth=3.5;g.beginPath();g.moveTo(-5,-9);g.quadraticCurveTo(-10,-7+sw,-11,8+sw);g.stroke();g.strokeStyle=d.hair;g.lineWidth=2;g.beginPath();g.moveTo(-5,-9);g.quadraticCurveTo(-10,-7+sw,-11,8+sw);g.stroke();g.strokeStyle=mix(d.hair,'#ffffff',.4);g.lineWidth=.7;g.beginPath();g.moveTo(-6,-9);g.quadraticCurveTo(-10,-7+sw,-10,7+sw);g.stroke();g.fillStyle=d.acc;g.fillRect(-7,-10,2,4);}// 24.10: хвост в портрете
if(d.longhair){g.fillStyle=OUT;g.fillRect(-9,-11,3,17);g.fillRect(6,-11,3,17);g.fillStyle=d.hair;g.fillRect(-8,-10,2,15);g.fillRect(6,-10,2,15);g.fillStyle=mix(d.hair,'#ffffff',.3);g.fillRect(-8,-10,2,1);g.fillRect(6,-10,2,1);}// 24.10: длинные волосы в портрете
g.fillStyle=OUT;g.fillRect(-6,-12,12,17);g.fillStyle=d.skin;g.fillRect(-5,-11,10,15);
if(d.female){g.fillStyle=shade(d.skin,.9);g.fillRect(-4,1,9,1);g.fillStyle=d.acc;g.fillRect(-7,-2,1,2);}else{g.fillStyle=shade(d.skin,.82);g.fillRect(-5,-1,10,4);}// 24.10: у Веги мягкая линия подбородка и серьга
g.fillStyle='#f0e8e0';g.fillRect(0,-7,3,2);g.fillStyle='#141414';g.fillRect(d.female?2:1,-7,d.female?1:2,2);// глаз
if(d.female){g.fillStyle='#141414';g.fillRect(2,-8,1,1);g.fillStyle=shade(d.skin,.6);g.fillRect(0,-5,1,1);g.fillStyle='#a85060';g.fillRect(0,-2,2,1);}// 24.10: ресницы, нос и губы
g.fillStyle=shade(d.skin,.72);g.fillRect(0,d.female?-9:-8,4,1);// бровь
drawGear({def:d,animT:0,charred:0},0,-3);g.restore();}
const FAKES=CH.map(d=>({def:d,x:0,y:FL+GR,face:1,animT:0,state:'idle',st:0,atk:null,tilt:0,squash:1,scale:1,invis:0,frozen:0,netT:0,charred:0,hidden:0,flash:0,hp:100}));
function drawFake(i,px,py,sc,face){const fk=typeof i==='object'?Object.assign({},FAKES[i.id]||FAKES[0],{def:i}):FAKES[i];fk.animT=S.FRAME;fk.face=face;g.save();g.translate(px,py);g.scale(sc,sc);g.translate(-fk.x,-fk.y);drawF(fk,0);g.restore();}// 25.10: рисует и отдельный def босса
/* HUD */
function drawHUD(b){const p1=b.p1,p2=b.p2;// 30.09: модернизированный HUD — градиентная панель, свечение, акценты цвета бойца
const pg=g.createLinearGradient(0,6,0,40);pg.addColorStop(0,'rgba(28,22,14,.96)');pg.addColorStop(.5,'rgba(12,9,6,.96)');pg.addColorStop(1,'rgba(5,4,3,.96)');
g.fillStyle=pg;g.fillRect(6,6,RW-12,34);frame(6,6,RW-12,34);
g.fillStyle='rgba(248,220,140,.28)';g.fillRect(7,7,RW-14,1);// световая кромка
const bar=(f,x,dir)=>{const w=150,d=f.def;
g.fillStyle='#1a0505';g.fillRect(x-1,12,w+2,10);
g.strokeStyle='rgba(200,160,64,.5)';g.lineWidth=1;g.strokeRect(x-.5,12.5,w+1,9);// тонкая золотая рамка бара
const hw=w*f.hp/100,lw=w*(f.hpLag===undefined?100:f.hpLag)/100;
g.fillStyle='#f8f0e0';g.fillRect(dir>0?x:x+w-lw,13,lw,8);// отстающий белый бар урона
const low=f.hp<=30,hpg=g.createLinearGradient(0,13,0,21);
hpg.addColorStop(0,low?'#f87850':'#f8dc70');hpg.addColorStop(.45,low?'#e04020':'#e8c040');hpg.addColorStop(1,low?'#7a1008':'#a87818');
g.fillStyle=hpg;g.fillRect(dir>0?x:x+w-hw,13,hw,8);// HP с градиентом
g.fillStyle='rgba(255,255,255,.45)';g.fillRect(dir>0?x:x+w-hw,13,hw,1);g.fillStyle='rgba(0,0,0,.28)';g.fillRect(dir>0?x:x+w-hw,19,hw,2);
if(f.flash>0){g.fillStyle='#fff';g.fillRect(dir>0?x:x+w-hw,13,hw,3);}
g.fillStyle='rgba(0,0,0,.3)';for(let i=1;i<10;i++)g.fillRect(x+i*15,13,1,8);
g.fillStyle=d.acc;g.fillRect(dir>0?x-1:x+w-1,12,2,10);// акцент стихии на внешнем краю
g.font='8px "Russo One"';g.textAlign=dir>0?'left':'right';const nw=g.measureText(f.def.name).width;
g.fillStyle='rgba(0,0,0,.6)';g.fillRect(dir>0?x-2:x+w-nw-6,25,nw+8,10);
g.fillStyle=d.acc;g.fillRect(dir>0?x-2:x+w-nw-6,25,2,10);// элементный штрих плашки имени
g.fillStyle='#f0e8d0';g.fillText(f.def.name,dir>0?x+2:x+w-2,33);
g.fillStyle='#2a0a0a';g.fillRect(x,40,w,3);
g.fillStyle=f.rage>=100?(blink()?'#ff7050':'#c02010'):'#8a2018';g.fillRect(dir>0?x:x+w-w*f.rage/100,40,w*f.rage/100,3);
if(f.rage>=100){g.fillStyle='rgba(255,96,64,.35)';g.fillRect(dir>0?x:x+w-w,40,w,3);}// свечение полной ярости
g.fillStyle='#3a3418';g.fillRect(x,44,w,2);g.fillStyle='#c8b040';g.fillRect(dir>0?x:x+w-w*f.run/100,44,w*f.run/100,2);
if(f.rage>=100&&blink()){g.fillStyle='#ff5030';g.font='7px "Russo One"';g.fillText('СУПЕР ГОТОВ',dir>0?x+2:x+w-2,52);}};
bar(p1,40,1);bar(p2,RW-190,-1);
drawPort(p1.def,24,26.5,.8);drawPort(p2.def,RW-24,26.5,.8);
const pt1=portraitTop(p1.def),pt2=portraitTop(p2.def);// рамки портретов в цвете стихии, с запасом под рога/нимб/корону
g.strokeStyle=p1.def.acc;g.lineWidth=1;g.strokeRect(14.5,26+pt1*.8,19,(15-pt1)*.8+1);g.strokeStyle=p2.def.acc;g.strokeRect(RW-33.5,26+pt2*.8,19,(15-pt2)*.8+1);
g.fillStyle='rgba(0,0,0,.78)';g.fillRect(RW/2-18,7,36,22);frame(RW/2-18,7,36,22);
if(b.timer<11){g.strokeStyle=blink()?'#ff5030':'#801818';g.lineWidth=1;g.strokeRect(RW/2-17.5,7.5,35,21);}// таймер краснеет в конце
g.font='15px "Russo One"';g.fillStyle=(b.timer<11&&blink())?'#ff5030':'#f0e8d0';g.textAlign='center';g.fillText(''+Math.ceil(b.timer),RW/2,23);
const pip=(x,y,on)=>{g.fillStyle=on?'#e04020':'#2a2522';g.beginPath();g.moveTo(x+3,y);g.lineTo(x+6,y+3);g.lineTo(x+3,y+6);g.lineTo(x,y+3);g.closePath();g.fill();if(on){g.fillStyle='rgba(255,140,110,.6)';g.fillRect(x+2,y+2,2,2);}};// ромбовидные пипсы побед
for(let i=0;i<2;i++){pip(RW/2-45-i*9,10,i<p1.wins);pip(RW/2+39+i*9,10,i<p2.wins);}}
function bigText(t,y,col,sc){g.save();g.translate(RW/2,y);g.scale(sc,sc);g.font='20px "Rubik Mono One","Russo One",sans-serif';g.textAlign='center';g.fillStyle='#000';for(let dx=-2;dx<=2;dx+=2)for(let dy=-2;dy<=2;dy+=2)g.fillText(t,dx,dy);g.fillStyle=col;g.fillText(t,0,0);g.restore();}// 08.09: заголовочный шрифт Rubik Mono One
function frame(x,y,w,h,key='panel'){const p=UI[key];if(p&&p.ready){const sm=p.slice||12,dm=Math.min(sm,Math.max(2,Math.floor(Math.min(w,h)/2))),iw=p.image.width,ih=p.image.height,cw=iw-sm*2,ch=ih-sm*2;g.save();g.imageSmoothingEnabled=false;g.drawImage(p.image,0,0,sm,sm,x,y,dm,dm);g.drawImage(p.image,iw-sm,0,sm,sm,x+w-dm,y,dm,dm);g.drawImage(p.image,0,ih-sm,sm,sm,x,y+h-dm,dm,dm);g.drawImage(p.image,iw-sm,ih-sm,sm,sm,x+w-dm,y+h-dm,dm,dm);g.drawImage(p.image,sm,0,cw,sm,x+dm,y,w-dm*2,dm);g.drawImage(p.image,sm,ih-sm,cw,sm,x+dm,y+h-dm,w-dm*2,dm);g.drawImage(p.image,0,sm,sm,ch,x,y+dm,dm,h-dm*2);g.drawImage(p.image,iw-sm,sm,sm,ch,x+w-dm,y+dm,dm,h-dm*2);g.restore();return true;}g.strokeStyle='#c8a040';g.lineWidth=1;g.strokeRect(x+.5,y+.5,w-1,h-1);g.fillStyle='#c8a040';g.fillRect(x,y,3,3);g.fillRect(x+w-3,y,3,3);g.fillRect(x,y+h-3,3,3);g.fillRect(x+w-3,y+h-3,3,3);return false;}
function panel(x,y,w,h){g.fillStyle='rgba(10,8,6,.93)';g.fillRect(x,y,w,h);frame(x,y,w,h);}
const seqTxt=(s,p2,face=1)=>s.split('').map(x=>{if(face<0&&x==='L')x='R';else if(face<0&&x==='R')x='L';return ({D:'\u2193',U:'\u2191',L:'\u2190',R:'\u2192',P:p2?'I':'J',K:p2?'O':'K'})[x];}).join(' ');
/* ИИ */
const RANGED=[0,2,3,6,7,8,9,10,12];// 30.09: +Кармин, +Вега
function aiUpd(f,foe,lvl){const c=f.ctrl;c.ax={};
if(['down','hit','frozen','net','super','cast','victim','dizzy','fatal','getup','win','grabbed'].includes(f.state))return;// 08.09: +win — ИИ в позе победы не должен действовать
if(f.aiDir)c.ax[f.aiDir]=true;
if(foe.invis>0&&Math.random()<.3){f.aiDir=null;c.ax.B=true;return;}// 08.09: ИИ осторожничает против невидимого
const dx=foe.x-f.x,ad=Math.abs(dx),react=Math.max(5,26-lvl*2.4);
if(f.state==='jump'){if(ad<90&&Math.random()<.4)c.ax.K=true;return;}// 08.09: ИИ бьёт в прыжке
const agg=.3+lvl*.055,blk=.16+lvl*.06;
const danger=S.projs.some(p=>p.o===foe&&((p.vx&&Math.abs(p.x-f.x)<95&&Math.sign(p.vx)===Math.sign(f.x-p.x))||((p.ty==='meteor'||p.ty==='rocket'||p.ty==='bolt')&&Math.abs(p.x-f.x)<40&&p.y<FL-20)));// 08.09: ИИ не реагировал на вертикальные снаряды (болты, метеоры)
if(danger&&Math.random()<.55+lvl*.04){f.aiDir=null;if(Math.random()<.4&&ad>50)c.ax.u=true;else c.ax.B=true;return;}
if(f.running&&Math.random()<.12+lvl*.02&&ad<120){c.ax.B=true;return;}// 30.09: ИИ в беге иногда делает рывок// 08.09: иногда перепрыгивает снаряд
if(S.FRAME%Math.max(3,react|0)!==0)return;// 08.09: реакция ИИ по интервалу сложности — но увороты и прыжки каждый кадр
if(foe.state==='atk'&&ad<62){if(Math.random()<blk){f.aiDir=null;c.ax.B=true;return;}// 08.09: блок или контр-roundhouse
if(ad<52&&Math.random()<.08+lvl*.02){f.aiDir=null;c.ax[dx>0?'l':'r']=true;c.ax.K=true;return;}}
if(foe.state==='hit'&&ad<50&&Math.random()<.45+lvl*.04){f.aiDir=null;c.ax.P=true;return;}// 08.09: ИИ добивает в стан — комбо
if((foe.state==='frozen'||foe.state==='net')&&ad<74){f.aiDir=null;if(ad>30)c.ax[dx>0?'r':'l']=true;c.ax.P=true;return;}
if(f.rage>=100&&['idle','walk'].includes(f.state)&&Math.random()<.5){f.startSuper();f.aiDir=null;return;}
if(['idle','walk'].includes(f.state)&&Math.random()<.13+lvl*.02){const far=RANGED.includes(f.def.id);if((far&&ad>110)||(!far&&ad<70)){f.startSpec(foe);f.aiDir=null;return;}}
if(['idle','walk'].includes(f.state)&&Math.random()<.05+lvl*.008&&(RANGED.includes(f.def.id)?ad>90:ad>60)){f.startSpec2(foe);f.aiDir=null;return;}// 08.09: ИИ иногда применяет второй спец (дальникам — издали, ближникам — со средней дистанции)
if(ad>120){f.aiDir=dx>0?'r':'l';if(Math.random()<.08)f.aiDir=null;return;}
if(ad>56){if(Math.random()<.05+lvl*.012){c.ax.u=true;f.aiDir=dx>0?'r':'l';return;}// 08.09: прыжок-вближение
f.aiDir=Math.random()<.8?(dx>0?'r':'l'):null;return;}
if(Math.random()<agg){f.aiDir=null;const pk=Math.random();if(pk<.07){c.ax.P=true;c.ax.K=true;}else if(pk<.3)c.ax.P=true;else if(pk<.58)c.ax.K=true;else if(pk<.75){c.ax.d=true;c.ax.P=true;}else{c.ax.d=true;c.ax.K=true;}return;}
if(Math.random()<.28){f.aiDir=null;c.ax.B=true;return;}
f.aiDir=Math.random()<.6?(dx>0?'r':'l'):null;}
/* БОЙ */
function toLobby(gm){setScreen(S,gm);}
function newBattleDefs(d1,c1,d2,c2,arena){S.battle={p1:new F(d1,c1),p2:new F(d2,c2),round:1,phase:'intro',phaseT:0,timer:60,arena};
S.battle.p1.foe=S.battle.p2;S.battle.p2.foe=S.battle.p1;beginBattle(S,S.battle,{h1:0,d1:0,c1:0,h2:0,d2:0,c2:0});// 08.09: сброс статистики
startRound();S.GAME='fight';}// 08.09: newBattle теперь расставляет бойцов через startRound — раньше оба спавнились в одной точке x=200
function newBattle(i1,c1,i2,c2,arena){newBattleDefs(typeof i1==='object'?i1:CH[i1],c1,typeof i2==='object'?i2:CH[i2],c2,arena);}// 25.10: бой принимает и def-объект финального босса
function arcOpponent(step){if(step<S.ladder.length){const id=S.ladder[step];return{def:CH[id],arena:CH[id].arena};}return{def:BOSS,arena:BOSS.arena};}// 25.10: после 11 обычных противников — отдельный босс
function arcFight(){if(!S.ladder.length)return;const o=arcOpponent(S.lStep);newBattleDefs(CH[S.arcP1],new Ctrl(KM1),o.def,new Ctrl(KM2),o.arena);S.battle.mode='arcade';S.battle.p2.ctrl.ai=true;S.battle.aiLvl=S.lStep>=S.ladder.length?7:Math.min(7,S.lStep);S.GAME='vs';S.vsT=0;S.vsEscT=0;saveArcRun();if(S.lStep>=S.ladder.length)say('Final boss');}// 25.10: единый запуск боя аркады + автосохранение
function startRound(){const b=S.battle;resetRound(S,OPT.reduce?0:24);b.p1.reset(180,1);b.p2.reset(AW-180,-1);b.phase='intro';b.phaseT=0;b.timer=60;// 08.09: бойцы по краям видимой области (180/580, дистанция 400) — раньше кучковались у центра
b.p1.rage=Math.floor(b.p1.rage*.5);b.p2.rage=Math.floor(b.p2.rage*.5);// 08.09: ярость переносится наполовину — без мгновенного супера
S.announce={txt:'РАУНД '+b.round,t:0,col:'#e8c040'};say('Round '+['one','two','three'][Math.min(2,b.round-1)]);}
function endBattle(w){S.battle.phase='over';S.battle.phaseT=0;S.battle.winner=w;w.state='win';w.st=0;w.atk=null;if(S.battle.loser)S.battle.loser.defeated=1;S.projs.length=0;
S.announce={txt:w.def.name+' ?????????',t:0,col:'#e8c040'};say(w.def.en+' wins');SFX.win();}
function startFatal(w,l){S.projs.length=0;S.battle.phase='fatal';S.battle.phaseT=0;w.state='fatal';w.st=0;w.face=l.x<w.x?-1:1;l.state='victim';l.st=0;l.vx=0;l.vy=0;l.defeated=1;SFX.sting();say('Fatality');}
function fatalStep(w,l){const t=S.battle.phaseT,id=w.def.id;
if(t===50){S.flashS=8;S.shake=10;
if(id===0){SFX.fire();l.burnT=1;}
else if(id===1){SFX.tele();S.fx.push({ty:'drain',x:l.x,t:0});l.soulT=1;}
else if(id===2){SFX.zap();l.shockT=1;for(let i=0;i<14;i++)S.fx.push({ty:'boltfx',x:l.x+rnd(-16,16),t:-(i%3)});}
else if(id===3){SFX.bone();l.crushT=1;}
else if(id===4){SFX.slash();l.sliceT=1;}
else if(id===5){SFX.tele();l.sandT=1;}
else if(id===6){SFX.ice();l.frozen=999;l.shatterT=1;}
else if(id===7){SFX.shoot();l.bombT=1;}
else if(id===8){SFX.sting();l.drainT=1;}
else if(id===10){SFX.sting();l.drainB=1;}// 30.09: Алая жатва — кровь покидает жертву
else if(id===11){SFX.slash();l.sliceT=1;l.cutT=1;}// 30.09: Лунная гильотина — серия рассечений
else if(id===12){SFX.cast2();l.floatT=1;l.float0=l.y;}// 30.09: Созвездие черепа — жертву уносят звёзды
else{SFX.shoot();l.laserT=1;}}
if(t>50&&t<160){
const WC={0:'#f06020',1:'#8899aa',2:'#f8f860',3:'#8a7a5c',4:'#7ac83a',5:'#c8a060',6:'#c8ecff',7:'#c8c8a0',8:'#7a3aa8',9:'#f8f860',10:'#d82040',11:'#9adcee',12:'#b89aff'};// 30.09: +астрал Веги
if(t%6===0)P(w.x+w.face*22,w.y-w.def.h*.72,rnd(-.4,.4)+w.face*.5,rnd(-1,-.2),WC[id],14,2,-.01);// 08.09: энергия стихии с рук победителя
if(l.burnT){for(let i=0;i<3;i++)P(l.x+rnd(-8,8),l.y-rnd(5,60),rnd(-.4,.4),rnd(-2,-.6),'#f06020',22,3,-.02);if(t>110)l.charred=1;}
if(l.shockT&&t%4===0){SFX.zap();for(let i=0;i<3;i++)P(l.x+rnd(-10,10),l.y-rnd(20,70),rnd(-1,1),rnd(-1,1),'#f8f860',8,2,0);}
if(l.crushT&&t%12===0){SFX.bone();S.shake=8;blood(l.x,l.y-30,10,2);l.squash=Math.max(.25,l.squash-.12);}
if(l.sliceT&&t%6===0){SFX.slash();blood(l.x+rnd(-6,6),l.y-rnd(10,60),6,1.5);S.fx.push({ty:'slash',x:l.x+rnd(-10,10),y:l.y-rnd(10,60),t:0});}
if(l.cutT&&(t===55||t===80||t===105||t===130)){w.face=l.x>w.x?1:-1;const nx=clamp(l.x+w.face*rnd(20,28),20,AW-20);for(let i=0;i<8;i++)P(w.x+(nx-w.x)*(i/8),w.y-rnd(6,50),(nx-w.x)/10,rnd(-.5,.5),'#9adcee',18,2,0);w.x=nx;smoke(nx,w.y-30);SFX.slash();S.fx.push({ty:'slash',x:l.x+rnd(-12,12),y:l.y-rnd(8,60),t:0});blood(l.x+rnd(-6,6),l.y-rnd(10,55),5,1.4);S.shake=Math.max(S.shake,3);}// 30.09: Аямэ сама прошивает жертву — перенос с шлейфом и ударом
if(l.cutT&&t===150){SFX.slash();S.shake=8;S.fx.push({ty:'slash',x:l.x,y:l.y-34,t:0});blood(l.x,l.y-34,10,2);SFX.tele();}// 30.09: финальный проход наотмашь
if(l.floatT){if(l.y>l.float0-58)l.y-=.55;if(t%3===0){const a=t*.14;for(let i=0;i<3;i++){const aa=a+i*2.09;P(l.x+Math.cos(aa)*16,l.float0-30+Math.sin(aa)*11,0,0,'#b89aff',16,2,0);}}if(t===145){SFX.cast2();S.shake=6;for(let i=0;i<16;i++)P(l.x+rnd(-14,14),l.y-rnd(5,60),rnd(-2,2),rnd(-2,2),'#b89aff',30,2,0);}}// 30.09: жертва поднимается, созвездие схлопывается
if(l.sandT){for(let i=0;i<4;i++)P(l.x+rnd(-14,14),l.y-rnd(0,70),rnd(-1.4,1.4),rnd(-2,-.4),'#c8a060',24,2,-.01);if(t>110)l.charred=1;}
if(l.shatterT===1&&t>120){l.shatterT=2;SFX.ice();l.hidden=1;gibs(l,'#a8d8f0');}
if(l.bombT&&t%16===0){S.fx.push({ty:'boom',x:l.x+rnd(-16,16),y:l.y-30,t:0});SFX.boom();S.shake=8;}
if(l.bombT&&t===141){l.hidden=1;gibs(l,'#b01818');SFX.boom();}// 08.09: было t>140 — gibs и boom спамили каждый кадр
if(l.drainT){l.scale=Math.max(.1,l.scale-.012);for(let i=0;i<2;i++)P(l.x+rnd(-8,8),l.y-rnd(0,60),rnd(-.5,.5),rnd(-1.5,-.4),'#7a3aa8',30,2,-.01);w.hp=Math.min(100,w.hp+.1);}
if(l.drainB){l.scale=Math.max(.82,l.scale-.004);for(let i=0;i<3;i++)P(l.x+rnd(-10,10),l.y-rnd(10,60),rnd(-.2,.2),-rnd(2,3.6),'#d82040',34,2,-.01);if(t%10===0)SFX.hit();if(t>120)l.pale=1;}// 30.09: кровь тянется вверх к руке графини, жертва бледнеет
if(l.laserT&&t>60){for(let i=0;i<3;i++)P(l.x+rnd(-6,6),l.y-rnd(10,70),rnd(-.5,.5),rnd(-2,-.5),'#f8f860',16,3,-.02);if(t>100)l.charred=1;}
if(l.soulT&&t>90){l.tilt=lerp(l.tilt,-1.4,.08);P(l.x,l.y-70,rnd(-.3,.3),rnd(-1.2,-.6),'#e8f0f8',40,2,-.01);}}
if(t===170){if(id===0||id===9){l.hidden=1;gibs(l,'#181818');}if(id===5){l.hidden=1;gibs(l,'#e8e0d0');}// 08.09: фаталити Сахры оставляло тело
if(id===4){l.hidden=1;gibs(l,'#b01818');gibs(l,l.def.skin);}// 08.09: ветка Фэнга была проглочена комментарием — восстановлена
if(id===2)l.charred=1;// 08.09: Вольт — обугленный корпус
if(id===3){blood(l.x,l.y-30,16,2.5);S.shake=10;}// 08.09: Базальт — финальный удар пресса
if(id===1)l.tilt=-1.4;// 08.09: Гейст — тело оседает
if(id===8){l.hidden=1;gibs(l,'#7a3aa8');}// 08.09: Ноктюрн — оболочка рассыпается
if(id===10){l.hidden=1;gibs(l,'#d82040');SFX.sting();}// 30.09: Кармин — опустевшее тело рассыпается алой пылью
if(id===11){l.hidden=1;gibs(l,'#b01818');gibs(l,'#c8d8e0');SFX.slash();}// 30.09: Аямэ — жертва рассыпается от рассечений
if(id===12){l.hidden=1;gibs(l,'#b89aff');gibs(l,'#e8e8ff');SFX.fatal();}// 30.09: Вега — имплозия в звёздную пыль
S.announce={txt:'FATALITY',t:0,col:'#e02020'};SFX.fatal();}
if(t===300)endBattle(w);}
function gibs(l,col){for(let i=0;i<22;i++)P(l.x+rnd(-8,8),l.y-rnd(5,60),rnd(-3.5,3.5),rnd(-6,-1),col,rnd(40,90),rnd(2,5));blood(l.x,l.y-30,20,2);}
function battleUpd(){const b=S.battle;b.phaseT++;
if(b.phase==='intro'){if(b.phaseT===90){S.announce={txt:'FIGHT!',t:0,col:'#e02020'};say('Fight!');}if(b.phaseT>120)b.phase='fight';updFs(0);return;}// 08.09: бойцы анимируются в интро (ввод заблокирован)
if(b.phase==='fatal'){fatalStep(b.winner,b.loser);updFs(0);return;}
if(b.phase==='over'){updFs(0);if(b.phaseT>200)afterBattle();return;}
if(S.freeze>0){S.freeze--;return;}// 08.09: удалён мёртвый if(paused) — step уже не вызывает battleUpd на паузе
if(b.p1.hp<25&&b.p1.hp>0&&S.FRAME%50===0)SFX.heart();if(b.p2.hp<25&&b.p2.hp>0&&S.FRAME%50===25)SFX.heart();// 30.09: сердцебиение при HP<25
b.timer-=1/60;
if(b.timer<11&&b.timer>0&&S.FRAME%60===0)SFX.tick();// 08.09: тик на последних секундах
if(b.timer<=0){b.timer=0;b.phase='ko';b.phaseT=0;S.announce={txt:'\u041d\u0418\u0427\u042c\u042f',t:0,col:'#e8c040'};say('Draw');return;}
updFs(1);}
function updFs(act){const b=S.battle;
for(const f of[b.p1,b.p2]){f.comboT=(f.comboT||0)+1;// 08.09: тик комбо-таймера
if(f.ctrl.ai&&act&&b.phase!=='finish')aiUpd(f,f.foe,b.aiLvl);
if(f.state!=='fatal'&&f.state!=='victim')f.update(S.FRAME,f.foe);else{f.st++;f.animT++;}
f.updSuper();}
if(b.phase==='fight'){const dead=[b.p1,b.p2].filter(f=>f.hp<=0&&f.state!=='victim');
if(dead.length>=2){b.phase='ko';b.phaseT=0;S.projs.length=0;for(const f of dead){f.defeated=1;f.state='down';f.st=0;f.vx=0;f.vy=0;f.y=FL+GR;}S.announce={txt:'?????',t:0,col:'#e8c040'};say('Draw');}
else if(dead.length===1)roundWon(dead[0].foe);}}
function roundWon(w){const b=S.battle;w.wins++;S.projs.length=0;
if(w.wins>=2){b.loser=w.foe;b.winner=w;b.phase='finish';b.phaseT=0;
w.ctrl.clear();w.foe.ctrl.clear();
w.foe.hp=0;w.foe.state='dizzy';w.foe.st=0;w.foe.vx=0;w.foe.vy=0;w.foe.y=FL+GR;w.foe.atk=null;w.foe.defeated=1;w.foe.netT=0;w.foe.frozen=0;
b.fatalProg=0;S.announce={txt:'FINISH HIM!',t:0,col:'#e02020',pulse:1};say('Finish him');
const wx=w.x,wf=w.face;w.reset(wx,wf);w.hp=100;w.defeated=0;}
else{b.phase='ko';b.phaseT=0;const fl=(w.damageTaken||0)===0;if(fl)SFX.coin();S.announce={txt:fl?'FLAWLESS VICTORY':'K.O.',t:0,col:fl?'#e8e0c0':'#e02020'};w.state='win';w.st=0;w.atk=null;w.foe.state='down';w.foe.st=0;w.foe.hp=0;w.foe.vx=0;w.foe.vy=0;w.foe.y=FL+GR;w.foe.defeated=1;w.foe.netT=0;w.foe.frozen=0;SFX.ko();say(fl?'Excellent. Flawless victory':'K O');}}
function fatalMapped(seq,face){return seq.split('').map(k=>k==='R'?(face>0?'R':'L'):k==='L'?(face>0?'L':'R'):k);}
function fatalProgress(ctrl,seq,face){const mapped=fatalMapped(seq,face),b=ctrl.buf,now=b.length?b[b.length-1].t:0;let best=0;for(let start=0;start<b.length;start++){if(now-b[start].t>FATAL_INPUT)continue;let n=0;while(n<mapped.length&&start+n<b.length&&b[start+n].k===mapped[n])n++;if(n>best)best=n;}return best;}
function finishUpd(){const b=S.battle;b.phaseT++;updFs(1);
const w=b.winner,l=b.loser;
if(l.state==='down'){b.phase='over';b.phaseT=0;endBattle(w);return;}
if(w.ctrl.ai){const c=w.ctrl;c.ax={};const dx=l.x-w.x;if(b.phaseT>40&&Math.abs(dx)>44)c.ax[dx>0?'r':'l']=true;if(Math.abs(dx)<=44&&b.phaseT>140&&Math.random()<.03){startFatal(w,l);return;}}
else{const prog=fatalProgress(w.ctrl,w.def.fat,w.face);if(prog>b.fatalProg){b.fatalProg=prog;if(prog>0)SFX.tick();}else if(prog<b.fatalProg)b.fatalProg=prog;
if((w.ctrl.pP||w.ctrl.pK)&&(w.ctrl.matchRel(w.def.fat,w.face,FATAL_INPUT)||w.ctrl.matchRelLoose(w.def.fat,w.face,FATAL_INPUT))){startFatal(w,l);return;}}
if(b.phaseT>=FATAL_FRAMES){l.state='down';l.st=0;}}
function afterBattle(){const b=S.battle;// 08.09: удалена недостижимая ветка !b.winner — endBattle всегда ставит winner
if(b.mode==='arcade'&&b.winner===b.p1){S.lStep++;
if(S.lStep>=arcTotal()){clearArcRun();try{const rec=+(localStorage.karnageArc||0);if(S.lStep>rec)localStorage.karnageArc=S.lStep;}catch(e){}// 08.09: запись рекорда
addTop(S.arcP1,S.lStep);// 08.09: зал славы
toLobby('ending');return;}
arcFight();}// 25.10: 11 обычных боёв и финальный босс; сохранение после каждого шага
else if(b.mode==='arcade'){saveArcRun();toLobby('continue');S.contT=600;say('Continue?');try{const rec=+(localStorage.karnageArc||0);if(S.lStep>rec)localStorage.karnageArc=S.lStep;addTop(S.arcP1,S.lStep);}catch(e){}}// 08.09: рекорд по достигнутому шагу + зал славы
else toLobby(S.lastSel?'rematch':'menu');}// 08.09: экран реванша
function resumeArc(){SFX.coin();arcFight();}// 25.10: продолжение идёт через общий запуск аркады
function resumeSavedArcade(){const run=loadArcRun();if(!run)return false;S.arcP1=run.c1;S.ladder=run.ladder.slice();S.lStep=run.step;SFX.vsroar();arcFight();return true;}// 25.10: продолжение забега после перезагрузки
/* ЭКРАНЫ: ВВОД */
function menuItems(){const saved=!!loadArcRun(),items=[];if(saved)items.push({id:'resume',label:'ПРОДОЛЖИТЬ АРКАДУ'});items.push({id:'arcade',label:saved?'НОВАЯ АРКАДА':'АРКАДА'},{id:'cpu',label:'БОЙ ПРОТИВ CPU'},{id:'2p',label:'БОЙ НА ДВОИХ'},{id:'settings',label:'НАСТРОЙКИ'},{id:'controls',label:'УПРАВЛЕНИЕ'},{id:'top',label:'ЗАЛ СЛАВЫ'});return items;}// 25.10: сохранённый забег добавляет пункт продолжения
function pauseItems(){return['ПРОДОЛЖИТЬ','ЗВУК: '+(AU.on?'ВКЛ':'ВЫКЛ'),'ГОЛОС ДИКТОРА: '+(AU.voice?'ВКЛ':'ВЫКЛ'),'ГРОМКОСТЬ: '+AU.vol+'%','В МЕНЮ'];}// 08.09: +громкость
function settingsItems(){return['ЗВУК: '+(AU.on?'ВКЛ':'ВЫКЛ'),'ГОЛОС: '+(AU.voice?'ВКЛ':'ВЫКЛ'),'ГРОМКОСТЬ: '+AU.vol+'%','CRT-ФИЛЬТР: '+(OPT.crt?'ВКЛ':'ВЫКЛ'),'КРОВЬ: '+(OPT.blood?'ВКЛ':'ВЫКЛ'),'ТРЯСКА: '+(OPT.shake?'ВКЛ':'ВЫКЛ'),'МЕНЬШЕ ДВИЖЕНИЯ: '+(OPT.reduce?'ВКЛ':'ВЫКЛ'),'НАЗАД'];}
function settingsChange(i,dir){
if(i===0){AU.on=!AU.on;setVol();if(!AU.on){try{speechSynthesis.cancel();}catch(e){}}else SFX.menu();saveSet();}
else if(i===1){AU.voice=!AU.voice;if(!AU.voice){try{speechSynthesis.cancel();}catch(e){}}saveSet();SFX.menu();}
else if(i===2){AU.vol=clamp(AU.vol+(dir<0?-10:10),0,100);setVol();saveSet();SFX.menu();}
else if(i===3){OPT.crt=!OPT.crt;applyCrt();saveOpts();SFX.menu();}
else if(i===4){OPT.blood=!OPT.blood;saveOpts();SFX.menu();}
else if(i===5){OPT.shake=!OPT.shake;saveOpts();SFX.menu();}
else if(i===6){OPT.reduce=!OPT.reduce;if(OPT.reduce){S.shake=0;S.flashS=0;}saveOpts();SFX.menu();}}
function onKey(k){
if(k==='KeyM'){AU.on=!AU.on;setVol();if(!AU.on){try{speechSynthesis.cancel();}catch(e){}}else SFX.menu();saveSet();return;}// 08.09: +сохранение настройки
if(S.GAME==='fight'&&!S.paused&&S.battle&&(k==='KeyJ'||k==='Enter'||k==='Space')){if(S.battle.phase==='fatal'&&S.battle.phaseT>30){endBattle(S.battle.winner);return;}if(S.battle.phase==='over'&&S.battle.phaseT>30){afterBattle();return;}}
if(S.GAME==='fight'&&!S.paused&&k==='Escape'){S.paused=true;S.pauseIdx=0;SFX.menu();return;}// 08.09: пауза не активировалась — Escape не ставил paused
if(S.GAME==='title'){toLobby('menu');SFX.sel();say('Karnage');return;}
if(S.GAME==='fight'&&S.paused){
if(k==='KeyW'||k==='ArrowUp'){S.pauseIdx=(S.pauseIdx+4)%5;SFX.menu();}
if(k==='KeyS'||k==='ArrowDown'){S.pauseIdx=(S.pauseIdx+1)%5;SFX.menu();}
if((k==='KeyD'||k==='ArrowRight')&&S.pauseIdx===3){AU.vol=Math.min(100,AU.vol+10);setVol();saveSet();SFX.menu();}// 08.09: громкость A/D тонко
if((k==='KeyA'||k==='ArrowLeft')&&S.pauseIdx===3){AU.vol=Math.max(0,AU.vol-10);setVol();saveSet();SFX.menu();}
if(k==='Escape'){S.paused=false;SFX.menu();S.battle.p1.ctrl.clear();S.battle.p2.ctrl.clear();return;}// 08.09: сброс буфера ввода при выходе из паузы
if(k==='KeyJ'||k==='Enter'||k==='Space'){SFX.sel();
if(S.pauseIdx===0){S.paused=false;S.battle.p1.ctrl.clear();S.battle.p2.ctrl.clear();}// 08.09: сброс буфера при продолжении
else if(S.pauseIdx===1){AU.on=!AU.on;setVol();saveSet();}// 08.09: +сохранение
else if(S.pauseIdx===2){AU.voice=!AU.voice;if(!AU.voice){try{speechSynthesis.cancel();}catch(e){}}saveSet();}// 08.09: +сохранение
else if(S.pauseIdx===3){AU.vol=AU.vol>=100?0:AU.vol+25;setVol();saveSet();}// 08.09: громкость J — цикл 0/25/50/75/100
else toLobby('menu');}
return;}
if(S.GAME==='menu'){
const items=menuItems(),n=items.length;S.menuIdx=clamp(S.menuIdx,0,n-1);
if(k==='KeyW'||k==='ArrowUp'){S.menuIdx=(S.menuIdx+n-1)%n;SFX.menu();}
if(k==='KeyS'||k==='ArrowDown'){S.menuIdx=(S.menuIdx+1)%n;SFX.menu();}
if(k==='KeyJ'||k==='Enter'||k==='Space'){SFX.sel();const item=items[S.menuIdx];
if(item.id==='resume'){resumeSavedArcade();return;}
if(item.id==='arcade'){S.GAME='select';S.sel=createSelection('arcade');say('Choose your fighter');}
else if(item.id==='cpu'){S.GAME='select';S.sel=createSelection('cpu');say('Choose your fighter');}
else if(item.id==='2p'){S.GAME='select';S.sel=createSelection('2p');say('Choose your fighters');}
else if(item.id==='settings'){S.settingsIdx=0;S.GAME='settings';}
else if(item.id==='controls')S.GAME='controls';
else S.GAME='top';}
return;}
if(S.GAME==='settings'){
const n=settingsItems().length;
if(k==='KeyW'||k==='ArrowUp'){S.settingsIdx=(S.settingsIdx+n-1)%n;SFX.menu();}
if(k==='KeyS'||k==='ArrowDown'){S.settingsIdx=(S.settingsIdx+1)%n;SFX.menu();}
if(k==='KeyA'||k==='ArrowLeft')settingsChange(S.settingsIdx,-1);
if(k==='KeyD'||k==='ArrowRight')settingsChange(S.settingsIdx,1);
if(k==='KeyJ'||k==='Enter'||k==='Space'){if(S.settingsIdx===n-1){toLobby('menu');SFX.menu();}else settingsChange(S.settingsIdx,1);}
if(k==='Escape'){toLobby('menu');SFX.menu();}
return;}
if(S.GAME==='controls'){if(k==='KeyJ'||k==='Enter'||k==='Escape'){toLobby('menu');SFX.menu();}return;}
if(S.GAME==='select'){selKey(k);return;}
if(S.GAME==='vs'){if(k==='KeyJ'||k==='Enter'||k==='Space'){S.GAME='fight';SFX.sel();S.vsEscT=0;}else if(k==='Escape'){if(S.battle.mode==='arcade'){if(S.vsEscT>0)toLobby('menu');else{S.vsEscT=90;SFX.menu();}}else toLobby('menu');}return;}// 08.09: двойное ESC для выхода из аркады
if(S.GAME==='continue'){if(k==='KeyJ'||k==='Enter'||k==='Space')resumeArc();else if(k==='Escape'){toLobby('menu');SFX.menu();}return;}// 25.10: ESC оставляет сохранённый забег в меню
if(S.GAME==='rematch'){if(!S.lastSel){toLobby('menu');return;}if(k==='KeyJ'||k==='Enter'||k==='Space'){rematchStart();return;}if(k==='Escape'){toLobby('menu');return;}}// 08.09: экран реванша
if(S.GAME==='ending'||S.GAME==='gameover'){if(k==='KeyJ'||k==='Enter'||k==='Escape'){toLobby('menu');SFX.sel();}return;}
if(S.GAME==='top'){if(k==='KeyJ'||k==='Enter'||k==='Escape'){toLobby('menu');SFX.menu();}return;}}// 08.09: зал славы
function startLadder(c1){clearArcRun();S.arcP1=c1;S.ladder=[];
for(let i=0;i<CH.length;i++)if(i!==c1&&i!==BOSS.id)S.ladder.push(i);
for(let i=S.ladder.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[S.ladder[i],S.ladder[j]]=[S.ladder[j],S.ladder[i]];}
S.ladder=S.ladder.slice(0,CH.length-2);S.lStep=0;SFX.vsroar();arcFight();}// 25.10: 11 обычных противников, босс всегда последний
function startSel(){const s=S.sel;
newBattle(s.c1,new Ctrl(KM1),s.c2,new Ctrl(KM2),s.ar<0?CH[s.c1].arena:s.ar);// 08.09: выбранная арена
S.battle.mode=s.mode==='cpu'?'cpu':'2p';
if(s.mode==='cpu'){S.battle.p2.ctrl.ai=true;S.battle.aiLvl=[2,4,6][s.diff];}// 08.09: сложность CPU
SFX.vsroar();S.lastSel={mode:s.mode,c1:s.c1,c2:s.c2,diff:s.diff,ar:s.ar};// 08.09: запомнить для реванша
S.GAME='vs';S.vsT=0;}
function rematchStart(){newBattle(S.lastSel.c1,new Ctrl(KM1),S.lastSel.c2,new Ctrl(KM2),S.lastSel.ar<0?CH[S.lastSel.c1].arena:S.lastSel.ar);// 08.09: реванш теми же бойцами
S.battle.mode=S.lastSel.mode==='cpu'?'cpu':'2p';
if(S.lastSel.mode==='cpu'){S.battle.p2.ctrl.ai=true;S.battle.aiLvl=[2,4,6][S.lastSel.diff];}
S.GAME='vs';S.vsT=0;SFX.vsroar();}
function drawRematch(){bgFill();panel(102,70,220,116);// 08.09: экран реванша + статистика
g.font='16px "Rubik Mono One","Russo One",sans-serif';g.fillStyle='#e8c040';g.textAlign='center';g.fillText('РЕВАНШ?',RW/2,100);
g.font='9px "Russo One"';g.fillStyle='#e8e0c0';g.fillText(CH[S.lastSel.c1].name+'  VS  '+CH[S.lastSel.c2].name,RW/2,124);
if(blink()){g.font='8px "Russo One"';g.fillStyle='#807850';g.fillText('J — ЕЩЁ БОЙ · ESC — МЕНЮ',RW/2,150);}
if(S.bstat){g.font='7px "Russo One"';g.fillStyle='#c8a040';g.fillText('УДАРЫ '+S.bstat.h1+' — '+S.bstat.h2+'   УРОН '+Math.round(S.bstat.d1)+' — '+Math.round(S.bstat.d2)+'   МАКС КОМБО '+S.bstat.c1+' — '+S.bstat.c2,RW/2,172);}}// 08.09: статистика боя
function selKey(k){const s=S.sel;
if(k==='Escape'){if(s.mode==='cpu'&&s.ph===2){s.ph=1;SFX.menu();return;}// 08.09: назад из настроек
if(s.mode==='cpu'&&s.ph===1){s.ph=0;SFX.menu();return;}toLobby('menu');return;}
if(s.ph===2){// 08.09: настройка боя — сложность (cpu) и арена
const rows=s.mode==='cpu'?2:1;
if((k==='KeyW'||k==='ArrowUp')&&rows>1)s.row=0;// 08.09: в 2p одна строка — W не сбрасывает подсветку
if((k==='KeyS'||k==='ArrowDown')&&rows>1)s.row=1;
const dd=(k==='KeyD'||k==='ArrowRight')?1:(k==='KeyA'||k==='ArrowLeft')?-1:0;
const idx=s.mode==='cpu'?s.row:1;
if(dd){if(idx===0)s.diff=clamp(s.diff+dd,0,2);else s.ar=dd>0?(s.ar>=9?-1:s.ar+1):(s.ar<=-1?9:s.ar-1);SFX.menu();}
if(k==='KeyJ'||k==='Enter'||k==='Space'){SFX.sel();startSel();}
return;}
const d1=k==='KeyD'?1:k==='KeyA'?-1:k==='KeyW'?-5:k==='KeyS'?5:0;
const d2=k==='ArrowRight'?1:k==='ArrowLeft'?-1:k==='ArrowUp'?-5:k==='ArrowDown'?5:0;
const move=(slot,d)=>{if(d){s[slot]=clamp(s[slot]+d,0,CH.length-1);s.last=slot;SFX.menu();}};// 30.09: 11 бойцов
if(s.mode==='arcade'){move('c1',d1||d2);if(k==='KeyJ'||k==='Enter'||k==='Space'){SFX.sel();startLadder(s.c1);}return;}
if(s.mode==='cpu'){move(s.ph===0?'c1':'c2',d1||d2);
if(k==='KeyJ'||k==='Enter'||k==='Space'){SFX.sel();if(s.ph===0)s.ph=1;else s.ph=2;}return;}
if(!s.l1)move('c1',d1);if(!s.l2)move('c2',d2);// 08.09: залоченный боец больше не двигается
if(k==='KeyJ'||k==='Enter'||k==='Space'){s.l1=!s.l1;SFX.sel();}
if(k==='KeyI'){s.l2=!s.l2;SFX.sel();}
if(s.l1&&s.l2&&s.ph===0){s.ph=2;s.row=1;SFX.sel();}}// 08.09: 2p — сразу к настройке арены
/* ЭКРАНЫ: РЕНДЕР */
const bgFill=()=>{g.fillStyle='#0a0806';g.fillRect(0,0,RW,RH);};
function drawControls(){bgFill();
g.font='16px "Russo One"';g.fillStyle='#e8c040';g.textAlign='center';g.fillText('УПРАВЛЕНИЕ',RW/2,20);
panel(12,30,196,176);panel(216,30,196,176);
g.font='10px "Russo One"';g.fillStyle='#e8c040';g.textAlign='center';g.fillText('ИГРОК 1',110,46);g.fillText('ИГРОК 2',314,46);
g.font='7px "Russo One"';g.fillStyle='#e8e0c0';g.textAlign='left';
const L1=['A / D — ходьба','W — прыжок','S — присед','J — удар рукой','K — удар ногой','L — блок (удерживать)','S + J — апперкот','S + K — подсечка','назад + K — roundhouse','бег + L — рывок-уклон','СПЕЦ2 — своя комбинация'];// 30.09
const L2=['СТРЕЛКИ — движение','СТРЕЛКА ВВЕРХ — прыжок','СТРЕЛКА ВНИЗ — присед','I — удар рукой','O — удар ногой','P — блок (удерживать)','ВНИЗ + I — апперкот','ВНИЗ + O — подсечка','назад + O — roundhouse','бег + P — рывок-уклон','СПЕЦ2 — своя комбинация'];// 30.09
L1.forEach((l,i)=>g.fillText(l,24,62+i*12));L2.forEach((l,i)=>g.fillText(l,228,62+i*12));
g.font='7px "Russo One"';g.fillStyle='#c8a040';g.textAlign='center';
g.fillText('P+K — захват/бросок · СПЕЦ — направления+кнопка · СУПЕР — S,S+J',RW/2,214);
g.fillStyle='#807850';g.fillText('ФАТАЛИТИ — в окне FINISH HIM · стрелки — с учётом взгляда',RW/2,222);
g.fillText('J / ESC — назад',RW/2,230);}
function drawSelect(){const s=S.sel;bgFill();
g.font='15px "Russo One"';g.fillStyle='#e8c040';g.textAlign='center';g.fillText('ВЫБОР БОЙЦА',RW/2,16);
g.font='7px "Russo One"';g.fillStyle='#807850';
const hdr=s.mode==='arcade'?(loadArcRun()?'НОВАЯ АРКАДА ЗАМЕНИТ СОХРАНЁННУЮ':'ВЫБЕРИ БОЙЦА — '+ARC_TOTAL+' БОЁВ, ФИНАЛЬНЫЙ БОСС'):s.ph===2?'НАСТРОЙКА БОЯ':s.mode==='cpu'?(s.ph===0?'ВЫБЕРИ СВОЕГО БОЙЦА':'ВЫБЕРИ СОПЕРНИКА'):'P1: WASD + J    P2: СТРЕЛКИ + I';// 25.10: предупреждение о замене сохранения
g.fillText(hdr,RW/2,27);
for(let i=0;i<CH.length;i++){const x=12+(i%5)*37,y=36+((i/5)|0)*46;
g.fillStyle='#100d0a';g.fillRect(x,y,34,42);g.strokeStyle='#3a3128';g.lineWidth=1;g.strokeRect(x+.5,y+.5,33,41);
drawPort(CH[i],x+17,y+24.5,.94);
if(s.c1===i){g.strokeStyle='#e02020';g.lineWidth=2;g.strokeRect(x-1,y-1,36,44);}
if((s.mode==='2p'||(s.mode==='cpu'&&s.ph===1))&&s.c2===i){g.strokeStyle='#3868c8';g.lineWidth=2;g.strokeRect(x+1,y+1,32,40);}}
g.font='7px "Russo One"';g.textAlign='left';
g.fillStyle='#e02020';g.fillText('P1: '+CH[s.c1].name,12,182);// 30.09: подписи ниже трёх рядов
if(s.mode!=='arcade'){g.fillStyle='#3868c8';g.fillText((s.mode==='2p'?'P2':'CPU')+': '+CH[s.c2].name,12,192);}
const cur=s.mode==='2p'?(s.last==='c2'?s.c2:s.c1):(s.mode==='cpu'?(s.ph===0?s.c1:s.c2):s.c1);const showP2=s.mode==='2p'?cur===s.c2:(s.mode==='cpu'&&s.ph===1);
const d=CH[cur];
panel(200,34,216,150);
g.fillStyle=d.acc;g.fillRect(202,36,4,146);// 08.09: цветная полоса элемента бойца
drawFake(cur,244,176,1.5,-1);
g.strokeStyle=d.acc;g.lineWidth=1;g.strokeRect(212.5,66.5,64,114);// 08.09: рамка портрета по размеру бойца
g.font='13px "Rubik Mono One","Russo One",sans-serif';g.fillStyle='#e8e0c0';g.textAlign='left';g.fillText(d.name,292,52);
g.font='7px "Russo One"';g.fillStyle=d.acc;g.fillText(RANGED.includes(d.id)?'ДАЛЬНИЙ БОЙ':'БЛИЖНИЙ БОЙ',292,62);// 08.09: стиль боя
const st=[[Math.round(9*d.dmg),9,'СИЛА'],[Math.round(d.spd*4),9,'СКОР'],[Math.round(9/d.bulk),9,'ВЕС']];// 08.09: характеристики бойца
st.forEach((s2,i)=>{const sy=76+i*12;g.font='7px "Russo One"';g.fillStyle='#c8a040';g.textAlign='left';g.fillText(s2[2],292,sy);
g.fillStyle='#2a0808';g.fillRect(324,sy-6,88,5);g.fillStyle=s2[0]>=7?'#e04020':(s2[0]>=6?'#e8c040':'#7a8a4a');g.fillRect(324,sy-6,Math.max(2,Math.min(88,s2[0]/s2[1]*88)),5);});
g.font='7px "Russo One"';g.fillStyle='#e8c040';g.fillText('СПЕЦ: '+d.specN,292,114);
g.fillText('['+seqTxt(d.spec,showP2)+']',292,123);
g.fillStyle='#c8a040';g.fillText('СПЕЦ2: '+d.spec2N,292,134);// 08.09: второй спецприём
g.fillText('['+seqTxt(d.spec2,showP2)+']',292,143);
if(s.ph!==2){g.fillText('СУПЕР: '+d.sup,292,155);
g.fillStyle='#807850';g.fillText('ФАТАЛИТИ: секрет',292,167);}// 01.10: в настройке боя панель арены перекрывала эти строки
if(s.ph===2){panel(102,150,220,72);// 08.09: панель настройки боя
g.font='8px "Russo One"';g.textAlign='center';
if(s.mode==='cpu'){g.fillStyle=s.row===0?(blink()?'#fff':'#e02020'):'#c8a040';g.fillText('СЛОЖНОСТЬ: '+['ЛЁГКАЯ','НОРМАЛЬНАЯ','ТЯЖЁЛАЯ'][s.diff],212,168);}
g.fillStyle=s.row===1?(blink()?'#fff':'#e02020'):'#c8a040';g.fillText('АРЕНА: '+(s.ar<0?'АРЕНА БОЙЦА':AR[s.ar].n),212,s.mode==='cpu'?184:168);
g.font='7px "Russo One"';g.fillStyle='#807850';g.fillText('A/D — изменить · W/S — строка · J — СТАРТ',212,206);}
g.font='7px "Russo One"';g.textAlign='center';g.fillStyle='#807850';
g.fillText('J — подтвердить · ESC — назад',RW/2,230);}
function drawVS(){bgFill();
g.fillStyle='#2a0c0c';g.beginPath();g.moveTo(0,0);g.lineTo(RW*.62,0);g.lineTo(RW*.38,RH);g.lineTo(0,RH);g.fill();// 08.09: диагональный сплит — сторона P1
g.fillStyle='#0c1626';g.beginPath();g.moveTo(RW*.62,0);g.lineTo(RW,0);g.lineTo(RW,RH);g.lineTo(RW*.38,RH);g.fill();// сторона P2
if(S.battle.mode==='arcade'){const total=arcTotal(),boss=S.lStep>=S.ladder.length;panel(152,10,120,16);g.font='8px "Russo One"';g.textAlign='center';
g.fillStyle=boss?(blink()?'#e02020':'#e8c040'):'#e8c040';
g.fillText(boss?'ФИНАЛЬНЫЙ БОСС':'СТУПЕНЬ '+(S.lStep+1)+' ИЗ '+total,RW/2,21);}// 25.10: отдельный финальный босс
panel(10,30,150,120);panel(RW-160,30,150,120);
drawFake(S.battle.p1.def,85,144,1.5,1);drawFake(S.battle.p2.def,RW-85,144,S.battle.p2.def.boss?1.05:1.5,-1);// 25.10: на VS видно босса, крупный силуэт вписан в панель
g.font='11px "Russo One"';g.textAlign='center';
g.fillStyle='#e02020';g.fillText(S.battle.p1.def.name,85,142);
g.fillStyle='#3868c8';g.fillText(S.battle.p2.def.name+(S.battle.p2.ctrl.ai?' [CPU]':''),RW-85,142);
if(S.battle.mode!=='arcade'&&(S.sel.diff>0||S.sel.ar>=0)){g.font='7px "Russo One"';g.fillStyle='#c8a040';g.textAlign='center';g.fillText((S.sel.ar<0?'АРЕНА БОЙЦА':AR[S.sel.ar].n)+(S.battle.p2.ctrl.ai?' · '+['ЛЁГКАЯ','НОРМАЛЬНАЯ','ТЯЖЁЛАЯ'][S.sel.diff]:''),RW/2,232);}// 08.09: арена/сложность на VS только для cpu/2p — в аркаде показывалась чужая сложность
g.font='40px "Russo One"';g.fillStyle='#000';g.fillText('VS',RW/2+3,103);g.fillStyle='#e02020';g.fillText('VS',RW/2,100);
panel(132,158,160,18);g.font='8px "Russo One"';g.fillStyle='#e8c040';g.textAlign='center';
g.fillText('АРЕНА: '+AR[S.battle.arena].n,RW/2,170);
if(S.vsEscT>0&&blink()){g.font='8px "Russo One"';g.fillStyle='#e04020';g.fillText('ЕЩЁ РАЗ ESC — ПОКИНУТЬ ТУРНИР',RW/2,200);}else if(S.vsT>50&&blink()){g.font='9px "Russo One"';g.fillStyle='#e8e0c0';g.fillText('J — НАЧАТЬ БОЙ',RW/2,214);}}// 08.09: подтверждение выхода
function arcEnding(){const d=CH[S.arcP1]||CH[0];return {fighter:d,ending:ENDINGS[d.id]||{title:'ТУРНИР ЗАВЕРШЁН',lines:['Арена опустела.','Победитель уходит в тишину.'],col:'#e8c040'}};}
function drawEnd(){bgFill();
panel(102,12,220,28);g.font='10px "Russo One"';g.fillStyle='#e8c040';g.textAlign='center';g.fillText('ПОБЕДИТЕЛЬ ТУРНИРА',RW/2,30);
const {fighter:d,ending:e}=arcEnding();drawPort(d,RW/2,94,2.1);
g.font='16px "Russo One"';g.fillStyle='#e8e0c0';g.fillText(d.name,RW/2,146);
g.font='9px "Russo One"';g.fillStyle=e.col;g.fillText(e.title,RW/2,166);
g.font='7px "Russo One"';g.fillStyle='#c8a040';for(let i=0;i<e.lines.length&&i<2;i++)g.fillText(e.lines[i],RW/2,182+i*12);
g.font='7px "Russo One"';g.fillStyle='#807850';g.fillText('КАЙЗЕР-ПРАЙМ ПОВЕРЖЕН',RW/2,212);
if(blink()){g.fillStyle='#807850';g.font='8px "Russo One"';g.fillText('J — в меню',RW/2,228);}}
function drawTop(){bgFill();// 08.09: зал славы — топ-5 аркады
g.font='15px "Russo One"';g.fillStyle='#e8c040';g.textAlign='center';g.fillText('ЗАЛ СЛАВЫ',RW/2,24);
panel(102,40,220,170);
const tp=TOP();
if(!tp.length){g.font='8px "Russo One"';g.fillStyle='#807850';g.fillText('РЕКОРДОВ ПОКА НЕТ',RW/2,120);g.fillText('ПРОЙДИ АРКАДУ — ИМЯ ЗДЕСЬ',RW/2,134);}
else tp.forEach((e,i)=>{const y=66+i*28;g.textAlign='left';g.font='9px "Russo One"';g.fillStyle=i===0?(blink()?'#e04020':'#e8c040'):'#e8e0c0';g.fillText((i+1)+'.',128,y);g.fillStyle=i===0?'#e8c040':'#e8e0c0';g.fillText(CH[e.id].name,152,y);g.textAlign='right';g.fillStyle='#c8a040';g.fillText(e.step+' / '+ARC_TOTAL,300,y);if(e.date){g.font='7px "Russo One"';g.fillStyle='#807850';g.fillText(e.date.slice(8,10)+'.'+e.date.slice(5,7)+'.'+e.date.slice(2,4),300,y+9);}});
if(blink()){g.font='8px "Russo One"';g.fillStyle='#807850';g.textAlign='center';g.fillText('J / ESC — НАЗАД',RW/2,228);}}
function drawOver(){bgFill();
g.font='28px "Rubik Mono One","Russo One",sans-serif';g.textAlign='center';g.fillStyle='#000';g.fillText('ИГРА ОКОНЧЕНА',RW/2+2,112);g.fillStyle='#e02020';g.fillText('ИГРА ОКОНЧЕНА',RW/2,110);
g.font='9px "Russo One"';g.fillStyle='#e8e0c0';g.fillText('Турнир не прощает слабости.',RW/2,140);
if(blink()){g.fillStyle='#807850';g.fillText('J — в меню',RW/2,180);}}
function drawCont(){bgFill();
bigText('ПРОДОЛЖИТЬ?',84,'#e8c040',1.1);
const n=Math.max(0,Math.ceil(S.contT/60));const sc=1+.15*Math.sin(S.FRAME*.3);
g.save();g.translate(RW/2,156);g.scale(sc,sc);g.font='46px "Russo One"';g.textAlign='center';
g.fillStyle='#000';g.fillText(''+n,3,3);g.fillStyle='#e02020';g.fillText(''+n,0,0);g.restore();
if(blink()){g.font='10px "Russo One"';g.fillStyle='#e8e0c0';g.textAlign='center';g.fillText('J — ДА · ESC — В МЕНЮ',RW/2,206);}}
const SK=['....SSSSSSSS....','..SSSSSSSSSSSS..','.SSSSSSSSSSSSSS.','.SSSSSSSSSSSSSS.','SSSSSSSSSSSSSSS','SSSSSSSSSSSSSSSS','SSSSSSSSSSSSSSSS','SSEESSSSSSEESSSS','SSEESSSSSSEESSSS','SSSSSSSSSSSSSSSS','.SSSSSDDDSSSSSS.','..SSDDDDDDDSS...','...TDTDTDTDT....','....SSSSSSSS....'];
function drawSkull(cx,cy,px){const w=SK[0].length,h=SK.length,ox=cx-w*px/2,oy=cy-h*px/2;
for(let r=0;r<h;r++)for(let c=0;c<w;c++){const ch=SK[r][c];if(ch==='.')continue;g.fillStyle=ch==='S'?'#d8d0c0':ch==='D'?'#a89c88':'#c8c0b0';g.fillRect(ox+c*px,oy+r*px,px,px);}
g.fillStyle='rgba(224,32,32,'+(.45+.45*Math.sin(S.FRAME*.08))+')';g.fillRect(ox+2*px,oy+7*px,2*px,2*px);g.fillRect(ox+10*px,oy+7*px,2*px,2*px);}
function drawTitle(){bgFill();drawSkull(RW/2,58+Math.sin(S.titleT*.03)*3,4.2);
g.font='42px "Russo One"';g.textAlign='center';g.fillStyle='#000';g.fillText('KARNAGE',RW/2+3,163);g.fillStyle='#e02020';g.fillText('KARNAGE',RW/2,160);
g.fillStyle='#7a0e0e';g.fillRect(RW/2-108,168,216,3);g.fillStyle='#c8a040';g.fillRect(RW/2-108,172,216,1);
g.font='9px "Russo One"';g.fillStyle='#e8c040';g.fillText('С М Е Р Т Е Л Ь Н Ы Й   Т У Р Н И Р',RW/2,186);
try{const tp=TOP();if(tp.length){g.font='9px "Russo One"';g.fillStyle='#c8a040';g.fillText('РЕКОРД: '+CH[tp[0].id].name+' — '+tp[0].step+' / '+ARC_TOTAL,RW/2,200);}}catch(e){}// 08.09: лучший результат зала славы на титуле
if(blink()){g.fillStyle='#e8e0c0';g.font='11px "Russo One"';g.fillText('НАЖМИ ЛЮБУЮ КЛАВИШУ',RW/2,216);}}
function drawMenu(){bgFill();
g.font='22px "Rubik Mono One","Russo One",sans-serif';g.textAlign='center';g.fillStyle='#000';g.fillText('KARNAGE',RW/2+2,42);g.fillStyle='#e02020';g.fillText('KARNAGE',RW/2,40);
const gl2=.12+Math.sin(S.FRAME*.04)*.06;g.globalAlpha=Math.max(0,gl2);g.fillStyle='#e02020';g.fillRect(RW/2-90,20,180,30);g.globalAlpha=1;// 08.09: пульсирующее зарево за логотипом
panel(36,62,196,140);
const items=menuItems().map(it=>it.label),gap=items.length>6?17:19;S.menuIdx=clamp(S.menuIdx,0,items.length-1);
items.forEach((it,i)=>{const y=82+i*gap,on=i===S.menuIdx;
if(on){g.fillStyle='rgba(224,32,32,.08)';g.fillRect(56,y-13,156,18);frame(56,y-13,156,18,'button');}
g.font=on?'12px "Russo One"':'10px "Russo One"';
g.fillStyle=on?(blink()?'#fff':'#e02020'):'#c8a040';g.textAlign='center';g.fillText(it,134,y);
if(on){g.fillStyle='#e02020';g.beginPath();g.moveTo(48,y-7);g.lineTo(55,y-3);g.lineTo(48,y+1);g.fill();}});
panel(252,66,136,116);
const si=S.FRAME/300%CH.length|0;drawFake(si,320,158,1.15,-1);
g.font='8px "Russo One"';g.fillStyle='#e8e0c0';g.textAlign='center';g.fillText(CH[si].name,320,172);
if(blink()){g.font='8px "Russo One"';g.fillStyle='#807850';g.textAlign='center';g.fillText('W/S — выбор · J — подтвердить · M — звук',RW/2,212);}}
function settingsIcon(kind,x,y,on){g.save();g.translate(x,y);const c=on?'#f0e8d0':'#c8a040';g.fillStyle=c;g.strokeStyle=c;g.lineWidth=1;if(kind==='sound'){g.fillRect(0,3,2,4);g.beginPath();g.moveTo(2,5);g.lineTo(5,2);g.lineTo(5,8);g.closePath();g.fill();g.beginPath();g.arc(6,5,2,-.8,.8);g.stroke();}else if(kind==='voice'){g.fillRect(2,0,4,5);g.fillRect(3,5,2,2);g.fillRect(1,7,6,1);}else if(kind==='volume'){for(let i=0;i<4;i++)g.fillRect(i*2,7-i*2,1,2+i*2);}else if(kind==='crt'){g.strokeRect(0,1,8,6);g.fillRect(1,2,6,1);g.fillRect(1,4,6,1);g.fillRect(1,6,6,1);}else if(kind==='blood'){g.beginPath();g.moveTo(4,0);g.lineTo(7,5);g.quadraticCurveTo(4,9,1,5);g.closePath();g.fill();}else if(kind==='shake'){g.fillRect(0,3,8,1);g.fillRect(0,5,8,1);g.fillRect(0,3,2,3);g.fillRect(6,3,2,3);}else if(kind==='motion'){g.beginPath();g.ellipse(4,4,4,2,0,0,7);g.stroke();g.fillRect(3,3,2,2);}else{g.fillRect(1,3,5,1);g.beginPath();g.moveTo(6,1);g.lineTo(8,4);g.lineTo(6,7);g.fill();}g.restore();}
function drawSettings(){bgFill();
g.font='20px "Rubik Mono One","Russo One",sans-serif';g.textAlign='center';g.fillStyle='#000';g.fillText('НАСТРОЙКИ',RW/2+2,38);g.fillStyle='#e02020';g.fillText('НАСТРОЙКИ',RW/2,36);
panel(30,50,RW-60,158);
const items=settingsItems(),kinds=['sound','voice','volume','crt','blood','shake','motion','back'];const y0=70,step=16;
items.forEach((it,i)=>{const y=y0+i*step,on=i===S.settingsIdx;
if(on){g.fillStyle='rgba(224,32,32,.08)';g.fillRect(64,y-12,RW-128,15);frame(64,y-12,RW-128,15,'button');}
settingsIcon(kinds[i],69,y-8,on);
g.font=on?'9px "Russo One"':'8px "Russo One"';
g.fillStyle=on?(blink()?'#fff':'#e02020'):'#c8a040';g.textAlign='center';g.fillText((on?'> ':'')+it,RW/2,y);});
g.font='7px "Russo One"';g.fillStyle='#807850';g.textAlign='center';g.fillText('W/S — выбор · A/D — изменить · J — переключить · ESC — назад',RW/2,224);}
function drawPause(){g.fillStyle='rgba(0,0,0,.65)';g.fillRect(0,0,RW,RH);panel(10,50,RW-20,158);// 08.09: широкая пауза — меню + способности обоих бойцов
g.font='13px "Russo One"';g.fillStyle='#e8c040';g.textAlign='center';g.fillText('ПАУЗА',RW/2,64);
pauseItems().forEach((it,i)=>{const y=84+i*16,on=i===S.pauseIdx;
g.font=on?'9px "Russo One"':'8px "Russo One"';g.fillStyle=on?(blink()?'#fff':'#e02020'):'#c8a040';g.textAlign='center';g.fillText((on?'> ':'')+it,100,y);});
const ab=(f,x)=>{const d=f.def,p2=f===S.battle.p2;
g.font='8px "Russo One"';g.fillStyle='#e02020';g.textAlign='center';g.fillText(d.name,x,84);
g.font='7px "Russo One"';g.fillStyle='#e8e0c0';g.fillText('СПЕЦ: '+d.specN,x,96);
g.fillStyle='#c8a040';g.fillText('['+seqTxt(d.spec,p2,f.face)+']',x,106);
g.fillStyle='#e8e0c0';g.fillText('СПЕЦ2: '+d.spec2N,x,118);// 08.09: СПЕЦ2 добавлен в панель способностей
g.fillStyle='#c8a040';g.fillText('['+seqTxt(d.spec2,p2,f.face)+']',x,128);
g.fillStyle='#e8e0c0';g.fillText('СУПЕР: '+d.sup,x,140);
g.fillStyle='#c8a040';g.fillText('['+seqTxt('DDP',p2,f.face)+'] при ярости 100',x,150);
g.fillStyle='#e8e0c0';g.fillText('ФАТАЛИТИ: ['+seqTxt(d.fat,p2,f.face)+']',x,162);
g.fillStyle='#e8e0c0';g.fillText('БРОСОК: '+(d.throwN||'Захват'),x,174);g.fillStyle='#c8a040';g.fillText('[P+K]',x,184);};
ab(S.battle.p1,215);ab(S.battle.p2,345);}
/* ГЛАВНЫЙ ЦИКЛ */
function loop(ts){requestAnimationFrame(loop);S.acc+=Math.min(50,ts-S.last);S.last=ts;
while(S.acc>=1000/60){S.acc-=1000/60;step();}render();}
function step(){S.FRAME++;music();
if(S.GAME==='fight'){
const b=S.battle;if(b.phase!=='fight'||!S.paused)ambient();
if(!S.paused){
if(b.phase==='intro'||b.phase==='fight')battleUpd();
else if(b.phase==='ko'){b.phaseT++;updFs(1);if(b.phaseT>140){if(b.round>=3){const w=b.p1.wins>b.p2.wins?b.p1:b.p2.wins>b.p1.wins?b.p2:(b.p1.hp>=b.p2.hp?b.p1:b.p2);if(w.wins<1)w.wins=1;roundWon(w);}else{b.round++;startRound();}}}
else if(b.phase==='finish')finishUpd();
else if(b.phase==='fatal')battleUpd();
else if(b.phase==='over')battleUpd();
if(S.battle){updProjs();updParts();updFx();S.shake=Math.max(0,S.shake-.5);S.flashS=Math.max(0,S.flashS-1);
const mid=(S.battle.p1.x+S.battle.p2.x)/2;S.cam=clamp(lerp(S.cam,mid-RW/2,.12),0,AW-RW);S.cam=Math.round(S.cam);}}// 08.09: целая камера — без дрожания слоёв
else{updParts();updFx();}
if(S.battle){S.battle.p1.ctrl.poll(S.FRAME);S.battle.p2.ctrl.poll(S.FRAME);}}
else{updParts();
if(['title','menu','continue','gameover','top'].includes(S.GAME)&&S.FRAME%3===0)
S.parts.push({x:rnd(0,RW),y:RH+4,vx:rnd(-.2,.2),vy:-rnd(.6,1.4),c:pick(['#f06020','#c84018','#f0a030']),l:rnd(60,140),s:rnd(1,2),gv:-.005});}
if(S.GAME==='continue'){S.contT--;if(S.contT<=0){clearArcRun();toLobby('gameover');}}// 25.10: время вышло — забег завершён
if(S.GAME==='fight'){if(S.announce)S.announce.t++;if(S.wipe>0)S.wipe--;}if(S.GAME==='title')S.titleT++;
if(S.GAME==='vs'||S.GAME==='select')S.vsT++;if(S.vsEscT>0)S.vsEscT--;// 08.09: таймер подтверждения выхода
}
function render(){g.setTransform(2,0,0,2,0,0);// 08.09: рендер в 2× разрешении — весь код остаётся в 424×240, шрифты и края вдвое чётче
g.fillStyle='#000';g.fillRect(0,0,RW,RH);// 08.09: полная очистка кадра — небо (0-192) не доходило до земли (FL=206), в полосе 192-206 накапливались пиксели бойцов; плюс тряска обнажала края
if(S.GAME==='title'){drawTitle();drawParts(0);return;}
if(S.GAME==='menu'){drawMenu();drawParts(0);return;}
if(S.GAME==='settings'){drawSettings();return;}
if(S.GAME==='controls'){drawControls();return;}
if(S.GAME==='select'){drawSelect();return;}
if(S.GAME==='vs'){drawVS();return;}
if(S.GAME==='ending'){drawEnd();drawParts(0);return;}
if(S.GAME==='gameover'){drawOver();drawParts(0);return;}
if(S.GAME==='top'){drawTop();drawParts(0);return;}// 08.09: зал славы
if(S.GAME==='continue'){drawCont();drawParts(0);return;}
if(S.GAME==='rematch'){drawRematch();drawParts(0);return;}// 08.09
const b=S.battle;
g.save();
if(S.shake>0&&OPT.shake&&!OPT.reduce)g.translate(rnd(-S.shake,S.shake)|0,rnd(-S.shake,S.shake)|0);
drawArena(b.arena,S.cam,S.FRAME);
for(const ff of[b.p1,b.p2])if(ff.marks)for(const m of ff.marks){const mx2=m.x-S.cam;
if(mx2>-20&&mx2<RW+20){g.save();g.translate(mx2,m.y);g.rotate(S.FRAME*.05);
g.strokeStyle='#b89aff';g.lineWidth=1.5;for(let i2=0;i2<4;i2++){g.rotate(Math.PI/2);g.beginPath();g.moveTo(0,-3);g.lineTo(0,-9);g.stroke();}
g.fillStyle='#e8e8ff';g.fillRect(-1.5,-1.5,3,3);g.restore();}}// 30.09: звёздные метки
drawDecals(S.cam);
for(const f of(b.p2.state==='grabbed'?[b.p1,b.p2]:[b.p2,b.p1]))drawF(f,S.cam);// 25.10: удерживаемая жертва рисуется поверх захватчика
if(b.p1.state==='super'&&b.p1.def.id===5&&b.p1.st>14&&b.p1.st<90){g.globalAlpha=.5;drawFakeShift(b.p1,S.cam,-30);drawFakeShift(b.p1,S.cam,30);g.globalAlpha=1;}
if(b.p2.state==='super'&&b.p2.def.id===5&&b.p2.st>14&&b.p2.st<90){g.globalAlpha=.5;drawFakeShift(b.p2,S.cam,-30);drawFakeShift(b.p2,S.cam,30);g.globalAlpha=1;}
drawProjs(S.cam);drawFx(S.cam);drawParts(S.cam);
arenaView.foreground(b.arena,S.cam,S.FRAME);
if(!arenaView.hasForeground(b.arena)){g.fillStyle='rgba(0,0,0,.4)';for(let i=0;i<12;i++){const x=Math.round(((i*67-S.cam*1.25)%(RW+67)+RW+67)%(RW+67)-33),h2=6+(i*13)%14;g.beginPath();g.moveTo(x-9,RH);g.lineTo(x,RH-h2);g.lineTo(x+9,RH);g.fill();}}// 08.09: силуэты переднего плана — параллакс быстрее камеры, глубина сцены
arenaView.post();
if(b.p1.state==='super'||b.p2.state==='super'||b.phase==='fatal'){g.fillStyle='rgba(10,0,0,.22)';g.fillRect(0,0,RW,RH);}// 08.09: драматическое затемнение при супере/фаталити
if(b.loser&&b.loser.laserT&&b.phase==='fatal'&&b.phaseT>60&&b.phaseT<160){g.fillStyle='rgba(248,248,96,.8)';g.fillRect(b.loser.x-S.cam-6,0,12,FL+GR);}
g.restore();
if(S.flashS>0&&!OPT.reduce){g.fillStyle='rgba(255,255,255,'+(S.flashS/10)+')';g.fillRect(0,0,RW,RH);}
drawHUD(b);
if(S.wipe>0&&!OPT.reduce){const wh=RH*(S.wipe/24);g.fillStyle='#000';g.fillRect(0,0,RW,wh/2);g.fillRect(0,RH-wh/2,RW,wh/2);}// 30.09: раскрывающиеся шторки
for(const f of[b.p1,b.p2])if(f.combo>=2&&f.comboT<50){const sc2=1+.25*Math.max(0,1-f.comboT/8);g.save();g.translate(f===b.p1?70:RW-70,80);g.scale(sc2,sc2);g.font='12px "Russo One"';g.textAlign='center';g.fillStyle=f.combo>=5?'#e02020':f.combo>=3?'#f08020':'#e8c040';g.fillText('КОМБО x'+f.combo,0,0);g.restore();}// 08.09: комбо-счётчик — цвет растёт с серией
if(b.phase==='finish'){
const left=Math.max(0,1-b.phaseT/FATAL_FRAMES);g.fillStyle='rgba(0,0,0,.6)';g.fillRect(RW/2-80,220,160,5);g.fillStyle=left>.35?'#c8a040':'#e04020';g.fillRect(RW/2-80,220,160*left,5);g.strokeStyle='#c8a040';g.lineWidth=1;g.strokeRect(RW/2-80.5,219.5,161,6);
if(!b.winner.ctrl.ai){const w=b.winner,p2=w===b.p2,prog=b.fatalProg||0,seq=fatalMapped(w.def.fat,w.face),n=seq.length,secs=Math.max(0,Math.ceil((FATAL_FRAMES-b.phaseT)/60));
g.fillStyle='rgba(8,5,4,.86)';g.fillRect(116,52,192,36);frame(116,52,192,36);
g.font='7px "Russo One"';g.fillStyle='#c8a040';g.textAlign='left';g.fillText('ФАТАЛИТИ',124,63);
g.textAlign='right';g.fillStyle=secs>3?'#c8a040':'#e04020';g.fillText(secs+' С',300,63);
g.font='12px "Russo One"';g.fillStyle=blink()?'#e02020':'#f0e8d0';g.textAlign='center';g.fillText(seqTxt(w.def.fat,p2,w.face),212,76);
const bw=12,gap=5,tw=n*bw+(n-1)*gap,sx=212-tw/2;
for(let i=0;i<n;i++){const x=sx+i*(bw+gap),on=i<prog;g.fillStyle=on?'#e04020':'#2a2522';g.fillRect(x,81,bw,3);if(on){g.fillStyle='rgba(255,140,110,.55)';g.fillRect(x,81,bw,1);}}}}
if((b.phase==='fatal'||b.phase==='over')&&b.phaseT>30){g.font='8px "Russo One"';g.fillStyle='#e8e0c0';g.textAlign='center';g.fillText('J — ПРОПУСТИТЬ',RW/2,232);}
if(S.announce&&S.announce.t<110){const t=S.announce.t;const sc=t<10?3-t*.2:1;
let a=1;if(t>90)a=1-(t-90)/20;
g.save();g.globalAlpha=clamp(a,0,1);
let col=S.announce.col;if(S.announce.pulse)col=blink()?'#e02020':'#e8c040';
bigText(S.announce.txt,118,col,sc);g.restore();}
if(S.paused)drawPause();}
function drawFakeShift(f,cam,off){const sx=f.x;f.x=sx+off;drawF(f,cam);f.x=sx;}
requestAnimationFrame(loop);

if (new URLSearchParams(location.search).has('debug')) {
  window.KARNAGE = {
    get GAME() { return S.GAME; },
    get FRAME() { return S.FRAME; },
    get paused() { return S.paused; },
    get battle() { return S.battle; },
    get projs() { return S.projs; },
    get parts() { return S.parts; },
    get fx() { return S.fx; },
    get wipe() { return S.wipe; },
    get announce() { return S.announce; },
    get MU() { return MU; },
    get AU() { return AU; },
    get keys() { return keys; },
    get TOUCH() { return TOUCH; },
    get fxAssets() { return FX; },
    get arenaAssets() { return ARENA_IMG; },
    get uiAssets() { return UI; },
    get OPT() { return OPT; },
    get settingsIdx() { return S.settingsIdx; },
    get ladder() { return S.ladder; },
    get lStep() { return S.lStep; },
    get arcP1() { return S.arcP1; },
    get arcTotal() { return arcTotal(); },
    arcEnding,
    BOSS,
    TOP,
    addTop,
    loadArcRun,
    saveArcRun,
    clearArcRun,
    resumeSavedArcade,
    startLadder,
    arcFight,
    autoHit,
    onKey,
    smoke,
    spriteFx,
    impactFx,
    toLobby,
    applyCrt,
    SFX,
    step,
    render,
    newBattle,
    startRound,
    startFatal,
    updFs,
    resolveHit,
    drawF,
    drawArena,
    F,
    Ctrl,
    KM1,
    KM2,
    CH,
    AR,
    ATK,
    setSeed(seed) { Math.random = mul(seed | 0); },
    setDebug(values) {
      if ('GAME' in values) S.GAME = values.GAME;
      if ('paused' in values) S.paused = values.paused;
      if ('lastSel' in values) S.lastSel = values.lastSel;
      if ('contT' in values) S.contT = values.contT;
      if ('arcP1' in values) S.arcP1 = values.arcP1;
      if ('ladder' in values) S.ladder = values.ladder;
      if ('lStep' in values) S.lStep = values.lStep;
      if ('sel' in values) S.sel = values.sel;
    },
    snapshot() {
      const f = (x) => x && ({
        id: x.def.id, state: x.state, hp: x.hp, hpLag: x.hpLag,
        rage: x.rage, x: x.x, y: x.y, face: x.face,
        wins: x.wins, combo: x.combo || 0, netT: x.netT,
        frozen: x.frozen, poison: x.poison, invis: x.invis,
        hidden: !!x.hidden, pale: !!x.pale, spec2go: x.spec2go || 0
      });
      return {
        GAME: S.GAME, FRAME: S.FRAME, paused: S.paused,
        phase: S.battle && S.battle.phase,
        round: S.battle && S.battle.round,
        timer: S.battle && S.battle.timer,
        winner: S.battle && S.battle.winner && S.battle.winner.def.id,
        loser: S.battle && S.battle.loser && S.battle.loser.def.id,
        p1: S.battle && f(S.battle.p1),
        p2: S.battle && f(S.battle.p2),
        projs: S.projs.length,
        parts: S.parts.length,
        fx: S.fx.length
      };
    }
  };
}
}
