(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{110:function(e,a,t){},152:function(e,a,t){},155:function(e,a,t){"use strict";t.r(a);var n=t(1),r=t.n(n),o=t(24),l=t.n(o),i=t(11),s=t(28),c=t(92),u=(t(108),"FETCH_USER"),m="SIGNIN_SUCCESSFUL",p="SIGNIN_ERROR",d="SIGNOUT_SUCCESSFUL",g="SIGNOUT_REQUEST",E="SIGNOUT_ERROR",h="EMAIL_PASSWORD_LOGIN_ATTEMPT",y="EMAIL_PASSWORD_LOGIN_SUCCESS",f="EMAIL_PASSWORD_REGISTRATION_ATTEMPT",v="EMAIL_PASSWORD_REGISTRATION_SUCCESS",O="FETCH_PLAYERS",b="JOIN_GATHERING",N="LEAVE_GATHERING",A="UPDATE_STATUS",_={GAME_REQUESTED:"GAME_REQUESTED",GAME_CREATED:"GAME_CREATED",GAME_STARTED:"GAME_STARTED",GAME_ENDED:"GAME_ENDED",MAKE_PLAY:"MAKE_PLAY",PLAY_IN_PROGRESS:"PLAY_IN_PROGRESS",PLAY_RECEIVED:"PLAY_RECEIVED",ROUND_OUTCOME:"ROUND_OUTCOME",GAME_UPDATE:"GAME_UPDATE",GAME_IN_PROGRESS:"GAME_IN_PROGRESS"},P="OPEN_AUTHENTICATION_MODAL",I="CLOSE_AUTHENTICATION_MODAL",R="TOGGLE_AUTHENTICATION_MODAL",D="MODAL_MESSAGE",j=t(5),T=t(13),G={NO_GAME:"NO_GAME",GAME_STARTED:"GAME_STARTED",WAITING_FOR_BOTH_PLAYERS:"WAITING_FOR_BOTH_PLAYERS",PLAY_MADE_WAITING_FOR_OPPONENT:"PLAY_MADE_WAITING_FOR_OPPONENT",OPPONENT_PLAY_WAITING_FOR_USER:"OPPONENT_PLAY_WAITING_FOR_USER",DETERMINING_ROUND_WINNER:"DETERMINING_ROUND_WINNER",GAME_ENDED:"GAME_ENDED"},S=Object(s.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case u:return a.payload||null;default:return e}},gathering:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1?arguments[1]:void 0;switch(a.type){case b:return a.payload;case O:return Object(j.a)({},e,{onlinePlayers:a.payload});case N:return{};default:return e}},game:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{gameStatus:G.NO_GAME},a=arguments.length>1?arguments[1]:void 0;switch(Object.keys(_).indexOf(a.type),a.type){case _.GAME_STARTED:return Object(j.a)({},e,{gameKey:a.payload.gameKey,gameData:a.payload.gameData,gameStatus:G.GAME_STARTED,myUid:a.payload.myUid,opponentUid:a.payload.gameData.player2});case _.GAME_ENDED:return Object(j.a)({},e,{gameKey:null,gameData:null,gameStatus:G.GAME_ENDED});case _.MAKE_PLAY:return function(e,a){var t=e.gameStatus===G.OPPONENT_PLAY_WAITING_FOR_USER?G.DETERMINING_ROUND_WINNER:G.PLAY_MADE_WAITING_FOR_OPPONENT;return Object(j.a)({},e,{gameStatus:t,playerPlay:a.playerAction})}(e,a.payload);case _.PLAY_RECEIVED:return e.gameData?function(e,a){var t=e.gameData,n=t.player1,r=t.player2,o=t.round,l=t.gameInProgress,i=e.myUid,s=a.player,c="player1"===s?n:"player2"===s?r:"";if(c!==n&&c!==r||""===c)return e;var u="".concat(a.player,"Actions"),m=e.gameData.round>=a.playerActions.length?a.playerActions:e.gameData[u],p=Object(j.a)({},e.gameData,Object(T.a)({},u,m)),d=p.player1Actions||[],g=p.player2Actions||[],E=l?d.length===g.length?d.length===o?G.DETERMINING_ROUND_WINNER:G.WAITING_FOR_BOTH_PLAYERS:c===i?G.PLAY_MADE_WAITING_FOR_OPPONENT:G.OPPONENT_PLAY_WAITING_FOR_USER:G.GAME_ENDED;return Object(j.a)({},e,{gameStatus:E,gameData:p})}(e,a.payload):e;case _.ROUND_OUTCOME:var t=a.payload,n=t.player1Wins,r=t.player2Wins,o=t.maxNumberOfGames,l=t.round,i=n+r>=o&&Math.abs(n-r)>=2?l:l+1;return Object(j.a)({},e,{gameData:Object(j.a)({},a.payload,{round:i}),gameStatus:G.WAITING_FOR_BOTH_PLAYERS});case _.GAME_UPDATE:return Object(j.a)({},e,{gameData:a.payload,gameStatus:a.payload&&a.payload.gameInProgress?G.WAITING_FOR_BOTH_PLAYERS:G.GAME_ENDED});case _.GAME_IN_PROGRESS:return Object(j.a)({},e,{gameData:Object(j.a)({},e.gameData,{gameInProgress:a.payload}),gameStatus:a.payload?e.gameStatus:G.GAME_ENDED});default:return e}},modals:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{authenticationModalOpen:!1},a=arguments.length>1?arguments[1]:void 0;switch(a.type){case P:return Object(j.a)({},e,{authenticationModalOpen:!0},a.payload);case I:return Object(j.a)({},e,{authenticationModalOpen:!1},a.payload);case R:return Object(j.a)({},e,{authenticationModalOpen:!e.authenticationModalOpen},a.payload);case D:return Object(j.a)({},e,a.payload);default:return e}}}),w=(t(110),t(6)),M=t(7),k=t(9),U=t(8),C=t(10),L=t(157),W=t(158),Y=t(2),x=t(39),F=t.n(x),B=(t(116),t(119),{apiKey:"AIzaSyBkyF3iDkn4oj30QNEJ8vsnIF57PY0xki0",authDomain:"rps-game-d93c5.firebaseapp.com",databaseURL:"https://rps-game-d93c5.firebaseio.com",projectId:"rps-game-d93c5",storageBucket:"rps-game-d93c5.appspot.com",messagingSenderId:"131891175803"});F.a.initializeApp(B);var z="Games",H=new F.a.auth.GoogleAuthProvider,K=new F.a.auth.GithubAuthProvider,q=F.a,Q=function(){var e=function(){return Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,5)};return function(a,t){this.db=a,this.roomName=t||"globe",this.room=this.db.ref("gatherings/"+encodeURIComponent(this.roomName)),this.myName="",this.user=null,this.updateStatus=function(e,a){this.myName=a;var t=this.db.ref(".info/connected"),n=this;t.on("value",function(e){e.val()&&n.user&&(n.user.onDisconnect().remove(),n.user.set(n.myName))})},this.join=function(a,t){var n=this;return new Promise(function(r,o){n.user&&(console.log("Already joined."),r(!1)),n.myName=t||"Anonymous - "+e(),n.user=a?n.room.child(a):n.room.push();var l=n;n.db.ref(".info/connected").on("value",function(e){e.val()&&(l.user.onDisconnect().remove(),l.user.set(l.myName))}),r(n.myName)})},this.leave=function(){this.user.remove(),this.myName=""},this.over=function(){this.room.remove()},this.onUpdated=function(e){"function"==typeof e?this.room.on("value",function(a){e(a.numChildren(),a.val())}):console.error("You have to pass a callback function to onUpdated(). That function will be called (with user count and hash of users as param) every time the user list changed.")}}}(),V=function(){return q.database().ref(z)},J=function(e){return q.database().ref("".concat(z,"/").concat(e))},Z=function(e,a){return function(t){var n="".concat(a,"Actions");return e.child(n).on("value",function(e){console.log("received updated on player action, snapshot.val()",e.val());var n=e.val(),r=n&&Object.keys(n).length>0?Object.keys(n).map(function(e){return n[e]}):[];r.length>0&&(console.log("playerActions for player",a,r),t({type:_.PLAY_RECEIVED,payload:{player:a,playerActions:r}}))})}},X=function(e,a,t){return function(n){var r=t;if((r.player1===e||r.player2===e)&&e.length>1&&!r.gameClosed){var o=r.player1Actions?Object.keys(r.player1Actions).map(function(e){return r.player1Actions[e]}):[],l=r.player2Actions?Object.keys(r.player2Actions).map(function(e){return r.player2Actions[e]}):[],i=Object(j.a)({},r,{player1Actions:o,player2Actions:l});n({type:_.GAME_STARTED,payload:{gameKey:a,gameData:i,myUid:e}});var s=r.player1,c=e===s?"player1":"player2",u=e!==s?"player1":"player2",m=J(a);n(function(e){return function(a){return e.child("round").on("value",function(){return console.log("createRoundUpdateListener listener triggered"),e.once("value",function(e){console.log("createRoundUpdateListener game snapshot",e.val());var t=e.val();a({type:_.GAME_UPDATE,payload:t})})})}}(m)),n(function(e){return function(a){return e.child("gameInProgress").on("value",function(){console.log("received gameInProgress change indicator"),e.once("value",function(e){var t=e.val();a({type:_.GAME_UPDATE,payload:t})})}),e.child("gameClosed").on("value",function(t){if(console.log("received endGame indicator from firebase, snapshot.val()",t.val()),null==t.val()||!0===t.val()){var n=e.key;a({type:_.GAME_ENDED,payload:{gameUID:n}})}})}}(m)),n(Z(m,u)),n(Z(m,c))}}},$=function(e,a){return function(t){console.log("running changePlayerStatus, user:",e,"gathering",a),a.updateStatus(e.uid,e),t({type:A,payload:e})}},ee=function(e){function a(){var e,t;Object(w.a)(this,a);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(t=Object(k.a)(this,(e=Object(U.a)(a)).call.apply(e,[this].concat(o)))).play=function(e){var a=e.target.value,n=t.props.game.gameData,r=n.player1,o=n.player2,l=t.props.user.uid,i=r===l?"player1":o===l?"player2":"";if(null!=a.match(/(rock|paper|scissors)/)&&i&&i.length>1){var s=t.props.game.gameKey;t.props.makePlay(s,i,l,a)}else console.log("invalid playerAction or playerinfo",a,i)},t.endCurrentGame=function(){console.log("ending current game"),t.props.endGame&&t.props.gameUID&&(console.log("creating endGame action"),t.props.endGame(t.props.gameUID))},t.render=function(){var e,a=t.getState(),n=a.opponentName,o=a.myWins,l=a.opponentWins,i=a.ties,s=a.winner,c=t.props.game.gameStatus,u=t.props.game.gameData,m=u.gameInProgress,p=u.round,d=m&&c!==G.PLAY_MADE_WAITING_FOR_OPPONENT&&c!==G.DETERMINING_ROUND_WINNER;console.log("gameInProgress",m,"gameStatus",c);var g=(e={},Object(T.a)(e,G.DETERMINING_ROUND_WINNER,"Determining Round Winner..."),Object(T.a)(e,G.PLAY_MADE_WAITING_FOR_OPPONENT,"You have played, and we are waiting on your opponent..."),Object(T.a)(e,G.WAITING_FOR_BOTH_PLAYERS,"Waiting for both players to make a play..."),Object(T.a)(e,G.OPPONENT_PLAY_WAITING_FOR_USER,"Your opponent has played and is waiting for you to play..."),Object(T.a)(e,G.GAME_STARTED,"Game started..."),Object(T.a)(e,G.GAME_ENDED,"Game is over..."),Object(T.a)(e,G.NO_GAME,"No Game currently in progress..."),e),E=c===G.GAME_ENDED&&s>0?o>l?"You Won!":"You lost.":g[c],h=r.a.createElement(Y.e,{className:""},r.a.createElement(Y.A,null,r.a.createElement(Y.i,{className:"text-right"},"Your Opponent:"),r.a.createElement(Y.i,{className:"text-left"},n)),r.a.createElement(Y.A,null,r.a.createElement(Y.i,{className:"text-right"},"Round Number:"),r.a.createElement(Y.i,{className:"text-left "},r.a.createElement(Y.a,{color:"secondary"},p))),r.a.createElement(Y.A,null,r.a.createElement(Y.i,{className:"text-right"},"Your Wins:"),r.a.createElement(Y.i,{className:"text-left"},r.a.createElement(Y.a,null,o))),r.a.createElement(Y.A,null,r.a.createElement(Y.i,{className:"text-right"},"Opponent Wins:"),r.a.createElement(Y.i,{className:"text-left"},r.a.createElement(Y.a,null,l))),r.a.createElement(Y.A,{className:"mb-2"},r.a.createElement(Y.i,{className:"text-right"},"Ties:"),r.a.createElement(Y.i,{className:"text-left"},r.a.createElement(Y.a,null,i))),r.a.createElement(Y.b,{color:"primary",className:"mr-2 game-action",onClick:t.play,value:"rock",disabled:!d}," Rock "),r.a.createElement(Y.b,{color:"primary",className:"mr-2 game-action",onClick:t.play,value:"paper",disabled:!d}," Paper "),r.a.createElement(Y.b,{color:"primary",className:"mr-2 game-action",onClick:t.play,value:"scissors",disabled:!d}," Scissors "),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(Y.b,{color:"danger",onClick:t.endCurrentGame,id:"end-game"},"End Match"));return r.a.createElement(Y.d,{className:"border-success game",style:{display:"block"}},r.a.createElement(Y.g,{className:"text-white bg-success bg"},"Your Active Game"),h,r.a.createElement(Y.f,null,r.a.createElement(Y.h,null,E)))},t}return Object(C.a)(a,e),Object(M.a)(a,[{key:"componentDidMount",value:function(){var e=this.props,a=e.user,t=e.gathering,n=this.props.players.find(function(e){return e.uid===a.uid}),r=Object(j.a)({},n,{inGame:!0});this.props.changePlayerStatus(r,t)}},{key:"componentDidUpdate",value:function(e){var a=this.props.game,t=a.gameStatus,n=a.myUid;t===G.DETERMINING_ROUND_WINNER&&t!==e.game.gameStatus&&e.game.gameStatus.length>0&&n===this.props.game.gameData.player1&&this.props.getRoundOutcome(this.props.gameUID)}},{key:"getState",value:function(){var e=this.props.user,a=this.props.game.gameData,t=a.player1,n=a.player2,r=a.player1Wins,o=a.player2Wins,l=a.player1Name,i=a.player2Name,s=a.ties,c=a.winner,u=e.uid,m={uid:t,name:l,wins:r},p={uid:n,name:i,wins:o},d=t===u?p:n===u?m:{};return{opponentName:d.name,myWins:(t===u?m:p).wins,opponentWins:d.wins,ties:s,winner:c}}}]),a}(n.Component);var ae=Object(i.b)(function(e){var a=e.auth,t=e.gathering,n=e.game;return{user:a,gathering:t,players:null!=t&&t.onlinePlayers||[],game:n,gameUID:n.gameKey}},{endGame:function(e){return function(a){return V().child(e).remove().then(function(){a({type:_.GAME_ENDED,payload:{gameUID:e}})}).catch(function(e){a({type:_.GAME_ENDED,payload:{error:e.toString()}})})}},makePlay:function(e,a,t,n){return function(t){var r="".concat(a,"Actions");return a&&n?(t({type:_.MAKE_PLAY,payload:{player1or2:a,playerAction:n}}),V().child(e).child(r).push(n).then(function(){}).catch(function(e){return console.error("error on makePlay function",e)})):Promise.reject(new Error("unable to make play"))}},getRoundOutcome:function(e){return function(a){return V().child(e).once("value",function(t){console.log("received updated gameData from getRoundOutcome, snapshot.val()",t.val());var n=t.val();return a(function(e,a,t){return function(){var n=e.maxNumberOfGames,r=Math.ceil(n/2),o=Object.values(e.player1Actions),l=Object.values(e.player2Actions),i=o.map(function(e,a){var t=l[a];return"rock"===e&&"paper"===t?2:"paper"===e&&"scissors"===t?2:"scissors"===e&&"rock"===t?2:e===t?0:1}),s=i.reduce(function(e,a){return(1===a?1:0)+e},0),c=i.reduce(function(e,a){return(2===a?1:0)+e},0),u=i.reduce(function(e,a){return(0===a?1:0)+e},0),m=s>=r?1:c>=r?2:0,p=0===m,d=o.length+(0===m?1:0);("undefined"===typeof t?J(a):t).update({player1Wins:s,player2Wins:c,ties:u,gameInProgress:p,round:d,winner:m})}}(n,e))})}},changePlayerStatus:$})(ee),te=t(29),ne=function(e){var a=e.auth,t=e.signOut,n=e.gathering,o=e.toggleAuthenticationModal,l=function(){return t({auth:a,gathering:n})},i=a?r.a.createElement(Y.D,{nav:!0,className:"",inNavbar:!0},r.a.createElement(Y.m,{nav:!0,caret:!0},a.photoURL?r.a.createElement(te.a,{src:a.photoURL,alt:a.displayName,className:"",size:"25"}):r.a.createElement(te.a,{name:a.displayName,color:te.a.getRandomColor("sitebase",["green"]),className:"",size:"25"})),r.a.createElement(Y.l,{right:!0},r.a.createElement(Y.k,{onClick:l},"Log Out ",a.displayName),r.a.createElement(Y.k,{divider:!0}),r.a.createElement(Y.k,{disabled:!0},"Option 2"),r.a.createElement(Y.k,{divider:!0}),r.a.createElement(Y.k,{disabled:!0},"Reset"))):r.a.createElement(Y.v,null,e.auth?r.a.createElement(Y.b,{outline:!0,onClick:l},"Log Out ",a.displayName):r.a.createElement(Y.b,{outline:!0,onClick:o},"Log In/Sign Up"));return r.a.createElement(Y.x,{color:"dark",light:!0,expand:"md",dark:!0},r.a.createElement(Y.y,{href:"/"},r.a.createElement("img",{src:e.logo,height:"45",alt:"Rock Paper Scissors"})),r.a.createElement(Y.z,{onClick:e.toggle}),r.a.createElement(Y.j,{isOpen:e.isOpen,navbar:!0},r.a.createElement(Y.u,{className:"ml-auto",navbar:!0},r.a.createElement(Y.v,{className:"ml-auto"},r.a.createElement(Y.w,{target:"_blank",href:"https://github.com/semlak/rock-paper-scissors-firebase-react-redux/"},"On Github")),r.a.createElement(Y.v,{className:"ml-auto"},r.a.createElement(Y.u,null,i)))))};ne.defaultProps={auth:{}};var re=ne,oe=t(0),le=t.n(oe),ie=function(e){var a=function(a){function t(){return Object(w.a)(this,t),Object(k.a)(this,Object(U.a)(t).apply(this,arguments))}return Object(C.a)(t,a),Object(M.a)(t,[{key:"componentWillMount",value:function(){null===this.props.auth&&this.context.router.history.push("/")}},{key:"componentWillUpdate",value:function(e){e.auth||this.context.router.history.push("/")}},{key:"render",value:function(){return this.props.auth?r.a.createElement(e,this.props):null}}]),t}(n.Component);return a.contextTypes={router:le.a.object},Object(i.b)(function(e){return{auth:e.auth}})(a)},se=function(e){var a=e.player;return a.photoURL&&a.photoURL.length>0?r.a.createElement("img",{src:a.photoURL,height:"25",alt:a.displayName}):r.a.createElement(te.a,{name:a.displayName,color:te.a.getRandomColor("sitebase",["green"]),size:"25",textSizeRatio:2})},ce=function(e){function a(){return Object(w.a)(this,a),Object(k.a)(this,Object(U.a)(a).apply(this,arguments))}return Object(C.a)(a,e),Object(M.a)(a,[{key:"componentDidMount",value:function(){this.updatePlayerStatusIfNeccessary()}},{key:"componentDidUpdate",value:function(){this.updatePlayerStatusIfNeccessary()}},{key:"updatePlayerStatusIfNeccessary",value:function(){var e=this.props,a=e.auth,t=e.gathering,n=this.props.players.find(function(e){return e.uid===a.uid});if(n&&!1!==n.inGame){var r=Object(j.a)({},n,{inGame:!1});this.props.changePlayerStatus(r,t)}}},{key:"render",value:function(){var e=this.props,a=e.selectPlayer,t=e.auth,n=e.players&&Array.isArray(e.players)?e.players:[];return r.a.createElement(Y.d,{className:"border-info app",id:"available-players",style:{display:"block"}},r.a.createElement(Y.e,{className:""},n.length<1?"Loading players...":n.map(function(e){return r.a.createElement(Y.b,{key:e.uid,onClick:function(){return a(e.uid)},color:"primary",className:"mr-1 mb-1",outline:!0,disabled:e.uid===t.uid||e.inGame,title:"".concat(e.displayName).concat(e.inGame?" (currently in a game)":e.uid===t.uid?" (You cannot play against yourself)":"")},e.uid===t.uid?"You (".concat(e.displayName,")"):e.displayName," ",r.a.createElement("span",null," ",r.a.createElement(se,{player:e})))})))}}]),a}(n.Component);var ue=Object(i.b)(function(e){var a=e.auth,t=e.gathering;return{auth:a,gathering:t,players:null!=t&&t.onlinePlayers||[]}},{changePlayerStatus:$})(ce),me=function(e){return function(a){return q.auth().signInWithPopup("github"===e?K:H).then(function(e){console.log("singIn result",e),a({type:m})}).catch(function(e){a({type:p,payload:e}),console.log("signIn action error",e)})}},pe=function(){return function(e){return e({type:R})}},de=function(e){function a(e){var t;return Object(w.a)(this,a),(t=Object(k.a)(this,Object(U.a)(a).call(this,e))).state={activeTab:"1"},t}return Object(C.a)(a,e),Object(M.a)(a,[{key:"toggleTab",value:function(e){this.state.activeTab!==e&&this.setState({activeTab:e})}},{key:"render",value:function(){var e=this,a=this.props,t=a.signIn,n=a.signInWithGithub,o=a.authenticationModalOpen,l=a.toggleAuthenticationModal;return r.a.createElement(Y.s,{isOpen:o,toggle:l,size:"lg",className:this.props.className},r.a.createElement(Y.t,null,r.a.createElement(Y.A,{className:"row"},r.a.createElement(Y.i,{lg:8,md:12,className:"add-right-border"},r.a.createElement(Y.u,{tabs:!0},r.a.createElement(Y.v,null,r.a.createElement(Y.w,{className:"1"===this.state.activeTab?"active":"",onClick:function(){e.toggleTab("1")}},"Login")),r.a.createElement(Y.v,null,r.a.createElement(Y.w,{className:"2"===this.state.activeTab?"active":"",onClick:function(){e.toggleTab("2")}},"Registration"))),r.a.createElement(Y.B,{activeTab:this.state.activeTab,className:"mt-2",id:"nav-tab-content"},r.a.createElement(Y.C,{tabId:"1"},r.a.createElement(ye,Object.assign({closeButtonAction:l},this.props))),r.a.createElement(Y.C,{tabId:"2"},r.a.createElement(he,Object.assign({closeButtonAction:l},this.props)))),r.a.createElement("div",{id:"OR",className:""},"OR")),r.a.createElement(Y.i,{sm:12,md:12,lg:4,className:"hidden-lg-down"},r.a.createElement(Y.A,{className:"text-center sign-with"},r.a.createElement(Y.i,{md:12},r.a.createElement("h5",null,"Sign in with")),r.a.createElement(Y.i,{md:12},r.a.createElement(Y.c,null,r.a.createElement(Y.b,{id:"github-signin",onClick:n},"Github"),r.a.createElement(Y.b,{color:"danger",id:"google-signin",onClick:t},"Google"))))))))}}]),a}(r.a.Component);de.defaultProps={};var ge=Object(i.b)(function(e){var a=e.modals;return{authenticationModalOpen:a.authenticationModalOpen,modals:a}},{signIn:function(){return function(e){return e(me("google"))}},signInWithGithub:function(){return function(e){return e(me("github"))}},toggleAuthenticationModal:pe,loginUserWithEmailPassword:function(e){var a=e.email,t=e.password;return function(e){var n=q.auth();return e({type:h}),n.signInWithEmailAndPassword(a,t).then(function(){e({type:y}),e({type:D,payload:{loginError:!1,registrationError:!1,message:"Login was successful!"}}),setTimeout(function(){return e({type:I,payload:{loginError:void 0}})},1600)}).catch(function(a){e({type:D,payload:{loginError:!0,message:a.message}})})}},registerUserAction:function(e){var a=e.username,t=e.email,n=e.password;return function(e){var r=q.auth();return e({type:f}),r.createUserWithEmailAndPassword(t,n).then(function(){e({type:v});var t=r.currentUser;t.updateProfile({uid:t.uid,displayName:a}).then(function(){setTimeout(function(){return e({type:I,payload:{registrationError:void 0}})},2e3),e({type:u,payload:q.auth().currentUser}),e({type:D,payload:{registrationError:!1,loginError:!1,message:"Registration was successful!"}})})}).catch(function(a){e({type:D,payload:{registrationError:!0,message:a.message}})})}},modalMessage:function(e){return function(a){return a({type:D,payload:e})}}})(de),Ee=function(e){return!!e.match("[a-zA-Z]+.*@.*[a-zA-Z]+.*[.][a-zA-Z]+")},he=function(e){function a(e){var t;return Object(w.a)(this,a),(t=Object(k.a)(this,Object(U.a)(a).call(this,e))).handleInputChange=function(e){return t.setState(Object(T.a)({},e.target.name,e.target.value))},t.handleRegisterClick=function(e){e.preventDefault();var a=t.state,n=a.username,r=a.email,o=a.password,l=a.passwordConfirm;return n.length<1?console.error("need valid username"):Ee(r)?o.length<6?console.error("need password of length 6 or more characters"):o!==l?console.error("password and confirmation did not match"):(console.log("data is valid. Registering user"),t.props.registerUserAction({username:n,email:r,password:o})):console.error("need valid email")},t.state={username:"",email:"",password:"",passwordConfirm:""},t}return Object(C.a)(a,e),Object(M.a)(a,[{key:"render",value:function(){var e=this.state,a=e.username,t=e.email,n=e.password,o=e.passwordConfirm,l=this.handleInputChange,i=this.handleRegisterClick,s=this.props.modals,c=s.registrationError,u=s.message,m=this.props.closeButtonAction,p=!c&&"undefined"!==typeof c||void 0,d=!(!c||"undefined"===typeof c)||void 0;return r.a.createElement(Y.n,{autoComplete:"off"},r.a.createElement(Y.p,{row:!0},r.a.createElement(Y.r,{for:"name",sm:3,className:"pr-0"},"Display Name"),r.a.createElement(Y.i,{sm:9},r.a.createElement(Y.q,{valid:p,invalid:d,type:"text",name:"username",value:a,placeholder:"Display Name",onChange:l}))),r.a.createElement(Y.p,{row:!0},r.a.createElement(Y.r,{for:"email",sm:3},"Email"),r.a.createElement(Y.i,{sm:9},r.a.createElement(Y.q,{valid:p,invalid:d,type:"email",name:"email",value:t,placeholder:"Email",onChange:l}))),r.a.createElement(Y.p,{row:!0},r.a.createElement(Y.r,{for:"password",sm:3},"Password"),r.a.createElement(Y.i,{sm:9},r.a.createElement(Y.q,{valid:p,invalid:d,type:"password",name:"password",value:n,placeholder:"Password (6-character minimum)",onChange:l,autoComplete:"off"}))),r.a.createElement(Y.p,{row:!0},r.a.createElement(Y.r,{for:"passwordConfirm",sm:3},"Confirm"),r.a.createElement(Y.i,{sm:9},r.a.createElement(Y.q,{valid:p,invalid:d,type:"password",name:"passwordConfirm",value:o,placeholder:"Confirm Password",onChange:l}),r.a.createElement(Y.o,{valid:p,invalid:"undefined"!==typeof d?"false":void 0},u))),r.a.createElement(Y.A,null,r.a.createElement(Y.i,{sm:{size:9,offset:3}},r.a.createElement(Y.b,{color:"primary",onClick:i},"Register"),r.a.createElement(Y.b,{color:"danger",onClick:m,className:"ml-2","data-dismiss":"modal"},"Cancel"))))}}]),a}(r.a.Component),ye=function(e){function a(e){var t;return Object(w.a)(this,a),(t=Object(k.a)(this,Object(U.a)(a).call(this,e))).handleInputChange=function(e){return t.setState(Object(T.a)({},e.target.name,e.target.value))},t.handleLoginClick=function(e){e.preventDefault(),console.log("in handleLoginClick");var a=t.state,n=a.email,r=a.password,o={loginError:void 0,message:""};r.length<6?(console.error("password needs to be at least 6 characters"),o=Object(j.a)({},o,{loginError:!0,loginPasswordError:!0,loginPasswordMessage:"Password length must be atleast 6 characters"})):o=Object(j.a)({},o,{loginPasswordError:void 0,loginPasswordMessage:""}),Ee(n)?o=Object(j.a)({},o,{loginUsernameError:void 0,loginUsernameMessage:""}):(console.error("email does not appear valid"),o=Object(j.a)({},o,{loginError:!0,loginUsernameError:!0,loginUsernameMessage:"Must be a valid email address."})),o.loginError?t.props.modalMessage(o):(console.log("trying to login"),t.props.modalMessage(o),t.props.loginUserWithEmailPassword({email:n,password:r}))},t.state={email:"",password:""},t}return Object(C.a)(a,e),Object(M.a)(a,[{key:"render",value:function(){var e=this.state,a=e.email,t=e.password,n=this.handleInputChange,o=this.handleLoginClick;console.log("this.props",this.props);var l=this.props.modals,i=l.loginError,s=l.message,c=l.loginUsernameError,u=l.loginUsernameMessage,m=l.loginPasswordError,p=l.loginPasswordMessage,d=this.props.closeButtonAction,g=!i&&"undefined"!==typeof i||void 0,E=!(!i||"undefined"===typeof i)||void 0,h="undefined"!==typeof c&&!1===c||g,y="undefined"!==typeof c&&!0===c||E,f="undefined"!==typeof m&&!1===m||g,v="undefined"!==typeof m&&!0===m||E;return console.log("validEmail: ",h,"valid: ",g,"loginUsernameError: ",c),r.a.createElement(Y.n,null,r.a.createElement(Y.p,{row:!0},r.a.createElement(Y.r,{for:"email",sm:3},"Email"),r.a.createElement(Y.i,{sm:9},r.a.createElement(Y.q,{valid:h,invalid:y,type:"email",name:"email",value:a,placeholder:"Email",onChange:n}),r.a.createElement(Y.o,{valid:h,invalid:"undefined"!==typeof y?"false":void 0},u))),r.a.createElement(Y.p,{row:!0},r.a.createElement(Y.r,{for:"password",sm:3},"Password"),r.a.createElement(Y.i,{sm:9},r.a.createElement(Y.q,{valid:f,invalid:v,type:"password",name:"password",value:t,placeholder:"password",onChange:n}),r.a.createElement(Y.o,{valid:!m,invalid:"undefined"!==typeof loginPassswordMessage?"false":void 0},p),r.a.createElement(Y.o,{valid:g,invalid:"undefined"!==typeof E?"false":void 0},s))),r.a.createElement(Y.A,null,r.a.createElement(Y.i,{sm:{size:9,offset:3}},r.a.createElement(Y.b,{color:"primary",onClick:o},"Submit"),r.a.createElement(Y.b,{color:"danger",onClick:d,className:"ml-2","data-dismiss":"modal"},"Cancel"))))}}]),a}(r.a.Component),fe=(t(152),t(96)),ve=t.n(fe),Oe=function(e){function a(){var e,t;Object(w.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=Object(k.a)(this,(e=Object(U.a)(a)).call.apply(e,[this].concat(r)))).toggleModal=function(e){e.preventDefault(),t.props.toggleAuthenticationModal()},t}return Object(C.a)(a,e),Object(M.a)(a,[{key:"componentWillUpdate",value:function(e){e.auth&&this.context.router.history.push("/app")}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(Y.A,{className:"social-signin-container"},r.a.createElement(Y.i,null,r.a.createElement("img",{alt:"Rock Paper Scissors",id:"sign-in",width:"100%",src:ve.a}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(Y.b,{href:"/#",className:"social-signin",onClick:this.toggleModal},"Sign in to start"))),r.a.createElement(Y.A,{className:"mt-4 mb-4 text-left"},r.a.createElement(Y.i,null,r.a.createElement(Y.d,{body:!0,outline:!0,color:"danger"},r.a.createElement("p",null,"For trying out the game with multiple players, you can use separate logins in separate browsing sessions."),r.a.createElement("p",null,"You can create your own logins or use the following sample logins (each with password '",r.a.createElement("samp",null,"password"),"'):"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("samp",null,"harry@hogwarts.co.uk")),r.a.createElement("li",null,r.a.createElement("samp",null,"ron@hogwarts.co.uk")),r.a.createElement("li",null,r.a.createElement("samp",null,"hermione@hogwarts.co.uk")))))))}}]),a}(n.Component);Oe.contextTypes={router:le.a.object};var be=Object(i.b)(function(e){return{auth:e.auth}},{toggleAuthenticationModal:pe})(Oe),Ne=function(e){function a(){var e,t;Object(w.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=Object(k.a)(this,(e=Object(U.a)(a)).call.apply(e,[this].concat(r)))).state={},t.selectPlayer=function(e){var a=t.props,n=a.auth,r=a.players;return t.props.requestGame(n,r.find(function(a){return a.uid===e}))},t}return Object(C.a)(a,e),Object(M.a)(a,[{key:"componentDidMount",value:function(){var e=this.props;!e.auth||e.gathering&&Object.keys(e.gathering).length>0||this.props.joinGathering(e.auth)}},{key:"render",value:function(){var e=this.props.game,a=this.props.players&&Array.isArray(this.props.players)?this.props.players:[];return r.a.createElement("div",{id:"main",style:{display:"block"}},r.a.createElement(Y.e,{className:""},e&&Object.keys(e).length>1&&e.gameKey&&e.gameKey.length>1?r.a.createElement(ae,{gameUID:e.key}):!a||a.length<0?r.a.createElement("div",null,"Loading"):r.a.createElement(ue,{players:"players",selectPlayer:this.selectPlayer})))}}]),a}(n.Component);var Ae=Object(i.b)(function(e){var a=e.auth,t=e.gathering,n=e.game;return{auth:a,gathering:t,players:null!=t&&t.onlinePlayers||[],game:n}},{joinGathering:function(e){return function(a){var t=new Q(q.database(),"OnlineUsers"),n=e.photoURL;t.join(e.uid,{displayName:e.displayName,inGame:!1,photoURL:n}).then(function(){var n;t.onUpdated(function(e,t){var n=e>0&&t&&Object.keys(t).length>0?Object.keys(t).map(function(e){return Object(j.a)({},t[e],{uid:e})}):[];a({type:O,payload:n})}),a((n=e.uid,function(e){return V().on("child_added",function(a){return e(X(n,a.key,a.val()))})}))}).catch(function(e){return console.log("error when joining gathering",e)}),a({type:b,payload:t})}},requestGame:function(e,a){return function(t){t({type:_.GAME_REQUESTED,payload:{user:e,otherPlayer:a}});var n=e.uid,r=e.displayName,o=a.uid,l=a.displayName;if(n&&o&&n.length>0&&o.length>0){var i={player1:n,player2:o,player1Wins:0,player2Wins:0,player1Name:r,player2Name:l,ties:0,maxNumberOfGames:5,gameInProgress:!0,gameClosed:!1,winner:0,round:1};return V().push(i).then(function(){return t({type:_.GAME_CREATED})}).catch(function(e){return console.log("error when creating new game",e),Promise.reject(e)})}return console.log("not creating new game"),Promise.reject(new Error("not creating new game"))}}})(Ne),_e=t(38),Pe=t(97),Ie=t.n(Pe),Re=function(e){function a(e){var t;return Object(w.a)(this,a),(t=Object(k.a)(this,Object(U.a)(a).call(this,e))).toggle=t.toggle.bind(Object(_e.a)(Object(_e.a)(t))),t.state={isOpen:!1},t}return Object(C.a)(a,e),Object(M.a)(a,[{key:"toggle",value:function(){console.log("toggling NavBar expansion"),this.setState({isOpen:!this.state.isOpen})}},{key:"render",value:function(){var e=this.props;return r.a.createElement(re,Object.assign({},e,{logo:Ie.a,toggle:this.toggle,isOpen:this.state.isOpen}))}}]),a}(r.a.Component);Re.defaultProps={auth:{}};var De=Object(i.b)(function(e){return{auth:e.auth,gathering:e.gathering}},{signOut:function(e){var a=e.gathering;return function(e){return e({type:g}),a&&Object.keys(a).length>0&&"function"===typeof a.leave?e(function(e){return function(a){null!=e&&"undefined"!==typeof e&&(e.leave(),a({type:N}))}}(a)):console.log("not leaving gathering, because it does not appear to be defined"),e(function(e){var a=q.auth();return a.currentUser?(a.signOut().then(function(){return e({type:d}),Promise.resolve(!0)}).catch(function(a){e({type:E,payload:a})}),Promise.resolve(!0)):(e({type:E,payload:"error on signout"}),Promise.resolve(!1))})}},toggleAuthenticationModal:pe})(Re),je=function(e){function a(){var e,t;Object(w.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=Object(k.a)(this,(e=Object(U.a)(a)).call.apply(e,[this].concat(r)))).componentDidMount=function(){t.props.fetchUser()},t}return Object(C.a)(a,e),Object(M.a)(a,[{key:"render",value:function(){return r.a.createElement(L.a,{basename:"/rock-paper-scissors-firebase-react-redux"},r.a.createElement("div",{className:"App"},r.a.createElement(De,null),r.a.createElement(ge,null),r.a.createElement("div",{className:"container main"},r.a.createElement(W.a,{exact:!0,path:"/",component:be}),r.a.createElement(W.a,{path:"/app",component:ie(Ae)}))))}}]),a}(n.Component),Te=Object(i.b)(null,{fetchUser:function(){return function(e){return q.auth().onAuthStateChanged(function(a){console.log("onAuthStateChanged triggered from fetchUser"),a&&a.displayName?(e({type:u,payload:a}),e({type:I,payload:{loginError:void 0}})):e({type:u,payload:null})})}}})(je),Ge=Object(s.d)(S,{},Object(s.a)(c.a));l.a.render(r.a.createElement(i.a,{store:Ge}," ",r.a.createElement(Te,null)),document.getElementById("root"))},96:function(e,a,t){e.exports=t.p+"static/media/landing-rps.7015b724.jpg"},97:function(e,a,t){e.exports=t.p+"static/media/rpsLogo.94b40bc8.png"},99:function(e,a,t){e.exports=t(155)}},[[99,2,1]]]);
//# sourceMappingURL=main.25b55ad1.chunk.js.map