var C,d,M,S,W,H,D={},F=[],Q=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function k(_,e){for(var t in e)_[t]=e[t];return _}function I(_){var e=_.parentNode;e&&e.removeChild(_)}function X(_,e,t){var o,l,r,c={};for(r in e)r=="key"?o=e[r]:r=="ref"?l=e[r]:c[r]=e[r];if(arguments.length>2&&(c.children=arguments.length>3?C.call(arguments,2):t),typeof _=="function"&&_.defaultProps!=null)for(r in _.defaultProps)c[r]===void 0&&(c[r]=_.defaultProps[r]);return E(_,c,o,l,null)}function E(_,e,t,o,l){var r={type:_,props:e,key:t,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:l??++M};return l==null&&d.vnode!=null&&d.vnode(r),r}function T(_){return _.children}function N(_,e){this.props=_,this.context=e}function x(_,e){if(e==null)return _.__?x(_.__,_.__.__k.indexOf(_)+1):null;for(var t;e<_.__k.length;e++)if((t=_.__k[e])!=null&&t.__e!=null)return t.__e;return typeof _.type=="function"?x(_):null}function O(_){var e,t;if((_=_.__)!=null&&_.__c!=null){for(_.__e=_.__c.base=null,e=0;e<_.__k.length;e++)if((t=_.__k[e])!=null&&t.__e!=null){_.__e=_.__c.base=t.__e;break}return O(_)}}function R(_){(!_.__d&&(_.__d=!0)&&S.push(_)&&!U.__r++||H!==d.debounceRendering)&&((H=d.debounceRendering)||W)(U)}function U(){for(var _;U.__r=S.length;)_=S.sort(function(e,t){return e.__v.__b-t.__v.__b}),S=[],_.some(function(e){var t,o,l,r,c,u;e.__d&&(c=(r=(t=e).__v).__e,(u=t.__P)&&(o=[],(l=k({},r)).__v=r.__v+1,L(u,r,l,t.__n,u.ownerSVGElement!==void 0,r.__h!=null?[c]:null,o,c??x(r),r.__h),q(o,r),r.__e!=c&&O(r)))})}function $(_,e,t,o,l,r,c,u,p,a){var n,v,s,i,f,b,h,y=o&&o.__k||F,m=y.length;for(t.__k=[],n=0;n<e.length;n++)if((i=t.__k[n]=(i=e[n])==null||typeof i=="boolean"?null:typeof i=="string"||typeof i=="number"||typeof i=="bigint"?E(null,i,null,null,i):Array.isArray(i)?E(T,{children:i},null,null,null):i.__b>0?E(i.type,i.props,i.key,null,i.__v):i)!=null){if(i.__=t,i.__b=t.__b+1,(s=y[n])===null||s&&i.key==s.key&&i.type===s.type)y[n]=void 0;else for(v=0;v<m;v++){if((s=y[v])&&i.key==s.key&&i.type===s.type){y[v]=void 0;break}s=null}L(_,i,s=s||D,l,r,c,u,p,a),f=i.__e,(v=i.ref)&&s.ref!=v&&(h||(h=[]),s.ref&&h.push(s.ref,null,i),h.push(v,i.__c||f,i)),f!=null?(b==null&&(b=f),typeof i.type=="function"&&i.__k===s.__k?i.__d=p=B(i,p,_):p=j(_,i,s,y,f,p),typeof t.type=="function"&&(t.__d=p)):p&&s.__e==p&&p.parentNode!=_&&(p=x(s))}for(t.__e=b,n=m;n--;)y[n]!=null&&(typeof t.type=="function"&&y[n].__e!=null&&y[n].__e==t.__d&&(t.__d=x(o,n+1)),K(y[n],y[n]));if(h)for(n=0;n<h.length;n++)J(h[n],h[++n],h[++n])}function B(_,e,t){for(var o,l=_.__k,r=0;l&&r<l.length;r++)(o=l[r])&&(o.__=_,e=typeof o.type=="function"?B(o,e,t):j(t,o,o,l,o.__e,e));return e}function j(_,e,t,o,l,r){var c,u,p;if(e.__d!==void 0)c=e.__d,e.__d=void 0;else if(t==null||l!=r||l.parentNode==null)e:if(r==null||r.parentNode!==_)_.appendChild(l),c=null;else{for(u=r,p=0;(u=u.nextSibling)&&p<o.length;p+=2)if(u==l)break e;_.insertBefore(l,r),c=r}return c!==void 0?c:l.nextSibling}function Y(_,e,t,o,l){var r;for(r in t)r==="children"||r==="key"||r in e||A(_,r,null,t[r],o);for(r in e)l&&typeof e[r]!="function"||r==="children"||r==="key"||r==="value"||r==="checked"||t[r]===e[r]||A(_,r,e[r],t[r],o)}function z(_,e,t){e[0]==="-"?_.setProperty(e,t):_[e]=t==null?"":typeof t!="number"||Q.test(e)?t:t+"px"}function A(_,e,t,o,l){var r;e:if(e==="style")if(typeof t=="string")_.style.cssText=t;else{if(typeof o=="string"&&(_.style.cssText=o=""),o)for(e in o)t&&e in t||z(_.style,e,"");if(t)for(e in t)o&&t[e]===o[e]||z(_.style,e,t[e])}else if(e[0]==="o"&&e[1]==="n")r=e!==(e=e.replace(/Capture$/,"")),e=e.toLowerCase()in _?e.toLowerCase().slice(2):e.slice(2),_.l||(_.l={}),_.l[e+r]=t,t?o||_.addEventListener(e,r?V:G,r):_.removeEventListener(e,r?V:G,r);else if(e!=="dangerouslySetInnerHTML"){if(l)e=e.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if(e!=="href"&&e!=="list"&&e!=="form"&&e!=="tabIndex"&&e!=="download"&&e in _)try{_[e]=t??"";break e}catch{}typeof t=="function"||(t!=null&&(t!==!1||e[0]==="a"&&e[1]==="r")?_.setAttribute(e,t):_.removeAttribute(e))}}function G(_){this.l[_.type+!1](d.event?d.event(_):_)}function V(_){this.l[_.type+!0](d.event?d.event(_):_)}function L(_,e,t,o,l,r,c,u,p){var a,n,v,s,i,f,b,h,y,m,P,g=e.type;if(e.constructor!==void 0)return null;t.__h!=null&&(p=t.__h,u=e.__e=t.__e,e.__h=null,r=[u]),(a=d.__b)&&a(e);try{e:if(typeof g=="function"){if(h=e.props,y=(a=g.contextType)&&o[a.__c],m=a?y?y.props.value:a.__:o,t.__c?b=(n=e.__c=t.__c).__=n.__E:("prototype"in g&&g.prototype.render?e.__c=n=new g(h,m):(e.__c=n=new N(h,m),n.constructor=g,n.render=ee),y&&y.sub(n),n.props=h,n.state||(n.state={}),n.context=m,n.__n=o,v=n.__d=!0,n.__h=[]),n.__s==null&&(n.__s=n.state),g.getDerivedStateFromProps!=null&&(n.__s==n.state&&(n.__s=k({},n.__s)),k(n.__s,g.getDerivedStateFromProps(h,n.__s))),s=n.props,i=n.state,v)g.getDerivedStateFromProps==null&&n.componentWillMount!=null&&n.componentWillMount(),n.componentDidMount!=null&&n.__h.push(n.componentDidMount);else{if(g.getDerivedStateFromProps==null&&h!==s&&n.componentWillReceiveProps!=null&&n.componentWillReceiveProps(h,m),!n.__e&&n.shouldComponentUpdate!=null&&n.shouldComponentUpdate(h,n.__s,m)===!1||e.__v===t.__v){n.props=h,n.state=n.__s,e.__v!==t.__v&&(n.__d=!1),n.__v=e,e.__e=t.__e,e.__k=t.__k,e.__k.forEach(function(w){w&&(w.__=e)}),n.__h.length&&c.push(n);break e}n.componentWillUpdate!=null&&n.componentWillUpdate(h,n.__s,m),n.componentDidUpdate!=null&&n.__h.push(function(){n.componentDidUpdate(s,i,f)})}n.context=m,n.props=h,n.state=n.__s,(a=d.__r)&&a(e),n.__d=!1,n.__v=e,n.__P=_,a=n.render(n.props,n.state,n.context),n.state=n.__s,n.getChildContext!=null&&(o=k(k({},o),n.getChildContext())),v||n.getSnapshotBeforeUpdate==null||(f=n.getSnapshotBeforeUpdate(s,i)),P=a!=null&&a.type===T&&a.key==null?a.props.children:a,$(_,Array.isArray(P)?P:[P],e,t,o,l,r,c,u,p),n.base=e.__e,e.__h=null,n.__h.length&&c.push(n),b&&(n.__E=n.__=null),n.__e=!1}else r==null&&e.__v===t.__v?(e.__k=t.__k,e.__e=t.__e):e.__e=Z(t.__e,e,t,o,l,r,c,p);(a=d.diffed)&&a(e)}catch(w){e.__v=null,(p||r!=null)&&(e.__e=u,e.__h=!!p,r[r.indexOf(u)]=null),d.__e(w,e,t)}}function q(_,e){d.__c&&d.__c(e,_),_.some(function(t){try{_=t.__h,t.__h=[],_.some(function(o){o.call(t)})}catch(o){d.__e(o,t.__v)}})}function Z(_,e,t,o,l,r,c,u){var p,a,n,v=t.props,s=e.props,i=e.type,f=0;if(i==="svg"&&(l=!0),r!=null){for(;f<r.length;f++)if((p=r[f])&&(p===_||(i?p.localName==i:p.nodeType==3))){_=p,r[f]=null;break}}if(_==null){if(i===null)return document.createTextNode(s);_=l?document.createElementNS("http://www.w3.org/2000/svg",i):document.createElement(i,s.is&&s),r=null,u=!1}if(i===null)v===s||u&&_.data===s||(_.data=s);else{if(r=r&&C.call(_.childNodes),a=(v=t.props||D).dangerouslySetInnerHTML,n=s.dangerouslySetInnerHTML,!u){if(r!=null)for(v={},f=0;f<_.attributes.length;f++)v[_.attributes[f].name]=_.attributes[f].value;(n||a)&&(n&&(a&&n.__html==a.__html||n.__html===_.innerHTML)||(_.innerHTML=n&&n.__html||""))}if(Y(_,s,v,l,u),n)e.__k=[];else if(f=e.props.children,$(_,Array.isArray(f)?f:[f],e,t,o,l&&i!=="foreignObject",r,c,r?r[0]:t.__k&&x(t,0),u),r!=null)for(f=r.length;f--;)r[f]!=null&&I(r[f]);u||("value"in s&&(f=s.value)!==void 0&&(f!==_.value||i==="progress"&&!f)&&A(_,"value",f,v.value,!1),"checked"in s&&(f=s.checked)!==void 0&&f!==_.checked&&A(_,"checked",f,v.checked,!1))}return _}function J(_,e,t){try{typeof _=="function"?_(e):_.current=e}catch(o){d.__e(o,t)}}function K(_,e,t){var o,l;if(d.unmount&&d.unmount(_),(o=_.ref)&&(o.current&&o.current!==_.__e||J(o,null,e)),(o=_.__c)!=null){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(r){d.__e(r,e)}o.base=o.__P=null}if(o=_.__k)for(l=0;l<o.length;l++)o[l]&&K(o[l],e,typeof _.type!="function");t||_.__e==null||I(_.__e),_.__e=_.__d=void 0}function ee(_,e,t){return this.constructor(_,t)}function _e(_,e,t){var o,l,r;d.__&&d.__(_,e),l=(o=typeof t=="function")?null:t&&t.__k||e.__k,r=[],L(e,_=(!o&&t||e).__k=X(T,null,[_]),l||D,D,e.ownerSVGElement!==void 0,!o&&t?[t]:l?null:e.firstChild?C.call(e.childNodes):null,r,!o&&t?t:l?l.__e:e.firstChild,o),q(r,_)}C=F.slice,d={__e:function(_,e){for(var t,o,l;e=e.__;)if((t=e.__c)&&!t.__)try{if((o=t.constructor)&&o.getDerivedStateFromError!=null&&(t.setState(o.getDerivedStateFromError(_)),l=t.__d),t.componentDidCatch!=null&&(t.componentDidCatch(_),l=t.__d),l)return t.__E=t}catch(r){_=r}throw _}},M=0,N.prototype.setState=function(_,e){var t;t=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=k({},this.state),typeof _=="function"&&(_=_(k({},t),this.props)),_&&k(t,_),_!=null&&this.__v&&(e&&this.__h.push(e),R(this))},N.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),R(this))},N.prototype.render=T,S=[],W=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,U.__r=0;export{_e as S,d as l,X as v};
