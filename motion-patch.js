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
