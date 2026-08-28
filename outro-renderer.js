(()=>{
const M=window.RIBBON_OUTRO||{};
const clamp01=v=>Math.max(0,Math.min(1,v));
const lerp2=(a,b,q)=>a+(b-a)*q;
function sampleAt(track,start,sec,fps=60){
  if(!track?.length)return 0;const f=(sec-start)*fps,i=Math.floor(f),q=f-i;
  if(i<0)return track[0];if(i>=track.length-1)return track.at(-1);
  return lerp2(track[i],track[i+1],q);
}
function sampleKeys(keys,age){
  if(!keys?.length)return null;if(age<=keys[0][0])return keys[0].slice(1);
  for(let i=1;i<keys.length;i++)if(age<=keys[i][0]){
    const a=keys[i-1],b=keys[i],q=(age-a[0])/(b[0]-a[0]);
    return a.slice(1).map((v,j)=>lerp2(v,b[j+1],q));
  }
  return keys.at(-1).slice(1);
}
function rr(x,y,w,h,r,fill){ctx.save();ctx.fillStyle=fill;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();ctx.restore()}
function font(weight,size){return `${weight} ${size}px 'Pin Sans','Pin Sans MacOS','Nunito',sans-serif`}
function panel(x,y,label){
  rr(x,y,652,462,22,'rgb(212,9,10)');
  ctx.save();ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='top';ctx.font=font(900,51);ctx.fillText(label,x+326,y+25);ctx.restore();
}
function credits(y){
  const x=468;rr(x,y,503,271,25,'rgb(81,77,65)');
  ctx.save();ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='top';ctx.font=font(700,31);ctx.fillText('Video Made By',x+251.5,y+26);
  ctx.font=font(500,15);
  const left=[['Lead Research & Sourcing','Ahmed'],['Independent Fact Check','Alex L Jones'],['Lead Graphic Designer','Jack H']];
  const right=[['Edit & Post-Production','Alex Pacheco'],['Thumbnail Designer','Diego Garcia'],['Video Idea & Quality Check','Ideaguys.co']];
  let yy=y+82;for(let i=0;i<3;i++,yy+=52){ctx.fillText(left[i][0],x+126,yy);ctx.fillText(left[i][1],x+126,yy+18);ctx.fillText(right[i][0],x+377,yy);ctx.fillText(right[i][1],x+377,yy+18)}ctx.restore();
}
function drawLike(x,y,a){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.fillStyle='#191919';ctx.beginPath();ctx.moveTo(-8,2);ctx.lineTo(-2,-10);ctx.lineTo(5,-9);ctx.lineTo(5,-3);ctx.lineTo(14,-3);ctx.quadraticCurveTo(18,-2,16,3);ctx.lineTo(12,12);ctx.lineTo(-3,12);ctx.closePath();ctx.fill();ctx.fillRect(-14,-3,5,15);ctx.restore()}
function drawDislike(x,y,a){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.rotate(Math.PI);ctx.fillStyle='#191919';ctx.beginPath();ctx.moveTo(-8,2);ctx.lineTo(-2,-10);ctx.lineTo(5,-9);ctx.lineTo(5,-3);ctx.lineTo(14,-3);ctx.quadraticCurveTo(18,-2,16,3);ctx.lineTo(12,12);ctx.lineTo(-3,12);ctx.closePath();ctx.fill();ctx.fillRect(-14,-3,5,15);ctx.restore()}
function drawBell(x,y,a){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.strokeStyle='#191919';ctx.fillStyle='#191919';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-10,9);ctx.quadraticCurveTo(-5,5,-5,-4);ctx.quadraticCurveTo(-5,-13,0,-14);ctx.quadraticCurveTo(5,-13,5,-4);ctx.quadraticCurveTo(5,5,10,9);ctx.closePath();ctx.stroke();ctx.beginPath();ctx.arc(0,12,2.2,0,Math.PI*2);ctx.fill();ctx.restore()}
function subscribePill(sec){
  const S=M.subscribe;if(!S||sec<S.start)return;const k=sampleKeys(S.keys,sec-S.start);if(!k)return;
  const [w,h,y]=k,cx=M.subscribeTarget?.cx||735.5;rr(cx-w/2,y,w,h,Math.min(25,h/2),'rgb(236,236,236)');
  if(sec>=213.38){const bw=121,bh=43,bx=cx-bw/2,by=84;rr(bx,by,bw,bh,5,'rgb(255,68,67)');ctx.save();ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=font(800,18);ctx.fillText('Subscribe',cx,by+bh/2+1);ctx.restore()}
  if(sec>=213.55)drawLike(548,104,clamp01((sec-213.55)/.20));
  if(sec>=213.65)drawBell(925,104,clamp01((sec-213.65)/.13));
  if(sec>=213.75){ctx.save();ctx.globalAlpha=clamp01((sec-213.75)/.12);ctx.fillStyle='#171717';ctx.fillRect(523,139,134,4);ctx.restore()}
  if(sec>=213.82)drawDislike(630,104,clamp01((sec-213.82)/.13));
}
function drawMeasuredOutro(sec){
  if(sec<212.15)return;
  const wh=sampleAt(M.wipe?.heights,M.wipe?.start,sec,M.wipe?.fps||60);ctx.fillStyle='#111';ctx.fillRect(0,0,1440,Math.max(0,wh));
  if(sec>=M.panels?.start){const y=sampleAt(M.panels.top,M.panels.start,sec,M.panels.fps||60);panel(40,y,'BEST VIDEO FOR YOU');panel(750,y,'NEWEST VIDEO')}
  if(sec>=M.credits?.start){const y=sampleAt(M.credits.top,M.credits.start,sec,M.credits.fps||60);credits(y)}
  subscribePill(sec);
}
window.drawEndWipe=drawMeasuredOutro;
})();
