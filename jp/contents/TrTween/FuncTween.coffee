class FuncTween extends ITween
	constructor:(func,params,caller)->
		@_func = func
		@_params = params || []
		@_caller = caller || @
		@_state = TweenState.Initialized
		@_duration = 0
		return
	play:->
		@_state = TweenState.Playing
		@_func.apply(@_caller,@_params)
		setTimeout(=>
			@finalize()
		)
		return
	clone:->
		return new FuncTween(@_func,@_params,@_caller)
	finalize:->
		@_state = TweenState.Finalized
		if @_onComplete
			@_onComplete(@)
		return