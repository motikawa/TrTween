TrTween = jp.contents.TrTween.TrTween
Render  = jp.contents.TrTween.Render
class SpriteSheet
	constructor:(target,step,fps = 30)->
		@_target = target
		@_step = step
		@_fps = 1000 / fps
		@_isPlaying = false
		@_ut = 0
		@_updateParams = []
		@_udcount = 0
		@x = 0
		@y = 0
		@z = 0
		@scaleX = 1
		@scaleY = 1
		@alpha = 1
		@rotation = 0
		@rotationX = 0
		@rotationY = 0
		@rotationZ = 0
		@updaters = {
			x:=>
				
				@_updateParams.push("x")
				@updaters.x = @onParamUpdate
				@onParamUpdate()
				return
			y:=>
				@_updateParams.push("y")
				@updaters.y = @onParamUpdate
				@onParamUpdate()
				return
			z:=>
				@_updateParams.push("z")
				@updaters.z = @onParamUpdate
				@onParamUpdate()
				return
			alpha:=>
				@_updateParams.push("alpha")
				@updaters.alpha = @onParamUpdate
				@onParamUpdate()
				return
			scaleX:=>
				@_updateParams.push("scaleX")
				@updaters.scaleX = @onParamUpdate
				@onParamUpdate()
				return
			scaleY:=>
				@_updateParams.push("scaleY")
				@updaters.scaleY = @onParamUpdate
				@onParamUpdate()
				return
			rotation:=>
				@_updateParams.push("rotation")
				@updaters.rotation = @onParamUpdate
				@onParamUpdate()
				return
			rotationX:=>
				@_updateParams.push("rotationX")
				@updaters.rotationX = @onParamUpdate
				@onParamUpdate()
				return
			rotationY:=>
				@_updateParams.push("rotationY")
				@updaters.rotationY = @onParamUpdate
				@onParamUpdate()
				return
			rotationZ:=>
				@_updateParams.push("rotationZ")
				@updaters.rotationZ = @onParamUpdate
				@onParamUpdate()
				return
		}
	onParamUpdate:->
		if ++@_udcount is @_updateParams.length 
			@_udcount = 0
			obj = {}

			for val in @_updateParams
				obj[val] = @[val]
			TrTween.prop(@_target,obj).play()
		return
	gotoAndPlay:(frame)->
		frame = if frame < 1 then 1 else if frame > @_totalFrames then @_totalFrames else frame
		@_currentFrame = frame
		@_draw()
		@_ut = new Date().getTime()
		if !@_isPlaying
			Render.addListener(@)
			@_isPlaying = true
			if Render.getState() is 0
				Render.start()
		return
	gotoAndStop:(frame)->
		if @_isPlaying
			Render.removeListener(@)
		@_isPlaying = false
		frame = if frame < 1 then 1 else if frame > @_totalFrames then @_totalFrames else frame
		@_currentFrame = frame
		@_draw()
		return
	getCurrentFrame:->
		return @_currentFrame
	getTotalFrames:->
		return @_totalFrames
	isPlaying:->
		return @_isPlaying
	nextFrame:->
		nf = if @_currentFrame + 1 > @_totalFrames then @_totalFrames else @_currentFrame + 1
		@gotoAndStop(nf)
		return

	prevFrame:->
		nf = if @_currentFrame - 1 < 1 then 1 else @_currentFrame - 1
		@gotoAndStop(nf)
		return
	play:->
		@_ut = new Date().getTime()
		Render.addListener(@)
		@_isPlaying = true
		if Render.getState() is 0
			Render.start()
		return
	stop:->
		@_isPlaying = false
		Render.removeListener(@)
		return
	update:(ct)->
		if ct < @_ut + @_fps
			return
		@_ut = ct
		++@_currentFrame

		if @_currentFrame > @_totalFrames
			@_currentFrame = @_totalFrames
			@_draw()
			@_isPlaying = false
			Render.removeListener(@)
			return

		@_draw()
	_draw:->

class BackgroundSprite extends SpriteSheet
	constructor:(target,step,direction,limit,fps = 30)->
		@_target = target
		@_dir = direction
		@_limit = limit
		super(target,step,fps)

		@_init()


	_init:->
		@_currentFrame = 1
		@_totalFrames = ~~(@_limit / @_step)
		if @_dir is "horizontal"
			@_draw = @_drawHorizontal
		else
			@_draw = @_drawVirtical
		return
	_drawVirtical:->
		bf = -(@_currentFrame - 1) * @_step
		TrTween.prop(@_target,{backgroundPositionY:bf}).play()
		return
	_drawHorizontal:->
		bf = -(@_currentFrame - 1) * @_step
		TrTween.prop(@_target,{backgroundPositionX:bf}).play()
		return
class ImageSpriteSheet
	constructor:(target,step)->





window.jp = window.jp || {}
window.jp.contents = window.jp.contents || {}
window.jp.contents.display = window.jp.contents.display || {}
window.jp.contents.display.SpriteSheet = SpriteSheet