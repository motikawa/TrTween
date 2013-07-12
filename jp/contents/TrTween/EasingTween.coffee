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
		return
	play:->
		for val in @_tweens
			val._state = TweenState.Initialized
			val.onComplete(@_delegate)
		Render.addListener(@)
		@_st = if Date.now? then Date.now() else new Date().getTime()
		@_endTime = @_st + @_duration
		@_state = TweenState.Playing
		if Render.getState() is 0
			Render.start()
		return
	update:(ct)->
		si = @_easing.update(ct - @_st,0,@_max,@_duration)
		if @_endTime <= ct
			si = @_easing.update(@_duration,0,@_max,@_duration)
			Render.removeListener(@)
		for i in [0..si]
			tw = @_tweens[i]
			if tw._state is TweenState.Initialized
				tw.play()
		return
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
		for val in @_tweens
			val.stop()
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