(()=>{
const proto=CanvasRenderingContext2D?.prototype;
const fs=proto&&Object.getOwnPropertyDescriptor(proto,'fillStyle');
if(fs?.set&&fs?.get){
  Object.defineProperty(proto,'fillStyle',{
    configurable:fs.configurable,enumerable:fs.enumerable,
    get(){return fs.get.call(this)},
    set(v){
      if(v==='rgb(100,97,88)')v='rgb(99,94,87)';
      else if(v==='#0b0b0b')v='#111111';
      else if(v==='#090909')v='#000000';
      fs.set.call(this,v);
    }
  });
}
window.drawBadgeVisual=function(card,cx,top,w,opt={}){
  const h=w*1.144;
  ctx.save();
  ctx.shadowColor='rgba(0,0,0,.40)';ctx.shadowBlur=Math.max(12,w*.052);ctx.shadowOffsetY=Math.max(8,w*.036);
  ctx.fillStyle='rgb(211,8,9)';hexPath(cx,top,w,h);ctx.fill();
  ctx.shadowColor='transparent';
  badgeText(card,cx,top,w,h,opt.textAlpha??1,opt.blur??0);
  if(opt.shineQ!=null)badgeShine(cx,top,w,h,opt.shineQ,opt.shineOpacity??.34);
  ctx.restore();
};
try{render(+scrub.value)}catch{}
})();
