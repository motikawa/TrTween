class LinkedList
	constructor:(first)->
		@_first = null
		@_last = null
		if first
			@_first = {elm:first,next:null}
			@_last = @_first
		@length = if @_first then 1 else 0
		return
	getFirst:->
		return @_first
	push:(elm)->
		obj = {
			elm:elm,
			next:null
		}
		if !@_first
			@_first = obj
		else
			@_last.next = obj
		@_last = obj
		return
	slice:(elm)->
		f = @_first
		b = null
		while f
			if f.elm is elm
				if b
					b.next = f.next
				else
					@_first = f.next

				if f is @_last
					@_last = b
				--@length
			b = f
			f = f.next
		return
	shift:->
		b = @_first
		@_first = @first.next
		--@length
		return b
	map:(func,param)->
		f = @_first
		while f
			func.apply(f.elm,param)
			f = f.next
		return