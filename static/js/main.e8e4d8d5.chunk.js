(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{25:function(e,a,t){e.exports=t.p+"static/media/user.160c68fc.png"},44:function(e,a,t){e.exports=t.p+"static/media/rpsLogo.94b40bc8.png"},47:function(e,a,t){e.exports=t(83)},58:function(e,a,t){},60:function(e,a,t){},80:function(e,a,t){},83:function(e,a,t){"use strict";t.r(a);var n=t(1),r=t.n(n),o=t(18),i=t.n(o),l=t(6),s=t(19),c=t(39),u=(t(56),"FETCH_USER"),p="SIGNIN_SUCCESSFUL",m="SIGNIN_ERROR",g="SIGNOUT_SUCCESSFUL",d="SIGNOUT_REQUEST",y="SIGNOUT_ERROR",h="FETCH_PLAYERS",f="JOIN_GATHERING",v="LEAVE_GATHERING",E="GAME_REQUESTED",O="GAME_CREATED",b="GAME_STARTED",N="GAME_ENDED",A="MAKE_PLAY",j="PLAY_RECEIVED",R="ROUND_OUTCOME",I=t(13),_=t(24),S={NO_GAME:"NO_GAME",GAME_STARTED:"GAME_STARTED",WAITING_FOR_BOTH_PLAYERS:"WAITING_FOR_BOTH_PLAYERS",PLAY_MADE_WAITING_FOR_OPPONENT:"PLAY_MADE_WAITING_FOR_OPPONENT",OPPONENT_PLAY_WAITING_FOR_USER:"OPPONENT_PLAY_WAITING_FOR_USER",DETERMINING_ROUND_WINNER:"DETERMINING_ROUND_WINNER",GAME_ENDED:"GAME_ENDED"},k=Object(s.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case u:return a.payload||null;default:return e}},gathering:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1?arguments[1]:void 0;switch(a.type){case f:return a.payload;case h:return Object(I.a)({},e,{onlinePlayers:a.payload});case v:return{};default:return e}},game:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{gameStatus:S.NO_GAME},a=arguments.length>1?arguments[1]:void 0;switch(a.type){case b:return Object(I.a)({},e,{gameKey:a.payload.gameKey,gameData:a.payload.gameData,gameStatus:S.GAME_STARTED,myUid:a.payload.myUid,opponentUid:a.payload.gameData.player2});case N:return Object(I.a)({},e,{gameKey:null,gameData:null,gameStatus:S.GAME_ENDED});case A:return function(e,a){var t=e.gameStatus===S.OPPONENT_PLAY_WAITING_FOR_USER?S.DETERMINING_ROUND_WINNER:S.PLAY_MADE_WAITING_FOR_OPPONENT;return Object(I.a)({},e,{gameStatus:t,playerPlay:a.playerAction})}(e,a.payload);case j:return function(e,a){var t=e.gameData,n=t.player1,r=t.player2,o=a.playerUid;if(o!==n&&o!==r)return console.log("returning early from getGameStateAfterPlayReceived"),e;var i=e.myUid,l="".concat(a.player,"Actions"),s=e.gameData.round>=a.playerActions.length?a.playerActions:e.gameData[l],c=Object(I.a)({},e.gameData,Object(_.a)({},l,s)),u=c.player1Actions.length===c.player2Actions.length?S.DETERMINING_ROUND_WINNER:o===i?S.PLAY_MADE_WAITING_FOR_OPPONENT:S.OPPONENT_PLAY_WAITING_FOR_USER;return Object(I.a)({},e,{gameStatus:u,gameData:c})}(e,a.payload);case R:var t=a.payload,n=t.player1Wins,r=t.player2Wins,o=t.maxNumberOfGames,i=t.round,l=n+r>=o&&Math.abs(n-r)>=2?i:i+1;return Object(I.a)({},e,{gameData:Object(I.a)({},a.payload,{round:l}),gameStatus:S.WAITING_FOR_BOTH_PLAYERS});default:return e}}}),P=(t(58),t(7)),G=t(8),T=t(10),U=t(9),D=t(11),w=t(86),L=t(87),M=(t(60),t(4)),C=t(26),W=t.n(C),x=(t(66),t(69),{apiKey:"AIzaSyBkyF3iDkn4oj30QNEJ8vsnIF57PY0xki0",authDomain:"rps-game-d93c5.firebaseapp.com",databaseURL:"https://rps-game-d93c5.firebaseio.com",projectId:"rps-game-d93c5",storageBucket:"rps-game-d93c5.appspot.com",messagingSenderId:"131891175803"});W.a.initializeApp(x);var Y="Games",F=new W.a.auth.GoogleAuthProvider,K=W.a,B=function(){var e=function(){return Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,5)};return function(a,t){this.db=a,this.roomName=t||"globe",this.room=this.db.ref("gatherings/"+encodeURIComponent(this.roomName)),this.myName="",this.user=null,this.updateStatus=function(e,a){this.myName=a;var t=this.db.ref(".info/connected"),n=this;t.on("value",function(e){e.val()&&n.user&&(n.user.onDisconnect().remove(),n.user.set(n.myName))})},this.join=function(a,t){var n=this;return new Promise(function(r,o){n.user&&(console.log("Already joined."),r(!1)),n.myName=t||"Anonymous - "+e(),n.user=a?n.room.child(a):n.room.push();var i=n;n.db.ref(".info/connected").on("value",function(e){e.val()&&(i.user.onDisconnect().remove(),i.user.set(i.myName))}),r(n.myName)})},this.leave=function(){this.user.remove(),this.myName=""},this.over=function(){this.room.remove()},this.onUpdated=function(e){"function"==typeof e?this.room.on("value",function(a){e(a.numChildren(),a.val())}):console.error("You have to pass a callback function to onUpdated(). That function will be called (with user count and hash of users as param) every time the user list changed.")}}}(),H=function(){return K.database().ref(Y)},z=function(e,a){return function(t){var n="".concat(a,"Actions");return console.log("creating player action listener",n),e.child(n).on("value",function(e){console.log("received updated on player action, snapshot.val()",e.val());var n=e.val(),r=n&&Object.keys(n).length>0?Object.keys(n).map(function(e){return n[e]}):[];r.length>0&&t({type:j,payload:{player:a,playerActions:r}})})}},q=function(e,a,t){return function(n){var r,o=t;if((o.player1===e||o.player2===e)&&e.length>1){console.log("new game is my game");var i=o.player1Actions?Object.keys(o.player1Actions).map(function(e){return o.player1Actions[e]}):[],l=o.player2Actions?Object.keys(o.player2Actions).map(function(e){return o.player2Actions[e]}):[],s=Object(I.a)({},o,{player1Actions:i,player2Actions:l});n({type:b,payload:{gameKey:a,gameData:s,myUid:e}});var c=o.player1,u=e===c?"player1":"player2",p=e!==c?"player1":"player2",m=(r=a,K.database().ref("".concat(Y,"/").concat(r)));n(function(e){return function(a){return console.log("in createEndGameListener"),e.child("gameInProgress").on("value",function(t){if(console.log("received endGame indicator from firebase, snapshot.val()",t.val()),null==t.val()||!t.val()){var n=e.key;a({type:N,payload:{gameUID:n}})}})}}(m)),n(z(m,p)),n(z(m,u))}else console.log("new game is not my game")}},J=t(40),V=t(22),Q=(t(84),t(41)),$=t.n(Q);function X(){var e=Object(J.a)(["\n    display: block;\n    margin: 0 auto;\n    border-color: #276582;\n"]);return X=function(){return e},e}var Z=Object(V.b)(X()),ee=function(e){function a(e){var t;return Object(P.a)(this,a),(t=Object(T.a)(this,Object(U.a)(a).call(this,e))).displaySpinner=function(){var e=t.props,a=e.loading,n=e.timeOut;if(a){var r=n>0?setTimeout(t.turnOffSpinner,n):null;t.setState({showSpinner:!0,delayRef:null,timeOutRef:r})}else t.setState({showSpinner:!1,delayRef:null,timeOutRef:!1})},t.turnOffSpinner=function(){t.setState({showSpinner:!1,timeOutRef:null})},t.state={showSpinner:!1,timeOutRef:null,delayRef:null},t}return Object(D.a)(a,e),Object(G.a)(a,[{key:"componentDidMount",value:function(){var e=this.props;this.setLoadingAndTimers(e)}},{key:"componentWillReceiveProps",value:function(e){this.setLoadingAndTimers(e)}},{key:"componentWillUnmount",value:function(){var e=this.state,a=e.timeOutRef,t=e.delayRef;a&&clearTimeout(a),t&&clearTimeout(t)}},{key:"setLoadingAndTimers",value:function(e){var a=e.delay,t=e.timeOut,n=e.loading,r=e.timeOutRef,o=e.delayRef;n||(null!=r&&clearTimeout(r),null!=o&&clearTimeout(o));var i=n&&!(a>0),l=n&&a>0?setTimeout(this.displaySpinner,a):null,s=i&&t>0?setTimeout(this.turnOffSpinner,t):null;this.setState({showSpinner:i,timeOutRef:s,delayRef:l})}},{key:"render",value:function(){var e=this.state.showSpinner,a=this.props,t=a.loadingMessageClassName,n=a.loadingMessageStyle,o=a.loadingMessage,i=a.spinnerStyle,l=a.id,s=a.fadeIn?"".concat(a.className," fade-in"):a.className;return console.log("override",Z),e?r.a.createElement("div",{className:s,id:l},r.a.createElement($.a,{sizeUnit:"px",className:Z.styles,size:60,color:"#276582",loading:e,style:i}),r.a.createElement("div",{className:t,style:n},o)):r.a.createElement("div",null)}}]),a}(r.a.Component);ee.defaultProps={delay:0,timeOut:0,loadingMessage:"",loadingMessageClassName:"",loadingMessageStyle:{},className:"",spinnerStyle:{},fadeIn:!1,id:""};var ae=function(e){function a(){var e,t;Object(P.a)(this,a);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(t=Object(T.a)(this,(e=Object(U.a)(a)).call.apply(e,[this].concat(o)))).state=t.getInitialState(),t.play=function(e){var a=e.target.value,n=t.props.game.gameData,r=n.player1,o=n.player2,i=t.props.user.uid,l=r===i?"player1":o===i?"player2":"";if(null!=a.match(/(rock|paper|scissors)/)&&l&&l.length>1){var s=t.props.game.gameKey;t.props.makePlay(s,l,a)}else console.log("invalid playerAction or playerinfo",a,l)},t.endCurrentGame=function(){console.log("ending current game"),t.props.endGame&&t.props.gameUID&&(console.log("creating endGame action"),t.props.endGame(t.props.gameUID))},t.render=function(){var e=t.state,a=e.opponentName,n=e.myWins,o=e.opponentWins,i=e.ties,l=t.props.game.gameStatus,s={loadingMessageStyle:{textAlign:"center",marginTop:"1em",size:"22px"},loading:!1,className:"loading-viewer",id:"loading-spinner"};console.log("spinnerProps",s);var c=r.a.createElement(M.c,{className:""},r.a.createElement("p",null," Your Opponent: ",r.a.createElement("span",{id:"opponent-display-name"},a||"Loading...")),r.a.createElement("p",null,"Your score: ",r.a.createElement("span",{id:"your-score"},n)),r.a.createElement("p",null,"Opponent Score: ",r.a.createElement("span",{id:"opponent-score"},o)),r.a.createElement("p",null,"Ties: ",r.a.createElement("span",{id:"ties"},i)),r.a.createElement(r.a.Fragment,null,r.a.createElement(M.a,{color:"primary",className:"mr-2 game-action",onClick:t.play,value:"rock",disabled:!1}," Rock "),r.a.createElement(M.a,{color:"primary",className:"mr-2 game-action",onClick:t.play,value:"paper",disabled:!1}," Paper "),r.a.createElement(M.a,{color:"primary",className:"mr-2 game-action",onClick:t.play,value:"scissors",disabled:!1}," Scissors "),r.a.createElement("br",null),r.a.createElement("br",null)),r.a.createElement(M.a,{color:"danger",onClick:t.endCurrentGame,id:"end-game"},"End Game"));return r.a.createElement(M.b,{className:"border-success game",style:{display:"block"}},r.a.createElement(M.e,{className:"text-white bg-success bg"},"Your Active Game"),c,r.a.createElement(M.d,null,r.a.createElement(M.f,null,l)))},t}return Object(D.a)(a,e),Object(G.a)(a,[{key:"getInitialState",value:function(){var e=this.props.user,a=this.props.game.gameData,t=a.player1,n=a.player2,r=a.player1Wins,o=a.player2Wins,i=a.player1Name,l=a.player2Name,s=a.ties,c=a.playInProgress,u=e.uid,p={uid:t,name:i,wins:r},m={uid:n,name:l,wins:o},g=t===u?m:n===u?p:{};return{opponentName:g.name,myWins:(t===u?p:m).wins,opponentWins:g.wins,ties:s,playInProgress:c}}}]),a}(n.Component);var te=Object(l.b)(function(e){var a=e.auth,t=e.gathering,n=e.game;return{user:a,gathering:t,players:null!=t&&t.onlinePlayers||[],game:n,gameUID:n.gameKey}},{endGame:function(e){return function(a){return H().child(e).remove().then(function(){a({type:N,payload:{gameUID:e}})}).catch(function(e){a({type:N,payload:{error:e.toString()}})})}},makePlay:function(e,a,t){return function(n){console.log("in makePlay, gameRef:",e,"player1or2",a,"playerAction",t);var r="".concat(a,"Actions");return console.log("player1or2:",a,"gameValRef",r),a&&t?(n({type:A,payload:{player1or2:a,playerAction:t}}),H().child(e).child(r).push(t).then(function(e){console.log("added player action, playerAction:",t,"gameValRef",r,"ref:",e)})):Promise.reject(new Error("unable to make play"))}}})(ae),ne=t(21),re=function(){return function(e){return K.auth().signInWithPopup(F).then(function(){e({type:p})}).catch(function(a){e({type:m,payload:a}),console.log("signIn action error",a)})}},oe=t(44),ie=t.n(oe),le=function(e){function a(e){var t;return Object(P.a)(this,a),(t=Object(T.a)(this,Object(U.a)(a).call(this,e))).toggle=t.toggle.bind(Object(ne.a)(Object(ne.a)(t))),t.state={isOpen:!1},t}return Object(D.a)(a,e),Object(G.a)(a,[{key:"toggle",value:function(){this.setState({isOpen:!this.state.isOpen})}},{key:"render",value:function(){var e=this.props,a=this.props,t=a.auth,n=a.signIn,o=a.signOut,i=a.gathering;console.log("gathering in Navbar component:",i);var l=function(){return o({auth:t,gathering:i})},s=t?r.a.createElement(M.p,{nav:!0,inNavbar:!0},r.a.createElement(M.j,{nav:!0,caret:!0},r.a.createElement("img",{src:t.photoURL,width:"40",height:"40",alt:t.displayName})),r.a.createElement(M.i,{right:!0},r.a.createElement(M.h,{onClick:l},"Log Out ",t.displayName),r.a.createElement(M.h,{divider:!0}),r.a.createElement(M.h,{disabled:!0},"Option 2"),r.a.createElement(M.h,{divider:!0}),r.a.createElement(M.h,{disabled:!0},"Reset"))):r.a.createElement(M.l,null,e.auth?r.a.createElement(M.a,{outline:!0,onClick:l},"Log Out ",t.displayName):r.a.createElement(M.a,{outline:!0,onClick:n},"Log In"));return r.a.createElement("div",null,r.a.createElement(M.m,{color:"dark",light:!0,expand:"md",dark:!0},r.a.createElement(M.n,{href:"/"},r.a.createElement("img",{src:ie.a,height:"45",alt:"Rock Paper Scissors"})),r.a.createElement(M.o,{onClick:this.toggle}),r.a.createElement(M.g,{isOpen:this.state.isOpen,navbar:!0},r.a.createElement(M.k,{className:"ml-auto",navbar:!0},s))))}}]),a}(r.a.Component);le.defaultProps={auth:{}};var se=Object(l.b)(function(e){return{auth:e.auth,gathering:e.gathering}},{signIn:re,signOut:function(e){var a=e.gathering;return function(e){return e({type:d}),a&&Object.keys(a).length>0&&"function"===typeof a.leave?e(function(e){return function(a){null!=e&&"undefined"!==typeof e&&(e.leave(),a({type:v}))}}(a)):console.log("not leaving gathering, because it does not appear to be defined"),e(function(e){var a=K.auth();return a.currentUser?(a.signOut().then(function(){return e({type:g}),Promise.resolve(!0)}).catch(function(a){e({type:y,payload:a})}),Promise.resolve(!0)):(e({type:y,payload:"error on signout"}),Promise.resolve(!1))})}}})(le),ce=t(0),ue=t.n(ce),pe=function(e){var a=function(a){function t(){return Object(P.a)(this,t),Object(T.a)(this,Object(U.a)(t).apply(this,arguments))}return Object(D.a)(t,a),Object(G.a)(t,[{key:"componentWillMount",value:function(){null===this.props.auth&&this.context.router.history.push("/")}},{key:"componentWillUpdate",value:function(e){e.auth||this.context.router.history.push("/")}},{key:"render",value:function(){return this.props.auth?r.a.createElement(e,this.props):null}}]),t}(n.Component);return a.contextTypes={router:ue.a.object},Object(l.b)(function(e){return{auth:e.auth}})(a)},me=(t(80),t(25)),ge=t.n(me),de=function(e){function a(){return Object(P.a)(this,a),Object(T.a)(this,Object(U.a)(a).apply(this,arguments))}return Object(D.a)(a,e),Object(G.a)(a,[{key:"componentWillUpdate",value:function(e){e.auth&&this.context.router.history.push("/app")}},{key:"signIn",value:function(e){e.preventDefault(),this.props.signIn()}},{key:"render",value:function(){return r.a.createElement("div",{className:"row social-signin-container"},r.a.createElement("div",{className:"col s10 offset-s1 center-align"},r.a.createElement("img",{alt:"Sign in",id:"sign-in",src:ge.a}),r.a.createElement("h4",{id:"sign-in-header"},"Sign In to start"),r.a.createElement("a",{href:"/#",className:"social-signin",onClick:this.props.signIn},r.a.createElement("i",{className:"fa fa-google social-signin-icon"}),"Sign in with Google")))}}]),a}(n.Component);de.contextTypes={router:ue.a.object};var ye=Object(l.b)(function(e){return{auth:e.auth}},{signIn:re})(de);var he=Object(l.b)(function(e){var a=e.auth,t=e.gathering;return{auth:a,gathering:t,players:null!=t&&t.onlinePlayers||[]}})(function(e){var a=e.selectPlayer,t=e.auth,n=e.players&&Array.isArray(e.players)?e.players:[];return r.a.createElement(M.b,{className:"border-info app",id:"available-players",style:{display:"block"}},r.a.createElement(M.c,{className:""},n.map(function(e){return r.a.createElement(M.a,{key:e.uid,onClick:function(){return a(e.uid)},color:"primary",className:"mr-1",outline:!0,disabled:e.uid===t.uid},e.uid===t.uid?"You (".concat(e.displayName,")"):e.displayName," ",r.a.createElement("span",null," ",r.a.createElement("img",{src:e.photoURL&&e.photoURL.length>0?e.photoURL:ge.a,height:"25",alt:e.displayName})))})))}),fe=function(e){function a(){var e,t;Object(P.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=Object(T.a)(this,(e=Object(U.a)(a)).call.apply(e,[this].concat(r)))).state={},t.selectPlayer=function(e){var a=t.props,n=a.auth,r=a.players;return console.log("creating action request for user, who selected to play against player uid",e),t.props.requestGame(n,r.find(function(a){return a.uid===e}))},t}return Object(D.a)(a,e),Object(G.a)(a,[{key:"componentDidMount",value:function(){var e=this.props;console.log("in componentWillUpdate for 'Main', nextProps",e),!e.auth||e.gathering&&Object.keys(e.gathering).length>0?console.log("not joining gathering"):(console.log("sending joinGathering request"),this.props.joinGathering(e.auth))}},{key:"render",value:function(){var e=this.props,a=e.appStatus,t=e.appHeaderText,n=e.game,o=this.props.players&&Array.isArray(this.props.players)?this.props.players:[];return console.log("rendering main"),r.a.createElement(M.b,{className:"border-info ",id:"main",style:{display:"block"}},r.a.createElement(M.e,{className:"text-white bg-info"},t||" "),r.a.createElement(M.c,{className:""},n&&Object.keys(n).length>1&&n.gameKey&&n.gameKey.length>1?r.a.createElement(te,{gameUID:n.key}):!o||o.length<0?r.a.createElement("div",null,"Loading"):r.a.createElement(he,{players:"players",selectPlayer:this.selectPlayer})),r.a.createElement(M.d,{className:"card-footer"},a||" "))}}]),a}(n.Component);var ve=Object(l.b)(function(e){var a=e.auth,t=e.gathering,n=e.game;return{auth:a,gathering:t,players:null!=t&&t.onlinePlayers||[],game:n}},{joinGathering:function(e){return function(a){var t=new B(K.database(),"OnlineUsers"),n=e.photoURL;t.join(e.uid,{displayName:e.displayName,inGame:!1,photoURL:n}).then(function(){var n;t.onUpdated(function(e,t){var n=e>0&&t&&Object.keys(t).length>0?Object.keys(t).map(function(e){return Object(I.a)({},t[e],{uid:e})}):[];a({type:h,payload:n})}),a((n=e.uid,function(e){return console.log("creating newGame listener, myUid",n),H().on("child_added",function(a){return console.log("newGameListener fired, myUid:",n),e(q(n,a.key,a.val()))})}))}).catch(function(e){return console.log("error when joining gathering",e)}),a({type:f,payload:t})}},requestGame:function(e,a){return function(t){t({type:E,payload:{user:e,otherPlayer:a}});var n=e.uid,r=e.displayName,o=a.uid,i=a.displayName;if(n&&o&&n.length>0&&o.length>0){var l={player1:n,player2:o,player1Wins:0,player2Wins:0,player1Name:r,player2Name:i,ties:0,maxNumberOfGames:5,gameInProgress:!0,round:1};return H().push(l).then(function(){return t({type:O})}).catch(function(e){return console.log("error when creating new game",e),Promise.reject(e)})}return console.log("not creating new game"),Promise.reject(new Error("not creating new game"))}}})(fe),Ee=function(e){function a(){var e,t;Object(P.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=Object(T.a)(this,(e=Object(U.a)(a)).call.apply(e,[this].concat(r)))).componentDidMount=function(){t.props.fetchUser()},t}return Object(D.a)(a,e),Object(G.a)(a,[{key:"render",value:function(){return console.log("rendering App component"),console.log("Your process.env.PUBLIC_URL","/rock-paper-scissors-firebase-react-redux"),r.a.createElement(w.a,{basename:"/rock-paper-scissors-firebase-react-redux"},r.a.createElement("div",{className:"App"},r.a.createElement(se,null),r.a.createElement("div",{className:"container main"},r.a.createElement(L.a,{exact:!0,path:"/",component:ye}),r.a.createElement(L.a,{path:"/app",component:pe(ve)}))))}}]),a}(n.Component),Oe=Object(l.b)(null,{fetchUser:function(){return function(e){return K.auth().onAuthStateChanged(function(a){console.log("onAuthStateChanged triggered from fetchUser"),e(a?{type:u,payload:a}:{type:u,payload:null})})}}})(Ee);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var be=Object(s.d)(k,{},Object(s.a)(c.a));i.a.render(r.a.createElement(l.a,{store:be}," ",r.a.createElement(Oe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[47,2,1]]]);
//# sourceMappingURL=main.e8e4d8d5.chunk.js.map