(this["webpackJsonpsidebar-plants"]=this["webpackJsonpsidebar-plants"]||[]).push([[0],{24:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(2),c=n(7),s=(n(21),n(22),n(23),n(24),n(3)),i=n.n(s),o=n(5),u=n(11),l=n(12),p=n(16),d=n(14),f=n(4),b=n(13),j=n(1),h=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(e){var r;return Object(u.a)(this,n),(r=t.call(this,e)).onConfigure=Object(o.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.props.sdk.app.getCurrentState();case 2:return t=e.sent,e.abrupt("return",{parameters:r.state.parameters,targetState:t});case 4:case"end":return e.stop()}}),e)}))),r.state={parameters:{}},e.sdk.app.onConfigure((function(){return r.onConfigure()})),r}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=Object(o.a)(i.a.mark((function e(){var t,n=this;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.props.sdk.app.getParameters();case 2:t=e.sent,this.setState(t?{parameters:t}:this.state,(function(){n.props.sdk.app.setReady()}));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(j.jsx)(f.h,{className:Object(b.a)({margin:"80px"}),children:Object(j.jsxs)(f.d,{children:[Object(j.jsx)(f.e,{children:"Sidebar: Plants"}),Object(j.jsx)(f.g,{children:"No additional configuration required :)"})]})})}}]),n}(r.Component),O=n(15),m=n(10),x=(n(28),function(e){var t,n,a=e.sdk,c=a.entry,s=c.getSys(),u=!!s.publishedAt,l=null!==(t=c.fields.genus.getValue())&&void 0!==t?t:"",p=null!==(n=c.fields.species.getValue())&&void 0!==n?n:"",d=Object(r.useState)(!1),b=Object(m.a)(d,2),h=b[0],x=b[1],y=(l.slice(0,2)+p.slice(0,2)).toUpperCase(),v=Object(r.useState)([]),g=Object(m.a)(v,2),k=g[0],w=g[1];Object(r.useEffect)((function(){Object(o.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={content_type:"plant","fields.commonInfo.sys.id":s.id,order:"fields.code"},e.next=3,a.space.getEntries(t);case 3:n=e.sent,w(n.items.map((function(e){return{id:e.sys.id,code:e.fields.code.fr}})));case 5:case"end":return e.stop()}}),e)})))()}),[a,s]);var C=function(){var e=Object(o.a)(i.a.mark((function e(){var t,n,r,c,s,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={content_type:"plant","fields.code[match]":y,order:"-fields.code",limit:1},e.next=3,a.space.getEntries(t);case 3:if(0!==(n=e.sent).total){e.next=6;break}return e.abrupt("return","".concat(y,"-01"));case 6:return r=n.items[0],c=parseInt(r.fields.code.fr.split("-")[1]),o=(s=c+1)<10?"0".concat(s):s,e.abrupt("return","".concat(y,"-").concat(o));case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),E=function(){var e=Object(o.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x(!0),e.prev=1,e.next=4,C();case 4:return t=e.sent,e.next=7,a.space.createEntry("plant",{fields:{commonInfo:{fr:{sys:{type:"Link",linkType:"Entry",id:s.id}}},code:{fr:t}}});case 7:return n=e.sent,e.next=10,a.space.publishEntry(n);case 10:w([].concat(Object(O.a)(k),[{id:n.sys.id,code:n.fields.code.fr}])),a.notifier.success("Plant ".concat(n.fields.code.fr," created!")),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(1),a.notifier.error("Could not create a new plant :(");case 17:x(!1);case 18:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(){return e.apply(this,arguments)}}();return Object(j.jsx)("div",{children:u?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)(f.a,{isFullWidth:!0,icon:"Plus",buttonType:"positive",loading:h,disabled:h,onClick:function(){return E()},children:[h?"Creating":"Create"," new ",Object(j.jsx)("b",{children:y})]}),k.length>0?Object(j.jsx)(f.b,{className:"plant-entity-list",children:k.map((function(e){return Object(j.jsx)(f.c,{title:e.code,onClick:function(){return a.navigator.openEntry(e.id,{slideIn:!0})},className:"plant-entity-list-item"},e.id)}))}):Object(j.jsx)(f.g,{className:"plant-entity-list-empty",children:"No plants for this entry."})]}):Object(j.jsxs)(f.f,{noteType:"warning",children:["Cannot create a plant until this entry is ",Object(j.jsx)("b",{children:"published"})]})})});Object(c.init)((function(e){var t=document.getElementById("root");[{location:c.locations.LOCATION_APP_CONFIG,component:Object(j.jsx)(h,{sdk:e})},{location:c.locations.LOCATION_ENTRY_SIDEBAR,component:Object(j.jsx)(x,{sdk:e})}].forEach((function(n){e.location.is(c.locations.LOCATION_ENTRY_SIDEBAR)&&e.window.startAutoResizer(),e.location.is(n.location)&&Object(a.render)(n.component,t)}))}))}},[[29,1,2]]]);
//# sourceMappingURL=main.e230697e.chunk.js.map