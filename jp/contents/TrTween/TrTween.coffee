class TrTween
	@tween:(target,to,from,duration,easing)->
		return new BasicTween(target,to,from,duration,easing)
	@bezier:(target,to,from,controlpoint,duration,easing)->
		return new BezierTween(target,to,from,controlpoint,duration,easing)
	@delay:(tween,delay)->
		return new DelayTween(tween,delay)
	@parallelTweens:(tweens)->
		return new ParallelTween(tweens)
	@parallel:->
		return new ParallelTween(arguments)
	@serialTweens:(tweens)->
		return new SerialTween(tweens)
	@serial:->
		return new SerialTween(arguments)
	@easingTweens:(tweens,easing,duration)->
		return new EasingTween(tweens,easing,duration)
	@transition:(target,to,from,duration,cssEasing)->
		return new TransitionTween(target,to,from,duration,cssEasing)
	@animation:(target,to,from,duration,cssEasing)->
		return new AnimationTween(target,to,from,duration,cssEasing)
	@repeat:(tween,count)->
		return new RepeatTween(tween,count)
	@func:(func,params,caller)->
		return new FuncTween(func,params,caller)
	@prop:(target,propaties)->
		return new PropertyTween(target,propaties)
	@wait:(time)->
		return new WaitTween(time)
	@changeUnit:(target,prop)->
		return new ChangeUnitTween(target,prop)
	@version = "0.2.1"
	@DefaultEasing = Linear.easeNone
	@DefaultCssEasing = CSS3Easing.linear

window.jp = window.jp || {}
window.jp.contents = window.jp.contents || {}
window.jp.contents.collections = window.jp.contents.collections || {}
window.jp.contents.TrTween = window.jp.contents.TrTween || {}
window.jp.contents.collections.LinkedList = LinkedList
window.jp.contents.mapper = window.jp.contents.mapper || {}
window.jp.contents.mapper.PropertyMapper = PropertyMapper
window.jp.contents.TrTween.TrTween = TrTween
window.jp.contents.TrTween.Render = Render