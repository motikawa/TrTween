class FuncTween extends ITween
	constructor:(func,params,caller)->
		@_func = func
		@_params = params || []
		@_caller = caller || @
		@_state = TweenState.Initialized
		@_duration = 25
		return
	play:->
		@_state = TweenState.Playing
		@_func.apply(@_caller,@_params)
		setTimeout(=>
			@finalize()
		,@_duration)
		return
	clone:->
		return new FuncTween(@_func,@_params,@_caller)
	finalize:->
		@_state = TweenState.Finalized
		if @_onComplete
			@_onComplete(@)
		return
	gotoAndStop:(parsent)->
		parsent = if parsent > 1 then 1 else if parsent < 0 then 0 else parsent
		if parsent is 1
			@_func.apply(@_caller,@_params)
			@_state = TweenState.Completed
		else if parsent is 0
			@_state = TweenState.Initialized
		else
			@_state = TweenState.Playing
		return
	gotoAndPlay:(parsent)->
		parsent = if parsent > 1 then 1 else if parsent < 0 then 0 else parsent
		if parsent is 1
			@_func.apply(@_caller,@_params)
			@_state = TweenState.Completed
		else if parsent is 0
			@_state = TweenState.Initialized
		else
			@_state = TweenState.Playing
		return
class WaitTween extends ITween
	constructor:(time)->
		@_duration = time * 1000
		@_cd = @_duration
	play:->
		@_state = TweenState.Playing
		@_cid = setTimeout(=>
			@finalize()
		,@_cd)
		return
	stop:->
		clearTimeout(@_cid)
		return
	clone:->
		return new WaitTween(@_duration)
	finalize:->
		@_state = TweenState.Finalized
		if @_onComplete
			@_onComplete(@)
		return
	gotoAndStop:(parsent)->
		parsent = if parsent > 1 then 1 else if parsent < 0 then 0 else parsent
		@_cd = @_duration - @_duration * parsent
		if parsent is 1
			@_state = TweenState.Completed
		else if parsent is 0
			@_state = TweenState.Initialized
		else
			@_state = TweenState.Playing
		return
	gotoAndPlay:(parsent)->
		parsent = if parsent > 1 then 1 else if parsent < 0 then 0 else parsent
		@_duration = @_cd - @_cd * parsent
		@_cd = @_duration - @_duration * parsent
		@play()
		return