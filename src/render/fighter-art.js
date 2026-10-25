// 25.10: новый комиксовый рендер бойцов и портретов.
// Старый рендер остаётся в render.js как legacy-fallback.
export function createFighterArt({ g, S, OUT, mix, shade, lerp }) {
const TAU=Math.PI*2;
const lite=(c,t)=>mix(c,'#ffffff',t);
const dark=(c,t)=>shade(c,1-t);

// Костюмные акценты: что надето поверх базового тела.
const LOOKS={
0:{sleeve:'skin',glove:'wrap',shoulder:0,chest:'wrap',legs:'pants',belt:'dark',wraps:1},
1:{sleeve:'suit',glove:'dark',shoulder:1,chest:'plate',legs:'pants',belt:'acc'},
2:{sleeve:'armor',glove:'accent',shoulder:2,chest:'plate',legs:'armor',belt:'acc'},
3:{sleeve:'skin',glove:'wrap',shoulder:2,chest:'bare',legs:'pants',belt:'dark',heavy:1},
4:{sleeve:'skin',glove:'claw',shoulder:0,chest:'bare',legs:'pants',belt:'dark',wraps:1},
5:{sleeve:'suit',glove:'accent',shoulder:0,chest:'robe',legs:'robe',belt:'acc'},
6:{sleeve:'armor',glove:'accent',shoulder:1,chest:'plate',legs:'armor',belt:'acc'},
7:{sleeve:'metal',glove:'dark',shoulder:1,chest:'plate',legs:'pants',belt:'acc'},
8:{sleeve:'suit',glove:'dark',shoulder:0,chest:'robe',legs:'robe',belt:'acc'},
9:{sleeve:'armor',glove:'dark',shoulder:2,chest:'plate',legs:'armor',belt:'acc',royal:1},
10:{sleeve:'skin',glove:'skin',shoulder:0,chest:'dress',legs:'dress',belt:'acc',female:1},
11:{sleeve:'suit',glove:'dark',shoulder:0,chest:'wrap',legs:'pants',belt:'acc',wraps:1},
12:{sleeve:'skin',glove:'skin',shoulder:0,chest:'wrap',legs:'skirt',belt:'acc',female:1}
};

function shape(cmds,fill,stroke=OUT,lw=1.2){
 g.beginPath();
 for(const c of cmds){
  if(c[0]==='M')g.moveTo(c[1],c[2]);
  else if(c[0]==='L')g.lineTo(c[1],c[2]);
  else if(c[0]==='Q')g.quadraticCurveTo(c[1],c[2],c[3],c[4]);
  else if(c[0]==='C')g.bezierCurveTo(c[1],c[2],c[3],c[4],c[5],c[6]);
 }
 g.closePath();
 if(fill){g.fillStyle=fill;g.fill();}
 if(stroke){g.strokeStyle=stroke;g.lineWidth=lw;g.stroke();}
}
function rr(x,y,w,h,r,fill,stroke=OUT,lw=1){
 r=Math.min(r,Math.abs(w)/2,Math.abs(h)/2);
 g.beginPath();g.moveTo(x+r,y);g.lineTo(x+w-r,y);g.quadraticCurveTo(x+w,y,x+w,y+r);
 g.lineTo(x+w,y+h-r);g.quadraticCurveTo(x+w,y+h,x+w-r,y+h);g.lineTo(x+r,y+h);
 g.quadraticCurveTo(x,y+h,x,y+h-r);g.lineTo(x,y+r);g.quadraticCurveTo(x,y,x+r,y);g.closePath();
 if(fill){g.fillStyle=fill;g.fill();}
 if(stroke){g.strokeStyle=stroke;g.lineWidth=lw;g.stroke();}
}
function ell(x,y,rx,ry,fill,stroke=OUT,lw=1){
 g.beginPath();g.ellipse(x,y,rx,ry,0,0,TAU);
 if(fill){g.fillStyle=fill;g.fill();}
 if(stroke){g.strokeStyle=stroke;g.lineWidth=lw;g.stroke();}
}
function limb2(x,y,a1,a2,l1,l2,w1,w2,fill,opts={}){
 const mx=x+Math.sin(a1)*l1,my=y+Math.cos(a1)*l1;
 const ex=mx+Math.sin(a1+a2)*l2,ey=my+Math.cos(a1+a2)*l2;
 const ow=2.1;
 g.lineCap='round';g.lineJoin='round';
 g.strokeStyle=OUT;g.lineWidth=w1+ow;g.beginPath();g.moveTo(x,y);g.lineTo(mx,my);g.stroke();
 g.lineWidth=w2+ow;g.beginPath();g.moveTo(mx,my);g.lineTo(ex,ey);g.stroke();
 g.strokeStyle=fill;g.lineWidth=w1;g.beginPath();g.moveTo(x,y);g.lineTo(mx,my);g.stroke();
 g.lineWidth=w2;g.beginPath();g.moveTo(mx,my);g.lineTo(ex,ey);g.stroke();
 if(!opts.noLight){
  const hi=lite(fill,.3),sh=shade(fill,.68);
  g.strokeStyle=hi;g.lineWidth=Math.max(.65,w1*.2);
  g.beginPath();g.moveTo(x+w1*.18,y-w1*.2);g.lineTo(mx+w2*.18,my-w2*.2);g.stroke();
  g.lineWidth=Math.max(.6,w2*.18);g.beginPath();g.moveTo(mx+w2*.18,my-w2*.2);g.lineTo(ex+w2*.16,ey-w2*.2);g.stroke();
  g.strokeStyle=sh;g.lineWidth=Math.max(.65,w1*.22);
  g.beginPath();g.moveTo(x-w1*.18,y+w1*.18);g.lineTo(mx-w2*.18,my+w2*.18);g.stroke();
  g.lineWidth=Math.max(.6,w2*.2);g.beginPath();g.moveTo(mx-w2*.18,my+w2*.18);g.lineTo(ex-w2*.16,ey+w2*.18);g.stroke();
 }
 g.fillStyle=fill;g.beginPath();g.arc(mx,my,w2*.46,0,TAU);g.fill();
 return{x:ex,y:ey,sx:x,sy:y,mx,my};
}
function boot(x,y,w,h,fill){
 const bx=x-w*.48,by=y-h;
 shape([['M',bx,by],['L',x+w*.34,by],['L',x+w*.56,y-h*.55],['L',x+w*.95,y-h*.12],['L',x+w*.95,y],['L',x-w*.55,y],['L',x-w*.55,y-h*.32]],fill,OUT,1.15);
 g.fillStyle=OUT;g.fillRect(bx,y-1,w*1.5,2);
 g.fillStyle=dark(fill,.58);g.fillRect(bx,y-1,w*1.5,1);
 g.fillStyle=lite(fill,.3);g.fillRect(bx+w*.12,by+1,w*.5,1);
 g.strokeStyle=dark(fill,.55);g.lineWidth=.75;g.beginPath();g.moveTo(bx+w*.08,by+h*.48);g.lineTo(x+w*.72,by+h*.48);g.stroke();
}
function hand(x,y,w,h,fill){
 shape([['M',x-w*.48,y-h*.42],['Q',x-w*.3,y-h*.66,x+w*.16,y-h*.58],['Q',x+w*.62,y-h*.4,x+w*.58,y-h*.02],['Q',x+w*.54,y+h*.46,x+w*.02,y+h*.54],['Q',x-w*.5,y+h*.48,x-w*.56,y+h*.02],['Z']],fill,OUT,1.05);
 shape([['M',x-w*.5,y-h*.02],['Q',x-w*.72,y+h*.16,x-w*.48,y+h*.34],['Q',x-w*.28,y+h*.42,x-w*.24,y+h*.18]],fill,OUT,.8);
 g.strokeStyle=dark(fill,.62);g.lineWidth=.65;
 for(const k of[-.12,.05,.22]){g.beginPath();g.moveTo(x+w*k,y-h*.36);g.lineTo(x+w*k,y+h*.02);g.stroke();}
 g.strokeStyle=dark(fill,.5);g.lineWidth=.6;g.beginPath();g.moveTo(x-w*.3,y+h*.22);g.quadraticCurveTo(x,y+h*.3,x+w*.3,y+h*.2);g.stroke();
 g.fillStyle=lite(fill,.32);g.fillRect(x-w*.24,y-h*.4,w*.44,1);
}
function drawCape(f,H,shY,hipY,shX,suit,ac){
 const sw=Math.sin(f.animT*.08)*H*.03;
 shape([['M',shX+2,shY-1],['Q',-H*.2+sw,shY+H*.15,-H*.18+sw,hipY+H*.24],['L',-H*.07,hipY+H*.13],['Q',-H*.04,shY+H*.08,shX+7,shY+3]],shade(suit,.32),OUT,1.4);
 shape([['M',shX+1,shY+2],['Q',-H*.13+sw*.7,shY+H*.16,-H*.12+sw*.7,hipY+H*.18],['L',-H*.05,hipY+H*.1],['Q',-H*.02,shY+H*.09,shX+4,shY+5]],shade(suit,.5),null);
 g.strokeStyle=ac;g.globalAlpha=.55;g.lineWidth=.8;g.beginPath();g.moveTo(shX,shY+4);g.quadraticCurveTo(-H*.12+sw*.7,shY+H*.17,-H*.13+sw*.7,hipY+H*.17);g.stroke();g.globalAlpha=1;
}
function drawSheath(H,shY,hipY,suit,ac){
 g.strokeStyle=OUT;g.lineWidth=3.2;g.beginPath();g.moveTo(-H*.055,shY+H*.06);g.lineTo(-H*.02,hipY+H*.05);g.stroke();
 g.strokeStyle=shade(suit,.5);g.lineWidth=1.7;g.beginPath();g.moveTo(-H*.055,shY+H*.06);g.lineTo(-H*.02,hipY+H*.05);g.stroke();
 g.fillStyle=ac;g.fillRect(-H*.06,shY+H*.04,2.2,2.2);
}
function drawPelvis(H,hipY,hipW,suit,ac,look){
 shape([['M',-hipW,hipY-1],['Q',0,hipY+H*.024,hipW,hipY-1],['L',hipW*.72,hipY+H*.095],['Q',0,hipY+H*.135,-hipW*.72,hipY+H*.095]],shade(suit,.52),OUT,1.1);
 g.strokeStyle=shade(suit,.76);g.lineWidth=.7;g.beginPath();g.moveTo(0,hipY+H*.03);g.lineTo(0,hipY+H*.11);g.stroke();
}
function drawTorso(H,d,f,hipY,shY,shX,shoulderW,waistW,hipW,suit,ac,look){
 const gd=g.createLinearGradient(-shoulderW,0,shoulderW,0);
 gd.addColorStop(0,shade(suit,.52));gd.addColorStop(.44,suit);gd.addColorStop(1,lite(suit,.24));
 shape([['M',-hipW,hipY+1],['Q',-waistW*1.16,hipY-H*.1,shX-shoulderW,shY+H*.022],['Q',shX-shoulderW*.86,shY-H*.04,shX,shY-H*.052],['Q',shX+shoulderW*.86,shY-H*.04,shX+shoulderW,shY+H*.022],['Q',waistW*1.16,hipY-H*.1,hipW,hipY+1]],gd,OUT,1.45);
 if(f.charred)return;
 g.save();g.globalAlpha=.25;g.fillStyle=OUT;g.beginPath();g.ellipse(-shoulderW*.35,shY+H*.09,waistW*.55,H*.14,0,0,TAU);g.fill();g.restore();
 g.fillStyle=lite(suit,.25);g.globalAlpha=.3;g.beginPath();g.ellipse(shoulderW*.42,shY+H*.07,waistW*.5,H*.17,-.1,0,TAU);g.fill();g.globalAlpha=1;
 if(look.chest!=='plate'&&look.chest!=='robe'){
  g.fillStyle=shade(suit,.68);g.globalAlpha=.4;g.beginPath();g.ellipse(shX-2,shY+H*.1,waistW*.4,H*.052,-.08,0,TAU);g.fill();g.beginPath();g.ellipse(shX+2,shY+H*.1,waistW*.4,H*.052,.08,0,TAU);g.fill();g.globalAlpha=1;
  g.strokeStyle=shade(suit,.5);g.lineWidth=.6;g.beginPath();g.moveTo(shX,shY+H*.07);g.lineTo(shX,shY+H*.16);g.stroke();
 }
 if(look.chest==='plate'){
  const pg=g.createLinearGradient(0,shY,0,hipY-H*.05);pg.addColorStop(0,lite(suit,.3));pg.addColorStop(1,shade(suit,.7));
  shape([['M',shX-shoulderW*.78,shY+H*.015],['L',shX-shoulderW*.55,shY+H*.15],['Q',shX,shY+H*.2,shX+shoulderW*.56,shY+H*.15],['L',shX+shoulderW*.78,shY+H*.015],['Q',shX,shY-H*.02,shX-shoulderW*.78,shY+H*.015]],pg,OUT,1.05);
  g.fillStyle=ac;g.fillRect(shX-shoulderW*.6,shY+H*.035,shoulderW*1.2,1.1);
  g.fillStyle=lite(ac,.38);g.fillRect(shX-shoulderW*.2,shY+H*.06,shoulderW*.4,1);
 }else if(look.chest==='robe'){
  shape([['M',shX-shoulderW*.45,shY+H*.01],['L',shX,shY+H*.17],['L',shX+shoulderW*.45,shY+H*.01],['L',shX+shoulderW*.55,shY+H*.04],['L',shX,shY+H*.24],['L',shX-shoulderW*.55,shY+H*.04]],shade(suit,.7),OUT,.9);
  g.strokeStyle=ac;g.lineWidth=.8;g.beginPath();g.moveTo(shX,shY+H*.2);g.lineTo(shX,hipY-2);g.stroke();
  g.fillStyle=ac;g.fillRect(shX-1.1,shY+H*.2,2.2,1);
 }else if(look.chest==='wrap'){
  g.strokeStyle=ac;g.lineWidth=1.2;g.beginPath();g.moveTo(shX-shoulderW*.7,shY+H*.05);g.lineTo(shX+shoulderW*.62,hipY-H*.16);g.stroke();
  g.strokeStyle=lite(ac,.35);g.lineWidth=.65;g.beginPath();g.moveTo(shX-shoulderW*.7,shY+H*.07);g.lineTo(shX+shoulderW*.62,hipY-H*.14);g.stroke();
 }else if(look.chest==='dress'){
  shape([['M',shX-shoulderW*.55,shY+H*.01],['L',shX,shY+H*.19],['L',shX+shoulderW*.55,shY+H*.01],['L',shX+shoulderW*.64,shY+H*.04],['L',shX,shY+H*.28],['L',shX-shoulderW*.64,shY+H*.04]],shade(suit,.72),OUT,.9);
  g.strokeStyle=ac;g.globalAlpha=.6;g.lineWidth=.7;g.beginPath();g.moveTo(shX,shY+H*.26);g.lineTo(shX,hipY-3);g.stroke();g.globalAlpha=1;
 }
 if(look.shoulder>0){
  const padW=look.shoulder>1?shoulderW*.66:shoulderW*.52,padH=look.shoulder>1?H*.095:H*.07;
  for(const side of[-1,1]){
   const px=shX+side*shoulderW*.78;
   ell(px,shY+H*.02,padW*.55,padH*.5,mix(suit,'#c8c8c8',.24),OUT,1.1);
   g.fillStyle=ac;g.globalAlpha=.7;g.beginPath();g.ellipse(px,shY+H*.045,padW*.3,padH*.14,0,0,TAU);g.fill();g.globalAlpha=1;
  }
 }
 const belt=look.belt==='acc'?ac:look.belt==='dark'?shade(suit,.35):shade(suit,.4);
 rr(-hipW*1.12,hipY-2.3,hipW*2.24,3.7,1.4,belt,OUT,1.05);
 rr(-1.35,hipY-2.7,2.7,4.5,1,lite(ac,.28),OUT,.65);
 g.strokeStyle=shade(suit,.46);g.lineWidth=.65;g.beginPath();g.moveTo(shX,shY+H*.14);g.lineTo(shX,hipY-H*.02);g.moveTo(shX-waistW*.35,shY+H*.18);g.lineTo(shX-waistW*.35,hipY-H*.04);g.moveTo(shX+waistW*.35,shY+H*.18);g.lineTo(shX+waistW*.35,hipY-H*.04);g.stroke();
 rr(hipW*.72,hipY-1.2,hipW*.4,3.8,1,shade(suit,.36),OUT,.8);
 rr(-hipW*1.12,hipY-1.2,hipW*.34,3.4,1,shade(suit,.4),OUT,.8);
 if(d.id===7){
  for(const side of[-1,1]){const gx=shX+side*hipW*.92;ell(gx,hipY+1.2,H*.021,H*.021,ac,OUT,.65);g.fillStyle=lite(ac,.4);g.fillRect(gx-1,hipY+.4,2,.8);}
 }
 if(d.id===1||d.id===11){
  g.strokeStyle=ac;g.lineWidth=.9;g.beginPath();g.moveTo(shX-shoulderW*.55,shY+H*.06);g.lineTo(shX+hipW*.72,hipY-1);g.stroke();
  g.fillStyle=ac;g.fillRect(shX+hipW*.5,hipY-H*.2,2,4);
 }
 if(look.royal){
  g.strokeStyle=ac;g.globalAlpha=.85;g.lineWidth=1.4;g.beginPath();g.moveTo(shX-shoulderW*.6,shY+H*.05);g.lineTo(shX+hipW*.8,hipY-2);g.stroke();g.globalAlpha=1;
  g.fillStyle=lite(ac,.35);g.beginPath();g.moveTo(shX+hipW*.34,hipY-H*.28);g.lineTo(shX+hipW*.5,hipY-H*.2);g.lineTo(shX+hipW*.34,hipY-H*.12);g.lineTo(shX+hipW*.18,hipY-H*.2);g.closePath();g.fill();
 }
 if(d.id===8){
  shape([['M',shX-shoulderW*.58,shY+H*.03],['L',shX-shoulderW*.38,shY+H*.17],['L',shX,shY+H*.08],['L',shX+shoulderW*.38,shY+H*.17],['L',shX+shoulderW*.58,shY+H*.03]],shade(suit,.6),OUT,.8);
  g.fillStyle=ac;g.beginPath();g.moveTo(shX,shY+H*.12);g.lineTo(shX+1.8,shY+H*.18);g.lineTo(shX,shY+H*.24);g.lineTo(shX-1.8,shY+H*.18);g.closePath();g.fill();
 }
 if(d.female){
  g.fillStyle=shade(suit,.72);g.globalAlpha=.55;g.beginPath();g.ellipse(shX-2,shY+H*.085,waistW*.35,H*.045,0,0,TAU);g.fill();g.beginPath();g.ellipse(shX+2,shY+H*.085,waistW*.35,H*.045,0,0,TAU);g.fill();g.globalAlpha=1;
 }
}
function drawDress(H,hipY,shX,hipW,suit,ac){
 const hem=Math.min(hipY+H*.34,-2);
 const dg=g.createLinearGradient(-hipW,hipY,hipW*1.4,hem);
 dg.addColorStop(0,shade(suit,.5));dg.addColorStop(.48,suit);dg.addColorStop(1,shade(suit,.62));
 shape([['M',-hipW*.92,hipY],['L',hipW*.92,hipY],['Q',hipW*1.5+shX*.3,hipY+H*.16,hipW*1.3+shX*.3,hem],['Q',0,hem+H*.035,-hipW*1.45,hem],['Q',-hipW*1.12,hipY+H*.14,-hipW*.92,hipY]],dg,OUT,1.25);
 g.strokeStyle=shade(suit,.72);g.lineWidth=.75;
 for(const k of[-.55,-.18,.18,.55]){g.beginPath();g.moveTo(hipW*k,hipY+2);g.quadraticCurveTo(hipW*k*1.3,hipY+H*.16,hipW*k*1.5,hem-1);g.stroke();}
 g.strokeStyle=ac;g.lineWidth=1;g.beginPath();g.moveTo(-hipW*1.4,hem);g.quadraticCurveTo(0,hem+2,hipW*1.28+shX*.3,hem);g.stroke();
}
function drawSkirt(H,hipY,shX,hipW,suit,ac){
 const hem=Math.min(hipY+H*.21,-3);
 const sg=g.createLinearGradient(0,hipY,0,hem);sg.addColorStop(0,shade(suit,.7));sg.addColorStop(1,shade(suit,.45));
 shape([['M',-hipW*.9,hipY],['L',hipW*.9,hipY],['L',hipW*1.35+shX*.3,hem],['L',-hipW*1.3,hem]],sg,OUT,1.1);
 g.strokeStyle=shade(suit,.68);g.lineWidth=.7;g.beginPath();g.moveTo(-hipW*.5,hipY+1);g.lineTo(-hipW*.7,hem-1);g.moveTo(hipW*.3,hipY+1);g.lineTo(hipW*.5,hem-1);g.stroke();
 g.strokeStyle=ac;g.lineWidth=.9;g.beginPath();g.moveTo(-hipW*1.3,hem);g.lineTo(hipW*1.35+shX*.3,hem);g.stroke();
}
function drawNeck(H,shY,head,shX,suit,skin,ac){
 const nw=H*.043;
 shape([['M',shX-nw,shY+2],['L',shX+nw,shY+2],['L',head.x+nw*.78,head.y+head.hh*.42],['L',head.x-nw*.78,head.y+head.hh*.42]],skin,OUT,1.05);
 g.fillStyle=shade(skin,.72);g.globalAlpha=.55;g.beginPath();g.ellipse(head.x,head.y+head.hh*.34,nw*.9,head.hh*.16,0,0,TAU);g.fill();g.globalAlpha=1;
 g.fillStyle=ac;g.fillRect(shX-nw*1.15,shY+1.2,nw*2.3,1.2);
}
function legGear(leg,w,fill,ac,look,back){
 const dx=leg.mx-leg.sx,dy=leg.my-leg.sy,l=Math.hypot(dx,dy)||1,px=-dy/l,py=dx/l;
 g.strokeStyle=back?shade(fill,.42):shade(fill,.6);g.lineWidth=.7;
 const t=.34,cx=leg.sx+dx*t,cy=leg.sy+dy*t;
 g.beginPath();g.moveTo(cx-px*w*.56,cy-py*w*.56);g.lineTo(cx+px*w*.56,cy+py*w*.56);g.stroke();
 if(look.legs==='armor'||look.heavy){
  ell(leg.mx,leg.my,w*.58,w*.5,mix(fill,'#c8c8c8',.3),OUT,.85);
  g.fillStyle=ac;g.globalAlpha=.65;g.fillRect(leg.mx-w*.36,leg.my-w*.02,w*.72,1);g.globalAlpha=1;
 }else{
  g.strokeStyle=back?shade(fill,.5):shade(fill,.68);g.lineWidth=.7;
  g.beginPath();g.moveTo(leg.mx-px*w*.5,leg.my-py*w*.5);g.lineTo(leg.mx+px*w*.5,leg.my+py*w*.5);g.stroke();
 }
 if(look.wraps){
  const dx2=leg.x-leg.mx,dy2=leg.y-leg.my,l2=Math.hypot(dx2,dy2)||1,px2=-dy2/l2,py2=dx2/l2;
  g.strokeStyle=back?shade(ac,.5):ac;g.lineWidth=.75;
  for(let i=0;i<3;i++){const q=.2+i*.21,x=leg.mx+dx2*q,y=leg.my+dy2*q;g.beginPath();g.moveTo(x-px2*w*.52,y-py2*w*.52);g.lineTo(x+px2*w*.52,y+py2*w*.52);g.stroke();}
 }
}
function armGear(arm,w,fill,ac,look,back){
 if(look.sleeve==='armor'||look.sleeve==='metal'){
  ell(arm.mx,arm.my,w*.5,w*.44,mix(fill,'#d8d8d8',.38),OUT,.8);
  g.strokeStyle=back?shade(fill,.5):mix(fill,'#e8e8e8',.35);g.lineWidth=Math.max(.8,w*.2);
  g.beginPath();g.moveTo(arm.mx,arm.my);g.lineTo(arm.x,arm.y);g.stroke();
  g.fillStyle=ac;g.globalAlpha=.7;g.fillRect(arm.x-1.2,arm.y-1.2,2.4,1);g.globalAlpha=1;
 }else{
  g.strokeStyle=back?shade(fill,.46):shade(fill,.64);g.lineWidth=.7;
  g.beginPath();g.arc(arm.mx,arm.my,w*.42,-2.5,-.5);g.stroke();
 }
 if(look.wraps||look.glove==='wrap'||look.glove==='claw'){
  const dx=arm.x-arm.mx,dy=arm.y-arm.my,l=Math.hypot(dx,dy)||1,px=-dy/l,py=dx/l;
  g.strokeStyle=back?shade(ac,.55):ac;g.lineWidth=.75;
  for(let i=0;i<2;i++){const q=.63+i*.16,x=arm.mx+dx*q,y=arm.my+dy*q;g.beginPath();g.moveTo(x-px*w*.46,y-py*w*.46);g.lineTo(x+px*w*.46,y+py*w*.46);g.stroke();}
 }
}
function headPath(hx,hy,hw,hh){
 g.beginPath();
 g.moveTo(hx-hw*.96,hy-hh*.52);
 g.quadraticCurveTo(hx-hw*1.06,hy-hh*1.03,hx-hw*.12,hy-hh*1.1);
 g.quadraticCurveTo(hx+hw*.88,hy-hh*1.06,hx+hw*.98,hy-hh*.25);
 g.quadraticCurveTo(hx+hw*1.04,hy+hh*.34,hx+hw*.48,hy+hh*.94);
 g.quadraticCurveTo(hx-hw*.12,hy+hh*1.06,hx-hw*.66,hy+hh*.84);
 g.quadraticCurveTo(hx-hw*.98,hy+hh*.44,hx-hw*.96,hy-hh*.52);
 g.closePath();
}
function drawFace(d,f,hx,hy,hw,hh,skin,ac){
 const female=!!d.female;
 const expr=(f.state==='hit'||f.state==='victim'||f.state==='grabbed')?1:f.state==='dizzy'?2:0;
 const eyeX=hx+hw*.24,eyeY=hy-hh*.08,eyeW=hw*.44,eyeH=hh*.23;
 if(f.charred){
  g.fillStyle='#e8c060';g.fillRect(eyeX+eyeW*.2,eyeY,eyeW*.55,eyeH*.8);
  g.strokeStyle='#5a4030';g.lineWidth=.8;g.beginPath();g.moveTo(hx-hw*.5,hy-hh*.7);g.lineTo(hx-hw*.1,hy-hh*.2);g.lineTo(hx+hw*.2,hy+hh*.5);g.moveTo(hx+hw*.55,hy-hh*.5);g.lineTo(hx+hw*.3,hy+hh*.2);g.stroke();
  return;
 }
 g.strokeStyle=shade(skin,.5);g.lineWidth=female?1.05:1.2;g.lineCap='round';
 g.beginPath();g.moveTo(hx+hw*.02,hy-hh*(.34+expr*.03));g.quadraticCurveTo(hx+hw*.34,hy-hh*(.47+expr*.03),hx+hw*.74,hy-hh*.33);g.stroke();
 if(expr===2){
  g.strokeStyle='#141414';g.lineWidth=.9;g.beginPath();g.moveTo(eyeX+1,eyeY+1);g.lineTo(eyeX+eyeW-1,eyeY+eyeH-1);g.moveTo(eyeX+eyeW-1,eyeY+1);g.lineTo(eyeX+1,eyeY+eyeH-1);g.stroke();
 }else if(expr===1){
  g.strokeStyle='#141414';g.lineWidth=.9;g.beginPath();g.moveTo(eyeX,eyeY+eyeH*.5);g.lineTo(eyeX+eyeW,eyeY+eyeH*.5);g.stroke();
 }else{
  rr(eyeX,eyeY,eyeW,eyeH,eyeH*.45,'#f0e8e0',null);
  g.fillStyle=mix(ac,'#141414',.22);g.beginPath();g.arc(eyeX+eyeW*.62,eyeY+eyeH*.5,eyeH*.31,0,TAU);g.fill();
  g.fillStyle='#141414';g.beginPath();g.arc(eyeX+eyeW*.66,eyeY+eyeH*.5,eyeH*.18,0,TAU);g.fill();
  g.fillStyle='#fff';g.fillRect(eyeX+eyeW*.62,eyeY+eyeH*.34,1,1);
  g.strokeStyle=OUT;g.lineWidth=.7;g.beginPath();g.moveTo(eyeX,eyeY+eyeH*.15);g.quadraticCurveTo(eyeX+eyeW*.55,eyeY-eyeH*.15,eyeX+eyeW,eyeY+eyeH*.18);g.stroke();
  if(female){g.strokeStyle='#141414';g.lineWidth=.8;g.beginPath();g.moveTo(eyeX+eyeW,eyeY+eyeH*.2);g.lineTo(eyeX+eyeW+1.4,eyeY+eyeH*.05);g.stroke();}
 }
 g.fillStyle=shade(skin,.78);g.beginPath();g.moveTo(hx+hw*.66,hy+hh*.02);g.lineTo(hx+hw*.82,hy+hh*.24);g.lineTo(hx+hw*.6,hy+hh*.22);g.closePath();g.fill();
 if(female){
  g.fillStyle='#8a3040';rr(hx+hw*.16,hy+hh*.5,hw*.44,hh*.15,hh*.07,'#8a3040',null);
  g.fillStyle='#c86070';g.fillRect(hx+hw*.2,hy+hh*.52,hw*.3,1);
  g.fillStyle='#6a2030';g.fillRect(hx+hw*.32,hy+hh*.62,hw*.21,1);
  g.fillStyle=shade(skin,.55);g.fillRect(hx+hw*.42,hy+hh*.36,1,1);
  g.fillStyle=ac;g.fillRect(hx-hw*1.02,hy+hh*.02,1.2,2);
 }else{
  g.strokeStyle=shade(skin,.52);g.lineWidth=.85;g.beginPath();g.moveTo(hx+hw*.18,hy+hh*.58);g.quadraticCurveTo(hx+hw*.38,hy+hh*.65,hx+hw*.6,hy+hh*.56);g.stroke();
  g.strokeStyle=shade(skin,.8);g.lineWidth=.7;g.beginPath();g.moveTo(hx-hw*.9,hy+hh*.12);g.quadraticCurveTo(hx-hw*.55,hy+hh*.78,hx-hw*.1,hy+hh*.92);g.stroke();
 }
 g.fillStyle=lite(skin,.22);g.globalAlpha=.45;g.beginPath();g.ellipse(hx+hw*.5,hy+hh*.32,hw*.3,hh*.16,0,0,TAU);g.fill();g.globalAlpha=1;
}
function hairCap(hx,hy,hw,hh,hair){
 shape([['M',hx-hw*1.02,hy-hh*.06],['Q',hx-hw*1.06,hy-hh*1.12,hx,hy-hh*1.12],['Q',hx+hw*1.06,hy-hh*1.12,hx+hw*1.02,hy-hh*.06],['L',hx+hw*.82,hy-hh*.18],['Q',hx+hw*.48,hy-hh*.58,hx+hw*.08,hy-hh*.46],['Q',hx-hw*.48,hy-hh*.58,hx-hw*.82,hy-hh*.18]],hair,OUT,1.05);
 g.strokeStyle=lite(hair,.28);g.lineWidth=.8;g.beginPath();g.moveTo(hx-hw*.72,hy-hh*.78);g.quadraticCurveTo(hx,hy-hh*1.04,hx+hw*.64,hy-hh*.74);g.stroke();
 g.fillStyle=hair;g.fillRect(hx-hw*.95,hy-hh*.2,hw*.22,hh*.45);g.fillRect(hx+hw*.72,hy-hh*.2,hw*.2,hh*.35);
}
function drawPonytail(d,f,hx,hy,hw,hh,hair,ac){
 const sw=Math.sin((f.animT||0)*.08)*hh*.38;
 const x0=hx-hw*.78,y0=hy-hh*.56,x1=hx-hw*1.5,y1=hy+hh*.45+sw,x2=hx-hw*1.24,y2=hy+hh*1.75+sw;
 g.strokeStyle=OUT;g.lineWidth=Math.max(2.2,hh*.58);g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo(x1,y1,x2,y2);g.stroke();
 g.strokeStyle=hair;g.lineWidth=Math.max(1.4,hh*.4);g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo(x1,y1,x2,y2);g.stroke();
 g.strokeStyle=lite(hair,.25);g.lineWidth=.8;g.beginPath();g.moveTo(x0-hh*.08,y0);g.quadraticCurveTo(x1-hh*.08,y1,x2,y2);g.stroke();
 g.fillStyle=ac;rr(x0-hh*.18,y0-hh*.08,hh*.48,hh*.24,hh*.1,ac,OUT,.6);
}
function gearMask(d,f,hx,hy,hw,hh,skin,suit,ac){
 const metal=d.id===1?mix(ac,'#e0e8f0',.35):d.id===6?mix(ac,'#ffffff',.35):mix(ac,'#8a8a7a',.18);
 shape([['M',hx-hw*.94,hy-hh*.06],['Q',hx-hw*.86,hy+hh*.72,hx-hw*.18,hy+hh*1.0],['Q',hx+hw*.62,hy+hh*.98,hx+hw*.95,hy-hh*.03],['L',hx+hw*.78,hy-hh*.2],['Q',hx,hy+hh*.02,hx-hw*.84,hy-hh*.2]],metal,OUT,1.05);
 g.strokeStyle=lite(metal,.35);g.lineWidth=.8;g.beginPath();g.moveTo(hx-hw*.7,hy+hh*.08);g.quadraticCurveTo(hx,hy+hh*.22,hx+hw*.72,hy+hh*.02);g.stroke();
 g.strokeStyle=shade(metal,.55);g.lineWidth=.65;
 for(let i=0;i<3;i++){g.beginPath();g.moveTo(hx+hw*.05,hy+hh*(.34+i*.18));g.lineTo(hx+hw*.68,hy+hh*(.3+i*.18));g.stroke();}
 g.strokeStyle=OUT;g.lineWidth=1.5;g.beginPath();g.moveTo(hx-hw*.92,hy-hh*.02);g.lineTo(hx-hw*1.06,hy+hh*.2);g.moveTo(hx+hw*.92,hy-hh*.02);g.lineTo(hx+hw*1.02,hy+hh*.14);g.stroke();
 g.fillStyle=lite(metal,.45);g.fillRect(hx-hw*.72,hy+hh*.18,1.2,1.2);g.fillRect(hx+hw*.62,hy+hh*.12,1.2,1.2);
 if(d.id===4){
  g.fillStyle='#f0e8d8';g.beginPath();g.moveTo(hx-hw*.42,hy+hh*.84);g.lineTo(hx-hw*.28,hy+hh*1.08);g.lineTo(hx-hw*.14,hy+hh*.84);g.fill();
  g.beginPath();g.moveTo(hx+hw*.2,hy+hh*.86);g.lineTo(hx+hw*.36,hy+hh*1.08);g.lineTo(hx+hw*.5,hy+hh*.82);g.fill();
  g.strokeStyle='#6a4a20';g.lineWidth=.55;g.beginPath();g.moveTo(hx-hw*.1,hy+hh*.25);g.lineTo(hx+hw*.15,hy+hh*.52);g.moveTo(hx-hw*.15,hy+hh*.4);g.lineTo(hx+hw*.08,hy+hh*.62);g.stroke();
 }
 if(d.id===6){
  g.strokeStyle='rgba(240,252,255,.8)';g.lineWidth=.6;g.beginPath();g.moveTo(hx-hw*.5,hy+hh*.1);g.lineTo(hx-hw*.3,hy+hh*.55);g.moveTo(hx+hw*.35,hy+hh*.05);g.lineTo(hx+hw*.2,hy+hh*.6);g.stroke();
 }
}
function gearHelm(d,f,hx,hy,hw,hh,skin,suit,ac){
 const shell=mix(suit,'#c8d0d8',.3);
 shape([['M',hx-hw*1.02,hy-hh*.12],['Q',hx-hw*1.02,hy-hh*1.18,hx-hw*.1,hy-hh*1.2],['Q',hx+hw*.92,hy-hh*1.16,hx+hw*1.02,hy-hh*.08],['L',hx+hw*.86,hy+hh*.12],['L',hx-hw*.86,hy+hh*.12]],shell,OUT,1.15);
 rr(hx-hw*.96,hy-hh*.42,hw*1.9,hh*.46,hh*.12,'#20262a',OUT,.9);
 g.fillStyle=S.FRAME%36<18?ac:shade(ac,.55);g.fillRect(hx-hw*.8,hy-hh*.28,hw*1.58,hh*.12);
 g.fillStyle='rgba(255,255,255,.35)';g.fillRect(hx-hw*.8,hy-hh*.3,hw*1.25,1);
 g.strokeStyle=lite(shell,.4);g.lineWidth=.9;g.beginPath();g.moveTo(hx-hw*.72,hy-hh*.86);g.quadraticCurveTo(hx,hy-hh*1.08,hx+hw*.68,hy-hh*.82);g.stroke();
 g.fillStyle=ac;rr(hx-hw*.18,hy-hh*1.3,hw*.36,hh*.22,hh*.08,ac,OUT,.7);
 g.fillStyle=S.FRAME%40<20?'#e04020':'#601414';g.fillRect(hx-hw*.03,hy-hh*1.4,hw*.12,hh*.1);
 g.fillStyle=shade(shell,.55);g.fillRect(hx-hw*1.04,hy-hh*.32,hw*.2,hh*.5);g.fillRect(hx+hw*.84,hy-hh*.32,hw*.2,hh*.5);
 g.fillStyle=ac;g.beginPath();g.moveTo(hx+hw*.08,hy-hh*.2);g.lineTo(hx+hw*.24,hy-hh*.52);g.lineTo(hx+hw*.4,hy-hh*.2);g.lineTo(hx+hw*.28,hy-hh*.2);g.lineTo(hx+hw*.24,hy-hh*.32);g.lineTo(hx+hw*.2,hy-hh*.2);g.fill();
}
function hoodRing(hx,hy,hw,hh){
 g.beginPath();
 g.moveTo(hx-hw*1.22,hy+hh*.9);
 g.quadraticCurveTo(hx-hw*1.3,hy-hh*.7,hx-hw*.34,hy-hh*1.28);
 g.quadraticCurveTo(hx+hw*.42,hy-hh*1.4,hx+hw*1.14,hy-hh*.58);
 g.quadraticCurveTo(hx+hw*1.28,hy+hh*.18,hx+hw*1.04,hy+hh*.94);
 g.closePath();
 g.moveTo(hx-hw*.78,hy+hh*.78);
 g.quadraticCurveTo(hx-hw*.94,hy-hh*.1,hx-hw*.5,hy-hh*.64);
 g.quadraticCurveTo(hx,hy-hh*.94,hx+hw*.54,hy-hh*.64);
 g.quadraticCurveTo(hx+hw*.94,hy-hh*.16,hx+hw*.76,hy+hh*.8);
 g.quadraticCurveTo(hx,hy+hh*.96,hx-hw*.78,hy+hh*.78);
 g.closePath();
}
function gearHood(d,f,hx,hy,hw,hh,skin,suit,ac){
 const hc=shade(suit,d.id===8?.42:.55);
 hoodRing(hx,hy,hw,hh);
 g.fillStyle=hc;g.fill('evenodd');
 g.strokeStyle=OUT;g.lineWidth=1.15;g.stroke();
 g.save();hoodRing(hx,hy,hw,hh);g.clip('evenodd');g.fillStyle='rgba(0,0,0,.22)';g.fillRect(hx-hw*1.4,hy-hh*1.4,hw*2.8,hh*2.8);g.restore();
 g.strokeStyle='rgba(0,0,0,.38)';g.lineWidth=hh*.15;g.beginPath();g.moveTo(hx-hw*.78,hy+hh*.78);g.quadraticCurveTo(hx-hw*.94,hy-hh*.1,hx-hw*.5,hy-hh*.64);g.quadraticCurveTo(hx,hy-hh*.94,hx+hw*.54,hy-hh*.64);g.quadraticCurveTo(hx+hw*.94,hy-hh*.16,hx+hw*.76,hy+hh*.8);g.stroke();
 g.strokeStyle=lite(hc,.28);g.lineWidth=.8;g.beginPath();g.moveTo(hx-hw*1.02,hy-hh*.1);g.quadraticCurveTo(hx-hw*.8,hy-hh*1.0,hx-hw*.16,hy-hh*1.14);g.stroke();
 g.strokeStyle=shade(hc,.55);g.lineWidth=.65;g.beginPath();g.moveTo(hx+hw*.86,hy-hh*.3);g.lineTo(hx+hw*.72,hy+hh*.48);g.moveTo(hx+hw*.99,hy-hh*.12);g.lineTo(hx+hw*.88,hy+hh*.62);g.stroke();
 const eye=d.id===8?'#c060e0':'#40d8c0';
 g.save();g.globalCompositeOperation='lighter';g.globalAlpha=d.id===8?.24:.16;g.fillStyle=eye;g.beginPath();g.ellipse(hx+hw*.35,hy-hh*.1,hw*.5,hh*.16,0,0,TAU);g.fill();g.restore();
 if(d.id===5){
  g.fillStyle=shade(suit,.35);g.beginPath();g.moveTo(hx-hw*.72,hy+hh*.5);g.quadraticCurveTo(hx,hy+hh*.36,hx+hw*.78,hy+hh*.56);g.lineTo(hx+hw*.58,hy+hh*.88);g.quadraticCurveTo(hx,hy+hh*.98,hx-hw*.6,hy+hh*.84);g.closePath();g.fill();
  g.strokeStyle=ac;g.lineWidth=.7;g.beginPath();g.moveTo(hx-hw*.55,hy+hh*.62);g.quadraticCurveTo(hx,hy+hh*.5,hx+hw*.6,hy+hh*.64);g.stroke();
 }else{
  g.strokeStyle=ac;g.globalAlpha=.55;g.lineWidth=.8;g.beginPath();g.moveTo(hx-hw*1.2,hy+hh*.2);g.quadraticCurveTo(hx-hw*1.1,hy+hh*.7,hx-hw*.82,hy+hh*.88);g.stroke();g.globalAlpha=1;
 }
}
function gearHorn(d,f,hx,hy,hw,hh,skin,suit,ac){
 for(const side of[-1,1]){
  const s=side;
  shape([['M',hx+s*hw*.52,hy-hh*.56],['Q',hx+s*hw*1.02,hy-hh*1.12,hx+s*hw*1.2,hy-hh*1.58],['Q',hx+s*hw*.72,hy-hh*1.02,hx+s*hw*.28,hy-hh*.66]],'#8a7a5c',OUT,1.1);
  g.strokeStyle='#b8a888';g.lineWidth=.7;g.beginPath();g.moveTo(hx+s*hw*.55,hy-hh*.62);g.quadraticCurveTo(hx+s*hw*.95,hy-hh*1.12,hx+s*hw*1.12,hy-hh*1.48);g.stroke();
 }
 rr(hx-hw*.78,hy-hh*.58,hw*1.56,hh*.26,hh*.09,mix('#8a7a5c','#d8c8a0',.28),OUT,.9);
 g.fillStyle=ac;g.fillRect(hx-hw*.12,hy-hh*.52,hw*.24,hh*.14);
 g.strokeStyle='#4a4038';g.lineWidth=.6;g.beginPath();g.moveTo(hx-hw*.5,hy-hh*.48);g.lineTo(hx-hw*.4,hy-hh*.3);g.moveTo(hx+hw*.42,hy-hh*.45);g.lineTo(hx+hw*.3,hy-hh*.28);g.stroke();
}
function gearVisor(d,f,hx,hy,hw,hh,skin,suit,ac){
 rr(hx-hw*1.0,hy-hh*.48,hw*2.0,hh*.58,hh*.14,'#2a3028',OUT,1.2);
 rr(hx-hw*.86,hy-hh*.38,hw*1.74,hh*.36,hh*.08,'#5a6450',null);
 g.fillStyle=S.FRAME%14<7?ac:shade(ac,.55);g.fillRect(hx-hw*.8,hy-hh*.29,hw*1.54,hh*.13);
 g.fillStyle='rgba(255,255,255,.3)';g.fillRect(hx-hw*.8,hy-hh*.31,hw*1.25,1);
 g.fillStyle='rgba(255,255,255,.16)';g.fillRect(hx-hw*.8,hy-hh*.24+((S.FRAME>>3)%2),hw*1.54,1);
 g.fillStyle=shade('#5a6450',.7);g.fillRect(hx-hw*.86,hy-hh*.06,hw*1.74,hh*.08);
 g.fillStyle=ac;g.fillRect(hx-hw*1.02,hy-hh*.36,hh*.16,hh*.34);g.fillRect(hx+hw*.9,hy-hh*.36,hh*.16,hh*.34);
 g.strokeStyle=OUT;g.lineWidth=1;g.beginPath();g.moveTo(hx+hw*.8,hy-hh*.45);g.lineTo(hx+hw*1.08,hy-hh*.78);g.stroke();
 g.fillStyle='#d84a2a';g.fillRect(hx+hw*1.04,hy-hh*.82,1.4,1.4);
}
function gearBand(d,f,hx,hy,hw,hh,skin,suit,ac){
 hairCap(hx,hy,hw,hh,d.hair);
 rr(hx-hw*1.02,hy-hh*.6,hw*2.04,hh*.34,hh*.08,ac,OUT,1.05);
 g.fillStyle=lite(ac,.38);g.fillRect(hx-hw*.94,hy-hh*.56,hw*1.7,1);
 g.fillStyle=shade(ac,.55);g.fillRect(hx-hw*.94,hy-hh*.32,hw*1.88,1);
 const sw=Math.sin((f.animT||0)*.12)*hh*.3;
 shape([['M',hx-hw*.92,hy-hh*.5],['Q',hx-hw*1.35,hy-hh*.2+sw,hx-hw*1.5,hy+hh*.62+sw],['L',hx-hw*1.3,hy+hh*.66+sw],['Q',hx-hw*1.12,hy-hh*.1+sw,hx-hw*.78,hy-hh*.32]],ac,OUT,.9);
 g.strokeStyle=shade(skin,.62);g.lineWidth=.65;g.beginPath();g.moveTo(hx+hw*.42,hy+hh*.3);g.lineTo(hx+hw*.55,hy+hh*.48);g.moveTo(hx+hw*.5,hy+hh*.36);g.lineTo(hx+hw*.36,hy+hh*.52);g.stroke();
 g.fillStyle=lite(ac,.45);g.fillRect(hx-hw*.05,hy-hh*.56,hw*.1,hh*.24);
}
function gearHalo(d,f,hx,hy,hw,hh,skin,suit,ac){
 hairCap(hx,hy,hw,hh,d.hair);
 const hb=Math.sin((f.animT||0)*.07)*hh*.18;
 g.save();g.translate(hx,hy-hh*1.78+hb);g.rotate((f.animT||0)*.04);
 g.fillStyle=OUT;g.beginPath();g.moveTo(0,-hh*.62);g.lineTo(hh*.22,-hh*.22);g.lineTo(hh*.62,0);g.lineTo(hh*.22,hh*.22);g.lineTo(0,hh*.62);g.lineTo(-hh*.22,hh*.22);g.lineTo(-hh*.62,0);g.lineTo(-hh*.22,-hh*.22);g.closePath();g.fill();
 g.fillStyle=ac;g.beginPath();g.moveTo(0,-hh*.48);g.lineTo(hh*.16,-hh*.16);g.lineTo(hh*.48,0);g.lineTo(hh*.16,hh*.16);g.lineTo(0,hh*.48);g.lineTo(-hh*.16,hh*.16);g.lineTo(-hh*.48,0);g.lineTo(-hh*.16,-hh*.16);g.closePath();g.fill();
 g.fillStyle='#f8f8ff';g.beginPath();g.arc(0,0,hh*.14,0,TAU);g.fill();
 g.restore();
 g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.22;g.fillStyle=ac;g.beginPath();g.arc(hx,hy-hh*1.78+hb,hh*.8,0,TAU);g.fill();g.restore();
 if(d.female){g.fillStyle=ac;g.fillRect(hx-hw*1.05,hy+hh*.02,1.2,2);}
}
function gearTail(d,f,hx,hy,hw,hh,skin,suit,ac){
 hairCap(hx,hy,hw,hh,d.hair);
 drawPonytail(d,f,hx,hy,hw,hh,d.hair,ac);
 rr(hx-hw*1.02,hy-hh*.62,hw*2.04,hh*.2,hh*.06,ac,OUT,.9);
 rr(hx+hw*.12,hy-hh*.64,hw*.46,hh*.24,hh*.04,mix(ac,'#d8e0e0',.4),OUT,.6);
 g.fillStyle=shade(suit,.32);g.beginPath();g.moveTo(hx-hw*.72,hy+hh*.46);g.quadraticCurveTo(hx,hy+hh*.34,hx+hw*.78,hy+hh*.5);g.lineTo(hx+hw*.62,hy+hh*.86);g.quadraticCurveTo(hx,hy+hh*.98,hx-hw*.62,hy+hh*.82);g.closePath();g.fill();
 g.strokeStyle=ac;g.lineWidth=.65;g.beginPath();g.moveTo(hx-hw*.55,hy+hh*.58);g.quadraticCurveTo(hx,hy+hh*.5,hx+hw*.58,hy+hh*.6);g.stroke();
}
function gearCorona(d,f,hx,hy,hw,hh,skin,suit,ac){
 hairCap(hx,hy,hw,hh,d.hair);
 g.fillStyle=d.hair;
 shape([['M',hx-hw*.92,hy-hh*.72],['Q',hx-hw*1.2,hy+hh*.2,hx-hw*1.12,hy+hh*1.55],['L',hx-hw*.72,hy+hh*1.5],['Q',hx-hw*.78,hy+hh*.2,hx-hw*.58,hy-hh*.45]],d.hair,OUT,.95);
 shape([['M',hx+hw*.9,hy-hh*.72],['Q',hx+hw*1.22,hy+hh*.25,hx+hw*1.18,hy+hh*1.55],['L',hx+hw*.76,hy+hh*1.5],['Q',hx+hw*.8,hy+hh*.18,hx+hw*.58,hy-hh*.45]],d.hair,OUT,.95);
 g.strokeStyle=lite(d.hair,.35);g.lineWidth=.7;g.beginPath();g.moveTo(hx-hw*.84,hy-hh*.4);g.quadraticCurveTo(hx-hw*.95,hy+hh*.5,hx-hw*.92,hy+hh*1.25);g.moveTo(hx+hw*.82,hy-hh*.4);g.quadraticCurveTo(hx+hw*.96,hy+hh*.5,hx+hw*.98,hy+hh*1.25);g.stroke();
 rr(hx-hw*1.02,hy-hh*1.18,hw*2.04,hh*.34,hh*.06,ac,OUT,1.05);
 for(let i=0;i<5;i++){const cx=hx-hw*.76+i*hw*.38;g.fillStyle=ac;g.beginPath();g.moveTo(cx-hw*.12,hy-hh*1.14);g.lineTo(cx,hy-hh*1.54-(i===2?hh*.12:0));g.lineTo(cx+hw*.12,hy-hh*1.14);g.closePath();g.fill();g.strokeStyle=OUT;g.lineWidth=.6;g.stroke();}
 g.fillStyle='#f8f0e0';for(let i=0;i<5;i++)g.fillRect(hx-hw*.72+i*hw*.38,hy-hh*1.12,1.2,1.2);
 g.fillStyle='#c82040';g.fillRect(hx-hw*.08,hy-hh*1.1,1.6,1.6);
 if(d.female){g.fillStyle=ac;g.fillRect(hx-hw*1.06,hy+hh*.02,1.2,2);}
}
function gearHair(d,f,hx,hy,hw,hh,skin,suit,ac){
 shape([['M',hx-hw*1.05,hy-hh*.18],['L',hx-hw*.98,hy-hh*1.04],['L',hx-hw*.55,hy-hh*.82],['L',hx-hw*.38,hy-hh*1.28],['L',hx-hw*.05,hy-hh*.94],['L',hx+hw*.2,hy-hh*1.32],['L',hx+hw*.46,hy-hh*.94],['L',hx+hw*.82,hy-hh*1.14],['L',hx+hw*1.04,hy-hh*.42],['L',hx+hw*.9,hy+hh*.2],['L',hx+hw*.56,hy-hh*.16],['L',hx-hw*.56,hy-hh*.16]],d.hair,OUT,1.05);
 for(let i=0;i<4;i++){const fx=hx-hw*.68+i*hw*.44,fg=hh*(.34+Math.sin((S.FRAME||0)*.25+i*1.7)*.12);g.fillStyle=i%2?'#f8c040':'#f06020';g.beginPath();g.moveTo(fx-hw*.1,hy-hh*.94);g.lineTo(fx+hw*.04,hy-hh*1.22-fg);g.lineTo(fx+hw*.16,hy-hh*.94);g.closePath();g.fill();}
 g.strokeStyle=lite(d.hair,.28);g.lineWidth=.7;g.beginPath();g.moveTo(hx-hw*.7,hy-hh*.72);g.quadraticCurveTo(hx,hy-hh*1.0,hx+hw*.62,hy-hh*.68);g.stroke();
 g.fillStyle=d.hair;g.fillRect(hx-hw*.96,hy-hh*.2,hw*.2,hh*.52);g.fillRect(hx+hw*.76,hy-hh*.2,hw*.18,hh*.4);
}
function drawGear(d,f,hx,hy,hw,hh,skin,suit,ac,hair){
 if(f.charred)return;
 if(d.gear==='mask'){if(d.id!==1)hairCap(hx,hy,hw,hh,hair);gearMask(d,f,hx,hy,hw,hh,skin,suit,ac);}
 else if(d.gear==='helm')gearHelm(d,f,hx,hy,hw,hh,skin,suit,ac);
 else if(d.gear==='hood')gearHood(d,f,hx,hy,hw,hh,skin,suit,ac);
 else if(d.gear==='horn'){hairCap(hx,hy,hw,hh,hair);gearHorn(d,f,hx,hy,hw,hh,skin,suit,ac);}
 else if(d.gear==='visor')gearVisor(d,f,hx,hy,hw,hh,skin,suit,ac);
 else if(d.gear==='band')gearBand(d,f,hx,hy,hw,hh,skin,suit,ac);
 else if(d.gear==='halo')gearHalo(d,f,hx,hy,hw,hh,skin,suit,ac);
 else if(d.gear==='tail')gearTail(d,f,hx,hy,hw,hh,skin,suit,ac);
 else if(d.gear==='corona')gearCorona(d,f,hx,hy,hw,hh,skin,suit,ac);
 else if(d.gear==='hair')gearHair(d,f,hx,hy,hw,hh,skin,suit,ac);
 else hairCap(hx,hy,hw,hh,hair);
 if(d.ponytail&&d.gear!=='tail')drawPonytail(d,f,hx,hy,hw,hh,hair,ac);
}
function drawHeadBase(d,f,hx,hy,hw,hh,colors){
 const skin=colors.skin,suit=colors.suit,ac=colors.ac,hair=colors.hair;
 if(!f.charred){
  ell(hx,hy-hh*.18,hw*1.16,hh*1.12,hair,OUT,1.1);
  ell(hx,hy-hh*.22,hw*1.04,hh*1.0,hair,null);
 }
 headPath(hx,hy,hw,hh);
 g.fillStyle=skin;g.fill();g.strokeStyle=OUT;g.lineWidth=1.1;g.stroke();
 g.save();headPath(hx,hy,hw,hh);g.clip();
 g.globalAlpha=.16;g.fillStyle=OUT;g.beginPath();g.ellipse(hx-hw*.6,hy+hh*.08,hw*.42,hh*.86,0,0,TAU);g.fill();
 g.globalAlpha=.42;g.fillStyle=lite(skin,.25);g.beginPath();g.ellipse(hx+hw*.5,hy-hh*.05,hw*.28,hh*.55,0,0,TAU);g.fill();
 g.globalAlpha=1;g.restore();
 ell(hx-hw*.96,hy+hh*.02,hw*.18,hh*.2,skin,OUT,.8);
 drawFace(d,f,hx,hy,hw,hh,skin,ac);
 drawGear(d,f,hx,hy,hw,hh,skin,suit,ac,hair);
}
function drawBody(f,p){
 const d=f.def,H=d.h,look=LOOKS[d.id]||LOOKS[0],female=!!d.female,heavy=d.bulk>1.15;
 const skin=f.charred?'#2a2018':(f.pale?'#d8ccc8':d.skin);
 const suit=f.charred?'#1c1712':(f.pale?shade(d.suit,.5):d.suit);
 const hair=f.charred?'#16120e':(f.pale?shade(d.hair,.45):d.hair);
 const ac=f.charred?'#4a4238':d.acc;
 const hipY=-p.hip,shY=hipY-H*.31,shX=p.lean*H*.16;
 const shoulderW=H*(female?.105:.115)*(heavy?1.08:1),waistW=H*(female?.061:.073),hipW=H*(female?.094:.082)*(heavy?1.06:1);
 const legW=H*(female?.068:heavy?.094:.078),armW=H*(female?.05:heavy?.065:.056);
 const sleeve=look.sleeve==='skin'?skin:look.sleeve==='suit'?suit:look.sleeve==='metal'?mix(suit,'#a8a890',.4):lite(suit,.18);
 const glove=look.glove==='skin'?skin:look.glove==='wrap'?shade(ac,.35):look.glove==='accent'?ac:look.glove==='claw'?skin:shade(suit,.3);
 if(d.cape&&!f.charred)drawCape(f,H,shY,hipY,shX,suit,ac);
 if(d.blade&&!(f.state==='atk'||f.state==='cast'||f.state==='dash'))drawSheath(H,shY,hipY,suit,ac);
 const bl=limb2(-hipW*.5,hipY,p.legB[0],p.legB[1],H*.25,H*.23,legW,legW*.82,shade(suit,.48),{noLight:true});
 legGear(bl,legW,shade(suit,.48),shade(ac,.6),look,true);
 boot(bl.x,bl.y,H*.14,H*.105,shade(suit,.35));
 const ba=limb2(-shoulderW*.55+shX,shY+2,p.armB[0],p.armB[1],H*.19,H*.17,armW*.9,armW*.74,shade(sleeve,.58),{noLight:true});
 armGear(ba,armW*.9,shade(sleeve,.58),shade(ac,.6),look,true);
 hand(ba.x,ba.y,H*.075,H*.082,shade(glove,.6));
 drawPelvis(H,hipY,hipW,suit,ac,look);
 drawTorso(H,d,f,hipY,shY,shX,shoulderW,waistW,hipW,suit,ac,look);
 const fl=limb2(hipW*.5,hipY,p.legF[0],p.legF[1],H*.25,H*.23,legW,legW*.82,suit);
 legGear(fl,legW,suit,ac,look,false);
 boot(fl.x,fl.y,H*.145,H*.11,shade(suit,.5));
 if(d.dress)drawDress(H,hipY,shX,hipW,suit,ac);
 else if(d.skirt)drawSkirt(H,hipY,shX,hipW,suit,ac);
 const fa=limb2(shoulderW*.58+shX,shY+2,p.armF[0],p.armF[1],H*.19,H*.17,armW,armW*.78,sleeve);
 armGear(fa,armW,sleeve,ac,look,false);
 hand(fa.x,fa.y,H*.082,H*.09,glove);
 const head={x:shX+p.lean*H*.085,y:shY-H*.098,hw:H*(female?.067:.072),hh:H*.081};
 drawNeck(H,shY,head,shX,suit,skin,ac);
 return{frontHand:[fa.x,fa.y],backHand:[ba.x,ba.y],frontFoot:fl,backFoot:bl,head,H,skin,suit,ac,hair,look,hipY,shY,shX,hipW,shoulderW,waistW};
}
function drawHead(f,p,body){
 drawHeadBase(f.def,f,body.head.x,body.head.y,body.head.hw,body.head.hh,body);
}
function drawWeapons(f,p,body){
 const d=f.def,ac=body.ac,suit=body.suit,fa=body.frontHand,H=body.H;
 const active=f.state==='atk'||f.state==='cast'||f.state==='super'||f.state==='dash';
 if(d.fan){
  if(f.state==='cast'||f.state==='super'){
   const r=H*.27;
   g.save();g.translate(fa[0],fa[1]);
   g.fillStyle=OUT;g.beginPath();g.moveTo(0,0);g.arc(0,0,r+1.5,-1.25,.18);g.closePath();g.fill();
   const fg=g.createRadialGradient(0,0,2,0,0,r);fg.addColorStop(0,shade(suit,.6));fg.addColorStop(1,'#8a1424');
   g.fillStyle=fg;g.beginPath();g.moveTo(0,0);g.arc(0,0,r,-1.2,.1);g.closePath();g.fill();
   g.strokeStyle=lite(ac,.4);g.lineWidth=.75;
   for(let i=0;i<7;i++){const aa=-1.12+i*.19;g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(aa)*r,Math.sin(aa)*r);g.stroke();}
   g.strokeStyle=ac;g.lineWidth=1.1;g.beginPath();g.arc(0,0,r*.92,-1.2,.1);g.stroke();
   g.fillStyle=ac;g.beginPath();g.arc(0,0,1.8,0,TAU);g.fill();
   g.restore();
  }else{
   g.save();g.translate(body.hipW*.7,body.hipY-1);g.rotate(.5);
   g.fillStyle=OUT;g.fillRect(-1.2,-7,3.4,8);g.fillStyle=suit;g.fillRect(-.6,-6.4,2.2,6.6);g.fillStyle=ac;g.fillRect(-.8,-6.8,2.6,1.2);g.restore();
  }
 }
 if(d.claws&&active){
  const a1=p.armF[0],a2=p.armF[1],dx=Math.sin(a1+a2),dy=Math.cos(a1+a2),px=-dy,py=dx,len=H*.13;
  for(let i=-1;i<=1;i++){
   const ox=px*i*H*.026,oy=py*i*H*.026;
   g.strokeStyle=OUT;g.lineWidth=2.6;g.beginPath();g.moveTo(fa[0]+ox,fa[1]+oy);g.quadraticCurveTo(fa[0]+ox+dx*len*.6+px*1.6,fa[1]+oy+dy*len*.6+py*1.6,fa[0]+ox+dx*len,fa[1]+oy+dy*len);g.stroke();
   g.strokeStyle=lite(ac,.15);g.lineWidth=1.2;g.beginPath();g.moveTo(fa[0]+ox,fa[1]+oy);g.quadraticCurveTo(fa[0]+ox+dx*len*.6+px*.8,fa[1]+oy+dy*len*.6+py*.8,fa[0]+ox+dx*len,fa[1]+oy+dy*len);g.stroke();
  }
  g.fillStyle=lite(ac,.5);g.fillRect(fa[0]+dx*len*.5,fa[1]+dy*len*.5,1.2,1.2);
 }
 if(d.blade&&active){
  const a1=p.armF[0],a2=p.armF[1],dx=Math.sin(a1+a2),dy=Math.cos(a1+a2),px=-dy,py=dx,len=H*.55;
  g.strokeStyle=OUT;g.lineWidth=3.2;g.beginPath();g.moveTo(fa[0],fa[1]);g.quadraticCurveTo(fa[0]+dx*len*.55+px*2,fa[1]+dy*len*.55+py*2,fa[0]+dx*len,fa[1]+dy*len);g.stroke();
  g.strokeStyle='#d8e4e8';g.lineWidth=1.5;g.beginPath();g.moveTo(fa[0]+dx*2,fa[1]+dy*2);g.quadraticCurveTo(fa[0]+dx*len*.55+px*1,fa[1]+dy*len*.55+py*1,fa[0]+dx*len,fa[1]+dy*len);g.stroke();
  g.strokeStyle='#ffffff';g.lineWidth=.55;g.beginPath();g.moveTo(fa[0]+dx*3,fa[1]+dy*3);g.quadraticCurveTo(fa[0]+dx*len*.55+px*.5,fa[1]+dy*len*.55+py*.5,fa[0]+dx*len*.96,fa[1]+dy*len*.96);g.stroke();
  g.fillStyle=ac;g.fillRect(fa[0]-1.5,fa[1]-1.5,3,3);g.fillStyle=OUT;g.fillRect(fa[0]-2.2,fa[1]+.4,4.4,1.4);
 }
 if(d.bow&&f.state==='cast'){
  const r=H*.24;
  g.save();g.translate(fa[0]+3,fa[1]);
  g.strokeStyle=OUT;g.lineWidth=3;g.beginPath();g.arc(0,0,r+1.4,-1.25,1.25);g.stroke();
  g.strokeStyle=ac;g.lineWidth=1.7;g.beginPath();g.arc(0,0,r,-1.22,1.22);g.stroke();
  g.strokeStyle='#f0f0ff';g.lineWidth=.7;g.beginPath();g.moveTo(Math.cos(-1.25)*(r+1),Math.sin(-1.25)*(r+1));g.lineTo(Math.cos(1.25)*(r+1),Math.sin(1.25)*(r+1));g.stroke();
  g.strokeStyle=OUT;g.lineWidth=2.2;g.beginPath();g.moveTo(-2,0);g.lineTo(r+5,0);g.stroke();
  g.strokeStyle='#f0f0ff';g.lineWidth=.9;g.beginPath();g.moveTo(-2,0);g.lineTo(r+5,0);g.stroke();
  g.fillStyle=ac;g.beginPath();g.moveTo(r+12,0);g.lineTo(r+7,-2);g.lineTo(r+7,2);g.fill();
  g.strokeStyle=shade(suit,.4);g.lineWidth=1.7;g.beginPath();g.moveTo(-6,2);g.lineTo(2,8);g.stroke();
  g.restore();
 }
}
function portraitTop(d){return d.gear==='halo'?-25:(d.gear==='horn'||d.gear==='corona')?-19:-15;}
function drawPortrait(d,x,y,s){
 g.save();g.lineCap='round';g.lineJoin='round';g.translate(x,y);g.scale(s*.5,s*.5);
 const top=portraitTop(d)*2,bottom=30;
 const bg=g.createLinearGradient(0,top,0,bottom);bg.addColorStop(0,shade(d.suit,.42));bg.addColorStop(.55,shade(d.suit,.6));bg.addColorStop(1,'#0c0a08');
 g.fillStyle=bg;g.fillRect(-24,top,48,bottom-top);
 g.save();g.beginPath();g.rect(-24,top,48,bottom-top);g.clip();
 const skin=d.skin,ac=d.acc,suit=d.suit,hair=d.hair,look=LOOKS[d.id]||LOOKS[0];
 const glow=g.createRadialGradient(0,-4,2,0,-4,24);glow.addColorStop(0,mix(ac,'#ffffff',.3));glow.addColorStop(.35,ac);glow.addColorStop(1,'rgba(0,0,0,0)');g.globalAlpha=.16;g.fillStyle=glow;g.fillRect(-24,top,48,bottom-top);g.globalAlpha=1;
 const sg=g.createLinearGradient(-20,0,20,0);sg.addColorStop(0,shade(suit,.5));sg.addColorStop(.45,suit);sg.addColorStop(1,shade(suit,.78));
 g.beginPath();g.moveTo(-22,bottom);g.quadraticCurveTo(-20,7,-11,2);g.lineTo(11,2);g.quadraticCurveTo(20,7,22,bottom);g.closePath();g.fillStyle=OUT;g.fill();
 g.beginPath();g.moveTo(-20,bottom);g.quadraticCurveTo(-18,8,-10,3);g.lineTo(10,3);g.quadraticCurveTo(18,8,20,bottom);g.closePath();g.fillStyle=sg;g.fill();
 if(d.cape){shape([['M',-17,4],['Q',-23,12,-22,bottom],['L',-13,bottom],['Q',-15,10,-9,4]],shade(suit,.35),OUT,1.1);}
 rr(-5.5,3,11,10,2,OUT,OUT,.9);rr(-4.5,4,9,9,1.5,shade(skin,.78),null);
 g.save();g.beginPath();g.rect(-24,top,48,bottom-top);g.clip();drawHeadBase(d,{animT:0,state:'idle',charred:0,pale:0},0,-5,11,13,{skin,suit,ac,hair});g.restore();
 g.fillStyle=ac;rr(-6,6.5,12,2.2,1,ac,OUT,.7);g.fillStyle=lite(ac,.4);g.fillRect(-5,7,8,.8);
 g.fillStyle=shade(suit,.55);g.fillRect(-10,9,3,7);g.fillRect(7,9,3,7);
 if(look.shoulder>0){ell(-11,7,4,2.2,mix(suit,'#c8c8c8',.25),OUT,.8);ell(11,7,4,2.2,mix(suit,'#c8c8c8',.25),OUT,.8);}
 g.fillStyle=ac;g.beginPath();g.moveTo(0,12);g.lineTo(2.2,15);g.lineTo(0,18);g.lineTo(-2.2,15);g.closePath();g.fill();
 if(look.chest==='robe'){g.strokeStyle=ac;g.lineWidth=.8;g.beginPath();g.moveTo(0,17);g.lineTo(0,bottom);g.stroke();}
 if(d.id===7){g.strokeStyle='#2a3028';g.lineWidth=1.2;g.beginPath();g.moveTo(-12,5);g.lineTo(9,bottom);g.stroke();g.fillStyle=ac;g.fillRect(4,13,2,2);}
 g.restore();
 g.save();g.beginPath();g.rect(-24,top,48,bottom-top);g.clip();g.globalAlpha=.2;g.fillStyle='#000';g.fillRect(-24,top,48,3);g.fillRect(-24,bottom-6,48,6);g.globalAlpha=1;g.restore();
 g.strokeStyle='#c8a040';g.lineWidth=1;g.strokeRect(-23.5,top+.5,47,bottom-top-1);
 g.fillStyle='#c8a040';g.fillRect(-23,top,3,3);g.fillRect(20,top,3,3);g.fillRect(-23,bottom-3,3,3);g.fillRect(20,bottom-3,3,3);
 g.restore();
}
return {drawBody,drawHead,drawWeapons,drawPortrait,portraitTop,drawGear};
}
