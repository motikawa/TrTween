class DelayTween extends ITween
	constructor:(tween,delay = 0)->
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
	gotoAndStop:(parsent)->
		parsent = if parsent > 1 then 1 else if parsent < 0 then 0 else parsent
		td = @_tween.getDuration() * 1000
		p = @_delay + td
		dp = @_delay / p
		tp = td / p

		if parsent > dp
			@_tween.gotoAndStop((parsent - dp)/tp)
		else
			@_tween.gotoAndStop(0)
		return

	gotoAndPlay:(parsent)->
		parsent = if parsent > 1 then 1 else if parsent < 0 then 0 else parsent
		td = @_tween.getDuration() * 1000
		p = @_delay + td
		dp = @_delay / p
		tp = td / p

		if parsent > dp
			@_tween.gotoAndPlay((parsent - dp)/tp)
		else
			@_delay = ((dp - parsent) / dp) * @_delay
			@play()
		return