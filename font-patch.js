(()=>{
const proto=CanvasRenderingContext2D?.prototype;
const desc=proto&&Object.getOwnPropertyDescriptor(proto,'font');
if(desc?.set&&desc?.get){
  Object.defineProperty(proto,'font',{
    configurable:desc.configurable,enumerable:desc.enumerable,
    get(){return desc.get.call(this)},
    set(v){
      let s=String(v),m=s.match(/^(\d+)\s+(\d+)px\s+Nunito/i);
      if(m){
        const weight=+m[1],px=+m[2];let family='RibbonPinHeavy',out=px;
        if(weight===900&&px===42){out=50;family='RibbonPinHeavy'}
        else if(weight===700&&px===25){out=29;family='RibbonPinHeavy'}
        else if(weight===900&&px>=55){out=Math.round(px*(84/68));family='RibbonPinBold'}
        else if(weight===800&&px>=28&&px<=50){out=Math.round(px*(39/33));family='RibbonPinBold'}
        else if(weight>=800){family='RibbonPinHeavy'}
        else if(weight>=600){family='RibbonPinBold'}
        else if(weight>=500){family='RibbonPinMedium'}
        else family='RibbonPinRegular';
        s=s.replace(/^\d+\s+\d+px\s+Nunito/i,`${weight} ${out}px '${family}', Nunito`);
      }
      desc.set.call(this,s);
    }
  });
}
const aside=document.querySelector('aside');
if(aside){
  const box=document.createElement('div');box.className='tiny';
  box.innerHTML='<label style="display:block;margin-bottom:5px">Pin Sans files <span style="opacity:.65">(optional exact font)</span></label><input id="pinFontFiles" type="file" accept=".ttf,.otf" multiple style="max-width:100%"><div id="pinFontState" style="margin-top:4px">Fallback active until Pin Sans is loaded.</div>';
  const dataLabel=[...aside.querySelectorAll('label')].find(x=>x.textContent.includes('Editable data'));
  aside.insertBefore(box,dataLabel||null);
  const inp=box.querySelector('#pinFontFiles'),state=box.querySelector('#pinFontState');
  inp.addEventListener('change',async()=>{
    let loaded=[];
    for(const file of inp.files){
      const n=file.name.toLowerCase();let family=n.includes('heavy')?'RibbonPinHeavy':n.includes('bold')?'RibbonPinBold':n.includes('medium')?'RibbonPinMedium':n.includes('regular')?'RibbonPinRegular':null;
      if(!family)continue;
      try{const face=new FontFace(family,`url(${URL.createObjectURL(file)})`);await face.load();document.fonts.add(face);loaded.push(family.replace('RibbonPin',''))}catch(e){console.warn(e)}
    }
    state.textContent=loaded.length?`Loaded: ${[...new Set(loaded)].join(', ')}`:'No recognised Pin Sans weights loaded.';
    try{render(+scrub.value)}catch{}
  });
}
try{render(+scrub.value)}catch{}
})();
