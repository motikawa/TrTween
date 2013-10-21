class IEasing
	update:(t,b,c,d)->

class LinearEaseNone extends IEasing
	constructor:->
		
	update:(t,b,c,d)->
		return c * t / d + b
class SineEaseOut extends IEasing
	constructor:->
		@_pi = Math.PI * .5
	update:(t,b,c,d)->
		return c * Math.sin(t / d * @_pi) + b
class SineEaseIn extends IEasing
	constructor:->
		@_pi = Math.PI * .5
	update:(t,b,c,d)->
		return -c * Math.cos(t / d * @_pi) + c + b
class SineEaseInOut extends IEasing
	constructor:->
		@_pi = Math.PI
	update:(t,b,c,d)->
		return -(c / 2) * (Math.cos(@_pi * t / d) - 1) + b
class SineEaseOutIn extends IEasing
	constructor:->
		@_pi = Math.PI * .5
	update:(t,b,c,d)->
		if t < (d / 2)
			return (c / 2) * Math.sin((t * 2) / d * @_pi) + b
		else
			return -(c / 2) * Math.cos((t * 2 - d) / d * @_pi) + (c / 2) + (b + (c / 2))

class CubicEaseOut extends IEasing
	constructor:->
	update:(t,b,c,d)->
		return c * ((t = t / d - 1) * t * t + 1) + b
class CubicEaseIn extends IEasing
	constructor:->
	update:(t,b,c,d)->
		return c * (t /= d) * t * t + b
class CubicEaseInOut extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if (t /= (d / 2)) < 1
			return (c / 2) * t * t * t + b
		else
			return (c / 2) * ((t -= 2) * t * t + 2) + b
class CubicEaseOutIn extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if t < d / 2
			return c / 2 * ((t = t * 2 / d - 1) * t * t + 1) + b
		else
			return c / 2 * (t = (t * 2 - d) / d) * t * t + b + c / 2

class QuintEaseOut extends IEasing
	constructor:->
	update:(t,b,c,d)->
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b
class QuintEaseIn extends IEasing
	constructor:->
	update:(t,b,c,d)->
		return c * (t /= d) * t * t * t * t + b
class QuintEaseInOut extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if (t /= d / 2) < 1
			return c / 2 * t * t * t * t * t + b
		else
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
class QuintEaseOutIn extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if t < d / 2
			return (c / 2) * ((t = (t * 2) / d - 1) * t * t * t * t + 1) + b
		else
			return (c / 2) * (t = (t * 2 - d) / d) * t * t * t * t + (b + c / 2)

class CircEaseOut extends IEasing
	constructor:->
	update:(t,b,c,d)->
		return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
class CircEaseIn extends IEasing
	constructor:->
	update:(t,b,c,d)->
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
class CircEaseInOut extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if (t /= d / 2) < 1
			return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b
		else
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
class CircEaseOutIn extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if t < d / 2
			return (c / 2) * Math.sqrt(1 - (t = (t * 2) / d - 1) * t) + b
		else
			return -(c / 2) * (Math.sqrt(1 - (t = (t * 2 - d) / d) * t) - 1) + (b + c / 2)

class QuadEaseOut extends IEasing
	constructor:->
	update:(t,b,c,d)->
		return -c * (t /= d) * (t - 2) + b
class QuadEaseIn extends IEasing
	constructor:->
	update:(t,b,c,d)->
		return c * (t /= d) * t + b
class QuadEaseInOut extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if (t /= d / 2) < 1
			return c / 2 * t * t + b
		else
			return -c / 2 * ((--t) * (t - 2) - 1) + b
class QuadEaseOutIn extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if t < d / 2
			return -(c / 2) * (t = t * 2 / d) * (t - 2) + b
		else
			return (c / 2) * (t = (t * 2 - d) / d) * t + (b + c / 2)

class QuartEaseOut extends IEasing
	constructor:->
	update:(t,b,c,d)->
		return -c * ((t = t / d - 1) * t * t * t - 1) + b
class QuartEaseIn extends IEasing
	constructor:->
	update:(t,b,c,d)->
		return c * (t /= d) * t * t * t + b
