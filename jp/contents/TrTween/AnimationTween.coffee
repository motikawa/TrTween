class AnimationTween extends ICSSTween
	@_count = 0
	@_css = null
	@_initializeCss:->
		css = document.createElement("style")
		css.type = 'text/css'
		document.getElementsByTagName("head")[0].appendChild(css)
		AnimationTween._css = css
		return
	@_createKeyFrame:(mapper,to,from)->
		if !AnimationTween._css then AnimationTween._initializeCss()
		keyName = VenderInfo.cssVender + "keyframes"
		cv = VenderInfo.cssVender
		className = "taTmp_" + (++AnimationTween._count)
		mapper.applyProperties(from,false)
		fromstr = mapper.getTransformString()
		sfromstr = mapper.getStyleString()
		mapper.applyProperties(to,false)
		tostr = mapper.getTransformString()
		stostr = mapper.getStyleString()
		rule = document.createTextNode("""
			@#{cv}keyframes #{className}{
				0%{
					#{cv}transform:#{fromstr};
					#{sfromstr}
				}
				100%{
					#{cv}transform:#{tostr};
					#{stostr}
				}
			}
		""")
		return [rule,className]
	constructor:(target,to,from,duration,cssEasing)->
		@_target = target
		@_to = to
		@_from = from
		@_duration = duration * 1000
		@_easing = if cssEasing then CSS3Easing[cssEasing] else TrTween.DefaultCssEasing
		@_mapper = PropertyMapper.getMapper(@_target)
		arr = AnimationTween._createKeyFrame(@_mapper,@_to,@_from)
		@_rule = arr[0]
		@_className = arr[1]
		@_state = TweenState.Initialized
		@_animationName = VenderInfo.vender+"Animation"
		@_animationEnd  = VenderInfo.animationEnd
		@_delegate = =>
			@_onAnimationEnd

		@_cid = -1
		return
	play:->
		@_state = TweenState.Playing
		@_cid = setTimeout(@_delegate,@_duration + 100)
		setTimeout(=>
			AnimationTween._css.appendChild(@_rule)
			@_target.addEventListener(@_animationEnd,@_delegate)
			setTimeout(=>
				@_target.style[@_animationName] = "#{@_className} #{@_duration}ms #{@_easing}"
				@_mapper.applyProperties(@_to,true)
			,0)
		,0)
		return
	_onAnimationEnd:->
		clearTimeout(@_cid)
		@_target.removeEventListener(@_animationEnd,@_delegate)

#		@_target.style[@_animationName] = null
#		AnimationTween._css.removeChild(@_rule)

		setTimeout(=>
			@finalize()
		,0)
		return
	clone:->
		return new AnimationTween(@_target,@_to,@_from,@_duration/1000,@_easing)