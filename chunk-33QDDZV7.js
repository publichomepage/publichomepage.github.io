import{a as g,b as a,c as o,d as l,e as d,f as u,g as c,h as f,i as h,j as m,k as p}from"./chunk-PJR4UZTX.js";import{E as n,O as s}from"./chunk-PODSCOGA.js";var r=class{constructor(e,i){this.app=e,this._delegate=i}get defaultConfig(){return this._delegate.defaultConfig}set defaultConfig(e){this._delegate.defaultConfig=e}get fetchTimeMillis(){return this._delegate.fetchTimeMillis}get lastFetchStatus(){return this._delegate.lastFetchStatus}get settings(){return this._delegate.settings}set settings(e){this._delegate.settings=e}activate(){return g(this._delegate)}ensureInitialized(){return a(this._delegate)}fetch(){return o(this._delegate)}fetchAndActivate(){return m(this._delegate)}getAll(){return l(this._delegate)}getBoolean(e){return d(this._delegate,e)}getNumber(e){return u(this._delegate,e)}getString(e){return c(this._delegate,e)}getValue(e){return f(this._delegate,e)}setLogLevel(e){h(this._delegate,e)}},C="@firebase/remote-config-compat",v="0.2.9";function A(t){t.INTERNAL.registerComponent(new n("remoteConfig-compat",I,"PUBLIC").setMultipleInstances(!0).setServiceProps({isSupported:p})),t.registerVersion(C,v)}function I(t,{instanceIdentifier:e}){let i=t.getProvider("app-compat").getImmediate(),_=t.getProvider("remote-config").getImmediate({identifier:e});return new r(i,_)}A(s);
