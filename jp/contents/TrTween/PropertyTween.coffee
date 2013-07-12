class PropertyTween extends ITween
	constructor:(target,properties)->
		@_target = target
		@_prop = properties
		@_duration = 0
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