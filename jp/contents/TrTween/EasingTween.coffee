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
		@_totalDuration = @_getDuration()
		# console.log("total",@_getDuration())
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
		return @_totalDuration
	_getDuration:->
		len = @_max
		d = @_duration
		easing = @_easing
		durations = []
		for val,i in @_tweens
			time = d * i/len
			delay = d - easing.update(d - time,0,d,d)
			durations.push(delay + val.getDuration() * 1000)
		return Math.max.apply(null,durations) / 1000;
	gotoAndStop:(parsent)->
		# console.log("easing",parsent)
		parsent = if parsent > 1 then 1 else if parsent < 0 then 0 else parsent
		# console.clear()
		# console.log parsent
		len = @_max
		p = @getDuration()
		d = @_duration / 1000
		easing = @_easing
		durations = []
		tp = p * parsent
		bmp = bt = 0
		for val,i in @_tweens
			time = d * i/len
			delay = d - easing.update(d - time,0,d,d)
			if delay > tp
				val.gotoAndStop(0)
			else
				tmp = tp - delay
				td = val.getDuration()
				val.gotoAndStop(tmp / td)
		return


	clone:->
		tweens = []
		for val,i in @_tweens
			tweens[i] = val.clone()
		return new EasingTween(tweens,@_easing,@_duration/1000)