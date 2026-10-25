import { CH, BOSS, DUMMY } from '../data/characters.js';
import { ENDINGS } from '../data/endings.js';
import { AR, initArenas } from '../data/arenas.js';
import { createArenaView } from './world/arena.js';
import { createState, createSelection, setScreen, beginBattle, resetRound } from './core/state.js';
import { createParticles } from './fx/particles.js';
import { ATK, WM, createFighter } from './fighter.js';
import { createCombat } from './combat.js';
import { createInput } from './input.js';
import { createRender } from '../render/render.js';
import { createUiArt } from '../render/ui-art.js';
import { createAudio } from '../audio/audio.js';

export function startKarnage(fxAssets = {}, arenaAssets = {}, uiAssets = {}) {
const RW=424,RH=240,FL=206,AW=760,GR=8,OUT='#0e0b08';
const UI_GOLD='#e8c040',UI_RED='#e02020',UI_BLUE='#3868c8',UI_TEXT='#e8e0c0',UI_MUTED='#807850',UI_ACCENT='#c8a040';
const AI_DIFF_NAMES=['ЛЁГКАЯ','НОРМАЛЬНАЯ','ТЯЖЁЛАЯ'];
const isTouchUI=()=>document.body.classList.contains('touch');
const FATAL_FRAMES=600,FATAL_INPUT=240;// 25.10: 10 секунд на добивание и 4 секунды на ввод — запас для спокойного набора
const FX=fxAssets||{},ARENA_IMG=arenaAssets||{},UI=uiAssets||{};
const S=createState();
const cv=document.getElementById('cv'),g=cv.getContext('2d',{alpha:false});// 25.10: непрозрачный canvas быстрее композитится
let RSCALE=5,MAX_SCALE=6,MIN_SCALE=3,scaleReady=false,scaleDirty=false,lastDpr=window.devicePixelRatio||1;
let perfAcc=0,perfFrames=0,perfBadWin=0,perfGoodWin=0,perfWarm=400,perfCool=0,perfLast=0,perfAvg=0;
function resetPerf(){perfAcc=0;perfFrames=0;perfBadWin=0;perfGoodWin=0;perfCool=0;}
function applyRScale(){const w=RW*RSCALE,h=RH*RSCALE;if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}scaleDirty=false;}
function fit(){let s=Math.min(innerWidth/RW,innerHeight/RH);if(s>=2)s=Math.floor(s);cv.style.width=s*RW+'px';cv.style.height=s*RH+'px';document.body.classList.toggle('portrait',innerHeight>innerWidth);
const touch=navigator.maxTouchPoints>0,dpr=Math.min(3,window.devicePixelRatio||1),cap=touch?4:6;
lastDpr=window.devicePixelRatio||1;
MAX_SCALE=Math.max(touch?3:4,Math.min(cap,Math.round(s*dpr*1.5)));
MIN_SCALE=Math.min(touch?2:4,MAX_SCALE);
if(!scaleReady){RSCALE=MAX_SCALE;scaleReady=true;}else RSCALE=Math.max(MIN_SCALE,Math.min(MAX_SCALE,RSCALE));
resetPerf();perfWarm=Math.max(perfWarm,300);
applyRScale();}
addEventListener('resize',fit);fit();
if(document.fonts)document.fonts.load('20px "Russo One"');
const clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t,rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.random()*a.length|0],blink=()=>((S.FRAME>>4)%2===0);
function mul(s){return function(){s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}
initArenas({ mul, RW, RH, FL, GR });
function colorParts(c){if(c[0]==='#')return[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];const m=/^rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c);return m?[+m[1],+m[2],+m[3]]:[0,0,0];}
function mix(a,b,t){const A=colorParts(a),B=colorParts(b);return'rgb('+(lerp(A[0],B[0],t)|0)+','+(lerp(A[1],B[1],t)|0)+','+(lerp(A[2],B[2],t)|0)+')';}
const shade=(h,k)=>mix(h,'#000000',1-k);
const {
  drawF, drawFighterGlow, drawPort, drawPortFit, drawFake, drawHUD, drawFatalPanel,
  bigText, frame, panel, seqTxt, drawProjs, drawFx,
} = createRender({
  g, S, UI, CH, WM, RW, FL, GR, OUT,
  lerp, rnd, mix, shade, blink, fatalMapped, fatalFrames: FATAL_FRAMES,
});
const uiArt=createUiArt({RW,RH});
const redrawUiArt=()=>uiArt.invalidate();
if(document.fonts){
  document.fonts.load('20px "Russo One"').then(redrawUiArt).catch(()=>{});
  document.fonts.load('50px "Russo One"').then(redrawUiArt).catch(()=>{});
  document.fonts.load('24px "Rubik Mono One"').then(redrawUiArt).catch(()=>{});
}
const arenaView=createArenaView({g,RW,RH,FL,AR,assets:ARENA_IMG,shade,mix});
/* ЗВУК */
// 25.10: звук включён по умолчанию; контекст создаётся после первого ввода
const OPT={crt:true,blood:true,shake:true,reduce:false};
try{const raw=JSON.parse(localStorage.karnageOpts||'{}');if(raw&&typeof raw==='object'){for(const k of['crt','blood','shake','reduce'])if(typeof raw[k]==='boolean')OPT[k]=raw[k];}}catch(e){}
const saveOpts=()=>{try{localStorage.karnageOpts=JSON.stringify(OPT);}catch(e){}};
const applyCrt=()=>{const el=document.getElementById('crt');if(el)el.style.display=OPT.crt?'block':'none';};
applyCrt();
const {P,blood,updParts,drawParts,drawDecals}=createParticles({g,state:S,options:OPT,FL,GR,rnd});
const { AU, SFX, MU, initA, say, setVol, saveSet, music } = createAudio({ S, clamp, rnd });
const dayStamp=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
const topRaw=()=>{try{const raw=JSON.parse(localStorage.karnageTop||'[]');if(!Array.isArray(raw))return[];return raw.filter(e=>e&&Number.isInteger(e.id)&&e.id>=0&&e.id<CH.length&&Number.isFinite(e.step)&&e.step>=0);}catch(e){return[]}};
const topBest=()=>{const best=new Map();for(const e of topRaw()){const cur=best.get(e.id);if(!cur||e.step>cur.step)best.set(e.id,{id:e.id,step:e.step,...(typeof e.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(e.date)?{date:e.date}:{})});}return [...best.values()].sort((a,b)=>b.step-a.step||a.id-b.id);};// 25.10: одна лучшая запись на бойца
let topCacheRaw=null,topCache=null,menuCacheKey='',menuCache=null;// 25.10: титул и меню не парсят localStorage каждый кадр
const TOP=()=>{let raw='[]';try{raw=localStorage.karnageTop||'[]';}catch(e){}if(raw!==topCacheRaw){topCacheRaw=raw;topCache=topBest().slice(0,5);}return topCache;};
const addTop=(id,step,date)=>{try{if(!Number.isInteger(id)||id<0||id>=CH.length||!Number.isFinite(step)||step<0)return;const day=typeof date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(date)?date:dayStamp();const best=new Map();for(const e of topRaw()){const cur=best.get(e.id);if(!cur||e.step>cur.step)best.set(e.id,{id:e.id,step:e.step,...(typeof e.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(e.date)?{date:e.date}:{})});}const cur=best.get(id);if(!cur||step>cur.step)best.set(id,{id,step,date:day});localStorage.karnageTop=JSON.stringify([...best.values()].sort((a,b)=>b.step-a.step||a.id-b.id).slice(0,5));}catch(e){}};
const ARC_KEY='karnageArcRun',ARC_VERSION=1,ARC_TOTAL=CH.length-1;// 25.10: 11 обычных противников + финальный босс
function validArcRun(run){if(!run||run.v!==ARC_VERSION)return false;if(!Number.isInteger(run.c1)||run.c1<0||run.c1>=CH.length)return false;if(!Array.isArray(run.ladder)||run.ladder.length!==CH.length-2)return false;if(!run.ladder.every(id=>Number.isInteger(id)&&id>=0&&id<CH.length&&id!==run.c1&&id!==BOSS.id))return false;if(new Set(run.ladder).size!==run.ladder.length)return false;if(!Number.isInteger(run.step)||run.step<0||run.step>=ARC_TOTAL)return false;if(run.diff!==undefined&&(!Number.isInteger(run.diff)||run.diff<0||run.diff>2))return false;return true;}
function loadArcRun(){try{const run=JSON.parse(localStorage[ARC_KEY]||'null');return validArcRun(run)?run:null;}catch(e){return null}}
function saveArcRun(){try{if(!Number.isInteger(S.arcP1)||!S.ladder.length||!Number.isInteger(S.lStep))return;const run={v:ARC_VERSION,c1:S.arcP1,ladder:S.ladder.slice(),step:S.lStep,diff:S.arcDiff};if(validArcRun(run)){localStorage[ARC_KEY]=JSON.stringify(run);menuCacheKey='';}}catch(e){}}
function clearArcRun(){try{localStorage.removeItem(ARC_KEY);}catch(e){}menuCacheKey='';}
function arcTotal(){return S.ladder.length?S.ladder.length+1:ARC_TOTAL;}
/* ВВОД */
const {keys,TOUCH,KM1,KM2,Ctrl,press,clearPress}=createInput();
let resetTouch=()=>{};
function resetInput(){for(const k in keys)keys[k]=false;for(const k in TOUCH)TOUCH[k]=0;clearPress();resetTouch();if(S.battle)for(const w of [S.battle.p1,S.battle.p2])if(w&&w.ctrl&&w.ctrl.cancel)w.ctrl.cancel();}// 25.10: после переходов, паузы и потери фокуса старый ввод не должен протекать в бой
addEventListener('pointerdown',()=>{initA();if(AU.ctx&&AU.ctx.state==='suspended')AU.ctx.resume();if(S.GAME==='title'){toLobby('menu');SFX.sel();}});// 08.09: клик мыши на титуле тоже открывает меню
function bindTouch(){const isTouch=('ontouchstart' in window)||navigator.maxTouchPoints>0;if(!isTouch)return;document.body.classList.add('touch');const root=document.createElement('div');root.id='touch';root.innerHTML='<div class="dpad"><button class="up" data-key="u">▲</button><button class="left" data-key="l">◀</button><button class="down" data-key="d">▼</button><button class="right" data-key="r">▶</button></div><div class="actions"><button class="punch" data-key="P">P</button><button class="kick" data-key="K">K</button><button class="block" data-key="B">БЛОК</button></div><button class="pause" data-key="pause">Ⅱ</button>';document.body.appendChild(root);const codes={l:'ArrowLeft',r:'ArrowRight',u:'ArrowUp',d:'ArrowDown',P:'Enter',K:'KeyK',B:'Escape'};const held=new Map();const btnOf=key=>root.querySelector(`[data-key="${key}"]`);const release=(key,id)=>{const ids=held.get(key);if(!ids||!ids.delete(id)||ids.size)return;held.delete(key);if(key!=='pause')TOUCH[key]=0;btnOf(key)?.classList.remove('on');};const releasePointer=id=>{for(const key of [...held.keys()])if(held.get(key).has(id))release(key,id);};const releaseAll=()=>{for(const key of [...held.keys()])for(const id of [...held.get(key)])release(key,id);};
resetTouch=releaseAll;
for(const btn of root.querySelectorAll('button')){const key=btn.dataset.key;const down=e=>{e.preventDefault();e.stopPropagation();if(btn.setPointerCapture)try{btn.setPointerCapture(e.pointerId);}catch(err){}if(!held.has(key))held.set(key,new Set());held.get(key).add(e.pointerId);btn.classList.add('on');initA();if(AU.ctx&&AU.ctx.state==='suspended')AU.ctx.resume();if(key==='pause'){onKey('Escape');return;}TOUCH[key]=1;press(key,S.FRAME);if(S.GAME!=='fight'||S.paused)onKey(codes[key]);else if(key==='P')onKey('KeyJ');};const up=e=>{e.preventDefault();release(key,e.pointerId);};btn.addEventListener('pointerdown',down);btn.addEventListener('pointerup',up);btn.addEventListener('pointercancel',up);btn.addEventListener('lostpointercapture',up);}
addEventListener('pointerup',e=>releasePointer(e.pointerId),true);// 25.10: отпускание вне кнопки больше не оставляет блок/удар зажатыми
addEventListener('pointercancel',e=>releasePointer(e.pointerId),true);
addEventListener('touchcancel',releaseAll,{passive:true});}// 24.10: touch-управление
bindTouch();
addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();if(e.repeat){if((S.GAME!=='fight'||S.paused)&&['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyW','KeyA','KeyS','KeyD'].includes(e.code))onKey(e.code);return;}keys[e.code]=true;press(e.code,S.FRAME);initA();if(AU.ctx&&AU.ctx.state==='suspended')AU.ctx.resume();onKey(e.code);});// 25.10: удержание стрелок листает меню, но не повторяет выбор
addEventListener('keyup',e=>{keys[e.code]=false;});
addEventListener('blur',()=>{resetInput();if(S.GAME==='fight'&&!S.paused){S.paused=true;S.pauseIdx=0;}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){resetInput();if(S.GAME==='fight'&&!S.paused){S.paused=true;S.pauseIdx=0;}}});// 25.10: событие приходит на document, не только на window
addEventListener('pagehide',resetInput);// 25.10: уход со страницы не оставляет зажатые кнопки в bfcache
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
if(A.snow&&S.FRAME%2===0)S.parts.push({x:S.cam+rnd(-10,RW+10),y:-4,vx:rnd(-.3,.3),vy:rnd(.3,.6),c:'rgba(230,240,255,.7)',l:420,s:1,gv:0,kf:1});
if(A.sand&&S.FRAME%8===0)S.parts.push({x:S.cam+RW+10,y:rnd(60,FL),vx:rnd(-2.6,-1.6),vy:0,c:'rgba(220,180,110,.2)',l:120,s:1,gv:0,line:1,kf:1});
if(A.ember&&S.FRAME%3===0)S.parts.push({x:S.cam+rnd(0,RW),y:FL+rnd(-4,10),vx:rnd(-.3,.3),vy:-rnd(.4,1),c:pick(['#f06020','#c84018','#f0a030']),l:rnd(60,120),s:rnd(1,2),gv:-.01});
if(A.rain&&Math.random()<.004){S.flashS=Math.max(S.flashS,3);SFX.thunder();}}// 08.09: молния и гром на грозовой арене
/* ЧАСТИЦЫ */
function spriteFx(name,x,y,opts){const a=FX[name];if(!a||!a.ready)return false;opts=opts||{};const frames=a.frames||1;const fps=a.fps||30;if(S.fx.length>40)S.fx.splice(0,S.fx.length-40);S.fx.push({ty:'sprite',img:a.image,x,y,t:0,dur:opts.duration??Math.max(1,Math.round(frames*60/fps)),frames,frameW:a.frameWidth,frameH:a.frameHeight,anchor:a.anchor||[a.frameWidth/2,a.frameHeight/2],blend:a.blend||'source-over',scale:opts.scale??a.scale??1,alpha:opts.alpha??a.alpha??1});return true;}
function impactBurst(x,y,col,size){S.fx.push({ty:'impact',x,y,t:0,life:12,col:col||'#f8d060',r:size||18});}// 25.10: цветное кольцо поверх спрайтового импакта — попадание читается у любой стихии
function slashImpact(x,y,col,face){S.fx.push({ty:'slashimpact',x,y,t:0,life:10,col:col||'#ffffff',face:face<0?-1:1});}// 25.10: след клинка для осколков Кармин и Аямэ
function impactFx(ty,x,y,color,p){const shard=ty==='shard',c=color||'#f8d060';
  if(ty==='ice'||(shard&&color==='#c8ecff')){const ok=spriteFx('iceImpact',x,y,{scale:shard?.52:.60,alpha:shard?.74:.76,duration:shard?9:13});impactBurst(x,y,'#9adcee',shard?15:20);return ok;}
  if(ty==='shadow'||(shard&&color==='#7a3aa8')){const ok=spriteFx('shadowImpact',x,y,{scale:shard?.5:.62,alpha:shard?.7:.74,duration:shard?9:14});impactBurst(x,y,'#a050d0',shard?15:20);return ok;}
  if(ty==='fire'||(shard&&(color==='#f06020'||color==='#f8d060'))){const ok=spriteFx('fireImpact',x,y,{scale:shard?.5:.68,alpha:shard?.76:.78,duration:shard?9:14});impactBurst(x,y,c,shard?15:20);return ok;}
  if(ty==='bolt'){const ok=spriteFx('hitHeavy',x,y,{scale:.5,alpha:.62,duration:8});S.fx.push({ty:'boltfx',x,y:FL+GR,t:0});impactBurst(x,y,'#f8f860',22);for(let i=0;i<6;i++)P(x+rnd(-8,8),y-rnd(0,22),rnd(-2,2),rnd(-2,1),'#f8f860',18,2,0);return ok;}
  if(ty==='net'){const ok=spriteFx('block',x,y,{scale:.5,alpha:.55,duration:10});impactBurst(x,y,'#c8c8a0',18);return ok;}
  if(ty==='wave'){const ok=spriteFx('dust',x,FL+GR,{scale:1.05,alpha:.55,duration:14});impactBurst(x,y,c,24);for(let i=0;i<8;i++)P(x+rnd(-10,10),y-2,rnd(-1.6,1.6),rnd(-2.6,-.5),c,18,2,.08);return ok;}// 25.10: пыль волны стоит на полу, а не на высоте снаряда
  if(ty==='meteor'||ty==='rocket'||ty==='bomb'){const ok=spriteFx('explosion',x,y,{scale:1,alpha:.9,duration:24});impactBurst(x,y,'#f8d060',28);return ok;}
  if(shard){
    if(color==='#d82040'){spriteFx('hitLight',x,y,{scale:.34,alpha:.62,duration:7});impactBurst(x,y,c,16);slashImpact(x,y,c,p&&p.vx);return true;}
    if(color==='#9adcee'){spriteFx('iceImpact',x,y,{scale:.42,alpha:.68,duration:9});impactBurst(x,y,c,16);slashImpact(x,y,c,p&&p.vx);return true;}
    if(color==='#7ac83a'){spriteFx('hitLight',x,y,{scale:.32,alpha:.6,duration:7});impactBurst(x,y,c,15);return true;}
    if(color==='#c8a060'){spriteFx('dust',x,y,{scale:.55,alpha:.55,duration:10});impactBurst(x,y,c,16);return true;}
    if(color==='#b89aff'){spriteFx('shadowImpact',x,y,{scale:.5,alpha:.7,duration:10});impactBurst(x,y,c,16);return true;}
    if(color==='#f0c850'){spriteFx('fireImpact',x,y,{scale:.52,alpha:.76,duration:10});impactBurst(x,y,c,16);return true;}
    const ok=spriteFx('hitLight',x,y,{scale:.34,alpha:.62,duration:7});impactBurst(x,y,c,14);return ok;
  }
  return false;}
