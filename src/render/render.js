// 25.10: рендер бойцов, портретов, HUD и эффектов вынесен из монолита.
// Модуль ничего не обновляет: только читает состояние и рисует.
import { createAbilityFx } from './ability-fx.js';
import { createFighterArt } from './fighter-art.js';
export function createRender({
  g, S, UI, CH, WM, RW, FL, GR, OUT,
  lerp, rnd, mix, shade, blink, fatalMapped, fatalFrames,
}) {
const abilityFx=createAbilityFx({g,S,FL,GR,lerp,rnd,mix});
const fighterArt=createFighterArt({g,S,OUT,mix,shade,lerp});
/* ЭФФЕКТЫ */
function drawProjs(cam){abilityFx.drawProjs(cam);}
const drawBolt=abilityFx.drawBolt;
function drawFx(cam){for(const f of S.fx){const x=f.x-cam;
if(f.ty==='sprite'){const frame=Math.min(f.frames-1,Math.floor(f.t/f.dur*f.frames));g.save();g.globalCompositeOperation=f.blend;g.globalAlpha=f.alpha;g.drawImage(f.img,frame*f.frameW,0,f.frameW,f.frameH,x-f.anchor[0]*f.scale,f.y-f.anchor[1]*f.scale,f.frameW*f.scale,f.frameH*f.scale);g.restore();}
else if(f.ty==='whiff'){const p=f.t/f.life,a=1-p;g.save();g.translate(x,f.y);g.scale(f.face||1,1);g.globalCompositeOperation='screen';g.globalAlpha=a;g.strokeStyle='rgba(220,238,255,.9)';g.lineWidth=2-p;g.beginPath();g.arc(0,0,9+p*10,-1,.45);g.stroke();g.globalAlpha=a*.5;g.lineWidth=1;g.beginPath();g.arc(0,0,5+p*6,-1.25,.7);g.stroke();g.globalAlpha=a*.6;g.strokeStyle=f.col;g.beginPath();g.moveTo(-2,0);g.lineTo(-10-p*4,0);g.stroke();g.restore();}
else if(f.ty==='super'){const p=f.t/f.life,a=1-p;g.save();g.globalCompositeOperation='lighter';g.translate(x,f.y);g.globalAlpha=a*.35;const rad=8+p*40,gr=g.createRadialGradient(0,0,2,0,0,rad);gr.addColorStop(0,'rgba(255,255,255,.9)');gr.addColorStop(.35,f.col);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,rad,0,7);g.fill();g.globalAlpha=a;g.strokeStyle=f.col;g.lineWidth=3;g.beginPath();g.arc(0,0,6+p*44,0,7);g.stroke();g.globalAlpha=a*.7;g.strokeStyle='#fff';g.lineWidth=1.5;g.beginPath();g.arc(0,0,3+p*30,0,7);g.stroke();for(let i=0;i<10;i++){const an=i*Math.PI/5+p*.3,r0=5+p*8,r1=12+p*40;g.beginPath();g.moveTo(Math.cos(an)*r0,Math.sin(an)*r0);g.lineTo(Math.cos(an)*r1,Math.sin(an)*r1);g.stroke();}g.globalAlpha=a*.55;g.strokeStyle=f.col;g.lineWidth=2;g.beginPath();g.ellipse(0,f.gy-f.y,10+p*34,3+p*7,0,0,7);g.stroke();g.globalAlpha=a;g.fillStyle='#fff';g.beginPath();g.arc(0,0,Math.max(0,5*(1-p)),0,7);g.fill();g.restore();}
else if(f.ty==='rock'){const h=Math.min(30,f.t*4);g.fillStyle='#5a4a38';for(let i=0;i<4;i++){const bx=x-11+((i*7+f.t)%23),by=FL+GR-h+((i*5+f.t*2)%Math.max(1,h));g.fillRect(bx,by,3,3);}g.fillStyle='#6a5a44';g.fillRect(x-10,FL+GR-h,20,h);g.fillStyle='#8a7a5c';g.fillRect(x-6,FL+GR-h,5,h);g.fillStyle='#3a3028';g.fillRect(x+2,FL+GR-h+2,5,h-2);if(f.t<8){g.fillStyle='#b01818';g.fillRect(x-10,FL+GR-h-4,20,3);}if(f.t===2||f.t===6){g.save();g.globalCompositeOperation='lighter';g.fillStyle='#d8c8a0';g.fillRect(x-7,FL+GR-h-1,14,1);g.restore();}}
else if(f.ty==='boom'){const p=Math.min(1,f.t/22),a=1-p,r=7+p*18;g.save();g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(x,f.y,1,x,f.y,r*1.7);gr.addColorStop(0,'rgba(255,250,210,.9)');gr.addColorStop(.25,'#f8d060');gr.addColorStop(.55,'#f06020');gr.addColorStop(1,'rgba(0,0,0,0)');g.globalAlpha=a*.9;g.fillStyle=gr;g.beginPath();g.arc(x,f.y,r*1.7,0,7);g.fill();g.globalAlpha=a;g.strokeStyle=p<.4?'#f8d060':'#f06020';g.lineWidth=2.5;g.beginPath();g.arc(x,f.y,r,0,7);g.stroke();g.globalAlpha=a*.5;g.strokeStyle='#fff';g.lineWidth=1;g.beginPath();g.arc(x,f.y,r*.55,0,7);g.stroke();g.restore();}
else if(f.ty==='impact'){const p=Math.min(1,f.t/(f.life||14)),a=1-p,r=(f.r||16)*(.28+p*.9);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=a;const gr=g.createRadialGradient(x,f.y,0,x,f.y,r*.7);gr.addColorStop(0,'rgba(255,255,255,.95)');gr.addColorStop(.35,f.col);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.arc(x,f.y,r*.7,0,7);g.fill();g.strokeStyle=f.col;g.lineWidth=2;g.beginPath();g.arc(x,f.y,r,0,7);g.stroke();g.globalAlpha=a*.65;g.lineWidth=1;for(let i=0;i<8;i++){const an=i*Math.PI/4+p*.2;g.beginPath();g.moveTo(x+Math.cos(an)*r*.7,f.y+Math.sin(an)*r*.7);g.lineTo(x+Math.cos(an)*r*1.5,f.y+Math.sin(an)*r*1.5);g.stroke();}g.restore();}
else if(f.ty==='castburst'){const p=Math.min(1,f.t/(f.life||12)),a=1-p,r=(f.scale||1)*(3+p*16);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=a*.9;const gr=g.createRadialGradient(x,f.y,0,x,f.y,r*.5);gr.addColorStop(0,'rgba(255,255,255,.95)');gr.addColorStop(.45,f.col);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.arc(x,f.y,r*.5,0,7);g.fill();g.strokeStyle=f.col;g.lineWidth=1.6;g.beginPath();g.arc(x,f.y,r,0,7);g.stroke();g.globalAlpha=a*.8;g.lineWidth=1;for(let i=0;i<10;i++){const an=i*Math.PI/5;g.beginPath();g.moveTo(x+Math.cos(an)*r*.5,f.y+Math.sin(an)*r*.5);g.lineTo(x+Math.cos(an)*r*1.7,f.y+Math.sin(an)*r*1.7);g.stroke();}g.restore();}
else if(f.ty==='nova'){const p=Math.min(1,f.t/26),a=1-p,r=4+p*36;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=a*.85;const gr=g.createRadialGradient(x,f.y,0,x,f.y,r);gr.addColorStop(0,'rgba(235,250,255,.7)');gr.addColorStop(.4,'#88c8f0');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.arc(x,f.y,r,0,7);g.fill();g.strokeStyle='#c8ecff';g.lineWidth=2;g.beginPath();g.arc(x,f.y,r*.75,0,7);g.stroke();g.globalAlpha=a*.7;g.lineWidth=1;for(let i=0;i<10;i++){const an=i*Math.PI/5+p*.3;g.beginPath();g.moveTo(x+Math.cos(an)*r*.6,f.y+Math.sin(an)*r*.6);g.lineTo(x+Math.cos(an)*r*1.2,f.y+Math.sin(an)*r*1.2);g.stroke();}g.restore();}
else if(f.ty==='drain'){const p=Math.min(1,f.t/60),a=1-p;g.save();g.globalCompositeOperation='lighter';g.strokeStyle='#7a3aa8';g.lineWidth=2;g.globalAlpha=a*.8;for(let i=0;i<3;i++){g.beginPath();g.ellipse(x,FL-40+Math.sin(f.t*.12+i*2)*5,20+f.t*.2+i*5,7+i*2,f.t*.03+i,0,7);g.stroke();}for(let i=0;i<5;i++){const an=f.t*.08+i*1.3,rr=16+f.t*.2;g.fillStyle=i%2?'#b89aff':'#7a3aa8';g.fillRect(x+Math.cos(an)*rr-1,FL-40+Math.sin(an)*rr*.45-1,2,2);}g.restore();}
else if(f.ty==='slash'){g.save();g.globalCompositeOperation='lighter';g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.moveTo(x-10,f.y-14);g.lineTo(x+10,f.y+10);g.stroke();g.globalAlpha=.7;g.strokeStyle=f.col||'#9adcee';g.lineWidth=1;g.beginPath();g.moveTo(x-6,f.y-16);g.lineTo(x+14,f.y+8);g.stroke();g.restore();}
else if(f.ty==='slashimpact'){const p=Math.min(1,f.t/(f.life||10)),a=1-p;g.save();g.translate(x,f.y);g.scale(f.face||1,1);g.globalCompositeOperation='lighter';g.globalAlpha=a;g.strokeStyle=f.col||'#fff';g.lineWidth=2.2;g.beginPath();g.arc(0,0,12+p*10,-2.3,-.2);g.stroke();g.beginPath();g.arc(0,0,9+p*8,.7,2.8);g.stroke();g.globalAlpha=a*.85;g.strokeStyle='#fff';g.lineWidth=.8;g.beginPath();g.arc(0,0,11+p*9,-2.15,-.35);g.stroke();g.restore();}
else if(f.ty==='ring'){const p=Math.min(1,f.t/14),a=1-p,r=f.t*3.2;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=a;g.strokeStyle=f.col;g.lineWidth=2;g.beginPath();g.arc(x,f.y,r,0,7);g.stroke();g.globalAlpha=a*.5;g.strokeStyle='#fff';g.lineWidth=1;g.beginPath();g.arc(x,f.y,r*.7,0,7);g.stroke();g.restore();}// 08.09: ударное кольцо
else if(f.ty==='name'){const pr=f.t/(f.life||60),a=1-pr;g.save();g.globalAlpha=a;g.font=(f.big?'12px':'9px')+' "Russo One"';g.textAlign='center';g.lineWidth=2;g.strokeStyle='rgba(0,0,0,.85)';g.strokeText(f.txt,x,f.y-pr*14);g.fillStyle=f.col;g.fillText(f.txt,x,f.y-pr*14);g.restore();}// 25.10: название броска над бойцом; 25.10: крупная подпись захвата/добивания с обводкой
else if(f.ty==='boltfx'){drawBolt(x,FL,x,FL-90,{amp:5,segs:7});g.save();g.globalCompositeOperation='lighter';g.fillStyle='rgba(248,248,96,.5)';g.fillRect(x-3,FL-2,6,3);g.restore();}
if(f.ty==='castbolt'){const by2=f.y;drawBolt(x,by2-4,x+Math.sin(f.t)*3,by2-76,{amp:5,segs:6});g.save();g.globalCompositeOperation='lighter';g.fillStyle='rgba(248,248,96,.75)';g.fillRect(x-2,by2-6,4,6);g.restore();}// 30.09: канал молнии из руки Вольта
}}
/* БОЙЦЫ */
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
function drawFighterGlow(f,cam){if(!f||f.hidden)return;const d=f.def,x=f.x-cam,y=f.y-38,r=24+(d.bulk||1)*10;const superOn=f.state==='super'||f.rage>=100;const a=(superOn?.10:.05)*(f.state==='super'?1.6:1);
g.save();g.globalCompositeOperation='lighter';g.globalAlpha=a;const gr=g.createRadialGradient(x,y,2,x,y,r);gr.addColorStop(0,mix(d.acc,'#ffffff',.18));gr.addColorStop(.45,d.acc);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2);g.restore();}// 25.10: цветной ореол отделяет бойца от пёстрого фона
function drawFLegacy(f,cam){if(f.hidden)return;
const d=f.def,sc=d.bulk*f.scale;
g.save();g.lineCap='round';g.translate(Math.round(f.x-cam),Math.round(f.y));
const shadowY=FL+GR-f.y;const shg=g.createRadialGradient(0,shadowY,1,0,shadowY,15*sc);shg.addColorStop(0,'rgba(0,0,0,.45)');shg.addColorStop(1,'rgba(0,0,0,0)');
g.fillStyle=shg;g.beginPath();g.ellipse(0,shadowY,15*sc,4.2,0,0,7);g.fill();
if(d.boss){g.save();g.globalCompositeOperation='lighter';const ay=-d.h*.55,ar=d.h*.9,ag=g.createRadialGradient(0,ay,2,0,ay,ar);ag.addColorStop(0,'rgba(240,200,80,.24)');ag.addColorStop(.55,'rgba(180,60,20,.1)');ag.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=ag;g.beginPath();g.arc(0,ay,ar,0,7);g.fill();g.restore();}// 25.10: аура финального босса
abilityFx.drawCastAura(f);// 25.10: элементарная аура каста/супера вокруг тела и по земле
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
if(d.longhair&&!f.charred&&!f.pale){g.fillStyle=OUT;g.fillRect(hx-9,hy-9,4,22);g.fillRect(hx+6,hy-9,4,22);g.fillStyle=d.hair;g.fillRect(hx-8,hy-8,3,20);g.fillRect(hx+6,hy-8,3,20);g.fillStyle=mix(d.hair,'#ffffff',.3);g.fillRect(hx-8,hy-8,3,1);g.fillRect(hx+6,hy-8,3,1);g.fillStyle=shade(d.hair,.75);g.fillRect(hx-8,hy+6,3,4);g.fillRect(hx+6,hy+6,3,4);if(d.female){g.fillStyle=d.hair;g.fillRect(hx-5,hy-7,4,2);g.fillRect(hx-3,hy-6,2,1);g.fillStyle=mix(d.hair,'#ffffff',.45);g.fillRect(hx-5,hy-7,3,1);}}// 30.09: длинные волосы до лопаток с бликом; 25.10: женская косая чёлка
if(d.ponytail&&!f.charred&&!f.pale){const sw=Math.sin(f.animT*.08)*2;g.fillStyle=OUT;g.beginPath();g.moveTo(hx-6,hy-8);g.quadraticCurveTo(hx-11,hy-10+sw,hx-13,hy-2+sw);g.quadraticCurveTo(hx-15,hy+7+sw,hx-15,hy+18+sw);g.lineTo(hx-12,hy+17+sw);g.quadraticCurveTo(hx-11,hy+7+sw,hx-10,hy+sw);g.quadraticCurveTo(hx-9,hy-5+sw,hx-4,hy-6);g.closePath();g.fill();g.fillStyle=d.hair;g.beginPath();g.moveTo(hx-5,hy-7);g.quadraticCurveTo(hx-10,hy-8+sw,hx-12,hy-2+sw);g.quadraticCurveTo(hx-13,hy+7+sw,hx-13,hy+16+sw);g.lineTo(hx-12,hy+15+sw);g.quadraticCurveTo(hx-11,hy+6+sw,hx-10,hy+sw);g.quadraticCurveTo(hx-9,hy-4+sw,hx-4,hy-5);g.closePath();g.fill();g.strokeStyle=shade(d.hair,.78);g.lineWidth=.8;for(const q of[[-11,-2],[-12,3],[-13,8],[-13,13]]){g.beginPath();g.moveTo(hx+q[0]-1,hy+q[1]+sw*.4);g.lineTo(hx+q[0]+1,hy+q[1]+1+sw*.4);g.stroke();}g.strokeStyle=mix(d.hair,'#ffffff',.45);g.lineWidth=.7;g.beginPath();g.moveTo(hx-6,hy-7);g.quadraticCurveTo(hx-11,hy-9+sw,hx-13,hy-2+sw);g.quadraticCurveTo(hx-14,hy+7+sw,hx-14,hy+15+sw);g.stroke();g.fillStyle=ac;g.fillRect(hx-8,hy-9,2,5);g.beginPath();g.moveTo(hx-8,hy-7);g.lineTo(hx-12,hy-5+sw);g.lineTo(hx-9,hy-3);g.fill();g.fillStyle=ac;g.fillRect(hx-14,hy+16+sw,2,2);}// 24.10: длинный хвост с лентой и прядями
const expr=(f.state==='hit'||f.state==='victim'||f.state==='grabbed')?1:f.state==='dizzy'?2:0;// 30.09: выражение лица
if(expr===0){g.fillStyle='#f0e8e0';g.fillRect(hx+2,hy-5,3,2);g.fillStyle='#141414';g.fillRect(d.female?hx+4:hx+3,hy-5,d.female?1:2,2);if(d.female){g.fillStyle='#141414';g.fillRect(hx+3,hy-6,2,1);}}
else if(expr===1){g.fillStyle='#141414';g.fillRect(hx+2,hy-4,3,1);}// зажмурен
else{g.fillStyle='#141414';g.fillRect(hx+2,hy-5,1,2);g.fillRect(hx+4,hy-5,1,2);}// крестит
g.fillStyle=shade(skin,.72);g.fillRect(hx+2,expr===2||d.female?hy-7:hy-6,d.female?3:4,1);// бровь
if(d.female){g.fillStyle=shade(skin,.6);g.fillRect(hx-1,hy-5,1,2);g.fillStyle='#8a3040';g.fillRect(hx-1,hy-1,3,1);g.fillStyle='#c86070';g.fillRect(hx,hy-1,2,1);g.fillStyle=shade(skin,.55);g.fillRect(hx+3,hy+1,1,1);}// 24.10: нос, губы и родинка
drawGear(f,hx,hy);
if(f.state==='cast'||f.state==='super')abilityFx.drawCastCharge(f,fa);// 25.10: заряд в ладони — снаряд вылетает ровно из руки
if(f.flash>0){g.globalAlpha=.12;g.fillStyle='#fff';g.beginPath();g.ellipse(0,-d.h*.5,12,d.h*.42,0,0,7);g.fill();g.globalAlpha=1;}
g.restore();
if(f.frozen>0){const b=f.box;g.fillStyle='rgba(120,190,240,.45)';g.fillRect(b.x-cam,b.y-2,b.w,b.h+4);g.fillStyle='rgba(225,245,255,.85)';for(let i=0;i<3;i++){const sx=b.x-cam+3+i*(b.w-6)/2;g.beginPath();g.moveTo(sx-3,b.y-2);g.lineTo(sx,b.y-8-(i*7%5));g.lineTo(sx+3,b.y-2);g.fill();}}
if(f.netT>0){g.strokeStyle='#c8c8a0';g.lineWidth=1;const b=f.box;for(let i=0;i<4;i++)g.strokeRect(b.x-cam+2+i*3,b.y+i*4,b.w-4-i*6,4);}
if(f.state==='dizzy'){for(let i=0;i<3;i++){const a=f.animT*.15+i*2.09;g.fillStyle='#f8d060';g.fillRect(f.x-cam+Math.cos(a)*12-1,f.y-d.h-8+Math.sin(a)*3,3,3);}}}
function drawF(f,cam){if(f.hidden)return;
 const d=f.def,sc=d.bulk*f.scale;
 g.save();g.lineCap='round';g.lineJoin='round';g.translate(Math.round(f.x-cam),Math.round(f.y));
 const shadowY=FL+GR-f.y;const shg=g.createRadialGradient(0,shadowY,1,0,shadowY,15*sc);shg.addColorStop(0,'rgba(0,0,0,.45)');shg.addColorStop(1,'rgba(0,0,0,0)');
 g.fillStyle=shg;g.beginPath();g.ellipse(0,shadowY,15*sc,4.2,0,0,7);g.fill();
 if(d.boss){g.save();g.globalCompositeOperation='lighter';const ay=-d.h*.55,ar=d.h*.9,ag=g.createRadialGradient(0,ay,2,0,ay,ar);ag.addColorStop(0,'rgba(240,200,80,.24)');ag.addColorStop(.55,'rgba(180,60,20,.1)');ag.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=ag;g.beginPath();g.arc(0,ay,ar,0,7);g.fill();g.restore();}
 abilityFx.drawCastAura(f);
 if(f.invis>0)g.globalAlpha=.25;
 g.scale(f.face*sc,sc*f.squash);g.rotate(f.tilt*f.face);
 if(f.state==='super'||f.frozen>0)g.translate(rnd(-1,1),rnd(-1,1));
 const p=pose(f),body=fighterArt.drawBody(f,p);
 fighterArt.drawWeapons(f,p,body);
 fighterArt.drawHead(f,p,body);
 if(f.state==='cast'||f.state==='super')abilityFx.drawCastCharge(f,body.frontHand);
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
else if(d.gear==='corona'){g.fillStyle=OUT;g.fillRect(hx-7,hy-11,14,4);g.fillStyle=ac;g.fillRect(hx-6,hy-10,12,2);for(let i=0;i<3;i++){g.beginPath();g.moveTo(hx-5+i*5,hy-10);g.lineTo(hx-2.5+i*5,hy-15);g.lineTo(hx+i*5,hy-10);g.fill();}g.fillStyle=mix(ac,'#ffffff',.45);g.fillRect(hx-6,hy-10,12,1);g.fillStyle='#f0d8d0';g.fillRect(hx-1,hy-11,2,1);if(d.female){g.fillStyle=mix(ac,'#ffffff',.55);g.fillRect(hx-7,hy-1,1,2);}else{g.fillStyle='#141414';g.fillRect(hx-1,hy-5,3,2);g.fillStyle=shade(d.skin,.75);g.fillRect(hx-6,hy-2,2,4);}}// 30.09: корона Кармин; 25.10: женское лицо без тени-бороды
else{if(d.id===0){for(let i=0;i<3;i++){const fx2=hx-3+i*3,hg=4+Math.sin(S.FRAME*.3+i*2)*2;g.fillStyle='#f06020';g.beginPath();g.moveTo(fx2-1,hy-8);g.lineTo(fx2+1,hy-9-hg);g.lineTo(fx2+3,hy-8);g.fill();g.fillStyle='#f8d060';g.beginPath();g.moveTo(fx2,hy-8);g.lineTo(fx2+1,hy-8-hg*.5);g.lineTo(fx2+2,hy-8);g.fill();}}
else{g.fillStyle=OUT;g.fillRect(hx-6,hy-11,12,5);g.fillStyle=d.hair;g.fillRect(hx-5,hy-11,11,4);g.fillRect(hx-5,hy-8,3,5);g.fillStyle=mix(d.hair,'#ffffff',.22);g.fillRect(hx-5,hy-11,11,1);g.fillRect(hx-5,hy-8,1,4);}// 30.09: блик волос
g.fillStyle='#141414';g.fillRect(hx-1,hy-6,3,2);g.fillStyle=shade(d.skin,.85);g.fillRect(hx-1,hy-3,3,1);}}// 30.09: нос
function portraitTop(d){return d.gear==='halo'?-25:(d.gear==='horn'||d.gear==='corona')?-19:-15;}
function drawPortLegacy(d,x,y,s){g.save();g.lineCap='round';g.translate(x,y);g.scale(s,s);
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
if(d.longhair){g.fillStyle=OUT;g.fillRect(-9,-11,3,17);g.fillRect(6,-11,3,17);g.fillStyle=d.hair;g.fillRect(-8,-10,2,15);g.fillRect(6,-10,2,15);g.fillStyle=mix(d.hair,'#ffffff',.3);g.fillRect(-8,-10,2,1);g.fillRect(6,-10,2,1);if(d.female){g.fillStyle=d.hair;g.fillRect(-5,-10,4,2);g.fillRect(-3,-9,2,1);g.fillStyle=mix(d.hair,'#ffffff',.45);g.fillRect(-5,-10,3,1);}}// 24.10: длинные волосы в портрете; 25.10: косая чёлка Кармин
g.fillStyle=OUT;g.fillRect(-6,-12,12,17);g.fillStyle=d.skin;g.fillRect(-5,-11,10,15);
if(d.female){g.fillStyle=shade(d.skin,.9);g.fillRect(-4,1,9,1);g.fillStyle=d.acc;g.fillRect(-7,-2,1,2);}else{g.fillStyle=shade(d.skin,.82);g.fillRect(-5,-1,10,4);}// 24.10: у Веги мягкая линия подбородка и серьга
g.fillStyle='#f0e8e0';g.fillRect(0,-7,3,2);g.fillStyle='#141414';g.fillRect(d.female?2:1,-7,d.female?1:2,2);// глаз
if(d.female){g.fillStyle='#141414';g.fillRect(2,-8,2,1);g.fillStyle=shade(d.skin,.6);g.fillRect(0,-5,1,1);g.fillStyle='#8a3040';g.fillRect(-1,-2,3,1);g.fillStyle='#c86070';g.fillRect(0,-2,2,1);g.fillStyle=shade(d.skin,.55);g.fillRect(3,0,1,1);}// 24.10: ресницы, нос, губы и родинка
g.fillStyle=shade(d.skin,.72);g.fillRect(0,d.female?-9:-8,4,1);// бровь
drawGear({def:d,animT:0,charred:0},0,-3);g.restore();}
function drawPort(d,x,y,s){fighterArt.drawPortrait(d,x,y,s);}
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
if(f.rage>=100){g.fillStyle='#ff5030';g.font='7px "Russo One"';g.globalAlpha=.72+.28*(.5+.5*Math.sin(S.FRAME*.08));g.fillText('СУПЕР ГОТОВ',dir>0?x+2:x+w-2,52);g.globalAlpha=1;}};
bar(p1,40,1);bar(p2,RW-190,-1);
drawPort(p1.def,24,26.5,.8);drawPort(p2.def,RW-24,26.5,.8);
const pt1=portraitTop(p1.def),pt2=portraitTop(p2.def);// рамки портретов в цвете стихии, с запасом под рога/нимб/корону
g.strokeStyle=p1.def.acc;g.lineWidth=1;g.strokeRect(14.5,26+pt1*.8,19,(15-pt1)*.8+1);g.strokeStyle=p2.def.acc;g.strokeRect(RW-33.5,26+pt2*.8,19,(15-pt2)*.8+1);
g.fillStyle='rgba(0,0,0,.78)';g.fillRect(RW/2-18,7,36,22);frame(RW/2-18,7,36,22);
if(b.timer<11){g.strokeStyle=blink()?'#ff5030':'#801818';g.lineWidth=1;g.strokeRect(RW/2-17.5,7.5,35,21);}// таймер краснеет в конце
g.font='15px "Russo One"';g.fillStyle=(b.timer<11&&blink())?'#ff5030':'#f0e8d0';g.textAlign='center';g.fillText(b.mode==='training'?'∞':''+Math.ceil(b.timer),RW/2,23);
const pip=(x,y,on)=>{g.fillStyle=on?'#e04020':'#2a2522';g.beginPath();g.moveTo(x+3,y);g.lineTo(x+6,y+3);g.lineTo(x+3,y+6);g.lineTo(x,y+3);g.closePath();g.fill();if(on){g.fillStyle='rgba(255,140,110,.6)';g.fillRect(x+2,y+2,2,2);}};// ромбовидные пипсы побед
for(let i=0;i<2;i++){pip(RW/2-45-i*9,10,i<p1.wins);pip(RW/2+39+i*9,10,i<p2.wins);}}
function bigText(t,y,col,sc){g.save();g.translate(RW/2,y);g.scale(sc,sc);g.font='20px "Rubik Mono One","Russo One",sans-serif';g.textAlign='center';g.fillStyle='#000';for(let dx=-2;dx<=2;dx+=2)for(let dy=-2;dy<=2;dy+=2)g.fillText(t,dx,dy);g.fillStyle=col;g.fillText(t,0,0);g.restore();}// 08.09: заголовочный шрифт Rubik Mono One
function frame(x,y,w,h,key='panel'){const p=UI[key];if(p&&p.ready){const sm=p.slice||12,dm=Math.min(sm,Math.max(2,Math.floor(Math.min(w,h)/2))),iw=p.image.width,ih=p.image.height,cw=iw-sm*2,ch=ih-sm*2;g.save();g.imageSmoothingEnabled=false;g.drawImage(p.image,0,0,sm,sm,x,y,dm,dm);g.drawImage(p.image,iw-sm,0,sm,sm,x+w-dm,y,dm,dm);g.drawImage(p.image,0,ih-sm,sm,sm,x,y+h-dm,dm,dm);g.drawImage(p.image,iw-sm,ih-sm,sm,sm,x+w-dm,y+h-dm,dm,dm);g.drawImage(p.image,sm,0,cw,sm,x+dm,y,w-dm*2,dm);g.drawImage(p.image,sm,ih-sm,cw,sm,x+dm,y+h-dm,w-dm*2,dm);g.drawImage(p.image,0,sm,sm,ch,x,y+dm,dm,h-dm*2);g.drawImage(p.image,iw-sm,sm,sm,ch,x+w-dm,y+dm,dm,h-dm*2);g.restore();return true;}g.strokeStyle='#c8a040';g.lineWidth=1;g.strokeRect(x+.5,y+.5,w-1,h-1);g.fillStyle='#c8a040';g.fillRect(x,y,3,3);g.fillRect(x+w-3,y,3,3);g.fillRect(x,y+h-3,3,3);g.fillRect(x+w-3,y+h-3,3,3);return false;}
function panel(x,y,w,h){g.fillStyle='rgba(10,8,6,.93)';g.fillRect(x,y,w,h);frame(x,y,w,h);}
const seqTxt=(s,p2,face=1,generic=false)=>s.split('').map(x=>{if(face<0&&x==='L')x='R';else if(face<0&&x==='R')x='L';return ({D:'\u2193',U:'\u2191',L:'\u2190',R:'\u2192',P:generic?'P':p2?'I':'J',K:generic?'K':p2?'O':'K'})[x];}).join(' ');
function drawFatalPanel(b){
const left=Math.max(0,1-b.phaseT/fatalFrames);g.fillStyle='rgba(0,0,0,.6)';g.fillRect(RW/2-80,220,160,5);g.fillStyle=left>.35?'#c8a040':'#e04020';g.fillRect(RW/2-80,220,160*left,5);g.strokeStyle='#c8a040';g.lineWidth=1;g.strokeRect(RW/2-80.5,219.5,161,6);
if(!b.winner.ctrl.ai){const w=b.winner,p2=w===b.p2,prog=b.fatalProg||0,seq=fatalMapped(w.def.fat,w.face),n=seq.length,secs=Math.max(0,Math.ceil((fatalFrames-b.phaseT)/60));
g.fillStyle='rgba(8,5,4,.86)';g.fillRect(116,52,192,36);frame(116,52,192,36);
g.font='7px "Russo One"';g.fillStyle='#c8a040';g.textAlign='left';g.fillText('ФАТАЛИТИ',124,63);
g.textAlign='right';g.fillStyle=secs>3?'#c8a040':'#e04020';g.fillText(secs+' С',300,63);
g.font='12px "Russo One"';g.fillStyle=blink()?'#e02020':'#f0e8d0';g.textAlign='center';g.fillText(seqTxt(w.def.fat,p2,w.face),212,76);
const bw=12,gap=5,tw=n*bw+(n-1)*gap,sx=212-tw/2;
for(let i=0;i<n;i++){const x=sx+i*(bw+gap),on=i<prog;g.fillStyle=on?'#e04020':'#2a2522';g.fillRect(x,81,bw,3);if(on){g.fillStyle='rgba(255,140,110,.55)';g.fillRect(x,81,bw,1);}}}}

return {
  pose, drawF, drawFighterGlow, drawGear, portraitTop, drawPort, drawFake,
  drawFLegacy, drawPortLegacy,
  drawHUD, bigText, frame, panel, seqTxt, drawFatalPanel,
  drawProjs, drawBolt, drawFx,
};
}
