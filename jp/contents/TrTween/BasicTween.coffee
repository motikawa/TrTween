class BasicTween extends ITween
	constructor:(target,to,from,duration,easing)->
		@_onComplete = null
		@_onPlay     = null
		@_onUpdate   = null
		@_onStop     = null
		@_state      = TweenState.Initialized
		@_from       = from || {}
		@_to         = to
		@_duration   = duration * 1000
		@_easing     = easing || TrTween.DefaultEasing
		@_target     = target
		@_mapper     = PropertyMapper.getMapper(target)
		# console.log(@_mapper)
		return
	play:->
		@_state = TweenState.Playing
		@_c = @_mapper.registerTween(@)
		@_st = if Date.now? then  Date.now() else new Date().getTime()
		@_endTime = @_st + @_duration
		if Render.getState() is 0
			Render.start()
		if @_onPlay
			@_onPlay(@)
		return
	update:(ct,prop)->
		if ct >= @_endTime 
			@_mapper[prop] = (@_easing.update(@_duration,@_from[prop],@_c[prop],@_duration) * 1000 | 0) / 1000
			@_state = TweenState.Completed
			return
		@_mapper[prop] = @_easing.update(ct - @_st,@_from[prop],@_c[prop],@_duration)
			
		return
	tickUpdate:->
		if @_onUpdate
			@_onUpdate(@)
		return

	stop:->
		@_state = TweenState.Stoped
		if @_onStop
			@_onStop(@)
		return
	finalize:->
		@_state = TweenState.Finalized
		if @_onComplete
			@_onComplete(@)
		return
	clone:->
		return new BasicTween(@_target,@_tp,@_from,@_duration / 1000,@_easing)

