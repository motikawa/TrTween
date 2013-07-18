class Render
	@count = 0
	@_spendTime = 0
	@_updaters = new LinkedList()
	@tick = null
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
		if !Render.tick?
			if Date.now?
				Render.tick = Render._tick 
			else 
				Render.tick = Render._tickOld
		Render._state = 1
		Render.tick()
		return
	@stop:->
		cancelAnimationFrame(Render._rid)
		return
	@_tick:->
		mt = 0
		ct = Date.now()
		updaters = Render._updaters
		f = updaters.getFirst()
		while f
			f.elm.update(ct)
			f = f.next
		Render._rid = requestAnimationFrame(Render.tick)
		return
	@_tickOld:->
		mt = 0
		ct = new Date().getTime()
		updaters = Render._updaters
		f = updaters.getFirst()
		while f
			f.elm.update(ct)
			f = f.next
		Render._rid = requestAnimationFrame(Render.tick)
		return