/* БОЕЦ */
const {autoHit,resolveHit}=createCombat({S,SFX,P,blood,spriteFx,rnd,pick});
const F=createFighter({
  S, FL, GR, AW, clamp, lerp, rnd, pick, P, blood, spriteFx, SFX, smoke, resolveHit, autoHit,
});
function smoke(x,y){spriteFx('smoke',x,y,{scale:.85,alpha:.4});for(let i=0;i<10;i++)P(x+rnd(-8,8),y+rnd(-20,10),rnd(-1,1),rnd(-1.5,-.2),'#889',30,3,-.02);}
/* СНАРЯДЫ */
function updProjs(){if(S.battle&&['finish','fatal','over','ko'].includes(S.battle.phase)){S.projs.length=0;return;}if(S.projs.length>60)S.projs.splice(0,S.projs.length-60);// 08.09: страховочный лимит
for(let i=S.projs.length;i--;){const p=S.projs[i];p.l--;p.x+=p.vx;p.y+=p.vy;
if(S.FRAME%2===0){
  if(p.ty==='fire')P(p.x,p.y,rnd(-.4,.4),rnd(-.8,-.2),pick(['#f06020','#f8d060']),16,2,-.01);
  else if(p.ty==='ice')P(p.x,p.y,rnd(-.3,.3),rnd(-.5,.2),'#c8ecff',16,1,-.005);
  else if(p.ty==='shadow')P(p.x,p.y,rnd(-.3,.3),rnd(-.6,-.1),'#7a3aa8',18,2,-.01);
  else if(p.ty==='wave')P(p.x,FL+GR-2,rnd(-.5,.5),rnd(-1.6,-.5),p.c||'#9a9080',14,2,.06);
  else if(p.ty==='meteor'||p.ty==='rocket'){P(p.x+rnd(-3,3),p.y-5,rnd(-.5,.5),rnd(-2,-.6),pick(['#f06020','#f8d060']),16,2,-.01);if(S.FRAME%6===0)P(p.x+rnd(-4,4),p.y-10,rnd(-.4,.4),rnd(-1.2,-.2),'#6a5a44',24,3,-.02);}
  else if(p.ty==='bomb'){P(p.x+rnd(-2,2),p.y+2,rnd(-.4,.4),rnd(-1.2,-.1),pick(['#6a5a44','#f0a030']),20,2,-.01);}
  else if(p.ty==='net'&&S.FRAME%4===0)P(p.x,p.y,rnd(-.6,.6),rnd(-.6,.2),'#c8c8a0',14,1,0);
  else if(p.ty==='bolt'&&S.FRAME%2===0)P(p.x+rnd(-9,9),FL+GR-2,rnd(-1,1),rnd(-1.8,-.3),'#f8f860',12,1,.08);
}// 08.09: шлейфы снарядов
if(p.ty==='bomb'||p.ty==='meteor'||p.ty==='rocket')p.vy+=.12;
if(p.ty==='shard'&&S.FRAME%3===0)P(p.x,p.y,rnd(-.3,.3),rnd(-.4,.2),p.c,14,2,-.005);// 08.09: шлейф осколка
if(p.hom&&p.o&&p.o.foe&&p.l%2===0){const f2=p.o.foe;if(f2.state!=='down'){const dx2=f2.x-p.x,dy2=f2.y-f2.def.h*.5-p.y,dd2=Math.sqrt(dx2*dx2+dy2*dy2)||1;p.vx+=dx2/dd2*.45;p.vy+=dy2/dd2*.45;const sp2=Math.sqrt(p.vx*p.vx+p.vy*p.vy);if(sp2>4.6){p.vx*=4.6/sp2;p.vy*=4.6/sp2;}}}// 30.09: наведение с капом скорости — звёзды не пролетают мимо// 30.09: самонаведение звёзд Веги
const f=p.o.foe;
if(f&&!f.hidden&&!f.dodging&&f.state!=='down'&&f.state!=='victim'){const b=f.box;
if(p.ty!=='meteor'&&p.ty!=='rocket'&&p.ty!=='bomb'&&p.x>b.x-4&&p.x<b.x+b.w+4&&p.y>b.y-6&&p.y<b.y+b.h+4){
const wf=f.frozen>0;const hit=resolveHit(p.o,f,p.d,p.k?{knock:1,noHitFx:1}:{noHitFx:1});if(hit!=='block')impactFx(p.ty,p.x,p.y,p.c,p);// 08.09: shard с k:1 валит с ног; 25.10: снаряд рисует один импакт, без generic hit-спрайта
const blk=f.state==='block';// 08.09: блок гасит контроль-эффекты снарядов
if((p.ty==='ice'||p.frz)&&!wf&&!blk&&f.hp>0){f.frozen=85;f.state='frozen';f.atk=null;SFX.freeze();}// 25.10: ледяные иглы тоже замораживают
// 08.09: баланс Крио — заморозка 100→85 кадров; звон льда; блок больше не замораживает
if(p.pois&&!blk&&f.hp>0){f.poison=120;f.poisonC='#7ac83a';}// 08.09: яд через блок не проходит; 30.09: цвет яда всегда зелёный
if(p.bl&&!blk&&f.hp>0){f.poison=150;f.poisonC='#d82040';}// 30.09: кровотечение от игл Кармин
if(p.ty==='net'&&!blk&&f.hp>0){f.netT=95;f.state='net';f.atk=null;}// 08.09: блок больше не опутывает
if(p.ty==='shadow'&&!blk){p.o.hp=Math.min(100,p.o.hp+p.d*.7);for(let j=0;j<6;j++)P(p.x,p.y,(p.o.x-p.x)*.04,rnd(-1,-.3),'#7a3aa8',26,2,0);}// 08.09: блок гасит вытягивание
S.projs.splice(i,1);continue;}}
if((p.ty==='meteor'||p.ty==='rocket'||p.ty==='bomb')&&p.y>=FL+GR-2){const col=p.ty==='rocket'?'#f0a030':p.ty==='meteor'?'#f06020':'#f8d060';spriteFx('explosion',p.x,FL+GR-2,{scale:1.05,alpha:.9});spriteFx('dust',p.x,FL+GR,{scale:1.25,alpha:.5});S.fx.push({ty:'boom',x:p.x,y:FL+GR-4,t:0});S.fx.push({ty:'impact',x:p.x,y:FL+GR-4,t:0,life:16,col,r:30});SFX.boom();S.shake=6;for(let j=0;j<10;j++)P(p.x+rnd(-14,14),FL+GR-2,rnd(-2.4,2.4),rnd(-3.4,-.6),pick(['#6a5a44','#3a3028','#8a7a5c']),24,2,.12);for(let j=0;j<8;j++)P(p.x+rnd(-10,10),FL+GR-4,rnd(-1.5,1.5),rnd(-2.5,-.4),pick(['#f06020','#f8d060','#f0a030']),18,2,-.01);const f=p.o.foe;if(f&&!f.dodging&&Math.abs(f.x-p.x)<30&&f.state!=='down'&&f.state!=='victim')resolveHit(p.o,f,p.d,{still:1,noHitFx:1});S.projs.splice(i,1);continue;}// 01.10: AoE 26→30, без отброса и без требования onGround (жертва подпрыгивает от попаданий)// 08.09: AoE бомб не должен трогать жертву фаталити
if(p.l<=0||p.x<-30||p.x>AW+30)S.projs.splice(i,1);}}
function updFx(){for(let i=S.fx.length;i--;){const f=S.fx[i];f.t++;if(f.ty==='boom'&&f.t%3===0){const r=f.t*1.6;P(f.x+rnd(-r,r),f.y+rnd(-r,r)*.4,rnd(-1,1),rnd(-2,0),'#f06020',16,2);}if(f.t>80||(f.life&&f.t>f.life)||(f.ty==='rock'&&f.t>26)||(f.ty==='boom'&&f.t>22)||(f.ty==='nova'&&f.t>26)||(f.ty==='slash'&&f.t>10)||(f.ty==='boltfx'&&f.t>8)||(f.ty==='ring'&&f.t>14)||(f.ty==='castbolt'&&f.t>9)||(f.ty==='sprite'&&f.t>f.dur))S.fx.splice(i,1);
if(S.fx.length>200)S.fx.splice(0,S.fx.length-200);}}// 30.09: страховочный лимит эффектов; 08.09: +ring
/* ИИ */
const RANGED=[0,2,3,6,7,8,9,10,12];// 30.09: +Кармин, +Вега
const ARC_AI=[{base:0,step:.35,boss:5},{base:1,step:.5,boss:7},{base:2,step:.6,boss:7}];// 25.10: лёгкая/нормальная/тяжёлая аркада
function arcAiLevel(){const d=ARC_AI[S.arcDiff]||ARC_AI[1];const boss=S.lStep>=S.ladder.length;return clamp(boss?d.boss:Math.round(d.base+S.lStep*d.step),0,7);}
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
if(f.specCd<=0&&f.aiSpecT<=0&&['idle','walk'].includes(f.state)&&Math.random()<.07+lvl*.015){const far=RANGED.includes(f.def.id);if((far&&ad>110)||(!far&&ad<70)){if(f.startSpec(foe,true)){f.aiDir=null;return;}}}
if(f.specCd<=0&&f.aiSpecT<=0&&['idle','walk'].includes(f.state)&&Math.random()<.035+lvl*.006&&(RANGED.includes(f.def.id)?ad>90:ad>60)){if(f.startSpec2(foe,true)){f.aiDir=null;return;}}// 08.09: ИИ иногда применяет второй спец (дальникам — издали, ближникам — со средней дистанции)
if(ad>120){f.aiDir=dx>0?'r':'l';if(Math.random()<.08)f.aiDir=null;return;}
if(ad>56){if(Math.random()<.05+lvl*.012){c.ax.u=true;f.aiDir=dx>0?'r':'l';return;}// 08.09: прыжок-вближение
f.aiDir=Math.random()<.8?(dx>0?'r':'l'):null;return;}
if(Math.random()<agg){f.aiDir=null;const pk=Math.random();if(pk<.07){c.ax.P=true;c.ax.K=true;}else if(pk<.3)c.ax.P=true;else if(pk<.58)c.ax.K=true;else if(pk<.75){c.ax.d=true;c.ax.P=true;}else{c.ax.d=true;c.ax.K=true;}return;}
if(Math.random()<.28){f.aiDir=null;c.ax.B=true;return;}
f.aiDir=Math.random()<.6?(dx>0?'r':'l'):null;}
/* БОЙ */
function toLobby(gm){topCacheRaw=null;topCache=null;menuCacheKey='';menuCache=null;resetInput();setScreen(S,gm);}
function newBattleDefs(d1,c1,d2,c2,arena){resetInput();S.battle={p1:new F(d1,c1),p2:new F(d2,c2),round:1,phase:'intro',phaseT:0,timer:60,arena};
S.battle.p1.foe=S.battle.p2;S.battle.p2.foe=S.battle.p1;beginBattle(S,S.battle,{h1:0,d1:0,c1:0,h2:0,d2:0,c2:0});// 08.09: сброс статистики
startRound();S.GAME='fight';}// 08.09: newBattle теперь расставляет бойцов через startRound — раньше оба спавнились в одной точке x=200
function newBattle(i1,c1,i2,c2,arena){newBattleDefs(typeof i1==='object'?i1:CH[i1],c1,typeof i2==='object'?i2:CH[i2],c2,arena);}// 25.10: бой принимает и def-объект финального босса
function arcOpponent(step){if(step<S.ladder.length){const id=S.ladder[step];return{def:CH[id],arena:CH[id].arena};}return{def:BOSS,arena:BOSS.arena};}// 25.10: после 11 обычных противников — отдельный босс
function arcFight(){if(!S.ladder.length)return;const o=arcOpponent(S.lStep);newBattleDefs(CH[S.arcP1],new Ctrl(KM1),o.def,new Ctrl(KM2),o.arena);S.battle.mode='arcade';S.battle.p2.ctrl.ai=true;S.battle.aiLvl=arcAiLevel();S.GAME='vs';S.vsT=0;S.vsEscT=0;saveArcRun();if(S.lStep>=S.ladder.length)say('Final boss');}// 25.10: единый запуск боя аркады + автосохранение
function startRound(){const b=S.battle;resetRound(S,OPT.reduce?0:24);b.p1.reset(180,1);b.p2.reset(AW-180,-1);b.phase='intro';b.phaseT=0;b.timer=60;// 08.09: бойцы по краям видимой области (180/580, дистанция 400) — раньше кучковались у центра
b.p1.rage=Math.floor(b.p1.rage*.5);b.p2.rage=Math.floor(b.p2.rage*.5);// 08.09: ярость переносится наполовину — без мгновенного супера
S.announce={txt:'РАУНД '+b.round,t:0,col:'#e8c040'};say('Round '+['one','two','three'][Math.min(2,b.round-1)]);}
function endBattle(w){S.battle.phase='over';S.battle.phaseT=0;S.battle.winner=w;w.state='win';w.st=0;w.atk=null;if(S.battle.loser)S.battle.loser.defeated=1;S.projs.length=0;
S.announce={txt:w.def.name+' ПОБЕЖДАЕТ',t:0,col:'#e8c040'};say(w.def.en+' wins');SFX.win();}
function startFatal(w,l){S.projs.length=0;S.battle.phase='fatal';S.battle.phaseT=0;w.state='fatal';w.st=0;w.face=l.x<w.x?-1:1;l.state='victim';l.st=0;l.vx=0;l.vy=0;l.defeated=1;SFX.sting();say('Fatality');}
function fatalStep(w,l){const t=S.battle.phaseT,fx=w.def.fatT||'laser',fc=w.def.fatC||w.def.acc||'#f8f860';
if(t===50){S.flashS=8;S.shake=10;
if(fx==='burn'){SFX.fire();l.burnT=1;}
else if(fx==='soul'){SFX.tele();S.fx.push({ty:'drain',x:l.x,t:0});l.soulT=1;}
else if(fx==='shock'){SFX.zap();l.shockT=1;for(let i=0;i<14;i++)S.fx.push({ty:'boltfx',x:l.x+rnd(-16,16),t:-(i%3)});}
else if(fx==='crush'){SFX.bone();l.crushT=1;}
else if(fx==='claw'){SFX.slash();l.clawT=1;l.sliceT=1;}// 25.10: коготь Фэнга — зелёный яд и порезы
else if(fx==='sand'){SFX.tele();l.sandT=1;}
else if(fx==='ice'){SFX.ice();l.frozen=999;l.shatterT=1;}
else if(fx==='bomb'){SFX.shoot();l.bombT=1;}
else if(fx==='drain'){SFX.sting();l.drainT=1;}
else if(fx==='blood'){SFX.sting();l.drainB=1;}
else if(fx==='blade'){SFX.slash();l.sliceT=1;l.cutT=1;}
else if(fx==='star'){SFX.cast2();l.floatT=1;l.float0=l.y;}
else{SFX.shoot();l.laserT=1;}}
if(t>50&&t<160){
if(t%6===0)P(w.x+w.face*22,w.y-w.def.h*.72,rnd(-.4,.4)+w.face*.5,rnd(-1,-.2),fc,14,2,-.01);// энергия стихии с рук победителя
if(l.burnT){for(let i=0;i<3;i++)P(l.x+rnd(-8,8),l.y-rnd(5,60),rnd(-.4,.4),rnd(-2,-.6),'#f06020',22,3,-.02);if(t>110)l.charred=1;}
if(l.clawT){for(let i=0;i<2;i++)P(l.x+rnd(-10,10),l.y-rnd(5,65),rnd(-.8,.8),rnd(-1.6,-.2),'#7ac83a',22,2,-.01);}
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
if(t===170){
if(fx==='burn'||fx==='laser'){l.hidden=1;gibs(l,'#181818');}
else if(fx==='sand'){l.hidden=1;gibs(l,'#e8e0d0');}
else if(fx==='claw'){l.hidden=1;gibs(l,'#7ac83a');gibs(l,l.def.skin);}
else if(fx==='shock')l.charred=1;
else if(fx==='crush'){blood(l.x,l.y-30,16,2.5);S.shake=10;}
else if(fx==='soul')l.tilt=-1.4;
else if(fx==='drain'){l.hidden=1;gibs(l,'#7a3aa8');}
else if(fx==='blood'){l.hidden=1;gibs(l,'#d82040');SFX.sting();}
else if(fx==='blade'){l.hidden=1;gibs(l,'#b01818');gibs(l,'#c8d8e0');SFX.slash();}
else if(fx==='star'){l.hidden=1;gibs(l,'#b89aff');gibs(l,'#e8e8ff');SFX.fatal();}
S.announce={txt:'FATALITY',t:0,col:'#e02020'};SFX.fatal();}
if(t===300)endBattle(w);}
function gibs(l,col){for(let i=0;i<22;i++)P(l.x+rnd(-8,8),l.y-rnd(5,60),rnd(-3.5,3.5),rnd(-6,-1),col,rnd(40,90),rnd(2,5));blood(l.x,l.y-30,20,2);}
function battleUpd(){const b=S.battle;b.phaseT++;
if(b.mode==='training'){
  b.phase='fight';b.phaseT=200;b.timer=99;S.freeze=0;
  updFs(1);
  for(const f of[b.p1,b.p2]){f.hp=100;f.hpLag=100;f.rage=100;f.defeated=0;if(f.state==='down'&&f.st>60){f.state='idle';f.st=0;f.y=FL+GR;f.vx=0;f.vy=0;}}
  S.freeze=0;
  return;
}
if(b.phase==='intro'){if(b.phaseT===90){S.announce={txt:'FIGHT!',t:0,col:'#e02020'};say('Fight!');}if(b.phaseT>120)b.phase='fight';updFs(0);return;}// 08.09: бойцы анимируются в интро (ввод заблокирован)
if(b.phase==='fatal'){fatalStep(b.winner,b.loser);updFs(0);return;}
if(b.phase==='over'){updFs(0);if(b.phaseT>200)afterBattle();return;}
if(S.freeze>0){for(const f of[b.p1,b.p2])f.bufferAtk();S.freeze--;return;}// 08.09: удалён мёртвый if(paused) — step уже не вызывает battleUpd на паузе; 25.10: нажатия в hitstop буферизуются
if(b.p1.hp<25&&b.p1.hp>0&&S.FRAME%50===0)SFX.heart();if(b.p2.hp<25&&b.p2.hp>0&&S.FRAME%50===25)SFX.heart();// 30.09: сердцебиение при HP<25
b.timer-=1/60;
if(b.timer<11&&b.timer>0&&S.FRAME%60===0)SFX.tick();// 08.09: тик на последних секундах
if(b.timer<=0){b.timer=0;b.phase='ko';b.phaseT=0;S.announce={txt:'\u041d\u0418\u0427\u042c\u042f',t:0,col:'#e8c040'};say('Draw');return;}
updFs(1);}
function updFs(act){const b=S.battle;
for(const f of[b.p1,b.p2])f.bufferAtk();// 25.10: буфер атак читается до update — нажатие не зависит от hitstop
for(const f of[b.p1,b.p2]){f.comboT=(f.comboT||0)+1;// 08.09: тик комбо-таймера
if(f.ctrl.ai&&act&&b.phase!=='finish'&&b.mode!=='training')aiUpd(f,f.foe,b.aiLvl);
if(f.state!=='fatal'&&f.state!=='victim')f.update(S.FRAME,f.foe);else{f.st++;f.animT++;}
f.updSuper();}
if(b.phase==='fight'&&b.mode!=='training'){const dead=[b.p1,b.p2].filter(f=>f.hp<=0&&f.state!=='victim');
if(dead.length>=2){b.phase='ko';b.phaseT=0;S.projs.length=0;for(const f of dead){f.defeated=1;f.state='down';f.st=0;f.vx=0;f.vy=0;f.y=FL+GR;}S.announce={txt:'НИЧЬЯ',t:0,col:'#e8c040'};say('Draw');}
else if(dead.length===1)roundWon(dead[0].foe);}}
function roundWon(w){const b=S.battle;w.wins++;S.projs.length=0;
if(w.wins>=2){b.loser=w.foe;b.winner=w;b.phase='finish';b.phaseT=0;
w.ctrl.clear();w.foe.ctrl.clear();
w.foe.hp=0;w.foe.state='dizzy';w.foe.st=0;w.foe.vx=0;w.foe.vy=0;w.foe.y=FL+GR;w.foe.atk=null;w.foe.defeated=1;w.foe.netT=0;w.foe.frozen=0;
b.fatalProg=0;b.fatalFace=w.foe.x<w.x?-1:1;S.announce={txt:'FINISH HIM!',t:0,col:'#e02020',pulse:1};say('Finish him');
const wx=w.x,wf=w.face;w.reset(wx,wf);w.hp=100;w.defeated=0;}
else{b.phase='ko';b.phaseT=0;const fl=(w.damageTaken||0)===0;if(fl)SFX.coin();S.announce={txt:fl?'FLAWLESS VICTORY':'K.O.',t:0,col:fl?'#e8e0c0':'#e02020'};w.state='win';w.st=0;w.atk=null;w.foe.state='down';w.foe.st=0;w.foe.hp=0;w.foe.vx=0;w.foe.vy=0;w.foe.y=FL+GR;w.foe.defeated=1;w.foe.netT=0;w.foe.frozen=0;SFX.ko();say(fl?'Excellent. Flawless victory':'K O');}}
function fatalMapped(seq,face){return seq.split('').map(k=>k==='R'?(face>0?'R':'L'):k==='L'?(face>0?'L':'R'):k);}
function fatalProgress(ctrl,seq,face){const b=ctrl.buf,now=b.length?b[b.length-1].t:0,n=seq.length;const scan=mapped=>{let best=0;for(let start=0;start<b.length;start++){if(now-b[start].t>FATAL_INPUT)continue;let k=0;while(k<n&&start+k<b.length){const got=b[start+k].k,want=mapped[k];if(got!==want&&!(k===n-1&&((want==='P'&&got==='K')||(want==='K'&&got==='P'))))break;k++;}if(k>best)best=k;}return best;};return Math.max(scan(fatalMapped(seq,face)),scan(fatalMapped(seq,-face)));}
function finishUpd(){const b=S.battle;b.phaseT++;updFs(1);
const w=b.winner,l=b.loser;if(!b.fatalFace)b.fatalFace=w.face;
if(l.state==='down'){b.phase='over';b.phaseT=0;endBattle(w);return;}
if(w.ctrl.ai){const c=w.ctrl;c.ax={};const dx=l.x-w.x;if(b.phaseT>40&&Math.abs(dx)>44)c.ax[dx>0?'r':'l']=true;if(l.state!=='grabbed'&&Math.abs(dx)<=44&&b.phaseT>140&&Math.random()<.03){startFatal(w,l);return;}}
else if(l.state!=='grabbed'){const prog=fatalProgress(w.ctrl,w.def.fat,b.fatalFace);if(prog>b.fatalProg){b.fatalProg=prog;if(prog>0)SFX.tick();}else if(prog<b.fatalProg)b.fatalProg=prog;
if((w.ctrl.pP||w.ctrl.pK)&&prog>=w.def.fat.length){startFatal(w,l);return;}}
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
function resumeSavedArcade(){const run=loadArcRun();if(!run)return false;S.arcP1=run.c1;S.ladder=run.ladder.slice();S.lStep=run.step;S.arcDiff=run.diff??1;SFX.vsroar();arcFight();return true;}// 25.10: продолжение забега после перезагрузки
/* ЭКРАНЫ: ВВОД */
function menuItems(){let raw='';try{raw=localStorage[ARC_KEY]||'';}catch(e){}const key=raw+'|'+(isTouchUI()?1:0);if(menuCacheKey===key)return menuCache;const saved=!!loadArcRun(),items=[];if(saved)items.push({id:'resume',label:'ПРОДОЛЖИТЬ АРКАДУ'});items.push({id:'arcade',label:saved?'НОВАЯ АРКАДА':'АРКАДА'},{id:'cpu',label:'БОЙ ПРОТИВ CPU'},{id:'training',label:'ТРЕНИРОВКА'});if(!isTouchUI())items.push({id:'2p',label:'БОЙ НА ДВОИХ'});items.push({id:'settings',label:'НАСТРОЙКИ'},{id:'controls',label:'УПРАВЛЕНИЕ'},{id:'top',label:'ЗАЛ СЛАВЫ'});menuCacheKey=key;menuCache=items;return items;}// 25.10: сохранённый забег добавляет пункт продолжения + тренировка; 25.10: на touch 2P скрыт — второго набора управления нет
function pauseItems(){return['ПРОДОЛЖИТЬ','ЗВУК: '+(AU.on?'ВКЛ':'ВЫКЛ'),'ГОЛОС ДИКТОРА: '+(AU.voice?'ВКЛ':'ВЫКЛ'),'ГРОМКОСТЬ: '+AU.vol+'%','В МЕНЮ'];}// 08.09: +громкость
function settingsItems(){return['ЗВУК: '+(AU.on?'ВКЛ':'ВЫКЛ'),'ГОЛОС ДИКТОРА: '+(AU.voice?'ВКЛ':'ВЫКЛ'),'ГРОМКОСТЬ: '+AU.vol+'%','CRT-ФИЛЬТР: '+(OPT.crt?'ВКЛ':'ВЫКЛ'),'КРОВЬ: '+(OPT.blood?'ВКЛ':'ВЫКЛ'),'ТРЯСКА: '+(OPT.shake?'ВКЛ':'ВЫКЛ'),'МЕНЬШЕ ДВИЖЕНИЯ: '+(OPT.reduce?'ВКЛ':'ВЫКЛ'),'НАЗАД'];}
function settingsChange(i,dir){
if(i===0){AU.on=!AU.on;setVol();if(!AU.on){try{speechSynthesis.cancel();}catch(e){}}else SFX.menu();saveSet();}
else if(i===1){AU.voice=!AU.voice;if(!AU.voice){try{speechSynthesis.cancel();}catch(e){}}saveSet();SFX.menu();}
else if(i===2){AU.vol=clamp(AU.vol+(dir<0?-10:10),0,100);setVol();saveSet();SFX.menu();}
else if(i===3){OPT.crt=!OPT.crt;applyCrt();saveOpts();SFX.menu();}
else if(i===4){OPT.blood=!OPT.blood;saveOpts();SFX.menu();}
else if(i===5){OPT.shake=!OPT.shake;saveOpts();SFX.menu();}
else if(i===6){OPT.reduce=!OPT.reduce;if(OPT.reduce){S.shake=0;S.flashS=0;}saveOpts();SFX.menu();}}
function onKey(k){
if(S.GAME!=='fight'||S.paused)resetInput();// 25.10: клавиша меню/паузы не становится ударом после возврата в бой
if(k==='KeyM'){AU.on=!AU.on;setVol();if(!AU.on){try{speechSynthesis.cancel();}catch(e){}}else SFX.menu();saveSet();return;}// 08.09: +сохранение настройки
if(S.GAME==='fight'&&!S.paused&&S.battle&&(k==='KeyJ'||k==='Enter'||k==='Space')){if(S.battle.phase==='fatal'&&S.battle.phaseT>30){endBattle(S.battle.winner);return;}if(S.battle.phase==='over'&&S.battle.phaseT>30){afterBattle();return;}}
if(S.GAME==='fight'&&!S.paused&&k==='Escape'){resetInput();S.paused=true;S.pauseIdx=0;SFX.menu();return;}// 08.09: пауза не активировалась — Escape не ставил paused; 25.10: пауза сбрасывает зажатый ввод
if(S.GAME==='fight'&&!S.paused&&k==='KeyR'&&S.battle&&S.battle.mode==='training'){resetTraining();return;}
if(S.GAME==='fight'&&!S.paused&&k==='KeyT'&&S.battle&&S.battle.mode==='training'){toggleTrainingBlock();return;}
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
else if(item.id==='training'){S.GAME='select';S.sel=createSelection('training');say('Choose your fighter');}
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
function startLadder(c1,diff){clearArcRun();S.arcP1=c1;S.arcDiff=clamp(Number.isInteger(diff)?diff:1,0,2);S.ladder=[];
for(let i=0;i<CH.length;i++)if(i!==c1&&i!==BOSS.id)S.ladder.push(i);
for(let i=S.ladder.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[S.ladder[i],S.ladder[j]]=[S.ladder[j],S.ladder[i]];}
S.ladder=S.ladder.slice(0,CH.length-2);S.lStep=0;SFX.vsroar();arcFight();}// 25.10: 11 обычных противников, босс всегда последний
function startSel(){const s=S.sel;
const training=s.mode==='training';
newBattle(s.c1,new Ctrl(KM1),training?DUMMY:s.c2,new Ctrl(KM2),training?DUMMY.arena:(s.ar<0?CH[s.c1].arena:s.ar));// 08.09: выбранная арена
if(training){
  const b=S.battle;b.mode='training';b.trainBlock=false;b.p2.ctrl.ai=true;b.p2.ctrl.ax={};b.p1.x=300;b.p1.face=1;b.p2.x=380;b.p2.face=-1;b.p1.rage=100;b.p2.rage=100;b.timer=99;b.phase='fight';b.phaseT=200;b.p1.ctrl.clear();b.p2.ctrl.clear();S.lastSel=null;S.announce={txt:'ТРЕНИРОВКА',t:0,col:'#e8c040'};S.GAME='fight';SFX.sel();return;
}
S.battle.mode=s.mode==='cpu'?'cpu':'2p';
if(s.mode==='cpu'){S.battle.p2.ctrl.ai=true;S.battle.aiLvl=[2,4,6][s.diff];}// 08.09: сложность CPU
SFX.vsroar();S.lastSel={mode:s.mode,c1:s.c1,c2:s.c2,diff:s.diff,ar:s.ar};// 08.09: запомнить для реванша
S.GAME='vs';S.vsT=0;}
function resetTraining(){const b=S.battle;if(!b||b.mode!=='training')return;b.trainBlock=false;b.p1.reset(300,1);b.p2.reset(380,-1);b.p2.ctrl.ax={};b.p2.ctrl.poll(S.FRAME);b.p1.rage=100;b.p2.rage=100;b.phase='fight';b.phaseT=200;b.timer=99;S.freeze=0;S.paused=false;S.projs.length=0;S.fx.length=0;S.announce={txt:'СБРОС',t:0,col:'#c8a040'};}
function toggleTrainingBlock(){const b=S.battle;if(!b||b.mode!=='training')return;b.trainBlock=!b.trainBlock;b.p2.ctrl.ax=b.trainBlock?{B:true}:{};b.p2.ctrl.poll(S.FRAME);if(b.trainBlock&&['idle','walk','crouch'].includes(b.p2.state)){b.p2.state='block';b.p2.st=0;}else if(!b.trainBlock&&b.p2.state==='block')b.p2.state='idle';SFX.menu();}
function rematchStart(){newBattle(S.lastSel.c1,new Ctrl(KM1),S.lastSel.c2,new Ctrl(KM2),S.lastSel.ar<0?CH[S.lastSel.c1].arena:S.lastSel.ar);// 08.09: реванш теми же бойцами
S.battle.mode=S.lastSel.mode==='cpu'?'cpu':'2p';
if(S.lastSel.mode==='cpu'){S.battle.p2.ctrl.ai=true;S.battle.aiLvl=[2,4,6][S.lastSel.diff];}
S.GAME='vs';S.vsT=0;SFX.vsroar();}
function drawRematch(){bgFill();panel(102,70,220,116);// 08.09: экран реванша + статистика
g.font='16px "Rubik Mono One","Russo One",sans-serif';g.fillStyle=UI_GOLD;g.textAlign='center';g.fillText('РЕВАНШ?',RW/2,100);
g.font='9px "Russo One"';g.fillStyle='#e8e0c0';g.fillText(CH[S.lastSel.c1].name+'  VS  '+CH[S.lastSel.c2].name,RW/2,124);
if(S.bstat){g.font='7px "Russo One"';g.fillStyle='#c8a040';g.fillText('УДАРЫ: '+S.bstat.h1+' — '+S.bstat.h2+' · УРОН: '+Math.round(S.bstat.d1)+' — '+Math.round(S.bstat.d2),RW/2,162);g.fillText('МАКС. КОМБО: '+S.bstat.c1+' — '+S.bstat.c2,RW/2,174);}
uiHint(isTouchUI()?'P — ЕЩЁ БОЙ · B — МЕНЮ':'J — ЕЩЁ БОЙ · ESC — МЕНЮ',228,8);}// 08.09: статистика боя
function selKey(k){const s=S.sel;
if(k==='Escape'){if(s.mode==='arcade'&&s.ph===2){s.ph=0;SFX.menu();return;}// 25.10: назад к выбору бойца
if(s.mode==='cpu'&&s.ph===2){s.ph=1;SFX.menu();return;}// 08.09: назад из настроек
if(s.mode==='cpu'&&s.ph===1){s.ph=0;SFX.menu();return;}toLobby('menu');return;}
if(s.ph===2){// 08.09: настройка боя — сложность (cpu) и арена
if(s.mode==='arcade'){const dd=(k==='KeyD'||k==='ArrowRight')?1:(k==='KeyA'||k==='ArrowLeft')?-1:0;if(dd){s.diff=clamp(s.diff+dd,0,2);SFX.menu();}if(k==='KeyJ'||k==='Enter'||k==='Space'){SFX.sel();startLadder(s.c1,s.diff);}return;}// 25.10: сложность аркады до старта серии
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
if(s.mode==='training'){move('c1',d1||d2);if(k==='KeyJ'||k==='Enter'||k==='Space'){SFX.sel();startSel();}return;}
if(s.mode==='arcade'){move('c1',d1||d2);if(k==='KeyJ'||k==='Enter'||k==='Space'){SFX.sel();s.ph=2;s.row=0;}return;}// 25.10: после бойца — выбор сложности
if(s.mode==='cpu'){move(s.ph===0?'c1':'c2',d1||d2);
if(k==='KeyJ'||k==='Enter'||k==='Space'){SFX.sel();if(s.ph===0)s.ph=1;else s.ph=2;}return;}
if(!s.l1)move('c1',d1);if(!s.l2)move('c2',d2);// 08.09: залоченный боец больше не двигается
if(k==='KeyJ'||k==='Enter'||k==='Space'){s.l1=!s.l1;SFX.sel();}
if(k==='KeyI'){s.l2=!s.l2;SFX.sel();}
if(s.l1&&s.l2&&s.ph===0){s.ph=2;s.row=1;SFX.sel();}}// 08.09: 2p — сразу к настройке арены
/* ЭКРАНЫ: РЕНДЕР */
function uiHint(text,y=228,size=7,col=UI_MUTED){g.font=size+'px "Russo One"';g.textAlign='center';g.fillStyle=col;g.globalAlpha=OPT.reduce?1:.8+.2*(.5+.5*Math.sin(S.FRAME*.08));g.fillText(text,RW/2,y);g.globalAlpha=1;}
function bgFill(){uiArt.drawBase(g);}
function drawControls(){bgFill();
g.font='16px "Russo One"';g.fillStyle=UI_GOLD;g.textAlign='center';g.fillText('УПРАВЛЕНИЕ',RW/2,20);
panel(12,30,196,176);panel(216,30,196,176);
g.fillStyle='rgba(200,160,64,.22)';g.fillRect(212,42,1,158);
g.font='10px "Russo One"';g.fillStyle='#e8c040';g.textAlign='center';g.fillText('ИГРОК 1',110,46);g.fillText('ИГРОК 2',314,46);
g.font='7px "Russo One"';g.fillStyle='#e8e0c0';g.textAlign='left';
const L1=['A / D — ходьба','W — прыжок','S — присед','J — удар рукой','K — удар ногой','L — блок (удерживать)','S + J — апперкот','S + K — подсечка','назад + K — удар с разворота','бег + L — рывок-уклон','СПЕЦ2 — вторая комбинация'];// 30.09
const L2=['СТРЕЛКИ — движение','СТРЕЛКА ВВЕРХ — прыжок','СТРЕЛКА ВНИЗ — присед','I — удар рукой','O — удар ногой','P — блок (удерживать)','ВНИЗ + I — апперкот','ВНИЗ + O — подсечка','назад + O — удар с разворота','бег + P — рывок-уклон','СПЕЦ2 — вторая комбинация'];// 30.09
L1.forEach((l,i)=>g.fillText(l,24,62+i*12));L2.forEach((l,i)=>g.fillText(l,228,62+i*12));
g.font='7px "Russo One"';g.fillStyle=UI_ACCENT;g.textAlign='center';
g.fillText('БРОСОК: P1 — J + K · P2 — I + O · ВНИЗ + БРОСОК — КОМАНДНЫЙ',RW/2,212);
g.fillText('СПЕЦ — НАПРАВЛЕНИЯ + КНОПКА · СУПЕР — ВНИЗ, ВНИЗ + УДАР',RW/2,220);
uiHint(isTouchUI()?'ФАТАЛИТИ — В ОКНЕ FINISH HIM · B — НАЗАД':'ФАТАЛИТИ — В ОКНЕ FINISH HIM · J / ESC — НАЗАД',228);}
function drawSelect(){const s=S.sel;bgFill();
g.font='15px "Russo One"';g.fillStyle=UI_GOLD;g.textAlign='center';g.fillText('ВЫБОР БОЙЦА',RW/2,16);
g.font='7px "Russo One"';g.fillStyle='#807850';
const hdr=s.mode==='training'?'ВЫБЕРИ БОЙЦА ДЛЯ ТРЕНИРОВКИ':s.mode==='arcade'?(s.ph===2?'СЛОЖНОСТЬ АРКАДЫ':(loadArcRun()?'НОВАЯ АРКАДА ЗАМЕНИТ СОХРАНЁННУЮ':'ВЫБЕРИ БОЙЦА — '+ARC_TOTAL+' БОЁВ · БОСС В ФИНАЛЕ')):s.ph===2?'ПОДГОТОВКА К БОЮ':s.mode==='cpu'?(s.ph===0?'ВЫБЕРИ СВОЕГО БОЙЦА':'ВЫБЕРИ СОПЕРНИКА'):'P1: WASD + J · P2: СТРЕЛКИ + I';// 25.10: предупреждение о замене сохранения
g.fillText(hdr,RW/2,27);
for(let i=0;i<CH.length;i++){const x=12+(i%5)*37,y=36+((i/5)|0)*46;
g.fillStyle='#100d0a';g.fillRect(x,y,34,42);g.strokeStyle='#3a3128';g.lineWidth=1;g.strokeRect(x+.5,y+.5,33,41);
drawPortFit(CH[i],x,y,34,42);
if(s.c1===i){g.strokeStyle='#e02020';g.lineWidth=2;g.strokeRect(x-1,y-1,36,44);}
if((s.mode==='2p'||(s.mode==='cpu'&&s.ph===1))&&s.c2===i){g.strokeStyle='#3868c8';g.lineWidth=2;g.strokeRect(x+1,y+1,32,40);}}
g.fillStyle='rgba(0,0,0,.55)';g.fillRect(8,176,184,24);g.fillStyle='rgba(200,160,64,.28)';g.fillRect(8,176,184,1);// 25.10: подписи выбора в отдельной плашке
g.font='7px "Russo One"';g.textAlign='left';const lx=isTouchUI()?34:12;
g.fillStyle='#e02020';g.fillText('P1: '+CH[s.c1].name,lx,187);
if(s.mode==='training'){g.fillStyle=UI_MUTED;g.fillText('МАНЕКЕН: ПАССИВНЫЙ',lx,197);}
else if(s.mode!=='arcade'){g.fillStyle=UI_BLUE;g.fillText((s.mode==='2p'?'P2':'CPU')+': '+CH[s.c2].name,lx,197);}
g.fillStyle='rgba(200,160,64,.22)';g.fillRect(196,34,1,150);
const cur=s.mode==='2p'?(s.last==='c2'?s.c2:s.c1):(s.mode==='cpu'?(s.ph===0?s.c1:s.c2):s.c1);const seqP2=s.mode==='2p'&&cur===s.c2,seqGeneric=s.mode==='cpu'&&s.ph===1;
const d=CH[cur];
panel(200,34,216,150);
g.fillStyle=d.acc;g.fillRect(202,36,4,146);
g.font='13px "Rubik Mono One","Russo One",sans-serif';g.fillStyle='#e8e0c0';g.textAlign='left';g.fillText(d.name,298,52);
g.font='7px "Russo One"';g.fillStyle=d.acc;g.fillText(RANGED.includes(d.id)?'ДАЛЬНИЙ БОЙ':'БЛИЖНИЙ БОЙ',298,63);
if(s.ph!==2){
drawFake(cur,242,176,1.35,-1);
g.strokeStyle='rgba(200,160,64,.25)';g.lineWidth=1;g.beginPath();g.moveTo(290.5,74);g.lineTo(290.5,174);g.stroke();
const st=[[Math.round(9*d.dmg),9,'СИЛА'],[Math.round(d.spd*4),9,'СКОРОСТЬ'],[Math.round(9/d.bulk),9,'ВЕС']];// 08.09: характеристики бойца
st.forEach((s2,i)=>{const sy=78+i*12;g.font='7px "Russo One"';g.fillStyle='#c8a040';g.textAlign='left';g.fillText(s2[2],298,sy);
g.fillStyle='#2a0808';g.fillRect(338,sy-6,70,5);g.fillStyle=s2[0]>=7?'#e04020':(s2[0]>=6?'#e8c040':'#7a8a4a');g.fillRect(338,sy-6,Math.max(2,Math.min(70,s2[0]/s2[1]*70)),5);});
g.font='7px "Russo One"';g.fillStyle='#e8c040';g.fillText('СПЕЦ: '+d.specN,298,116);
g.fillText('['+seqTxt(d.spec,seqP2,1,seqGeneric)+']',298,125);
g.fillStyle='#c8a040';g.fillText('СПЕЦ2: '+d.spec2N,298,136);// 08.09: второй спецприём
g.fillText('['+seqTxt(d.spec2,seqP2,1,seqGeneric)+']',298,145);
g.fillStyle='#e8c040';g.fillText('СУПЕР: '+d.sup,298,157);
g.fillStyle='#807850';g.fillText('ФАТАЛИТИ: СЕКРЕТ',298,169);
}else{// 25.10: настройка боя — отдельная карточка, без наложения на превью
panel(206,80,204,96);drawPort(d,240,100,.8);
g.fillStyle='rgba(200,160,64,.28)';g.fillRect(258,80,1,96);
g.font='8px "Russo One"';g.fillStyle='#e8c040';g.textAlign='center';g.fillText(s.mode==='arcade'?'СЛОЖНОСТЬ АРКАДЫ':'НАСТРОЙКА БОЯ',333,94);
if(s.mode==='cpu'||s.mode==='arcade'){if(s.row===0){g.fillStyle='rgba(224,32,32,.10)';g.fillRect(264,107,140,16);}g.fillStyle=s.row===0?(blink()?'#fff':'#e02020'):'#c8a040';g.fillText('СЛОЖНОСТЬ: '+AI_DIFF_NAMES[s.diff],334,120);}
if(s.mode!=='arcade'&&s.row===1){g.fillStyle='rgba(224,32,32,.10)';g.fillRect(264,s.mode==='cpu'?125:115,140,16);}
if(s.mode==='arcade'){g.fillStyle='#807850';g.fillText('СЕРИЯ: '+ARC_TOTAL+' БОЙЦОВ + ФИНАЛЬНЫЙ БОСС',334,138);}
else{g.fillStyle=s.row===1?(blink()?'#fff':'#e02020'):'#c8a040';g.fillText('АРЕНА: '+(s.ar<0?'АРЕНА БОЙЦА':AR[s.ar].n),334,s.mode==='cpu'?138:128);}
g.font='7px "Russo One"';g.fillStyle='#807850';g.fillText(s.mode==='arcade'?(isTouchUI()?'B — НАЗАД · D-PAD — СЛОЖНОСТЬ':'A/D — СЛОЖНОСТЬ · ESC — НАЗАД'):(isTouchUI()?'D-PAD — СТРОКА/ЗНАЧЕНИЕ':'W/S — СТРОКА · A/D — ИЗМЕНИТЬ'),333,156);g.fillText(isTouchUI()?'P — СТАРТ':'J — СТАРТ',333,166);}
uiHint(isTouchUI()?'P — ПОДТВЕРДИТЬ · B — НАЗАД':'J — ПОДТВЕРДИТЬ · ESC — НАЗАД',228);}
function drawVS(){bgFill();
g.fillStyle='#2a0c0c';g.beginPath();g.moveTo(0,0);g.lineTo(RW*.62,0);g.lineTo(RW*.38,RH);g.lineTo(0,RH);g.fill();// 08.09: диагональный сплит — сторона P1
g.fillStyle='#0c1626';g.beginPath();g.moveTo(RW*.62,0);g.lineTo(RW,0);g.lineTo(RW,RH);g.lineTo(RW*.38,RH);g.fill();// сторона P2
if(S.battle.mode==='arcade'){const total=arcTotal(),boss=S.lStep>=S.ladder.length;panel(152,10,120,16);g.font='8px "Russo One"';g.textAlign='center';
g.fillStyle=boss?(blink()?'#e02020':'#e8c040'):'#e8c040';
g.fillText(boss?'ФИНАЛЬНЫЙ БОСС':'СТУПЕНЬ '+(S.lStep+1)+' ИЗ '+total,RW/2,21);}// 25.10: отдельный финальный босс
panel(10,30,150,120);panel(RW-160,30,150,120);
drawFake(S.battle.p1.def,85,132,1.25,1);drawFake(S.battle.p2.def,RW-85,132,S.battle.p2.def.boss?1:1.25,-1);// 25.10: босс и высокие бойцы вписываются в панель
g.fillStyle='rgba(0,0,0,.55)';g.fillRect(12,136,146,12);g.fillRect(RW-158,136,146,12);// 25.10: плашки имён больше не ложатся на ноги
g.fillStyle=S.battle.p1.def.acc;g.fillRect(12,136,146,1);g.fillStyle=S.battle.p2.def.acc;g.fillRect(RW-158,136,146,1);
g.font='10px "Russo One"';g.textAlign='center';
g.fillStyle='#e02020';g.fillText(S.battle.p1.def.name,85,145);
g.fillStyle=UI_BLUE;g.fillText(S.battle.p2.def.name+(S.battle.p2.ctrl.ai?' [CPU]':''),RW-85,145);
if(S.battle.mode==='cpu'&&S.lastSel){g.font='7px "Russo One"';g.fillStyle='#c8a040';g.textAlign='center';g.fillText('СЛОЖНОСТЬ: '+AI_DIFF_NAMES[S.lastSel.diff],RW/2,190);}// 08.09: арена уже есть в отдельной плашке, здесь только сложность
if(S.battle.mode==='arcade'){g.font='7px "Russo One"';g.fillStyle='#c8a040';g.textAlign='center';g.fillText('СЛОЖНОСТЬ: '+AI_DIFF_NAMES[S.arcDiff],RW/2,190);}// 25.10: сложность видна перед каждым боем аркады
g.font='40px "Russo One"';g.fillStyle='#000';g.fillText('VS',RW/2+3,103);g.fillStyle='#e02020';g.fillText('VS',RW/2,100);
panel(132,158,160,18);g.font='8px "Russo One"';g.fillStyle='#e8c040';g.textAlign='center';
g.fillText('АРЕНА: '+AR[S.battle.arena].n,RW/2,170);
if(S.vsEscT>0){uiHint(isTouchUI()?'ЕЩЁ РАЗ B — ПОКИНУТЬ ТУРНИР':'ЕЩЁ РАЗ ESC — ПОКИНУТЬ ТУРНИР',202,8,UI_RED);}else if(S.vsT>50){uiHint(isTouchUI()?'P — НАЧАТЬ БОЙ':'J — НАЧАТЬ БОЙ',228,9,UI_TEXT);}}// 08.09: подтверждение выхода
function arcEnding(){const d=CH[S.arcP1]||CH[0];const e=ENDINGS.find((item)=>item.id===d.id);return {fighter:d,ending:e||{title:'ТУРНИР ЗАВЕРШЁН',lines:['Арена опустела.','Победитель уходит в тишину.'],col:'#e8c040'}};}
function drawEnd(){bgFill();
panel(102,12,220,28);g.font='10px "Russo One"';g.fillStyle='#e8c040';g.textAlign='center';g.fillText('ПОБЕДИТЕЛЬ ТУРНИРА',RW/2,30);
const {fighter:d,ending:e}=arcEnding();
const halo=g.createRadialGradient(RW/2,100,8,RW/2,100,68);halo.addColorStop(0,e.col);halo.addColorStop(.55,e.col);halo.addColorStop(1,'rgba(0,0,0,0)');g.save();g.globalAlpha=.12;g.fillStyle=halo;g.fillRect(RW/2-72,28,144,144);g.restore();
drawPort(d,RW/2,94,2.1);
g.font='16px "Russo One"';g.fillStyle='#e8e0c0';g.fillText(d.name,RW/2,146);
g.font='9px "Russo One"';g.fillStyle=e.col;g.fillText(e.title,RW/2,166);
g.font='7px "Russo One"';g.fillStyle='#c8a040';const lines=(e.lines||[]).filter(l=>typeof l==='string'&&l.trim()).slice(0,2);for(let i=0;i<lines.length;i++)g.fillText(lines[i],RW/2,182+i*12);
g.font='7px "Russo One"';g.fillStyle='#807850';g.fillText('КАЙЗЕР-ПРАЙМ ПОВЕРЖЕН',RW/2,212);
uiHint(isTouchUI()?'P — В МЕНЮ':'J — В МЕНЮ',228,8);}
function drawTop(){bgFill();// 08.09: зал славы — топ-5 аркады
g.font='15px "Russo One"';g.fillStyle=UI_GOLD;g.textAlign='center';g.fillText('ЗАЛ СЛАВЫ',RW/2,24);
panel(102,40,220,170);
const tp=TOP();
if(!tp.length){g.font='8px "Russo One"';g.fillStyle='#807850';g.fillText('РЕКОРДОВ ПОКА НЕТ',RW/2,120);g.fillText('ПРОЙДИ АРКАДУ — ИМЯ ЗДЕСЬ',RW/2,134);}
else tp.forEach((e,i)=>{const y=66+i*28;g.textAlign='left';g.font='9px "Russo One"';g.fillStyle=i===0?(blink()?'#e04020':'#e8c040'):'#e8e0c0';g.fillText((i+1)+'.',128,y);g.fillStyle=i===0?'#e8c040':'#e8e0c0';g.fillText(CH[e.id].name,152,y);g.textAlign='right';g.fillStyle='#c8a040';g.fillText(e.step+' / '+ARC_TOTAL,300,y);if(e.date){g.font='7px "Russo One"';g.fillStyle='#807850';g.fillText(e.date.slice(8,10)+'.'+e.date.slice(5,7)+'.'+e.date.slice(2,4),300,y+9);}});
uiHint(isTouchUI()?'P / B — НАЗАД':'J / ESC — НАЗАД',228,8);}
function drawOver(){bgFill();
g.font='28px "Rubik Mono One","Russo One",sans-serif';g.textAlign='center';g.fillStyle='#000';g.fillText('ИГРА ОКОНЧЕНА',RW/2+2,112);g.fillStyle='#e02020';g.fillText('ИГРА ОКОНЧЕНА',RW/2,110);
g.font='9px "Russo One"';g.fillStyle='#e8e0c0';g.fillText('Турнир не прощает слабости.',RW/2,140);
uiHint(isTouchUI()?'P — В МЕНЮ':'J — В МЕНЮ',228,8);}
function drawCont(){bgFill();
bigText('ПРОДОЛЖИТЬ?',84,'#e8c040',1.1);
const n=Math.max(0,Math.ceil(S.contT/60));const sc=1+.15*Math.sin(S.FRAME*.3);
g.save();g.translate(RW/2,156);g.scale(sc,sc);g.font='46px "Russo One"';g.textAlign='center';
g.fillStyle='#000';g.fillText(''+n,3,3);g.fillStyle='#e02020';g.fillText(''+n,0,0);g.restore();
uiHint(isTouchUI()?'P — ДА · B — В МЕНЮ':'J — ДА · ESC — В МЕНЮ',228,10,UI_TEXT);}
const SK=['....SSSSSSSS....','..SSSSSSSSSSSS..','.SSSSSSSSSSSSSS.','.SSSSSSSSSSSSSS.','SSSSSSSSSSSSSSS','SSSSSSSSSSSSSSSS','SSSSSSSSSSSSSSSS','SSEESSSSSSEESSSS','SSEESSSSSSEESSSS','SSSSSSSSSSSSSSSS','.SSSSSDDDSSSSSS.','..SSDDDDDDDSS...','...TDTDTDTDT....','....SSSSSSSS....'];
function _drawSkull(cx,cy,px){const w=SK[0].length,h=SK.length,ox=cx-w*px/2,oy=cy-h*px/2;// 25.10: старый пиксельный череп оставлен как справка; титул рисует ui-art
for(let r=0;r<h;r++)for(let c=0;c<w;c++){const ch=SK[r][c];if(ch==='.')continue;g.fillStyle=ch==='S'?'#d8d0c0':ch==='D'?'#a89c88':'#c8c0b0';g.fillRect(ox+c*px,oy+r*px,px,px);}
g.fillStyle='rgba(224,32,32,'+(.45+.45*Math.sin(S.FRAME*.08))+')';g.fillRect(ox+2*px,oy+7*px,2*px,2*px);g.fillRect(ox+10*px,oy+7*px,2*px,2*px);}
function drawTitle(){uiArt.drawTitleBackground(g,S.titleT,OPT.reduce);uiArt.drawLogo(g,S.titleT,OPT.reduce);
try{const tp=TOP();if(tp.length){g.font='8px "Russo One"';g.fillStyle=UI_ACCENT;g.textAlign='center';g.fillText('РЕКОРД: '+CH[tp[0].id].name+' — '+tp[0].step+' / '+ARC_TOTAL,RW/2,198);}else{g.font='7px "Russo One"';g.fillStyle=UI_MUTED;g.textAlign='center';g.fillText(CH.length+' БОЙЦОВ · '+AR.length+' АРЕН · ОДИН ПОБЕДИТЕЛЬ',RW/2,198);}}catch(e){}// 08.09: лучший результат зала славы на титуле; 25.10: числа из данных
g.fillStyle='rgba(200,160,64,.22)';g.fillRect(RW/2-58,207,116,1);
uiHint(isTouchUI()?'КОСНИСЬ ЭКРАНА':'НАЖМИ ЛЮБУЮ КЛАВИШУ',228,11,UI_TEXT);}
function drawMenu(){uiArt.drawMenuBackground(g,S.FRAME,OPT.reduce);uiArt.drawCompact(g);
panel(20,54,208,160);panel(244,54,160,160);
const items=menuItems();S.menuIdx=clamp(S.menuIdx,0,items.length-1);
const secondaryIds=['settings','controls','top'];
const primary=items.filter(it=>!secondaryIds.includes(it.id)),secondary=items.filter(it=>secondaryIds.includes(it.id));
let y=76;
const row=(item,step)=>{
  const i=items.indexOf(item),on=i===S.menuIdx,font=on?12:10;
  if(on){g.fillStyle='rgba(224,32,32,.12)';g.fillRect(30,y-12,188,17);frame(30,y-12,188,17,'button');g.fillStyle='rgba(54,8,6,.55)';g.fillRect(30,y-12,188,17);g.fillStyle='#e02020';g.fillRect(34,y-9,2,11);}
  g.font=font+'px "Russo One"';g.textAlign='center';g.fillStyle=on?'#fff5dc':'#c8a040';
  if(on){g.shadowColor='rgba(0,0,0,.9)';g.shadowBlur=2;}
  g.fillText(item.label,124,y);
  g.shadowBlur=0;
  if(on){g.fillStyle='#e02020';g.beginPath();g.moveTo(38,y-6);g.lineTo(45,y-3);g.lineTo(38,y);g.closePath();g.fill();
    g.fillStyle=UI_GOLD;g.beginPath();g.moveTo(206,y-6);g.lineTo(201,y-3);g.lineTo(206,y);g.closePath();g.fill();}
  y+=step;
};
primary.forEach(item=>row(item,18));
g.fillStyle='rgba(200,160,64,.22)';g.fillRect(38,y-7,172,1);y+=9;
secondary.forEach(item=>row(item,15));
const si=S.FRAME/300%CH.length|0,d=CH[si];
g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.11;const pg=g.createRadialGradient(324,126,4,324,126,58);pg.addColorStop(0,d.acc);pg.addColorStop(.5,d.acc);pg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=pg;g.fillRect(266,68,116,116);g.restore();
g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.ellipse(324,179,34,5,0,0,7);g.fill();
g.fillStyle=d.acc;g.fillRect(246,56,2,156);
g.font='7px "Russo One"';g.fillStyle=UI_MUTED;g.textAlign='center';g.fillText('ПРЕТЕНДЕНТ '+(si+1)+' / '+CH.length,324,68);
drawFake(si,324,179,1.08,-1);
g.fillStyle='rgba(0,0,0,.72)';g.fillRect(248,181,152,24);g.fillStyle=d.acc;g.fillRect(248,181,152,1);
g.font='9px "Russo One"';g.fillStyle='#f0e8d0';g.textAlign='center';g.fillText(d.name,324,192);
g.font='7px "Russo One"';g.fillStyle=d.acc;g.fillText(RANGED.includes(d.id)?'ДАЛЬНИЙ БОЙ':'БЛИЖНИЙ БОЙ',324,201);
uiHint(isTouchUI()?'D-PAD — ВЫБОР · P — ПОДТВЕРДИТЬ':'W/S — ВЫБОР · J — ПОДТВЕРДИТЬ · M — ЗВУК: '+(AU.on?'ВКЛ':'ВЫКЛ'),228,8);}
function settingsIcon(kind,x,y,on){g.save();g.translate(x,y);const c=on?'#f0e8d0':'#c8a040';g.fillStyle=c;g.strokeStyle=c;g.lineWidth=1;if(kind==='sound'){g.fillRect(0,3,2,4);g.beginPath();g.moveTo(2,5);g.lineTo(5,2);g.lineTo(5,8);g.closePath();g.fill();g.beginPath();g.arc(6,5,2,-.8,.8);g.stroke();}else if(kind==='voice'){g.fillRect(2,0,4,5);g.fillRect(3,5,2,2);g.fillRect(1,7,6,1);}else if(kind==='volume'){for(let i=0;i<4;i++)g.fillRect(i*2,7-i*2,1,2+i*2);}else if(kind==='crt'){g.strokeRect(0,1,8,6);g.fillRect(1,2,6,1);g.fillRect(1,4,6,1);g.fillRect(1,6,6,1);}else if(kind==='blood'){g.beginPath();g.moveTo(4,0);g.lineTo(7,5);g.quadraticCurveTo(4,9,1,5);g.closePath();g.fill();}else if(kind==='shake'){g.fillRect(0,3,8,1);g.fillRect(0,5,8,1);g.fillRect(0,3,2,3);g.fillRect(6,3,2,3);}else if(kind==='motion'){g.beginPath();g.ellipse(4,4,4,2,0,0,7);g.stroke();g.fillRect(3,3,2,2);}else{g.fillRect(1,3,5,1);g.beginPath();g.moveTo(6,1);g.lineTo(8,4);g.lineTo(6,7);g.fill();}g.restore();}
function drawSettings(){bgFill();
g.font='16px "Russo One"';g.textAlign='center';g.fillStyle=UI_GOLD;g.fillText('НАСТРОЙКИ',RW/2,24);
panel(30,50,RW-60,158);
g.fillStyle='rgba(200,160,64,.16)';g.fillRect(52,110,RW-104,1);g.fillRect(52,174,RW-104,1);// 25.10: звук и экран разделены
const items=settingsItems(),kinds=['sound','voice','volume','crt','blood','shake','motion','back'];const y0=70,step=16;
items.forEach((it,i)=>{const y=y0+i*step,on=i===S.settingsIdx;
if(on){g.fillStyle='rgba(224,32,32,.08)';g.fillRect(64,y-12,RW-128,15);frame(64,y-12,RW-128,15,'button');g.fillStyle='rgba(54,8,6,.50)';g.fillRect(64,y-12,RW-128,15);}
settingsIcon(kinds[i],69,y-8,on);
g.font=on?'9px "Russo One"':'8px "Russo One"';
g.fillStyle=on?'#fff':'#c8a040';g.textAlign='center';g.fillText((on?'> ':'')+it,RW/2,y);});
uiHint(isTouchUI()?'D-PAD — ВЫБОР/ИЗМЕНИТЬ · P — ПЕРЕКЛЮЧИТЬ · B — НАЗАД':'W/S — ВЫБОР · A/D — ИЗМЕНИТЬ · J — ПЕРЕКЛЮЧИТЬ · ESC — НАЗАД',228);}
function drawPause(){g.fillStyle='rgba(0,0,0,.72)';g.fillRect(0,0,RW,RH);panel(10,44,RW-20,170);// 25.10: три карточки — меню, P1 и P2 — без наезда текста на края
g.font='13px "Russo One"';g.fillStyle=UI_GOLD;g.textAlign='center';g.fillText('ПАУЗА',RW/2,60);
g.fillStyle='rgba(200,160,64,.38)';g.fillRect(24,68,RW-48,1);
g.fillStyle='rgba(0,0,0,.28)';g.fillRect(20,74,120,126);g.fillRect(146,74,126,126);g.fillRect(278,74,126,126);
g.fillStyle='rgba(200,160,64,.24)';g.fillRect(20,74,120,1);g.fillRect(146,74,126,1);g.fillRect(278,74,126,1);
pauseItems().forEach((it,i)=>{const y=92+i*17,on=i===S.pauseIdx;
if(on){g.fillStyle='rgba(224,32,32,.10)';g.fillRect(24,y-11,112,15);}
g.font=on?'8px "Russo One"':'7px "Russo One"';g.fillStyle=on?'#fff':'#c8a040';g.textAlign='center';g.fillText(it,80,y);});
const ab=(f,x)=>{const d=f.def,p2=f===S.battle.p2;
g.font='8px "Russo One"';g.fillStyle=d.acc;g.textAlign='center';g.fillText(d.name,x,88);
g.fillStyle='rgba(200,160,64,.22)';g.fillRect(x-56,92,112,1);
if(S.battle.mode==='training'&&p2){
 g.font='8px "Russo One"';g.fillStyle='#e8e0c0';g.fillText('ПАССИВНЫЙ',x,110);
 g.font='7px "Russo One"';g.fillStyle='#807850';g.fillText('НЕ АТАКУЕТ',x,124);
 g.fillStyle='#c8a040';g.fillText(isTouchUI()?'B — БЛОК':'T — БЛОК',x,140);
 g.fillText(isTouchUI()?'Ⅱ — ПРИЁМЫ':'R — СБРОС',x,154);
 return;
}
g.font='7px "Russo One"';g.fillStyle='#e8e0c0';g.fillText('СПЕЦ: '+d.specN,x,104);
g.fillStyle='#c8a040';g.fillText('['+seqTxt(d.spec,p2,f.face)+']',x,113);
g.fillStyle='#e8e0c0';g.fillText('СПЕЦ2: '+d.spec2N,x,122);// 08.09: СПЕЦ2 добавлен в панель способностей
g.fillStyle='#c8a040';g.fillText('['+seqTxt(d.spec2,p2,f.face)+']',x,131);
g.fillStyle='#e8e0c0';g.fillText('СУПЕР: '+d.sup,x,141);
g.fillStyle='#c8a040';g.fillText('['+seqTxt('DDP',p2,f.face)+'] при ярости 100',x,150);
g.font='6px "Russo One"';g.fillStyle='#e8e0c0';g.fillText('ФАТАЛИТИ: '+(d.fatN||'—'),x,161);
g.font='7px "Russo One"';g.fillStyle='#c8a040';g.fillText('['+seqTxt(d.fat,p2,f.face)+']',x,168);
g.fillStyle='#e8e0c0';g.fillText('БРОСОК [P+K]: '+(d.throwN||'ЗАХВАТ'),x,178,118);
g.fillStyle='#c8a040';g.fillText('ЗАХВАТ: '+seqTxt('DPK',p2,f.face).replace(/ /g,'')+(d.grappler?' · '+seqTxt('RPK',p2,f.face).replace(/ /g,''):''),x,187);
g.fillStyle='#e8e0c0';g.fillText('ЦЕПЬ: '+d.target.seq.split('').join('+'),x,196);
g.font='6px "Russo One"';g.fillStyle='#807850';g.fillText('P '+Math.round(d.norm.punch.d*d.dmg)+'/'+Math.round(d.norm.punch.rng*d.bulk)+' · K '+Math.round(d.norm.kick.d*d.dmg)+'/'+Math.round(d.norm.kick.rng*d.bulk)+' · RH '+Math.round(d.norm.rh.d*d.dmg)+'/'+Math.round(d.norm.rh.rng*d.bulk),x,205);};
ab(S.battle.p1,209);ab(S.battle.p2,341);
uiHint(isTouchUI()?'P — ВЫБОР/ГРОМКОСТЬ · B — ЗАКРЫТЬ':'J — ВЫБОР · A/D — ГРОМКОСТЬ · ESC — ЗАКРЫТЬ',228);}
/* ГЛАВНЫЙ ЦИКЛ */
function tuneScale(dt){
 perfLast=dt;
 if(document.hidden||S.paused||dt<1||dt>1000)return;
 if(perfWarm>0){perfWarm=Math.max(0,perfWarm-dt);return;}
 if(perfCool>0){perfCool=Math.max(0,perfCool-dt);if(perfCool===0){perfAcc=0;perfFrames=0;perfBadWin=0;perfGoodWin=0;}return;}
 perfAcc+=Math.min(50,dt);perfFrames++;
 if(perfAcc<750||perfFrames<8)return;
 perfAvg=perfAcc/perfFrames;perfAcc=0;perfFrames=0;
 if(perfAvg>20){
  perfGoodWin=0;
  if(RSCALE>MIN_SCALE)perfBadWin=perfAvg>28?2:perfBadWin+1;else perfBadWin=0;
 }else if(perfAvg<17.2){
  perfBadWin=0;
  if(RSCALE<MAX_SCALE)perfGoodWin++;
 }else{perfBadWin=0;perfGoodWin=0;}
 if(perfBadWin>=2&&RSCALE>MIN_SCALE){RSCALE=Math.max(MIN_SCALE,RSCALE-(perfAvg>35?2:1));scaleDirty=true;perfCool=1000;perfBadWin=0;perfGoodWin=0;return;}
 if(perfGoodWin>=4&&RSCALE<MAX_SCALE&&S.GAME!=='fight'){RSCALE++;scaleDirty=true;perfCool=1800;perfBadWin=0;perfGoodWin=0;}
}
function loop(ts){requestAnimationFrame(loop);if((window.devicePixelRatio||1)!==lastDpr)fit();if(scaleDirty)applyRScale();const rawDt=ts-S.last,dt=Math.min(50,rawDt);S.acc+=dt;S.last=ts;
while(S.acc>=1000/60){S.acc-=1000/60;step();}render();tuneScale(rawDt);}
function step(){S.FRAME++;music();
if(S.GAME==='fight'&&S.battle){S.battle.p1.ctrl.poll(S.FRAME);S.battle.p2.ctrl.poll(S.FRAME);clearPress();}// 25.10: ввод читается до обновления бойцов — удар срабатывает в том же кадре
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
else{updParts();updFx();}}
else{updParts();
if(['title','menu','continue','gameover','top'].includes(S.GAME)&&S.FRAME%3===0)
S.parts.push({x:rnd(0,RW),y:RH+4,vx:rnd(-.2,.2),vy:-rnd(.6,1.4),c:pick(['#f06020','#c84018','#f0a030']),l:rnd(60,140),s:rnd(1,2),gv:-.005});}
if(S.GAME==='continue'){S.contT--;if(S.contT<=0){clearArcRun();toLobby('gameover');}}// 25.10: время вышло — забег завершён
if(S.GAME==='fight'){if(S.announce)S.announce.t++;if(S.wipe>0)S.wipe--;}if(S.GAME==='title')S.titleT++;
if(S.GAME==='vs'||S.GAME==='select')S.vsT++;if(S.vsEscT>0)S.vsEscT--;// 08.09: таймер подтверждения выхода
}
function render(){g.setTransform(RSCALE,0,0,RSCALE,0,0);// 25.10: динамическое внутреннее разрешение 2–4× — весь код остаётся в 424×240, края и шрифты чётче
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
arenaView.foreground(b.arena,S.cam,S.FRAME);// 25.10: передний план арены уходит за бойцов — он не перекрывает их
if(!arenaView.hasForeground(b.arena)){g.fillStyle='rgba(0,0,0,.4)';for(let i=0;i<12;i++){const x=Math.round(((i*67-S.cam*1.25)%(RW+67)+RW+67)%(RW+67)-33),h2=6+(i*13)%14;g.beginPath();g.moveTo(x-9,RH);g.lineTo(x,RH-h2);g.lineTo(x+9,RH);g.fill();}}// 08.09: силуэты переднего плана — параллакс быстрее камеры, глубина сцены
for(const ff of[b.p1,b.p2])if(ff.marks)for(const m of ff.marks){const mx2=m.x-S.cam;
if(mx2>-20&&mx2<RW+20){g.save();g.translate(mx2,m.y);g.rotate(S.FRAME*.05);
g.strokeStyle='#b89aff';g.lineWidth=1.5;for(let i2=0;i2<4;i2++){g.rotate(Math.PI/2);g.beginPath();g.moveTo(0,-3);g.lineTo(0,-9);g.stroke();}
g.fillStyle='#e8e8ff';g.fillRect(-1.5,-1.5,3,3);g.restore();}}// 30.09: звёздные метки
drawDecals(S.cam);
for(const f of(b.p2.state==='grabbed'?[b.p1,b.p2]:[b.p2,b.p1])){drawFighterGlow(f,S.cam);drawF(f,S.cam);}// 25.10: удерживаемая жертва рисуется поверх захватчика
if(b.p1.state==='super'&&b.p1.def.id===5&&b.p1.st>14&&b.p1.st<90){g.globalAlpha=.5;drawFakeShift(b.p1,S.cam,-30);drawFakeShift(b.p1,S.cam,30);g.globalAlpha=1;}
if(b.p2.state==='super'&&b.p2.def.id===5&&b.p2.st>14&&b.p2.st<90){g.globalAlpha=.5;drawFakeShift(b.p2,S.cam,-30);drawFakeShift(b.p2,S.cam,30);g.globalAlpha=1;}
drawProjs(S.cam);drawFx(S.cam);drawParts(S.cam);
arenaView.post();
if(b.p1.state==='super'||b.p2.state==='super'||b.phase==='fatal'){g.fillStyle='rgba(10,0,0,.22)';g.fillRect(0,0,RW,RH);}// 08.09: драматическое затемнение при супере/фаталити
if(b.loser&&b.loser.laserT&&b.phase==='fatal'&&b.phaseT>60&&b.phaseT<160){g.fillStyle='rgba(248,248,96,.8)';g.fillRect(b.loser.x-S.cam-6,0,12,FL+GR);}
g.restore();
if(b.phase==='fight'&&(b.p1.hp<=25||b.p2.hp<=25)){const da=.045+.025*Math.sin(S.FRAME*.12),dv=g.createRadialGradient(RW/2,RH/2,70,RW/2,RH/2,250);dv.addColorStop(0,'rgba(0,0,0,0)');dv.addColorStop(.72,'rgba(0,0,0,0)');dv.addColorStop(1,'rgba(150,10,8,'+da+')');g.fillStyle=dv;g.fillRect(0,0,RW,RH);}// 25.10: пульс низкого здоровья по краям
if(S.flashS>0&&!OPT.reduce){g.fillStyle='rgba(255,255,255,'+(S.flashS/10)+')';g.fillRect(0,0,RW,RH);}
drawHUD(b);
if(S.wipe>0&&!OPT.reduce){const wh=RH*(S.wipe/24);g.fillStyle='#000';g.fillRect(0,0,RW,wh/2);g.fillRect(0,RH-wh/2,RW,wh/2);}// 30.09: раскрывающиеся шторки
for(const f of[b.p1,b.p2])if(f.combo>=2&&f.comboT<50){const sc2=1+.25*Math.max(0,1-f.comboT/8);g.save();g.translate(f===b.p1?70:RW-70,80);g.scale(sc2,sc2);g.font='12px "Russo One"';g.textAlign='center';g.fillStyle=f.combo>=5?'#e02020':f.combo>=3?'#f08020':'#e8c040';g.fillText('КОМБО x'+f.combo,0,0);g.restore();}// 08.09: комбо-счётчик — цвет растёт с серией
if(b.phase==='finish')drawFatalPanel(b);
if((b.phase==='fatal'||b.phase==='over')&&b.phaseT>30){g.font='8px "Russo One"';g.fillStyle='#e8e0c0';g.textAlign='center';g.fillText(isTouchUI()?'P — ПРОПУСТИТЬ':'J — ПРОПУСТИТЬ',RW/2,232);}
if(b.mode==='training'){
  const ik={L:'←',R:'→',U:'↑',D:'↓',P:'P',K:'K'},recent=b.p1.ctrl.buf.slice(-8).map(e=>ik[e.k]||e.k).join(' ');
  g.font='6px "Russo One"';g.textAlign='left';g.fillStyle=UI_TEXT;g.fillText('ВВОД: '+(recent||'—'),8,230);
  g.textAlign='right';g.fillStyle=b.trainBlock?'#f08020':UI_MUTED;g.fillText('МАНЕКЕН: '+(b.trainBlock?'БЛОК':'СТОИТ'),RW-8,230);
  g.textAlign='center';g.fillStyle=UI_MUTED;const close=Math.abs(b.p1.x-b.p2.x)<70;g.fillText(isTouchUI()?(close?'P+K — БРОСОК · B — БЛОК · Ⅱ — ПРИЁМЫ':'B — БЛОК · Ⅱ — ПРИЁМЫ'):(close?'P+K — БРОСОК · D+P+K — ЗАХВАТ · T — БЛОК':'T — БЛОК · R — СБРОС · ESC — ПРИЁМЫ'),RW/2,238);}// 25.10: подсказка захвата вблизи — броски неочевидны
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
    get RSCALE() { return RSCALE; },
    get maxRSCALE() { return MAX_SCALE; },
    get minRSCALE() { return MIN_SCALE; },
    get perf() { return { warm: Math.round(perfWarm), cool: Math.round(perfCool), frames: perfFrames, avg: Math.round(perfAvg * 10) / 10, good: perfGoodWin, bad: perfBadWin, dt: Math.round(perfLast) }; },
    tuneFrame(dt) { tuneScale(dt); },
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
    get uiCache() { return uiArt.info(); },
    get OPT() { return OPT; },
    get settingsIdx() { return S.settingsIdx; },
    get ladder() { return S.ladder; },
    get lStep() { return S.lStep; },
    get arcP1() { return S.arcP1; },
    get arcDiff() { return S.arcDiff; },
    get sel() { return S.sel; },
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
    drawPort,
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
      if ('arcDiff' in values) S.arcDiff = values.arcDiff;
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
