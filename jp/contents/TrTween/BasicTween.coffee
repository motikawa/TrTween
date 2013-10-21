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
		@register(false)
		if Render.getState() is 0
			Render.start()
		if @_onPlay
			@_onPlay(@)
		return
	register:(register)->
		@_c = @_mapper.registerTween(@,register)
		@_st = if Date.now? then  Date.now() else new Date().getTime()
		@_endTime = @_st + @_duration
		return
	update:(ct,prop)->
		
		if ct >= @_endTime 
			@_mapper[prop] = @_easing.update(@_duration,@_from[prop],@_c[prop],@_duration)
			@_state = TweenState.Completed
			return
		@_mapper[prop] = @_easing.update(ct - @_st,@_from[prop],@_c[prop],@_duration)
		# console.log("---->",prop,@_mapper[prop])
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
	gotoAndStop:(parsent)->
		parsent = if parsent > 1 then 1 else if parsent < 0 then 0 else parsent
		# console.log("sss",parsent,@)
		if parsent is 1 and @_state is TweenState.Completed or parsent is 0 and @_state is TweenState.Initialized
			return

		@_st = if Date.now? then  Date.now() else new Date().getTime()
		@_endTime = @_st + @_duration
		ct = @_st + @_duration * parsent
		if !@_c?
			@_c = @_mapper.registerTween(@,true)
		
		
		if parsent is 0
			if @_state isnt TweenState.Initialized
				for val of @_to
					@update(ct,val)
					@_mapper.applyStyles()
				@_c = null
				# @_from = {}
				@_state = TweenState.Initialized
				
			return
		else if parsent is 1
			if @_state isnt TweenState.Completed
				for val of @_to
					@update(ct,val)
					@_mapper.applyStyles()
				@_c = null
				# @_from = {}
				@_state = TweenState.Completed
				
			return
		else
			@_state = TweenState.Playing
			for val of @_to
				@update(ct,val)
				@_mapper.applyStyles()
		return
	gotoAndPlay:(parsent)->
		parsent = if parsent > 1 then 1 else if parsent < 0 then 0 else parsent
		@_state = TweenState.Playing
		@_c = @_mapper.registerTween(@)
		@_st = if Date.now? then  Date.now() else new Date().getTime()

		@_st = @_st - (@_duration * parsent)
		@_endTime = @_st + @_duration

		if Render.getState() is 0
			Render.start()
		if @_onPlay
			@_onPlay(@)
		return
