(function() {

  'use strict';

  var APP_BROWSER, APP_OS, AnimationTween, Application, BasicTween, BezierTween, BrowserName, CSS3Easing, DelayTween, Delegate, EasingTween, FuncTween, ICSSTween, ITween, ITweenGroup, Linear, LinkedList, OSName, ObjectMapper, ParallelTween, PropertyMapper, PropertyTween, Render, RepeatTween, SerialTween, TrTween, TransitionTween, TweenState, VenderInfo, cancelAnimationFrame, isFIE, isIOS, requestAnimationFrame;
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

  Application = (function() {

    function Application() {}

    Application._init = function() {
      var bName, bVer, isIOS, isMobile, osName, osVar, ua;
      ua = navigator.userAgent.toUpperCase();
      isMobile = false;
      isIOS = false;
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
    Finalized: 4
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
      Render._state = 1;
      Render.tick();
    };

    Render.stop = function() {
      cancelAnimationFrame(Render._rid);
    };

    Render.tick = function() {
      var ct, f, mt, updaters;
      mt = 0;
      ct = Date.now != null ? Date.now() : new Date().getTime();
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
      this._trName = VenderInfo.transformName;
      this._trcssName = VenderInfo.cssVender + "transform";
      this._filterName = VenderInfo.cssVender + "filter";
      this._styleTweens = null;
      this._trTweens = null;
      this._filterTweens = null;
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
      this.marginLeft = NaN;
      this.marginTop = NaN;
      this.marginBottom = NaN;
      this.marginRight = NaN;
      this.backgroundPositionX = NaN;
      this.backgroundPositionY = NaN;
      this.visible = "NONE";
      this.display = "";
      this._needUpdate = false;
      this._transformVals = [];
      this.transitionStr = "";
      this._parsePropaties();
      this._hasTransform = false;
      this._hasCss2Style = false;
      this._hasFilter = false;
      if (isIOS) this._target.style.webkitTransformStyle = "preserve-3d";
      return;
    }

    PropertyMapper.prototype._initTransformTweenList = function() {
      this._trTweens = new LinkedList();
      this._trTweens.push({
        name: "x",
        tween: null
      });
      this._trTweens.push({
        name: "y",
        tween: null
      });
      this._trTweens.push({
        name: "z",
        tween: null
      });
      this._trTweens.push({
        name: "rotation",
        tween: null
      });
      this._trTweens.push({
        name: "rotationX",
        tween: null
      });
      this._trTweens.push({
        name: "rotationY",
        tween: null
      });
      this._trTweens.push({
        name: "rotationZ",
        tween: null
      });
      this._trTweens.push({
        name: "skewX",
        tween: null
      });
      this._trTweens.push({
        name: "skewY",
        tween: null
      });
      this._trTweens.push({
        name: "scaleX",
        tween: null
      });
      this._trTweens.push({
        name: "scaleY",
        tween: null
      });
      return this._trTweens;
    };

    PropertyMapper.prototype._parsePropaties = function() {
      var arr, px, py, r, target, targetTransform;
      target = this._target;
      if (!isFIE && target.style[this._trName] !== void 0) {
        targetTransform = target.style[this._trName];
        r = /(translateX\()([0-9||\.||-||e-]+)(px\))/;
        this.x = targetTransform.match(r) ? targetTransform.match(r)[2] * 1 : NaN;
        r = /(translateY\()([0-9||\.||-||e-]+)(px\))/;
        this.y = targetTransform.match(r) ? targetTransform.match(r)[2] * 1 : NaN;
        r = /(translateZ\()([0-9||\.||-||e-]+)(px\))/;
        this.z = targetTransform.match(r) ? targetTransform.match(r)[2] * 1 : NaN;
        r = /(scaleX\()([0-9||\.||-||e-]+)(\))/;
        this.scaleX = targetTransform.match(r) ? targetTransform.match(r)[2] * 1 : NaN;
        r = /(scaleY\()([0-9||\.||-||e-]+)(\))/;
        this.scaleY = targetTransform.match(r) ? targetTransform.match(r)[2] * 1 : NaN;
        r = /(rotate\()([0-9||\.||-||e-]+)(deg\))/;
        this.rotation = targetTransform.match(r) ? targetTransform.match(r)[2] * 1 : NaN;
        r = /(rotateX\()([0-9||\.||-||e-]+)(deg\))/;
        this.rotationX = targetTransform.match(r) ? targetTransform.match(r)[2] * 1 : NaN;
        r = /(rotateY\()([0-9||\.||-||e-]+)(deg\))/;
        this.rotationY = targetTransform.match(r) ? targetTransform.match(r)[2] * 1 : NaN;
        r = /(rotateZ\()([0-9||\.||-||e-]+)(deg\))/;
        this.rotationZ = targetTransform.match(r) ? targetTransform.match(r)[2] * 1 : NaN;
        r = /(skewX\()([0-9||\.||-||e-]+)(deg\))/;
        this.skewX = targetTransform.match(r) ? targetTransform.match(r)[2] * 1 : NaN;
        r = /(skewY\()([0-9||\.||-||e-]+)(deg\))/;
        this.skewY = targetTransform.match(r) ? targetTransform.match(r)[2] * 1 : NaN;
      }
      if (target.style) {
        if (!isNaN(parseFloat(target.style.opacity))) {
          this.alpha = parseFloat(target.style.opacity);
        }
        if (!isNaN(parseFloat(target.style.top))) {
          this.top = parseFloat(target.style.top);
        }
        if (!isNaN(parseFloat(target.style.bottom))) {
          this.bottom = parseFloat(target.style.bottom);
        }
        if (!isNaN(parseFloat(target.style.left))) {
          this.left = parseFloat(target.style.left);
        }
        if (!isNaN(parseFloat(target.style.right))) {
          this.right = parseFloat(target.style.right);
        }
        if (!isNaN(parseFloat(target.style.width))) {
          this.width = parseFloat(target.style.width);
        }
        if (!isNaN(parseFloat(target.style.height))) {
          this.height = parseFloat(target.style.height);
        }
        if (!isNaN(parseFloat(target.style.marginTop))) {
          this.marginTop = parseFloat(target.style.marginTop);
        }
        if (!isNaN(parseFloat(target.style.marginBottom))) {
          this.marginBottom = parseFloat(target.style.marginBottom);
        }
        if (!isNaN(parseFloat(target.style.marginRight))) {
          this.marignRight = parseFloat(target.style.marginRight);
        }
        if (!isNaN(parseFloat(target.style.marginLeft))) {
          this.marginLeft = parseFloat(target.style.marginLeft);
        }
        if (target.style.backgroundPosition !== "") {
          this.backgroundPositionY = 0;
          this.backgroundPositionX = 0;
          arr = target.style.backgroundPosition.split(" ");
          px = parseFloat(arr[0]);
          py = parseFloat(arr[1]);
          if (!isNaN(px)) this.backgroundPositionX = px;
          if (!isNaN(px)) this.backgroundPositionY = py;
        }
        if (!isNaN(parseFloat(target.style.backgroundPositionY))) {
          this.backgroundPositionY = parseFloat(target.style.backgroundPositionY);
        }
        this.display = target.style.display ? target.style.display : "";
        if (target.style.visible === "hidden") {
          this.visible = false;
        } else if (target.style.visible === "visible") {
          this.visible = true;
        } else {
          this.visible = "NONE";
        }
      }
    };

    PropertyMapper.prototype.registerTween = function(tween) {
      var c, f, find, fp, from, name, tl, to;
      to = tween._to;
      from = tween._from;
      c = {};
      if (isFIE) {
        for (name in to) {
          if (name === "top" || name === "bottom" || name === "left" || name === "right" || name === "width" || name === "height" || name === "alpha" || name === "marginTop" || name === "marginBottom" || name === "marginRight" || name === "marginLeft" || name === "backgroundPositionX" || name === "backgroundPositionY") {
            tl = this._styleTweens || (this._styleTweens = new LinkedList());
            fp = 0;
            this._hasCss2Style = true;
            if (from && !isNaN(from[name])) {
              fp = from[name];
            } else {
              fp = !isNaN(this[name]) ? this[name] : PropertyMapper._defaults[name];
            }
            c[name] = to[name] - fp;
            from[name] = fp;
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
      }
      for (name in to) {
        if (name === "x" || name === "y" || name === "z" || name === "rotation" || name === "rotationX" || name === "rotationY" || name === "rotationZ" || name === "skewX" || name === "skewY" || name === "scaleX" || name === "scaleY") {
          this._hasTransform = true;
          fp = 0;
          if (from && !isNaN(from[name])) {
            fp = from[name];
          } else {
            fp = !isNaN(this[name]) ? this[name] : PropertyMapper._defaults[name];
          }
          from[name] = fp;
          c[name] = to[name] - fp;
          tl = this._trTweens || this._initTransformTweenList();
          f = tl.getFirst();
          while (f) {
            if (f.elm.name === name) f.elm.tween = tween;
            f = f.next;
          }
        } else if (name === "top" || name === "bottom" || name === "left" || name === "right" || name === "width" || name === "height" || name === "alpha" || name === "marginTop" || name === "marginBottom" || name === "marginRight" || name === "marginLeft" || name === "backgroundPositionX" || name === "backgroundPositionY") {
          this._hasCss2Style = true;
          tl = this._styleTweens || (this._styleTweens = new LinkedList());
          fp = 0;
          if (from && !isNaN(from[name])) {
            fp = from[name];
          } else {
            fp = !isNaN(this[name]) ? this[name] : PropertyMapper._defaults[name];
          }
          c[name] = to[name] - fp;
          from[name] = fp;
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
          this._hasFilter = true;
          tl = this._filterTweens || (this._filterTweens = new LinkedList());
          fp = 0;
          if (from && !isNaN(from[name])) {
            fp = from[name];
          } else {
            fp = !isNaN(this[name]) ? this[name] : PropertyMapper._defaults[name];
          }
          c[name] = to[name] - fp;
          from[name] = fp;
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

    PropertyMapper.prototype.applyStyles = function() {
      if (isFIE) {
        this._target.style.cssText = this._calcCss2();
        return;
      }
      this._target.style.cssText = this.transitionStr + this._calcCss2() + this._calcFilter() + this._calcMatrix();
    };

    PropertyMapper.prototype._calcCss2 = function() {
      var cssText, ta;
      if (!this._hasCss2Style) return "";
      cssText = "";
      if (!isNaN(this.top)) cssText = cssText + ("top:" + this.top + "px;");
      if (!isNaN(this.bottom)) {
        cssText = cssText + ("bottom:" + this.bottom + "px;");
      }
      if (!isNaN(this.left)) cssText = cssText + ("left:" + this.left + "px;");
      if (!isNaN(this.right)) cssText = cssText + ("right:" + this.right + "px;");
      if (!isNaN(this.width)) cssText = cssText + ("width:" + this.width + "px;");
      if (!isNaN(this.height)) {
        cssText = cssText + ("height:" + this.height + "px;");
      }
      if (!isNaN(this.marginTop)) {
        cssText = cssText + ("margin-top:" + this.marginTop + "px;");
      }
      if (!isNaN(this.marginBottom)) {
        cssText = cssText + ("margin-bottom:" + this.marginBottom + "px;");
      }
      if (!isNaN(this.marginLeft)) {
        cssText = cssText + ("margin-left:" + this.marginLeft + "px;");
      }
      if (!isNaN(this.marginRight)) {
        cssText = cssText + ("margin-right:" + this.marginRight + "px;");
      }
      if (!isNaN(this.backgroundPositionY) || !isNaN(this.backgroundPositionX)) {
        this.backgroundPositionX = isNaN(this.backgroundPositionX) ? 0 : this.backgroundPositionX;
        this.backgroundPositionY = isNaN(this.backgroundPositionY) ? 0 : this.backgroundPositionY;
        cssText = cssText + ("background-position:" + this.backgroundPositionX + "px " + this.backgroundPositionY + "px;");
      }
      if (!isNaN(this.alpha)) {
        this.alpha = Math.round(this.alpha * 1000) / 1000;
        if (!isFIE) {
          cssText = cssText + ("opacity:" + this.alpha + ";");
        } else {
          ta = this.alpha * 100;
          cssText = cssText + ("zoom:1;-ms-filter:\"alpha(opacity=" + ta + ")\";filter:alpha(opacity=" + ta + ");opacity:" + this.alpha + ";");
        }
      }
      if (this.visible !== "NONE") {
        if (this.visible) {
          cssText = cssText + "visibility:visible;";
        } else {
          cssText = cssText + "visibility:hidden;";
        }
      }
      if (this.display !== "") {
        cssText = cssText + ("display:" + this.display + ";");
      }
      return cssText;
    };

    PropertyMapper.prototype._calcFilter = function() {
      var filterTxt;
      if (!this._hasFilter) return "";
      filterTxt = "";
      if (!isNaN(this.glayscale)) {
        filterTxt = filterTxt + (" glayscale(" + this.glayscale + "%)");
      }
      if (!isNaN(this.sepia)) {
        filterTxt = filterTxt + (" sepia(" + this.sepia + "%)");
      }
      if (!isNaN(this.saturate)) {
        filterTxt = filterTxt + (" saturate(" + this.saturate + "%)");
      }
      if (!isNaN(this.hueRotate)) {
        filterTxt = filterTxt + (" hue-rotate(" + this.blur + "deg)");
      }
      if (!isNaN(this.invert)) {
        filterTxt = filterTxt + (" invert(" + this.invert + "%)");
      }
      if (!isNaN(this.brightness)) {
        filterTxt = filterTxt + (" brightness(" + this.brightness + "%)");
      }
      if (!isNaN(this.contrast)) {
        filterTxt = filterTxt + (" contrast(" + this.contrast + "%)");
      }
      if (!isNaN(this.blur)) {
        filterTxt = filterTxt + (" blur(" + this.blur + "px)");
      }
      return this._filterName + ":" + filterTxt + ";";
    };

    PropertyMapper.prototype._calcMatrix = function() {
      var trTxt;
      if (!this._hasTransform) return "";
      trTxt = "";
      if (!isNaN(this.x)) trTxt = trTxt + (" translateX(" + this.x + "px)");
      if (!isNaN(this.y)) trTxt = trTxt + (" translateY(" + this.y + "px)");
      if (!isNaN(this.z)) trTxt = trTxt + (" translateZ(" + this.z + "px)");
      if (!isNaN(this.rotation)) {
        trTxt = trTxt + (" rotate(" + this.rotation + "deg)");
      }
      if (!isNaN(this.rotationX)) {
        trTxt = trTxt + (" rotateX(" + this.rotationX + "deg)");
      }
      if (!isNaN(this.rotationY)) {
        trTxt = trTxt + (" rotateY(" + this.rotationY + "deg)");
      }
      if (!isNaN(this.rotationZ)) {
        trTxt = trTxt + (" rotateZ(" + this.rotationZ + "deg)");
      }
      if (!isNaN(this.skewX)) trTxt = trTxt + (" skewX(" + this.skewX + "deg)");
      if (!isNaN(this.skewY)) trTxt = trTxt + (" skewY(" + this.skewY + "deg)");
      if (!isNaN(this.scaleX)) trTxt = trTxt + (" scaleX(" + this.scaleX + ")");
      if (!isNaN(this.scaleY)) trTxt = trTxt + (" scaleY(" + this.scaleY + ")");
      return this._trcssName + ":" + trTxt + ";";
    };

    PropertyMapper.prototype.applyProperties = function(properties, applyStyle) {
      var change, name;
      change = false;
      for (name in properties) {
        if (this[name] !== null) {
          change = true;
          if (name === "top" || name === "bottom" || name === "left" || name === "right" || name === "width" || name === "height" || name === "alpha" || name === "marginTop" || name === "marginBottom" || name === "marginRight" || name === "marginLeft" || name === "backgroundPositionX" || name === "backgroundPositionY" || name === "visible" || name === "display") {
            this._hasCss2Style = true;
          } else if (name === "x" || name === "y" || name === "z" || name === "rotation" || name === "rotationX" || name === "rotationY" || name === "rotationZ" || name === "skewX" || name === "skewY" || name === "scaleX" || name === "scaleY") {
            this._hasTransform = true;
          } else if (name === "grayscale" || name === "sepia" || name === "saturate" || name === "hueRotate" || name === "invert" || name === "brightness" || name === "contrast" || name === "blur") {
            this._hasFilter = true;
          }
          this[name] = properties[name];
        }
      }
      if (change && applyStyle) this.applyStyles();
    };

    PropertyMapper.prototype.update = function(ct) {
      var f, tw;
      f = this._trTweens ? this._trTweens.getFirst() : null;
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
      f = this._styleTweens ? this._styleTweens.getFirst() : null;
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
      f = this._filterTweens ? this._filterTweens.getFirst() : null;
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

    PropertyMapper.prototype.fixTweens = function() {
      var f, mcount, tw;
      f = this._trTweens ? this._trTweens.getFirst() : null;
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
      f = this._styleTweens ? this._styleTweens.getFirst() : null;
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
      f = this._filterTweens ? this._filterTweens.getFirst() : null;
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
      return this._calcMatrix();
    };

    PropertyMapper.prototype.getStyleString = function() {
      return this._calcCss2();
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
      var f, n;
      f = this._tweens.getFirst();
      while (f) {
        n = f.elm.name;
        this._target[n] = this[n];
        if (f.elm.hasUpdater) {
          f = this._target.updaters[n];
          f.apply(this._target, [this[n]]);
        }
        f = f.next;
      }
    };

    ObjectMapper.prototype.registerTween = function(tween) {
      var c, f, find, fp, from, hasUpdater, name, to, tw;
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
      this._c = this._mapper.registerTween(this);
      this._st = Date.now != null ? Date.now() : new Date().getTime();
      this._endTime = this._st + this._duration;
      if (Render.getState() === 0) Render.start();
      if (this._onPlay) this._onPlay(this);
    };

    BasicTween.prototype.update = function(ct, prop) {
      if (ct >= this._endTime) {
        this._mapper[prop] = (this._easing.update(this._duration, this._from[prop], this._c[prop], this._duration) * 1000 | 0) / 1000;
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

    return BasicTween;

  })();

  DelayTween = (function() {

    __extends(DelayTween, ITween);

    function DelayTween(tween, delay) {
      var _this = this;
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

    return RepeatTween;

  })();

  ParallelTween = (function() {

    __extends(ParallelTween, ITweenGroup);

    function ParallelTween(tweens) {
      this._tweens = tweens;
      this._state = TweenState.Initialized;
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

    return ParallelTween;

  })();

  SerialTween = (function() {

    __extends(SerialTween, ITweenGroup);

    function SerialTween(tweens) {
      this._tweens = tweens;
      this._current = null;
      this._index = 0;
      this._state = TweenState.Initialized;
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
      return;
    }

    EasingTween.prototype.play = function() {
      var val, _i, _len, _ref;
      _ref = this._tweens;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        val = _ref[_i];
        val._state = TweenState.Initialized;
        val.onComplete(this._delegate);
      }
      Render.addListener(this);
      this._st = Date.now != null ? Date.now() : new Date().getTime();
      this._endTime = this._st + this._duration;
      this._state = TweenState.Playing;
      if (Render.getState() === 0) Render.start();
    };

    EasingTween.prototype.update = function(ct) {
      var i, si, tw;
      si = this._easing.update(ct - this._st, 0, this._max, this._duration);
      if (this._endTime <= ct) {
        si = this._easing.update(this._duration, 0, this._max, this._duration);
        Render.removeListener(this);
      }
      for (i = 0; 0 <= si ? i <= si : i >= si; 0 <= si ? i++ : i--) {
        tw = this._tweens[i];
        if (tw._state === TweenState.Initialized) tw.play();
      }
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
      var val, _i, _len, _ref;
      _ref = this._tweens;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        val = _ref[_i];
        val.stop();
      }
      this._state = TweenState.Finalized;
      if (this._onComplete) this._onComplete(this);
    };

    EasingTween.prototype.getDuration = function() {};

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
      this._duration = 0;
      return;
    }

    FuncTween.prototype.play = function() {
      var _this = this;
      this._state = TweenState.Playing;
      this._func.apply(this._caller, this._params);
      setTimeout(function() {
        return _this.finalize();
      });
    };

    FuncTween.prototype.clone = function() {
      return new FuncTween(this._func, this._params, this._caller);
    };

    FuncTween.prototype.finalize = function() {
      this._state = TweenState.Finalized;
      if (this._onComplete) this._onComplete(this);
    };

    return FuncTween;

  })();

  PropertyTween = (function() {

    __extends(PropertyTween, ITween);

    function PropertyTween(target, properties) {
      this._target = target;
      this._prop = properties;
      this._duration = 0;
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

    return PropertyTween;

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
      console.log(this._animationEnd);
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

    TrTween.apply = function(target, propaties) {
      return new PropertyTween(target, propaties);
    };

    TrTween.version = "0.1.5";

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

}).call(this);
