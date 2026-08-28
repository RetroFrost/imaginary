function ribbonSample60(table,sec){
  if(!table||!table.v?.length)return null;
  const f=(sec-table.start)*60;
  if(f<0)return null;
  if(f>=table.v.length-1)return table.v[table.v.length-1];
  const i=Math.floor(f),q=f-i;
  return table.v[i]+(table.v[i+1]-table.v[i])*q;
}
window.scrollAt=function(sec){
  const a=window.RIBBON_SCROLL_60FPS||[];
  if(!a.length)return 0;
  if(sec<=a[0][0])return a[0][1];
  const last=a[a.length-1];
  if(sec>=last[0])return last[1]+(sec-last[0])*133.3;
  let lo=0,hi=a.length-1;
  while(hi-lo>1){const m=(lo+hi)>>1;if(a[m][0]<=sec)lo=m;else hi=m}
  const A=a[lo],B=a[hi],q=(sec-A[0])/(B[0]-A[0]);
  return A[1]+(B[1]-A[1])*q;
};
const ribbonOpeningFallback=window.openingCardState;
window.openingCardState=function(i,sec){
  const base=ribbonOpeningFallback(i,sec),tables=window.RIBBON_OPENING_60FPS||{},table=tables['c'+i];
  if(table&&sec>=table.start){const off=ribbonSample60(table,sec);return {...base,x:[10,487,964,1441][i]+off}}
  return base;
};
const ribbonCreditsFallback=window.openingCreditsX;
window.openingCreditsX=function(sec){
  const t=window.RIBBON_OPENING_60FPS||{};
  if(t.creditsIn&&sec>=t.creditsIn.start&&sec<=1.333334)return 1441+ribbonSample60(t.creditsIn,sec);
  if(sec>1.333334&&sec<6.2)return 1441;
  if(t.creditsOut&&sec>=6.2&&sec<=6.466668)return 1441+ribbonSample60(t.creditsOut,sec);
  return ribbonCreditsFallback(sec);
};
