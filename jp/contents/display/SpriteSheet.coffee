TrTween = jp.contents.TrTween.TrTween
Render  = jp.contents.TrTween.Render
APP     = window.jp.contents.util.Application
class SpriteSheet
	constructor:(target,rect,isloop = false,fps = 30)->
		@_target = target
		@_rect = rect
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
		@frame = 1
		@_isLoop = isloop

		@updaters = {
			frame:@onUpdateFrame
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
	onUpdateFrame:->
		frame = if @frame < 1 then 1 else if @frame > @_totalFrames then @_totalFrames else @frame
		@_currentFrame = ~~(frame)
		@_draw()
		return
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
		@frame = @_currentFrame = frame
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
		@frame = @_currentFrame = frame
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
			if !@_isLoop
				@frame = @_currentFrame = @_totalFrames
				@_draw()
				@_isPlaying = false
				Render.removeListener(@)
			else
				@frame = @_currentFrame = 1
				@_draw()
			return

		@_draw()
	_draw:->

class BackgroundSprite extends SpriteSheet
	constructor:(target,rect,limit,isloop = false,fps = 30)->
		super(target,rect,fps,isloop)

		@_init()


	_init:->
		@_currentFrame = 1
		@_totalFrames = ~~(@_limit / @_step)
	_draw:->
		bf = -(@_currentFrame - 1) * @_step
		TrTween.prop(@_target,{backgroundPositionY:bf}).play()
		return
	
class ImageSpriteSheet extends SpriteSheet
	constructor:(target,rect,isloop = false,fps = 30)->
		super(target,rect,isloop,fps)
		@_img = target.getElementsByTagName("img")[0]
		@_iw = @_ih = 0
		@_currentFrame = 1
		if !@_img?
			throw new Error("Image not found!")

		if @_img.width is 0
			@_img.onload = =>
				@_init()
		else
			@_init()

	_init:->
		if APP.isFIE()
			@_draw = @_drawIE
		@_iw = @_img.width / @_rect.width
		@_ih = @_img.height / @_rect.height

		@_totalFrames = @_iw * @_ih
		return
	_draw:->
		bfx = -((@_currentFrame - 1) % @_iw) * @_rect.width
		bfy = -(~~((@_currentFrame - 1) / @_iw)) * @_rect.height
 
		TrTween.prop(@_img,{x:bfx,y:bfy}).play()
		return
	_drawIE:->
		bfx = -((@_currentFrame - 1) % @_iw) * @_rect.width
		bfy = -(~~((@_currentFrame - 1) / @_iw)) * @_rect.height
		TrTween.prop(@_img,{left:bfx,top:bfy}).play()
		return



window.jp = window.jp || {}
window.jp.contents = window.jp.contents || {}
window.jp.contents.display = window.jp.contents.display || {}
window.jp.contents.display.SpriteSheet = SpriteSheet
window.jp.contents.display.ImageSpriteSheet = ImageSpriteSheet