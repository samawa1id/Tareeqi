const $=s=>document.querySelector(s),LOGO='assets/logo.webp';
const B={x0:31.16,x1:31.34,y0:29.94,y1:30.14,W:360,H:460};
const P=(a,o)=>[(o-B.x0)/(B.x1-B.x0)*B.W,(B.y1-a)/(B.y1-B.y0)*B.H];
const U=(x,y)=>[B.y1-y/B.H*(B.y1-B.y0),B.x0+x/B.W*(B.x1-B.x0)];
const NILE=[[29.94,31.275],[29.97,31.245],[30,31.231],[30.03,31.228],[30.06,31.222],[30.09,31.219],[30.115,31.235],[30.14,31.265]];
const ROADS=[['Corniche El Nile',NILE.map(([a,o])=>[a,o+.004])],['Salah Salem Rd',[[30.075,31.32],[30.045,31.285],[30.01,31.268],[29.975,31.262],[29.945,31.27]]],['26th of July Corridor',[[30.062,31.205],[30.064,31.24],[30.072,31.28],[30.08,31.33]]],['Faisal St',[[30.013,31.209],[29.998,31.19],[29.98,31.175]]],['Al Haram St',[[30.013,31.209],[29.99,31.175],[29.97,31.16]]],['Ring Road',[[29.95,31.165],[29.952,31.22],[29.955,31.3],[29.96,31.34]]],['Ramses St',[[30.0444,31.2357],[30.0626,31.2467]]]];
const DIST=[['Tahrir',30.0444,31.2357],['Zamalek',30.062,31.219],['Dokki',30.038,31.2],['Giza',30.013,31.209],['Mohandessin',30.056,31.2],['Maadi',29.96,31.257],['Nasr City',30.06,31.33],['Heliopolis',30.09,31.32],['Shubra',30.11,31.245],['Garden City',30.037,31.231],['Mokattam',30.0,31.3],['Imbaba',30.08,31.2]];
const CATS=[['Pothole','pot'],['Damaged sign','sign'],['Streetlight','light'],['Flooding','water'],['Cracked road','crack'],['Other','more']];
const SEV=['Low','Medium','High'],STG=['Reported','Verified','Assigned','Repaired'];
const I={pin:'<path d="M12 21s-7-6.200-7-11.500a7 7 0 0 1 14 0C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/>',home:'<path d="M4 11l8-7 8 7v9H4z"/>',bell:'<path d="M6 17V11a6 6 0 0 1 12 0v6l1.500 2h-15z"/><path d="M10 21h4"/>',list:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',plus:'<path d="M12 5v14M5 12h14"/>',cam:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.500"/>',pot:'<ellipse cx="12" cy="14" rx="8" ry="4"/><path d="M4 14V9M20 14V9M7 9l2-3M17 9l-2-3"/>',sign:'<path d="M12 3l9 9-9 9-9-9z"/><path d="M12 8v5M12 16h.01"/>',light:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.500 10.900V16h7v-2.100A6 6 0 0 0 12 3z"/>',water:'<path d="M12 3s6 6.500 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11z"/>',crack:'<path d="M3 5l6 5-3 3 7 3-2 4M15 4l-2 5 6 3"/>',more:'<circle cx="6" cy="12" r="1.500"/><circle cx="12" cy="12" r="1.500"/><circle cx="18" cy="12" r="1.500"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.400 3.600-7 8-7s8 2.600 8 7"/>',chk:'<path d="M5 12.500l4.500 4.500L19 7"/>',loc:'<circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>'};
const ic=(n,s=22)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const cic=t=>(CATS.find(c=>c[0]===t)||CATS[5])[1];
const pts=l=>l.map(([a,o])=>P(a,o).map(n=>n.toFixed(1)).join(',')).join(' ');
function dseg(p,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy)}
function where(x,y){let best=[1e9,''];for(const[n,l]of ROADS){const q=l.map(([a,o])=>P(a,o));for(let i=0;i<q.length-1;i++){const d=dseg([x,y],q[i],q[i+1]);if(d<best[0])best=[d,n]}}
 const dn=DIST.map(([n,a,o])=>{const[px,py]=P(a,o);return[Math.hypot(px-x,py-y),n]}).sort((a,b)=>a[0]-b[0])[0][1];return best[0]<16?best[1]+', '+dn:'Near '+dn}
