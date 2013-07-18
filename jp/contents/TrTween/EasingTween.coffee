class EasingTween extends ITweenGroup
	constructor:(tweens,easing,duration)->
		@_tweens = tweens
		@_state = TweenState.Initialized
		@_easing = easing
		@_duration = duration * 1000
		@_delegate = ()=>
			@_onChildComplete()
		@_index = 0
		@_max = @_tweens.length-1
		@_timers = []
		return
	play:->
		len = @_max
		d = @_duration
		easing = @_easing
		for val,i in @_tweens
			time = d * i/len
			delay = d - easing.update(d - time,0,d,d)
			@_timers[i] = @_playChild(val,delay)
		@_state = TweenState.Playing
		
		return
	_playChild:(tween,delay)->
		tween._state = TweenState.Initialized
		tween.onComplete(@_delegate)
		return setTimeout(->
			tween.play()
		,delay)
		
	_onChildComplete:->
		for val in @_tweens
			if val._state is TweenState.Playing or val._state is TweenState.Initialized then return
		@finalize()
		return
	finalize:->
		@_state = TweenState.Finalized
		if @_onComplete
			@_onComplete(@)
		return
	stop:->
		for val,i in @_tweens
			val.stop()
			clearTimeout(@_timers[i])
		@_state = TweenState.Finalized
		if @_onComplete
			@_onComplete(@)
		return
	getDuration:->
	clone:->
		tweens = []
		for val,i in @_tweens
			tweens[i] = val.clone()
		return new EasingTween(tweens,@_easing,@_duration/1000)