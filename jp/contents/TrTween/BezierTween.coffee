class BezierTween extends BasicTween
	constructor:(target,to,from,cp,duration,easing)->
		super(target,to,from,duration,easing)
		@_t = 0
		@_cp = cp
		return
	play:->
		super()
		@_t = 0
		return
	update:(ct,prop)->
		@_t = @_easing.update(ct - @_st,0,1,@_duration)
		if ct >= @_endTime
			@_t = @_easing.update(@_duration,0,1,@_duration)
			@_state = TweenState.Completed
		tp = 1 - @_t
		@_mapper[prop] = @_t * @_t * @_to[prop] + 2 * @_t * tp * @_cp[prop] + tp * tp * @_from[prop]
		return
	clone:->
		return new BezierTween(@_target,@_to,@_from,@_cp,@_duration,@_easing)