const BASE=`<rect width="360" height="460" fill="#EEF1F4"/><polyline points="${pts(NILE)}" fill="none" stroke="#CDE9F8" stroke-width="30" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="${P(30.057,31.222)[0]}" cy="${P(30.057,31.222)[1]}" rx="5" ry="16" fill="#DCEFE2"/>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">${['#C9D0DA|9','#fff|6.500'].map(s=>{const[c,w]=s.split('|');return `<g stroke="${c}" stroke-width="${w}">${ROADS.map(r=>`<polyline points="${pts(r[1])}"/>`).join('')}</g>`}).join('')}</g>
<g font-family="Inter" font-size="8.500" fill="#7B8798">${DIST.map(([n,a,o])=>{const[x,y]=P(a,o);return `<text x="${x+6}" y="${y-5}">${n}</text><circle cx="${x}" cy="${y}" r="2" fill="#A5AFBD"/>`}).join('')}<text x="${P(30.1,31.222)[0]-34}" y="${P(30.1,31.222)[1]}" fill="#3E86B0" font-style="italic">River Nile</text></g>`;
const col=r=>r.stage>2?'#9AA6B6':r.sev==='Low'?'#0EA5E9':'#F97316';
function vbox(){const z=S.z,w=360/z,h=460/z;return{w,h,x:Math.max(0,Math.min(360-w,S.zc[0]-w/2)),y:Math.max(0,Math.min(460-h,S.zc[1]-h/2))}}
function mapSVG(id,list,pin){const v=vbox(),k=1/Math.sqrt(S.z);
 const pk=pin?(()=>{const[x,y]=P(pin[0],pin[1]);return `<g transform="translate(${x} ${y}) scale(${k})"><circle r="18" fill="#0EA5E9" opacity=".2"/><path d="M0 4c-3-8-11-12-11-20a11 11 0 0 1 22 0c0 8-8 12-11 20z" fill="#F97316" stroke="#fff" stroke-width="2"/><circle cy="-16" r="4" fill="#fff"/></g>`})():'';
 return `<svg viewBox="${v.x} ${v.y} ${v.w} ${v.h}" id="${id}" class="msvg" style="touch-action:${S.z>1?'none':'pan-y'}" role="img" aria-label="Map of Greater Cairo">${BASE}${list.map(r=>{const[x,y]=P(r.lat,r.lng),on=S.sel===r.id;return `<g class="mk" data-a="open" data-v="${r.id}" tabindex="0" style="cursor:pointer" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${k})"><circle r="24" fill="transparent"/><circle r="${on?20:14}" fill="${col(r)}" opacity=".2"/><circle r="8" fill="${col(r)}" stroke="#fff" stroke-width="2.5"/></g>`}).join('')}${pk}</svg><div class="zb"><button data-a="zin" aria-label="Zoom in">+</button><button data-a="zout" aria-label="Zoom out">\u2212</button></div>`}
