class SerialTween extends ITweenGroup
	constructor:(tweens)->
		@_tweens = tweens
		@_current = null
		@_index = 0
		@_state = TweenState.Initialized
		return
	play:->
		@_state = TweenState.Playing
		@_current = null
		@_index = 0
		@_playTween()
		return
	stop:->
		@_state = TweenState.Stoped
		if @_current
			@_current.stop()
		return
	_playTween:->
		@_current = @_tweens[@_index]
		@_current.onComplete(=>
			@_onChildComplete()
		)
		@_current.play()
		return
	_onChildComplete:->
		if ++@_index >= @_tweens.length
			@finalize()
		else
			@_playTween()
		return
	finalize:->
		@_state = TweenState.Finalized
		if @_onComplete
			@_onComplete(@)
		return
	getDuration:->
		dur = 0
		for val in @_tweens
			dur += val.getDuration()
		return dur
	clone:->
		tweens = []
		for val,i in @_tweens
			tweens[i] = val.clone()
		return new SerialTween(tweens)