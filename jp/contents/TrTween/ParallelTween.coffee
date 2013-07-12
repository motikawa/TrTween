class ParallelTween extends ITweenGroup
	constructor:(tweens)->
		@_tweens = tweens
		@_state = TweenState.Initialized
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