const NOW=Date.now(),H=36e5;
const DEMO=[
 {id:'d1',t:'Pothole',sev:'High',lat:29.96,lng:31.259,street:'Corniche El Nile, Maadi',desc:'Deep pothole in the right lane.',ts:NOW-50*H,stage:2,conf:Array.from({length:14},(_,i)=>'u'+i),by:'demo'},
 {id:'d2',t:'Flooding',sev:'High',lat:30.004,lng:31.1975,street:'Faisal St, Giza',desc:'Standing water after rain.',ts:NOW-20*H,stage:1,conf:Array.from({length:9},(_,i)=>'u'+i),by:'demo'},
 {id:'d3',t:'Damaged sign',sev:'Medium',lat:30.045,lng:31.285,street:'Salah Salem Rd, Nasr City',desc:'Stop sign bent at the junction.',ts:NOW-9*H,stage:1,conf:Array.from({length:5},(_,i)=>'u'+i),by:'demo'},
 {id:'d4',t:'Streetlight',sev:'Low',lat:30.0632,lng:31.225,street:'26th of July Corridor, Zamalek',desc:'Light out for a full block.',ts:NOW-5*H,stage:0,conf:['u1','u2','u3'],by:'demo'},
 {id:'d5',t:'Cracked road',sev:'High',lat:29.9505,lng:31.22,street:'Ring Road, Maadi',desc:'Wide crack across two lanes.',ts:NOW-3*H,stage:0,conf:Array.from({length:7},(_,i)=>'u'+i),by:'demo'},
 {id:'d6',t:'Pothole',sev:'Medium',lat:30.053,lng:31.241,street:'Ramses St, Tahrir',desc:'Patched by the district crew.',ts:NOW-120*H,stage:3,conf:Array.from({length:11},(_,i)=>'u'+i),by:'demo'}];
