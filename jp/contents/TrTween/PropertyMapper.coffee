class PropertyMapper
	@_RADIAN = Math.PI / 180
	@_targets = new LinkedList()
	@_defaults = {
		x:0,
		y:0,
		z:0,
		rotation:0,
		rotationX:0,
		rotationY:0,
		rotationZ:0,
		scaleX:1,
		scaleY:1,
		skewX:0,
		skewY:0,
		top:0,
		bottom:0,
		left:0,
		right:0,
		width:0,
		height:0,
		margin:0,
		marginTop:0,
		marginBottom:0,
		marginLeft:0,
		marginRight:0,
		backgroundPositionX:0,
		backgroundPositionY:0,
		alpha:1,
		grayscale:0,
		sepia:0,
		saturate:100,
		hueRotate:0,
		invert:0,
		brightness:100,
		contrast:100,
		blur:0,
		zIndex:1
	}
	@getMapper:(target)->
		f = PropertyMapper._targets.getFirst()
		while f
			if f.elm._target is target
				return f.elm
			f = f.next
		if target.style
			obj = new PropertyMapper(target)
		else
			obj = new ObjectMapper(target)
		PropertyMapper._targets.push(obj)
		return obj
	constructor:(target)->
		if !target then throw new Error("target が未設定")
		@_target      = target

		@_tweens      = null
		#wrapping properties
		@x            = NaN
		@y            = NaN
		@z            = NaN
		@rotation     = NaN
		@rotationX    = NaN
		@rotationY    = NaN
		@rotationZ    = NaN
		@scaleX       = NaN
		@scaleY       = NaN
		@skewX        = NaN
		@skewY        = NaN

		@grayscale    = NaN
		@sepia        = NaN
		@saturate     = NaN
		@hueRotate    = NaN
		@invert       = NaN
		@brightness   = NaN
		@contrast     = NaN
		@blur         = NaN


		@alpha        = NaN
		@top          = NaN
		@bottom       = NaN
		@left         = NaN
		@right        = NaN
		@width        = NaN
		@height       = NaN
		@margin       = NaN
		@marginLeft   = NaN
		@marginTop    = NaN
		@marginBottom = NaN
		@marginRight  = NaN
		@scrollTop    = NaN
		@scrollLeft   = NaN
		@zIndex       = NaN
		@backgroundPositionX = NaN
		@backgroundPositionY = NaN
		@visible      = "NONE"
		@display      = ""
		
		
		@transitionStr = ""
		@_trWrapper = new TSW(@)
		@_flWrapper = new FSW(@)
		@_css2W     = new CSS2W(@)
		
		if isFIE
			# @registerTween = @_registerTweenForFIE
			@registerTween = @_registerTween
			@applyStyles   = @_applyStylesForFIE
		else
			@registerTween = @_registerTween
			@applyStyles   = @_applyStyles
		return
	_registerTweenForFIE:(tween,fixOnly = false)->
		to = tween._to
		from = tween._from
		c = {}
		for name of to
			if name is "top" or
				name is "bottom" or
				name is "left" or
				name is "right" or
				name is "width" or
				name is "height" or
				name is "alpha" or
				name is "margin" or
				name is "marginTop" or
				name is "marginBottom" or
				name is "marginRight" or
				name is "marginLeft" or
				name is "zIndex" or 
				name is "backgroundPositionX" or
				name is "backgroundPositionY"
					@_css2W.pushProperty(name)
					tl = @_tweens || @_tweens = new LinkedList()
					fp = 0
					if from and !isNaN(from[name])
						fp = from[name]
					else
						fp = if !isNaN(@[name]) then @[name] else PropertyMapper._defaults[name]
					c[name] = to[name] - fp
					from[name] = fp
					if fixOnly
						continue
					f = tl.getFirst()
					find = false
					while f
						if f.elm.name is name
							find = true
							f.elm.tween = tween
							break
						f = f.next
					if !find
						tl.push({name:name,tween:tween})
				else if name is "scrollTop"
					fp = 0
					if from and !isNaN(from[name])
						fp = from[name]
					else
						fp = @_target.scrollTop || 0

					from[name] = fp
					c[name] = to[name] - fp

					tl = @_tweens || @_tweens = new LinkedList()
					if fixOnly
						continue
					f = tl.getFirst()
					find = false
					while f
						if f.elm.name is name
							find = true
							f.elm.tween = tween
							break
						f = f.next
					if !find
						tl.push({name:name,tween:tween})
				else if name is "scrollLeft"
					fp = 0
					if from and !isNaN(from[name])
						fp = from[name]
					else
						fp = @_target.scrollLeft || 0

					from[name] = fp
					c[name] = to[name] - fp

					tl = @_tweens || @_tweens = new LinkedList()
					if fixOnly
						continue
					f = tl.getFirst()
					find = false
					while f
						if f.elm.name is name
							find = true
							f.elm.tween = tween
							break
						f = f.next
					if !find
						tl.push({name:name,tween:tween})
			# else

		Render.addListener(@)
		return c
	_registerTween:(tween,fixOnly = false)->
		to = tween._to
		from = tween._from
		c = {}
		for name of to
			if  name is "x" or
				name is "y" or
				name is "z" or
				name is "rotation" or
				name is "rotationX" or
				name is "rotationY" or
				name is "rotationZ" or
				name is "skewX" or
				name is "skewY" or
				name is "scaleX" or
				name is "scaleY"
					@_trWrapper.pushProperty(name)
					fp = 0
					if from and !isNaN(from[name])
						fp = from[name]
					else
						fp = if !isNaN(@[name]) then @[name] else PropertyMapper._defaults[name]

					from[name] = fp
					c[name] = to[name] - fp

					tl = @_tweens || @_tweens = new LinkedList()
					if fixOnly
						continue
					f = tl.getFirst()
					find = false
					if fixOnly
						continue
					while f
						if f.elm.name is name
							find = true
							f.elm.tween = tween
							break
						f = f.next
					if !find
						tl.push({name:name,tween:tween})
			else if name is "top" or
					name is "bottom" or
					name is "left" or
					name is "right" or
					name is "width" or
					name is "height" or
					name is "alpha" or
					name is "margin" or
					name is "marginTop" or
					name is "marginBottom" or
					name is "marginRight" or
					name is "marginLeft" or
					name is "zIndex" or 
					name is "backgroundPositionX" or
					name is "backgroundPositionY"
						@_css2W.pushProperty(name)
						tl = @_tweens || @_tweens = new LinkedList()
						fp = 0
						if from and !isNaN(from[name])
							fp = from[name]
						else
							fp = if !isNaN(@[name]) then @[name] else PropertyMapper._defaults[name]
						# console.log(name,fp)
						c[name] = to[name] - fp
						from[name] = fp
						if fixOnly
							continue
						f = tl.getFirst()
						find = false

						while f
							if f.elm.name is name
								find = true
								f.elm.tween = tween
								break
							f = f.next
						if !find
							tl.push({name:name,tween:tween})
			else if name is "grayscale" or
					name is "sepia" or
					name is "saturate" or
					name is "hueRotate" or
					name is "invert" or
					name is "brightness" or
					name is "contrast" or
					name is "blur"
						@_flWrapper.pushProperty(name)
						fp = 0
						if from and !isNaN(from[name])
							fp = from[name]
						else
							fp = if !isNaN(@[name]) then @[name] else PropertyMapper._defaults[name]

						from[name] = fp
						c[name] = to[name] - fp

						tl = @_tweens || @_tweens = new LinkedList()
						if fixOnly
							continue
						f = tl.getFirst()
						find = false
						while f
							if f.elm.name is name
								find = true
								f.elm.tween = tween
								break
							f = f.next
						if !find
							tl.push({name:name,tween:tween})
			else if name is "scrollTop"
				fp = 0
				if from and !isNaN(from[name])
					fp = from[name]
				else
					fp = @_target.scrollTop || 0

				from[name] = fp
				c[name] = to[name] - fp

				tl = @_tweens || @_tweens = new LinkedList()
				if fixOnly
					continue
				f = tl.getFirst()
				find = false
				while f
					if f.elm.name is name
						find = true
						f.elm.tween = tween
						break
					f = f.next
				if !find
					tl.push({name:name,tween:tween})
			else if name is "scrollLeft"
				fp = 0
				if from and !isNaN(from[name])
					fp = from[name]
				else
					fp = @_target.scrollLeft || 0

				from[name] = fp
				c[name] = to[name] - fp

				tl = @_tweens || @_tweens = new LinkedList()
				if fixOnly
					continue
				f = tl.getFirst()
				find = false
				while f
					if f.elm.name is name
						find = true
						f.elm.tween = tween
						break
					f = f.next
				if !find
					tl.push({name:name,tween:tween})
		Render.addListener(@)
		return c

	_applyStyles:->
		@_target.style.cssText = @transitionStr + @_css2W.toStyleString() + @_flWrapper.toStyleString() + @_trWrapper.toStyleString()
		if !isNaN(@scrollTop) 
			@_target.scrollTop = @scrollTop
		if !isNaN(@scrollLeft)
			@_target.scrollLeft = @scrollLeft
		return
	_applyStylesForFIE:->
		@_target.style.cssText = @_css2W.toStyleString()
		if !isNaN(@scrollTop) 
			@_target.scrollTop = @scrollTop
		if !isNaN(@scrollLeft)
			@_target.scrollLeft = @scrollLeft
		return
	changeUnit:(props)->
		return @_css2W.changeUnit(props)
	applyProperties:(properties,applyStyle)->
		change = false
		for name of properties
			if @[name] isnt null
				change = true
				
				if name is "top" or
					name is "bottom" or
					name is "left" or
					name is "right" or
					name is "width" or
					name is "height" or
					name is "alpha" or
					name is "margin" or
					name is "marginTop" or
					name is "marginBottom" or
					name is "marginRight" or
					name is "marginLeft" or
					name is "zIndex" or 
					name is "backgroundPositionX" or
					name is "backgroundPositionY" or
					name is "visible" or
					name is "display"
						@_css2W.pushProperty(name)
				else if  name is "x" or
					name is "y" or
					name is "z" or
					name is "rotation" or
					name is "rotationX" or
					name is "rotationY" or
					name is "rotationZ" or
					name is "skewX" or
					name is "skewY" or
					name is "scaleX" or
					name is "scaleY"
						@_trWrapper.pushProperty(name)
				else if name is "grayscale" or
						name is "sepia" or
						name is "saturate" or
						name is "hueRotate" or
						name is "invert" or
						name is "brightness" or
						name is "contrast" or
						name is "blur"
							@_flWrapper.pushProperty(name)
				@[name] = properties[name]
		if change and applyStyle
			@applyStyles()
		return
	update:(ct)->

		f = if @_tweens then @_tweens.getFirst() else null
		while f
			tw = f.elm.tween
			if !tw
				f = f.next
				continue
			if tw._state is TweenState.Completed or tw._state is TweenState.Playing
				tw.update(ct,f.elm.name)
			f = f.next

		@applyStyles()
		
		f = if @_tweens then @_tweens.getFirst() else null
		mcount = 0

		while f
			tw = f.elm.tween
			if !tw
				f = f.next
				continue
			
			if tw._state is TweenState.Completed
				tw.tickUpdate()
				f.elm.tween = null
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
	getTransformString:->
		return @_trWrapper.toStyleString()
	getStyleString:->
		return @_css2W.toStyleString()

