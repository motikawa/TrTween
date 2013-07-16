class TransitionTween extends ICSSTween
	constructor:(target,to,from,duration,cssEasing)->
		@_target = target
		@_to = to
		@_from = from || {}
		@_easing = if cssEasing then CSS3Easing[cssEasing] else TrTween.DefaultCssEasing
		@_transitionName = VenderInfo.vender + "Transition"
		@_transitionEnd = VenderInfo.vender + "TransitionEnd"
		# @_transitionEnd = "TransitionEnd"
		# console.log(APP_BROWSER.name)
		# if APP_BROWSER.name is "firefox"
		# 	@_transitionEnd = "transitionend"
		# console.log(@_transitionEnd)
		@_transitionNameCSS = VenderInfo.cssVender + "transition"
		@_duration = duration * 1000
		@_state = TweenState.Initialized
		@_mapper =PropertyMapper.getMapper(@_target)
		@_delegate = =>
			@_onTransitionEnd()

		@_cid = -1
		return
	_parseProps:->
		trprop = ""
		props = []
		for name of @_to
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
					trprop = VenderInfo.cssVender + "transform"
			else if name is "top" or
					name is "bottom" or
					name is "left" or
					name is "right" or
					name is "width" or
					name is "height"
						props.push(name)
			else if name is "alpha"  then props.push("opacity")
			else if name is "marginTop"  then props.push("margin-top")
			else if name is "marginBottom"  then props.push("margin-bottom")
			else if name is "marginRight"  then props.push("margin-right")
			else if name is "marginLeft"  then props.push("margin-left")
		if trprop isnt ""	
			props.push(trprop)
		return props.join(",")

	play:->
		mapper = @_mapper
		mapper.applyProperties(@_from,true)
		@_state = TweenState.Playing
		@_cid = setTimeout(=>
			@_onTransitionEnd()
		,@_duration + 100)
		pname = @_parseProps()
		setTimeout(=>
			@_target.style[@_transitionName] = pname + " " + @_duration + "ms " + @_easing
			@_mapper.transitionStr = @_transitionNameCSS + ":" + pname + " " + @_duration + "ms " + @_easing + ";"
			setTimeout(=>
				mapper.applyProperties(@_to,true)
			,0)
		,0)
		return
	_onTransitionEnd:->
		clearTimeout(@_cid)
		@_target.style[@_transitionName] = null
		@_mapper.transitionStr = ""
		setTimeout(=>
			@finalize()
		,0)
		return
	clone:->
		return new TransitionTween(@_target,@_to,@_from,@_duration/1000,@_easing)
