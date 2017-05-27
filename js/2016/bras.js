
var Handlebars = (function() {
var __module3__ = (function() {
"use strict";
var __exports__;
function SafeString(string) {
this.string = string;
}
SafeString.prototype.toString = function() {
return "" + this.string;
};
__exports__ = SafeString;
return __exports__;
})();
var __module2__ = (function(__dependency1__) {
"use strict";
var __exports__ = {};
var SafeString = __dependency1__;
var escape = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;",
"'": "&#x27;",
"`": "&#x60;"
};
var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;
function escapeChar(chr) {
return escape[chr] || "&amp;";
}
function extend(obj, value) {
for(var key in value) {
if(Object.prototype.hasOwnProperty.call(value, key)) {
obj[key] = value[key];
}
}
}
__exports__.extend = extend;var toString = Object.prototype.toString;
__exports__.toString = toString;
var isFunction = function(value) {
return typeof value === 'function';
};
if (isFunction(/x/)) {
isFunction = function(value) {
return typeof value === 'function' && toString.call(value) === '[object Function]';
};
}
var isFunction;
__exports__.isFunction = isFunction;
var isArray = Array.isArray || function(value) {
return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
};
__exports__.isArray = isArray;
function escapeExpression(string) {
if (string instanceof SafeString) {
return string.toString();
} else if (!string && string !== 0) {
return "";
}
string = "" + string;
if(!possible.test(string)) { return string; }
return string.replace(badChars, escapeChar);
}
__exports__.escapeExpression = escapeExpression;function isEmpty(value) {
if (!value && value !== 0) {
return true;
} else if (isArray(value) && value.length === 0) {
return true;
} else {
return false;
}
}
__exports__.isEmpty = isEmpty;
return __exports__;
})(__module3__);
var __module4__ = (function() {
"use strict";
var __exports__;
var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];
function Exception(message, node) {
var line;
if (node && node.firstLine) {
line = node.firstLine;
message += ' - ' + line + ':' + node.firstColumn;
}
var tmp = Error.prototype.constructor.call(this, message);
for (var idx = 0; idx < errorProps.length; idx++) {
this[errorProps[idx]] = tmp[errorProps[idx]];
}
if (line) {
this.lineNumber = line;
this.column = node.firstColumn;
}
}
Exception.prototype = new Error();
__exports__ = Exception;
return __exports__;
})();
var __module1__ = (function(__dependency1__, __dependency2__) {
"use strict";
var __exports__ = {};
var Utils = __dependency1__;
var Exception = __dependency2__;
var VERSION = "1.3.0";
__exports__.VERSION = VERSION;var COMPILER_REVISION = 4;
__exports__.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
2: '== 1.0.0-rc.3',
3: '== 1.0.0-rc.4',
4: '>= 1.0.0'
};
__exports__.REVISION_CHANGES = REVISION_CHANGES;
var isArray = Utils.isArray,
isFunction = Utils.isFunction,
toString = Utils.toString,
objectType = '[object Object]';
function HandlebarsEnvironment(helpers, partials) {
this.helpers = helpers || {};
this.partials = partials || {};
registerDefaultHelpers(this);
}
__exports__.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
constructor: HandlebarsEnvironment,
logger: logger,
log: log,
registerHelper: function(name, fn, inverse) {
if (toString.call(name) === objectType) {
if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
Utils.extend(this.helpers, name);
} else {
if (inverse) { fn.not = inverse; }
this.helpers[name] = fn;
}
},
registerPartial: function(name, str) {
if (toString.call(name) === objectType) {
Utils.extend(this.partials,  name);
} else {
this.partials[name] = str;
}
}
};
function registerDefaultHelpers(instance) {
instance.registerHelper('helperMissing', function(arg) {
if(arguments.length === 2) {
return undefined;
} else {
throw new Exception("Missing helper: '" + arg + "'");
}
});

instance.registerHelper('each', function(context, options) {
var fn = options.fn, inverse = options.inverse;
var i = 0, ret = "", data;
if (isFunction(context)) { context = context.call(this); }
if (options.data) {
data = createFrame(options.data);
}
if(context && typeof context === 'object') {
if (isArray(context)) {
for(var j = context.length; i<j; i++) {
if (data) {
data.index = i;
data.first = (i === 0);
data.last  = (i === (context.length-1));
}
ret = ret + fn(context[i], { data: data });
}
} else {
for(var key in context) {
if(context.hasOwnProperty(key)) {
if(data) {
data.key = key;
data.index = i;
data.first = (i === 0);
}
ret = ret + fn(context[key], {data: data});
i++;
}
}
}
}
if(i === 0){
ret = inverse(this);
}
return ret;
});
instance.registerHelper('if', function(conditional, options) {
if (isFunction(conditional)) { conditional = conditional.call(this); }
if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
return options.inverse(this);
} else {
return options.fn(this);
}
});
instance.registerHelper('unless', function(conditional, options) {
return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
});
instance.registerHelper('with', function(context, options) {
if (isFunction(context)) { context = context.call(this); }
if (!Utils.isEmpty(context)) return options.fn(context);
});
instance.registerHelper('log', function(context, options) {
var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
instance.log(level, context);
});
}
var logger = {
methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },
DEBUG: 0,
INFO: 1,
WARN: 2,
ERROR: 3,
level: 3,
log: function(level, obj) {
if (logger.level <= level) {
var method = logger.methodMap[level];
if (typeof console !== 'undefined' && console[method]) {
console[method].call(console, obj);
}
}
}
};
__exports__.logger = logger;
function log(level, obj) { logger.log(level, obj); }
__exports__.log = log;var createFrame = function(object) {
var obj = {};
Utils.extend(obj, object);
return obj;
};
__exports__.createFrame = createFrame;
return __exports__;
})(__module2__, __module4__);
var __module5__ = (function(__dependency1__, __dependency2__, __dependency3__) {
"use strict";
var __exports__ = {};
var Utils = __dependency1__;
var Exception = __dependency2__;
var COMPILER_REVISION = __dependency3__.COMPILER_REVISION;
var REVISION_CHANGES = __dependency3__.REVISION_CHANGES;
function checkRevision(compilerInfo) {
var compilerRevision = compilerInfo && compilerInfo[0] || 1,
currentRevision = COMPILER_REVISION;
if (compilerRevision !== currentRevision) {
if (compilerRevision < currentRevision) {
var runtimeVersions = REVISION_CHANGES[currentRevision],
compilerVersions = REVISION_CHANGES[compilerRevision];
throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
"Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
} else {
throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
"Please update your runtime to a newer version ("+compilerInfo[1]+").");
}
}
}
__exports__.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial
function template(templateSpec, env) {
if (!env) {
throw new Exception("No environment passed to template");
}
var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
var result = env.VM.invokePartial.apply(this, arguments);
if (result != null) { return result; }
if (env.compile) {
var options = { helpers: helpers, partials: partials, data: data };
partials[name] = env.compile(partial, { data: data !== undefined }, env);
return partials[name](context, options);
} else {
throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
}
};
var container = {
escapeExpression: Utils.escapeExpression,
invokePartial: invokePartialWrapper,
programs: [],
program: function(i, fn, data) {
var programWrapper = this.programs[i];
if(data) {
programWrapper = program(i, fn, data);
} else if (!programWrapper) {
programWrapper = this.programs[i] = program(i, fn);
}
return programWrapper;
},
merge: function(param, common) {
var ret = param || common;
if (param && common && (param !== common)) {
ret = {};
Utils.extend(ret, common);
Utils.extend(ret, param);
}
return ret;
},
programWithDepth: env.VM.programWithDepth,
noop: env.VM.noop,
compilerInfo: null
};
return function(context, options) {
options = options || {};
var namespace = options.partial ? options : env,
helpers,
partials;
if (!options.partial) {
helpers = options.helpers;
partials = options.partials;
}
var result = templateSpec.call(
container,
namespace, context,
helpers,
partials,
options.data);
if (!options.partial) {
env.VM.checkRevision(container.compilerInfo);
}
return result;
};
}
__exports__.template = template;function programWithDepth(i, fn, data) {
var args = Array.prototype.slice.call(arguments, 3);
var prog = function(context, options) {
options = options || {};
return fn.apply(this, [context, options.data || data].concat(args));
};
prog.program = i;
prog.depth = args.length;
return prog;
}
__exports__.programWithDepth = programWithDepth;function program(i, fn, data) {
var prog = function(context, options) {
options = options || {};
return fn(context, options.data || data);
};
prog.program = i;
prog.depth = 0;
return prog;
}
__exports__.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
var options = { partial: true, helpers: helpers, partials: partials, data: data };
if(partial === undefined) {
throw new Exception("The partial " + name + " could not be found");
} else if(partial instanceof Function) {
return partial(context, options);
}
}
__exports__.invokePartial = invokePartial;function noop() { return ""; }
__exports__.noop = noop;
return __exports__;
})(__module2__, __module4__, __module1__);
var __module0__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
"use strict";
var __exports__;
var base = __dependency1__;
var SafeString = __dependency2__;
var Exception = __dependency3__;
var Utils = __dependency4__;
var runtime = __dependency5__;
var create = function() {
var hb = new base.HandlebarsEnvironment();
Utils.extend(hb, base);
hb.SafeString = SafeString;
hb.Exception = Exception;
hb.Utils = Utils;
hb.VM = runtime;
hb.template = function(spec) {
return runtime.template(spec, hb);
};
return hb;
};
var Handlebars = create();
Handlebars.create = create;
__exports__ = Handlebars;
return __exports__;
})(__module1__, __module3__, __module4__, __module2__, __module5__);
return __module0__;
})();
(function (factory) {
if (typeof define === 'function' && define.amd) {
define(['jquery'], factory);
} else if (typeof exports === 'object') {
factory(require('jquery'));
} else {
factory(jQuery);
}
}(function ($) {
var pluses = /\+/g;
function encode(s) {
return config.raw ? s : encodeURIComponent(s);
}
function decode(s) {
return config.raw ? s : decodeURIComponent(s);
}
function stringifyCookieValue(value) {
return encode(config.json ? JSON.stringify(value) : String(value));
}
function parseCookieValue(s) {
if (s.indexOf('"') === 0) {
s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
}
try {
s = decodeURIComponent(s.replace(pluses, ' '));
return config.json ? JSON.parse(s) : s;
} catch(e) {}
}
function read(s, converter) {
var value = config.raw ? s : parseCookieValue(s);
return $.isFunction(converter) ? converter(value) : value;
}
var config = $.cookie = function (key, value, options) {
if (value !== undefined && !$.isFunction(value)) {
options = $.extend({}, config.defaults, options);
if (typeof options.expires === 'number') {
var days = options.expires, t = options.expires = new Date();
t.setTime(+t + days * 864e+5);
}
return (document.cookie = [
encode(key), '=', stringifyCookieValue(value),
options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
options.path    ? '; path=' + options.path : '',
options.domain  ? '; domain=' + options.domain : '',
options.secure  ? '; secure' : ''
].join(''));
}
var result = key ? undefined : {};
var cookies = document.cookie ? document.cookie.split('; ') : [];
for (var i = 0, l = cookies.length; i < l; i++) {
var parts = cookies[i].split('=');
var name = decode(parts.shift());
var cookie = parts.join('=');
if (key && key === name) {
result = read(cookie, value);
break;
}
if (!key && (cookie = read(cookie)) !== undefined) {
result[name] = cookie;
}
}
return result;
};
config.defaults = {};
$.removeCookie = function (key, options) {
if ($.cookie(key) === undefined) {
return false;
}
$.cookie(key, '', $.extend({}, options, { expires: -1 }));
return !$.cookie(key);
};
}));

