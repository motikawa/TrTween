class TrTweenObject
	constructor:(onUpdate)->
		@_onUpdateFunc = onUpdate;
	update:->
		@_onUpdateFunc()
