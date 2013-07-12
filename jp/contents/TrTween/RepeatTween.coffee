class RepeatTween extends ITween
	constructor:(tween,repeatCount)->
		@_count = if repeatCount < 0 then 0 else repeatCount
		@_tween = tween
		@_state = TweenState.Initialized
		@_ct = 0
		@_tween.onComplete(=>
			@_repeatPlay()
		)
	play:->
		@_state = TweenState.Playing
		@_tween.play()
	_repeatPlay:->
		# console.log("moja-")
		if @_count is 0 or ++@_ct < @_count
			@_tween.play()
		else
			@finalize()
	stop:->
		if @_tween
			@_tween.stop()
		@finalize()
		return
	getDuration:->
		if @_count is 0 then return Infinity
		else @_tween.getDuration() * @_count
	finalize:->
		@_state = TweenState.Finalized
		if @_onComplete
			@_onComplete(@)
		return
	clone:->
		return new RepeatTween(@_tween.clone(),@_count)