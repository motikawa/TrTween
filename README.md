TrTween.js(Javascript Tween Engine for DOM Element)
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
TrTween.tween(document.getElementById("hoge"),{x:100,y:100,alpha:0},null,1,Quart.easeOut).play()
//Dom Elements of css3 transform property to translateX(100px),translateY(100px) and opacity 0 by 1sec

TrTween.transition(document.getElementById("hoge"),{x:100,y:100,alpha:0},null,1,"easeOutQuart").play()
//CSS3 transition 

TrTween.animation(document.getElementById("hoge"),{x:100,y:100,alpha:0},{x:0,y:0,alpha:1},1,"easeOutQuart").play()
//CSS3 Animation　from parameter is need
```