(function(window){
var support = {},
tests = null,
docElement = document.documentElement,
testDiv = document.createElement('div'),
testDivStyle = testDiv.style,
prefixes = ' Webkit WebKit Moz O Ms'.split(' '),
cssprefixes = ' -webkit- -webkit- -moz- -o- -ms-'.split(' '),
prefixesLength = prefixes.length,
testProperty = function( prop, cssformat ) {
var formatForCss = typeof cssformat != "undefined" ? cssformat : false,
propd, l = prefixesLength;
propd = prop.replace(/(^[a-z])/g, function(val) {
return val.toUpperCase();
}).replace(/\-([a-z])/g, function(val,a) {
return a.toUpperCase();
});
while( l-- ){
if ( prop in testDivStyle ){
return prop;
} else if ( prefixes[l] + propd in testDivStyle  ){
return formatForCss ? cssprefixes[l] + prop.toLowerCase() : prefixes[l] + propd;
}else if( window[prefixes[l].toLowerCase()+propd] != undefined ){
return prefixes[l].toLowerCase() + propd;
}else if( typeof window[ prefixes[l] + propd ] != 'undefined' ){
return prefixes[l] + propd;
}
}
return false;
};
tests = {
prefix : function(){
var prefixedProp = testProperty( 'transform' );
return !!prefixedProp ? prefixedProp.replace('Transform','') : '';
},
cssprefix : function(){
var prefixedProp = testProperty( 'transform', true );
return !!prefixedProp ? prefixedProp.replace('transform','') : '';
},
transform : function(){
return testProperty('transform');
},
transform3d : function(){
return ( 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix() ) || !!testProperty( 'perspective' );
},
transformOrigin : function(){
return testProperty('transformOrigin');
},
backfaceVisibility : function(){
return testProperty('backfaceVisibility');
},
perspective : function(){
return testProperty('perspective');
},
transition : function(){
return testProperty('transition');
},
transitionProperty : function(){
return testProperty('transitionProperty');
},
transitionDuration : function(){
return testProperty('transitionDuration');
},
transitionTimingFunction : function(){
return testProperty('transitionTimingFunction');
},
transitionDelay : function(){
return testProperty('transitionDelay');
},
transitionEvent : function(){
return testProperty('transitionEvent');
},
transitionEventPrefix : function(){
return !!testProperty('transitionEvent') ? testProperty('transitionEvent').replace( 'TransitionEvent', '' ).toLowerCase() : '';
},
transitionEnd : function(){
return this.transitionEventPrefix() != '' ? this.transitionEventPrefix() + 'TransitionEnd' : 'transitionend';
},
touch : function(){
return 'ontouchstart' in document.documentElement;
},
MSPointer : function(){
return !!window.navigator.msPointerEnabled;
}
}
var featureName;
for ( var feature in tests ) {
if ( tests.hasOwnProperty(feature) ) {
featureName  = feature.toLowerCase();
support[featureName] = tests[feature]();
}
}
support['test'] =  function( prop ){
return !!testProperty( prop );
};
support['getPrefixed'] = function( prop ){
return testProperty(prop);
};
support['getCssPrefixed'] = function( prop ){
return testProperty(prop, true);
};
window.support = support;
})(window);
(function($, window) {
var Parallax = function(element, options, callback) {
var self = this;
this.$elmt    = $(element);
this.options  = options;
this.callback = (typeof callback != 'undefined') ? callback : $.noop;
var elmtPos = this.$elmt.position();
this.posX   = elmtPos.left;
this.posY   = elmtPos.top;
this.strTranslateZ = (support.transform3d) ? 'translateZ(0)' : '';
this.translateX = 0;
this.translateY = 0;
this.rotateZ = 0;
this.init();
}
Parallax.prototype = {
init: function() {
var self = this;
self.callback.call(self);
},
calculate: function(index, properties, loop) {
var self    = this,
nbSteps = (loop) ? self.options[properties].length : 1,
i  		= 0;
do {
var step = (loop) ? self.options[properties][i] : self.options[properties];
if (index < step.startIndex)
{
var newValue = step.startValue;
if (loop) break;
}
else if (index >= step.startIndex && index <= step.endIndex)
{
var easingFn = (typeof step.easing != 'undefined' && typeof $.easing[step.easing] == 'function') ? $.easing[step.easing] : $.easing['swing'],
time 	 = index - step.startIndex,
duration = step.endIndex - step.startIndex,
percent  = time / duration,
rate	 = easingFn(percent, time, 0, 1, duration),
newValue = step.startValue + rate * (step.endValue - step.startValue);
if (loop) break;
}
else if ((loop && i+1 == nbSteps) || !loop)
{
var newValue = step.endValue;
}
i++
} while (i < nbSteps);
return newValue;
},
update: function(index) {
var self  = this;
for (var properties in self.options) {
var newValue = self.calculate(index, properties, $.isArray(self.options[properties]));
if (properties == 'top' && support.transform) {
self.translateY = newValue - self.posY;
self.$elmt[0].style[support.transform] = 'translate(' + self.translateX + 'px, ' + self.translateY + 'px)' + self.strTranslateZ + ' rotateZ(' + self.rotateZ + 'deg)';
} else if (properties == 'left' && support.transform) {
self.translateX = newValue - self.posX;
self.$elmt[0].style[support.transform] = 'translate(' + self.translateX + 'px, ' + self.translateY + 'px)' + self.strTranslateZ + ' rotateZ(' + self.rotateZ + 'deg)';
} else if (properties == 'rotateZ' && support.transform) {
self.rotateZ = newValue;
self.$elmt[0].style[support.transform] = 'translate(' + self.translateX + 'px, ' + self.translateY + 'px)' + self.strTranslateZ + ' rotateZ(' + self.rotateZ + 'deg)';
} else {
self.$elmt.css(properties, newValue);
}
}
}
};
$.fn.parallax = function(options, callback) {
return this.each(function() {
var $self = $(this);
if ($self.data('parallax')) return;
var instance = new Parallax(this, options, callback);
$self.data('parallax', instance);
});
};
window.Parallax = Parallax;
})(jQuery, window, undefined);





