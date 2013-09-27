class SerialTween extends ITweenGroup
	constructor:(tweens)->
		@_tweens = tweens
		@_current = null
		@_index = 0
		@_state = TweenState.Initialized
		@_duration = @_getDuration()
		return
	play:->
		@_state = TweenState.Playing
		@_current = null
		@_index = 0
		@_playTween()
		return
	stop:->
		@_state = TweenState.Stoped
		if @_current
			@_current.stop()
		if @_onStop
			@_onStop(@)
		return
	_playTween:->
		@_current = @_tweens[@_index]
		@_current.onComplete(=>
			@_onChildComplete()
		)
		@_current.play()
		return
	_onChildComplete:->
		if ++@_index >= @_tweens.length
			@finalize()
		else
			@_playTween()
		return
	finalize:->
		@_state = TweenState.Finalized
		if @_onComplete
			@_onComplete(@)
		return
	getDuration:->
		return @_duration
	_getDuration:->
		dur = 0
		for val in @_tweens
			dur += val.getDuration()
		return dur
	clone:->
		tweens = []
		for val,i in @_tweens
			tweens[i] = val.clone()
		return new SerialTween(tweens)
	gotoAndStop:(parsent)->
		parsent = if parsent > 1 then 1 else if parsent < 0 then 0 else parsent

		if parsent is 1 and @_state is TweenState.Completed or parsent is 0 and @_state is TweenState.Initialized
			return

		p = @getDuration() * parsent
		totalDuration = 0
		
		if parsent is 1
			if @_state isnt TweenState.Completed
				@_state = TweenState.Completed
		else if parsent is 0 
			if @_state isnt TweenState.Initialized
				@_state = TweenState.Initialized
		else
			@_state = TweenState.Playing

		for val in @_tweens
			duration = val.getDuration()
			if totalDuration > p
				if val._state isnt TweenState.Initialized
					val.gotoAndStop(0)

			else if totalDuration + duration <= p
				if val._state isnt TweenState.Completed
					val.gotoAndStop(1)
			else
				vp = (p - totalDuration) / duration
				val.gotoAndStop(vp)
			totalDuration = totalDuration + duration
			if parsent is 1
				val._state = TweenState.Completed
			else if parsent is 0
				val._state = TweenState.Initialized

		

			
			
		return
	gotoAndPlay:(parsent)->
		parsent = if parsent > 1 then 1 else if parsent < 0 then 0 else parsent
		p = @getDuration()
		mp = bmp = 0
		for val in @_tweens
			mp = val.getDuration() / p
			tp = (parsent - bmp) / mp
			if tp < 0 or tp >= 1
				val.gotoAndStop(tp)
			else
				val.gotoAndPlay(tp)
			bmp = bmp + mp