class QuartEaseInOut extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if (t /= d / 2) < 1
			return c / 2 * t * t * t * t + b
		else
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b
class QuartEaseOutIn extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if (t /= d / 2) < 1
			return c / 2 * t * t * t * t + b
		else
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b

class ExpoEaseOut extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if t is d
			return b + c
		else
			return c * (-Math.pow(2, -10 * t / d) + 1) + b
class ExpoEaseIn extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if t is 0
			return b
		else
			return c * Math.pow(2, 10 * (t / d - 1)) + b
class ExpoEaseInOut extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if t is 0
			return b
		else if t is d
			return b + c
		else if (t /= d / 2) < 1
			return c / 2 * Math.pow(2, 10 * (t - 1)) + b
		else
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
class ExpoEaseOutIn extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if t < d / 2
			if t * 2 is d
				return b + c / 2
			else
				return c / 2 * (1 - Math.pow(2, -10 * t * 2 / d)) + b
		else if t * 2 - d is 0
			return b + c / 2
		else
			return c / 2 * Math.pow(2, 10 * ((t * 2 - d) / d - 1)) + b + c / 2

class ElasticEaseOutWith extends IEasing
	constructor:(amplitude,period)->
		@a = amplitude
		@p = period
		@pi = Math.PI
	update:(t,b,c,d)->
		if t is 0
			return b
		else if (t /= d) is 1
			return b + c

		if !@p
			@p = d * 0.3
		if !@a or @a < Math.abs(c)
			@a = c
			s = @p / 4
		else 
			s = @p / (2 * @pi) * Math.asin(c / @a)

		return @a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * @pi) / @p) + c + b
class ElasticEaseInWith extends IEasing
	constructor:(amplitude,period)->
		@a = amplitude
		@p = period
		@pi = Math.PI
	update:(t,b,c,d)->
		if t is 0
			return b

		else if (t /= d) is 1
			return b + c

		if !@p
			@p = d * 0.3
		if !@a or @a < Math.abs(c)
			@a = c
			s = @p / 4
		else
			s = @p / (2 * Math.PI) * Math.asin(c / @a)
		return -(@a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * @pi) / @p)) + b
class ElasticEaseInOutWith extends IEasing
	constructor:(amplitude,period)->
		@a = amplitude
		@p = period
		@pi = Math.PI
	update:(t,b,c,d)->
		if t is 0
        	return b
		else if (t /= d / 2) is 2
        	return b + c

		if !@p
        	@p = d * (0.3 * 1.5)
		if !@a or @a < Math.abs(c)
			@a = c
			s = @p / 4
		else
			s = @p / (2 * @pi) * Math.asin(c / @a)

		if t < 1
			return -0.5 * (@a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * @pi) / @p)) + b
		else
			return @a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * @pi) / @p) * 0.5 + c + b
class ElasticEaseOutInWith extends IEasing
	constructor:(amplitude,period)->
		@a = amplitude
		@p = period
		@pi = Math.PI
	update:(t,b,c,d)->
		c /= 2
		if t < d / 2
			if (t *= 2) is 0
				return b
			if (t /= d) is 1
				return b + c
			if !@p
				@p = d * 0.3
			if !@a or @a < Math.abs(c)
				@a = c
				s = @p / 4
			else
				s = @p / (2 * @pi) * Math.asin(c / @a)

			return @a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * @pi) / @p) + c + b
		else
			if (t = t * 2 - d) is 0
				return b + c
			else if (t /= d) is 1
				return (b + c) + c

			if !@p
				@p = d * 0.3

			if !@a or @a < Math.abs(c)
				@a = c
				s = @p / 4
			else
				s = @p / (2 * @pi) * Math.asin(c / @a)
			return -(@a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * @pi) / @p)) + (b + c)

class ElasticEaseOut extends ElasticEaseOutWith
	constructor:->
		super(0,0)
class ElasticEaseIn extends ElasticEaseInWith
	constructor:->
		super(0,0)
class ElasticEaseOutIn extends ElasticEaseOutInWith
	constructor:->
		super(0,0)
