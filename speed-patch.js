(()=>{
const SPEED=133.6;window.RIBBON_STEADY_SPEED=SPEED;
window.scrollAt=function(sec){
  const a=window.RIBBON_SCROLL_60FPS||[];
  if(!a.length)return 0;if(sec<=a[0][0])return a[0][1];
  const last=a[a.length-1];if(sec>=last[0])return last[1]+(sec-last[0])*SPEED;
  let lo=0,hi=a.length-1;while(hi-lo>1){const m=(lo+hi)>>1;if(a[m][0]<=sec)lo=m;else hi=m}
  const A=a[lo],B=a[hi],q=(sec-A[0])/(B[0]-A[0]);return A[1]+(B[1]-A[1])*q;
};
window.drawSteadyBadges=function(list,positions,sec,off){
  const {hero,heroX}=steadyHero(list,off);
  for(let i=0;i<Math.min(4,list.length);i++){const x=positions[i];if(x!=null&&x>-CARD_W&&x<W)drawBadgeVisual(list[i],x+CARD_W/2,tier(3).top,tier(3).w)}
  if(hero<4)return;
  const age=(HERO_TRIGGER_X-heroX)/SPEED,duration=window.RIBBON_STEADY_BADGE?.tierDuration??.48,q=smooth(age/duration);
  for(let i=4;i<=hero;i++){
    const x=positions[i];if(x==null||x<-CARD_W||x>W)continue;
    const rank=hero-i,now=tier(rank),before=tier(Math.max(0,rank-1));let w,top;
    if(rank===0){w=now.w;top=sampledFallTop(age)}else{w=lerp(before.w,now.w,q);top=lerp(before.top,now.top,q)}
    const sc=window.RIBBON_STEADY_BADGE?.shine||{startAge:.60,endAge:1.17,opacity:.34};
    const shineQ=rank===0?(age-sc.startAge)/(sc.endAge-sc.startAge):null;
    drawBadgeVisual(list[i],x+CARD_W/2,top,w,{shineQ,shineOpacity:sc.opacity});
  }
};
})();
