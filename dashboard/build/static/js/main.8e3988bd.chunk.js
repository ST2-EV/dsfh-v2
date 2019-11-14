(this["webpackJsonpdsfh-dashboard"]=this["webpackJsonpdsfh-dashboard"]||[]).push([[0],{189:function(e,t,a){e.exports=a(354)},194:function(e,t,a){},195:function(e,t,a){},350:function(e,t){},354:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),r=a(53),c=a.n(r),o=(a(194),a(195),a(63)),i=a(359),m=a(360),s=a(361),u=a(362),d=a(363),E=a(364),h=a(365),p=function(e){var t=Object(n.useState)(!0),a=Object(o.a)(t,2),r=a[0],c=a[1];return l.a.createElement("div",null,l.a.createElement(i.a,{color:"dark",dark:!0},l.a.createElement(m.a,{href:"/",className:"mr-auto"},"D.S.F.H"),l.a.createElement(s.a,{onClick:function(){return c(!r)},className:"mr-2"}),l.a.createElement(u.a,{isOpen:!r,navbar:!0},l.a.createElement(d.a,{navbar:!0},l.a.createElement(E.a,null,l.a.createElement(h.a,{href:"https://github.com/ST2-EV/DSFH"},"GitHub"))))))},f=a(382),b=a(383),g=a(367),y=a(368),v=a(369),O=a(6),j=a.n(O),k=a(34),S=a(35),C=a(38),D=a(36),_=a(37),x=a(173),B=a.n(x).a.initializeApp({apiKey:"AIzaSyC9xyHAHZs49bErl3komHwCEreTToo7yg0",authDomain:"dsfh-1097c.firebaseapp.com",databaseURL:"https://dsfh-1097c.firebaseio.com",projectId:"dsfh-1097c",storageBucket:"dsfh-1097c.appspot.com",messagingSenderId:"33485448578",appId:"1:33485448578:web:871f0dbec54911620edb9b",measurementId:"G-MPK00LTBJ2"}).firestore(),w=a(370),F=a(371),I=a(386),M=a(388),N=a(384),T=a(387),H=function(e){function t(){return Object(k.a)(this,t),Object(C.a)(this,Object(D.a)(t).apply(this,arguments))}return Object(_.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){return l.a.createElement(I.a,{domainPadding:50,theme:M.a.material},l.a.createElement(N.a,{alignment:"start",labelComponent:l.a.createElement(T.a,{textAnchor:"start",capHeight:"string",angle:"-45"}),data:this.props.data,x:"index",y:"names"}))}}]),t}(n.Component),A={marginTop:"80px"},R=function(e){function t(e){var a;return Object(k.a)(this,t),(a=Object(C.a)(this,Object(D.a)(t).call(this,e))).fetchFromDB=function(){B.collection("Images").get().then((function(e){for(var t=e.docs.map((function(e){return e.data()})),n=0;n<t.length;n++)t[n].names=t[n].names.length,t[n].index=n;a.setState({data:t})}))},a.state={data:[]},a}return Object(_.a)(t,e),Object(S.a)(t,[{key:"componentDidMount",value:function(){this.fetchFromDB()}},{key:"render",value:function(){return l.a.createElement(g.a,null,l.a.createElement(y.a,null,l.a.createElement(v.a,{xs:"4",style:A},l.a.createElement("h5",null,l.a.createElement("strong",null,"Diseases collected so far:")),l.a.createElement(w.a,{striped:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"#"),l.a.createElement("th",null,"Disease name"),l.a.createElement("th",null,"Number of images"))),l.a.createElement("tbody",null,this.state.data.map((function(e,t){return l.a.createElement("tr",{key:t},l.a.createElement("th",{scope:"row"},t),l.a.createElement("td",null,e.label),l.a.createElement("td",null,e.names))})))),l.a.createElement(F.a,{color:"primary",onClick:this.fetchFromDB},"Reload")),l.a.createElement(v.a,{xs:"8"},l.a.createElement(H,{data:this.state.data}))))}}]),t}(n.Component),J=a(389),L=a(372),P=a(373),q=a(185),z=a.n(q),G=function(e){function t(){return Object(k.a)(this,t),Object(C.a)(this,Object(D.a)(t).apply(this,arguments))}return Object(_.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(z.a,{value:"http://35.223.18.41:5000/deploy/"+this.props.name+"/a/"}),",")}}]),t}(n.Component),K=function(e){var t=e.name,a=e.className,r=Object(n.useState)(!1),c=Object(o.a)(r,2),i=c[0],m=c[1],s=function(){return m(!i)};return l.a.createElement("div",null,l.a.createElement(F.a,{color:"success",onClick:s},t),l.a.createElement(J.a,{isOpen:i,toggle:s,className:a},l.a.createElement(L.a,{toggle:s},"Scan this with the App!"),l.a.createElement(P.a,null,l.a.createElement("div",{style:{marginLeft:"167px"}},l.a.createElement(G,{name:t})))))},Q=a(374),U=function(e){return l.a.createElement("div",null,l.a.createElement(Q.a,{type:"grow",color:"success"}),l.a.createElement(Q.a,{type:"grow",color:"danger"}),l.a.createElement(Q.a,{type:"grow",color:"warning"}))},V={marginTop:"80px"},Z=function(e){function t(e){var a;return Object(k.a)(this,t),(a=Object(C.a)(this,Object(D.a)(t).call(this,e))).fetchFromDB=function(){a.setState({loading:!0}),B.collection("Models").get().then((function(e){var t=e.docs.map((function(e){return e.data()}));a.setState({model_data:t})})),a.setState({loading:!1})},a.state={model_data:[],loading:!1},a}return Object(_.a)(t,e),Object(S.a)(t,[{key:"componentDidMount",value:function(){this.fetchFromDB()}},{key:"render",value:function(){return l.a.createElement(g.a,{style:V},l.a.createElement("h5",null,l.a.createElement("strong",null,"Models trained:")),l.a.createElement(w.a,{striped:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"#"),l.a.createElement("th",null,"Model name"),l.a.createElement("th",null,"Diseases involved"),l.a.createElement("th",null,"Description"),l.a.createElement("th",null,"QR-code"))),l.a.createElement("tbody",null,this.state.model_data.map((function(e,t){return l.a.createElement("tr",{key:t},l.a.createElement("th",{scope:"row"},t),l.a.createElement("td",null,e.name),l.a.createElement("td",null,l.a.createElement("ul",null,e.labels.map((function(e,t){return l.a.createElement("li",{key:t},e)})))),l.a.createElement("td",null,e.desciption),l.a.createElement("td",null,l.a.createElement(K,{name:e.name})))})))),!this.state.loading&&l.a.createElement(F.a,{color:"primary",onClick:this.fetchFromDB},"Reload"),this.state.loading&&l.a.createElement(U,null))}}]),t}(n.Component),W=a(187),X=a(87),Y=a(14),$=a(375),ee=a(376),te=a(377),ae=a(378),ne=a(379),le=a(380),re=a(381),ce=a(186),oe={marginTop:"80px"},ie={textAlign:"center",mariginTop:"10px",padding:"20px"},me=a.n(ce).a.connect("http://35.223.18.41:5000/"),se=function(e){function t(){var e,a;Object(k.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(a=Object(C.a)(this,(e=Object(D.a)(t)).call.apply(e,[this].concat(l)))).state={model_name:"",description:"",diseases:[],labels:[],deployed_model:{},deployed_model_bool:!1,loading:!1,error_data:"",after_train:!1},a.onChange=function(e){a.setState(Object(X.a)({},e.target.name,e.target.value))},a.fetchFromDB=function(){a.setState({loading:!0}),B.collection("Images").get().then((function(e){for(var t=e.docs.map((function(e){return e.data()})),n=[],l=0;l<t.length;l++)n.push(t[l].label);a.setState({labels:n})})),a.setState({loading:!1})},a.onCheckboxBtnClick=function(e){var t=Object(W.a)(a.state.diseases),n=t.indexOf(e);n<0?t.push(e):t.splice(n,1),a.setState({diseases:t})},a.onSubmit=function(e){a.setState({loading:!0}),e.preventDefault();var t=a.state,n=t.description,l=t.model_name,r=t.diseases;a.setState({model_name:"",description:"",diseases:[]}),me.emit("train",{labels:r,description:n,model:l}),a.setState({loading:!1,after_train:!0}),console.log("emitted"),me.on("trainResponse",function(e){this.setState({deployed_model:e,deployed_model_bool:!0,loading:!1}),this.fetchFromDB()}.bind(Object(Y.a)(a))),me.on("error",function(e){this.setState({error_data:e.message,loading:!1})}.bind(Object(Y.a)(a)))},a}return Object(_.a)(t,e),Object(S.a)(t,[{key:"componentDidMount",value:function(){this.fetchFromDB()}},{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement($.a,{onSubmit:this.onSubmit,style:oe},l.a.createElement("h5",null,l.a.createElement("strong",null,"Make a new model:")),l.a.createElement(ee.a,null,l.a.createElement(te.a,{for:"Model-Name"},"Model Name:"),l.a.createElement(ae.a,{type:"text",name:"model_name",id:"model_name",value:this.state.model_name,onChange:this.onChange,required:!0})),l.a.createElement(ee.a,null,l.a.createElement(te.a,{for:"description"},"Description:"),l.a.createElement(ae.a,{type:"text",name:"description",id:"description",value:this.state.description,onChange:this.onChange,required:!0})),l.a.createElement("p",null,"Select Diseases:"),l.a.createElement(ne.a,null,l.a.createElement(le.a,null,this.state.labels.map((function(t,a){return l.a.createElement(F.a,{color:"success",onClick:function(){return e.onCheckboxBtnClick(t)},active:e.state.diseases.includes(t),key:a},t)}))),l.a.createElement(le.a,null,l.a.createElement(F.a,{onClick:this.fetchFromDB},l.a.createElement("i",{className:"fa fa-refresh"})))),l.a.createElement("br",null),!this.state.loading&&l.a.createElement(F.a,{color:"primary"},"Deploy"),this.state.loading&&l.a.createElement(U,null),l.a.createElement("br",null),this.state.deployed_model_bool&&l.a.createElement("div",{style:ie},l.a.createElement("p",null,"QR-Code:",l.a.createElement(K,{name:this.state.deployed_model.name}))),this.state.error_data&&l.a.createElement("div",{style:ie},l.a.createElement("p",null,l.a.createElement(re.a,{color:"danger"},this.state.error_data))),this.state.after_train&&l.a.createElement("div",{style:ie},l.a.createElement("p",null,l.a.createElement(re.a,{color:"warning"},"Please reload after sometime minutes(it may take 10mins to 45 min depending on the model).")))))}}]),t}(n.Component),ue=function(e){var t=Object(n.useState)("1"),a=Object(o.a)(t,2),r=a[0],c=a[1],i=function(e){r!==e&&c(e)};return l.a.createElement("div",null,l.a.createElement(d.a,{tabs:!0},l.a.createElement(E.a,null,l.a.createElement(h.a,{className:j()({active:"1"===r}),onClick:function(){i("1")}},"Home")),l.a.createElement(E.a,null,l.a.createElement(h.a,{className:j()({active:"2"===r}),onClick:function(){i("2")}},"Deploy"))),l.a.createElement(f.a,{activeTab:r},l.a.createElement(b.a,{tabId:"1"},l.a.createElement(g.a,null,l.a.createElement(R,null))),l.a.createElement(b.a,{tabId:"2"},l.a.createElement(g.a,null,l.a.createElement(y.a,null,l.a.createElement(v.a,{xs:"6"},l.a.createElement(Z,null)),l.a.createElement(v.a,{xs:"6"},l.a.createElement(se,null)))))))};var de=function(){return l.a.createElement("div",null,l.a.createElement(p,null),l.a.createElement(ue,null))};a(353);c.a.render(l.a.createElement(de,null),document.getElementById("root"))}},[[189,1,2]]]);
//# sourceMappingURL=main.8e3988bd.chunk.js.map