class ElasticEaseInOut extends ElasticEaseInOutWith
	constructor:->
		super(0,0)

class BackEaseOutWith extends IEasing
	constructor:(s)->
		@s = s
	update:(t,b,c,d)->
		s = @s
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
class BackEaseInWith extends IEasing
	constructor:(s)->
		@s = s
	update:(t,b,c,d)->
		s = @s
		return c * (t /= d) * t * ((s + 1) * t - s) + b
class BackEaseInOutWith extends IEasing
	constructor:(s)->
		@s = s
	update:(t,b,c,d)->
		s = @s
		if (t /= d / 2) < 1
			return c / 2 * (t * t * (((s * 1.525) + 1) * t - s * 1.525)) + b
		else
			return c / 2 * ((t -= 2) * t * (((s * 1.525) + 1) * t + s * 1.525) + 2) + b
class BackEaseOutInWith extends IEasing
	constructor:(s)->
		@s = s
	update:(t,b,c,d)->
		s = @s
		if t < d / 2
			return (c / 2) * ((t = (t * 2) / d - 1) * t * ((s + 1) * t + s) + 1) + b
		else
			return (c / 2) * (t = (t * 2 - d) / d) * t * ((s + 1) * t - s) + (b + c / 2)
class BackEaseOut extends BackEaseOutWith
	constructor:->
		super(1.70158)
class BackEaseIn extends BackEaseInWith
	constructor:->
		super(1.70158)
class BackEaseInOut extends BackEaseInOutWith
	constructor:->
		super(1.70158)
class BackEaseOutIn extends BackEaseOutInWith
	constructor:->
		super(1.70158)

class BounceEaseOut extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if (t /= d) < (1 / 2.75)
			return c * (7.5625 * t * t) + b
		else if t < (2 / 2.75)
			return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
		else if t < (2.5 / 2.75)
			return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
		else
			return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
class BounceEaseIn extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if (t = (d - t) / d) < (1 / 2.75)
			return c - (c * (7.5625 * t * t)) + b
		else if t < (2 / 2.75)
			return c - (c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)) + b
		else if t < (2.5 / 2.75)
			return c - (c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)) + b
		else
			return c - (c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375)) + b
class BounceEaseInOut extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if t < d / 2
			if (t = (d - t * 2) / d) < (1 / 2.75)
				return (c - (c * (7.5625 * t * t))) * 0.5 + b
			else if t < (2 / 2.75)
				return (c - (c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75))) * 0.5 + b
			else if t < (2.5 / 2.75)
				return (c - (c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375))) * 0.5 + b
			else 
				return (c - (c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375))) * 0.5 + b;
		else
			if (t = (t * 2 - d) / d) < (1 / 2.75)
				return (c * (7.5625 * t * t)) * 0.5 + c * 0.5 + b
			else if t < (2 / 2.75)
				return (c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)) * 0.5 + c * 0.5 + b
			else if t < (2.5 / 2.75)
				return (c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)) * 0.5 + c * 0.5 + b
			else
				return (c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375)) * 0.5 + c * 0.5 + b
      	
class BounceEaseOutIn extends IEasing
	constructor:->
	update:(t,b,c,d)->
		if t < d / 2
			if (t = (t * 2) / d) < (1 / 2.75)
				return (c / 2) * (7.5625 * t * t) + b
			else if t < (2 / 2.75)
				return (c / 2) * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
			else if t < (2.5 / 2.75)
				return (c / 2) * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
			else
				return (c / 2) * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
		else
			if (t = (d - (t * 2 - d)) / d) < (1 / 2.75)
				return (c / 2) - ((c / 2) * (7.5625 * t * t)) + (b + c / 2)
			else if t < (2 / 2.75)
				return (c / 2) - ((c / 2) * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)) + (b + c / 2)
			else if t < (2.5 / 2.75)
				return (c / 2) - ((c / 2) * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)) + (b + c / 2)
			else
				return (c / 2) - ((c / 2) * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375)) + (b + c / 2)

