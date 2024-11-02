import{C as st,D as p,E as v,F as y,G as nt,H as it,I as F,J as P,L as rt,N as E,e as o,s as q,t as et,u as A,v as M}from"./chunk-PODSCOGA.js";var ct="@firebase/installations",V="0.6.9";var ut=1e4,lt=`w:${V}`,gt="FIS_v2",kt="https://firebaseinstallations.googleapis.com/v1",Mt=60*60*1e3,Pt="installations",Ot="Installations";var Rt={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},_=new M(Pt,Ot,Rt);function ft(e){return e instanceof A&&e.code.includes("request-failed")}function ht({projectId:e}){return`${kt}/projects/${e}/installations`}function dt(e){return{token:e.token,requestStatus:2,expiresIn:Nt(e.expiresIn),creationTime:Date.now()}}function pt(e,t){return o(this,null,function*(){let n=(yield t.json()).error;return _.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})})}function mt({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Lt(e,{refreshToken:t}){let s=mt(e);return s.append("Authorization",Dt(t)),s}function wt(e){return o(this,null,function*(){let t=yield e();return t.status>=500&&t.status<600?e():t})}function Nt(e){return Number(e.replace("s","000"))}function Dt(e){return`${gt} ${e}`}function jt(n,i){return o(this,arguments,function*({appConfig:e,heartbeatServiceProvider:t},{fid:s}){let r=ht(e),a=mt(e),c=t.getImmediate({optional:!0});if(c){let g=yield c.getHeartbeatsHeader();g&&a.append("x-firebase-client",g)}let u={fid:s,authVersion:gt,appId:e.appId,sdkVersion:lt},l={method:"POST",headers:a,body:JSON.stringify(u)},f=yield wt(()=>fetch(r,l));if(f.ok){let g=yield f.json();return{fid:g.fid||s,registrationStatus:2,refreshToken:g.refreshToken,authToken:dt(g.authToken)}}else throw yield pt("Create Installation",f)})}function Tt(e){return new Promise(t=>{setTimeout(t,e)})}function qt(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}var Bt=/^[cdef][\w-]{21}$/,U="";function $t(){try{let e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;let s=Ut(e);return Bt.test(s)?s:U}catch{return U}}function Ut(e){return qt(e).substr(0,22)}function R(e){return`${e.appName}!${e.appId}`}var _t=new Map;function It(e,t){let s=R(e);St(s,t),Vt(s,t)}function St(e,t){let s=_t.get(e);if(s)for(let n of s)n(t)}function Vt(e,t){let s=xt();s&&s.postMessage({key:e,fid:t}),Kt()}var T=null;function xt(){return!T&&"BroadcastChannel"in self&&(T=new BroadcastChannel("[Firebase] FID Change"),T.onmessage=e=>{St(e.data.key,e.data.fid)}),T}function Kt(){_t.size===0&&T&&(T.close(),T=null)}var zt="firebase-installations-database",Ht=1,I="firebase-installations-store",B=null;function x(){return B||(B=it(zt,Ht,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(I)}}})),B}function O(e,t){return o(this,null,function*(){let s=R(e),i=(yield x()).transaction(I,"readwrite"),r=i.objectStore(I),a=yield r.get(s);return yield r.put(t,s),yield i.done,(!a||a.fid!==t.fid)&&It(e,t.fid),t})}function bt(e){return o(this,null,function*(){let t=R(e),n=(yield x()).transaction(I,"readwrite");yield n.objectStore(I).delete(t),yield n.done})}function L(e,t){return o(this,null,function*(){let s=R(e),i=(yield x()).transaction(I,"readwrite"),r=i.objectStore(I),a=yield r.get(s),c=t(a);return c===void 0?yield r.delete(s):yield r.put(c,s),yield i.done,c&&(!a||a.fid!==c.fid)&&It(e,c.fid),c})}function K(e){return o(this,null,function*(){let t,s=yield L(e.appConfig,n=>{let i=Gt(n),r=Jt(e,i);return t=r.registrationPromise,r.installationEntry});return s.fid===U?{installationEntry:yield t}:{installationEntry:s,registrationPromise:t}})}function Gt(e){let t=e||{fid:$t(),registrationStatus:0};return Et(t)}function Jt(e,t){if(t.registrationStatus===0){if(!navigator.onLine){let i=Promise.reject(_.create("app-offline"));return{installationEntry:t,registrationPromise:i}}let s={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},n=Yt(e,s);return{installationEntry:s,registrationPromise:n}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:Wt(e)}:{installationEntry:t}}function Yt(e,t){return o(this,null,function*(){try{let s=yield jt(e,t);return O(e.appConfig,s)}catch(s){throw ft(s)&&s.customData.serverCode===409?yield bt(e.appConfig):yield O(e.appConfig,{fid:t.fid,registrationStatus:0}),s}})}function Wt(e){return o(this,null,function*(){let t=yield at(e.appConfig);for(;t.registrationStatus===1;)yield Tt(100),t=yield at(e.appConfig);if(t.registrationStatus===0){let{installationEntry:s,registrationPromise:n}=yield K(e);return n||s}return t})}function at(e){return L(e,t=>{if(!t)throw _.create("installation-not-found");return Et(t)})}function Et(e){return Xt(e)?{fid:e.fid,registrationStatus:0}:e}function Xt(e){return e.registrationStatus===1&&e.registrationTime+ut<Date.now()}function Qt(n,i){return o(this,arguments,function*({appConfig:e,heartbeatServiceProvider:t},s){let r=Zt(e,s),a=Lt(e,s),c=t.getImmediate({optional:!0});if(c){let g=yield c.getHeartbeatsHeader();g&&a.append("x-firebase-client",g)}let u={installation:{sdkVersion:lt,appId:e.appId}},l={method:"POST",headers:a,body:JSON.stringify(u)},f=yield wt(()=>fetch(r,l));if(f.ok){let g=yield f.json();return dt(g)}else throw yield pt("Generate Auth Token",f)})}function Zt(e,{fid:t}){return`${ht(e)}/${t}/authTokens:generate`}function z(e,t=!1){return o(this,null,function*(){let s,n=yield L(e.appConfig,r=>{if(!Ct(r))throw _.create("not-registered");let a=r.authToken;if(!t&&se(a))return r;if(a.requestStatus===1)return s=te(e,t),r;{if(!navigator.onLine)throw _.create("app-offline");let c=ie(r);return s=ee(e,c),c}});return s?yield s:n.authToken})}function te(e,t){return o(this,null,function*(){let s=yield ot(e.appConfig);for(;s.authToken.requestStatus===1;)yield Tt(100),s=yield ot(e.appConfig);let n=s.authToken;return n.requestStatus===0?z(e,t):n})}function ot(e){return L(e,t=>{if(!Ct(t))throw _.create("not-registered");let s=t.authToken;return re(s)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t})}function ee(e,t){return o(this,null,function*(){try{let s=yield Qt(e,t),n=Object.assign(Object.assign({},t),{authToken:s});return yield O(e.appConfig,n),s}catch(s){if(ft(s)&&(s.customData.serverCode===401||s.customData.serverCode===404))yield bt(e.appConfig);else{let n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});yield O(e.appConfig,n)}throw s}})}function Ct(e){return e!==void 0&&e.registrationStatus===2}function se(e){return e.requestStatus===2&&!ne(e)}function ne(e){let t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Mt}function ie(e){let t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}function re(e){return e.requestStatus===1&&e.requestTime+ut<Date.now()}function ae(e){return o(this,null,function*(){let t=e,{installationEntry:s,registrationPromise:n}=yield K(t);return n?n.catch(console.error):z(t).catch(console.error),s.fid})}function oe(e,t=!1){return o(this,null,function*(){let s=e;return yield ce(s),(yield z(s,t)).token})}function ce(e){return o(this,null,function*(){let{registrationPromise:t}=yield K(e);t&&(yield t)})}function ue(e){if(!e||!e.options)throw $("App Configuration");if(!e.name)throw $("App Name");let t=["projectId","apiKey","appId"];for(let s of t)if(!e.options[s])throw $(s);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function $(e){return _.create("missing-app-config-values",{valueName:e})}var At="installations",le="installations-internal",ge=e=>{let t=e.getProvider("app").getImmediate(),s=ue(t),n=P(t,"heartbeat");return{app:t,appConfig:s,heartbeatServiceProvider:n,_delete:()=>Promise.resolve()}},fe=e=>{let t=e.getProvider("app").getImmediate(),s=P(t,At).getImmediate();return{getId:()=>ae(s),getToken:i=>oe(s,i)}};function he(){F(new v(At,ge,"PUBLIC")),F(new v(le,fe,"PRIVATE"))}he();E(ct,V);E(ct,V,"esm2017");var H="@firebase/remote-config",vt="0.4.9";var G=class{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}};var de="remote-config";var pe={"registration-window":"Undefined window object. This SDK only supports usage in a browser environment.","registration-project-id":"Undefined project identifier. Check Firebase app initialization.","registration-api-key":"Undefined API key. Check Firebase app initialization.","registration-app-id":"Undefined app identifier. Check Firebase app initialization.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","storage-delete":"Error thrown when deleting from storage. Original error: {$originalErrorMessage}.","fetch-client-network":"Fetch client failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-timeout":'The config fetch request timed out.  Configure timeout using "fetchTimeoutMillis" SDK setting.',"fetch-throttle":'The config fetch request timed out while in an exponential backoff state. Configure timeout using "fetchTimeoutMillis" SDK setting. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',"fetch-client-parse":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","indexed-db-unavailable":"Indexed DB is not supported by current browser"},h=new M("remoteconfig","Remote Config",pe);function me(e,t){return e instanceof A&&e.code.indexOf(t)!==-1}var we=!1,Te="",yt=0,_e=["1","true","t","yes","y","on"],k=class{constructor(t,s=Te){this._source=t,this._value=s}asString(){return this._value}asBoolean(){return this._source==="static"?we:_e.indexOf(this._value.toLowerCase())>=0}asNumber(){if(this._source==="static")return yt;let t=Number(this._value);return isNaN(t)&&(t=yt),t}getSource(){return this._source}};function Ie(e){return o(this,null,function*(){let t=p(e),[s,n]=yield Promise.all([t._storage.getLastSuccessfulFetchResponse(),t._storage.getActiveConfigEtag()]);return!s||!s.config||!s.eTag||s.eTag===n?!1:(yield Promise.all([t._storageCache.setActiveConfig(s.config),t._storage.setActiveConfigEtag(s.eTag)]),!0)})}function Se(e){let t=p(e);return t._initializePromise||(t._initializePromise=t._storageCache.loadFromStorage().then(()=>{t._isInitializationComplete=!0})),t._initializePromise}function be(e){return o(this,null,function*(){let t=p(e),s=new G;setTimeout(()=>o(this,null,function*(){s.abort()}),t.settings.fetchTimeoutMillis);try{yield t._client.fetch({cacheMaxAgeMillis:t.settings.minimumFetchIntervalMillis,signal:s}),yield t._storageCache.setLastFetchStatus("success")}catch(n){let i=me(n,"fetch-throttle")?"throttle":"failure";throw yield t._storageCache.setLastFetchStatus(i),n}})}function Ke(e){let t=p(e);return Ee(t._storageCache.getActiveConfig(),t.defaultConfig).reduce((s,n)=>(s[n]=D(e,n),s),{})}function ze(e,t){return D(p(e),t).asBoolean()}function He(e,t){return D(p(e),t).asNumber()}function Ge(e,t){return D(p(e),t).asString()}function D(e,t){let s=p(e);s._isInitializationComplete||s._logger.debug(`A value was requested for key "${t}" before SDK initialization completed. Await on ensureInitialized if the intent was to get a previously activated value.`);let n=s._storageCache.getActiveConfig();return n&&n[t]!==void 0?new k("remote",n[t]):s.defaultConfig&&s.defaultConfig[t]!==void 0?new k("default",String(s.defaultConfig[t])):(s._logger.debug(`Returning static value for key "${t}". Define a default or remote value if this is unintentional.`),new k("static"))}function Je(e,t){let s=p(e);switch(t){case"debug":s._logger.logLevel=y.DEBUG;break;case"silent":s._logger.logLevel=y.SILENT;break;default:s._logger.logLevel=y.ERROR}}function Ee(e={},t={}){return Object.keys(Object.assign(Object.assign({},e),t))}var J=class{constructor(t,s,n,i){this.client=t,this.storage=s,this.storageCache=n,this.logger=i}isCachedDataFresh(t,s){if(!s)return this.logger.debug("Config fetch cache check. Cache unpopulated."),!1;let n=Date.now()-s,i=n<=t;return this.logger.debug(`Config fetch cache check. Cache age millis: ${n}. Cache max age millis (minimumFetchIntervalMillis setting): ${t}. Is cache hit: ${i}.`),i}fetch(t){return o(this,null,function*(){let[s,n]=yield Promise.all([this.storage.getLastSuccessfulFetchTimestampMillis(),this.storage.getLastSuccessfulFetchResponse()]);if(n&&this.isCachedDataFresh(t.cacheMaxAgeMillis,s))return n;t.eTag=n&&n.eTag;let i=yield this.client.fetch(t),r=[this.storageCache.setLastSuccessfulFetchTimestampMillis(Date.now())];return i.status===200&&r.push(this.storage.setLastSuccessfulFetchResponse(i)),yield Promise.all(r),i})}};function Ce(e=navigator){return e.languages&&e.languages[0]||e.language}var Y=class{constructor(t,s,n,i,r,a){this.firebaseInstallations=t,this.sdkVersion=s,this.namespace=n,this.projectId=i,this.apiKey=r,this.appId=a}fetch(t){return o(this,null,function*(){let[s,n]=yield Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken()]),r=`${window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfig.googleapis.com"}/v1/projects/${this.projectId}/namespaces/${this.namespace}:fetch?key=${this.apiKey}`,a={"Content-Type":"application/json","Content-Encoding":"gzip","If-None-Match":t.eTag||"*"},c={sdk_version:this.sdkVersion,app_instance_id:s,app_instance_id_token:n,app_id:this.appId,language_code:Ce()},u={method:"POST",headers:a,body:JSON.stringify(c)},l=fetch(r,u),f=new Promise((d,w)=>{t.signal.addEventListener(()=>{let tt=new Error("The operation was aborted.");tt.name="AbortError",w(tt)})}),g;try{yield Promise.race([l,f]),g=yield l}catch(d){let w="fetch-client-network";throw d?.name==="AbortError"&&(w="fetch-timeout"),h.create(w,{originalErrorMessage:d?.message})}let m=g.status,j=g.headers.get("ETag")||void 0,b,C;if(g.status===200){let d;try{d=yield g.json()}catch(w){throw h.create("fetch-client-parse",{originalErrorMessage:w?.message})}b=d.entries,C=d.state}if(C==="INSTANCE_STATE_UNSPECIFIED"?m=500:C==="NO_CHANGE"?m=304:(C==="NO_TEMPLATE"||C==="EMPTY_CONFIG")&&(b={}),m!==304&&m!==200)throw h.create("fetch-status",{httpStatus:m});return{status:m,eTag:j,config:b}})}};function Ae(e,t){return new Promise((s,n)=>{let i=Math.max(t-Date.now(),0),r=setTimeout(s,i);e.addEventListener(()=>{clearTimeout(r),n(h.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function ve(e){if(!(e instanceof A)||!e.customData)return!1;let t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}var W=class{constructor(t,s){this.client=t,this.storage=s}fetch(t){return o(this,null,function*(){let s=(yield this.storage.getThrottleMetadata())||{backoffCount:0,throttleEndTimeMillis:Date.now()};return this.attemptFetch(t,s)})}attemptFetch(i,r){return o(this,arguments,function*(t,{throttleEndTimeMillis:s,backoffCount:n}){yield Ae(t.signal,s);try{let a=yield this.client.fetch(t);return yield this.storage.deleteThrottleMetadata(),a}catch(a){if(!ve(a))throw a;let c={throttleEndTimeMillis:Date.now()+st(n),backoffCount:n+1};return yield this.storage.setThrottleMetadata(c),this.attemptFetch(t,c)}})}};var ye=60*1e3,Fe=12*60*60*1e3,X=class{constructor(t,s,n,i,r){this.app=t,this._client=s,this._storageCache=n,this._storage=i,this._logger=r,this._isInitializationComplete=!1,this.settings={fetchTimeoutMillis:ye,minimumFetchIntervalMillis:Fe},this.defaultConfig={}}get fetchTimeMillis(){return this._storageCache.getLastSuccessfulFetchTimestampMillis()||-1}get lastFetchStatus(){return this._storageCache.getLastFetchStatus()||"no-fetch-yet"}};function N(e,t){let s=e.target.error||void 0;return h.create(t,{originalErrorMessage:s&&s?.message})}var S="app_namespace_store",ke="firebase_remote_config",Me=1;function Pe(){return new Promise((e,t)=>{try{let s=indexedDB.open(ke,Me);s.onerror=n=>{t(N(n,"storage-open"))},s.onsuccess=n=>{e(n.target.result)},s.onupgradeneeded=n=>{let i=n.target.result;switch(n.oldVersion){case 0:i.createObjectStore(S,{keyPath:"compositeKey"})}}}catch(s){t(h.create("storage-open",{originalErrorMessage:s?.message}))}})}var Q=class{constructor(t,s,n,i=Pe()){this.appId=t,this.appName=s,this.namespace=n,this.openDbPromise=i}getLastFetchStatus(){return this.get("last_fetch_status")}setLastFetchStatus(t){return this.set("last_fetch_status",t)}getLastSuccessfulFetchTimestampMillis(){return this.get("last_successful_fetch_timestamp_millis")}setLastSuccessfulFetchTimestampMillis(t){return this.set("last_successful_fetch_timestamp_millis",t)}getLastSuccessfulFetchResponse(){return this.get("last_successful_fetch_response")}setLastSuccessfulFetchResponse(t){return this.set("last_successful_fetch_response",t)}getActiveConfig(){return this.get("active_config")}setActiveConfig(t){return this.set("active_config",t)}getActiveConfigEtag(){return this.get("active_config_etag")}setActiveConfigEtag(t){return this.set("active_config_etag",t)}getThrottleMetadata(){return this.get("throttle_metadata")}setThrottleMetadata(t){return this.set("throttle_metadata",t)}deleteThrottleMetadata(){return this.delete("throttle_metadata")}get(t){return o(this,null,function*(){let s=yield this.openDbPromise;return new Promise((n,i)=>{let a=s.transaction([S],"readonly").objectStore(S),c=this.createCompositeKey(t);try{let u=a.get(c);u.onerror=l=>{i(N(l,"storage-get"))},u.onsuccess=l=>{let f=l.target.result;n(f?f.value:void 0)}}catch(u){i(h.create("storage-get",{originalErrorMessage:u?.message}))}})})}set(t,s){return o(this,null,function*(){let n=yield this.openDbPromise;return new Promise((i,r)=>{let c=n.transaction([S],"readwrite").objectStore(S),u=this.createCompositeKey(t);try{let l=c.put({compositeKey:u,value:s});l.onerror=f=>{r(N(f,"storage-set"))},l.onsuccess=()=>{i()}}catch(l){r(h.create("storage-set",{originalErrorMessage:l?.message}))}})})}delete(t){return o(this,null,function*(){let s=yield this.openDbPromise;return new Promise((n,i)=>{let a=s.transaction([S],"readwrite").objectStore(S),c=this.createCompositeKey(t);try{let u=a.delete(c);u.onerror=l=>{i(N(l,"storage-delete"))},u.onsuccess=()=>{n()}}catch(u){i(h.create("storage-delete",{originalErrorMessage:u?.message}))}})})}createCompositeKey(t){return[this.appId,this.appName,this.namespace,t].join()}};var Z=class{constructor(t){this.storage=t}getLastFetchStatus(){return this.lastFetchStatus}getLastSuccessfulFetchTimestampMillis(){return this.lastSuccessfulFetchTimestampMillis}getActiveConfig(){return this.activeConfig}loadFromStorage(){return o(this,null,function*(){let t=this.storage.getLastFetchStatus(),s=this.storage.getLastSuccessfulFetchTimestampMillis(),n=this.storage.getActiveConfig(),i=yield t;i&&(this.lastFetchStatus=i);let r=yield s;r&&(this.lastSuccessfulFetchTimestampMillis=r);let a=yield n;a&&(this.activeConfig=a)})}setLastFetchStatus(t){return this.lastFetchStatus=t,this.storage.setLastFetchStatus(t)}setLastSuccessfulFetchTimestampMillis(t){return this.lastSuccessfulFetchTimestampMillis=t,this.storage.setLastSuccessfulFetchTimestampMillis(t)}setActiveConfig(t){return this.activeConfig=t,this.storage.setActiveConfig(t)}};function Oe(){F(new v(de,e,"PUBLIC").setMultipleInstances(!0)),E(H,vt),E(H,vt,"esm2017");function e(t,{instanceIdentifier:s}){let n=t.getProvider("app").getImmediate(),i=t.getProvider("installations-internal").getImmediate();if(typeof window>"u")throw h.create("registration-window");if(!q())throw h.create("indexed-db-unavailable");let{projectId:r,apiKey:a,appId:c}=n.options;if(!r)throw h.create("registration-project-id");if(!a)throw h.create("registration-api-key");if(!c)throw h.create("registration-app-id");s=s||"firebase";let u=new Q(c,n.name,s),l=new Z(u),f=new nt(H);f.logLevel=y.ERROR;let g=new Y(i,rt,s,r,a,c),m=new W(g,u),j=new J(m,u,l,f),b=new X(n,j,l,u,f);return Se(b),b}}function Ye(e){return o(this,null,function*(){return e=p(e),yield be(e),Ie(e)})}function We(){return o(this,null,function*(){if(!q())return!1;try{return yield et()}catch{return!1}})}Oe();export{Ie as a,Se as b,be as c,Ke as d,ze as e,He as f,Ge as g,D as h,Je as i,Ye as j,We as k};
