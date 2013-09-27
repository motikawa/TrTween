class ParallelTween extends ITweenGroup
	constructor:(tweens)->
		@_tweens = tweens
		@_state = TweenState.Initialized
		@_duration = @_getDuration()
		return
	play:->
		@_state = TweenState.Playing
		for val in @_tweens
			val._state = TweenState.Playing
			val.onComplete(=>
				@_onChildComplete()
			)
			val.play()
		return
	finalize:->
		@_state = TweenState.Finalized
		if @_onComplete
			@_onComplete(@)
		return
	stop:->
		for val in @_tweens
			val.stop()
		@_state = TweenState.Stoped
		return
	_onChildComplete:->

		for val in @_tweens
			if val._state isnt TweenState.Finalized then return
		@finalize()
		return
	getDuration:->
		return @_duration
	_getDuration:->
		max = -1
		for val in @_tweens
			dur = val.getDuration()
			max = if dur > max then dur else max
		return max
	clone:->
		tweens = []
		for val,i in @_tweens
			tweens[i] = val.clone()
		return new ParallelTween(tweens)
	gotoAndStop:(parsent)->
		parsent = if parsent > 1 then 1 else if parsent < 0 then 0 else parsent
		if parsent is 1 and @_state is TweenState.Completed or parsent is 0 and @_state is TweenState.Initialized
			return
		p = @getDuration()
		st = p * parsent

		for val in @_tweens
			td = val.getDuration()
			val.gotoAndStop(st / td)
		
		if parsent is 1
			if @_state isnt TweenState.Completed
				@_state = TweenState.Completed
		else if parsent is 0 
			if @_state isnt TweenState.Initialized
				@_state = TweenState.Initialized
		else
			@_state = TweenState.Playing

	gotoAndPlay:(parsent)->
		parsent = if parsent > 1 then 1 else if parsent < 0 then 0 else parsent
		p = @getDuration()
		st = p * parsent
		for val in @_tweens
			td = val.getDuration()
			val.gotoAndPlay(st / td)
		return