Linear = {
	easeNone:new LinearEaseNone()
	easeOut:new LinearEaseNone()
	easeIn:new LinearEaseNone()
	easeOutIn:new LinearEaseNone()
	easeInOut:new LinearEaseNone()
}
Sine = {
	easeOut:new SineEaseOut()
	easeIn:new SineEaseIn()
	easeOutIn:new SineEaseOutIn()
	easeInOut:new SineEaseInOut()
}
Cubic = {
	easeOut:new CubicEaseOut()
	easeIn:new CubicEaseIn()
	easeOutIn:new CubicEaseOutIn()
	easeInOut:new CubicEaseInOut()
}
Quint = {
	easeOut:new QuintEaseOut()
	easeIn:new QuintEaseIn()
	easeOutIn:new QuintEaseOutIn()
	easeInOut:new QuintEaseInOut()
}
Circ = {
	easeOut:new CircEaseOut()
	easeIn:new CircEaseIn()
	easeOutIn:new CircEaseOutIn()
	easeInOut:new CircEaseInOut()
}
Quad = {
	easeOut:new QuadEaseOut()
	easeIn:new QuadEaseIn()
	easeOutIn:new QuadEaseOutIn()
	easeInOut:new QuadEaseInOut()
}
Quart = {
	easeOut:new QuartEaseOut()
	easeIn:new QuartEaseIn()
	easeOutIn:new QuartEaseOutIn()
	easeInOut:new QuartEaseInOut()
}
Expo = {
	easeOut:new ExpoEaseOut()
	easeIn:new ExpoEaseIn()
	easeOutIn:new ExpoEaseOutIn()
	easeInOut:new ExpoEaseInOut()
}
Elastic = {
	easeOut:new ElasticEaseOut()
	easeIn:new ElasticEaseIn()
	easeOutIn:new ElasticEaseOutIn()
	easeInOut:new ElasticEaseInOut()
	easeOutWith:(a,b)->
		return new ElasticEaseOutWith(a,b)
	easeInWith:(a,b)->
		return new ElasticEaseInWith(a,b)
	easeInOutWith:(a,b)->
		return new ElasticEaseInOutWith(a,b)
	easeOutInWith:(a,b)->
		return new ElasticEaseOutInWith(a,b)
}
Back = {
	easeOut:new BackEaseOut()
	easeIn:new BackEaseIn()
	easeOutIn:new BackEaseOutIn()
	easeInOut:new BackEaseInOut()
	easeOutWith:(s)->
		return new BackEaseOutWith(s)
	easeInWith:(s)->
		return new BackEaseInWith(s)
	easeInOutWith:(s)->
		return new BackEaseInOutWith(s)
	easeOutInWith:(s)->
		return new BackEaseOutInWith(s)
}
Bounce = {
	easeOut:new BounceEaseOut()
	easeIn:new BounceEaseIn()
	easeOutIn:new BounceEaseOutIn()
	easeInOut:new BounceEaseInOut()
}
CSS3Easing = {
	linear:"cubic-bezier(0.250, 0.250, 0.750, 0.750)"
	ease:"cubic-bezier(0.250, 0.100, 0.250, 1.000)"
	easeIn:"cubic-bezier(0.420, 0.000, 1.000, 1.000)"
	easeOut:"cubic-bezier(0.000, 0.000, 0.580, 1.000)"
	easeInBack:"cubic-bezier(0.600, -0.280, 0.735, 0.045)"
	easeInOutBack:"cubic-bezier(0.680, -0.550, 0.265, 1.550)"
	easeInOut:"cubic-bezier(0.420, 0.000, 0.580, 1.000)"
	easeInQuad:"cubic-bezier(0.550, 0.085, 0.680, 0.530)"
	easeInCubic:"cubic-bezier(0.550, 0.055, 0.675, 0.190)"
	easeInQuart:"cubic-bezier(0.895, 0.030, 0.685, 0.220)"
	easeInQuint:"cubic-bezier(0.755, 0.050, 0.855, 0.060)"
	easeInSine:"cubic-bezier(0.470, 0.000, 0.745, 0.715)"
	easeInExpo:"cubic-bezier(0.950, 0.050, 0.795, 0.035)"
	easeInCirc:"cubic-bezier(0.600, 0.040, 0.980, 0.335)"
	easeOutQuad:"cubic-bezier(0.250, 0.460, 0.450, 0.940)"
	easeOutCubic:"cubic-bezier(0.215, 0.610, 0.355, 1.000)"
	easeOutQuart:"cubic-bezier(0.165, 0.840, 0.440, 1.000)"
	easeOutQuint:"cubic-bezier(0.230, 1.000, 0.320, 1.000)"
	easeOutSine:"cubic-bezier(0.390, 0.575, 0.565, 1.000)"
	easeOutExpo:"cubic-bezier(0.190, 1.000, 0.220, 1.000)"
	easeOutCirc:"cubic-bezier(0.075, 0.820, 0.165, 1.000)"
	easeOutBack:"cubic-bezier(0.175, 0.885, 0.320, 1.275)"
	easeInOutQuad:"cubic-bezier(0.455, 0.030, 0.515, 0.955)"
	easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1.000)"
	easeInOutQuart:"cubic-bezier(0.770, 0.000, 0.175, 1.000)"
	easeInOutQuint:"cubic-bezier(0.860, 0.000, 0.070, 1.000)"
	easeInOutSine:"cubic-bezier(0.445, 0.050, 0.550, 0.950)"
	easeInOutExpo:"cubic-bezier(1.000, 0.000, 0.000, 1.000)"
	easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.150, 0.860)"
}

