export const KM1={l:'KeyA',r:'KeyD',u:'KeyW',d:'KeyS',P:'KeyJ',K:'KeyK',B:'KeyL'};
export const KM2={l:'ArrowLeft',r:'ArrowRight',u:'ArrowUp',d:'ArrowDown',P:'KeyI',K:'KeyO',B:'KeyP'};

export function createInput() {
  const keys={};
  const TOUCH={l:0,r:0,u:0,d:0,P:0,K:0,B:0};
  const pressed=Object.create(null);// 25.10: быстрый тап между кадрами не теряется
  const press=(code,frame)=>{pressed[code]=frame||0;};
  const clearPress=()=>{for(const code in pressed)delete pressed[code];};
  class Ctrl{constructor(m){this.m=m;this.ax={};this.ai=false;this.buf=[];this._={};this.fr=-999;this.tP=-999;this.tK=-999;}
  poll(FR){const fresh=code=>{const at=pressed[code];return at!==undefined&&FR-at<=2;},touch=this.m===KM1;const q=k=>this.ai?!!this.ax[k]:(!!keys[this.m[k]]||(touch&&!!TOUCH[k])||fresh(this.m[k])||(touch&&fresh(k)));const o={l:q('l'),r:q('r'),u:q('u'),d:q('d'),P:q('P'),K:q('K'),B:q('B')};this.fr=FR;this.pP=o.P&&!this._.P;this.pK=o.K&&!this._.K;this.pB=o.B&&!this._.B;this.pl=o.l&&!this._.l;this.pr=o.r&&!this._.r;this.pu=o.u&&!this._.u;this.pd=o.d&&!this._.d;this._=o;Object.assign(this,o);const push=k=>this.buf.push({k,t:FR});if(this.pl)push('L');if(this.pr)push('R');if(this.pd)push('D');if(this.pu)push('U');if(this.pP){push('P');this.tP=FR;}if(this.pK){push('K');this.tK=FR;}if(this.buf.length>14)this.buf.splice(0,this.buf.length-14);}
  // 25.10: P+K — дружелюбный к человеческому вводу аккорд: обе кнопки одновременно, одна удерживается, либо нажаты с малым зазором
  pkChord(win){win=win||12;return(this.P&&this.K)||(this.fr-this.tP<=win&&this.fr-this.tK<=win);}
  match(seq,win){win=win||60;const b=this.buf,n=seq.length;if(b.length<n)return false;if(b[b.length-1].t-b[b.length-n].t>win)return false;for(let i=0;i<n;i++)if(b[b.length-n+i].k!==seq[i])return false;return true;}
  matchRel(seq,face,win){win=win||60;const b=this.buf,n=seq.length;if(b.length<n)return false;if(b[b.length-1].t-b[b.length-n].t>win)return false;for(let i=0;i<n;i++){let k=seq[i];if(k==='R')k=face>0?'R':'L';else if(k==='L')k=face>0?'L':'R';if(b[b.length-n+i].k!==k)return false;}return true;}
  matchRelLoose(seq,face,win){win=win||60;const b=this.buf,n=seq.length;if(b.length<n)return false;for(let start=b.length-n;start>=0;start--){if(b[b.length-1].t-b[start].t>win)break;let ok=true;for(let i=0;i<n;i++){let k=seq[i];if(k==='R')k=face>0?'R':'L';else if(k==='L')k=face>0?'L':'R';if(b[start+i].k!==k){ok=false;break;}}if(ok)return true;}return false;}
  clear(){this.buf.length=0;this.tP=-999;this.tK=-999;}
  cancel(){this.clear();this._={};this.pP=this.pK=this.pB=this.pl=this.pr=this.pu=this.pd=false;this.l=this.r=this.u=this.d=this.P=this.K=this.B=false;}}
  return {keys,TOUCH,KM1,KM2,Ctrl,press,clearPress};
}
