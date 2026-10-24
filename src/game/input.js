export const KM1={l:'KeyA',r:'KeyD',u:'KeyW',d:'KeyS',P:'KeyJ',K:'KeyK',B:'KeyL'};
export const KM2={l:'ArrowLeft',r:'ArrowRight',u:'ArrowUp',d:'ArrowDown',P:'KeyI',K:'KeyO',B:'KeyP'};

export function createInput() {
  const keys={};
  const TOUCH={l:0,r:0,u:0,d:0,P:0,K:0,B:0};
  class Ctrl{constructor(m){this.m=m;this.ax={};this.ai=false;this.buf=[];this._={};}
  poll(FR){const q=k=>this.ai?!!this.ax[k]:(!!keys[this.m[k]]||(this.m===KM1&&!!TOUCH[k]));const o={l:q('l'),r:q('r'),u:q('u'),d:q('d'),P:q('P'),K:q('K'),B:q('B')};this.pP=o.P&&!this._.P;this.pK=o.K&&!this._.K;this.pB=o.B&&!this._.B;this.pl=o.l&&!this._.l;this.pr=o.r&&!this._.r;this.pu=o.u&&!this._.u;this.pd=o.d&&!this._.d;this._=o;Object.assign(this,o);const push=k=>this.buf.push({k,t:FR});if(this.pP)push('P');if(this.pK)push('K');if(this.pl)push('L');if(this.pr)push('R');if(this.pd)push('D');if(this.pu)push('U');if(this.buf.length>14)this.buf.splice(0,this.buf.length-14);}
  match(seq,win){win=win||60;const b=this.buf;if(typeof seq==='string')seq=seq.split('');const n=seq.length;if(b.length<n)return false;if(b[b.length-1].t-b[b.length-n].t>win)return false;for(let i=0;i<n;i++)if(b[b.length-n+i].k!==seq[i])return false;return true;}
  matchRel(seq,face,win){const mapped=seq.split('').map(k=>k==='R'?(face>0?'R':'L'):k==='L'?(face>0?'L':'R'):k);return this.match(mapped,win);}
  matchRelLoose(seq,face,win){win=win||60;const mapped=seq.split('').map(k=>k==='R'?(face>0?'R':'L'):k==='L'?(face>0?'L':'R'):k);const b=this.buf,n=mapped.length;if(b.length<n)return false;for(let start=b.length-n;start>=0;start--){if(b[b.length-1].t-b[start].t>win)break;let ok=true;for(let i=0;i<n;i++)if(b[start+i].k!==mapped[i]){ok=false;break;}if(ok)return true;}return false;}
  clear(){this.buf.length=0;}}
  return {keys,TOUCH,KM1,KM2,Ctrl};
}
