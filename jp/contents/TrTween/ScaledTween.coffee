class ScaledTween extends ITween
	constructor:(tween,scale)->
		@_tween = tween
		@_scale = scale
	play:->
		@_state = TweenState.Playing
		@_c = @_mapper.registerTween(@)
		@_st = Date.now() || new Date().getTime()
		@_endTime = @_st + @_tween.getDuration() / @_scale
		if Render.getState() is 0
			Render.start()
		if @_onPlay
			@_onPlay(@)