class ObjectMapper extends PropertyMapper
	constructor:(target)->
		@_target = target
		@_tweens = null
	applyStyles:->
		f = @_tweens.getFirst()
		# console.log(@_tweens.length)
		while f
			n = f.elm.name
			# console.log(n,f.elm.tween,f.next)
			@_target[n] = @[n]
			if f.elm.tween? and f.elm.hasUpdater
				fn = @_target.updaters[n]
				fn.apply(@_target,[@[n]])
			f = f.next
		return
	applyProperties:(properties,applyStyle)->
		for name of properties
			if @[name] isnt null
				change = true
				@[name] = properties[name]
				@_target[name] = properties[name]
				if @_target.updaters and @_target.updaters[name]
					fn = @_target.updaters[name]
					fn.apply(@_target,[@[name]])
		# if change and applyStyle
		# 	@applyStyles()
		return
	registerTween:(tween,fixOnly = false)->
		to = tween._to
		from = tween._from
		c = {}
		tw = @_tweens || (@_tweens = new LinkedList())
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
			from[name] = fp
			f = tw.getFirst()
			find = false
			hasUpdater = false
			if @_target.updaters and @_target.updaters[name]
				hasUpdater = true
			
			while f
				if f.elm.name is name
					find = true
					f.elm.tween = tween
					break
				f = f.next
			if !find
				tw.push({name:name,tween:tween,hasUpdater:hasUpdater})
		if fixOnly
			return c
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