(function( $, window ){
'use strict';
if( typeof window.scriptease != 'undefined' ) return;
String.prototype.trim = function(){
return this.replace(/^\s+/g,'').replace(/\s+$/g,'')
}
if (!(window.console && console.log)) {
(function() {
var noop = function() {};
var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
var length = methods.length;
var console = window.console = {};
while (length--) {
console[methods[length]] = noop;
}
}());
}
if (!Function.prototype.bind) {
Function.prototype.bind = function (oThis) {
if (typeof this !== "function") {
throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
}
var aArgs = Array.prototype.slice.call(arguments, 1),
fToBind = this,
fNOP = function () {},
fBound = function () {
return fToBind.apply(this instanceof fNOP && oThis
? this
: oThis,
aArgs.concat(Array.prototype.slice.call(arguments)));
};
fNOP.prototype = this.prototype;
fBound.prototype = new fNOP();
return fBound;
};
}
$.id = function(id) {
return $(document.getElementById(id));
};
$.tag = function(tag) {
return $().pushStack(document.getElementsByTagName(tag));
};
$.fn.tag = function(tag) {
var e = $();
this.each(function() {
e = $.merge(e, $().pushStack(this.getElementsByTagName(tag)));
});
return e;
};
$.classname = document.getElementsByClassName
? function(cl) {
return $().pushStack(document.getElementsByClassName(cl));
}
: function(cl) {
return $(cl.replace(/^| +/g, '.'));
};
$.fn.classname = document.getElementsByClassName
? function(cl) {
var e = $();
this.each(function() {
e = $.merge(e, $().pushStack(this.getElementsByClassName(cl)));
});
return e;
}
: function(cl) {
return this.find(cl.replace(/^| +/g, '.'));
};
var scriptease = {};
scriptease.extend = function(){
var options, k,
baseObject = arguments[0] || {},
length = arguments.length;
if( length == 1 ){
baseObject = Ultima;
i = 0;
}
if ( typeof baseObject !== "object" && typeof baseObject !== 'function' ) {
baseObject = {};
}
for ( var i=1; i<length; i++ ) {
if ( (options = arguments[i]) != null ) {
for ( k in options ) {
if ( options[k] !== undefined ) {
baseObject[k] = options[k];
}
}
}
}
return baseObject;
}
scriptease.getRootDomain = function(d) {
var c = d.split(".");
var a = d;
if(c.length > 1) {
var b = c.slice(c.length - 2);
a = b ? b.join(".") : a
}
return a
}
scriptease = scriptease.extend({}, scriptease, {
global : window,
NAME : 'scriptease',
ROOT_DOMAIN : scriptease.getRootDomain(window.location.hostname),
SSL_ONLY : '',//.attr("protocol") == "https",
GADGET_INSTANCE : "gadgetInstance",
IS_LOADED_KEY : "isLoaded",
ROOT_URLS : undefined,
SECURE_ROOT_URLS : undefined,
SERVICE_URLS : undefined,
DEFAULT_APP_NAME : undefined,
DEFAULT_VERSION : undefined,
SCRIPT_MANAGER_FORMAT : undefined,
ROOT_URL : undefined,
SECURE_ROOT_URL : undefined,
COUNTRY : undefined,
LOCALE : undefined,
REGION : undefined,
BUILD_REVISION : undefined,
additionalAppVersions : [],
stylesToInclude : [],
scriptsToInclude : [],
loadedScripts : [],
scriptConfig : {
waitSeconds: 7,
baseUrl: './',
paths: {},
pkgs: {},
shim: {}
},
format : '',// jQuery.url.param("format") || "optimized",
scriptManagerLoadComplete : false,
scriptIncludeLoadStart : false,
UAList : {
'Ipad' : '.*(Ipad).*',
'Ipod' : '.*(Ipod).*',
'Iphone' : '.*(Iphone).*',
'IE6' : '.*(MSIE 6).*',
'IE7' : '.*(MSIE 7).*',
'IE8' : '.*(MSIE 8).*',
'IE9' : '.*(MSIE 9).*',
'Opera Mobile' : '.*Opera Mobi.*',
'Opera' : '.*Opera.*',
'Firefox 2' : '.*Firefox/2.*',
'Firefox 3' : '.*Firefox/3.*',
'Firefox 4' : '.*Firefox/4.*',
'Firefox' : '.*Firefox.*',
'Netscape' : '.*Netscape.*',
'Chrome' : '.*(Chrome).*',
'Safari' : '.*(Safari|Camino).*',
'Konqueror' : '.*Konqueror.*',
'Other' : '.*'
}
});
scriptease = scriptease.extend({}, scriptease, {
error : function(err){
throw new Error(err)
},
debug: function(log){
if( window.console ) console.log(log)
},
emptyFn: function(){},

handlers : {}
});
scriptease.events = {
MODULE_SCRIPTS_LOADED : 'onModuleScroptsLoaded'
}
window.scriptease = scriptease;
})( jQuery, window );

