(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Fd="modulepreload",kd=function(i){return"/ambient-music-gen/"+i},bl={},Bd=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(t.map(c=>{if(c=kd(c),c in bl)return;bl[c]=!0;const l=c.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const h=document.createElement("link");if(h.rel=l?"stylesheet":Fd,l||(h.as="script"),h.crossOrigin="",h.href=c,a&&h.setAttribute("nonce",a),document.head.appendChild(h),l)return new Promise((d,p)=>{h.addEventListener("load",d),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},Yu="15.0.4",Al=(i,e,t)=>({endTime:e,insertTime:t,type:"exponentialRampToValue",value:i}),wl=(i,e,t)=>({endTime:e,insertTime:t,type:"linearRampToValue",value:i}),Ma=(i,e)=>({startTime:e,type:"setValue",value:i}),ju=(i,e,t)=>({duration:t,startTime:e,type:"setValueCurve",values:i}),$u=(i,e,{startTime:t,target:n,timeConstant:s})=>n+(e-n)*Math.exp((t-i)/s),os=i=>i.type==="exponentialRampToValue",to=i=>i.type==="linearRampToValue",ci=i=>os(i)||to(i),yc=i=>i.type==="setValue",Hn=i=>i.type==="setValueCurve",no=(i,e,t,n)=>{const s=i[e];return s===void 0?n:ci(s)||yc(s)?s.value:Hn(s)?s.values[s.values.length-1]:$u(t,no(i,e-1,s.startTime,n),s)},Cl=(i,e,t,n,s)=>t===void 0?[n.insertTime,s]:ci(t)?[t.endTime,t.value]:yc(t)?[t.startTime,t.value]:Hn(t)?[t.startTime+t.duration,t.values[t.values.length-1]]:[t.startTime,no(i,e-1,t.startTime,s)],Ta=i=>i.type==="cancelAndHold",Ea=i=>i.type==="cancelScheduledValues",ti=i=>Ta(i)||Ea(i)?i.cancelTime:os(i)||to(i)?i.endTime:i.startTime,Rl=(i,e,t,{endTime:n,value:s})=>t===s?s:0<t&&0<s||t<0&&s<0?t*(s/t)**((i-e)/(n-e)):0,Pl=(i,e,t,{endTime:n,value:s})=>t+(i-e)/(n-e)*(s-t),Vd=(i,e)=>{const t=Math.floor(e),n=Math.ceil(e);return t===n?i[t]:(1-(e-t))*i[t]+(1-(n-e))*i[n]},zd=(i,{duration:e,startTime:t,values:n})=>{const s=(i-t)/e*(n.length-1);return Vd(n,s)},xr=i=>i.type==="setTarget";class Gd{constructor(e){this._automationEvents=[],this._currenTime=0,this._defaultValue=e}[Symbol.iterator](){return this._automationEvents[Symbol.iterator]()}add(e){const t=ti(e);if(Ta(e)||Ea(e)){const n=this._automationEvents.findIndex(r=>Ea(e)&&Hn(r)?r.startTime+r.duration>=t:ti(r)>=t),s=this._automationEvents[n];if(n!==-1&&(this._automationEvents=this._automationEvents.slice(0,n)),Ta(e)){const r=this._automationEvents[this._automationEvents.length-1];if(s!==void 0&&ci(s)){if(r!==void 0&&xr(r))throw new Error("The internal list is malformed.");const o=r===void 0?s.insertTime:Hn(r)?r.startTime+r.duration:ti(r),a=r===void 0?this._defaultValue:Hn(r)?r.values[r.values.length-1]:r.value,c=os(s)?Rl(t,o,a,s):Pl(t,o,a,s),l=os(s)?Al(c,t,this._currenTime):wl(c,t,this._currenTime);this._automationEvents.push(l)}if(r!==void 0&&xr(r)&&this._automationEvents.push(Ma(this.getValue(t),t)),r!==void 0&&Hn(r)&&r.startTime+r.duration>t){const o=t-r.startTime,a=(r.values.length-1)/r.duration,c=Math.max(2,1+Math.ceil(o*a)),l=o/(c-1)*a,u=r.values.slice(0,c);if(l<1)for(let h=1;h<c;h+=1){const d=l*h%1;u[h]=r.values[h-1]*(1-d)+r.values[h]*d}this._automationEvents[this._automationEvents.length-1]=ju(u,r.startTime,o)}}}else{const n=this._automationEvents.findIndex(o=>ti(o)>t),s=n===-1?this._automationEvents[this._automationEvents.length-1]:this._automationEvents[n-1];if(s!==void 0&&Hn(s)&&ti(s)+s.duration>t)return!1;const r=os(e)?Al(e.value,e.endTime,this._currenTime):to(e)?wl(e.value,t,this._currenTime):e;if(n===-1)this._automationEvents.push(r);else{if(Hn(e)&&t+e.duration>ti(this._automationEvents[n]))return!1;this._automationEvents.splice(n,0,r)}}return!0}flush(e){const t=this._automationEvents.findIndex(n=>ti(n)>e);if(t>1){const n=this._automationEvents.slice(t-1),s=n[0];xr(s)&&n.unshift(Ma(no(this._automationEvents,t-2,s.startTime,this._defaultValue),s.startTime)),this._automationEvents=n}}getValue(e){if(this._automationEvents.length===0)return this._defaultValue;const t=this._automationEvents.findIndex(o=>ti(o)>e),n=this._automationEvents[t],s=(t===-1?this._automationEvents.length:t)-1,r=this._automationEvents[s];if(r!==void 0&&xr(r)&&(n===void 0||!ci(n)||n.insertTime>e))return $u(e,no(this._automationEvents,s-1,r.startTime,this._defaultValue),r);if(r!==void 0&&yc(r)&&(n===void 0||!ci(n)))return r.value;if(r!==void 0&&Hn(r)&&(n===void 0||!ci(n)||r.startTime+r.duration>e))return e<r.startTime+r.duration?zd(e,r):r.values[r.values.length-1];if(r!==void 0&&ci(r)&&(n===void 0||!ci(n)))return r.value;if(n!==void 0&&os(n)){const[o,a]=Cl(this._automationEvents,s,r,n,this._defaultValue);return Rl(e,o,a,n)}if(n!==void 0&&to(n)){const[o,a]=Cl(this._automationEvents,s,r,n,this._defaultValue);return Pl(e,o,a,n)}return this._defaultValue}}const Hd=i=>({cancelTime:i,type:"cancelAndHold"}),Wd=i=>({cancelTime:i,type:"cancelScheduledValues"}),qd=(i,e)=>({endTime:e,type:"exponentialRampToValue",value:i}),Xd=(i,e)=>({endTime:e,type:"linearRampToValue",value:i}),Yd=(i,e,t)=>({startTime:e,target:i,timeConstant:t,type:"setTarget"}),jd=()=>new DOMException("","AbortError"),$d=i=>(e,t,[n,s,r],o)=>{i(e[s],[t,n,r],a=>a[0]===t&&a[1]===n,o)},Zd=i=>(e,t,n)=>{const s=[];for(let r=0;r<n.numberOfInputs;r+=1)s.push(new Set);i.set(e,{activeInputs:s,outputs:new Set,passiveInputs:new WeakMap,renderer:t})},Kd=i=>(e,t)=>{i.set(e,{activeInputs:new Set,passiveInputs:new WeakMap,renderer:t})},ms=new WeakSet,Zu=new WeakMap,Mc=new WeakMap,Ku=new WeakMap,Tc=new WeakMap,go=new WeakMap,Ju=new WeakMap,ba=new WeakMap,Aa=new WeakMap,wa=new WeakMap,Qu={construct(){return Qu}},Jd=i=>{try{const e=new Proxy(i,Qu);new e}catch{return!1}return!0},Dl=/^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/,Il=(i,e)=>{const t=[];let n=i.replace(/^[\s]+/,""),s=n.match(Dl);for(;s!==null;){const r=s[1].slice(1,-1),o=s[0].replace(/([\s]+)?;?$/,"").replace(r,new URL(r,e).toString());t.push(o),n=n.slice(s[0].length).replace(/^[\s]+/,""),s=n.match(Dl)}return[t.join(";"),n]},Nl=i=>{if(i!==void 0&&!Array.isArray(i))throw new TypeError("The parameterDescriptors property of given value for processorCtor is not an array.")},Ll=i=>{if(!Jd(i))throw new TypeError("The given value for processorCtor should be a constructor.");if(i.prototype===null||typeof i.prototype!="object")throw new TypeError("The given value for processorCtor should have a prototype.")},Qd=(i,e,t,n,s,r,o,a,c,l,u,h,d)=>{let p=0;return(_,g,m={credentials:"omit"})=>{const f=u.get(_);if(f!==void 0&&f.has(g))return Promise.resolve();const b=l.get(_);if(b!==void 0){const M=b.get(g);if(M!==void 0)return M}const T=r(_),x=T.audioWorklet===void 0?s(g).then(([M,E])=>{const[w,C]=Il(M,E),S=`${w};((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${C}
})})(window,'_AWGS')`;return t(S)}).then(()=>{const M=d._AWGS.pop();if(M===void 0)throw new SyntaxError;n(T.currentTime,T.sampleRate,()=>M(class{},void 0,(E,w)=>{if(E.trim()==="")throw e();const C=Aa.get(T);if(C!==void 0){if(C.has(E))throw e();Ll(w),Nl(w.parameterDescriptors),C.set(E,w)}else Ll(w),Nl(w.parameterDescriptors),Aa.set(T,new Map([[E,w]]))},T.sampleRate,void 0,void 0))}):Promise.all([s(g),Promise.resolve(i(h,h))]).then(([[M,E],w])=>{const C=p+1;p=C;const[S,v]=Il(M,E),O=`${S};((AudioWorkletProcessor,registerProcessor)=>{${v}
})(${w?"AudioWorkletProcessor":"class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}"},(n,p)=>registerProcessor(n,class extends p{${w?"":"__c = (a) => a.forEach(e=>this.__b.add(e.buffer));"}process(i,o,p){${w?"":"i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));"}return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac${C}',class extends AudioWorkletProcessor{process(){return !1}})`,G=new Blob([O],{type:"application/javascript; charset=utf-8"}),U=URL.createObjectURL(G);return T.audioWorklet.addModule(U,m).then(()=>{if(a(T))return T;const W=o(T);return W.audioWorklet.addModule(U,m).then(()=>W)}).then(W=>{if(c===null)throw new SyntaxError;try{new c(W,`__sac${C}`)}catch{throw new SyntaxError}}).finally(()=>URL.revokeObjectURL(U))});return b===void 0?l.set(_,new Map([[g,x]])):b.set(g,x),x.then(()=>{const M=u.get(_);M===void 0?u.set(_,new Set([g])):M.add(g)}).finally(()=>{const M=l.get(_);M!==void 0&&M.delete(g)}),x}},Tn=(i,e)=>{const t=i.get(e);if(t===void 0)throw new Error("A value with the given key could not be found.");return t},vo=(i,e)=>{const t=Array.from(i).filter(e);if(t.length>1)throw Error("More than one element was found.");if(t.length===0)throw Error("No element was found.");const[n]=t;return i.delete(n),n},eh=(i,e,t,n)=>{const s=Tn(i,e),r=vo(s,o=>o[0]===t&&o[1]===n);return s.size===0&&i.delete(e),r},er=i=>Tn(Ju,i),_s=i=>{if(ms.has(i))throw new Error("The AudioNode is already stored.");ms.add(i),er(i).forEach(e=>e(!0))},th=i=>"port"in i,tr=i=>{if(!ms.has(i))throw new Error("The AudioNode is not stored.");ms.delete(i),er(i).forEach(e=>e(!1))},Ca=(i,e)=>{!th(i)&&e.every(t=>t.size===0)&&tr(i)},ef=(i,e,t,n,s,r,o,a,c,l,u,h,d)=>{const p=new WeakMap;return(_,g,m,f,b)=>{const{activeInputs:T,passiveInputs:x}=r(g),{outputs:M}=r(_),E=a(_),w=C=>{const S=c(g),v=c(_);if(C){const R=eh(x,_,m,f);i(T,_,R,!1),!b&&!h(_)&&t(v,S,m,f),d(g)&&_s(g)}else{const R=n(T,_,m,f);e(x,f,R,!1),!b&&!h(_)&&s(v,S,m,f);const D=o(g);if(D===0)u(g)&&Ca(g,T);else{const N=p.get(g);N!==void 0&&clearTimeout(N),p.set(g,setTimeout(()=>{u(g)&&Ca(g,T)},D*1e3))}}};return l(M,[g,m,f],C=>C[0]===g&&C[1]===m&&C[2]===f,!0)?(E.add(w),u(_)?i(T,_,[m,f,w],!0):e(x,f,[_,m,w],!0),!0):!1}},tf=i=>(e,t,[n,s,r],o)=>{const a=e.get(n);a===void 0?e.set(n,new Set([[s,t,r]])):i(a,[s,t,r],c=>c[0]===s&&c[1]===t,o)},nf=i=>(e,t)=>{const n=i(e,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});t.connect(n).connect(e.destination);const s=()=>{t.removeEventListener("ended",s),t.disconnect(n),n.disconnect()};t.addEventListener("ended",s)},sf=i=>(e,t)=>{i(e).add(t)},rf={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",fftSize:2048,maxDecibels:-30,minDecibels:-100,smoothingTimeConstant:.8},of=(i,e,t,n,s,r)=>class extends i{constructor(a,c){const l=s(a),u={...rf,...c},h=n(l,u),d=r(l)?e():null;super(a,!1,h,d),this._nativeAnalyserNode=h}get fftSize(){return this._nativeAnalyserNode.fftSize}set fftSize(a){this._nativeAnalyserNode.fftSize=a}get frequencyBinCount(){return this._nativeAnalyserNode.frequencyBinCount}get maxDecibels(){return this._nativeAnalyserNode.maxDecibels}set maxDecibels(a){const c=this._nativeAnalyserNode.maxDecibels;if(this._nativeAnalyserNode.maxDecibels=a,!(a>this._nativeAnalyserNode.minDecibels))throw this._nativeAnalyserNode.maxDecibels=c,t()}get minDecibels(){return this._nativeAnalyserNode.minDecibels}set minDecibels(a){const c=this._nativeAnalyserNode.minDecibels;if(this._nativeAnalyserNode.minDecibels=a,!(this._nativeAnalyserNode.maxDecibels>a))throw this._nativeAnalyserNode.minDecibels=c,t()}get smoothingTimeConstant(){return this._nativeAnalyserNode.smoothingTimeConstant}set smoothingTimeConstant(a){this._nativeAnalyserNode.smoothingTimeConstant=a}getByteFrequencyData(a){this._nativeAnalyserNode.getByteFrequencyData(a)}getByteTimeDomainData(a){this._nativeAnalyserNode.getByteTimeDomainData(a)}getFloatFrequencyData(a){this._nativeAnalyserNode.getFloatFrequencyData(a)}getFloatTimeDomainData(a){this._nativeAnalyserNode.getFloatTimeDomainData(a)}},Ft=(i,e)=>i.context===e,af=(i,e,t)=>()=>{const n=new WeakMap,s=async(r,o)=>{let a=e(r);if(!Ft(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,fftSize:a.fftSize,maxDecibels:a.maxDecibels,minDecibels:a.minDecibels,smoothingTimeConstant:a.smoothingTimeConstant};a=i(o,l)}return n.set(o,a),await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):s(r,o)}}},io=i=>{try{i.copyToChannel(new Float32Array(1),0,-1)}catch{return!1}return!0},Nn=()=>new DOMException("","IndexSizeError"),Ec=i=>{i.getChannelData=(e=>t=>{try{return e.call(i,t)}catch(n){throw n.code===12?Nn():n}})(i.getChannelData)},cf={numberOfChannels:1},lf=(i,e,t,n,s,r,o,a)=>{let c=null;return class nh{constructor(u){if(s===null)throw new Error("Missing the native OfflineAudioContext constructor.");const{length:h,numberOfChannels:d,sampleRate:p}={...cf,...u};c===null&&(c=new s(1,1,44100));const _=n!==null&&e(r,r)?new n({length:h,numberOfChannels:d,sampleRate:p}):c.createBuffer(d,h,p);if(_.numberOfChannels===0)throw t();return typeof _.copyFromChannel!="function"?(o(_),Ec(_)):e(io,()=>io(_))||a(_),i.add(_),_}static[Symbol.hasInstance](u){return u!==null&&typeof u=="object"&&Object.getPrototypeOf(u)===nh.prototype||i.has(u)}}},Qt=-34028234663852886e22,Vt=34028234663852886e22,Yn=i=>ms.has(i),uf={buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1},hf=(i,e,t,n,s,r,o,a)=>class extends i{constructor(l,u){const h=r(l),d={...uf,...u},p=s(h,d),_=o(h),g=_?e():null;super(l,!1,p,g),this._audioBufferSourceNodeRenderer=g,this._isBufferNullified=!1,this._isBufferSet=d.buffer!==null,this._nativeAudioBufferSourceNode=p,this._onended=null,this._playbackRate=t(this,_,p.playbackRate,Vt,Qt)}get buffer(){return this._isBufferNullified?null:this._nativeAudioBufferSourceNode.buffer}set buffer(l){if(this._nativeAudioBufferSourceNode.buffer=l,l!==null){if(this._isBufferSet)throw n();this._isBufferSet=!0}}get loop(){return this._nativeAudioBufferSourceNode.loop}set loop(l){this._nativeAudioBufferSourceNode.loop=l}get loopEnd(){return this._nativeAudioBufferSourceNode.loopEnd}set loopEnd(l){this._nativeAudioBufferSourceNode.loopEnd=l}get loopStart(){return this._nativeAudioBufferSourceNode.loopStart}set loopStart(l){this._nativeAudioBufferSourceNode.loopStart=l}get onended(){return this._onended}set onended(l){const u=typeof l=="function"?a(this,l):null;this._nativeAudioBufferSourceNode.onended=u;const h=this._nativeAudioBufferSourceNode.onended;this._onended=h!==null&&h===u?l:h}get playbackRate(){return this._playbackRate}start(l=0,u=0,h){if(this._nativeAudioBufferSourceNode.start(l,u,h),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.start=h===void 0?[l,u]:[l,u,h]),this.context.state!=="closed"){_s(this);const d=()=>{this._nativeAudioBufferSourceNode.removeEventListener("ended",d),Yn(this)&&tr(this)};this._nativeAudioBufferSourceNode.addEventListener("ended",d)}}stop(l=0){this._nativeAudioBufferSourceNode.stop(l),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.stop=l)}},df=(i,e,t,n,s)=>()=>{const r=new WeakMap;let o=null,a=null;const c=async(l,u)=>{let h=t(l);const d=Ft(h,u);if(!d){const p={buffer:h.buffer,channelCount:h.channelCount,channelCountMode:h.channelCountMode,channelInterpretation:h.channelInterpretation,loop:h.loop,loopEnd:h.loopEnd,loopStart:h.loopStart,playbackRate:h.playbackRate.value};h=e(u,p),o!==null&&h.start(...o),a!==null&&h.stop(a)}return r.set(u,h),d?await i(u,l.playbackRate,h.playbackRate):await n(u,l.playbackRate,h.playbackRate),await s(l,u,h),h};return{set start(l){o=l},set stop(l){a=l},render(l,u){const h=r.get(u);return h!==void 0?Promise.resolve(h):c(l,u)}}},ff=i=>"playbackRate"in i,pf=i=>"frequency"in i&&"gain"in i,mf=i=>"offset"in i,_f=i=>!("frequency"in i)&&"gain"in i,gf=i=>"detune"in i&&"frequency"in i&&!("gain"in i),vf=i=>"pan"in i,zt=i=>Tn(Zu,i),nr=i=>Tn(Ku,i),Ra=(i,e)=>{const{activeInputs:t}=zt(i);t.forEach(s=>s.forEach(([r])=>{e.includes(i)||Ra(r,[...e,i])}));const n=ff(i)?[i.playbackRate]:th(i)?Array.from(i.parameters.values()):pf(i)?[i.Q,i.detune,i.frequency,i.gain]:mf(i)?[i.offset]:_f(i)?[i.gain]:gf(i)?[i.detune,i.frequency]:vf(i)?[i.pan]:[];for(const s of n){const r=nr(s);r!==void 0&&r.activeInputs.forEach(([o])=>Ra(o,e))}Yn(i)&&tr(i)},ih=i=>{Ra(i.destination,[])},xf=i=>i===void 0||typeof i=="number"||typeof i=="string"&&(i==="balanced"||i==="interactive"||i==="playback"),Sf=(i,e,t,n,s,r,o,a,c)=>class extends i{constructor(u={}){if(c===null)throw new Error("Missing the native AudioContext constructor.");let h;try{h=new c(u)}catch(_){throw _.code===12&&_.message==="sampleRate is not in range"?t():_}if(h===null)throw n();if(!xf(u.latencyHint))throw new TypeError(`The provided value '${u.latencyHint}' is not a valid enum value of type AudioContextLatencyCategory.`);if(u.sampleRate!==void 0&&h.sampleRate!==u.sampleRate)throw t();super(h,2);const{latencyHint:d}=u,{sampleRate:p}=h;if(this._baseLatency=typeof h.baseLatency=="number"?h.baseLatency:d==="balanced"?512/p:d==="interactive"||d===void 0?256/p:d==="playback"?1024/p:Math.max(2,Math.min(128,Math.round(d*p/128)))*128/p,this._nativeAudioContext=h,c.name==="webkitAudioContext"?(this._nativeGainNode=h.createGain(),this._nativeOscillatorNode=h.createOscillator(),this._nativeGainNode.gain.value=1e-37,this._nativeOscillatorNode.connect(this._nativeGainNode).connect(h.destination),this._nativeOscillatorNode.start()):(this._nativeGainNode=null,this._nativeOscillatorNode=null),this._state=null,h.state==="running"){this._state="suspended";const _=()=>{this._state==="suspended"&&(this._state=null),h.removeEventListener("statechange",_)};h.addEventListener("statechange",_)}}get baseLatency(){return this._baseLatency}get state(){return this._state!==null?this._state:this._nativeAudioContext.state}close(){return this.state==="closed"?this._nativeAudioContext.close().then(()=>{throw e()}):(this._state==="suspended"&&(this._state=null),this._nativeAudioContext.close().then(()=>{this._nativeGainNode!==null&&this._nativeOscillatorNode!==null&&(this._nativeOscillatorNode.stop(),this._nativeGainNode.disconnect(),this._nativeOscillatorNode.disconnect()),ih(this)}))}createMediaElementSource(u){return new s(this,{mediaElement:u})}createMediaStreamDestination(){return new r(this)}createMediaStreamSource(u){return new o(this,{mediaStream:u})}createMediaStreamTrackSource(u){return new a(this,{mediaStreamTrack:u})}resume(){return this._state==="suspended"?new Promise((u,h)=>{const d=()=>{this._nativeAudioContext.removeEventListener("statechange",d),this._nativeAudioContext.state==="running"?u():this.resume().then(u,h)};this._nativeAudioContext.addEventListener("statechange",d)}):this._nativeAudioContext.resume().catch(u=>{throw u===void 0||u.code===15?e():u})}suspend(){return this._nativeAudioContext.suspend().catch(u=>{throw u===void 0?e():u})}},yf=(i,e,t,n,s,r,o,a)=>class extends i{constructor(l,u){const h=r(l),d=o(h),p=s(h,u,d),_=d?e(a):null;super(l,!1,p,_),this._isNodeOfNativeOfflineAudioContext=d,this._nativeAudioDestinationNode=p}get channelCount(){return this._nativeAudioDestinationNode.channelCount}set channelCount(l){if(this._isNodeOfNativeOfflineAudioContext)throw n();if(l>this._nativeAudioDestinationNode.maxChannelCount)throw t();this._nativeAudioDestinationNode.channelCount=l}get channelCountMode(){return this._nativeAudioDestinationNode.channelCountMode}set channelCountMode(l){if(this._isNodeOfNativeOfflineAudioContext)throw n();this._nativeAudioDestinationNode.channelCountMode=l}get maxChannelCount(){return this._nativeAudioDestinationNode.maxChannelCount}},Mf=i=>{const e=new WeakMap,t=async(n,s)=>{const r=s.destination;return e.set(s,r),await i(n,s,r),r};return{render(n,s){const r=e.get(s);return r!==void 0?Promise.resolve(r):t(n,s)}}},Tf=(i,e,t,n,s,r,o,a)=>(c,l)=>{const u=l.listener,h=()=>{const M=new Float32Array(1),E=e(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:9}),w=o(l);let C=!1,S=[0,0,-1,0,1,0],v=[0,0,0];const R=()=>{if(C)return;C=!0;const G=n(l,256,9,0);G.onaudioprocess=({inputBuffer:U})=>{const W=[r(U,M,0),r(U,M,1),r(U,M,2),r(U,M,3),r(U,M,4),r(U,M,5)];W.some((j,J)=>j!==S[J])&&(u.setOrientation(...W),S=W);const B=[r(U,M,6),r(U,M,7),r(U,M,8)];B.some((j,J)=>j!==v[J])&&(u.setPosition(...B),v=B)},E.connect(G)},D=G=>U=>{U!==S[G]&&(S[G]=U,u.setOrientation(...S))},N=G=>U=>{U!==v[G]&&(v[G]=U,u.setPosition(...v))},O=(G,U,W)=>{const B=t(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:U});B.connect(E,0,G),B.start(),Object.defineProperty(B.offset,"defaultValue",{get(){return U}});const j=i({context:c},w,B.offset,Vt,Qt);return a(j,"value",J=>()=>J.call(j),J=>ne=>{try{J.call(j,ne)}catch(ge){if(ge.code!==9)throw ge}R(),w&&W(ne)}),j.cancelAndHoldAtTime=(J=>w?()=>{throw s()}:(...ne)=>{const ge=J.apply(j,ne);return R(),ge})(j.cancelAndHoldAtTime),j.cancelScheduledValues=(J=>w?()=>{throw s()}:(...ne)=>{const ge=J.apply(j,ne);return R(),ge})(j.cancelScheduledValues),j.exponentialRampToValueAtTime=(J=>w?()=>{throw s()}:(...ne)=>{const ge=J.apply(j,ne);return R(),ge})(j.exponentialRampToValueAtTime),j.linearRampToValueAtTime=(J=>w?()=>{throw s()}:(...ne)=>{const ge=J.apply(j,ne);return R(),ge})(j.linearRampToValueAtTime),j.setTargetAtTime=(J=>w?()=>{throw s()}:(...ne)=>{const ge=J.apply(j,ne);return R(),ge})(j.setTargetAtTime),j.setValueAtTime=(J=>w?()=>{throw s()}:(...ne)=>{const ge=J.apply(j,ne);return R(),ge})(j.setValueAtTime),j.setValueCurveAtTime=(J=>w?()=>{throw s()}:(...ne)=>{const ge=J.apply(j,ne);return R(),ge})(j.setValueCurveAtTime),j};return{forwardX:O(0,0,D(0)),forwardY:O(1,0,D(1)),forwardZ:O(2,-1,D(2)),positionX:O(6,0,N(0)),positionY:O(7,0,N(1)),positionZ:O(8,0,N(2)),upX:O(3,0,D(3)),upY:O(4,1,D(4)),upZ:O(5,0,D(5))}},{forwardX:d,forwardY:p,forwardZ:_,positionX:g,positionY:m,positionZ:f,upX:b,upY:T,upZ:x}=u.forwardX===void 0?h():u;return{get forwardX(){return d},get forwardY(){return p},get forwardZ(){return _},get positionX(){return g},get positionY(){return m},get positionZ(){return f},get upX(){return b},get upY(){return T},get upZ(){return x}}},so=i=>"context"in i,ir=i=>so(i[0]),Vi=(i,e,t,n)=>{for(const s of i)if(t(s)){if(n)return!1;throw Error("The set contains at least one similar element.")}return i.add(e),!0},Ol=(i,e,[t,n],s)=>{Vi(i,[e,t,n],r=>r[0]===e&&r[1]===t,s)},Ul=(i,[e,t,n],s)=>{const r=i.get(e);r===void 0?i.set(e,new Set([[t,n]])):Vi(r,[t,n],o=>o[0]===t,s)},Cs=i=>"inputs"in i,ro=(i,e,t,n)=>{if(Cs(e)){const s=e.inputs[n];return i.connect(s,t,0),[s,t,0]}return i.connect(e,t,n),[e,t,n]},sh=(i,e,t)=>{for(const n of i)if(n[0]===e&&n[1]===t)return i.delete(n),n;return null},Ef=(i,e,t)=>vo(i,n=>n[0]===e&&n[1]===t),rh=(i,e)=>{if(!er(i).delete(e))throw new Error("Missing the expected event listener.")},oh=(i,e,t)=>{const n=Tn(i,e),s=vo(n,r=>r[0]===t);return n.size===0&&i.delete(e),s},oo=(i,e,t,n)=>{Cs(e)?i.disconnect(e.inputs[n],t,0):i.disconnect(e,t,n)},ut=i=>Tn(Mc,i),Ys=i=>Tn(Tc,i),Oi=i=>ba.has(i),Xr=i=>!ms.has(i),Fl=(i,e)=>new Promise(t=>{if(e!==null)t(!0);else{const n=i.createScriptProcessor(256,1,1),s=i.createGain(),r=i.createBuffer(1,2,44100),o=r.getChannelData(0);o[0]=1,o[1]=1;const a=i.createBufferSource();a.buffer=r,a.loop=!0,a.connect(n).connect(i.destination),a.connect(s),a.disconnect(s),n.onaudioprocess=c=>{const l=c.inputBuffer.getChannelData(0);Array.prototype.some.call(l,u=>u===1)?t(!0):t(!1),a.stop(),n.onaudioprocess=null,a.disconnect(n),n.disconnect(i.destination)},a.start()}}),Go=(i,e)=>{const t=new Map;for(const n of i)for(const s of n){const r=t.get(s);t.set(s,r===void 0?1:r+1)}t.forEach((n,s)=>e(s,n))},ao=i=>"context"in i,bf=i=>{const e=new Map;i.connect=(t=>(n,s=0,r=0)=>{const o=ao(n)?t(n,s,r):t(n,s),a=e.get(n);return a===void 0?e.set(n,[{input:r,output:s}]):a.every(c=>c.input!==r||c.output!==s)&&a.push({input:r,output:s}),o})(i.connect.bind(i)),i.disconnect=(t=>(n,s,r)=>{if(t.apply(i),n===void 0)e.clear();else if(typeof n=="number")for(const[o,a]of e){const c=a.filter(l=>l.output!==n);c.length===0?e.delete(o):e.set(o,c)}else if(e.has(n))if(s===void 0)e.delete(n);else{const o=e.get(n);if(o!==void 0){const a=o.filter(c=>c.output!==s&&(c.input!==r||r===void 0));a.length===0?e.delete(n):e.set(n,a)}}for(const[o,a]of e)a.forEach(c=>{ao(o)?i.connect(o,c.output,c.input):i.connect(o,c.output)})})(i.disconnect)},Af=(i,e,t,n)=>{const{activeInputs:s,passiveInputs:r}=nr(e),{outputs:o}=zt(i),a=er(i),c=l=>{const u=ut(i),h=Ys(e);if(l){const d=oh(r,i,t);Ol(s,i,d,!1),!n&&!Oi(i)&&u.connect(h,t)}else{const d=Ef(s,i,t);Ul(r,d,!1),!n&&!Oi(i)&&u.disconnect(h,t)}};return Vi(o,[e,t],l=>l[0]===e&&l[1]===t,!0)?(a.add(c),Yn(i)?Ol(s,i,[t,c],!0):Ul(r,[i,t,c],!0),!0):!1},wf=(i,e,t,n)=>{const{activeInputs:s,passiveInputs:r}=zt(e),o=sh(s[n],i,t);return o===null?[eh(r,i,t,n)[2],!1]:[o[2],!0]},Cf=(i,e,t)=>{const{activeInputs:n,passiveInputs:s}=nr(e),r=sh(n,i,t);return r===null?[oh(s,i,t)[1],!1]:[r[2],!0]},bc=(i,e,t,n,s)=>{const[r,o]=wf(i,t,n,s);if(r!==null&&(rh(i,r),o&&!e&&!Oi(i)&&oo(ut(i),ut(t),n,s)),Yn(t)){const{activeInputs:a}=zt(t);Ca(t,a)}},Ac=(i,e,t,n)=>{const[s,r]=Cf(i,t,n);s!==null&&(rh(i,s),r&&!e&&!Oi(i)&&ut(i).disconnect(Ys(t),n))},Rf=(i,e)=>{const t=zt(i),n=[];for(const s of t.outputs)ir(s)?bc(i,e,...s):Ac(i,e,...s),n.push(s[0]);return t.outputs.clear(),n},Pf=(i,e,t)=>{const n=zt(i),s=[];for(const r of n.outputs)r[1]===t&&(ir(r)?bc(i,e,...r):Ac(i,e,...r),s.push(r[0]),n.outputs.delete(r));return s},Df=(i,e,t,n,s)=>{const r=zt(i);return Array.from(r.outputs).filter(o=>o[0]===t&&(n===void 0||o[1]===n)&&(s===void 0||o[2]===s)).map(o=>(ir(o)?bc(i,e,...o):Ac(i,e,...o),r.outputs.delete(o),o[0]))},If=(i,e,t,n,s,r,o,a,c,l,u,h,d,p,_,g)=>class extends l{constructor(f,b,T,x){super(T),this._context=f,this._nativeAudioNode=T;const M=u(f);h(M)&&t(Fl,()=>Fl(M,g))!==!0&&bf(T),Mc.set(this,T),Ju.set(this,new Set),f.state!=="closed"&&b&&_s(this),i(this,x,T)}get channelCount(){return this._nativeAudioNode.channelCount}set channelCount(f){this._nativeAudioNode.channelCount=f}get channelCountMode(){return this._nativeAudioNode.channelCountMode}set channelCountMode(f){this._nativeAudioNode.channelCountMode=f}get channelInterpretation(){return this._nativeAudioNode.channelInterpretation}set channelInterpretation(f){this._nativeAudioNode.channelInterpretation=f}get context(){return this._context}get numberOfInputs(){return this._nativeAudioNode.numberOfInputs}get numberOfOutputs(){return this._nativeAudioNode.numberOfOutputs}connect(f,b=0,T=0){if(b<0||b>=this._nativeAudioNode.numberOfOutputs)throw s();const x=u(this._context),M=_(x);if(d(f)||p(f))throw r();if(so(f)){const C=ut(f);try{const v=ro(this._nativeAudioNode,C,b,T),R=Xr(this);(M||R)&&this._nativeAudioNode.disconnect(...v),this.context.state!=="closed"&&!R&&Xr(f)&&_s(f)}catch(v){throw v.code===12?r():v}if(e(this,f,b,T,M)){const v=c([this],f);Go(v,n(M))}return f}const E=Ys(f);if(E.name==="playbackRate"&&E.maxValue===1024)throw o();try{this._nativeAudioNode.connect(E,b),(M||Xr(this))&&this._nativeAudioNode.disconnect(E,b)}catch(C){throw C.code===12?r():C}if(Af(this,f,b,M)){const C=c([this],f);Go(C,n(M))}}disconnect(f,b,T){let x;const M=u(this._context),E=_(M);if(f===void 0)x=Rf(this,E);else if(typeof f=="number"){if(f<0||f>=this.numberOfOutputs)throw s();x=Pf(this,E,f)}else{if(b!==void 0&&(b<0||b>=this.numberOfOutputs)||so(f)&&T!==void 0&&(T<0||T>=f.numberOfInputs))throw s();if(x=Df(this,E,f,b,T),x.length===0)throw r()}for(const w of x){const C=c([this],w);Go(C,a)}}},Nf=(i,e,t,n,s,r,o,a,c,l,u,h,d)=>(p,_,g,m=null,f=null)=>{const b=g.value,T=new Gd(b),x=_?n(T):null,M={get defaultValue(){return b},get maxValue(){return m===null?g.maxValue:m},get minValue(){return f===null?g.minValue:f},get value(){return g.value},set value(E){g.value=E,M.setValueAtTime(E,p.context.currentTime)},cancelAndHoldAtTime(E){if(typeof g.cancelAndHoldAtTime=="function")x===null&&T.flush(p.context.currentTime),T.add(s(E)),g.cancelAndHoldAtTime(E);else{const w=Array.from(T).pop();x===null&&T.flush(p.context.currentTime),T.add(s(E));const C=Array.from(T).pop();g.cancelScheduledValues(E),w!==C&&C!==void 0&&(C.type==="exponentialRampToValue"?g.exponentialRampToValueAtTime(C.value,C.endTime):C.type==="linearRampToValue"?g.linearRampToValueAtTime(C.value,C.endTime):C.type==="setValue"?g.setValueAtTime(C.value,C.startTime):C.type==="setValueCurve"&&g.setValueCurveAtTime(C.values,C.startTime,C.duration))}return M},cancelScheduledValues(E){return x===null&&T.flush(p.context.currentTime),T.add(r(E)),g.cancelScheduledValues(E),M},exponentialRampToValueAtTime(E,w){if(E===0)throw new RangeError;if(!Number.isFinite(w)||w<0)throw new RangeError;const C=p.context.currentTime;return x===null&&T.flush(C),Array.from(T).length===0&&(T.add(l(b,C)),g.setValueAtTime(b,C)),T.add(o(E,w)),g.exponentialRampToValueAtTime(E,w),M},linearRampToValueAtTime(E,w){const C=p.context.currentTime;return x===null&&T.flush(C),Array.from(T).length===0&&(T.add(l(b,C)),g.setValueAtTime(b,C)),T.add(a(E,w)),g.linearRampToValueAtTime(E,w),M},setTargetAtTime(E,w,C){return x===null&&T.flush(p.context.currentTime),T.add(c(E,w,C)),g.setTargetAtTime(E,w,C),M},setValueAtTime(E,w){return x===null&&T.flush(p.context.currentTime),T.add(l(E,w)),g.setValueAtTime(E,w),M},setValueCurveAtTime(E,w,C){const S=E instanceof Float32Array?E:new Float32Array(E);if(h!==null&&h.name==="webkitAudioContext"){const v=w+C,R=p.context.sampleRate,D=Math.ceil(w*R),N=Math.floor(v*R),O=N-D,G=new Float32Array(O);for(let W=0;W<O;W+=1){const B=(S.length-1)/C*((D+W)/R-w),j=Math.floor(B),J=Math.ceil(B);G[W]=j===J?S[j]:(1-(B-j))*S[j]+(1-(J-B))*S[J]}x===null&&T.flush(p.context.currentTime),T.add(u(G,w,C)),g.setValueCurveAtTime(G,w,C);const U=N/R;U<v&&d(M,G[G.length-1],U),d(M,S[S.length-1],v)}else x===null&&T.flush(p.context.currentTime),T.add(u(S,w,C)),g.setValueCurveAtTime(S,w,C);return M}};return t.set(M,g),e.set(M,p),i(M,x),M},Lf=i=>({replay(e){for(const t of i)if(t.type==="exponentialRampToValue"){const{endTime:n,value:s}=t;e.exponentialRampToValueAtTime(s,n)}else if(t.type==="linearRampToValue"){const{endTime:n,value:s}=t;e.linearRampToValueAtTime(s,n)}else if(t.type==="setTarget"){const{startTime:n,target:s,timeConstant:r}=t;e.setTargetAtTime(s,n,r)}else if(t.type==="setValue"){const{startTime:n,value:s}=t;e.setValueAtTime(s,n)}else if(t.type==="setValueCurve"){const{duration:n,startTime:s,values:r}=t;e.setValueCurveAtTime(r,s,n)}else throw new Error("Can't apply an unknown automation.")}});class ah{constructor(e){this._map=new Map(e)}get size(){return this._map.size}entries(){return this._map.entries()}forEach(e,t=null){return this._map.forEach((n,s)=>e.call(t,n,s,this))}get(e){return this._map.get(e)}has(e){return this._map.has(e)}keys(){return this._map.keys()}values(){return this._map.values()}}const Of={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:1,numberOfOutputs:1,parameterData:{},processorOptions:{}},Uf=(i,e,t,n,s,r,o,a,c,l,u,h,d,p)=>class extends e{constructor(g,m,f){var b;const T=a(g),x=c(T),M=u({...Of,...f});d(M);const E=Aa.get(T),w=E==null?void 0:E.get(m),C=x||T.state!=="closed"?T:(b=o(T))!==null&&b!==void 0?b:T,S=s(C,x?null:g.baseLatency,l,m,w,M),v=x?n(m,M,w):null;super(g,!0,S,v);const R=[];S.parameters.forEach((N,O)=>{const G=t(this,x,N);R.push([O,G])}),this._nativeAudioWorkletNode=S,this._onprocessorerror=null,this._parameters=new ah(R),x&&i(T,this);const{activeInputs:D}=r(this);h(S,D)}get onprocessorerror(){return this._onprocessorerror}set onprocessorerror(g){const m=typeof g=="function"?p(this,g):null;this._nativeAudioWorkletNode.onprocessorerror=m;const f=this._nativeAudioWorkletNode.onprocessorerror;this._onprocessorerror=f!==null&&f===m?g:f}get parameters(){return this._parameters===null?this._nativeAudioWorkletNode.parameters:this._parameters}get port(){return this._nativeAudioWorkletNode.port}};function co(i,e,t,n,s){if(typeof i.copyFromChannel=="function")e[t].byteLength===0&&(e[t]=new Float32Array(128)),i.copyFromChannel(e[t],n,s);else{const r=i.getChannelData(n);if(e[t].byteLength===0)e[t]=r.slice(s,s+128);else{const o=new Float32Array(r.buffer,s*Float32Array.BYTES_PER_ELEMENT,128);e[t].set(o)}}}const ch=(i,e,t,n,s)=>{typeof i.copyToChannel=="function"?e[t].byteLength!==0&&i.copyToChannel(e[t],n,s):e[t].byteLength!==0&&i.getChannelData(n).set(e[t],s)},lo=(i,e)=>{const t=[];for(let n=0;n<i;n+=1){const s=[],r=typeof e=="number"?e:e[n];for(let o=0;o<r;o+=1)s.push(new Float32Array(128));t.push(s)}return t},Ff=(i,e)=>{const t=Tn(wa,i),n=ut(e);return Tn(t,n)},kf=async(i,e,t,n,s,r,o)=>{const a=e===null?Math.ceil(i.context.length/128)*128:e.length,c=n.channelCount*n.numberOfInputs,l=s.reduce((m,f)=>m+f,0),u=l===0?null:t.createBuffer(l,a,t.sampleRate);if(r===void 0)throw new Error("Missing the processor constructor.");const h=zt(i),d=await Ff(t,i),p=lo(n.numberOfInputs,n.channelCount),_=lo(n.numberOfOutputs,s),g=Array.from(i.parameters.keys()).reduce((m,f)=>({...m,[f]:new Float32Array(128)}),{});for(let m=0;m<a;m+=128){if(n.numberOfInputs>0&&e!==null)for(let f=0;f<n.numberOfInputs;f+=1)for(let b=0;b<n.channelCount;b+=1)co(e,p[f],b,b,m);r.parameterDescriptors!==void 0&&e!==null&&r.parameterDescriptors.forEach(({name:f},b)=>{co(e,g,f,c+b,m)});for(let f=0;f<n.numberOfInputs;f+=1)for(let b=0;b<s[f];b+=1)_[f][b].byteLength===0&&(_[f][b]=new Float32Array(128));try{const f=p.map((T,x)=>h.activeInputs[x].size===0?[]:T),b=o(m/t.sampleRate,t.sampleRate,()=>d.process(f,_,g));if(u!==null)for(let T=0,x=0;T<n.numberOfOutputs;T+=1){for(let M=0;M<s[T];M+=1)ch(u,_[T],M,x+M,m);x+=s[T]}if(!b)break}catch(f){i.dispatchEvent(new ErrorEvent("processorerror",{colno:f.colno,filename:f.filename,lineno:f.lineno,message:f.message}));break}}return u},Bf=(i,e,t,n,s,r,o,a,c,l,u,h,d,p,_,g)=>(m,f,b)=>{const T=new WeakMap;let x=null;const M=async(E,w)=>{let C=u(E),S=null;const v=Ft(C,w),R=Array.isArray(f.outputChannelCount)?f.outputChannelCount:Array.from(f.outputChannelCount);if(h===null){const D=R.reduce((U,W)=>U+W,0),N=s(w,{channelCount:Math.max(1,D),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,D)}),O=[];for(let U=0;U<E.numberOfOutputs;U+=1)O.push(n(w,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:R[U]}));const G=o(w,{channelCount:f.channelCount,channelCountMode:f.channelCountMode,channelInterpretation:f.channelInterpretation,gain:1});G.connect=e.bind(null,O),G.disconnect=c.bind(null,O),S=[N,O,G]}else v||(C=new h(w,m));if(T.set(w,S===null?C:S[2]),S!==null){if(x===null){if(b===void 0)throw new Error("Missing the processor constructor.");if(d===null)throw new Error("Missing the native OfflineAudioContext constructor.");const W=E.channelCount*E.numberOfInputs,B=b.parameterDescriptors===void 0?0:b.parameterDescriptors.length,j=W+B;x=kf(E,j===0?null:await(async()=>{const ne=new d(j,Math.ceil(E.context.length/128)*128,w.sampleRate),ge=[],Le=[];for(let oe=0;oe<f.numberOfInputs;oe+=1)ge.push(o(ne,{channelCount:f.channelCount,channelCountMode:f.channelCountMode,channelInterpretation:f.channelInterpretation,gain:1})),Le.push(s(ne,{channelCount:f.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:f.channelCount}));const Y=await Promise.all(Array.from(E.parameters.values()).map(async oe=>{const se=r(ne,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:oe.value});return await p(ne,oe,se.offset),se})),$=n(ne,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,W+B)});for(let oe=0;oe<f.numberOfInputs;oe+=1){ge[oe].connect(Le[oe]);for(let se=0;se<f.channelCount;se+=1)Le[oe].connect($,se,oe*f.channelCount+se)}for(const[oe,se]of Y.entries())se.connect($,0,W+oe),se.start(0);return $.connect(ne.destination),await Promise.all(ge.map(oe=>_(E,ne,oe))),g(ne)})(),w,f,R,b,l)}const D=await x,N=t(w,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),[O,G,U]=S;D!==null&&(N.buffer=D,N.start(0)),N.connect(O);for(let W=0,B=0;W<E.numberOfOutputs;W+=1){const j=G[W];for(let J=0;J<R[W];J+=1)O.connect(j,B+J,J);B+=R[W]}return U}if(v)for(const[D,N]of E.parameters.entries())await i(w,N,C.parameters.get(D));else for(const[D,N]of E.parameters.entries())await p(w,N,C.parameters.get(D));return await _(E,w,C),C};return{render(E,w){a(w,E);const C=T.get(w);return C!==void 0?Promise.resolve(C):M(E,w)}}},Vf=(i,e,t,n,s,r,o,a,c,l,u,h,d,p,_,g,m,f,b,T)=>class extends _{constructor(M,E){super(M,E),this._nativeContext=M,this._audioWorklet=i===void 0?void 0:{addModule:(w,C)=>i(this,w,C)}}get audioWorklet(){return this._audioWorklet}createAnalyser(){return new e(this)}createBiquadFilter(){return new s(this)}createBuffer(M,E,w){return new t({length:E,numberOfChannels:M,sampleRate:w})}createBufferSource(){return new n(this)}createChannelMerger(M=6){return new r(this,{numberOfInputs:M})}createChannelSplitter(M=6){return new o(this,{numberOfOutputs:M})}createConstantSource(){return new a(this)}createConvolver(){return new c(this)}createDelay(M=1){return new u(this,{maxDelayTime:M})}createDynamicsCompressor(){return new h(this)}createGain(){return new d(this)}createIIRFilter(M,E){return new p(this,{feedback:E,feedforward:M})}createOscillator(){return new g(this)}createPanner(){return new m(this)}createPeriodicWave(M,E,w={disableNormalization:!1}){return new f(this,{...w,imag:E,real:M})}createStereoPanner(){return new b(this)}createWaveShaper(){return new T(this)}decodeAudioData(M,E,w){return l(this._nativeContext,M).then(C=>(typeof E=="function"&&E(C),C),C=>{throw typeof w=="function"&&w(C),C})}},zf={Q:1,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:350,gain:0,type:"lowpass"},Gf=(i,e,t,n,s,r,o,a)=>class extends i{constructor(l,u){const h=r(l),d={...zf,...u},p=s(h,d),_=o(h),g=_?t():null;super(l,!1,p,g),this._Q=e(this,_,p.Q,Vt,Qt),this._detune=e(this,_,p.detune,1200*Math.log2(Vt),-1200*Math.log2(Vt)),this._frequency=e(this,_,p.frequency,l.sampleRate/2,0),this._gain=e(this,_,p.gain,40*Math.log10(Vt),Qt),this._nativeBiquadFilterNode=p,a(this,1)}get detune(){return this._detune}get frequency(){return this._frequency}get gain(){return this._gain}get Q(){return this._Q}get type(){return this._nativeBiquadFilterNode.type}set type(l){this._nativeBiquadFilterNode.type=l}getFrequencyResponse(l,u,h){try{this._nativeBiquadFilterNode.getFrequencyResponse(l,u,h)}catch(d){throw d.code===11?n():d}if(l.length!==u.length||u.length!==h.length)throw n()}},Hf=(i,e,t,n,s)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const u=Ft(l,c);if(!u){const h={Q:l.Q.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,detune:l.detune.value,frequency:l.frequency.value,gain:l.gain.value,type:l.type};l=e(c,h)}return r.set(c,l),u?(await i(c,a.Q,l.Q),await i(c,a.detune,l.detune),await i(c,a.frequency,l.frequency),await i(c,a.gain,l.gain)):(await n(c,a.Q,l.Q),await n(c,a.detune,l.detune),await n(c,a.frequency,l.frequency),await n(c,a.gain,l.gain)),await s(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},Wf=(i,e)=>(t,n)=>{const s=e.get(t);if(s!==void 0)return s;const r=i.get(t);if(r!==void 0)return r;try{const o=n();return o instanceof Promise?(i.set(t,o),o.catch(()=>!1).then(a=>(i.delete(t),e.set(t,a),a))):(e.set(t,o),o)}catch{return e.set(t,!1),!1}},qf={channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6},Xf=(i,e,t,n,s)=>class extends i{constructor(o,a){const c=n(o),l={...qf,...a},u=t(c,l),h=s(c)?e():null;super(o,!1,u,h)}},Yf=(i,e,t)=>()=>{const n=new WeakMap,s=async(r,o)=>{let a=e(r);if(!Ft(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,numberOfInputs:a.numberOfInputs};a=i(o,l)}return n.set(o,a),await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):s(r,o)}}},jf={channelCount:6,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:6},$f=(i,e,t,n,s,r)=>class extends i{constructor(a,c){const l=n(a),u=r({...jf,...c}),h=t(l,u),d=s(l)?e():null;super(a,!1,h,d)}},Zf=(i,e,t)=>()=>{const n=new WeakMap,s=async(r,o)=>{let a=e(r);if(!Ft(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,numberOfOutputs:a.numberOfOutputs};a=i(o,l)}return n.set(o,a),await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):s(r,o)}}},Kf=i=>(e,t,n)=>i(t,e,n),Jf=i=>(e,t,n=0,s=0)=>{const r=e[n];if(r===void 0)throw i();return ao(t)?r.connect(t,0,s):r.connect(t,0)},Qf=i=>(e,t)=>{const n=i(e,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),s=e.createBuffer(1,2,44100);return n.buffer=s,n.loop=!0,n.connect(t),n.start(),()=>{n.stop(),n.disconnect(t)}},ep={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",offset:1},tp=(i,e,t,n,s,r,o)=>class extends i{constructor(c,l){const u=s(c),h={...ep,...l},d=n(u,h),p=r(u),_=p?t():null;super(c,!1,d,_),this._constantSourceNodeRenderer=_,this._nativeConstantSourceNode=d,this._offset=e(this,p,d.offset,Vt,Qt),this._onended=null}get offset(){return this._offset}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?o(this,c):null;this._nativeConstantSourceNode.onended=l;const u=this._nativeConstantSourceNode.onended;this._onended=u!==null&&u===l?c:u}start(c=0){if(this._nativeConstantSourceNode.start(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.start=c),this.context.state!=="closed"){_s(this);const l=()=>{this._nativeConstantSourceNode.removeEventListener("ended",l),Yn(this)&&tr(this)};this._nativeConstantSourceNode.addEventListener("ended",l)}}stop(c=0){this._nativeConstantSourceNode.stop(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.stop=c)}},np=(i,e,t,n,s)=>()=>{const r=new WeakMap;let o=null,a=null;const c=async(l,u)=>{let h=t(l);const d=Ft(h,u);if(!d){const p={channelCount:h.channelCount,channelCountMode:h.channelCountMode,channelInterpretation:h.channelInterpretation,offset:h.offset.value};h=e(u,p),o!==null&&h.start(o),a!==null&&h.stop(a)}return r.set(u,h),d?await i(u,l.offset,h.offset):await n(u,l.offset,h.offset),await s(l,u,h),h};return{set start(l){o=l},set stop(l){a=l},render(l,u){const h=r.get(u);return h!==void 0?Promise.resolve(h):c(l,u)}}},ip=i=>e=>(i[0]=e,i[0]),sp={buffer:null,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",disableNormalization:!1},rp=(i,e,t,n,s,r)=>class extends i{constructor(a,c){const l=n(a),u={...sp,...c},h=t(l,u),p=s(l)?e():null;super(a,!1,h,p),this._isBufferNullified=!1,this._nativeConvolverNode=h,u.buffer!==null&&r(this,u.buffer.duration)}get buffer(){return this._isBufferNullified?null:this._nativeConvolverNode.buffer}set buffer(a){if(this._nativeConvolverNode.buffer=a,a===null&&this._nativeConvolverNode.buffer!==null){const c=this._nativeConvolverNode.context;this._nativeConvolverNode.buffer=c.createBuffer(1,1,c.sampleRate),this._isBufferNullified=!0,r(this,0)}else this._isBufferNullified=!1,r(this,this._nativeConvolverNode.buffer===null?0:this._nativeConvolverNode.buffer.duration)}get normalize(){return this._nativeConvolverNode.normalize}set normalize(a){this._nativeConvolverNode.normalize=a}},op=(i,e,t)=>()=>{const n=new WeakMap,s=async(r,o)=>{let a=e(r);if(!Ft(a,o)){const l={buffer:a.buffer,channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,disableNormalization:!a.normalize};a=i(o,l)}return n.set(o,a),Cs(a)?await t(r,o,a.inputs[0]):await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):s(r,o)}}},ap=(i,e)=>(t,n,s)=>{if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");try{return new e(t,n,s)}catch(r){throw r.name==="SyntaxError"?i():r}},cp=()=>new DOMException("","DataCloneError"),kl=i=>{const{port1:e,port2:t}=new MessageChannel;return new Promise(n=>{const s=()=>{t.onmessage=null,e.close(),t.close(),n()};t.onmessage=()=>s();try{e.postMessage(i,[i])}catch{}finally{s()}})},lp=(i,e,t,n,s,r,o,a,c,l,u)=>(h,d)=>{const p=o(h)?h:r(h);if(s.has(d)){const _=t();return Promise.reject(_)}try{s.add(d)}catch{}return e(c,()=>c(p))?p.decodeAudioData(d).then(_=>(kl(d).catch(()=>{}),e(a,()=>a(_))||u(_),i.add(_),_)):new Promise((_,g)=>{const m=async()=>{try{await kl(d)}catch{}},f=b=>{g(b),m()};try{p.decodeAudioData(d,b=>{typeof b.copyFromChannel!="function"&&(l(b),Ec(b)),i.add(b),m().then(()=>_(b))},b=>{f(b===null?n():b)})}catch(b){f(b)}})},up=(i,e,t,n,s,r,o,a)=>(c,l)=>{const u=e.get(c);if(u===void 0)throw new Error("Missing the expected cycle count.");const h=r(c.context),d=a(h);if(u===l){if(e.delete(c),!d&&o(c)){const p=n(c),{outputs:_}=t(c);for(const g of _)if(ir(g)){const m=n(g[0]);i(p,m,g[1],g[2])}else{const m=s(g[0]);p.connect(m,g[1])}}}else e.set(c,u-l)},hp={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",delayTime:0,maxDelayTime:1},dp=(i,e,t,n,s,r,o)=>class extends i{constructor(c,l){const u=s(c),h={...hp,...l},d=n(u,h),p=r(u),_=p?t(h.maxDelayTime):null;super(c,!1,d,_),this._delayTime=e(this,p,d.delayTime),o(this,h.maxDelayTime)}get delayTime(){return this._delayTime}},fp=(i,e,t,n,s)=>r=>{const o=new WeakMap,a=async(c,l)=>{let u=t(c);const h=Ft(u,l);if(!h){const d={channelCount:u.channelCount,channelCountMode:u.channelCountMode,channelInterpretation:u.channelInterpretation,delayTime:u.delayTime.value,maxDelayTime:r};u=e(l,d)}return o.set(l,u),h?await i(l,c.delayTime,u.delayTime):await n(l,c.delayTime,u.delayTime),await s(c,l,u),u};return{render(c,l){const u=o.get(l);return u!==void 0?Promise.resolve(u):a(c,l)}}},pp=i=>(e,t,n,s)=>i(e[s],r=>r[0]===t&&r[1]===n),mp=i=>(e,t)=>{i(e).delete(t)},_p=i=>"delayTime"in i,gp=(i,e,t)=>function n(s,r){const o=so(r)?r:t(i,r);if(_p(o))return[];if(s[0]===o)return[s];if(s.includes(o))return[];const{outputs:a}=e(o);return Array.from(a).map(c=>n([...s,o],c[0])).reduce((c,l)=>c.concat(l),[])},Sr=(i,e,t)=>{const n=e[t];if(n===void 0)throw i();return n},vp=i=>(e,t=void 0,n=void 0,s=0)=>t===void 0?e.forEach(r=>r.disconnect()):typeof t=="number"?Sr(i,e,t).disconnect():ao(t)?n===void 0?e.forEach(r=>r.disconnect(t)):s===void 0?Sr(i,e,n).disconnect(t,0):Sr(i,e,n).disconnect(t,0,s):n===void 0?e.forEach(r=>r.disconnect(t)):Sr(i,e,n).disconnect(t,0),xp={attack:.003,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",knee:30,ratio:12,release:.25,threshold:-24},Sp=(i,e,t,n,s,r,o,a)=>class extends i{constructor(l,u){const h=r(l),d={...xp,...u},p=n(h,d),_=o(h),g=_?t():null;super(l,!1,p,g),this._attack=e(this,_,p.attack),this._knee=e(this,_,p.knee),this._nativeDynamicsCompressorNode=p,this._ratio=e(this,_,p.ratio),this._release=e(this,_,p.release),this._threshold=e(this,_,p.threshold),a(this,.006)}get attack(){return this._attack}get channelCount(){return this._nativeDynamicsCompressorNode.channelCount}set channelCount(l){const u=this._nativeDynamicsCompressorNode.channelCount;if(this._nativeDynamicsCompressorNode.channelCount=l,l>2)throw this._nativeDynamicsCompressorNode.channelCount=u,s()}get channelCountMode(){return this._nativeDynamicsCompressorNode.channelCountMode}set channelCountMode(l){const u=this._nativeDynamicsCompressorNode.channelCountMode;if(this._nativeDynamicsCompressorNode.channelCountMode=l,l==="max")throw this._nativeDynamicsCompressorNode.channelCountMode=u,s()}get knee(){return this._knee}get ratio(){return this._ratio}get reduction(){return typeof this._nativeDynamicsCompressorNode.reduction.value=="number"?this._nativeDynamicsCompressorNode.reduction.value:this._nativeDynamicsCompressorNode.reduction}get release(){return this._release}get threshold(){return this._threshold}},yp=(i,e,t,n,s)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const u=Ft(l,c);if(!u){const h={attack:l.attack.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,knee:l.knee.value,ratio:l.ratio.value,release:l.release.value,threshold:l.threshold.value};l=e(c,h)}return r.set(c,l),u?(await i(c,a.attack,l.attack),await i(c,a.knee,l.knee),await i(c,a.ratio,l.ratio),await i(c,a.release,l.release),await i(c,a.threshold,l.threshold)):(await n(c,a.attack,l.attack),await n(c,a.knee,l.knee),await n(c,a.ratio,l.ratio),await n(c,a.release,l.release),await n(c,a.threshold,l.threshold)),await s(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},Mp=()=>new DOMException("","EncodingError"),Tp=i=>e=>new Promise((t,n)=>{if(i===null){n(new SyntaxError);return}const s=i.document.head;if(s===null)n(new SyntaxError);else{const r=i.document.createElement("script"),o=new Blob([e],{type:"application/javascript"}),a=URL.createObjectURL(o),c=i.onerror,l=()=>{i.onerror=c,URL.revokeObjectURL(a)};i.onerror=(u,h,d,p,_)=>{if(h===a||h===i.location.href&&d===1&&p===1)return l(),n(_),!1;if(c!==null)return c(u,h,d,p,_)},r.onerror=()=>{l(),n(new SyntaxError)},r.onload=()=>{l(),t()},r.src=a,r.type="module",s.appendChild(r)}}),Ep=i=>class{constructor(t){this._nativeEventTarget=t,this._listeners=new WeakMap}addEventListener(t,n,s){if(n!==null){let r=this._listeners.get(n);r===void 0&&(r=i(this,n),typeof n=="function"&&this._listeners.set(n,r)),this._nativeEventTarget.addEventListener(t,r,s)}}dispatchEvent(t){return this._nativeEventTarget.dispatchEvent(t)}removeEventListener(t,n,s){const r=n===null?void 0:this._listeners.get(n);this._nativeEventTarget.removeEventListener(t,r===void 0?null:r,s)}},bp=i=>(e,t,n)=>{Object.defineProperties(i,{currentFrame:{configurable:!0,get(){return Math.round(e*t)}},currentTime:{configurable:!0,get(){return e}}});try{return n()}finally{i!==null&&(delete i.currentFrame,delete i.currentTime)}},Ap=i=>async e=>{try{const t=await fetch(e);if(t.ok)return[await t.text(),t.url]}catch{}throw i()},wp={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",gain:1},Cp=(i,e,t,n,s,r)=>class extends i{constructor(a,c){const l=s(a),u={...wp,...c},h=n(l,u),d=r(l),p=d?t():null;super(a,!1,h,p),this._gain=e(this,d,h.gain,Vt,Qt)}get gain(){return this._gain}},Rp=(i,e,t,n,s)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const u=Ft(l,c);if(!u){const h={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,gain:l.gain.value};l=e(c,h)}return r.set(c,l),u?await i(c,a.gain,l.gain):await n(c,a.gain,l.gain),await s(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},Pp=(i,e)=>t=>e(i,t),Dp=i=>e=>{const t=i(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioNode in the audio graph.");return t.renderer},Ip=i=>e=>{var t;return(t=i.get(e))!==null&&t!==void 0?t:0},Np=i=>e=>{const t=i(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioParam in the audio graph.");return t.renderer},Lp=i=>e=>i.get(e),Rt=()=>new DOMException("","InvalidStateError"),Op=i=>e=>{const t=i.get(e);if(t===void 0)throw Rt();return t},Up=(i,e)=>t=>{let n=i.get(t);if(n!==void 0)return n;if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");return n=new e(1,1,44100),i.set(t,n),n},Fp=i=>e=>{const t=i.get(e);if(t===void 0)throw new Error("The context has no set of AudioWorkletNodes.");return t},xo=()=>new DOMException("","InvalidAccessError"),kp=i=>{i.getFrequencyResponse=(e=>(t,n,s)=>{if(t.length!==n.length||n.length!==s.length)throw xo();return e.call(i,t,n,s)})(i.getFrequencyResponse)},Bp={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers"},Vp=(i,e,t,n,s,r)=>class extends i{constructor(a,c){const l=n(a),u=s(l),h={...Bp,...c},d=e(l,u?null:a.baseLatency,h),p=u?t(h.feedback,h.feedforward):null;super(a,!1,d,p),kp(d),this._nativeIIRFilterNode=d,r(this,1)}getFrequencyResponse(a,c,l){return this._nativeIIRFilterNode.getFrequencyResponse(a,c,l)}},lh=(i,e,t,n,s,r,o,a,c,l,u)=>{const h=l.length;let d=a;for(let p=0;p<h;p+=1){let _=t[0]*l[p];for(let g=1;g<s;g+=1){const m=d-g&c-1;_+=t[g]*r[m],_-=i[g]*o[m]}for(let g=s;g<n;g+=1)_+=t[g]*r[d-g&c-1];for(let g=s;g<e;g+=1)_-=i[g]*o[d-g&c-1];r[d]=l[p],o[d]=_,d=d+1&c-1,u[p]=_}return d},zp=(i,e,t,n)=>{const s=t instanceof Float64Array?t:new Float64Array(t),r=n instanceof Float64Array?n:new Float64Array(n),o=s.length,a=r.length,c=Math.min(o,a);if(s[0]!==1){for(let _=0;_<o;_+=1)r[_]/=s[0];for(let _=1;_<a;_+=1)s[_]/=s[0]}const l=32,u=new Float32Array(l),h=new Float32Array(l),d=e.createBuffer(i.numberOfChannels,i.length,i.sampleRate),p=i.numberOfChannels;for(let _=0;_<p;_+=1){const g=i.getChannelData(_),m=d.getChannelData(_);u.fill(0),h.fill(0),lh(s,o,r,a,c,u,h,0,l,g,m)}return d},Gp=(i,e,t,n,s)=>(r,o)=>{const a=new WeakMap;let c=null;const l=async(u,h)=>{let d=null,p=e(u);const _=Ft(p,h);if(h.createIIRFilter===void 0?d=i(h,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}):_||(p=h.createIIRFilter(o,r)),a.set(h,d===null?p:d),d!==null){if(c===null){if(t===null)throw new Error("Missing the native OfflineAudioContext constructor.");const m=new t(u.context.destination.channelCount,u.context.length,h.sampleRate);c=(async()=>{await n(u,m,m.destination);const f=await s(m);return zp(f,h,r,o)})()}const g=await c;return d.buffer=g,d.start(0),d}return await n(u,h,p),p};return{render(u,h){const d=a.get(h);return d!==void 0?Promise.resolve(d):l(u,h)}}},Hp=(i,e,t,n,s,r)=>o=>(a,c)=>{const l=i.get(a);if(l===void 0){if(!o&&r(a)){const u=n(a),{outputs:h}=t(a);for(const d of h)if(ir(d)){const p=n(d[0]);e(u,p,d[1],d[2])}else{const p=s(d[0]);u.disconnect(p,d[1])}}i.set(a,c)}else i.set(a,l+c)},Wp=(i,e)=>t=>{const n=i.get(t);return e(n)||e(t)},qp=(i,e)=>t=>i.has(t)||e(t),Xp=(i,e)=>t=>i.has(t)||e(t),Yp=(i,e)=>t=>{const n=i.get(t);return e(n)||e(t)},jp=i=>e=>i!==null&&e instanceof i,$p=i=>e=>i!==null&&typeof i.AudioNode=="function"&&e instanceof i.AudioNode,Zp=i=>e=>i!==null&&typeof i.AudioParam=="function"&&e instanceof i.AudioParam,Kp=(i,e)=>t=>i(t)||e(t),Jp=i=>e=>i!==null&&e instanceof i,Qp=i=>i!==null&&i.isSecureContext,em=(i,e,t,n)=>class extends i{constructor(r,o){const a=t(r),c=e(a,o);if(n(a))throw TypeError();super(r,!0,c,null),this._nativeMediaElementAudioSourceNode=c}get mediaElement(){return this._nativeMediaElementAudioSourceNode.mediaElement}},tm={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"},nm=(i,e,t,n)=>class extends i{constructor(r,o){const a=t(r);if(n(a))throw new TypeError;const c={...tm,...o},l=e(a,c);super(r,!1,l,null),this._nativeMediaStreamAudioDestinationNode=l}get stream(){return this._nativeMediaStreamAudioDestinationNode.stream}},im=(i,e,t,n)=>class extends i{constructor(r,o){const a=t(r),c=e(a,o);if(n(a))throw new TypeError;super(r,!0,c,null),this._nativeMediaStreamAudioSourceNode=c}get mediaStream(){return this._nativeMediaStreamAudioSourceNode.mediaStream}},sm=(i,e,t)=>class extends i{constructor(s,r){const o=t(s),a=e(o,r);super(s,!0,a,null)}},rm=(i,e,t,n,s,r)=>class extends t{constructor(a,c){super(a),this._nativeContext=a,go.set(this,a),n(a)&&s.set(a,new Set),this._destination=new i(this,c),this._listener=e(this,a),this._onstatechange=null}get currentTime(){return this._nativeContext.currentTime}get destination(){return this._destination}get listener(){return this._listener}get onstatechange(){return this._onstatechange}set onstatechange(a){const c=typeof a=="function"?r(this,a):null;this._nativeContext.onstatechange=c;const l=this._nativeContext.onstatechange;this._onstatechange=l!==null&&l===c?a:l}get sampleRate(){return this._nativeContext.sampleRate}get state(){return this._nativeContext.state}},js=i=>{const e=new Uint32Array([1179011410,40,1163280727,544501094,16,131073,44100,176400,1048580,1635017060,4,0]);try{const t=i.decodeAudioData(e.buffer,()=>{});return t===void 0?!1:(t.catch(()=>{}),!0)}catch{}return!1},om=(i,e)=>(t,n,s)=>{const r=new Set;return t.connect=(o=>(a,c=0,l=0)=>{const u=r.size===0;if(e(a))return o.call(t,a,c,l),i(r,[a,c,l],h=>h[0]===a&&h[1]===c&&h[2]===l,!0),u&&n(),a;o.call(t,a,c),i(r,[a,c],h=>h[0]===a&&h[1]===c,!0),u&&n()})(t.connect),t.disconnect=(o=>(a,c,l)=>{const u=r.size>0;if(a===void 0)o.apply(t),r.clear();else if(typeof a=="number"){o.call(t,a);for(const d of r)d[1]===a&&r.delete(d)}else{e(a)?o.call(t,a,c,l):o.call(t,a,c);for(const d of r)d[0]===a&&(c===void 0||d[1]===c)&&(l===void 0||d[2]===l)&&r.delete(d)}const h=r.size===0;u&&h&&s()})(t.disconnect),t},dt=(i,e,t)=>{const n=e[t];n!==void 0&&n!==i[t]&&(i[t]=n)},bt=(i,e)=>{dt(i,e,"channelCount"),dt(i,e,"channelCountMode"),dt(i,e,"channelInterpretation")},Bl=i=>typeof i.getFloatTimeDomainData=="function",am=i=>{i.getFloatTimeDomainData=e=>{const t=new Uint8Array(e.length);i.getByteTimeDomainData(t);const n=Math.max(t.length,i.fftSize);for(let s=0;s<n;s+=1)e[s]=(t[s]-128)*.0078125;return e}},cm=(i,e)=>(t,n)=>{const s=t.createAnalyser();if(bt(s,n),!(n.maxDecibels>n.minDecibels))throw e();return dt(s,n,"fftSize"),dt(s,n,"maxDecibels"),dt(s,n,"minDecibels"),dt(s,n,"smoothingTimeConstant"),i(Bl,()=>Bl(s))||am(s),s},lm=i=>i===null?null:i.hasOwnProperty("AudioBuffer")?i.AudioBuffer:null,gt=(i,e,t)=>{const n=e[t];n!==void 0&&n!==i[t].value&&(i[t].value=n)},um=i=>{i.start=(e=>{let t=!1;return(n=0,s=0,r)=>{if(t)throw Rt();e.call(i,n,s,r),t=!0}})(i.start)},wc=i=>{i.start=(e=>(t=0,n=0,s)=>{if(typeof s=="number"&&s<0||n<0||t<0)throw new RangeError("The parameters can't be negative.");e.call(i,t,n,s)})(i.start)},Cc=i=>{i.stop=(e=>(t=0)=>{if(t<0)throw new RangeError("The parameter can't be negative.");e.call(i,t)})(i.stop)},hm=(i,e,t,n,s,r,o,a,c,l,u)=>(h,d)=>{const p=h.createBufferSource();return bt(p,d),gt(p,d,"playbackRate"),dt(p,d,"buffer"),dt(p,d,"loop"),dt(p,d,"loopEnd"),dt(p,d,"loopStart"),e(t,()=>t(h))||um(p),e(n,()=>n(h))||c(p),e(s,()=>s(h))||l(p,h),e(r,()=>r(h))||wc(p),e(o,()=>o(h))||u(p,h),e(a,()=>a(h))||Cc(p),i(h,p),p},dm=i=>i===null?null:i.hasOwnProperty("AudioContext")?i.AudioContext:i.hasOwnProperty("webkitAudioContext")?i.webkitAudioContext:null,fm=(i,e)=>(t,n,s)=>{const r=t.destination;if(r.channelCount!==n)try{r.channelCount=n}catch{}s&&r.channelCountMode!=="explicit"&&(r.channelCountMode="explicit"),r.maxChannelCount===0&&Object.defineProperty(r,"maxChannelCount",{value:n});const o=i(t,{channelCount:n,channelCountMode:r.channelCountMode,channelInterpretation:r.channelInterpretation,gain:1});return e(o,"channelCount",a=>()=>a.call(o),a=>c=>{a.call(o,c);try{r.channelCount=c}catch(l){if(c>r.maxChannelCount)throw l}}),e(o,"channelCountMode",a=>()=>a.call(o),a=>c=>{a.call(o,c),r.channelCountMode=c}),e(o,"channelInterpretation",a=>()=>a.call(o),a=>c=>{a.call(o,c),r.channelInterpretation=c}),Object.defineProperty(o,"maxChannelCount",{get:()=>r.maxChannelCount}),o.connect(r),o},pm=i=>i===null?null:i.hasOwnProperty("AudioWorkletNode")?i.AudioWorkletNode:null,mm=i=>{const{port1:e}=new MessageChannel;try{e.postMessage(i)}finally{e.close()}},_m=(i,e,t,n,s)=>(r,o,a,c,l,u)=>{if(a!==null)try{const h=new a(r,c,u),d=new Map;let p=null;if(Object.defineProperties(h,{channelCount:{get:()=>u.channelCount,set:()=>{throw i()}},channelCountMode:{get:()=>"explicit",set:()=>{throw i()}},onprocessorerror:{get:()=>p,set:_=>{typeof p=="function"&&h.removeEventListener("processorerror",p),p=typeof _=="function"?_:null,typeof p=="function"&&h.addEventListener("processorerror",p)}}}),h.addEventListener=(_=>(...g)=>{if(g[0]==="processorerror"){const m=typeof g[1]=="function"?g[1]:typeof g[1]=="object"&&g[1]!==null&&typeof g[1].handleEvent=="function"?g[1].handleEvent:null;if(m!==null){const f=d.get(g[1]);f!==void 0?g[1]=f:(g[1]=b=>{b.type==="error"?(Object.defineProperties(b,{type:{value:"processorerror"}}),m(b)):m(new ErrorEvent(g[0],{...b}))},d.set(m,g[1]))}}return _.call(h,"error",g[1],g[2]),_.call(h,...g)})(h.addEventListener),h.removeEventListener=(_=>(...g)=>{if(g[0]==="processorerror"){const m=d.get(g[1]);m!==void 0&&(d.delete(g[1]),g[1]=m)}return _.call(h,"error",g[1],g[2]),_.call(h,g[0],g[1],g[2])})(h.removeEventListener),u.numberOfOutputs!==0){const _=t(r,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return h.connect(_).connect(r.destination),s(h,()=>_.disconnect(),()=>_.connect(r.destination))}return h}catch(h){throw h.code===11?n():h}if(l===void 0)throw n();return mm(u),e(r,o,l,u)},uh=(i,e)=>i===null?512:Math.max(512,Math.min(16384,Math.pow(2,Math.round(Math.log2(i*e))))),gm=i=>new Promise((e,t)=>{const{port1:n,port2:s}=new MessageChannel;n.onmessage=({data:r})=>{n.close(),s.close(),e(r)},n.onmessageerror=({data:r})=>{n.close(),s.close(),t(r)},s.postMessage(i)}),vm=async(i,e)=>{const t=await gm(e);return new i(t)},xm=(i,e,t,n)=>{let s=wa.get(i);s===void 0&&(s=new WeakMap,wa.set(i,s));const r=vm(t,n);return s.set(e,r),r},Sm=(i,e,t,n,s,r,o,a,c,l,u,h,d)=>(p,_,g,m)=>{if(m.numberOfInputs===0&&m.numberOfOutputs===0)throw c();const f=Array.isArray(m.outputChannelCount)?m.outputChannelCount:Array.from(m.outputChannelCount);if(f.some(ae=>ae<1))throw c();if(f.length!==m.numberOfOutputs)throw e();if(m.channelCountMode!=="explicit")throw c();const b=m.channelCount*m.numberOfInputs,T=f.reduce((ae,ce)=>ae+ce,0),x=g.parameterDescriptors===void 0?0:g.parameterDescriptors.length;if(b+x>6||T>6)throw c();const M=new MessageChannel,E=[],w=[];for(let ae=0;ae<m.numberOfInputs;ae+=1)E.push(o(p,{channelCount:m.channelCount,channelCountMode:m.channelCountMode,channelInterpretation:m.channelInterpretation,gain:1})),w.push(s(p,{channelCount:m.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:m.channelCount}));const C=[];if(g.parameterDescriptors!==void 0)for(const{defaultValue:ae,maxValue:ce,minValue:Ae,name:le}of g.parameterDescriptors){const Te=r(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:m.parameterData[le]!==void 0?m.parameterData[le]:ae===void 0?0:ae});Object.defineProperties(Te.offset,{defaultValue:{get:()=>ae===void 0?0:ae},maxValue:{get:()=>ce===void 0?Vt:ce},minValue:{get:()=>Ae===void 0?Qt:Ae}}),C.push(Te)}const S=n(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,b+x)}),v=uh(_,p.sampleRate),R=a(p,v,b+x,Math.max(1,T)),D=s(p,{channelCount:Math.max(1,T),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,T)}),N=[];for(let ae=0;ae<m.numberOfOutputs;ae+=1)N.push(n(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:f[ae]}));for(let ae=0;ae<m.numberOfInputs;ae+=1){E[ae].connect(w[ae]);for(let ce=0;ce<m.channelCount;ce+=1)w[ae].connect(S,ce,ae*m.channelCount+ce)}const O=new ah(g.parameterDescriptors===void 0?[]:g.parameterDescriptors.map(({name:ae},ce)=>{const Ae=C[ce];return Ae.connect(S,0,b+ce),Ae.start(0),[ae,Ae.offset]}));S.connect(R);let G=m.channelInterpretation,U=null;const W=m.numberOfOutputs===0?[R]:N,B={get bufferSize(){return v},get channelCount(){return m.channelCount},set channelCount(ae){throw t()},get channelCountMode(){return m.channelCountMode},set channelCountMode(ae){throw t()},get channelInterpretation(){return G},set channelInterpretation(ae){for(const ce of E)ce.channelInterpretation=ae;G=ae},get context(){return R.context},get inputs(){return E},get numberOfInputs(){return m.numberOfInputs},get numberOfOutputs(){return m.numberOfOutputs},get onprocessorerror(){return U},set onprocessorerror(ae){typeof U=="function"&&B.removeEventListener("processorerror",U),U=typeof ae=="function"?ae:null,typeof U=="function"&&B.addEventListener("processorerror",U)},get parameters(){return O},get port(){return M.port2},addEventListener(...ae){return R.addEventListener(ae[0],ae[1],ae[2])},connect:i.bind(null,W),disconnect:l.bind(null,W),dispatchEvent(...ae){return R.dispatchEvent(ae[0])},removeEventListener(...ae){return R.removeEventListener(ae[0],ae[1],ae[2])}},j=new Map;M.port1.addEventListener=(ae=>(...ce)=>{if(ce[0]==="message"){const Ae=typeof ce[1]=="function"?ce[1]:typeof ce[1]=="object"&&ce[1]!==null&&typeof ce[1].handleEvent=="function"?ce[1].handleEvent:null;if(Ae!==null){const le=j.get(ce[1]);le!==void 0?ce[1]=le:(ce[1]=Te=>{u(p.currentTime,p.sampleRate,()=>Ae(Te))},j.set(Ae,ce[1]))}}return ae.call(M.port1,ce[0],ce[1],ce[2])})(M.port1.addEventListener),M.port1.removeEventListener=(ae=>(...ce)=>{if(ce[0]==="message"){const Ae=j.get(ce[1]);Ae!==void 0&&(j.delete(ce[1]),ce[1]=Ae)}return ae.call(M.port1,ce[0],ce[1],ce[2])})(M.port1.removeEventListener);let J=null;Object.defineProperty(M.port1,"onmessage",{get:()=>J,set:ae=>{typeof J=="function"&&M.port1.removeEventListener("message",J),J=typeof ae=="function"?ae:null,typeof J=="function"&&(M.port1.addEventListener("message",J),M.port1.start())}}),g.prototype.port=M.port1;let ne=null;xm(p,B,g,m).then(ae=>ne=ae);const Le=lo(m.numberOfInputs,m.channelCount),Y=lo(m.numberOfOutputs,f),$=g.parameterDescriptors===void 0?[]:g.parameterDescriptors.reduce((ae,{name:ce})=>({...ae,[ce]:new Float32Array(128)}),{});let oe=!0;const se=()=>{m.numberOfOutputs>0&&R.disconnect(D);for(let ae=0,ce=0;ae<m.numberOfOutputs;ae+=1){const Ae=N[ae];for(let le=0;le<f[ae];le+=1)D.disconnect(Ae,ce+le,le);ce+=f[ae]}},ee=new Map;R.onaudioprocess=({inputBuffer:ae,outputBuffer:ce})=>{if(ne!==null){const Ae=h(B);for(let le=0;le<v;le+=128){for(let Te=0;Te<m.numberOfInputs;Te+=1)for(let ue=0;ue<m.channelCount;ue+=1)co(ae,Le[Te],ue,ue,le);g.parameterDescriptors!==void 0&&g.parameterDescriptors.forEach(({name:Te},ue)=>{co(ae,$,Te,b+ue,le)});for(let Te=0;Te<m.numberOfInputs;Te+=1)for(let ue=0;ue<f[Te];ue+=1)Y[Te][ue].byteLength===0&&(Y[Te][ue]=new Float32Array(128));try{const Te=Le.map((P,y)=>{if(Ae[y].size>0)return ee.set(y,v/128),P;const K=ee.get(y);return K===void 0?[]:(P.every(te=>te.every(Z=>Z===0))&&(K===1?ee.delete(y):ee.set(y,K-1)),P)});oe=u(p.currentTime+le/p.sampleRate,p.sampleRate,()=>ne.process(Te,Y,$));for(let P=0,y=0;P<m.numberOfOutputs;P+=1){for(let V=0;V<f[P];V+=1)ch(ce,Y[P],V,y+V,le);y+=f[P]}}catch(Te){oe=!1,B.dispatchEvent(new ErrorEvent("processorerror",{colno:Te.colno,filename:Te.filename,lineno:Te.lineno,message:Te.message}))}if(!oe){for(let Te=0;Te<m.numberOfInputs;Te+=1){E[Te].disconnect(w[Te]);for(let ue=0;ue<m.channelCount;ue+=1)w[le].disconnect(S,ue,Te*m.channelCount+ue)}if(g.parameterDescriptors!==void 0){const Te=g.parameterDescriptors.length;for(let ue=0;ue<Te;ue+=1){const P=C[ue];P.disconnect(S,0,b+ue),P.stop()}}S.disconnect(R),R.onaudioprocess=null,ze?se():Je();break}}}};let ze=!1;const be=o(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0}),nt=()=>R.connect(be).connect(p.destination),Je=()=>{R.disconnect(be),be.disconnect()},Ge=()=>{if(oe){Je(),m.numberOfOutputs>0&&R.connect(D);for(let ae=0,ce=0;ae<m.numberOfOutputs;ae+=1){const Ae=N[ae];for(let le=0;le<f[ae];le+=1)D.connect(Ae,ce+le,le);ce+=f[ae]}}ze=!0},I=()=>{oe&&(nt(),se()),ze=!1};return nt(),d(B,Ge,I)},hh=(i,e)=>{const t=i.createBiquadFilter();return bt(t,e),gt(t,e,"Q"),gt(t,e,"detune"),gt(t,e,"frequency"),gt(t,e,"gain"),dt(t,e,"type"),t},ym=(i,e)=>(t,n)=>{const s=t.createChannelMerger(n.numberOfInputs);return i!==null&&i.name==="webkitAudioContext"&&e(t,s),bt(s,n),s},Mm=i=>{const e=i.numberOfOutputs;Object.defineProperty(i,"channelCount",{get:()=>e,set:t=>{if(t!==e)throw Rt()}}),Object.defineProperty(i,"channelCountMode",{get:()=>"explicit",set:t=>{if(t!=="explicit")throw Rt()}}),Object.defineProperty(i,"channelInterpretation",{get:()=>"discrete",set:t=>{if(t!=="discrete")throw Rt()}})},sr=(i,e)=>{const t=i.createChannelSplitter(e.numberOfOutputs);return bt(t,e),Mm(t),t},Tm=(i,e,t,n,s)=>(r,o)=>{if(r.createConstantSource===void 0)return t(r,o);const a=r.createConstantSource();return bt(a,o),gt(a,o,"offset"),e(n,()=>n(r))||wc(a),e(s,()=>s(r))||Cc(a),i(r,a),a},Rs=(i,e)=>(i.connect=e.connect.bind(e),i.disconnect=e.disconnect.bind(e),i),Em=(i,e,t,n)=>(s,{offset:r,...o})=>{const a=s.createBuffer(1,2,44100),c=e(s,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),l=t(s,{...o,gain:r}),u=a.getChannelData(0);u[0]=1,u[1]=1,c.buffer=a,c.loop=!0;const h={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(_){l.channelCount=_},get channelCountMode(){return l.channelCountMode},set channelCountMode(_){l.channelCountMode=_},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(_){l.channelInterpretation=_},get context(){return l.context},get inputs(){return[]},get numberOfInputs(){return c.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get offset(){return l.gain},get onended(){return c.onended},set onended(_){c.onended=_},addEventListener(..._){return c.addEventListener(_[0],_[1],_[2])},dispatchEvent(..._){return c.dispatchEvent(_[0])},removeEventListener(..._){return c.removeEventListener(_[0],_[1],_[2])},start(_=0){c.start.call(c,_)},stop(_=0){c.stop.call(c,_)}},d=()=>c.connect(l),p=()=>c.disconnect(l);return i(s,c),n(Rs(h,l),d,p)},bm=(i,e)=>(t,n)=>{const s=t.createConvolver();if(bt(s,n),n.disableNormalization===s.normalize&&(s.normalize=!n.disableNormalization),dt(s,n,"buffer"),n.channelCount>2||(e(s,"channelCount",r=>()=>r.call(s),r=>o=>{if(o>2)throw i();return r.call(s,o)}),n.channelCountMode==="max"))throw i();return e(s,"channelCountMode",r=>()=>r.call(s),r=>o=>{if(o==="max")throw i();return r.call(s,o)}),s},dh=(i,e)=>{const t=i.createDelay(e.maxDelayTime);return bt(t,e),gt(t,e,"delayTime"),t},Am=i=>(e,t)=>{const n=e.createDynamicsCompressor();if(bt(n,t),t.channelCount>2||t.channelCountMode==="max")throw i();return gt(n,t,"attack"),gt(n,t,"knee"),gt(n,t,"ratio"),gt(n,t,"release"),gt(n,t,"threshold"),n},$t=(i,e)=>{const t=i.createGain();return bt(t,e),gt(t,e,"gain"),t},wm=i=>(e,t,n)=>{if(e.createIIRFilter===void 0)return i(e,t,n);const s=e.createIIRFilter(n.feedforward,n.feedback);return bt(s,n),s};function Cm(i,e){const t=e[0]*e[0]+e[1]*e[1];return[(i[0]*e[0]+i[1]*e[1])/t,(i[1]*e[0]-i[0]*e[1])/t]}function Rm(i,e){return[i[0]*e[0]-i[1]*e[1],i[0]*e[1]+i[1]*e[0]]}function Vl(i,e){let t=[0,0];for(let n=i.length-1;n>=0;n-=1)t=Rm(t,e),t[0]+=i[n];return t}const Pm=(i,e,t,n)=>(s,r,{channelCount:o,channelCountMode:a,channelInterpretation:c,feedback:l,feedforward:u})=>{const h=uh(r,s.sampleRate),d=l instanceof Float64Array?l:new Float64Array(l),p=u instanceof Float64Array?u:new Float64Array(u),_=d.length,g=p.length,m=Math.min(_,g);if(_===0||_>20)throw n();if(d[0]===0)throw e();if(g===0||g>20)throw n();if(p[0]===0)throw e();if(d[0]!==1){for(let C=0;C<g;C+=1)p[C]/=d[0];for(let C=1;C<_;C+=1)d[C]/=d[0]}const f=t(s,h,o,o);f.channelCount=o,f.channelCountMode=a,f.channelInterpretation=c;const b=32,T=[],x=[],M=[];for(let C=0;C<o;C+=1){T.push(0);const S=new Float32Array(b),v=new Float32Array(b);S.fill(0),v.fill(0),x.push(S),M.push(v)}f.onaudioprocess=C=>{const S=C.inputBuffer,v=C.outputBuffer,R=S.numberOfChannels;for(let D=0;D<R;D+=1){const N=S.getChannelData(D),O=v.getChannelData(D);T[D]=lh(d,_,p,g,m,x[D],M[D],T[D],b,N,O)}};const E=s.sampleRate/2;return Rs({get bufferSize(){return h},get channelCount(){return f.channelCount},set channelCount(C){f.channelCount=C},get channelCountMode(){return f.channelCountMode},set channelCountMode(C){f.channelCountMode=C},get channelInterpretation(){return f.channelInterpretation},set channelInterpretation(C){f.channelInterpretation=C},get context(){return f.context},get inputs(){return[f]},get numberOfInputs(){return f.numberOfInputs},get numberOfOutputs(){return f.numberOfOutputs},addEventListener(...C){return f.addEventListener(C[0],C[1],C[2])},dispatchEvent(...C){return f.dispatchEvent(C[0])},getFrequencyResponse(C,S,v){if(C.length!==S.length||S.length!==v.length)throw i();const R=C.length;for(let D=0;D<R;D+=1){const N=-Math.PI*(C[D]/E),O=[Math.cos(N),Math.sin(N)],G=Vl(p,O),U=Vl(d,O),W=Cm(G,U);S[D]=Math.sqrt(W[0]*W[0]+W[1]*W[1]),v[D]=Math.atan2(W[1],W[0])}},removeEventListener(...C){return f.removeEventListener(C[0],C[1],C[2])}},f)},Dm=(i,e)=>i.createMediaElementSource(e.mediaElement),Im=(i,e)=>{const t=i.createMediaStreamDestination();return bt(t,e),t.numberOfOutputs===1&&Object.defineProperty(t,"numberOfOutputs",{get:()=>0}),t},Nm=(i,{mediaStream:e})=>{const t=e.getAudioTracks();t.sort((r,o)=>r.id<o.id?-1:r.id>o.id?1:0);const n=t.slice(0,1),s=i.createMediaStreamSource(new MediaStream(n));return Object.defineProperty(s,"mediaStream",{value:e}),s},Lm=(i,e)=>(t,{mediaStreamTrack:n})=>{if(typeof t.createMediaStreamTrackSource=="function")return t.createMediaStreamTrackSource(n);const s=new MediaStream([n]),r=t.createMediaStreamSource(s);if(n.kind!=="audio")throw i();if(e(t))throw new TypeError;return r},Om=i=>i===null?null:i.hasOwnProperty("OfflineAudioContext")?i.OfflineAudioContext:i.hasOwnProperty("webkitOfflineAudioContext")?i.webkitOfflineAudioContext:null,Um=(i,e,t,n,s,r)=>(o,a)=>{const c=o.createOscillator();return bt(c,a),gt(c,a,"detune"),gt(c,a,"frequency"),a.periodicWave!==void 0?c.setPeriodicWave(a.periodicWave):dt(c,a,"type"),e(t,()=>t(o))||wc(c),e(n,()=>n(o))||r(c,o),e(s,()=>s(o))||Cc(c),i(o,c),c},Fm=i=>(e,t)=>{const n=e.createPanner();return n.orientationX===void 0?i(e,t):(bt(n,t),gt(n,t,"orientationX"),gt(n,t,"orientationY"),gt(n,t,"orientationZ"),gt(n,t,"positionX"),gt(n,t,"positionY"),gt(n,t,"positionZ"),dt(n,t,"coneInnerAngle"),dt(n,t,"coneOuterAngle"),dt(n,t,"coneOuterGain"),dt(n,t,"distanceModel"),dt(n,t,"maxDistance"),dt(n,t,"panningModel"),dt(n,t,"refDistance"),dt(n,t,"rolloffFactor"),n)},km=(i,e,t,n,s,r,o,a,c,l)=>(u,{coneInnerAngle:h,coneOuterAngle:d,coneOuterGain:p,distanceModel:_,maxDistance:g,orientationX:m,orientationY:f,orientationZ:b,panningModel:T,positionX:x,positionY:M,positionZ:E,refDistance:w,rolloffFactor:C,...S})=>{const v=u.createPanner();if(S.channelCount>2||S.channelCountMode==="max")throw o();bt(v,S);const R={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},D=t(u,{...R,channelInterpretation:"speakers",numberOfInputs:6}),N=n(u,{...S,gain:1}),O=n(u,{...R,gain:1}),G=n(u,{...R,gain:0}),U=n(u,{...R,gain:0}),W=n(u,{...R,gain:0}),B=n(u,{...R,gain:0}),j=n(u,{...R,gain:0}),J=s(u,256,6,1),ne=r(u,{...R,curve:new Float32Array([1,1]),oversample:"none"});let ge=[m,f,b],Le=[x,M,E];const Y=new Float32Array(1);J.onaudioprocess=({inputBuffer:ee})=>{const ze=[c(ee,Y,0),c(ee,Y,1),c(ee,Y,2)];ze.some((nt,Je)=>nt!==ge[Je])&&(v.setOrientation(...ze),ge=ze);const be=[c(ee,Y,3),c(ee,Y,4),c(ee,Y,5)];be.some((nt,Je)=>nt!==Le[Je])&&(v.setPosition(...be),Le=be)},Object.defineProperty(G.gain,"defaultValue",{get:()=>0}),Object.defineProperty(U.gain,"defaultValue",{get:()=>0}),Object.defineProperty(W.gain,"defaultValue",{get:()=>0}),Object.defineProperty(B.gain,"defaultValue",{get:()=>0}),Object.defineProperty(j.gain,"defaultValue",{get:()=>0});const $={get bufferSize(){},get channelCount(){return v.channelCount},set channelCount(ee){if(ee>2)throw o();N.channelCount=ee,v.channelCount=ee},get channelCountMode(){return v.channelCountMode},set channelCountMode(ee){if(ee==="max")throw o();N.channelCountMode=ee,v.channelCountMode=ee},get channelInterpretation(){return v.channelInterpretation},set channelInterpretation(ee){N.channelInterpretation=ee,v.channelInterpretation=ee},get coneInnerAngle(){return v.coneInnerAngle},set coneInnerAngle(ee){v.coneInnerAngle=ee},get coneOuterAngle(){return v.coneOuterAngle},set coneOuterAngle(ee){v.coneOuterAngle=ee},get coneOuterGain(){return v.coneOuterGain},set coneOuterGain(ee){if(ee<0||ee>1)throw e();v.coneOuterGain=ee},get context(){return v.context},get distanceModel(){return v.distanceModel},set distanceModel(ee){v.distanceModel=ee},get inputs(){return[N]},get maxDistance(){return v.maxDistance},set maxDistance(ee){if(ee<0)throw new RangeError;v.maxDistance=ee},get numberOfInputs(){return v.numberOfInputs},get numberOfOutputs(){return v.numberOfOutputs},get orientationX(){return O.gain},get orientationY(){return G.gain},get orientationZ(){return U.gain},get panningModel(){return v.panningModel},set panningModel(ee){v.panningModel=ee},get positionX(){return W.gain},get positionY(){return B.gain},get positionZ(){return j.gain},get refDistance(){return v.refDistance},set refDistance(ee){if(ee<0)throw new RangeError;v.refDistance=ee},get rolloffFactor(){return v.rolloffFactor},set rolloffFactor(ee){if(ee<0)throw new RangeError;v.rolloffFactor=ee},addEventListener(...ee){return N.addEventListener(ee[0],ee[1],ee[2])},dispatchEvent(...ee){return N.dispatchEvent(ee[0])},removeEventListener(...ee){return N.removeEventListener(ee[0],ee[1],ee[2])}};h!==$.coneInnerAngle&&($.coneInnerAngle=h),d!==$.coneOuterAngle&&($.coneOuterAngle=d),p!==$.coneOuterGain&&($.coneOuterGain=p),_!==$.distanceModel&&($.distanceModel=_),g!==$.maxDistance&&($.maxDistance=g),m!==$.orientationX.value&&($.orientationX.value=m),f!==$.orientationY.value&&($.orientationY.value=f),b!==$.orientationZ.value&&($.orientationZ.value=b),T!==$.panningModel&&($.panningModel=T),x!==$.positionX.value&&($.positionX.value=x),M!==$.positionY.value&&($.positionY.value=M),E!==$.positionZ.value&&($.positionZ.value=E),w!==$.refDistance&&($.refDistance=w),C!==$.rolloffFactor&&($.rolloffFactor=C),(ge[0]!==1||ge[1]!==0||ge[2]!==0)&&v.setOrientation(...ge),(Le[0]!==0||Le[1]!==0||Le[2]!==0)&&v.setPosition(...Le);const oe=()=>{N.connect(v),i(N,ne,0,0),ne.connect(O).connect(D,0,0),ne.connect(G).connect(D,0,1),ne.connect(U).connect(D,0,2),ne.connect(W).connect(D,0,3),ne.connect(B).connect(D,0,4),ne.connect(j).connect(D,0,5),D.connect(J).connect(u.destination)},se=()=>{N.disconnect(v),a(N,ne,0,0),ne.disconnect(O),O.disconnect(D),ne.disconnect(G),G.disconnect(D),ne.disconnect(U),U.disconnect(D),ne.disconnect(W),W.disconnect(D),ne.disconnect(B),B.disconnect(D),ne.disconnect(j),j.disconnect(D),D.disconnect(J),J.disconnect(u.destination)};return l(Rs($,v),oe,se)},Bm=i=>(e,{disableNormalization:t,imag:n,real:s})=>{const r=n instanceof Float32Array?n:new Float32Array(n),o=s instanceof Float32Array?s:new Float32Array(s),a=e.createPeriodicWave(o,r,{disableNormalization:t});if(Array.from(n).length<2)throw i();return a},rr=(i,e,t,n)=>i.createScriptProcessor(e,t,n),Vm=(i,e)=>(t,n)=>{const s=n.channelCountMode;if(s==="clamped-max")throw e();if(t.createStereoPanner===void 0)return i(t,n);const r=t.createStereoPanner();return bt(r,n),gt(r,n,"pan"),Object.defineProperty(r,"channelCountMode",{get:()=>s,set:o=>{if(o!==s)throw e()}}),r},zm=(i,e,t,n,s,r)=>{const a=new Float32Array([1,1]),c=Math.PI/2,l={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},u={...l,oversample:"none"},h=(_,g,m,f)=>{const b=new Float32Array(16385),T=new Float32Array(16385);for(let S=0;S<16385;S+=1){const v=S/16384*c;b[S]=Math.cos(v),T[S]=Math.sin(v)}const x=t(_,{...l,gain:0}),M=n(_,{...u,curve:b}),E=n(_,{...u,curve:a}),w=t(_,{...l,gain:0}),C=n(_,{...u,curve:T});return{connectGraph(){g.connect(x),g.connect(E.inputs===void 0?E:E.inputs[0]),g.connect(w),E.connect(m),m.connect(M.inputs===void 0?M:M.inputs[0]),m.connect(C.inputs===void 0?C:C.inputs[0]),M.connect(x.gain),C.connect(w.gain),x.connect(f,0,0),w.connect(f,0,1)},disconnectGraph(){g.disconnect(x),g.disconnect(E.inputs===void 0?E:E.inputs[0]),g.disconnect(w),E.disconnect(m),m.disconnect(M.inputs===void 0?M:M.inputs[0]),m.disconnect(C.inputs===void 0?C:C.inputs[0]),M.disconnect(x.gain),C.disconnect(w.gain),x.disconnect(f,0,0),w.disconnect(f,0,1)}}},d=(_,g,m,f)=>{const b=new Float32Array(16385),T=new Float32Array(16385),x=new Float32Array(16385),M=new Float32Array(16385),E=Math.floor(16385/2);for(let W=0;W<16385;W+=1)if(W>E){const B=(W-E)/(16384-E)*c;b[W]=Math.cos(B),T[W]=Math.sin(B),x[W]=0,M[W]=1}else{const B=W/(16384-E)*c;b[W]=1,T[W]=0,x[W]=Math.cos(B),M[W]=Math.sin(B)}const w=e(_,{channelCount:2,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:2}),C=t(_,{...l,gain:0}),S=n(_,{...u,curve:b}),v=t(_,{...l,gain:0}),R=n(_,{...u,curve:T}),D=n(_,{...u,curve:a}),N=t(_,{...l,gain:0}),O=n(_,{...u,curve:x}),G=t(_,{...l,gain:0}),U=n(_,{...u,curve:M});return{connectGraph(){g.connect(w),g.connect(D.inputs===void 0?D:D.inputs[0]),w.connect(C,0),w.connect(v,0),w.connect(N,1),w.connect(G,1),D.connect(m),m.connect(S.inputs===void 0?S:S.inputs[0]),m.connect(R.inputs===void 0?R:R.inputs[0]),m.connect(O.inputs===void 0?O:O.inputs[0]),m.connect(U.inputs===void 0?U:U.inputs[0]),S.connect(C.gain),R.connect(v.gain),O.connect(N.gain),U.connect(G.gain),C.connect(f,0,0),N.connect(f,0,0),v.connect(f,0,1),G.connect(f,0,1)},disconnectGraph(){g.disconnect(w),g.disconnect(D.inputs===void 0?D:D.inputs[0]),w.disconnect(C,0),w.disconnect(v,0),w.disconnect(N,1),w.disconnect(G,1),D.disconnect(m),m.disconnect(S.inputs===void 0?S:S.inputs[0]),m.disconnect(R.inputs===void 0?R:R.inputs[0]),m.disconnect(O.inputs===void 0?O:O.inputs[0]),m.disconnect(U.inputs===void 0?U:U.inputs[0]),S.disconnect(C.gain),R.disconnect(v.gain),O.disconnect(N.gain),U.disconnect(G.gain),C.disconnect(f,0,0),N.disconnect(f,0,0),v.disconnect(f,0,1),G.disconnect(f,0,1)}}},p=(_,g,m,f,b)=>{if(g===1)return h(_,m,f,b);if(g===2)return d(_,m,f,b);throw s()};return(_,{channelCount:g,channelCountMode:m,pan:f,...b})=>{if(m==="max")throw s();const T=i(_,{...b,channelCount:1,channelCountMode:m,numberOfInputs:2}),x=t(_,{...b,channelCount:g,channelCountMode:m,gain:1}),M=t(_,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:f});let{connectGraph:E,disconnectGraph:w}=p(_,g,x,M,T);Object.defineProperty(M.gain,"defaultValue",{get:()=>0}),Object.defineProperty(M.gain,"maxValue",{get:()=>1}),Object.defineProperty(M.gain,"minValue",{get:()=>-1});const C={get bufferSize(){},get channelCount(){return x.channelCount},set channelCount(D){x.channelCount!==D&&(S&&w(),{connectGraph:E,disconnectGraph:w}=p(_,D,x,M,T),S&&E()),x.channelCount=D},get channelCountMode(){return x.channelCountMode},set channelCountMode(D){if(D==="clamped-max"||D==="max")throw s();x.channelCountMode=D},get channelInterpretation(){return x.channelInterpretation},set channelInterpretation(D){x.channelInterpretation=D},get context(){return x.context},get inputs(){return[x]},get numberOfInputs(){return x.numberOfInputs},get numberOfOutputs(){return x.numberOfOutputs},get pan(){return M.gain},addEventListener(...D){return x.addEventListener(D[0],D[1],D[2])},dispatchEvent(...D){return x.dispatchEvent(D[0])},removeEventListener(...D){return x.removeEventListener(D[0],D[1],D[2])}};let S=!1;const v=()=>{E(),S=!0},R=()=>{w(),S=!1};return r(Rs(C,T),v,R)}},Gm=(i,e,t,n,s,r,o)=>(a,c)=>{const l=a.createWaveShaper();if(r!==null&&r.name==="webkitAudioContext"&&a.createGain().gain.automationRate===void 0)return t(a,c);bt(l,c);const u=c.curve===null||c.curve instanceof Float32Array?c.curve:new Float32Array(c.curve);if(u!==null&&u.length<2)throw e();dt(l,{curve:u},"curve"),dt(l,c,"oversample");let h=null,d=!1;return o(l,"curve",g=>()=>g.call(l),g=>m=>(g.call(l,m),d&&(n(m)&&h===null?h=i(a,l):!n(m)&&h!==null&&(h(),h=null)),m)),s(l,()=>{d=!0,n(l.curve)&&(h=i(a,l))},()=>{d=!1,h!==null&&(h(),h=null)})},Hm=(i,e,t,n,s)=>(r,{curve:o,oversample:a,...c})=>{const l=r.createWaveShaper(),u=r.createWaveShaper();bt(l,c),bt(u,c);const h=t(r,{...c,gain:1}),d=t(r,{...c,gain:-1}),p=t(r,{...c,gain:1}),_=t(r,{...c,gain:-1});let g=null,m=!1,f=null;const b={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(M){h.channelCount=M,d.channelCount=M,l.channelCount=M,p.channelCount=M,u.channelCount=M,_.channelCount=M},get channelCountMode(){return l.channelCountMode},set channelCountMode(M){h.channelCountMode=M,d.channelCountMode=M,l.channelCountMode=M,p.channelCountMode=M,u.channelCountMode=M,_.channelCountMode=M},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(M){h.channelInterpretation=M,d.channelInterpretation=M,l.channelInterpretation=M,p.channelInterpretation=M,u.channelInterpretation=M,_.channelInterpretation=M},get context(){return l.context},get curve(){return f},set curve(M){if(M!==null&&M.length<2)throw e();if(M===null)l.curve=M,u.curve=M;else{const E=M.length,w=new Float32Array(E+2-E%2),C=new Float32Array(E+2-E%2);w[0]=M[0],C[0]=-M[E-1];const S=Math.ceil((E+1)/2),v=(E+1)/2-1;for(let R=1;R<S;R+=1){const D=R/S*v,N=Math.floor(D),O=Math.ceil(D);w[R]=N===O?M[N]:(1-(D-N))*M[N]+(1-(O-D))*M[O],C[R]=N===O?-M[E-1-N]:-((1-(D-N))*M[E-1-N])-(1-(O-D))*M[E-1-O]}w[S]=E%2===1?M[S-1]:(M[S-2]+M[S-1])/2,l.curve=w,u.curve=C}f=M,m&&(n(f)&&g===null?g=i(r,h):g!==null&&(g(),g=null))},get inputs(){return[h]},get numberOfInputs(){return l.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get oversample(){return l.oversample},set oversample(M){l.oversample=M,u.oversample=M},addEventListener(...M){return h.addEventListener(M[0],M[1],M[2])},dispatchEvent(...M){return h.dispatchEvent(M[0])},removeEventListener(...M){return h.removeEventListener(M[0],M[1],M[2])}};o!==null&&(b.curve=o instanceof Float32Array?o:new Float32Array(o)),a!==b.oversample&&(b.oversample=a);const T=()=>{h.connect(l).connect(p),h.connect(d).connect(u).connect(_).connect(p),m=!0,n(f)&&(g=i(r,h))},x=()=>{h.disconnect(l),l.disconnect(p),h.disconnect(d),d.disconnect(u),u.disconnect(_),_.disconnect(p),m=!1,g!==null&&(g(),g=null)};return s(Rs(b,p),T,x)},Gt=()=>new DOMException("","NotSupportedError"),Wm={numberOfChannels:1},qm=(i,e,t,n,s)=>class extends i{constructor(o,a,c){let l;if(typeof o=="number"&&a!==void 0&&c!==void 0)l={length:a,numberOfChannels:o,sampleRate:c};else if(typeof o=="object")l=o;else throw new Error("The given parameters are not valid.");const{length:u,numberOfChannels:h,sampleRate:d}={...Wm,...l},p=n(h,u,d);e(js,()=>js(p))||p.addEventListener("statechange",(()=>{let _=0;const g=m=>{this._state==="running"&&(_>0?(p.removeEventListener("statechange",g),m.stopImmediatePropagation(),this._waitForThePromiseToSettle(m)):_+=1)};return g})()),super(p,h),this._length=u,this._nativeOfflineAudioContext=p,this._state=null}get length(){return this._nativeOfflineAudioContext.length===void 0?this._length:this._nativeOfflineAudioContext.length}get state(){return this._state===null?this._nativeOfflineAudioContext.state:this._state}startRendering(){return this._state==="running"?Promise.reject(t()):(this._state="running",s(this.destination,this._nativeOfflineAudioContext).finally(()=>{this._state=null,ih(this)}))}_waitForThePromiseToSettle(o){this._state===null?this._nativeOfflineAudioContext.dispatchEvent(o):setTimeout(()=>this._waitForThePromiseToSettle(o))}},Xm={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:440,periodicWave:void 0,type:"sine"},Ym=(i,e,t,n,s,r,o)=>class extends i{constructor(c,l){const u=s(c),h={...Xm,...l},d=t(u,h),p=r(u),_=p?n():null,g=c.sampleRate/2;super(c,!1,d,_),this._detune=e(this,p,d.detune,153600,-153600),this._frequency=e(this,p,d.frequency,g,-g),this._nativeOscillatorNode=d,this._onended=null,this._oscillatorNodeRenderer=_,this._oscillatorNodeRenderer!==null&&h.periodicWave!==void 0&&(this._oscillatorNodeRenderer.periodicWave=h.periodicWave)}get detune(){return this._detune}get frequency(){return this._frequency}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?o(this,c):null;this._nativeOscillatorNode.onended=l;const u=this._nativeOscillatorNode.onended;this._onended=u!==null&&u===l?c:u}get type(){return this._nativeOscillatorNode.type}set type(c){this._nativeOscillatorNode.type=c,this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=null)}setPeriodicWave(c){this._nativeOscillatorNode.setPeriodicWave(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=c)}start(c=0){if(this._nativeOscillatorNode.start(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.start=c),this.context.state!=="closed"){_s(this);const l=()=>{this._nativeOscillatorNode.removeEventListener("ended",l),Yn(this)&&tr(this)};this._nativeOscillatorNode.addEventListener("ended",l)}}stop(c=0){this._nativeOscillatorNode.stop(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.stop=c)}},jm=(i,e,t,n,s)=>()=>{const r=new WeakMap;let o=null,a=null,c=null;const l=async(u,h)=>{let d=t(u);const p=Ft(d,h);if(!p){const _={channelCount:d.channelCount,channelCountMode:d.channelCountMode,channelInterpretation:d.channelInterpretation,detune:d.detune.value,frequency:d.frequency.value,periodicWave:o===null?void 0:o,type:d.type};d=e(h,_),a!==null&&d.start(a),c!==null&&d.stop(c)}return r.set(h,d),p?(await i(h,u.detune,d.detune),await i(h,u.frequency,d.frequency)):(await n(h,u.detune,d.detune),await n(h,u.frequency,d.frequency)),await s(u,h,d),d};return{set periodicWave(u){o=u},set start(u){a=u},set stop(u){c=u},render(u,h){const d=r.get(h);return d!==void 0?Promise.resolve(d):l(u,h)}}},$m={channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",coneInnerAngle:360,coneOuterAngle:360,coneOuterGain:0,distanceModel:"inverse",maxDistance:1e4,orientationX:1,orientationY:0,orientationZ:0,panningModel:"equalpower",positionX:0,positionY:0,positionZ:0,refDistance:1,rolloffFactor:1},Zm=(i,e,t,n,s,r,o)=>class extends i{constructor(c,l){const u=s(c),h={...$m,...l},d=t(u,h),p=r(u),_=p?n():null;super(c,!1,d,_),this._nativePannerNode=d,this._orientationX=e(this,p,d.orientationX,Vt,Qt),this._orientationY=e(this,p,d.orientationY,Vt,Qt),this._orientationZ=e(this,p,d.orientationZ,Vt,Qt),this._positionX=e(this,p,d.positionX,Vt,Qt),this._positionY=e(this,p,d.positionY,Vt,Qt),this._positionZ=e(this,p,d.positionZ,Vt,Qt),o(this,1)}get coneInnerAngle(){return this._nativePannerNode.coneInnerAngle}set coneInnerAngle(c){this._nativePannerNode.coneInnerAngle=c}get coneOuterAngle(){return this._nativePannerNode.coneOuterAngle}set coneOuterAngle(c){this._nativePannerNode.coneOuterAngle=c}get coneOuterGain(){return this._nativePannerNode.coneOuterGain}set coneOuterGain(c){this._nativePannerNode.coneOuterGain=c}get distanceModel(){return this._nativePannerNode.distanceModel}set distanceModel(c){this._nativePannerNode.distanceModel=c}get maxDistance(){return this._nativePannerNode.maxDistance}set maxDistance(c){this._nativePannerNode.maxDistance=c}get orientationX(){return this._orientationX}get orientationY(){return this._orientationY}get orientationZ(){return this._orientationZ}get panningModel(){return this._nativePannerNode.panningModel}set panningModel(c){this._nativePannerNode.panningModel=c}get positionX(){return this._positionX}get positionY(){return this._positionY}get positionZ(){return this._positionZ}get refDistance(){return this._nativePannerNode.refDistance}set refDistance(c){this._nativePannerNode.refDistance=c}get rolloffFactor(){return this._nativePannerNode.rolloffFactor}set rolloffFactor(c){this._nativePannerNode.rolloffFactor=c}},Km=(i,e,t,n,s,r,o,a,c,l)=>()=>{const u=new WeakMap;let h=null;const d=async(p,_)=>{let g=null,m=r(p);const f={channelCount:m.channelCount,channelCountMode:m.channelCountMode,channelInterpretation:m.channelInterpretation},b={...f,coneInnerAngle:m.coneInnerAngle,coneOuterAngle:m.coneOuterAngle,coneOuterGain:m.coneOuterGain,distanceModel:m.distanceModel,maxDistance:m.maxDistance,panningModel:m.panningModel,refDistance:m.refDistance,rolloffFactor:m.rolloffFactor},T=Ft(m,_);if("bufferSize"in m)g=n(_,{...f,gain:1});else if(!T){const x={...b,orientationX:m.orientationX.value,orientationY:m.orientationY.value,orientationZ:m.orientationZ.value,positionX:m.positionX.value,positionY:m.positionY.value,positionZ:m.positionZ.value};m=s(_,x)}if(u.set(_,g===null?m:g),g!==null){if(h===null){if(o===null)throw new Error("Missing the native OfflineAudioContext constructor.");const R=new o(6,p.context.length,_.sampleRate),D=e(R,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6});D.connect(R.destination),h=(async()=>{const N=await Promise.all([p.orientationX,p.orientationY,p.orientationZ,p.positionX,p.positionY,p.positionZ].map(async(O,G)=>{const U=t(R,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:G===0?1:0});return await a(R,O,U.offset),U}));for(let O=0;O<6;O+=1)N[O].connect(D,0,O),N[O].start(0);return l(R)})()}const x=await h,M=n(_,{...f,gain:1});await c(p,_,M);const E=[];for(let R=0;R<x.numberOfChannels;R+=1)E.push(x.getChannelData(R));let w=[E[0][0],E[1][0],E[2][0]],C=[E[3][0],E[4][0],E[5][0]],S=n(_,{...f,gain:1}),v=s(_,{...b,orientationX:w[0],orientationY:w[1],orientationZ:w[2],positionX:C[0],positionY:C[1],positionZ:C[2]});M.connect(S).connect(v.inputs[0]),v.connect(g);for(let R=128;R<x.length;R+=128){const D=[E[0][R],E[1][R],E[2][R]],N=[E[3][R],E[4][R],E[5][R]];if(D.some((O,G)=>O!==w[G])||N.some((O,G)=>O!==C[G])){w=D,C=N;const O=R/_.sampleRate;S.gain.setValueAtTime(0,O),S=n(_,{...f,gain:0}),v=s(_,{...b,orientationX:w[0],orientationY:w[1],orientationZ:w[2],positionX:C[0],positionY:C[1],positionZ:C[2]}),S.gain.setValueAtTime(1,O),M.connect(S).connect(v.inputs[0]),v.connect(g)}}return g}return T?(await i(_,p.orientationX,m.orientationX),await i(_,p.orientationY,m.orientationY),await i(_,p.orientationZ,m.orientationZ),await i(_,p.positionX,m.positionX),await i(_,p.positionY,m.positionY),await i(_,p.positionZ,m.positionZ)):(await a(_,p.orientationX,m.orientationX),await a(_,p.orientationY,m.orientationY),await a(_,p.orientationZ,m.orientationZ),await a(_,p.positionX,m.positionX),await a(_,p.positionY,m.positionY),await a(_,p.positionZ,m.positionZ)),Cs(m)?await c(p,_,m.inputs[0]):await c(p,_,m),m};return{render(p,_){const g=u.get(_);return g!==void 0?Promise.resolve(g):d(p,_)}}},Jm={disableNormalization:!1},Qm=(i,e,t,n)=>class fh{constructor(r,o){const a=e(r),c=n({...Jm,...o}),l=i(a,c);return t.add(l),l}static[Symbol.hasInstance](r){return r!==null&&typeof r=="object"&&Object.getPrototypeOf(r)===fh.prototype||t.has(r)}},e_=(i,e)=>(t,n,s)=>(i(n).replay(s),e(n,t,s)),t_=(i,e,t)=>async(n,s,r)=>{const o=i(n);await Promise.all(o.activeInputs.map((a,c)=>Array.from(a).map(async([l,u])=>{const d=await e(l).render(l,s),p=n.context.destination;!t(l)&&(n!==p||!t(n))&&d.connect(r,u,c)})).reduce((a,c)=>[...a,...c],[]))},n_=(i,e,t)=>async(n,s,r)=>{const o=e(n);await Promise.all(Array.from(o.activeInputs).map(async([a,c])=>{const u=await i(a).render(a,s);t(a)||u.connect(r,c)}))},i_=(i,e,t,n)=>s=>i(js,()=>js(s))?Promise.resolve(i(n,n)).then(r=>{if(!r){const o=t(s,512,0,1);s.oncomplete=()=>{o.onaudioprocess=null,o.disconnect()},o.onaudioprocess=()=>s.currentTime,o.connect(s.destination)}return s.startRendering()}):new Promise(r=>{const o=e(s,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});s.oncomplete=a=>{o.disconnect(),r(a.renderedBuffer)},o.connect(s.destination),s.startRendering()}),s_=i=>(e,t)=>{i.set(e,t)},r_=i=>(e,t)=>i.set(e,t),o_=(i,e,t,n,s,r,o,a)=>(c,l)=>t(c).render(c,l).then(()=>Promise.all(Array.from(n(l)).map(u=>t(u).render(u,l)))).then(()=>s(l)).then(u=>(typeof u.copyFromChannel!="function"?(o(u),Ec(u)):e(r,()=>r(u))||a(u),i.add(u),u)),a_={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",pan:0},c_=(i,e,t,n,s,r)=>class extends i{constructor(a,c){const l=s(a),u={...a_,...c},h=t(l,u),d=r(l),p=d?n():null;super(a,!1,h,p),this._pan=e(this,d,h.pan)}get pan(){return this._pan}},l_=(i,e,t,n,s)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const u=Ft(l,c);if(!u){const h={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,pan:l.pan.value};l=e(c,h)}return r.set(c,l),u?await i(c,a.pan,l.pan):await n(c,a.pan,l.pan),Cs(l)?await s(a,c,l.inputs[0]):await s(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},u_=i=>()=>{if(i===null)return!1;try{new i({length:1,sampleRate:44100})}catch{return!1}return!0},h_=(i,e)=>async()=>{if(i===null)return!0;if(e===null)return!1;const t=new Blob(['class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)'],{type:"application/javascript; charset=utf-8"}),n=new e(1,128,44100),s=URL.createObjectURL(t);let r=!1,o=!1;try{await n.audioWorklet.addModule(s);const a=new i(n,"a",{numberOfOutputs:0}),c=n.createOscillator();a.port.onmessage=()=>r=!0,a.onprocessorerror=()=>o=!0,c.connect(a),c.start(0),await n.startRendering(),await new Promise(l=>setTimeout(l))}catch{}finally{URL.revokeObjectURL(s)}return r&&!o},d_=(i,e)=>()=>{if(e===null)return Promise.resolve(!1);const t=new e(1,1,44100),n=i(t,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return new Promise(s=>{t.oncomplete=()=>{n.disconnect(),s(t.currentTime!==0)},t.startRendering()})},f_=()=>new DOMException("","UnknownError"),p_={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",curve:null,oversample:"none"},m_=(i,e,t,n,s,r,o)=>class extends i{constructor(c,l){const u=s(c),h={...p_,...l},d=t(u,h),_=r(u)?n():null;super(c,!0,d,_),this._isCurveNullified=!1,this._nativeWaveShaperNode=d,o(this,1)}get curve(){return this._isCurveNullified?null:this._nativeWaveShaperNode.curve}set curve(c){if(c===null)this._isCurveNullified=!0,this._nativeWaveShaperNode.curve=new Float32Array([0,0]);else{if(c.length<2)throw e();this._isCurveNullified=!1,this._nativeWaveShaperNode.curve=c}}get oversample(){return this._nativeWaveShaperNode.oversample}set oversample(c){this._nativeWaveShaperNode.oversample=c}},__=(i,e,t)=>()=>{const n=new WeakMap,s=async(r,o)=>{let a=e(r);if(!Ft(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,curve:a.curve,oversample:a.oversample};a=i(o,l)}return n.set(o,a),Cs(a)?await t(r,o,a.inputs[0]):await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):s(r,o)}}},g_=()=>typeof window>"u"?null:window,v_=(i,e)=>t=>{t.copyFromChannel=(n,s,r=0)=>{const o=i(r),a=i(s);if(a>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(a),u=n.length;for(let h=o<0?-o:0;h+o<c&&h<u;h+=1)n[h]=l[h+o]},t.copyToChannel=(n,s,r=0)=>{const o=i(r),a=i(s);if(a>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(a),u=n.length;for(let h=o<0?-o:0;h+o<c&&h<u;h+=1)l[h+o]=n[h]}},x_=i=>e=>{e.copyFromChannel=(t=>(n,s,r=0)=>{const o=i(r),a=i(s);if(o<e.length)return t.call(e,n,a,o)})(e.copyFromChannel),e.copyToChannel=(t=>(n,s,r=0)=>{const o=i(r),a=i(s);if(o<e.length)return t.call(e,n,a,o)})(e.copyToChannel)},S_=i=>(e,t)=>{const n=t.createBuffer(1,1,44100);e.buffer===null&&(e.buffer=n),i(e,"buffer",s=>()=>{const r=s.call(e);return r===n?null:r},s=>r=>s.call(e,r===null?n:r))},y_=(i,e)=>(t,n)=>{n.channelCount=1,n.channelCountMode="explicit",Object.defineProperty(n,"channelCount",{get:()=>1,set:()=>{throw i()}}),Object.defineProperty(n,"channelCountMode",{get:()=>"explicit",set:()=>{throw i()}});const s=t.createBufferSource();e(n,()=>{const a=n.numberOfInputs;for(let c=0;c<a;c+=1)s.connect(n,0,c)},()=>s.disconnect(n))},ph=(i,e,t)=>i.copyFromChannel===void 0?i.getChannelData(t)[0]:(i.copyFromChannel(e,t),e[0]),mh=i=>{if(i===null)return!1;const e=i.length;return e%2!==0?i[Math.floor(e/2)]!==0:i[e/2-1]+i[e/2]!==0},or=(i,e,t,n)=>{let s=i;for(;!s.hasOwnProperty(e);)s=Object.getPrototypeOf(s);const{get:r,set:o}=Object.getOwnPropertyDescriptor(s,e);Object.defineProperty(i,e,{get:t(r),set:n(o)})},M_=i=>({...i,outputChannelCount:i.outputChannelCount!==void 0?i.outputChannelCount:i.numberOfInputs===1&&i.numberOfOutputs===1?[i.channelCount]:Array.from({length:i.numberOfOutputs},()=>1)}),T_=i=>({...i,channelCount:i.numberOfOutputs}),E_=i=>{const{imag:e,real:t}=i;return e===void 0?t===void 0?{...i,imag:[0,0],real:[0,0]}:{...i,imag:Array.from(t,()=>0),real:t}:t===void 0?{...i,imag:e,real:Array.from(e,()=>0)}:{...i,imag:e,real:t}},_h=(i,e,t)=>{try{i.setValueAtTime(e,t)}catch(n){if(n.code!==9)throw n;_h(i,e,t+1e-7)}},b_=i=>{const e=i.createBufferSource();e.start();try{e.start()}catch{return!0}return!1},A_=i=>{const e=i.createBufferSource(),t=i.createBuffer(1,1,44100);e.buffer=t;try{e.start(0,1)}catch{return!1}return!0},w_=i=>{const e=i.createBufferSource();e.start();try{e.stop()}catch{return!1}return!0},Rc=i=>{const e=i.createOscillator();try{e.start(-1)}catch(t){return t instanceof RangeError}return!1},gh=i=>{const e=i.createBuffer(1,1,44100),t=i.createBufferSource();t.buffer=e,t.start(),t.stop();try{return t.stop(),!0}catch{return!1}},Pc=i=>{const e=i.createOscillator();try{e.stop(-1)}catch(t){return t instanceof RangeError}return!1},C_=i=>{const{port1:e,port2:t}=new MessageChannel;try{e.postMessage(i)}finally{e.close(),t.close()}},R_=i=>{i.start=(e=>(t=0,n=0,s)=>{const r=i.buffer,o=r===null?n:Math.min(r.duration,n);r!==null&&o>r.duration-.5/i.context.sampleRate?e.call(i,t,0,0):e.call(i,t,o,s)})(i.start)},vh=(i,e)=>{const t=e.createGain();i.connect(t);const n=(s=>()=>{s.call(i,t),i.removeEventListener("ended",n)})(i.disconnect);i.addEventListener("ended",n),Rs(i,t),i.stop=(s=>{let r=!1;return(o=0)=>{if(r)try{s.call(i,o)}catch{t.gain.setValueAtTime(0,o)}else s.call(i,o),r=!0}})(i.stop)},Ps=(i,e)=>t=>{const n={value:i};return Object.defineProperties(t,{currentTarget:n,target:n}),typeof e=="function"?e.call(i,t):e.handleEvent.call(i,t)},P_=$d(Vi),D_=tf(Vi),I_=pp(vo),xh=new WeakMap,N_=Ip(xh),En=Wf(new Map,new WeakMap),Dn=g_(),Sh=cm(En,Nn),Dc=Dp(zt),Nt=t_(zt,Dc,Oi),L_=af(Sh,ut,Nt),ct=Op(go),Jn=Om(Dn),ot=Jp(Jn),yh=new WeakMap,Mh=Ep(Ps),ar=dm(Dn),Ic=jp(ar),Nc=$p(Dn),Th=Zp(Dn),$s=pm(Dn),xt=If(Zd(Zu),ef(P_,D_,ro,I_,oo,zt,N_,er,ut,Vi,Yn,Oi,Xr),En,Hp(ba,oo,zt,ut,Ys,Yn),Nn,xo,Gt,up(ro,ba,zt,ut,Ys,ct,Yn,ot),gp(yh,zt,Tn),Mh,ct,Ic,Nc,Th,ot,$s),O_=of(xt,L_,Nn,Sh,ct,ot),Lc=new WeakSet,zl=lm(Dn),Eh=ip(new Uint32Array(1)),Oc=v_(Eh,Nn),Uc=x_(Eh),bh=lf(Lc,En,Gt,zl,Jn,u_(zl),Oc,Uc),So=nf($t),Ah=n_(Dc,nr,Oi),Ln=Kf(Ah),Ds=hm(So,En,b_,A_,w_,Rc,gh,Pc,R_,S_(or),vh),On=e_(Np(nr),Ah),U_=df(Ln,Ds,ut,On,Nt),bn=Nf(Kd(Ku),yh,Tc,Lf,Hd,Wd,qd,Xd,Yd,Ma,ju,ar,_h),F_=hf(xt,U_,bn,Rt,Ds,ct,ot,Ps),k_=yf(xt,Mf,Nn,Rt,fm($t,or),ct,ot,Nt),B_=Hf(Ln,hh,ut,On,Nt),zi=r_(xh),V_=Gf(xt,bn,B_,xo,hh,ct,ot,zi),_i=om(Vi,Nc),z_=y_(Rt,_i),gi=ym(ar,z_),G_=Yf(gi,ut,Nt),H_=Xf(xt,G_,gi,ct,ot),W_=Zf(sr,ut,Nt),q_=$f(xt,W_,sr,ct,ot,T_),X_=Em(So,Ds,$t,_i),Is=Tm(So,En,X_,Rc,Pc),Y_=np(Ln,Is,ut,On,Nt),j_=tp(xt,bn,Y_,Is,ct,ot,Ps),wh=bm(Gt,or),$_=op(wh,ut,Nt),Z_=rp(xt,$_,wh,ct,ot,zi),K_=fp(Ln,dh,ut,On,Nt),J_=dp(xt,bn,K_,dh,ct,ot,zi),Ch=Am(Gt),Q_=yp(Ln,Ch,ut,On,Nt),eg=Sp(xt,bn,Q_,Ch,Gt,ct,ot,zi),tg=Rp(Ln,$t,ut,On,Nt),ng=Cp(xt,bn,tg,$t,ct,ot),ig=Pm(xo,Rt,rr,Gt),yo=i_(En,$t,rr,d_($t,Jn)),sg=Gp(Ds,ut,Jn,Nt,yo),rg=wm(ig),og=Vp(xt,rg,sg,ct,ot,zi),ag=Tf(bn,gi,Is,rr,Gt,ph,ot,or),Rh=new WeakMap,cg=rm(k_,ag,Mh,ot,Rh,Ps),Ph=Um(So,En,Rc,gh,Pc,vh),lg=jm(Ln,Ph,ut,On,Nt),ug=Ym(xt,bn,Ph,lg,ct,ot,Ps),Dh=Qf(Ds),hg=Hm(Dh,Rt,$t,mh,_i),Mo=Gm(Dh,Rt,hg,mh,_i,ar,or),dg=km(ro,Rt,gi,$t,rr,Mo,Gt,oo,ph,_i),Ih=Fm(dg),fg=Km(Ln,gi,Is,$t,Ih,ut,Jn,On,Nt,yo),pg=Zm(xt,bn,Ih,fg,ct,ot,zi),mg=Bm(Nn),_g=Qm(mg,ct,new WeakSet,E_),gg=zm(gi,sr,$t,Mo,Gt,_i),Nh=Vm(gg,Gt),vg=l_(Ln,Nh,ut,On,Nt),xg=c_(xt,bn,Nh,vg,ct,ot),Sg=__(Mo,ut,Nt),yg=m_(xt,Rt,Mo,Sg,ct,ot,zi),Lh=Qp(Dn),Fc=bp(Dn),Oh=new WeakMap,Mg=Up(Oh,Jn),Tg=Lh?Qd(En,Gt,Tp(Dn),Fc,Ap(jd),ct,Mg,ot,$s,new WeakMap,new WeakMap,h_($s,Jn),Dn):void 0,Eg=Kp(Ic,ot),bg=lp(Lc,En,cp,Mp,new WeakSet,ct,Eg,io,js,Oc,Uc),Uh=Vf(Tg,O_,bh,F_,V_,H_,q_,j_,Z_,bg,J_,eg,ng,og,cg,ug,pg,_g,xg,yg),Ag=em(xt,Dm,ct,ot),wg=nm(xt,Im,ct,ot),Cg=im(xt,Nm,ct,ot),Rg=Lm(Rt,ot),Pg=sm(xt,Rg,ct),Dg=Sf(Uh,Rt,Gt,f_,Ag,wg,Cg,Pg,ar),kc=Fp(Rh),Ig=sf(kc),Fh=Jf(Nn),Ng=mp(kc),kh=vp(Nn),Bh=new WeakMap,Lg=Pp(Bh,Tn),Og=Sm(Fh,Nn,Rt,gi,sr,Is,$t,rr,Gt,kh,Fc,Lg,_i),Ug=_m(Rt,Og,$t,Gt,_i),Fg=Bf(Ln,Fh,Ds,gi,sr,Is,$t,Ng,kh,Fc,ut,$s,Jn,On,Nt,yo),kg=Lp(Oh),Bg=s_(Bh),Gl=Lh?Uf(Ig,xt,bn,Fg,Ug,zt,kg,ct,ot,$s,M_,Bg,C_,Ps):void 0,Vg=ap(Gt,Jn),zg=o_(Lc,En,Dc,kc,yo,io,Oc,Uc),Gg=qm(Uh,En,Rt,Vg,zg),Hg=Wp(go,Ic),Wg=qp(Mc,Nc),qg=Xp(Tc,Th),Xg=Yp(go,ot);function un(i){return i===void 0}function He(i){return i!==void 0}function Yg(i){return typeof i=="function"}function Ui(i){return typeof i=="number"}function Ni(i){return Object.prototype.toString.call(i)==="[object Object]"&&i.constructor===Object}function jg(i){return typeof i=="boolean"}function yn(i){return Array.isArray(i)}function $n(i){return typeof i=="string"}function yr(i){return $n(i)&&/^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(i)}function Fe(i,e){if(!i)throw new Error(e)}function Zn(i,e,t=1/0){if(!(e<=i&&i<=t))throw new RangeError(`Value must be within [${e}, ${t}], got: ${i}`)}function Vh(i){!i.isOffline&&i.state!=="running"&&Bc('The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.')}let zh=!1,Hl=!1;function Wl(i){zh=i}function $g(i){un(i)&&zh&&!Hl&&(Hl=!0,Bc("Events scheduled inside of scheduled callbacks should use the passed in scheduling time. See https://github.com/Tonejs/Tone.js/wiki/Accurate-Timing"))}let Gh=console;function Zg(...i){Gh.log(...i)}function Bc(...i){Gh.warn(...i)}function Kg(i){return new Dg(i)}function Jg(i,e,t){return new Gg(i,e,t)}const en=typeof self=="object"?self:null,Qg=en&&(en.hasOwnProperty("AudioContext")||en.hasOwnProperty("webkitAudioContext"));function ev(i,e,t){return Fe(He(Gl),"AudioWorkletNode only works in a secure context (https or localhost)"),new(i instanceof(en==null?void 0:en.BaseAudioContext)?en==null?void 0:en.AudioWorkletNode:Gl)(i,e,t)}function An(i,e,t,n){var s=arguments.length,r=s<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(i,e,t,n);else for(var a=i.length-1;a>=0;a--)(o=i[a])&&(r=(s<3?o(r):s>3?o(e,t,r):o(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r}function Et(i,e,t,n){function s(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{l(n.next(u))}catch(h){o(h)}}function c(u){try{l(n.throw(u))}catch(h){o(h)}}function l(u){u.done?r(u.value):s(u.value).then(a,c)}l((n=n.apply(i,e||[])).next())})}class tv{constructor(e,t,n,s){this._callback=e,this._type=t,this._minimumUpdateInterval=Math.max(128/(s||44100),.001),this.updateInterval=n,this._createClock()}_createWorker(){const e=new Blob([`
			// the initial timeout time
			let timeoutTime =  ${(this._updateInterval*1e3).toFixed(1)};
			// onmessage callback
			self.onmessage = function(msg){
				timeoutTime = parseInt(msg.data);
			};
			// the tick function which posts a message
			// and schedules a new tick
			function tick(){
				setTimeout(tick, timeoutTime);
				self.postMessage('tick');
			}
			// call tick initially
			tick();
			`],{type:"text/javascript"}),t=URL.createObjectURL(e),n=new Worker(t);n.onmessage=this._callback.bind(this),this._worker=n}_createTimeout(){this._timeout=setTimeout(()=>{this._createTimeout(),this._callback()},this._updateInterval*1e3)}_createClock(){if(this._type==="worker")try{this._createWorker()}catch{this._type="timeout",this._createClock()}else this._type==="timeout"&&this._createTimeout()}_disposeClock(){this._timeout&&clearTimeout(this._timeout),this._worker&&(this._worker.terminate(),this._worker.onmessage=null)}get updateInterval(){return this._updateInterval}set updateInterval(e){var t;this._updateInterval=Math.max(e,this._minimumUpdateInterval),this._type==="worker"&&((t=this._worker)===null||t===void 0||t.postMessage(this._updateInterval*1e3))}get type(){return this._type}set type(e){this._disposeClock(),this._type=e,this._createClock()}dispose(){this._disposeClock()}}function Fi(i){return qg(i)}function ui(i){return Wg(i)}function Yr(i){return Xg(i)}function rs(i){return Hg(i)}function nv(i){return i instanceof bh}function iv(i,e){return i==="value"||Fi(e)||ui(e)||nv(e)}function hs(i,...e){if(!e.length)return i;const t=e.shift();if(Ni(i)&&Ni(t))for(const n in t)iv(n,t[n])?i[n]=t[n]:Ni(t[n])?(i[n]||Object.assign(i,{[n]:{}}),hs(i[n],t[n])):Object.assign(i,{[n]:t[n]});return hs(i,...e)}function sv(i,e){return i.length===e.length&&i.every((t,n)=>e[n]===t)}function Ne(i,e,t=[],n){const s={},r=Array.from(e);if(Ni(r[0])&&n&&!Reflect.has(r[0],n)&&(Object.keys(r[0]).some(a=>Reflect.has(i,a))||(hs(s,{[n]:r[0]}),t.splice(t.indexOf(n),1),r.shift())),r.length===1&&Ni(r[0]))hs(s,r[0]);else for(let o=0;o<t.length;o++)He(r[o])&&(s[t[o]]=r[o]);return hs(i,s)}function rv(i){return i.constructor.getDefaults()}function ds(i,e){return un(i)?e:i}function ql(i,e){return e.forEach(t=>{Reflect.has(i,t)&&delete i[t]}),i}/**
 * Tone.js
 * @author Yotam Mann
 * @license http://opensource.org/licenses/MIT MIT License
 * @copyright 2014-2024 Yotam Mann
 */class Qn{constructor(){this.debug=!1,this._wasDisposed=!1}static getDefaults(){return{}}log(...e){(this.debug||en&&this.toString()===en.TONE_DEBUG_CLASS)&&Zg(this,...e)}dispose(){return this._wasDisposed=!0,this}get disposed(){return this._wasDisposed}toString(){return this.name}}Qn.version=Yu;const Vc=1e-6;function gs(i,e){return i>e+Vc}function Pa(i,e){return gs(i,e)||gn(i,e)}function uo(i,e){return i+Vc<e}function gn(i,e){return Math.abs(i-e)<Vc}function ov(i,e,t){return Math.max(Math.min(i,t),e)}class hn extends Qn{constructor(){super(),this.name="Timeline",this._timeline=[];const e=Ne(hn.getDefaults(),arguments,["memory"]);this.memory=e.memory,this.increasing=e.increasing}static getDefaults(){return{memory:1/0,increasing:!1}}get length(){return this._timeline.length}add(e){if(Fe(Reflect.has(e,"time"),"Timeline: events must have a time attribute"),e.time=e.time.valueOf(),this.increasing&&this.length){const t=this._timeline[this.length-1];Fe(Pa(e.time,t.time),"The time must be greater than or equal to the last scheduled time"),this._timeline.push(e)}else{const t=this._search(e.time);this._timeline.splice(t+1,0,e)}if(this.length>this.memory){const t=this.length-this.memory;this._timeline.splice(0,t)}return this}remove(e){const t=this._timeline.indexOf(e);return t!==-1&&this._timeline.splice(t,1),this}get(e,t="time"){const n=this._search(e,t);return n!==-1?this._timeline[n]:null}peek(){return this._timeline[0]}shift(){return this._timeline.shift()}getAfter(e,t="time"){const n=this._search(e,t);return n+1<this._timeline.length?this._timeline[n+1]:null}getBefore(e){const t=this._timeline.length;if(t>0&&this._timeline[t-1].time<e)return this._timeline[t-1];const n=this._search(e);return n-1>=0?this._timeline[n-1]:null}cancel(e){if(this._timeline.length>1){let t=this._search(e);if(t>=0)if(gn(this._timeline[t].time,e)){for(let n=t;n>=0&&gn(this._timeline[n].time,e);n--)t=n;this._timeline=this._timeline.slice(0,t)}else this._timeline=this._timeline.slice(0,t+1);else this._timeline=[]}else this._timeline.length===1&&Pa(this._timeline[0].time,e)&&(this._timeline=[]);return this}cancelBefore(e){const t=this._search(e);return t>=0&&(this._timeline=this._timeline.slice(t+1)),this}previousEvent(e){const t=this._timeline.indexOf(e);return t>0?this._timeline[t-1]:null}_search(e,t="time"){if(this._timeline.length===0)return-1;let n=0;const s=this._timeline.length;let r=s;if(s>0&&this._timeline[s-1][t]<=e)return s-1;for(;n<r;){let o=Math.floor(n+(r-n)/2);const a=this._timeline[o],c=this._timeline[o+1];if(gn(a[t],e)){for(let l=o;l<this._timeline.length;l++){const u=this._timeline[l];if(gn(u[t],e))o=l;else break}return o}else{if(uo(a[t],e)&&gs(c[t],e))return o;gs(a[t],e)?r=o:n=o+1}}return-1}_iterate(e,t=0,n=this._timeline.length-1){this._timeline.slice(t,n+1).forEach(e)}forEach(e){return this._iterate(e),this}forEachBefore(e,t){const n=this._search(e);return n!==-1&&this._iterate(t,0,n),this}forEachAfter(e,t){const n=this._search(e);return this._iterate(t,n+1),this}forEachBetween(e,t,n){let s=this._search(e),r=this._search(t);return s!==-1&&r!==-1?(this._timeline[s].time!==e&&(s+=1),this._timeline[r].time===t&&(r-=1),this._iterate(n,s,r)):s===-1&&this._iterate(n,0,r),this}forEachFrom(e,t){let n=this._search(e);for(;n>=0&&this._timeline[n].time>=e;)n--;return this._iterate(t,n+1),this}forEachAtTime(e,t){const n=this._search(e);if(n!==-1&&gn(this._timeline[n].time,e)){let s=n;for(let r=n;r>=0&&gn(this._timeline[r].time,e);r--)s=r;this._iterate(r=>{t(r)},s,n)}return this}dispose(){return super.dispose(),this._timeline=[],this}}const Hh=[];function To(i){Hh.push(i)}function av(i){Hh.forEach(e=>e(i))}const Wh=[];function Eo(i){Wh.push(i)}function cv(i){Wh.forEach(e=>e(i))}class cr extends Qn{constructor(){super(...arguments),this.name="Emitter"}on(e,t){return e.split(/\W+/).forEach(s=>{un(this._events)&&(this._events={}),this._events.hasOwnProperty(s)||(this._events[s]=[]),this._events[s].push(t)}),this}once(e,t){const n=(...s)=>{t(...s),this.off(e,n)};return this.on(e,n),this}off(e,t){return e.split(/\W+/).forEach(s=>{if(un(this._events)&&(this._events={}),this._events.hasOwnProperty(s))if(un(t))this._events[s]=[];else{const r=this._events[s];for(let o=r.length-1;o>=0;o--)r[o]===t&&r.splice(o,1)}}),this}emit(e,...t){if(this._events&&this._events.hasOwnProperty(e)){const n=this._events[e].slice(0);for(let s=0,r=n.length;s<r;s++)n[s].apply(this,t)}return this}static mixin(e){["on","once","off","emit"].forEach(t=>{const n=Object.getOwnPropertyDescriptor(cr.prototype,t);Object.defineProperty(e.prototype,t,n)})}dispose(){return super.dispose(),this._events=void 0,this}}class qh extends cr{constructor(){super(...arguments),this.isOffline=!1}toJSON(){return{}}}class lr extends qh{constructor(){var e,t;super(),this.name="Context",this._constants=new Map,this._timeouts=new hn,this._timeoutIds=0,this._initialized=!1,this._closeStarted=!1,this.isOffline=!1,this._workletPromise=null;const n=Ne(lr.getDefaults(),arguments,["context"]);n.context?(this._context=n.context,this._latencyHint=((e=arguments[0])===null||e===void 0?void 0:e.latencyHint)||""):(this._context=Kg({latencyHint:n.latencyHint}),this._latencyHint=n.latencyHint),this._ticker=new tv(this.emit.bind(this,"tick"),n.clockSource,n.updateInterval,this._context.sampleRate),this.on("tick",this._timeoutLoop.bind(this)),this._context.onstatechange=()=>{this.emit("statechange",this.state)},this[!((t=arguments[0])===null||t===void 0)&&t.hasOwnProperty("updateInterval")?"_lookAhead":"lookAhead"]=n.lookAhead}static getDefaults(){return{clockSource:"worker",latencyHint:"interactive",lookAhead:.1,updateInterval:.05}}initialize(){return this._initialized||(av(this),this._initialized=!0),this}createAnalyser(){return this._context.createAnalyser()}createOscillator(){return this._context.createOscillator()}createBufferSource(){return this._context.createBufferSource()}createBiquadFilter(){return this._context.createBiquadFilter()}createBuffer(e,t,n){return this._context.createBuffer(e,t,n)}createChannelMerger(e){return this._context.createChannelMerger(e)}createChannelSplitter(e){return this._context.createChannelSplitter(e)}createConstantSource(){return this._context.createConstantSource()}createConvolver(){return this._context.createConvolver()}createDelay(e){return this._context.createDelay(e)}createDynamicsCompressor(){return this._context.createDynamicsCompressor()}createGain(){return this._context.createGain()}createIIRFilter(e,t){return this._context.createIIRFilter(e,t)}createPanner(){return this._context.createPanner()}createPeriodicWave(e,t,n){return this._context.createPeriodicWave(e,t,n)}createStereoPanner(){return this._context.createStereoPanner()}createWaveShaper(){return this._context.createWaveShaper()}createMediaStreamSource(e){return Fe(rs(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamSource(e)}createMediaElementSource(e){return Fe(rs(this._context),"Not available if OfflineAudioContext"),this._context.createMediaElementSource(e)}createMediaStreamDestination(){return Fe(rs(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamDestination()}decodeAudioData(e){return this._context.decodeAudioData(e)}get currentTime(){return this._context.currentTime}get state(){return this._context.state}get sampleRate(){return this._context.sampleRate}get listener(){return this.initialize(),this._listener}set listener(e){Fe(!this._initialized,"The listener cannot be set after initialization."),this._listener=e}get transport(){return this.initialize(),this._transport}set transport(e){Fe(!this._initialized,"The transport cannot be set after initialization."),this._transport=e}get draw(){return this.initialize(),this._draw}set draw(e){Fe(!this._initialized,"Draw cannot be set after initialization."),this._draw=e}get destination(){return this.initialize(),this._destination}set destination(e){Fe(!this._initialized,"The destination cannot be set after initialization."),this._destination=e}createAudioWorkletNode(e,t){return ev(this.rawContext,e,t)}addAudioWorkletModule(e){return Et(this,void 0,void 0,function*(){Fe(He(this.rawContext.audioWorklet),"AudioWorkletNode is only available in a secure context (https or localhost)"),this._workletPromise||(this._workletPromise=this.rawContext.audioWorklet.addModule(e)),yield this._workletPromise})}workletsAreReady(){return Et(this,void 0,void 0,function*(){(yield this._workletPromise)?this._workletPromise:Promise.resolve()})}get updateInterval(){return this._ticker.updateInterval}set updateInterval(e){this._ticker.updateInterval=e}get clockSource(){return this._ticker.type}set clockSource(e){this._ticker.type=e}get lookAhead(){return this._lookAhead}set lookAhead(e){this._lookAhead=e,this.updateInterval=e?e/2:.01}get latencyHint(){return this._latencyHint}get rawContext(){return this._context}now(){return this._context.currentTime+this._lookAhead}immediate(){return this._context.currentTime}resume(){return rs(this._context)?this._context.resume():Promise.resolve()}close(){return Et(this,void 0,void 0,function*(){rs(this._context)&&this.state!=="closed"&&!this._closeStarted&&(this._closeStarted=!0,yield this._context.close()),this._initialized&&cv(this)})}getConstant(e){if(this._constants.has(e))return this._constants.get(e);{const t=this._context.createBuffer(1,128,this._context.sampleRate),n=t.getChannelData(0);for(let r=0;r<n.length;r++)n[r]=e;const s=this._context.createBufferSource();return s.channelCount=1,s.channelCountMode="explicit",s.buffer=t,s.loop=!0,s.start(0),this._constants.set(e,s),s}}dispose(){return super.dispose(),this._ticker.dispose(),this._timeouts.dispose(),Object.keys(this._constants).map(e=>this._constants[e].disconnect()),this.close(),this}_timeoutLoop(){const e=this.now();let t=this._timeouts.peek();for(;this._timeouts.length&&t&&t.time<=e;)t.callback(),this._timeouts.shift(),t=this._timeouts.peek()}setTimeout(e,t){this._timeoutIds++;const n=this.now();return this._timeouts.add({callback:e,id:this._timeoutIds,time:n+t}),this._timeoutIds}clearTimeout(e){return this._timeouts.forEach(t=>{t.id===e&&this._timeouts.remove(t)}),this}clearInterval(e){return this.clearTimeout(e)}setInterval(e,t){const n=++this._timeoutIds,s=()=>{const r=this.now();this._timeouts.add({callback:()=>{e(),s()},id:n,time:r+t})};return s(),n}}class lv extends qh{constructor(){super(...arguments),this.lookAhead=0,this.latencyHint=0,this.isOffline=!1}createAnalyser(){return{}}createOscillator(){return{}}createBufferSource(){return{}}createBiquadFilter(){return{}}createBuffer(e,t,n){return{}}createChannelMerger(e){return{}}createChannelSplitter(e){return{}}createConstantSource(){return{}}createConvolver(){return{}}createDelay(e){return{}}createDynamicsCompressor(){return{}}createGain(){return{}}createIIRFilter(e,t){return{}}createPanner(){return{}}createPeriodicWave(e,t,n){return{}}createStereoPanner(){return{}}createWaveShaper(){return{}}createMediaStreamSource(e){return{}}createMediaElementSource(e){return{}}createMediaStreamDestination(){return{}}decodeAudioData(e){return Promise.resolve({})}createAudioWorkletNode(e,t){return{}}get rawContext(){return{}}addAudioWorkletModule(e){return Et(this,void 0,void 0,function*(){return Promise.resolve()})}resume(){return Promise.resolve()}setTimeout(e,t){return 0}clearTimeout(e){return this}setInterval(e,t){return 0}clearInterval(e){return this}getConstant(e){return{}}get currentTime(){return 0}get state(){return{}}get sampleRate(){return 0}get listener(){return{}}get transport(){return{}}get draw(){return{}}set draw(e){}get destination(){return{}}set destination(e){}now(){return 0}immediate(){return 0}}function vt(i,e){yn(e)?e.forEach(t=>vt(i,t)):Object.defineProperty(i,e,{enumerable:!0,writable:!1})}function Xh(i,e){yn(e)?e.forEach(t=>Xh(i,t)):Object.defineProperty(i,e,{writable:!0})}const rt=()=>{};class lt extends Qn{constructor(){super(),this.name="ToneAudioBuffer",this.onload=rt;const e=Ne(lt.getDefaults(),arguments,["url","onload","onerror"]);this.reverse=e.reverse,this.onload=e.onload,$n(e.url)?this.load(e.url).catch(e.onerror):e.url&&this.set(e.url)}static getDefaults(){return{onerror:rt,onload:rt,reverse:!1}}get sampleRate(){return this._buffer?this._buffer.sampleRate:cn().sampleRate}set(e){return e instanceof lt?e.loaded?this._buffer=e.get():e.onload=()=>{this.set(e),this.onload(this)}:this._buffer=e,this._reversed&&this._reverse(),this}get(){return this._buffer}load(e){return Et(this,void 0,void 0,function*(){const t=lt.load(e).then(n=>{this.set(n),this.onload(this)});lt.downloads.push(t);try{yield t}finally{const n=lt.downloads.indexOf(t);lt.downloads.splice(n,1)}return this})}dispose(){return super.dispose(),this._buffer=void 0,this}fromArray(e){const t=yn(e)&&e[0].length>0,n=t?e.length:1,s=t?e[0].length:e.length,r=cn(),o=r.createBuffer(n,s,r.sampleRate),a=!t&&n===1?[e]:e;for(let c=0;c<n;c++)o.copyToChannel(a[c],c);return this._buffer=o,this}toMono(e){if(Ui(e))this.fromArray(this.toArray(e));else{let t=new Float32Array(this.length);const n=this.numberOfChannels;for(let s=0;s<n;s++){const r=this.toArray(s);for(let o=0;o<r.length;o++)t[o]+=r[o]}t=t.map(s=>s/n),this.fromArray(t)}return this}toArray(e){if(Ui(e))return this.getChannelData(e);if(this.numberOfChannels===1)return this.toArray(0);{const t=[];for(let n=0;n<this.numberOfChannels;n++)t[n]=this.getChannelData(n);return t}}getChannelData(e){return this._buffer?this._buffer.getChannelData(e):new Float32Array(0)}slice(e,t=this.duration){Fe(this.loaded,"Buffer is not loaded");const n=Math.floor(e*this.sampleRate),s=Math.floor(t*this.sampleRate);Fe(n<s,"The start time must be less than the end time");const r=s-n,o=cn().createBuffer(this.numberOfChannels,r,this.sampleRate);for(let a=0;a<this.numberOfChannels;a++)o.copyToChannel(this.getChannelData(a).subarray(n,s),a);return new lt(o)}_reverse(){if(this.loaded)for(let e=0;e<this.numberOfChannels;e++)this.getChannelData(e).reverse();return this}get loaded(){return this.length>0}get duration(){return this._buffer?this._buffer.duration:0}get length(){return this._buffer?this._buffer.length:0}get numberOfChannels(){return this._buffer?this._buffer.numberOfChannels:0}get reverse(){return this._reversed}set reverse(e){this._reversed!==e&&(this._reversed=e,this._reverse())}static fromArray(e){return new lt().fromArray(e)}static fromUrl(e){return Et(this,void 0,void 0,function*(){return yield new lt().load(e)})}static load(e){return Et(this,void 0,void 0,function*(){const t=e.match(/\[([^\]\[]+\|.+)\]$/);if(t){const c=t[1].split("|");let l=c[0];for(const u of c)if(lt.supportsType(u)){l=u;break}e=e.replace(t[0],l)}const n=lt.baseUrl===""||lt.baseUrl.endsWith("/")?lt.baseUrl:lt.baseUrl+"/",s=document.createElement("a");s.href=n+e,s.pathname=(s.pathname+s.hash).split("/").map(encodeURIComponent).join("/");const r=yield fetch(s.href);if(!r.ok)throw new Error(`could not load url: ${e}`);const o=yield r.arrayBuffer();return yield cn().decodeAudioData(o)})}static supportsType(e){const t=e.split("."),n=t[t.length-1];return document.createElement("audio").canPlayType("audio/"+n)!==""}static loaded(){return Et(this,void 0,void 0,function*(){for(yield Promise.resolve();lt.downloads.length;)yield lt.downloads[0]})}}lt.baseUrl="";lt.downloads=[];class zc extends lr{constructor(){super({clockSource:"offline",context:Yr(arguments[0])?arguments[0]:Jg(arguments[0],arguments[1]*arguments[2],arguments[2]),lookAhead:0,updateInterval:Yr(arguments[0])?128/arguments[0].sampleRate:128/arguments[2]}),this.name="OfflineContext",this._currentTime=0,this.isOffline=!0,this._duration=Yr(arguments[0])?arguments[0].length/arguments[0].sampleRate:arguments[1]}now(){return this._currentTime}get currentTime(){return this._currentTime}_renderClock(e){return Et(this,void 0,void 0,function*(){let t=0;for(;this._duration-this._currentTime>=0;){this.emit("tick"),this._currentTime+=128/this.sampleRate,t++;const n=Math.floor(this.sampleRate/128);e&&t%n===0&&(yield new Promise(s=>setTimeout(s,1)))}})}render(){return Et(this,arguments,void 0,function*(e=!0){yield this.workletsAreReady(),yield this._renderClock(e);const t=yield this._context.startRendering();return new lt(t)})}close(){return Promise.resolve()}}const Yh=new lv;let as=Yh;function cn(){return as===Yh&&Qg&&uv(new lr),as}function uv(i,e=!1){e&&as.dispose(),rs(i)?as=new lr(i):Yr(i)?as=new zc(i):as=i}if(en&&!en.TONE_SILENCE_LOGGING){const e=` * Tone.js v${Yu} * `;console.log(`%c${e}`,"background: #000; color: #fff")}function hv(i){return Math.pow(10,i/20)}function dv(i){return 20*(Math.log(i)/Math.LN10)}function jh(i){return Math.pow(2,i/12)}let bo=440;function fv(){return bo}function pv(i){bo=i}function Da(i){return Math.round($h(i))}function $h(i){return 69+12*Math.log2(i/bo)}function mv(i){return bo*Math.pow(2,(i-69)/12)}class Gc extends Qn{constructor(e,t,n){super(),this.defaultUnits="s",this._val=t,this._units=n,this.context=e,this._expressions=this._getExpressions()}_getExpressions(){return{hz:{method:e=>this._frequencyToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)hz$/i},i:{method:e=>this._ticksToUnits(parseInt(e,10)),regexp:/^(\d+)i$/i},m:{method:e=>this._beatsToUnits(parseInt(e,10)*this._getTimeSignature()),regexp:/^(\d+)m$/i},n:{method:(e,t)=>{const n=parseInt(e,10),s=t==="."?1.5:1;return n===1?this._beatsToUnits(this._getTimeSignature())*s:this._beatsToUnits(4/n)*s},regexp:/^(\d+)n(\.?)$/i},number:{method:e=>this._expressions[this.defaultUnits].method.call(this,e),regexp:/^(\d+(?:\.\d+)?)$/},s:{method:e=>this._secondsToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)s$/},samples:{method:e=>parseInt(e,10)/this.context.sampleRate,regexp:/^(\d+)samples$/},t:{method:e=>{const t=parseInt(e,10);return this._beatsToUnits(8/(Math.floor(t)*3))},regexp:/^(\d+)t$/i},tr:{method:(e,t,n)=>{let s=0;return e&&e!=="0"&&(s+=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(s+=this._beatsToUnits(parseFloat(t))),n&&n!=="0"&&(s+=this._beatsToUnits(parseFloat(n)/4)),s},regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/}}}valueOf(){if(this._val instanceof Gc&&this.fromType(this._val),un(this._val))return this._noArg();if($n(this._val)&&un(this._units)){for(const e in this._expressions)if(this._expressions[e].regexp.test(this._val.trim())){this._units=e;break}}else if(Ni(this._val)){let e=0;for(const t in this._val)if(He(this._val[t])){const n=this._val[t],s=new this.constructor(this.context,t).valueOf()*n;e+=s}return e}if(He(this._units)){const e=this._expressions[this._units],t=this._val.toString().trim().match(e.regexp);return t?e.method.apply(this,t.slice(1)):e.method.call(this,this._val)}else return $n(this._val)?parseFloat(this._val):this._val}_frequencyToUnits(e){return 1/e}_beatsToUnits(e){return 60/this._getBpm()*e}_secondsToUnits(e){return e}_ticksToUnits(e){return e*this._beatsToUnits(1)/this._getPPQ()}_noArg(){return this._now()}_getBpm(){return this.context.transport.bpm.value}_getTimeSignature(){return this.context.transport.timeSignature}_getPPQ(){return this.context.transport.PPQ}fromType(e){switch(this._units=void 0,this.defaultUnits){case"s":this._val=e.toSeconds();break;case"i":this._val=e.toTicks();break;case"hz":this._val=e.toFrequency();break;case"midi":this._val=e.toMidi();break}return this}toFrequency(){return 1/this.toSeconds()}toSamples(){return this.toSeconds()*this.context.sampleRate}toMilliseconds(){return this.toSeconds()*1e3}}class xn extends Gc{constructor(){super(...arguments),this.name="TimeClass"}_getExpressions(){return Object.assign(super._getExpressions(),{now:{method:e=>this._now()+new this.constructor(this.context,e).valueOf(),regexp:/^\+(.+)/},quantize:{method:e=>{const t=new xn(this.context,e).valueOf();return this._secondsToUnits(this.context.transport.nextSubdivision(t))},regexp:/^@(.+)/}})}quantize(e,t=1){const n=new this.constructor(this.context,e).valueOf(),s=this.valueOf(),a=Math.round(s/n)*n-s;return s+a*t}toNotation(){const e=this.toSeconds(),t=["1m"];for(let r=1;r<9;r++){const o=Math.pow(2,r);t.push(o+"n."),t.push(o+"n"),t.push(o+"t")}t.push("0");let n=t[0],s=new xn(this.context,t[0]).toSeconds();return t.forEach(r=>{const o=new xn(this.context,r).toSeconds();Math.abs(o-e)<Math.abs(s-e)&&(n=r,s=o)}),n}toBarsBeatsSixteenths(){const e=this._beatsToUnits(1);let t=this.valueOf()/e;t=parseFloat(t.toFixed(4));const n=Math.floor(t/this._getTimeSignature());let s=t%1*4;t=Math.floor(t)%this._getTimeSignature();const r=s.toString();return r.length>3&&(s=parseFloat(parseFloat(r).toFixed(3))),[n,t,s].join(":")}toTicks(){const e=this._beatsToUnits(1);return this.valueOf()/e*this._getPPQ()}toSeconds(){return this.valueOf()}toMidi(){return Da(this.toFrequency())}_now(){return this.context.now()}}class ln extends xn{constructor(){super(...arguments),this.name="Frequency",this.defaultUnits="hz"}static get A4(){return fv()}static set A4(e){pv(e)}_getExpressions(){return Object.assign({},super._getExpressions(),{midi:{regexp:/^(\d+(?:\.\d+)?midi)/,method(e){return this.defaultUnits==="midi"?e:ln.mtof(e)}},note:{regexp:/^([a-g]{1}(?:b|#|##|x|bb|###|#x|x#|bbb)?)(-?[0-9]+)/i,method(e,t){const s=_v[e.toLowerCase()]+(parseInt(t,10)+1)*12;return this.defaultUnits==="midi"?s:ln.mtof(s)}},tr:{regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,method(e,t,n){let s=1;return e&&e!=="0"&&(s*=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(s*=this._beatsToUnits(parseFloat(t))),n&&n!=="0"&&(s*=this._beatsToUnits(parseFloat(n)/4)),s}}})}transpose(e){return new ln(this.context,this.valueOf()*jh(e))}harmonize(e){return e.map(t=>this.transpose(t))}toMidi(){return Da(this.valueOf())}toNote(){const e=this.toFrequency(),t=Math.log2(e/ln.A4);let n=Math.round(12*t)+57;const s=Math.floor(n/12);return s<0&&(n+=-12*s),gv[n%12]+s.toString()}toSeconds(){return 1/super.toSeconds()}toTicks(){const e=this._beatsToUnits(1),t=this.valueOf()/e;return Math.floor(t*this._getPPQ())}_noArg(){return 0}_frequencyToUnits(e){return e}_ticksToUnits(e){return 1/(e*60/(this._getBpm()*this._getPPQ()))}_beatsToUnits(e){return 1/super._beatsToUnits(e)}_secondsToUnits(e){return 1/e}static mtof(e){return mv(e)}static ftom(e){return Da(e)}}const _v={cbbb:-3,cbb:-2,cb:-1,c:0,"c#":1,cx:2,"c##":2,"c###":3,"cx#":3,"c#x":3,dbbb:-1,dbb:0,db:1,d:2,"d#":3,dx:4,"d##":4,"d###":5,"dx#":5,"d#x":5,ebbb:1,ebb:2,eb:3,e:4,"e#":5,ex:6,"e##":6,"e###":7,"ex#":7,"e#x":7,fbbb:2,fbb:3,fb:4,f:5,"f#":6,fx:7,"f##":7,"f###":8,"fx#":8,"f#x":8,gbbb:4,gbb:5,gb:6,g:7,"g#":8,gx:9,"g##":9,"g###":10,"gx#":10,"g#x":10,abbb:6,abb:7,ab:8,a:9,"a#":10,ax:11,"a##":11,"a###":12,"ax#":12,"a#x":12,bbbb:8,bbb:9,bb:10,b:11,"b#":12,bx:13,"b##":13,"b###":14,"bx#":14,"b#x":14},gv=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];class Xs extends xn{constructor(){super(...arguments),this.name="TransportTime"}_now(){return this.context.transport.seconds}}class qt extends Qn{constructor(){super();const e=Ne(qt.getDefaults(),arguments,["context"]);this.defaultContext?this.context=this.defaultContext:this.context=e.context}static getDefaults(){return{context:cn()}}now(){return this.context.currentTime+this.context.lookAhead}immediate(){return this.context.currentTime}get sampleTime(){return 1/this.context.sampleRate}get blockTime(){return 128/this.context.sampleRate}toSeconds(e){return $g(e),new xn(this.context,e).toSeconds()}toFrequency(e){return new ln(this.context,e).toFrequency()}toTicks(e){return new Xs(this.context,e).toTicks()}_getPartialProperties(e){const t=this.get();return Object.keys(t).forEach(n=>{un(e[n])&&delete t[n]}),t}get(){const e=rv(this);return Object.keys(e).forEach(t=>{if(Reflect.has(this,t)){const n=this[t];He(n)&&He(n.value)&&He(n.setValueAtTime)?e[t]=n.value:n instanceof qt?e[t]=n._getPartialProperties(e[t]):yn(n)||Ui(n)||$n(n)||jg(n)?e[t]=n:delete e[t]}}),e}set(e){return Object.keys(e).forEach(t=>{Reflect.has(this,t)&&He(this[t])&&(this[t]&&He(this[t].value)&&He(this[t].setValueAtTime)?this[t].value!==e[t]&&(this[t].value=e[t]):this[t]instanceof qt?this[t].set(e[t]):this[t]=e[t])}),this}}class Hc extends hn{constructor(e="stopped"){super(),this.name="StateTimeline",this._initial=e,this.setStateAtTime(this._initial,0)}getValueAtTime(e){const t=this.get(e);return t!==null?t.state:this._initial}setStateAtTime(e,t,n){return Zn(t,0),this.add(Object.assign({},n,{state:e,time:t})),this}getLastState(e,t){const n=this._search(t);for(let s=n;s>=0;s--){const r=this._timeline[s];if(r.state===e)return r}}getNextState(e,t){const n=this._search(t);if(n!==-1)for(let s=n;s<this._timeline.length;s++){const r=this._timeline[s];if(r.state===e)return r}}}class ft extends qt{constructor(){const e=Ne(ft.getDefaults(),arguments,["param","units","convert"]);for(super(e),this.name="Param",this.overridden=!1,this._minOutput=1e-7,Fe(He(e.param)&&(Fi(e.param)||e.param instanceof ft),"param must be an AudioParam");!Fi(e.param);)e.param=e.param._param;this._swappable=He(e.swappable)?e.swappable:!1,this._swappable?(this.input=this.context.createGain(),this._param=e.param,this.input.connect(this._param)):this._param=this.input=e.param,this._events=new hn(1e3),this._initialValue=this._param.defaultValue,this.units=e.units,this.convert=e.convert,this._minValue=e.minValue,this._maxValue=e.maxValue,He(e.value)&&e.value!==this._toType(this._initialValue)&&this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(qt.getDefaults(),{convert:!0,units:"number"})}get value(){const e=this.now();return this.getValueAtTime(e)}set value(e){this.cancelScheduledValues(this.now()),this.setValueAtTime(e,this.now())}get minValue(){return He(this._minValue)?this._minValue:this.units==="time"||this.units==="frequency"||this.units==="normalRange"||this.units==="positive"||this.units==="transportTime"||this.units==="ticks"||this.units==="bpm"||this.units==="hertz"||this.units==="samples"?0:this.units==="audioRange"?-1:this.units==="decibels"?-1/0:this._param.minValue}get maxValue(){return He(this._maxValue)?this._maxValue:this.units==="normalRange"||this.units==="audioRange"?1:this._param.maxValue}_is(e,t){return this.units===t}_assertRange(e){return He(this.maxValue)&&He(this.minValue)&&Zn(e,this._fromType(this.minValue),this._fromType(this.maxValue)),e}_fromType(e){return this.convert&&!this.overridden?this._is(e,"time")?this.toSeconds(e):this._is(e,"decibels")?hv(e):this._is(e,"frequency")?this.toFrequency(e):e:this.overridden?0:e}_toType(e){return this.convert&&this.units==="decibels"?dv(e):e}setValueAtTime(e,t){const n=this.toSeconds(t),s=this._fromType(e);return Fe(isFinite(s)&&isFinite(n),`Invalid argument(s) to setValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(s),this.log(this.units,"setValueAtTime",e,n),this._events.add({time:n,type:"setValueAtTime",value:s}),this._param.setValueAtTime(s,n),this}getValueAtTime(e){const t=Math.max(this.toSeconds(e),0),n=this._events.getAfter(t),s=this._events.get(t);let r=this._initialValue;if(s===null)r=this._initialValue;else if(s.type==="setTargetAtTime"&&(n===null||n.type==="setValueAtTime")){const o=this._events.getBefore(s.time);let a;o===null?a=this._initialValue:a=o.value,s.type==="setTargetAtTime"&&(r=this._exponentialApproach(s.time,a,s.value,s.constant,t))}else if(n===null)r=s.value;else if(n.type==="linearRampToValueAtTime"||n.type==="exponentialRampToValueAtTime"){let o=s.value;if(s.type==="setTargetAtTime"){const a=this._events.getBefore(s.time);a===null?o=this._initialValue:o=a.value}n.type==="linearRampToValueAtTime"?r=this._linearInterpolate(s.time,o,n.time,n.value,t):r=this._exponentialInterpolate(s.time,o,n.time,n.value,t)}else r=s.value;return this._toType(r)}setRampPoint(e){e=this.toSeconds(e);let t=this.getValueAtTime(e);return this.cancelAndHoldAtTime(e),this._fromType(t)===0&&(t=this._toType(this._minOutput)),this.setValueAtTime(t,e),this}linearRampToValueAtTime(e,t){const n=this._fromType(e),s=this.toSeconds(t);return Fe(isFinite(n)&&isFinite(s),`Invalid argument(s) to linearRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(n),this._events.add({time:s,type:"linearRampToValueAtTime",value:n}),this.log(this.units,"linearRampToValueAtTime",e,s),this._param.linearRampToValueAtTime(n,s),this}exponentialRampToValueAtTime(e,t){let n=this._fromType(e);n=gn(n,0)?this._minOutput:n,this._assertRange(n);const s=this.toSeconds(t);return Fe(isFinite(n)&&isFinite(s),`Invalid argument(s) to exponentialRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({time:s,type:"exponentialRampToValueAtTime",value:n}),this.log(this.units,"exponentialRampToValueAtTime",e,s),this._param.exponentialRampToValueAtTime(n,s),this}exponentialRampTo(e,t,n){return n=this.toSeconds(n),this.setRampPoint(n),this.exponentialRampToValueAtTime(e,n+this.toSeconds(t)),this}linearRampTo(e,t,n){return n=this.toSeconds(n),this.setRampPoint(n),this.linearRampToValueAtTime(e,n+this.toSeconds(t)),this}targetRampTo(e,t,n){return n=this.toSeconds(n),this.setRampPoint(n),this.exponentialApproachValueAtTime(e,n,t),this}exponentialApproachValueAtTime(e,t,n){t=this.toSeconds(t),n=this.toSeconds(n);const s=Math.log(n+1)/Math.log(200);return this.setTargetAtTime(e,t,s),this.cancelAndHoldAtTime(t+n*.9),this.linearRampToValueAtTime(e,t+n),this}setTargetAtTime(e,t,n){const s=this._fromType(e);Fe(isFinite(n)&&n>0,"timeConstant must be a number greater than 0");const r=this.toSeconds(t);return this._assertRange(s),Fe(isFinite(s)&&isFinite(r),`Invalid argument(s) to setTargetAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({constant:n,time:r,type:"setTargetAtTime",value:s}),this.log(this.units,"setTargetAtTime",e,r,n),this._param.setTargetAtTime(s,r,n),this}setValueCurveAtTime(e,t,n,s=1){n=this.toSeconds(n),t=this.toSeconds(t);const r=this._fromType(e[0])*s;this.setValueAtTime(this._toType(r),t);const o=n/(e.length-1);for(let a=1;a<e.length;a++){const c=this._fromType(e[a])*s;this.linearRampToValueAtTime(this._toType(c),t+a*o)}return this}cancelScheduledValues(e){const t=this.toSeconds(e);return Fe(isFinite(t),`Invalid argument to cancelScheduledValues: ${JSON.stringify(e)}`),this._events.cancel(t),this._param.cancelScheduledValues(t),this.log(this.units,"cancelScheduledValues",t),this}cancelAndHoldAtTime(e){const t=this.toSeconds(e),n=this._fromType(this.getValueAtTime(t));Fe(isFinite(t),`Invalid argument to cancelAndHoldAtTime: ${JSON.stringify(e)}`),this.log(this.units,"cancelAndHoldAtTime",t,"value="+n);const s=this._events.get(t),r=this._events.getAfter(t);return s&&gn(s.time,t)?r?(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time)):(this._param.cancelAndHoldAtTime(t),this._events.cancel(t+this.sampleTime)):r&&(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time),r.type==="linearRampToValueAtTime"?this.linearRampToValueAtTime(this._toType(n),t):r.type==="exponentialRampToValueAtTime"&&this.exponentialRampToValueAtTime(this._toType(n),t)),this._events.add({time:t,type:"setValueAtTime",value:n}),this._param.setValueAtTime(n,t),this}rampTo(e,t=.1,n){return this.units==="frequency"||this.units==="bpm"||this.units==="decibels"?this.exponentialRampTo(e,t,n):this.linearRampTo(e,t,n),this}apply(e){const t=this.context.currentTime;e.setValueAtTime(this.getValueAtTime(t),t);const n=this._events.get(t);if(n&&n.type==="setTargetAtTime"){const s=this._events.getAfter(n.time),r=s?s.time:t+2,o=(r-t)/10;for(let a=t;a<r;a+=o)e.linearRampToValueAtTime(this.getValueAtTime(a),a)}return this._events.forEachAfter(this.context.currentTime,s=>{s.type==="cancelScheduledValues"?e.cancelScheduledValues(s.time):s.type==="setTargetAtTime"?e.setTargetAtTime(s.value,s.time,s.constant):e[s.type](s.value,s.time)}),this}setParam(e){Fe(this._swappable,"The Param must be assigned as 'swappable' in the constructor");const t=this.input;return t.disconnect(this._param),this.apply(e),this._param=e,t.connect(this._param),this}dispose(){return super.dispose(),this._events.dispose(),this}get defaultValue(){return this._toType(this._param.defaultValue)}_exponentialApproach(e,t,n,s,r){return n+(t-n)*Math.exp(-(r-e)/s)}_linearInterpolate(e,t,n,s,r){return t+(s-t)*((r-e)/(n-e))}_exponentialInterpolate(e,t,n,s,r){return t*Math.pow(s/t,(r-e)/(n-e))}}class ke extends qt{constructor(){super(...arguments),this._internalChannels=[]}get numberOfInputs(){return He(this.input)?Fi(this.input)||this.input instanceof ft?1:this.input.numberOfInputs:0}get numberOfOutputs(){return He(this.output)?this.output.numberOfOutputs:0}_isAudioNode(e){return He(e)&&(e instanceof ke||ui(e))}_getInternalNodes(){const e=this._internalChannels.slice(0);return this._isAudioNode(this.input)&&e.push(this.input),this._isAudioNode(this.output)&&this.input!==this.output&&e.push(this.output),e}_setChannelProperties(e){this._getInternalNodes().forEach(n=>{n.channelCount=e.channelCount,n.channelCountMode=e.channelCountMode,n.channelInterpretation=e.channelInterpretation})}_getChannelProperties(){const e=this._getInternalNodes();Fe(e.length>0,"ToneAudioNode does not have any internal nodes");const t=e[0];return{channelCount:t.channelCount,channelCountMode:t.channelCountMode,channelInterpretation:t.channelInterpretation}}get channelCount(){return this._getChannelProperties().channelCount}set channelCount(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCount:e}))}get channelCountMode(){return this._getChannelProperties().channelCountMode}set channelCountMode(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCountMode:e}))}get channelInterpretation(){return this._getChannelProperties().channelInterpretation}set channelInterpretation(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelInterpretation:e}))}connect(e,t=0,n=0){return Ns(this,e,t,n),this}toDestination(){return this.connect(this.context.destination),this}toMaster(){return Bc("toMaster() has been renamed toDestination()"),this.toDestination()}disconnect(e,t=0,n=0){return vv(this,e,t,n),this}chain(...e){return Ia(this,...e),this}fan(...e){return e.forEach(t=>this.connect(t)),this}dispose(){return super.dispose(),He(this.input)&&(this.input instanceof ke?this.input.dispose():ui(this.input)&&this.input.disconnect()),He(this.output)&&(this.output instanceof ke?this.output.dispose():ui(this.output)&&this.output.disconnect()),this._internalChannels=[],this}}function Ia(...i){const e=i.shift();i.reduce((t,n)=>(t instanceof ke?t.connect(n):ui(t)&&Ns(t,n),n),e)}function Ns(i,e,t=0,n=0){for(Fe(He(i),"Cannot connect from undefined node"),Fe(He(e),"Cannot connect to undefined node"),(e instanceof ke||ui(e))&&Fe(e.numberOfInputs>0,"Cannot connect to node with no inputs"),Fe(i.numberOfOutputs>0,"Cannot connect from node with no outputs");e instanceof ke||e instanceof ft;)He(e.input)&&(e=e.input);for(;i instanceof ke;)He(i.output)&&(i=i.output);Fi(e)?i.connect(e,t):i.connect(e,t,n)}function vv(i,e,t=0,n=0){if(He(e))for(;e instanceof ke;)e=e.input;for(;!ui(i);)He(i.output)&&(i=i.output);Fi(e)?i.disconnect(e,t):ui(e)?i.disconnect(e,t,n):i.disconnect()}class It extends ke{constructor(){const e=Ne(It.getDefaults(),arguments,["gain","units"]);super(e),this.name="Gain",this._gainNode=this.context.createGain(),this.input=this._gainNode,this.output=this._gainNode,this.gain=new ft({context:this.context,convert:e.convert,param:this._gainNode.gain,units:e.units,value:e.gain,minValue:e.minValue,maxValue:e.maxValue}),vt(this,"gain")}static getDefaults(){return Object.assign(ke.getDefaults(),{convert:!0,gain:1,units:"gain"})}dispose(){return super.dispose(),this._gainNode.disconnect(),this.gain.dispose(),this}}class vs extends ke{constructor(e){super(e),this.onended=rt,this._startTime=-1,this._stopTime=-1,this._timeout=-1,this.output=new It({context:this.context,gain:0}),this._gainNode=this.output,this.getStateAtTime=function(t){const n=this.toSeconds(t);return this._startTime!==-1&&n>=this._startTime&&(this._stopTime===-1||n<=this._stopTime)?"started":"stopped"},this._fadeIn=e.fadeIn,this._fadeOut=e.fadeOut,this._curve=e.curve,this.onended=e.onended}static getDefaults(){return Object.assign(ke.getDefaults(),{curve:"linear",fadeIn:0,fadeOut:0,onended:rt})}_startGain(e,t=1){Fe(this._startTime===-1,"Source cannot be started more than once");const n=this.toSeconds(this._fadeIn);return this._startTime=e+n,this._startTime=Math.max(this._startTime,this.context.currentTime),n>0?(this._gainNode.gain.setValueAtTime(0,e),this._curve==="linear"?this._gainNode.gain.linearRampToValueAtTime(t,e+n):this._gainNode.gain.exponentialApproachValueAtTime(t,e,n)):this._gainNode.gain.setValueAtTime(t,e),this}stop(e){return this.log("stop",e),this._stopGain(this.toSeconds(e)),this}_stopGain(e){Fe(this._startTime!==-1,"'start' must be called before 'stop'"),this.cancelStop();const t=this.toSeconds(this._fadeOut);return this._stopTime=this.toSeconds(e)+t,this._stopTime=Math.max(this._stopTime,this.now()),t>0?this._curve==="linear"?this._gainNode.gain.linearRampTo(0,t,e):this._gainNode.gain.targetRampTo(0,t,e):(this._gainNode.gain.cancelAndHoldAtTime(e),this._gainNode.gain.setValueAtTime(0,e)),this.context.clearTimeout(this._timeout),this._timeout=this.context.setTimeout(()=>{const n=this._curve==="exponential"?t*2:0;this._stopSource(this.now()+n),this._onended()},this._stopTime-this.context.currentTime),this}_onended(){if(this.onended!==rt&&(this.onended(this),this.onended=rt,!this.context.isOffline)){const e=()=>this.dispose();typeof window.requestIdleCallback<"u"?window.requestIdleCallback(e):setTimeout(e,1e3)}}get state(){return this.getStateAtTime(this.now())}cancelStop(){return this.log("cancelStop"),Fe(this._startTime!==-1,"Source is not started"),this._gainNode.gain.cancelScheduledValues(this._startTime+this.sampleTime),this.context.clearTimeout(this._timeout),this._stopTime=-1,this}dispose(){return super.dispose(),this._gainNode.dispose(),this.onended=rt,this}}class Wc extends vs{constructor(){const e=Ne(Wc.getDefaults(),arguments,["offset"]);super(e),this.name="ToneConstantSource",this._source=this.context.createConstantSource(),Ns(this._source,this._gainNode),this.offset=new ft({context:this.context,convert:e.convert,param:this._source.offset,units:e.units,value:e.offset,minValue:e.minValue,maxValue:e.maxValue})}static getDefaults(){return Object.assign(vs.getDefaults(),{convert:!0,offset:1,units:"number"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._source.start(t),this}_stopSource(e){this._source.stop(e)}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._source.disconnect(),this.offset.dispose(),this}}class Pt extends ke{constructor(){const e=Ne(Pt.getDefaults(),arguments,["value","units"]);super(e),this.name="Signal",this.override=!0,this.output=this._constantSource=new Wc({context:this.context,convert:e.convert,offset:e.value,units:e.units,minValue:e.minValue,maxValue:e.maxValue}),this._constantSource.start(0),this.input=this._param=this._constantSource.offset}static getDefaults(){return Object.assign(ke.getDefaults(),{convert:!0,units:"number",value:0})}connect(e,t=0,n=0){return qc(this,e,t,n),this}dispose(){return super.dispose(),this._param.dispose(),this._constantSource.dispose(),this}setValueAtTime(e,t){return this._param.setValueAtTime(e,t),this}getValueAtTime(e){return this._param.getValueAtTime(e)}setRampPoint(e){return this._param.setRampPoint(e),this}linearRampToValueAtTime(e,t){return this._param.linearRampToValueAtTime(e,t),this}exponentialRampToValueAtTime(e,t){return this._param.exponentialRampToValueAtTime(e,t),this}exponentialRampTo(e,t,n){return this._param.exponentialRampTo(e,t,n),this}linearRampTo(e,t,n){return this._param.linearRampTo(e,t,n),this}targetRampTo(e,t,n){return this._param.targetRampTo(e,t,n),this}exponentialApproachValueAtTime(e,t,n){return this._param.exponentialApproachValueAtTime(e,t,n),this}setTargetAtTime(e,t,n){return this._param.setTargetAtTime(e,t,n),this}setValueCurveAtTime(e,t,n,s){return this._param.setValueCurveAtTime(e,t,n,s),this}cancelScheduledValues(e){return this._param.cancelScheduledValues(e),this}cancelAndHoldAtTime(e){return this._param.cancelAndHoldAtTime(e),this}rampTo(e,t,n){return this._param.rampTo(e,t,n),this}get value(){return this._param.value}set value(e){this._param.value=e}get convert(){return this._param.convert}set convert(e){this._param.convert=e}get units(){return this._param.units}get overridden(){return this._param.overridden}set overridden(e){this._param.overridden=e}get maxValue(){return this._param.maxValue}get minValue(){return this._param.minValue}apply(e){return this._param.apply(e),this}}function qc(i,e,t,n){(e instanceof ft||Fi(e)||e instanceof Pt&&e.override)&&(e.cancelScheduledValues(0),e.setValueAtTime(0,0),e instanceof Pt&&(e.overridden=!0)),Ns(i,e,t,n)}class Xc extends ft{constructor(){const e=Ne(Xc.getDefaults(),arguments,["value"]);super(e),this.name="TickParam",this._events=new hn(1/0),this._multiplier=1,this._multiplier=e.multiplier,this._events.cancel(0),this._events.add({ticks:0,time:0,type:"setValueAtTime",value:this._fromType(e.value)}),this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(ft.getDefaults(),{multiplier:1,units:"hertz",value:1})}setTargetAtTime(e,t,n){t=this.toSeconds(t),this.setRampPoint(t);const s=this._fromType(e),r=this._events.get(t),o=Math.round(Math.max(1/n,1));for(let a=0;a<=o;a++){const c=n*a+t,l=this._exponentialApproach(r.time,r.value,s,n,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}setValueAtTime(e,t){const n=this.toSeconds(t);super.setValueAtTime(e,t);const s=this._events.get(n),r=this._events.previousEvent(s),o=this._getTicksUntilEvent(r,n);return s.ticks=Math.max(o,0),this}linearRampToValueAtTime(e,t){const n=this.toSeconds(t);super.linearRampToValueAtTime(e,t);const s=this._events.get(n),r=this._events.previousEvent(s),o=this._getTicksUntilEvent(r,n);return s.ticks=Math.max(o,0),this}exponentialRampToValueAtTime(e,t){t=this.toSeconds(t);const n=this._fromType(e),s=this._events.get(t),r=Math.round(Math.max((t-s.time)*10,1)),o=(t-s.time)/r;for(let a=0;a<=r;a++){const c=o*a+s.time,l=this._exponentialInterpolate(s.time,s.value,t,n,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}_getTicksUntilEvent(e,t){if(e===null)e={ticks:0,time:0,type:"setValueAtTime",value:0};else if(un(e.ticks)){const o=this._events.previousEvent(e);e.ticks=this._getTicksUntilEvent(o,e.time)}const n=this._fromType(this.getValueAtTime(e.time));let s=this._fromType(this.getValueAtTime(t));const r=this._events.get(t);return r&&r.time===t&&r.type==="setValueAtTime"&&(s=this._fromType(this.getValueAtTime(t-this.sampleTime))),.5*(t-e.time)*(n+s)+e.ticks}getTicksAtTime(e){const t=this.toSeconds(e),n=this._events.get(t);return Math.max(this._getTicksUntilEvent(n,t),0)}getDurationOfTicks(e,t){const n=this.toSeconds(t),s=this.getTicksAtTime(t);return this.getTimeOfTick(s+e)-n}getTimeOfTick(e){const t=this._events.get(e,"ticks"),n=this._events.getAfter(e,"ticks");if(t&&t.ticks===e)return t.time;if(t&&n&&n.type==="linearRampToValueAtTime"&&t.value!==n.value){const s=this._fromType(this.getValueAtTime(t.time)),o=(this._fromType(this.getValueAtTime(n.time))-s)/(n.time-t.time),a=Math.sqrt(Math.pow(s,2)-2*o*(t.ticks-e)),c=(-s+a)/o,l=(-s-a)/o;return(c>0?c:l)+t.time}else return t?t.value===0?1/0:t.time+(e-t.ticks)/t.value:e/this._initialValue}ticksToTime(e,t){return this.getDurationOfTicks(e,t)}timeToTicks(e,t){const n=this.toSeconds(t),s=this.toSeconds(e),r=this.getTicksAtTime(n);return this.getTicksAtTime(n+s)-r}_fromType(e){return this.units==="bpm"&&this.multiplier?1/(60/e/this.multiplier):super._fromType(e)}_toType(e){return this.units==="bpm"&&this.multiplier?e/this.multiplier*60:super._toType(e)}get multiplier(){return this._multiplier}set multiplier(e){const t=this.value;this._multiplier=e,this.cancelScheduledValues(0),this.setValueAtTime(t,0)}}class Yc extends Pt{constructor(){const e=Ne(Yc.getDefaults(),arguments,["value"]);super(e),this.name="TickSignal",this.input=this._param=new Xc({context:this.context,convert:e.convert,multiplier:e.multiplier,param:this._constantSource.offset,units:e.units,value:e.value})}static getDefaults(){return Object.assign(Pt.getDefaults(),{multiplier:1,units:"hertz",value:1})}ticksToTime(e,t){return this._param.ticksToTime(e,t)}timeToTicks(e,t){return this._param.timeToTicks(e,t)}getTimeOfTick(e){return this._param.getTimeOfTick(e)}getDurationOfTicks(e,t){return this._param.getDurationOfTicks(e,t)}getTicksAtTime(e){return this._param.getTicksAtTime(e)}get multiplier(){return this._param.multiplier}set multiplier(e){this._param.multiplier=e}dispose(){return super.dispose(),this._param.dispose(),this}}class jc extends qt{constructor(){const e=Ne(jc.getDefaults(),arguments,["frequency"]);super(e),this.name="TickSource",this._state=new Hc,this._tickOffset=new hn,this._ticksAtTime=new hn,this._secondsAtTime=new hn,this.frequency=new Yc({context:this.context,units:e.units,value:e.frequency}),vt(this,"frequency"),this._state.setStateAtTime("stopped",0),this.setTicksAtTime(0,0)}static getDefaults(){return Object.assign({frequency:1,units:"hertz"},qt.getDefaults())}get state(){return this.getStateAtTime(this.now())}start(e,t){const n=this.toSeconds(e);return this._state.getValueAtTime(n)!=="started"&&(this._state.setStateAtTime("started",n),He(t)&&this.setTicksAtTime(t,n),this._ticksAtTime.cancel(n),this._secondsAtTime.cancel(n)),this}stop(e){const t=this.toSeconds(e);if(this._state.getValueAtTime(t)==="stopped"){const n=this._state.get(t);n&&n.time>0&&(this._tickOffset.cancel(n.time),this._state.cancel(n.time))}return this._state.cancel(t),this._state.setStateAtTime("stopped",t),this.setTicksAtTime(0,t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t)),this}cancel(e){return e=this.toSeconds(e),this._state.cancel(e),this._tickOffset.cancel(e),this._ticksAtTime.cancel(e),this._secondsAtTime.cancel(e),this}getTicksAtTime(e){const t=this.toSeconds(e),n=this._state.getLastState("stopped",t),s=this._ticksAtTime.get(t),r={state:"paused",time:t};this._state.add(r);let o=s||n,a=s?s.ticks:0,c=null;return this._state.forEachBetween(o.time,t+this.sampleTime,l=>{let u=o.time;const h=this._tickOffset.get(l.time);h&&h.time>=o.time&&(a=h.ticks,u=h.time),o.state==="started"&&l.state!=="started"&&(a+=this.frequency.getTicksAtTime(l.time)-this.frequency.getTicksAtTime(u),l.time!==r.time&&(c={state:l.state,time:l.time,ticks:a})),o=l}),this._state.remove(r),c&&this._ticksAtTime.add(c),a}get ticks(){return this.getTicksAtTime(this.now())}set ticks(e){this.setTicksAtTime(e,this.now())}get seconds(){return this.getSecondsAtTime(this.now())}set seconds(e){const t=this.now(),n=this.frequency.timeToTicks(e,t);this.setTicksAtTime(n,t)}getSecondsAtTime(e){e=this.toSeconds(e);const t=this._state.getLastState("stopped",e),n={state:"paused",time:e};this._state.add(n);const s=this._secondsAtTime.get(e);let r=s||t,o=s?s.seconds:0,a=null;return this._state.forEachBetween(r.time,e+this.sampleTime,c=>{let l=r.time;const u=this._tickOffset.get(c.time);u&&u.time>=r.time&&(o=u.seconds,l=u.time),r.state==="started"&&c.state!=="started"&&(o+=c.time-l,c.time!==n.time&&(a={state:c.state,time:c.time,seconds:o})),r=c}),this._state.remove(n),a&&this._secondsAtTime.add(a),o}setTicksAtTime(e,t){return t=this.toSeconds(t),this._tickOffset.cancel(t),this._tickOffset.add({seconds:this.frequency.getDurationOfTicks(e,t),ticks:e,time:t}),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}getStateAtTime(e){return e=this.toSeconds(e),this._state.getValueAtTime(e)}getTimeOfTick(e,t=this.now()){const n=this._tickOffset.get(t),s=this._state.get(t),r=Math.max(n.time,s.time),o=this.frequency.getTicksAtTime(r)+e-n.ticks;return this.frequency.getTimeOfTick(o)}forEachTickBetween(e,t,n){let s=this._state.get(e);this._state.forEachBetween(e,t,o=>{s&&s.state==="started"&&o.state!=="started"&&this.forEachTickBetween(Math.max(s.time,e),o.time-this.sampleTime,n),s=o});let r=null;if(s&&s.state==="started"){const o=Math.max(s.time,e),a=this.frequency.getTicksAtTime(o),c=this.frequency.getTicksAtTime(s.time),l=a-c;let u=Math.ceil(l)-l;u=gn(u,1)?0:u;let h=this.frequency.getTimeOfTick(a+u);for(;h<t;){try{n(h,Math.round(this.getTicksAtTime(h)))}catch(d){r=d;break}h+=this.frequency.getDurationOfTicks(1,h)}}if(r)throw r;return this}dispose(){return super.dispose(),this._state.dispose(),this._tickOffset.dispose(),this._ticksAtTime.dispose(),this._secondsAtTime.dispose(),this.frequency.dispose(),this}}class Ao extends qt{constructor(){const e=Ne(Ao.getDefaults(),arguments,["callback","frequency"]);super(e),this.name="Clock",this.callback=rt,this._lastUpdate=0,this._state=new Hc("stopped"),this._boundLoop=this._loop.bind(this),this.callback=e.callback,this._tickSource=new jc({context:this.context,frequency:e.frequency,units:e.units}),this._lastUpdate=0,this.frequency=this._tickSource.frequency,vt(this,"frequency"),this._state.setStateAtTime("stopped",0),this.context.on("tick",this._boundLoop)}static getDefaults(){return Object.assign(qt.getDefaults(),{callback:rt,frequency:1,units:"hertz"})}get state(){return this._state.getValueAtTime(this.now())}start(e,t){Vh(this.context);const n=this.toSeconds(e);return this.log("start",n),this._state.getValueAtTime(n)!=="started"&&(this._state.setStateAtTime("started",n),this._tickSource.start(n,t),n<this._lastUpdate&&this.emit("start",n,t)),this}stop(e){const t=this.toSeconds(e);return this.log("stop",t),this._state.cancel(t),this._state.setStateAtTime("stopped",t),this._tickSource.stop(t),t<this._lastUpdate&&this.emit("stop",t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._tickSource.pause(t),t<this._lastUpdate&&this.emit("pause",t)),this}get ticks(){return Math.ceil(this.getTicksAtTime(this.now()))}set ticks(e){this._tickSource.ticks=e}get seconds(){return this._tickSource.seconds}set seconds(e){this._tickSource.seconds=e}getSecondsAtTime(e){return this._tickSource.getSecondsAtTime(e)}setTicksAtTime(e,t){return this._tickSource.setTicksAtTime(e,t),this}getTimeOfTick(e,t=this.now()){return this._tickSource.getTimeOfTick(e,t)}getTicksAtTime(e){return this._tickSource.getTicksAtTime(e)}nextTickTime(e,t){const n=this.toSeconds(t),s=this.getTicksAtTime(n);return this._tickSource.getTimeOfTick(s+e,n)}_loop(){const e=this._lastUpdate,t=this.now();this._lastUpdate=t,this.log("loop",e,t),e!==t&&(this._state.forEachBetween(e,t,n=>{switch(n.state){case"started":const s=this._tickSource.getTicksAtTime(n.time);this.emit("start",n.time,s);break;case"stopped":n.time!==0&&this.emit("stop",n.time);break;case"paused":this.emit("pause",n.time);break}}),this._tickSource.forEachTickBetween(e,t,(n,s)=>{this.callback(n,s)}))}getStateAtTime(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)}dispose(){return super.dispose(),this.context.off("tick",this._boundLoop),this._tickSource.dispose(),this._state.dispose(),this}}cr.mixin(Ao);class Ls extends ke{constructor(){const e=Ne(Ls.getDefaults(),arguments,["volume"]);super(e),this.name="Volume",this.input=this.output=new It({context:this.context,gain:e.volume,units:"decibels"}),this.volume=this.output.gain,vt(this,"volume"),this._unmutedVolume=e.volume,this.mute=e.mute}static getDefaults(){return Object.assign(ke.getDefaults(),{mute:!1,volume:0})}get mute(){return this.volume.value===-1/0}set mute(e){!this.mute&&e?(this._unmutedVolume=this.volume.value,this.volume.value=-1/0):this.mute&&!e&&(this.volume.value=this._unmutedVolume)}dispose(){return super.dispose(),this.input.dispose(),this.volume.dispose(),this}}class $c extends ke{constructor(){const e=Ne($c.getDefaults(),arguments);super(e),this.name="Destination",this.input=new Ls({context:this.context}),this.output=new It({context:this.context}),this.volume=this.input.volume,Ia(this.input,this.output,this.context.rawContext.destination),this.mute=e.mute,this._internalChannels=[this.input,this.context.rawContext.destination,this.output]}static getDefaults(){return Object.assign(ke.getDefaults(),{mute:!1,volume:0})}get mute(){return this.input.mute}set mute(e){this.input.mute=e}chain(...e){return this.input.disconnect(),e.unshift(this.input),e.push(this.output),Ia(...e),this}get maxChannelCount(){return this.context.rawContext.destination.maxChannelCount}dispose(){return super.dispose(),this.volume.dispose(),this}}To(i=>{i.destination=new $c({context:i})});Eo(i=>{i.destination.dispose()});class xv extends ke{constructor(){super(...arguments),this.name="Listener",this.positionX=new ft({context:this.context,param:this.context.rawContext.listener.positionX}),this.positionY=new ft({context:this.context,param:this.context.rawContext.listener.positionY}),this.positionZ=new ft({context:this.context,param:this.context.rawContext.listener.positionZ}),this.forwardX=new ft({context:this.context,param:this.context.rawContext.listener.forwardX}),this.forwardY=new ft({context:this.context,param:this.context.rawContext.listener.forwardY}),this.forwardZ=new ft({context:this.context,param:this.context.rawContext.listener.forwardZ}),this.upX=new ft({context:this.context,param:this.context.rawContext.listener.upX}),this.upY=new ft({context:this.context,param:this.context.rawContext.listener.upY}),this.upZ=new ft({context:this.context,param:this.context.rawContext.listener.upZ})}static getDefaults(){return Object.assign(ke.getDefaults(),{positionX:0,positionY:0,positionZ:0,forwardX:0,forwardY:0,forwardZ:-1,upX:0,upY:1,upZ:0})}dispose(){return super.dispose(),this.positionX.dispose(),this.positionY.dispose(),this.positionZ.dispose(),this.forwardX.dispose(),this.forwardY.dispose(),this.forwardZ.dispose(),this.upX.dispose(),this.upY.dispose(),this.upZ.dispose(),this}}To(i=>{i.listener=new xv({context:i})});Eo(i=>{i.listener.dispose()});class Zc extends Qn{constructor(){super(),this.name="ToneAudioBuffers",this._buffers=new Map,this._loadingCount=0;const e=Ne(Zc.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");this.baseUrl=e.baseUrl,Object.keys(e.urls).forEach(t=>{this._loadingCount++;const n=e.urls[t];this.add(t,n,this._bufferLoaded.bind(this,e.onload),e.onerror)})}static getDefaults(){return{baseUrl:"",onerror:rt,onload:rt,urls:{}}}has(e){return this._buffers.has(e.toString())}get(e){return Fe(this.has(e),`ToneAudioBuffers has no buffer named: ${e}`),this._buffers.get(e.toString())}_bufferLoaded(e){this._loadingCount--,this._loadingCount===0&&e&&e()}get loaded(){return Array.from(this._buffers).every(([e,t])=>t.loaded)}add(e,t,n=rt,s=rt){return $n(t)?(this.baseUrl&&t.trim().substring(0,11).toLowerCase()==="data:audio/"&&(this.baseUrl=""),this._buffers.set(e.toString(),new lt(this.baseUrl+t,n,s))):this._buffers.set(e.toString(),new lt(t,n,s)),this}dispose(){return super.dispose(),this._buffers.forEach(e=>e.dispose()),this._buffers.clear(),this}}class cs extends Xs{constructor(){super(...arguments),this.name="Ticks",this.defaultUnits="i"}_now(){return this.context.transport.ticks}_beatsToUnits(e){return this._getPPQ()*e}_secondsToUnits(e){return Math.floor(e/(60/this._getBpm())*this._getPPQ())}_ticksToUnits(e){return e}toTicks(){return this.valueOf()}toSeconds(){return this.valueOf()/this._getPPQ()*(60/this._getBpm())}}class Sv extends qt{constructor(){super(...arguments),this.name="Draw",this.expiration=.25,this.anticipation=.008,this._events=new hn,this._boundDrawLoop=this._drawLoop.bind(this),this._animationFrame=-1}schedule(e,t){return this._events.add({callback:e,time:this.toSeconds(t)}),this._events.length===1&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop)),this}cancel(e){return this._events.cancel(this.toSeconds(e)),this}_drawLoop(){const e=this.context.currentTime;for(;this._events.length&&this._events.peek().time-this.anticipation<=e;){const t=this._events.shift();t&&e-t.time<=this.expiration&&t.callback()}this._events.length>0&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop))}dispose(){return super.dispose(),this._events.dispose(),cancelAnimationFrame(this._animationFrame),this}}To(i=>{i.draw=new Sv({context:i})});Eo(i=>{i.draw.dispose()});class yv extends Qn{constructor(){super(...arguments),this.name="IntervalTimeline",this._root=null,this._length=0}add(e){Fe(He(e.time),"Events must have a time property"),Fe(He(e.duration),"Events must have a duration parameter"),e.time=e.time.valueOf();let t=new Mv(e.time,e.time+e.duration,e);for(this._root===null?this._root=t:this._root.insert(t),this._length++;t!==null;)t.updateHeight(),t.updateMax(),this._rebalance(t),t=t.parent;return this}remove(e){if(this._root!==null){const t=[];this._root.search(e.time,t);for(const n of t)if(n.event===e){this._removeNode(n),this._length--;break}}return this}get length(){return this._length}cancel(e){return this.forEachFrom(e,t=>this.remove(t)),this}_setRoot(e){this._root=e,this._root!==null&&(this._root.parent=null)}_replaceNodeInParent(e,t){e.parent!==null?(e.isLeftChild()?e.parent.left=t:e.parent.right=t,this._rebalance(e.parent)):this._setRoot(t)}_removeNode(e){if(e.left===null&&e.right===null)this._replaceNodeInParent(e,null);else if(e.right===null)this._replaceNodeInParent(e,e.left);else if(e.left===null)this._replaceNodeInParent(e,e.right);else{const t=e.getBalance();let n,s=null;if(t>0)if(e.left.right===null)n=e.left,n.right=e.right,s=n;else{for(n=e.left.right;n.right!==null;)n=n.right;n.parent&&(n.parent.right=n.left,s=n.parent,n.left=e.left,n.right=e.right)}else if(e.right.left===null)n=e.right,n.left=e.left,s=n;else{for(n=e.right.left;n.left!==null;)n=n.left;n.parent&&(n.parent.left=n.right,s=n.parent,n.left=e.left,n.right=e.right)}e.parent!==null?e.isLeftChild()?e.parent.left=n:e.parent.right=n:this._setRoot(n),s&&this._rebalance(s)}e.dispose()}_rotateLeft(e){const t=e.parent,n=e.isLeftChild(),s=e.right;s&&(e.right=s.left,s.left=e),t!==null?n?t.left=s:t.right=s:this._setRoot(s)}_rotateRight(e){const t=e.parent,n=e.isLeftChild(),s=e.left;s&&(e.left=s.right,s.right=e),t!==null?n?t.left=s:t.right=s:this._setRoot(s)}_rebalance(e){const t=e.getBalance();t>1&&e.left?e.left.getBalance()<0?this._rotateLeft(e.left):this._rotateRight(e):t<-1&&e.right&&(e.right.getBalance()>0?this._rotateRight(e.right):this._rotateLeft(e))}get(e){if(this._root!==null){const t=[];if(this._root.search(e,t),t.length>0){let n=t[0];for(let s=1;s<t.length;s++)t[s].low>n.low&&(n=t[s]);return n.event}}return null}forEach(e){if(this._root!==null){const t=[];this._root.traverse(n=>t.push(n)),t.forEach(n=>{n.event&&e(n.event)})}return this}forEachAtTime(e,t){if(this._root!==null){const n=[];this._root.search(e,n),n.forEach(s=>{s.event&&t(s.event)})}return this}forEachFrom(e,t){if(this._root!==null){const n=[];this._root.searchAfter(e,n),n.forEach(s=>{s.event&&t(s.event)})}return this}dispose(){return super.dispose(),this._root!==null&&this._root.traverse(e=>e.dispose()),this._root=null,this}}class Mv{constructor(e,t,n){this._left=null,this._right=null,this.parent=null,this.height=0,this.event=n,this.low=e,this.high=t,this.max=this.high}insert(e){e.low<=this.low?this.left===null?this.left=e:this.left.insert(e):this.right===null?this.right=e:this.right.insert(e)}search(e,t){e>this.max||(this.left!==null&&this.left.search(e,t),this.low<=e&&this.high>e&&t.push(this),!(this.low>e)&&this.right!==null&&this.right.search(e,t))}searchAfter(e,t){this.low>=e&&(t.push(this),this.left!==null&&this.left.searchAfter(e,t)),this.right!==null&&this.right.searchAfter(e,t)}traverse(e){e(this),this.left!==null&&this.left.traverse(e),this.right!==null&&this.right.traverse(e)}updateHeight(){this.left!==null&&this.right!==null?this.height=Math.max(this.left.height,this.right.height)+1:this.right!==null?this.height=this.right.height+1:this.left!==null?this.height=this.left.height+1:this.height=0}updateMax(){this.max=this.high,this.left!==null&&(this.max=Math.max(this.max,this.left.max)),this.right!==null&&(this.max=Math.max(this.max,this.right.max))}getBalance(){let e=0;return this.left!==null&&this.right!==null?e=this.left.height-this.right.height:this.left!==null?e=this.left.height+1:this.right!==null&&(e=-(this.right.height+1)),e}isLeftChild(){return this.parent!==null&&this.parent.left===this}get left(){return this._left}set left(e){this._left=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}get right(){return this._right}set right(e){this._right=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}dispose(){this.parent=null,this._left=null,this._right=null,this.event=null}}class Tv extends Qn{constructor(e){super(),this.name="TimelineValue",this._timeline=new hn({memory:10}),this._initialValue=e}set(e,t){return this._timeline.add({value:e,time:t}),this}get(e){const t=this._timeline.get(e);return t?t.value:this._initialValue}}class xs extends ke{constructor(){super(Ne(xs.getDefaults(),arguments,["context"]))}connect(e,t=0,n=0){return qc(this,e,t,n),this}}class ur extends xs{constructor(){const e=Ne(ur.getDefaults(),arguments,["mapping","length"]);super(e),this.name="WaveShaper",this._shaper=this.context.createWaveShaper(),this.input=this._shaper,this.output=this._shaper,yn(e.mapping)||e.mapping instanceof Float32Array?this.curve=Float32Array.from(e.mapping):Yg(e.mapping)&&this.setMap(e.mapping,e.length)}static getDefaults(){return Object.assign(Pt.getDefaults(),{length:1024})}setMap(e,t=1024){const n=new Float32Array(t);for(let s=0,r=t;s<r;s++){const o=s/(r-1)*2-1;n[s]=e(o,s)}return this.curve=n,this}get curve(){return this._shaper.curve}set curve(e){this._shaper.curve=e}get oversample(){return this._shaper.oversample}set oversample(e){const t=["none","2x","4x"].some(n=>n.includes(e));Fe(t,"oversampling must be either 'none', '2x', or '4x'"),this._shaper.oversample=e}dispose(){return super.dispose(),this._shaper.disconnect(),this}}class Kc extends xs{constructor(){const e=Ne(Kc.getDefaults(),arguments,["value"]);super(e),this.name="Pow",this._exponentScaler=this.input=this.output=new ur({context:this.context,mapping:this._expFunc(e.value),length:8192}),this._exponent=e.value}static getDefaults(){return Object.assign(xs.getDefaults(),{value:1})}_expFunc(e){return t=>Math.pow(Math.abs(t),e)}get value(){return this._exponent}set value(e){this._exponent=e,this._exponentScaler.setMap(this._expFunc(this._exponent))}dispose(){return super.dispose(),this._exponentScaler.dispose(),this}}class fi{constructor(e,t){this.id=fi._eventId++,this._remainderTime=0;const n=Object.assign(fi.getDefaults(),t);this.transport=e,this.callback=n.callback,this._once=n.once,this.time=Math.floor(n.time),this._remainderTime=n.time-this.time}static getDefaults(){return{callback:rt,once:!1,time:0}}get floatTime(){return this.time+this._remainderTime}invoke(e){if(this.callback){const t=this.transport.bpm.getDurationOfTicks(1,e);this.callback(e+this._remainderTime*t),this._once&&this.transport.clear(this.id)}}dispose(){return this.callback=void 0,this}}fi._eventId=0;class Jc extends fi{constructor(e,t){super(e,t),this._currentId=-1,this._nextId=-1,this._nextTick=this.time,this._boundRestart=this._restart.bind(this);const n=Object.assign(Jc.getDefaults(),t);this.duration=n.duration,this._interval=n.interval,this._nextTick=n.time,this.transport.on("start",this._boundRestart),this.transport.on("loopStart",this._boundRestart),this.transport.on("ticks",this._boundRestart),this.context=this.transport.context,this._restart()}static getDefaults(){return Object.assign({},fi.getDefaults(),{duration:1/0,interval:1,once:!1})}invoke(e){this._createEvents(e),super.invoke(e)}_createEvent(){return uo(this._nextTick,this.floatTime+this.duration)?this.transport.scheduleOnce(this.invoke.bind(this),new cs(this.context,this._nextTick).toSeconds()):-1}_createEvents(e){uo(this._nextTick+this._interval,this.floatTime+this.duration)&&(this._nextTick+=this._interval,this._currentId=this._nextId,this._nextId=this.transport.scheduleOnce(this.invoke.bind(this),new cs(this.context,this._nextTick).toSeconds()))}_restart(e){this.transport.clear(this._currentId),this.transport.clear(this._nextId),this._nextTick=this.floatTime;const t=this.transport.getTicksAtTime(e);gs(t,this.time)&&(this._nextTick=this.floatTime+Math.ceil((t-this.floatTime)/this._interval)*this._interval),this._currentId=this._createEvent(),this._nextTick+=this._interval,this._nextId=this._createEvent()}dispose(){return super.dispose(),this.transport.clear(this._currentId),this.transport.clear(this._nextId),this.transport.off("start",this._boundRestart),this.transport.off("loopStart",this._boundRestart),this.transport.off("ticks",this._boundRestart),this}}class wo extends qt{constructor(){const e=Ne(wo.getDefaults(),arguments);super(e),this.name="Transport",this._loop=new Tv(!1),this._loopStart=0,this._loopEnd=0,this._scheduledEvents={},this._timeline=new hn,this._repeatedEvents=new yv,this._syncedSignals=[],this._swingAmount=0,this._ppq=e.ppq,this._clock=new Ao({callback:this._processTick.bind(this),context:this.context,frequency:0,units:"bpm"}),this._bindClockEvents(),this.bpm=this._clock.frequency,this._clock.frequency.multiplier=e.ppq,this.bpm.setValueAtTime(e.bpm,0),vt(this,"bpm"),this._timeSignature=e.timeSignature,this._swingTicks=e.ppq/2}static getDefaults(){return Object.assign(qt.getDefaults(),{bpm:120,loopEnd:"4m",loopStart:0,ppq:192,swing:0,swingSubdivision:"8n",timeSignature:4})}_processTick(e,t){if(this._loop.get(e)&&t>=this._loopEnd&&(this.emit("loopEnd",e),this._clock.setTicksAtTime(this._loopStart,e),t=this._loopStart,this.emit("loopStart",e,this._clock.getSecondsAtTime(e)),this.emit("loop",e)),this._swingAmount>0&&t%this._ppq!==0&&t%(this._swingTicks*2)!==0){const n=t%(this._swingTicks*2)/(this._swingTicks*2),s=Math.sin(n*Math.PI)*this._swingAmount;e+=new cs(this.context,this._swingTicks*2/3).toSeconds()*s}Wl(!0),this._timeline.forEachAtTime(t,n=>n.invoke(e)),Wl(!1)}schedule(e,t){const n=new fi(this,{callback:e,time:new Xs(this.context,t).toTicks()});return this._addEvent(n,this._timeline)}scheduleRepeat(e,t,n,s=1/0){const r=new Jc(this,{callback:e,duration:new xn(this.context,s).toTicks(),interval:new xn(this.context,t).toTicks(),time:new Xs(this.context,n).toTicks()});return this._addEvent(r,this._repeatedEvents)}scheduleOnce(e,t){const n=new fi(this,{callback:e,once:!0,time:new Xs(this.context,t).toTicks()});return this._addEvent(n,this._timeline)}clear(e){if(this._scheduledEvents.hasOwnProperty(e)){const t=this._scheduledEvents[e.toString()];t.timeline.remove(t.event),t.event.dispose(),delete this._scheduledEvents[e.toString()]}return this}_addEvent(e,t){return this._scheduledEvents[e.id.toString()]={event:e,timeline:t},t.add(e),e.id}cancel(e=0){const t=this.toTicks(e);return this._timeline.forEachFrom(t,n=>this.clear(n.id)),this._repeatedEvents.forEachFrom(t,n=>this.clear(n.id)),this}_bindClockEvents(){this._clock.on("start",(e,t)=>{t=new cs(this.context,t).toSeconds(),this.emit("start",e,t)}),this._clock.on("stop",e=>{this.emit("stop",e)}),this._clock.on("pause",e=>{this.emit("pause",e)})}get state(){return this._clock.getStateAtTime(this.now())}start(e,t){this.context.resume();let n;return He(t)&&(n=this.toTicks(t)),this._clock.start(e,n),this}stop(e){return this._clock.stop(e),this}pause(e){return this._clock.pause(e),this}toggle(e){return e=this.toSeconds(e),this._clock.getStateAtTime(e)!=="started"?this.start(e):this.stop(e),this}get timeSignature(){return this._timeSignature}set timeSignature(e){yn(e)&&(e=e[0]/e[1]*4),this._timeSignature=e}get loopStart(){return new xn(this.context,this._loopStart,"i").toSeconds()}set loopStart(e){this._loopStart=this.toTicks(e)}get loopEnd(){return new xn(this.context,this._loopEnd,"i").toSeconds()}set loopEnd(e){this._loopEnd=this.toTicks(e)}get loop(){return this._loop.get(this.now())}set loop(e){this._loop.set(e,this.now())}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get swing(){return this._swingAmount}set swing(e){this._swingAmount=e}get swingSubdivision(){return new cs(this.context,this._swingTicks).toNotation()}set swingSubdivision(e){this._swingTicks=this.toTicks(e)}get position(){const e=this.now(),t=this._clock.getTicksAtTime(e);return new cs(this.context,t).toBarsBeatsSixteenths()}set position(e){const t=this.toTicks(e);this.ticks=t}get seconds(){return this._clock.seconds}set seconds(e){const t=this.now(),n=this._clock.frequency.timeToTicks(e,t);this.ticks=n}get progress(){if(this.loop){const e=this.now();return(this._clock.getTicksAtTime(e)-this._loopStart)/(this._loopEnd-this._loopStart)}else return 0}get ticks(){return this._clock.ticks}set ticks(e){if(this._clock.ticks!==e){const t=this.now();if(this.state==="started"){const n=this._clock.getTicksAtTime(t),s=this._clock.frequency.getDurationOfTicks(Math.ceil(n)-n,t),r=t+s;this.emit("stop",r),this._clock.setTicksAtTime(e,r),this.emit("start",r,this._clock.getSecondsAtTime(r))}else this.emit("ticks",t),this._clock.setTicksAtTime(e,t)}}getTicksAtTime(e){return this._clock.getTicksAtTime(e)}getSecondsAtTime(e){return this._clock.getSecondsAtTime(e)}get PPQ(){return this._clock.frequency.multiplier}set PPQ(e){this._clock.frequency.multiplier=e}nextSubdivision(e){if(e=this.toTicks(e),this.state!=="started")return 0;{const t=this.now(),n=this.getTicksAtTime(t),s=e-n%e;return this._clock.nextTickTime(s,t)}}syncSignal(e,t){const n=this.now();let s=this.bpm,r=1/(60/s.getValueAtTime(n)/this.PPQ),o=[];if(e.units==="time"){const c=.015625/r,l=new It(c),u=new Kc(-1),h=new It(c);s.chain(l,u,h),s=h,r=1/r,o=[l,u,h]}t||(e.getValueAtTime(n)!==0?t=e.getValueAtTime(n)/r:t=0);const a=new It(t);return s.connect(a),a.connect(e._param),o.push(a),this._syncedSignals.push({initial:e.value,nodes:o,signal:e}),e.value=0,this}unsyncSignal(e){for(let t=this._syncedSignals.length-1;t>=0;t--){const n=this._syncedSignals[t];n.signal===e&&(n.nodes.forEach(s=>s.dispose()),n.signal.value=n.initial,this._syncedSignals.splice(t,1))}return this}dispose(){return super.dispose(),this._clock.dispose(),Xh(this,"bpm"),this._timeline.dispose(),this._repeatedEvents.dispose(),this}}cr.mixin(wo);To(i=>{i.transport=new wo({context:i})});Eo(i=>{i.transport.dispose()});let nn=class extends ke{constructor(e){super(e),this.input=void 0,this._state=new Hc("stopped"),this._synced=!1,this._scheduled=[],this._syncedStart=rt,this._syncedStop=rt,this._state.memory=100,this._state.increasing=!0,this._volume=this.output=new Ls({context:this.context,mute:e.mute,volume:e.volume}),this.volume=this._volume.volume,vt(this,"volume"),this.onstop=e.onstop}static getDefaults(){return Object.assign(ke.getDefaults(),{mute:!1,onstop:rt,volume:0})}get state(){return this._synced?this.context.transport.state==="started"?this._state.getValueAtTime(this.context.transport.seconds):"stopped":this._state.getValueAtTime(this.now())}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}_clampToCurrentTime(e){return this._synced?e:Math.max(e,this.context.currentTime)}start(e,t,n){let s=un(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(s=this._clampToCurrentTime(s),!this._synced&&this._state.getValueAtTime(s)==="started")Fe(gs(s,this._state.get(s).time),"Start time must be strictly greater than previous start time"),this._state.cancel(s),this._state.setStateAtTime("started",s),this.log("restart",s),this.restart(s,t,n);else if(this.log("start",s),this._state.setStateAtTime("started",s),this._synced){const r=this._state.get(s);r&&(r.offset=this.toSeconds(ds(t,0)),r.duration=n?this.toSeconds(n):void 0);const o=this.context.transport.schedule(a=>{this._start(a,t,n)},s);this._scheduled.push(o),this.context.transport.state==="started"&&this.context.transport.getSecondsAtTime(this.immediate())>s&&this._syncedStart(this.now(),this.context.transport.seconds)}else Vh(this.context),this._start(s,t,n);return this}stop(e){let t=un(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(t=this._clampToCurrentTime(t),this._state.getValueAtTime(t)==="started"||He(this._state.getNextState("started",t))){if(this.log("stop",t),!this._synced)this._stop(t);else{const n=this.context.transport.schedule(this._stop.bind(this),t);this._scheduled.push(n)}this._state.cancel(t),this._state.setStateAtTime("stopped",t)}return this}restart(e,t,n){return e=this.toSeconds(e),this._state.getValueAtTime(e)==="started"&&(this._state.cancel(e),this._restart(e,t,n)),this}sync(){return this._synced||(this._synced=!0,this._syncedStart=(e,t)=>{if(gs(t,0)){const n=this._state.get(t);if(n&&n.state==="started"&&n.time!==t){const s=t-this.toSeconds(n.time);let r;n.duration&&(r=this.toSeconds(n.duration)-s),this._start(e,this.toSeconds(n.offset)+s,r)}}},this._syncedStop=e=>{const t=this.context.transport.getSecondsAtTime(Math.max(e-this.sampleTime,0));this._state.getValueAtTime(t)==="started"&&this._stop(e)},this.context.transport.on("start",this._syncedStart),this.context.transport.on("loopStart",this._syncedStart),this.context.transport.on("stop",this._syncedStop),this.context.transport.on("pause",this._syncedStop),this.context.transport.on("loopEnd",this._syncedStop)),this}unsync(){return this._synced&&(this.context.transport.off("stop",this._syncedStop),this.context.transport.off("pause",this._syncedStop),this.context.transport.off("loopEnd",this._syncedStop),this.context.transport.off("start",this._syncedStart),this.context.transport.off("loopStart",this._syncedStart)),this._synced=!1,this._scheduled.forEach(e=>this.context.transport.clear(e)),this._scheduled=[],this._state.cancel(0),this._stop(0),this}dispose(){return super.dispose(),this.onstop=rt,this.unsync(),this._volume.dispose(),this._state.dispose(),this}};class Co extends vs{constructor(){const e=Ne(Co.getDefaults(),arguments,["url","onload"]);super(e),this.name="ToneBufferSource",this._source=this.context.createBufferSource(),this._internalChannels=[this._source],this._sourceStarted=!1,this._sourceStopped=!1,Ns(this._source,this._gainNode),this._source.onended=()=>this._stopSource(),this.playbackRate=new ft({context:this.context,param:this._source.playbackRate,units:"positive",value:e.playbackRate}),this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this._buffer=new lt(e.url,e.onload,e.onerror),this._internalChannels.push(this._source)}static getDefaults(){return Object.assign(vs.getDefaults(),{url:new lt,loop:!1,loopEnd:0,loopStart:0,onload:rt,onerror:rt,playbackRate:1})}get fadeIn(){return this._fadeIn}set fadeIn(e){this._fadeIn=e}get fadeOut(){return this._fadeOut}set fadeOut(e){this._fadeOut=e}get curve(){return this._curve}set curve(e){this._curve=e}start(e,t,n,s=1){Fe(this.buffer.loaded,"buffer is either not set or not loaded");const r=this.toSeconds(e);this._startGain(r,s),this.loop?t=ds(t,this.loopStart):t=ds(t,0);let o=Math.max(this.toSeconds(t),0);if(this.loop){const a=this.toSeconds(this.loopEnd)||this.buffer.duration,c=this.toSeconds(this.loopStart),l=a-c;Pa(o,a)&&(o=(o-c)%l+c),gn(o,this.buffer.duration)&&(o=0)}if(this._source.buffer=this.buffer.get(),this._source.loopEnd=this.toSeconds(this.loopEnd)||this.buffer.duration,uo(o,this.buffer.duration)&&(this._sourceStarted=!0,this._source.start(r,o)),He(n)){let a=this.toSeconds(n);a=Math.max(a,0),this.stop(r+a)}return this}_stopSource(e){!this._sourceStopped&&this._sourceStarted&&(this._sourceStopped=!0,this._source.stop(this.toSeconds(e)),this._onended())}get loopStart(){return this._source.loopStart}set loopStart(e){this._source.loopStart=this.toSeconds(e)}get loopEnd(){return this._source.loopEnd}set loopEnd(e){this._source.loopEnd=this.toSeconds(e)}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._source.loop}set loop(e){this._source.loop=e,this._sourceStarted&&this.cancelStop()}dispose(){return super.dispose(),this._source.onended=null,this._source.disconnect(),this._buffer.dispose(),this.playbackRate.dispose(),this}}function Gi(i,e){return Et(this,void 0,void 0,function*(){const t=e/i.context.sampleRate,n=new zc(1,t,i.context.sampleRate);return new i.constructor(Object.assign(i.get(),{frequency:2/t,detune:0,context:n})).toDestination().start(0),(yield n.render()).getChannelData(0)})}class Qc extends vs{constructor(){const e=Ne(Qc.getDefaults(),arguments,["frequency","type"]);super(e),this.name="ToneOscillatorNode",this._oscillator=this.context.createOscillator(),this._internalChannels=[this._oscillator],Ns(this._oscillator,this._gainNode),this.type=e.type,this.frequency=new ft({context:this.context,param:this._oscillator.frequency,units:"frequency",value:e.frequency}),this.detune=new ft({context:this.context,param:this._oscillator.detune,units:"cents",value:e.detune}),vt(this,["frequency","detune"])}static getDefaults(){return Object.assign(vs.getDefaults(),{detune:0,frequency:440,type:"sine"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._oscillator.start(t),this}_stopSource(e){this._oscillator.stop(e)}setPeriodicWave(e){return this._oscillator.setPeriodicWave(e),this}get type(){return this._oscillator.type}set type(e){this._oscillator.type=e}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._oscillator.disconnect(),this.frequency.dispose(),this.detune.dispose(),this}}class Tt extends nn{constructor(){const e=Ne(Tt.getDefaults(),arguments,["frequency","type"]);super(e),this.name="Oscillator",this._oscillator=null,this.frequency=new Pt({context:this.context,units:"frequency",value:e.frequency}),vt(this,"frequency"),this.detune=new Pt({context:this.context,units:"cents",value:e.detune}),vt(this,"detune"),this._partials=e.partials,this._partialCount=e.partialCount,this._type=e.type,e.partialCount&&e.type!=="custom"&&(this._type=this.baseType+e.partialCount.toString()),this.phase=e.phase}static getDefaults(){return Object.assign(nn.getDefaults(),{detune:0,frequency:440,partialCount:0,partials:[],phase:0,type:"sine"})}_start(e){const t=this.toSeconds(e),n=new Qc({context:this.context,onended:()=>this.onstop(this)});this._oscillator=n,this._wave?this._oscillator.setPeriodicWave(this._wave):this._oscillator.type=this._type,this._oscillator.connect(this.output),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.start(t)}_stop(e){const t=this.toSeconds(e);this._oscillator&&this._oscillator.stop(t)}_restart(e){const t=this.toSeconds(e);return this.log("restart",t),this._oscillator&&this._oscillator.cancelStop(),this._state.cancel(t),this}syncFrequency(){return this.context.transport.syncSignal(this.frequency),this}unsyncFrequency(){return this.context.transport.unsyncSignal(this.frequency),this}_getCachedPeriodicWave(){if(this._type==="custom")return Tt._periodicWaveCache.find(t=>t.phase===this._phase&&sv(t.partials,this._partials));{const e=Tt._periodicWaveCache.find(t=>t.type===this._type&&t.phase===this._phase);return this._partialCount=e?e.partialCount:this._partialCount,e}}get type(){return this._type}set type(e){this._type=e;const t=["sine","square","sawtooth","triangle"].indexOf(e)!==-1;if(this._phase===0&&t)this._wave=void 0,this._partialCount=0,this._oscillator!==null&&(this._oscillator.type=e);else{const n=this._getCachedPeriodicWave();if(He(n)){const{partials:s,wave:r}=n;this._wave=r,this._partials=s,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave)}else{const[s,r]=this._getRealImaginary(e,this._phase),o=this.context.createPeriodicWave(s,r);this._wave=o,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave),Tt._periodicWaveCache.push({imag:r,partialCount:this._partialCount,partials:this._partials,phase:this._phase,real:s,type:this._type,wave:this._wave}),Tt._periodicWaveCache.length>100&&Tt._periodicWaveCache.shift()}}}get baseType(){return this._type.replace(this.partialCount.toString(),"")}set baseType(e){this.partialCount&&this._type!=="custom"&&e!=="custom"?this.type=e+this.partialCount:this.type=e}get partialCount(){return this._partialCount}set partialCount(e){Zn(e,0);let t=this._type;const n=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);if(n&&(t=n[1]),this._type!=="custom")e===0?this.type=t:this.type=t+e.toString();else{const s=new Float32Array(e);this._partials.forEach((r,o)=>s[o]=r),this._partials=Array.from(s),this.type=this._type}}_getRealImaginary(e,t){let s=2048;const r=new Float32Array(s),o=new Float32Array(s);let a=1;if(e==="custom"){if(a=this._partials.length+1,this._partialCount=this._partials.length,s=a,this._partials.length===0)return[r,o]}else{const c=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(e);c?(a=parseInt(c[2],10)+1,this._partialCount=parseInt(c[2],10),e=c[1],a=Math.max(a,2),s=a):this._partialCount=0,this._partials=[]}for(let c=1;c<s;++c){const l=2/(c*Math.PI);let u;switch(e){case"sine":u=c<=a?1:0,this._partials[c-1]=u;break;case"square":u=c&1?2*l:0,this._partials[c-1]=u;break;case"sawtooth":u=l*(c&1?1:-1),this._partials[c-1]=u;break;case"triangle":c&1?u=2*(l*l)*(c-1>>1&1?-1:1):u=0,this._partials[c-1]=u;break;case"custom":u=this._partials[c-1];break;default:throw new TypeError("Oscillator: invalid type: "+e)}u!==0?(r[c]=-u*Math.sin(t*c),o[c]=u*Math.cos(t*c)):(r[c]=0,o[c]=0)}return[r,o]}_inverseFFT(e,t,n){let s=0;const r=e.length;for(let o=0;o<r;o++)s+=e[o]*Math.cos(o*n)+t[o]*Math.sin(o*n);return s}getInitialValue(){const[e,t]=this._getRealImaginary(this._type,0);let n=0;const s=Math.PI*2,r=32;for(let o=0;o<r;o++)n=Math.max(this._inverseFFT(e,t,o/r*s),n);return ov(-this._inverseFFT(e,t,this._phase)/n,-1,1)}get partials(){return this._partials.slice(0,this.partialCount)}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this.type="custom")}get phase(){return this._phase*(180/Math.PI)}set phase(e){this._phase=e*Math.PI/180,this.type=this._type}asArray(){return Et(this,arguments,void 0,function*(e=1024){return Gi(this,e)})}dispose(){return super.dispose(),this._oscillator!==null&&this._oscillator.dispose(),this._wave=void 0,this.frequency.dispose(),this.detune.dispose(),this}}Tt._periodicWaveCache=[];class Ev extends xs{constructor(){super(...arguments),this.name="AudioToGain",this._norm=new ur({context:this.context,mapping:e=>(e+1)/2}),this.input=this._norm,this.output=this._norm}dispose(){return super.dispose(),this._norm.dispose(),this}}class Ss extends Pt{constructor(){const e=Ne(Ss.getDefaults(),arguments,["value"]);super(e),this.name="Multiply",this.override=!1,this._mult=this.input=this.output=new It({context:this.context,minValue:e.minValue,maxValue:e.maxValue}),this.factor=this._param=this._mult.gain,this.factor.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(Pt.getDefaults(),{value:0})}dispose(){return super.dispose(),this._mult.dispose(),this}}class Ro extends nn{constructor(){const e=Ne(Ro.getDefaults(),arguments,["frequency","type","modulationType"]);super(e),this.name="AMOscillator",this._modulationScale=new Ev({context:this.context}),this._modulationNode=new It({context:this.context}),this._carrier=new Tt({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.frequency=this._carrier.frequency,this.detune=this._carrier.detune,this._modulator=new Tt({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new Ss({context:this.context,units:"positive",value:e.harmonicity}),this.frequency.chain(this.harmonicity,this._modulator.frequency),this._modulator.chain(this._modulationScale,this._modulationNode.gain),this._carrier.chain(this._modulationNode,this.output),vt(this,["frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(Tt.getDefaults(),{harmonicity:1,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){this._modulator.restart(e),this._carrier.restart(e)}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(){return Et(this,arguments,void 0,function*(e=1024){return Gi(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this._modulationScale.dispose(),this}}class Po extends nn{constructor(){const e=Ne(Po.getDefaults(),arguments,["frequency","type","modulationType"]);super(e),this.name="FMOscillator",this._modulationNode=new It({context:this.context,gain:0}),this._carrier=new Tt({context:this.context,detune:e.detune,frequency:0,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.detune=this._carrier.detune,this.frequency=new Pt({context:this.context,units:"frequency",value:e.frequency}),this._modulator=new Tt({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new Ss({context:this.context,units:"positive",value:e.harmonicity}),this.modulationIndex=new Ss({context:this.context,units:"positive",value:e.modulationIndex}),this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.frequency.chain(this.modulationIndex,this._modulationNode),this._modulator.connect(this._modulationNode.gain),this._modulationNode.connect(this._carrier.frequency),this._carrier.connect(this.output),this.detune.connect(this._modulator.detune),vt(this,["modulationIndex","frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(Tt.getDefaults(),{harmonicity:1,modulationIndex:2,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){return this._modulator.restart(e),this._carrier.restart(e),this}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(){return Et(this,arguments,void 0,function*(e=1024){return Gi(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this.modulationIndex.dispose(),this}}class hr extends nn{constructor(){const e=Ne(hr.getDefaults(),arguments,["frequency","width"]);super(e),this.name="PulseOscillator",this._widthGate=new It({context:this.context,gain:0}),this._thresh=new ur({context:this.context,mapping:t=>t<=0?-1:1}),this.width=new Pt({context:this.context,units:"audioRange",value:e.width}),this._triangle=new Tt({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:"triangle"}),this.frequency=this._triangle.frequency,this.detune=this._triangle.detune,this._triangle.chain(this._thresh,this.output),this.width.chain(this._widthGate,this._thresh),vt(this,["width","frequency","detune"])}static getDefaults(){return Object.assign(nn.getDefaults(),{detune:0,frequency:440,phase:0,type:"pulse",width:.2})}_start(e){e=this.toSeconds(e),this._triangle.start(e),this._widthGate.gain.setValueAtTime(1,e)}_stop(e){e=this.toSeconds(e),this._triangle.stop(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(0,e)}_restart(e){this._triangle.restart(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(1,e)}get phase(){return this._triangle.phase}set phase(e){this._triangle.phase=e}get type(){return"pulse"}get baseType(){return"pulse"}get partials(){return[]}get partialCount(){return 0}set carrierType(e){this._triangle.type=e}asArray(){return Et(this,arguments,void 0,function*(e=1024){return Gi(this,e)})}dispose(){return super.dispose(),this._triangle.dispose(),this.width.dispose(),this._widthGate.dispose(),this._thresh.dispose(),this}}class Do extends nn{constructor(){const e=Ne(Do.getDefaults(),arguments,["frequency","type","spread"]);super(e),this.name="FatOscillator",this._oscillators=[],this.frequency=new Pt({context:this.context,units:"frequency",value:e.frequency}),this.detune=new Pt({context:this.context,units:"cents",value:e.detune}),this._spread=e.spread,this._type=e.type,this._phase=e.phase,this._partials=e.partials,this._partialCount=e.partialCount,this.count=e.count,vt(this,["frequency","detune"])}static getDefaults(){return Object.assign(Tt.getDefaults(),{count:3,spread:20,type:"sawtooth"})}_start(e){e=this.toSeconds(e),this._forEach(t=>t.start(e))}_stop(e){e=this.toSeconds(e),this._forEach(t=>t.stop(e))}_restart(e){this._forEach(t=>t.restart(e))}_forEach(e){for(let t=0;t<this._oscillators.length;t++)e(this._oscillators[t],t)}get type(){return this._type}set type(e){this._type=e,this._forEach(t=>t.type=e)}get spread(){return this._spread}set spread(e){if(this._spread=e,this._oscillators.length>1){const t=-e/2,n=e/(this._oscillators.length-1);this._forEach((s,r)=>s.detune.value=t+n*r)}}get count(){return this._oscillators.length}set count(e){if(Zn(e,1),this._oscillators.length!==e){this._forEach(t=>t.dispose()),this._oscillators=[];for(let t=0;t<e;t++){const n=new Tt({context:this.context,volume:-6-e*1.1,type:this._type,phase:this._phase+t/e*360,partialCount:this._partialCount,onstop:t===0?()=>this.onstop(this):rt});this.type==="custom"&&(n.partials=this._partials),this.frequency.connect(n.frequency),this.detune.connect(n.detune),n.detune.overridden=!1,n.connect(this.output),this._oscillators[t]=n}this.spread=this._spread,this.state==="started"&&this._forEach(t=>t.start())}}get phase(){return this._phase}set phase(e){this._phase=e,this._forEach((t,n)=>t.phase=this._phase+n/this.count*360)}get baseType(){return this._oscillators[0].baseType}set baseType(e){this._forEach(t=>t.baseType=e),this._type=this._oscillators[0].type}get partials(){return this._oscillators[0].partials}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this._type="custom",this._forEach(t=>t.partials=e))}get partialCount(){return this._oscillators[0].partialCount}set partialCount(e){this._partialCount=e,this._forEach(t=>t.partialCount=e),this._type=this._oscillators[0].type}asArray(){return Et(this,arguments,void 0,function*(e=1024){return Gi(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this._forEach(e=>e.dispose()),this}}class Io extends nn{constructor(){const e=Ne(Io.getDefaults(),arguments,["frequency","modulationFrequency"]);super(e),this.name="PWMOscillator",this.sourceType="pwm",this._scale=new Ss({context:this.context,value:2}),this._pulse=new hr({context:this.context,frequency:e.modulationFrequency}),this._pulse.carrierType="sine",this.modulationFrequency=this._pulse.frequency,this._modulator=new Tt({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase}),this.frequency=this._modulator.frequency,this.detune=this._modulator.detune,this._modulator.chain(this._scale,this._pulse.width),this._pulse.connect(this.output),vt(this,["modulationFrequency","frequency","detune"])}static getDefaults(){return Object.assign(nn.getDefaults(),{detune:0,frequency:440,modulationFrequency:.4,phase:0,type:"pwm"})}_start(e){e=this.toSeconds(e),this._modulator.start(e),this._pulse.start(e)}_stop(e){e=this.toSeconds(e),this._modulator.stop(e),this._pulse.stop(e)}_restart(e){this._modulator.restart(e),this._pulse.restart(e)}get type(){return"pwm"}get baseType(){return"pwm"}get partials(){return[]}get partialCount(){return 0}get phase(){return this._modulator.phase}set phase(e){this._modulator.phase=e}asArray(){return Et(this,arguments,void 0,function*(e=1024){return Gi(this,e)})}dispose(){return super.dispose(),this._pulse.dispose(),this._scale.dispose(),this._modulator.dispose(),this}}const Xl={am:Ro,fat:Do,fm:Po,oscillator:Tt,pulse:hr,pwm:Io};class ho extends nn{constructor(){const e=Ne(ho.getDefaults(),arguments,["frequency","type"]);super(e),this.name="OmniOscillator",this.frequency=new Pt({context:this.context,units:"frequency",value:e.frequency}),this.detune=new Pt({context:this.context,units:"cents",value:e.detune}),vt(this,["frequency","detune"]),this.set(e)}static getDefaults(){return Object.assign(Tt.getDefaults(),Po.getDefaults(),Ro.getDefaults(),Do.getDefaults(),hr.getDefaults(),Io.getDefaults())}_start(e){this._oscillator.start(e)}_stop(e){this._oscillator.stop(e)}_restart(e){return this._oscillator.restart(e),this}get type(){let e="";return["am","fm","fat"].some(t=>this._sourceType===t)&&(e=this._sourceType),e+this._oscillator.type}set type(e){e.substr(0,2)==="fm"?(this._createNewOscillator("fm"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,2)==="am"?(this._createNewOscillator("am"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,3)==="fat"?(this._createNewOscillator("fat"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(3)):e==="pwm"?(this._createNewOscillator("pwm"),this._oscillator=this._oscillator):e==="pulse"?this._createNewOscillator("pulse"):(this._createNewOscillator("oscillator"),this._oscillator=this._oscillator,this._oscillator.type=e)}get partials(){return this._oscillator.partials}set partials(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partials=e)}get partialCount(){return this._oscillator.partialCount}set partialCount(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partialCount=e)}set(e){return Reflect.has(e,"type")&&e.type&&(this.type=e.type),super.set(e),this}_createNewOscillator(e){if(e!==this._sourceType){this._sourceType=e;const t=Xl[e],n=this.now();if(this._oscillator){const s=this._oscillator;s.stop(n),this.context.setTimeout(()=>s.dispose(),this.blockTime)}this._oscillator=new t({context:this.context}),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.connect(this.output),this._oscillator.onstop=()=>this.onstop(this),this.state==="started"&&this._oscillator.start(n)}}get phase(){return this._oscillator.phase}set phase(e){this._oscillator.phase=e}get sourceType(){return this._sourceType}set sourceType(e){let t="sine";this._oscillator.type!=="pwm"&&this._oscillator.type!=="pulse"&&(t=this._oscillator.type),e==="fm"?this.type="fm"+t:e==="am"?this.type="am"+t:e==="fat"?this.type="fat"+t:e==="oscillator"?this.type=t:e==="pulse"?this.type="pulse":e==="pwm"&&(this.type="pwm")}_getOscType(e,t){return e instanceof Xl[t]}get baseType(){return this._oscillator.baseType}set baseType(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&e!=="pulse"&&e!=="pwm"&&(this._oscillator.baseType=e)}get width(){if(this._getOscType(this._oscillator,"pulse"))return this._oscillator.width}get count(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.count}set count(e){this._getOscType(this._oscillator,"fat")&&Ui(e)&&(this._oscillator.count=e)}get spread(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.spread}set spread(e){this._getOscType(this._oscillator,"fat")&&Ui(e)&&(this._oscillator.spread=e)}get modulationType(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.modulationType}set modulationType(e){(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))&&$n(e)&&(this._oscillator.modulationType=e)}get modulationIndex(){if(this._getOscType(this._oscillator,"fm"))return this._oscillator.modulationIndex}get harmonicity(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.harmonicity}get modulationFrequency(){if(this._getOscType(this._oscillator,"pwm"))return this._oscillator.modulationFrequency}asArray(){return Et(this,arguments,void 0,function*(e=1024){return Gi(this,e)})}dispose(){return super.dispose(),this.detune.dispose(),this.frequency.dispose(),this._oscillator.dispose(),this}}function Zh(i,e=1/0){const t=new WeakMap;return function(n,s){Reflect.defineProperty(n,s,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){Zn(r,i,e),t.set(this,r)}})}}function ei(i,e=1/0){const t=new WeakMap;return function(n,s){Reflect.defineProperty(n,s,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){Zn(this.toSeconds(r),i,e),t.set(this,r)}})}}class No extends nn{constructor(){const e=Ne(No.getDefaults(),arguments,["url","onload"]);super(e),this.name="Player",this._activeSources=new Set,this._buffer=new lt({onload:this._onload.bind(this,e.onload),onerror:e.onerror,reverse:e.reverse,url:e.url}),this.autostart=e.autostart,this._loop=e.loop,this._loopStart=e.loopStart,this._loopEnd=e.loopEnd,this._playbackRate=e.playbackRate,this.fadeIn=e.fadeIn,this.fadeOut=e.fadeOut}static getDefaults(){return Object.assign(nn.getDefaults(),{autostart:!1,fadeIn:0,fadeOut:0,loop:!1,loopEnd:0,loopStart:0,onload:rt,onerror:rt,playbackRate:1,reverse:!1})}load(e){return Et(this,void 0,void 0,function*(){return yield this._buffer.load(e),this._onload(),this})}_onload(e=rt){e(),this.autostart&&this.start()}_onSourceEnd(e){this.onstop(this),this._activeSources.delete(e),this._activeSources.size===0&&!this._synced&&this._state.getValueAtTime(this.now())==="started"&&(this._state.cancel(this.now()),this._state.setStateAtTime("stopped",this.now()))}start(e,t,n){return super.start(e,t,n),this}_start(e,t,n){this._loop?t=ds(t,this._loopStart):t=ds(t,0);const s=this.toSeconds(t),r=n;n=ds(n,Math.max(this._buffer.duration-s,0));let o=this.toSeconds(n);o=o/this._playbackRate,e=this.toSeconds(e);const a=new Co({url:this._buffer,context:this.context,fadeIn:this.fadeIn,fadeOut:this.fadeOut,loop:this._loop,loopEnd:this._loopEnd,loopStart:this._loopStart,onended:this._onSourceEnd.bind(this),playbackRate:this._playbackRate}).connect(this.output);!this._loop&&!this._synced&&(this._state.cancel(e+o),this._state.setStateAtTime("stopped",e+o,{implicitEnd:!0})),this._activeSources.add(a),this._loop&&un(r)?a.start(e,s):a.start(e,s,o-this.toSeconds(this.fadeOut))}_stop(e){const t=this.toSeconds(e);this._activeSources.forEach(n=>n.stop(t))}restart(e,t,n){return super.restart(e,t,n),this}_restart(e,t,n){var s;(s=[...this._activeSources].pop())===null||s===void 0||s.stop(e),this._start(e,t,n)}seek(e,t){const n=this.toSeconds(t);if(this._state.getValueAtTime(n)==="started"){const s=this.toSeconds(e);this._stop(n),this._start(n,s)}return this}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get loopStart(){return this._loopStart}set loopStart(e){this._loopStart=e,this.buffer.loaded&&Zn(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopStart=e})}get loopEnd(){return this._loopEnd}set loopEnd(e){this._loopEnd=e,this.buffer.loaded&&Zn(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopEnd=e})}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._loop}set loop(e){if(this._loop!==e&&(this._loop=e,this._activeSources.forEach(t=>{t.loop=e}),e)){const t=this._state.getNextState("stopped",this.now());t&&this._state.cancel(t.time)}}get playbackRate(){return this._playbackRate}set playbackRate(e){this._playbackRate=e;const t=this.now(),n=this._state.getNextState("stopped",t);n&&n.implicitEnd&&(this._state.cancel(n.time),this._activeSources.forEach(s=>s.cancelStop())),this._activeSources.forEach(s=>{s.playbackRate.setValueAtTime(e,t)})}get reverse(){return this._buffer.reverse}set reverse(e){this._buffer.reverse=e}get loaded(){return this._buffer.loaded}dispose(){return super.dispose(),this._activeSources.forEach(e=>e.dispose()),this._activeSources.clear(),this._buffer.dispose(),this}}An([ei(0)],No.prototype,"fadeIn",void 0);An([ei(0)],No.prototype,"fadeOut",void 0);class vi extends ke{constructor(){const e=Ne(vi.getDefaults(),arguments,["attack","decay","sustain","release"]);super(e),this.name="Envelope",this._sig=new Pt({context:this.context,value:0}),this.output=this._sig,this.input=void 0,this.attack=e.attack,this.decay=e.decay,this.sustain=e.sustain,this.release=e.release,this.attackCurve=e.attackCurve,this.releaseCurve=e.releaseCurve,this.decayCurve=e.decayCurve}static getDefaults(){return Object.assign(ke.getDefaults(),{attack:.01,attackCurve:"linear",decay:.1,decayCurve:"exponential",release:1,releaseCurve:"exponential",sustain:.5})}get value(){return this.getValueAtTime(this.now())}_getCurve(e,t){if($n(e))return e;{let n;for(n in Mr)if(Mr[n][t]===e)return n;return e}}_setCurve(e,t,n){if($n(n)&&Reflect.has(Mr,n)){const s=Mr[n];Ni(s)?e!=="_decayCurve"&&(this[e]=s[t]):this[e]=s}else if(yn(n)&&e!=="_decayCurve")this[e]=n;else throw new Error("Envelope: invalid curve: "+n)}get attackCurve(){return this._getCurve(this._attackCurve,"In")}set attackCurve(e){this._setCurve("_attackCurve","In",e)}get releaseCurve(){return this._getCurve(this._releaseCurve,"Out")}set releaseCurve(e){this._setCurve("_releaseCurve","Out",e)}get decayCurve(){return this._getCurve(this._decayCurve,"Out")}set decayCurve(e){this._setCurve("_decayCurve","Out",e)}triggerAttack(e,t=1){this.log("triggerAttack",e,t),e=this.toSeconds(e);let s=this.toSeconds(this.attack);const r=this.toSeconds(this.decay),o=this.getValueAtTime(e);if(o>0){const a=1/s;s=(1-o)/a}if(s<this.sampleTime)this._sig.cancelScheduledValues(e),this._sig.setValueAtTime(t,e);else if(this._attackCurve==="linear")this._sig.linearRampTo(t,s,e);else if(this._attackCurve==="exponential")this._sig.targetRampTo(t,s,e);else{this._sig.cancelAndHoldAtTime(e);let a=this._attackCurve;for(let c=1;c<a.length;c++)if(a[c-1]<=o&&o<=a[c]){a=this._attackCurve.slice(c),a[0]=o;break}this._sig.setValueCurveAtTime(a,e,s,t)}if(r&&this.sustain<1){const a=t*this.sustain,c=e+s;this.log("decay",c),this._decayCurve==="linear"?this._sig.linearRampToValueAtTime(a,r+c):this._sig.exponentialApproachValueAtTime(a,c,r)}return this}triggerRelease(e){this.log("triggerRelease",e),e=this.toSeconds(e);const t=this.getValueAtTime(e);if(t>0){const n=this.toSeconds(this.release);n<this.sampleTime?this._sig.setValueAtTime(0,e):this._releaseCurve==="linear"?this._sig.linearRampTo(0,n,e):this._releaseCurve==="exponential"?this._sig.targetRampTo(0,n,e):(Fe(yn(this._releaseCurve),"releaseCurve must be either 'linear', 'exponential' or an array"),this._sig.cancelAndHoldAtTime(e),this._sig.setValueCurveAtTime(this._releaseCurve,e,n,t))}return this}getValueAtTime(e){return this._sig.getValueAtTime(e)}triggerAttackRelease(e,t,n=1){return t=this.toSeconds(t),this.triggerAttack(t,n),this.triggerRelease(t+this.toSeconds(e)),this}cancel(e){return this._sig.cancelScheduledValues(this.toSeconds(e)),this}connect(e,t=0,n=0){return qc(this,e,t,n),this}asArray(){return Et(this,arguments,void 0,function*(e=1024){const t=e/this.context.sampleRate,n=new zc(1,t,this.context.sampleRate),s=this.toSeconds(this.attack)+this.toSeconds(this.decay),r=s+this.toSeconds(this.release),o=r*.1,a=r+o,c=new this.constructor(Object.assign(this.get(),{attack:t*this.toSeconds(this.attack)/a,decay:t*this.toSeconds(this.decay)/a,release:t*this.toSeconds(this.release)/a,context:n}));return c._sig.toDestination(),c.triggerAttackRelease(t*(s+o)/a,0),(yield n.render()).getChannelData(0)})}dispose(){return super.dispose(),this._sig.dispose(),this}}An([ei(0)],vi.prototype,"attack",void 0);An([ei(0)],vi.prototype,"decay",void 0);An([Zh(0,1)],vi.prototype,"sustain",void 0);An([ei(0)],vi.prototype,"release",void 0);const Mr=(()=>{let e,t;const n=[];for(e=0;e<128;e++)n[e]=Math.sin(e/127*(Math.PI/2));const s=[],r=6.4;for(e=0;e<127;e++){t=e/127;const d=Math.sin(t*(Math.PI*2)*r-Math.PI/2)+1;s[e]=d/10+t*.83}s[127]=1;const o=[],a=5;for(e=0;e<128;e++)o[e]=Math.ceil(e/127*a)/a;const c=[];for(e=0;e<128;e++)t=e/127,c[e]=.5*(1-Math.cos(Math.PI*t));const l=[];for(e=0;e<128;e++){t=e/127;const d=Math.pow(t,3)*4+.2,p=Math.cos(d*Math.PI*2*t);l[e]=Math.abs(p*(1-t))}function u(d){const p=new Array(d.length);for(let _=0;_<d.length;_++)p[_]=1-d[_];return p}function h(d){return d.slice(0).reverse()}return{bounce:{In:u(l),Out:l},cosine:{In:n,Out:h(n)},exponential:"exponential",linear:"linear",ripple:{In:s,Out:u(s)},sine:{In:c,Out:u(c)},step:{In:o,Out:u(o)}}})();class ys extends ke{constructor(){const e=Ne(ys.getDefaults(),arguments);super(e),this._scheduledEvents=[],this._synced=!1,this._original_triggerAttack=this.triggerAttack,this._original_triggerRelease=this.triggerRelease,this._syncedRelease=t=>this._original_triggerRelease(t),this._volume=this.output=new Ls({context:this.context,volume:e.volume}),this.volume=this._volume.volume,vt(this,"volume")}static getDefaults(){return Object.assign(ke.getDefaults(),{volume:0})}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",0),this.context.transport.on("stop",this._syncedRelease),this.context.transport.on("pause",this._syncedRelease),this.context.transport.on("loopEnd",this._syncedRelease)),this}_syncState(){let e=!1;return this._synced||(this._synced=!0,e=!0),e}_syncMethod(e,t){const n=this["_original_"+e]=this[e];this[e]=(...s)=>{const r=s[t],o=this.context.transport.schedule(a=>{s[t]=a,n.apply(this,s)},r);this._scheduledEvents.push(o)}}unsync(){return this._scheduledEvents.forEach(e=>this.context.transport.clear(e)),this._scheduledEvents=[],this._synced&&(this._synced=!1,this.triggerAttack=this._original_triggerAttack,this.triggerRelease=this._original_triggerRelease,this.context.transport.off("stop",this._syncedRelease),this.context.transport.off("pause",this._syncedRelease),this.context.transport.off("loopEnd",this._syncedRelease)),this}triggerAttackRelease(e,t,n,s){const r=this.toSeconds(n),o=this.toSeconds(t);return this.triggerAttack(e,r,s),this.triggerRelease(r+o),this}dispose(){return super.dispose(),this._volume.dispose(),this.unsync(),this._scheduledEvents=[],this}}class Ms extends ys{constructor(){const e=Ne(Ms.getDefaults(),arguments);super(e),this.portamento=e.portamento,this.onsilence=e.onsilence}static getDefaults(){return Object.assign(ys.getDefaults(),{detune:0,onsilence:rt,portamento:0})}triggerAttack(e,t,n=1){this.log("triggerAttack",e,t,n);const s=this.toSeconds(t);return this._triggerEnvelopeAttack(s,n),this.setNote(e,s),this}triggerRelease(e){this.log("triggerRelease",e);const t=this.toSeconds(e);return this._triggerEnvelopeRelease(t),this}setNote(e,t){const n=this.toSeconds(t),s=e instanceof ln?e.toFrequency():e;if(this.portamento>0&&this.getLevelAtTime(n)>.05){const r=this.toSeconds(this.portamento);this.frequency.exponentialRampTo(s,r,n)}else this.frequency.setValueAtTime(s,n);return this}}An([ei(0)],Ms.prototype,"portamento",void 0);class el extends vi{constructor(){super(Ne(el.getDefaults(),arguments,["attack","decay","sustain","release"])),this.name="AmplitudeEnvelope",this._gainNode=new It({context:this.context,gain:0}),this.output=this._gainNode,this.input=this._gainNode,this._sig.connect(this._gainNode.gain),this.output=this._gainNode,this.input=this._gainNode}dispose(){return super.dispose(),this._gainNode.dispose(),this}}class fo extends Ms{constructor(){const e=Ne(fo.getDefaults(),arguments);super(e),this.name="Synth",this.oscillator=new ho(Object.assign({context:this.context,detune:e.detune,onstop:()=>this.onsilence(this)},e.oscillator)),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.envelope=new el(Object.assign({context:this.context},e.envelope)),this.oscillator.chain(this.envelope,this.output),vt(this,["oscillator","frequency","detune","envelope"])}static getDefaults(){return Object.assign(Ms.getDefaults(),{envelope:Object.assign(ql(vi.getDefaults(),Object.keys(ke.getDefaults())),{attack:.005,decay:.1,release:1,sustain:.3}),oscillator:Object.assign(ql(ho.getDefaults(),[...Object.keys(nn.getDefaults()),"frequency","detune"]),{type:"triangle"})})}_triggerEnvelopeAttack(e,t){if(this.envelope.triggerAttack(e,t),this.oscillator.start(e),this.envelope.sustain===0){const n=this.toSeconds(this.envelope.attack),s=this.toSeconds(this.envelope.decay);this.oscillator.stop(e+n+s)}}_triggerEnvelopeRelease(e){this.envelope.triggerRelease(e),this.oscillator.stop(e+this.toSeconds(this.envelope.release))}getLevelAtTime(e){return e=this.toSeconds(e),this.envelope.getValueAtTime(e)}dispose(){return super.dispose(),this.oscillator.dispose(),this.envelope.dispose(),this}}class Lo extends fo{constructor(){const e=Ne(Lo.getDefaults(),arguments);super(e),this.name="MembraneSynth",this.portamento=0,this.pitchDecay=e.pitchDecay,this.octaves=e.octaves,vt(this,["oscillator","envelope"])}static getDefaults(){return hs(Ms.getDefaults(),fo.getDefaults(),{envelope:{attack:.001,attackCurve:"exponential",decay:.4,release:1.4,sustain:.01},octaves:10,oscillator:{type:"sine"},pitchDecay:.05})}setNote(e,t){const n=this.toSeconds(t),s=this.toFrequency(e instanceof ln?e.toFrequency():e),r=s*this.octaves;return this.oscillator.frequency.setValueAtTime(r,n),this.oscillator.frequency.exponentialRampToValueAtTime(s,n+this.toSeconds(this.pitchDecay)),this}dispose(){return super.dispose(),this}}An([Zh(0)],Lo.prototype,"octaves",void 0);An([ei(0)],Lo.prototype,"pitchDecay",void 0);const tl=new Set;function nl(i){tl.add(i)}function Kh(i,e){const t=`registerProcessor("${i}", ${e})`;tl.add(t)}function yE(){return Array.from(tl).join(`
`)}const bv=`
	/**
	 * The base AudioWorkletProcessor for use in Tone.js. Works with the {@link ToneAudioWorklet}. 
	 */
	class ToneAudioWorkletProcessor extends AudioWorkletProcessor {

		constructor(options) {
			
			super(options);
			/**
			 * If the processor was disposed or not. Keep alive until it's disposed.
			 */
			this.disposed = false;
		   	/** 
			 * The number of samples in the processing block
			 */
			this.blockSize = 128;
			/**
			 * the sample rate
			 */
			this.sampleRate = sampleRate;

			this.port.onmessage = (event) => {
				// when it receives a dispose 
				if (event.data === "dispose") {
					this.disposed = true;
				}
			};
		}
	}
`;nl(bv);const Av=`
	/**
	 * Abstract class for a single input/output processor. 
	 * has a 'generate' function which processes one sample at a time
	 */
	class SingleIOProcessor extends ToneAudioWorkletProcessor {

		constructor(options) {
			super(Object.assign(options, {
				numberOfInputs: 1,
				numberOfOutputs: 1
			}));
			/**
			 * Holds the name of the parameter and a single value of that
			 * parameter at the current sample
			 * @type { [name: string]: number }
			 */
			this.params = {}
		}

		/**
		 * Generate an output sample from the input sample and parameters
		 * @abstract
		 * @param input number
		 * @param channel number
		 * @param parameters { [name: string]: number }
		 * @returns number
		 */
		generate(){}

		/**
		 * Update the private params object with the 
		 * values of the parameters at the given index
		 * @param parameters { [name: string]: Float32Array },
		 * @param index number
		 */
		updateParams(parameters, index) {
			for (const paramName in parameters) {
				const param = parameters[paramName];
				if (param.length > 1) {
					this.params[paramName] = parameters[paramName][index];
				} else {
					this.params[paramName] = parameters[paramName][0];
				}
			}
		}

		/**
		 * Process a single frame of the audio
		 * @param inputs Float32Array[][]
		 * @param outputs Float32Array[][]
		 */
		process(inputs, outputs, parameters) {
			const input = inputs[0];
			const output = outputs[0];
			// get the parameter values
			const channelCount = Math.max(input && input.length || 0, output.length);
			for (let sample = 0; sample < this.blockSize; sample++) {
				this.updateParams(parameters, sample);
				for (let channel = 0; channel < channelCount; channel++) {
					const inputSample = input && input.length ? input[channel][sample] : 0;
					output[channel][sample] = this.generate(inputSample, channel, this.params);
				}
			}
			return !this.disposed;
		}
	};
`;nl(Av);const wv=`
	/**
	 * A multichannel buffer for use within an AudioWorkletProcessor as a delay line
	 */
	class DelayLine {
		
		constructor(size, channels) {
			this.buffer = [];
			this.writeHead = []
			this.size = size;

			// create the empty channels
			for (let i = 0; i < channels; i++) {
				this.buffer[i] = new Float32Array(this.size);
				this.writeHead[i] = 0;
			}
		}

		/**
		 * Push a value onto the end
		 * @param channel number
		 * @param value number
		 */
		push(channel, value) {
			this.writeHead[channel] += 1;
			if (this.writeHead[channel] > this.size) {
				this.writeHead[channel] = 0;
			}
			this.buffer[channel][this.writeHead[channel]] = value;
		}

		/**
		 * Get the recorded value of the channel given the delay
		 * @param channel number
		 * @param delay number delay samples
		 */
		get(channel, delay) {
			let readHead = this.writeHead[channel] - Math.floor(delay);
			if (readHead < 0) {
				readHead += this.size;
			}
			return this.buffer[channel][readHead];
		}
	}
`;nl(wv);const Cv="feedback-comb-filter",Rv=`
	class FeedbackCombFilterWorklet extends SingleIOProcessor {

		constructor(options) {
			super(options);
			this.delayLine = new DelayLine(this.sampleRate, options.channelCount || 2);
		}

		static get parameterDescriptors() {
			return [{
				name: "delayTime",
				defaultValue: 0.1,
				minValue: 0,
				maxValue: 1,
				automationRate: "k-rate"
			}, {
				name: "feedback",
				defaultValue: 0.5,
				minValue: 0,
				maxValue: 0.9999,
				automationRate: "k-rate"
			}];
		}

		generate(input, channel, parameters) {
			const delayedSample = this.delayLine.get(channel, parameters.delayTime * this.sampleRate);
			this.delayLine.push(channel, input + delayedSample * parameters.feedback);
			return delayedSample;
		}
	}
`;Kh(Cv,Rv);class Oo extends ys{constructor(){const e=Ne(Oo.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");super(e),this.name="Sampler",this._activeSources=new Map;const t={};Object.keys(e.urls).forEach(n=>{const s=parseInt(n,10);if(Fe(yr(n)||Ui(s)&&isFinite(s),`url key is neither a note or midi pitch: ${n}`),yr(n)){const r=new ln(this.context,n).toMidi();t[r]=e.urls[n]}else Ui(s)&&isFinite(s)&&(t[s]=e.urls[s])}),this._buffers=new Zc({urls:t,onload:e.onload,baseUrl:e.baseUrl,onerror:e.onerror}),this.attack=e.attack,this.release=e.release,this.curve=e.curve,this._buffers.loaded&&Promise.resolve().then(e.onload)}static getDefaults(){return Object.assign(ys.getDefaults(),{attack:0,baseUrl:"",curve:"exponential",onload:rt,onerror:rt,release:.1,urls:{}})}_findClosest(e){let n=0;for(;n<96;){if(this._buffers.has(e+n))return-n;if(this._buffers.has(e-n))return n;n++}throw new Error(`No available buffers for note: ${e}`)}triggerAttack(e,t,n=1){return this.log("triggerAttack",e,t,n),Array.isArray(e)||(e=[e]),e.forEach(s=>{const r=$h(new ln(this.context,s).toFrequency()),o=Math.round(r),a=r-o,c=this._findClosest(o),l=o-c,u=this._buffers.get(l),h=jh(c+a),d=new Co({url:u,context:this.context,curve:this.curve,fadeIn:this.attack,fadeOut:this.release,playbackRate:h}).connect(this.output);d.start(t,0,u.duration/h,n),yn(this._activeSources.get(o))||this._activeSources.set(o,[]),this._activeSources.get(o).push(d),d.onended=()=>{if(this._activeSources&&this._activeSources.has(o)){const p=this._activeSources.get(o),_=p.indexOf(d);_!==-1&&p.splice(_,1)}}}),this}triggerRelease(e,t){return this.log("triggerRelease",e,t),Array.isArray(e)||(e=[e]),e.forEach(n=>{const s=new ln(this.context,n).toMidi();if(this._activeSources.has(s)&&this._activeSources.get(s).length){const r=this._activeSources.get(s);t=this.toSeconds(t),r.forEach(o=>{o.stop(t)}),this._activeSources.set(s,[])}}),this}releaseAll(e){const t=this.toSeconds(e);return this._activeSources.forEach(n=>{for(;n.length;)n.shift().stop(t)}),this}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1)),this}triggerAttackRelease(e,t,n,s=1){const r=this.toSeconds(n);return this.triggerAttack(e,r,s),yn(t)?(Fe(yn(e),"notes must be an array when duration is array"),e.forEach((o,a)=>{const c=t[Math.min(a,t.length-1)];this.triggerRelease(o,r+this.toSeconds(c))})):this.triggerRelease(e,r+this.toSeconds(t)),this}add(e,t,n){if(Fe(yr(e)||isFinite(e),`note must be a pitch or midi: ${e}`),yr(e)){const s=new ln(this.context,e).toMidi();this._buffers.add(s,t,n)}else this._buffers.add(e,t,n);return this}get loaded(){return this._buffers.loaded}dispose(){return super.dispose(),this._buffers.dispose(),this._activeSources.forEach(e=>{e.forEach(t=>t.dispose())}),this._activeSources.clear(),this}}An([ei(0)],Oo.prototype,"attack",void 0);An([ei(0)],Oo.prototype,"release",void 0);class il extends ke{constructor(){const e=Ne(il.getDefaults(),arguments,["pan"]);super(e),this.name="Panner",this._panner=this.context.createStereoPanner(),this.input=this._panner,this.output=this._panner,this.pan=new ft({context:this.context,param:this._panner.pan,value:e.pan,minValue:-1,maxValue:1}),this._panner.channelCount=e.channelCount,this._panner.channelCountMode="explicit",vt(this,"pan")}static getDefaults(){return Object.assign(ke.getDefaults(),{pan:0,channelCount:1})}dispose(){return super.dispose(),this._panner.disconnect(),this.pan.dispose(),this}}const Pv="bit-crusher",Dv=`
	class BitCrusherWorklet extends SingleIOProcessor {

		static get parameterDescriptors() {
			return [{
				name: "bits",
				defaultValue: 12,
				minValue: 1,
				maxValue: 16,
				automationRate: 'k-rate'
			}];
		}

		generate(input, _channel, parameters) {
			const step = Math.pow(0.5, parameters.bits - 1);
			const val = step * Math.floor(input / step + 0.5);
			return val;
		}
	}
`;Kh(Pv,Dv);class sl extends ke{constructor(){const e=Ne(sl.getDefaults(),arguments,["channels"]);super(e),this.name="Split",this._splitter=this.input=this.output=this.context.createChannelSplitter(e.channels),this._internalChannels=[this._splitter]}static getDefaults(){return Object.assign(ke.getDefaults(),{channels:2})}dispose(){return super.dispose(),this._splitter.disconnect(),this}}class Uo extends ke{constructor(){const e=Ne(Uo.getDefaults(),arguments,["type","size"]);super(e),this.name="Analyser",this._analysers=[],this._buffers=[],this.input=this.output=this._gain=new It({context:this.context}),this._split=new sl({context:this.context,channels:e.channels}),this.input.connect(this._split),Zn(e.channels,1);for(let t=0;t<e.channels;t++)this._analysers[t]=this.context.createAnalyser(),this._split.connect(this._analysers[t],t,0);this.size=e.size,this.type=e.type,this.smoothing=e.smoothing}static getDefaults(){return Object.assign(ke.getDefaults(),{size:1024,smoothing:.8,type:"fft",channels:1})}getValue(){return this._analysers.forEach((e,t)=>{const n=this._buffers[t];this._type==="fft"?e.getFloatFrequencyData(n):this._type==="waveform"&&e.getFloatTimeDomainData(n)}),this.channels===1?this._buffers[0]:this._buffers}get size(){return this._analysers[0].frequencyBinCount}set size(e){this._analysers.forEach((t,n)=>{t.fftSize=e*2,this._buffers[n]=new Float32Array(e)})}get channels(){return this._analysers.length}get type(){return this._type}set type(e){Fe(e==="waveform"||e==="fft",`Analyser: invalid type: ${e}`),this._type=e}get smoothing(){return this._analysers[0].smoothingTimeConstant}set smoothing(e){this._analysers.forEach(t=>t.smoothingTimeConstant=e)}dispose(){return super.dispose(),this._analysers.forEach(e=>e.disconnect()),this._split.dispose(),this._gain.dispose(),this}}class Mt extends ke{constructor(){const e=Ne(Mt.getDefaults(),arguments,["solo"]);super(e),this.name="Solo",this.input=this.output=new It({context:this.context}),Mt._allSolos.has(this.context)||Mt._allSolos.set(this.context,new Set),Mt._allSolos.get(this.context).add(this),this.solo=e.solo}static getDefaults(){return Object.assign(ke.getDefaults(),{solo:!1})}get solo(){return this._isSoloed()}set solo(e){e?this._addSolo():this._removeSolo(),Mt._allSolos.get(this.context).forEach(t=>t._updateSolo())}get muted(){return this.input.gain.value===0}_addSolo(){Mt._soloed.has(this.context)||Mt._soloed.set(this.context,new Set),Mt._soloed.get(this.context).add(this)}_removeSolo(){Mt._soloed.has(this.context)&&Mt._soloed.get(this.context).delete(this)}_isSoloed(){return Mt._soloed.has(this.context)&&Mt._soloed.get(this.context).has(this)}_noSolos(){return!Mt._soloed.has(this.context)||Mt._soloed.has(this.context)&&Mt._soloed.get(this.context).size===0}_updateSolo(){this._isSoloed()?this.input.gain.value=1:this._noSolos()?this.input.gain.value=1:this.input.gain.value=0}dispose(){return super.dispose(),Mt._allSolos.get(this.context).delete(this),this._removeSolo(),this}}Mt._allSolos=new Map;Mt._soloed=new Map;class rl extends ke{constructor(){const e=Ne(rl.getDefaults(),arguments,["pan","volume"]);super(e),this.name="PanVol",this._panner=this.input=new il({context:this.context,pan:e.pan,channelCount:e.channelCount}),this.pan=this._panner.pan,this._volume=this.output=new Ls({context:this.context,volume:e.volume}),this.volume=this._volume.volume,this._panner.connect(this._volume),this.mute=e.mute,vt(this,["pan","volume"])}static getDefaults(){return Object.assign(ke.getDefaults(),{mute:!1,pan:0,volume:0,channelCount:1})}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}dispose(){return super.dispose(),this._panner.dispose(),this.pan.dispose(),this._volume.dispose(),this.volume.dispose(),this}}class ls extends ke{constructor(){const e=Ne(ls.getDefaults(),arguments,["volume","pan"]);super(e),this.name="Channel",this._solo=this.input=new Mt({solo:e.solo,context:this.context}),this._panVol=this.output=new rl({context:this.context,pan:e.pan,volume:e.volume,mute:e.mute,channelCount:e.channelCount}),this.pan=this._panVol.pan,this.volume=this._panVol.volume,this._solo.connect(this._panVol),vt(this,["pan","volume"])}static getDefaults(){return Object.assign(ke.getDefaults(),{pan:0,volume:0,mute:!1,solo:!1,channelCount:1})}get solo(){return this._solo.solo}set solo(e){this._solo.solo=e}get muted(){return this._solo.muted||this.mute}get mute(){return this._panVol.mute}set mute(e){this._panVol.mute=e}_getBus(e){return ls.buses.has(e)||ls.buses.set(e,new It({context:this.context})),ls.buses.get(e)}send(e,t=0){const n=this._getBus(e),s=new It({context:this.context,units:"decibels",gain:t});return this.connect(s),s.connect(n),s}receive(e){return this._getBus(e).connect(this),this}dispose(){return super.dispose(),this._panVol.dispose(),this.pan.dispose(),this.volume.dispose(),this._solo.dispose(),this}}ls.buses=new Map;const ME=cn().transport;cn().destination;cn().destination;function Jh(){return cn().destination}cn().listener;cn().draw;cn();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ol="175",Iv=0,Yl=1,Nv=2,Qh=1,Lv=2,Gn=3,pi=0,Xt=1,Wn=2,hi=0,fs=1,jl=2,$l=3,Zl=4,Ov=5,Ri=100,Uv=101,Fv=102,kv=103,Bv=104,Vv=200,zv=201,Gv=202,Hv=203,Na=204,La=205,Wv=206,qv=207,Xv=208,Yv=209,jv=210,$v=211,Zv=212,Kv=213,Jv=214,Oa=0,Ua=1,Fa=2,Ts=3,ka=4,Ba=5,Va=6,za=7,al=0,Qv=1,e0=2,di=0,t0=1,n0=2,i0=3,s0=4,r0=5,o0=6,a0=7,ed=300,Es=301,bs=302,Ga=303,Ha=304,Fo=306,Wa=1e3,Di=1001,qa=1002,Mn=1003,c0=1004,Tr=1005,Cn=1006,Ho=1007,Ii=1008,Kn=1009,td=1010,nd=1011,Zs=1012,cl=1013,ki=1014,qn=1015,dr=1016,ll=1017,ul=1018,Ks=1020,id=35902,sd=1021,rd=1022,Sn=1023,od=1024,ad=1025,Js=1026,Qs=1027,cd=1028,hl=1029,ld=1030,dl=1031,fl=1033,jr=33776,$r=33777,Zr=33778,Kr=33779,Xa=35840,Ya=35841,ja=35842,$a=35843,Za=36196,Ka=37492,Ja=37496,Qa=37808,ec=37809,tc=37810,nc=37811,ic=37812,sc=37813,rc=37814,oc=37815,ac=37816,cc=37817,lc=37818,uc=37819,hc=37820,dc=37821,Jr=36492,fc=36494,pc=36495,ud=36283,mc=36284,_c=36285,gc=36286,l0=3200,u0=3201,hd=0,h0=1,li="",an="srgb",As="srgb-linear",po="linear",it="srgb",qi=7680,Kl=519,d0=512,f0=513,p0=514,dd=515,m0=516,_0=517,g0=518,v0=519,Jl=35044,Ql="300 es",Xn=2e3,mo=2001;class Os{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Ot=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wo=Math.PI/180,vc=180/Math.PI;function fr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ot[i&255]+Ot[i>>8&255]+Ot[i>>16&255]+Ot[i>>24&255]+"-"+Ot[e&255]+Ot[e>>8&255]+"-"+Ot[e>>16&15|64]+Ot[e>>24&255]+"-"+Ot[t&63|128]+Ot[t>>8&255]+"-"+Ot[t>>16&255]+Ot[t>>24&255]+Ot[n&255]+Ot[n>>8&255]+Ot[n>>16&255]+Ot[n>>24&255]).toLowerCase()}function We(i,e,t){return Math.max(e,Math.min(t,i))}function x0(i,e){return(i%e+e)%e}function qo(i,e,t){return(1-t)*i+t*e}function Bs(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Wt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Ke{constructor(e=0,t=0){Ke.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ue{constructor(e,t,n,s,r,o,a,c,l){Ue.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],p=n[5],_=n[8],g=s[0],m=s[3],f=s[6],b=s[1],T=s[4],x=s[7],M=s[2],E=s[5],w=s[8];return r[0]=o*g+a*b+c*M,r[3]=o*m+a*T+c*E,r[6]=o*f+a*x+c*w,r[1]=l*g+u*b+h*M,r[4]=l*m+u*T+h*E,r[7]=l*f+u*x+h*w,r[2]=d*g+p*b+_*M,r[5]=d*m+p*T+_*E,r[8]=d*f+p*x+_*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,d=a*c-u*r,p=l*r-o*c,_=t*h+n*d+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=h*g,e[1]=(s*l-u*n)*g,e[2]=(a*n-s*o)*g,e[3]=d*g,e[4]=(u*t-s*c)*g,e[5]=(s*r-a*t)*g,e[6]=p*g,e[7]=(n*c-l*t)*g,e[8]=(o*t-n*r)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Xo.makeScale(e,t)),this}rotate(e){return this.premultiply(Xo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Xo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Xo=new Ue;function fd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function _o(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function S0(){const i=_o("canvas");return i.style.display="block",i}const eu={};function Qr(i){i in eu||(eu[i]=!0,console.warn(i))}function y0(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function M0(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function T0(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const tu=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),nu=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function E0(){const i={enabled:!0,workingColorSpace:As,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===it&&(s.r=jn(s.r),s.g=jn(s.g),s.b=jn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===it&&(s.r=ps(s.r),s.g=ps(s.g),s.b=ps(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===li?po:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[As]:{primaries:e,whitePoint:n,transfer:po,toXYZ:tu,fromXYZ:nu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:an},outputColorSpaceConfig:{drawingBufferColorSpace:an}},[an]:{primaries:e,whitePoint:n,transfer:it,toXYZ:tu,fromXYZ:nu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:an}}}),i}const $e=E0();function jn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ps(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Xi;class b0{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Xi===void 0&&(Xi=_o("canvas")),Xi.width=e.width,Xi.height=e.height;const s=Xi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Xi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=_o("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=jn(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(jn(t[n]/255)*255):t[n]=jn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let A0=0;class pl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:A0++}),this.uuid=fr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Yo(s[o].image)):r.push(Yo(s[o]))}else r=Yo(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Yo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?b0.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let w0=0;class Yt extends Os{constructor(e=Yt.DEFAULT_IMAGE,t=Yt.DEFAULT_MAPPING,n=Di,s=Di,r=Cn,o=Ii,a=Sn,c=Kn,l=Yt.DEFAULT_ANISOTROPY,u=li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:w0++}),this.uuid=fr(),this.name="",this.source=new pl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ke(0,0),this.repeat=new Ke(1,1),this.center=new Ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ed)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wa:e.x=e.x-Math.floor(e.x);break;case Di:e.x=e.x<0?0:1;break;case qa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wa:e.y=e.y-Math.floor(e.y);break;case Di:e.y=e.y<0?0:1;break;case qa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Yt.DEFAULT_IMAGE=null;Yt.DEFAULT_MAPPING=ed;Yt.DEFAULT_ANISOTROPY=1;class st{constructor(e=0,t=0,n=0,s=1){st.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],u=c[4],h=c[8],d=c[1],p=c[5],_=c[9],g=c[2],m=c[6],f=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+g)<.1&&Math.abs(_+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(l+1)/2,x=(p+1)/2,M=(f+1)/2,E=(u+d)/4,w=(h+g)/4,C=(_+m)/4;return T>x&&T>M?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=E/n,r=w/n):x>M?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=E/s,r=C/s):M<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),n=w/r,s=C/r),this.set(n,s,r,t),this}let b=Math.sqrt((m-_)*(m-_)+(h-g)*(h-g)+(d-u)*(d-u));return Math.abs(b)<.001&&(b=1),this.x=(m-_)/b,this.y=(h-g)/b,this.z=(d-u)/b,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class C0 extends Os{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Yt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new pl(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bi extends C0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class pd extends Yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class R0 extends Yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pr{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3];const d=r[o+0],p=r[o+1],_=r[o+2],g=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=_,e[t+3]=g;return}if(h!==g||c!==d||l!==p||u!==_){let m=1-a;const f=c*d+l*p+u*_+h*g,b=f>=0?1:-1,T=1-f*f;if(T>Number.EPSILON){const M=Math.sqrt(T),E=Math.atan2(M,f*b);m=Math.sin(m*E)/M,a=Math.sin(a*E)/M}const x=a*b;if(c=c*m+d*x,l=l*m+p*x,u=u*m+_*x,h=h*m+g*x,m===1-a){const M=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=M,l*=M,u*=M,h*=M}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[o],d=r[o+1],p=r[o+2],_=r[o+3];return e[t]=a*_+u*h+c*p-l*d,e[t+1]=c*_+u*d+l*h-a*p,e[t+2]=l*_+u*p+a*d-c*h,e[t+3]=u*_-a*h-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),h=a(r/2),d=c(n/2),p=c(s/2),_=c(r/2);switch(o){case"XYZ":this._x=d*u*h+l*p*_,this._y=l*p*h-d*u*_,this._z=l*u*_+d*p*h,this._w=l*u*h-d*p*_;break;case"YXZ":this._x=d*u*h+l*p*_,this._y=l*p*h-d*u*_,this._z=l*u*_-d*p*h,this._w=l*u*h+d*p*_;break;case"ZXY":this._x=d*u*h-l*p*_,this._y=l*p*h+d*u*_,this._z=l*u*_+d*p*h,this._w=l*u*h-d*p*_;break;case"ZYX":this._x=d*u*h-l*p*_,this._y=l*p*h+d*u*_,this._z=l*u*_-d*p*h,this._w=l*u*h+d*p*_;break;case"YZX":this._x=d*u*h+l*p*_,this._y=l*p*h+d*u*_,this._z=l*u*_-d*p*h,this._w=l*u*h-d*p*_;break;case"XZY":this._x=d*u*h-l*p*_,this._y=l*p*h-d*u*_,this._z=l*u*_+d*p*h,this._w=l*u*h+d*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],d=n+a+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>h){const p=2*Math.sqrt(1+n-a-h);this._w=(u-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>h){const p=2*Math.sqrt(1+a-n-h);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+h-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,d=Math.sin(t*u)/l;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(e=0,t=0,n=0){z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(iu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(iu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),u=2*(a*t-r*s),h=2*(r*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=s+c*h+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return jo.copy(this).projectOnVector(e),this.sub(jo)}reflect(e){return this.sub(jo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const jo=new z,iu=new pr;class mr{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,pn):pn.fromBufferAttribute(r,o),pn.applyMatrix4(e.matrixWorld),this.expandByPoint(pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Er.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Er.copy(n.boundingBox)),Er.applyMatrix4(e.matrixWorld),this.union(Er)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,pn),pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vs),br.subVectors(this.max,Vs),Yi.subVectors(e.a,Vs),ji.subVectors(e.b,Vs),$i.subVectors(e.c,Vs),ni.subVectors(ji,Yi),ii.subVectors($i,ji),yi.subVectors(Yi,$i);let t=[0,-ni.z,ni.y,0,-ii.z,ii.y,0,-yi.z,yi.y,ni.z,0,-ni.x,ii.z,0,-ii.x,yi.z,0,-yi.x,-ni.y,ni.x,0,-ii.y,ii.x,0,-yi.y,yi.x,0];return!$o(t,Yi,ji,$i,br)||(t=[1,0,0,0,1,0,0,0,1],!$o(t,Yi,ji,$i,br))?!1:(Ar.crossVectors(ni,ii),t=[Ar.x,Ar.y,Ar.z],$o(t,Yi,ji,$i,br))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Fn=[new z,new z,new z,new z,new z,new z,new z,new z],pn=new z,Er=new mr,Yi=new z,ji=new z,$i=new z,ni=new z,ii=new z,yi=new z,Vs=new z,br=new z,Ar=new z,Mi=new z;function $o(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Mi.fromArray(i,r);const a=s.x*Math.abs(Mi.x)+s.y*Math.abs(Mi.y)+s.z*Math.abs(Mi.z),c=e.dot(Mi),l=t.dot(Mi),u=n.dot(Mi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const P0=new mr,zs=new z,Zo=new z;class ml{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):P0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zs.subVectors(e,this.center);const t=zs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(zs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zs.copy(e.center).add(Zo)),this.expandByPoint(zs.copy(e.center).sub(Zo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const kn=new z,Ko=new z,wr=new z,si=new z,Jo=new z,Cr=new z,Qo=new z;class D0{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(kn.copy(this.origin).addScaledVector(this.direction,t),kn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ko.copy(e).add(t).multiplyScalar(.5),wr.copy(t).sub(e).normalize(),si.copy(this.origin).sub(Ko);const r=e.distanceTo(t)*.5,o=-this.direction.dot(wr),a=si.dot(this.direction),c=-si.dot(wr),l=si.lengthSq(),u=Math.abs(1-o*o);let h,d,p,_;if(u>0)if(h=o*c-a,d=o*a-c,_=r*u,h>=0)if(d>=-_)if(d<=_){const g=1/u;h*=g,d*=g,p=h*(h+o*d+2*a)+d*(o*h+d+2*c)+l}else d=r,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*c)+l;else d<=-_?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-c),r),p=-h*h+d*(d+2*c)+l):d<=_?(h=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-c),r),p=-h*h+d*(d+2*c)+l);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Ko).addScaledVector(wr,d),p}intersectSphere(e,t){kn.subVectors(e.center,this.origin);const n=kn.dot(this.direction),s=kn.dot(kn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,kn)!==null}intersectTriangle(e,t,n,s,r){Jo.subVectors(t,e),Cr.subVectors(n,e),Qo.crossVectors(Jo,Cr);let o=this.direction.dot(Qo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;si.subVectors(this.origin,e);const c=a*this.direction.dot(Cr.crossVectors(si,Cr));if(c<0)return null;const l=a*this.direction.dot(Jo.cross(si));if(l<0||c+l>o)return null;const u=-a*si.dot(Qo);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pt{constructor(e,t,n,s,r,o,a,c,l,u,h,d,p,_,g,m){pt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,u,h,d,p,_,g,m)}set(e,t,n,s,r,o,a,c,l,u,h,d,p,_,g,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=u,f[10]=h,f[14]=d,f[3]=p,f[7]=_,f[11]=g,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Zi.setFromMatrixColumn(e,0).length(),r=1/Zi.setFromMatrixColumn(e,1).length(),o=1/Zi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=o*u,p=o*h,_=a*u,g=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=p+_*l,t[5]=d-g*l,t[9]=-a*c,t[2]=g-d*l,t[6]=_+p*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*u,p=c*h,_=l*u,g=l*h;t[0]=d+g*a,t[4]=_*a-p,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=p*a-_,t[6]=g+d*a,t[10]=o*c}else if(e.order==="ZXY"){const d=c*u,p=c*h,_=l*u,g=l*h;t[0]=d-g*a,t[4]=-o*h,t[8]=_+p*a,t[1]=p+_*a,t[5]=o*u,t[9]=g-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const d=o*u,p=o*h,_=a*u,g=a*h;t[0]=c*u,t[4]=_*l-p,t[8]=d*l+g,t[1]=c*h,t[5]=g*l+d,t[9]=p*l-_,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,p=o*l,_=a*c,g=a*l;t[0]=c*u,t[4]=g-d*h,t[8]=_*h+p,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=p*h+_,t[10]=d-g*h}else if(e.order==="XZY"){const d=o*c,p=o*l,_=a*c,g=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=d*h+g,t[5]=o*u,t[9]=p*h-_,t[2]=_*h-p,t[6]=a*u,t[10]=g*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(I0,e,N0)}lookAt(e,t,n){const s=this.elements;return Kt.subVectors(e,t),Kt.lengthSq()===0&&(Kt.z=1),Kt.normalize(),ri.crossVectors(n,Kt),ri.lengthSq()===0&&(Math.abs(n.z)===1?Kt.x+=1e-4:Kt.z+=1e-4,Kt.normalize(),ri.crossVectors(n,Kt)),ri.normalize(),Rr.crossVectors(Kt,ri),s[0]=ri.x,s[4]=Rr.x,s[8]=Kt.x,s[1]=ri.y,s[5]=Rr.y,s[9]=Kt.y,s[2]=ri.z,s[6]=Rr.z,s[10]=Kt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],p=n[13],_=n[2],g=n[6],m=n[10],f=n[14],b=n[3],T=n[7],x=n[11],M=n[15],E=s[0],w=s[4],C=s[8],S=s[12],v=s[1],R=s[5],D=s[9],N=s[13],O=s[2],G=s[6],U=s[10],W=s[14],B=s[3],j=s[7],J=s[11],ne=s[15];return r[0]=o*E+a*v+c*O+l*B,r[4]=o*w+a*R+c*G+l*j,r[8]=o*C+a*D+c*U+l*J,r[12]=o*S+a*N+c*W+l*ne,r[1]=u*E+h*v+d*O+p*B,r[5]=u*w+h*R+d*G+p*j,r[9]=u*C+h*D+d*U+p*J,r[13]=u*S+h*N+d*W+p*ne,r[2]=_*E+g*v+m*O+f*B,r[6]=_*w+g*R+m*G+f*j,r[10]=_*C+g*D+m*U+f*J,r[14]=_*S+g*N+m*W+f*ne,r[3]=b*E+T*v+x*O+M*B,r[7]=b*w+T*R+x*G+M*j,r[11]=b*C+T*D+x*U+M*J,r[15]=b*S+T*N+x*W+M*ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],d=e[10],p=e[14],_=e[3],g=e[7],m=e[11],f=e[15];return _*(+r*c*h-s*l*h-r*a*d+n*l*d+s*a*p-n*c*p)+g*(+t*c*p-t*l*d+r*o*d-s*o*p+s*l*u-r*c*u)+m*(+t*l*h-t*a*p-r*o*h+n*o*p+r*a*u-n*l*u)+f*(-s*a*u-t*c*h+t*a*d+s*o*h-n*o*d+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],d=e[10],p=e[11],_=e[12],g=e[13],m=e[14],f=e[15],b=h*m*l-g*d*l+g*c*p-a*m*p-h*c*f+a*d*f,T=_*d*l-u*m*l-_*c*p+o*m*p+u*c*f-o*d*f,x=u*g*l-_*h*l+_*a*p-o*g*p-u*a*f+o*h*f,M=_*h*c-u*g*c-_*a*d+o*g*d+u*a*m-o*h*m,E=t*b+n*T+s*x+r*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/E;return e[0]=b*w,e[1]=(g*d*r-h*m*r-g*s*p+n*m*p+h*s*f-n*d*f)*w,e[2]=(a*m*r-g*c*r+g*s*l-n*m*l-a*s*f+n*c*f)*w,e[3]=(h*c*r-a*d*r-h*s*l+n*d*l+a*s*p-n*c*p)*w,e[4]=T*w,e[5]=(u*m*r-_*d*r+_*s*p-t*m*p-u*s*f+t*d*f)*w,e[6]=(_*c*r-o*m*r-_*s*l+t*m*l+o*s*f-t*c*f)*w,e[7]=(o*d*r-u*c*r+u*s*l-t*d*l-o*s*p+t*c*p)*w,e[8]=x*w,e[9]=(_*h*r-u*g*r-_*n*p+t*g*p+u*n*f-t*h*f)*w,e[10]=(o*g*r-_*a*r+_*n*l-t*g*l-o*n*f+t*a*f)*w,e[11]=(u*a*r-o*h*r-u*n*l+t*h*l+o*n*p-t*a*p)*w,e[12]=M*w,e[13]=(u*g*s-_*h*s+_*n*d-t*g*d-u*n*m+t*h*m)*w,e[14]=(_*a*s-o*g*s-_*n*c+t*g*c+o*n*m-t*a*m)*w,e[15]=(o*h*s-u*a*s+u*n*c-t*h*c-o*n*d+t*a*d)*w,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,h=a+a,d=r*l,p=r*u,_=r*h,g=o*u,m=o*h,f=a*h,b=c*l,T=c*u,x=c*h,M=n.x,E=n.y,w=n.z;return s[0]=(1-(g+f))*M,s[1]=(p+x)*M,s[2]=(_-T)*M,s[3]=0,s[4]=(p-x)*E,s[5]=(1-(d+f))*E,s[6]=(m+b)*E,s[7]=0,s[8]=(_+T)*w,s[9]=(m-b)*w,s[10]=(1-(d+g))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Zi.set(s[0],s[1],s[2]).length();const o=Zi.set(s[4],s[5],s[6]).length(),a=Zi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],mn.copy(this);const l=1/r,u=1/o,h=1/a;return mn.elements[0]*=l,mn.elements[1]*=l,mn.elements[2]*=l,mn.elements[4]*=u,mn.elements[5]*=u,mn.elements[6]*=u,mn.elements[8]*=h,mn.elements[9]*=h,mn.elements[10]*=h,t.setFromRotationMatrix(mn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Xn){const c=this.elements,l=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),d=(n+s)/(n-s);let p,_;if(a===Xn)p=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===mo)p=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Xn){const c=this.elements,l=1/(t-e),u=1/(n-s),h=1/(o-r),d=(t+e)*l,p=(n+s)*u;let _,g;if(a===Xn)_=(o+r)*h,g=-2*h;else if(a===mo)_=r*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=g,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Zi=new z,mn=new pt,I0=new z(0,0,0),N0=new z(1,1,1),ri=new z,Rr=new z,Kt=new z,su=new pt,ru=new pr;class In{constructor(e=0,t=0,n=0,s=In.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],h=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-We(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(We(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-We(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(We(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return su.makeRotationFromQuaternion(e),this.setFromRotationMatrix(su,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ru.setFromEuler(this),this.setFromQuaternion(ru,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}In.DEFAULT_ORDER="XYZ";class md{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let L0=0;const ou=new z,Ki=new pr,Bn=new pt,Pr=new z,Gs=new z,O0=new z,U0=new pr,au=new z(1,0,0),cu=new z(0,1,0),lu=new z(0,0,1),uu={type:"added"},F0={type:"removed"},Ji={type:"childadded",child:null},ea={type:"childremoved",child:null};class jt extends Os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:L0++}),this.uuid=fr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=jt.DEFAULT_UP.clone();const e=new z,t=new In,n=new pr,s=new z(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pt},normalMatrix:{value:new Ue}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=jt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new md,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ki.setFromAxisAngle(e,t),this.quaternion.multiply(Ki),this}rotateOnWorldAxis(e,t){return Ki.setFromAxisAngle(e,t),this.quaternion.premultiply(Ki),this}rotateX(e){return this.rotateOnAxis(au,e)}rotateY(e){return this.rotateOnAxis(cu,e)}rotateZ(e){return this.rotateOnAxis(lu,e)}translateOnAxis(e,t){return ou.copy(e).applyQuaternion(this.quaternion),this.position.add(ou.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(au,e)}translateY(e){return this.translateOnAxis(cu,e)}translateZ(e){return this.translateOnAxis(lu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Bn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Pr.copy(e):Pr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bn.lookAt(Gs,Pr,this.up):Bn.lookAt(Pr,Gs,this.up),this.quaternion.setFromRotationMatrix(Bn),s&&(Bn.extractRotation(s.matrixWorld),Ki.setFromRotationMatrix(Bn),this.quaternion.premultiply(Ki.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(uu),Ji.child=e,this.dispatchEvent(Ji),Ji.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(F0),ea.child=e,this.dispatchEvent(ea),ea.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Bn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Bn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Bn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(uu),Ji.child=e,this.dispatchEvent(Ji),Ji.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,e,O0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,U0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),p=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=s,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}jt.DEFAULT_UP=new z(0,1,0);jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const _n=new z,Vn=new z,ta=new z,zn=new z,Qi=new z,es=new z,hu=new z,na=new z,ia=new z,sa=new z,ra=new st,oa=new st,aa=new st;class vn{constructor(e=new z,t=new z,n=new z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),_n.subVectors(e,t),s.cross(_n);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){_n.subVectors(s,t),Vn.subVectors(n,t),ta.subVectors(e,t);const o=_n.dot(_n),a=_n.dot(Vn),c=_n.dot(ta),l=Vn.dot(Vn),u=Vn.dot(ta),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;const d=1/h,p=(l*c-a*u)*d,_=(o*u-a*c)*d;return r.set(1-p-_,_,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,zn.x),c.addScaledVector(o,zn.y),c.addScaledVector(a,zn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return ra.setScalar(0),oa.setScalar(0),aa.setScalar(0),ra.fromBufferAttribute(e,t),oa.fromBufferAttribute(e,n),aa.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(ra,r.x),o.addScaledVector(oa,r.y),o.addScaledVector(aa,r.z),o}static isFrontFacing(e,t,n,s){return _n.subVectors(n,t),Vn.subVectors(e,t),_n.cross(Vn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return _n.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),_n.cross(Vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return vn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return vn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Qi.subVectors(s,n),es.subVectors(r,n),na.subVectors(e,n);const c=Qi.dot(na),l=es.dot(na);if(c<=0&&l<=0)return t.copy(n);ia.subVectors(e,s);const u=Qi.dot(ia),h=es.dot(ia);if(u>=0&&h<=u)return t.copy(s);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(Qi,o);sa.subVectors(e,r);const p=Qi.dot(sa),_=es.dot(sa);if(_>=0&&p<=_)return t.copy(r);const g=p*l-c*_;if(g<=0&&l>=0&&_<=0)return a=l/(l-_),t.copy(n).addScaledVector(es,a);const m=u*_-p*h;if(m<=0&&h-u>=0&&p-_>=0)return hu.subVectors(r,s),a=(h-u)/(h-u+(p-_)),t.copy(s).addScaledVector(hu,a);const f=1/(m+g+d);return o=g*f,a=d*f,t.copy(n).addScaledVector(Qi,o).addScaledVector(es,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const _d={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},oi={h:0,s:0,l:0},Dr={h:0,s:0,l:0};function ca(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=an){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=$e.workingColorSpace){if(e=x0(e,1),t=We(t,0,1),n=We(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=ca(o,r,e+1/3),this.g=ca(o,r,e),this.b=ca(o,r,e-1/3)}return $e.toWorkingColorSpace(this,s),this}setStyle(e,t=an){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=an){const n=_d[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=jn(e.r),this.g=jn(e.g),this.b=jn(e.b),this}copyLinearToSRGB(e){return this.r=ps(e.r),this.g=ps(e.g),this.b=ps(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=an){return $e.fromWorkingColorSpace(Ut.copy(this),e),Math.round(We(Ut.r*255,0,255))*65536+Math.round(We(Ut.g*255,0,255))*256+Math.round(We(Ut.b*255,0,255))}getHexString(e=an){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(Ut.copy(this),t);const n=Ut.r,s=Ut.g,r=Ut.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=an){$e.fromWorkingColorSpace(Ut.copy(this),e);const t=Ut.r,n=Ut.g,s=Ut.b;return e!==an?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(oi),this.setHSL(oi.h+e,oi.s+t,oi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(oi),e.getHSL(Dr);const n=qo(oi.h,Dr.h,t),s=qo(oi.s,Dr.s,t),r=qo(oi.l,Dr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ut=new Ze;Ze.NAMES=_d;let k0=0;class _r extends Os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:k0++}),this.uuid=fr(),this.name="",this.type="Material",this.blending=fs,this.side=pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Na,this.blendDst=La,this.blendEquation=Ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ze(0,0,0),this.blendAlpha=0,this.depthFunc=Ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Kl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qi,this.stencilZFail=qi,this.stencilZPass=qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==fs&&(n.blending=this.blending),this.side!==pi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Na&&(n.blendSrc=this.blendSrc),this.blendDst!==La&&(n.blendDst=this.blendDst),this.blendEquation!==Ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ts&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Kl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==qi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==qi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class gd extends _r{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=al,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yt=new z,Ir=new Ke;let B0=0;class Pn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:B0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Jl,this.updateRanges=[],this.gpuType=qn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ir.fromBufferAttribute(this,t),Ir.applyMatrix3(e),this.setXY(t,Ir.x,Ir.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Bs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Wt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Bs(t,this.array)),t}setX(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Bs(t,this.array)),t}setY(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Bs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Bs(t,this.array)),t}setW(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),s=Wt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),s=Wt(s,this.array),r=Wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Jl&&(e.usage=this.usage),e}}class vd extends Pn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class xd extends Pn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Li extends Pn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let V0=0;const on=new pt,la=new jt,ts=new z,Jt=new mr,Hs=new mr,Ct=new z;class Hi extends Os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:V0++}),this.uuid=fr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(fd(e)?xd:vd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ue().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return on.makeRotationFromQuaternion(e),this.applyMatrix4(on),this}rotateX(e){return on.makeRotationX(e),this.applyMatrix4(on),this}rotateY(e){return on.makeRotationY(e),this.applyMatrix4(on),this}rotateZ(e){return on.makeRotationZ(e),this.applyMatrix4(on),this}translate(e,t,n){return on.makeTranslation(e,t,n),this.applyMatrix4(on),this}scale(e,t,n){return on.makeScale(e,t,n),this.applyMatrix4(on),this}lookAt(e){return la.lookAt(e),la.updateMatrix(),this.applyMatrix4(la.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ts).negate(),this.translate(ts.x,ts.y,ts.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Li(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new mr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Jt.setFromBufferAttribute(r),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,Jt.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,Jt.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(Jt.min),this.boundingBox.expandByPoint(Jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ml);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const n=this.boundingSphere.center;if(Jt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Hs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ct.addVectors(Jt.min,Hs.min),Jt.expandByPoint(Ct),Ct.addVectors(Jt.max,Hs.max),Jt.expandByPoint(Ct)):(Jt.expandByPoint(Hs.min),Jt.expandByPoint(Hs.max))}Jt.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ct.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ct));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ct.fromBufferAttribute(a,l),c&&(ts.fromBufferAttribute(e,l),Ct.add(ts)),s=Math.max(s,n.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let C=0;C<n.count;C++)a[C]=new z,c[C]=new z;const l=new z,u=new z,h=new z,d=new Ke,p=new Ke,_=new Ke,g=new z,m=new z;function f(C,S,v){l.fromBufferAttribute(n,C),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,v),d.fromBufferAttribute(r,C),p.fromBufferAttribute(r,S),_.fromBufferAttribute(r,v),u.sub(l),h.sub(l),p.sub(d),_.sub(d);const R=1/(p.x*_.y-_.x*p.y);isFinite(R)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(h,-p.y).multiplyScalar(R),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(R),a[C].add(g),a[S].add(g),a[v].add(g),c[C].add(m),c[S].add(m),c[v].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let C=0,S=b.length;C<S;++C){const v=b[C],R=v.start,D=v.count;for(let N=R,O=R+D;N<O;N+=3)f(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const T=new z,x=new z,M=new z,E=new z;function w(C){M.fromBufferAttribute(s,C),E.copy(M);const S=a[C];T.copy(S),T.sub(M.multiplyScalar(M.dot(S))).normalize(),x.crossVectors(E,S);const R=x.dot(c[C])<0?-1:1;o.setXYZW(C,T.x,T.y,T.z,R)}for(let C=0,S=b.length;C<S;++C){const v=b[C],R=v.start,D=v.count;for(let N=R,O=R+D;N<O;N+=3)w(e.getX(N+0)),w(e.getX(N+1)),w(e.getX(N+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const s=new z,r=new z,o=new z,a=new z,c=new z,l=new z,u=new z,h=new z;if(e)for(let d=0,p=e.count;d<p;d+=3){const _=e.getX(d+0),g=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,h=a.normalized,d=new l.constructor(c.length*u);let p=0,_=0;for(let g=0,m=c.length;g<m;g++){a.isInterleavedBufferAttribute?p=c[g]*a.data.stride+a.offset:p=c[g]*u;for(let f=0;f<u;f++)d[_++]=l[p++]}return new Pn(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Hi,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){const d=l[u],p=e(d,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const p=l[h];u.push(p.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const du=new pt,Ti=new D0,Nr=new ml,fu=new z,Lr=new z,Or=new z,Ur=new z,ua=new z,Fr=new z,pu=new z,kr=new z;class Rn extends jt{constructor(e=new Hi,t=new gd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Fr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],h=r[c];u!==0&&(ua.fromBufferAttribute(h,e),o?Fr.addScaledVector(ua,u):Fr.addScaledVector(ua.sub(t),u))}t.add(Fr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Nr.copy(n.boundingSphere),Nr.applyMatrix4(r),Ti.copy(e.ray).recast(e.near),!(Nr.containsPoint(Ti.origin)===!1&&(Ti.intersectSphere(Nr,fu)===null||Ti.origin.distanceToSquared(fu)>(e.far-e.near)**2))&&(du.copy(r).invert(),Ti.copy(e.ray).applyMatrix4(du),!(n.boundingBox!==null&&Ti.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ti)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=d.length;_<g;_++){const m=d[_],f=o[m.materialIndex],b=Math.max(m.start,p.start),T=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=b,M=T;x<M;x+=3){const E=a.getX(x),w=a.getX(x+1),C=a.getX(x+2);s=Br(this,f,e,n,l,u,h,E,w,C),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),g=Math.min(a.count,p.start+p.count);for(let m=_,f=g;m<f;m+=3){const b=a.getX(m),T=a.getX(m+1),x=a.getX(m+2);s=Br(this,o,e,n,l,u,h,b,T,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,g=d.length;_<g;_++){const m=d[_],f=o[m.materialIndex],b=Math.max(m.start,p.start),T=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let x=b,M=T;x<M;x+=3){const E=x,w=x+1,C=x+2;s=Br(this,f,e,n,l,u,h,E,w,C),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),g=Math.min(c.count,p.start+p.count);for(let m=_,f=g;m<f;m+=3){const b=m,T=m+1,x=m+2;s=Br(this,o,e,n,l,u,h,b,T,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function z0(i,e,t,n,s,r,o,a){let c;if(e.side===Xt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===pi,a),c===null)return null;kr.copy(a),kr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(kr);return l<t.near||l>t.far?null:{distance:l,point:kr.clone(),object:i}}function Br(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Lr),i.getVertexPosition(c,Or),i.getVertexPosition(l,Ur);const u=z0(i,e,t,n,Lr,Or,Ur,pu);if(u){const h=new z;vn.getBarycoord(pu,Lr,Or,Ur,h),s&&(u.uv=vn.getInterpolatedAttribute(s,a,c,l,h,new Ke)),r&&(u.uv1=vn.getInterpolatedAttribute(r,a,c,l,h,new Ke)),o&&(u.normal=vn.getInterpolatedAttribute(o,a,c,l,h,new z),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new z,materialIndex:0};vn.getNormal(Lr,Or,Ur,d.normal),u.face=d,u.barycoord=h}return u}class Us extends Hi{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],h=[];let d=0,p=0;_("z","y","x",-1,-1,n,t,e,o,r,0),_("z","y","x",1,-1,n,t,-e,o,r,1),_("x","z","y",1,1,e,n,t,s,o,2),_("x","z","y",1,-1,e,n,-t,s,o,3),_("x","y","z",1,-1,e,t,n,s,r,4),_("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Li(l,3)),this.setAttribute("normal",new Li(u,3)),this.setAttribute("uv",new Li(h,2));function _(g,m,f,b,T,x,M,E,w,C,S){const v=x/w,R=M/C,D=x/2,N=M/2,O=E/2,G=w+1,U=C+1;let W=0,B=0;const j=new z;for(let J=0;J<U;J++){const ne=J*R-N;for(let ge=0;ge<G;ge++){const Le=ge*v-D;j[g]=Le*b,j[m]=ne*T,j[f]=O,l.push(j.x,j.y,j.z),j[g]=0,j[m]=0,j[f]=E>0?1:-1,u.push(j.x,j.y,j.z),h.push(ge/w),h.push(1-J/C),W+=1}}for(let J=0;J<C;J++)for(let ne=0;ne<w;ne++){const ge=d+ne+G*J,Le=d+ne+G*(J+1),Y=d+(ne+1)+G*(J+1),$=d+(ne+1)+G*J;c.push(ge,Le,$),c.push(Le,Y,$),B+=6}a.addGroup(p,B,S),p+=B,d+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Us(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ws(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Bt(i){const e={};for(let t=0;t<i.length;t++){const n=ws(i[t]);for(const s in n)e[s]=n[s]}return e}function G0(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Sd(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const H0={clone:ws,merge:Bt};var W0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,q0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mi extends _r{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=W0,this.fragmentShader=q0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ws(e.uniforms),this.uniformsGroups=G0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class yd extends jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=Xn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ai=new z,mu=new Ke,_u=new Ke;class tn extends yd{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=vc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Wo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vc*2*Math.atan(Math.tan(Wo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ai.x,ai.y).multiplyScalar(-e/ai.z),ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ai.x,ai.y).multiplyScalar(-e/ai.z)}getViewSize(e,t){return this.getViewBounds(e,mu,_u),t.subVectors(_u,mu)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Wo*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ns=-90,is=1;class X0 extends jt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new tn(ns,is,e,t);s.layers=this.layers,this.add(s);const r=new tn(ns,is,e,t);r.layers=this.layers,this.add(r);const o=new tn(ns,is,e,t);o.layers=this.layers,this.add(o);const a=new tn(ns,is,e,t);a.layers=this.layers,this.add(a);const c=new tn(ns,is,e,t);c.layers=this.layers,this.add(c);const l=new tn(ns,is,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===Xn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===mo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,d,p),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Md extends Yt{constructor(e=[],t=Es,n,s,r,o,a,c,l,u){super(e,t,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Y0 extends Bi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Md(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Cn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Us(5,5,5),r=new mi({name:"CubemapFromEquirect",uniforms:ws(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xt,blending:hi});r.uniforms.tEquirect.value=t;const o=new Rn(s,r),a=t.minFilter;return t.minFilter===Ii&&(t.minFilter=Cn),new X0(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}class Vr extends jt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const j0={type:"move"};class ha{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),f=this._getHandJoint(l,g);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,_=.005;l.inputState.pinching&&d>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(j0)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Vr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class $0 extends jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new In,this.environmentIntensity=1,this.environmentRotation=new In,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const da=new z,Z0=new z,K0=new Ue;class wi{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=da.subVectors(n,t).cross(Z0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(da),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||K0.getNormalMatrix(e),s=this.coplanarPoint(da).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ei=new ml,zr=new z;class _l{constructor(e=new wi,t=new wi,n=new wi,s=new wi,r=new wi,o=new wi){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Xn){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],u=s[5],h=s[6],d=s[7],p=s[8],_=s[9],g=s[10],m=s[11],f=s[12],b=s[13],T=s[14],x=s[15];if(n[0].setComponents(c-r,d-l,m-p,x-f).normalize(),n[1].setComponents(c+r,d+l,m+p,x+f).normalize(),n[2].setComponents(c+o,d+u,m+_,x+b).normalize(),n[3].setComponents(c-o,d-u,m-_,x-b).normalize(),n[4].setComponents(c-a,d-h,m-g,x-T).normalize(),t===Xn)n[5].setComponents(c+a,d+h,m+g,x+T).normalize();else if(t===mo)n[5].setComponents(a,h,g,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ei.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ei.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ei)}intersectsSprite(e){return Ei.center.set(0,0,0),Ei.radius=.7071067811865476,Ei.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ei)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(zr.x=s.normal.x>0?e.max.x:e.min.x,zr.y=s.normal.y>0?e.max.y:e.min.y,zr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(zr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Td extends Yt{constructor(e,t,n=ki,s,r,o,a=Mn,c=Mn,l,u=Js){if(u!==Js&&u!==Qs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super(null,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new pl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class ko extends Hi{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,h=e/a,d=t/c,p=[],_=[],g=[],m=[];for(let f=0;f<u;f++){const b=f*d-o;for(let T=0;T<l;T++){const x=T*h-r;_.push(x,-b,0),g.push(0,0,1),m.push(T/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let b=0;b<a;b++){const T=b+l*f,x=b+l*(f+1),M=b+1+l*(f+1),E=b+1+l*f;p.push(T,x,E),p.push(x,M,E)}this.setIndex(p),this.setAttribute("position",new Li(_,3)),this.setAttribute("normal",new Li(g,3)),this.setAttribute("uv",new Li(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ko(e.width,e.height,e.widthSegments,e.heightSegments)}}class J0 extends _r{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hd,this.normalScale=new Ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=al,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Q0 extends _r{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=l0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ex extends _r{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ed extends jt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const fa=new pt,gu=new z,vu=new z;class tx{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ke(512,512),this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _l,this._frameExtents=new Ke(1,1),this._viewportCount=1,this._viewports=[new st(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;gu.setFromMatrixPosition(e.matrixWorld),t.position.copy(gu),vu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(vu),t.updateMatrixWorld(),fa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(fa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const xu=new pt,Ws=new z,pa=new z;class nx extends tx{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ke(4,2),this._viewportCount=6,this._viewports=[new st(2,1,1,1),new st(0,1,1,1),new st(3,1,1,1),new st(1,1,1,1),new st(3,0,1,1),new st(1,0,1,1)],this._cubeDirections=[new z(1,0,0),new z(-1,0,0),new z(0,0,1),new z(0,0,-1),new z(0,1,0),new z(0,-1,0)],this._cubeUps=[new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,0,1),new z(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ws.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ws),pa.copy(n.position),pa.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(pa),n.updateMatrixWorld(),s.makeTranslation(-Ws.x,-Ws.y,-Ws.z),xu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xu)}}class Su extends Ed{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new nx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class ix extends yd{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class sx extends Ed{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class rx extends tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}function yu(i,e,t,n){const s=ox(n);switch(t){case sd:return i*e;case od:return i*e;case ad:return i*e*2;case cd:return i*e/s.components*s.byteLength;case hl:return i*e/s.components*s.byteLength;case ld:return i*e*2/s.components*s.byteLength;case dl:return i*e*2/s.components*s.byteLength;case rd:return i*e*3/s.components*s.byteLength;case Sn:return i*e*4/s.components*s.byteLength;case fl:return i*e*4/s.components*s.byteLength;case jr:case $r:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Zr:case Kr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ya:case $a:return Math.max(i,16)*Math.max(e,8)/4;case Xa:case ja:return Math.max(i,8)*Math.max(e,8)/2;case Za:case Ka:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ja:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Qa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ec:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case tc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case nc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ic:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case sc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case rc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case oc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ac:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case cc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case lc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case uc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case hc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case dc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Jr:case fc:case pc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ud:case mc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case _c:case gc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ox(i){switch(i){case Kn:case td:return{byteLength:1,components:1};case Zs:case nd:case dr:return{byteLength:2,components:1};case ll:case ul:return{byteLength:2,components:4};case ki:case cl:case qn:return{byteLength:4,components:1};case id:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ol}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ol);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function bd(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function ax(i){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,h=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((p,_)=>p.start-_.start);let d=0;for(let p=1;p<h.length;p++){const _=h[d],g=h[p];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++d,h[d]=g)}h.length=d+1;for(let p=0,_=h.length;p<_;p++){const g=h[p];i.bufferSubData(l,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var cx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ux=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,fx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,px=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,mx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_x=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,gx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,vx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sx=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,yx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Mx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Tx=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ex=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ax=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Rx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Px=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Dx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ix=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Nx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Lx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ox=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ux=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,kx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Vx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,zx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Hx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,qx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Yx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$x=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Zx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Kx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,eS=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,tS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nS=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,iS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sS=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rS=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,oS=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,aS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,cS=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,uS=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hS=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dS=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fS=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_S=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,gS=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,SS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,yS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,MS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,TS=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ES=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,AS=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,wS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,CS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,RS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,PS=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,DS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,IS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,NS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,LS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,OS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,US=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,FS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,BS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,VS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,zS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,GS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,HS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,WS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,qS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,XS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,YS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,$S=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ZS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,KS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,JS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,QS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ey=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ty=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ny=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,iy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ry=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,oy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ay=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cy=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ly=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,py=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,my=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,_y=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,gy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,My=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ty=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ey=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,by=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ay=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Cy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ry=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Py=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dy=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Iy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ny=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ly=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Oy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Uy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Fy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ky=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,By=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:cx,alphahash_pars_fragment:lx,alphamap_fragment:ux,alphamap_pars_fragment:hx,alphatest_fragment:dx,alphatest_pars_fragment:fx,aomap_fragment:px,aomap_pars_fragment:mx,batching_pars_vertex:_x,batching_vertex:gx,begin_vertex:vx,beginnormal_vertex:xx,bsdfs:Sx,iridescence_fragment:yx,bumpmap_pars_fragment:Mx,clipping_planes_fragment:Tx,clipping_planes_pars_fragment:Ex,clipping_planes_pars_vertex:bx,clipping_planes_vertex:Ax,color_fragment:wx,color_pars_fragment:Cx,color_pars_vertex:Rx,color_vertex:Px,common:Dx,cube_uv_reflection_fragment:Ix,defaultnormal_vertex:Nx,displacementmap_pars_vertex:Lx,displacementmap_vertex:Ox,emissivemap_fragment:Ux,emissivemap_pars_fragment:Fx,colorspace_fragment:kx,colorspace_pars_fragment:Bx,envmap_fragment:Vx,envmap_common_pars_fragment:zx,envmap_pars_fragment:Gx,envmap_pars_vertex:Hx,envmap_physical_pars_fragment:eS,envmap_vertex:Wx,fog_vertex:qx,fog_pars_vertex:Xx,fog_fragment:Yx,fog_pars_fragment:jx,gradientmap_pars_fragment:$x,lightmap_pars_fragment:Zx,lights_lambert_fragment:Kx,lights_lambert_pars_fragment:Jx,lights_pars_begin:Qx,lights_toon_fragment:tS,lights_toon_pars_fragment:nS,lights_phong_fragment:iS,lights_phong_pars_fragment:sS,lights_physical_fragment:rS,lights_physical_pars_fragment:oS,lights_fragment_begin:aS,lights_fragment_maps:cS,lights_fragment_end:lS,logdepthbuf_fragment:uS,logdepthbuf_pars_fragment:hS,logdepthbuf_pars_vertex:dS,logdepthbuf_vertex:fS,map_fragment:pS,map_pars_fragment:mS,map_particle_fragment:_S,map_particle_pars_fragment:gS,metalnessmap_fragment:vS,metalnessmap_pars_fragment:xS,morphinstance_vertex:SS,morphcolor_vertex:yS,morphnormal_vertex:MS,morphtarget_pars_vertex:TS,morphtarget_vertex:ES,normal_fragment_begin:bS,normal_fragment_maps:AS,normal_pars_fragment:wS,normal_pars_vertex:CS,normal_vertex:RS,normalmap_pars_fragment:PS,clearcoat_normal_fragment_begin:DS,clearcoat_normal_fragment_maps:IS,clearcoat_pars_fragment:NS,iridescence_pars_fragment:LS,opaque_fragment:OS,packing:US,premultiplied_alpha_fragment:FS,project_vertex:kS,dithering_fragment:BS,dithering_pars_fragment:VS,roughnessmap_fragment:zS,roughnessmap_pars_fragment:GS,shadowmap_pars_fragment:HS,shadowmap_pars_vertex:WS,shadowmap_vertex:qS,shadowmask_pars_fragment:XS,skinbase_vertex:YS,skinning_pars_vertex:jS,skinning_vertex:$S,skinnormal_vertex:ZS,specularmap_fragment:KS,specularmap_pars_fragment:JS,tonemapping_fragment:QS,tonemapping_pars_fragment:ey,transmission_fragment:ty,transmission_pars_fragment:ny,uv_pars_fragment:iy,uv_pars_vertex:sy,uv_vertex:ry,worldpos_vertex:oy,background_vert:ay,background_frag:cy,backgroundCube_vert:ly,backgroundCube_frag:uy,cube_vert:hy,cube_frag:dy,depth_vert:fy,depth_frag:py,distanceRGBA_vert:my,distanceRGBA_frag:_y,equirect_vert:gy,equirect_frag:vy,linedashed_vert:xy,linedashed_frag:Sy,meshbasic_vert:yy,meshbasic_frag:My,meshlambert_vert:Ty,meshlambert_frag:Ey,meshmatcap_vert:by,meshmatcap_frag:Ay,meshnormal_vert:wy,meshnormal_frag:Cy,meshphong_vert:Ry,meshphong_frag:Py,meshphysical_vert:Dy,meshphysical_frag:Iy,meshtoon_vert:Ny,meshtoon_frag:Ly,points_vert:Oy,points_frag:Uy,shadow_vert:Fy,shadow_frag:ky,sprite_vert:By,sprite_frag:Vy},he={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new Ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new Ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},wn={basic:{uniforms:Bt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Bt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ze(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Bt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Bt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Bt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Ze(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Bt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Bt([he.points,he.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Bt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Bt([he.common,he.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Bt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Bt([he.sprite,he.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:Bt([he.common,he.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:Bt([he.lights,he.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};wn.physical={uniforms:Bt([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new Ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new Ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new Ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Gr={r:0,b:0,g:0},bi=new In,zy=new pt;function Gy(i,e,t,n,s,r,o){const a=new Ze(0);let c=r===!0?0:1,l,u,h=null,d=0,p=null;function _(T){let x=T.isScene===!0?T.background:null;return x&&x.isTexture&&(x=(T.backgroundBlurriness>0?t:e).get(x)),x}function g(T){let x=!1;const M=_(T);M===null?f(a,c):M&&M.isColor&&(f(M,1),x=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(T,x){const M=_(x);M&&(M.isCubeTexture||M.mapping===Fo)?(u===void 0&&(u=new Rn(new Us(1,1,1),new mi({name:"BackgroundCubeMaterial",uniforms:ws(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),bi.copy(x.backgroundRotation),bi.x*=-1,bi.y*=-1,bi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(bi.y*=-1,bi.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(zy.makeRotationFromEuler(bi)),u.material.toneMapped=$e.getTransfer(M.colorSpace)!==it,(h!==M||d!==M.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=M,d=M.version,p=i.toneMapping),u.layers.enableAll(),T.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Rn(new ko(2,2),new mi({name:"BackgroundMaterial",uniforms:ws(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:pi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=$e.getTransfer(M.colorSpace)!==it,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,p=i.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function f(T,x){T.getRGB(Gr,Sd(i)),n.buffers.color.setClear(Gr.r,Gr.g,Gr.b,x,o)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,x=1){a.set(T),c=x,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(T){c=T,f(a,c)},render:g,addToRenderList:m,dispose:b}}function Hy(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(v,R,D,N,O){let G=!1;const U=h(N,D,R);r!==U&&(r=U,l(r.object)),G=p(v,N,D,O),G&&_(v,N,D,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,x(v,R,D,N),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function c(){return i.createVertexArray()}function l(v){return i.bindVertexArray(v)}function u(v){return i.deleteVertexArray(v)}function h(v,R,D){const N=D.wireframe===!0;let O=n[v.id];O===void 0&&(O={},n[v.id]=O);let G=O[R.id];G===void 0&&(G={},O[R.id]=G);let U=G[N];return U===void 0&&(U=d(c()),G[N]=U),U}function d(v){const R=[],D=[],N=[];for(let O=0;O<t;O++)R[O]=0,D[O]=0,N[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:D,attributeDivisors:N,object:v,attributes:{},index:null}}function p(v,R,D,N){const O=r.attributes,G=R.attributes;let U=0;const W=D.getAttributes();for(const B in W)if(W[B].location>=0){const J=O[B];let ne=G[B];if(ne===void 0&&(B==="instanceMatrix"&&v.instanceMatrix&&(ne=v.instanceMatrix),B==="instanceColor"&&v.instanceColor&&(ne=v.instanceColor)),J===void 0||J.attribute!==ne||ne&&J.data!==ne.data)return!0;U++}return r.attributesNum!==U||r.index!==N}function _(v,R,D,N){const O={},G=R.attributes;let U=0;const W=D.getAttributes();for(const B in W)if(W[B].location>=0){let J=G[B];J===void 0&&(B==="instanceMatrix"&&v.instanceMatrix&&(J=v.instanceMatrix),B==="instanceColor"&&v.instanceColor&&(J=v.instanceColor));const ne={};ne.attribute=J,J&&J.data&&(ne.data=J.data),O[B]=ne,U++}r.attributes=O,r.attributesNum=U,r.index=N}function g(){const v=r.newAttributes;for(let R=0,D=v.length;R<D;R++)v[R]=0}function m(v){f(v,0)}function f(v,R){const D=r.newAttributes,N=r.enabledAttributes,O=r.attributeDivisors;D[v]=1,N[v]===0&&(i.enableVertexAttribArray(v),N[v]=1),O[v]!==R&&(i.vertexAttribDivisor(v,R),O[v]=R)}function b(){const v=r.newAttributes,R=r.enabledAttributes;for(let D=0,N=R.length;D<N;D++)R[D]!==v[D]&&(i.disableVertexAttribArray(D),R[D]=0)}function T(v,R,D,N,O,G,U){U===!0?i.vertexAttribIPointer(v,R,D,O,G):i.vertexAttribPointer(v,R,D,N,O,G)}function x(v,R,D,N){g();const O=N.attributes,G=D.getAttributes(),U=R.defaultAttributeValues;for(const W in G){const B=G[W];if(B.location>=0){let j=O[W];if(j===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(j=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(j=v.instanceColor)),j!==void 0){const J=j.normalized,ne=j.itemSize,ge=e.get(j);if(ge===void 0)continue;const Le=ge.buffer,Y=ge.type,$=ge.bytesPerElement,oe=Y===i.INT||Y===i.UNSIGNED_INT||j.gpuType===cl;if(j.isInterleavedBufferAttribute){const se=j.data,ee=se.stride,ze=j.offset;if(se.isInstancedInterleavedBuffer){for(let be=0;be<B.locationSize;be++)f(B.location+be,se.meshPerAttribute);v.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let be=0;be<B.locationSize;be++)m(B.location+be);i.bindBuffer(i.ARRAY_BUFFER,Le);for(let be=0;be<B.locationSize;be++)T(B.location+be,ne/B.locationSize,Y,J,ee*$,(ze+ne/B.locationSize*be)*$,oe)}else{if(j.isInstancedBufferAttribute){for(let se=0;se<B.locationSize;se++)f(B.location+se,j.meshPerAttribute);v.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let se=0;se<B.locationSize;se++)m(B.location+se);i.bindBuffer(i.ARRAY_BUFFER,Le);for(let se=0;se<B.locationSize;se++)T(B.location+se,ne/B.locationSize,Y,J,ne*$,ne/B.locationSize*se*$,oe)}}else if(U!==void 0){const J=U[W];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(B.location,J);break;case 3:i.vertexAttrib3fv(B.location,J);break;case 4:i.vertexAttrib4fv(B.location,J);break;default:i.vertexAttrib1fv(B.location,J)}}}}b()}function M(){C();for(const v in n){const R=n[v];for(const D in R){const N=R[D];for(const O in N)u(N[O].object),delete N[O];delete R[D]}delete n[v]}}function E(v){if(n[v.id]===void 0)return;const R=n[v.id];for(const D in R){const N=R[D];for(const O in N)u(N[O].object),delete N[O];delete R[D]}delete n[v.id]}function w(v){for(const R in n){const D=n[R];if(D[v.id]===void 0)continue;const N=D[v.id];for(const O in N)u(N[O].object),delete N[O];delete D[v.id]}}function C(){S(),o=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:S,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfProgram:w,initAttributes:g,enableAttribute:m,disableUnusedAttributes:b}}function Wy(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function a(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let p=0;for(let _=0;_<h;_++)p+=u[_];t.update(p,n,1)}function c(l,u,h,d){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<l.length;_++)o(l[_],u[_],d[_]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let _=0;for(let g=0;g<h;g++)_+=u[g]*d[g];t.update(_,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function qy(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==Sn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const C=w===dr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Kn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==qn&&!C)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=_>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:b,maxVaryings:T,maxFragmentUniforms:x,vertexTextures:M,maxSamples:E}}function Xy(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new wi,a=new Ue,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||n!==0||s;return s=d,n=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,p){const _=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,f=i.get(h);if(!s||_===null||_.length===0||r&&!m)r?u(null):l();else{const b=r?0:n,T=b*4;let x=f.clippingState||null;c.value=x,x=u(_,d,T,p);for(let M=0;M!==T;++M)x[M]=t[M];f.clippingState=x,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,p,_){const g=h!==null?h.length:0;let m=null;if(g!==0){if(m=c.value,_!==!0||m===null){const f=p+g*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<f)&&(m=new Float32Array(f));for(let T=0,x=p;T!==g;++T,x+=4)o.copy(h[T]).applyMatrix4(b,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function Yy(i){let e=new WeakMap;function t(o,a){return a===Ga?o.mapping=Es:a===Ha&&(o.mapping=bs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ga||a===Ha)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Y0(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const us=4,Mu=[.125,.215,.35,.446,.526,.582],Pi=20,ma=new ix,Tu=new Ze;let _a=null,ga=0,va=0,xa=!1;const Ci=(1+Math.sqrt(5))/2,ss=1/Ci,Eu=[new z(-Ci,ss,0),new z(Ci,ss,0),new z(-ss,0,Ci),new z(ss,0,Ci),new z(0,Ci,-ss),new z(0,Ci,ss),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)],jy=new z;class bu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:o=256,position:a=jy}=r;_a=this._renderer.getRenderTarget(),ga=this._renderer.getActiveCubeFace(),va=this._renderer.getActiveMipmapLevel(),xa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(_a,ga,va),this._renderer.xr.enabled=xa,e.scissorTest=!1,Hr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Es||e.mapping===bs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_a=this._renderer.getRenderTarget(),ga=this._renderer.getActiveCubeFace(),va=this._renderer.getActiveMipmapLevel(),xa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Cn,minFilter:Cn,generateMipmaps:!1,type:dr,format:Sn,colorSpace:As,depthBuffer:!1},s=Au(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Au(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=$y(r)),this._blurMaterial=Zy(r,e,t)}return s}_compileMaterial(e){const t=new Rn(this._lodPlanes[0],e);this._renderer.compile(t,ma)}_sceneToCubeUV(e,t,n,s,r){const c=new tn(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,p=h.toneMapping;h.getClearColor(Tu),h.toneMapping=di,h.autoClear=!1;const _=new gd({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1}),g=new Rn(new Us,_);let m=!1;const f=e.background;f?f.isColor&&(_.color.copy(f),e.background=null,m=!0):(_.color.copy(Tu),m=!0);for(let b=0;b<6;b++){const T=b%3;T===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[b],r.y,r.z)):T===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[b]));const x=this._cubeSize;Hr(s,T*x,b>2?x:0,x,x),h.setRenderTarget(s),m&&h.render(g,c),h.render(e,c)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=p,h.autoClear=d,e.background=f}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Es||e.mapping===bs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Rn(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;Hr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,ma)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Eu[(s-r-1)%Eu.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Rn(this._lodPlanes[s],l),d=l.uniforms,p=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Pi-1),g=r/_,m=isFinite(r)?1+Math.floor(u*g):Pi;m>Pi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Pi}`);const f=[];let b=0;for(let w=0;w<Pi;++w){const C=w/g,S=Math.exp(-C*C/2);f.push(S),w===0?b+=S:w<m&&(b+=2*S)}for(let w=0;w<f.length;w++)f[w]=f[w]/b;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:T}=this;d.dTheta.value=_,d.mipInt.value=T-n;const x=this._sizeLods[s],M=3*x*(s>T-us?s-T+us:0),E=4*(this._cubeSize-x);Hr(t,M,E,3*x,2*x),c.setRenderTarget(t),c.render(h,ma)}}function $y(i){const e=[],t=[],n=[];let s=i;const r=i-us+1+Mu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-us?c=Mu[o-i+us-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,_=6,g=3,m=2,f=1,b=new Float32Array(g*_*p),T=new Float32Array(m*_*p),x=new Float32Array(f*_*p);for(let E=0;E<p;E++){const w=E%3*2/3-1,C=E>2?0:-1,S=[w,C,0,w+2/3,C,0,w+2/3,C+1,0,w,C,0,w+2/3,C+1,0,w,C+1,0];b.set(S,g*_*E),T.set(d,m*_*E);const v=[E,E,E,E,E,E];x.set(v,f*_*E)}const M=new Hi;M.setAttribute("position",new Pn(b,g)),M.setAttribute("uv",new Pn(T,m)),M.setAttribute("faceIndex",new Pn(x,f)),e.push(M),s>us&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Au(i,e,t){const n=new Bi(i,e,t);return n.texture.mapping=Fo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Hr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Zy(i,e,t){const n=new Float32Array(Pi),s=new z(0,1,0);return new mi({name:"SphericalGaussianBlur",defines:{n:Pi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:gl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function wu(){return new mi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function Cu(){return new mi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function gl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ky(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Ga||c===Ha,u=c===Es||c===bs;if(l||u){let h=e.get(a);const d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new bu(i)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return l&&p&&p.height>0||u&&p&&s(p)?(t===null&&(t=new bu(i)),h=l?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Jy(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Qr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Qy(i,e,t,n){const s={},r=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);d.removeEventListener("dispose",o),delete s[d.id];const p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(h){const d=h.attributes;for(const p in d)e.update(d[p],i.ARRAY_BUFFER)}function l(h){const d=[],p=h.index,_=h.attributes.position;let g=0;if(p!==null){const b=p.array;g=p.version;for(let T=0,x=b.length;T<x;T+=3){const M=b[T+0],E=b[T+1],w=b[T+2];d.push(M,E,E,w,w,M)}}else if(_!==void 0){const b=_.array;g=_.version;for(let T=0,x=b.length/3-1;T<x;T+=3){const M=T+0,E=T+1,w=T+2;d.push(M,E,E,w,w,M)}}else return;const m=new(fd(d)?xd:vd)(d,1);m.version=g;const f=r.get(h);f&&e.remove(f),r.set(h,m)}function u(h){const d=r.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function eM(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,p){i.drawElements(n,p,r,d*o),t.update(p,n,1)}function l(d,p,_){_!==0&&(i.drawElementsInstanced(n,p,r,d*o,_),t.update(p,n,_))}function u(d,p,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,_);let m=0;for(let f=0;f<_;f++)m+=p[f];t.update(m,n,1)}function h(d,p,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)l(d[f]/o,p[f],g[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,g,0,_);let f=0;for(let b=0;b<_;b++)f+=p[b]*g[b];t.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function tM(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function nM(i,e,t){const n=new WeakMap,s=new st;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(a);if(d===void 0||d.count!==h){let S=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();const p=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let T=0;p===!0&&(T=1),_===!0&&(T=2),g===!0&&(T=3);let x=a.attributes.position.count*T,M=1;x>e.maxTextureSize&&(M=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const E=new Float32Array(x*M*4*h),w=new pd(E,x,M,h);w.type=qn,w.needsUpdate=!0;const C=T*4;for(let v=0;v<h;v++){const R=m[v],D=f[v],N=b[v],O=x*M*4*v;for(let G=0;G<R.count;G++){const U=G*C;p===!0&&(s.fromBufferAttribute(R,G),E[O+U+0]=s.x,E[O+U+1]=s.y,E[O+U+2]=s.z,E[O+U+3]=0),_===!0&&(s.fromBufferAttribute(D,G),E[O+U+4]=s.x,E[O+U+5]=s.y,E[O+U+6]=s.z,E[O+U+7]=0),g===!0&&(s.fromBufferAttribute(N,G),E[O+U+8]=s.x,E[O+U+9]=s.y,E[O+U+10]=s.z,E[O+U+11]=N.itemSize===4?s.w:1)}}d={count:h,texture:w,size:new Ke(x,M)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let g=0;g<l.length;g++)p+=l[g];const _=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function iM(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}const Ad=new Yt,Ru=new Td(1,1),wd=new pd,Cd=new R0,Rd=new Md,Pu=[],Du=[],Iu=new Float32Array(16),Nu=new Float32Array(9),Lu=new Float32Array(4);function Fs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Pu[s];if(r===void 0&&(r=new Float32Array(s),Pu[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function At(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function wt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Bo(i,e){let t=Du[e];t===void 0&&(t=new Int32Array(e),Du[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function sM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function rM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;i.uniform2fv(this.addr,e),wt(t,e)}}function oM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(At(t,e))return;i.uniform3fv(this.addr,e),wt(t,e)}}function aM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;i.uniform4fv(this.addr,e),wt(t,e)}}function cM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),wt(t,e)}else{if(At(t,n))return;Lu.set(n),i.uniformMatrix2fv(this.addr,!1,Lu),wt(t,n)}}function lM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),wt(t,e)}else{if(At(t,n))return;Nu.set(n),i.uniformMatrix3fv(this.addr,!1,Nu),wt(t,n)}}function uM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),wt(t,e)}else{if(At(t,n))return;Iu.set(n),i.uniformMatrix4fv(this.addr,!1,Iu),wt(t,n)}}function hM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function dM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;i.uniform2iv(this.addr,e),wt(t,e)}}function fM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;i.uniform3iv(this.addr,e),wt(t,e)}}function pM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;i.uniform4iv(this.addr,e),wt(t,e)}}function mM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function _M(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;i.uniform2uiv(this.addr,e),wt(t,e)}}function gM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;i.uniform3uiv(this.addr,e),wt(t,e)}}function vM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;i.uniform4uiv(this.addr,e),wt(t,e)}}function xM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ru.compareFunction=dd,r=Ru):r=Ad,t.setTexture2D(e||r,s)}function SM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Cd,s)}function yM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Rd,s)}function MM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||wd,s)}function TM(i){switch(i){case 5126:return sM;case 35664:return rM;case 35665:return oM;case 35666:return aM;case 35674:return cM;case 35675:return lM;case 35676:return uM;case 5124:case 35670:return hM;case 35667:case 35671:return dM;case 35668:case 35672:return fM;case 35669:case 35673:return pM;case 5125:return mM;case 36294:return _M;case 36295:return gM;case 36296:return vM;case 35678:case 36198:case 36298:case 36306:case 35682:return xM;case 35679:case 36299:case 36307:return SM;case 35680:case 36300:case 36308:case 36293:return yM;case 36289:case 36303:case 36311:case 36292:return MM}}function EM(i,e){i.uniform1fv(this.addr,e)}function bM(i,e){const t=Fs(e,this.size,2);i.uniform2fv(this.addr,t)}function AM(i,e){const t=Fs(e,this.size,3);i.uniform3fv(this.addr,t)}function wM(i,e){const t=Fs(e,this.size,4);i.uniform4fv(this.addr,t)}function CM(i,e){const t=Fs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function RM(i,e){const t=Fs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function PM(i,e){const t=Fs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function DM(i,e){i.uniform1iv(this.addr,e)}function IM(i,e){i.uniform2iv(this.addr,e)}function NM(i,e){i.uniform3iv(this.addr,e)}function LM(i,e){i.uniform4iv(this.addr,e)}function OM(i,e){i.uniform1uiv(this.addr,e)}function UM(i,e){i.uniform2uiv(this.addr,e)}function FM(i,e){i.uniform3uiv(this.addr,e)}function kM(i,e){i.uniform4uiv(this.addr,e)}function BM(i,e,t){const n=this.cache,s=e.length,r=Bo(t,s);At(n,r)||(i.uniform1iv(this.addr,r),wt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Ad,r[o])}function VM(i,e,t){const n=this.cache,s=e.length,r=Bo(t,s);At(n,r)||(i.uniform1iv(this.addr,r),wt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Cd,r[o])}function zM(i,e,t){const n=this.cache,s=e.length,r=Bo(t,s);At(n,r)||(i.uniform1iv(this.addr,r),wt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Rd,r[o])}function GM(i,e,t){const n=this.cache,s=e.length,r=Bo(t,s);At(n,r)||(i.uniform1iv(this.addr,r),wt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||wd,r[o])}function HM(i){switch(i){case 5126:return EM;case 35664:return bM;case 35665:return AM;case 35666:return wM;case 35674:return CM;case 35675:return RM;case 35676:return PM;case 5124:case 35670:return DM;case 35667:case 35671:return IM;case 35668:case 35672:return NM;case 35669:case 35673:return LM;case 5125:return OM;case 36294:return UM;case 36295:return FM;case 36296:return kM;case 35678:case 36198:case 36298:case 36306:case 35682:return BM;case 35679:case 36299:case 36307:return VM;case 35680:case 36300:case 36308:case 36293:return zM;case 36289:case 36303:case 36311:case 36292:return GM}}class WM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=TM(t.type)}}class qM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=HM(t.type)}}class XM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Sa=/(\w+)(\])?(\[|\.)?/g;function Ou(i,e){i.seq.push(e),i.map[e.id]=e}function YM(i,e,t){const n=i.name,s=n.length;for(Sa.lastIndex=0;;){const r=Sa.exec(n),o=Sa.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Ou(t,l===void 0?new WM(a,i,e):new qM(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new XM(a),Ou(t,h)),t=h}}}class eo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);YM(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function Uu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const jM=37297;let $M=0;function ZM(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Fu=new Ue;function KM(i){$e._getMatrix(Fu,$e.workingColorSpace,i);const e=`mat3( ${Fu.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(i)){case po:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function ku(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+ZM(i.getShaderSource(e),o)}else return s}function JM(i,e){const t=KM(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function QM(i,e){let t;switch(e){case t0:t="Linear";break;case n0:t="Reinhard";break;case i0:t="Cineon";break;case s0:t="ACESFilmic";break;case o0:t="AgX";break;case a0:t="Neutral";break;case r0:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Wr=new z;function eT(){$e.getLuminanceCoefficients(Wr);const i=Wr.x.toFixed(4),e=Wr.y.toFixed(4),t=Wr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function tT(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qs).join(`
`)}function nT(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function iT(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function qs(i){return i!==""}function Bu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Vu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const sT=/^[ \t]*#include +<([\w\d./]+)>/gm;function xc(i){return i.replace(sT,oT)}const rT=new Map;function oT(i,e){let t=Ve[e];if(t===void 0){const n=rT.get(e);if(n!==void 0)t=Ve[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return xc(t)}const aT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zu(i){return i.replace(aT,cT)}function cT(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Gu(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function lT(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Qh?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Lv?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Gn&&(e="SHADOWMAP_TYPE_VSM"),e}function uT(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Es:case bs:e="ENVMAP_TYPE_CUBE";break;case Fo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function hT(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case bs:e="ENVMAP_MODE_REFRACTION";break}return e}function dT(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case al:e="ENVMAP_BLENDING_MULTIPLY";break;case Qv:e="ENVMAP_BLENDING_MIX";break;case e0:e="ENVMAP_BLENDING_ADD";break}return e}function fT(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function pT(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=lT(t),l=uT(t),u=hT(t),h=dT(t),d=fT(t),p=tT(t),_=nT(r),g=s.createProgram();let m,f,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(qs).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(qs).join(`
`),f.length>0&&(f+=`
`)):(m=[Gu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qs).join(`
`),f=[Gu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==di?"#define TONE_MAPPING":"",t.toneMapping!==di?Ve.tonemapping_pars_fragment:"",t.toneMapping!==di?QM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,JM("linearToOutputTexel",t.outputColorSpace),eT(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qs).join(`
`)),o=xc(o),o=Bu(o,t),o=Vu(o,t),a=xc(a),a=Bu(a,t),a=Vu(a,t),o=zu(o),a=zu(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Ql?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ql?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const T=b+m+o,x=b+f+a,M=Uu(s,s.VERTEX_SHADER,T),E=Uu(s,s.FRAGMENT_SHADER,x);s.attachShader(g,M),s.attachShader(g,E),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function w(R){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(g).trim(),N=s.getShaderInfoLog(M).trim(),O=s.getShaderInfoLog(E).trim();let G=!0,U=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,M,E);else{const W=ku(s,M,"vertex"),B=ku(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+D+`
`+W+`
`+B)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(N===""||O==="")&&(U=!1);U&&(R.diagnostics={runnable:G,programLog:D,vertexShader:{log:N,prefix:m},fragmentShader:{log:O,prefix:f}})}s.deleteShader(M),s.deleteShader(E),C=new eo(s,g),S=iT(s,g)}let C;this.getUniforms=function(){return C===void 0&&w(this),C};let S;this.getAttributes=function(){return S===void 0&&w(this),S};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(g,jM)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=$M++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=M,this.fragmentShader=E,this}let mT=0;class _T{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new gT(e),t.set(e,n)),n}}class gT{constructor(e){this.id=mT++,this.code=e,this.usedTimes=0}}function vT(i,e,t,n,s,r,o){const a=new md,c=new _T,l=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures;let p=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,v,R,D,N){const O=D.fog,G=N.geometry,U=S.isMeshStandardMaterial?D.environment:null,W=(S.isMeshStandardMaterial?t:e).get(S.envMap||U),B=W&&W.mapping===Fo?W.image.height:null,j=_[S.type];S.precision!==null&&(p=s.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const J=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ne=J!==void 0?J.length:0;let ge=0;G.morphAttributes.position!==void 0&&(ge=1),G.morphAttributes.normal!==void 0&&(ge=2),G.morphAttributes.color!==void 0&&(ge=3);let Le,Y,$,oe;if(j){const tt=wn[j];Le=tt.vertexShader,Y=tt.fragmentShader}else Le=S.vertexShader,Y=S.fragmentShader,c.update(S),$=c.getVertexShaderID(S),oe=c.getFragmentShaderID(S);const se=i.getRenderTarget(),ee=i.state.buffers.depth.getReversed(),ze=N.isInstancedMesh===!0,be=N.isBatchedMesh===!0,nt=!!S.map,Je=!!S.matcap,Ge=!!W,I=!!S.aoMap,ae=!!S.lightMap,ce=!!S.bumpMap,Ae=!!S.normalMap,le=!!S.displacementMap,Te=!!S.emissiveMap,ue=!!S.metalnessMap,P=!!S.roughnessMap,y=S.anisotropy>0,V=S.clearcoat>0,K=S.dispersion>0,te=S.iridescence>0,Z=S.sheen>0,Ee=S.transmission>0,fe=y&&!!S.anisotropyMap,xe=V&&!!S.clearcoatMap,Xe=V&&!!S.clearcoatNormalMap,re=V&&!!S.clearcoatRoughnessMap,Se=te&&!!S.iridescenceMap,Re=te&&!!S.iridescenceThicknessMap,De=Z&&!!S.sheenColorMap,ye=Z&&!!S.sheenRoughnessMap,qe=!!S.specularMap,Be=!!S.specularColorMap,at=!!S.specularIntensityMap,L=Ee&&!!S.transmissionMap,pe=Ee&&!!S.thicknessMap,X=!!S.gradientMap,Q=!!S.alphaMap,_e=S.alphaTest>0,me=!!S.alphaHash,Oe=!!S.extensions;let mt=di;S.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(mt=i.toneMapping);const Lt={shaderID:j,shaderType:S.type,shaderName:S.name,vertexShader:Le,fragmentShader:Y,defines:S.defines,customVertexShaderID:$,customFragmentShaderID:oe,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:be,batchingColor:be&&N._colorsTexture!==null,instancing:ze,instancingColor:ze&&N.instanceColor!==null,instancingMorph:ze&&N.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:se===null?i.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:As,alphaToCoverage:!!S.alphaToCoverage,map:nt,matcap:Je,envMap:Ge,envMapMode:Ge&&W.mapping,envMapCubeUVHeight:B,aoMap:I,lightMap:ae,bumpMap:ce,normalMap:Ae,displacementMap:d&&le,emissiveMap:Te,normalMapObjectSpace:Ae&&S.normalMapType===h0,normalMapTangentSpace:Ae&&S.normalMapType===hd,metalnessMap:ue,roughnessMap:P,anisotropy:y,anisotropyMap:fe,clearcoat:V,clearcoatMap:xe,clearcoatNormalMap:Xe,clearcoatRoughnessMap:re,dispersion:K,iridescence:te,iridescenceMap:Se,iridescenceThicknessMap:Re,sheen:Z,sheenColorMap:De,sheenRoughnessMap:ye,specularMap:qe,specularColorMap:Be,specularIntensityMap:at,transmission:Ee,transmissionMap:L,thicknessMap:pe,gradientMap:X,opaque:S.transparent===!1&&S.blending===fs&&S.alphaToCoverage===!1,alphaMap:Q,alphaTest:_e,alphaHash:me,combine:S.combine,mapUv:nt&&g(S.map.channel),aoMapUv:I&&g(S.aoMap.channel),lightMapUv:ae&&g(S.lightMap.channel),bumpMapUv:ce&&g(S.bumpMap.channel),normalMapUv:Ae&&g(S.normalMap.channel),displacementMapUv:le&&g(S.displacementMap.channel),emissiveMapUv:Te&&g(S.emissiveMap.channel),metalnessMapUv:ue&&g(S.metalnessMap.channel),roughnessMapUv:P&&g(S.roughnessMap.channel),anisotropyMapUv:fe&&g(S.anisotropyMap.channel),clearcoatMapUv:xe&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:Xe&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:De&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:ye&&g(S.sheenRoughnessMap.channel),specularMapUv:qe&&g(S.specularMap.channel),specularColorMapUv:Be&&g(S.specularColorMap.channel),specularIntensityMapUv:at&&g(S.specularIntensityMap.channel),transmissionMapUv:L&&g(S.transmissionMap.channel),thicknessMapUv:pe&&g(S.thicknessMap.channel),alphaMapUv:Q&&g(S.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Ae||y),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!G.attributes.uv&&(nt||Q),fog:!!O,useFog:S.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:ee,skinning:N.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:ge,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:mt,decodeVideoTexture:nt&&S.map.isVideoTexture===!0&&$e.getTransfer(S.map.colorSpace)===it,decodeVideoTextureEmissive:Te&&S.emissiveMap.isVideoTexture===!0&&$e.getTransfer(S.emissiveMap.colorSpace)===it,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Wn,flipSided:S.side===Xt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Oe&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Oe&&S.extensions.multiDraw===!0||be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Lt.vertexUv1s=l.has(1),Lt.vertexUv2s=l.has(2),Lt.vertexUv3s=l.has(3),l.clear(),Lt}function f(S){const v=[];if(S.shaderID?v.push(S.shaderID):(v.push(S.customVertexShaderID),v.push(S.customFragmentShaderID)),S.defines!==void 0)for(const R in S.defines)v.push(R),v.push(S.defines[R]);return S.isRawShaderMaterial===!1&&(b(v,S),T(v,S),v.push(i.outputColorSpace)),v.push(S.customProgramCacheKey),v.join()}function b(S,v){S.push(v.precision),S.push(v.outputColorSpace),S.push(v.envMapMode),S.push(v.envMapCubeUVHeight),S.push(v.mapUv),S.push(v.alphaMapUv),S.push(v.lightMapUv),S.push(v.aoMapUv),S.push(v.bumpMapUv),S.push(v.normalMapUv),S.push(v.displacementMapUv),S.push(v.emissiveMapUv),S.push(v.metalnessMapUv),S.push(v.roughnessMapUv),S.push(v.anisotropyMapUv),S.push(v.clearcoatMapUv),S.push(v.clearcoatNormalMapUv),S.push(v.clearcoatRoughnessMapUv),S.push(v.iridescenceMapUv),S.push(v.iridescenceThicknessMapUv),S.push(v.sheenColorMapUv),S.push(v.sheenRoughnessMapUv),S.push(v.specularMapUv),S.push(v.specularColorMapUv),S.push(v.specularIntensityMapUv),S.push(v.transmissionMapUv),S.push(v.thicknessMapUv),S.push(v.combine),S.push(v.fogExp2),S.push(v.sizeAttenuation),S.push(v.morphTargetsCount),S.push(v.morphAttributeCount),S.push(v.numDirLights),S.push(v.numPointLights),S.push(v.numSpotLights),S.push(v.numSpotLightMaps),S.push(v.numHemiLights),S.push(v.numRectAreaLights),S.push(v.numDirLightShadows),S.push(v.numPointLightShadows),S.push(v.numSpotLightShadows),S.push(v.numSpotLightShadowsWithMaps),S.push(v.numLightProbes),S.push(v.shadowMapType),S.push(v.toneMapping),S.push(v.numClippingPlanes),S.push(v.numClipIntersection),S.push(v.depthPacking)}function T(S,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),S.push(a.mask)}function x(S){const v=_[S.type];let R;if(v){const D=wn[v];R=H0.clone(D.uniforms)}else R=S.uniforms;return R}function M(S,v){let R;for(let D=0,N=u.length;D<N;D++){const O=u[D];if(O.cacheKey===v){R=O,++R.usedTimes;break}}return R===void 0&&(R=new pT(i,v,S,r),u.push(R)),R}function E(S){if(--S.usedTimes===0){const v=u.indexOf(S);u[v]=u[u.length-1],u.pop(),S.destroy()}}function w(S){c.remove(S)}function C(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:M,releaseProgram:E,releaseShaderCache:w,programs:u,dispose:C}}function xT(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function ST(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Hu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Wu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h,d,p,_,g,m){let f=i[e];return f===void 0?(f={id:h.id,object:h,geometry:d,material:p,groupOrder:_,renderOrder:h.renderOrder,z:g,group:m},i[e]=f):(f.id=h.id,f.object=h,f.geometry=d,f.material=p,f.groupOrder=_,f.renderOrder=h.renderOrder,f.z=g,f.group=m),e++,f}function a(h,d,p,_,g,m){const f=o(h,d,p,_,g,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):t.push(f)}function c(h,d,p,_,g,m){const f=o(h,d,p,_,g,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function l(h,d){t.length>1&&t.sort(h||ST),n.length>1&&n.sort(d||Hu),s.length>1&&s.sort(d||Hu)}function u(){for(let h=e,d=i.length;h<d;h++){const p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function yT(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new Wu,i.set(n,[o])):s>=r.length?(o=new Wu,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function MT(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new Ze};break;case"SpotLight":t={position:new z,direction:new z,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":t={color:new Ze,position:new z,halfWidth:new z,halfHeight:new z};break}return i[e.id]=t,t}}}function TT(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let ET=0;function bT(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function AT(i){const e=new MT,t=TT(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new z);const s=new z,r=new pt,o=new pt;function a(l){let u=0,h=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let p=0,_=0,g=0,m=0,f=0,b=0,T=0,x=0,M=0,E=0,w=0;l.sort(bT);for(let S=0,v=l.length;S<v;S++){const R=l[S],D=R.color,N=R.intensity,O=R.distance,G=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=D.r*N,h+=D.g*N,d+=D.b*N;else if(R.isLightProbe){for(let U=0;U<9;U++)n.probe[U].addScaledVector(R.sh.coefficients[U],N);w++}else if(R.isDirectionalLight){const U=e.get(R);if(U.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const W=R.shadow,B=t.get(R);B.shadowIntensity=W.intensity,B.shadowBias=W.bias,B.shadowNormalBias=W.normalBias,B.shadowRadius=W.radius,B.shadowMapSize=W.mapSize,n.directionalShadow[p]=B,n.directionalShadowMap[p]=G,n.directionalShadowMatrix[p]=R.shadow.matrix,b++}n.directional[p]=U,p++}else if(R.isSpotLight){const U=e.get(R);U.position.setFromMatrixPosition(R.matrixWorld),U.color.copy(D).multiplyScalar(N),U.distance=O,U.coneCos=Math.cos(R.angle),U.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),U.decay=R.decay,n.spot[g]=U;const W=R.shadow;if(R.map&&(n.spotLightMap[M]=R.map,M++,W.updateMatrices(R),R.castShadow&&E++),n.spotLightMatrix[g]=W.matrix,R.castShadow){const B=t.get(R);B.shadowIntensity=W.intensity,B.shadowBias=W.bias,B.shadowNormalBias=W.normalBias,B.shadowRadius=W.radius,B.shadowMapSize=W.mapSize,n.spotShadow[g]=B,n.spotShadowMap[g]=G,x++}g++}else if(R.isRectAreaLight){const U=e.get(R);U.color.copy(D).multiplyScalar(N),U.halfWidth.set(R.width*.5,0,0),U.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=U,m++}else if(R.isPointLight){const U=e.get(R);if(U.color.copy(R.color).multiplyScalar(R.intensity),U.distance=R.distance,U.decay=R.decay,R.castShadow){const W=R.shadow,B=t.get(R);B.shadowIntensity=W.intensity,B.shadowBias=W.bias,B.shadowNormalBias=W.normalBias,B.shadowRadius=W.radius,B.shadowMapSize=W.mapSize,B.shadowCameraNear=W.camera.near,B.shadowCameraFar=W.camera.far,n.pointShadow[_]=B,n.pointShadowMap[_]=G,n.pointShadowMatrix[_]=R.shadow.matrix,T++}n.point[_]=U,_++}else if(R.isHemisphereLight){const U=e.get(R);U.skyColor.copy(R.color).multiplyScalar(N),U.groundColor.copy(R.groundColor).multiplyScalar(N),n.hemi[f]=U,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=he.LTC_FLOAT_1,n.rectAreaLTC2=he.LTC_FLOAT_2):(n.rectAreaLTC1=he.LTC_HALF_1,n.rectAreaLTC2=he.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const C=n.hash;(C.directionalLength!==p||C.pointLength!==_||C.spotLength!==g||C.rectAreaLength!==m||C.hemiLength!==f||C.numDirectionalShadows!==b||C.numPointShadows!==T||C.numSpotShadows!==x||C.numSpotMaps!==M||C.numLightProbes!==w)&&(n.directional.length=p,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=f,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=x+M-E,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=w,C.directionalLength=p,C.pointLength=_,C.spotLength=g,C.rectAreaLength=m,C.hemiLength=f,C.numDirectionalShadows=b,C.numPointShadows=T,C.numSpotShadows=x,C.numSpotMaps=M,C.numLightProbes=w,n.version=ET++)}function c(l,u){let h=0,d=0,p=0,_=0,g=0;const m=u.matrixWorldInverse;for(let f=0,b=l.length;f<b;f++){const T=l[f];if(T.isDirectionalLight){const x=n.directional[h];x.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),h++}else if(T.isSpotLight){const x=n.spot[p];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),p++}else if(T.isRectAreaLight){const x=n.rectArea[_];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(T.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(T.width*.5,0,0),x.halfHeight.set(0,T.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),_++}else if(T.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),d++}else if(T.isHemisphereLight){const x=n.hemi[g];x.direction.setFromMatrixPosition(T.matrixWorld),x.direction.transformDirection(m),g++}}}return{setup:a,setupView:c,state:n}}function qu(i){const e=new AT(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function wT(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new qu(i),e.set(s,[a])):r>=o.length?(a=new qu(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const CT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,RT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function PT(i,e,t){let n=new _l;const s=new Ke,r=new Ke,o=new st,a=new Q0({depthPacking:u0}),c=new ex,l={},u=t.maxTextureSize,h={[pi]:Xt,[Xt]:pi,[Wn]:Wn},d=new mi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ke},radius:{value:4}},vertexShader:CT,fragmentShader:RT}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const _=new Hi;_.setAttribute("position",new Pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Rn(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qh;let f=this.type;this.render=function(E,w,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const S=i.getRenderTarget(),v=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),D=i.state;D.setBlending(hi),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const N=f!==Gn&&this.type===Gn,O=f===Gn&&this.type!==Gn;for(let G=0,U=E.length;G<U;G++){const W=E[G],B=W.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const j=B.getFrameExtents();if(s.multiply(j),r.copy(B.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/j.x),s.x=r.x*j.x,B.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/j.y),s.y=r.y*j.y,B.mapSize.y=r.y)),B.map===null||N===!0||O===!0){const ne=this.type!==Gn?{minFilter:Mn,magFilter:Mn}:{};B.map!==null&&B.map.dispose(),B.map=new Bi(s.x,s.y,ne),B.map.texture.name=W.name+".shadowMap",B.camera.updateProjectionMatrix()}i.setRenderTarget(B.map),i.clear();const J=B.getViewportCount();for(let ne=0;ne<J;ne++){const ge=B.getViewport(ne);o.set(r.x*ge.x,r.y*ge.y,r.x*ge.z,r.y*ge.w),D.viewport(o),B.updateMatrices(W,ne),n=B.getFrustum(),x(w,C,B.camera,W,this.type)}B.isPointLightShadow!==!0&&this.type===Gn&&b(B,C),B.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(S,v,R)};function b(E,w){const C=e.update(g);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Bi(s.x,s.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(w,null,C,d,g,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(w,null,C,p,g,null)}function T(E,w,C,S){let v=null;const R=C.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)v=R;else if(v=C.isPointLight===!0?c:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const D=v.uuid,N=w.uuid;let O=l[D];O===void 0&&(O={},l[D]=O);let G=O[N];G===void 0&&(G=v.clone(),O[N]=G,w.addEventListener("dispose",M)),v=G}if(v.visible=w.visible,v.wireframe=w.wireframe,S===Gn?v.side=w.shadowSide!==null?w.shadowSide:w.side:v.side=w.shadowSide!==null?w.shadowSide:h[w.side],v.alphaMap=w.alphaMap,v.alphaTest=w.alphaTest,v.map=w.map,v.clipShadows=w.clipShadows,v.clippingPlanes=w.clippingPlanes,v.clipIntersection=w.clipIntersection,v.displacementMap=w.displacementMap,v.displacementScale=w.displacementScale,v.displacementBias=w.displacementBias,v.wireframeLinewidth=w.wireframeLinewidth,v.linewidth=w.linewidth,C.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const D=i.properties.get(v);D.light=C}return v}function x(E,w,C,S,v){if(E.visible===!1)return;if(E.layers.test(w.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&v===Gn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,E.matrixWorld);const N=e.update(E),O=E.material;if(Array.isArray(O)){const G=N.groups;for(let U=0,W=G.length;U<W;U++){const B=G[U],j=O[B.materialIndex];if(j&&j.visible){const J=T(E,j,S,v);E.onBeforeShadow(i,E,w,C,N,J,B),i.renderBufferDirect(C,null,N,J,E,B),E.onAfterShadow(i,E,w,C,N,J,B)}}}else if(O.visible){const G=T(E,O,S,v);E.onBeforeShadow(i,E,w,C,N,G,null),i.renderBufferDirect(C,null,N,G,E,null),E.onAfterShadow(i,E,w,C,N,G,null)}}const D=E.children;for(let N=0,O=D.length;N<O;N++)x(D[N],w,C,S,v)}function M(E){E.target.removeEventListener("dispose",M);for(const C in l){const S=l[C],v=E.target.uuid;v in S&&(S[v].dispose(),delete S[v])}}}const DT={[Oa]:Ua,[Fa]:Va,[ka]:za,[Ts]:Ba,[Ua]:Oa,[Va]:Fa,[za]:ka,[Ba]:Ts};function IT(i,e){function t(){let L=!1;const pe=new st;let X=null;const Q=new st(0,0,0,0);return{setMask:function(_e){X!==_e&&!L&&(i.colorMask(_e,_e,_e,_e),X=_e)},setLocked:function(_e){L=_e},setClear:function(_e,me,Oe,mt,Lt){Lt===!0&&(_e*=mt,me*=mt,Oe*=mt),pe.set(_e,me,Oe,mt),Q.equals(pe)===!1&&(i.clearColor(_e,me,Oe,mt),Q.copy(pe))},reset:function(){L=!1,X=null,Q.set(-1,0,0,0)}}}function n(){let L=!1,pe=!1,X=null,Q=null,_e=null;return{setReversed:function(me){if(pe!==me){const Oe=e.get("EXT_clip_control");me?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),pe=me;const mt=_e;_e=null,this.setClear(mt)}},getReversed:function(){return pe},setTest:function(me){me?se(i.DEPTH_TEST):ee(i.DEPTH_TEST)},setMask:function(me){X!==me&&!L&&(i.depthMask(me),X=me)},setFunc:function(me){if(pe&&(me=DT[me]),Q!==me){switch(me){case Oa:i.depthFunc(i.NEVER);break;case Ua:i.depthFunc(i.ALWAYS);break;case Fa:i.depthFunc(i.LESS);break;case Ts:i.depthFunc(i.LEQUAL);break;case ka:i.depthFunc(i.EQUAL);break;case Ba:i.depthFunc(i.GEQUAL);break;case Va:i.depthFunc(i.GREATER);break;case za:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=me}},setLocked:function(me){L=me},setClear:function(me){_e!==me&&(pe&&(me=1-me),i.clearDepth(me),_e=me)},reset:function(){L=!1,X=null,Q=null,_e=null,pe=!1}}}function s(){let L=!1,pe=null,X=null,Q=null,_e=null,me=null,Oe=null,mt=null,Lt=null;return{setTest:function(tt){L||(tt?se(i.STENCIL_TEST):ee(i.STENCIL_TEST))},setMask:function(tt){pe!==tt&&!L&&(i.stencilMask(tt),pe=tt)},setFunc:function(tt,dn,Un){(X!==tt||Q!==dn||_e!==Un)&&(i.stencilFunc(tt,dn,Un),X=tt,Q=dn,_e=Un)},setOp:function(tt,dn,Un){(me!==tt||Oe!==dn||mt!==Un)&&(i.stencilOp(tt,dn,Un),me=tt,Oe=dn,mt=Un)},setLocked:function(tt){L=tt},setClear:function(tt){Lt!==tt&&(i.clearStencil(tt),Lt=tt)},reset:function(){L=!1,pe=null,X=null,Q=null,_e=null,me=null,Oe=null,mt=null,Lt=null}}}const r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let u={},h={},d=new WeakMap,p=[],_=null,g=!1,m=null,f=null,b=null,T=null,x=null,M=null,E=null,w=new Ze(0,0,0),C=0,S=!1,v=null,R=null,D=null,N=null,O=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,W=0;const B=i.getParameter(i.VERSION);B.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(B)[1]),U=W>=1):B.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),U=W>=2);let j=null,J={};const ne=i.getParameter(i.SCISSOR_BOX),ge=i.getParameter(i.VIEWPORT),Le=new st().fromArray(ne),Y=new st().fromArray(ge);function $(L,pe,X,Q){const _e=new Uint8Array(4),me=i.createTexture();i.bindTexture(L,me),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Oe=0;Oe<X;Oe++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(pe,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,_e):i.texImage2D(pe+Oe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,_e);return me}const oe={};oe[i.TEXTURE_2D]=$(i.TEXTURE_2D,i.TEXTURE_2D,1),oe[i.TEXTURE_CUBE_MAP]=$(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[i.TEXTURE_2D_ARRAY]=$(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),oe[i.TEXTURE_3D]=$(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(i.DEPTH_TEST),o.setFunc(Ts),ce(!1),Ae(Yl),se(i.CULL_FACE),I(hi);function se(L){u[L]!==!0&&(i.enable(L),u[L]=!0)}function ee(L){u[L]!==!1&&(i.disable(L),u[L]=!1)}function ze(L,pe){return h[L]!==pe?(i.bindFramebuffer(L,pe),h[L]=pe,L===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=pe),L===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=pe),!0):!1}function be(L,pe){let X=p,Q=!1;if(L){X=d.get(pe),X===void 0&&(X=[],d.set(pe,X));const _e=L.textures;if(X.length!==_e.length||X[0]!==i.COLOR_ATTACHMENT0){for(let me=0,Oe=_e.length;me<Oe;me++)X[me]=i.COLOR_ATTACHMENT0+me;X.length=_e.length,Q=!0}}else X[0]!==i.BACK&&(X[0]=i.BACK,Q=!0);Q&&i.drawBuffers(X)}function nt(L){return _!==L?(i.useProgram(L),_=L,!0):!1}const Je={[Ri]:i.FUNC_ADD,[Uv]:i.FUNC_SUBTRACT,[Fv]:i.FUNC_REVERSE_SUBTRACT};Je[kv]=i.MIN,Je[Bv]=i.MAX;const Ge={[Vv]:i.ZERO,[zv]:i.ONE,[Gv]:i.SRC_COLOR,[Na]:i.SRC_ALPHA,[jv]:i.SRC_ALPHA_SATURATE,[Xv]:i.DST_COLOR,[Wv]:i.DST_ALPHA,[Hv]:i.ONE_MINUS_SRC_COLOR,[La]:i.ONE_MINUS_SRC_ALPHA,[Yv]:i.ONE_MINUS_DST_COLOR,[qv]:i.ONE_MINUS_DST_ALPHA,[$v]:i.CONSTANT_COLOR,[Zv]:i.ONE_MINUS_CONSTANT_COLOR,[Kv]:i.CONSTANT_ALPHA,[Jv]:i.ONE_MINUS_CONSTANT_ALPHA};function I(L,pe,X,Q,_e,me,Oe,mt,Lt,tt){if(L===hi){g===!0&&(ee(i.BLEND),g=!1);return}if(g===!1&&(se(i.BLEND),g=!0),L!==Ov){if(L!==m||tt!==S){if((f!==Ri||x!==Ri)&&(i.blendEquation(i.FUNC_ADD),f=Ri,x=Ri),tt)switch(L){case fs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case jl:i.blendFunc(i.ONE,i.ONE);break;case $l:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Zl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case fs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case jl:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case $l:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Zl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}b=null,T=null,M=null,E=null,w.set(0,0,0),C=0,m=L,S=tt}return}_e=_e||pe,me=me||X,Oe=Oe||Q,(pe!==f||_e!==x)&&(i.blendEquationSeparate(Je[pe],Je[_e]),f=pe,x=_e),(X!==b||Q!==T||me!==M||Oe!==E)&&(i.blendFuncSeparate(Ge[X],Ge[Q],Ge[me],Ge[Oe]),b=X,T=Q,M=me,E=Oe),(mt.equals(w)===!1||Lt!==C)&&(i.blendColor(mt.r,mt.g,mt.b,Lt),w.copy(mt),C=Lt),m=L,S=!1}function ae(L,pe){L.side===Wn?ee(i.CULL_FACE):se(i.CULL_FACE);let X=L.side===Xt;pe&&(X=!X),ce(X),L.blending===fs&&L.transparent===!1?I(hi):I(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),r.setMask(L.colorWrite);const Q=L.stencilWrite;a.setTest(Q),Q&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Te(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?se(i.SAMPLE_ALPHA_TO_COVERAGE):ee(i.SAMPLE_ALPHA_TO_COVERAGE)}function ce(L){v!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),v=L)}function Ae(L){L!==Iv?(se(i.CULL_FACE),L!==R&&(L===Yl?i.cullFace(i.BACK):L===Nv?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ee(i.CULL_FACE),R=L}function le(L){L!==D&&(U&&i.lineWidth(L),D=L)}function Te(L,pe,X){L?(se(i.POLYGON_OFFSET_FILL),(N!==pe||O!==X)&&(i.polygonOffset(pe,X),N=pe,O=X)):ee(i.POLYGON_OFFSET_FILL)}function ue(L){L?se(i.SCISSOR_TEST):ee(i.SCISSOR_TEST)}function P(L){L===void 0&&(L=i.TEXTURE0+G-1),j!==L&&(i.activeTexture(L),j=L)}function y(L,pe,X){X===void 0&&(j===null?X=i.TEXTURE0+G-1:X=j);let Q=J[X];Q===void 0&&(Q={type:void 0,texture:void 0},J[X]=Q),(Q.type!==L||Q.texture!==pe)&&(j!==X&&(i.activeTexture(X),j=X),i.bindTexture(L,pe||oe[L]),Q.type=L,Q.texture=pe)}function V(){const L=J[j];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function K(){try{i.compressedTexImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function te(){try{i.compressedTexImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{i.texSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{i.texSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function fe(){try{i.compressedTexSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function xe(){try{i.compressedTexSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Xe(){try{i.texStorage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function re(){try{i.texStorage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Se(){try{i.texImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Re(){try{i.texImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function De(L){Le.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),Le.copy(L))}function ye(L){Y.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),Y.copy(L))}function qe(L,pe){let X=l.get(pe);X===void 0&&(X=new WeakMap,l.set(pe,X));let Q=X.get(L);Q===void 0&&(Q=i.getUniformBlockIndex(pe,L.name),X.set(L,Q))}function Be(L,pe){const Q=l.get(pe).get(L);c.get(pe)!==Q&&(i.uniformBlockBinding(pe,Q,L.__bindingPointIndex),c.set(pe,Q))}function at(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},j=null,J={},h={},d=new WeakMap,p=[],_=null,g=!1,m=null,f=null,b=null,T=null,x=null,M=null,E=null,w=new Ze(0,0,0),C=0,S=!1,v=null,R=null,D=null,N=null,O=null,Le.set(0,0,i.canvas.width,i.canvas.height),Y.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:se,disable:ee,bindFramebuffer:ze,drawBuffers:be,useProgram:nt,setBlending:I,setMaterial:ae,setFlipSided:ce,setCullFace:Ae,setLineWidth:le,setPolygonOffset:Te,setScissorTest:ue,activeTexture:P,bindTexture:y,unbindTexture:V,compressedTexImage2D:K,compressedTexImage3D:te,texImage2D:Se,texImage3D:Re,updateUBOMapping:qe,uniformBlockBinding:Be,texStorage2D:Xe,texStorage3D:re,texSubImage2D:Z,texSubImage3D:Ee,compressedTexSubImage2D:fe,compressedTexSubImage3D:xe,scissor:De,viewport:ye,reset:at}}function NT(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ke,u=new WeakMap;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,y){return p?new OffscreenCanvas(P,y):_o("canvas")}function g(P,y,V){let K=1;const te=ue(P);if((te.width>V||te.height>V)&&(K=V/Math.max(te.width,te.height)),K<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Z=Math.floor(K*te.width),Ee=Math.floor(K*te.height);h===void 0&&(h=_(Z,Ee));const fe=y?_(Z,Ee):h;return fe.width=Z,fe.height=Ee,fe.getContext("2d").drawImage(P,0,0,Z,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+Z+"x"+Ee+")."),fe}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),P;return P}function m(P){return P.generateMipmaps}function f(P){i.generateMipmap(P)}function b(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(P,y,V,K,te=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Z=y;if(y===i.RED&&(V===i.FLOAT&&(Z=i.R32F),V===i.HALF_FLOAT&&(Z=i.R16F),V===i.UNSIGNED_BYTE&&(Z=i.R8)),y===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.R8UI),V===i.UNSIGNED_SHORT&&(Z=i.R16UI),V===i.UNSIGNED_INT&&(Z=i.R32UI),V===i.BYTE&&(Z=i.R8I),V===i.SHORT&&(Z=i.R16I),V===i.INT&&(Z=i.R32I)),y===i.RG&&(V===i.FLOAT&&(Z=i.RG32F),V===i.HALF_FLOAT&&(Z=i.RG16F),V===i.UNSIGNED_BYTE&&(Z=i.RG8)),y===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RG8UI),V===i.UNSIGNED_SHORT&&(Z=i.RG16UI),V===i.UNSIGNED_INT&&(Z=i.RG32UI),V===i.BYTE&&(Z=i.RG8I),V===i.SHORT&&(Z=i.RG16I),V===i.INT&&(Z=i.RG32I)),y===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),V===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),V===i.UNSIGNED_INT&&(Z=i.RGB32UI),V===i.BYTE&&(Z=i.RGB8I),V===i.SHORT&&(Z=i.RGB16I),V===i.INT&&(Z=i.RGB32I)),y===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),V===i.UNSIGNED_INT&&(Z=i.RGBA32UI),V===i.BYTE&&(Z=i.RGBA8I),V===i.SHORT&&(Z=i.RGBA16I),V===i.INT&&(Z=i.RGBA32I)),y===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),y===i.RGBA){const Ee=te?po:$e.getTransfer(K);V===i.FLOAT&&(Z=i.RGBA32F),V===i.HALF_FLOAT&&(Z=i.RGBA16F),V===i.UNSIGNED_BYTE&&(Z=Ee===it?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function x(P,y){let V;return P?y===null||y===ki||y===Ks?V=i.DEPTH24_STENCIL8:y===qn?V=i.DEPTH32F_STENCIL8:y===Zs&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===ki||y===Ks?V=i.DEPTH_COMPONENT24:y===qn?V=i.DEPTH_COMPONENT32F:y===Zs&&(V=i.DEPTH_COMPONENT16),V}function M(P,y){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Mn&&P.minFilter!==Cn?Math.log2(Math.max(y.width,y.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?y.mipmaps.length:1}function E(P){const y=P.target;y.removeEventListener("dispose",E),C(y),y.isVideoTexture&&u.delete(y)}function w(P){const y=P.target;y.removeEventListener("dispose",w),v(y)}function C(P){const y=n.get(P);if(y.__webglInit===void 0)return;const V=P.source,K=d.get(V);if(K){const te=K[y.__cacheKey];te.usedTimes--,te.usedTimes===0&&S(P),Object.keys(K).length===0&&d.delete(V)}n.remove(P)}function S(P){const y=n.get(P);i.deleteTexture(y.__webglTexture);const V=P.source,K=d.get(V);delete K[y.__cacheKey],o.memory.textures--}function v(P){const y=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(y.__webglFramebuffer[K]))for(let te=0;te<y.__webglFramebuffer[K].length;te++)i.deleteFramebuffer(y.__webglFramebuffer[K][te]);else i.deleteFramebuffer(y.__webglFramebuffer[K]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[K])}else{if(Array.isArray(y.__webglFramebuffer))for(let K=0;K<y.__webglFramebuffer.length;K++)i.deleteFramebuffer(y.__webglFramebuffer[K]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let K=0;K<y.__webglColorRenderbuffer.length;K++)y.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[K]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const V=P.textures;for(let K=0,te=V.length;K<te;K++){const Z=n.get(V[K]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(V[K])}n.remove(P)}let R=0;function D(){R=0}function N(){const P=R;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),R+=1,P}function O(P){const y=[];return y.push(P.wrapS),y.push(P.wrapT),y.push(P.wrapR||0),y.push(P.magFilter),y.push(P.minFilter),y.push(P.anisotropy),y.push(P.internalFormat),y.push(P.format),y.push(P.type),y.push(P.generateMipmaps),y.push(P.premultiplyAlpha),y.push(P.flipY),y.push(P.unpackAlignment),y.push(P.colorSpace),y.join()}function G(P,y){const V=n.get(P);if(P.isVideoTexture&&le(P),P.isRenderTargetTexture===!1&&P.version>0&&V.__version!==P.version){const K=P.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(V,P,y);return}}t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+y)}function U(P,y){const V=n.get(P);if(P.version>0&&V.__version!==P.version){Y(V,P,y);return}t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+y)}function W(P,y){const V=n.get(P);if(P.version>0&&V.__version!==P.version){Y(V,P,y);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+y)}function B(P,y){const V=n.get(P);if(P.version>0&&V.__version!==P.version){$(V,P,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+y)}const j={[Wa]:i.REPEAT,[Di]:i.CLAMP_TO_EDGE,[qa]:i.MIRRORED_REPEAT},J={[Mn]:i.NEAREST,[c0]:i.NEAREST_MIPMAP_NEAREST,[Tr]:i.NEAREST_MIPMAP_LINEAR,[Cn]:i.LINEAR,[Ho]:i.LINEAR_MIPMAP_NEAREST,[Ii]:i.LINEAR_MIPMAP_LINEAR},ne={[d0]:i.NEVER,[v0]:i.ALWAYS,[f0]:i.LESS,[dd]:i.LEQUAL,[p0]:i.EQUAL,[g0]:i.GEQUAL,[m0]:i.GREATER,[_0]:i.NOTEQUAL};function ge(P,y){if(y.type===qn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Cn||y.magFilter===Ho||y.magFilter===Tr||y.magFilter===Ii||y.minFilter===Cn||y.minFilter===Ho||y.minFilter===Tr||y.minFilter===Ii)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,j[y.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,j[y.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,j[y.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,J[y.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,J[y.minFilter]),y.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,ne[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Mn||y.minFilter!==Tr&&y.minFilter!==Ii||y.type===qn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Le(P,y){let V=!1;P.__webglInit===void 0&&(P.__webglInit=!0,y.addEventListener("dispose",E));const K=y.source;let te=d.get(K);te===void 0&&(te={},d.set(K,te));const Z=O(y);if(Z!==P.__cacheKey){te[Z]===void 0&&(te[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),te[Z].usedTimes++;const Ee=te[P.__cacheKey];Ee!==void 0&&(te[P.__cacheKey].usedTimes--,Ee.usedTimes===0&&S(y)),P.__cacheKey=Z,P.__webglTexture=te[Z].texture}return V}function Y(P,y,V){let K=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(K=i.TEXTURE_3D);const te=Le(P,y),Z=y.source;t.bindTexture(K,P.__webglTexture,i.TEXTURE0+V);const Ee=n.get(Z);if(Z.version!==Ee.__version||te===!0){t.activeTexture(i.TEXTURE0+V);const fe=$e.getPrimaries($e.workingColorSpace),xe=y.colorSpace===li?null:$e.getPrimaries(y.colorSpace),Xe=y.colorSpace===li||fe===xe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xe);let re=g(y.image,!1,s.maxTextureSize);re=Te(y,re);const Se=r.convert(y.format,y.colorSpace),Re=r.convert(y.type);let De=T(y.internalFormat,Se,Re,y.colorSpace,y.isVideoTexture);ge(K,y);let ye;const qe=y.mipmaps,Be=y.isVideoTexture!==!0,at=Ee.__version===void 0||te===!0,L=Z.dataReady,pe=M(y,re);if(y.isDepthTexture)De=x(y.format===Qs,y.type),at&&(Be?t.texStorage2D(i.TEXTURE_2D,1,De,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,De,re.width,re.height,0,Se,Re,null));else if(y.isDataTexture)if(qe.length>0){Be&&at&&t.texStorage2D(i.TEXTURE_2D,pe,De,qe[0].width,qe[0].height);for(let X=0,Q=qe.length;X<Q;X++)ye=qe[X],Be?L&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,ye.width,ye.height,Se,Re,ye.data):t.texImage2D(i.TEXTURE_2D,X,De,ye.width,ye.height,0,Se,Re,ye.data);y.generateMipmaps=!1}else Be?(at&&t.texStorage2D(i.TEXTURE_2D,pe,De,re.width,re.height),L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,re.width,re.height,Se,Re,re.data)):t.texImage2D(i.TEXTURE_2D,0,De,re.width,re.height,0,Se,Re,re.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Be&&at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,De,qe[0].width,qe[0].height,re.depth);for(let X=0,Q=qe.length;X<Q;X++)if(ye=qe[X],y.format!==Sn)if(Se!==null)if(Be){if(L)if(y.layerUpdates.size>0){const _e=yu(ye.width,ye.height,y.format,y.type);for(const me of y.layerUpdates){const Oe=ye.data.subarray(me*_e/ye.data.BYTES_PER_ELEMENT,(me+1)*_e/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,me,ye.width,ye.height,1,Se,Oe)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,ye.width,ye.height,re.depth,Se,ye.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,X,De,ye.width,ye.height,re.depth,0,ye.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?L&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,ye.width,ye.height,re.depth,Se,Re,ye.data):t.texImage3D(i.TEXTURE_2D_ARRAY,X,De,ye.width,ye.height,re.depth,0,Se,Re,ye.data)}else{Be&&at&&t.texStorage2D(i.TEXTURE_2D,pe,De,qe[0].width,qe[0].height);for(let X=0,Q=qe.length;X<Q;X++)ye=qe[X],y.format!==Sn?Se!==null?Be?L&&t.compressedTexSubImage2D(i.TEXTURE_2D,X,0,0,ye.width,ye.height,Se,ye.data):t.compressedTexImage2D(i.TEXTURE_2D,X,De,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?L&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,ye.width,ye.height,Se,Re,ye.data):t.texImage2D(i.TEXTURE_2D,X,De,ye.width,ye.height,0,Se,Re,ye.data)}else if(y.isDataArrayTexture)if(Be){if(at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,De,re.width,re.height,re.depth),L)if(y.layerUpdates.size>0){const X=yu(re.width,re.height,y.format,y.type);for(const Q of y.layerUpdates){const _e=re.data.subarray(Q*X/re.data.BYTES_PER_ELEMENT,(Q+1)*X/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,re.width,re.height,1,Se,Re,_e)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,Se,Re,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,De,re.width,re.height,re.depth,0,Se,Re,re.data);else if(y.isData3DTexture)Be?(at&&t.texStorage3D(i.TEXTURE_3D,pe,De,re.width,re.height,re.depth),L&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,Se,Re,re.data)):t.texImage3D(i.TEXTURE_3D,0,De,re.width,re.height,re.depth,0,Se,Re,re.data);else if(y.isFramebufferTexture){if(at)if(Be)t.texStorage2D(i.TEXTURE_2D,pe,De,re.width,re.height);else{let X=re.width,Q=re.height;for(let _e=0;_e<pe;_e++)t.texImage2D(i.TEXTURE_2D,_e,De,X,Q,0,Se,Re,null),X>>=1,Q>>=1}}else if(qe.length>0){if(Be&&at){const X=ue(qe[0]);t.texStorage2D(i.TEXTURE_2D,pe,De,X.width,X.height)}for(let X=0,Q=qe.length;X<Q;X++)ye=qe[X],Be?L&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,Se,Re,ye):t.texImage2D(i.TEXTURE_2D,X,De,Se,Re,ye);y.generateMipmaps=!1}else if(Be){if(at){const X=ue(re);t.texStorage2D(i.TEXTURE_2D,pe,De,X.width,X.height)}L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Se,Re,re)}else t.texImage2D(i.TEXTURE_2D,0,De,Se,Re,re);m(y)&&f(K),Ee.__version=Z.version,y.onUpdate&&y.onUpdate(y)}P.__version=y.version}function $(P,y,V){if(y.image.length!==6)return;const K=Le(P,y),te=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+V);const Z=n.get(te);if(te.version!==Z.__version||K===!0){t.activeTexture(i.TEXTURE0+V);const Ee=$e.getPrimaries($e.workingColorSpace),fe=y.colorSpace===li?null:$e.getPrimaries(y.colorSpace),xe=y.colorSpace===li||Ee===fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const Xe=y.isCompressedTexture||y.image[0].isCompressedTexture,re=y.image[0]&&y.image[0].isDataTexture,Se=[];for(let Q=0;Q<6;Q++)!Xe&&!re?Se[Q]=g(y.image[Q],!0,s.maxCubemapSize):Se[Q]=re?y.image[Q].image:y.image[Q],Se[Q]=Te(y,Se[Q]);const Re=Se[0],De=r.convert(y.format,y.colorSpace),ye=r.convert(y.type),qe=T(y.internalFormat,De,ye,y.colorSpace),Be=y.isVideoTexture!==!0,at=Z.__version===void 0||K===!0,L=te.dataReady;let pe=M(y,Re);ge(i.TEXTURE_CUBE_MAP,y);let X;if(Xe){Be&&at&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,qe,Re.width,Re.height);for(let Q=0;Q<6;Q++){X=Se[Q].mipmaps;for(let _e=0;_e<X.length;_e++){const me=X[_e];y.format!==Sn?De!==null?Be?L&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,_e,0,0,me.width,me.height,De,me.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,_e,qe,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Be?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,_e,0,0,me.width,me.height,De,ye,me.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,_e,qe,me.width,me.height,0,De,ye,me.data)}}}else{if(X=y.mipmaps,Be&&at){X.length>0&&pe++;const Q=ue(Se[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,qe,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(re){Be?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Se[Q].width,Se[Q].height,De,ye,Se[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,qe,Se[Q].width,Se[Q].height,0,De,ye,Se[Q].data);for(let _e=0;_e<X.length;_e++){const Oe=X[_e].image[Q].image;Be?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,_e+1,0,0,Oe.width,Oe.height,De,ye,Oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,_e+1,qe,Oe.width,Oe.height,0,De,ye,Oe.data)}}else{Be?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,De,ye,Se[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,qe,De,ye,Se[Q]);for(let _e=0;_e<X.length;_e++){const me=X[_e];Be?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,_e+1,0,0,De,ye,me.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,_e+1,qe,De,ye,me.image[Q])}}}m(y)&&f(i.TEXTURE_CUBE_MAP),Z.__version=te.version,y.onUpdate&&y.onUpdate(y)}P.__version=y.version}function oe(P,y,V,K,te,Z){const Ee=r.convert(V.format,V.colorSpace),fe=r.convert(V.type),xe=T(V.internalFormat,Ee,fe,V.colorSpace),Xe=n.get(y),re=n.get(V);if(re.__renderTarget=y,!Xe.__hasExternalTextures){const Se=Math.max(1,y.width>>Z),Re=Math.max(1,y.height>>Z);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,Z,xe,Se,Re,y.depth,0,Ee,fe,null):t.texImage2D(te,Z,xe,Se,Re,0,Ee,fe,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),Ae(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,te,re.__webglTexture,0,ce(y)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,te,re.__webglTexture,Z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function se(P,y,V){if(i.bindRenderbuffer(i.RENDERBUFFER,P),y.depthBuffer){const K=y.depthTexture,te=K&&K.isDepthTexture?K.type:null,Z=x(y.stencilBuffer,te),Ee=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=ce(y);Ae(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,fe,Z,y.width,y.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,fe,Z,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,Z,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ee,i.RENDERBUFFER,P)}else{const K=y.textures;for(let te=0;te<K.length;te++){const Z=K[te],Ee=r.convert(Z.format,Z.colorSpace),fe=r.convert(Z.type),xe=T(Z.internalFormat,Ee,fe,Z.colorSpace),Xe=ce(y);V&&Ae(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Xe,xe,y.width,y.height):Ae(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Xe,xe,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,xe,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ee(P,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(y.depthTexture);K.__renderTarget=y,(!K.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),G(y.depthTexture,0);const te=K.__webglTexture,Z=ce(y);if(y.depthTexture.format===Js)Ae(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0);else if(y.depthTexture.format===Qs)Ae(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function ze(P){const y=n.get(P),V=P.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==P.depthTexture){const K=P.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),K){const te=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,K.removeEventListener("dispose",te)};K.addEventListener("dispose",te),y.__depthDisposeCallback=te}y.__boundDepthTexture=K}if(P.depthTexture&&!y.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");ee(y.__webglFramebuffer,P)}else if(V){y.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[K]),y.__webglDepthbuffer[K]===void 0)y.__webglDepthbuffer[K]=i.createRenderbuffer(),se(y.__webglDepthbuffer[K],P,!1);else{const te=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=y.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,Z)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),se(y.__webglDepthbuffer,P,!1);else{const K=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,te)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function be(P,y,V){const K=n.get(P);y!==void 0&&oe(K.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&ze(P)}function nt(P){const y=P.texture,V=n.get(P),K=n.get(y);P.addEventListener("dispose",w);const te=P.textures,Z=P.isWebGLCubeRenderTarget===!0,Ee=te.length>1;if(Ee||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=y.version,o.memory.textures++),Z){V.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer[fe]=[];for(let xe=0;xe<y.mipmaps.length;xe++)V.__webglFramebuffer[fe][xe]=i.createFramebuffer()}else V.__webglFramebuffer[fe]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer=[];for(let fe=0;fe<y.mipmaps.length;fe++)V.__webglFramebuffer[fe]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(Ee)for(let fe=0,xe=te.length;fe<xe;fe++){const Xe=n.get(te[fe]);Xe.__webglTexture===void 0&&(Xe.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&Ae(P)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let fe=0;fe<te.length;fe++){const xe=te[fe];V.__webglColorRenderbuffer[fe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[fe]);const Xe=r.convert(xe.format,xe.colorSpace),re=r.convert(xe.type),Se=T(xe.internalFormat,Xe,re,xe.colorSpace,P.isXRRenderTarget===!0),Re=ce(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Re,Se,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,V.__webglColorRenderbuffer[fe])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),se(V.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),ge(i.TEXTURE_CUBE_MAP,y);for(let fe=0;fe<6;fe++)if(y.mipmaps&&y.mipmaps.length>0)for(let xe=0;xe<y.mipmaps.length;xe++)oe(V.__webglFramebuffer[fe][xe],P,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,xe);else oe(V.__webglFramebuffer[fe],P,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);m(y)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let fe=0,xe=te.length;fe<xe;fe++){const Xe=te[fe],re=n.get(Xe);t.bindTexture(i.TEXTURE_2D,re.__webglTexture),ge(i.TEXTURE_2D,Xe),oe(V.__webglFramebuffer,P,Xe,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,0),m(Xe)&&f(i.TEXTURE_2D)}t.unbindTexture()}else{let fe=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(fe=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(fe,K.__webglTexture),ge(fe,y),y.mipmaps&&y.mipmaps.length>0)for(let xe=0;xe<y.mipmaps.length;xe++)oe(V.__webglFramebuffer[xe],P,y,i.COLOR_ATTACHMENT0,fe,xe);else oe(V.__webglFramebuffer,P,y,i.COLOR_ATTACHMENT0,fe,0);m(y)&&f(fe),t.unbindTexture()}P.depthBuffer&&ze(P)}function Je(P){const y=P.textures;for(let V=0,K=y.length;V<K;V++){const te=y[V];if(m(te)){const Z=b(P),Ee=n.get(te).__webglTexture;t.bindTexture(Z,Ee),f(Z),t.unbindTexture()}}}const Ge=[],I=[];function ae(P){if(P.samples>0){if(Ae(P)===!1){const y=P.textures,V=P.width,K=P.height;let te=i.COLOR_BUFFER_BIT;const Z=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ee=n.get(P),fe=y.length>1;if(fe)for(let xe=0;xe<y.length;xe++)t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let xe=0;xe<y.length;xe++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),fe){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ee.__webglColorRenderbuffer[xe]);const Xe=n.get(y[xe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Xe,0)}i.blitFramebuffer(0,0,V,K,0,0,V,K,te,i.NEAREST),c===!0&&(Ge.length=0,I.length=0,Ge.push(i.COLOR_ATTACHMENT0+xe),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Ge.push(Z),I.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,I)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ge))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),fe)for(let xe=0;xe<y.length;xe++){t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,Ee.__webglColorRenderbuffer[xe]);const Xe=n.get(y[xe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,Xe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const y=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function ce(P){return Math.min(s.maxSamples,P.samples)}function Ae(P){const y=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function le(P){const y=o.render.frame;u.get(P)!==y&&(u.set(P,y),P.update())}function Te(P,y){const V=P.colorSpace,K=P.format,te=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||V!==As&&V!==li&&($e.getTransfer(V)===it?(K!==Sn||te!==Kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),y}function ue(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=D,this.setTexture2D=G,this.setTexture2DArray=U,this.setTexture3D=W,this.setTextureCube=B,this.rebindTextures=be,this.setupRenderTarget=nt,this.updateRenderTargetMipmap=Je,this.updateMultisampleRenderTarget=ae,this.setupDepthRenderbuffer=ze,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=Ae}function LT(i,e){function t(n,s=li){let r;const o=$e.getTransfer(s);if(n===Kn)return i.UNSIGNED_BYTE;if(n===ll)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ul)return i.UNSIGNED_SHORT_5_5_5_1;if(n===id)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===td)return i.BYTE;if(n===nd)return i.SHORT;if(n===Zs)return i.UNSIGNED_SHORT;if(n===cl)return i.INT;if(n===ki)return i.UNSIGNED_INT;if(n===qn)return i.FLOAT;if(n===dr)return i.HALF_FLOAT;if(n===sd)return i.ALPHA;if(n===rd)return i.RGB;if(n===Sn)return i.RGBA;if(n===od)return i.LUMINANCE;if(n===ad)return i.LUMINANCE_ALPHA;if(n===Js)return i.DEPTH_COMPONENT;if(n===Qs)return i.DEPTH_STENCIL;if(n===cd)return i.RED;if(n===hl)return i.RED_INTEGER;if(n===ld)return i.RG;if(n===dl)return i.RG_INTEGER;if(n===fl)return i.RGBA_INTEGER;if(n===jr||n===$r||n===Zr||n===Kr)if(o===it)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===jr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===$r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===jr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===$r)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Xa||n===Ya||n===ja||n===$a)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Xa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ya)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ja)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===$a)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Za||n===Ka||n===Ja)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Za||n===Ka)return o===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ja)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Qa||n===ec||n===tc||n===nc||n===ic||n===sc||n===rc||n===oc||n===ac||n===cc||n===lc||n===uc||n===hc||n===dc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Qa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ec)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===tc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===nc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ic)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===sc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===rc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===oc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ac)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===cc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===lc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===uc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===hc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===dc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Jr||n===fc||n===pc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Jr)return o===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===fc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===pc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ud||n===mc||n===_c||n===gc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Jr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===mc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===_c)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===gc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ks?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const OT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,UT=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class FT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Yt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new mi({vertexShader:OT,fragmentShader:UT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Rn(new ko(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class kT extends Os{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,d=null,p=null,_=null;const g=new FT,m=t.getContextAttributes();let f=null,b=null;const T=[],x=[],M=new Ke;let E=null;const w=new tn;w.viewport=new st;const C=new tn;C.viewport=new st;const S=[w,C],v=new rx;let R=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let $=T[Y];return $===void 0&&($=new ha,T[Y]=$),$.getTargetRaySpace()},this.getControllerGrip=function(Y){let $=T[Y];return $===void 0&&($=new ha,T[Y]=$),$.getGripSpace()},this.getHand=function(Y){let $=T[Y];return $===void 0&&($=new ha,T[Y]=$),$.getHandSpace()};function N(Y){const $=x.indexOf(Y.inputSource);if($===-1)return;const oe=T[$];oe!==void 0&&(oe.update(Y.inputSource,Y.frame,l||o),oe.dispatchEvent({type:Y.type,data:Y.inputSource}))}function O(){s.removeEventListener("select",N),s.removeEventListener("selectstart",N),s.removeEventListener("selectend",N),s.removeEventListener("squeeze",N),s.removeEventListener("squeezestart",N),s.removeEventListener("squeezeend",N),s.removeEventListener("end",O),s.removeEventListener("inputsourceschange",G);for(let Y=0;Y<T.length;Y++){const $=x[Y];$!==null&&(x[Y]=null,T[Y].disconnect($))}R=null,D=null,g.reset(),e.setRenderTarget(f),p=null,d=null,h=null,s=null,b=null,Le.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(f=e.getRenderTarget(),s.addEventListener("select",N),s.addEventListener("selectstart",N),s.addEventListener("selectend",N),s.addEventListener("squeeze",N),s.addEventListener("squeezestart",N),s.addEventListener("squeezeend",N),s.addEventListener("end",O),s.addEventListener("inputsourceschange",G),m.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(M),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let oe=null,se=null,ee=null;m.depth&&(ee=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=m.stencil?Qs:Js,se=m.stencil?Ks:ki);const ze={colorFormat:t.RGBA8,depthFormat:ee,scaleFactor:r};h=new XRWebGLBinding(s,t),d=h.createProjectionLayer(ze),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new Bi(d.textureWidth,d.textureHeight,{format:Sn,type:Kn,depthTexture:new Td(d.textureWidth,d.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const oe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,oe),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new Bi(p.framebufferWidth,p.framebufferHeight,{format:Sn,type:Kn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Le.setContext(s),Le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function G(Y){for(let $=0;$<Y.removed.length;$++){const oe=Y.removed[$],se=x.indexOf(oe);se>=0&&(x[se]=null,T[se].disconnect(oe))}for(let $=0;$<Y.added.length;$++){const oe=Y.added[$];let se=x.indexOf(oe);if(se===-1){for(let ze=0;ze<T.length;ze++)if(ze>=x.length){x.push(oe),se=ze;break}else if(x[ze]===null){x[ze]=oe,se=ze;break}if(se===-1)break}const ee=T[se];ee&&ee.connect(oe)}}const U=new z,W=new z;function B(Y,$,oe){U.setFromMatrixPosition($.matrixWorld),W.setFromMatrixPosition(oe.matrixWorld);const se=U.distanceTo(W),ee=$.projectionMatrix.elements,ze=oe.projectionMatrix.elements,be=ee[14]/(ee[10]-1),nt=ee[14]/(ee[10]+1),Je=(ee[9]+1)/ee[5],Ge=(ee[9]-1)/ee[5],I=(ee[8]-1)/ee[0],ae=(ze[8]+1)/ze[0],ce=be*I,Ae=be*ae,le=se/(-I+ae),Te=le*-I;if($.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Te),Y.translateZ(le),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),ee[10]===-1)Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const ue=be+le,P=nt+le,y=ce-Te,V=Ae+(se-Te),K=Je*nt/P*ue,te=Ge*nt/P*ue;Y.projectionMatrix.makePerspective(y,V,K,te,ue,P),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function j(Y,$){$===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices($.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let $=Y.near,oe=Y.far;g.texture!==null&&(g.depthNear>0&&($=g.depthNear),g.depthFar>0&&(oe=g.depthFar)),v.near=C.near=w.near=$,v.far=C.far=w.far=oe,(R!==v.near||D!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),R=v.near,D=v.far),w.layers.mask=Y.layers.mask|2,C.layers.mask=Y.layers.mask|4,v.layers.mask=w.layers.mask|C.layers.mask;const se=Y.parent,ee=v.cameras;j(v,se);for(let ze=0;ze<ee.length;ze++)j(ee[ze],se);ee.length===2?B(v,w,C):v.projectionMatrix.copy(w.projectionMatrix),J(Y,v,se)};function J(Y,$,oe){oe===null?Y.matrix.copy($.matrixWorld):(Y.matrix.copy(oe.matrixWorld),Y.matrix.invert(),Y.matrix.multiply($.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=vc*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(Y){c=Y,d!==null&&(d.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(v)};let ne=null;function ge(Y,$){if(u=$.getViewerPose(l||o),_=$,u!==null){const oe=u.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let se=!1;oe.length!==v.cameras.length&&(v.cameras.length=0,se=!0);for(let be=0;be<oe.length;be++){const nt=oe[be];let Je=null;if(p!==null)Je=p.getViewport(nt);else{const I=h.getViewSubImage(d,nt);Je=I.viewport,be===0&&(e.setRenderTargetTextures(b,I.colorTexture,I.depthStencilTexture),e.setRenderTarget(b))}let Ge=S[be];Ge===void 0&&(Ge=new tn,Ge.layers.enable(be),Ge.viewport=new st,S[be]=Ge),Ge.matrix.fromArray(nt.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(nt.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(Je.x,Je.y,Je.width,Je.height),be===0&&(v.matrix.copy(Ge.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),se===!0&&v.cameras.push(Ge)}const ee=s.enabledFeatures;if(ee&&ee.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&h){const be=h.getDepthInformation(oe[0]);be&&be.isValid&&be.texture&&g.init(e,be,s.renderState)}}for(let oe=0;oe<T.length;oe++){const se=x[oe],ee=T[oe];se!==null&&ee!==void 0&&ee.update(se,$,l||o)}ne&&ne(Y,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),_=null}const Le=new bd;Le.setAnimationLoop(ge),this.setAnimationLoop=function(Y){ne=Y},this.dispose=function(){}}}const Ai=new In,BT=new pt;function VT(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Sd(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,b,T,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),h(m,f)):f.isMeshPhongMaterial?(r(m,f),u(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(r(m,f),_(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),g(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,b,T):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Xt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Xt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const b=e.get(f),T=b.envMap,x=b.envMapRotation;T&&(m.envMap.value=T,Ai.copy(x),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),m.envMapRotation.value.setFromMatrix4(BT.makeRotationFromEuler(Ai)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,b,T){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*b,m.scale.value=T*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,b){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Xt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function g(m,f){const b=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function zT(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,T){const x=T.program;n.uniformBlockBinding(b,x)}function l(b,T){let x=s[b.id];x===void 0&&(_(b),x=u(b),s[b.id]=x,b.addEventListener("dispose",m));const M=T.program;n.updateUBOMapping(b,M);const E=e.render.frame;r[b.id]!==E&&(d(b),r[b.id]=E)}function u(b){const T=h();b.__bindingPointIndex=T;const x=i.createBuffer(),M=b.__size,E=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,M,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,x),x}function h(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const T=s[b.id],x=b.uniforms,M=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let E=0,w=x.length;E<w;E++){const C=Array.isArray(x[E])?x[E]:[x[E]];for(let S=0,v=C.length;S<v;S++){const R=C[S];if(p(R,E,S,M)===!0){const D=R.__offset,N=Array.isArray(R.value)?R.value:[R.value];let O=0;for(let G=0;G<N.length;G++){const U=N[G],W=g(U);typeof U=="number"||typeof U=="boolean"?(R.__data[0]=U,i.bufferSubData(i.UNIFORM_BUFFER,D+O,R.__data)):U.isMatrix3?(R.__data[0]=U.elements[0],R.__data[1]=U.elements[1],R.__data[2]=U.elements[2],R.__data[3]=0,R.__data[4]=U.elements[3],R.__data[5]=U.elements[4],R.__data[6]=U.elements[5],R.__data[7]=0,R.__data[8]=U.elements[6],R.__data[9]=U.elements[7],R.__data[10]=U.elements[8],R.__data[11]=0):(U.toArray(R.__data,O),O+=W.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(b,T,x,M){const E=b.value,w=T+"_"+x;if(M[w]===void 0)return typeof E=="number"||typeof E=="boolean"?M[w]=E:M[w]=E.clone(),!0;{const C=M[w];if(typeof E=="number"||typeof E=="boolean"){if(C!==E)return M[w]=E,!0}else if(C.equals(E)===!1)return C.copy(E),!0}return!1}function _(b){const T=b.uniforms;let x=0;const M=16;for(let w=0,C=T.length;w<C;w++){const S=Array.isArray(T[w])?T[w]:[T[w]];for(let v=0,R=S.length;v<R;v++){const D=S[v],N=Array.isArray(D.value)?D.value:[D.value];for(let O=0,G=N.length;O<G;O++){const U=N[O],W=g(U),B=x%M,j=B%W.boundary,J=B+j;x+=j,J!==0&&M-J<W.storage&&(x+=M-J),D.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=x,x+=W.storage}}}const E=x%M;return E>0&&(x+=M-E),b.__size=x,b.__cache={},this}function g(b){const T={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(T.boundary=4,T.storage=4):b.isVector2?(T.boundary=8,T.storage=8):b.isVector3||b.isColor?(T.boundary=16,T.storage=12):b.isVector4?(T.boundary=16,T.storage=16):b.isMatrix3?(T.boundary=48,T.storage=48):b.isMatrix4?(T.boundary=64,T.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),T}function m(b){const T=b.target;T.removeEventListener("dispose",m);const x=o.indexOf(T.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function f(){for(const b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:c,update:l,dispose:f}}class GT{constructor(e={}){const{canvas:t=S0(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,f=null;const b=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=di,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let M=!1;this._outputColorSpace=an;let E=0,w=0,C=null,S=-1,v=null;const R=new st,D=new st;let N=null;const O=new Ze(0);let G=0,U=t.width,W=t.height,B=1,j=null,J=null;const ne=new st(0,0,U,W),ge=new st(0,0,U,W);let Le=!1;const Y=new _l;let $=!1,oe=!1;const se=new pt,ee=new pt,ze=new z,be=new st,nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Je=!1;function Ge(){return C===null?B:1}let I=n;function ae(A,F){return t.getContext(A,F)}try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ol}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",_e,!1),t.addEventListener("webglcontextcreationerror",me,!1),I===null){const F="webgl2";if(I=ae(F,A),I===null)throw ae(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let ce,Ae,le,Te,ue,P,y,V,K,te,Z,Ee,fe,xe,Xe,re,Se,Re,De,ye,qe,Be,at,L;function pe(){ce=new Jy(I),ce.init(),Be=new LT(I,ce),Ae=new qy(I,ce,e,Be),le=new IT(I,ce),Ae.reverseDepthBuffer&&d&&le.buffers.depth.setReversed(!0),Te=new tM(I),ue=new xT,P=new NT(I,ce,le,ue,Ae,Be,Te),y=new Yy(x),V=new Ky(x),K=new ax(I),at=new Hy(I,K),te=new Qy(I,K,Te,at),Z=new iM(I,te,K,Te),De=new nM(I,Ae,P),re=new Xy(ue),Ee=new vT(x,y,V,ce,Ae,at,re),fe=new VT(x,ue),xe=new yT,Xe=new wT(ce),Re=new Gy(x,y,V,le,Z,p,c),Se=new PT(x,Z,Ae),L=new zT(I,Te,Ae,le),ye=new Wy(I,ce,Te),qe=new eM(I,ce,Te),Te.programs=Ee.programs,x.capabilities=Ae,x.extensions=ce,x.properties=ue,x.renderLists=xe,x.shadowMap=Se,x.state=le,x.info=Te}pe();const X=new kT(x,I);this.xr=X,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const A=ce.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=ce.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(A){A!==void 0&&(B=A,this.setSize(U,W,!1))},this.getSize=function(A){return A.set(U,W)},this.setSize=function(A,F,H=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=A,W=F,t.width=Math.floor(A*B),t.height=Math.floor(F*B),H===!0&&(t.style.width=A+"px",t.style.height=F+"px"),this.setViewport(0,0,A,F)},this.getDrawingBufferSize=function(A){return A.set(U*B,W*B).floor()},this.setDrawingBufferSize=function(A,F,H){U=A,W=F,B=H,t.width=Math.floor(A*H),t.height=Math.floor(F*H),this.setViewport(0,0,A,F)},this.getCurrentViewport=function(A){return A.copy(R)},this.getViewport=function(A){return A.copy(ne)},this.setViewport=function(A,F,H,q){A.isVector4?ne.set(A.x,A.y,A.z,A.w):ne.set(A,F,H,q),le.viewport(R.copy(ne).multiplyScalar(B).round())},this.getScissor=function(A){return A.copy(ge)},this.setScissor=function(A,F,H,q){A.isVector4?ge.set(A.x,A.y,A.z,A.w):ge.set(A,F,H,q),le.scissor(D.copy(ge).multiplyScalar(B).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(A){le.setScissorTest(Le=A)},this.setOpaqueSort=function(A){j=A},this.setTransparentSort=function(A){J=A},this.getClearColor=function(A){return A.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor(...arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha(...arguments)},this.clear=function(A=!0,F=!0,H=!0){let q=0;if(A){let k=!1;if(C!==null){const ie=C.texture.format;k=ie===fl||ie===dl||ie===hl}if(k){const ie=C.texture.type,de=ie===Kn||ie===ki||ie===Zs||ie===Ks||ie===ll||ie===ul,ve=Re.getClearColor(),Me=Re.getClearAlpha(),Ie=ve.r,Pe=ve.g,we=ve.b;de?(_[0]=Ie,_[1]=Pe,_[2]=we,_[3]=Me,I.clearBufferuiv(I.COLOR,0,_)):(g[0]=Ie,g[1]=Pe,g[2]=we,g[3]=Me,I.clearBufferiv(I.COLOR,0,g))}else q|=I.COLOR_BUFFER_BIT}F&&(q|=I.DEPTH_BUFFER_BIT),H&&(q|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",_e,!1),t.removeEventListener("webglcontextcreationerror",me,!1),Re.dispose(),xe.dispose(),Xe.dispose(),ue.dispose(),y.dispose(),V.dispose(),Z.dispose(),at.dispose(),L.dispose(),Ee.dispose(),X.dispose(),X.removeEventListener("sessionstart",vl),X.removeEventListener("sessionend",xl),xi.stop()};function Q(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function _e(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const A=Te.autoReset,F=Se.enabled,H=Se.autoUpdate,q=Se.needsUpdate,k=Se.type;pe(),Te.autoReset=A,Se.enabled=F,Se.autoUpdate=H,Se.needsUpdate=q,Se.type=k}function me(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Oe(A){const F=A.target;F.removeEventListener("dispose",Oe),mt(F)}function mt(A){Lt(A),ue.remove(A)}function Lt(A){const F=ue.get(A).programs;F!==void 0&&(F.forEach(function(H){Ee.releaseProgram(H)}),A.isShaderMaterial&&Ee.releaseShaderCache(A))}this.renderBufferDirect=function(A,F,H,q,k,ie){F===null&&(F=nt);const de=k.isMesh&&k.matrixWorld.determinant()<0,ve=Dd(A,F,H,q,k);le.setMaterial(q,de);let Me=H.index,Ie=1;if(q.wireframe===!0){if(Me=te.getWireframeAttribute(H),Me===void 0)return;Ie=2}const Pe=H.drawRange,we=H.attributes.position;let Ye=Pe.start*Ie,Qe=(Pe.start+Pe.count)*Ie;ie!==null&&(Ye=Math.max(Ye,ie.start*Ie),Qe=Math.min(Qe,(ie.start+ie.count)*Ie)),Me!==null?(Ye=Math.max(Ye,0),Qe=Math.min(Qe,Me.count)):we!=null&&(Ye=Math.max(Ye,0),Qe=Math.min(Qe,we.count));const St=Qe-Ye;if(St<0||St===1/0)return;at.setup(k,q,ve,H,Me);let _t,je=ye;if(Me!==null&&(_t=K.get(Me),je=qe,je.setIndex(_t)),k.isMesh)q.wireframe===!0?(le.setLineWidth(q.wireframeLinewidth*Ge()),je.setMode(I.LINES)):je.setMode(I.TRIANGLES);else if(k.isLine){let Ce=q.linewidth;Ce===void 0&&(Ce=1),le.setLineWidth(Ce*Ge()),k.isLineSegments?je.setMode(I.LINES):k.isLineLoop?je.setMode(I.LINE_LOOP):je.setMode(I.LINE_STRIP)}else k.isPoints?je.setMode(I.POINTS):k.isSprite&&je.setMode(I.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Qr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),je.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(ce.get("WEBGL_multi_draw"))je.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Ce=k._multiDrawStarts,Dt=k._multiDrawCounts,et=k._multiDrawCount,fn=Me?K.get(Me).bytesPerElement:1,Wi=ue.get(q).currentProgram.getUniforms();for(let Zt=0;Zt<et;Zt++)Wi.setValue(I,"_gl_DrawID",Zt),je.render(Ce[Zt]/fn,Dt[Zt])}else if(k.isInstancedMesh)je.renderInstances(Ye,St,k.count);else if(H.isInstancedBufferGeometry){const Ce=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Dt=Math.min(H.instanceCount,Ce);je.renderInstances(Ye,St,Dt)}else je.render(Ye,St)};function tt(A,F,H){A.transparent===!0&&A.side===Wn&&A.forceSinglePass===!1?(A.side=Xt,A.needsUpdate=!0,vr(A,F,H),A.side=pi,A.needsUpdate=!0,vr(A,F,H),A.side=Wn):vr(A,F,H)}this.compile=function(A,F,H=null){H===null&&(H=A),f=Xe.get(H),f.init(F),T.push(f),H.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(f.pushLight(k),k.castShadow&&f.pushShadow(k))}),A!==H&&A.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(f.pushLight(k),k.castShadow&&f.pushShadow(k))}),f.setupLights();const q=new Set;return A.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const ie=k.material;if(ie)if(Array.isArray(ie))for(let de=0;de<ie.length;de++){const ve=ie[de];tt(ve,H,k),q.add(ve)}else tt(ie,H,k),q.add(ie)}),f=T.pop(),q},this.compileAsync=function(A,F,H=null){const q=this.compile(A,F,H);return new Promise(k=>{function ie(){if(q.forEach(function(de){ue.get(de).currentProgram.isReady()&&q.delete(de)}),q.size===0){k(A);return}setTimeout(ie,10)}ce.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let dn=null;function Un(A){dn&&dn(A)}function vl(){xi.stop()}function xl(){xi.start()}const xi=new bd;xi.setAnimationLoop(Un),typeof self<"u"&&xi.setContext(self),this.setAnimationLoop=function(A){dn=A,X.setAnimationLoop(A),A===null?xi.stop():xi.start()},X.addEventListener("sessionstart",vl),X.addEventListener("sessionend",xl),this.render=function(A,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(F),F=X.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,F,C),f=Xe.get(A,T.length),f.init(F),T.push(f),ee.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Y.setFromProjectionMatrix(ee),oe=this.localClippingEnabled,$=re.init(this.clippingPlanes,oe),m=xe.get(A,b.length),m.init(),b.push(m),X.enabled===!0&&X.isPresenting===!0){const ie=x.xr.getDepthSensingMesh();ie!==null&&Vo(ie,F,-1/0,x.sortObjects)}Vo(A,F,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(j,J),Je=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Je&&Re.addToRenderList(m,A),this.info.render.frame++,$===!0&&re.beginShadows();const H=f.state.shadowsArray;Se.render(H,A,F),$===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=m.opaque,k=m.transmissive;if(f.setupLights(),F.isArrayCamera){const ie=F.cameras;if(k.length>0)for(let de=0,ve=ie.length;de<ve;de++){const Me=ie[de];yl(q,k,A,Me)}Je&&Re.render(A);for(let de=0,ve=ie.length;de<ve;de++){const Me=ie[de];Sl(m,A,Me,Me.viewport)}}else k.length>0&&yl(q,k,A,F),Je&&Re.render(A),Sl(m,A,F);C!==null&&w===0&&(P.updateMultisampleRenderTarget(C),P.updateRenderTargetMipmap(C)),A.isScene===!0&&A.onAfterRender(x,A,F),at.resetDefaultState(),S=-1,v=null,T.pop(),T.length>0?(f=T[T.length-1],$===!0&&re.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Vo(A,F,H,q){if(A.visible===!1)return;if(A.layers.test(F.layers)){if(A.isGroup)H=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(F);else if(A.isLight)f.pushLight(A),A.castShadow&&f.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Y.intersectsSprite(A)){q&&be.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ee);const de=Z.update(A),ve=A.material;ve.visible&&m.push(A,de,ve,H,be.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Y.intersectsObject(A))){const de=Z.update(A),ve=A.material;if(q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),be.copy(A.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),be.copy(de.boundingSphere.center)),be.applyMatrix4(A.matrixWorld).applyMatrix4(ee)),Array.isArray(ve)){const Me=de.groups;for(let Ie=0,Pe=Me.length;Ie<Pe;Ie++){const we=Me[Ie],Ye=ve[we.materialIndex];Ye&&Ye.visible&&m.push(A,de,Ye,H,be.z,we)}}else ve.visible&&m.push(A,de,ve,H,be.z,null)}}const ie=A.children;for(let de=0,ve=ie.length;de<ve;de++)Vo(ie[de],F,H,q)}function Sl(A,F,H,q){const k=A.opaque,ie=A.transmissive,de=A.transparent;f.setupLightsView(H),$===!0&&re.setGlobalState(x.clippingPlanes,H),q&&le.viewport(R.copy(q)),k.length>0&&gr(k,F,H),ie.length>0&&gr(ie,F,H),de.length>0&&gr(de,F,H),le.buffers.depth.setTest(!0),le.buffers.depth.setMask(!0),le.buffers.color.setMask(!0),le.setPolygonOffset(!1)}function yl(A,F,H,q){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[q.id]===void 0&&(f.state.transmissionRenderTarget[q.id]=new Bi(1,1,{generateMipmaps:!0,type:ce.has("EXT_color_buffer_half_float")||ce.has("EXT_color_buffer_float")?dr:Kn,minFilter:Ii,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));const ie=f.state.transmissionRenderTarget[q.id],de=q.viewport||R;ie.setSize(de.z*x.transmissionResolutionScale,de.w*x.transmissionResolutionScale);const ve=x.getRenderTarget();x.setRenderTarget(ie),x.getClearColor(O),G=x.getClearAlpha(),G<1&&x.setClearColor(16777215,.5),x.clear(),Je&&Re.render(H);const Me=x.toneMapping;x.toneMapping=di;const Ie=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),f.setupLightsView(q),$===!0&&re.setGlobalState(x.clippingPlanes,q),gr(A,H,q),P.updateMultisampleRenderTarget(ie),P.updateRenderTargetMipmap(ie),ce.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let we=0,Ye=F.length;we<Ye;we++){const Qe=F[we],St=Qe.object,_t=Qe.geometry,je=Qe.material,Ce=Qe.group;if(je.side===Wn&&St.layers.test(q.layers)){const Dt=je.side;je.side=Xt,je.needsUpdate=!0,Ml(St,H,q,_t,je,Ce),je.side=Dt,je.needsUpdate=!0,Pe=!0}}Pe===!0&&(P.updateMultisampleRenderTarget(ie),P.updateRenderTargetMipmap(ie))}x.setRenderTarget(ve),x.setClearColor(O,G),Ie!==void 0&&(q.viewport=Ie),x.toneMapping=Me}function gr(A,F,H){const q=F.isScene===!0?F.overrideMaterial:null;for(let k=0,ie=A.length;k<ie;k++){const de=A[k],ve=de.object,Me=de.geometry,Ie=de.group;let Pe=de.material;Pe.allowOverride===!0&&q!==null&&(Pe=q),ve.layers.test(H.layers)&&Ml(ve,F,H,Me,Pe,Ie)}}function Ml(A,F,H,q,k,ie){A.onBeforeRender(x,F,H,q,k,ie),A.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),k.onBeforeRender(x,F,H,q,A,ie),k.transparent===!0&&k.side===Wn&&k.forceSinglePass===!1?(k.side=Xt,k.needsUpdate=!0,x.renderBufferDirect(H,F,q,k,A,ie),k.side=pi,k.needsUpdate=!0,x.renderBufferDirect(H,F,q,k,A,ie),k.side=Wn):x.renderBufferDirect(H,F,q,k,A,ie),A.onAfterRender(x,F,H,q,k,ie)}function vr(A,F,H){F.isScene!==!0&&(F=nt);const q=ue.get(A),k=f.state.lights,ie=f.state.shadowsArray,de=k.state.version,ve=Ee.getParameters(A,k.state,ie,F,H),Me=Ee.getProgramCacheKey(ve);let Ie=q.programs;q.environment=A.isMeshStandardMaterial?F.environment:null,q.fog=F.fog,q.envMap=(A.isMeshStandardMaterial?V:y).get(A.envMap||q.environment),q.envMapRotation=q.environment!==null&&A.envMap===null?F.environmentRotation:A.envMapRotation,Ie===void 0&&(A.addEventListener("dispose",Oe),Ie=new Map,q.programs=Ie);let Pe=Ie.get(Me);if(Pe!==void 0){if(q.currentProgram===Pe&&q.lightsStateVersion===de)return El(A,ve),Pe}else ve.uniforms=Ee.getUniforms(A),A.onBeforeCompile(ve,x),Pe=Ee.acquireProgram(ve,Me),Ie.set(Me,Pe),q.uniforms=ve.uniforms;const we=q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(we.clippingPlanes=re.uniform),El(A,ve),q.needsLights=Nd(A),q.lightsStateVersion=de,q.needsLights&&(we.ambientLightColor.value=k.state.ambient,we.lightProbe.value=k.state.probe,we.directionalLights.value=k.state.directional,we.directionalLightShadows.value=k.state.directionalShadow,we.spotLights.value=k.state.spot,we.spotLightShadows.value=k.state.spotShadow,we.rectAreaLights.value=k.state.rectArea,we.ltc_1.value=k.state.rectAreaLTC1,we.ltc_2.value=k.state.rectAreaLTC2,we.pointLights.value=k.state.point,we.pointLightShadows.value=k.state.pointShadow,we.hemisphereLights.value=k.state.hemi,we.directionalShadowMap.value=k.state.directionalShadowMap,we.directionalShadowMatrix.value=k.state.directionalShadowMatrix,we.spotShadowMap.value=k.state.spotShadowMap,we.spotLightMatrix.value=k.state.spotLightMatrix,we.spotLightMap.value=k.state.spotLightMap,we.pointShadowMap.value=k.state.pointShadowMap,we.pointShadowMatrix.value=k.state.pointShadowMatrix),q.currentProgram=Pe,q.uniformsList=null,Pe}function Tl(A){if(A.uniformsList===null){const F=A.currentProgram.getUniforms();A.uniformsList=eo.seqWithValue(F.seq,A.uniforms)}return A.uniformsList}function El(A,F){const H=ue.get(A);H.outputColorSpace=F.outputColorSpace,H.batching=F.batching,H.batchingColor=F.batchingColor,H.instancing=F.instancing,H.instancingColor=F.instancingColor,H.instancingMorph=F.instancingMorph,H.skinning=F.skinning,H.morphTargets=F.morphTargets,H.morphNormals=F.morphNormals,H.morphColors=F.morphColors,H.morphTargetsCount=F.morphTargetsCount,H.numClippingPlanes=F.numClippingPlanes,H.numIntersection=F.numClipIntersection,H.vertexAlphas=F.vertexAlphas,H.vertexTangents=F.vertexTangents,H.toneMapping=F.toneMapping}function Dd(A,F,H,q,k){F.isScene!==!0&&(F=nt),P.resetTextureUnits();const ie=F.fog,de=q.isMeshStandardMaterial?F.environment:null,ve=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:As,Me=(q.isMeshStandardMaterial?V:y).get(q.envMap||de),Ie=q.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Pe=!!H.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),we=!!H.morphAttributes.position,Ye=!!H.morphAttributes.normal,Qe=!!H.morphAttributes.color;let St=di;q.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(St=x.toneMapping);const _t=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,je=_t!==void 0?_t.length:0,Ce=ue.get(q),Dt=f.state.lights;if($===!0&&(oe===!0||A!==v)){const kt=A===v&&q.id===S;re.setState(q,A,kt)}let et=!1;q.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==Dt.state.version||Ce.outputColorSpace!==ve||k.isBatchedMesh&&Ce.batching===!1||!k.isBatchedMesh&&Ce.batching===!0||k.isBatchedMesh&&Ce.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Ce.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Ce.instancing===!1||!k.isInstancedMesh&&Ce.instancing===!0||k.isSkinnedMesh&&Ce.skinning===!1||!k.isSkinnedMesh&&Ce.skinning===!0||k.isInstancedMesh&&Ce.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Ce.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Ce.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Ce.instancingMorph===!1&&k.morphTexture!==null||Ce.envMap!==Me||q.fog===!0&&Ce.fog!==ie||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==re.numPlanes||Ce.numIntersection!==re.numIntersection)||Ce.vertexAlphas!==Ie||Ce.vertexTangents!==Pe||Ce.morphTargets!==we||Ce.morphNormals!==Ye||Ce.morphColors!==Qe||Ce.toneMapping!==St||Ce.morphTargetsCount!==je)&&(et=!0):(et=!0,Ce.__version=q.version);let fn=Ce.currentProgram;et===!0&&(fn=vr(q,F,k));let Wi=!1,Zt=!1,ks=!1;const ht=fn.getUniforms(),sn=Ce.uniforms;if(le.useProgram(fn.program)&&(Wi=!0,Zt=!0,ks=!0),q.id!==S&&(S=q.id,Zt=!0),Wi||v!==A){le.buffers.depth.getReversed()?(se.copy(A.projectionMatrix),M0(se),T0(se),ht.setValue(I,"projectionMatrix",se)):ht.setValue(I,"projectionMatrix",A.projectionMatrix),ht.setValue(I,"viewMatrix",A.matrixWorldInverse);const Ht=ht.map.cameraPosition;Ht!==void 0&&Ht.setValue(I,ze.setFromMatrixPosition(A.matrixWorld)),Ae.logarithmicDepthBuffer&&ht.setValue(I,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&ht.setValue(I,"isOrthographic",A.isOrthographicCamera===!0),v!==A&&(v=A,Zt=!0,ks=!0)}if(k.isSkinnedMesh){ht.setOptional(I,k,"bindMatrix"),ht.setOptional(I,k,"bindMatrixInverse");const kt=k.skeleton;kt&&(kt.boneTexture===null&&kt.computeBoneTexture(),ht.setValue(I,"boneTexture",kt.boneTexture,P))}k.isBatchedMesh&&(ht.setOptional(I,k,"batchingTexture"),ht.setValue(I,"batchingTexture",k._matricesTexture,P),ht.setOptional(I,k,"batchingIdTexture"),ht.setValue(I,"batchingIdTexture",k._indirectTexture,P),ht.setOptional(I,k,"batchingColorTexture"),k._colorsTexture!==null&&ht.setValue(I,"batchingColorTexture",k._colorsTexture,P));const rn=H.morphAttributes;if((rn.position!==void 0||rn.normal!==void 0||rn.color!==void 0)&&De.update(k,H,fn),(Zt||Ce.receiveShadow!==k.receiveShadow)&&(Ce.receiveShadow=k.receiveShadow,ht.setValue(I,"receiveShadow",k.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(sn.envMap.value=Me,sn.flipEnvMap.value=Me.isCubeTexture&&Me.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&F.environment!==null&&(sn.envMapIntensity.value=F.environmentIntensity),Zt&&(ht.setValue(I,"toneMappingExposure",x.toneMappingExposure),Ce.needsLights&&Id(sn,ks),ie&&q.fog===!0&&fe.refreshFogUniforms(sn,ie),fe.refreshMaterialUniforms(sn,q,B,W,f.state.transmissionRenderTarget[A.id]),eo.upload(I,Tl(Ce),sn,P)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(eo.upload(I,Tl(Ce),sn,P),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&ht.setValue(I,"center",k.center),ht.setValue(I,"modelViewMatrix",k.modelViewMatrix),ht.setValue(I,"normalMatrix",k.normalMatrix),ht.setValue(I,"modelMatrix",k.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const kt=q.uniformsGroups;for(let Ht=0,zo=kt.length;Ht<zo;Ht++){const Si=kt[Ht];L.update(Si,fn),L.bind(Si,fn)}}return fn}function Id(A,F){A.ambientLightColor.needsUpdate=F,A.lightProbe.needsUpdate=F,A.directionalLights.needsUpdate=F,A.directionalLightShadows.needsUpdate=F,A.pointLights.needsUpdate=F,A.pointLightShadows.needsUpdate=F,A.spotLights.needsUpdate=F,A.spotLightShadows.needsUpdate=F,A.rectAreaLights.needsUpdate=F,A.hemisphereLights.needsUpdate=F}function Nd(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(A,F,H){const q=ue.get(A);q.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),ue.get(A.texture).__webglTexture=F,ue.get(A.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:H,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,F){const H=ue.get(A);H.__webglFramebuffer=F,H.__useDefaultFramebuffer=F===void 0};const Ld=I.createFramebuffer();this.setRenderTarget=function(A,F=0,H=0){C=A,E=F,w=H;let q=!0,k=null,ie=!1,de=!1;if(A){const Me=ue.get(A);if(Me.__useDefaultFramebuffer!==void 0)le.bindFramebuffer(I.FRAMEBUFFER,null),q=!1;else if(Me.__webglFramebuffer===void 0)P.setupRenderTarget(A);else if(Me.__hasExternalTextures)P.rebindTextures(A,ue.get(A.texture).__webglTexture,ue.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const we=A.depthTexture;if(Me.__boundDepthTexture!==we){if(we!==null&&ue.has(we)&&(A.width!==we.image.width||A.height!==we.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(A)}}const Ie=A.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(de=!0);const Pe=ue.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Pe[F])?k=Pe[F][H]:k=Pe[F],ie=!0):A.samples>0&&P.useMultisampledRTT(A)===!1?k=ue.get(A).__webglMultisampledFramebuffer:Array.isArray(Pe)?k=Pe[H]:k=Pe,R.copy(A.viewport),D.copy(A.scissor),N=A.scissorTest}else R.copy(ne).multiplyScalar(B).floor(),D.copy(ge).multiplyScalar(B).floor(),N=Le;if(H!==0&&(k=Ld),le.bindFramebuffer(I.FRAMEBUFFER,k)&&q&&le.drawBuffers(A,k),le.viewport(R),le.scissor(D),le.setScissorTest(N),ie){const Me=ue.get(A.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+F,Me.__webglTexture,H)}else if(de){const Me=ue.get(A.texture),Ie=F;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Me.__webglTexture,H,Ie)}else if(A!==null&&H!==0){const Me=ue.get(A.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Me.__webglTexture,H)}S=-1},this.readRenderTargetPixels=function(A,F,H,q,k,ie,de){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=ue.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&de!==void 0&&(ve=ve[de]),ve){le.bindFramebuffer(I.FRAMEBUFFER,ve);try{const Me=A.texture,Ie=Me.format,Pe=Me.type;if(!Ae.textureFormatReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ae.textureTypeReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=A.width-q&&H>=0&&H<=A.height-k&&I.readPixels(F,H,q,k,Be.convert(Ie),Be.convert(Pe),ie)}finally{const Me=C!==null?ue.get(C).__webglFramebuffer:null;le.bindFramebuffer(I.FRAMEBUFFER,Me)}}},this.readRenderTargetPixelsAsync=async function(A,F,H,q,k,ie,de){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=ue.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&de!==void 0&&(ve=ve[de]),ve)if(F>=0&&F<=A.width-q&&H>=0&&H<=A.height-k){le.bindFramebuffer(I.FRAMEBUFFER,ve);const Me=A.texture,Ie=Me.format,Pe=Me.type;if(!Ae.textureFormatReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ae.textureTypeReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const we=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,we),I.bufferData(I.PIXEL_PACK_BUFFER,ie.byteLength,I.STREAM_READ),I.readPixels(F,H,q,k,Be.convert(Ie),Be.convert(Pe),0);const Ye=C!==null?ue.get(C).__webglFramebuffer:null;le.bindFramebuffer(I.FRAMEBUFFER,Ye);const Qe=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await y0(I,Qe,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,we),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ie),I.deleteBuffer(we),I.deleteSync(Qe),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,F=null,H=0){const q=Math.pow(2,-H),k=Math.floor(A.image.width*q),ie=Math.floor(A.image.height*q),de=F!==null?F.x:0,ve=F!==null?F.y:0;P.setTexture2D(A,0),I.copyTexSubImage2D(I.TEXTURE_2D,H,0,0,de,ve,k,ie),le.unbindTexture()};const Od=I.createFramebuffer(),Ud=I.createFramebuffer();this.copyTextureToTexture=function(A,F,H=null,q=null,k=0,ie=null){ie===null&&(k!==0?(Qr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ie=k,k=0):ie=0);let de,ve,Me,Ie,Pe,we,Ye,Qe,St;const _t=A.isCompressedTexture?A.mipmaps[ie]:A.image;if(H!==null)de=H.max.x-H.min.x,ve=H.max.y-H.min.y,Me=H.isBox3?H.max.z-H.min.z:1,Ie=H.min.x,Pe=H.min.y,we=H.isBox3?H.min.z:0;else{const rn=Math.pow(2,-k);de=Math.floor(_t.width*rn),ve=Math.floor(_t.height*rn),A.isDataArrayTexture?Me=_t.depth:A.isData3DTexture?Me=Math.floor(_t.depth*rn):Me=1,Ie=0,Pe=0,we=0}q!==null?(Ye=q.x,Qe=q.y,St=q.z):(Ye=0,Qe=0,St=0);const je=Be.convert(F.format),Ce=Be.convert(F.type);let Dt;F.isData3DTexture?(P.setTexture3D(F,0),Dt=I.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(P.setTexture2DArray(F,0),Dt=I.TEXTURE_2D_ARRAY):(P.setTexture2D(F,0),Dt=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,F.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,F.unpackAlignment);const et=I.getParameter(I.UNPACK_ROW_LENGTH),fn=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Wi=I.getParameter(I.UNPACK_SKIP_PIXELS),Zt=I.getParameter(I.UNPACK_SKIP_ROWS),ks=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,_t.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,_t.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ie),I.pixelStorei(I.UNPACK_SKIP_ROWS,Pe),I.pixelStorei(I.UNPACK_SKIP_IMAGES,we);const ht=A.isDataArrayTexture||A.isData3DTexture,sn=F.isDataArrayTexture||F.isData3DTexture;if(A.isDepthTexture){const rn=ue.get(A),kt=ue.get(F),Ht=ue.get(rn.__renderTarget),zo=ue.get(kt.__renderTarget);le.bindFramebuffer(I.READ_FRAMEBUFFER,Ht.__webglFramebuffer),le.bindFramebuffer(I.DRAW_FRAMEBUFFER,zo.__webglFramebuffer);for(let Si=0;Si<Me;Si++)ht&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ue.get(A).__webglTexture,k,we+Si),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ue.get(F).__webglTexture,ie,St+Si)),I.blitFramebuffer(Ie,Pe,de,ve,Ye,Qe,de,ve,I.DEPTH_BUFFER_BIT,I.NEAREST);le.bindFramebuffer(I.READ_FRAMEBUFFER,null),le.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(k!==0||A.isRenderTargetTexture||ue.has(A)){const rn=ue.get(A),kt=ue.get(F);le.bindFramebuffer(I.READ_FRAMEBUFFER,Od),le.bindFramebuffer(I.DRAW_FRAMEBUFFER,Ud);for(let Ht=0;Ht<Me;Ht++)ht?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,rn.__webglTexture,k,we+Ht):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,rn.__webglTexture,k),sn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,kt.__webglTexture,ie,St+Ht):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,kt.__webglTexture,ie),k!==0?I.blitFramebuffer(Ie,Pe,de,ve,Ye,Qe,de,ve,I.COLOR_BUFFER_BIT,I.NEAREST):sn?I.copyTexSubImage3D(Dt,ie,Ye,Qe,St+Ht,Ie,Pe,de,ve):I.copyTexSubImage2D(Dt,ie,Ye,Qe,Ie,Pe,de,ve);le.bindFramebuffer(I.READ_FRAMEBUFFER,null),le.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else sn?A.isDataTexture||A.isData3DTexture?I.texSubImage3D(Dt,ie,Ye,Qe,St,de,ve,Me,je,Ce,_t.data):F.isCompressedArrayTexture?I.compressedTexSubImage3D(Dt,ie,Ye,Qe,St,de,ve,Me,je,_t.data):I.texSubImage3D(Dt,ie,Ye,Qe,St,de,ve,Me,je,Ce,_t):A.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ie,Ye,Qe,de,ve,je,Ce,_t.data):A.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ie,Ye,Qe,_t.width,_t.height,je,_t.data):I.texSubImage2D(I.TEXTURE_2D,ie,Ye,Qe,de,ve,je,Ce,_t);I.pixelStorei(I.UNPACK_ROW_LENGTH,et),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,fn),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Wi),I.pixelStorei(I.UNPACK_SKIP_ROWS,Zt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,ks),ie===0&&F.generateMipmaps&&I.generateMipmap(Dt),le.unbindTexture()},this.copyTextureToTexture3D=function(A,F,H=null,q=null,k=0){return Qr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,F,H,q,k)},this.initRenderTarget=function(A){ue.get(A).__webglFramebuffer===void 0&&P.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?P.setTextureCube(A,0):A.isData3DTexture?P.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?P.setTexture2DArray(A,0):P.setTexture2D(A,0),le.unbindTexture()},this.resetState=function(){E=0,w=0,C=null,le.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}let ya,Sc;function HT(){ya=new Uo("fft",128),Jh().connect(ya),ya.getValue()}function TE(){Sc=!0}function WT(){HT();const i=document.querySelector(".glslCanvas"),e=new GT({canvas:i});e.setSize(window.innerWidth,window.innerHeight);const t=new $0,n=new tn(50,window.innerWidth/window.innerHeight,.1,1e3);n.position.z=8;const s=new Us(.8,.8,.8),r=new J0({color:16777215}),o=[],a=5,c=5,l=6,u=2;for(let f=0;f<a;f++)for(let b=0;b<c;b++)for(let T=0;T<l;T++){const x=new Rn(s,r);x.position.x=(f-a/2)*u,x.position.y=(b-c/2)*u,x.position.z=(T-l/2)*u,t.add(x),o.push(x)}const h=new Su(12690389,50);h.position.set(2,2,2),h.castShadow=!0,t.add(h);const d=new Su(14644854,50);d.position.set(-2,-2,2),h.castShadow=!0,t.add(d);const p=new sx(16448,1);t.add(p);const _=[65280,16711680,255,16776960,16711935,65535,16777215];let g=!0;function m(){requestAnimationFrame(m),Sc&&(o.forEach(f=>{const b=Math.random()*.5+.5;f.scale.set(b,b,b),f.material.color.set(_[Math.floor(Math.random()*_.length)]),g&&(f.position.y+=Math.random()/4-.125,f.position.x+=Math.random()/4-.125),setTimeout(()=>{f.scale.set(1,1,1),f.material.color.set(16777215),Sc=!1,g=!0},100)}),g=!1),o.forEach(f=>{f.rotation.x+=.001,f.rotation.y+=.001,f.rotation.z+=.001,f.position.y+=Math.cos(f.rotation.y)*.001}),e.render(t,n)}m()}let qr;function qT(){qr=new Uo("fft",1024),Jh().connect(qr),qr.getValue(),qr.getValue("waveform")}let Xu=!1;function Pd(){Xu||(Bd(()=>import("./audio-DxpQgmkb.js"),[]).then(i=>{i.initAudio(),Xu=!0}),document.querySelector("h1").style.opacity="0",document.querySelector("canvas").style.opacity="1")}document.addEventListener("click",Pd);document.addEventListener("keydown",Pd);document.addEventListener("DOMContentLoaded",()=>{WT(),qT()});export{Ev as A,vi as E,ln as F,It as G,ys as I,Ss as M,Tt as O,ft as P,Pt as S,ke as T,ur as W,xs as a,Ns as b,Ia as c,vv as d,qc as e,Da as f,Ms as g,fo as h,ql as i,nn as j,ho as k,Fe as l,mv as m,Ui as n,Ne as o,rt as p,yE as q,vt as r,Cv as s,Bc as t,yn as u,hs as v,Xh as w,sl as x,ME as y,TE as z};
