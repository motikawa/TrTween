TrTween.js
=======


**lastest version:** 0.1.5

Methods
--------------------------
 - tween
 - delay
 - bezier
 - parallel
 - parallelTweens
 - serial
 - serialTweens
 - transition
 - animation 
 - repeat
 - func
 - prop
 - apply
 - easingTweens

Sample
--------------------------
```js
//single
TrTween.tween(document.getElementById("hoge"),{x:100,y:100,alpha:0},null,1,Quart.easeOut).play();
//Dom Elements of css3 transform property to translateX(100px),translateY(100px) and opacity 0 by 1sec
//delay
TrTween.delay(TrTween.tween(document.getElementById("hoge"),{x:100,y:100,alpha:0},null,1,Quart.easeOut)).play();
//CSS3 transition 
TrTween.transition(document.getElementById("hoge"),{x:100,y:100,alpha:0},null,1,"easeOutQuart").play();
//CSS3 Animation　from parameter need
TrTween.animation(document.getElementById("hoge"),{x:100,y:100,alpha:0},{x:0,y:0,alpha:1},1,"easeOutQuart").play();
//bezier tween
TrTween.bezier(document.getElementById("hoge"),{x:300,y:200},null,{x:150,y:400},1,Bounce.easeOut).play();
//property
TrTween.prop(document.getElementById("hoge"),{visible:false,display:"none"}).play();
//switch to "visibility:hidden" and display:"none"
//function
TrTween.func(console.log,["moja-"],null).play();

//multiple
//serial
var elements = document.getElementsByClassName("test");
TrTween.serial(
	TrTween.tween(elements[0],{y:100},null,1,Quart.easeOut),
	TrTween.tween(elements[1],{y:100},null,1,Quart.easeOut),
	TrTween.tween(elements[2],{y:100},null,1,Quart.easeOut),
	TrTween.tween(elements[3],{y:100},null,1,Quart.easeOut)
).play();
//parallel
TrTween.parallel(
	TrTween.tween(elements[0],{y:100},null,1,Quart.easeOut),
	TrTween.tween(elements[1],{y:100},null,1,Quart.easeOut),
	TrTween.tween(elements[2],{y:100},null,1,Quart.easeOut),
	TrTween.tween(elements[3],{y:100},null,1,Quart.easeOut)
).play();
//easing
TrTween.easingTweens([
	TrTween.tween(elements[0],{y:100},null,1,Quart.easeOut),
	TrTween.tween(elements[1],{y:100},null,1,Quart.easeOut),
	TrTween.tween(elements[2],{y:100},null,1,Quart.easeOut),
	TrTween.tween(elements[3],{y:100},null,1,Quart.easeOut)],Quart.easeOut,1).play();
```