const S={scr:'splash',cat:null,sev:1,photo:null,desc:'',pin:null,sel:null,filter:'All',auth:false,toast:'',reports:[],uid:null,z:1,zc:[180,230]};
const app=$('#app');
const ago=t=>{const m=(Date.now()-t)/6e4;return m<1?'just now':m<60?Math.round(m)+' min ago':m<1440?Math.round(m/60)+' h ago':Math.round(m/1440)+' d ago'};
const lget=k=>{try{return localStorage.getItem(k)}catch(e){return null}},lset=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
function loadLocal(){try{S.reports=JSON.parse(lget('tq_reports'))||DEMO.map(d=>({...d}))}catch(e){S.reports=DEMO.map(d=>({...d}))}}
const saveLocal=()=>lset('tq_reports',JSON.stringify(S.reports));
const mine=()=>S.reports.filter(r=>r.by===S.uid).sort((a,b)=>b.ts-a.ts);
const open=()=>S.reports.filter(r=>r.stage<3).sort((a,b)=>b.ts-a.ts);
const trk=s=>`<div class="track">${STG.map((n,i)=>`<div class="${i<=s?'d':''} ${i===s&&s<3?'c':''}">${n}</div>`).join('')}</div>`;
const rowR=r=>`<button class="row" data-a="open" data-v="${r.id}"><div class="ic ${r.stage>2?'g':r.sev==='Low'?'b':''}">${ic(cic(r.t))}</div><div><p>${r.t}</p><small>${r.street}</small></div><div class="go"><span class="tag ${r.stage>2?'ok':r.sev==='Low'?'bl':''}">${r.stage>2?'Repaired':r.sev}</span><br>${r.conf.length} confirmed</div></button>`;
const topbar=()=>`<div class="top"><img class="tlogo" src="${LOGO}" alt="Tareeqi"><span class="pill">Cairo pilot</span></div>`;
function view(){
 const o=open(),m=mine();
 if(S.scr==='home')return `${topbar()}<div class="hero"><h2>Smarter Roads. Safer Lives.</h2><p>See a hazard in Cairo, Giza or Alexandria? Report it in under a minute and follow the repair.</p><button class="btn" data-a="go" data-v="report" style="width:auto;padding:12px 18px">${ic('plus',18)}Report a problem</button></div>
 <div class="stats"><div class="o"><b>${o.length}</b><span>Open alerts</span></div><div><b>${m.length}</b><span>My reports</span></div><div><b>${S.reports.length-o.length}</b><span>Repaired</span></div></div>
 <h3>Latest road alerts</h3>${o.slice(0,5).map(rowR).join('')||'<p class="empty">No open alerts. Roads look clear.</p>'}<button class="btn ghost" data-a="go" data-v="alerts" style="margin-top:8px">Open alerts map</button>`;
 if(S.scr==='report')return `<h2>Report a problem</h2><p class="sub">Tell us what you see. It takes about a minute.</p>
 <div class="cats">${CATS.map((c,i)=>`<button class="cat ${S.cat===i?'on':''}" data-a="cat" data-v="${i}">${ic(c[1],24)}${c[0]}</button>`).join('')}</div>
 <h3>How dangerous is it?</h3><div class="seg">${SEV.map((s,i)=>`<button data-a="sev" data-v="${i}" class="${S.sev===i?'on':''}">${s}</button>`).join('')}</div>
 <label class="photo">${S.photo?`<img src="${S.photo}" alt="Your photo">`:ic('cam',26)}<div><b style="color:var(--navy);font-size:14px">${S.photo?'Photo added':'Add a photo'}</b><br>${S.photo?'Tap to replace':'Take or choose one. It helps crews find it.'}</div><input type="file" accept="image/*" capture="environment" id="file"></label>
 <textarea id="desc" placeholder="Add details (optional)" aria-label="Details">${S.desc}</textarea><button class="btn" data-a="loc">Next: choose location</button>`;
 if(S.scr==='loc'){const[a,o2]=S.pin,[x,y]=P(a,o2);return `<h2>Where is it?</h2><p class="sub">Tap the map to move the pin, or use your location.</p><div class="map">${mapSVG('pick',[],S.pin)}</div>
 <div class="addr"><span style="color:#C2570C">${ic('pin')}</span><div><b>${where(x,y)}</b>${a.toFixed(4)}, ${o2.toFixed(4)}</div></div>
 <div class="addr" style="background:#FFF1E6"><span style="color:#C2570C">${ic(CATS[S.cat][1])}</span><div><b>${CATS[S.cat][0]}</b>${SEV[S.sev]} risk${S.photo?' · 1 photo':''}</div></div>
 <button class="btn ghost" data-a="me" style="margin-bottom:8px">${ic('loc',18)}Use my location</button><button class="btn" data-a="submit">Submit report</button><button class="btn ghost" data-a="go" data-v="report" style="margin-top:8px">Back</button>`}
 if(S.scr==='alerts'){const f=['All','High risk','Pothole','Flooding'],L=o.filter(r=>S.filter==='All'||(S.filter==='High risk'?r.sev==='High':r.t===S.filter));
 return `<h2>Nearby road alerts</h2><p class="sub">${L.length} open hazards reported by drivers.</p><div class="chips">${f.map(x=>`<button class="chip ${S.filter===x?'on':''}" data-a="f" data-v="${x}">${x}</button>`).join('')}</div><div class="map">${mapSVG('almap',L)}</div>${L.map(rowR).join('')||'<p class="empty">No alerts match this filter.</p>'}`}
 if(S.scr==='mine')return `<h2>My reports</h2><p class="sub">Follow each report until the road is repaired.</p>${m.map(r=>`<button class="rep" data-a="open" data-v="${r.id}"><div class="h"><div><p>${r.t}</p><small>${r.street} · ${ago(r.ts)}</small></div><span class="tag ${r.stage>2?'ok':r.stage?'bl':''}">${STG[r.stage]}</span></div>${trk(r.stage)}</button>`).join('')||`<div class="empty">You haven’t reported anything yet.<br><br><button class="btn" data-a="go" data-v="report">Report your first problem</button></div>`}`;
 return `<h2>Profile</h2><p class="sub">Tareeqi MVP v0.1 · Greater Cairo pilot</p>
 <div class="sw"><div><b>Authority mode</b>Lets you move reports through Assigned and Repaired, as a roads department would.</div><button class="tg ${S.auth?'on':''}" data-a="auth" role="switch" aria-checked="${S.auth}" aria-label="Authority mode"></button></div>
 <div class="sw"><div><b>Saved on this device</b>Reports are stored in your browser. Connect a backend to share them between users.</div></div>
 <button class="btn ghost" data-a="reset">Reset demo data</button>`}