var app = window.app || window.scriptease;
app.NAME = 'app';
app.ROOT_URL = window.location.protocol+'//'+ window.location.host + window.location.pathname.replace('index.php', '');
app.SECURE_ROOT_URL = "";
app.DEFAULT_APP_NAME = "dior";
app.DEFAULT_VERSION = "2_2";
app.COUNTRY = "FR";
app.LOCALE = "fr_FR";
app.REGION = "EMEA";
app.ROOT_DOMAIN = "http://localhost";
app.BUILD_REVISION = "";
app.SCRIPT_MANAGER_FORMAT = "";
app.events = app.extend({}, app.events, {
POPIN_INITIATED: 'onPopinInitiated',
OPEN_POPIN: 'onOpenPopin',
CLOSE_POPIN: 'onClosePopin'
});

(function( $, window ){
var app = window.app || window.scriptease;
app.home = function() {

var $window =       $(window),
mainHome      = $('#main-home'),
rightCol      = mainHome.find('.col-right'),
leftCol       = mainHome.find('.col-left'),biggerCol,smallerCol,
windowWidth   = $window.outerWidth();
coef          = null;
heightCover   = $('.cover').outerHeight()+coef;

if (rightCol.outerHeight() > leftCol.outerHeight()) {
biggerCol  = rightCol;
smallerCol = leftCol;
}else{
biggerCol  = leftCol;
smallerCol = rightCol;
}

(function() {
var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
window.cancelRequestAnimationFrame = window[vendors[x]+
'CancelRequestAnimationFrame'];
}
if (!window.requestAnimationFrame)
window.requestAnimationFrame = function(callback, element) {
var currTime = new Date().getTime();
var timeToCall = Math.max(0, 16 - (currTime - lastTime)); //if ie timetocall = 1000/60
var id = window.setTimeout(function() { callback(currTime + timeToCall); },
timeToCall);
lastTime = currTime + timeToCall;
return id;
};
if (!window.cancelAnimationFrame)
window.cancelAnimationFrame = function(id) {
clearTimeout(id);
};
}());
var endIndex, endValue;
var resizeTimer;
function calculateParallaxValue() {
endIndex = $('.wrap-main-home').outerHeight() - $window.outerHeight();
endValue = biggerCol.outerHeight() - smallerCol.outerHeight();

}
function majParallax() {
calculateParallaxValue();
smallerCol.data('parallax').options.top.endIndex = endIndex;
smallerCol.data('parallax').options.top.endValue = endValue;
}
function updateParallax(){
var scrollTop = $window.scrollTop();
 if($(".gpage ").hasClass("mpdepa")){
	 
	 return false;
	 
 }
if ( $window.outerWidth() > 900 ) {
smallerCol.data('parallax').update(scrollTop);
}else{
smallerCol.data('parallax').update(0);
}
}
function initParallax() {
startPointParallax();
calculateParallaxValue();
smallerCol.parallax({
'top': {
startIndex: heightCover,
endIndex: endIndex,
startValue: 0,
endValue: endValue,
easing: 'linear'
}
});
}
function startPointParallax(){
if (windowWidth > 1400) {
coef = 40;
}else{
coef = 28;
}
heightCover   = $('.big-wrapper').outerHeight()+coef;

}
$window.on('scroll', function() {
if( $window.outerWidth() > 900 && !$('.lt-ie9').length)
{
 if($(".gpage ").hasClass("mpdepa")){
	 
	 return false;
	 
 }
window.requestAnimationFrame(updateParallax);
}
});
$window.on('resize', function() {
clearTimeout(resizeTimer);
resizeTimer = setTimeout(function() {
startPointParallax();
majParallax();
updateParallax();
}, 100);
});
initParallax();

};
})( jQuery, window );
