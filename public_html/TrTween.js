(function() {

  'use strict';

  var APP_BROWSER, APP_OS, AnimationTween, Application, Back, BackEaseIn, BackEaseInOut, BackEaseInOutWith, BackEaseInWith, BackEaseOut, BackEaseOutIn, BackEaseOutInWith, BackEaseOutWith, BackgroundSprite, BasicTween, BezierSegment, BezierTween, Bounce, BounceEaseIn, BounceEaseInOut, BounceEaseOut, BounceEaseOutIn, BrowserName, CSS2W, CSS3Easing, ChangeUnitTween, Circ, CircEaseIn, CircEaseInOut, CircEaseOut, CircEaseOutIn, Cubic, CubicEaseIn, CubicEaseInOut, CubicEaseOut, CubicEaseOutIn, CustomEase, DelayTween, Delegate, EasingTween, Elastic, ElasticEaseIn, ElasticEaseInOut, ElasticEaseInOutWith, ElasticEaseInWith, ElasticEaseOut, ElasticEaseOutIn, ElasticEaseOutInWith, ElasticEaseOutWith, Expo, ExpoEaseIn, ExpoEaseInOut, ExpoEaseOut, ExpoEaseOutIn, FSW, FuncTween, ICSSTween, IEasing, ITween, ITweenGroup, ImageSpriteSheet, Linear, LinearEaseNone, LinkedList, OSName, ObjectMapper, ParallelTween, PropertyMapper, PropertyTween, Quad, QuadEaseIn, QuadEaseInOut, QuadEaseOut, QuadEaseOutIn, Quart, QuartEaseIn, QuartEaseInOut, QuartEaseOut, QuartEaseOutIn, Quint, QuintEaseIn, QuintEaseInOut, QuintEaseOut, QuintEaseOutIn, Render, RepeatTween, SerialTween, Sine, SineEaseIn, SineEaseInOut, SineEaseOut, SineEaseOutIn, SpriteSheet, TSW, TrTween, TransitionTween, TweenState, VenderInfo, WaitTween, cancelAnimationFrame, getEasingByString, isFIE, isIOS, requestAnimationFrame;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BrowserName = {
    Chrome: "chrome",
    Safari: "safari",
    IE: "ie",
    Firefox: "firefox",
    Opera: "opera"
  };

  OSName = {
    Windows: "windows",
    MacOS: "macos",
    iPhone: "iPhone",
    iPad: "iPad",
    iPod: "iPod",
    Android: "android"
  };

  window.console = window.console != null ? window.console : {
    log: function() {}
  };

  if (!(Array.prototype.indexOf != null)) {
    Array.prototype.indexOf = function(elm) {
      var i, val, _len;
      for (i = 0, _len = this.length; i < _len; i++) {
        val = this[i];
        if (val === elm) return i;
      }
      return -1;
    };
  }

  Application = (function() {

    function Application() {}

    Application._init = function() {
      var bName, bVer, isIOS, isKA, isMobile, osName, osVar, ua;
      ua = navigator.userAgent.toUpperCase();
      isMobile = false;
      isIOS = false;
      isKA = false;
      if (ua.indexOf("CHROME") > -1) {
        bName = BrowserName.Chrome;
        ua.match(/CHROME\/(\d+(\.\d+)+)/ig);
        bVer = RegExp.$1;
      } else if (ua.indexOf("SAFARI") > -1) {
        bName = BrowserName.Safari;
        ua.match(/VERSION\/(\d+(\.\d+)+)/ig);
        bVer = RegExp.$1;
      } else if (ua.indexOf("FIREFOX") > -1) {
        bName = BrowserName.Firefox;
        ua.match(/FIREFOX\/(\d+(\.\d+)+)/i);
        bVer = RegExp.$1;
      } else if (ua.indexOf("MSIE") > -1) {
        bName = BrowserName.IE;
        ua.match(/MSIE (\d+(\.\d+)+)/i);
        bVer = RegExp.$1;
      } else if (ua.indexOf("OPERA") > -1) {
        bName = BrowserName.Opera;
        ua.match(/OPERA\/(\d+(\.\d+)+)/i);
        bVer = RegExp.$1;
      }
      Application._browserName = bName;
      Application._browserVersion = bVer;
      if (ua.indexOf("ANDROID") > -1) {
        ua.match(/ANDROID (\d+\.\d+)/i);
        osVar = (RegExp.$1.replace(/\./g, '') + '00').slice(0, 3);
        osVar = Number(osVar);
        osName = OSName.Android;
        isMobile = true;
        if (osVar < 400) isKA = true;
      } else if (ua.indexOf("IPHONE") > -1) {
        ua.match(/IPHONE OS (\w+){1,3}/g);
        osVar = (RegExp.$1.replace(/_/g, '') + '00').slice(0, 3);
        osVar = Number(osVar);
        osName = OSName.iPhone;
        isMobile = true;
        isIOS = true;
      } else if (ua.indexOf("IPOD") > -1) {
        ua.match(/IPOD OS (\w+){1,3}/g);
        osVar = (RegExp.$1.replace(/_/g, '') + '00').slice(0, 3);
        osVar = Number(osVar);
        osName = OSName.iPod;
        isMobile = true;
        isIOS = true;
      } else if (ua.indexOf("IPAD") > -1) {
        ua.match(/IPAD OS (\w+){1,3}/g);
        osVar = (RegExp.$1.replace(/_/g, '') + '00').slice(0, 3);
        osVar = Number(osVar);
        osName = OSName.iPad;
        isMobile = true;
        isIOS = true;
      } else if (ua.indexOf("MAC OS X") > -1) {
        ua.match(/MAC OS X (\d+[\._]\d+)|(\d+_\d+)/g);
        osVar = (RegExp.$1.replace(/\.|_/g, '') + '00').slice(0, 3);
        osVar = Number(osVar);
        osName = OSName.MacOS;
      } else {
        osName = OSName.Windows;
      }
      Application._osName = osName;
      Application._osVersion = osVar;
      Application._isMobile = isMobile;
      Application._isiOS = isIOS;
      Application._isKAnd = isKA;
      Application._browserInfo = {
        name: Application._browserName,
        version: parseFloat(Application._browserVersion)
      };
      return Application._osInfo = {
        name: Application._osName,
        version: Application._osVersion
      };
    };

    Application.getBrowserInfo = function() {
      if (!Application._browserInfo) Application._init();
      return Application._browserInfo;
    };

    Application.getOSInfo = function() {
      if (!Application._browserInfo) Application._init();
      return Application._osInfo;
    };

    Application.isMobile = function() {
      if (!Application._browserInfo) Application._init();
      return Application._isMobile;
    };

    Application.isKAndroid = function() {
      if (!Application._browserInfo) Application._init();
      return Application._isKAnd;
    };

    Application.isiOS = function() {
      if (!Application._browserInfo) Application._init();
      return Application._isiOS;
    };

    Application.isFIE = function() {
      if (!Application._browserInfo) Application._init();
      if (Application._browserInfo.name === "ie" && Application._browserInfo.version < 9) {
        return true;
      } else {
        return false;
      }
    };

    Application.isIE6 = function() {
      if (!Application._browserInfo) Application._init();
      if (Application._browserInfo.name === "ie" && Application._browserInfo.version < 7) {
        return true;
      } else {
        return false;
      }
    };

    Application.isCSS3DEnable = function() {
      if (!Application._browserInfo) Application._init();
      if (Application._browserInfo.name === "ie" && Application._browserInfo.version < 10) {
        return false;
      } else {
        return true;
      }
    };

    return Application;

  })();

  Delegate = (function() {

    function Delegate() {}

    Delegate.create = function(delegate, owner, params) {
      return function() {
        return delegate.apply(owner, params != null ? params : []);
      };
    };

    return Delegate;

  })();

  window.jp = window.jp || {};

  window.jp.contents = window.jp.contents || {};

  window.jp.contents.util = window.jp.contents.util || {};

  window.jp.contents.util.Delegate = Delegate;

  window.jp.contents.util.Application = Application;

  IEasing = (function() {

    function IEasing() {}

    IEasing.prototype.update = function(t, b, c, d) {};

    return IEasing;

  })();

  LinearEaseNone = (function() {

    __extends(LinearEaseNone, IEasing);

    function LinearEaseNone() {}

    LinearEaseNone.prototype.update = function(t, b, c, d) {
      return c * t / d + b;
    };

    return LinearEaseNone;

  })();

  SineEaseOut = (function() {

    __extends(SineEaseOut, IEasing);

    function SineEaseOut() {
      this._pi = Math.PI * .5;
    }

    SineEaseOut.prototype.update = function(t, b, c, d) {
      return c * Math.sin(t / d * this._pi) + b;
    };

    return SineEaseOut;

  })();

  SineEaseIn = (function() {

    __extends(SineEaseIn, IEasing);

    function SineEaseIn() {
      this._pi = Math.PI * .5;
    }

    SineEaseIn.prototype.update = function(t, b, c, d) {
      return -c * Math.cos(t / d * this._pi) + c + b;
    };

    return SineEaseIn;

  })();

  SineEaseInOut = (function() {

    __extends(SineEaseInOut, IEasing);

    function SineEaseInOut() {
      this._pi = Math.PI;
    }

    SineEaseInOut.prototype.update = function(t, b, c, d) {
      return -(c / 2) * (Math.cos(this._pi * t / d) - 1) + b;
    };

    return SineEaseInOut;

  })();

  SineEaseOutIn = (function() {

    __extends(SineEaseOutIn, IEasing);

    function SineEaseOutIn() {
      this._pi = Math.PI * .5;
    }

    SineEaseOutIn.prototype.update = function(t, b, c, d) {
      if (t < (d / 2)) {
        return (c / 2) * Math.sin((t * 2) / d * this._pi) + b;
      } else {
        return -(c / 2) * Math.cos((t * 2 - d) / d * this._pi) + (c / 2) + (b + (c / 2));
      }
    };

    return SineEaseOutIn;

  })();

  CubicEaseOut = (function() {

    __extends(CubicEaseOut, IEasing);

    function CubicEaseOut() {}

    CubicEaseOut.prototype.update = function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    };

    return CubicEaseOut;

  })();

  CubicEaseIn = (function() {

    __extends(CubicEaseIn, IEasing);

    function CubicEaseIn() {}

    CubicEaseIn.prototype.update = function(t, b, c, d) {
      return c * (t /= d) * t * t + b;
    };

    return CubicEaseIn;

  })();

  CubicEaseInOut = (function() {

    __extends(CubicEaseInOut, IEasing);

    function CubicEaseInOut() {}

    CubicEaseInOut.prototype.update = function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return (c / 2) * t * t * t + b;
      } else {
        return (c / 2) * ((t -= 2) * t * t + 2) + b;
      }
    };

    return CubicEaseInOut;

  })();

  CubicEaseOutIn = (function() {

    __extends(CubicEaseOutIn, IEasing);

    function CubicEaseOutIn() {}

    CubicEaseOutIn.prototype.update = function(t, b, c, d) {
      if (t < d / 2) {
        return c / 2 * ((t = t * 2 / d - 1) * t * t + 1) + b;
      } else {
        return c / 2 * (t = (t * 2 - d) / d) * t * t + b + c / 2;
      }
    };

    return CubicEaseOutIn;

  })();

  QuintEaseOut = (function() {

    __extends(QuintEaseOut, IEasing);

    function QuintEaseOut() {}

    QuintEaseOut.prototype.update = function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };

    return QuintEaseOut;

  })();

  QuintEaseIn = (function() {

    __extends(QuintEaseIn, IEasing);

    function QuintEaseIn() {}

    QuintEaseIn.prototype.update = function(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    };

    return QuintEaseIn;

  })();

  QuintEaseInOut = (function() {

    __extends(QuintEaseInOut, IEasing);

    function QuintEaseInOut() {}

    QuintEaseInOut.prototype.update = function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
      } else {
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
      }
    };

    return QuintEaseInOut;

  })();

  QuintEaseOutIn = (function() {

    __extends(QuintEaseOutIn, IEasing);

    function QuintEaseOutIn() {}

    QuintEaseOutIn.prototype.update = function(t, b, c, d) {
      if (t < d / 2) {
        return (c / 2) * ((t = (t * 2) / d - 1) * t * t * t * t + 1) + b;
      } else {
        return (c / 2) * (t = (t * 2 - d) / d) * t * t * t * t + (b + c / 2);
      }
    };

    return QuintEaseOutIn;

  })();

  CircEaseOut = (function() {

    __extends(CircEaseOut, IEasing);

    function CircEaseOut() {}

    CircEaseOut.prototype.update = function(t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    };

    return CircEaseOut;

  })();

  CircEaseIn = (function() {

    __extends(CircEaseIn, IEasing);

    function CircEaseIn() {}

    CircEaseIn.prototype.update = function(t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    };

    return CircEaseIn;

  })();

  CircEaseInOut = (function() {

    __extends(CircEaseInOut, IEasing);

    function CircEaseInOut() {}

    CircEaseInOut.prototype.update = function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      } else {
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
      }
    };

    return CircEaseInOut;

  })();

  CircEaseOutIn = (function() {

    __extends(CircEaseOutIn, IEasing);

    function CircEaseOutIn() {}

    CircEaseOutIn.prototype.update = function(t, b, c, d) {
      if (t < d / 2) {
        return (c / 2) * Math.sqrt(1 - (t = (t * 2) / d - 1) * t) + b;
      } else {
        return -(c / 2) * (Math.sqrt(1 - (t = (t * 2 - d) / d) * t) - 1) + (b + c / 2);
      }
    };

    return CircEaseOutIn;

  })();

  QuadEaseOut = (function() {

    __extends(QuadEaseOut, IEasing);

    function QuadEaseOut() {}

    QuadEaseOut.prototype.update = function(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    };

    return QuadEaseOut;

  })();

  QuadEaseIn = (function() {

    __extends(QuadEaseIn, IEasing);

    function QuadEaseIn() {}

    QuadEaseIn.prototype.update = function(t, b, c, d) {
      return c * (t /= d) * t + b;
    };

    return QuadEaseIn;

  })();

  QuadEaseInOut = (function() {

    __extends(QuadEaseInOut, IEasing);

    function QuadEaseInOut() {}

    QuadEaseInOut.prototype.update = function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
      } else {
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
      }
    };

    return QuadEaseInOut;

  })();

  QuadEaseOutIn = (function() {

    __extends(QuadEaseOutIn, IEasing);

    function QuadEaseOutIn() {}

    QuadEaseOutIn.prototype.update = function(t, b, c, d) {
      if (t < d / 2) {
        return -(c / 2) * (t = t * 2 / d) * (t - 2) + b;
      } else {
        return (c / 2) * (t = (t * 2 - d) / d) * t + (b + c / 2);
      }
    };

    return QuadEaseOutIn;

  })();

  QuartEaseOut = (function() {

    __extends(QuartEaseOut, IEasing);

    function QuartEaseOut() {}

    QuartEaseOut.prototype.update = function(t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };

    return QuartEaseOut;

  })();

  QuartEaseIn = (function() {

    __extends(QuartEaseIn, IEasing);

    function QuartEaseIn() {}

    QuartEaseIn.prototype.update = function(t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    };

    return QuartEaseIn;

  })();

  QuartEaseInOut = (function() {

    __extends(QuartEaseInOut, IEasing);

    function QuartEaseInOut() {}

    QuartEaseInOut.prototype.update = function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t + b;
      } else {
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
      }
    };

    return QuartEaseInOut;

  })();

  QuartEaseOutIn = (function() {

    __extends(QuartEaseOutIn, IEasing);

    function QuartEaseOutIn() {}

    QuartEaseOutIn.prototype.update = function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t + b;
      } else {
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
      }
    };

    return QuartEaseOutIn;

  })();

  ExpoEaseOut = (function() {

    __extends(ExpoEaseOut, IEasing);

    function ExpoEaseOut() {}

    ExpoEaseOut.prototype.update = function(t, b, c, d) {
      if (t === d) {
        return b + c;
      } else {
        return c * (-Math.pow(2, -10 * t / d) + 1) + b;
      }
    };

    return ExpoEaseOut;

  })();

  ExpoEaseIn = (function() {

    __extends(ExpoEaseIn, IEasing);

    function ExpoEaseIn() {}

    ExpoEaseIn.prototype.update = function(t, b, c, d) {
      if (t === 0) {
        return b;
      } else {
        return c * Math.pow(2, 10 * (t / d - 1)) + b;
      }
    };

    return ExpoEaseIn;

  })();

  ExpoEaseInOut = (function() {

    __extends(ExpoEaseInOut, IEasing);

    function ExpoEaseInOut() {}

    ExpoEaseInOut.prototype.update = function(t, b, c, d) {
      if (t === 0) {
        return b;
      } else if (t === d) {
        return b + c;
      } else if ((t /= d / 2) < 1) {
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      } else {
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
    };

    return ExpoEaseInOut;

  })();

  ExpoEaseOutIn = (function() {

    __extends(ExpoEaseOutIn, IEasing);

    function ExpoEaseOutIn() {}

    ExpoEaseOutIn.prototype.update = function(t, b, c, d) {
      if (t < d / 2) {
        if (t * 2 === d) {
          return b + c / 2;
        } else {
          return c / 2 * (1 - Math.pow(2, -10 * t * 2 / d)) + b;
        }
      } else if (t * 2 - d === 0) {
        return b + c / 2;
      } else {
        return c / 2 * Math.pow(2, 10 * ((t * 2 - d) / d - 1)) + b + c / 2;
      }
    };

    return ExpoEaseOutIn;

  })();

  ElasticEaseOutWith = (function() {

    __extends(ElasticEaseOutWith, IEasing);

    function ElasticEaseOutWith(amplitude, period) {
      this.a = amplitude;
      this.p = period;
      this.pi = Math.PI;
    }

    ElasticEaseOutWith.prototype.update = function(t, b, c, d) {
      var s;
      if (t === 0) {
        return b;
      } else if ((t /= d) === 1) {
        return b + c;
      }
      if (!this.p) this.p = d * 0.3;
      if (!this.a || this.a < Math.abs(c)) {
        this.a = c;
        s = this.p / 4;
      } else {
        s = this.p / (2 * this.pi) * Math.asin(c / this.a);
      }
      return this.a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * this.pi) / this.p) + c + b;
    };

    return ElasticEaseOutWith;

  })();

  ElasticEaseInWith = (function() {

    __extends(ElasticEaseInWith, IEasing);

    function ElasticEaseInWith(amplitude, period) {
      this.a = amplitude;
      this.p = period;
      this.pi = Math.PI;
    }

    ElasticEaseInWith.prototype.update = function(t, b, c, d) {
      var s;
      if (t === 0) {
        return b;
      } else if ((t /= d) === 1) {
        return b + c;
      }
      if (!this.p) this.p = d * 0.3;
      if (!this.a || this.a < Math.abs(c)) {
        this.a = c;
        s = this.p / 4;
      } else {
        s = this.p / (2 * Math.PI) * Math.asin(c / this.a);
      }
      return -(this.a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * this.pi) / this.p)) + b;
    };

    return ElasticEaseInWith;

  })();

  ElasticEaseInOutWith = (function() {

    __extends(ElasticEaseInOutWith, IEasing);

    function ElasticEaseInOutWith(amplitude, period) {
      this.a = amplitude;
      this.p = period;
      this.pi = Math.PI;
    }

    ElasticEaseInOutWith.prototype.update = function(t, b, c, d) {
      var s;
      if (t === 0) {
        return b;
      } else if ((t /= d / 2) === 2) {
        return b + c;
      }
      if (!this.p) this.p = d * (0.3 * 1.5);
      if (!this.a || this.a < Math.abs(c)) {
        this.a = c;
        s = this.p / 4;
      } else {
        s = this.p / (2 * this.pi) * Math.asin(c / this.a);
      }
      if (t < 1) {
        return -0.5 * (this.a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * this.pi) / this.p)) + b;
      } else {
        return this.a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * this.pi) / this.p) * 0.5 + c + b;
      }
    };

    return ElasticEaseInOutWith;

  })();

  ElasticEaseOutInWith = (function() {

    __extends(ElasticEaseOutInWith, IEasing);

    function ElasticEaseOutInWith(amplitude, period) {
      this.a = amplitude;
      this.p = period;
      this.pi = Math.PI;
    }

    ElasticEaseOutInWith.prototype.update = function(t, b, c, d) {
      var s;
      c /= 2;
      if (t < d / 2) {
        if ((t *= 2) === 0) return b;
        if ((t /= d) === 1) return b + c;
        if (!this.p) this.p = d * 0.3;
        if (!this.a || this.a < Math.abs(c)) {
          this.a = c;
          s = this.p / 4;
        } else {
          s = this.p / (2 * this.pi) * Math.asin(c / this.a);
        }
        return this.a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * this.pi) / this.p) + c + b;
      } else {
        if ((t = t * 2 - d) === 0) {
          return b + c;
        } else if ((t /= d) === 1) {
          return (b + c) + c;
        }
        if (!this.p) this.p = d * 0.3;
        if (!this.a || this.a < Math.abs(c)) {
          this.a = c;
          s = this.p / 4;
        } else {
          s = this.p / (2 * this.pi) * Math.asin(c / this.a);
        }
        return -(this.a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * this.pi) / this.p)) + (b + c);
      }
    };

    return ElasticEaseOutInWith;

  })();

  ElasticEaseOut = (function() {

    __extends(ElasticEaseOut, ElasticEaseOutWith);

    function ElasticEaseOut() {
      ElasticEaseOut.__super__.constructor.call(this, 0, 0);
    }

    return ElasticEaseOut;

  })();

  ElasticEaseIn = (function() {

    __extends(ElasticEaseIn, ElasticEaseInWith);

    function ElasticEaseIn() {
      ElasticEaseIn.__super__.constructor.call(this, 0, 0);
    }

    return ElasticEaseIn;

  })();

  ElasticEaseOutIn = (function() {

    __extends(ElasticEaseOutIn, ElasticEaseOutInWith);

    function ElasticEaseOutIn() {
      ElasticEaseOutIn.__super__.constructor.call(this, 0, 0);
    }

    return ElasticEaseOutIn;

  })();

  ElasticEaseInOut = (function() {

    __extends(ElasticEaseInOut, ElasticEaseInOutWith);

    function ElasticEaseInOut() {
      ElasticEaseInOut.__super__.constructor.call(this, 0, 0);
    }

    return ElasticEaseInOut;

  })();

  BackEaseOutWith = (function() {

    __extends(BackEaseOutWith, IEasing);

    function BackEaseOutWith(s) {
      this.s = s;
    }

    BackEaseOutWith.prototype.update = function(t, b, c, d) {
      var s;
      s = this.s;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    };

    return BackEaseOutWith;

  })();

  BackEaseInWith = (function() {

    __extends(BackEaseInWith, IEasing);

    function BackEaseInWith(s) {
      this.s = s;
    }

    BackEaseInWith.prototype.update = function(t, b, c, d) {
      var s;
      s = this.s;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    };

    return BackEaseInWith;

  })();

  BackEaseInOutWith = (function() {

    __extends(BackEaseInOutWith, IEasing);

    function BackEaseInOutWith(s) {
      this.s = s;
    }

    BackEaseInOutWith.prototype.update = function(t, b, c, d) {
      var s;
      s = this.s;
      if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s * 1.525) + 1) * t - s * 1.525)) + b;
      } else {
        return c / 2 * ((t -= 2) * t * (((s * 1.525) + 1) * t + s * 1.525) + 2) + b;
      }
    };

    return BackEaseInOutWith;

  })();

  BackEaseOutInWith = (function() {

    __extends(BackEaseOutInWith, IEasing);

    function BackEaseOutInWith(s) {
      this.s = s;
    }

    BackEaseOutInWith.prototype.update = function(t, b, c, d) {
      var s;
      s = this.s;
      if (t < d / 2) {
        return (c / 2) * ((t = (t * 2) / d - 1) * t * ((s + 1) * t + s) + 1) + b;
      } else {
        return (c / 2) * (t = (t * 2 - d) / d) * t * ((s + 1) * t - s) + (b + c / 2);
      }
    };

    return BackEaseOutInWith;

  })();

  BackEaseOut = (function() {

    __extends(BackEaseOut, BackEaseOutWith);

    function BackEaseOut() {
      BackEaseOut.__super__.constructor.call(this, 1.70158);
    }

    return BackEaseOut;

  })();

  BackEaseIn = (function() {

    __extends(BackEaseIn, BackEaseInWith);

    function BackEaseIn() {
      BackEaseIn.__super__.constructor.call(this, 1.70158);
    }

    return BackEaseIn;

  })();

  BackEaseInOut = (function() {

    __extends(BackEaseInOut, BackEaseInOutWith);

    function BackEaseInOut() {
      BackEaseInOut.__super__.constructor.call(this, 1.70158);
    }

    return BackEaseInOut;

  })();

  BackEaseOutIn = (function() {

    __extends(BackEaseOutIn, BackEaseOutInWith);

    function BackEaseOutIn() {
      BackEaseOutIn.__super__.constructor.call(this, 1.70158);
    }

    return BackEaseOutIn;

  })();

  BounceEaseOut = (function() {

    __extends(BounceEaseOut, IEasing);

    function BounceEaseOut() {}

    BounceEaseOut.prototype.update = function(t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
      } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
      }
    };

    return BounceEaseOut;

  })();

  BounceEaseIn = (function() {

    __extends(BounceEaseIn, IEasing);

    function BounceEaseIn() {}

    BounceEaseIn.prototype.update = function(t, b, c, d) {
      if ((t = (d - t) / d) < (1 / 2.75)) {
        return c - (c * (7.5625 * t * t)) + b;
      } else if (t < (2 / 2.75)) {
        return c - (c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)) + b;
      } else if (t < (2.5 / 2.75)) {
        return c - (c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)) + b;
      } else {
        return c - (c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375)) + b;
      }
    };

    return BounceEaseIn;

  })();

  BounceEaseInOut = (function() {

    __extends(BounceEaseInOut, IEasing);

    function BounceEaseInOut() {}

    BounceEaseInOut.prototype.update = function(t, b, c, d) {
      if (t < d / 2) {
        if ((t = (d - t * 2) / d) < (1 / 2.75)) {
          return (c - (c * (7.5625 * t * t))) * 0.5 + b;
        } else if (t < (2 / 2.75)) {
          return (c - (c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75))) * 0.5 + b;
        } else if (t < (2.5 / 2.75)) {
          return (c - (c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375))) * 0.5 + b;
        } else {
          return (c - (c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375))) * 0.5 + b;
        }
      } else {
        if ((t = (t * 2 - d) / d) < (1 / 2.75)) {
          return (c * (7.5625 * t * t)) * 0.5 + c * 0.5 + b;
        } else if (t < (2 / 2.75)) {
          return (c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)) * 0.5 + c * 0.5 + b;
        } else if (t < (2.5 / 2.75)) {
          return (c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)) * 0.5 + c * 0.5 + b;
        } else {
          return (c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375)) * 0.5 + c * 0.5 + b;
        }
      }
    };

    return BounceEaseInOut;

  })();

  BounceEaseOutIn = (function() {

    __extends(BounceEaseOutIn, IEasing);

    function BounceEaseOutIn() {}

    BounceEaseOutIn.prototype.update = function(t, b, c, d) {
      if (t < d / 2) {
        if ((t = (t * 2) / d) < (1 / 2.75)) {
          return (c / 2) * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
          return (c / 2) * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        } else if (t < (2.5 / 2.75)) {
          return (c / 2) * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        } else {
          return (c / 2) * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
        }
      } else {
        if ((t = (d - (t * 2 - d)) / d) < (1 / 2.75)) {
          return (c / 2) - ((c / 2) * (7.5625 * t * t)) + (b + c / 2);
        } else if (t < (2 / 2.75)) {
          return (c / 2) - ((c / 2) * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)) + (b + c / 2);
        } else if (t < (2.5 / 2.75)) {
          return (c / 2) - ((c / 2) * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)) + (b + c / 2);
        } else {
          return (c / 2) - ((c / 2) * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375)) + (b + c / 2);
        }
      }
    };

    return BounceEaseOutIn;

  })();

  BezierSegment = (function() {

    function BezierSegment(a, b, c, d) {
      this._a = a;
      this._b = b;
      this._c = c;
      this._d = d;
    }

    BezierSegment.prototype.getValue = function(t) {
      var ax, ay, x, y;
      ax = this._a.x;
      x = (t * t * (this._d.x - ax) + 3 * (1 - t) * (t * (this._c.x - ax) + (1 - t) * (this._b.x - ax))) * t + ax;
      ay = this._a.y;
      y = (t * t * (this._d.y - ay) + 3 * (1 - t) * (t * (this._c.y - ay) + (1 - t) * (this._b.y - ay))) * t + ay;
      return {
        x: x,
        y: y
      };
    };

    BezierSegment.prototype.getYForX = function(x, coefficients) {
      var root, roots, time, _i, _len;
      if (coefficients == null) coefficients = null;
      if (this._a.x < this._d.x) {
        if (x <= this._a.x + 0.0000000000000001) {
          return this._a.y;
        } else if (x >= this._d.x - 0.0000000000000001) {
          return this._d.y;
        }
      } else {
        if (x >= this._a.x + 0.0000000000000001) return this._a.y;
        if (x <= this._d.x - 0.0000000000000001) return this._d.y;
      }
      if (!(coefficients != null)) {
        coefficients = BezierSegment.getCubicCoefficients(this._a.x, this._b.x, this._c.x, this._d.x);
      }
      roots = BezierSegment.getCubicRoots(coefficients[0], coefficients[1], coefficients[2], coefficients[3] - x);
      time = NaN;
      root = NaN;
      if (roots.length === 0) {
        time = 0;
      } else if (roots.length === 1) {
        time = roots[0];
      } else {
        for (_i = 0, _len = roots.length; _i < _len; _i++) {
          root = roots[_i];
          if (0 <= root && root <= 1) {
            time = root;
            break;
          }
        }
      }
      if (isNaN(time)) return NaN;
      return BezierSegment.getSingleValue(time, this._a.y, this._b.y, this._c.y, this._d.y);
    };

    BezierSegment.getSingleValue = function(t, a, b, c, d) {
      if (a == null) a = 0;
      if (b == null) b = 0;
      if (c == null) c = 0;
      if (d == null) d = 0;
      return (t * t * (d - a) + 3 * (1 - t) * (t * (c - a) + (1 - t) * (b - a))) * t + a;
    };

    BezierSegment.getCubicCoefficients = function(a, b, c, d) {
      return [-a + 3 * b - 3 * c + d, 3 * a - 6 * b + 3 * c, -3 * a + 3 * b, a];
    };

    BezierSegment.getCubicRoots = function(a, b, c, d) {
      var diff, q, qCubed, qSqrt, r, rSign, root, root1, root2, root3, theta, tmp;
      if (a == null) a = 0;
      if (b == null) b = 0;
      if (c == null) c = 0;
      if (d == null) d = 0;
      if (!a) return BezierSegment.getQuadraticRoots(b, c, d);
      if (a !== 1) {
        b /= a;
        c /= a;
        d /= a;
      }
      q = (b * b - 3 * c) / 9;
      qCubed = q * q * q;
      r = (2 * b * b * b - 9 * b * c + 27 * d) / 54;
      diff = qCubed - r * r;
      if (diff >= 0) {
        if (!q) return [0];
        theta = Math.acos(r / Math.sqrt(qCubed));
        qSqrt = Math.sqrt(q);
        root1 = -2 * qSqrt * Math.cos(theta / 3) - b / 3;
        root2 = -2 * qSqrt * Math.cos((theta + 2 * Math.PI) / 3) - b / 3;
        root3 = -2 * qSqrt * Math.cos((theta + 4 * Math.PI) / 3) - b / 3;
        return [root1, root2, root3];
      } else {
        tmp = Math.pow(Math.sqrt(-diff) + Math.abs(r), 1 / 3);
        rSign = r > 0 ? 1 : r < 0 ? -1 : 0;
        root = -rSign * (tmp + q / tmp) - b / 3;
        return [root];
      }
      return [];
    };

    BezierSegment.getQuadraticRoots = function(a, b, c) {
      var q, roots, signQ, tmp;
      roots = [];
      if (!a) {
        if (!b) return [];
        roots[0] = -c / b;
        return roots;
      }
      q = b * b - 4 * a * c;
      signQ = q > 0 ? 1 : q < 0 ? -1 : 0;
      if (signQ < 0) {
        return [];
      } else if (!signQ) {
        roots[0] = -b / (2 * a);
      } else {
        roots[0] = roots[1] = -b / (2 * a);
        tmp = Math.sqrt(q) / (2 * a);
        roots[0] -= tmp;
        roots[1] += tmp;
      }
      return roots;
    };

    return BezierSegment;

  })();

  CustomEase = function(p1x, p1y, p2x, p2y) {
    return {
      update: function(t, b, c, d) {
        var bez;
        bez = new BezierSegment({
          x: 0,
          y: 0
        }, {
          x: p1x,
          y: p1y
        }, {
          x: p2x,
          y: p2y
        }, {
          x: 1,
          y: 1
        });
        return c * bez.getYForX(t / d) + b;
      }
    };
  };

  Linear = {
    easeNone: new LinearEaseNone(),
    easeOut: new LinearEaseNone(),
    easeIn: new LinearEaseNone(),
    easeOutIn: new LinearEaseNone(),
    easeInOut: new LinearEaseNone()
  };

  Sine = {
    easeOut: new SineEaseOut(),
    easeIn: new SineEaseIn(),
    easeOutIn: new SineEaseOutIn(),
    easeInOut: new SineEaseInOut()
  };

  Cubic = {
    easeOut: new CubicEaseOut(),
    easeIn: new CubicEaseIn(),
    easeOutIn: new CubicEaseOutIn(),
    easeInOut: new CubicEaseInOut()
  };

  Quint = {
    easeOut: new QuintEaseOut(),
    easeIn: new QuintEaseIn(),
    easeOutIn: new QuintEaseOutIn(),
    easeInOut: new QuintEaseInOut()
  };

  Circ = {
    easeOut: new CircEaseOut(),
    easeIn: new CircEaseIn(),
    easeOutIn: new CircEaseOutIn(),
    easeInOut: new CircEaseInOut()
  };

  Quad = {
    easeOut: new QuadEaseOut(),
    easeIn: new QuadEaseIn(),
    easeOutIn: new QuadEaseOutIn(),
    easeInOut: new QuadEaseInOut()
  };

  Quart = {
    easeOut: new QuartEaseOut(),
    easeIn: new QuartEaseIn(),
    easeOutIn: new QuartEaseOutIn(),
    easeInOut: new QuartEaseInOut()
  };

  Expo = {
    easeOut: new ExpoEaseOut(),
    easeIn: new ExpoEaseIn(),
    easeOutIn: new ExpoEaseOutIn(),
    easeInOut: new ExpoEaseInOut()
  };

  Elastic = {
    easeOut: new ElasticEaseOut(),
    easeIn: new ElasticEaseIn(),
    easeOutIn: new ElasticEaseOutIn(),
    easeInOut: new ElasticEaseInOut(),
    easeOutWith: function(a, b) {
      return new ElasticEaseOutWith(a, b);
    },
    easeInWith: function(a, b) {
      return new ElasticEaseInWith(a, b);
    },
    easeInOutWith: function(a, b) {
      return new ElasticEaseInOutWith(a, b);
    },
    easeOutInWith: function(a, b) {
      return new ElasticEaseOutInWith(a, b);
    }
  };

  Back = {
    easeOut: new BackEaseOut(),
    easeIn: new BackEaseIn(),
    easeOutIn: new BackEaseOutIn(),
    easeInOut: new BackEaseInOut(),
    easeOutWith: function(s) {
      return new BackEaseOutWith(s);
    },
    easeInWith: function(s) {
      return new BackEaseInWith(s);
    },
    easeInOutWith: function(s) {
      return new BackEaseInOutWith(s);
    },
    easeOutInWith: function(s) {
      return new BackEaseOutInWith(s);
    }
  };

  Bounce = {
    easeOut: new BounceEaseOut(),
    easeIn: new BounceEaseIn(),
    easeOutIn: new BounceEaseOutIn(),
    easeInOut: new BounceEaseInOut()
  };

  CSS3Easing = {
    linear: "cubic-bezier(0.250, 0.250, 0.750, 0.750)",
    ease: "cubic-bezier(0.250, 0.100, 0.250, 1.000)",
    easeIn: "cubic-bezier(0.420, 0.000, 1.000, 1.000)",
    easeOut: "cubic-bezier(0.000, 0.000, 0.580, 1.000)",
    easeInBack: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
    easeInOutBack: "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
    easeInOut: "cubic-bezier(0.420, 0.000, 0.580, 1.000)",
    easeInQuad: "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
    easeInCubic: "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
    easeInQuart: "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
    easeInQuint: "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
    easeInSine: "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
    easeInExpo: "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
    easeInCirc: "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
    easeOutQuad: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
    easeOutCubic: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
    easeOutQuart: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
    easeOutQuint: "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
    easeOutSine: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
    easeOutExpo: "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
    easeOutCirc: "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
    easeOutBack: "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
    easeInOutQuad: "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
    easeInOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
    easeInOutQuart: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
    easeInOutQuint: "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
    easeInOutSine: "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
    easeInOutExpo: "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
    easeInOutCirc: "cubic-bezier(0.785, 0.135, 0.150, 0.860)"
  };

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

  window.jp.contents.easing.CustomEase = CustomEase;

  window.jp.contents.easing.CSS3Easing = CSS3Easing;

  window.jp.contents.easing.getEasingByString = getEasingByString;

  'use strict';

  CSS3Easing = jp.contents.easing.CSS3Easing;

  Linear = jp.contents.easing.Linear;

  APP_OS = Application.getOSInfo();

  APP_BROWSER = Application.getBrowserInfo();

  isIOS = Application.isiOS();

  isFIE = APP_BROWSER.name === BrowserName.IE && parseFloat(APP_BROWSER.version) < 9 ? true : false;

  requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
      return window.setTimeout(callback, 1000 / 60);
    };
  })();

  cancelAnimationFrame = (function() {
    return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.clearTimeout;
  })();

  VenderInfo = (function() {

    function VenderInfo() {}

    VenderInfo.cssVender = "";

    VenderInfo.vender = "";

    VenderInfo.animationEnd = "";

    VenderInfo.transformName = "";

    VenderInfo._init = function() {
      var dummyStyle, val, venders, _i, _len;
      dummyStyle = document.createElement('div').style;
      venders = 'webkitT,MozT,msT,OT,t'.split(',');
      for (_i = 0, _len = venders.length; _i < _len; _i++) {
        val = venders[_i];
        if (dummyStyle[val + 'ransform'] !== void 0) {
          VenderInfo.vender = val.substr(0, val.length - 1);
          VenderInfo.transformName = val + 'ransform';
          VenderInfo.animationEnd = VenderInfo.vender + "AnimationEnd";
          break;
        }
      }
      if (VenderInfo.vender !== "") {
        VenderInfo.cssVender = '-' + VenderInfo.vender.toLowerCase() + '-';
      } else {
        VenderInfo.cssVender = "transform";
      }
      if (VenderInfo.vender === "Moz") {
        VenderInfo.animationEnd = "animationend";
      } else if (VenderInfo.vender === "webkit") {
        VenderInfo.animationEnd = "webkitAnimationEnd";
      } else if (VenderInfo.vender === "ms") {
        VenderInfo.animationEnd = "MSAnimationEnd";
      }
    };

    return VenderInfo;

  })();

  VenderInfo._init();

  TweenState = {
    Initialized: 5,
    Playing: 1,
    Completed: 2,
    Stoped: 3,
    Finalized: 4,
    Overwrited: 5
  };

  LinkedList = (function() {

    function LinkedList(first) {
      this._first = null;
      this._last = null;
      if (first) {
        this._first = {
          elm: first,
          next: null
        };
        this._last = this._first;
      }
      this.length = this._first ? 1 : 0;
      return;
    }

    LinkedList.prototype.getFirst = function() {
      return this._first;
    };

    LinkedList.prototype.push = function(elm) {
      var obj;
      obj = {
        elm: elm,
        next: null
      };
      if (!this._first) {
        this._first = obj;
      } else {
        this._last.next = obj;
      }
      this._last = obj;
      ++this.length;
    };

    LinkedList.prototype.slice = function(elm) {
      var b, f;
      f = this._first;
      b = null;
      while (f) {
        if (f.elm === elm) {
          if (b) {
            b.next = f.next;
          } else {
            this._first = f.next;
          }
          if (f === this._last) this._last = b;
          --this.length;
        }
        b = f;
        f = f.next;
      }
    };

    LinkedList.prototype.shift = function() {
      var b;
      b = this._first;
      this._first = this.first.next;
      --this.length;
      return b;
    };

    LinkedList.prototype.map = function(func, param) {
      var f;
      f = this._first;
      while (f) {
        func.apply(f.elm, param);
        f = f.next;
      }
    };

    return LinkedList;

  })();

  Render = (function() {

    function Render() {}

    Render.count = 0;

    Render._spendTime = 0;

    Render._updaters = new LinkedList();

    Render.tick = null;

    Render.removeListener = function(updater) {
      Render._updaters.slice(updater);
    };

    Render.addListener = function(updater) {
      var f, find;
      f = Render._updaters.getFirst();
      find = false;
      while (f) {
        if (f.elm === updater) find = true;
        f = f.next;
      }
      if (!find) Render._updaters.push(updater);
    };

    Render.getState = function() {
      return Render._state;
    };

    Render._state = 0;

    Render._rid = -1;

    Render.start = function() {
      if (!(Render.tick != null)) {
        if (Date.now != null) {
          Render.tick = Render._tick;
        } else {
          Render.tick = Render._tickOld;
        }
      }
      Render._state = 1;
      Render.tick();
    };

    Render.stop = function() {
      cancelAnimationFrame(Render._rid);
    };

    Render._tick = function() {
      var ct, f, mt, updaters;
      mt = 0;
      ct = Date.now();
      updaters = Render._updaters;
      f = updaters.getFirst();
      while (f) {
        f.elm.update(ct);
        f = f.next;
      }
      Render._rid = requestAnimationFrame(Render.tick);
    };

    Render._tickOld = function() {
      var ct, f, mt, updaters;
      mt = 0;
      ct = new Date().getTime();
      updaters = Render._updaters;
      f = updaters.getFirst();
      while (f) {
        f.elm.update(ct);
        f = f.next;
      }
      Render._rid = requestAnimationFrame(Render.tick);
    };

    return Render;

  })();

  TSW = (function() {

    TSW._propList = {
      "x": {
        prefix: "translateX(",
        sufix: "px) ",
        index: 0
      },
      "y": {
        prefix: "translateY(",
        sufix: "px) ",
        index: 1
      },
      "z": {
        prefix: "translateZ(",
        sufix: "px) ",
        index: 2
      },
      "rotation": {
        prefix: "rotate(",
        sufix: "deg) ",
        index: 3
      },
      "rotationX": {
        prefix: "rotateX(",
        sufix: "deg) ",
        index: 4
      },
      "rotationY": {
        prefix: "rotateY(",
        sufix: "deg) ",
        index: 5
      },
      "rotationZ": {
        prefix: "rotateZ(",
        sufix: "deg) ",
        index: 6
      },
      "skewX": {
        prefix: "skewX(",
        sufix: "deg) ",
        index: 7
      },
      "skewY": {
        prefix: "skewY(",
        sufix: "deg) ",
        index: 8
      },
      "scaleX": {
        prefix: "scaleX(",
        sufix: ") ",
        index: 9
      },
      "scaleY": {
        prefix: "scaleY(",
        sufix: ") ",
        index: 10
      }
    };

    TSW._properties = ["x", "y", "z", "rotation", "rotationX", "rotationY", "rotationZ", "skewX", "skewY", "scaleX", "scaleY"];

    TSW._defaults = {
      x: 0,
      y: 0,
      z: 0,
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      skewY: 0
    };

    TSW._styleName = VenderInfo.cssVender + "transform";

    TSW.prototype._parsePropaties = function() {
      var m, owner, r, targetTransform;
      owner = this;
      m = owner._mapper;
      targetTransform = m._target.style[this._sname];
      if (isFIE || targetTransform === void 0) return;
      r = /(translateX\()([0-9||\.||-||e-]+)(px\))/;
      if (targetTransform.match(r)) {
        m.x = targetTransform.match(r)[2] * 1;
        owner.pushProperty("x");
      } else {
        m.x = NaN;
      }
      r = /(translateY\()([0-9||\.||-||e-]+)(px\))/;
      if (targetTransform.match(r)) {
        m.y = targetTransform.match(r)[2] * 1;
        owner.pushProperty("y");
      } else {
        m.y = NaN;
      }
      r = /(translateZ\()([0-9||\.||-||e-]+)(px\))/;
      if (targetTransform.match(r)) {
        m.z = targetTransform.match(r)[2] * 1;
        owner.pushProperty("z");
      } else {
        m.z = NaN;
      }
      r = /(rotate\()([0-9||\.||-||e-]+)(deg\))/;
      if (targetTransform.match(r)) {
        m.rotation = targetTransform.match(r)[2] * 1;
        owner.pushProperty("rotation");
      } else {
        m.rotation = NaN;
      }
      r = /(rotateX\()([0-9||\.||-||e-]+)(deg\))/;
      if (targetTransform.match(r)) {
        m.rotationX = targetTransform.match(r)[2] * 1;
        owner.pushProperty("rotationX");
      } else {
        m.rotationX = NaN;
      }
      r = /(rotateY\()([0-9||\.||-||e-]+)(deg\))/;
      if (targetTransform.match(r)) {
        m.rotationY = targetTransform.match(r)[2] * 1;
        owner.pushProperty("rotationY");
      } else {
        m.rotationY = NaN;
      }
      r = /(rotateZ\()([0-9||\.||-||e-]+)(deg\))/;
      if (targetTransform.match(r)) {
        m.rotationZ = targetTransform.match(r)[2] * 1;
        owner.pushProperty("rotationZ");
      } else {
        m.rotationZ = NaN;
      }
      r = /(skewX\()([0-9||\.||-||e-]+)(deg\))/;
      if (targetTransform.match(r)) {
        m.skewX = targetTransform.match(r)[2] * 1;
        owner.pushProperty("skewX");
      } else {
        m.skewX = NaN;
      }
      r = /(skewY\()([0-9||\.||-||e-]+)(deg\))/;
      if (targetTransform.match(r)) {
        m.skewY = targetTransform.match(r)[2] * 1;
        owner.pushProperty("skewY");
      } else {
        m.skewY = NaN;
      }
      r = /(scaleX\()([0-9||\.||-||e-]+)(\))/;
      if (targetTransform.match(r)) {
        m.scaleX = targetTransform.match(r)[2] * 1;
        owner.pushProperty("scaleX");
      } else {
        m.scaleX = NaN;
      }
      r = /(scaleY\()([0-9||\.||-||e-]+)(\))/;
      if (targetTransform.match(r)) {
        m.scaleY = targetTransform.match(r)[2] * 1;
        owner.pushProperty("scaleY");
      } else {
        m.scaleY = NaN;
      }
    };

    function TSW(mapper) {
      this._mapper = mapper;
      this._sname = TSW._styleName;
      this._props = TSW._propList;
      this._hasProperties = [null, null, null, null, null, null, null, null, null, null, null];
      this.toStyleString = function() {
        return "";
      };
      this._parsePropaties();
      return;
    }

    TSW.prototype.pushProperty = function(propname) {
      var index;
      index = TSW._propList[propname].index;
      this._hasProperties[index] = propname;
      this.toStyleString = this._toStyleString;
    };

    TSW.prototype._toStyleString = function() {
      var i, m, obj, p, trstr, v, val, _len, _ref;
      trstr = this._sname + ": ";
      m = this._mapper;
      p = this._props;
      _ref = this._hasProperties;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        val = _ref[i];
        if (val === null) continue;
        obj = p[val];
        v = ((m[val] * 1000) | 0) * .001;
        trstr += obj.prefix + v + obj.sufix;
      }
      return trstr + ";";
    };

    return TSW;

  })();

  FSW = (function() {

    FSW._propList = {
      "grayscale": {
        prefix: "grayscale(",
        sufix: "%) "
      },
      "sepia": {
        prefix: "sepia(",
        sufix: "%) "
      },
      "saturate": {
        prefix: "saturate(",
        sufix: "%) "
      },
      "hueRotate": {
        prefix: "hue-rotate(",
        sufix: "deg) "
      },
      "invert": {
        prefix: "invert(",
        sufix: "%) "
      },
      "brightness": {
        prefix: "brightness(",
        sufix: "%) "
      },
      "contrast": {
        prefix: "contrast(",
        sufix: "%) "
      },
      "blur": {
        prefix: "blur(",
        sufix: "px) "
      }
    };

    FSW._styleName = VenderInfo.cssVender + "filter";

    function FSW(mapper) {
      this._mapper = mapper;
      this._sname = FSW._styleName;
      this._pl = FSW._propList;
      this._hasProperties = [];
      this.toStyleString = function() {
        return "";
      };
      return;
    }

    FSW.prototype.pushProperty = function(propname) {
      if (this._hasProperties.indexOf(propname) > -1) return;
      this._hasProperties[this._hasProperties.length] = propname;
      this.toStyleString = this._toStyleString;
    };

    FSW.prototype._toStyleString = function() {
      var i, m, obj, p, trstr, v, val, _len, _ref;
      trstr = this._sname + ": ";
      m = this._mapper;
      p = this._pl;
      _ref = this._hasProperties;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        val = _ref[i];
        obj = p[val];
        v = m[val];
        trstr += obj.prefix + v + obj.sufix;
      }
      return trstr + ";";
    };

    return FSW;

  })();

  CSS2W = (function() {

    CSS2W._propList = {
      top: {
        prefix: "top:",
        sufix: "px",
        fixFunc: function(m, sufix) {
          var val;
          val = ((m.top * 1000) | 0) * .001;
          return val + sufix + ";";
        }
      },
      bottom: {
        prefix: "bottom:",
        sufix: "px",
        fixFunc: function(m, sufix) {
          var val;
          val = ((m.bottom * 1000) | 0) * .001;
          return val + sufix + ";";
        }
      },
      left: {
        prefix: "left:",
        sufix: "px;",
        fixFunc: function(m, sufix) {
          var val;
          val = ((m.left * 1000) | 0) * .001;
          return val + sufix + ";";
        }
      },
      right: {
        prefix: "right:",
        sufix: "px",
        fixFunc: function(m, sufix) {
          var val;
          val = ((m.right * 1000) | 0) * .001;
          return val + sufix + ";";
        }
      },
      width: {
        prefix: "width:",
        sufix: "px",
        fixFunc: function(m, sufix) {
          var val;
          val = ((m.width * 1000) | 0) * .001;
          return val + sufix + ";";
        }
      },
      height: {
        prefix: "height:",
        sufix: "px",
        fixFunc: function(m, sufix) {
          var val;
          val = ((m.height * 1000) | 0) * .001;
          return val + sufix + ";";
        }
      },
      margin: {
        prefix: "margin:",
        sufix: "px",
        fixFunc: function(m, sufix) {
          var val;
          val = ((m.margin * 1000) | 0) * .001;
          return val + sufix + ";";
        }
      },
      marginTop: {
        prefix: "margin-top:",
        sufix: "px",
        fixFunc: function(m, sufix) {
          var val;
          val = ((m.marginTop * 1000) | 0) * .001;
          return val + sufix + ";";
        }
      },
      marginBottom: {
        prefix: "margin-bottom:",
        sufix: "px",
        fixFunc: function(m, sufix) {
          var val;
          val = ((m.marginBottom * 1000) | 0) * .001;
          return val + sufix + ";";
        }
      },
      marginLeft: {
        prefix: "margin-left:",
        sufix: "px",
        fixFunc: function(m, sufix) {
          var val;
          val = ((m.marginLeft * 1000) | 0) * .001;
          return val + sufix + ";";
        }
      },
      marginRight: {
        prefix: "margin-right:",
        sufix: "px",
        fixFunc: function(m, sufix) {
          var val;
          val = ((m.marginRight * 1000) | 0) * .001;
          return val + sufix + ";";
        }
      },
      alpha: {
        prefix: "opacity:",
        sufix: "",
        fixFunc: function(m, sufix) {
          var val;
          val = ((m.alpha * 1000) | 0) * .001;
          return val + ";";
        }
      },
      backgroundPosition: {
        prefix: "background-position:",
        sufix: "px",
        fixFunc: function(m, sufix) {
          var vx, vy;
          vx = ((m.backgroundPositionX * 1000) | 0) * .001;
          vy = ((m.backgroundPositionY * 1000) | 0) * .001;
          return vx + sufix + " " + vy + sufix + ";";
        }
      },
      visible: {
        prefix: "visibility:",
        sufix: "",
        fixFunc: function(m, sufix) {
          if (m.visible) {
            return "visible;";
          } else {
            return "hidden;";
          }
        }
      },
      display: {
        prefix: "display:",
        sufix: "",
        fixFunc: function(m, sufix) {
          return m.display + ";";
        }
      }
    };

    CSS2W.init = function() {
      var bn, ver;
      bn = APP_BROWSER.name;
      ver = APP_BROWSER.version;
      if (bn !== "ie") {
        return;
      } else if (bn === "ie" && ver > 8) {
        return;
      }
      if (ver >= 8) {
        return CSS2W._propList.alpha = {
          prefix: "zoom:1;-ms-filter:\"alpha(opacity=",
          sufix: "",
          fixFunc: function(m, sufix) {
            var val;
            val = ((m.alpha * 1000) | 0) * .1;
            return val + ")\";";
          }
        };
      } else {
        return CSS2W._propList.alpha = {
          prefix: "zoom:1;filter:alpha(opacity=",
          sufix: "",
          fixFunc: function(m, sufix) {
            var val;
            val = ((m.alpha * 1000) | 0) * .1;
            return val + ");";
          }
        };
      }
    };

    CSS2W.prototype._parsePropaties = function() {
      var arr, m, owner, px, py, target;
      owner = this;
      m = owner._mapper;
      target = m._target;
      if (target.style) {
        if (!isNaN(parseFloat(target.style.opacity))) {
          m.alpha = parseFloat(target.style.opacity);
          owner.pushProperty("alpha");
        }
        if (!isNaN(parseFloat(target.style.top))) {
          m.top = parseFloat(target.style.top);
          owner.pushProperty("top");
        }
        if (!isNaN(parseFloat(target.style.bottom))) {
          m.bottom = parseFloat(target.style.bottom);
          owner.pushProperty("bottom");
        }
        if (!isNaN(parseFloat(target.style.left))) {
          m.left = parseFloat(target.style.left);
          owner.pushProperty("left");
        }
        if (!isNaN(parseFloat(target.style.right))) {
          m.right = parseFloat(target.style.right);
          owner.pushProperty("right");
        }
        if (!isNaN(parseFloat(target.style.width))) {
          m.width = parseFloat(target.style.width);
          owner.pushProperty("width");
        }
        if (!isNaN(parseFloat(target.style.height))) {
          m.height = parseFloat(target.style.height);
          owner.pushProperty("height");
        }
        if (!isNaN(parseFloat(target.style.marginTop))) {
          m.marginTop = parseFloat(target.style.marginTop);
          owner.pushProperty("marginTop");
        }
        if (!isNaN(parseFloat(target.style.marginBottom))) {
          m.marginBottom = parseFloat(target.style.marginBottom);
          owner.pushProperty("marginBottom");
        }
        if (!isNaN(parseFloat(target.style.marginRight))) {
          m.marignRight = parseFloat(target.style.marginRight);
          owner.pushProperty("marignRight");
        }
        if (!isNaN(parseFloat(target.style.marginLeft))) {
          m.marginLeft = parseFloat(target.style.marginLeft);
          owner.pushProperty("marignLeft");
        }
        if (target.style.backgroundPosition !== "") {
          m.backgroundPositionY = 0;
          m.backgroundPositionX = 0;
          arr = target.style.backgroundPosition.split(" ");
          px = parseFloat(arr[0]);
          py = parseFloat(arr[1]);
          if (!isNaN(px)) m.backgroundPositionX = px;
          if (!isNaN(px)) m.backgroundPositionY = py;
          owner.pushProperty("backgroundPosition");
        }
      }
    };

    function CSS2W(mapper) {
      var name;
      this._mapper = mapper;
      this._hasProperties = [];
      this._pl = CSS2W._propList;
      this._sufixes = {};
      for (name in this._pl) {
        this._sufixes[name] = this._pl[name].sufix;
      }
      this.toStyleString = function() {
        return "";
      };
      this._parsePropaties();
      return;
    }

    CSS2W.prototype.changeUnit = function(props) {
      var before, sufix, val;
      before = {};
      for (val in props) {
        if (this._sufixes[val] !== void 0) {
          sufix = props[val];
          before[val] = this._sufixes[val];
          this._sufixes[val] = sufix;
        }
      }
      return before;
    };

    CSS2W.prototype.pushProperty = function(propname) {
      if (propname === "backgroundPositionY" || propname === "backgroundPositionX" || propname === "backgroundPosition") {
        if (isNaN(this._mapper.backgroundPositionX)) {
          this._mapper.backgroundPositionX = 0;
        }
        if (isNaN(this._mapper.backgroundPositionY)) {
          this._mapper.backgroundPositionY = 0;
        }
        propname = "backgroundPosition";
      }
      if (this._hasProperties.indexOf(propname) > -1) return;
      this._hasProperties[this._hasProperties.length] = propname;
      this.toStyleString = this._toStyleString;
    };

    CSS2W.prototype._toStyleString = function() {
      var i, m, obj, p, s, trstr, v, val, _len, _ref;
      trstr = "";
      m = this._mapper;
      p = this._pl;
      s = this._sufixes;
      _ref = this._hasProperties;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        val = _ref[i];
        obj = p[val];
        v = obj.fixFunc(m, s[val]);
        trstr += obj.prefix + v;
      }
      return trstr;
    };

    return CSS2W;

  })();

  CSS2W.init();

  PropertyMapper = (function() {

    PropertyMapper._RADIAN = Math.PI / 180;

    PropertyMapper._targets = new LinkedList();

    PropertyMapper._defaults = {
      x: 0,
      y: 0,
      z: 0,
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      skewY: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      margin: 0,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      backgroundPositionX: 0,
      backgroundPositionY: 0,
      alpha: 1,
      grayscale: 0,
      sepia: 0,
      saturate: 100,
      hueRotate: 0,
      invert: 0,
      brightness: 100,
      contrast: 100,
      blur: 0
    };

    PropertyMapper.getMapper = function(target) {
      var f, obj;
      f = PropertyMapper._targets.getFirst();
      while (f) {
        if (f.elm._target === target) return f.elm;
        f = f.next;
      }
      if (target.style) {
        obj = new PropertyMapper(target);
      } else {
        obj = new ObjectMapper(target);
      }
      PropertyMapper._targets.push(obj);
      return obj;
    };

    function PropertyMapper(target) {
      if (!target) throw new Error("target が未設定");
      this._target = target;
      this._tweens = null;
      this.x = NaN;
      this.y = NaN;
      this.z = NaN;
      this.rotation = NaN;
      this.rotationX = NaN;
      this.rotationY = NaN;
      this.rotationZ = NaN;
      this.scaleX = NaN;
      this.scaleY = NaN;
      this.skewX = NaN;
      this.skewY = NaN;
      this.grayscale = NaN;
      this.sepia = NaN;
      this.saturate = NaN;
      this.hueRotate = NaN;
      this.invert = NaN;
      this.brightness = NaN;
      this.contrast = NaN;
      this.blur = NaN;
      this.alpha = NaN;
      this.top = NaN;
      this.bottom = NaN;
      this.left = NaN;
      this.right = NaN;
      this.width = NaN;
      this.height = NaN;
      this.margin = NaN;
      this.marginLeft = NaN;
      this.marginTop = NaN;
      this.marginBottom = NaN;
      this.marginRight = NaN;
      this.backgroundPositionX = NaN;
      this.backgroundPositionY = NaN;
      this.visible = "NONE";
      this.display = "";
      this.transitionStr = "";
      this._trWrapper = new TSW(this);
      this._flWrapper = new FSW(this);
      this._css2W = new CSS2W(this);
      if (isFIE) {
        this.registerTween = this._registerTweenForFIE;
        this.applyStyles = this._applyStylesForFIE;
      } else {
        this.registerTween = this._registerTween;
        this.applyStyles = this._applyStyles;
      }
      return;
    }

    PropertyMapper.prototype._registerTweenForFIE = function(tween, fixOnly) {
      var c, f, find, fp, from, name, tl, to;
      if (fixOnly == null) fixOnly = false;
      to = tween._to;
      from = tween._from;
      c = {};
      for (name in to) {
        if (name === "top" || name === "bottom" || name === "left" || name === "right" || name === "width" || name === "height" || name === "alpha" || name === "margin" || name === "marginTop" || name === "marginBottom" || name === "marginRight" || name === "marginLeft" || name === "backgroundPositionX" || name === "backgroundPositionY") {
          this._css2W.pushProperty(name);
          tl = this._tweens || (this._tweens = new LinkedList());
          fp = 0;
          if (from && !isNaN(from[name])) {
            fp = from[name];
          } else {
            fp = !isNaN(this[name]) ? this[name] : PropertyMapper._defaults[name];
          }
          c[name] = to[name] - fp;
          from[name] = fp;
          if (fixOnly) continue;
          f = tl.getFirst();
          find = false;
          while (f) {
            if (f.elm.name === name) {
              find = true;
              f.elm.tween = tween;
              break;
            }
            f = f.next;
          }
          if (!find) {
            tl.push({
              name: name,
              tween: tween
            });
          }
        }
      }
      Render.addListener(this);
      return c;
    };

    PropertyMapper.prototype._registerTween = function(tween, fixOnly) {
      var c, f, find, fp, from, name, tl, to;
      if (fixOnly == null) fixOnly = false;
      to = tween._to;
      from = tween._from;
      c = {};
      for (name in to) {
        if (name === "x" || name === "y" || name === "z" || name === "rotation" || name === "rotationX" || name === "rotationY" || name === "rotationZ" || name === "skewX" || name === "skewY" || name === "scaleX" || name === "scaleY") {
          this._trWrapper.pushProperty(name);
          fp = 0;
          if (from && !isNaN(from[name])) {
            fp = from[name];
          } else {
            fp = !isNaN(this[name]) ? this[name] : PropertyMapper._defaults[name];
          }
          from[name] = fp;
          c[name] = to[name] - fp;
          tl = this._tweens || (this._tweens = new LinkedList());
          if (fixOnly) continue;
          f = tl.getFirst();
          find = false;
          if (fixOnly) continue;
          while (f) {
            if (f.elm.name === name) {
              find = true;
              f.elm.tween = tween;
              break;
            }
            f = f.next;
          }
          if (!find) {
            tl.push({
              name: name,
              tween: tween
            });
          }
        } else if (name === "top" || name === "bottom" || name === "left" || name === "right" || name === "width" || name === "height" || name === "alpha" || name === "margin" || name === "marginTop" || name === "marginBottom" || name === "marginRight" || name === "marginLeft" || name === "backgroundPositionX" || name === "backgroundPositionY") {
          this._css2W.pushProperty(name);
          tl = this._tweens || (this._tweens = new LinkedList());
          fp = 0;
          if (from && !isNaN(from[name])) {
            fp = from[name];
          } else {
            fp = !isNaN(this[name]) ? this[name] : PropertyMapper._defaults[name];
          }
          c[name] = to[name] - fp;
          from[name] = fp;
          if (fixOnly) continue;
          f = tl.getFirst();
          find = false;
          while (f) {
            if (f.elm.name === name) {
              find = true;
              f.elm.tween = tween;
              break;
            }
            f = f.next;
          }
          if (!find) {
            tl.push({
              name: name,
              tween: tween
            });
          }
        } else if (name === "grayscale" || name === "sepia" || name === "saturate" || name === "hueRotate" || name === "invert" || name === "brightness" || name === "contrast" || name === "blur") {
          this._flWrapper.pushProperty(name);
          fp = 0;
          if (from && !isNaN(from[name])) {
            fp = from[name];
          } else {
            fp = !isNaN(this[name]) ? this[name] : PropertyMapper._defaults[name];
          }
          from[name] = fp;
          c[name] = to[name] - fp;
          tl = this._tweens || (this._tweens = new LinkedList());
          if (fixOnly) continue;
          f = tl.getFirst();
          find = false;
          while (f) {
            if (f.elm.name === name) {
              find = true;
              f.elm.tween = tween;
              break;
            }
            f = f.next;
          }
          if (!find) {
            tl.push({
              name: name,
              tween: tween
            });
          }
        }
      }
      Render.addListener(this);
      return c;
    };

    PropertyMapper.prototype._applyStyles = function() {
      this._target.style.cssText = this.transitionStr + this._css2W.toStyleString() + this._flWrapper.toStyleString() + this._trWrapper.toStyleString();
    };

    PropertyMapper.prototype._applyStylesForFIE = function() {
      this._target.style.cssText = this._css2W.toStyleString();
    };

    PropertyMapper.prototype.changeUnit = function(props) {
      return this._css2W.changeUnit(props);
    };

    PropertyMapper.prototype.applyProperties = function(properties, applyStyle) {
      var change, name;
      change = false;
      for (name in properties) {
        if (this[name] !== null) {
          change = true;
          if (name === "top" || name === "bottom" || name === "left" || name === "right" || name === "width" || name === "height" || name === "alpha" || name === "margin" || name === "marginTop" || name === "marginBottom" || name === "marginRight" || name === "marginLeft" || name === "backgroundPositionX" || name === "backgroundPositionY" || name === "visible" || name === "display") {
            this._css2W.pushProperty(name);
          } else if (name === "x" || name === "y" || name === "z" || name === "rotation" || name === "rotationX" || name === "rotationY" || name === "rotationZ" || name === "skewX" || name === "skewY" || name === "scaleX" || name === "scaleY") {
            this._trWrapper.pushProperty(name);
          } else if (name === "grayscale" || name === "sepia" || name === "saturate" || name === "hueRotate" || name === "invert" || name === "brightness" || name === "contrast" || name === "blur") {
            this._flWrapper.pushProperty(name);
          }
          this[name] = properties[name];
        }
      }
      if (change && applyStyle) this.applyStyles();
    };

    PropertyMapper.prototype.update = function(ct) {
      var f, mcount, tw;
      f = this._tweens ? this._tweens.getFirst() : null;
      while (f) {
        tw = f.elm.tween;
        if (!tw) {
          f = f.next;
          continue;
        }
        if (tw._state === TweenState.Completed || tw._state === TweenState.Playing) {
          tw.update(ct, f.elm.name);
        }
        f = f.next;
      }
      this.applyStyles();
      f = this._tweens ? this._tweens.getFirst() : null;
      mcount = 0;
      while (f) {
        tw = f.elm.tween;
        if (!tw) {
          f = f.next;
          continue;
        }
        if (tw._state === TweenState.Completed) {
          tw.tickUpdate();
          f.elm.tween = null;
          tw.finalize();
          mcount = 1;
        } else if (tw._state === TweenState.Playing) {
          tw.tickUpdate();
          mcount = 1;
        } else if (tw._state === TweenState.Stoped) {
          f.elm.tween = null;
        } else if (tw._state === TweenState.Initialized) {
          mcount = 1;
        }
        f = f.next;
      }
      if (mcount === 0) Render.removeListener(this);
    };

    PropertyMapper.prototype.getTransformString = function() {
      return this._trWrapper.toStyleString();
    };

    PropertyMapper.prototype.getStyleString = function() {
      return this._css2W.toStyleString();
    };

    return PropertyMapper;

  })();

  ObjectMapper = (function() {

    __extends(ObjectMapper, PropertyMapper);

    function ObjectMapper(target) {
      this._target = target;
      this._tweens = null;
    }

    ObjectMapper.prototype.applyStyles = function() {
      var f, fn, n;
      f = this._tweens.getFirst();
      while (f) {
        n = f.elm.name;
        this._target[n] = this[n];
        if ((f.elm.tween != null) && f.elm.hasUpdater) {
          fn = this._target.updaters[n];
          fn.apply(this._target, [this[n]]);
        }
        f = f.next;
      }
    };

    ObjectMapper.prototype.registerTween = function(tween, fixOnly) {
      var c, f, find, fp, from, hasUpdater, name, to, tw;
      if (fixOnly == null) fixOnly = false;
      to = tween._to;
      from = tween._from;
      c = {};
      tw = this._tweens || (this._tweens = new LinkedList());
      for (name in to) {
        fp = 0;
        if (from && !isNaN(from[name])) {
          fp = from[name];
        } else if (!isNaN(this._target[name])) {
          fp = this._target[name];
        } else {
          fp = 0;
        }
        c[name] = to[name] - fp;
        this[name] = fp;
        from[name] = fp;
        f = tw.getFirst();
        find = false;
        hasUpdater = false;
        if (this._target.updaters && this._target.updaters[name]) {
          hasUpdater = true;
        }
        while (f) {
          if (f.elm.name === name) {
            find = true;
            f.elm.tween = tween;
            break;
          }
          f = f.next;
        }
        if (!find) {
          tw.push({
            name: name,
            tween: tween,
            hasUpdater: hasUpdater
          });
        }
      }
      if (fixOnly) return c;
      Render.addListener(this);
      return c;
    };

    ObjectMapper.prototype.update = function(ct) {
      var f, tw;
      f = this._tweens.getFirst();
      while (f) {
        tw = f.elm.tween;
        if (!tw) {
          f = f.next;
          continue;
        }
        if (tw._state === TweenState.Completed || tw._state === TweenState.Playing) {
          tw.update(ct, f.elm.name);
        }
        f = f.next;
      }
      this.applyStyles();
      this.fixTweens();
    };

    ObjectMapper.prototype.fixTweens = function() {
      var f, mcount, tw;
      f = this._tweens.getFirst();
      mcount = 0;
      while (f) {
        tw = f.elm.tween;
        if (!tw) {
          f = f.next;
          continue;
        }
        if (tw._state === TweenState.Completed) {
          f.elm.tween = null;
          tw.tickUpdate();
          tw.finalize();
          mcount = 1;
        } else if (tw._state === TweenState.Playing) {
          tw.tickUpdate();
          mcount = 1;
        } else if (tw._state === TweenState.Stoped) {
          f.elm.tween = null;
        } else if (tw._state === TweenState.Initialized) {
          mcount = 1;
        }
        f = f.next;
      }
      if (mcount === 0) Render.removeListener(this);
    };

    return ObjectMapper;

  })();

  ITween = (function() {

    function ITween() {}

    ITween.prototype.update = function(currentTime, prop) {};

    ITween.prototype.play = function() {};

    ITween.prototype.stop = function() {};

    ITween.prototype.finalize = function() {};

    ITween.prototype.clone = function() {};

    ITween.prototype.getDuration = function() {
      return this._duration / 1000;
    };

    ITween.prototype.onComplete = function(func) {
      this._onComplete = func;
    };

    ITween.prototype.onUpdate = function(func) {
      this._onUpdate = func;
    };

    ITween.prototype.onPlay = function(func) {
      this._onPlay = func;
    };

    ITween.prototype.onStop = function(func) {
      this._onStop = func;
    };

    ITween.prototype.getState = function() {
      return this._state;
    };

    ITween.prototype.gotoAndStop = function(parsent) {};

    ITween.prototype.gotoAndPlay = function(parsent) {};

    ITween.prototype.slice = function(from, to) {};

    ITween.prototype.startRender = function() {
      if (Render.getState() === 0) Render.start();
    };

    return ITween;

  })();

  ITweenGroup = (function() {

    __extends(ITweenGroup, ITween);

    function ITweenGroup() {
      ITweenGroup.__super__.constructor.apply(this, arguments);
    }

    ITweenGroup.prototype.getTweens = function() {
      return this._tweens;
    };

    ITweenGroup.prototype.getLength = function() {
      return this._tweens.length;
    };

    return ITweenGroup;

  })();

  ICSSTween = (function() {

    __extends(ICSSTween, ITween);

    function ICSSTween() {
      ICSSTween.__super__.constructor.apply(this, arguments);
    }

    ICSSTween.prototype.finalize = function() {
      this._state = TweenState.Finalized;
      if (this._onComplete) this._onComplete(this);
    };

    return ICSSTween;

  })();

  BasicTween = (function() {

    __extends(BasicTween, ITween);

    function BasicTween(target, to, from, duration, easing) {
      this._onComplete = null;
      this._onPlay = null;
      this._onUpdate = null;
      this._onStop = null;
      this._state = TweenState.Initialized;
      this._from = from || {};
      this._to = to;
      this._duration = duration * 1000;
      this._easing = easing || TrTween.DefaultEasing;
      this._target = target;
      this._mapper = PropertyMapper.getMapper(target);
      return;
    }

    BasicTween.prototype.play = function() {
      this._state = TweenState.Playing;
      this.register(false);
      this.startRender();
      if (this._onPlay) this._onPlay(this);
    };

    BasicTween.prototype.register = function(register) {
      this._c = this._mapper.registerTween(this, register);
      this._st = Date.now != null ? Date.now() : new Date().getTime();
      this._endTime = this._st + this._duration;
    };

    BasicTween.prototype.update = function(ct, prop) {
      if (ct >= this._endTime) {
        this._mapper[prop] = this._easing.update(this._duration, this._from[prop], this._c[prop], this._duration);
        this._state = TweenState.Completed;
        return;
      }
      this._mapper[prop] = this._easing.update(ct - this._st, this._from[prop], this._c[prop], this._duration);
    };

    BasicTween.prototype.tickUpdate = function() {
      if (this._onUpdate) this._onUpdate(this);
    };

    BasicTween.prototype.stop = function() {
      this._state = TweenState.Stoped;
      if (this._onStop) this._onStop(this);
    };

    BasicTween.prototype.finalize = function() {
      this._state = TweenState.Finalized;
      if (this._onComplete) this._onComplete(this);
    };

    BasicTween.prototype.clone = function() {
      return new BasicTween(this._target, this._tp, this._from, this._duration / 1000, this._easing);
    };

    BasicTween.prototype.slice = function(from, to) {
      return new SlicedTween(from, to, this);
    };

    BasicTween.prototype.gotoAndStop = function(parsent) {
      var ct, val;
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      if (parsent === 1 && this._state === TweenState.Completed || parsent === 0 && this._state === TweenState.Initialized) {
        return;
      }
      this._st = Date.now != null ? Date.now() : new Date().getTime();
      this._endTime = this._st + this._duration;
      ct = this._st + this._duration * parsent;
      if (!(this._c != null)) this._c = this._mapper.registerTween(this, true);
      if (parsent === 0) {
        if (this._state !== TweenState.Initialized) {
          for (val in this._to) {
            this.update(ct, val);
            this._mapper.applyStyles();
          }
          this._c = null;
          this._state = TweenState.Initialized;
        }
        return;
      } else if (parsent === 1) {
        if (this._state !== TweenState.Completed) {
          for (val in this._to) {
            this.update(ct, val);
            this._mapper.applyStyles();
          }
          this._c = null;
          this._state = TweenState.Completed;
        }
        return;
      } else {
        this._state = TweenState.Playing;
        for (val in this._to) {
          this.update(ct, val);
          this._mapper.applyStyles();
        }
      }
    };

    BasicTween.prototype.gotoAndPlay = function(parsent) {
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      this._state = TweenState.Playing;
      this._c = this._mapper.registerTween(this);
      this._st = Date.now != null ? Date.now() : new Date().getTime();
      this._st = this._st - (this._duration * parsent);
      this._endTime = this._st + this._duration;
      if (Render.getState() === 0) Render.start();
      if (this._onPlay) this._onPlay(this);
    };

    return BasicTween;

  })();

  DelayTween = (function() {

    __extends(DelayTween, ITween);

    function DelayTween(tween, delay) {
      var _this = this;
      if (delay == null) delay = 0;
      this._delay = delay * 1000;
      this._tween = tween;
      this._tween.onComplete(function() {
        return _this._onTweenComplete();
      });
      this._tid = -1;
      this._state = TweenState.Initialized;
      return;
    }

    DelayTween.prototype.play = function() {
      var _this = this;
      this._state = TweenState.Playing;
      this._tid = setTimeout(function() {
        _this._tween.play();
      }, this._delay);
      if (this._onPlay) this._onPlay(this);
    };

    DelayTween.prototype.update = function(ct) {};

    DelayTween.prototype.finalize = function() {
      this._state = TweenState.Finalized;
      if (this._onComplete) this._onComplete(this);
    };

    DelayTween.prototype.stop = function() {
      clearTimeout(this._tid);
      if (this._tween) this._tween.stop();
    };

    DelayTween.prototype._onTweenComplete = function() {
      this.finalize();
    };

    DelayTween.prototype.getDuration = function() {
      return this._delay / 1000 + this._tween.getDuration();
    };

    DelayTween.prototype.getState = function() {
      return this._tween.getState();
    };

    DelayTween.prototype.clone = function() {
      return new DelayTween(this._tween.clone(), this._delay / 1000);
    };

    DelayTween.prototype.gotoAndStop = function(parsent) {
      var dp, p, td, tp;
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      td = this._tween.getDuration() * 1000;
      p = this._delay + td;
      dp = this._delay / p;
      tp = td / p;
      if (parsent > dp) {
        this._tween.gotoAndStop((parsent - dp) / tp);
      } else {
        this._tween.gotoAndStop(0);
      }
    };

    DelayTween.prototype.gotoAndPlay = function(parsent) {
      var dp, p, td, tp;
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      td = this._tween.getDuration() * 1000;
      p = this._delay + td;
      dp = this._delay / p;
      tp = td / p;
      if (parsent > dp) {
        this._tween.gotoAndPlay((parsent - dp) / tp);
      } else {
        this._delay = ((dp - parsent) / dp) * this._delay;
        this.play();
      }
    };

    return DelayTween;

  })();

  BezierTween = (function() {

    __extends(BezierTween, BasicTween);

    function BezierTween(target, to, from, cp, duration, easing) {
      BezierTween.__super__.constructor.call(this, target, to, from, duration, easing);
      this._t = 0;
      this._cp = cp;
      return;
    }

    BezierTween.prototype.play = function() {
      BezierTween.__super__.play.call(this);
      this._t = 0;
    };

    BezierTween.prototype.update = function(ct, prop) {
      var tp;
      this._t = this._easing.update(ct - this._st, 0, 1, this._duration);
      if (ct >= this._endTime) {
        this._t = this._easing.update(this._duration, 0, 1, this._duration);
        this._state = TweenState.Completed;
      }
      tp = 1 - this._t;
      this._mapper[prop] = this._t * this._t * this._to[prop] + 2 * this._t * tp * this._cp[prop] + tp * tp * this._from[prop];
    };

    BezierTween.prototype.clone = function() {
      return new BezierTween(this._target, this._to, this._from, this._cp, this._duration, this._easing);
    };

    return BezierTween;

  })();

  RepeatTween = (function() {

    __extends(RepeatTween, ITween);

    function RepeatTween(tween, repeatCount) {
      var _this = this;
      this._count = repeatCount < 0 ? 0 : repeatCount;
      this._tween = tween;
      this._state = TweenState.Initialized;
      this._ct = 0;
      this._tween.onComplete(function() {
        return _this._repeatPlay();
      });
      this._duration = this._getDuration();
    }

    RepeatTween.prototype.play = function() {
      this._state = TweenState.Playing;
      return this._tween.play();
    };

    RepeatTween.prototype._repeatPlay = function() {
      if (this._count === 0 || ++this._ct < this._count) {
        return this._tween.play();
      } else {
        return this.finalize();
      }
    };

    RepeatTween.prototype.stop = function() {
      if (this._tween) this._tween.stop();
      this.finalize();
    };

    RepeatTween.prototype.getDuration = function() {
      return this._duration;
    };

    RepeatTween.prototype._getDuration = function() {
      if (this._count === 0) {
        return Infinity;
      } else {
        return this._tween.getDuration() * this._count;
      }
    };

    RepeatTween.prototype.finalize = function() {
      this._state = TweenState.Finalized;
      if (this._onComplete) this._onComplete(this);
    };

    RepeatTween.prototype.clone = function() {
      return new RepeatTween(this._tween.clone(), this._count);
    };

    RepeatTween.prototype.gotoAndStop = function(parsent) {
      var r, s, td, tp;
      if (this._count === 0) throw new Error("ないよ");
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      tp = this._duration * parsent;
      td = this._tween.getDuration();
      r = ~~(tp / td) - 1;
      s = tp - (r * td);
      this._ct = r;
      this._tween.gotoAndStop(s / td);
    };

    RepeatTween.prototype.gotoAndPlay = function(parsent) {
      var r, s, td, tp;
      if (this._count === 0) throw new Error("ないよ");
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      tp = this._duration * parsent;
      td = this._tween.getDuration();
      r = ~~(tp / td) - 1;
      s = tp - (r * td);
      this._ct = r;
      this._tween.gotoAndPlay(s / td);
    };

    return RepeatTween;

  })();

  ParallelTween = (function() {

    __extends(ParallelTween, ITweenGroup);

    function ParallelTween(tweens) {
      this._tweens = tweens;
      this._state = TweenState.Initialized;
      this._duration = this._getDuration();
      return;
    }

    ParallelTween.prototype.play = function() {
      var val, _i, _len, _ref;
      var _this = this;
      this._state = TweenState.Playing;
      _ref = this._tweens;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        val = _ref[_i];
        val._state = TweenState.Playing;
        val.onComplete(function() {
          return _this._onChildComplete();
        });
        val.play();
      }
    };

    ParallelTween.prototype.finalize = function() {
      this._state = TweenState.Finalized;
      if (this._onComplete) this._onComplete(this);
    };

    ParallelTween.prototype.stop = function() {
      var val, _i, _len, _ref;
      _ref = this._tweens;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        val = _ref[_i];
        val.stop();
      }
      this._state = TweenState.Stoped;
    };

    ParallelTween.prototype._onChildComplete = function() {
      var val, _i, _len, _ref;
      _ref = this._tweens;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        val = _ref[_i];
        if (val._state !== TweenState.Finalized) return;
      }
      this.finalize();
    };

    ParallelTween.prototype.getDuration = function() {
      return this._duration;
    };

    ParallelTween.prototype._getDuration = function() {
      var dur, max, val, _i, _len, _ref;
      max = -1;
      _ref = this._tweens;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        val = _ref[_i];
        dur = val.getDuration();
        max = dur > max ? dur : max;
      }
      return max;
    };

    ParallelTween.prototype.clone = function() {
      var i, tweens, val, _len, _ref;
      tweens = [];
      _ref = this._tweens;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        val = _ref[i];
        tweens[i] = val.clone();
      }
      return new ParallelTween(tweens);
    };

    ParallelTween.prototype.gotoAndStop = function(parsent) {
      var p, st, td, val, _i, _len, _ref;
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      if (parsent === 1 && this._state === TweenState.Completed || parsent === 0 && this._state === TweenState.Initialized) {
        return;
      }
      p = this.getDuration();
      st = p * parsent;
      _ref = this._tweens;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        val = _ref[_i];
        td = val.getDuration();
        val.gotoAndStop(st / td);
      }
      if (parsent === 1) {
        if (this._state !== TweenState.Completed) {
          return this._state = TweenState.Completed;
        }
      } else if (parsent === 0) {
        if (this._state !== TweenState.Initialized) {
          return this._state = TweenState.Initialized;
        }
      } else {
        return this._state = TweenState.Playing;
      }
    };

    ParallelTween.prototype.gotoAndPlay = function(parsent) {
      var p, st, td, val, _i, _len, _ref;
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      p = this.getDuration();
      st = p * parsent;
      _ref = this._tweens;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        val = _ref[_i];
        td = val.getDuration();
        val.gotoAndPlay(st / td);
      }
    };

    return ParallelTween;

  })();

  SerialTween = (function() {

    __extends(SerialTween, ITweenGroup);

    function SerialTween(tweens) {
      this._tweens = tweens;
      this._current = null;
      this._index = 0;
      this._state = TweenState.Initialized;
      this._duration = this._getDuration();
      return;
    }

    SerialTween.prototype.play = function() {
      this._state = TweenState.Playing;
      this._current = null;
      this._index = 0;
      this._playTween();
    };

    SerialTween.prototype.stop = function() {
      this._state = TweenState.Stoped;
      if (this._current) this._current.stop();
      if (this._onStop) this._onStop(this);
    };

    SerialTween.prototype._playTween = function() {
      var _this = this;
      this._current = this._tweens[this._index];
      this._current.onComplete(function() {
        return _this._onChildComplete();
      });
      this._current.play();
    };

    SerialTween.prototype._onChildComplete = function() {
      if (++this._index >= this._tweens.length) {
        this.finalize();
      } else {
        this._playTween();
      }
    };

    SerialTween.prototype.finalize = function() {
      this._state = TweenState.Finalized;
      if (this._onComplete) this._onComplete(this);
    };

    SerialTween.prototype.getDuration = function() {
      return this._duration;
    };

    SerialTween.prototype._getDuration = function() {
      var dur, val, _i, _len, _ref;
      dur = 0;
      _ref = this._tweens;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        val = _ref[_i];
        dur += val.getDuration();
      }
      return dur;
    };

    SerialTween.prototype.clone = function() {
      var i, tweens, val, _len, _ref;
      tweens = [];
      _ref = this._tweens;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        val = _ref[i];
        tweens[i] = val.clone();
      }
      return new SerialTween(tweens);
    };

    SerialTween.prototype.gotoAndStop = function(parsent) {
      var duration, p, totalDuration, val, vp, _i, _len, _ref;
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      if (parsent === 1 && this._state === TweenState.Completed || parsent === 0 && this._state === TweenState.Initialized) {
        return;
      }
      p = this.getDuration() * parsent;
      totalDuration = 0;
      if (parsent === 1) {
        if (this._state !== TweenState.Completed) {
          this._state = TweenState.Completed;
        }
      } else if (parsent === 0) {
        if (this._state !== TweenState.Initialized) {
          this._state = TweenState.Initialized;
        }
      } else {
        this._state = TweenState.Playing;
      }
      _ref = this._tweens;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        val = _ref[_i];
        duration = val.getDuration();
        if (totalDuration > p) {
          if (val._state !== TweenState.Initialized) val.gotoAndStop(0);
        } else if (totalDuration + duration <= p) {
          if (val._state !== TweenState.Completed) val.gotoAndStop(1);
        } else {
          vp = (p - totalDuration) / duration;
          val.gotoAndStop(vp);
        }
        totalDuration = totalDuration + duration;
        if (parsent === 1) {
          val._state = TweenState.Completed;
        } else if (parsent === 0) {
          val._state = TweenState.Initialized;
        }
      }
    };

    SerialTween.prototype.gotoAndPlay = function(parsent) {
      var bmp, mp, p, tp, val, _i, _len, _ref, _results;
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      p = this.getDuration();
      mp = bmp = 0;
      _ref = this._tweens;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        val = _ref[_i];
        mp = val.getDuration() / p;
        tp = (parsent - bmp) / mp;
        if (tp < 0 || tp >= 1) {
          val.gotoAndStop(tp);
        } else {
          val.gotoAndPlay(tp);
        }
        _results.push(bmp = bmp + mp);
      }
      return _results;
    };

    return SerialTween;

  })();

  EasingTween = (function() {

    __extends(EasingTween, ITweenGroup);

    function EasingTween(tweens, easing, duration) {
      var _this = this;
      this._tweens = tweens;
      this._state = TweenState.Initialized;
      this._easing = easing;
      this._duration = duration * 1000;
      this._delegate = function() {
        return _this._onChildComplete();
      };
      this._index = 0;
      this._max = this._tweens.length - 1;
      this._timers = [];
      this._totalDuration = this._getDuration();
      return;
    }

    EasingTween.prototype.play = function() {
      var d, delay, easing, i, len, time, val, _len, _ref;
      len = this._max;
      d = this._duration;
      easing = this._easing;
      _ref = this._tweens;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        val = _ref[i];
        time = d * i / len;
        delay = d - easing.update(d - time, 0, d, d);
        this._timers[i] = this._playChild(val, delay);
      }
      this._state = TweenState.Playing;
    };

    EasingTween.prototype._playChild = function(tween, delay) {
      tween._state = TweenState.Initialized;
      tween.onComplete(this._delegate);
      return setTimeout(function() {
        return tween.play();
      }, delay);
    };

    EasingTween.prototype._onChildComplete = function() {
      var val, _i, _len, _ref;
      _ref = this._tweens;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        val = _ref[_i];
        if (val._state === TweenState.Playing || val._state === TweenState.Initialized) {
          return;
        }
      }
      this.finalize();
    };

    EasingTween.prototype.finalize = function() {
      this._state = TweenState.Finalized;
      if (this._onComplete) this._onComplete(this);
    };

    EasingTween.prototype.stop = function() {
      var i, val, _len, _ref;
      _ref = this._tweens;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        val = _ref[i];
        val.stop();
        clearTimeout(this._timers[i]);
      }
      this._state = TweenState.Finalized;
      if (this._onComplete) this._onComplete(this);
    };

    EasingTween.prototype.getDuration = function() {
      return this._totalDuration;
    };

    EasingTween.prototype._getDuration = function() {
      var d, delay, durations, easing, i, len, time, val, _len, _ref;
      len = this._max;
      d = this._duration;
      easing = this._easing;
      durations = [];
      _ref = this._tweens;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        val = _ref[i];
        time = d * i / len;
        delay = d - easing.update(d - time, 0, d, d);
        durations.push(delay + val.getDuration() * 1000);
      }
      return Math.max.apply(null, durations) / 1000;
    };

    EasingTween.prototype.gotoAndStop = function(parsent) {
      var bmp, bt, d, delay, durations, easing, i, len, p, td, time, tmp, tp, val, _len, _ref;
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      len = this._max;
      p = this.getDuration();
      d = this._duration / 1000;
      easing = this._easing;
      durations = [];
      tp = p * parsent;
      bmp = bt = 0;
      _ref = this._tweens;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        val = _ref[i];
        time = d * i / len;
        delay = d - easing.update(d - time, 0, d, d);
        if (delay > tp) {
          val.gotoAndStop(0);
        } else {
          tmp = tp - delay;
          td = val.getDuration();
          val.gotoAndStop(tmp / td);
        }
      }
    };

    EasingTween.prototype.clone = function() {
      var i, tweens, val, _len, _ref;
      tweens = [];
      _ref = this._tweens;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        val = _ref[i];
        tweens[i] = val.clone();
      }
      return new EasingTween(tweens, this._easing, this._duration / 1000);
    };

    return EasingTween;

  })();

  FuncTween = (function() {

    __extends(FuncTween, ITween);

    function FuncTween(func, params, caller) {
      this._func = func;
      this._params = params || [];
      this._caller = caller || this;
      this._state = TweenState.Initialized;
      this._duration = 25;
      return;
    }

    FuncTween.prototype.play = function() {
      var _this = this;
      this._state = TweenState.Playing;
      this._func.apply(this._caller, this._params);
      setTimeout(function() {
        return _this.finalize();
      }, this._duration);
    };

    FuncTween.prototype.clone = function() {
      return new FuncTween(this._func, this._params, this._caller);
    };

    FuncTween.prototype.finalize = function() {
      this._state = TweenState.Finalized;
      if (this._onComplete) this._onComplete(this);
    };

    FuncTween.prototype.gotoAndStop = function(parsent) {
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      if (parsent === 1) {
        this._func.apply(this._caller, this._params);
        this._state = TweenState.Completed;
      } else if (parsent === 0) {
        this._state = TweenState.Initialized;
      } else {
        this._state = TweenState.Playing;
      }
    };

    FuncTween.prototype.gotoAndPlay = function(parsent) {
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      if (parsent === 1) {
        this._func.apply(this._caller, this._params);
        this._state = TweenState.Completed;
      } else if (parsent === 0) {
        this._state = TweenState.Initialized;
      } else {
        this._state = TweenState.Playing;
      }
    };

    return FuncTween;

  })();

  WaitTween = (function() {

    __extends(WaitTween, ITween);

    function WaitTween(time) {
      this._duration = time * 1000;
      this._cd = this._duration;
    }

    WaitTween.prototype.play = function() {
      var _this = this;
      this._state = TweenState.Playing;
      this._cid = setTimeout(function() {
        return _this.finalize();
      }, this._cd);
    };

    WaitTween.prototype.stop = function() {
      clearTimeout(this._cid);
    };

    WaitTween.prototype.clone = function() {
      return new WaitTween(this._duration);
    };

    WaitTween.prototype.finalize = function() {
      this._state = TweenState.Finalized;
      if (this._onComplete) this._onComplete(this);
    };

    WaitTween.prototype.gotoAndStop = function(parsent) {
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      this._cd = this._duration - this._duration * parsent;
      if (parsent === 1) {
        this._state = TweenState.Completed;
      } else if (parsent === 0) {
        this._state = TweenState.Initialized;
      } else {
        this._state = TweenState.Playing;
      }
    };

    WaitTween.prototype.gotoAndPlay = function(parsent) {
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      this._duration = this._cd - this._cd * parsent;
      this._cd = this._duration - this._duration * parsent;
      this.play();
    };

    return WaitTween;

  })();

  PropertyTween = (function() {

    __extends(PropertyTween, ITween);

    function PropertyTween(target, properties) {
      this._target = target;
      this._prop = properties;
      this._duration = 25;
      this._bProps = null;
      return;
    }

    PropertyTween.prototype.play = function() {
      var mapper;
      var _this = this;
      mapper = PropertyMapper.getMapper(this._target);
      mapper.applyProperties(this._prop, true);
      setTimeout(function() {
        return _this.finalize();
      }, 25);
    };

    PropertyTween.prototype.finalize = function() {
      this._state = TweenState.Finalized;
      if (this._onComplete) this._onComplete(this);
    };

    PropertyTween.prototype.clone = function() {
      return new PropertyTween(this._target, this._prop);
    };

    PropertyTween.prototype.gotoAndStop = function(parsent) {
      var mapper, val;
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      if (parsent === 1) {
        mapper = PropertyMapper.getMapper(this._target);
        this._bProps = {};
        for (val in this._prop) {
          this._bProps[val] = mapper[val];
        }
        mapper.applyProperties(this._prop, true);
        this._state = TweenState.Completed;
      } else if (parsent === 0) {
        this._state = TweenState.Initialized;
        if (this._bProps != null) {
          mapper = PropertyMapper.getMapper(this._target);
          mapper.applyProperties(this._bProps, true);
          this._bProps = null;
        }
      } else {
        this._state = TweenState.Playing;
        if (this._bProps != null) {
          mapper = PropertyMapper.getMapper(this._target);
          mapper.applyProperties(this._bProps, true);
          this._bProps = null;
        }
      }
    };

    PropertyTween.prototype.gotoAndPlay = function(parsent) {
      var mapper;
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      if (parsent === 1) {
        mapper = PropertyMapper.getMapper(this._target);
        mapper.applyProperties(this._prop, true);
        this._state = TweenState.Completed;
      }
    };

    return PropertyTween;

  })();

  ChangeUnitTween = (function() {

    __extends(ChangeUnitTween, ITween);

    function ChangeUnitTween(target, properties) {
      this._target = target;
      this._prop = properties;
      this._duration = 25;
      this._bProps = null;
    }

    ChangeUnitTween.prototype.play = function() {
      var _this = this;
      this._mapper = this._mapper || PropertyMapper.getMapper(this._target);
      this._mapper.changeUnit(this._prop);
      setTimeout(function() {
        return _this.finalize();
      }, 25);
    };

    ChangeUnitTween.prototype.finalize = function() {
      this._state = TweenState.Finalized;
      if (this._onComplete) this._onComplete(this);
    };

    ChangeUnitTween.prototype.clone = function() {
      return new ChangeUnitTween(this._target, this._prop);
    };

    ChangeUnitTween.prototype.gotoAndStop = function(parsent) {
      var mapper;
      parsent = parsent > 1 ? 1 : parsent < 0 ? 0 : parsent;
      mapper = this._mapper || PropertyMapper.getMapper(this._target);
      if (parsent === 1) {
        this._bProps = mapper.changeUnit(this._prop);
        this._state = TweenState.Completed;
      } else if (parsent === 0) {
        this._state = TweenState.Initialized;
        if (this._bProps != null) {
          mapper.changeUnit(this._bProps);
          this._bProps = null;
        }
      } else {
        this._state = TweenState.Playing;
        if (this._bProps != null) {
          mapper.changeUnit(this._bProps);
          this._bProps = null;
        }
      }
    };

    return ChangeUnitTween;

  })();

  TransitionTween = (function() {

    __extends(TransitionTween, ICSSTween);

    function TransitionTween(target, to, from, duration, cssEasing) {
      var _this = this;
      this._target = target;
      this._to = to;
      this._from = from || {};
      this._easing = cssEasing ? CSS3Easing[cssEasing] : TrTween.DefaultCssEasing;
      this._transitionName = VenderInfo.vender + "Transition";
      this._transitionEnd = VenderInfo.vender + "TransitionEnd";
      this._transitionNameCSS = VenderInfo.cssVender + "transition";
      this._duration = duration * 1000;
      this._state = TweenState.Initialized;
      this._mapper = PropertyMapper.getMapper(this._target);
      this._delegate = function() {
        return _this._onTransitionEnd();
      };
      this._cid = -1;
      return;
    }

    TransitionTween.prototype._parseProps = function() {
      var name, props, trprop;
      trprop = "";
      props = [];
      for (name in this._to) {
        if (name === "x" || name === "y" || name === "z" || name === "rotation" || name === "rotationX" || name === "rotationY" || name === "rotationZ" || name === "skewX" || name === "skewY" || name === "scaleX" || name === "scaleY") {
          trprop = VenderInfo.cssVender + "transform";
        } else if (name === "top" || name === "bottom" || name === "left" || name === "right" || name === "width" || name === "height") {
          props.push(name);
        } else if (name === "alpha") {
          props.push("opacity");
        } else if (name === "marginTop") {
          props.push("margin-top");
        } else if (name === "marginBottom") {
          props.push("margin-bottom");
        } else if (name === "marginRight") {
          props.push("margin-right");
        } else if (name === "marginLeft") {
          props.push("margin-left");
        }
      }
      if (trprop !== "") props.push(trprop);
      return props.join(",");
    };

    TransitionTween.prototype.stop = function() {
      var _this = this;
      setTimeout(function() {
        clearTimeout(_this._cid);
        _this._target.style[_this._transitionName] = null;
        return _this._mapper.transitionStr = "";
      }, 0);
    };

    TransitionTween.prototype.play = function() {
      var mapper, pname;
      var _this = this;
      mapper = this._mapper;
      mapper.applyProperties(this._from, true);
      this._state = TweenState.Playing;
      this._cid = setTimeout(function() {
        return _this._onTransitionEnd();
      }, this._duration + 100);
      pname = this._parseProps();
      setTimeout(function() {
        _this._target.style[_this._transitionName] = pname + " " + _this._duration + "ms " + _this._easing;
        _this._mapper.transitionStr = _this._transitionNameCSS + ":" + pname + " " + _this._duration + "ms " + _this._easing + ";";
        return setTimeout(function() {
          return mapper.applyProperties(_this._to, true);
        }, 0);
      }, 0);
    };

    TransitionTween.prototype._onTransitionEnd = function() {
      var _this = this;
      clearTimeout(this._cid);
      this._target.style[this._transitionName] = null;
      this._mapper.transitionStr = "";
      setTimeout(function() {
        return _this.finalize();
      }, 0);
    };

    TransitionTween.prototype.clone = function() {
      return new TransitionTween(this._target, this._to, this._from, this._duration / 1000, this._easing);
    };

    return TransitionTween;

  })();

  AnimationTween = (function() {

    __extends(AnimationTween, ICSSTween);

    AnimationTween._count = 0;

    AnimationTween._css = null;

    AnimationTween._initializeCss = function() {
      var css;
      css = document.createElement("style");
      css.type = 'text/css';
      document.getElementsByTagName("head")[0].appendChild(css);
      AnimationTween._css = css;
    };

    AnimationTween._createKeyFrame = function(mapper, to, from) {
      var className, cv, fromstr, keyName, rule, sfromstr, stostr, tostr;
      if (!AnimationTween._css) AnimationTween._initializeCss();
      keyName = VenderInfo.cssVender + "keyframes";
      cv = VenderInfo.cssVender;
      className = "taTmp_" + (++AnimationTween._count);
      mapper.applyProperties(from, false);
      fromstr = mapper.getTransformString();
      sfromstr = mapper.getStyleString();
      mapper.applyProperties(to, false);
      tostr = mapper.getTransformString();
      stostr = mapper.getStyleString();
      rule = document.createTextNode("@" + cv + "keyframes " + className + "{\n	0%{\n		" + fromstr + ";\n		" + sfromstr + "\n	}\n	100%{\n		" + tostr + ";\n		" + stostr + "\n	}\n}");
      return [rule, className];
    };

    function AnimationTween(target, to, from, duration, cssEasing) {
      var arr;
      var _this = this;
      this._target = target;
      this._to = to;
      this._from = from;
      this._duration = duration * 1000;
      this._easing = cssEasing ? CSS3Easing[cssEasing] : TrTween.DefaultCssEasing;
      this._mapper = PropertyMapper.getMapper(this._target);
      arr = AnimationTween._createKeyFrame(this._mapper, this._to, this._from);
      this._rule = arr[0];
      this._className = arr[1];
      this._state = TweenState.Initialized;
      this._animationName = VenderInfo.vender + "Animation";
      this._animationEnd = VenderInfo.animationEnd;
      this._animationNameCSS = VenderInfo.cssVender + "animation";
      this._delegate = function() {
        return _this._onAnimationEnd();
      };
      this._cid = -1;
      return;
    }

    AnimationTween.prototype.play = function() {
      var _this = this;
      this._state = TweenState.Playing;
      setTimeout(function() {
        AnimationTween._css.appendChild(_this._rule);
        _this._target.addEventListener(_this._animationEnd, _this._delegate);
        return setTimeout(function() {
          _this._target.style[_this._animationName] = "" + _this._className + " " + _this._duration + "ms " + _this._easing;
          _this._mapper.transitionStr = "" + _this._animationNameCSS + ": " + _this._className + " " + _this._duration + "ms " + _this._easing + ";";
          return _this._mapper.applyProperties(_this._to, true);
        }, 0);
      }, 0);
    };

    AnimationTween.prototype._onAnimationEnd = function() {
      var _this = this;
      this._target.removeEventListener(this._animationEnd, this._delegate);
      this._mapper.transitionStr = "";
      this._mapper.applyProperties(this._to, true);
      AnimationTween._css.removeChild(this._rule);
      setTimeout(function() {
        return _this.finalize();
      }, 0);
    };

    AnimationTween.prototype.clone = function() {
      return new AnimationTween(this._target, this._to, this._from, this._duration / 1000, this._easing);
    };

    return AnimationTween;

  })();

  TrTween = (function() {

    function TrTween() {}

    TrTween.tween = function(target, to, from, duration, easing) {
      return new BasicTween(target, to, from, duration, easing);
    };

    TrTween.bezier = function(target, to, from, controlpoint, duration, easing) {
      return new BezierTween(target, to, from, controlpoint, duration, easing);
    };

    TrTween.delay = function(tween, delay) {
      return new DelayTween(tween, delay);
    };

    TrTween.parallelTweens = function(tweens) {
      return new ParallelTween(tweens);
    };

    TrTween.parallel = function() {
      return new ParallelTween(arguments);
    };

    TrTween.serialTweens = function(tweens) {
      return new SerialTween(tweens);
    };

    TrTween.serial = function() {
      return new SerialTween(arguments);
    };

    TrTween.easingTweens = function(tweens, easing, duration) {
      return new EasingTween(tweens, easing, duration);
    };

    TrTween.transition = function(target, to, from, duration, cssEasing) {
      return new TransitionTween(target, to, from, duration, cssEasing);
    };

    TrTween.animation = function(target, to, from, duration, cssEasing) {
      return new AnimationTween(target, to, from, duration, cssEasing);
    };

    TrTween.repeat = function(tween, count) {
      return new RepeatTween(tween, count);
    };

    TrTween.func = function(func, params, caller) {
      return new FuncTween(func, params, caller);
    };

    TrTween.prop = function(target, propaties) {
      return new PropertyTween(target, propaties);
    };

    TrTween.wait = function(time) {
      return new WaitTween(time);
    };

    TrTween.changeUnit = function(target, prop) {
      return new ChangeUnitTween(target, prop);
    };

    TrTween.version = "0.2.1";

    TrTween.DefaultEasing = Linear.easeNone;

    TrTween.DefaultCssEasing = CSS3Easing.linear;

    return TrTween;

  })();

  window.jp = window.jp || {};

  window.jp.contents = window.jp.contents || {};

  window.jp.contents.collections = window.jp.contents.collections || {};

  window.jp.contents.TrTween = window.jp.contents.TrTween || {};

  window.jp.contents.collections.LinkedList = LinkedList;

  window.jp.contents.mapper = window.jp.contents.mapper || {};

  window.jp.contents.mapper.PropertyMapper = PropertyMapper;

  window.jp.contents.TrTween.TrTween = TrTween;

  window.jp.contents.TrTween.Render = Render;

  TrTween = jp.contents.TrTween.TrTween;

  Render = jp.contents.TrTween.Render;

  SpriteSheet = (function() {

    function SpriteSheet(target, step, fps) {
      var _this = this;
      if (fps == null) fps = 30;
      this._target = target;
      this._step = step;
      this._fps = 1000 / fps;
      this._isPlaying = false;
      this._ut = 0;
      this._updateParams = [];
      this._udcount = 0;
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.scaleX = 1;
      this.scaleY = 1;
      this.alpha = 1;
      this.rotation = 0;
      this.rotationX = 0;
      this.rotationY = 0;
      this.rotationZ = 0;
      this.updaters = {
        x: function() {
          _this._updateParams.push("x");
          _this.updaters.x = _this.onParamUpdate;
          _this.onParamUpdate();
        },
        y: function() {
          _this._updateParams.push("y");
          _this.updaters.y = _this.onParamUpdate;
          _this.onParamUpdate();
        },
        z: function() {
          _this._updateParams.push("z");
          _this.updaters.z = _this.onParamUpdate;
          _this.onParamUpdate();
        },
        alpha: function() {
          _this._updateParams.push("alpha");
          _this.updaters.alpha = _this.onParamUpdate;
          _this.onParamUpdate();
        },
        scaleX: function() {
          _this._updateParams.push("scaleX");
          _this.updaters.scaleX = _this.onParamUpdate;
          _this.onParamUpdate();
        },
        scaleY: function() {
          _this._updateParams.push("scaleY");
          _this.updaters.scaleY = _this.onParamUpdate;
          _this.onParamUpdate();
        },
        rotation: function() {
          _this._updateParams.push("rotation");
          _this.updaters.rotation = _this.onParamUpdate;
          _this.onParamUpdate();
        },
        rotationX: function() {
          _this._updateParams.push("rotationX");
          _this.updaters.rotationX = _this.onParamUpdate;
          _this.onParamUpdate();
        },
        rotationY: function() {
          _this._updateParams.push("rotationY");
          _this.updaters.rotationY = _this.onParamUpdate;
          _this.onParamUpdate();
        },
        rotationZ: function() {
          _this._updateParams.push("rotationZ");
          _this.updaters.rotationZ = _this.onParamUpdate;
          _this.onParamUpdate();
        }
      };
    }

    SpriteSheet.prototype.onParamUpdate = function() {
      var obj, val, _i, _len, _ref;
      console.log(this._udcount);
      if (++this._udcount === this._updateParams.length) {
        console.log("moja-", this.x, this.y, this._udcount, this._updateParams.length);
        this._udcount = 0;
        obj = {};
        _ref = this._updateParams;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          val = _ref[_i];
          obj[val] = this[val];
        }
        TrTween.prop(this._target, obj).play();
      }
    };

    SpriteSheet.prototype.gotoAndPlay = function(frame) {
      frame = frame < 1 ? 1 : frame > this._totalFrames ? this._totalFrames : frame;
      this._currentFrame = frame;
      this._draw();
      this._ut = new Date().getTime();
      if (!this._isPlaying) {
        Render.addListener(this);
        this._isPlaying = true;
        if (Render.getState() === 0) Render.start();
      }
    };

    SpriteSheet.prototype.gotoAndStop = function(frame) {
      if (this._isPlaying) Render.removeListener(this);
      this._isPlaying = false;
      frame = frame < 1 ? 1 : frame > this._totalFrames ? this._totalFrames : frame;
      this._currentFrame = frame;
      this._draw();
    };

    SpriteSheet.prototype.getCurrentFrame = function() {
      return this._currentFrame;
    };

    SpriteSheet.prototype.getTotalFrames = function() {
      return this._totalFrames;
    };

    SpriteSheet.prototype.isPlaying = function() {
      return this._isPlaying;
    };

    SpriteSheet.prototype.nextFrame = function() {
      var nf;
      nf = this._currentFrame + 1 > this._totalFrames ? this._totalFrames : this._currentFrame + 1;
      this.gotoAndStop(nf);
    };

    SpriteSheet.prototype.prevFrame = function() {
      var nf;
      nf = this._currentFrame - 1 < 1 ? 1 : this._currentFrame - 1;
      this.gotoAndStop(nf);
    };

    SpriteSheet.prototype.play = function() {
      this._ut = new Date().getTime();
      Render.addListener(this);
      this._isPlaying = true;
      if (Render.getState() === 0) Render.start();
    };

    SpriteSheet.prototype.stop = function() {
      this._isPlaying = false;
      Render.removeListener(this);
    };

    SpriteSheet.prototype.update = function(ct) {
      if (ct < this._ut + this._fps) return;
      this._ut = ct;
      ++this._currentFrame;
      if (this._currentFrame > this._totalFrames) {
        this._currentFrame = this._totalFrames;
        this._draw();
        this._isPlaying = false;
        Render.removeListener(this);
        return;
      }
      return this._draw();
    };

    SpriteSheet.prototype._draw = function() {};

    return SpriteSheet;

  })();

  BackgroundSprite = (function() {

    __extends(BackgroundSprite, SpriteSheet);

    function BackgroundSprite(target, step, direction, limit, fps) {
      if (fps == null) fps = 30;
      this._target = target;
      this._dir = direction;
      this._limit = limit;
      BackgroundSprite.__super__.constructor.call(this, target, step, fps);
      this._init();
    }

    BackgroundSprite.prototype._init = function() {
      this._currentFrame = 1;
      this._totalFrames = ~~(this._limit / this._step);
      if (this._dir === "horizontal") {
        this._draw = this._drawHorizontal;
      } else {
        this._draw = this._drawVirtical;
      }
    };

    BackgroundSprite.prototype._drawVirtical = function() {
      var bf;
      bf = -(this._currentFrame - 1) * this._step;
      TrTween.prop(this._target, {
        backgroundPositionY: bf
      }).play();
    };

    BackgroundSprite.prototype._drawHorizontal = function() {
      var bf;
      bf = -(this._currentFrame - 1) * this._step;
      TrTween.prop(this._target, {
        backgroundPositionX: bf
      }).play();
    };

    return BackgroundSprite;

  })();

  ImageSpriteSheet = (function() {

    function ImageSpriteSheet(target, step) {}

    return ImageSpriteSheet;

  })();

  window.jp = window.jp || {};

  window.jp.contents = window.jp.contents || {};

  window.jp.contents.display = window.jp.contents.display || {};

  window.jp.contents.display.SpriteSheet = SpriteSheet;

}).call(this);