function sheet(){const r=S.reports.find(x=>x.id===S.sel);if(!r)return'';const did=r.conf.includes(S.uid);
 return `<div class="bd" data-a="close"><div class="sheet" role="dialog" aria-label="${r.t}" onclick="event.stopPropagation()">${r.photo?`<img class="p" src="${r.photo}" alt="Photo of ${r.t}">`:''}
 <div style="display:flex;justify-content:space-between;gap:8px"><div><h2 style="font-size:19px">${r.t}</h2><p class="sub" style="margin:0">${r.street}</p></div><span class="tag ${r.stage>2?'ok':''}">${r.stage>2?'Repaired':SEV[SEV.indexOf(r.sev)]+' risk'}</span></div>
 <p class="sub" style="margin:10px 0 0">${r.desc||'No details added.'}</p><p class="sub" style="margin:4px 0 0">Reported ${ago(r.ts)} · ${r.conf.length} driver${r.conf.length>1?'s':''} confirmed</p>${trk(r.stage)}
 <div style="display:grid;gap:8px;margin-top:14px">${r.stage<3?`<button class="btn navy" data-a="conf" ${did?'disabled':''}>${ic('chk',18)}${did?'You confirmed this':'I see this too'}</button>`:''}
 ${S.auth&&r.stage<3?`<button class="btn" data-a="adv">Move to ${STG[r.stage+1]}</button>`:''}<button class="btn ghost" data-a="close">Close</button></div></div></div>`}
function tabs(){const b=(v,i,l)=>`<button data-a="go" data-v="${v}" class="${S.scr===v?'on':''}" aria-label="${l}">${ic(i)}${l}</button>`;return `<nav class="nav">${b('home','home','Home')}${b('alerts','bell','Alerts')}<button class="fab" data-a="go" data-v="report" aria-label="Report a problem">${ic('plus',26)}</button>${b('mine','list','My reports')}${b('me','user','Profile')}</nav>`}
function render(){const k=$('.scr'),top=k?k.scrollTop:0;
 app.innerHTML=(S.toast?`<div class="toast" role="status">${S.toast}</div>`:'')+(S.scr==='splash'?`<div class="splash"><img src="${LOGO}" alt="Tareeqi. Report it. Repair it. Protect everyone."><p>Smarter Roads. Safer Lives.</p><button class="btn" data-a="start" style="max-width:260px">Get started</button></div>`:`<div class="scr">${view()}</div>${sheet()}${tabs()}`);
 const n=$('.scr');if(n&&!S.fresh)n.scrollTop=top;S.fresh=0;const fi=$('#file');if(fi)fi.onchange=pick;const d=$('#desc');if(d)d.oninput=()=>S.desc=d.value}
