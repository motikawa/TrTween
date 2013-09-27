class RepeatTween extends ITween
	constructor:(tween,repeatCount)->
		@_count = if repeatCount < 0 then 0 else repeatCount
		@_tween = tween
		@_state = TweenState.Initialized
		@_ct = 0
		@_tween.onComplete(=>
			@_repeatPlay()
		)
		@_duration = @_getDuration()
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
		return @_duration
	_getDuration:->
		if @_count is 0 then return Infinity
		else @_tween.getDuration() * @_count
	finalize:->
		@_state = TweenState.Finalized
		if @_onComplete
			@_onComplete(@)
		return
	clone:->
		return new RepeatTween(@_tween.clone(),@_count)
	gotoAndStop:(parsent)->
		if @_count is 0
			throw new Error("ないよ")
		parsent = if parsent > 1 then 1 else if parsent < 0 then 0 else parsent
		tp = @_duration * parsent
		td = @_tween.getDuration()
		r  = ~~(tp / td) - 1
		s  = tp - (r * td)
		@_ct = r
		@_tween.gotoAndStop(s/td)
		return
	gotoAndPlay:(parsent)->
		if @_count is 0
			throw new Error("ないよ")
		parsent = if parsent > 1 then 1 else if parsent < 0 then 0 else parsent
		tp = @_duration * parsent
		td = @_tween.getDuration()
		r  = ~~(tp / td) - 1
		s  = tp - (r * td)
		@_ct = r
		@_tween.gotoAndPlay(s/td)
		return