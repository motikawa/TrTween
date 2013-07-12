class DelayTween extends ITween
	constructor:(tween,delay)->
		@_delay = delay * 1000
		@_tween = tween
		@_tween.onComplete(=>
			@_onTweenComplete()
		)
		@_tid = -1
		@_state = TweenState.Initialized
		return
	play:->
		@_state = TweenState.Playing
		@_tid = setTimeout(=>
			@_tween.play()
			return	
		,@_delay)
		if @_onPlay
			@_onPlay(@)
		return
	finalize:->
		# @_tween = null
		@_state = TweenState.Finalized
		if @_onComplete
			@_onComplete(@)
		return
	stop:->
		clearTimeout(@_tid)
		if @_tween
			@_tween.stop()
		return
	_onTweenComplete:->
		# tween = @_tween
		@finalize()
		# @_tween = tween
		# console.log(@_tween)
		return
	getDuration:->
		return @_delay / 1000 + @_tween.getDuration()
	getState:->
		return @_tween.getState()
	clone:->
		return new DelayTween(@_tween.clone(),@_delay/ 1000)