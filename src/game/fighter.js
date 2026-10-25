export const ATK={punch:{d:6,wd:5,ac:3,rc:8,rng:28,hh:.72},kick:{d:9,wd:7,ac:4,rc:11,rng:36,hh:.6},upper:{d:15,wd:6,ac:4,rc:15,rng:24,hh:.5,launch:1},sweep:{d:10,wd:6,ac:3,rc:13,rng:38,hh:.12,low:1},jkick:{d:10,wd:4,ac:8,rc:20,rng:34,hh:.4,overhead:1},rh:{d:12,wd:8,ac:4,rc:15,rng:40,hh:.55,knock:1},throw:{d:1,wd:5,ac:3,rc:20,rng:32,hh:.55,throw:1,grab:1}};// 25.10: P+K — захват, урон и добивание идут отдельным броском персонажа// 30.09: восстановления короче на 1 кадр — бой цепляется живее// 08.09: roundhouse — тяжёлый удар с нокдауном
const ZEROC={l:0,r:0,u:0,d:0,P:0,K:0,B:0,pP:0,pK:0,pl:0,pr:0,pu:0,pd:0};// 08.09: пустой ввод для интро
export const WM={0:[.24,1,1,1.5,.02],1:[.15,.65,.4,.6,.1],2:[.27,1.1,1.3,1.8,0],3:[.14,1.2,.8,2.6,.06],4:[.3,.9,1.4,1,.12],5:[.2,.7,.5,.8,-.03],6:[.2,.9,.7,1,0],7:[.22,1.1,.5,1.6,.04],8:[.13,.5,.3,.4,-.05],9:[.21,.95,1.1,1.6,.03],10:[.19,.75,.6,.9,-.04],11:[.28,.85,1.2,.9,.1],12:[.17,.6,.4,.5,-.02]};// 30.09: Вега — парящая походка — [частота, размах ног, размах рук, покачивание, наклон]: Базальт топает тяжело, Фэнг семенит, Ноктюрн плывёт, Кайзер марширует

function hitR(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;}

