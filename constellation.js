(() => {
 const projects = [
  ['Jiyong Kim Pop-Up @Komune','Jiyong Kim','2026','Experiential / New York'],
  ['A-POC ABLE Matsuyama Project','Issey Miyake','2026','Exhibition / New York'],
  ['Flagship Opening Promotion','Issey Miyake','2026','Retail / New York'],
  ['Willy the Feast','Willy Chavarria','2025','Dinner / New York'],
  ['Heliot Emil New York Flagship','Heliot Emil','2025','Retail / New York']
 ];
 // Coordinates retain the supplied 1536 × 1024 composition.
 const galleryCuts={
 "19": ["komune-storefront", "Jiyong Kim at Komune \u2014 storefront window with jackets and passing pedestrians"],
 "1": [
  "matsuyama-2",
  "A-POC ABLE Matsuyama \u2014 printed textile installation"
 ],
 "3": [
  "heliot-5",
  "Heliot Emil \u2014 footwear display in the illuminated wall"
 ],
 "4": [
  "komune-1",
  "Jiyong Kim at Komune \u2014 garments suspended around the column"
 ],
 "11": [
  "heliot-interior-column",
  "Heliot Emil \u2014 illuminated interior with a sculptural column"
 ],
 "13": [
  "opening-4",
  "Issey Miyake flagship \u2014 metal counter and folded wall installation"
 ],
 "24": [
  "stage-elevation",
  "Stage elevation with arches and a suspended figure"
 ],
 "25": [
  "photography-curation-190-preview",
  "Photograph 190 \u2014 New York, 2025"
 ],
 "12": [
  "photography-curation-212-preview",
  "Photograph 212 \u2014 Seoul, 2026"
 ],
 "6": [
  "photography-curation-163-preview",
  "Photograph 163 \u2014 New York, 2025"
 ],
 "21": [
  "photography-curation-179-preview",
  "Photograph 179 \u2014 New York, 2025"
 ],
 "15": [
  "research-fashion-curated-4-preview",
  "Fashion research \u2014 study 04"
 ],
 "22": [
  "research-community-curated-4-preview",
  "Community research \u2014 study 04"
 ],
 "2": [
  "research-spatial-curated-9-preview",
  "Spatial research \u2014 study 09"
 ]
};
 const positions = [
  [468,85,58,52,'spatial',2,2.4,-2],[278,158,176,108,'spatial',2,0,3],
  [233,295,61,44,'research',4,.5,-2],[444,300,67,42,'spatial',5,.3,0],
  [588,216,108,86,'spatial',1,0,-1],[729,181,58,36,'photography',3,1,1],
  [985,162,48,50,'photography',4,1.4,2],[897,300,69,43,'photography',2,1.2,-1],
  [1326,155,63,85,'photography',5,0,0],[1169,254,174,115,'photography',1,0,-2],
  [1446,347,49,40,'photography',4,2,1],[1398,425,62,43,'spatial',4,.2,0],
  [1246,453,41,38,'photography',3,1.5,0],[35,440,60,42,'spatial',3,2,0],
  [306,430,120,86,'spatial',3,0,1],[200,512,56,44,'research',4,1,1],
  [108,590,70,90,'research',2,0,0],[201,674,134,85,'research',3,0,-1],
  [453,588,58,65,'spatial',5,1.8,1],[653,368,196,146,'spatial',1,0,0],
  [960,533,111,68,'spatial',4,0,-1],[1319,606,101,67,'photography',2,.5,-3],
  [712,702,49,33,'research',3,1,0],[1056,732,66,42,'research',5,.6,0],
  [1195,712,133,105,'spatial',5,0,4],[932,813,52,53,'photography',5,1.4,0],
  [343,816,62,49,'research',4,.3,0],[524,832,39,38,'research',1,1.7,0]
 ];
 const pageNames={spatial:'Spatial Design',photography:'Photography',research:'Research'};
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 // Alternate preview: project image centers onto the inside of a shallow sphere.
 // The original slot coordinates remain the source for both layouts.
 const spherePreview=new URLSearchParams(location.search).get('layout')==='sphere';
 const sphereMeridians='<svg class="sphere-grid" viewBox="0 0 1536 1024" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width=".8"><path d="M230 0 Q675 512 230 1024 M1306 0 Q861 512 1306 1024 M0 196 Q768 482 1536 196 M0 832 Q768 546 1536 832"/></g></svg>';
 const mobileMedia=matchMedia('(max-width:650px)');
 let mobileLayout=false,worldWidth=1536,worldHeight=1024;
 const nodePositions=[[175,368],[1123,220],[443,749],[1063,843]];
 const mobileNodePositions=[[110,420],[880,350],[170,1120],[860,1320]];
 window.createConstellation=()=>{
  mobileLayout=mobileMedia.matches;worldWidth=mobileLayout?1000:1536;worldHeight=mobileLayout?1500:1024;
  const mobileOccupied=mobileNodePositions.map(([x,y])=>({x,y,halfWidth:120,halfHeight:90}));
  const cards=positions.map(([x,y,w,h,cat,n,blur,rotation],i)=>{
   const [assetKey,title]=galleryCuts[i]||[`${cat}-${n}`,cat==='spatial'?projects[n-1][0]:`${pageNames[cat]} — ${String(n).padStart(2,'0')}`];
   let surface='';
   if(spherePreview){
    const u=(x+w/2-768)/768,v=(y+h/2-512)/512;
    const radius=Math.hypot(u,v);
    const depth=1-Math.cos(Math.min(radius,1.35)*1.2);
    const spread=.85+.21*depth;
    const cx=768+768*u*spread,cy=512+512*v*(.83+.36*u*u+.09*v*v);
    const size=.80+.91*depth;
    w*=size;h*=size;x=cx-w/2;y=cy-h/2;
    // Project the tangent plane into 2D so drifting buttons share their painted hit area.
    const yaw=-u*54*Math.PI/180,pitch=v*40*Math.PI/180;
    surface=`<div class="sphere-facet" style="transform:matrix(${Math.cos(yaw)},0,${Math.sin(yaw)*Math.sin(pitch)},${Math.cos(pitch)},0,0)">`;
   }
   if(mobileLayout){
    const centerX=(x+w/2)/1536*worldWidth,centerY=(y+h/2)/1024*worldHeight;
    x=Math.max(w*.7+12,Math.min(worldWidth-w*.7-12,centerX))-w/2;
    y=centerY-h/2;
    const halfWidth=(w+h*.12)*.625+12,halfHeight=(h+w*.08)*.625+12;
    let nearest=null,distance=Infinity;
    for(let cy=halfHeight+20;cy<=worldHeight-halfHeight-20;cy+=10){
     for(let cx=halfWidth+20;cx<=worldWidth-halfWidth-20;cx+=10){
      const d=(cx-centerX)**2+(cy-centerY)**2;
      if(d>=distance)continue;
      if(mobileOccupied.some(box=>Math.abs(cx-box.x)<halfWidth+box.halfWidth&&Math.abs(cy-box.y)<halfHeight+box.halfHeight))continue;
      nearest={x:cx,y:cy};distance=d;
     }
    }
    if(nearest){x=nearest.x-w/2;y=nearest.y-h/2;}
    mobileOccupied.push({x:x+w/2,y:y+h/2,halfWidth,halfHeight});
   }
   return `<div class="photo-orbit" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;--gather-x:${worldWidth/2-x-w/2}px;--gather-y:${worldHeight/2-y-h/2}px;--float-x:${4+(i%4)*2}px;--float-y:${6+(i%5)*2}px;--float-duration:${(17+(i%7)*2)/(1.15*1.15)}s;--float-delay:-${i*.93}s">${surface}<button class="float-photo ${i===19?'featured':''}" data-card="${i}" data-photo-category="${cat}" aria-label="Enlarge ${esc(title)}" style="--blur:${blur}px;--rotation:${rotation}deg;--opacity:${blur>1?.78:1}"><img src="assets/home-previews/${assetKey}.webp" alt="${esc(title)}" draggable="false" decoding="async"></button>${surface?'</div>':''}</div>`;
  }).join('');
  const nodes=[['Spatial','Spatial Design',175,368,'#D9392F'],['Photography','Photography',1123,220,'#FACF4F'],['Research','Research',443,749,'#34984B'],['About','About',1063,843,'#47579D']].map(([label,page,x,y,color],i)=>{[x,y]=(mobileLayout?mobileNodePositions:nodePositions)[i];return `<button class="category-node" ${label==='About'?'data-page="About"':`data-category="${label.toLowerCase()}" aria-pressed="false"`} aria-label="${label}" style="left:${x-26}px;top:${y-26}px;--node-color:${color}"><span class="node-disc" aria-hidden="true"></span><span class="node-label" aria-hidden="true">${label}</span></button>`;}).join('');
  return `<section class="constellation ${mobileLayout?'mobile-map':''}" aria-label="Portfolio constellation — drag to explore; use controls to zoom" tabindex="0"><div class="constellation-stage" style="width:${worldWidth}px;height:${worldHeight}px"><img class="constellation-lines" src="constellation-lines.svg" alt=""><svg class="category-connections" viewBox="0 0 ${worldWidth} ${worldHeight}" aria-hidden="true"></svg>${spherePreview?sphereMeridians:''}${cards}${nodes}</div><div class="constellation-help">Drag / swipe to explore</div><div class="constellation-controls"><span class="zoom-copy">Scroll to zoom</span><button data-zoom="out" aria-label="Zoom out">−</button><button data-zoom="reset" class="reset" aria-label="Reset view">Reset</button><button data-zoom="in" aria-label="Zoom in">+</button></div></section>`;
 };
 mobileMedia.addEventListener('change',()=>{
  if(document.querySelector('.constellation'))document.querySelector('#minseo-plan header [data-page="Home"]')?.click();
 });
 let cleanup=()=>{};
 window.initConstellation=()=>{
  cleanup();
  const scene=document.querySelector('.constellation');if(!scene)return;
  const stage=scene.querySelector('.constellation-stage');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const connectionLayer=scene.querySelector('.category-connections');
  const categoryOrigins={spatial:[175,368,'#D9392F'],photography:[1123,220,'#FACF4F'],research:[443,749,'#34984B']};
  if(mobileLayout)Object.keys(categoryOrigins).forEach((category,i)=>{categoryOrigins[category]=[...mobileNodePositions[i],categoryOrigins[category][2]];});
  // Store spread offsets from resting coordinates, so repeated selections never drift.
  for(const category of Object.keys(categoryOrigins)){
   const orbits=[...scene.querySelectorAll('[data-photo-category="'+category+'"]')].map(card=>card.closest('.photo-orbit'));
   const centers=orbits.map(orbit=>({x:parseFloat(orbit.style.left)+parseFloat(orbit.style.width)/2,y:parseFloat(orbit.style.top)+parseFloat(orbit.style.height)/2}));
   const centerX=centers.reduce((sum,p)=>sum+p.x,0)/centers.length;
   const centerY=centers.reduce((sum,p)=>sum+p.y,0)/centers.length;
   const frames=orbits.map((orbit,i)=>{
    const width=parseFloat(orbit.style.width),height=parseFloat(orbit.style.height);
    const categoryScale=Math.max(1.5,Math.min(2.5,150/Math.sqrt(width*height)));
    orbit.style.setProperty('--category-scale',categoryScale);
    // Reserve room for hover enlargement, rotation, and the floating motion.
    const halfWidth=(width+height*(mobileLayout?.1:.25))*1.25*categoryScale*(mobileLayout?.5:.55)+(mobileLayout?12:24);
    const halfHeight=(height+width*.09)*1.25*categoryScale*(mobileLayout?.5:.55)+(mobileLayout?12:24);
    return {orbit,halfWidth,halfHeight,x:centers[i].x+(centers[i].x-centerX)*.22,y:centers[i].y+(centers[i].y-centerY)*.22};
   });
   const obstacles=[...scene.querySelectorAll('.category-node')].map(node=>({
    x:parseFloat(node.style.left)+26,y:parseFloat(node.style.top)+26,halfWidth:mobileLayout?85:40,halfHeight:mobileLayout?75:40
   }));
   // Place large frames first, then find the nearest free space for each smaller one.
   const occupied=[...obstacles];
   const bySize=[...frames].sort((a,b)=>b.halfWidth*b.halfHeight-a.halfWidth*a.halfHeight);
   for(const frame of bySize){
    let best=null,bestDistance=Infinity;
    for(let y=frame.halfHeight;y<=worldHeight-frame.halfHeight;y+=12){
     for(let x=frame.halfWidth;x<=worldWidth-frame.halfWidth;x+=12){
      const distance=(x-frame.x)**2+(y-frame.y)**2;
      if(distance>=bestDistance)continue;
      const blocked=occupied.some(other=>Math.abs(x-other.x)<frame.halfWidth+other.halfWidth&&Math.abs(y-other.y)<frame.halfHeight+other.halfHeight);
      if(!blocked){best={x,y};bestDistance=distance;}
     }
    }
    if(best){frame.x=best.x;frame.y=best.y;}
    occupied.push(frame);
   }
   frames.forEach((frame,i)=>{
    frame.orbit.style.setProperty('--category-x',(frame.x-centers[i].x)+'px');
    frame.orbit.style.setProperty('--category-y',(frame.y-centers[i].y)+'px');
   });
  }
  let selectedCategory='',connectionFrame=0,connections=[];
  function updateConnections(){
   if(!selectedCategory||!scene.isConnected)return;
   const rect=stage.getBoundingClientRect(),unit=rect.width/worldWidth;
   for(const {card,line,dot} of connections){
    const box=card.getBoundingClientRect();
    const x=(box.left+box.width/2-rect.left)/unit,y=(box.top-rect.top)/unit-9;
    line.setAttribute('x2',x);line.setAttribute('y2',y);dot.setAttribute('cx',x);dot.setAttribute('cy',y);
   }
   connectionFrame=requestAnimationFrame(updateConnections);
  }
  function selectCategory(category){
   cancelAnimationFrame(connectionFrame);selectedCategory=category;connections=[];
   scene.classList.toggle('category-selected',!!category);connectionLayer.replaceChildren();
   scene.querySelectorAll('[data-category]').forEach(node=>node.setAttribute('aria-pressed',String(node.dataset.category===category)));
   scene.querySelectorAll('.float-photo').forEach(card=>{
    const active=!!category&&card.dataset.photoCategory===category;
    card.closest('.photo-orbit').classList.toggle('category-expanded',active);
    card.classList.toggle('category-match',active);card.classList.toggle('category-muted',!!category&&!active);
    if(!active)return;
    const [x,y,color]=categoryOrigins[category];
    const line=document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',x);line.setAttribute('y1',y);line.setAttribute('stroke',color);
    const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');dot.setAttribute('r','2.4');dot.setAttribute('fill',color);
    connectionLayer.append(line,dot);connections.push({card,line,dot});
   });
   if(category)updateConnections();
  }
  scene.addEventListener('click',e=>{
   const node=e.target.closest('[data-category]');if(!node)return;
   e.preventDefault();e.stopPropagation();selectCategory(selectedCategory===node.dataset.category?'':node.dataset.category);
  });
  scene.addEventListener('keydown',e=>{if(e.key==='Escape'&&selectedCategory){selectCategory('');}});

  let scale=1,base=1,dx=0,dy=0,drag=null;
  let targetScale=1,targetX=0,targetY=0,frame=0,lastTime=0;
  function paint(){stage.style.transform=`translate3d(${dx}px,${dy}px,0) scale(${scale})`;}
  function advance(now){
   const alpha=reduced.matches?1:1-Math.exp(-Math.min(now-lastTime,64)/100);lastTime=now;
   dx+=(targetX-dx)*alpha;dy+=(targetY-dy)*alpha;scale+=(targetScale-scale)*alpha;
   if(Math.abs(targetX-dx)<.05&&Math.abs(targetY-dy)<.05&&Math.abs(targetScale-scale)<.00005){dx=targetX;dy=targetY;scale=targetScale;frame=0;paint();return;}
   paint();frame=requestAnimationFrame(advance);
  }
  function constrain(){
   // The centered minimum-zoom viewport is the full explorable world.
   const ratio=Math.max(1,targetScale/(base*.925));
   const centerX=(scene.clientWidth-worldWidth*targetScale)/2;
   const centerY=(scene.clientHeight-worldHeight*targetScale)/2;
   const rangeX=scene.clientWidth*(ratio-1)/2,rangeY=scene.clientHeight*(ratio-1)/2;
   targetX=Math.max(centerX-rangeX,Math.min(centerX+rangeX,targetX));
   targetY=Math.max(centerY-rangeY,Math.min(centerY+rangeY,targetY));
   scene.classList.toggle('can-pan',ratio>1.0001);
  }
  function smooth(){constrain();if(!frame){lastTime=performance.now();frame=requestAnimationFrame(advance);}}
  function reset(){
   cancelAnimationFrame(frame);frame=0;
   base=Math.min(scene.clientWidth/worldWidth,(scene.clientHeight-(mobileLayout?150:0))/worldHeight);
   scale=targetScale=base*.925;dx=targetX=(scene.clientWidth-worldWidth*scale)/2;dy=targetY=(scene.clientHeight-worldHeight*scale)/2;constrain();paint();
  }
  function zoom(factor,cx=scene.clientWidth/2,cy=scene.clientHeight/2){
   // Reference screenshot: map width is approximately 92.5% of the fitted canvas.
   const next=Math.max(base*.925,Math.min(base*2.8,targetScale*factor));
   targetX=cx-(cx-targetX)*next/targetScale;targetY=cy-(cy-targetY)*next/targetScale;targetScale=next;smooth();
  }
  function pan(x,y){targetX+=x;targetY+=y;smooth();}
  scene.addEventListener('pointerdown',e=>{if(e.target.closest('button')||targetScale<=base*.925+.00001)return;cancelAnimationFrame(frame);frame=0;targetX=dx;targetY=dy;targetScale=scale;drag={x:e.clientX,y:e.clientY,dx,dy};scene.setPointerCapture(e.pointerId);scene.classList.add('is-dragging');});
  scene.addEventListener('pointermove',e=>{if(!drag)return;targetX=drag.dx+e.clientX-drag.x;targetY=drag.dy+e.clientY-drag.y;smooth();});
  const end=()=>{drag=null;scene.classList.remove('is-dragging');};scene.addEventListener('pointerup',end);scene.addEventListener('pointercancel',end);
  // Shared gesture gain and easing; map scroll distance to zoom travel at a
  // 140px reference radius so zoom and pan feel similarly responsive.
  const scrollGain=.3,zoomReferenceRadius=140;
  let wheelMode='zoom',lastWheel=0;
  scene.addEventListener('wheel',e=>{
   e.preventDefault();const unit=e.deltaMode===1?16:e.deltaMode===2?scene.clientHeight:1;
   const x=e.deltaX*unit,y=e.deltaY*unit,now=performance.now();
   if(e.ctrlKey||e.metaKey)wheelMode='zoom';
   else if(now-lastWheel>180)wheelMode=(e.shiftKey||Math.abs(x)>Math.abs(y)*.7)?'pan':'zoom';
   else if(e.shiftKey||Math.abs(x)>Math.abs(y)*.7&&Math.abs(x)>1)wheelMode='pan';
   lastWheel=now;
   if(wheelMode==='pan'&&!e.ctrlKey&&!e.metaKey){pan(-(e.shiftKey&&!x?y:x)*scrollGain,(e.shiftKey?0:-y)*scrollGain);return;}
   const r=scene.getBoundingClientRect();zoom(Math.exp(-y*scrollGain/zoomReferenceRadius),e.clientX-r.left,e.clientY-r.top);
  },{passive:false});
  scene.addEventListener('click',e=>{const b=e.target.closest('[data-zoom]');if(b){if(b.dataset.zoom==='reset'){selectCategory('');reset();}else zoom(b.dataset.zoom==='in'?1.2:1/1.2);}});
  scene.addEventListener('keydown',e=>{if(e.target!==scene)return;if(e.key==='0')reset();else if(e.key==='+'||e.key==='=')zoom(1.2);else if(e.key==='-')zoom(1/1.2);else if(e.key.startsWith('Arrow')){e.preventDefault();pan(e.key==='ArrowLeft'?40:e.key==='ArrowRight'?-40:0,e.key==='ArrowUp'?40:e.key==='ArrowDown'?-40:0);}});
  const resize=new ResizeObserver(reset);resize.observe(scene);reset();
  const imageViewer=document.createElement('dialog');
  imageViewer.className='constellation-lightbox';
  imageViewer.setAttribute('aria-label','Enlarged photograph');
  imageViewer.innerHTML='<img alt=""><button type="button" aria-label="Close enlarged image">×</button>';
  document.body.append(imageViewer);
  const enlarged=imageViewer.querySelector('img');let imageTrigger=null,closeTimer=0,openFrame=0;
  function closeImage(){
   if(!imageViewer.open||closeTimer)return;
   cancelAnimationFrame(openFrame);imageViewer.classList.remove('is-visible');
   if(reduced.matches){imageViewer.close();return;}
   closeTimer=setTimeout(()=>{closeTimer=0;if(imageViewer.open)imageViewer.close();},280);
  }
  const aboutPanel=document.querySelector('#constellation-about').content.firstElementChild.cloneNode(true);
  aboutPanel.hidden=true;imageViewer.prepend(aboutPanel);
  const closeButton=imageViewer.querySelector('button');
  function openViewer(trigger,isAbout){
   imageTrigger=trigger;aboutPanel.hidden=!isAbout;enlarged.hidden=isAbout;
   imageViewer.setAttribute('aria-label',isAbout?'About Minseo Kim':'Enlarged photograph');
   closeButton.setAttribute('aria-label',isAbout?'Close About':'Close enlarged image');
   if(!isAbout){
    const image=trigger.querySelector('img');
    enlarged.src=image.currentSrc||image.src;enlarged.alt=image.alt;
   }
   scene.classList.add('image-open');imageViewer.classList.remove('is-visible');imageViewer.showModal();
   openFrame=requestAnimationFrame(()=>{openFrame=requestAnimationFrame(()=>{if(imageViewer.open)imageViewer.classList.add('is-visible');});});
  }
  scene.addEventListener('click',e=>{
   const card=e.target.closest('.float-photo');if(!card)return;
   e.preventDefault();e.stopPropagation();openViewer(card,false);
  });
  const triggers=document.querySelectorAll('#minseo-plan [data-page="About"]');
  function openAbout(e){e.preventDefault();e.stopPropagation();openViewer(e.currentTarget,true);}
  for(const trigger of triggers){trigger.setAttribute('aria-haspopup','dialog');trigger.addEventListener('click',openAbout);}
  imageViewer.addEventListener('click',e=>{if(e.target===imageViewer||e.target===closeButton)closeImage();});
  imageViewer.addEventListener('cancel',e=>{e.preventDefault();closeImage();});
  imageViewer.addEventListener('close',()=>{
   clearTimeout(closeTimer);closeTimer=0;cancelAnimationFrame(openFrame);imageViewer.classList.remove('is-visible');
   scene.classList.remove('image-open');enlarged.removeAttribute('src');
   if(imageTrigger?.isConnected)imageTrigger.focus({preventScroll:true});
  });
  let disposed=false;const animations=[];
  cleanup=()=>{for(const trigger of triggers)trigger.removeEventListener('click',openAbout);disposed=true;cancelAnimationFrame(connectionFrame);clearTimeout(closeTimer);cancelAnimationFrame(openFrame);imageViewer.remove();cancelAnimationFrame(frame);resize.disconnect();animations.forEach(a=>a.cancel());reduced.removeEventListener('change',motionPreference);};
  function motionPreference(){if(reduced.matches){animations.forEach(a=>a.cancel());scene.classList.add('is-ready');}}
  reduced.addEventListener('change',motionPreference);
  async function reveal(){
   await Promise.all([...scene.querySelectorAll('.float-photo img')].map(img=>img.decode().catch(()=>{})));
   if(disposed)return;
   if(reduced.matches){scene.classList.add('is-ready');return;}
   scene.classList.add('is-ready');
   scene.querySelectorAll('.photo-orbit').forEach((orbit,i)=>{
    const x=parseFloat(orbit.style.left),y=parseFloat(orbit.style.top),w=parseFloat(orbit.style.width),h=parseFloat(orbit.style.height);
    const gx=worldWidth/2-x-w/2,gy=worldHeight/2-y-h/2;
    const angle=(i*137.5)*Math.PI/180;
    const latitude=1-2*(i+.5)/positions.length,ring=Math.sqrt(1-latitude*latitude);
    const sx=Math.cos(angle)*ring*105,sy=latitude*105,depth=(Math.sin(angle)*ring+1)/2;
    const gathered=`translate(${gx+sx}px,${gy+sy}px) scale(${.36+depth*.24}) rotate(${(i%7-3)*5}deg)`;
    animations.push(orbit.animate([
     {transform:`translate(${gx+sx*1.5}px,${gy+sy*1.5}px) scale(.35)`,opacity:0,offset:0},
     {transform:gathered,opacity:.85,offset:.19},
     {transform:gathered,opacity:1,offset:.28},
     {transform:'translate(0,0) scale(1) rotate(0deg)',opacity:1,offset:1}
    ],{duration:2900+(i%5)*110,easing:'cubic-bezier(.22,.68,.12,1)',fill:'backwards'}));
   });
   const lines=scene.querySelector('.constellation-lines');
   animations.push(lines.animate([{opacity:0,transform:'scale(.12)'},{opacity:1,transform:'scale(1)'}],{duration:2400,delay:650,easing:'cubic-bezier(.2,.7,.15,1)',fill:'backwards'}));
   scene.querySelectorAll('.category-node').forEach((node,i)=>{
    const gx=worldWidth/2-parseFloat(node.style.left)-26,gy=worldHeight/2-parseFloat(node.style.top)-26;
    animations.push(node.animate([{opacity:0,transform:`translate(${gx}px,${gy}px) scale(.2)`},{opacity:1,transform:'translate(0,0) scale(1)'}],{duration:2400,delay:650+i*70,easing:'cubic-bezier(.2,.7,.15,1)',fill:'backwards'}));
   });
  }
  reveal();
 };
})();
