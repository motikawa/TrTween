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
		blur:0
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
		@_trName      = VenderInfo.transformName
		@_trcssName   = VenderInfo.cssVender + "transform"
		@_filterName  = VenderInfo.cssVender + "filter"
		@_styleTweens = null
		@_trTweens    = null
		@_filterTweens = null
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
		@marginLeft   = NaN
		@marginTop    = NaN
		@marginBottom = NaN
		@marginRight  = NaN

		@backgroundPositionX = NaN
		@backgroundPositionY = NaN
		@visible      = "NONE"

		@display      = ""
		@_needUpdate  = false
		@_transformVals = []
		@transitionStr = ""
		@_parsePropaties()
		@_hasTransform = false
		@_hasCss2Style = false
		@_hasFilter = false
		if isIOS
			@_target.style.webkitTransformStyle = "preserve-3d";
		return
	_initTransformTweenList:->

		@_trTweens = new LinkedList()
		@_trTweens.push({name:"x",tween:null})
		@_trTweens.push({name:"y",tween:null})
		@_trTweens.push({name:"z",tween:null})
		@_trTweens.push({name:"rotation",tween:null})
		@_trTweens.push({name:"rotationX",tween:null})
		@_trTweens.push({name:"rotationY",tween:null})
		@_trTweens.push({name:"rotationZ",tween:null})
		@_trTweens.push({name:"skewX",tween:null})
		@_trTweens.push({name:"skewY",tween:null})
		@_trTweens.push({name:"scaleX",tween:null})
		@_trTweens.push({name:"scaleY",tween:null})
		return @_trTweens
	_parsePropaties:->
		target = @_target
		if !isFIE and target.style[@_trName] isnt undefined
			targetTransform = target.style[@_trName]
			r = /(translateX\()([0-9||\.||-||e-]+)(px\))/
			@x = if targetTransform.match(r) then targetTransform.match(r)[2] * 1 else NaN
			r = /(translateY\()([0-9||\.||-||e-]+)(px\))/
			@y = if targetTransform.match(r) then targetTransform.match(r)[2] * 1 else NaN
			r = /(translateZ\()([0-9||\.||-||e-]+)(px\))/
			@z = if targetTransform.match(r) then targetTransform.match(r)[2] * 1 else NaN
			r = /(scaleX\()([0-9||\.||-||e-]+)(\))/
			@scaleX = if targetTransform.match(r) then targetTransform.match(r)[2] * 1 else NaN
			r = /(scaleY\()([0-9||\.||-||e-]+)(\))/
			@scaleY = if targetTransform.match(r) then targetTransform.match(r)[2] * 1 else NaN
			r = /(rotate\()([0-9||\.||-||e-]+)(deg\))/
			@rotation = if targetTransform.match(r) then targetTransform.match(r)[2] * 1 else NaN
			r = /(rotateX\()([0-9||\.||-||e-]+)(deg\))/
			@rotationX = if targetTransform.match(r) then targetTransform.match(r)[2] * 1 else NaN
			r = /(rotateY\()([0-9||\.||-||e-]+)(deg\))/
			@rotationY = if targetTransform.match(r) then targetTransform.match(r)[2] * 1 else NaN
			r = /(rotateZ\()([0-9||\.||-||e-]+)(deg\))/
			@rotationZ = if targetTransform.match(r) then targetTransform.match(r)[2] * 1 else NaN
			r = /(skewX\()([0-9||\.||-||e-]+)(deg\))/
			@skewX = if targetTransform.match(r) then targetTransform.match(r)[2] * 1 else NaN
			r = /(skewY\()([0-9||\.||-||e-]+)(deg\))/
			@skewY = if targetTransform.match(r) then targetTransform.match(r)[2] * 1 else NaN

		if target.style
			
			if !isNaN(parseFloat(target.style.opacity))
				@alpha = parseFloat(target.style.opacity)

			if !isNaN(parseFloat(target.style.top))
				@top = parseFloat(target.style.top)
				
			if !isNaN(parseFloat(target.style.bottom))
				@bottom = parseFloat(target.style.bottom)

			if !isNaN(parseFloat(target.style.left))
				@left = parseFloat(target.style.left)

			if !isNaN(parseFloat(target.style.right))
				@right = parseFloat(target.style.right)

			if !isNaN(parseFloat(target.style.width))
				@width = parseFloat(target.style.width)

			if !isNaN(parseFloat(target.style.height))
				@height = parseFloat(target.style.height)

			if !isNaN(parseFloat(target.style.marginTop))
				@marginTop = parseFloat(target.style.marginTop)

			if !isNaN(parseFloat(target.style.marginBottom))
				@marginBottom = parseFloat(target.style.marginBottom)

			if !isNaN(parseFloat(target.style.marginRight))
				@marignRight = parseFloat(target.style.marginRight)

			if !isNaN(parseFloat(target.style.marginLeft))
				@marginLeft = parseFloat(target.style.marginLeft)
			if target.style.backgroundPosition isnt ""
				@backgroundPositionY = 0
				@backgroundPositionX = 0
				arr = target.style.backgroundPosition.split(" ")
				px = parseFloat(arr[0])
				py = parseFloat(arr[1])
				if !isNaN(px)
					@backgroundPositionX = px
				if !isNaN(px)
					@backgroundPositionY = py
			if !isNaN(parseFloat(target.style.backgroundPositionY))
				@backgroundPositionY = parseFloat(target.style.backgroundPositionY)

			@display = if target.style.display then target.style.display else ""
			if target.style.visible is "hidden"
				@visible = false
			else if target.style.visible is "visible"
				@visible = true
			else
				@visible = "NONE"
			# @visible = if target.style.visibleis "hidden" then false else true
		return
	registerTween:(tween)->
		to = tween._to
		from = tween._from
		c = {}
		if isFIE
			for name of to
				if name is "top" or
					name is "bottom" or
					name is "left" or
					name is "right" or
					name is "width" or
					name is "height" or
					name is "alpha" or
					name is "marginTop" or
					name is "marginBottom" or
					name is "marginRight" or
					name is "marginLeft" or
					name is "backgroundPositionX" or
					name is "backgroundPositionY"

						tl = @_styleTweens || (@_styleTweens = new LinkedList())
						fp = 0
						@_hasCss2Style = true
						if from and !isNaN(from[name])
							fp = from[name]
						else
							fp = if !isNaN(@[name]) then @[name] else PropertyMapper._defaults[name]
						c[name] = to[name] - fp
						from[name] = fp
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
					@_hasTransform = true
					fp = 0
					if from and !isNaN(from[name])
						fp = from[name]
					else
						fp = if !isNaN(@[name]) then @[name] else PropertyMapper._defaults[name]

					from[name] = fp
					c[name] = to[name] - fp

					tl = @_trTweens || @_initTransformTweenList()
					f = tl.getFirst()
					while f
						if f.elm.name is name
							f.elm.tween = tween
						f = f.next
			else if name is "top" or
					name is "bottom" or
					name is "left" or
					name is "right" or
					name is "width" or
					name is "height" or
					name is "alpha" or
					name is "marginTop" or
					name is "marginBottom" or
					name is "marginRight" or
					name is "marginLeft" or
					name is "backgroundPositionX" or
					name is "backgroundPositionY"
						@_hasCss2Style = true
						tl = @_styleTweens || (@_styleTweens = new LinkedList())
						fp = 0
						if from and !isNaN(from[name])
							fp = from[name]
						else
							fp = if !isNaN(@[name]) then @[name] else PropertyMapper._defaults[name]
						c[name] = to[name] - fp
						from[name] = fp
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
						@_hasFilter = true
						
						tl = @_filterTweens || (@_filterTweens = new LinkedList())
						fp = 0
						if from and !isNaN(from[name])
							fp = from[name]
						else
							fp = if !isNaN(@[name]) then @[name] else PropertyMapper._defaults[name]
						c[name] = to[name] - fp
						from[name] = fp
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

	applyStyles:->
		if isFIE
			@_target.style.cssText = @_calcCss2()	
			return
		
		@_target.style.cssText = @transitionStr + @_calcCss2()  + @_calcFilter() + @_calcMatrix()
		return
	_calcCss2:->
		if !@_hasCss2Style
			return ""
		cssText = ""
		if !isNaN(@top)          then cssText = cssText + "top:#{@top}px;"
		if !isNaN(@bottom)       then cssText = cssText + "bottom:#{@bottom}px;"
		if !isNaN(@left)         then cssText = cssText + "left:#{@left}px;"
		if !isNaN(@right)        then cssText = cssText + "right:#{@right}px;"
		if !isNaN(@width)        then cssText = cssText + "width:#{@width}px;"
		if !isNaN(@height)       then cssText = cssText + "height:#{@height}px;"
		if !isNaN(@marginTop)    then cssText = cssText + "margin-top:#{@marginTop}px;"
		if !isNaN(@marginBottom) then cssText = cssText + "margin-bottom:#{@marginBottom}px;"
		if !isNaN(@marginLeft)   then cssText = cssText + "margin-left:#{@marginLeft}px;"
		if !isNaN(@marginRight)  then cssText = cssText + "margin-right:#{@marginRight}px;"
		if !isNaN(@backgroundPositionY) or !isNaN(@backgroundPositionX)
			@backgroundPositionX = if isNaN(@backgroundPositionX) then 0 else @backgroundPositionX
			@backgroundPositionY = if isNaN(@backgroundPositionY) then 0 else @backgroundPositionY
			cssText = cssText + "background-position:#{@backgroundPositionX}px #{@backgroundPositionY}px;"

		if !isNaN(@alpha)
			@alpha = Math.round(@alpha * 1000)/1000
			if !isFIE
				cssText = cssText + "opacity:#{@alpha};"
			else
				ta = @alpha * 100
				cssText = cssText + "zoom:1;-ms-filter:\"alpha(opacity=#{ta})\";filter:alpha(opacity=#{ta});opacity:#{@alpha};"
		if @visible isnt "NONE"
			  if @visible then cssText = cssText + "visibility:visible;" else cssText = cssText + "visibility:hidden;"
		if @display isnt ""
			cssText = cssText + "display:#{@display};"
		return cssText
	_calcFilter:->
		if !@_hasFilter
			return ""
		filterTxt = ""
		if !isNaN(@glayscale)  then filterTxt = filterTxt + " glayscale(#{@glayscale}%)"
		if !isNaN(@sepia)      then filterTxt = filterTxt + " sepia(#{@sepia}%)"
		if !isNaN(@saturate)   then filterTxt = filterTxt + " saturate(#{@saturate}%)"
		if !isNaN(@hueRotate)  then filterTxt = filterTxt + " hue-rotate(#{@blur}deg)"
		if !isNaN(@invert)     then filterTxt = filterTxt + " invert(#{@invert}%)"
		if !isNaN(@brightness) then filterTxt = filterTxt + " brightness(#{@brightness}%)"
		if !isNaN(@contrast)   then filterTxt = filterTxt + " contrast(#{@contrast}%)"
		if !isNaN(@blur)       then filterTxt = filterTxt + " blur(#{@blur}px)"
		
		return @_filterName + ":" + filterTxt + ";"

	_calcMatrix:()->
		# if !@_trTweens
		# 	return ""
		if !@_hasTransform
			return ""

		trTxt = ""
		if !isNaN(@x)         then trTxt = trTxt + " translateX(#{@x}px)"
		if !isNaN(@y)         then trTxt = trTxt + " translateY(#{@y}px)"
		if !isNaN(@z)         then trTxt = trTxt + " translateZ(#{@z}px)"
		if !isNaN(@rotation)  then trTxt = trTxt + " rotate(#{@rotation}deg)"
		if !isNaN(@rotationX) then trTxt = trTxt + " rotateX(#{@rotationX}deg)"
		if !isNaN(@rotationY) then trTxt = trTxt + " rotateY(#{@rotationY}deg)"
		if !isNaN(@rotationZ) then trTxt = trTxt + " rotateZ(#{@rotationZ}deg)"
		if !isNaN(@skewX)     then trTxt = trTxt + " skewX(#{@skewX}deg)"
		if !isNaN(@skewY)     then trTxt = trTxt + " skewY(#{@skewY}deg)"
		if !isNaN(@scaleX)    then trTxt = trTxt + " scaleX(#{@scaleX})"
		if !isNaN(@scaleY)    then trTxt = trTxt + " scaleY(#{@scaleY})"
		
		return @_trcssName + ":" + trTxt + ";"

		# mtarr = [1,0,0,1,0,0]
		# mt11 = 1
		# mt12 = 0
		# mt21 = 0
		# mt22 = 1
		# tx   = 0
		# ty   = 0
		# radian = PropertyMapper._RADIAN
		
		# tx = if !isNaN(@x) then @x else 0
		# ty = if !isNaN(@y) then @y else 0

		# if !isNaN(@rotation)
		# 	rad = @rotation * radian
		# 	sin = Math.sin(rad)
		# 	cos = Math.cos(rad)
		# 	mt11 = cos
		# 	mt12 = -sin
		# 	mt21 = sin
		# 	mt22 = cos

		# skarr = null	
		# if !isNaN(@skewX)
		# 	tanX = Math.tan(@skewX * radian)
		# 	skarr = [1,tanX,0,1]

		# if !isNaN(@skewY)
		# 	tanY = Math.tan(@skewY * radian)
		# 	if skarr
		# 		skarr[2] = tanY
		# 	else
		# 		skarr = [1,0,tanY,1]
		# if skarr
		# 	mt11 = mt11 * skarr[0] + mt12 * skarr[2]
		# 	mt12 = mt11 * skarr[1] + mt12 * skarr[3]
		# 	mt21 = mt21 * skarr[0] + mt22 * skarr[2]
		# 	mt22 = mt21 * skarr[1] + mt22 * skarr[3]
		

		# if !isNaN(@scaleX)
		# 	mt11 = mt11 * @scaleX
		# if !isNaN(@scaleY)
		# 	mt22 = mt22 * @scaleY
		# mt11 = mt11.toFixed(10)
		# mt12 = mt12.toFixed(10)
		# mt21 = mt21.toFixed(10)
		# mt22 = mt22.toFixed(10)
		# tx = tx.toFixed(10)
		# ty = ty.toFixed(10)
		
		
		# return "#{@_trcssName}:matrix(#{mt11},#{mt12},#{mt21},#{mt22},#{tx},#{ty});"



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
					name is "marginTop" or
					name is "marginBottom" or
					name is "marginRight" or
					name is "marginLeft" or
					name is "backgroundPositionX" or
					name is "backgroundPositionY" or
					name is "visible" or
					name is "display"
						@_hasCss2Style = true
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
						@_hasTransform = true
				else if name is "grayscale" or
						name is "sepia" or
						name is "saturate" or
						name is "hueRotate" or
						name is "invert" or
						name is "brightness" or
						name is "contrast" or
						name is "blur"
							@_hasFilter = true
				@[name] = properties[name]
		if change and applyStyle
			@applyStyles()
		return
	update:(ct)->

		f = if @_trTweens then @_trTweens.getFirst() else null
		while f
			tw = f.elm.tween
			if !tw
				f = f.next
				continue
			if tw._state is TweenState.Completed or tw._state is TweenState.Playing
				tw.update(ct,f.elm.name)
			f = f.next

		f = if @_styleTweens then @_styleTweens.getFirst() else null
		while f
			tw = f.elm.tween
			if !tw
				f = f.next
				continue
			if tw._state is TweenState.Completed or tw._state is TweenState.Playing
				tw.update(ct,f.elm.name)
			f = f.next

		f = if @_filterTweens then @_filterTweens.getFirst() else null
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
		f = if @_trTweens then @_trTweens.getFirst() else null
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
		f = if @_styleTweens then @_styleTweens.getFirst() else null
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

		f = if @_filterTweens then @_filterTweens.getFirst() else null
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
		return @_calcMatrix()
	getStyleString:->
		return @_calcCss2()

class ObjectMapper extends PropertyMapper
	constructor:(target)->
		@_target = target
		@_tweens = null
	applyStyles:->
		f = @_tweens.getFirst()
		while f
			n = f.elm.name
			@_target[n] = @[n]
			if f.elm.hasUpdater
				f = @_target.updaters[n]
				f.apply(@_target,[@[n]])
			f = f.next
		return
	registerTween:(tween)->
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