export function createFighter({
  S, FL, GR, AW, clamp, lerp, rnd, pick, P, blood, spriteFx, SFX, smoke, resolveHit, autoHit,
}) {
  // 25.10: каст-позы из render.js. Снаряд должен вылетать из кисти, а не из груди.
  const CAST_ARMS={1:[[.2,1.2],[.1,1.1]],2:[[2.6,0],[-2.6,.1]],3:[[1.8,.6],[-.5,1.8]],4:[[1.2,.5],[-.6,1.8]],5:[[.6,1.2],[-.6,1.3]],6:[[2.4,.3],[-.4,1.8]],7:[[1.5,.05],[1.2,.2]],8:[[1.6,.2],[-.9,1.6]],9:[[1.5,.1],[1.3,.2]],10:[[1.7,.35],[1.35,.45]],11:[[1.9,-.1],[-.4,2.1]],12:[[1.55,-.05],[-.5,1.7]]};
  function castHand(f){const d=f.def,ph=Math.min(1,f.st/12),ci=CAST_ARMS[d.id];
    const a1=ci?lerp(-.5,ci[0][0],ph):lerp(-.5,1.5,ph),a2=ci?lerp(2,ci[0][1],ph):lerp(2,.1,ph);
    const hip=-d.h*.47,shY=hip-d.h*.3,shX=ph*.2*10,l1=d.h*.2,l2=d.h*.18;
    const lx=2+shX+Math.sin(a1)*l1+Math.sin(a1+a2)*l2,ly=shY+2+Math.cos(a1)*l1+Math.cos(a1+a2)*l2;
    const sc=d.bulk*(f.scale||1),sq=f.squash||1;
    return{x:f.x+f.face*sc*lx,y:f.y+sc*sq*ly};}
  function castOrigin(f){const h=castHand(f),d=f.def;let dx=0;
    if(d.bow)dx=16;else if(d.blade)dx=13;else if(d.fan)dx=8;else if(d.claws)dx=4;
    return{x:h.x+f.face*dx,y:h.y};}
  function castBurst(x,y,col,scale){const c=col||'#f8d060',k=scale||1;
    S.fx.push({ty:'castburst',x,y,t:0,life:10,col:c,scale:k});
    for(let i=0;i<8;i++){const a=i/8*Math.PI*2;P(x+Math.cos(a)*3,y+Math.sin(a)*3,Math.cos(a)*rnd(.8,2.2),Math.sin(a)*rnd(.8,2.2),c,16,2,0);}}
  class F{
  constructor(def,ctrl){this.def=def;this.ctrl=ctrl;this.wins=0;this.rage=0;this.aiDir=null;this.reset(200,1);}
  reset(x,face){this.x=x;this.y=FL+GR;this.vx=0;this.vy=0;this.face=face;this.state='idle';this.st=0;this.hp=100;this.atk=null;this.frozen=0;this.netT=0;this.invis=0;this.invuln=0;this.poison=0;this.charred=0;this.hidden=0;this.tilt=0;this.run=100;this.running=0;this.hpLag=100;this.lastTap=-99;this.tapDir=0;this.animT=0;this.squash=1;this.scale=1;this.flash=0;this.jbuf=0;this.abuf=0;this.abufB='punch';this.dodging=0;this.dvx=0;this.marks=[];this.poisonC=null;this.spec2go=0;this.combo=0;this.comboT=99;this.pale=0;this.defeated=0;this.damageTaken=0;this.armor=0;this.blockStun=0;this.blockLow=0;this.grabbedBy=0;this.throwTarget=0;this.jumpGrace=0;this.chain='';this.chainT=0;this.hitStun=18;this.ctrl.clear();}
  get onGround(){return this.y>=FL+GR-.5;}
  get box(){const d=this.def,bh=(this.state==='crouch')?d.h*.55:d.h;return{x:this.x-9*d.bulk,y:this.y-bh,w:18*d.bulk,h:bh};}
  startAtk(t,key){const d=this.def,c=key&&d.cmd?d.cmd[key]:null,stats=c?{...c}:null,type=stats?(stats.t||t):t;let A={...ATK[type],...(d.norm?.[type]||{})};let name=null;if(stats){const {n,...rest}=stats;delete rest.t;A={...A,...rest};name=n||null;}const btn=key?(key==='fP'||key==='bP'?'P':key==='fK'?'K':null):(type==='punch'||type==='upper'?'P':type==='kick'||type==='sweep'||type==='rh'?'K':null);let target=null,chainPart=false;if(btn){const seq=d.target&&d.target.seq,continuing=this.comboT<60&&this.combo>0&&this.chainT>0;let chain=continuing?this.chain+btn:btn;if(seq&&!seq.startsWith(chain))chain=btn;this.chain=chain;this.chainT=60;chainPart=!!(seq&&chain.length<seq.length&&seq.startsWith(chain));if(seq&&chain===seq)target=d.target;}else{this.chain='';this.chainT=0;}this.state='atk';this.st=0;this.atk={t:type,name,A,target,chainPart,btn:btn||null,hit:0,blocked:0,connected:0,cancel:0};this.invis=0;this.spec2go=0;this.jumpGrace=0;if(!S.battle||S.battle.phase==='fight')this.ctrl.buf.length=0;SFX.swing();}// 08.09: атака пробивает невидимость; 24.10: буфер очищается для special cancel только в бою; 25.10: профили нормалов, командные нормалы и target-combo
  startCmd(key){const c=this.def.cmd&&this.def.cmd[key];if(!c)return false;this.startAtk(c.t,key);return true;}
  startCmdThrow(){this.startAtk('throw');this.atk.cmdThrow=1;if(this.def.grappler)this.armor=Math.max(this.armor,6);}
  jump(){this.vy=-this.def.jmp;this.state='jump';this.jumpGrace=0;SFX.jump();}
  motionPrefix(){const d=this.def;return [d.spec,d.spec2].some((seq)=>{const p=(seq||'').slice(0,-1);return p.endsWith('U')&&this.ctrl.matchRel(p,this.face,20);});}
  update(FR,foe){const d=this.def,c=(S.battle&&S.battle.phase==='intro')?ZEROC:this.ctrl;const stunned=this.blockStun>0;if(stunned)this.blockStun--;// 08.09: в интро ввод заблокирован, но бойцы дышат
  this.animT++;this.st++;if(this.chainT>0)this.chainT--;else this.chain='';this.flash=Math.max(0,this.flash-1);this.squash=lerp(this.squash,1,.12);this.hpLag=Math.max(this.hp,this.hpLag-.4);// 08.09: отстающий бар урона + восстановление сквоша
  if(this.defeated){this.tilt=lerp(this.tilt,this.state==='dizzy'?0:-1.4,.2);return;}
  if(this.netT>0&&this.state!=='net')this.netT=0;
  if(this.poison>0){this.poison--;this.hp=Math.max(1,this.hp-.06);this.damageTaken=(this.damageTaken||0)+.06;if(this.poison%9===0)P(this.x,this.y-d.h*.6,rnd(-.5,.5),rnd(-1.5,-.3),this.poisonC||'#7ac83a',20,2);}// 30.09: цвет DoT — яд зелёный, кровотечение алое
  if(this.invis>0)this.invis--;if(this.invuln>0)this.invuln--;if(this.armor>0)this.armor--;
  if(S.GAME==='fight'&&!this.hidden){if(d.id===0&&FR%9===0)P(this.x+rnd(-4,4),this.y-d.h-4,rnd(-.3,.3),rnd(-1.2,-.5),pick(['#f06020','#f0a030']),26,1,-.02);if(d.id===6&&FR%12===0)P(this.x+rnd(-7,7),this.y-d.h*rnd(.3,1),0,rnd(.2,.6),'#cfeaff',30,1,.02);if(d.id===12&&FR%13===0)P(this.x+rnd(-11,11),this.y-d.h*rnd(.1,1.1),rnd(-.2,.2),rnd(-.7,-.2),'#b89aff',22,1,-.01);}// 30.09: +звёздная пыль Веги
  if(this.state==='grabbed'){const g=this.grabbedBy;if(g&&g.state==='atk'&&g.atk&&g.atk.t==='throw'&&!g.atk.thrown){const ph=clamp((g.st-(g.atk.A.wd+g.atk.A.ac))/8,0,1);this.x=clamp(g.x+g.face*(16+ph*8),16,AW-16);this.y=g.y-6-ph*8;this.vx=0;this.vy=0;this.face=-g.face;this.tilt=lerp(this.tilt,.22,.2);return;}this.grabbedBy=0;this.state='idle';this.st=0;}
  if(this.state==='dash'){this.vx=this.dvx;this.dodging=1;if(this.st>14){this.state='idle';this.dodging=0;}}
  else if(this.running&&this.onGround&&c.pB){this.st=0;this.state='dash';this.dvx=this.running*d.spd*3.4;this.dodging=1;SFX.swing();for(let i=0;i<6;i++)P(this.x,this.y-rnd(4,22),-this.running*rnd(1,2.2),rnd(-1,0),'#9a9080',16,2,.04);}// 30.09: рывок-уклонение (бег+блок), неуязвимость 15 кадров
  const M=({idle:1,walk:1,crouch:1,block:1,atk:1,cast:1,super:1,fatal:1,jump:1}[this.state])?1:0;
  if(M){if(this.state==='super'||this.state==='cast'||this.state==='atk')this.running=0;
  let mv=0;if(!stunned&&['idle','walk','jump'].includes(this.state)){if(c.l&&!c.r)mv=-1;else if(c.r&&!c.l)mv=1;}
  if(this.onGround&&this.run>0&&this.running&&['idle','walk'].includes(this.state)){mv=this.running;this.run-=.6;if(this.run<=0)this.running=0;}else this.run=Math.min(100,this.run+.25);
  if(!c.l&&!c.r)this.running=0;
  if(this.onGround){if((c.pl||c.pr)&&FR-this.lastTap<16&&this.tapDir===(c.pl?-1:1)&&this.run>10){this.running=c.pl?-1:1;SFX.swing();for(let i=0;i<4;i++)P(this.x,FL+GR-3,rnd(-1,1),rnd(-1.4,-.3),'#9a9080',14,2,.06);}// 08.09: пыль при рывке
  if(c.pl||c.pr){this.lastTap=FR;this.tapDir=c.pl?-1:1;}}
  this.vx=mv*(this.running?d.spd*2.3:d.spd);
  if(this.running&&this.onGround&&FR%4===0){P(this.x-this.running*8,FL+GR-2,-this.running*rnd(.2,.6),rnd(-1,-.2),'#9a9080',16,1,.05);if(FR%12===0)spriteFx('dustRun',this.x-this.running*8,FL+GR,{scale:.9,alpha:.35});}// 08.09: пыль от бега; 24.10: спрайтовая пыль
  else if(this.state==='walk'&&this.onGround&&FR%Math.max(8,Math.round(3.5/(WM[d.id]?WM[d.id][0]:.22)))===0)SFX.step();// 30.09: каденс шагов от походки
  if(mv&&this.onGround&&this.state==='idle')this.state='walk';
  if(!mv&&this.state==='walk')this.state='idle';
  if(this.onGround&&c.d&&['idle','walk'].includes(this.state))this.state='crouch';
  if(this.state==='crouch'&&!c.d)this.state='idle';
  if(!stunned&&this.onGround&&c.pu&&['idle','walk'].includes(this.state)){
    if(this.motionPrefix())this.jumpGrace=4;else this.jump();
  }
  if(this.jumpGrace>0){this.jumpGrace--;if(this.jumpGrace===0&&this.onGround&&['idle','walk','crouch'].includes(this.state))this.jump();}
  else if(!this.onGround&&c.pu)this.jbuf=10;else if(this.jbuf>0)this.jbuf--;// 30.09: буфер прыжка 10 кадров; 25.10: pre-jump окно для наземных U-спецов
  if(this.onGround&&c.B&&['idle','walk','crouch'].includes(this.state))this.state='block';
  else if(this.state==='block'&&!c.B)this.state=c.d?'crouch':'idle';this.blockLow=this.state==='block'?!!c.d:0;
  if(!stunned&&['idle','walk','crouch','block'].includes(this.state)&&this.onGround&&(c.pP||c.pK)){const btn=c.pP?'P':'K',fwd=this.face>0?c.r:c.l,back=this.face>0?c.l:c.r;
  if(this.rage>=100&&this.ctrl.match('DDP',75))this.startSuper();
  else if(this.ctrl.matchRel(d.spec,this.face,75))this.startSpec(foe);
  else if(this.ctrl.matchRel(d.spec2,this.face,75))this.startSpec2(foe);// 08.09: второй спецприём
  else if(c.pkChord&&c.pkChord()){if(c.d||(this.def.grappler&&fwd))this.startCmdThrow();else this.startAtk('throw');}// 24.10: бросок P+K; 25.10: D+P+K — командный бросок, F+P+K — фирменный захват грэпплера; P и K прощают зазор в несколько кадров
  else if(!c.d&&fwd&&btn==='P')this.startCmd('fP');
  else if(!c.d&&fwd&&btn==='K')this.startCmd('fK');
  else if(!c.d&&back&&btn==='P')this.startCmd('bP');
  else if(btn==='P')this.startAtk(c.d?'upper':'punch');else if(c.d)this.startAtk('sweep');else this.startAtk(((c.l&&!c.r&&this.face>0)||(c.r&&!c.l&&this.face<0))?'rh':'kick');}// 08.09: назад+нога = roundhouse; 25.10: командные нормалы
  if(this.state==='jump'&&(c.pP||c.pK)){if(this.ctrl.matchRel(d.spec,this.face,75))this.startSpec(foe);else if(this.ctrl.matchRel(d.spec2,this.face,75))this.startSpec2(foe);else this.startAtk('jkick');}}// 08.09: спец Вольта (DUP) перехватывался прыжком — теперь комбо проверяется в воздухе
  else this.vx*=.98;
  if(this.state==='hit'){this.vx=this.hvx;if(this.st>(this.hitStun||18)&&this.onGround){this.state='idle';this.vx=0;}}
  if(this.state==='down'){this.tilt=lerp(this.tilt,-1.4,.2);this.vx*=.9;if(this.st>40){this.state='getup';this.st=0;this.invuln=12;}}
  else if(this.state==='getup'){this.tilt=lerp(this.tilt,0,.15);if(this.st>18){this.state='idle';this.tilt=0;}}
  else if(this.onGround)this.tilt=lerp(this.tilt,0,.3);
  this.vy+=.42;this.x+=this.vx;this.y+=this.vy;
  if(this.y>FL+GR){if(this.vy>3){SFX.land();spriteFx('dust',this.x,FL+GR,{scale:1,alpha:.55});for(let i=0;i<5;i++)P(this.x+rnd(-8,8),FL+GR-2,rnd(-1,1),rnd(-1.2,-.2),'#9a9080',20,2,.05);this.squash=.82;}// 08.09: !this.onGround был всегда false в кадр приземления — звук и пыль не играли; + сквош
  this.y=FL+GR;this.vy=0;if(this.state==='jump')this.state='idle';if(this.state==='idle'&&this.jbuf>0){this.vy=-d.jmp;this.state='jump';this.jbuf=0;SFX.jump();}// 30.09: прыжок из буфера при приземлении
  if(this.state==='atk'&&this.atk&&this.atk.t==='jkick'){this.state='idle';this.atk=null;}}
  this.x=clamp(this.x,16,AW-16);
  if((this.state==='down'||this.state==='hit')&&Math.abs(this.vx)>3&&(this.x<=17||this.x>=AW-17)){this.vx*=-.55;S.shake=Math.max(S.shake,4);SFX.hitH();blood(this.x,this.y-30,4,1);}
  // 08.09: отскок от стен при сильном отбросе — боец отлетает, как в нормальных файтингах
  const dx=this.x-foe.x;if(Math.abs(dx)<16&&Math.abs(this.y-foe.y)<40){const push=(16-Math.abs(dx))/2*(dx<0?-1:1);this.x+=push;foe.x-=push;this.x=clamp(this.x,16,AW-16);foe.x=clamp(foe.x,16,AW-16);}
  if(['idle','walk','crouch','block'].includes(this.state))this.face=foe.x<this.x?-1:1;
  // 25.10: P и K с малым зазором — ранний удар превращается в бросок, иначе первая кнопка «съедала» вторую
  if(this.state==='atk'&&this.atk&&(!this.atk.hit||this.atk.blocked)&&this.atk.btn&&!this.atk.target&&this.st<=this.atk.A.wd+this.atk.A.ac+4&&c.pkChord&&c.pkChord()){
    const pressed=this.atk.btn==='P'?c.pK:c.pP;
    if(pressed){
      const fwd2=this.face>0?c.r:c.l;
      if(c.d||(this.def.grappler&&fwd2))this.startCmdThrow();else this.startAtk('throw');
    }
  }
  if(this.state==='atk'&&this.atk){const A=this.atk.A;
  if(c.pP){this.abuf=12;this.abufB='punch';}else if(c.pK){this.abuf=12;this.abufB=c.d?'sweep':'kick';}else if(this.abuf>0)this.abuf--;// 30.09: буфер атаки 12 кадров
  if(this.st>A.wd&&this.st<=A.wd+A.ac&&!this.atk.hit&&foe.state!=='down'){const hb=this.atkBox();if(hb&&hitR(hb,foe.box)&&(!A.throw||(foe.onGround&&(['idle','walk','block'].includes(foe.state)||(this.atk.cmdThrow&&foe.state==='crouch'))))){const res=resolveHit(this,foe,A.d,{launch:A.launch,low:A.low,overhead:A.overhead,throw:A.throw,knock:A.knock,grab:A.grab,kb:A.kb,status:A.status,chain:this.atk.chainPart,target:this.atk.target});this.atk.hit=1;this.atk.blocked=res==='block'?1:0;this.atk.connected=res==='hit'||res==='grab'?1:0;this.atk.grabbed=res==='grab'?foe:0;}}
  if(this.atk.t==='throw'&&this.atk.grabbed&&!this.atk.thrown&&this.st>=A.wd+A.ac+8)this.finishThrow(this.atk.grabbed);
  if(this.st===A.wd+A.ac&&!this.atk.hit){SFX.whiff();const hb=this.atkBox();S.fx.push({ty:'whiff',x:hb?hb.x+hb.w/2:this.x+this.face*22,y:hb?hb.y+hb.h/2:this.y-this.def.h*.6,face:this.face,t:0,life:12,col:this.def.acc||'#cfe8ff'});if(A.throw)S.fx.push({ty:'name',x:this.x+this.face*12,y:this.y-this.def.h-6,txt:(foe.state==='crouch'&&!this.atk.cmdThrow?'ПРИСЕВ · D+БРОСОК':'ПРОМАХ'),col:'#c8a0a0',life:34,t:0});}// 30.09: свист промаха; 25.10: дуга воздуха; 25.10: бросок мимо — явная надпись
  if(this.atk.hit&&this.atk.connected&&!this.atk.blocked&&!this.atk.cancel&&!A.throw&&this.st>A.wd+A.ac&&this.st<=A.wd+A.ac+16&&this.onGround){if(this.ctrl.matchRel(d.spec,this.face,75)){this.atk.cancel=1;this.startSpec(foe);}else if(this.ctrl.matchRel(d.spec2,this.face,75)){this.atk.cancel=1;this.startSpec2(foe);}}// 24.10: special cancel только по попаданию
  if(this.state==='atk'&&this.st>A.wd+A.ac+A.rc){if(this.abuf>0&&this.onGround){this.abuf=0;this.startAtk(this.abufB);}// 30.09: чейнинг из буфера
  else{this.state='idle';this.atk=null;}}}
  if(this.state==='cast'&&this.st===14){if(this.spec2go){this.fireSpec2(foe);this.spec2go=0;}else this.fireSpec(foe);}
  if(this.state==='cast'&&this.st>28)this.state='idle';
  if(this.state==='frozen'){this.frozen--;if(this.frozen<=0)this.state='idle';}
  if(this.state==='net'){this.netT--;if(this.netT<=0)this.state='idle';}}
  atkBox(){if(!this.atk)return null;const A=this.atk.A,d=this.def,w=(A.hw||A.rng)*d.bulk;if(this.atk.t==='jkick')return{x:this.x+(this.face>0?4:-4-w),y:this.y-d.h*.05,w:w+6,h:d.h*.6};return{x:this.x+(this.face>0?4:-4-w),y:this.y-d.h*A.hh-(this.atk.t==='sweep'?0:6),w:w+6,h:this.atk.t==='sweep'?12:(this.atk.t==='upper'?34:14)};}
  finishThrow(foe){const d=this.def,cmd=!!(this.atk&&this.atk.cmdThrow),type=cmd?(d.throwCmdT||d.throwT||'slam'):(d.throwT||'slam'),col=d.throwC||d.acc||'#f8d060',dmg=cmd?(d.throwCmdD||(d.throwD||10)+1):(d.throwD||10),name=cmd?(d.throwCmdN||d.throwN):d.throwN,launch=type==='star';foe.grabbedBy=0;this.throwTarget=0;
  const res=resolveHit(this,foe,dmg,{throw:1,knock:!launch,launch:launch?1:0});this.atk.thrown=1;this.atk.grabbed=0;if(res!=='hit')return;
  foe.x=clamp(this.x+this.face*(launch?22:34),16,AW-16);foe.y=this.y-4;foe.vy=launch?-9:-3.6;foe.vx=this.face*(launch?4.5:5);this.x=clamp(this.x-this.face*3,16,AW-16);this.squash=.86;
  for(let i=S.fx.length;i--;)if(S.fx[i].ty==='name'&&S.fx[i].txt==='ЗАХВАТ!')S.fx.splice(i,1);// 25.10: подпись захвата уступает место названию добивания
  S.shake=Math.max(S.shake,type==='slam'||type==='blast'||type==='royal'?7:4);S.fx.push({ty:'ring',x:foe.x,y:foe.y-foe.def.h*.55,t:0,col});S.fx.push({ty:'name',x:this.x+this.face*10,y:this.y-this.def.h-10,txt:name,col,life:70,t:0,big:1});
  if(type==='fire'){SFX.fire();foe.poison=50;foe.poisonC=col;}
  else if(type==='shadow'){SFX.tele();this.invis=24;smoke(this.x,this.y-30);}
  else if(type==='shock'){SFX.zap();foe.blockStun=12;}
  else if(type==='slam'){SFX.bone();}
  else if(type==='claw'){SFX.slash();foe.poison=60;foe.poisonC=col;}
  else if(type==='sand'){SFX.mirror();}
  else if(type==='ice'){SFX.ice();S.fx.push({ty:'nova',x:foe.x,y:foe.y-30,t:0});}
  else if(type==='blast'){SFX.boom();}
  else if(type==='drain'){SFX.sting();this.hp=Math.min(100,this.hp+6);S.fx.push({ty:'drain',x:foe.x,y:foe.y,t:0});}
  else if(type==='royal'){SFX.sting();S.flashS=Math.max(S.flashS,4);}
  else if(type==='blood'){SFX.sting();foe.poison=70;foe.poisonC=col;blood(foe.x,foe.y-foe.def.h*.5,8,1.2);}
  else if(type==='blade'){SFX.slash();blood(foe.x,foe.y-foe.def.h*.5,9,1.3);}
  else if(type==='star'){SFX.cast2();}
  for(let i=0;i<10;i++)P(foe.x+rnd(-12,12),foe.y-rnd(8,50),rnd(-2,2),rnd(-2.5,0),col,24,2,-.01);}
  startSpec(foe){this.state='cast';this.st=0;this.face=foe.x<this.x?-1:1;this.spec2go=0;this.jumpGrace=0;this.chain='';this.chainT=0;SFX.cast();}
  startSpec2(foe){this.state='cast';this.st=0;this.face=foe.x<this.x?-1:1;this.spec2go=1;this.jumpGrace=0;this.chain='';this.chainT=0;SFX.cast2();}// 08.09: второй спец — тот же каст, флаг spec2go выбирает ветку в fireSpec
  startSuper(){this.state='super';this.st=0;this.rage=0;this.armor=this.def.boss?20:12;this.supEv=[];this.invis=0;this.jumpGrace=0;this.chain='';this.chainT=0;S.flashS=Math.max(S.flashS,4);S.shake=Math.max(S.shake,4);SFX.supwave();// 08.09: +пробивание невидимости; 25.10: у босса больше армора
  const sy=this.y-this.def.h*.55;S.fx.push({ty:'super',x:this.x,y:sy,gy:this.y,t:0,life:26,col:this.def.acc||'#e8c040'});for(let i=0;i<18;i++){const a=i/18*Math.PI*2;P(this.x+Math.cos(a)*7,sy+Math.sin(a)*7,Math.cos(a)*rnd(1.2,3),Math.sin(a)*rnd(1.2,3),i%2?this.def.acc:'#f8e8b0',26,2,-.02);}// 25.10: вспышка ауры супера
  const me=this;const E=(t,fn)=>this.supEv.push({t,fn,done:0});const id=this.def.id;
  if(this.def.boss){SFX.fire();SFX.boom();S.shake=6;for(let i=0;i<8;i++)E(14+i*7,()=>{S.projs.push({ty:'meteor',x:clamp(me.foe.x+rnd(-54,54),20,AW-20),y:-10,vx:0,vy:5.8,o:me,d:3.4,l:120});SFX.shoot();});E(74,()=>{S.shake=8;S.flashS=Math.max(S.flashS,4);for(let i=0;i<18;i++){const a=i/18*Math.PI*2;P(me.x+Math.cos(a)*8,me.y-30+Math.sin(a)*8,Math.cos(a)*rnd(1,3),Math.sin(a)*rnd(1,3),'#f0c850',30,2,-.02);}});}// 25.10: «Орбитальная корона» — метеоры вокруг цели
  else if(id===0){SFX.fire();for(let i=0;i<10;i++)E(14+i*7,()=>{S.projs.push({ty:'meteor',x:me.foe.x+rnd(-34,34),y:-10,vx:0,vy:5.5,o:me,d:2.6,l:120});SFX.shoot();});}
  else if(id===1){E(10,()=>{me.x=clamp(me.foe.x-me.foe.face*26,20,AW-20);smoke(me.x,me.y-30);SFX.tele();});for(let i=0;i<8;i++)E(20+i*6,()=>{autoHit(me,3);SFX.slash();});E(78,()=>resolveHit(me,me.foe,8,{launch:1}));}
  else if(id===2){for(let i=0;i<6;i++)E(14+i*9,()=>{S.projs.push({ty:'bolt',x:me.foe.x+rnd(-30,30),y:FL,vx:0,vy:0,o:me,d:3.4,l:14});SFX.zap();});}
  else if(id===3){for(let i=0;i<6;i++)E(14+i*10,()=>{const rx=me.foe.x+rnd(-24,24);S.fx.push({ty:'rock',x:rx,t:0});SFX.bone();S.shake=6;if(Math.abs(me.foe.x-rx)<26&&me.foe.onGround&&me.foe.state!=='down')resolveHit(me,me.foe,4,{});});}
  else if(id===4){E(10,()=>{me.x=clamp(me.foe.x-me.foe.face*24,20,AW-20);smoke(me.x,me.y-30);SFX.tele();});for(let i=0;i<15;i++)E(18+i*4,()=>{autoHit(me,1.7);SFX.slash();});E(85,()=>resolveHit(me,me.foe,9,{launch:1}));}
  // 08.09: баланс Фэнга — самый жирный супер 39→~35
  else if(id===5){SFX.tele();SFX.mirror();E(10,()=>{me.x=clamp(me.foe.x-me.foe.face*30,20,AW-20);smoke(me.x,me.y-30);SFX.tele();});// 30.09: Сахра переносится к врагу — зеркала окружают жертву
  for(let i=0;i<9;i++)E(16+i*7,()=>{autoHit(me,2.6);SFX.hit();});E(85,()=>resolveHit(me,me.foe,8,{launch:1}));}
  else if(id===6){E(14,()=>{SFX.ice();S.fx.push({ty:'nova',x:me.x,y:me.y-30,t:0});if(Math.abs(me.foe.x-me.x)<95){resolveHit(me,me.foe,6,{});me.foe.frozen=90;me.foe.state='frozen';me.foe.atk=null;SFX.freeze();}else{const oh=castOrigin(me);S.projs.push({ty:'ice',x:oh.x,y:oh.y,vx:me.face*6.5,vy:0,o:me,d:6,l:120,frz:1});SFX.ice();}// 30.09: издали — ледяная стрела догоняет и замораживает
  for(let i=0;i<14;i++)P(me.x,me.y-30,Math.cos(i/14*6.28)*3.4,Math.sin(i/14*6.28)*3.4,'#c8ecff',30,2,0);});}
  else if(id===7){for(let i=0;i<8;i++)E(14+i*8,()=>{SFX.shoot();const oh=castOrigin(me);S.projs.push({ty:'bomb',x:oh.x,y:oh.y-4,vx:me.face*rnd(2,4.4),vy:-4.5,o:me,d:3,l:130});});}
  else if(id===8){SFX.sting();S.fx.push({ty:'drain',x:me.foe.x,t:0});for(let i=0;i<8;i++)E(16+i*8,()=>{const f=me.foe;if(S.battle.phase==='fight'&&!f.defeated&&f.hp>0&&f.armor<=0){f.hp=Math.max(0,f.hp-3);f.damageTaken=(f.damageTaken||0)+3;f.flash=4;f.state='hit';f.st=0;f.atk=null;f.spec2go=0;f.netT=0;me.hp=Math.min(100,me.hp+1.6);f.rage=Math.min(100,f.rage+2.7);for(let j=0;j<3;j++)P(f.x+rnd(-8,8),f.y-rnd(10,50),(me.x-f.x)*.05,rnd(-1,-.2),'#7a3aa8',34,2,0);SFX.hit();}});}
  else if(id===10){SFX.sting();for(let i=0;i<7;i++)E(14+i*6,()=>{const oh=castOrigin(me);S.projs.push({ty:'shard',c:'#d82040',x:oh.x,y:oh.y+Math.sin(i*2.1)*10,vx:me.face*8,vy:(me.foe.y-me.def.h*.5-oh.y)/9,o:me,d:2.3,l:60,s:4});SFX.slash();for(let j=0;j<3;j++)P(me.foe.x+rnd(-12,12),me.foe.y-rnd(10,55),rnd(-1.5,1.5),rnd(-2,0),'#d82040',26,2,0);});E(80,()=>resolveHit(me,me.foe,10,{launch:1}));}// 30.09: Алый пион — семь кровавых лезвий летят к врагу, финальный подброс
  else if(id===11){SFX.tele();E(10,()=>{me.x=clamp(me.foe.x-me.foe.face*26,20,AW-20);smoke(me.x,me.y-30);SFX.tele();});for(let i=0;i<10;i++)E(16+i*5,()=>{autoHit(me,2.2);SFX.slash();for(let j=0;j<2;j++)P(me.foe.x+rnd(-10,10),me.foe.y-rnd(10,55),rnd(-1.2,1.2),rnd(-2,0),'#9adcee',24,2,0);});E(78,()=>resolveHit(me,me.foe,9,{launch:1}));}// 30.09: Сто теней — перенос за спину и шквал рассечений
  else if(id===12){SFX.cast2();for(let i=0;i<3;i++)E(14+i*10,()=>{SFX.shoot();const oh=castOrigin(me);S.projs.push({ty:'shard',c:'#b89aff',x:oh.x,y:oh.y-4,vx:me.face*3.2,vy:-2.6,o:me,d:8,l:130,s:5,hom:1});});}// 30.09: Небесный ловец — урон только от звёзд (бесплатный resolveHit убран)
  else{for(let i=0;i<6;i++)E(14+i*8,()=>{S.projs.push({ty:'rocket',x:me.foe.x+rnd(-30,30),y:-8,vx:0,vy:4.6,o:me,d:4,l:120});SFX.shoot();});}
  this.superDur=110;}
  fireSpec(foe){const d=this.def;this.face=foe.x<this.x?-1:1;const h=castOrigin(this),x=h.x,y=h.y;castBurst(x,y,d.acc,d.boss?1.25:1);
  if(d.boss){SFX.boom();S.shake=6;for(let i=-1;i<=1;i++)S.projs.push({ty:'shard',c:'#f0c850',x,y:y+i*8,vx:this.face*(5.2+Math.abs(i)*.6),vy:i*.8,o:this,d:5,l:100,s:6,k:1});return;}// 25.10: «Корона-залп» — три золотых лезвия
  switch(d.id){
  case 0:S.projs.push({ty:'fire',x,y,vx:this.face*4,vy:0,o:this,d:7,l:110});SFX.fire();break;// 08.09: баланс — снаряды слабее ударов в упор
  case 1:this.x=clamp(foe.x-foe.face*30,20,AW-20);smoke(this.x,this.y-30);SFX.tele();break;
  case 2:S.fx.push({ty:'castbolt',x,y,t:0});S.projs.push({ty:'bolt',x:foe.x,y:FL,vx:0,vy:0,o:this,d:8,l:16});SFX.zap();break;// 30.09: болт + канал из руки
  // 08.09: баланс Вольта — болт бьёт по позиции врага без промаха, 9→8
  case 3:S.projs.push({ty:'wave',x:this.x+this.face*18,y:FL+GR-12,vx:this.face*3.4,vy:0,o:this,d:8,l:90,c:'#a07840'});SFX.boom();S.shake=4;break;// 08.09: волна создавалась с y:0 — хитбокс у земли, приём никогда не попадал; баланс 9→8
  case 4:if(Math.abs(foe.x-this.x)<44*d.bulk){resolveHit(this,foe,5,{});foe.poison=200;SFX.slash();}for(let i=0;i<5;i++)P(this.x+this.face*30,y,rnd(-1,1)+this.face,rnd(-2,0),'#7ac83a',24,2);break;
  case 5:this.invis=130;smoke(this.x,this.y-30);SFX.tele();break;
  case 6:S.projs.push({ty:'ice',x,y,vx:this.face*3.6,vy:0,o:this,d:6,l:110});SFX.ice();break;// 08.09: баланс 7→6
  case 7:S.projs.push({ty:'net',x,y,vx:this.face*3,vy:0,o:this,d:4,l:120});SFX.net();break;
  // 08.09: баланс Ржавого — сеть даёт бесплатное комбо, урон 5→4
  case 8:S.projs.push({ty:'shadow',x,y,vx:this.face*3.4,vy:0,o:this,d:6,l:110});SFX.tele();break;// 08.09: баланс 8→6
  case 10:for(let i=-1;i<=1;i++)S.projs.push({ty:'shard',c:'#d82040',x,y:y+i*6,vx:this.face*6.2,vy:i*.9,o:this,d:4,l:90,s:3,bl:1});SFX.slash();break;// 30.09: Кровавые иглы — быстрый веер с кровотечением
  case 11:S.projs.push({ty:'shard',c:'#9adcee',x,y,vx:this.face*5.5,vy:0,o:this,d:7,l:75,s:7});SFX.slash();break;// 30.09: Полумесяц — серп клинка, дальность до ~410px
  case 12:this.marks=this.marks||[];if(this.marks.length>=2)this.marks.shift();this.marks.push({x:clamp(this.x+this.face*46,20,AW-20),y:this.y});SFX.cast2();for(let i=0;i<6;i++)P(this.x+this.face*46+rnd(-8,8),this.y-rnd(0,40),0,rnd(-.5,-.1),'#b89aff',26,2,0);break;// 30.09: Звёздная метка — до двух на арене
  case 9:S.projs.push({ty:'wave',x:this.x+this.face*18,y:FL+GR-12,vx:this.face*4,vy:0,o:this,d:9,l:90,c:'#c8d060'});SFX.boom();S.shake=5;break;// 25.10: ветка Кайзера явная; баланс 10→9
  default:throw new Error('Unknown fighter spec: '+d.id);}}
  fireSpec2(foe){const d=this.def;this.face=foe.x<this.x?-1:1;const h=castOrigin(this),x=h.x,y=h.y;castBurst(x,y,d.acc,d.boss?1.25:1);// 08.09: вторые спецприёмы — по одному на бойца
  if(d.boss){SFX.bone();S.shake=5;for(let i=0;i<5;i++)S.projs.push({ty:'meteor',x:clamp(foe.x+rnd(-52,52),20,AW-20),y:-10-i*22,vx:0,vy:5.6,o:this,d:4,l:120});return;}// 25.10: «Метеоритный приговор» — пять метеоров
  switch(d.id){
  case 0:SFX.fire();for(let i=-1;i<=1;i++)S.projs.push({ty:'shard',c:'#f06020',x,y,vx:this.face*4.5,vy:i*1.1,o:this,d:4,l:90,s:4});break;// Огненный веер
  case 1:this.x=clamp(foe.x-foe.face*28,20,AW-20);this.face=foe.face;this.invis=40;smoke(this.x,this.y-30);SFX.tele();this.startAtk('kick');break;// Хватка тени — телепорт за спину, лицом к затылку врага
  case 2:S.fx.push({ty:'castbolt',x,y,t:0});for(const off of[-30,0,30])S.projs.push({ty:'bolt',x:clamp(foe.x+off,20,AW-20),y:FL,vx:0,vy:0,o:this,d:5,l:16});SFX.zap();break;// Грозовой столб + канал из руки
  case 3:for(let i=0;i<3;i++)S.projs.push({ty:'meteor',x:clamp(foe.x+rnd(-44,44),20,AW-20),y:-10-i*30,vx:0,vy:5.5,o:this,d:6,l:120});SFX.bone();break;// Камнепад
  case 4:for(let i=0;i<3;i++)S.projs.push({ty:'shard',c:'#7ac83a',x,y:y+i*8-8,vx:this.face*6,vy:0,o:this,d:4,l:80,s:3});SFX.slash();break;// Рой клинков
  case 5:S.projs.push({ty:'shard',c:'#c8a060',x,y,vx:this.face*2.6,vy:0,o:this,d:7,l:110,s:6,k:1});SFX.tele();break;// Песчаный жернов — валит с ног
  case 6:for(let i=0;i<3;i++)S.projs.push({ty:'shard',c:'#c8ecff',x,y:y+i*10-10,vx:this.face*5,vy:0,o:this,d:3,l:80,s:3});SFX.ice();break;// Ледяные иглы
  case 7:S.projs.push({ty:'bomb',x:x,y:y-10,vx:this.face*3.2,vy:-5,o:this,d:6,l:130});S.projs.push({ty:'bomb',x:x,y:y-10,vx:this.face*1.8,vy:-4,o:this,d:6,l:130});SFX.shoot();break;// Двойная граната
  case 8:S.projs.push({ty:'shard',c:'#7a3aa8',x,y,vx:this.face*2.8,vy:0,o:this,d:5,l:110,s:5,pois:1});SFX.sting();break;// Проклятие — отравление
  case 10:for(let i=0;i<3;i++)S.projs.push({ty:'shard',c:'#d82040',x:clamp(foe.x+rnd(-32,32),20,AW-20),y:FL+GR-4,vx:0,vy:-(4.4+i*.5),o:this,d:5,l:60,s:5});SFX.bone();S.shake=3;break;// 30.09: Кровавые шипы — взмывают из земли под врагом
  case 11:{const ox=this.x;this.x=clamp(foe.x+foe.face*30,20,AW-20);smoke(ox,this.y-30);smoke(this.x,this.y-30);SFX.tele();this.face=foe.x<this.x?-1:1;if(foe.state!=='down'){resolveHit(this,foe,6,{});foe.poison=150;foe.poisonC='#b01818';}break;}// 30.09: Сквозь тень — проход сквозь врага, удар в спину с кровотечением
  case 12:{this.marks=this.marks||[];if(this.marks.length){const m=this.marks.pop();smoke(this.x,this.y-30);this.x=clamp(m.x,20,AW-16);smoke(this.x,this.y-30);SFX.tele();for(let i=0;i<8;i++)P(this.x+rnd(-10,10),this.y-rnd(0,50),rnd(-1,1),rnd(-1.5,.5),'#b89aff',24,2,0);if(Math.abs(foe.x-this.x)<70&&foe.state!=='down'&&foe.state!=='victim'){resolveHit(this,foe,6,{});S.shake=Math.max(S.shake,3);for(let i=0;i<10;i++)P(foe.x+rnd(-14,14),foe.y-rnd(5,55),rnd(-1.5,1.5),rnd(-2,.5),'#b89aff',26,2,0);SFX.cast2();}}// 30.09: мигание к метке; 01.10: взрыв звёзд — 6 урона если враг рядом (метка у врага = комбо)
  else{this.x=clamp(foe.x-foe.face*30,20,AW-20);smoke(this.x,this.y-30);SFX.tele();if(foe.state!=='down')resolveHit(this,foe,5,{});}break;}// без меток — прыжок за спину с ударом
  case 9:S.projs.push({ty:'shard',c:'#f8d060',x,y,vx:this.face*2.4,vy:0,o:this,d:10,l:110,s:7,k:1});SFX.shoot();break;// Тяжёлый снаряд — медленный, валит
  default:throw new Error('Unknown fighter spec: '+d.id);}}
  updSuper(){if(this.state!=='super')return;for(const e of this.supEv)if(!e.done&&this.st>=e.t){e.done=1;e.fn();}if(this.st>this.superDur)this.state='idle';}}

  return F;
}