function say(t){S.toast=t;render();clearTimeout(S.tt);S.tt=setTimeout(()=>{S.toast='';render()},2800)}
function go(v){S.scr=v;S.sel=null;S.z=1;S.zc=[180,230];S.fresh=1;render()}
function pick(e){const f=e.target.files[0];if(!f)return;const im=new Image();im.onload=()=>{const s=Math.min(1,560/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);S.photo=c.toDataURL('image/jpeg',.6);render()};im.src=URL.createObjectURL(f)}
function patch(r,p){Object.assign(r,p);saveLocal();render()}
document.addEventListener('click',async e=>{
 if(S.moved){S.moved=0;return}const m=e.target.closest('#pick');if(m){const b=m.getBoundingClientRect(),v=vbox(),x=v.x+(e.clientX-b.left)/b.width*v.w,y=v.y+(e.clientY-b.top)/b.height*v.h;S.pin=U(x,y);return render()}
 const t=e.target.closest('[data-a]');if(!t)return;const a=t.dataset.a,v=t.dataset.v;
 if(a==='zin'||a==='zout'){if(a==='zin'&&S.z===1&&S.scr==='loc'&&S.pin)S.zc=P(S.pin[0],S.pin[1]);S.z=Math.max(1,Math.min(4,S.z*(a==='zin'?1.6:1/1.6)));if(S.z<1.05){S.z=1;S.zc=[180,230]}return render()}
 if(a==='start')return go('home');if(a==='go')return go(v);
 if(a==='cat'){S.cat=+v;return render()}if(a==='sev'){S.sev=+v;return render()}
 if(a==='loc'){if(S.cat===null)return say('Choose what you saw first.');S.desc=($('#desc')||{}).value||S.desc;S.pin=S.pin||[30.0444,31.2357];return go('loc')}
 if(a==='me'){if(!navigator.geolocation)return say('Location is not available. Tap the map instead.');return navigator.geolocation.getCurrentPosition(p=>{let{latitude:la,longitude:lo}=p.coords,out=la<B.y0||la>B.y1||lo<B.x0||lo>B.x1;S.pin=out?[30.0444,31.2357]:[la,lo];say(out?'You are outside the Cairo pilot area. Pin placed in central Cairo.':'Pin moved to your location.')},()=>say('Location is blocked. Tap the map to place the pin.'),{timeout:7000})}
 if(a==='submit'){const[x,y]=P(S.pin[0],S.pin[1]),id='r'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),r={t:CATS[S.cat][0],sev:SEV[S.sev],lat:S.pin[0],lng:S.pin[1],street:where(x,y),desc:S.desc,ts:Date.now(),stage:0,conf:[S.uid],by:S.uid};if(S.photo)r.photo=S.photo;
  S.reports.push({id,...r});saveLocal();
  S.cat=null;S.sev=1;S.photo=null;S.desc='';S.pin=null;S.scr='mine';S.fresh=1;return say('Report sent. Everyone nearby can now see it.')}
 if(a==='f'){S.filter=v;return render()}if(a==='open'){S.sel=v;return render()}if(a==='close'){S.sel=null;return render()}
 const r=S.reports.find(x=>x.id===S.sel);
 if(a==='conf'&&r&&!r.conf.includes(S.uid))return patch(r,{conf:[...r.conf,S.uid]});
 if(a==='adv'&&r&&r.stage<3)return patch(r,{stage:r.stage+1});
 if(a==='auth'){S.auth=!S.auth;return render()}
 if(a==='reset'){S.reports=DEMO.map(d=>({...d}));saveLocal();return say('Demo data restored.')}});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.classList.contains('mk'))e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}))});
let pd=null;
document.addEventListener('pointerdown',e=>{const m=e.target.closest('.msvg');S.moved=0;pd=m&&S.z>1?{m,x:e.clientX,y:e.clientY,c:[...S.zc]}:null});
document.addEventListener('pointermove',e=>{if(!pd)return;const b=pd.m.getBoundingClientRect(),v=vbox(),dx=e.clientX-pd.x,dy=e.clientY-pd.y;if(Math.hypot(dx,dy)>6)S.moved=1;if(!S.moved)return;S.zc=[Math.max(v.w/2,Math.min(360-v.w/2,pd.c[0]-dx/b.width*v.w)),Math.max(v.h/2,Math.min(460-v.h/2,pd.c[1]-dy/b.height*v.h))];const n=vbox();pd.m.setAttribute('viewBox',`${n.x} ${n.y} ${n.w} ${n.h}`)});
document.addEventListener('pointerup',()=>{pd=null});
S.uid=lget('tq_uid')||('u'+Math.random().toString(36).slice(2,9));lset('tq_uid',S.uid);loadLocal();render();
