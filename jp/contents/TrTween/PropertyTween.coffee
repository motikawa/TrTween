class PropertyTween extends ITween
	constructor:(target,properties)->
		@_target = target
		@_prop = properties
		@_duration = 25
		@_bProps = null
		return
	play:->
		mapper = PropertyMapper.getMapper(@_target)
		mapper.applyProperties(@_prop,true)
		setTimeout(=>
			@finalize()
		,25)
		return
	finalize:->
		@_state = TweenState.Finalized
		if @_onComplete
			@_onComplete(@)
		return
	clone:->
		return new PropertyTween(@_target,@_prop)
	gotoAndStop:(parsent)->
		parsent = if parsent > 1 then 1 else if parsent < 0 then 0 else parsent
		if parsent is 1
			mapper = PropertyMapper.getMapper(@_target)
			@_bProps = {}
			for val of @_prop
				@_bProps[val] = mapper[val]
			mapper.applyProperties(@_prop,true)

			@_state = TweenState.Completed
		else if parsent is 0
			@_state = TweenState.Initialized
			if @_bProps?
				# console.log(@_bProps)
				mapper = PropertyMapper.getMapper(@_target)
				mapper.applyProperties(@_bProps,true)
				@_bProps = null
		else
			@_state = TweenState.Playing
			if @_bProps?
				mapper = PropertyMapper.getMapper(@_target)
				mapper.applyProperties(@_bProps,true)
				@_bProps = null

		return
	gotoAndPlay:(parsent)->
		parsent = if parsent > 1 then 1 else if parsent < 0 then 0 else parsent
		if parsent is 1
			mapper = PropertyMapper.getMapper(@_target)
			mapper.applyProperties(@_prop,true)
			@_state = TweenState.Completed
		
		return