class ITween
	update:(currentTime,prop)->
	play:->
	stop:->
	finalize:->
	clone:->
	getDuration:->
		return @_duration / 1000
	onComplete:(func)->
		@_onComplete = func
		return
	onUpdate:(func)->
		@_onUpdate = func
		return
	onPlay:(func)->
		@_onPlay = func
		return
	onStop:(func)->
		@_onStop = func
		return
	getState:->
		return @_state
	gotoAndStop:(parsent)->
		return
	gotoAndPlay:(parsent)->
		return
class ITweenGroup extends ITween
	getTweens:->
		return @_tweens
	getLength:->
		return @_tweens.length
class ICSSTween extends ITween
	finalize:->
		@_state = TweenState.Finalized
		if @_onComplete
			@_onComplete(@)
		return