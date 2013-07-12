class Render
	@count = 0
	@_spendTime = 0
	@_updaters = new LinkedList()
	@removeListener:(updater)->
		Render._updaters.slice(updater)
		return
	@addListener:(updater)->
		f = Render._updaters.getFirst()
		find = false
		while f
			if f.elm is updater
				find = true
			f = f.next
		if !find
			Render._updaters.push(updater)
		return
	@getState:->
		return Render._state
	@_state = 0
	@_rid = -1
	@start:->
		Render._state = 1
		Render.tick()
		return
	@stop:->
		cancelAnimationFrame(Render._rid)
		return
	@tick:->
		mt = 0
		ct = if Date.now? then Date.now() else new Date().getTime()
		updaters = Render._updaters
		f = updaters.getFirst()
		while f
			f.elm.update(ct)
			f = f.next
		Render._rid = requestAnimationFrame(Render.tick)
		return