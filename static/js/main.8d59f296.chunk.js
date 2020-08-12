(this.webpackJsonpposenet=this.webpackJsonpposenet||[]).push([[0],{2:function(e){e.exports=JSON.parse('{"d":{"width":640,"height":360},"b":0.35,"a":0.5,"c":600}')},25:function(e,t,n){e.exports=n(41)},30:function(e,t,n){},37:function(e,t){},38:function(e,t){},39:function(e,t){},41:function(e,t,n){"use strict";n.r(t);var r=n(1),i=n.n(r),o=n(19),a=n.n(o),c=(n(30),n(4)),u=n.n(c),s=n(9),f=n(3),l=n(12),d=n(20),m=n(2),h=function(){var e=Object(s.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a();case 2:n=e.sent,t(n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"green";e.forEach((function(e){if(e.score>=m.a){var r=e.position,i=r.x,o=r.y;t.beginPath(),t.arc(i,o,4,0,2*Math.PI,!1),t.fillStyle=n,t.fill()}}))},v=n(24),O={HEAD_TILT_RIGHT:{message:"leaning to the right too much",type:"HEAD_TILT_RIGHT"},HEAD_TILT_LEFT:{message:"leaning to the left too much",type:"HEAD_TILT_LEFT"},DEFAULT:{message:"you've moved too far from the starting points ",type:"DEFAULT"}},g=function(e){var t=e.keypoints,n=e.startingPoints,r=(e.minDeviationPercentage,function(e){var t=e.keypoints,n=e.startingPoints,r=e.minPartConfidenceScore,i=void 0===r?.99:r,o=e.minDiff,a=void 0===o?5:o,c=n.filter((function(e){var t=e.part;return["leftEye","rightEye"].includes(t)})),u=t.filter((function(e){var t=e.part;return["leftEye","rightEye"].includes(t)}));if(u.some((function(e){return e.score<i})))return[{message:"confidence score for eyes not met",type:"headTilt"}];var s=c[0].position.x-u[0].position.x;return s>0&&Math.abs(s)>a?[O.HEAD_TILT_RIGHT]:s<0&&Math.abs(s)>a?[O.HEAD_TILT_LEFT]:[]}({keypoints:t,startingPoints:n}));return Object(v.a)(r)},b=n(5),y=n(6);function E(){var e=Object(b.a)(["\n  z-index: 1;\n  height: 100vh;\n  width: 100vw;\n  background: white;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]);return E=function(){return e},e}function T(){var e=Object(b.a)(['\n  width: 80px;\n  height: 80px;\n  margin-top: 10%;\n\n  &:after {\n    content: " ";\n    display: block;\n    width: 64px;\n    height: 64px;\n    margin: 8px;\n    border-radius: 50%;\n    border: 6px solid black;\n    border-color: black transparent black transparent;\n    animation: '," 1.2s linear infinite;\n  }\n"]);return T=function(){return e},e}function w(){var e=Object(b.a)(["\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n"]);return w=function(){return e},e}var j=Object(y.b)(w()),P=y.a.div(T(),j),I=y.a.div(E()),x=function(e){var t=e.videoIsReady,n=e.isModelReady;return t&&n?null:i.a.createElement(I,null,i.a.createElement(P,null),i.a.createElement("p",null,function(e,t){return e||t?e&&!t?"loading pose model":"":"preparing webcam"}(t,n)))};function R(){var e=Object(b.a)(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n"]);return R=function(){return e},e}var k=y.a.div(R()),_=function(){var e=Object(r.useRef)(),t=Object(r.useRef)(),n=Object(r.useRef)([]),o=Object(r.useRef)(Object(l.a)({timeOutOfPosition:0},O.DEFAULT)),a=Object(r.useRef)(Object(l.a)({timeOutOfPosition:0},O.HEAD_TILT_LEFT)),c=Object(r.useRef)(Object(l.a)({timeOutOfPosition:0},O.HEAD_TILT_RIGHT)),d=Object(r.useState)([]),v=Object(f.a)(d,2),b=v[0],y=v[1],E=Object(r.useState)([]),T=Object(f.a)(E,2),w=T[0],j=T[1],P=function(e){var t=e.videoRef,n=Object(r.useState)(null),i=Object(f.a)(n,2),o=i[0],a=i[1],c=Object(r.useState)(!1),u=Object(f.a)(c,2),s=u[0],l=u[1];return Object(r.useEffect)((function(){navigator.mediaDevices.getUserMedia({video:{facingMode:"environment",video:{width:m.d.width,height:m.d.height}}}).then((function(e){t.current.srcObject=e,t.current.onloadedmetadata=function(e){t.current.play(),l(!0)},t.current.width=m.d.width,t.current.height=m.d.height})).catch((function(e){return a(e)}))}),[]),{videoError:o,videoIsReady:s}}({videoRef:e}),I=P.videoIsReady,R=P.videoError,_=function(e){var t=e.videoRef,n=e.videoIsReady,i=Object(r.useState)(null),o=Object(f.a)(i,2),a=o[0],c=o[1];return Object(r.useEffect)((function(){n&&h(c)}),[t,n]),a}({videoRef:e,videoIsReady:I});return Object(r.useEffect)((function(){var r;if(I&&_){var i=t.current.getContext("2d"),f=function(){var t=Object(s.a)(u.a.mark((function t(){var r,s,f,l,d;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_.estimateSinglePose(e.current,{flipHorizontal:!1});case 2:r=t.sent,s=r.keypoints,f=r.score,i.drawImage(e.current,0,0,m.d.width,m.d.height),f>=m.b&&(n.current=s,p(s,i)),b.length>0&&0===w.length&&(0===(l=g({keypoints:n.current,startingPoints:b})).length&&(o.current.timeOutOfPosition=0,a.current.timeOutOfPosition=0,c.current.timeOutOfPosition=0),o.current.timeOutOfPosition===m.c||a.current.timeOutOfPosition===m.c||c.current.timeOutOfPosition===m.c?(d=[o.current,c.current,a.current].filter((function(e){return 600===e.timeOutOfPosition})),j(d)):(l.some((function(e){return e.type===O.DEFAULT.type}))&&o.current.timeOutOfPosition++,l.some((function(e){return e.type===O.HEAD_TILT_LEFT.type}))&&a.current.timeOutOfPosition++,l.some((function(e){return e.type===O.HEAD_TILT_RIGHT.type}))&&c.current.timeOutOfPosition++));case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();r=requestAnimationFrame((function e(){f(),r=requestAnimationFrame(e)}))}return function(){cancelAnimationFrame(r)}})),R?(console.log(R),i.a.createElement("div",null,"there was an error loading, make sure your browser supports webcam or that your webcam is turned on")):i.a.createElement(k,null,i.a.createElement(x,{videoIsReady:I,isModelReady:!!_}),i.a.createElement("video",{style:{position:"fixed",zIndex:-1},ref:e,autoPlay:!0}),i.a.createElement("canvas",{width:m.d.width,height:m.d.height,ref:t,id:"c1"}),(I||!!_)&&i.a.createElement("div",{style:{marginTop:"30px"}},i.a.createElement("button",{disabled:b.length>0&&0===w.length,onClick:function(){j([]),y(n.current),o.current.timeOutOfPosition=0,a.current.timeOutOfPosition=0,c.current.timeOutOfPosition=0}},"Set starting points"),i.a.createElement("button",{onClick:function(){y([])}},"Stop posture tracking"),w.length>0&&i.a.createElement("div",null,i.a.createElement("p",null,"uh oh you're out of positions for the reasons below, when you're ready press the set starting points to reset"),w.map((function(e,t){var n=e.message;return i.a.createElement("div",{key:t},i.a.createElement("p",null,n))})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[25,1,2]]]);
//# sourceMappingURL=main.8d59f296.chunk.js.map