getEasingByString = (easingName)->
	if easingName is "linear"
		return Linear.easeNone;
	else if easingName is "easeInBack"
		return Back.easeIn
	else if easingName is "easeInOutBack"
		return Back.easeInOut;
	else if easingName is "easeInQuad"
		return Quad.easeIn
	else if easingName is "easeInCubic"
		return Cubic.easeIn
	else if easingName is "easeInQuart"
		return Quart.easeIn
	else if easingName is "easeInQuint"
		return Quint.easeIn
	else if easingName is "easeInSine"
		return Sine.easeIn
	else if easingName is "easeInExpo"
		return Expo.easeIn
	else if easingName is "easeInCirc"
		return Circ.easeOut
	else if easingName is "easeOutQuad"
		return Quad.easeOut
	else if easingName is "easeOutCubic"
		return Cubic.easeOut
	else if easingName is "easeOutQuart"
		return Quart.easeOut
	else if easingName is "easeOutQuint"
		return Quint.easeOut
	else if easingName is "easeOutSine"
		return Sine.easeOut
	else if easingName is "easeOutExpo"
		return Expo.easeOut
	else if easingName is "easeOutCirc"
		return Circ.easeOut
	else if easingName is "easeOutBack"
		return Back.easeInOut
	else if easingName is "easeInOutQuad"
		return Quad.easeInOut
	else if easingName is "easeInOutCubic"
		return Cubic.easeInOut
	else if easingName is "easeInOutQuart"
		return Quart.easeInOut
	else if easingName is "easeInOutQuint"
		return Quint.easeInOut
	else if easingName is "easeInOutSine"
		return Sine.easeInOut
	else if easingName is "easeInOutExpo"
		return Expo.easeInOut
	else if easingName is "easeInOutCirc"
		return Circ.easeInOut


window.jp = window.jp || {}
window.jp.contents = window.jp.contents || {}
window.jp.contents.easing = window.jp.contents.easing || {}
window.jp.contents.easing.Linear = Linear
window.jp.contents.easing.Sine = Sine
window.jp.contents.easing.Cubic = Cubic
window.jp.contents.easing.Quint = Quint
window.jp.contents.easing.Circ = Circ
window.jp.contents.easing.Back = Back
window.jp.contents.easing.Quad = Quad
window.jp.contents.easing.Quart = Quart
window.jp.contents.easing.Expo = Expo
window.jp.contents.easing.Elastic = Elastic
window.jp.contents.easing.Bounce = Bounce
window.jp.contents.easing.CSS3Easing = CSS3Easing
window.jp.contents.easing.getEasingByString = getEasingByString