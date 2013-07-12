class ObjectMapper extends PropertyMapper
	constructor:(target)->
		@_target = target
		@_tweens = null
	applyStyles:->
		f = @_tweens.getFirst()
		while f
			n = f.elm.name
			@_target[n] = @[n]
			f = f.next
		return
	registerTween:(tween)->
		to = tween._to
		from = tween._from
		c = {}
		tw = @_tweens || (@_tweens = new LinkedList())
		console.log("moja-")
		for name of to
			fp = 0

			if from and !isNaN(from[name])
				fp = from[name]
			else if !isNaN(@_target[name])
				fp = @_target[name]
			else
				fp = 0
			c[name] = to[name] - fp
			@[name] = fp
			f = tw.getFirst()
			find = false
			while f
				if f.elm.name is name
					find = true
					f.elm.tween = tween
					break
				f = f.next
			if !find
				tw.push({name:name,tween:tween})
		Render.addListener(@)
		return c
	update:(ct)->
		f = @_tweens.getFirst()
		while f
			tw = f.elm.tween
			if !tw
				f = f.next
				continue
			if tw._state is TweenState.Completed or tw._state is TweenState.Playing
				tw.update(ct,f.elm.name)
			f = f.next

		@applyStyles()
		@fixTweens()
		return
	fixTweens:->
		f = @_tweens.getFirst()
		mcount = 0
		while f
			tw = f.elm.tween
			if !tw
				f = f.next
				continue
			if tw._state is TweenState.Completed
				f.elm.tween = null
				tw.tickUpdate()
				tw.finalize()
				mcount = 1
			else if tw._state is TweenState.Playing
				tw.tickUpdate()
				mcount = 1
			else if tw._state is TweenState.Stoped
				f.elm.tween = null
			else if tw._state is TweenState.Initialized
				mcount = 1
			f = f.next
		if mcount is 0
			Render.removeListener(@)
		return
