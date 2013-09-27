(function(){
	var Back, BackEaseIn, BackEaseInOut, BackEaseInOutWith, BackEaseInWith, BackEaseOut, BackEaseOutIn, BackEaseOutInWith, BackEaseOutWith, Bounce, BounceEaseIn, BounceEaseInOut, BounceEaseOut, BounceEaseOutIn, Circ, CircEaseIn, CircEaseInOut, CircEaseOut, CircEaseOutIn, Cubic, CubicEaseIn, CubicEaseInOut, CubicEaseOut, CubicEaseOutIn, Easing, EasingCore, Elastic, ElasticEaseIn, ElasticEaseInOUt, ElasticEaseInOutWith, ElasticEaseInWith, ElasticEaseOut, ElasticEaseOutIn, ElasticEaseOutInWith, ElasticEaseOutWith, Expo, ExpoEaseIn, ExpoEaseInOut, ExpoEaseOut, ExpoEaseOutIn, Linear, LinearEaseNone, Quad, QuadEaseIn, QuadEaseInOut, QuadEaseOut, QuadEaseOutIn, Quart, QuartEaseIn, QuartEaseInOut, QuartEaseOut, QuartEaseOutIn, Quint, QuintEaseIn, QuintEaseInOUt, QuintEaseOut, QuintEaseOutIn, Sine, SineEaseIn, SineEaseInOut, SineEaseOut, SineEaseOutIn,CSS3Easing,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  EasingCore = (function() {

    EasingCore.name = 'EasingCore';

    function EasingCore() {}

    return EasingCore;

  })();

  Easing = (function() {

    Easing.name = 'Easing';

    function Easing() {}

    Easing.prototype.update = function(t, b, c, d) {};

    return Easing;

  })();

  LinearEaseNone = (function(_super) {

    __extends(LinearEaseNone, _super);

    LinearEaseNone.name = 'LinearEaseNone';

    function LinearEaseNone() {
      return LinearEaseNone.__super__.constructor.apply(this, arguments);
    }

    LinearEaseNone.prototype.update = function(t, b, c, d) {
      return c * t / d + b;
    };

    return LinearEaseNone;

  })(Easing);

  SineEaseOut = (function(_super) {

    __extends(SineEaseOut, _super);

    SineEaseOut.name = 'SineEaseOut';

    function SineEaseOut() {
      this._pi = Math.PI * .5;
    }

    SineEaseOut.prototype.update = function(t, b, c, d) {
      return c * Math.sin(t / d * this._pi) + b;
    };

    return SineEaseOut;

  })(Easing);

  SineEaseIn = (function(_super) {

    __extends(SineEaseIn, _super);

    SineEaseIn.name = 'SineEaseIn';

    function SineEaseIn() {
      this._pi = Math.PI * .5;
    }

    SineEaseIn.prototype.update = function(t, b, c, d) {
      return -c * Math.cos(t / d * this._pi) + c + b;
    };

    return SineEaseIn;

  })(Easing);

  SineEaseInOut = (function(_super) {

    __extends(SineEaseInOut, _super);

    SineEaseInOut.name = 'SineEaseInOut';

    function SineEaseInOut() {
      this._pi = Math.PI;
    }

    SineEaseInOut.prototype.update = function(t, b, c, d) {
      return -(c / 2) * (Math.cos(this._pi * t / d) - 1) + b;
    };

    return SineEaseInOut;

  })(Easing);

  SineEaseOutIn = (function(_super) {

    __extends(SineEaseOutIn, _super);

    SineEaseOutIn.name = 'SineEaseOutIn';

    function SineEaseOutIn() {
      this._pi = Math.PI * .5;
    }

    SineEaseOutIn.prototype.update = function(t, b, c, d) {
      if (t < (d / 2)) {
        return (c / 2) * Math.sin((t * 2) / d * this._pi) + b;
      }
      return -(c / 2) * Math.cos((t * 2 - d) / d * this._pi) + (c / 2) + (b + (c / 2));
    };

    return SineEaseOutIn;

  })(Easing);

  CubicEaseOut = (function(_super) {

    __extends(CubicEaseOut, _super);

    CubicEaseOut.name = 'CubicEaseOut';

    function CubicEaseOut() {
      return CubicEaseOut.__super__.constructor.apply(this, arguments);
    }

    CubicEaseOut.prototype.update = function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    };

    return CubicEaseOut;

  })(Easing);

  CubicEaseIn = (function(_super) {

    __extends(CubicEaseIn, _super);

    CubicEaseIn.name = 'CubicEaseIn';

    function CubicEaseIn() {
      return CubicEaseIn.__super__.constructor.apply(this, arguments);
    }

    CubicEaseIn.prototype.update = function(t, b, c, d) {
      return c * (t /= d) * t * t + b;
    };

    return CubicEaseIn;

  })(Easing);

  CubicEaseInOut = (function(_super) {

    __extends(CubicEaseInOut, _super);

    CubicEaseInOut.name = 'CubicEaseInOut';

    function CubicEaseInOut() {
      return CubicEaseInOut.__super__.constructor.apply(this, arguments);
    }

    CubicEaseInOut.prototype.update = function(t, b, c, d) {
      if (t /= (d / 2) < 1) {
        return (c / 2) * t * t * t + b;
      }
      return (c / 2) * ((t -= 2) * t * t + 2) + b;
    };

    return CubicEaseInOut;

  })(Easing);

  CubicEaseOutIn = (function(_super) {

    __extends(CubicEaseOutIn, _super);

    CubicEaseOutIn.name = 'CubicEaseOutIn';

    function CubicEaseOutIn() {
      return CubicEaseOutIn.__super__.constructor.apply(this, arguments);
    }

    CubicEaseOutIn.prototype.update = function(t, b, c, d) {
      if (t < d / 2) {
        return c / 2 * ((t = t * 2 / d - 1) * t * t + 1) + b;
      }
      return c / 2 * (t = (t * 2 - d) / d) * t * t + b + c / 2;
    };

    return CubicEaseOutIn;

  })(Easing);

  QuintEaseOut = (function(_super) {

    __extends(QuintEaseOut, _super);

    QuintEaseOut.name = 'QuintEaseOut';

    function QuintEaseOut() {
      return QuintEaseOut.__super__.constructor.apply(this, arguments);
    }

    QuintEaseOut.prototype.update = function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };

    return QuintEaseOut;

  })(Easing);

  QuintEaseIn = (function(_super) {

    __extends(QuintEaseIn, _super);

    QuintEaseIn.name = 'QuintEaseIn';

    function QuintEaseIn() {
      return QuintEaseIn.__super__.constructor.apply(this, arguments);
    }

    QuintEaseIn.prototype.update = function(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    };

    return QuintEaseIn;

  })(Easing);

  QuintEaseInOUt = (function(_super) {

    __extends(QuintEaseInOUt, _super);

    QuintEaseInOUt.name = 'QuintEaseInOUt';

    function QuintEaseInOUt() {
      return QuintEaseInOUt.__super__.constructor.apply(this, arguments);
    }

    QuintEaseInOUt.prototype.update = function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
      }
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    };

    return QuintEaseInOUt;

  })(Easing);

  QuintEaseOutIn = (function(_super) {

    __extends(QuintEaseOutIn, _super);

    QuintEaseOutIn.name = 'QuintEaseOutIn';

    function QuintEaseOutIn() {
      return QuintEaseOutIn.__super__.constructor.apply(this, arguments);
    }

    QuintEaseOutIn.prototype.update = function(t, b, c, d) {
      if (t < d / 2) {
        return (c / 2) * ((t = (t * 2) / d - 1) * t * t * t * t + 1) + b;
      }
      return (c / 2) * (t = (t * 2 - d) / d) * t * t * t * t + (b + c / 2);
    };

    return QuintEaseOutIn;

  })(Easing);

  CircEaseOut = (function(_super) {

    __extends(CircEaseOut, _super);

    CircEaseOut.name = 'CircEaseOut';

    function CircEaseOut() {
      return CircEaseOut.__super__.constructor.apply(this, arguments);
    }

    CircEaseOut.prototype.update = function(t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    };

    return CircEaseOut;

  })(Easing);

  CircEaseIn = (function(_super) {

    __extends(CircEaseIn, _super);

    CircEaseIn.name = 'CircEaseIn';

    function CircEaseIn() {
      return CircEaseIn.__super__.constructor.apply(this, arguments);
    }

    CircEaseIn.prototype.update = function(t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    };

    return CircEaseIn;

  })(Easing);

  CircEaseInOut = (function(_super) {

    __extends(CircEaseInOut, _super);

    CircEaseInOut.name = 'CircEaseInOut';

    function CircEaseInOut() {
      return CircEaseInOut.__super__.constructor.apply(this, arguments);
    }

    CircEaseInOut.prototype.update = function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      }
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    };

    return CircEaseInOut;

  })(Easing);

  CircEaseOutIn = (function(_super) {

    __extends(CircEaseOutIn, _super);

    CircEaseOutIn.name = 'CircEaseOutIn';

    function CircEaseOutIn() {
      return CircEaseOutIn.__super__.constructor.apply(this, arguments);
    }

    CircEaseOutIn.prototype.update = function(t, b, c, d) {
      if (t < d / 2) {
        return (c / 2) * Math.sqrt(1 - (t = (t * 2) / d - 1) * t) + b;
      }
      return -(c / 2) * (Math.sqrt(1 - (t = (t * 2 - d) / d) * t) - 1) + (b + c / 2);
    };

    return CircEaseOutIn;

  })(Easing);

  QuadEaseOut = (function(_super) {

    __extends(QuadEaseOut, _super);

    QuadEaseOut.name = 'QuadEaseOut';

    function QuadEaseOut() {
      return QuadEaseOut.__super__.constructor.apply(this, arguments);
    }

    QuadEaseOut.prototype.update = function(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    };

    return QuadEaseOut;

  })(Easing);

  QuadEaseIn = (function(_super) {

    __extends(QuadEaseIn, _super);

    QuadEaseIn.name = 'QuadEaseIn';

    function QuadEaseIn() {
      return QuadEaseIn.__super__.constructor.apply(this, arguments);
    }

    QuadEaseIn.prototype.update = function(t, b, c, d) {
      return c * (t /= d) * t + b;
    };

    return QuadEaseIn;

  })(Easing);

  QuadEaseInOut = (function(_super) {

    __extends(QuadEaseInOut, _super);

    QuadEaseInOut.name = 'QuadEaseInOut';

    function QuadEaseInOut() {
      return QuadEaseInOut.__super__.constructor.apply(this, arguments);
    }

    QuadEaseInOut.prototype.update = function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
      }
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };

    return QuadEaseInOut;

  })(Easing);

  QuadEaseOutIn = (function(_super) {

    __extends(QuadEaseOutIn, _super);

    QuadEaseOutIn.name = 'QuadEaseOutIn';

    function QuadEaseOutIn() {
      return QuadEaseOutIn.__super__.constructor.apply(this, arguments);
    }

    QuadEaseOutIn.prototype.update = function(t, b, c, d) {
      if (t < d / 2) {
        return -(c / 2) * (t = t * 2 / d) * (t - 2) + b;
      }
      return (c / 2) * (t = (t * 2 - d) / d) * t + (b + c / 2);
    };

    return QuadEaseOutIn;

  })(Easing);

  QuartEaseOut = (function(_super) {

    __extends(QuartEaseOut, _super);

    QuartEaseOut.name = 'QuartEaseOut';

    function QuartEaseOut() {
      return QuartEaseOut.__super__.constructor.apply(this, arguments);
    }

    QuartEaseOut.prototype.update = function(t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };

    return QuartEaseOut;

  })(Easing);

  QuartEaseIn = (function(_super) {

    __extends(QuartEaseIn, _super);

    QuartEaseIn.name = 'QuartEaseIn';

    function QuartEaseIn() {
      return QuartEaseIn.__super__.constructor.apply(this, arguments);
    }

    QuartEaseIn.prototype.update = function(t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    };

    return QuartEaseIn;

  })(Easing);

  QuartEaseInOut = (function(_super) {

    __extends(QuartEaseInOut, _super);

    QuartEaseInOut.name = 'QuartEaseInOut';

    function QuartEaseInOut() {
      return QuartEaseInOut.__super__.constructor.apply(this, arguments);
    }

    QuartEaseInOut.prototype.update = function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t + b;
      }
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    };

    return QuartEaseInOut;

  })(Easing);

  QuartEaseOutIn = (function(_super) {

    __extends(QuartEaseOutIn, _super);

    QuartEaseOutIn.name = 'QuartEaseOutIn';

    function QuartEaseOutIn() {
      return QuartEaseOutIn.__super__.constructor.apply(this, arguments);
    }

    QuartEaseOutIn.prototype.update = function(t, b, c, d) {
      if (t < d / 2) {
        return -(c / 2) * ((t = (t * 2) / d - 1) * t * t * t - 1) + b;
      }
      return (c / 2) * (t = (t * 2 - d) / d) * t * t * t + (b + c / 2);
    };

    return QuartEaseOutIn;

  })(Easing);

  ExpoEaseOut = (function(_super) {

    __extends(ExpoEaseOut, _super);

    ExpoEaseOut.name = 'ExpoEaseOut';

    function ExpoEaseOut() {
      return ExpoEaseOut.__super__.constructor.apply(this, arguments);
    }

    ExpoEaseOut.prototype.update = function(t, b, c, d) {
      if (t === d) {
        return b + c;
      } else {
        return c * (-Math.pow(2, -10 * t / d) + 1) + b;
      }
    };

    return ExpoEaseOut;

  })(Easing);

  ExpoEaseIn = (function(_super) {

    __extends(ExpoEaseIn, _super);

    ExpoEaseIn.name = 'ExpoEaseIn';

    function ExpoEaseIn() {
      return ExpoEaseIn.__super__.constructor.apply(this, arguments);
    }

    ExpoEaseIn.prototype.update = function(t, b, c, d) {
      if (t === 0) {
        return b;
      } else {
        return c * Math.pow(2, 10 * (t / d - 1)) + b;
      }
    };

    return ExpoEaseIn;

  })(Easing);

  ExpoEaseInOut = (function(_super) {

    __extends(ExpoEaseInOut, _super);

    ExpoEaseInOut.name = 'ExpoEaseInOut';

    function ExpoEaseInOut() {
      return ExpoEaseInOut.__super__.constructor.apply(this, arguments);
    }

    ExpoEaseInOut.prototype.update = function(t, b, c, d) {
      if (t === 0) {
        return b;
      }
      if (t === d) {
        return b + c;
      }
      if ((t /= d / 2) < 1) {
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      }
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };

    return ExpoEaseInOut;

  })(Easing);

  ExpoEaseOutIn = (function(_super) {

    __extends(ExpoEaseOutIn, _super);

    ExpoEaseOutIn.name = 'ExpoEaseOutIn';

    function ExpoEaseOutIn() {
      return ExpoEaseOutIn.__super__.constructor.apply(this, arguments);
    }

    ExpoEaseOutIn.prototype.update = function(t, b, c, d) {
      if (t < d / 2) {
        if (t * 2.0 === d) {
          return b + c / 2.0;
        } else {
          return c / 2.0 * (1 - Math.pow(2, -10 * t * 2.0 / d)) + b;
        }
      }
      if (t * 2.0 - d === 0) {
        return b + c / 2.0;
      } else {
        return c / 2.0 * Math.pow(2, 10 * ((t * 2 - d) / d - 1)) + b + c / 2.0;
      }
    };

    return ExpoEaseOutIn;

  })(Easing);

  ElasticEaseOutWith = (function(_super) {

    __extends(ElasticEaseOutWith, _super);

    ElasticEaseOutWith.name = 'ElasticEaseOutWith';

    function ElasticEaseOutWith(amplitude, period) {
      this._a = amplitude;
      this._p = period;
      this._pi = Math.PI;
    }

    ElasticEaseOutWith.prototype.update = function(t, b, c, d) {
      var a, p, pi, s;
      a = this._a;
      p = this._p;
      pi = this._pi;
      if (t === 0) {
        return b;
      }
      if ((t /= d) === 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * pi) * Math.asin(c / a);
      }
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * pi) / p) + c + b;
    };

    return ElasticEaseOutWith;

  })(Easing);

  ElasticEaseInWith = (function(_super) {

    __extends(ElasticEaseInWith, _super);

    ElasticEaseInWith.name = 'ElasticEaseInWith';

    function ElasticEaseInWith(amplitude, period) {
      this._a = amplitude;
      this._p = period;
      this._pi = Math.PI;
    }

    ElasticEaseInWith.prototype.update = function(t, b, c, d) {
      var a, p, pi, s;
      a = this._a;
      p = this._p;
      pi = this._pi;
      if (t === 0) {
        return b;
      }
      if ((t /= d) === 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    };

    return ElasticEaseInWith;

  })(Easing);

  ElasticEaseInOutWith = (function(_super) {

    __extends(ElasticEaseInOutWith, _super);

    ElasticEaseInOutWith.name = 'ElasticEaseInOutWith';

    function ElasticEaseInOutWith(amplitude, period) {
      this._a = amplitude;
      this._p = period;
      this._pi = Math.PI;
    }

    ElasticEaseInOutWith.prototype.update = function(t, b, c, d) {
      var a, p, pi, s;
      a = this._a;
      p = this._p;
      pi = this._pi;
      if (t === 0) {
        return b;
      }
      if ((t /= d / 2) === 2) {
        return b + c;
      }
      if (!p) {
        p = d * (0.3 * 1.5);
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * pi) * Math.asin(c / a);
      }
      if (t < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * pi) / p)) + b;
      }
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * pi) / p) * 0.5 + c + b;
    };

    return ElasticEaseInOutWith;

  })(Easing);

  ElasticEaseOutInWith = (function(_super) {

    __extends(ElasticEaseOutInWith, _super);

    ElasticEaseOutInWith.name = 'ElasticEaseOutInWith';

    function ElasticEaseOutInWith(amplitude, period) {
      this._a = amplitude;
      this._p = period;
      this._pi = Math.PI;
    }

    ElasticEaseOutInWith.prototype.update = function(t, b, c, d) {
      var a, p, pi, s;
      a = this._a;
      p = this._p;
      pi = this._pi;
      c /= 2;
      if (t < d / 2) {
        if ((t *= 2) === 0) {
          return b;
        }
        if ((t /= d) === 1) {
          return b + c;
        }
        if (!p) {
          p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * pi) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * pi) / p) + c + b;
      } else {
        if ((t = t * 2 - d) === 0) {
          return b + c;
        }
        if ((t /= d) === 1) {
          return (b + c) + c;
        }
        if (!p) {
          p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * pi) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * pi) / p)) + (b + c);
      }
    };

    return ElasticEaseOutInWith;

  })(Easing);

  ElasticEaseOut = (function(_super) {

    __extends(ElasticEaseOut, _super);

    ElasticEaseOut.name = 'ElasticEaseOut';

    function ElasticEaseOut() {
      ElasticEaseOut.__super__.constructor.call(this, 0, 0);
    }

    return ElasticEaseOut;

  })(ElasticEaseOutWith);

  ElasticEaseIn = (function(_super) {

    __extends(ElasticEaseIn, _super);

    ElasticEaseIn.name = 'ElasticEaseIn';

    function ElasticEaseIn() {
      ElasticEaseIn.__super__.constructor.call(this, 0, 0);
    }

    return ElasticEaseIn;

  })(ElasticEaseInWith);

  ElasticEaseInOUt = (function(_super) {

    __extends(ElasticEaseInOUt, _super);

    ElasticEaseInOUt.name = 'ElasticEaseInOUt';

    function ElasticEaseInOUt() {
      ElasticEaseInOUt.__super__.constructor.call(this, 0, 0);
    }

    return ElasticEaseInOUt;

  })(ElasticEaseInOutWith);

  ElasticEaseOutIn = (function(_super) {

    __extends(ElasticEaseOutIn, _super);

    ElasticEaseOutIn.name = 'ElasticEaseOutIn';

    function ElasticEaseOutIn() {
      ElasticEaseOutIn.__super__.constructor.call(this, 0, 0);
    }

    return ElasticEaseOutIn;

  })(ElasticEaseOutInWith);

  BackEaseOutWith = (function(_super) {

    __extends(BackEaseOutWith, _super);

    BackEaseOutWith.name = 'BackEaseOutWith';

    function BackEaseOutWith(s) {
      this._s = s;
    }

    BackEaseOutWith.prototype.update = function(t, b, c, d) {
      var s;
      s = this._s;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    };

    return BackEaseOutWith;

  })(Easing);

  BackEaseInWith = (function(_super) {

    __extends(BackEaseInWith, _super);

    BackEaseInWith.name = 'BackEaseInWith';

    function BackEaseInWith(s) {
      this._s = s;
    }

    BackEaseInWith.prototype.update = function(t, b, c, d) {
      var s;
      s = this._s;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    };

    return BackEaseInWith;

  })(Easing);

  BackEaseInOutWith = (function(_super) {

    __extends(BackEaseInOutWith, _super);

    BackEaseInOutWith.name = 'BackEaseInOutWith';

    function BackEaseInOutWith(s) {
      this._s = s;
    }

    BackEaseInOutWith.prototype.update = function(t, b, c, d) {
      var s;
      s = this._s;
      if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s * 1.525) + 1) * t - s * 1.525)) + b;
      }
      return c / 2 * ((t -= 2) * t * (((s * 1.525) + 1) * t + s * 1.525) + 2) + b;
    };

    return BackEaseInOutWith;

  })(Easing);

  BackEaseOutInWith = (function(_super) {

    __extends(BackEaseOutInWith, _super);

    BackEaseOutInWith.name = 'BackEaseOutInWith';

    function BackEaseOutInWith(s) {
      this._s = s;
    }

    BackEaseOutInWith.prototype.update = function(t, b, c, d) {
      var s;
      s = this._s;
      if (t < d / 2) {
        return (c / 2) * ((t = (t * 2) / d - 1) * t * ((s + 1) * t + s) + 1) + b;
      }
      return (c / 2) * (t = (t * 2 - d) / d) * t * ((s + 1) * t - s) + (b + c / 2);
    };

    return BackEaseOutInWith;

  })(Easing);

  BackEaseOut = (function(_super) {

    __extends(BackEaseOut, _super);

    BackEaseOut.name = 'BackEaseOut';

    function BackEaseOut() {
      BackEaseOut.__super__.constructor.call(this, 1.70158);
    }

    return BackEaseOut;

  })(BackEaseOutWith);

  BackEaseIn = (function(_super) {

    __extends(BackEaseIn, _super);

    BackEaseIn.name = 'BackEaseIn';

    function BackEaseIn() {
      BackEaseIn.__super__.constructor.call(this, 1.70158);
    }

    return BackEaseIn;

  })(BackEaseInWith);

  BackEaseInOut = (function(_super) {

    __extends(BackEaseInOut, _super);

    BackEaseInOut.name = 'BackEaseInOut';

    function BackEaseInOut() {
      BackEaseInOut.__super__.constructor.call(this, 1.70158);
    }

    return BackEaseInOut;

  })(BackEaseInOutWith);

  BackEaseOutIn = (function(_super) {

    __extends(BackEaseOutIn, _super);

    BackEaseOutIn.name = 'BackEaseOutIn';

    function BackEaseOutIn() {
      BackEaseOutIn.__super__.constructor.call(this, 1.70158);
    }

    return BackEaseOutIn;

  })(BackEaseOutInWith);

  BounceEaseOut = (function(_super) {

    __extends(BounceEaseOut, _super);

    BounceEaseOut.name = 'BounceEaseOut';

    function BounceEaseOut() {
      return BounceEaseOut.__super__.constructor.apply(this, arguments);
    }

    BounceEaseOut.prototype.update = function(t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
      }
      if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
      }
      if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
      }
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
    };

    return BounceEaseOut;

  })(Easing);

  BounceEaseIn = (function(_super) {

    __extends(BounceEaseIn, _super);

    BounceEaseIn.name = 'BounceEaseIn';

    function BounceEaseIn() {
      return BounceEaseIn.__super__.constructor.apply(this, arguments);
    }

    BounceEaseIn.prototype.update = function(t, b, c, d) {
      if ((t = (d - t) / d) < (1 / 2.75)) {
        return c - (c * (7.5625 * t * t)) + b;
      }
      if (t < (2 / 2.75)) {
        return c - (c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)) + b;
      }
      if (t < (2.5 / 2.75)) {
        return c - (c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)) + b;
      }
      return c - (c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375)) + b;
    };

    return BounceEaseIn;

  })(Easing);

  BounceEaseInOut = (function(_super) {

    __extends(BounceEaseInOut, _super);

    BounceEaseInOut.name = 'BounceEaseInOut';

    function BounceEaseInOut() {
      return BounceEaseInOut.__super__.constructor.apply(this, arguments);
    }

    BounceEaseInOut.prototype.update = function(t, b, c, d) {
      if (t < d / 2) {
        if ((t = (d - t * 2) / d) < (1 / 2.75)) {
          return (c - (c * (7.5625 * t * t))) * 0.5 + b;
        }
        if (t < (2 / 2.75)) {
          return (c - (c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75))) * 0.5 + b;
        }
        if (t < (2.5 / 2.75)) {
          return (c - (c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375))) * 0.5 + b;
        }
        return (c - (c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375))) * 0.5 + b;
      } else {
        if ((t = (t * 2 - d) / d) < (1 / 2.75)) {
          return (c * (7.5625 * t * t)) * 0.5 + c * 0.5 + b;
        }
        if (t < (2 / 2.75)) {
          return (c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)) * 0.5 + c * 0.5 + b;
        }
        if (t < (2.5 / 2.75)) {
          return (c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)) * 0.5 + c * 0.5 + b;
        }
        return (c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375)) * 0.5 + c * 0.5 + b;
      }
    };

    return BounceEaseInOut;

  })(Easing);

  BounceEaseOutIn = (function(_super) {

    __extends(BounceEaseOutIn, _super);

    BounceEaseOutIn.name = 'BounceEaseOutIn';

    function BounceEaseOutIn() {
      return BounceEaseOutIn.__super__.constructor.apply(this, arguments);
    }

    BounceEaseOutIn.prototype.update = function(t, b, c, d) {
      if (t < d / 2) {
        if ((t = (t * 2) / d) < (1 / 2.75)) {
          return (c / 2) * (7.5625 * t * t) + b;
        }
        if (t < (2 / 2.75)) {
          return (c / 2) * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        }
        if (t < (2.5 / 2.75)) {
          return (c / 2) * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        }
        return (c / 2) * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
      } else {
        if ((t = (d - (t * 2 - d)) / d) < (1 / 2.75)) {
          return (c / 2) - ((c / 2) * (7.5625 * t * t)) + (b + c / 2);
        }
        if (t < (2 / 2.75)) {
          return (c / 2) - ((c / 2) * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)) + (b + c / 2);
        }
        if (t < (2.5 / 2.75)) {
          return (c / 2) - ((c / 2) * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)) + (b + c / 2);
        }
        return (c / 2) - ((c / 2) * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375)) + (b + c / 2);
      }
    };

    return BounceEaseOutIn;

  })(Easing);

  Linear = (function() {

    Linear.name = 'Linear';

    function Linear() {}

    Linear.easeNone = new LinearEaseNone();

    Linear.easeOut = new LinearEaseNone();

    Linear.easeIn = new LinearEaseNone();

    Linear.easeInOut = new LinearEaseNone();

    Linear.easeOutIn = new LinearEaseNone();

    return Linear;

  })();

  Sine = (function() {

    Sine.name = 'Sine';

    function Sine() {}

    Sine.easeOut = new SineEaseOut();

    Sine.easeIn = new SineEaseIn();

    Sine.easeInOut = new SineEaseInOut();

    Sine.easeOutIn = new SineEaseOutIn();

    return Sine;

  })();

  Cubic = (function() {

    Cubic.name = 'Cubic';

    function Cubic() {}

    Cubic.easeOut = new CubicEaseOut();

    Cubic.easeIn = new CubicEaseIn();

    Cubic.easeInOut = new CubicEaseInOut();

    Cubic.easeOutIn = new CubicEaseOutIn();

    return Cubic;

  })();

  Quint = (function() {

    Quint.name = 'Quint';

    function Quint() {}

    Quint.easeOut = new QuintEaseOut();

    Quint.easeIn = new QuintEaseIn();

    Quint.easeInOut = new QuintEaseInOUt();

    Quint.easeOutIn = new QuintEaseOutIn();

    return Quint;

  })();

  Circ = (function() {

    Circ.name = 'Circ';

    function Circ() {}

    Circ.easeOut = new CircEaseOut();

    Circ.easeIn = new CircEaseIn();

    Circ.easeInOut = new CircEaseInOut();

    Circ.easeOutIn = new CircEaseOutIn();

    return Circ;

  })();

  Quad = (function() {

    Quad.name = 'Quad';

    function Quad() {}

    Quad.easeOut = new QuadEaseOut();

    Quad.easeIn = new QuadEaseIn();

    Quad.easeInOut = new QuadEaseInOut();

    Quad.easeOutIn = new QuadEaseOutIn();

    return Quad;

  })();

  Quart = (function() {

    Quart.name = 'Quart';

    function Quart() {}

    Quart.easeOut = new QuartEaseOut();

    Quart.easeIn = new QuartEaseIn();

    Quart.easeInOut = new QuartEaseInOut();

    Quart.easeOutIn = new QuintEaseOutIn();

    return Quart;

  })();

  Expo = (function() {

    Expo.name = 'Expo';

    function Expo() {}

    Expo.easeOut = new ExpoEaseOut();

    Expo.easeIn = new ExpoEaseIn();

    Expo.easeInOut = new ExpoEaseInOut();

    Expo.easeOutIn = new ExpoEaseOutIn();

    return Expo;

  })();

  Elastic = (function() {

    Elastic.name = 'Elastic';

    function Elastic() {}

    Elastic.easeOut = new ElasticEaseOut();

    Elastic.easeIn = new ElasticEaseIn();

    Elastic.easeInOut = new ElasticEaseInOUt();

    Elastic.easeOutIn = new ElasticEaseOutIn();

    Elastic.easeOutWith = function(a, p) {
      return new ElasticEaseOutWith(a, p);
    };

    Elastic.easeInWith = function(a, p) {
      return new ElasticEaseInWith(a, p);
    };

    Elastic.easeInOutWith = function(a, p) {
      return new ElasticEaseInOutWith(a, p);
    };

    Elastic.easeOutInWith = function(a, p) {
      return new ElasticEaseOutInWith(a, p);
    };

    return Elastic;

  })();

  Bounce = (function() {

    Bounce.name = 'Bounce';

    function Bounce() {}

    Bounce.easeOut = new BounceEaseOut();

    Bounce.easeIn = new BounceEaseIn();

    Bounce.easeInOut = new BounceEaseInOut();

    Bounce.easeOutIn = new BounceEaseOutIn();

    return Bounce;

  })();

  Back = (function() {

    Back.name = 'Back';

    function Back() {}

    Back.easeOut = new BackEaseOut();

    Back.easeIn = new BackEaseIn();

    Back.easeInOut = new BackEaseInOut();

    Back.easeOutIn = new BackEaseOutIn();

    Back.easeOutWith = function(s) {
      return new BackEaseOutWith(s);
    };

    Back.easeInWith = function(s) {
      return new BackEaseInWith(s);
    };

    Back.easeInOutWith = function(s) {
      return new BackEaseInOutWith(s);
    };

    Back.easeOutInWith = function(s) {
      return new BackEaseOutInWith(s);
    };

    return Back;

  })();

  CSS3Easing = {
		linear:"cubic-bezier(0.250, 0.250, 0.750, 0.750)",
		ease:"cubic-bezier(0.250, 0.100, 0.250, 1.000)",
		easeIn:"cubic-bezier(0.420, 0.000, 1.000, 1.000)",
		easeOut:"cubic-bezier(0.000, 0.000, 0.580, 1.000)",
		easeInBack:"cubic-bezier(0.600, -0.280, 0.735, 0.045)",
		easeInOutBack:"cubic-bezier(0.680, -0.550, 0.265, 1.550)",
		easeInOut:"cubic-bezier(0.420, 0.000, 0.580, 1.000)",
		easeInQuad:"cubic-bezier(0.550, 0.085, 0.680, 0.530)",
		easeInCubic:"cubic-bezier(0.550, 0.055, 0.675, 0.190)",
		easeInQuart:"cubic-bezier(0.895, 0.030, 0.685, 0.220)",
		easeInQuint:"cubic-bezier(0.755, 0.050, 0.855, 0.060)",
		easeInSine:"cubic-bezier(0.470, 0.000, 0.745, 0.715)",
		easeInExpo:"cubic-bezier(0.950, 0.050, 0.795, 0.035)",
		easeInCirc:"cubic-bezier(0.600, 0.040, 0.980, 0.335)",
		easeOutQuad:"cubic-bezier(0.250, 0.460, 0.450, 0.940)",
		easeOutCubic:"cubic-bezier(0.215, 0.610, 0.355, 1.000)",
		easeOutQuart:"cubic-bezier(0.165, 0.840, 0.440, 1.000)",
		easeOutQuint:"cubic-bezier(0.230, 1.000, 0.320, 1.000)",
		easeOutSine:"cubic-bezier(0.390, 0.575, 0.565, 1.000)",
		easeOutExpo:"cubic-bezier(0.190, 1.000, 0.220, 1.000)",
		easeOutCirc:"cubic-bezier(0.075, 0.820, 0.165, 1.000)",
		easeOutBack:"cubic-bezier(0.175, 0.885, 0.320, 1.275)",
		easeInOutQuad:"cubic-bezier(0.455, 0.030, 0.515, 0.955)",
		easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1.000)",
		easeInOutQuart:"cubic-bezier(0.770, 0.000, 0.175, 1.000)",
		easeInOutQuint:"cubic-bezier(0.860, 0.000, 0.070, 1.000)",
		easeInOutSine:"cubic-bezier(0.445, 0.050, 0.550, 0.950)",
		easeInOutExpo:"cubic-bezier(1.000, 0.000, 0.000, 1.000)",
		easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.150, 0.860)"
	}

  getEasingByString = function(easingName) {
    if (easingName === "linear") {
      return Linear.easeNone;
    } else if (easingName === "easeInBack") {
      return Back.easeIn;
    } else if (easingName === "easeInOutBack") {
      return Back.easeInOut;
    } else if (easingName === "easeInQuad") {
      return Quad.easeIn;
    } else if (easingName === "easeInCubic") {
      return Cubic.easeIn;
    } else if (easingName === "easeInQuart") {
      return Quart.easeIn;
    } else if (easingName === "easeInQuint") {
      return Quint.easeIn;
    } else if (easingName === "easeInSine") {
      return Sine.easeIn;
    } else if (easingName === "easeInExpo") {
      return Expo.easeIn;
    } else if (easingName === "easeInCirc") {
      return Circ.easeOut;
    } else if (easingName === "easeOutQuad") {
      return Quad.easeOut;
    } else if (easingName === "easeOutCubic") {
      return Cubic.easeOut;
    } else if (easingName === "easeOutQuart") {
      return Quart.easeOut;
    } else if (easingName === "easeOutQuint") {
      return Quint.easeOut;
    } else if (easingName === "easeOutSine") {
      return Sine.easeOut;
    } else if (easingName === "easeOutExpo") {
      return Expo.easeOut;
    } else if (easingName === "easeOutCirc") {
      return Circ.easeOut;
    } else if (easingName === "easeOutBack") {
      return Back.easeInOut;
    } else if (easingName === "easeInOutQuad") {
      return Quad.easeInOut;
    } else if (easingName === "easeInOutCubic") {
      return Cubic.easeInOut;
    } else if (easingName === "easeInOutQuart") {
      return Quart.easeInOut;
    } else if (easingName === "easeInOutQuint") {
      return Quint.easeInOut;
    } else if (easingName === "easeInOutSine") {
      return Sine.easeInOut;
    } else if (easingName === "easeInOutExpo") {
      return Expo.easeInOut;
    } else if (easingName === "easeInOutCirc") {
      return Circ.easeInOut;
    }
  };
  window.jp = window.jp || {};

  window.jp.contents = window.jp.contents || {};

  window.jp.contents.easing = window.jp.contents.easing || {};

  window.jp.contents.easing.Linear = Linear;

  window.jp.contents.easing.Sine = Sine;

  window.jp.contents.easing.Cubic = Cubic;

  window.jp.contents.easing.Quint = Quint;

  window.jp.contents.easing.Circ = Circ;

  window.jp.contents.easing.Back = Back;

  window.jp.contents.easing.Quad = Quad;

  window.jp.contents.easing.Quart = Quart;

  window.jp.contents.easing.Expo = Expo;

  window.jp.contents.easing.Elastic = Elastic;

  window.jp.contents.easing.Bounce = Bounce;
  
  window.jp.contents.easing.CSS3Easing = CSS3Easing;
  window.jp.contents.easing.getEasingByString = getEasingByString
})();
