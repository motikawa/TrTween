class SlicedTween extends ITween
	constructor:(from,to,tween)->
		@_tween = tween
		@_to = to
		@_from = from
	update:(ct,prop)->
		