export function createCombat({ S, SFX, P, blood, spriteFx, rnd, pick }) {
  function comboScale(f){const chain=(f.comboT!==undefined&&f.comboT<60)?(f.combo||0):0;return Math.max(.55,1-chain*.07);}// 24.10: спад урона в длинной серии
  function autoHit(a,dmg){
  const f=a.foe;
  if(!f||f.hidden||f.dodging||f.defeated)return;
  if(!S.battle||S.battle.phase!=='fight')return;
  if(f.state==='down'||f.state==='victim')return;
  if(f.invuln>0)return;
  if(Math.abs(f.x-a.x)>=48)return;
  if(f.armor>0){f.armor--;f.flash=4;SFX.block();return;}
  if(f.state==='block'){
  f.hp=Math.max(1,f.hp-1);f.damageTaken=(f.damageTaken||0)+1;
  a.rage=Math.min(100,a.rage+1);f.rage=Math.min(100,f.rage+1);
  f.vx=a.face*2;f.hvx=0;SFX.block();
  for(let i=0;i<4;i++)P(f.x+f.face*8,f.y-f.def.h*.55,rnd(-1.5,1.5),rnd(-2,0),'#fff',10,2,0);
  return;}
  let d=dmg*a.def.dmg*comboScale(a);
  f.hp=Math.max(0,f.hp-d);f.damageTaken=(f.damageTaken||0)+d;
  f.flash=4;f.state='hit';f.st=0;f.vx=0;f.hvx=0;f.atk=null;f.spec2go=0;f.invis=0;f.netT=0;f.combo=0;f.chain='';f.chainT=0;f.blockStun=0;
  if(f.frozen>0)f.frozen=0;
  a.rage=Math.min(100,a.rage+2);f.rage=Math.min(100,f.rage+d*.9);
  a.combo=(a.comboT!==undefined&&a.comboT<60?a.combo:0)+1;a.comboT=0;
  if(S.bstat){const k=a===S.battle.p1?'1':'2';S.bstat['h'+k]++;S.bstat['d'+k]+=d;S.bstat['c'+k]=Math.max(S.bstat['c'+k],a.combo||0);}
  blood(f.x,f.y-f.def.h*.5,Math.min(10,3+d),1);
  for(let i=0;i<4;i++)P(f.x+rnd(-10,10),f.y-rnd(20,50),rnd(-2,2),rnd(-2,0),'#fff',10,2,0);
  S.freeze=Math.max(S.freeze,3);if(f.hp<=0)S.freeze=Math.max(S.freeze,12);
  SFX.hit();}
  function resolveHit(att,def,dmg,opts){opts=opts||{};
  if(S.battle&&['finish','fatal','over','ko'].includes(S.battle.phase))return'miss';
  if(def.defeated)return'miss';
  if(def.armor>0){def.armor--;def.flash=4;SFX.block();return'miss';}
  if(def.state==='super'&&def.st<20)def.rage=Math.min(100,def.rage+50);
  if(def.invuln>0)return'miss';if(def.dodging){for(let i=0;i<5;i++)P(def.x+rnd(-6,6),def.y-rnd(8,44),-att.face*rnd(.6,1.6),rnd(-1,-.2),'#9a9080',14,2,.03);SFX.whiff();return'miss';}// 30.09: рывок сквозь удар — пыль и свист
  if(opts.grab){// 25.10: захват — отдельное состояние, чтобы бросок читался как комбо из двух фаз
  const d=dmg*att.def.dmg*comboScale(att);def.hp=Math.max(0,def.hp-d);def.damageTaken=(def.damageTaken||0)+d;def.flash=4;def.state='grabbed';def.st=0;def.vx=0;def.vy=0;def.grabbedBy=att;def.atk=null;def.spec2go=0;def.invis=0;def.netT=0;def.chain='';def.chainT=0;def.blockStun=0;def.frozen=0;def.face=-att.face;att.throwTarget=def;
  att.combo=(att.comboT!==undefined&&att.comboT<60?att.combo:0)+1;att.comboT=0;att.rage=Math.min(100,att.rage+2);def.rage=Math.min(100,def.rage+d*.9);
  if(S.bstat){const k=att===S.battle.p1?'1':'2';S.bstat['h'+k]++;S.bstat['d'+k]+=d;S.bstat['c'+k]=Math.max(S.bstat['c'+k],att.combo||0);}
  SFX.hitV();S.freeze=Math.max(S.freeze,2);if(def.hp<=0)S.freeze=Math.max(S.freeze,12);for(let i=0;i<4;i++)P(def.x+rnd(-8,8),def.y-rnd(10,48),rnd(-1,1),rnd(-1.5,0),'#fff',12,2,.03);return'grab';}
  if(opts.throw)def.blockStun=0;
  if(def.state==='block'&&!opts.throw&&!((opts.low&&!def.blockLow)||(opts.overhead&&def.blockLow))){def.hp=Math.max(1,def.hp-1);def.blockStun=6;def.damageTaken=(def.damageTaken||0)+1;SFX.block();att.rage=Math.min(100,att.rage+1);def.rage=Math.min(100,def.rage+1);def.vx=att.face*2;def.hvx=0;att.chain='';att.chainT=0;spriteFx('block',def.x+def.face*8,def.y-def.def.h*.55,{scale:.9,alpha:.9});for(let i=0;i<4;i++)P(def.x+def.face*8,def.y-def.def.h*.55,rnd(-1.5,1.5),rnd(-2,0),'#fff',10,2,0);
  return'block';}
  let d=dmg*att.def.dmg*comboScale(att);if(opts.target){d*=1.2;S.fx.push({ty:'name',x:att.x+att.face*10,y:att.y-att.def.h-20,txt:opts.target.n,col:att.def.acc,life:45,t:0});S.shake=Math.max(S.shake,3);}if(def.frozen>0){d*=1.4;def.frozen=0;for(let i=0;i<6;i++)P(def.x+rnd(-8,8),def.y-rnd(10,50),rnd(-2,2),rnd(-3,0),'#c8ecff',18,2,.04);}
  // 08.09: баланс Крио — урон по льду 1.6→1.4// 08.09: осколки льда при разбивании
  def.hp=Math.max(0,def.hp-d);if(def.hp<=0)S.freeze=Math.max(S.freeze,12);def.blockStun=0;def.damageTaken=(def.damageTaken||0)+d;def.netT=0;def.spec2go=0;def.atk=null;def.invis=0;def.chain='';def.chainT=0;
  att.combo=(att.comboT!==undefined&&att.comboT<60?att.combo:0)+1;att.comboT=0;if(def.combo>=3)SFX.cbreak();// 30.09: разрыв длинной серии звучит
  def.combo=0;
  // 08.09: комбо-счётчик — серия без ответа, сброс при получении урона; блок не считается (ранний return выше)
  const ar0=att.rage;att.rage=Math.min(100,att.rage+d*1.1);def.rage=Math.min(100,def.rage+d*.9);def.flash=4;if(ar0<100&&att.rage>=100)SFX.rdy();
  if(att.combo>=3)att.rage=Math.min(100,att.rage+att.combo);// 08.09: бонус ярости за длинное комбо
  if(att.combo>=5&&att.combo%5===0)SFX.combo();// 08.09: звон на больших комбо (5, 10...)
  if(S.bstat){const k=att===S.battle.p1?'1':'2';S.bstat['h'+k]++;S.bstat['d'+k]+=d;S.bstat['c'+k]=Math.max(S.bstat['c'+k],att.combo||0);}
  // 08.09: статистика боя для экрана реванша
  blood(def.x,def.y-def.def.h*.55,Math.min(14,3+d),d>10?1.6:1);
  spriteFx(d>15?'hitHeavy':'hitLight',def.x,def.y-def.def.h*.55,{scale:d>15?1:.65,alpha:d>15?.45:.65});
  for(let i=0;i<6;i++)P(def.x-att.face*8,def.y-def.def.h*.55,rnd(-2.5,2.5),rnd(-2.5,1),pick(['#fff','#f8d060','#f0a030']),10,rnd(1,2),.05);
  S.freeze=def.hp<=0?Math.max(S.freeze,12):Math.max(S.freeze,Math.min(6,2+d*.25));
  if(opts.launch){def.vy=-8;def.vx=att.face*3;def.state='hit';def.st=0;def.hvx=att.face*3;SFX.upper();S.shake=5;}
  else if(def.hp<=0&&S.battle.phase==='fight'){def.state='hit';def.st=0;def.hvx=att.face*4;SFX.hitH();}
  else if(opts.knock||d>9||def.hp<=0){def.state='down';def.st=0;def.vx=att.face*5;def.vy=-5;def.hvx=att.face*3;SFX.hitH();S.shake=6;S.fx.push({ty:'ring',x:def.x,y:def.y-def.def.h*.55,t:0,col:'#f8d060'});}// 08.09: roundhouse всегда валит + ударное кольцо
  else{def.state='hit';def.st=0;def.hvx=opts.still?0:att.face*2.4;def.vy=def.onGround?-2:0;(Math.random()<.4?SFX.hitV:SFX.hit)();S.shake=2;}return'hit';}// 01.10: +opts.still — AoE не отбрасывает

  return { autoHit, resolveHit };
}
