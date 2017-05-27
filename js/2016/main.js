function onYouTubePlayerAPIReady() {
    mejs.YouTubeApi.iFrameReady()
}
function onYouTubePlayerReady(t) {
    mejs.YouTubeApi.flashReady(t)
}
function getParameterByName(t) {
    t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var e = new RegExp("[\\?&]" + t + "=([^&#]*)"),
    i = e.exec(location.search);
    return null === i ? "": decodeURIComponent(i[1].replace(/\+/g, " "))
}
function getCookie(t) {
    var e = "; " + document.cookie,
    i = e.split("; " + t + "=");
    return 2 === i.length ? i.pop().split(";").shift() : void 0
} !
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
} (function(t) {
    function e(e, n) {
        var s, o, a, r = e.nodeName.toLowerCase();
        return "area" === r ? (s = e.parentNode, o = s.name, e.href && o && "map" === s.nodeName.toLowerCase() ? (a = t("img[usemap='#" + o + "']")[0], !!a && i(a)) : !1) : (/^(input|select|textarea|button|object)$/.test(r) ? !e.disabled: "a" === r ? e.href || n: n) && i(e)
    }
    function i(e) {
        return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function() {
            return "hidden" === t.css(this, "visibility")
        }).length
    }
    function n(t) {
        for (var e, i; t.length && t[0] !== document;) {
            if (e = t.css("position"), ("absolute" === e || "relative" === e || "fixed" === e) && (i = parseInt(t.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
            t = t.parent()
        }
        return 0
    }
    function s() {
        this._curInst = null,
        this._keyEvent = !1,
        this._disabledInputs = [],
        this._datepickerShowing = !1,
        this._inDialog = !1,
        this._mainDivId = "ui-datepicker-div",
        this._inlineClass = "ui-datepicker-inline",
        this._appendClass = "ui-datepicker-append",
        this._triggerClass = "ui-datepicker-trigger",
        this._dialogClass = "ui-datepicker-dialog",
        this._disableClass = "ui-datepicker-disabled",
        this._unselectableClass = "ui-datepicker-unselectable",
        this._currentClass = "ui-datepicker-current-day",
        this._dayOverClass = "ui-datepicker-days-cell-over",
        this.regional = [],
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        },
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        },
        t.extend(this._defaults, this.regional[""]),
        this.regional.en = t.extend(!0, {},
        this.regional[""]),
        this.regional["en-US"] = t.extend(!0, {},
        this.regional.en),
        this.dpDiv = o(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }
    function o(e) {
        var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return e.delegate(i, "mouseout",
        function() {
            t(this).removeClass("ui-state-hover"),
            -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"),
            -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover")
        }).delegate(i, "mouseover", a)
    }
    function a() {
        t.datepicker._isDisabledDatepicker(v.inline ? v.dpDiv.parent()[0] : v.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"))
    }
    function r(e, i) {
        t.extend(e, i);
        for (var n in i) null == i[n] && (e[n] = i[n]);
        return e
    }
    function l(t) {
        return function() {
            var e = this.element.val();
            t.apply(this, arguments),
            this._refresh(),
            e !== this.element.val() && this._trigger("change")
        }
    }
    t.ui = t.ui || {},
    t.extend(t.ui, {
        version: "1.11.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }),
    t.fn.extend({
        scrollParent: function(e) {
            var i = this.css("position"),
            n = "absolute" === i,
            s = e ? /(auto|scroll|hidden)/: /(auto|scroll)/,
            o = this.parents().filter(function() {
                var e = t(this);
                return n && "static" === e.css("position") ? !1 : s.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
            }).eq(0);
            return "fixed" !== i && o.length ? o: t(this[0].ownerDocument || document)
        },
        uniqueId: function() {
            var t = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++t)
                })
            }
        } (),
        removeUniqueId: function() {
            return this.each(function() { / ^ui - id - \d + $ / .test(this.id) && t(this).removeAttr("id")
            })
        }
    }),
    t.extend(t.expr[":"], {
        data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
            return function(i) {
                return !! t.data(i, e)
            }
        }) : function(e, i, n) {
            return !! t.data(e, n[3])
        },
        focusable: function(i) {
            return e(i, !isNaN(t.attr(i, "tabindex")))
        },
        tabbable: function(i) {
            var n = t.attr(i, "tabindex"),
            s = isNaN(n);
            return (s || n >= 0) && e(i, !s)
        }
    }),
    t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"],
    function(e, i) {
        function n(e, i, n, o) {
            return t.each(s,
            function() {
                i -= parseFloat(t.css(e, "padding" + this)) || 0,
                n && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0),
                o && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
            }),
            i
        }
        var s = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
        o = i.toLowerCase(),
        a = {
            innerWidth: t.fn.innerWidth,
            innerHeight: t.fn.innerHeight,
            outerWidth: t.fn.outerWidth,
            outerHeight: t.fn.outerHeight
        };
        t.fn["inner" + i] = function(e) {
            return void 0 === e ? a["inner" + i].call(this) : this.each(function() {
                t(this).css(o, n(this, e) + "px")
            })
        },
        t.fn["outer" + i] = function(e, s) {
            return "number" != typeof e ? a["outer" + i].call(this, e) : this.each(function() {
                t(this).css(o, n(this, e, !0, s) + "px")
            })
        }
    }),
    t.fn.addBack || (t.fn.addBack = function(t) {
        return this.add(null == t ? this.prevObject: this.prevObject.filter(t))
    }),
    t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function(e) {
        return function(i) {
            return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this)
        }
    } (t.fn.removeData)),
    t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
    t.fn.extend({
        focus: function(e) {
            return function(i, n) {
                return "number" == typeof i ? this.each(function() {
                    var e = this;
                    setTimeout(function() {
                        t(e).focus(),
                        n && n.call(e)
                    },
                    i)
                }) : e.apply(this, arguments)
            }
        } (t.fn.focus),
        disableSelection: function() {
            var t = "onselectstart" in document.createElement("div") ? "selectstart": "mousedown";
            return function() {
                return this.bind(t + ".ui-disableSelection",
                function(t) {
                    t.preventDefault()
                })
            }
        } (),
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function(e) {
            if (void 0 !== e) return this.css("zIndex", e);
            if (this.length) for (var i, n, s = t(this[0]); s.length && s[0] !== document;) {
                if (i = s.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (n = parseInt(s.css("zIndex"), 10), !isNaN(n) && 0 !== n)) return n;
                s = s.parent()
            }
            return 0
        }
    }),
    t.ui.plugin = {
        add: function(e, i, n) {
            var s, o = t.ui[e].prototype;
            for (s in n) o.plugins[s] = o.plugins[s] || [],
            o.plugins[s].push([i, n[s]])
        },
        call: function(t, e, i, n) {
            var s, o = t.plugins[e];
            if (o && (n || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType)) for (s = 0; s < o.length; s++) t.options[o[s][0]] && o[s][1].apply(t.element, i)
        }
    };
    var h = 0,
    u = Array.prototype.slice;
    t.cleanData = function(e) {
        return function(i) {
            var n, s, o;
            for (o = 0; null != (s = i[o]); o++) try {
                n = t._data(s, "events"),
                n && n.remove && t(s).triggerHandler("remove")
            } catch(a) {}
            e(i)
        }
    } (t.cleanData),
    t.widget = function(e, i, n) {
        var s, o, a, r, l = {},
        h = e.split(".")[0];
        return e = e.split(".")[1],
        s = h + "-" + e,
        n || (n = i, i = t.Widget),
        t.expr[":"][s.toLowerCase()] = function(e) {
            return !! t.data(e, s)
        },
        t[h] = t[h] || {},
        o = t[h][e],
        a = t[h][e] = function(t, e) {
            return this._createWidget ? void(arguments.length && this._createWidget(t, e)) : new a(t, e)
        },
        t.extend(a, o, {
            version: n.version,
            _proto: t.extend({},
            n),
            _childConstructors: []
        }),
        r = new i,
        r.options = t.widget.extend({},
        r.options),
        t.each(n,
        function(e, n) {
            return t.isFunction(n) ? void(l[e] = function() {
                var t = function() {
                    return i.prototype[e].apply(this, arguments)
                },
                s = function(t) {
                    return i.prototype[e].apply(this, t)
                };
                return function() {
                    var e, i = this._super,
                    o = this._superApply;
                    return this._super = t,
                    this._superApply = s,
                    e = n.apply(this, arguments),
                    this._super = i,
                    this._superApply = o,
                    e
                }
            } ()) : void(l[e] = n)
        }),
        a.prototype = t.widget.extend(r, {
            widgetEventPrefix: o ? r.widgetEventPrefix || e: e
        },
        l, {
            constructor: a,
            namespace: h,
            widgetName: e,
            widgetFullName: s
        }),
        o ? (t.each(o._childConstructors,
        function(e, i) {
            var n = i.prototype;
            t.widget(n.namespace + "." + n.widgetName, a, i._proto)
        }), delete o._childConstructors) : i._childConstructors.push(a),
        t.widget.bridge(e, a),
        a
    },
    t.widget.extend = function(e) {
        for (var i, n, s = u.call(arguments, 1), o = 0, a = s.length; a > o; o++) for (i in s[o]) n = s[o][i],
        s[o].hasOwnProperty(i) && void 0 !== n && (e[i] = t.isPlainObject(n) ? t.isPlainObject(e[i]) ? t.widget.extend({},
        e[i], n) : t.widget.extend({},
        n) : n);
        return e
    },
    t.widget.bridge = function(e, i) {
        var n = i.prototype.widgetFullName || e;
        t.fn[e] = function(s) {
            var o = "string" == typeof s,
            a = u.call(arguments, 1),
            r = this;
            return o ? this.each(function() {
                var i, o = t.data(this, n);
                return "instance" === s ? (r = o, !1) : o ? t.isFunction(o[s]) && "_" !== s.charAt(0) ? (i = o[s].apply(o, a), i !== o && void 0 !== i ? (r = i && i.jquery ? r.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + s + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + s + "'")
            }) : (a.length && (s = t.widget.extend.apply(null, [s].concat(a))), this.each(function() {
                var e = t.data(this, n);
                e ? (e.option(s || {}), e._init && e._init()) : t.data(this, n, new i(s, this))
            })),
            r
        }
    },
    t.Widget = function() {},
    t.Widget._childConstructors = [],
    t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(e, i) {
            i = t(i || this.defaultElement || this)[0],
            this.element = t(i),
            this.uuid = h++,
            this.eventNamespace = "." + this.widgetName + this.uuid,
            this.bindings = t(),
            this.hoverable = t(),
            this.focusable = t(),
            i !== this && (t.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(t) {
                    t.target === i && this.destroy()
                }
            }), this.document = t(i.style ? i.ownerDocument: i.document || i), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)),
            this.options = t.widget.extend({},
            this.options, this._getCreateOptions(), e),
            this._create(),
            this._trigger("create", null, this._getCreateEventData()),
            this._init()
        },
        _getCreateOptions: t.noop,
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function() {
            this._destroy(),
            this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
            this.bindings.unbind(this.eventNamespace),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: t.noop,
        widget: function() {
            return this.element
        },
        option: function(e, i) {
            var n, s, o, a = e;
            if (0 === arguments.length) return t.widget.extend({},
            this.options);
            if ("string" == typeof e) if (a = {},
            n = e.split("."), e = n.shift(), n.length) {
                for (s = a[e] = t.widget.extend({},
                this.options[e]), o = 0; o < n.length - 1; o++) s[n[o]] = s[n[o]] || {},
                s = s[n[o]];
                if (e = n.pop(), 1 === arguments.length) return void 0 === s[e] ? null: s[e];
                s[e] = i
            } else {
                if (1 === arguments.length) return void 0 === this.options[e] ? null: this.options[e];
                a[e] = i
            }
            return this._setOptions(a),
            this
        },
        _setOptions: function(t) {
            var e;
            for (e in t) this._setOption(e, t[e]);
            return this
        },
        _setOption: function(t, e) {
            return this.options[t] = e,
            "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e), e && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))),
            this
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _on: function(e, i, n) {
            var s, o = this;
            "boolean" != typeof e && (n = i, i = e, e = !1),
            n ? (i = s = t(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, s = this.widget()),
            t.each(n,
            function(n, a) {
                function r() {
                    return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? o[a] : a).apply(o, arguments) : void 0
                }
                "string" != typeof a && (r.guid = a.guid = a.guid || r.guid || t.guid++);
                var l = n.match(/^([\w:-]*)\s*(.*)$/),
                h = l[1] + o.eventNamespace,
                u = l[2];
                u ? s.delegate(u, h, r) : i.bind(h, r)
            })
        },
        _off: function(e, i) {
            i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
            e.unbind(i).undelegate(i),
            this.bindings = t(this.bindings.not(e).get()),
            this.focusable = t(this.focusable.not(e).get()),
            this.hoverable = t(this.hoverable.not(e).get())
        },
        _delay: function(t, e) {
            function i() {
                return ("string" == typeof t ? n[t] : t).apply(n, arguments)
            }
            var n = this;
            return setTimeout(i, e || 0)
        },
        _hoverable: function(e) {
            this.hoverable = this.hoverable.add(e),
            this._on(e, {
                mouseenter: function(e) {
                    t(e.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(e) {
                    t(e.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(e) {
            this.focusable = this.focusable.add(e),
            this._on(e, {
                focusin: function(e) {
                    t(e.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(e) {
                    t(e.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(e, i, n) {
            var s, o, a = this.options[e];
            if (n = n || {},
            i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e: this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent) for (s in o) s in i || (i[s] = o[s]);
            return this.element.trigger(i, n),
            !(t.isFunction(a) && a.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
        }
    },
    t.each({
        show: "fadeIn",
        hide: "fadeOut"
    },
    function(e, i) {
        t.Widget.prototype["_" + e] = function(n, s, o) {
            "string" == typeof s && (s = {
                effect: s
            });
            var a, r = s ? s === !0 || "number" == typeof s ? i: s.effect || i: e;
            s = s || {},
            "number" == typeof s && (s = {
                duration: s
            }),
            a = !t.isEmptyObject(s),
            s.complete = o,
            s.delay && n.delay(s.delay),
            a && t.effects && t.effects.effect[r] ? n[e](s) : r !== e && n[r] ? n[r](s.duration, s.easing, o) : n.queue(function(i) {
                t(this)[e](),
                o && o.call(n[0]),
                i()
            })
        }
    });
    var c = (t.widget, !1);
    t(document).mouseup(function() {
        c = !1
    });
    t.widget("ui.mouse", {
        version: "1.11.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var e = this;
            this.element.bind("mousedown." + this.widgetName,
            function(t) {
                return e._mouseDown(t)
            }).bind("click." + this.widgetName,
            function(i) {
                return ! 0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
            }),
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName),
            this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(e) {
            if (!c) {
                this._mouseMoved = !1,
                this._mouseStarted && this._mouseUp(e),
                this._mouseDownEvent = e;
                var i = this,
                n = 1 === e.which,
                s = "string" == typeof this.options.cancel && e.target.nodeName ? t(e.target).closest(this.options.cancel).length: !1;
                return n && !s && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    i.mouseDelayMet = !0
                },
                this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(e) !== !1, !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
                    return i._mouseMove(t)
                },
                this._mouseUpDelegate = function(t) {
                    return i._mouseUp(t)
                },
                this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), c = !0, !0)) : !0
            }
        },
        _mouseMove: function(e) {
            if (this._mouseMoved) {
                if (t.ui.ie && (!document.documentMode || document.documentMode < 9) && !e.button) return this._mouseUp(e);
                if (!e.which) return this._mouseUp(e)
            }
            return (e.which || e.button) && (this._mouseMoved = !0),
            this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
        },
        _mouseUp: function(e) {
            return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)),
            c = !1,
            !1
        },
        _mouseDistanceMet: function(t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return ! 0
        }
    }); !
    function() {
        function e(t, e, i) {
            return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
        }
        function i(e, i) {
            return parseInt(t.css(e, i), 10) || 0
        }
        function n(e) {
            var i = e[0];
            return 9 === i.nodeType ? {
                width: e.width(),
                height: e.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            }: t.isWindow(i) ? {
                width: e.width(),
                height: e.height(),
                offset: {
                    top: e.scrollTop(),
                    left: e.scrollLeft()
                }
            }: i.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: i.pageY,
                    left: i.pageX
                }
            }: {
                width: e.outerWidth(),
                height: e.outerHeight(),
                offset: e.offset()
            }
        }
        t.ui = t.ui || {};
        var s, o, a = Math.max,
        r = Math.abs,
        l = Math.round,
        h = /left|center|right/,
        u = /top|center|bottom/,
        c = /[\+\-]\d+(\.[\d]+)?%?/,
        d = /^\w+/,
        p = /%$/,
        f = t.fn.position;
        t.position = {
            scrollbarWidth: function() {
                if (void 0 !== s) return s;
                var e, i, n = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                o = n.children()[0];
                return t("body").append(n),
                e = o.offsetWidth,
                n.css("overflow", "scroll"),
                i = o.offsetWidth,
                e === i && (i = n[0].clientWidth),
                n.remove(),
                s = e - i
            },
            getScrollInfo: function(e) {
                var i = e.isWindow || e.isDocument ? "": e.element.css("overflow-x"),
                n = e.isWindow || e.isDocument ? "": e.element.css("overflow-y"),
                s = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth,
                o = "scroll" === n || "auto" === n && e.height < e.element[0].scrollHeight;
                return {
                    width: o ? t.position.scrollbarWidth() : 0,
                    height: s ? t.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function(e) {
                var i = t(e || window),
                n = t.isWindow(i[0]),
                s = !!i[0] && 9 === i[0].nodeType;
                return {
                    element: i,
                    isWindow: n,
                    isDocument: s,
                    offset: i.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: i.scrollLeft(),
                    scrollTop: i.scrollTop(),
                    width: n || s ? i.width() : i.outerWidth(),
                    height: n || s ? i.height() : i.outerHeight()
                }
            }
        },
        t.fn.position = function(s) {
            if (!s || !s.of) return f.apply(this, arguments);
            s = t.extend({},
            s);
            var p, m, g, v, b, y, _ = t(s.of),
            w = t.position.getWithinInfo(s.within),
            x = t.position.getScrollInfo(w),
            k = (s.collision || "flip").split(" "),
            C = {};
            return y = n(_),
            _[0].preventDefault && (s.at = "left top"),
            m = y.width,
            g = y.height,
            v = y.offset,
            b = t.extend({},
            v),
            t.each(["my", "at"],
            function() {
                var t, e, i = (s[this] || "").split(" ");
                1 === i.length && (i = h.test(i[0]) ? i.concat(["center"]) : u.test(i[0]) ? ["center"].concat(i) : ["center", "center"]),
                i[0] = h.test(i[0]) ? i[0] : "center",
                i[1] = u.test(i[1]) ? i[1] : "center",
                t = c.exec(i[0]),
                e = c.exec(i[1]),
                C[this] = [t ? t[0] : 0, e ? e[0] : 0],
                s[this] = [d.exec(i[0])[0], d.exec(i[1])[0]]
            }),
            1 === k.length && (k[1] = k[0]),
            "right" === s.at[0] ? b.left += m: "center" === s.at[0] && (b.left += m / 2),
            "bottom" === s.at[1] ? b.top += g: "center" === s.at[1] && (b.top += g / 2),
            p = e(C.at, m, g),
            b.left += p[0],
            b.top += p[1],
            this.each(function() {
                var n, h, u = t(this),
                c = u.outerWidth(),
                d = u.outerHeight(),
                f = i(this, "marginLeft"),
                y = i(this, "marginTop"),
                T = c + f + i(this, "marginRight") + x.width,
                S = d + y + i(this, "marginBottom") + x.height,
                D = t.extend({},
                b),
                M = e(C.my, u.outerWidth(), u.outerHeight());
                "right" === s.my[0] ? D.left -= c: "center" === s.my[0] && (D.left -= c / 2),
                "bottom" === s.my[1] ? D.top -= d: "center" === s.my[1] && (D.top -= d / 2),
                D.left += M[0],
                D.top += M[1],
                o || (D.left = l(D.left), D.top = l(D.top)),
                n = {
                    marginLeft: f,
                    marginTop: y
                },
                t.each(["left", "top"],
                function(e, i) {
                    t.ui.position[k[e]] && t.ui.position[k[e]][i](D, {
                        targetWidth: m,
                        targetHeight: g,
                        elemWidth: c,
                        elemHeight: d,
                        collisionPosition: n,
                        collisionWidth: T,
                        collisionHeight: S,
                        offset: [p[0] + M[0], p[1] + M[1]],
                        my: s.my,
                        at: s.at,
                        within: w,
                        elem: u
                    })
                }),
                s.using && (h = function(t) {
                    var e = v.left - D.left,
                    i = e + m - c,
                    n = v.top - D.top,
                    o = n + g - d,
                    l = {
                        target: {
                            element: _,
                            left: v.left,
                            top: v.top,
                            width: m,
                            height: g
                        },
                        element: {
                            element: u,
                            left: D.left,
                            top: D.top,
                            width: c,
                            height: d
                        },
                        horizontal: 0 > i ? "left": e > 0 ? "right": "center",
                        vertical: 0 > o ? "top": n > 0 ? "bottom": "middle"
                    };
                    c > m && r(e + i) < m && (l.horizontal = "center"),
                    d > g && r(n + o) < g && (l.vertical = "middle"),
                    l.important = a(r(e), r(i)) > a(r(n), r(o)) ? "horizontal": "vertical",
                    s.using.call(this, t, l)
                }),
                u.offset(t.extend(D, {
                    using: h
                }))
            })
        },
        t.ui.position = {
            fit: {
                left: function(t, e) {
                    var i, n = e.within,
                    s = n.isWindow ? n.scrollLeft: n.offset.left,
                    o = n.width,
                    r = t.left - e.collisionPosition.marginLeft,
                    l = s - r,
                    h = r + e.collisionWidth - o - s;
                    e.collisionWidth > o ? l > 0 && 0 >= h ? (i = t.left + l + e.collisionWidth - o - s, t.left += l - i) : t.left = h > 0 && 0 >= l ? s: l > h ? s + o - e.collisionWidth: s: l > 0 ? t.left += l: h > 0 ? t.left -= h: t.left = a(t.left - r, t.left)
                },
                top: function(t, e) {
                    var i, n = e.within,
                    s = n.isWindow ? n.scrollTop: n.offset.top,
                    o = e.within.height,
                    r = t.top - e.collisionPosition.marginTop,
                    l = s - r,
                    h = r + e.collisionHeight - o - s;
                    e.collisionHeight > o ? l > 0 && 0 >= h ? (i = t.top + l + e.collisionHeight - o - s, t.top += l - i) : t.top = h > 0 && 0 >= l ? s: l > h ? s + o - e.collisionHeight: s: l > 0 ? t.top += l: h > 0 ? t.top -= h: t.top = a(t.top - r, t.top)
                }
            },
            flip: {
                left: function(t, e) {
                    var i, n, s = e.within,
                    o = s.offset.left + s.scrollLeft,
                    a = s.width,
                    l = s.isWindow ? s.scrollLeft: s.offset.left,
                    h = t.left - e.collisionPosition.marginLeft,
                    u = h - l,
                    c = h + e.collisionWidth - a - l,
                    d = "left" === e.my[0] ? -e.elemWidth: "right" === e.my[0] ? e.elemWidth: 0,
                    p = "left" === e.at[0] ? e.targetWidth: "right" === e.at[0] ? -e.targetWidth: 0,
                    f = -2 * e.offset[0];
                    0 > u ? (i = t.left + d + p + f + e.collisionWidth - a - o, (0 > i || i < r(u)) && (t.left += d + p + f)) : c > 0 && (n = t.left - e.collisionPosition.marginLeft + d + p + f - l, (n > 0 || r(n) < c) && (t.left += d + p + f))
                },
                top: function(t, e) {
                    var i, n, s = e.within,
                    o = s.offset.top + s.scrollTop,
                    a = s.height,
                    l = s.isWindow ? s.scrollTop: s.offset.top,
                    h = t.top - e.collisionPosition.marginTop,
                    u = h - l,
                    c = h + e.collisionHeight - a - l,
                    d = "top" === e.my[1],
                    p = d ? -e.elemHeight: "bottom" === e.my[1] ? e.elemHeight: 0,
                    f = "top" === e.at[1] ? e.targetHeight: "bottom" === e.at[1] ? -e.targetHeight: 0,
                    m = -2 * e.offset[1];
                    0 > u ? (n = t.top + p + f + m + e.collisionHeight - a - o, (0 > n || n < r(u)) && (t.top += p + f + m)) : c > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + m - l, (i > 0 || r(i) < c) && (t.top += p + f + m))
                }
            },
            flipfit: {
                left: function() {
                    t.ui.position.flip.left.apply(this, arguments),
                    t.ui.position.fit.left.apply(this, arguments)
                },
                top: function() {
                    t.ui.position.flip.top.apply(this, arguments),
                    t.ui.position.fit.top.apply(this, arguments)
                }
            }
        },
        function() {
            var e, i, n, s, a, r = document.getElementsByTagName("body")[0],
            l = document.createElement("div");
            e = document.createElement(r ? "div": "body"),
            n = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            },
            r && t.extend(n, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
            for (a in n) e.style[a] = n[a];
            e.appendChild(l),
            i = r || document.documentElement,
            i.insertBefore(e, i.firstChild),
            l.style.cssText = "position: absolute; left: 10.7432222px;",
            s = t(l).offset().left,
            o = s > 10 && 11 > s,
            e.innerHTML = "",
            i.removeChild(e)
        } ()
    } ();
    t.ui.position,
    t.widget("ui.accordion", {
        version: "1.11.4",
        options: {
            active: 0,
            animate: {},
            collapsible: !1,
            event: "click",
            header: "> li > :first-child,> :not(li):even",
            heightStyle: "auto",
            icons: {
                activeHeader: "ui-icon-triangle-1-s",
                header: "ui-icon-triangle-1-e"
            },
            activate: null,
            beforeActivate: null
        },
        hideProps: {
            borderTopWidth: "hide",
            borderBottomWidth: "hide",
            paddingTop: "hide",
            paddingBottom: "hide",
            height: "hide"
        },
        showProps: {
            borderTopWidth: "show",
            borderBottomWidth: "show",
            paddingTop: "show",
            paddingBottom: "show",
            height: "show"
        },
        _create: function() {
            var e = this.options;
            this.prevShow = this.prevHide = t(),
            this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"),
            e.collapsible || e.active !== !1 && null != e.active || (e.active = 0),
            this._processPanels(),
            e.active < 0 && (e.active += this.headers.length),
            this._refresh()
        },
        _getCreateEventData: function() {
            return {
                header: this.active,
                panel: this.active.length ? this.active.next() : t()
            }
        },
        _createIcons: function() {
            var e = this.options.icons;
            e && (t("<span>").addClass("ui-accordion-header-icon ui-icon " + e.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader), this.headers.addClass("ui-accordion-icons"))
        },
        _destroyIcons: function() {
            this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
        },
        _destroy: function() {
            var t;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),
            this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(),
            this._destroyIcons(),
            t = this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(),
            "content" !== this.options.heightStyle && t.css("height", "")
        },
        _setOption: function(t, e) {
            return "active" === t ? void this._activate(e) : ("event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)), this._super(t, e), "collapsible" !== t || e || this.options.active !== !1 || this._activate(0), "icons" === t && (this._destroyIcons(), e && this._createIcons()), void("disabled" === t && (this.element.toggleClass("ui-state-disabled", !!e).attr("aria-disabled", e), this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!e))))
        },
        _keydown: function(e) {
            if (!e.altKey && !e.ctrlKey) {
                var i = t.ui.keyCode,
                n = this.headers.length,
                s = this.headers.index(e.target),
                o = !1;
                switch (e.keyCode) {
                case i.RIGHT:
                case i.DOWN:
                    o = this.headers[(s + 1) % n];
                    break;
                case i.LEFT:
                case i.UP:
                    o = this.headers[(s - 1 + n) % n];
                    break;
                case i.SPACE:
                case i.ENTER:
                    this._eventHandler(e);
                    break;
                case i.HOME:
                    o = this.headers[0];
                    break;
                case i.END:
                    o = this.headers[n - 1]
                }
                o && (t(e.target).attr("tabIndex", -1), t(o).attr("tabIndex", 0), o.focus(), e.preventDefault())
            }
        },
        _panelKeyDown: function(e) {
            e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().focus()
        },
        refresh: function() {
            var e = this.options;
            this._processPanels(),
            e.active === !1 && e.collapsible === !0 || !this.headers.length ? (e.active = !1, this.active = t()) : e.active === !1 ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e.active = !1, this.active = t()) : this._activate(Math.max(0, e.active - 1)) : e.active = this.headers.index(this.active),
            this._destroyIcons(),
            this._refresh()
        },
        _processPanels: function() {
            var t = this.headers,
            e = this.panels;
            this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"),
            this.panels = this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(),
            e && (this._off(t.not(this.headers)), this._off(e.not(this.panels)))
        },
        _refresh: function() {
            var e, i = this.options,
            n = i.heightStyle,
            s = this.element.parent();
            this.active = this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),
            this.active.next().addClass("ui-accordion-content-active").show(),
            this.headers.attr("role", "tab").each(function() {
                var e = t(this),
                i = e.uniqueId().attr("id"),
                n = e.next(),
                s = n.uniqueId().attr("id");
                e.attr("aria-controls", s),
                n.attr("aria-labelledby", i)
            }).next().attr("role", "tabpanel"),
            this.headers.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }).next().attr({
                "aria-hidden": "true"
            }).hide(),
            this.active.length ? this.active.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }).next().attr({
                "aria-hidden": "false"
            }) : this.headers.eq(0).attr("tabIndex", 0),
            this._createIcons(),
            this._setupEvents(i.event),
            "fill" === n ? (e = s.height(), this.element.siblings(":visible").each(function() {
                var i = t(this),
                n = i.css("position");
                "absolute" !== n && "fixed" !== n && (e -= i.outerHeight(!0))
            }), this.headers.each(function() {
                e -= t(this).outerHeight(!0)
            }), this.headers.next().each(function() {
                t(this).height(Math.max(0, e - t(this).innerHeight() + t(this).height()))
            }).css("overflow", "auto")) : "auto" === n && (e = 0, this.headers.next().each(function() {
                e = Math.max(e, t(this).css("height", "").height())
            }).height(e))
        },
        _activate: function(e) {
            var i = this._findActive(e)[0];
            i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
                target: i,
                currentTarget: i,
                preventDefault: t.noop
            }))
        },
        _findActive: function(e) {
            return "number" == typeof e ? this.headers.eq(e) : t()
        },
        _setupEvents: function(e) {
            var i = {
                keydown: "_keydown"
            };
            e && t.each(e.split(" "),
            function(t, e) {
                i[e] = "_eventHandler"
            }),
            this._off(this.headers.add(this.headers.next())),
            this._on(this.headers, i),
            this._on(this.headers.next(), {
                keydown: "_panelKeyDown"
            }),
            this._hoverable(this.headers),
            this._focusable(this.headers)
        },
        _eventHandler: function(e) {
            var i = this.options,
            n = this.active,
            s = t(e.currentTarget),
            o = s[0] === n[0],
            a = o && i.collapsible,
            r = a ? t() : s.next(),
            l = n.next(),
            h = {
                oldHeader: n,
                oldPanel: l,
                newHeader: a ? t() : s,
                newPanel: r
            };
            e.preventDefault(),
            o && !i.collapsible || this._trigger("beforeActivate", e, h) === !1 || (i.active = a ? !1 : this.headers.index(s), this.active = o ? t() : s, this._toggle(h), n.removeClass("ui-accordion-header-active ui-state-active"), i.icons && n.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), o || (s.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && s.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), s.next().addClass("ui-accordion-content-active")))
        },
        _toggle: function(e) {
            var i = e.newPanel,
            n = this.prevShow.length ? this.prevShow: e.oldPanel;
            this.prevShow.add(this.prevHide).stop(!0, !0),
            this.prevShow = i,
            this.prevHide = n,
            this.options.animate ? this._animate(i, n, e) : (n.hide(), i.show(), this._toggleComplete(e)),
            n.attr({
                "aria-hidden": "true"
            }),
            n.prev().attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            }),
            i.length && n.length ? n.prev().attr({
                tabIndex: -1,
                "aria-expanded": "false"
            }) : i.length && this.headers.filter(function() {
                return 0 === parseInt(t(this).attr("tabIndex"), 10)
            }).attr("tabIndex", -1),
            i.attr("aria-hidden", "false").prev().attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            })
        },
        _animate: function(t, e, i) {
            var n, s, o, a = this,
            r = 0,
            l = t.css("box-sizing"),
            h = t.length && (!e.length || t.index() < e.index()),
            u = this.options.animate || {},
            c = h && u.down || u,
            d = function() {
                a._toggleComplete(i)
            };
            return "number" == typeof c && (o = c),
            "string" == typeof c && (s = c),
            s = s || c.easing || u.easing,
            o = o || c.duration || u.duration,
            e.length ? t.length ? (n = t.show().outerHeight(), e.animate(this.hideProps, {
                duration: o,
                easing: s,
                step: function(t, e) {
                    e.now = Math.round(t)
                }
            }), void t.hide().animate(this.showProps, {
                duration: o,
                easing: s,
                complete: d,
                step: function(t, i) {
                    i.now = Math.round(t),
                    "height" !== i.prop ? "content-box" === l && (r += i.now) : "content" !== a.options.heightStyle && (i.now = Math.round(n - e.outerHeight() - r), r = 0)
                }
            })) : e.animate(this.hideProps, o, s, d) : t.animate(this.showProps, o, s, d)
        },
        _toggleComplete: function(t) {
            var e = t.oldPanel;
            e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),
            e.length && (e.parent()[0].className = e.parent()[0].className),
            this._trigger("activate", null, t)
        }
    }),
    t.widget("ui.menu", {
        version: "1.11.4",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            items: "> *",
            menus: "ul",
            position: {
                my: "left-1 top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element,
            this.mouseHandled = !1,
            this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }),
            this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"),
            this._on({
                "mousedown .ui-menu-item": function(t) {
                    t.preventDefault()
                },
                "click .ui-menu-item": function(e) {
                    var i = t(e.target);

                    ! this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(e), e.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(e) : !this.element.is(":focus") && t(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function(e) {
                    if (!this.previousFilter) {
                        var i = t(e.currentTarget);
                        i.siblings(".ui-state-active").removeClass("ui-state-active"),
                        this.focus(e, i)
                    }
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(t, e) {
                    var i = this.active || this.element.find(this.options.items).eq(0);
                    e || this.focus(t, i)
                },
                blur: function(e) {
                    this._delay(function() {
                        t.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(e)
                    })
                },
                keydown: "_keydown"
            }),
            this.refresh(),
            this._on(this.document, {
                click: function(t) {
                    this._closeOnDocumentClick(t) && this.collapseAll(t),
                    this.mouseHandled = !1
                }
            })
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var e = t(this);
                e.data("ui-menu-submenu-carat") && e.remove()
            }),
            this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function(e) {
            var i, n, s, o, a = !0;
            switch (e.keyCode) {
            case t.ui.keyCode.PAGE_UP:
                this.previousPage(e);
                break;
            case t.ui.keyCode.PAGE_DOWN:
                this.nextPage(e);
                break;
            case t.ui.keyCode.HOME:
                this._move("first", "first", e);
                break;
            case t.ui.keyCode.END:
                this._move("last", "last", e);
                break;
            case t.ui.keyCode.UP:
                this.previous(e);
                break;
            case t.ui.keyCode.DOWN:
                this.next(e);
                break;
            case t.ui.keyCode.LEFT:
                this.collapse(e);
                break;
            case t.ui.keyCode.RIGHT:
                this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
                break;
            case t.ui.keyCode.ENTER:
            case t.ui.keyCode.SPACE:
                this._activate(e);
                break;
            case t.ui.keyCode.ESCAPE:
                this.collapse(e);
                break;
            default:
                a = !1,
                n = this.previousFilter || "",
                s = String.fromCharCode(e.keyCode),
                o = !1,
                clearTimeout(this.filterTimer),
                s === n ? o = !0 : s = n + s,
                i = this._filterMenuItems(s),
                i = o && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i,
                i.length || (s = String.fromCharCode(e.keyCode), i = this._filterMenuItems(s)),
                i.length ? (this.focus(e, i), this.previousFilter = s, this.filterTimer = this._delay(function() {
                    delete this.previousFilter
                },
                1e3)) : delete this.previousFilter
            }
            a && e.preventDefault()
        },
        _activate: function(t) {
            this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(t) : this.select(t))
        },
        refresh: function() {
            var e, i, n = this,
            s = this.options.icons.submenu,
            o = this.element.find(this.options.menus);
            this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length),
            o.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var e = t(this),
                i = e.parent(),
                n = t("<span>").addClass("ui-menu-icon ui-icon " + s).data("ui-menu-submenu-carat", !0);
                i.attr("aria-haspopup", "true").prepend(n),
                e.attr("aria-labelledby", i.attr("id"))
            }),
            e = o.add(this.element),
            i = e.find(this.options.items),
            i.not(".ui-menu-item").each(function() {
                var e = t(this);
                n._isDivider(e) && e.addClass("ui-widget-content ui-menu-divider")
            }),
            i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
                tabIndex: -1,
                role: this._itemRole()
            }),
            i.filter(".ui-state-disabled").attr("aria-disabled", "true"),
            this.active && !t.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            } [this.options.role]
        },
        _setOption: function(t, e) {
            "icons" === t && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu),
            "disabled" === t && this.element.toggleClass("ui-state-disabled", !!e).attr("aria-disabled", e),
            this._super(t, e)
        },
        focus: function(t, e) {
            var i, n;
            this.blur(t, t && "focus" === t.type),
            this._scrollIntoView(e),
            this.active = e.first(),
            n = this.active.addClass("ui-state-focus").removeClass("ui-state-active"),
            this.options.role && this.element.attr("aria-activedescendant", n.attr("id")),
            this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"),
            t && "keydown" === t.type ? this._close() : this.timer = this._delay(function() {
                this._close()
            },
            this.delay),
            i = e.children(".ui-menu"),
            i.length && t && /^mouse/.test(t.type) && this._startOpening(i),
            this.activeMenu = e.parent(),
            this._trigger("focus", t, {
                item: e
            })
        },
        _scrollIntoView: function(e) {
            var i, n, s, o, a, r;
            this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, n = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, s = e.offset().top - this.activeMenu.offset().top - i - n, o = this.activeMenu.scrollTop(), a = this.activeMenu.height(), r = e.outerHeight(), 0 > s ? this.activeMenu.scrollTop(o + s) : s + r > a && this.activeMenu.scrollTop(o + s - a + r))
        },
        blur: function(t, e) {
            e || clearTimeout(this.timer),
            this.active && (this.active.removeClass("ui-state-focus"), this.active = null, this._trigger("blur", t, {
                item: this.active
            }))
        },
        _startOpening: function(t) {
            clearTimeout(this.timer),
            "true" === t.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close(),
                this._open(t)
            },
            this.delay))
        },
        _open: function(e) {
            var i = t.extend({
                of: this.active
            },
            this.options.position);
            clearTimeout(this.timer),
            this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"),
            e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
        },
        collapseAll: function(e, i) {
            clearTimeout(this.timer),
            this.timer = this._delay(function() {
                var n = i ? this.element: t(e && e.target).closest(this.element.find(".ui-menu"));
                n.length || (n = this.element),
                this._close(n),
                this.blur(e),
                this.activeMenu = n
            },
            this.delay)
        },
        _close: function(t) {
            t || (t = this.active ? this.active.parent() : this.element),
            t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")
        },
        _closeOnDocumentClick: function(e) {
            return ! t(e.target).closest(".ui-menu").length
        },
        _isDivider: function(t) {
            return ! /[^\-\u2014\u2013\s]/.test(t.text())
        },
        collapse: function(t) {
            var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            e && e.length && (this._close(), this.focus(t, e))
        },
        expand: function(t) {
            var e = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
            e && e.length && (this._open(e.parent()), this._delay(function() {
                this.focus(t, e)
            }))
        },
        next: function(t) {
            this._move("next", "first", t)
        },
        previous: function(t) {
            this._move("prev", "last", t)
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function(t, e, i) {
            var n;
            this.active && (n = "first" === t || "last" === t ? this.active["first" === t ? "prevAll": "nextAll"](".ui-menu-item").eq( - 1) : this.active[t + "All"](".ui-menu-item").eq(0)),
            n && n.length && this.active || (n = this.activeMenu.find(this.options.items)[e]()),
            this.focus(i, n)
        },
        nextPage: function(e) {
            var i, n, s;
            return this.active ? void(this.isLastItem() || (this._hasScroll() ? (n = this.active.offset().top, s = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                return i = t(this),
                i.offset().top - n - s < 0
            }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items)[this.active ? "last": "first"]()))) : void this.next(e)
        },
        previousPage: function(e) {
            var i, n, s;
            return this.active ? void(this.isFirstItem() || (this._hasScroll() ? (n = this.active.offset().top, s = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                return i = t(this),
                i.offset().top - n + s > 0
            }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items).first()))) : void this.next(e)
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function(e) {
            this.active = this.active || t(e.target).closest(".ui-menu-item");
            var i = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(e, !0),
            this._trigger("select", e, i)
        },
        _filterMenuItems: function(e) {
            var i = e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
            n = new RegExp("^" + i, "i");
            return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
                return n.test(t.trim(t(this).text()))
            })
        }
    });
    t.widget("ui.autocomplete", {
        version: "1.11.4",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        requestIndex: 0,
        pending: 0,
        _create: function() {
            var e, i, n, s = this.element[0].nodeName.toLowerCase(),
            o = "textarea" === s,
            a = "input" === s;
            this.isMultiLine = o ? !0 : a ? !1 : this.element.prop("isContentEditable"),
            this.valueMethod = this.element[o || a ? "val": "text"],
            this.isNewMenu = !0,
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"),
            this._on(this.element, {
                keydown: function(s) {
                    if (this.element.prop("readOnly")) return e = !0,
                    n = !0,
                    void(i = !0);
                    e = !1,
                    n = !1,
                    i = !1;
                    var o = t.ui.keyCode;
                    switch (s.keyCode) {
                    case o.PAGE_UP:
                        e = !0,
                        this._move("previousPage", s);
                        break;
                    case o.PAGE_DOWN:
                        e = !0,
                        this._move("nextPage", s);
                        break;
                    case o.UP:
                        e = !0,
                        this._keyEvent("previous", s);
                        break;
                    case o.DOWN:
                        e = !0,
                        this._keyEvent("next", s);
                        break;
                    case o.ENTER:
                        this.menu.active && (e = !0, s.preventDefault(), this.menu.select(s));
                        break;
                    case o.TAB:
                        this.menu.active && this.menu.select(s);
                        break;
                    case o.ESCAPE:
                        this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(s), s.preventDefault());
                        break;
                    default:
                        i = !0,
                        this._searchTimeout(s)
                    }
                },
                keypress: function(n) {
                    if (e) return e = !1,
                    void((!this.isMultiLine || this.menu.element.is(":visible")) && n.preventDefault());
                    if (!i) {
                        var s = t.ui.keyCode;
                        switch (n.keyCode) {
                        case s.PAGE_UP:
                            this._move("previousPage", n);
                            break;
                        case s.PAGE_DOWN:
                            this._move("nextPage", n);
                            break;
                        case s.UP:
                            this._keyEvent("previous", n);
                            break;
                        case s.DOWN:
                            this._keyEvent("next", n)
                        }
                    }
                },
                input: function(t) {
                    return n ? (n = !1, void t.preventDefault()) : void this._searchTimeout(t)
                },
                focus: function() {
                    this.selectedItem = null,
                    this.previous = this._value()
                },
                blur: function(t) {
                    return this.cancelBlur ? void delete this.cancelBlur: (clearTimeout(this.searching), this.close(t), void this._change(t))
                }
            }),
            this._initSource(),
            this.menu = t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                role: null
            }).hide().menu("instance"),
            this._on(this.menu.element, {
                mousedown: function(e) {
                    e.preventDefault(),
                    this.cancelBlur = !0,
                    this._delay(function() {
                        delete this.cancelBlur
                    });
                    var i = this.menu.element[0];
                    t(e.target).closest(".ui-menu-item").length || this._delay(function() {
                        var e = this;
                        this.document.one("mousedown",
                        function(n) {
                            n.target === e.element[0] || n.target === i || t.contains(i, n.target) || e.close()
                        })
                    })
                },
                menufocus: function(e, i) {
                    var n, s;
                    return this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type)) ? (this.menu.blur(), void this.document.one("mousemove",
                    function() {
                        t(e.target).trigger(e.originalEvent)
                    })) : (s = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", e, {
                        item: s
                    }) && e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(s.value), n = i.item.attr("aria-label") || s.value, void(n && t.trim(n).length && (this.liveRegion.children().hide(), t("<div>").text(n).appendTo(this.liveRegion))))
                },
                menuselect: function(t, e) {
                    var i = e.item.data("ui-autocomplete-item"),
                    n = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = n, this._delay(function() {
                        this.previous = n,
                        this.selectedItem = i
                    })),
                    !1 !== this._trigger("select", t, {
                        item: i
                    }) && this._value(i.value),
                    this.term = this._value(),
                    this.close(t),
                    this.selectedItem = i
                }
            }),
            this.liveRegion = t("<span>", {
                role: "status",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body),
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function() {
            clearTimeout(this.searching),
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),
            this.menu.element.remove(),
            this.liveRegion.remove()
        },
        _setOption: function(t, e) {
            this._super(t, e),
            "source" === t && this._initSource(),
            "appendTo" === t && this.menu.element.appendTo(this._appendTo()),
            "disabled" === t && e && this.xhr && this.xhr.abort()
        },
        _appendTo: function() {
            var e = this.options.appendTo;
            return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)),
            e && e[0] || (e = this.element.closest(".ui-front")),
            e.length || (e = this.document[0].body),
            e
        },
        _initSource: function() {
            var e, i, n = this;
            t.isArray(this.options.source) ? (e = this.options.source, this.source = function(i, n) {
                n(t.ui.autocomplete.filter(e, i.term))
            }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(e, s) {
                n.xhr && n.xhr.abort(),
                n.xhr = t.ajax({
                    url: i,
                    data: e,
                    dataType: "json",
                    success: function(t) {
                        s(t)
                    },
                    error: function() {
                        s([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function(t) {
            clearTimeout(this.searching),
            this.searching = this._delay(function() {
                var e = this.term === this._value(),
                i = this.menu.element.is(":visible"),
                n = t.altKey || t.ctrlKey || t.metaKey || t.shiftKey; (!e || e && !i && !n) && (this.selectedItem = null, this.search(null, t))
            },
            this.options.delay)
        },
        search: function(t, e) {
            return t = null != t ? t: this._value(),
            this.term = this._value(),
            t.length < this.options.minLength ? this.close(e) : this._trigger("search", e) !== !1 ? this._search(t) : void 0
        },
        _search: function(t) {
            this.pending++,
            this.element.addClass("ui-autocomplete-loading"),
            this.cancelSearch = !1,
            this.source({
                term: t
            },
            this._response())
        },
        _response: function() {
            var e = ++this.requestIndex;
            return t.proxy(function(t) {
                e === this.requestIndex && this.__response(t),
                this.pending--,
                this.pending || this.element.removeClass("ui-autocomplete-loading")
            },
            this)
        },
        __response: function(t) {
            t && (t = this._normalize(t)),
            this._trigger("response", null, {
                content: t
            }),
            !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close()
        },
        close: function(t) {
            this.cancelSearch = !0,
            this._close(t)
        },
        _close: function(t) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t))
        },
        _change: function(t) {
            this.previous !== this._value() && this._trigger("change", t, {
                item: this.selectedItem
            })
        },
        _normalize: function(e) {
            return e.length && e[0].label && e[0].value ? e: t.map(e,
            function(e) {
                return "string" == typeof e ? {
                    label: e,
                    value: e
                }: t.extend({},
                e, {
                    label: e.label || e.value,
                    value: e.value || e.label
                })
            })
        },
        _suggest: function(e) {
            var i = this.menu.element.empty();
            this._renderMenu(i, e),
            this.isNewMenu = !0,
            this.menu.refresh(),
            i.show(),
            this._resizeMenu(),
            i.position(t.extend({
                of: this.element
            },
            this.options.position)),
            this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function() {
            var t = this.menu.element;
            t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(e, i) {
            var n = this;
            t.each(i,
            function(t, i) {
                n._renderItemData(e, i)
            })
        },
        _renderItemData: function(t, e) {
            return this._renderItem(t, e).data("ui-autocomplete-item", e)
        },
        _renderItem: function(e, i) {
            return t("<li>").text(i.label).appendTo(e)
        },
        _move: function(t, e) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this.isMultiLine || this._value(this.term), void this.menu.blur()) : void this.menu[t](e) : void this.search(null, e)
        },
        widget: function() {
            return this.menu.element
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function(t, e) { (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t, e), e.preventDefault())
        }
    }),
    t.extend(t.ui.autocomplete, {
        escapeRegex: function(t) {
            return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(e, i) {
            var n = new RegExp(t.ui.autocomplete.escapeRegex(i), "i");
            return t.grep(e,
            function(t) {
                return n.test(t.label || t.value || t)
            })
        }
    }),
    t.widget("ui.autocomplete", t.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(t) {
                    return t + (t > 1 ? " results are": " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function(e) {
            var i;
            this._superApply(arguments),
            this.options.disabled || this.cancelSearch || (i = e && e.length ? this.options.messages.results(e.length) : this.options.messages.noResults, this.liveRegion.children().hide(), t("<div>").text(i).appendTo(this.liveRegion))
        }
    });
    var d, p = (t.ui.autocomplete, "ui-button ui-widget ui-state-default ui-corner-all"),
    f = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
    m = function() {
        var e = t(this);
        setTimeout(function() {
            e.find(":ui-button").button("refresh")
        },
        1)
    },
    g = function(e) {
        var i = e.name,
        n = e.form,
        s = t([]);
        return i && (i = i.replace(/'/g, "\\'"), s = n ? t(n).find("[name='" + i + "'][type=radio]") : t("[name='" + i + "'][type=radio]", e.ownerDocument).filter(function() {
            return ! this.form
        })),
        s
    };
    t.widget("ui.button", {
        version: "1.11.4",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: !0,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, m),
            "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled),
            this._determineButtonType(),
            this.hasTitle = !!this.buttonElement.attr("title");
            var e = this,
            i = this.options,
            n = "checkbox" === this.type || "radio" === this.type,
            s = n ? "": "ui-state-active";
            null === i.label && (i.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()),
            this._hoverable(this.buttonElement),
            this.buttonElement.addClass(p).attr("role", "button").bind("mouseenter" + this.eventNamespace,
            function() {
                i.disabled || this === d && t(this).addClass("ui-state-active")
            }).bind("mouseleave" + this.eventNamespace,
            function() {
                i.disabled || t(this).removeClass(s)
            }).bind("click" + this.eventNamespace,
            function(t) {
                i.disabled && (t.preventDefault(), t.stopImmediatePropagation())
            }),
            this._on({
                focus: function() {
                    this.buttonElement.addClass("ui-state-focus")
                },
                blur: function() {
                    this.buttonElement.removeClass("ui-state-focus")
                }
            }),
            n && this.element.bind("change" + this.eventNamespace,
            function() {
                e.refresh()
            }),
            "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace,
            function() {
                return i.disabled ? !1 : void 0
            }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace,
            function() {
                if (i.disabled) return ! 1;
                t(this).addClass("ui-state-active"),
                e.buttonElement.attr("aria-pressed", "true");
                var n = e.element[0];
                g(n).not(n).map(function() {
                    return t(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace,
            function() {
                return i.disabled ? !1 : (t(this).addClass("ui-state-active"), d = this, void e.document.one("mouseup",
                function() {
                    d = null
                }))
            }).bind("mouseup" + this.eventNamespace,
            function() {
                return i.disabled ? !1 : void t(this).removeClass("ui-state-active")
            }).bind("keydown" + this.eventNamespace,
            function(e) {
                return i.disabled ? !1 : void((e.keyCode === t.ui.keyCode.SPACE || e.keyCode === t.ui.keyCode.ENTER) && t(this).addClass("ui-state-active"))
            }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace,
            function() {
                t(this).removeClass("ui-state-active")
            }), this.buttonElement.is("a") && this.buttonElement.keyup(function(e) {
                e.keyCode === t.ui.keyCode.SPACE && t(this).click()
            })),
            this._setOption("disabled", i.disabled),
            this._resetButton()
        },
        _determineButtonType: function() {
            var t, e, i;
            this.type = this.element.is("[type=checkbox]") ? "checkbox": this.element.is("[type=radio]") ? "radio": this.element.is("input") ? "input": "button",
            "checkbox" === this.type || "radio" === this.type ? (t = this.element.parents().last(), e = "label[for='" + this.element.attr("id") + "']", this.buttonElement = t.find(e), this.buttonElement.length || (t = t.length ? t.siblings() : this.element.siblings(), this.buttonElement = t.filter(e), this.buttonElement.length || (this.buttonElement = t.find(e))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
        },
        widget: function() {
            return this.buttonElement
        },
        _destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible"),
            this.buttonElement.removeClass(p + " ui-state-active " + f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),
            this.hasTitle || this.buttonElement.removeAttr("title")
        },
        _setOption: function(t, e) {
            return this._super(t, e),
            "disabled" === t ? (this.widget().toggleClass("ui-state-disabled", !!e), this.element.prop("disabled", !!e), void(e && this.buttonElement.removeClass("checkbox" === this.type || "radio" === this.type ? "ui-state-focus": "ui-state-focus ui-state-active"))) : void this._resetButton()
        },
        refresh: function() {
            var e = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            e !== this.options.disabled && this._setOption("disabled", e),
            "radio" === this.type ? g(this.element[0]).each(function() {
                t(this).is(":checked") ? t(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function() {
            if ("input" === this.type) return void(this.options.label && this.element.val(this.options.label));
            var e = this.buttonElement.removeClass(f),
            i = t("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),
            n = this.options.icons,
            s = n.primary && n.secondary,
            o = [];
            n.primary || n.secondary ? (this.options.text && o.push("ui-button-text-icon" + (s ? "s": n.primary ? "-primary": "-secondary")), n.primary && e.prepend("<span class='ui-button-icon-primary ui-icon " + n.primary + "'></span>"), n.secondary && e.append("<span class='ui-button-icon-secondary ui-icon " + n.secondary + "'></span>"), this.options.text || (o.push(s ? "ui-button-icons-only": "ui-button-icon-only"), this.hasTitle || e.attr("title", t.trim(i)))) : o.push("ui-button-text-only"),
            e.addClass(o.join(" "))
        }
    }),
    t.widget("ui.buttonset", {
        version: "1.11.4",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset")
        },
        _init: function() {
            this.refresh()
        },
        _setOption: function(t, e) {
            "disabled" === t && this.buttons.button("option", t, e),
            this._super(t, e)
        },
        refresh: function() {
            var e = "rtl" === this.element.css("direction"),
            i = this.element.find(this.options.items),
            n = i.filter(":ui-button");
            i.not(":ui-button").button(),
            n.button("refresh"),
            this.buttons = i.map(function() {
                return t(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e ? "ui-corner-right": "ui-corner-left").end().filter(":last").addClass(e ? "ui-corner-left": "ui-corner-right").end().end()
        },
        _destroy: function() {
            this.element.removeClass("ui-buttonset"),
            this.buttons.map(function() {
                return t(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    });
    t.ui.button;
    t.extend(t.ui, {
        datepicker: {
            version: "1.11.4"
        }
    });
    var v;
    t.extend(s.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(t) {
            return r(this._defaults, t || {}),
            this
        },
        _attachDatepicker: function(e, i) {
            var n, s, o;
            n = e.nodeName.toLowerCase(),
            s = "div" === n || "span" === n,
            e.id || (this.uuid += 1, e.id = "dp" + this.uuid),
            o = this._newInst(t(e), s),
            o.settings = t.extend({},
            i || {}),
            "input" === n ? this._connectDatepicker(e, o) : s && this._inlineDatepicker(e, o)
        },
        _newInst: function(e, i) {
            var n = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: n,
                input: e,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: i,
                dpDiv: i ? o(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function(e, i) {
            var n = t(e);
            i.append = t([]),
            i.trigger = t([]),
            n.hasClass(this.markerClassName) || (this._attachments(n, i), n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), t.data(e, "datepicker", i), i.settings.disabled && this._disableDatepicker(e))
        },
        _attachments: function(e, i) {
            var n, s, o, a = this._get(i, "appendText"),
            r = this._get(i, "isRTL");
            i.append && i.append.remove(),
            a && (i.append = t("<span class='" + this._appendClass + "'>" + a + "</span>"), e[r ? "before": "after"](i.append)),
            e.unbind("focus", this._showDatepicker),
            i.trigger && i.trigger.remove(),
            n = this._get(i, "showOn"),
            ("focus" === n || "both" === n) && e.focus(this._showDatepicker),
            ("button" === n || "both" === n) && (s = this._get(i, "buttonText"), o = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({
                src: o,
                alt: s,
                title: s
            }) : t("<button type='button'></button>").addClass(this._triggerClass).html(o ? t("<img/>").attr({
                src: o,
                alt: s,
                title: s
            }) : s)), e[r ? "before": "after"](i.trigger), i.trigger.click(function() {
                return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]),
                !1
            }))
        },
        _autoSize: function(t) {
            if (this._get(t, "autoSize") && !t.inline) {
                var e, i, n, s, o = new Date(2009, 11, 20),
                a = this._get(t, "dateFormat");
                a.match(/[DM]/) && (e = function(t) {
                    for (i = 0, n = 0, s = 0; s < t.length; s++) t[s].length > i && (i = t[s].length, n = s);
                    return n
                },
                o.setMonth(e(this._get(t, a.match(/MM/) ? "monthNames": "monthNamesShort"))), o.setDate(e(this._get(t, a.match(/DD/) ? "dayNames": "dayNamesShort")) + 20 - o.getDay())),
                t.input.attr("size", this._formatDate(t, o).length)
            }
        },
        _inlineDatepicker: function(e, i) {
            var n = t(e);
            n.hasClass(this.markerClassName) || (n.addClass(this.markerClassName).append(i.dpDiv), t.data(e, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(e, i, n, s, o) {
            var a, l, h, u, c, d = this._dialogInst;
            return d || (this.uuid += 1, a = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + a + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), t("body").append(this._dialogInput), d = this._dialogInst = this._newInst(this._dialogInput, !1), d.settings = {},
            t.data(this._dialogInput[0], "datepicker", d)),
            r(d.settings, s || {}),
            i = i && i.constructor === Date ? this._formatDate(d, i) : i,
            this._dialogInput.val(i),
            this._pos = o ? o.length ? o: [o.pageX, o.pageY] : null,
            this._pos || (l = document.documentElement.clientWidth, h = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, c = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [l / 2 - 100 + u, h / 2 - 150 + c]),
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"),
            d.settings.onSelect = n,
            this._inDialog = !0,
            this.dpDiv.addClass(this._dialogClass),
            this._showDatepicker(this._dialogInput[0]),
            t.blockUI && t.blockUI(this.dpDiv),
            t.data(this._dialogInput[0], "datepicker", d),
            this
        },
        _destroyDatepicker: function(e) {
            var i, n = t(e),
            s = t.data(e, "datepicker");
            n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, "datepicker"), "input" === i ? (s.append.remove(), s.trigger.remove(), n.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && n.removeClass(this.markerClassName).empty(), v === s && (v = null))
        },
        _enableDatepicker: function(e) {
            var i, n, s = t(e),
            o = t.data(e, "datepicker");
            s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, o.trigger.filter("button").each(function() {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : ("div" === i || "span" === i) && (n = s.children("." + this._inlineClass), n.children().removeClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs,
            function(t) {
                return t === e ? null: t
            }))
        },
        _disableDatepicker: function(e) {
            var i, n, s = t(e),
            o = t.data(e, "datepicker");
            s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, o.trigger.filter("button").each(function() {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : ("div" === i || "span" === i) && (n = s.children("." + this._inlineClass), n.children().addClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs,
            function(t) {
                return t === e ? null: t
            }), this._disabledInputs[this._disabledInputs.length] = e)
        },
        _isDisabledDatepicker: function(t) {
            if (!t) return ! 1;
            for (var e = 0; e < this._disabledInputs.length; e++) if (this._disabledInputs[e] === t) return ! 0;
            return ! 1
        },
        _getInst: function(e) {
            try {
                return t.data(e, "datepicker")
            } catch(i) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(e, i, n) {
            var s, o, a, l, h = this._getInst(e);
            return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? t.extend({},
            t.datepicker._defaults) : h ? "all" === i ? t.extend({},
            h.settings) : this._get(h, i) : null: (s = i || {},
            "string" == typeof i && (s = {},
            s[i] = n), void(h && (this._curInst === h && this._hideDatepicker(), o = this._getDateDatepicker(e, !0), a = this._getMinMaxDate(h, "min"), l = this._getMinMaxDate(h, "max"), r(h.settings, s), null !== a && void 0 !== s.dateFormat && void 0 === s.minDate && (h.settings.minDate = this._formatDate(h, a)), null !== l && void 0 !== s.dateFormat && void 0 === s.maxDate && (h.settings.maxDate = this._formatDate(h, l)), "disabled" in s && (s.disabled ? this._disableDatepicker(e) : this._enableDatepicker(e)), this._attachments(t(e), h), this._autoSize(h), this._setDate(h, o), this._updateAlternate(h), this._updateDatepicker(h))))
        },
        _changeDatepicker: function(t, e, i) {
            this._optionDatepicker(t, e, i)
        },
        _refreshDatepicker: function(t) {
            var e = this._getInst(t);
            e && this._updateDatepicker(e)
        },
        _setDateDatepicker: function(t, e) {
            var i = this._getInst(t);
            i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
        },
        _getDateDatepicker: function(t, e) {
            var i = this._getInst(t);
            return i && !i.inline && this._setDateFromField(i, e),
            i ? this._getDate(i) : null
        },
        _doKeyDown: function(e) {
            var i, n, s, o = t.datepicker._getInst(e.target),
            a = !0,
            r = o.dpDiv.is(".ui-datepicker-rtl");
            if (o._keyEvent = !0, t.datepicker._datepickerShowing) switch (e.keyCode) {
            case 9:
                t.datepicker._hideDatepicker(),
                a = !1;
                break;
            case 13:
                return s = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", o.dpDiv),
                s[0] && t.datepicker._selectDay(e.target, o.selectedMonth, o.selectedYear, s[0]),
                i = t.datepicker._get(o, "onSelect"),
                i ? (n = t.datepicker._formatDate(o), i.apply(o.input ? o.input[0] : null, [n, o])) : t.datepicker._hideDatepicker(),
                !1;
            case 27:
                t.datepicker._hideDatepicker();
                break;
            case 33:
                t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
                break;
            case 34:
                t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
                break;
            case 35:
                (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target),
                a = e.ctrlKey || e.metaKey;
                break;
            case 36:
                (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target),
                a = e.ctrlKey || e.metaKey;
                break;
            case 37:
                (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? 1 : -1, "D"),
                a = e.ctrlKey || e.metaKey,
                e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
                break;
            case 38:
                (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"),
                a = e.ctrlKey || e.metaKey;
                break;
            case 39:
                (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? -1 : 1, "D"),
                a = e.ctrlKey || e.metaKey,
                e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");

                break;
            case 40:
                (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"),
                a = e.ctrlKey || e.metaKey;
                break;
            default:
                a = !1
            } else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : a = !1;
            a && (e.preventDefault(), e.stopPropagation())
        },
        _doKeyPress: function(e) {
            var i, n, s = t.datepicker._getInst(e.target);
            return t.datepicker._get(s, "constrainInput") ? (i = t.datepicker._possibleChars(t.datepicker._get(s, "dateFormat")), n = String.fromCharCode(null == e.charCode ? e.keyCode: e.charCode), e.ctrlKey || e.metaKey || " " > n || !i || i.indexOf(n) > -1) : void 0
        },
        _doKeyUp: function(e) {
            var i, n = t.datepicker._getInst(e.target);
            if (n.input.val() !== n.lastVal) try {
                i = t.datepicker.parseDate(t.datepicker._get(n, "dateFormat"), n.input ? n.input.val() : null, t.datepicker._getFormatConfig(n)),
                i && (t.datepicker._setDateFromField(n), t.datepicker._updateAlternate(n), t.datepicker._updateDatepicker(n))
            } catch(s) {}
            return ! 0
        },
        _showDatepicker: function(e) {
            if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
                var i, s, o, a, l, h, u;
                i = t.datepicker._getInst(e),
                t.datepicker._curInst && t.datepicker._curInst !== i && (t.datepicker._curInst.dpDiv.stop(!0, !0), i && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])),
                s = t.datepicker._get(i, "beforeShow"),
                o = s ? s.apply(e, [e, i]) : {},
                o !== !1 && (r(i.settings, o), i.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(i), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), a = !1, t(e).parents().each(function() {
                    return a |= "fixed" === t(this).css("position"),
                    !a
                }), l = {
                    left: t.datepicker._pos[0],
                    top: t.datepicker._pos[1]
                },
                t.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), t.datepicker._updateDatepicker(i), l = t.datepicker._checkOffset(i, l, a), i.dpDiv.css({
                    position: t.datepicker._inDialog && t.blockUI ? "static": a ? "fixed": "absolute",
                    display: "none",
                    left: l.left + "px",
                    top: l.top + "px"
                }), i.inline || (h = t.datepicker._get(i, "showAnim"), u = t.datepicker._get(i, "duration"), i.dpDiv.css("z-index", n(t(e)) + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[h] ? i.dpDiv.show(h, t.datepicker._get(i, "showOptions"), u) : i.dpDiv[h || "show"](h ? u: null), t.datepicker._shouldFocusInput(i) && i.input.focus(), t.datepicker._curInst = i))
            }
        },
        _updateDatepicker: function(e) {
            this.maxRows = 4,
            v = e,
            e.dpDiv.empty().append(this._generateHTML(e)),
            this._attachHandlers(e);
            var i, n = this._getNumberOfMonths(e),
            s = n[1],
            o = 17,
            r = e.dpDiv.find("." + this._dayOverClass + " a");
            r.length > 0 && a.apply(r.get(0)),
            e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),
            s > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + s).css("width", o * s + "em"),
            e.dpDiv[(1 !== n[0] || 1 !== n[1] ? "add": "remove") + "Class"]("ui-datepicker-multi"),
            e.dpDiv[(this._get(e, "isRTL") ? "add": "remove") + "Class"]("ui-datepicker-rtl"),
            e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.focus(),
            e.yearshtml && (i = e.yearshtml, setTimeout(function() {
                i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),
                i = e.yearshtml = null
            },
            0))
        },
        _shouldFocusInput: function(t) {
            return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
        },
        _checkOffset: function(e, i, n) {
            var s = e.dpDiv.outerWidth(),
            o = e.dpDiv.outerHeight(),
            a = e.input ? e.input.outerWidth() : 0,
            r = e.input ? e.input.outerHeight() : 0,
            l = document.documentElement.clientWidth + (n ? 0 : t(document).scrollLeft()),
            h = document.documentElement.clientHeight + (n ? 0 : t(document).scrollTop());
            return i.left -= this._get(e, "isRTL") ? s - a: 0,
            i.left -= n && i.left === e.input.offset().left ? t(document).scrollLeft() : 0,
            i.top -= n && i.top === e.input.offset().top + r ? t(document).scrollTop() : 0,
            i.left -= Math.min(i.left, i.left + s > l && l > s ? Math.abs(i.left + s - l) : 0),
            i.top -= Math.min(i.top, i.top + o > h && h > o ? Math.abs(o + r) : 0),
            i
        },
        _findPos: function(e) {
            for (var i, n = this._getInst(e), s = this._get(n, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));) e = e[s ? "previousSibling": "nextSibling"];
            return i = t(e).offset(),
            [i.left, i.top]
        },
        _hideDatepicker: function(e) {
            var i, n, s, o, a = this._curInst; ! a || e && a !== t.data(e, "datepicker") || this._datepickerShowing && (i = this._get(a, "showAnim"), n = this._get(a, "duration"), s = function() {
                t.datepicker._tidyDialog(a)
            },
            t.effects && (t.effects.effect[i] || t.effects[i]) ? a.dpDiv.hide(i, t.datepicker._get(a, "showOptions"), n, s) : a.dpDiv["slideDown" === i ? "slideUp": "fadeIn" === i ? "fadeOut": "hide"](i ? n: null, s), i || s(), this._datepickerShowing = !1, o = this._get(a, "onClose"), o && o.apply(a.input ? a.input[0] : null, [a.input ? a.input.val() : "", a]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function(t) {
            t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(e) {
            if (t.datepicker._curInst) {
                var i = t(e.target),
                n = t.datepicker._getInst(i[0]); (i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== n) && t.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(e, i, n) {
            var s = t(e),
            o = this._getInst(s[0]);
            this._isDisabledDatepicker(s[0]) || (this._adjustInstDate(o, i + ("M" === n ? this._get(o, "showCurrentAtPos") : 0), n), this._updateDatepicker(o))
        },
        _gotoToday: function(e) {
            var i, n = t(e),
            s = this._getInst(n[0]);
            this._get(s, "gotoCurrent") && s.currentDay ? (s.selectedDay = s.currentDay, s.drawMonth = s.selectedMonth = s.currentMonth, s.drawYear = s.selectedYear = s.currentYear) : (i = new Date, s.selectedDay = i.getDate(), s.drawMonth = s.selectedMonth = i.getMonth(), s.drawYear = s.selectedYear = i.getFullYear()),
            this._notifyChange(s),
            this._adjustDate(n)
        },
        _selectMonthYear: function(e, i, n) {
            var s = t(e),
            o = this._getInst(s[0]);
            o["selected" + ("M" === n ? "Month": "Year")] = o["draw" + ("M" === n ? "Month": "Year")] = parseInt(i.options[i.selectedIndex].value, 10),
            this._notifyChange(o),
            this._adjustDate(s)
        },
        _selectDay: function(e, i, n, s) {
            var o, a = t(e);
            t(s).hasClass(this._unselectableClass) || this._isDisabledDatepicker(a[0]) || (o = this._getInst(a[0]), o.selectedDay = o.currentDay = t("a", s).html(), o.selectedMonth = o.currentMonth = i, o.selectedYear = o.currentYear = n, this._selectDate(e, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear)))
        },
        _clearDate: function(e) {
            var i = t(e);
            this._selectDate(i, "")
        },
        _selectDate: function(e, i) {
            var n, s = t(e),
            o = this._getInst(s[0]);
            i = null != i ? i: this._formatDate(o),
            o.input && o.input.val(i),
            this._updateAlternate(o),
            n = this._get(o, "onSelect"),
            n ? n.apply(o.input ? o.input[0] : null, [i, o]) : o.input && o.input.trigger("change"),
            o.inline ? this._updateDatepicker(o) : (this._hideDatepicker(), this._lastInput = o.input[0], "object" != typeof o.input[0] && o.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function(e) {
            var i, n, s, o = this._get(e, "altField");
            o && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), n = this._getDate(e), s = this.formatDate(i, n, this._getFormatConfig(e)), t(o).each(function() {
                t(this).val(s)
            }))
        },
        noWeekends: function(t) {
            var e = t.getDay();
            return [e > 0 && 6 > e, ""]
        },
        iso8601Week: function(t) {
            var e, i = new Date(t.getTime());
            return i.setDate(i.getDate() + 4 - (i.getDay() || 7)),
            e = i.getTime(),
            i.setMonth(0),
            i.setDate(1),
            Math.floor(Math.round((e - i) / 864e5) / 7) + 1
        },
        parseDate: function(e, i, n) {
            if (null == e || null == i) throw "Invalid arguments";
            if (i = "object" == typeof i ? i.toString() : i + "", "" === i) return null;
            var s, o, a, r, l = 0,
            h = (n ? n.shortYearCutoff: null) || this._defaults.shortYearCutoff,
            u = "string" != typeof h ? h: (new Date).getFullYear() % 100 + parseInt(h, 10),
            c = (n ? n.dayNamesShort: null) || this._defaults.dayNamesShort,
            d = (n ? n.dayNames: null) || this._defaults.dayNames,
            p = (n ? n.monthNamesShort: null) || this._defaults.monthNamesShort,
            f = (n ? n.monthNames: null) || this._defaults.monthNames,
            m = -1,
            g = -1,
            v = -1,
            b = -1,
            y = !1,
            _ = function(t) {
                var i = s + 1 < e.length && e.charAt(s + 1) === t;
                return i && s++,
                i
            },
            w = function(t) {
                var e = _(t),
                n = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
                s = "y" === t ? n: 1,
                o = new RegExp("^\\d{" + s + "," + n + "}"),
                a = i.substring(l).match(o);
                if (!a) throw "Missing number at position " + l;
                return l += a[0].length,
                parseInt(a[0], 10)
            },
            x = function(e, n, s) {
                var o = -1,
                a = t.map(_(e) ? s: n,
                function(t, e) {
                    return [[e, t]]
                }).sort(function(t, e) {
                    return - (t[1].length - e[1].length)
                });
                if (t.each(a,
                function(t, e) {
                    var n = e[1];
                    return i.substr(l, n.length).toLowerCase() === n.toLowerCase() ? (o = e[0], l += n.length, !1) : void 0
                }), -1 !== o) return o + 1;
                throw "Unknown name at position " + l
            },
            k = function() {
                if (i.charAt(l) !== e.charAt(s)) throw "Unexpected literal at position " + l;
                l++
            };
            for (s = 0; s < e.length; s++) if (y)"'" !== e.charAt(s) || _("'") ? k() : y = !1;
            else switch (e.charAt(s)) {
            case "d":
                v = w("d");
                break;
            case "D":
                x("D", c, d);
                break;
            case "o":
                b = w("o");
                break;
            case "m":
                g = w("m");
                break;
            case "M":
                g = x("M", p, f);
                break;
            case "y":
                m = w("y");
                break;
            case "@":
                r = new Date(w("@")),
                m = r.getFullYear(),
                g = r.getMonth() + 1,
                v = r.getDate();
                break;
            case "!":
                r = new Date((w("!") - this._ticksTo1970) / 1e4),
                m = r.getFullYear(),
                g = r.getMonth() + 1,
                v = r.getDate();
                break;
            case "'":
                _("'") ? k() : y = !0;
                break;
            default:
                k()
            }
            if (l < i.length && (a = i.substr(l), !/^\s+/.test(a))) throw "Extra/unparsed characters found in date: " + a;
            if ( - 1 === m ? m = (new Date).getFullYear() : 100 > m && (m += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (u >= m ? 0 : -100)), b > -1) for (g = 1, v = b;;) {
                if (o = this._getDaysInMonth(m, g - 1), o >= v) break;
                g++,
                v -= o
            }
            if (r = this._daylightSavingAdjust(new Date(m, g - 1, v)), r.getFullYear() !== m || r.getMonth() + 1 !== g || r.getDate() !== v) throw "Invalid date";
            return r
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
        formatDate: function(t, e, i) {
            if (!e) return "";
            var n, s = (i ? i.dayNamesShort: null) || this._defaults.dayNamesShort,
            o = (i ? i.dayNames: null) || this._defaults.dayNames,
            a = (i ? i.monthNamesShort: null) || this._defaults.monthNamesShort,
            r = (i ? i.monthNames: null) || this._defaults.monthNames,
            l = function(e) {
                var i = n + 1 < t.length && t.charAt(n + 1) === e;
                return i && n++,
                i
            },
            h = function(t, e, i) {
                var n = "" + e;
                if (l(t)) for (; n.length < i;) n = "0" + n;
                return n
            },
            u = function(t, e, i, n) {
                return l(t) ? n[e] : i[e]
            },
            c = "",
            d = !1;
            if (e) for (n = 0; n < t.length; n++) if (d)"'" !== t.charAt(n) || l("'") ? c += t.charAt(n) : d = !1;
            else switch (t.charAt(n)) {
            case "d":
                c += h("d", e.getDate(), 2);
                break;
            case "D":
                c += u("D", e.getDay(), s, o);
                break;
            case "o":
                c += h("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                break;
            case "m":
                c += h("m", e.getMonth() + 1, 2);
                break;
            case "M":
                c += u("M", e.getMonth(), a, r);
                break;
            case "y":
                c += l("y") ? e.getFullYear() : (e.getYear() % 100 < 10 ? "0": "") + e.getYear() % 100;
                break;
            case "@":
                c += e.getTime();
                break;
            case "!":
                c += 1e4 * e.getTime() + this._ticksTo1970;
                break;
            case "'":
                l("'") ? c += "'": d = !0;
                break;
            default:
                c += t.charAt(n)
            }
            return c
        },
        _possibleChars: function(t) {
            var e, i = "",
            n = !1,
            s = function(i) {
                var n = e + 1 < t.length && t.charAt(e + 1) === i;
                return n && e++,
                n
            };
            for (e = 0; e < t.length; e++) if (n)"'" !== t.charAt(e) || s("'") ? i += t.charAt(e) : n = !1;
            else switch (t.charAt(e)) {
            case "d":
            case "m":
            case "y":
            case "@":
                i += "0123456789";
                break;
            case "D":
            case "M":
                return null;
            case "'":
                s("'") ? i += "'": n = !0;
                break;
            default:
                i += t.charAt(e)
            }
            return i
        },
        _get: function(t, e) {
            return void 0 !== t.settings[e] ? t.settings[e] : this._defaults[e]
        },
        _setDateFromField: function(t, e) {
            if (t.input.val() !== t.lastVal) {
                var i = this._get(t, "dateFormat"),
                n = t.lastVal = t.input ? t.input.val() : null,
                s = this._getDefaultDate(t),
                o = s,
                a = this._getFormatConfig(t);
                try {
                    o = this.parseDate(i, n, a) || s
                } catch(r) {
                    n = e ? "": n
                }
                t.selectedDay = o.getDate(),
                t.drawMonth = t.selectedMonth = o.getMonth(),
                t.drawYear = t.selectedYear = o.getFullYear(),
                t.currentDay = n ? o.getDate() : 0,
                t.currentMonth = n ? o.getMonth() : 0,
                t.currentYear = n ? o.getFullYear() : 0,
                this._adjustInstDate(t)
            }
        },
        _getDefaultDate: function(t) {
            return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
        },
        _determineDate: function(e, i, n) {
            var s = function(t) {
                var e = new Date;
                return e.setDate(e.getDate() + t),
                e
            },
            o = function(i) {
                try {
                    return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e))
                } catch(n) {}
                for (var s = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, o = s.getFullYear(), a = s.getMonth(), r = s.getDate(), l = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, h = l.exec(i); h;) {
                    switch (h[2] || "d") {
                    case "d":
                    case "D":
                        r += parseInt(h[1], 10);
                        break;
                    case "w":
                    case "W":
                        r += 7 * parseInt(h[1], 10);
                        break;
                    case "m":
                    case "M":
                        a += parseInt(h[1], 10),
                        r = Math.min(r, t.datepicker._getDaysInMonth(o, a));
                        break;
                    case "y":
                    case "Y":
                        o += parseInt(h[1], 10),
                        r = Math.min(r, t.datepicker._getDaysInMonth(o, a))
                    }
                    h = l.exec(i)
                }
                return new Date(o, a, r)
            },
            a = null == i || "" === i ? n: "string" == typeof i ? o(i) : "number" == typeof i ? isNaN(i) ? n: s(i) : new Date(i.getTime());
            return a = a && "Invalid Date" === a.toString() ? n: a,
            a && (a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)),
            this._daylightSavingAdjust(a)
        },
        _daylightSavingAdjust: function(t) {
            return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
        },
        _setDate: function(t, e, i) {
            var n = !e,
            s = t.selectedMonth,
            o = t.selectedYear,
            a = this._restrictMinMax(t, this._determineDate(t, e, new Date));
            t.selectedDay = t.currentDay = a.getDate(),
            t.drawMonth = t.selectedMonth = t.currentMonth = a.getMonth(),
            t.drawYear = t.selectedYear = t.currentYear = a.getFullYear(),
            s === t.selectedMonth && o === t.selectedYear || i || this._notifyChange(t),
            this._adjustInstDate(t),
            t.input && t.input.val(n ? "": this._formatDate(t))
        },
        _getDate: function(t) {
            var e = !t.currentYear || t.input && "" === t.input.val() ? null: this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
            return e
        },
        _attachHandlers: function(e) {
            var i = this._get(e, "stepMonths"),
            n = "#" + e.id.replace(/\\\\/g, "\\");
            e.dpDiv.find("[data-handler]").map(function() {
                var e = {
                    prev: function() {
                        t.datepicker._adjustDate(n, -i, "M")
                    },
                    next: function() {
                        t.datepicker._adjustDate(n, +i, "M")
                    },
                    hide: function() {
                        t.datepicker._hideDatepicker()
                    },
                    today: function() {
                        t.datepicker._gotoToday(n)
                    },
                    selectDay: function() {
                        return t.datepicker._selectDay(n, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this),
                        !1
                    },
                    selectMonth: function() {
                        return t.datepicker._selectMonthYear(n, this, "M"),
                        !1
                    },
                    selectYear: function() {
                        return t.datepicker._selectMonthYear(n, this, "Y"),
                        !1
                    }
                };
                t(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(t) {
            var e, i, n, s, o, a, r, l, h, u, c, d, p, f, m, g, v, b, y, _, w, x, k, C, T, S, D, M, I, P, E, j, A, N, F, z, H, O, W, B = new Date,
            L = this._daylightSavingAdjust(new Date(B.getFullYear(), B.getMonth(), B.getDate())),
            R = this._get(t, "isRTL"),
            $ = this._get(t, "showButtonPanel"),
            V = this._get(t, "hideIfNoPrevNext"),
            U = this._get(t, "navigationAsDateFormat"),
            q = this._getNumberOfMonths(t),
            Y = this._get(t, "showCurrentAtPos"),
            K = this._get(t, "stepMonths"),
            G = 1 !== q[0] || 1 !== q[1],
            X = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
            Q = this._getMinMaxDate(t, "min"),
            Z = this._getMinMaxDate(t, "max"),
            J = t.drawMonth - Y,
            tt = t.drawYear;
            if (0 > J && (J += 12, tt--), Z) for (e = this._daylightSavingAdjust(new Date(Z.getFullYear(), Z.getMonth() - q[0] * q[1] + 1, Z.getDate())), e = Q && Q > e ? Q: e; this._daylightSavingAdjust(new Date(tt, J, 1)) > e;) J--,
            0 > J && (J = 11, tt--);
            for (t.drawMonth = J, t.drawYear = tt, i = this._get(t, "prevText"), i = U ? this.formatDate(i, this._daylightSavingAdjust(new Date(tt, J - K, 1)), this._getFormatConfig(t)) : i, n = this._canAdjustMonth(t, -1, tt, J) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (R ? "e": "w") + "'>" + i + "</span></a>": V ? "": "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (R ? "e": "w") + "'>" + i + "</span></a>", s = this._get(t, "nextText"), s = U ? this.formatDate(s, this._daylightSavingAdjust(new Date(tt, J + K, 1)), this._getFormatConfig(t)) : s, o = this._canAdjustMonth(t, 1, tt, J) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (R ? "w": "e") + "'>" + s + "</span></a>": V ? "": "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (R ? "w": "e") + "'>" + s + "</span></a>", a = this._get(t, "currentText"), r = this._get(t, "gotoCurrent") && t.currentDay ? X: L, a = U ? this.formatDate(a, r, this._getFormatConfig(t)) : a, l = t.inline ? "": "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", h = $ ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (R ? l: "") + (this._isInRange(t, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + a + "</button>": "") + (R ? "": l) + "</div>": "", u = parseInt(this._get(t, "firstDay"), 10), u = isNaN(u) ? 0 : u, c = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), m = this._get(t, "monthNamesShort"), g = this._get(t, "beforeShowDay"), v = this._get(t, "showOtherMonths"), b = this._get(t, "selectOtherMonths"), y = this._getDefaultDate(t), _ = "", x = 0; x < q[0]; x++) {
                for (k = "", this.maxRows = 4, C = 0; C < q[1]; C++) {
                    if (T = this._daylightSavingAdjust(new Date(tt, J, t.selectedDay)), S = " ui-corner-all", D = "", G) {
                        if (D += "<div class='ui-datepicker-group", q[1] > 1) switch (C) {
                        case 0:
                            D += " ui-datepicker-group-first",
                            S = " ui-corner-" + (R ? "right": "left");
                            break;
                        case q[1] - 1 : D += " ui-datepicker-group-last",
                            S = " ui-corner-" + (R ? "left": "right");
                            break;
                        default:
                            D += " ui-datepicker-group-middle",
                            S = ""
                        }
                        D += "'>"
                    }
                    for (D += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + S + "'>" + (/all|left/.test(S) && 0 === x ? R ? o: n: "") + (/all|right/.test(S) && 0 === x ? R ? n: o: "") + this._generateMonthYearHeader(t, J, tt, Q, Z, x > 0 || C > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead><tr>", M = c ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>": "", w = 0; 7 > w; w++) I = (w + u) % 7,
                    M += "<th scope='col'" + ((w + u + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'": "") + "><span title='" + d[I] + "'>" + p[I] + "</span></th>";
                    for (D += M + "</tr></thead><tbody>", P = this._getDaysInMonth(tt, J), tt === t.selectedYear && J === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, P)), E = (this._getFirstDayOfMonth(tt, J) - u + 7) % 7, j = Math.ceil((E + P) / 7), A = G && this.maxRows > j ? this.maxRows: j, this.maxRows = A, N = this._daylightSavingAdjust(new Date(tt, J, 1 - E)), F = 0; A > F; F++) {
                        for (D += "<tr>", z = c ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(N) + "</td>": "", w = 0; 7 > w; w++) H = g ? g.apply(t.input ? t.input[0] : null, [N]) : [!0, ""],
                        O = N.getMonth() !== J,
                        W = O && !b || !H[0] || Q && Q > N || Z && N > Z,
                        z += "<td class='" + ((w + u + 6) % 7 >= 5 ? " ui-datepicker-week-end": "") + (O ? " ui-datepicker-other-month": "") + (N.getTime() === T.getTime() && J === t.selectedMonth && t._keyEvent || y.getTime() === N.getTime() && y.getTime() === T.getTime() ? " " + this._dayOverClass: "") + (W ? " " + this._unselectableClass + " ui-state-disabled": "") + (O && !v ? "": " " + H[1] + (N.getTime() === X.getTime() ? " " + this._currentClass: "") + (N.getTime() === L.getTime() ? " ui-datepicker-today": "")) + "'" + (O && !v || !H[2] ? "": " title='" + H[2].replace(/'/g, "&#39;") + "'") + (W ? "": " data-handler='selectDay' data-event='click' data-month='" + N.getMonth() + "' data-year='" + N.getFullYear() + "'") + ">" + (O && !v ? "&#xa0;": W ? "<span class='ui-state-default'>" + N.getDate() + "</span>": "<a class='ui-state-default" + (N.getTime() === L.getTime() ? " ui-state-highlight": "") + (N.getTime() === X.getTime() ? " ui-state-active": "") + (O ? " ui-priority-secondary": "") + "' href='#'>" + N.getDate() + "</a>") + "</td>",
                        N.setDate(N.getDate() + 1),
                        N = this._daylightSavingAdjust(N);
                        D += z + "</tr>"
                    }
                    J++,
                    J > 11 && (J = 0, tt++),
                    D += "</tbody></table>" + (G ? "</div>" + (q[0] > 0 && C === q[1] - 1 ? "<div class='ui-datepicker-row-break'></div>": "") : ""),
                    k += D
                }
                _ += k
            }
            return _ += h,
            t._keyEvent = !1,
            _
        },
        _generateMonthYearHeader: function(t, e, i, n, s, o, a, r) {
            var l, h, u, c, d, p, f, m, g = this._get(t, "changeMonth"),
            v = this._get(t, "changeYear"),
            b = this._get(t, "showMonthAfterYear"),
            y = "<div class='ui-datepicker-title'>",
            _ = "";
            if (o || !g) _ += "<span class='ui-datepicker-month'>" + a[e] + "</span>";
            else {
                for (l = n && n.getFullYear() === i, h = s && s.getFullYear() === i, _ += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", u = 0; 12 > u; u++)(!l || u >= n.getMonth()) && (!h || u <= s.getMonth()) && (_ += "<option value='" + u + "'" + (u === e ? " selected='selected'": "") + ">" + r[u] + "</option>");
                _ += "</select>"
            }
            if (b || (y += _ + (!o && g && v ? "": "&#xa0;")), !t.yearshtml) if (t.yearshtml = "", o || !v) y += "<span class='ui-datepicker-year'>" + i + "</span>";
            else {
                for (c = this._get(t, "yearRange").split(":"), d = (new Date).getFullYear(), p = function(t) {
                    var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
                    return isNaN(e) ? d: e
                },
                f = p(c[0]), m = Math.max(f, p(c[1] || "")), f = n ? Math.max(f, n.getFullYear()) : f, m = s ? Math.min(m, s.getFullYear()) : m, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= f; f++) t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'": "") + ">" + f + "</option>";
                t.yearshtml += "</select>",
                y += t.yearshtml,
                t.yearshtml = null
            }
            return y += this._get(t, "yearSuffix"),
            b && (y += (!o && g && v ? "": "&#xa0;") + _),
            y += "</div>"
        },
        _adjustInstDate: function(t, e, i) {
            var n = t.drawYear + ("Y" === i ? e: 0),
            s = t.drawMonth + ("M" === i ? e: 0),
            o = Math.min(t.selectedDay, this._getDaysInMonth(n, s)) + ("D" === i ? e: 0),
            a = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(n, s, o)));
            t.selectedDay = a.getDate(),
            t.drawMonth = t.selectedMonth = a.getMonth(),
            t.drawYear = t.selectedYear = a.getFullYear(),
            ("M" === i || "Y" === i) && this._notifyChange(t)
        },
        _restrictMinMax: function(t, e) {
            var i = this._getMinMaxDate(t, "min"),
            n = this._getMinMaxDate(t, "max"),
            s = i && i > e ? i: e;
            return n && s > n ? n: s
        },
        _notifyChange: function(t) {
            var e = this._get(t, "onChangeMonthYear");
            e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
        },
        _getNumberOfMonths: function(t) {
            var e = this._get(t, "numberOfMonths");
            return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
        },
        _getMinMaxDate: function(t, e) {
            return this._determineDate(t, this._get(t, e + "Date"), null)
        },
        _getDaysInMonth: function(t, e) {
            return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
        },
        _getFirstDayOfMonth: function(t, e) {
            return new Date(t, e, 1).getDay()
        },
        _canAdjustMonth: function(t, e, i, n) {
            var s = this._getNumberOfMonths(t),
            o = this._daylightSavingAdjust(new Date(i, n + (0 > e ? e: s[0] * s[1]), 1));
            return 0 > e && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())),
            this._isInRange(t, o)
        },
        _isInRange: function(t, e) {
            var i, n, s = this._getMinMaxDate(t, "min"),
            o = this._getMinMaxDate(t, "max"),
            a = null,
            r = null,
            l = this._get(t, "yearRange");
            return l && (i = l.split(":"), n = (new Date).getFullYear(), a = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (a += n), i[1].match(/[+\-].*/) && (r += n)),
            (!s || e.getTime() >= s.getTime()) && (!o || e.getTime() <= o.getTime()) && (!a || e.getFullYear() >= a) && (!r || e.getFullYear() <= r)
        },
        _getFormatConfig: function(t) {
            var e = this._get(t, "shortYearCutoff");
            return e = "string" != typeof e ? e: (new Date).getFullYear() % 100 + parseInt(e, 10),
            {
                shortYearCutoff: e,
                dayNamesShort: this._get(t, "dayNamesShort"),
                dayNames: this._get(t, "dayNames"),
                monthNamesShort: this._get(t, "monthNamesShort"),
                monthNames: this._get(t, "monthNames")
            }
        },
        _formatDate: function(t, e, i, n) {
            e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
            var s = e ? "object" == typeof e ? e: this._daylightSavingAdjust(new Date(n, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
            return this.formatDate(this._get(t, "dateFormat"), s, this._getFormatConfig(t))
        }
    }),
    t.fn.datepicker = function(e) {
        if (!this.length) return this;
        t.datepicker.initialized || (t(document).mousedown(t.datepicker._checkExternalClick), t.datepicker.initialized = !0),
        0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function() {
            "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e)
        }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
    },
    t.datepicker = new s,
    t.datepicker.initialized = !1,
    t.datepicker.uuid = (new Date).getTime(),
    t.datepicker.version = "1.11.4";
    t.datepicker;
    t.widget("ui.draggable", t.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" === this.options.helper && this._setPositionRelative(),
            this.options.addClasses && this.element.addClass("ui-draggable"),
            this.options.disabled && this.element.addClass("ui-draggable-disabled"),
            this._setHandleClassName(),
            this._mouseInit()
        },
        _setOption: function(t, e) {
            this._super(t, e),
            "handle" === t && (this._removeHandleClassName(), this._setHandleClassName())
        },
        _destroy: function() {
            return (this.helper || this.element).is(".ui-draggable-dragging") ? void(this.destroyOnClear = !0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), void this._mouseDestroy())
        },
        _mouseCapture: function(e) {
            var i = this.options;
            return this._blurActiveElement(e),
            this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (this._blockFrames(i.iframeFix === !0 ? "iframe": i.iframeFix), !0) : !1)
        },
        _blockFrames: function(e) {
            this.iframeBlocks = this.document.find(e).map(function() {
                var e = t(this);
                return t("<div>").css("position", "absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _blurActiveElement: function(e) {
            var i = this.document[0];
            if (this.handleElement.is(e.target)) try {
                i.activeElement && "body" !== i.activeElement.nodeName.toLowerCase() && t(i.activeElement).blur()
            } catch(n) {}
        },
        _mouseStart: function(e) {
            var i = this.options;
            return this.helper = this._createHelper(e),
            this.helper.addClass("ui-draggable-dragging"),
            this._cacheHelperProportions(),
            t.ui.ddmanager && (t.ui.ddmanager.current = this),
            this._cacheMargins(),
            this.cssPosition = this.helper.css("position"),
            this.scrollParent = this.helper.scrollParent(!0),
            this.offsetParent = this.helper.offsetParent(),
            this.hasFixedAncestor = this.helper.parents().filter(function() {
                return "fixed" === t(this).css("position")
            }).length > 0,
            this.positionAbs = this.element.offset(),
            this._refreshOffsets(e),
            this.originalPosition = this.position = this._generatePosition(e, !1),
            this.originalPageX = e.pageX,
            this.originalPageY = e.pageY,
            i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
            this._setContainment(),
            this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._normalizeRightBottom(), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
        },
        _refreshOffsets: function(t) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: !1,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            },
            this.offset.click = {
                left: t.pageX - this.offset.left,
                top: t.pageY - this.offset.top
            }
        },
        _mouseDrag: function(e, i) {
            if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                var n = this._uiHash();
                if (this._trigger("drag", e, n) === !1) return this._mouseUp({}),
                !1;
                this.position = n.position
            }
            return this.helper[0].style.left = this.position.left + "px",
            this.helper[0].style.top = this.position.top + "px",
            t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
            !1
        },
        _mouseStop: function(e) {
            var i = this,
            n = !1;
            return t.ui.ddmanager && !this.options.dropBehaviour && (n = t.ui.ddmanager.drop(this, e)),
            this.dropped && (n = this.dropped, this.dropped = !1),
            "invalid" === this.options.revert && !n || "valid" === this.options.revert && n || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, n) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10),
            function() {
                i._trigger("stop", e) !== !1 && i._clear()
            }) : this._trigger("stop", e) !== !1 && this._clear(),
            !1
        },
        _mouseUp: function(e) {
            return this._unblockFrames(),
            t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e),
            this.handleElement.is(e.target) && this.element.focus(),
            t.ui.mouse.prototype._mouseUp.call(this, e)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(),
            this
        },
        _getHandle: function(e) {
            return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length: !0
        },
        _setHandleClassName: function() {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element,
            this.handleElement.addClass("ui-draggable-handle")
        },
        _removeHandleClassName: function() {
            this.handleElement.removeClass("ui-draggable-handle")
        },
        _createHelper: function(e) {
            var i = this.options,
            n = t.isFunction(i.helper),
            s = n ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
            return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode: i.appendTo),
            n && s[0] === this.element[0] && this._setPositionRelative(),
            s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"),
            s
        },
        _setPositionRelative: function() { / ^( ? :r | a | f) / .test(this.element.css("position")) || (this.element[0].style.position = "relative")
        },
        _adjustOffsetFromHelper: function(e) {
            "string" == typeof e && (e = e.split(" ")),
            t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }),
            "left" in e && (this.offset.click.left = e.left + this.margins.left),
            "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left),
            "top" in e && (this.offset.click.top = e.top + this.margins.top),
            "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _isRootNode: function(t) {
            return /(html|body)/i.test(t.tagName) || t === this.document[0]
        },
        _getParentOffset: function() {
            var e = this.offsetParent.offset(),
            i = this.document[0];
            return "absolute" === this.cssPosition && this.scrollParent[0] !== i && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()),
            this._isRootNode(this.offsetParent[0]) && (e = {
                top: 0,
                left: 0
            }),
            {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" !== this.cssPosition) return {
                top: 0,
                left: 0
            };
            var t = this.element.position(),
            e = this._isRootNode(this.scrollParent[0]);
            return {
                top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()),
                left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft())
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var e, i, n, s = this.options,
            o = this.document[0];
            return this.relativeContainer = null,
            s.containment ? "window" === s.containment ? void(this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === s.containment ? void(this.containment = [0, 0, t(o).width() - this.helperProportions.width - this.margins.left, (t(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : s.containment.constructor === Array ? void(this.containment = s.containment) : ("parent" === s.containment && (s.containment = this.helper[0].parentNode), i = t(s.containment), n = i[0], void(n && (e = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i))) : void(this.containment = null)
        },
        _convertPositionTo: function(t, e) {
            e || (e = this.position);
            var i = "absolute" === t ? 1 : -1,
            n = this._isRootNode(this.scrollParent[0]);
            return {
                top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top: n ? 0 : this.offset.scroll.top) * i,
                left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left: n ? 0 : this.offset.scroll.left) * i
            }
        },
        _generatePosition: function(t, e) {
            var i, n, s, o, a = this.options,
            r = this._isRootNode(this.scrollParent[0]),
            l = t.pageX,
            h = t.pageY;
            return r && this.offset.scroll || (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft()
            }),
            e && (this.containment && (this.relativeContainer ? (n = this.relativeContainer.offset(), i = [this.containment[0] + n.left, this.containment[1] + n.top, this.containment[2] + n.left, this.containment[3] + n.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)), a.grid && (s = a.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, h = i ? s - this.offset.click.top >= i[1] || s - this.offset.click.top > i[3] ? s: s - this.offset.click.top >= i[1] ? s - a.grid[1] : s + a.grid[1] : s, o = a.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, l = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o: o - this.offset.click.left >= i[0] ? o - a.grid[0] : o + a.grid[0] : o), "y" === a.axis && (l = this.originalPageX), "x" === a.axis && (h = this.originalPageY)),
            {
                top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top: r ? 0 : this.offset.scroll.top),
                left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left: r ? 0 : this.offset.scroll.left)
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"),
            this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
            this.helper = null,
            this.cancelHelperRemoval = !1,
            this.destroyOnClear && this.destroy()
        },
        _normalizeRightBottom: function() {
            "y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()), this.helper.css("right", "auto")),
            "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()), this.helper.css("bottom", "auto"))
        },
        _trigger: function(e, i, n) {
            return n = n || this._uiHash(),
            t.ui.plugin.call(this, e, [i, n, this], !0),
            /^(drag|start|stop)/.test(e) && (this.positionAbs = this._convertPositionTo("absolute"), n.offset = this.positionAbs),
            t.Widget.prototype._trigger.call(this, e, i, n)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }),
    t.ui.plugin.add("draggable", "connectToSortable", {
        start: function(e, i, n) {
            var s = t.extend({},
            i, {
                item: n.element
            });
            n.sortables = [],
            t(n.options.connectToSortable).each(function() {
                var i = t(this).sortable("instance");
                i && !i.options.disabled && (n.sortables.push(i), i.refreshPositions(), i._trigger("activate", e, s))
            })
        },
        stop: function(e, i, n) {
            var s = t.extend({},
            i, {
                item: n.element
            });
            n.cancelHelperRemoval = !1,
            t.each(n.sortables,
            function() {
                var t = this;
                t.isOver ? (t.isOver = 0, n.cancelHelperRemoval = !0, t.cancelHelperRemoval = !1, t._storedCSS = {
                    position: t.placeholder.css("position"),
                    top: t.placeholder.css("top"),
                    left: t.placeholder.css("left")
                },
                t._mouseStop(e), t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0, t._trigger("deactivate", e, s))
            })
        },
        drag: function(e, i, n) {
            t.each(n.sortables,
            function() {
                var s = !1,
                o = this;
                o.positionAbs = n.positionAbs,
                o.helperProportions = n.helperProportions,
                o.offset.click = n.offset.click,
                o._intersectsWith(o.containerCache) && (s = !0, t.each(n.sortables,
                function() {
                    return this.positionAbs = n.positionAbs,
                    this.helperProportions = n.helperProportions,
                    this.offset.click = n.offset.click,
                    this !== o && this._intersectsWith(this.containerCache) && t.contains(o.element[0], this.element[0]) && (s = !1),
                    s
                })),
                s ? (o.isOver || (o.isOver = 1, n._parent = i.helper.parent(), o.currentItem = i.helper.appendTo(o.element).data("ui-sortable-item", !0), o.options._helper = o.options.helper, o.options.helper = function() {
                    return i.helper[0]
                },
                e.target = o.currentItem[0], o._mouseCapture(e, !0), o._mouseStart(e, !0, !0), o.offset.click.top = n.offset.click.top, o.offset.click.left = n.offset.click.left, o.offset.parent.left -= n.offset.parent.left - o.offset.parent.left, o.offset.parent.top -= n.offset.parent.top - o.offset.parent.top, n._trigger("toSortable", e), n.dropped = o.element, t.each(n.sortables,
                function() {
                    this.refreshPositions()
                }), n.currentItem = n.element, o.fromOutside = n), o.currentItem && (o._mouseDrag(e), i.position = o.position)) : o.isOver && (o.isOver = 0, o.cancelHelperRemoval = !0, o.options._revert = o.options.revert, o.options.revert = !1, o._trigger("out", e, o._uiHash(o)), o._mouseStop(e, !0), o.options.revert = o.options._revert, o.options.helper = o.options._helper, o.placeholder && o.placeholder.remove(), i.helper.appendTo(n._parent), n._refreshOffsets(e), i.position = n._generatePosition(e, !0), n._trigger("fromSortable", e), n.dropped = !1, t.each(n.sortables,
                function() {
                    this.refreshPositions()
                }))
            })
        }
    }),
    t.ui.plugin.add("draggable", "cursor", {
        start: function(e, i, n) {
            var s = t("body"),
            o = n.options;
            s.css("cursor") && (o._cursor = s.css("cursor")),
            s.css("cursor", o.cursor)
        },
        stop: function(e, i, n) {
            var s = n.options;
            s._cursor && t("body").css("cursor", s._cursor)
        }
    }),
    t.ui.plugin.add("draggable", "opacity", {
        start: function(e, i, n) {
            var s = t(i.helper),
            o = n.options;
            s.css("opacity") && (o._opacity = s.css("opacity")),
            s.css("opacity", o.opacity)
        },
        stop: function(e, i, n) {
            var s = n.options;
            s._opacity && t(i.helper).css("opacity", s._opacity)
        }
    }),
    t.ui.plugin.add("draggable", "scroll", {
        start: function(t, e, i) {
            i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)),
            i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
        },
        drag: function(e, i, n) {
            var s = n.options,
            o = !1,
            a = n.scrollParentNotHidden[0],
            r = n.document[0];
            a !== r && "HTML" !== a.tagName ? (s.axis && "x" === s.axis || (n.overflowOffset.top + a.offsetHeight - e.pageY < s.scrollSensitivity ? a.scrollTop = o = a.scrollTop + s.scrollSpeed: e.pageY - n.overflowOffset.top < s.scrollSensitivity && (a.scrollTop = o = a.scrollTop - s.scrollSpeed)), s.axis && "y" === s.axis || (n.overflowOffset.left + a.offsetWidth - e.pageX < s.scrollSensitivity ? a.scrollLeft = o = a.scrollLeft + s.scrollSpeed: e.pageX - n.overflowOffset.left < s.scrollSensitivity && (a.scrollLeft = o = a.scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (e.pageY - t(r).scrollTop() < s.scrollSensitivity ? o = t(r).scrollTop(t(r).scrollTop() - s.scrollSpeed) : t(window).height() - (e.pageY - t(r).scrollTop()) < s.scrollSensitivity && (o = t(r).scrollTop(t(r).scrollTop() + s.scrollSpeed))), s.axis && "y" === s.axis || (e.pageX - t(r).scrollLeft() < s.scrollSensitivity ? o = t(r).scrollLeft(t(r).scrollLeft() - s.scrollSpeed) : t(window).width() - (e.pageX - t(r).scrollLeft()) < s.scrollSensitivity && (o = t(r).scrollLeft(t(r).scrollLeft() + s.scrollSpeed)))),
            o !== !1 && t.ui.ddmanager && !s.dropBehaviour && t.ui.ddmanager.prepareOffsets(n, e)
        }
    }),
    t.ui.plugin.add("draggable", "snap", {
        start: function(e, i, n) {
            var s = n.options;
            n.snapElements = [],
            t(s.snap.constructor !== String ? s.snap.items || ":data(ui-draggable)": s.snap).each(function() {
                var e = t(this),
                i = e.offset();
                this !== n.element[0] && n.snapElements.push({
                    item: this,
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: i.top,
                    left: i.left
                })
            })
        },
        drag: function(e, i, n) {
            var s, o, a, r, l, h, u, c, d, p, f = n.options,
            m = f.snapTolerance,
            g = i.offset.left,
            v = g + n.helperProportions.width,
            b = i.offset.top,
            y = b + n.helperProportions.height;
            for (d = n.snapElements.length - 1; d >= 0; d--) l = n.snapElements[d].left - n.margins.left,
            h = l + n.snapElements[d].width,
            u = n.snapElements[d].top - n.margins.top,
            c = u + n.snapElements[d].height,
            l - m > v || g > h + m || u - m > y || b > c + m || !t.contains(n.snapElements[d].item.ownerDocument, n.snapElements[d].item) ? (n.snapElements[d].snapping && n.options.snap.release && n.options.snap.release.call(n.element, e, t.extend(n._uiHash(), {
                snapItem: n.snapElements[d].item
            })), n.snapElements[d].snapping = !1) : ("inner" !== f.snapMode && (s = Math.abs(u - y) <= m, o = Math.abs(c - b) <= m, a = Math.abs(l - v) <= m, r = Math.abs(h - g) <= m, s && (i.position.top = n._convertPositionTo("relative", {
                top: u - n.helperProportions.height,
                left: 0
            }).top), o && (i.position.top = n._convertPositionTo("relative", {
                top: c,
                left: 0
            }).top), a && (i.position.left = n._convertPositionTo("relative", {
                top: 0,
                left: l - n.helperProportions.width
            }).left), r && (i.position.left = n._convertPositionTo("relative", {
                top: 0,
                left: h
            }).left)), p = s || o || a || r, "outer" !== f.snapMode && (s = Math.abs(u - b) <= m, o = Math.abs(c - y) <= m, a = Math.abs(l - g) <= m, r = Math.abs(h - v) <= m, s && (i.position.top = n._convertPositionTo("relative", {
                top: u,
                left: 0
            }).top), o && (i.position.top = n._convertPositionTo("relative", {
                top: c - n.helperProportions.height,
                left: 0
            }).top), a && (i.position.left = n._convertPositionTo("relative", {
                top: 0,
                left: l
            }).left), r && (i.position.left = n._convertPositionTo("relative", {
                top: 0,
                left: h - n.helperProportions.width
            }).left)), !n.snapElements[d].snapping && (s || o || a || r || p) && n.options.snap.snap && n.options.snap.snap.call(n.element, e, t.extend(n._uiHash(), {
                snapItem: n.snapElements[d].item
            })), n.snapElements[d].snapping = s || o || a || r || p)
        }
    }),
    t.ui.plugin.add("draggable", "stack", {
        start: function(e, i, n) {
            var s, o = n.options,
            a = t.makeArray(t(o.stack)).sort(function(e, i) {
                return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
            });
            a.length && (s = parseInt(t(a[0]).css("zIndex"), 10) || 0, t(a).each(function(e) {
                t(this).css("zIndex", s + e)
            }), this.css("zIndex", s + a.length))
        }
    }),
    t.ui.plugin.add("draggable", "zIndex", {
        start: function(e, i, n) {
            var s = t(i.helper),
            o = n.options;
            s.css("zIndex") && (o._zIndex = s.css("zIndex")),
            s.css("zIndex", o.zIndex)
        },
        stop: function(e, i, n) {
            var s = n.options;
            s._zIndex && t(i.helper).css("zIndex", s._zIndex)
        }
    });
    t.ui.draggable;
    t.widget("ui.resizable", t.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function(t) {
            return parseInt(t, 10) || 0
        },
        _isNumber: function(t) {
            return ! isNaN(parseInt(t, 10))
        },
        _hasScroll: function(e, i) {
            if ("hidden" === t(e).css("overflow")) return ! 1;
            var n = i && "left" === i ? "scrollLeft": "scrollTop",
            s = !1;
            return e[n] > 0 ? !0 : (e[n] = 1, s = e[n] > 0, e[n] = 0, s)
        },
        _create: function() {
            var e, i, n, s, o, a = this,
            r = this.options;
            if (this.element.addClass("ui-resizable"), t.extend(this, {
                _aspectRatio: !!r.aspectRatio,
                aspectRatio: r.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: r.helper || r.ghost || r.animate ? r.helper || "ui-resizable-helper": null
            }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, this.element.css({
                marginLeft: this.originalElement.css("marginLeft"),
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom")
            }), this.originalElement.css({
                marginLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0
            }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })), this.originalElement.css({
                margin: this.originalElement.css("margin")
            }), this._proportionallyResize()), this.handles = r.handles || (t(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            }: "e,s,se"), this._handles = t(), this.handles.constructor === String) for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {},
            i = 0; i < e.length; i++) n = t.trim(e[i]),
            o = "ui-resizable-" + n,
            s = t("<div class='ui-resizable-handle " + o + "'></div>"),
            s.css({
                zIndex: r.zIndex
            }),
            "se" === n && s.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),
            this.handles[n] = ".ui-resizable-" + n,
            this.element.append(s);
            this._renderAxis = function(e) {
                var i, n, s, o;
                e = e || this.element;
                for (i in this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = t(this.handles[i]), this._on(this.handles[i], {
                    mousedown: a._mouseDown
                })),
                this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (n = t(this.handles[i], this.element), o = /sw|ne|nw|se|n|s/.test(i) ? n.outerHeight() : n.outerWidth(), s = ["padding", /ne|nw|n/.test(i) ? "Top": /se|sw|s/.test(i) ? "Bottom": /^e$/.test(i) ? "Right": "Left"].join(""), e.css(s, o), this._proportionallyResize()),
                this._handles = this._handles.add(this.handles[i])
            },
            this._renderAxis(this.element),
            this._handles = this._handles.add(this.element.find(".ui-resizable-handle")),
            this._handles.disableSelection(),
            this._handles.mouseover(function() {
                a.resizing || (this.className && (s = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), a.axis = s && s[1] ? s[1] : "se")
            }),
            r.autoHide && (this._handles.hide(), t(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                r.disabled || (t(this).removeClass("ui-resizable-autohide"), a._handles.show())
            }).mouseleave(function() {
                r.disabled || a.resizing || (t(this).addClass("ui-resizable-autohide"), a._handles.hide())
            })),
            this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            var e, i = function(e) {
                t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
                position: e.css("position"),
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: e.css("top"),
                left: e.css("left")
            }).insertAfter(e), e.remove()),
            this.originalElement.css("resize", this.originalResizeStyle),
            i(this.originalElement),
            this
        },
        _mouseCapture: function(e) {
            var i, n, s = !1;
            for (i in this.handles) n = t(this.handles[i])[0],
            (n === e.target || t.contains(n, e.target)) && (s = !0);
            return ! this.options.disabled && s
        },
        _mouseStart: function(e) {
            var i, n, s, o = this.options,
            a = this.element;
            return this.resizing = !0,
            this._renderProxy(),
            i = this._num(this.helper.css("left")),
            n = this._num(this.helper.css("top")),
            o.containment && (i += t(o.containment).scrollLeft() || 0, n += t(o.containment).scrollTop() || 0),
            this.offset = this.helper.offset(),
            this.position = {
                left: i,
                top: n
            },
            this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            }: {
                width: a.width(),
                height: a.height()
            },
            this.originalSize = this._helper ? {
                width: a.outerWidth(),
                height: a.outerHeight()
            }: {
                width: a.width(),
                height: a.height()
            },
            this.sizeDiff = {
                width: a.outerWidth() - a.width(),
                height: a.outerHeight() - a.height()
            },
            this.originalPosition = {
                left: i,
                top: n
            },
            this.originalMousePosition = {
                left: e.pageX,
                top: e.pageY
            },
            this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio: this.originalSize.width / this.originalSize.height || 1,
            s = t(".ui-resizable-" + this.axis).css("cursor"),
            t("body").css("cursor", "auto" === s ? this.axis + "-resize": s),
            a.addClass("ui-resizable-resizing"),
            this._propagate("start", e),
            !0
        },
        _mouseDrag: function(e) {
            var i, n, s = this.originalMousePosition,
            o = this.axis,
            a = e.pageX - s.left || 0,
            r = e.pageY - s.top || 0,
            l = this._change[o];
            return this._updatePrevProperties(),
            l ? (i = l.apply(this, [e, a, r]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), n = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(n) || (this._updatePrevProperties(), this._trigger("resize", e, this.ui()), this._applyChanges()), !1) : !1
        },
        _mouseStop: function(e) {
            this.resizing = !1;
            var i, n, s, o, a, r, l, h = this.options,
            u = this;
            return this._helper && (i = this._proportionallyResizeElements, n = i.length && /textarea/i.test(i[0].nodeName), s = n && this._hasScroll(i[0], "left") ? 0 : u.sizeDiff.height, o = n ? 0 : u.sizeDiff.width, a = {
                width: u.helper.width() - o,
                height: u.helper.height() - s
            },
            r = parseInt(u.element.css("left"), 10) + (u.position.left - u.originalPosition.left) || null, l = parseInt(u.element.css("top"), 10) + (u.position.top - u.originalPosition.top) || null, h.animate || this.element.css(t.extend(a, {
                top: l,
                left: r
            })), u.helper.height(u.size.height), u.helper.width(u.size.width), this._helper && !h.animate && this._proportionallyResize()),
            t("body").css("cursor", "auto"),
            this.element.removeClass("ui-resizable-resizing"),
            this._propagate("stop", e),
            this._helper && this.helper.remove(),
            !1
        },
        _updatePrevProperties: function() {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            },
            this.prevSize = {
                width: this.size.width,
                height: this.size.height
            }
        },
        _applyChanges: function() {
            var t = {};
            return this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"),
            this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"),
            this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"),
            this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"),
            this.helper.css(t),
            t
        },
        _updateVirtualBoundaries: function(t) {
            var e, i, n, s, o, a = this.options;
            o = {
                minWidth: this._isNumber(a.minWidth) ? a.minWidth: 0,
                maxWidth: this._isNumber(a.maxWidth) ? a.maxWidth: 1 / 0,
                minHeight: this._isNumber(a.minHeight) ? a.minHeight: 0,
                maxHeight: this._isNumber(a.maxHeight) ? a.maxHeight: 1 / 0
            },
            (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio, n = o.minWidth / this.aspectRatio, i = o.maxHeight * this.aspectRatio, s = o.maxWidth / this.aspectRatio, e > o.minWidth && (o.minWidth = e), n > o.minHeight && (o.minHeight = n), i < o.maxWidth && (o.maxWidth = i), s < o.maxHeight && (o.maxHeight = s)),
            this._vBoundaries = o
        },
        _updateCache: function(t) {
            this.offset = this.helper.offset(),
            this._isNumber(t.left) && (this.position.left = t.left),
            this._isNumber(t.top) && (this.position.top = t.top),
            this._isNumber(t.height) && (this.size.height = t.height),
            this._isNumber(t.width) && (this.size.width = t.width)
        },
        _updateRatio: function(t) {
            var e = this.position,
            i = this.size,
            n = this.axis;
            return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio: this._isNumber(t.width) && (t.height = t.width / this.aspectRatio),
            "sw" === n && (t.left = e.left + (i.width - t.width), t.top = null),
            "nw" === n && (t.top = e.top + (i.height - t.height), t.left = e.left + (i.width - t.width)),
            t
        },
        _respectSize: function(t) {
            var e = this._vBoundaries,
            i = this.axis,
            n = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
            s = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
            o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
            a = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
            r = this.originalPosition.left + this.originalSize.width,
            l = this.position.top + this.size.height,
            h = /sw|nw|w/.test(i),
            u = /nw|ne|n/.test(i);
            return o && (t.width = e.minWidth),
            a && (t.height = e.minHeight),
            n && (t.width = e.maxWidth),
            s && (t.height = e.maxHeight),
            o && h && (t.left = r - e.minWidth),
            n && h && (t.left = r - e.maxWidth),
            a && u && (t.top = l - e.minHeight),
            s && u && (t.top = l - e.maxHeight),
            t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null,
            t
        },
        _getPaddingPlusBorderDimensions: function(t) {
            for (var e = 0,
            i = [], n = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], s = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")]; 4 > e; e++) i[e] = parseInt(n[e], 10) || 0,
            i[e] += parseInt(s[e], 10) || 0;
            return {
                height: i[0] + i[2],
                width: i[1] + i[3]
            }
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length) for (var t, e = 0,
            i = this.helper || this.element; e < this._proportionallyResizeElements.length; e++) t = this._proportionallyResizeElements[e],
            this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)),
            t.css({
                height: i.height() - this.outerDimensions.height || 0,
                width: i.width() - this.outerDimensions.width || 0
            })
        },
        _renderProxy: function() {
            var e = this.element,
            i = this.options;
            this.elementOffset = e.offset(),
            this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
                width: this.element.outerWidth() - 1,
                height: this.element.outerHeight() - 1,
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++i.zIndex
            }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function(t, e) {
                return {
                    width: this.originalSize.width + e
                }
            },
            w: function(t, e) {
                var i = this.originalSize,
                n = this.originalPosition;
                return {
                    left: n.left + e,
                    width: i.width - e
                }
            },
            n: function(t, e, i) {
                var n = this.originalSize,
                s = this.originalPosition;
                return {
                    top: s.top + i,
                    height: n.height - i
                }
            },
            s: function(t, e, i) {
                return {
                    height: this.originalSize.height + i
                }
            },
            se: function(e, i, n) {
                return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, n]))
            },
            sw: function(e, i, n) {
                return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, n]))
            },
            ne: function(e, i, n) {
                return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, n]))
            },
            nw: function(e, i, n) {
                return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, n]))
            }
        },
        _propagate: function(e, i) {
            t.ui.plugin.call(this, e, [i, this.ui()]),
            "resize" !== e && this._trigger(e, i, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }),
    t.ui.plugin.add("resizable", "animate", {
        stop: function(e) {
            var i = t(this).resizable("instance"),
            n = i.options,
            s = i._proportionallyResizeElements,
            o = s.length && /textarea/i.test(s[0].nodeName),
            a = o && i._hasScroll(s[0], "left") ? 0 : i.sizeDiff.height,
            r = o ? 0 : i.sizeDiff.width,
            l = {
                width: i.size.width - r,
                height: i.size.height - a
            },
            h = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
            u = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(t.extend(l, u && h ? {
                top: u,
                left: h
            }: {}), {
                duration: n.animateDuration,
                easing: n.animateEasing,
                step: function() {
                    var n = {
                        width: parseInt(i.element.css("width"), 10),
                        height: parseInt(i.element.css("height"), 10),
                        top: parseInt(i.element.css("top"), 10),
                        left: parseInt(i.element.css("left"), 10)
                    };
                    s && s.length && t(s[0]).css({
                        width: n.width,
                        height: n.height
                    }),
                    i._updateCache(n),
                    i._propagate("resize", e)
                }
            })
        }
    }),
    t.ui.plugin.add("resizable", "containment", {
        start: function() {
            var e, i, n, s, o, a, r, l = t(this).resizable("instance"),
            h = l.options,
            u = l.element,
            c = h.containment,
            d = c instanceof t ? c.get(0) : /parent/.test(c) ? u.parent().get(0) : c;
            d && (l.containerElement = t(d), /document/.test(c) || c === document ? (l.containerOffset = {
                left: 0,
                top: 0
            },
            l.containerPosition = {
                left: 0,
                top: 0
            },
            l.parentData = {
                element: t(document),
                left: 0,
                top: 0,
                width: t(document).width(),
                height: t(document).height() || document.body.parentNode.scrollHeight
            }) : (e = t(d), i = [], t(["Top", "Right", "Left", "Bottom"]).each(function(t, n) {
                i[t] = l._num(e.css("padding" + n))
            }), l.containerOffset = e.offset(), l.containerPosition = e.position(), l.containerSize = {
                height: e.innerHeight() - i[3],
                width: e.innerWidth() - i[1]
            },
            n = l.containerOffset, s = l.containerSize.height, o = l.containerSize.width, a = l._hasScroll(d, "left") ? d.scrollWidth: o, r = l._hasScroll(d) ? d.scrollHeight: s, l.parentData = {
                element: d,
                left: n.left,
                top: n.top,
                width: a,
                height: r
            }))
        },
        resize: function(e) {
            var i, n, s, o, a = t(this).resizable("instance"),
            r = a.options,
            l = a.containerOffset,
            h = a.position,
            u = a._aspectRatio || e.shiftKey,
            c = {
                top: 0,
                left: 0
            },
            d = a.containerElement,
            p = !0;
            d[0] !== document && /static/.test(d.css("position")) && (c = l),
            h.left < (a._helper ? l.left: 0) && (a.size.width = a.size.width + (a._helper ? a.position.left - l.left: a.position.left - c.left), u && (a.size.height = a.size.width / a.aspectRatio, p = !1), a.position.left = r.helper ? l.left: 0),
            h.top < (a._helper ? l.top: 0) && (a.size.height = a.size.height + (a._helper ? a.position.top - l.top: a.position.top), u && (a.size.width = a.size.height * a.aspectRatio, p = !1), a.position.top = a._helper ? l.top: 0),
            s = a.containerElement.get(0) === a.element.parent().get(0),
            o = /relative|absolute/.test(a.containerElement.css("position")),
            s && o ? (a.offset.left = a.parentData.left + a.position.left, a.offset.top = a.parentData.top + a.position.top) : (a.offset.left = a.element.offset().left, a.offset.top = a.element.offset().top),
            i = Math.abs(a.sizeDiff.width + (a._helper ? a.offset.left - c.left: a.offset.left - l.left)),
            n = Math.abs(a.sizeDiff.height + (a._helper ? a.offset.top - c.top: a.offset.top - l.top)),
            i + a.size.width >= a.parentData.width && (a.size.width = a.parentData.width - i, u && (a.size.height = a.size.width / a.aspectRatio, p = !1)),
            n + a.size.height >= a.parentData.height && (a.size.height = a.parentData.height - n, u && (a.size.width = a.size.height * a.aspectRatio, p = !1)),
            p || (a.position.left = a.prevPosition.left, a.position.top = a.prevPosition.top, a.size.width = a.prevSize.width, a.size.height = a.prevSize.height)
        },
        stop: function() {
            var e = t(this).resizable("instance"),
            i = e.options,
            n = e.containerOffset,
            s = e.containerPosition,
            o = e.containerElement,
            a = t(e.helper),
            r = a.offset(),
            l = a.outerWidth() - e.sizeDiff.width,
            h = a.outerHeight() - e.sizeDiff.height;
            e._helper && !i.animate && /relative/.test(o.css("position")) && t(this).css({
                left: r.left - s.left - n.left,
                width: l,
                height: h
            }),
            e._helper && !i.animate && /static/.test(o.css("position")) && t(this).css({
                left: r.left - s.left - n.left,
                width: l,
                height: h
            })
        }
    }),
    t.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var e = t(this).resizable("instance"),
            i = e.options;
            t(i.alsoResize).each(function() {
                var e = t(this);
                e.data("ui-resizable-alsoresize", {
                    width: parseInt(e.width(), 10),
                    height: parseInt(e.height(), 10),
                    left: parseInt(e.css("left"), 10),
                    top: parseInt(e.css("top"), 10)
                })
            })
        },
        resize: function(e, i) {
            var n = t(this).resizable("instance"),
            s = n.options,
            o = n.originalSize,
            a = n.originalPosition,
            r = {
                height: n.size.height - o.height || 0,
                width: n.size.width - o.width || 0,
                top: n.position.top - a.top || 0,
                left: n.position.left - a.left || 0
            };
            t(s.alsoResize).each(function() {
                var e = t(this),
                n = t(this).data("ui-resizable-alsoresize"),
                s = {},
                o = e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                t.each(o,
                function(t, e) {
                    var i = (n[e] || 0) + (r[e] || 0);
                    i && i >= 0 && (s[e] = i || null)
                }),
                e.css(s)
            })
        },
        stop: function() {
            t(this).removeData("resizable-alsoresize")
        }
    }),
    t.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var e = t(this).resizable("instance"),
            i = e.options,
            n = e.size;
            e.ghost = e.originalElement.clone(),
            e.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: n.height,
                width: n.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost: ""),
            e.ghost.appendTo(e.helper)
        },
        resize: function() {
            var e = t(this).resizable("instance");
            e.ghost && e.ghost.css({
                position: "relative",
                height: e.size.height,
                width: e.size.width
            })
        },
        stop: function() {
            var e = t(this).resizable("instance");
            e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
        }
    }),
    t.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var e, i = t(this).resizable("instance"),
            n = i.options,
            s = i.size,
            o = i.originalSize,
            a = i.originalPosition,
            r = i.axis,
            l = "number" == typeof n.grid ? [n.grid, n.grid] : n.grid,
            h = l[0] || 1,
            u = l[1] || 1,
            c = Math.round((s.width - o.width) / h) * h,
            d = Math.round((s.height - o.height) / u) * u,
            p = o.width + c,
            f = o.height + d,
            m = n.maxWidth && n.maxWidth < p,
            g = n.maxHeight && n.maxHeight < f,
            v = n.minWidth && n.minWidth > p,
            b = n.minHeight && n.minHeight > f;
            n.grid = l,
            v && (p += h),
            b && (f += u),
            m && (p -= h),
            g && (f -= u),
            /^(se|s|e)$/.test(r) ? (i.size.width = p, i.size.height = f) : /^(ne)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.top = a.top - d) : /^(sw)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.left = a.left - c) : ((0 >= f - u || 0 >= p - h) && (e = i._getPaddingPlusBorderDimensions(this)), f - u > 0 ? (i.size.height = f, i.position.top = a.top - d) : (f = u - e.height, i.size.height = f, i.position.top = a.top + o.height - f), p - h > 0 ? (i.size.width = p, i.position.left = a.left - c) : (p = h - e.width, i.size.width = p, i.position.left = a.left + o.width - p))
        }
    });
    t.ui.resizable,
    t.widget("ui.dialog", {
        version: "1.11.4",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            closeOnEscape: !0,
            closeText: "Close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function(e) {
                    var i = t(this).css(e).offset().top;
                    0 > i && t(this).css("top", e.top - i)
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        sizeRelatedOptions: {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        resizableRelatedOptions: {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            },
            this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            },
            this.originalTitle = this.element.attr("title"),
            this.options.title = this.options.title || this.originalTitle,
            this._createWrapper(),
            this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),
            this._createTitlebar(),
            this._createButtonPane(),
            this.options.draggable && t.fn.draggable && this._makeDraggable(),
            this.options.resizable && t.fn.resizable && this._makeResizable(),
            this._isOpen = !1,
            this._trackFocus()
        },
        _init: function() {
            this.options.autoOpen && this.open()
        },
        _appendTo: function() {
            var e = this.options.appendTo;
            return e && (e.jquery || e.nodeType) ? t(e) : this.document.find(e || "body").eq(0)
        },
        _destroy: function() {
            var t, e = this.originalPosition;
            this._untrackInstance(),
            this._destroyOverlay(),
            this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),
            this.uiDialog.stop(!0, !0).remove(),
            this.originalTitle && this.element.attr("title", this.originalTitle),
            t = e.parent.children().eq(e.index),
            t.length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element)
        },
        widget: function() {
            return this.uiDialog
        },
        disable: t.noop,
        enable: t.noop,
        close: function(e) {
            var i, n = this;
            if (this._isOpen && this._trigger("beforeClose", e) !== !1) {
                if (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), !this.opener.filter(":focusable").focus().length) try {
                    i = this.document[0].activeElement,
                    i && "body" !== i.nodeName.toLowerCase() && t(i).blur()
                } catch(s) {}
                this._hide(this.uiDialog, this.options.hide,
                function() {
                    n._trigger("close", e)
                })
            }
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function() {
            this._moveToTop()
        },
        _moveToTop: function(e, i) {
            var n = !1,
            s = this.uiDialog.siblings(".ui-front:visible").map(function() {
                return + t(this).css("z-index")
            }).get(),
            o = Math.max.apply(null, s);
            return o >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", o + 1), n = !0),
            n && !i && this._trigger("focus", e),
            n
        },
        open: function() {
            var e = this;
            return this._isOpen ? void(this._moveToTop() && this._focusTabbable()) : (this._isOpen = !0, this.opener = t(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show,
            function() {
                e._focusTabbable(),
                e._trigger("focus")
            }), this._makeFocusTarget(), void this._trigger("open"))
        },
        _focusTabbable: function() {
            var t = this._focusedElement;
            t || (t = this.element.find("[autofocus]")),
            t.length || (t = this.element.find(":tabbable")),
            t.length || (t = this.uiDialogButtonPane.find(":tabbable")),
            t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")),
            t.length || (t = this.uiDialog),
            t.eq(0).focus()
        },
        _keepFocus: function(e) {
            function i() {
                var e = this.document[0].activeElement,
                i = this.uiDialog[0] === e || t.contains(this.uiDialog[0], e);
                i || this._focusTabbable()
            }
            e.preventDefault(),
            i.call(this),
            this._delay(i)
        },
        _createWrapper: function() {
            this.uiDialog = t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo()),
            this._on(this.uiDialog, {
                keydown: function(e) {
                    if (this.options.closeOnEscape && !e.isDefaultPrevented() && e.keyCode && e.keyCode === t.ui.keyCode.ESCAPE) return e.preventDefault(),
                    void this.close(e);
                    if (e.keyCode === t.ui.keyCode.TAB && !e.isDefaultPrevented()) {
                        var i = this.uiDialog.find(":tabbable"),
                        n = i.filter(":first"),
                        s = i.filter(":last");
                        e.target !== s[0] && e.target !== this.uiDialog[0] || e.shiftKey ? e.target !== n[0] && e.target !== this.uiDialog[0] || !e.shiftKey || (this._delay(function() {
                            s.focus()
                        }), e.preventDefault()) : (this._delay(function() {
                            n.focus()
                        }), e.preventDefault())
                    }
                },
                mousedown: function(t) {
                    this._moveToTop(t) && this._focusTabbable()
                }
            }),
            this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id")
            })
        },
        _createTitlebar: function() {
            var e;
            this.uiDialogTitlebar = t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),
            this._on(this.uiDialogTitlebar, {
                mousedown: function(e) {
                    t(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                }
            }),
            this.uiDialogTitlebarClose = t("<button type='button'></button>").button({
                label: this.options.closeText,
                icons: {
                    primary: "ui-icon-closethick"
                },
                text: !1
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),
            this._on(this.uiDialogTitlebarClose, {
                click: function(t) {
                    t.preventDefault(),
                    this.close(t)
                }
            }),
            e = t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),
            this._title(e),
            this.uiDialog.attr({
                "aria-labelledby": e.attr("id")
            })
        },
        _title: function(t) {
            this.options.title || t.html("&#160;"),
            t.text(this.options.title)
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
            this.uiButtonSet = t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),
            this._createButtons()
        },
        _createButtons: function() {
            var e = this,
            i = this.options.buttons;
            return this.uiDialogButtonPane.remove(),
            this.uiButtonSet.empty(),
            t.isEmptyObject(i) || t.isArray(i) && !i.length ? void this.uiDialog.removeClass("ui-dialog-buttons") : (t.each(i,
            function(i, n) {
                var s, o;
                n = t.isFunction(n) ? {
                    click: n,
                    text: i
                }: n,
                n = t.extend({
                    type: "button"
                },
                n),
                s = n.click,
                n.click = function() {
                    s.apply(e.element[0], arguments)
                },
                o = {
                    icons: n.icons,
                    text: n.showText
                },
                delete n.icons,
                delete n.showText,
                t("<button></button>", n).button(o).appendTo(e.uiButtonSet)
            }), this.uiDialog.addClass("ui-dialog-buttons"), void this.uiDialogButtonPane.appendTo(this.uiDialog))
        },
        _makeDraggable: function() {
            function e(t) {
                return {
                    position: t.position,
                    offset: t.offset
                }
            }
            var i = this,
            n = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(n, s) {
                    t(this).addClass("ui-dialog-dragging"),
                    i._blockFrames(),
                    i._trigger("dragStart", n, e(s))
                },
                drag: function(t, n) {
                    i._trigger("drag", t, e(n))
                },
                stop: function(s, o) {
                    var a = o.offset.left - i.document.scrollLeft(),
                    r = o.offset.top - i.document.scrollTop();
                    n.position = {
                        my: "left top",
                        at: "left" + (a >= 0 ? "+": "") + a + " top" + (r >= 0 ? "+": "") + r,
                        of: i.window
                    },
                    t(this).removeClass("ui-dialog-dragging"),
                    i._unblockFrames(),
                    i._trigger("dragStop", s, e(o))
                }
            })
        },
        _makeResizable: function() {
            function e(t) {
                return {
                    originalPosition: t.originalPosition,
                    originalSize: t.originalSize,
                    position: t.position,
                    size: t.size
                }
            }
            var i = this,
            n = this.options,
            s = n.resizable,
            o = this.uiDialog.css("position"),
            a = "string" == typeof s ? s: "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: n.maxWidth,
                maxHeight: n.maxHeight,
                minWidth: n.minWidth,
                minHeight: this._minHeight(),
                handles: a,
                start: function(n, s) {
                    t(this).addClass("ui-dialog-resizing"),
                    i._blockFrames(),
                    i._trigger("resizeStart", n, e(s))
                },
                resize: function(t, n) {
                    i._trigger("resize", t, e(n))
                },
                stop: function(s, o) {
                    var a = i.uiDialog.offset(),
                    r = a.left - i.document.scrollLeft(),
                    l = a.top - i.document.scrollTop();
                    n.height = i.uiDialog.height(),
                    n.width = i.uiDialog.width(),
                    n.position = {
                        my: "left top",
                        at: "left" + (r >= 0 ? "+": "") + r + " top" + (l >= 0 ? "+": "") + l,
                        of: i.window
                    },
                    t(this).removeClass("ui-dialog-resizing"),
                    i._unblockFrames(),
                    i._trigger("resizeStop", s, e(o))
                }
            }).css("position", o)
        },
        _trackFocus: function() {
            this._on(this.widget(), {
                focusin: function(e) {
                    this._makeFocusTarget(),
                    this._focusedElement = t(e.target)
                }
            })
        },
        _makeFocusTarget: function() {
            this._untrackInstance(),
            this._trackingInstances().unshift(this)
        },
        _untrackInstance: function() {
            var e = this._trackingInstances(),
            i = t.inArray(this, e); - 1 !== i && e.splice(i, 1)
        },
        _trackingInstances: function() {
            var t = this.document.data("ui-dialog-instances");
            return t || (t = [], this.document.data("ui-dialog-instances", t)),
            t
        },
        _minHeight: function() {
            var t = this.options;
            return "auto" === t.height ? t.minHeight: Math.min(t.minHeight, t.height)
        },
        _position: function() {
            var t = this.uiDialog.is(":visible");
            t || this.uiDialog.show(),
            this.uiDialog.position(this.options.position),
            t || this.uiDialog.hide()
        },
        _setOptions: function(e) {
            var i = this,
            n = !1,
            s = {};
            t.each(e,
            function(t, e) {
                i._setOption(t, e),
                t in i.sizeRelatedOptions && (n = !0),
                t in i.resizableRelatedOptions && (s[t] = e)
            }),
            n && (this._size(), this._position()),
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", s)
        },
        _setOption: function(t, e) {
            var i, n, s = this.uiDialog;
            "dialogClass" === t && s.removeClass(this.options.dialogClass).addClass(e),
            "disabled" !== t && (this._super(t, e), "appendTo" === t && this.uiDialog.appendTo(this._appendTo()), "buttons" === t && this._createButtons(), "closeText" === t && this.uiDialogTitlebarClose.button({
                label: "" + e
            }), "draggable" === t && (i = s.is(":data(ui-draggable)"), i && !e && s.draggable("destroy"), !i && e && this._makeDraggable()), "position" === t && this._position(), "resizable" === t && (n = s.is(":data(ui-resizable)"), n && !e && s.resizable("destroy"), n && "string" == typeof e && s.resizable("option", "handles", e), n || e === !1 || this._makeResizable()), "title" === t && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
        },
        _size: function() {
            var t, e, i, n = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            }),
            n.minWidth > n.width && (n.width = n.minWidth),
            t = this.uiDialog.css({
                height: "auto",
                width: n.width
            }).outerHeight(),
            e = Math.max(0, n.minHeight - t),
            i = "number" == typeof n.maxHeight ? Math.max(0, n.maxHeight - t) : "none",
            "auto" === n.height ? this.element.css({
                minHeight: e,
                maxHeight: i,
                height: "auto"
            }) : this.element.height(Math.max(0, n.height - t)),
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        },
        _blockFrames: function() {
            this.iframeBlocks = this.document.find("iframe").map(function() {
                var e = t(this);
                return t("<div>").css({
                    position: "absolute",
                    width: e.outerWidth(),
                    height: e.outerHeight()
                }).appendTo(e.parent()).offset(e.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _allowInteraction: function(e) {
            return t(e.target).closest(".ui-dialog").length ? !0 : !!t(e.target).closest(".ui-datepicker").length
        },
        _createOverlay: function() {
            if (this.options.modal) {
                var e = !0;
                this._delay(function() {
                    e = !1
                }),
                this.document.data("ui-dialog-overlays") || this._on(this.document, {
                    focusin: function(t) {
                        e || this._allowInteraction(t) || (t.preventDefault(), this._trackingInstances()[0]._focusTabbable())
                    }
                }),
                this.overlay = t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),
                this._on(this.overlay, {
                    mousedown: "_keepFocus"
                }),
                this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
            }
        },
        _destroyOverlay: function() {
            if (this.options.modal && this.overlay) {
                var t = this.document.data("ui-dialog-overlays") - 1;
                t ? this.document.data("ui-dialog-overlays", t) : this.document.unbind("focusin").removeData("ui-dialog-overlays"),
                this.overlay.remove(),
                this.overlay = null
            }
        }
    });
    t.widget("ui.droppable", {
        version: "1.11.4",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var e, i = this.options,
            n = i.accept;
            this.isover = !1,
            this.isout = !0,
            this.accept = t.isFunction(n) ? n: function(t) {
                return t.is(n)
            },
            this.proportions = function() {
                return arguments.length ? void(e = arguments[0]) : e ? e: e = {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                }
            },
            this._addToManager(i.scope),
            i.addClasses && this.element.addClass("ui-droppable")
        },
        _addToManager: function(e) {
            t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || [],
            t.ui.ddmanager.droppables[e].push(this)
        },
        _splice: function(t) {
            for (var e = 0; e < t.length; e++) t[e] === this && t.splice(e, 1)
        },
        _destroy: function() {
            var e = t.ui.ddmanager.droppables[this.options.scope];
            this._splice(e),
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function(e, i) {
            if ("accept" === e) this.accept = t.isFunction(i) ? i: function(t) {
                return t.is(i)
            };
            else if ("scope" === e) {
                var n = t.ui.ddmanager.droppables[this.options.scope];
                this._splice(n),
                this._addToManager(i)
            }
            this._super(e, i)
        },
        _activate: function(e) {
            var i = t.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass),
            i && this._trigger("activate", e, this.ui(i))
        },
        _deactivate: function(e) {
            var i = t.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass),
            i && this._trigger("deactivate", e, this.ui(i))
        },
        _over: function(e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", e, this.ui(i)))
        },
        _out: function(e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", e, this.ui(i)))
        },
        _drop: function(e, i) {
            var n = i || t.ui.ddmanager.current,
            s = !1;
            return n && (n.currentItem || n.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var i = t(this).droppable("instance");
                return i.options.greedy && !i.options.disabled && i.options.scope === n.options.scope && i.accept.call(i.element[0], n.currentItem || n.element) && t.ui.intersect(n, t.extend(i, {
                    offset: i.element.offset()
                }), i.options.tolerance, e) ? (s = !0, !1) : void 0
            }), s ? !1 : this.accept.call(this.element[0], n.currentItem || n.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e, this.ui(n)), this.element) : !1) : !1
        },
        ui: function(t) {
            return {
                draggable: t.currentItem || t.element,
                helper: t.helper,
                position: t.position,
                offset: t.positionAbs
            }
        }
    }),
    t.ui.intersect = function() {
        function t(t, e, i) {
            return t >= e && e + i > t
        }
        return function(e, i, n, s) {
            if (!i.offset) return ! 1;
            var o = (e.positionAbs || e.position.absolute).left + e.margins.left,
            a = (e.positionAbs || e.position.absolute).top + e.margins.top,
            r = o + e.helperProportions.width,
            l = a + e.helperProportions.height,
            h = i.offset.left,
            u = i.offset.top,
            c = h + i.proportions().width,
            d = u + i.proportions().height;
            switch (n) {
            case "fit":
                return o >= h && c >= r && a >= u && d >= l;
            case "intersect":
                return h < o + e.helperProportions.width / 2 && r - e.helperProportions.width / 2 < c && u < a + e.helperProportions.height / 2 && l - e.helperProportions.height / 2 < d;
            case "pointer":
                return t(s.pageY, u, i.proportions().height) && t(s.pageX, h, i.proportions().width);
            case "touch":
                return (a >= u && d >= a || l >= u && d >= l || u > a && l > d) && (o >= h && c >= o || r >= h && c >= r || h > o && r > c);
            default:
                return ! 1
            }
        }
    } (),
    t.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(e, i) {
            var n, s, o = t.ui.ddmanager.droppables[e.options.scope] || [],
            a = i ? i.type: null,
            r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
            t: for (n = 0; n < o.length; n++) if (! (o[n].options.disabled || e && !o[n].accept.call(o[n].element[0], e.currentItem || e.element))) {
                for (s = 0; s < r.length; s++) if (r[s] === o[n].element[0]) {
                    o[n].proportions().height = 0;
                    continue t
                }
                o[n].visible = "none" !== o[n].element.css("display"),
                o[n].visible && ("mousedown" === a && o[n]._activate.call(o[n], i), o[n].offset = o[n].element.offset(), o[n].proportions({
                    width: o[n].element[0].offsetWidth,
                    height: o[n].element[0].offsetHeight
                }))
            }
        },
        drop: function(e, i) {
            var n = !1;
            return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(),
            function() {
                this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance, i) && (n = this._drop.call(this, i) || n), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
            }),
            n
        },
        dragStart: function(e, i) {
            e.element.parentsUntil("body").bind("scroll.droppable",
            function() {
                e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
            })
        },
        drag: function(e, i) {
            e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i),
            t.each(t.ui.ddmanager.droppables[e.options.scope] || [],
            function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var n, s, o, a = t.ui.intersect(e, this, this.options.tolerance, i),
                    r = !a && this.isover ? "isout": a && !this.isover ? "isover": null;
                    r && (this.options.greedy && (s = this.options.scope, o = this.element.parents(":data(ui-droppable)").filter(function() {
                        return t(this).droppable("instance").options.scope === s
                    }), o.length && (n = t(o[0]).droppable("instance"), n.greedyChild = "isover" === r)), n && "isover" === r && (n.isover = !1, n.isout = !0, n._out.call(n, i)), this[r] = !0, this["isout" === r ? "isover": "isout"] = !1, this["isover" === r ? "_over": "_out"].call(this, i), n && "isout" === r && (n.isout = !1, n.isover = !0, n._over.call(n, i)))
                }
            })
        },
        dragStop: function(e, i) {
            e.element.parentsUntil("body").unbind("scroll.droppable"),
            e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
        }
    };
    var b = (t.ui.droppable, "ui-effects-"),
    y = t;
    t.effects = {
        effect: {}
    },
    function(t, e) {
        function i(t, e, i) {
            var n = c[e.type] || {};
            return null == t ? i || !e.def ? null: e.def: (t = n.floor ? ~~t: parseFloat(t), isNaN(t) ? e.def: n.mod ? (t + n.mod) % n.mod: 0 > t ? 0 : n.max < t ? n.max: t)
        }
        function n(e) {
            var i = h(),
            n = i._rgba = [];
            return e = e.toLowerCase(),
            f(l,
            function(t, s) {
                var o, a = s.re.exec(e),
                r = a && s.parse(a),
                l = s.space || "rgba";
                return r ? (o = i[l](r), i[u[l].cache] = o[u[l].cache], n = i._rgba = o._rgba, !1) : void 0
            }),
            n.length ? ("0,0,0,0" === n.join() && t.extend(n, o.transparent), i) : o[e]
        }
        function s(t, e, i) {
            return i = (i + 1) % 1,
            1 > 6 * i ? t + (e - t) * i * 6 : 1 > 2 * i ? e: 2 > 3 * i ? t + (e - t) * (2 / 3 - i) * 6 : t
        }
        var o, a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
        r = /^([\-+])=\s*(\d+\.?\d*)/,
        l = [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(t) {
                return [t[1], t[2], t[3], t[4]]
            }
        },
        {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(t) {
                return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
            }
        },
        {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function(t) {
                return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
            }
        },
        {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function(t) {
                return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
            }
        },
        {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function(t) {
                return [t[1], t[2] / 100, t[3] / 100, t[4]]
            }
        }],
        h = t.Color = function(e, i, n, s) {
            return new t.Color.fn.parse(e, i, n, s)
        },
        u = {
            rgba: {
                props: {
                    red: {
                        idx: 0,
                        type: "byte"
                    },
                    green: {
                        idx: 1,
                        type: "byte"
                    },
                    blue: {
                        idx: 2,
                        type: "byte"
                    }
                }
            },
            hsla: {
                props: {
                    hue: {
                        idx: 0,
                        type: "degrees"
                    },
                    saturation: {
                        idx: 1,
                        type: "percent"
                    },
                    lightness: {
                        idx: 2,
                        type: "percent"
                    }
                }
            }
        },
        c = {
            "byte": {
                floor: !0,
                max: 255
            },
            percent: {
                max: 1
            },
            degrees: {
                mod: 360,
                floor: !0
            }
        },
        d = h.support = {},
        p = t("<p>")[0],
        f = t.each;
        p.style.cssText = "background-color:rgba(1,1,1,.5)",
        d.rgba = p.style.backgroundColor.indexOf("rgba") > -1,
        f(u,
        function(t, e) {
            e.cache = "_" + t,
            e.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        }),
        h.fn = t.extend(h.prototype, {
            parse: function(s, a, r, l) {
                if (s === e) return this._rgba = [null, null, null, null],
                this; (s.jquery || s.nodeType) && (s = t(s).css(a), a = e);
                var c = this,
                d = t.type(s),
                p = this._rgba = [];
                return a !== e && (s = [s, a, r, l], d = "array"),
                "string" === d ? this.parse(n(s) || o._default) : "array" === d ? (f(u.rgba.props,
                function(t, e) {
                    p[e.idx] = i(s[e.idx], e)
                }), this) : "object" === d ? (s instanceof h ? f(u,
                function(t, e) {
                    s[e.cache] && (c[e.cache] = s[e.cache].slice())
                }) : f(u,
                function(e, n) {
                    var o = n.cache;
                    f(n.props,
                    function(t, e) {
                        if (!c[o] && n.to) {
                            if ("alpha" === t || null == s[t]) return;
                            c[o] = n.to(c._rgba)
                        }
                        c[o][e.idx] = i(s[t], e, !0)
                    }),
                    c[o] && t.inArray(null, c[o].slice(0, 3)) < 0 && (c[o][3] = 1, n.from && (c._rgba = n.from(c[o])))
                }), this) : void 0
            },
            is: function(t) {
                var e = h(t),
                i = !0,
                n = this;
                return f(u,
                function(t, s) {
                    var o, a = e[s.cache];
                    return a && (o = n[s.cache] || s.to && s.to(n._rgba) || [], f(s.props,
                    function(t, e) {
                        return null != a[e.idx] ? i = a[e.idx] === o[e.idx] : void 0
                    })),
                    i
                }),
                i
            },
            _space: function() {
                var t = [],
                e = this;
                return f(u,
                function(i, n) {
                    e[n.cache] && t.push(i)
                }),
                t.pop()
            },
            transition: function(t, e) {
                var n = h(t),
                s = n._space(),
                o = u[s],
                a = 0 === this.alpha() ? h("transparent") : this,
                r = a[o.cache] || o.to(a._rgba),
                l = r.slice();
                return n = n[o.cache],
                f(o.props,
                function(t, s) {
                    var o = s.idx,
                    a = r[o],
                    h = n[o],
                    u = c[s.type] || {};
                    null !== h && (null === a ? l[o] = h: (u.mod && (h - a > u.mod / 2 ? a += u.mod: a - h > u.mod / 2 && (a -= u.mod)), l[o] = i((h - a) * e + a, s)))
                }),
                this[s](l)
            },
            blend: function(e) {
                if (1 === this._rgba[3]) return this;
                var i = this._rgba.slice(),
                n = i.pop(),
                s = h(e)._rgba;
                return h(t.map(i,
                function(t, e) {
                    return (1 - n) * s[e] + n * t
                }))
            },
            toRgbaString: function() {
                var e = "rgba(",
                i = t.map(this._rgba,
                function(t, e) {
                    return null == t ? e > 2 ? 1 : 0 : t
                });
                return 1 === i[3] && (i.pop(), e = "rgb("),
                e + i.join() + ")"
            },
            toHslaString: function() {
                var e = "hsla(",
                i = t.map(this.hsla(),
                function(t, e) {
                    return null == t && (t = e > 2 ? 1 : 0),
                    e && 3 > e && (t = Math.round(100 * t) + "%"),
                    t
                });
                return 1 === i[3] && (i.pop(), e = "hsl("),
                e + i.join() + ")"
            },
            toHexString: function(e) {
                var i = this._rgba.slice(),
                n = i.pop();
                return e && i.push(~~ (255 * n)),
                "#" + t.map(i,
                function(t) {
                    return t = (t || 0).toString(16),
                    1 === t.length ? "0" + t: t
                }).join("")
            },
            toString: function() {
                return 0 === this._rgba[3] ? "transparent": this.toRgbaString()
            }
        }),
        h.fn.parse.prototype = h.fn,
        u.hsla.to = function(t) {
            if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
            var e, i, n = t[0] / 255,
            s = t[1] / 255,
            o = t[2] / 255,
            a = t[3],
            r = Math.max(n, s, o),
            l = Math.min(n, s, o),
            h = r - l,
            u = r + l,
            c = .5 * u;
            return e = l === r ? 0 : n === r ? 60 * (s - o) / h + 360 : s === r ? 60 * (o - n) / h + 120 : 60 * (n - s) / h + 240,
            i = 0 === h ? 0 : .5 >= c ? h / u: h / (2 - u),
            [Math.round(e) % 360, i, c, null == a ? 1 : a]
        },
        u.hsla.from = function(t) {
            if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
            var e = t[0] / 360,
            i = t[1],
            n = t[2],
            o = t[3],
            a = .5 >= n ? n * (1 + i) : n + i - n * i,
            r = 2 * n - a;
            return [Math.round(255 * s(r, a, e + 1 / 3)), Math.round(255 * s(r, a, e)), Math.round(255 * s(r, a, e - 1 / 3)), o]
        },
        f(u,
        function(n, s) {
            var o = s.props,
            a = s.cache,
            l = s.to,
            u = s.from;
            h.fn[n] = function(n) {
                if (l && !this[a] && (this[a] = l(this._rgba)), n === e) return this[a].slice();
                var s, r = t.type(n),
                c = "array" === r || "object" === r ? n: arguments,
                d = this[a].slice();
                return f(o,
                function(t, e) {
                    var n = c["object" === r ? t: e.idx];
                    null == n && (n = d[e.idx]),
                    d[e.idx] = i(n, e)
                }),
                u ? (s = h(u(d)), s[a] = d, s) : h(d)
            },
            f(o,
            function(e, i) {
                h.fn[e] || (h.fn[e] = function(s) {
                    var o, a = t.type(s),
                    l = "alpha" === e ? this._hsla ? "hsla": "rgba": n,
                    h = this[l](),
                    u = h[i.idx];
                    return "undefined" === a ? u: ("function" === a && (s = s.call(this, u), a = t.type(s)), null == s && i.empty ? this: ("string" === a && (o = r.exec(s), o && (s = u + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1))), h[i.idx] = s, this[l](h)))
                })
            })
        }),
        h.hook = function(e) {
            var i = e.split(" ");
            f(i,
            function(e, i) {
                t.cssHooks[i] = {
                    set: function(e, s) {
                        var o, a, r = "";
                        if ("transparent" !== s && ("string" !== t.type(s) || (o = n(s)))) {
                            if (s = h(o || s), !d.rgba && 1 !== s._rgba[3]) {
                                for (a = "backgroundColor" === i ? e.parentNode: e; ("" === r || "transparent" === r) && a && a.style;) try {
                                    r = t.css(a, "backgroundColor"),
                                    a = a.parentNode
                                } catch(l) {}
                                s = s.blend(r && "transparent" !== r ? r: "_default")
                            }
                            s = s.toRgbaString()
                        }
                        try {
                            e.style[i] = s
                        } catch(l) {}
                    }
                },
                t.fx.step[i] = function(e) {
                    e.colorInit || (e.start = h(e.elem, i), e.end = h(e.end), e.colorInit = !0),
                    t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                }
            })
        },
        h.hook(a),
        t.cssHooks.borderColor = {
            expand: function(t) {
                var e = {};
                return f(["Top", "Right", "Bottom", "Left"],
                function(i, n) {
                    e["border" + n + "Color"] = t
                }),
                e
            }
        },
        o = t.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    } (y),
    function() {
        function e(e) {
            var i, n, s = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
            o = {};
            if (s && s.length && s[0] && s[s[0]]) for (n = s.length; n--;) i = s[n],
            "string" == typeof s[i] && (o[t.camelCase(i)] = s[i]);
            else for (i in s)"string" == typeof s[i] && (o[i] = s[i]);
            return o
        }
        function i(e, i) {
            var n, o, a = {};
            for (n in i) o = i[n],
            e[n] !== o && (s[n] || (t.fx.step[n] || !isNaN(parseFloat(o))) && (a[n] = o));
            return a
        }
        var n = ["add", "remove", "toggle"],
        s = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
        t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"],
        function(e, i) {
            t.fx.step[i] = function(t) { ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (y.style(t.elem, i, t.end), t.setAttr = !0)
            }
        }),
        t.fn.addBack || (t.fn.addBack = function(t) {
            return this.add(null == t ? this.prevObject: this.prevObject.filter(t))
        }),
        t.effects.animateClass = function(s, o, a, r) {
            var l = t.speed(o, a, r);
            return this.queue(function() {
                var o, a = t(this),
                r = a.attr("class") || "",
                h = l.children ? a.find("*").addBack() : a;
                h = h.map(function() {
                    var i = t(this);
                    return {
                        el: i,
                        start: e(this)
                    }
                }),
                o = function() {
                    t.each(n,
                    function(t, e) {
                        s[e] && a[e + "Class"](s[e])
                    })
                },
                o(),
                h = h.map(function() {
                    return this.end = e(this.el[0]),
                    this.diff = i(this.start, this.end),
                    this
                }),
                a.attr("class", r),
                h = h.map(function() {
                    var e = this,
                    i = t.Deferred(),
                    n = t.extend({},
                    l, {
                        queue: !1,
                        complete: function() {
                            i.resolve(e)
                        }
                    });
                    return this.el.animate(this.diff, n),
                    i.promise()
                }),
                t.when.apply(t, h.get()).done(function() {
                    o(),
                    t.each(arguments,
                    function() {
                        var e = this.el;
                        t.each(this.diff,
                        function(t) {
                            e.css(t, "")
                        })
                    }),
                    l.complete.call(a[0])
                })
            })
        },
        t.fn.extend({
            addClass: function(e) {
                return function(i, n, s, o) {
                    return n ? t.effects.animateClass.call(this, {
                        add: i
                    },
                    n, s, o) : e.apply(this, arguments)
                }
            } (t.fn.addClass),
            removeClass: function(e) {
                return function(i, n, s, o) {
                    return arguments.length > 1 ? t.effects.animateClass.call(this, {
                        remove: i
                    },
                    n, s, o) : e.apply(this, arguments)
                }
            } (t.fn.removeClass),
            toggleClass: function(e) {
                return function(i, n, s, o, a) {
                    return "boolean" == typeof n || void 0 === n ? s ? t.effects.animateClass.call(this, n ? {
                        add: i
                    }: {
                        remove: i
                    },
                    s, o, a) : e.apply(this, arguments) : t.effects.animateClass.call(this, {
                        toggle: i
                    },
                    n, s, o)
                }
            } (t.fn.toggleClass),
            switchClass: function(e, i, n, s, o) {
                return t.effects.animateClass.call(this, {
                    add: i,
                    remove: e
                },
                n, s, o)
            }
        })
    } (),
    function() {
        function e(e, i, n, s) {
            return t.isPlainObject(e) && (i = e, e = e.effect),
            e = {
                effect: e
            },
            null == i && (i = {}),
            t.isFunction(i) && (s = i, n = null, i = {}),
            ("number" == typeof i || t.fx.speeds[i]) && (s = n, n = i, i = {}),
            t.isFunction(n) && (s = n, n = null),
            i && t.extend(e, i),
            n = n || i.duration,
            e.duration = t.fx.off ? 0 : "number" == typeof n ? n: n in t.fx.speeds ? t.fx.speeds[n] : t.fx.speeds._default,
            e.complete = s || i.complete,
            e
        }
        function i(e) {
            return ! e || "number" == typeof e || t.fx.speeds[e] ? !0 : "string" != typeof e || t.effects.effect[e] ? t.isFunction(e) ? !0 : "object" != typeof e || e.effect ? !1 : !0 : !0
        }
        t.extend(t.effects, {
            version: "1.11.4",
            save: function(t, e) {
                for (var i = 0; i < e.length; i++) null !== e[i] && t.data(b + e[i], t[0].style[e[i]])
            },
            restore: function(t, e) {
                var i, n;
                for (n = 0; n < e.length; n++) null !== e[n] && (i = t.data(b + e[n]), void 0 === i && (i = ""), t.css(e[n], i))
            },
            setMode: function(t, e) {
                return "toggle" === e && (e = t.is(":hidden") ? "show": "hide"),
                e
            },
            getBaseline: function(t, e) {
                var i, n;
                switch (t[0]) {
                case "top":
                    i = 0;
                    break;
                case "middle":
                    i = .5;
                    break;
                case "bottom":
                    i = 1;
                    break;
                default:
                    i = t[0] / e.height
                }
                switch (t[1]) {
                case "left":
                    n = 0;
                    break;
                case "center":
                    n = .5;
                    break;
                case "right":
                    n = 1;
                    break;
                default:
                    n = t[1] / e.width
                }
                return {
                    x: n,
                    y: i
                }
            },
            createWrapper: function(e) {
                if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                var i = {
                    width: e.outerWidth(!0),
                    height: e.outerHeight(!0),
                    "float": e.css("float")
                },
                n = t("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                }),
                s = {
                    width: e.width(),
                    height: e.height()
                },
                o = document.activeElement;
                try {
                    o.id
                } catch(a) {
                    o = document.body
                }
                return e.wrap(n),
                (e[0] === o || t.contains(e[0], o)) && t(o).focus(),
                n = e.parent(),
                "static" === e.css("position") ? (n.css({
                    position: "relative"
                }), e.css({
                    position: "relative"
                })) : (t.extend(i, {
                    position: e.css("position"),
                    zIndex: e.css("z-index")
                }), t.each(["top", "left", "bottom", "right"],
                function(t, n) {
                    i[n] = e.css(n),
                    isNaN(parseInt(i[n], 10)) && (i[n] = "auto")
                }), e.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })),
                e.css(s),
                n.css(i).show()
            },
            removeWrapper: function(e) {
                var i = document.activeElement;
                return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).focus()),
                e
            },
            setTransition: function(e, i, n, s) {
                return s = s || {},
                t.each(i,
                function(t, i) {
                    var o = e.cssUnit(i);
                    o[0] > 0 && (s[i] = o[0] * n + o[1])
                }),
                s
            }
        }),
        t.fn.extend({
            effect: function() {
                function i(e) {
                    function i() {
                        t.isFunction(o) && o.call(s[0]),
                        t.isFunction(e) && e()
                    }
                    var s = t(this),
                    o = n.complete,
                    r = n.mode; (s.is(":hidden") ? "hide" === r: "show" === r) ? (s[r](), i()) : a.call(s[0], n, i)
                }
                var n = e.apply(this, arguments),
                s = n.mode,
                o = n.queue,
                a = t.effects.effect[n.effect];
                return t.fx.off || !a ? s ? this[s](n.duration, n.complete) : this.each(function() {
                    n.complete && n.complete.call(this)
                }) : o === !1 ? this.each(i) : this.queue(o || "fx", i)
            },
            show: function(t) {
                return function(n) {
                    if (i(n)) return t.apply(this, arguments);
                    var s = e.apply(this, arguments);
                    return s.mode = "show",
                    this.effect.call(this, s)
                }
            } (t.fn.show),
            hide: function(t) {
                return function(n) {
                    if (i(n)) return t.apply(this, arguments);
                    var s = e.apply(this, arguments);
                    return s.mode = "hide",
                    this.effect.call(this, s)
                }
            } (t.fn.hide),
            toggle: function(t) {
                return function(n) {
                    if (i(n) || "boolean" == typeof n) return t.apply(this, arguments);
                    var s = e.apply(this, arguments);
                    return s.mode = "toggle",
                    this.effect.call(this, s)
                }
            } (t.fn.toggle),
            cssUnit: function(e) {
                var i = this.css(e),
                n = [];
                return t.each(["em", "px", "%", "pt"],
                function(t, e) {
                    i.indexOf(e) > 0 && (n = [parseFloat(i), e])
                }),
                n
            }
        })
    } (),
    function() {
        var e = {};
        t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"],
        function(t, i) {
            e[i] = function(e) {
                return Math.pow(e, t + 2)
            }
        }),
        t.extend(e, {
            Sine: function(t) {
                return 1 - Math.cos(t * Math.PI / 2)
            },
            Circ: function(t) {
                return 1 - Math.sqrt(1 - t * t)
            },
            Elastic: function(t) {
                return 0 === t || 1 === t ? t: -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
            },
            Back: function(t) {
                return t * t * (3 * t - 2)
            },
            Bounce: function(t) {
                for (var e, i = 4; t < ((e = Math.pow(2, --i)) - 1) / 11;);
                return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
            }
        }),
        t.each(e,
        function(e, i) {
            t.easing["easeIn" + e] = i,
            t.easing["easeOut" + e] = function(t) {
                return 1 - i(1 - t)
            },
            t.easing["easeInOut" + e] = function(t) {
                return.5 > t ? i(2 * t) / 2 : 1 - i( - 2 * t + 2) / 2
            }
        })
    } ();
    t.effects,
    t.effects.effect.blind = function(e, i) {
        var n, s, o, a = t(this),
        r = /up|down|vertical/,
        l = /up|left|vertical|horizontal/,
        h = ["position", "top", "bottom", "left", "right", "height", "width"],
        u = t.effects.setMode(a, e.mode || "hide"),
        c = e.direction || "up",
        d = r.test(c),
        p = d ? "height": "width",
        f = d ? "top": "left",
        m = l.test(c),
        g = {},
        v = "show" === u;
        a.parent().is(".ui-effects-wrapper") ? t.effects.save(a.parent(), h) : t.effects.save(a, h),
        a.show(),
        n = t.effects.createWrapper(a).css({
            overflow: "hidden"
        }),
        s = n[p](),
        o = parseFloat(n.css(f)) || 0,
        g[p] = v ? s: 0,
        m || (a.css(d ? "bottom": "right", 0).css(d ? "top": "left", "auto").css({
            position: "absolute"
        }), g[f] = v ? o: s + o),
        v && (n.css(p, 0), m || n.css(f, o + s)),
        n.animate(g, {
            duration: e.duration,
            easing: e.easing,
            queue: !1,
            complete: function() {
                "hide" === u && a.hide(),
                t.effects.restore(a, h),
                t.effects.removeWrapper(a),
                i()
            }
        })
    },
    t.effects.effect.bounce = function(e, i) {
        var n, s, o, a = t(this),
        r = ["position", "top", "bottom", "left", "right", "height", "width"],
        l = t.effects.setMode(a, e.mode || "effect"),
        h = "hide" === l,
        u = "show" === l,
        c = e.direction || "up",
        d = e.distance,
        p = e.times || 5,
        f = 2 * p + (u || h ? 1 : 0),
        m = e.duration / f,
        g = e.easing,
        v = "up" === c || "down" === c ? "top": "left",
        b = "up" === c || "left" === c,
        y = a.queue(),
        _ = y.length;
        for ((u || h) && r.push("opacity"), t.effects.save(a, r), a.show(), t.effects.createWrapper(a), d || (d = a["top" === v ? "outerHeight": "outerWidth"]() / 3), u && (o = {
            opacity: 1
        },
        o[v] = 0, a.css("opacity", 0).css(v, b ? 2 * -d: 2 * d).animate(o, m, g)), h && (d /= Math.pow(2, p - 1)), o = {},
        o[v] = 0, n = 0; p > n; n++) s = {},
        s[v] = (b ? "-=": "+=") + d,
        a.animate(s, m, g).animate(o, m, g),
        d = h ? 2 * d: d / 2;
        h && (s = {
            opacity: 0
        },
        s[v] = (b ? "-=": "+=") + d, a.animate(s, m, g)),
        a.queue(function() {
            h && a.hide(),
            t.effects.restore(a, r),
            t.effects.removeWrapper(a),
            i()
        }),
        _ > 1 && y.splice.apply(y, [1, 0].concat(y.splice(_, f + 1))),
        a.dequeue()
    },
    t.effects.effect.clip = function(e, i) {
        var n, s, o, a = t(this),
        r = ["position", "top", "bottom", "left", "right", "height", "width"],
        l = t.effects.setMode(a, e.mode || "hide"),
        h = "show" === l,
        u = e.direction || "vertical",
        c = "vertical" === u,
        d = c ? "height": "width",
        p = c ? "top": "left",
        f = {};
        t.effects.save(a, r),
        a.show(),
        n = t.effects.createWrapper(a).css({
            overflow: "hidden"
        }),
        s = "IMG" === a[0].tagName ? n: a,
        o = s[d](),
        h && (s.css(d, 0), s.css(p, o / 2)),
        f[d] = h ? o: 0,
        f[p] = h ? 0 : o / 2,
        s.animate(f, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                h || a.hide(),
                t.effects.restore(a, r),
                t.effects.removeWrapper(a),
                i()
            }
        })
    },
    t.effects.effect.drop = function(e, i) {
        var n, s = t(this),
        o = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
        a = t.effects.setMode(s, e.mode || "hide"),
        r = "show" === a,
        l = e.direction || "left",
        h = "up" === l || "down" === l ? "top": "left",
        u = "up" === l || "left" === l ? "pos": "neg",
        c = {
            opacity: r ? 1 : 0
        };
        t.effects.save(s, o),
        s.show(),
        t.effects.createWrapper(s),
        n = e.distance || s["top" === h ? "outerHeight": "outerWidth"](!0) / 2,
        r && s.css("opacity", 0).css(h, "pos" === u ? -n: n),
        c[h] = (r ? "pos" === u ? "+=": "-=": "pos" === u ? "-=": "+=") + n,
        s.animate(c, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                "hide" === a && s.hide(),
                t.effects.restore(s, o),
                t.effects.removeWrapper(s),
                i()
            }
        })
    },
    t.effects.effect.explode = function(e, i) {
        function n() {
            y.push(this),
            y.length === c * d && s()
        }
        function s() {
            p.css({
                visibility: "visible"
            }),
            t(y).remove(),
            m || p.hide(),
            i()
        }
        var o, a, r, l, h, u, c = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3,
        d = c,
        p = t(this),
        f = t.effects.setMode(p, e.mode || "hide"),
        m = "show" === f,
        g = p.show().css("visibility", "hidden").offset(),
        v = Math.ceil(p.outerWidth() / d),
        b = Math.ceil(p.outerHeight() / c),
        y = [];
        for (o = 0; c > o; o++) for (l = g.top + o * b, u = o - (c - 1) / 2, a = 0; d > a; a++) r = g.left + a * v,
        h = a - (d - 1) / 2,
        p.clone().appendTo("body").wrap("<div></div>").css({
            position: "absolute",
            visibility: "visible",
            left: -a * v,
            top: -o * b
        }).parent().addClass("ui-effects-explode").css({
            position: "absolute",
            overflow: "hidden",
            width: v,
            height: b,
            left: r + (m ? h * v: 0),
            top: l + (m ? u * b: 0),
            opacity: m ? 0 : 1
        }).animate({
            left: r + (m ? 0 : h * v),
            top: l + (m ? 0 : u * b),
            opacity: m ? 1 : 0
        },
        e.duration || 500, e.easing, n)
    },
    t.effects.effect.fade = function(e, i) {
        var n = t(this),
        s = t.effects.setMode(n, e.mode || "toggle");
        n.animate({
            opacity: s
        },
        {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: i
        })
    },
    t.effects.effect.fold = function(e, i) {
        var n, s, o = t(this),
        a = ["position", "top", "bottom", "left", "right", "height", "width"],
        r = t.effects.setMode(o, e.mode || "hide"),
        l = "show" === r,
        h = "hide" === r,
        u = e.size || 15,
        c = /([0-9]+)%/.exec(u),
        d = !!e.horizFirst,
        p = l !== d,
        f = p ? ["width", "height"] : ["height", "width"],
        m = e.duration / 2,
        g = {},
        v = {};
        t.effects.save(o, a),
        o.show(),
        n = t.effects.createWrapper(o).css({
            overflow: "hidden"
        }),
        s = p ? [n.width(), n.height()] : [n.height(), n.width()],
        c && (u = parseInt(c[1], 10) / 100 * s[h ? 0 : 1]),
        l && n.css(d ? {
            height: 0,
            width: u
        }: {
            height: u,
            width: 0
        }),
        g[f[0]] = l ? s[0] : u,
        v[f[1]] = l ? s[1] : 0,
        n.animate(g, m, e.easing).animate(v, m, e.easing,
        function() {
            h && o.hide(),
            t.effects.restore(o, a),
            t.effects.removeWrapper(o),
            i()
        })
    },
    t.effects.effect.highlight = function(e, i) {
        var n = t(this),
        s = ["backgroundImage", "backgroundColor", "opacity"],
        o = t.effects.setMode(n, e.mode || "show"),
        a = {
            backgroundColor: n.css("backgroundColor")
        };
        "hide" === o && (a.opacity = 0),
        t.effects.save(n, s),
        n.show().css({
            backgroundImage: "none",
            backgroundColor: e.color || "#ffff99"
        }).animate(a, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                "hide" === o && n.hide(),
                t.effects.restore(n, s),
                i()
            }
        })
    },
    t.effects.effect.size = function(e, i) {
        var n, s, o, a = t(this),
        r = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
        l = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
        h = ["width", "height", "overflow"],
        u = ["fontSize"],
        c = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
        d = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
        p = t.effects.setMode(a, e.mode || "effect"),
        f = e.restore || "effect" !== p,
        m = e.scale || "both",
        g = e.origin || ["middle", "center"],
        v = a.css("position"),
        b = f ? r: l,
        y = {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        };
        "show" === p && a.show(),
        n = {
            height: a.height(),
            width: a.width(),
            outerHeight: a.outerHeight(),
            outerWidth: a.outerWidth()
        },
        "toggle" === e.mode && "show" === p ? (a.from = e.to || y, a.to = e.from || n) : (a.from = e.from || ("show" === p ? y: n), a.to = e.to || ("hide" === p ? y: n)),
        o = {
            from: {
                y: a.from.height / n.height,
                x: a.from.width / n.width
            },
            to: {
                y: a.to.height / n.height,
                x: a.to.width / n.width
            }
        },
        ("box" === m || "both" === m) && (o.from.y !== o.to.y && (b = b.concat(c), a.from = t.effects.setTransition(a, c, o.from.y, a.from), a.to = t.effects.setTransition(a, c, o.to.y, a.to)), o.from.x !== o.to.x && (b = b.concat(d), a.from = t.effects.setTransition(a, d, o.from.x, a.from), a.to = t.effects.setTransition(a, d, o.to.x, a.to))),
        ("content" === m || "both" === m) && o.from.y !== o.to.y && (b = b.concat(u).concat(h), a.from = t.effects.setTransition(a, u, o.from.y, a.from), a.to = t.effects.setTransition(a, u, o.to.y, a.to)),
        t.effects.save(a, b),
        a.show(),
        t.effects.createWrapper(a),
        a.css("overflow", "hidden").css(a.from),
        g && (s = t.effects.getBaseline(g, n), a.from.top = (n.outerHeight - a.outerHeight()) * s.y, a.from.left = (n.outerWidth - a.outerWidth()) * s.x, a.to.top = (n.outerHeight - a.to.outerHeight) * s.y, a.to.left = (n.outerWidth - a.to.outerWidth) * s.x),
        a.css(a.from),
        ("content" === m || "both" === m) && (c = c.concat(["marginTop", "marginBottom"]).concat(u), d = d.concat(["marginLeft", "marginRight"]), h = r.concat(c).concat(d), a.find("*[width]").each(function() {
            var i = t(this),
            n = {
                height: i.height(),
                width: i.width(),
                outerHeight: i.outerHeight(),
                outerWidth: i.outerWidth()
            };
            f && t.effects.save(i, h),
            i.from = {
                height: n.height * o.from.y,
                width: n.width * o.from.x,
                outerHeight: n.outerHeight * o.from.y,
                outerWidth: n.outerWidth * o.from.x
            },
            i.to = {
                height: n.height * o.to.y,
                width: n.width * o.to.x,
                outerHeight: n.height * o.to.y,
                outerWidth: n.width * o.to.x
            },
            o.from.y !== o.to.y && (i.from = t.effects.setTransition(i, c, o.from.y, i.from), i.to = t.effects.setTransition(i, c, o.to.y, i.to)),
            o.from.x !== o.to.x && (i.from = t.effects.setTransition(i, d, o.from.x, i.from), i.to = t.effects.setTransition(i, d, o.to.x, i.to)),
            i.css(i.from),
            i.animate(i.to, e.duration, e.easing,
            function() {
                f && t.effects.restore(i, h)
            })
        })),
        a.animate(a.to, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                0 === a.to.opacity && a.css("opacity", a.from.opacity),
                "hide" === p && a.hide(),
                t.effects.restore(a, b),
                f || ("static" === v ? a.css({
                    position: "relative",
                    top: a.to.top,
                    left: a.to.left
                }) : t.each(["top", "left"],
                function(t, e) {
                    a.css(e,
                    function(e, i) {
                        var n = parseInt(i, 10),
                        s = t ? a.to.left: a.to.top;
                        return "auto" === i ? s + "px": n + s + "px"
                    })
                })),
                t.effects.removeWrapper(a),
                i()
            }
        })
    },
    t.effects.effect.scale = function(e, i) {
        var n = t(this),
        s = t.extend(!0, {},
        e),
        o = t.effects.setMode(n, e.mode || "effect"),
        a = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "hide" === o ? 0 : 100),
        r = e.direction || "both",
        l = e.origin,
        h = {
            height: n.height(),
            width: n.width(),
            outerHeight: n.outerHeight(),
            outerWidth: n.outerWidth()
        },
        u = {
            y: "horizontal" !== r ? a / 100 : 1,
            x: "vertical" !== r ? a / 100 : 1
        };
        s.effect = "size",
        s.queue = !1,
        s.complete = i,
        "effect" !== o && (s.origin = l || ["middle", "center"], s.restore = !0),
        s.from = e.from || ("show" === o ? {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        }: h),
        s.to = {
            height: h.height * u.y,
            width: h.width * u.x,
            outerHeight: h.outerHeight * u.y,
            outerWidth: h.outerWidth * u.x
        },
        s.fade && ("show" === o && (s.from.opacity = 0, s.to.opacity = 1), "hide" === o && (s.from.opacity = 1, s.to.opacity = 0)),
        n.effect(s)
    },
    t.effects.effect.puff = function(e, i) {
        var n = t(this),
        s = t.effects.setMode(n, e.mode || "hide"),
        o = "hide" === s,
        a = parseInt(e.percent, 10) || 150,
        r = a / 100,
        l = {
            height: n.height(),
            width: n.width(),
            outerHeight: n.outerHeight(),
            outerWidth: n.outerWidth()
        };
        t.extend(e, {
            effect: "scale",
            queue: !1,
            fade: !0,
            mode: s,
            complete: i,
            percent: o ? a: 100,
            from: o ? l: {
                height: l.height * r,
                width: l.width * r,
                outerHeight: l.outerHeight * r,
                outerWidth: l.outerWidth * r
            }
        }),
        n.effect(e)
    },
    t.effects.effect.pulsate = function(e, i) {
        var n, s = t(this),
        o = t.effects.setMode(s, e.mode || "show"),
        a = "show" === o,
        r = "hide" === o,
        l = a || "hide" === o,
        h = 2 * (e.times || 5) + (l ? 1 : 0),
        u = e.duration / h,
        c = 0,
        d = s.queue(),
        p = d.length;
        for ((a || !s.is(":visible")) && (s.css("opacity", 0).show(), c = 1), n = 1; h > n; n++) s.animate({
            opacity: c
        },
        u, e.easing),
        c = 1 - c;
        s.animate({
            opacity: c
        },
        u, e.easing),
        s.queue(function() {
            r && s.hide(),
            i()
        }),
        p > 1 && d.splice.apply(d, [1, 0].concat(d.splice(p, h + 1))),
        s.dequeue()
    },
    t.effects.effect.shake = function(e, i) {
        var n, s = t(this),
        o = ["position", "top", "bottom", "left", "right", "height", "width"],
        a = t.effects.setMode(s, e.mode || "effect"),
        r = e.direction || "left",
        l = e.distance || 20,
        h = e.times || 3,
        u = 2 * h + 1,
        c = Math.round(e.duration / u),
        d = "up" === r || "down" === r ? "top": "left",
        p = "up" === r || "left" === r,
        f = {},
        m = {},
        g = {},
        v = s.queue(),
        b = v.length;
        for (t.effects.save(s, o), s.show(), t.effects.createWrapper(s), f[d] = (p ? "-=": "+=") + l, m[d] = (p ? "+=": "-=") + 2 * l, g[d] = (p ? "-=": "+=") + 2 * l, s.animate(f, c, e.easing), n = 1; h > n; n++) s.animate(m, c, e.easing).animate(g, c, e.easing);
        s.animate(m, c, e.easing).animate(f, c / 2, e.easing).queue(function() {
            "hide" === a && s.hide(),
            t.effects.restore(s, o),
            t.effects.removeWrapper(s),
            i()
        }),
        b > 1 && v.splice.apply(v, [1, 0].concat(v.splice(b, u + 1))),
        s.dequeue()
    },
    t.effects.effect.slide = function(e, i) {
        var n, s = t(this),
        o = ["position", "top", "bottom", "left", "right", "width", "height"],
        a = t.effects.setMode(s, e.mode || "show"),
        r = "show" === a,
        l = e.direction || "left",
        h = "up" === l || "down" === l ? "top": "left",
        u = "up" === l || "left" === l,
        c = {};
        t.effects.save(s, o),
        s.show(),
        n = e.distance || s["top" === h ? "outerHeight": "outerWidth"](!0),
        t.effects.createWrapper(s).css({
            overflow: "hidden"
        }),
        r && s.css(h, u ? isNaN(n) ? "-" + n: -n: n),
        c[h] = (r ? u ? "+=": "-=": u ? "-=": "+=") + n,
        s.animate(c, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                "hide" === a && s.hide(),
                t.effects.restore(s, o),
                t.effects.removeWrapper(s),
                i()
            }
        })
    },
    t.effects.effect.transfer = function(e, i) {
        var n = t(this),
        s = t(e.to),
        o = "fixed" === s.css("position"),
        a = t("body"),
        r = o ? a.scrollTop() : 0,
        l = o ? a.scrollLeft() : 0,
        h = s.offset(),
        u = {
            top: h.top - r,
            left: h.left - l,
            height: s.innerHeight(),
            width: s.innerWidth()
        },
        c = n.offset(),
        d = t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({
            top: c.top - r,
            left: c.left - l,
            height: n.innerHeight(),
            width: n.innerWidth(),
            position: o ? "fixed": "absolute"
        }).animate(u, e.duration, e.easing,
        function() {
            d.remove(),
            i()
        })
    },
    t.widget("ui.progressbar", {
        version: "1.11.4",
        options: {
            max: 100,
            value: 0,
            change: null,
            complete: null
        },
        min: 0,
        _create: function() {
            this.oldValue = this.options.value = this._constrainedValue(),
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min
            }),
            this.valueDiv = t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),
            this._refreshValue()
        },
        _destroy: function() {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),
            this.valueDiv.remove()
        },
        value: function(t) {
            return void 0 === t ? this.options.value: (this.options.value = this._constrainedValue(t), void this._refreshValue())
        },
        _constrainedValue: function(t) {
            return void 0 === t && (t = this.options.value),
            this.indeterminate = t === !1,
            "number" != typeof t && (t = 0),
            this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, t))
        },
        _setOptions: function(t) {
            var e = t.value;
            delete t.value,
            this._super(t),
            this.options.value = this._constrainedValue(e),
            this._refreshValue()
        },
        _setOption: function(t, e) {
            "max" === t && (e = Math.max(this.min, e)),
            "disabled" === t && this.element.toggleClass("ui-state-disabled", !!e).attr("aria-disabled", e),
            this._super(t, e)
        },
        _percentage: function() {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
        },
        _refreshValue: function() {
            var e = this.options.value,
            i = this._percentage();
            this.valueDiv.toggle(this.indeterminate || e > this.min).toggleClass("ui-corner-right", e === this.options.max).width(i.toFixed(0) + "%"),
            this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate),
            this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = t("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": e
            }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)),
            this.oldValue !== e && (this.oldValue = e, this._trigger("change")),
            e === this.options.max && this._trigger("complete")
        }
    }),
    t.widget("ui.selectable", t.ui.mouse, {
        version: "1.11.4",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function() {
            var e, i = this;
            this.element.addClass("ui-selectable"),
            this.dragged = !1,
            this.refresh = function() {
                e = t(i.options.filter, i.element[0]),
                e.addClass("ui-selectee"),
                e.each(function() {
                    var e = t(this),
                    i = e.offset();
                    t.data(this, "selectable-item", {
                        element: this,
                        $element: e,
                        left: i.left,
                        top: i.top,
                        right: i.left + e.outerWidth(),
                        bottom: i.top + e.outerHeight(),
                        startselected: !1,
                        selected: e.hasClass("ui-selected"),
                        selecting: e.hasClass("ui-selecting"),
                        unselecting: e.hasClass("ui-unselecting")
                    })
                })
            },
            this.refresh(),
            this.selectees = e.addClass("ui-selectee"),
            this._mouseInit(),
            this.helper = t("<div class='ui-selectable-helper'></div>")
        },
        _destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item"),
            this.element.removeClass("ui-selectable ui-selectable-disabled"),
            this._mouseDestroy()
        },
        _mouseStart: function(e) {
            var i = this,
            n = this.options;
            this.opos = [e.pageX, e.pageY],
            this.options.disabled || (this.selectees = t(n.filter, this.element[0]), this._trigger("start", e), t(n.appendTo).append(this.helper), this.helper.css({
                left: e.pageX,
                top: e.pageY,
                width: 0,
                height: 0
            }), n.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                var n = t.data(this, "selectable-item");
                n.startselected = !0,
                e.metaKey || e.ctrlKey || (n.$element.removeClass("ui-selected"), n.selected = !1, n.$element.addClass("ui-unselecting"), n.unselecting = !0, i._trigger("unselecting", e, {
                    unselecting: n.element
                }))
            }), t(e.target).parents().addBack().each(function() {
                var n, s = t.data(this, "selectable-item");
                return s ? (n = !e.metaKey && !e.ctrlKey || !s.$element.hasClass("ui-selected"), s.$element.removeClass(n ? "ui-unselecting": "ui-selected").addClass(n ? "ui-selecting": "ui-unselecting"), s.unselecting = !n, s.selecting = n, s.selected = n, n ? i._trigger("selecting", e, {
                    selecting: s.element
                }) : i._trigger("unselecting", e, {
                    unselecting: s.element
                }), !1) : void 0
            }))
        },
        _mouseDrag: function(e) {
            if (this.dragged = !0, !this.options.disabled) {
                var i, n = this,
                s = this.options,
                o = this.opos[0],
                a = this.opos[1],
                r = e.pageX,
                l = e.pageY;
                return o > r && (i = r, r = o, o = i),
                a > l && (i = l, l = a, a = i),
                this.helper.css({
                    left: o,
                    top: a,
                    width: r - o,
                    height: l - a
                }),
                this.selectees.each(function() {
                    var i = t.data(this, "selectable-item"),
                    h = !1;
                    i && i.element !== n.element[0] && ("touch" === s.tolerance ? h = !(i.left > r || i.right < o || i.top > l || i.bottom < a) : "fit" === s.tolerance && (h = i.left > o && i.right < r && i.top > a && i.bottom < l), h ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, n._trigger("selecting", e, {
                        selecting: i.element
                    }))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), n._trigger("unselecting", e, {
                        unselecting: i.element
                    }))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, n._trigger("unselecting", e, {
                        unselecting: i.element
                    })))))
                }),
                !1
            }
        },
        _mouseStop: function(e) {
            var i = this;
            return this.dragged = !1,
            t(".ui-unselecting", this.element[0]).each(function() {
                var n = t.data(this, "selectable-item");
                n.$element.removeClass("ui-unselecting"),
                n.unselecting = !1,
                n.startselected = !1,
                i._trigger("unselected", e, {
                    unselected: n.element
                })
            }),
            t(".ui-selecting", this.element[0]).each(function() {
                var n = t.data(this, "selectable-item");
                n.$element.removeClass("ui-selecting").addClass("ui-selected"),
                n.selecting = !1,
                n.selected = !0,
                n.startselected = !0,
                i._trigger("selected", e, {
                    selected: n.element
                })
            }),
            this._trigger("stop", e),
            this.helper.remove(),
            !1
        }
    }),
    t.widget("ui.selectmenu", {
        version: "1.11.4",
        defaultElement: "<select>",
        options: {
            appendTo: null,
            disabled: null,
            icons: {
                button: "ui-icon-triangle-1-s"
            },
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            width: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            select: null
        },
        _create: function() {
            var t = this.element.uniqueId().attr("id");
            this.ids = {
                element: t,
                button: t + "-button",
                menu: t + "-menu"
            },
            this._drawButton(),
            this._drawMenu(),
            this.options.disabled && this.disable()
        },
        _drawButton: function() {
            var e = this;
            this.label = t("label[for='" + this.ids.element + "']").attr("for", this.ids.button),
            this._on(this.label, {
                click: function(t) {
                    this.button.focus(),
                    t.preventDefault()
                }
            }),
            this.element.hide(),
            this.button = t("<span>", {
                "class": "ui-selectmenu-button ui-widget ui-state-default ui-corner-all",
                tabindex: this.options.disabled ? -1 : 0,
                id: this.ids.button,
                role: "combobox",
                "aria-expanded": "false",
                "aria-autocomplete": "list",
                "aria-owns": this.ids.menu,
                "aria-haspopup": "true"
            }).insertAfter(this.element),
            t("<span>", {
                "class": "ui-icon " + this.options.icons.button
            }).prependTo(this.button),
            this.buttonText = t("<span>", {
                "class": "ui-selectmenu-text"
            }).appendTo(this.button),
            this._setText(this.buttonText, this.element.find("option:selected").text()),
            this._resizeButton(),
            this._on(this.button, this._buttonEvents),
            this.button.one("focusin",
            function() {
                e.menuItems || e._refreshMenu()
            }),
            this._hoverable(this.button),
            this._focusable(this.button)
        },
        _drawMenu: function() {
            var e = this;
            this.menu = t("<ul>", {
                "aria-hidden": "true",
                "aria-labelledby": this.ids.button,
                id: this.ids.menu
            }),
            this.menuWrap = t("<div>", {
                "class": "ui-selectmenu-menu ui-front"
            }).append(this.menu).appendTo(this._appendTo()),
            this.menuInstance = this.menu.menu({
                role: "listbox",
                select: function(t, i) {
                    t.preventDefault(),
                    e._setSelection(),
                    e._select(i.item.data("ui-selectmenu-item"), t)
                },
                focus: function(t, i) {
                    var n = i.item.data("ui-selectmenu-item");
                    null != e.focusIndex && n.index !== e.focusIndex && (e._trigger("focus", t, {
                        item: n
                    }), e.isOpen || e._select(n, t)),
                    e.focusIndex = n.index,
                    e.button.attr("aria-activedescendant", e.menuItems.eq(n.index).attr("id"))
                }
            }).menu("instance"),
            this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"),
            this.menuInstance._off(this.menu, "mouseleave"),
            this.menuInstance._closeOnDocumentClick = function() {
                return ! 1
            },
            this.menuInstance._isDivider = function() {
                return ! 1
            }
        },
        refresh: function() {
            this._refreshMenu(),
            this._setText(this.buttonText, this._getSelectedItem().text()),
            this.options.width || this._resizeButton()
        },
        _refreshMenu: function() {
            this.menu.empty();
            var t, e = this.element.find("option");
            e.length && (this._parseOptions(e), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup"), t = this._getSelectedItem(), this.menuInstance.focus(null, t), this._setAria(t.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")))
        },
        open: function(t) {
            this.options.disabled || (this.menuItems ? (this.menu.find(".ui-state-focus").removeClass("ui-state-focus"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", t))
        },
        _position: function() {
            this.menuWrap.position(t.extend({
                of: this.button
            },
            this.options.position))
        },
        close: function(t) {
            this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", t))
        },
        widget: function() {
            return this.button
        },
        menuWidget: function() {
            return this.menu
        },
        _renderMenu: function(e, i) {
            var n = this,
            s = "";
            t.each(i,
            function(i, o) {
                o.optgroup !== s && (t("<li>", {
                    "class": "ui-selectmenu-optgroup ui-menu-divider" + (o.element.parent("optgroup").prop("disabled") ? " ui-state-disabled": ""),
                    text: o.optgroup
                }).appendTo(e), s = o.optgroup),
                n._renderItemData(e, o)
            })
        },
        _renderItemData: function(t, e) {
            return this._renderItem(t, e).data("ui-selectmenu-item", e)
        },
        _renderItem: function(e, i) {
            var n = t("<li>");
            return i.disabled && n.addClass("ui-state-disabled"),
            this._setText(n, i.label),
            n.appendTo(e)
        },
        _setText: function(t, e) {
            e ? t.text(e) : t.html("&#160;")
        },
        _move: function(t, e) {
            var i, n, s = ".ui-menu-item";
            this.isOpen ? i = this.menuItems.eq(this.focusIndex) : (i = this.menuItems.eq(this.element[0].selectedIndex), s += ":not(.ui-state-disabled)"),
            n = "first" === t || "last" === t ? i["first" === t ? "prevAll": "nextAll"](s).eq( - 1) : i[t + "All"](s).eq(0),
            n.length && this.menuInstance.focus(e, n)
        },
        _getSelectedItem: function() {
            return this.menuItems.eq(this.element[0].selectedIndex)
        },
        _toggle: function(t) {
            this[this.isOpen ? "close": "open"](t)
        },
        _setSelection: function() {
            var t;
            this.range && (window.getSelection ? (t = window.getSelection(), t.removeAllRanges(), t.addRange(this.range)) : this.range.select(), this.button.focus())
        },
        _documentClick: {
            mousedown: function(e) {
                this.isOpen && (t(e.target).closest(".ui-selectmenu-menu, #" + this.ids.button).length || this.close(e))
            }
        },
        _buttonEvents: {
            mousedown: function() {
                var t;
                window.getSelection ? (t = window.getSelection(), t.rangeCount && (this.range = t.getRangeAt(0))) : this.range = document.selection.createRange()
            },
            click: function(t) {
                this._setSelection(),
                this._toggle(t)
            },
            keydown: function(e) {
                var i = !0;
                switch (e.keyCode) {
                case t.ui.keyCode.TAB:
                case t.ui.keyCode.ESCAPE:
                    this.close(e),
                    i = !1;
                    break;
                case t.ui.keyCode.ENTER:
                    this.isOpen && this._selectFocusedItem(e);
                    break;
                case t.ui.keyCode.UP:
                    e.altKey ? this._toggle(e) : this._move("prev", e);
                    break;
                case t.ui.keyCode.DOWN:
                    e.altKey ? this._toggle(e) : this._move("next", e);
                    break;
                case t.ui.keyCode.SPACE:
                    this.isOpen ? this._selectFocusedItem(e) : this._toggle(e);
                    break;
                case t.ui.keyCode.LEFT:
                    this._move("prev", e);
                    break;
                case t.ui.keyCode.RIGHT:
                    this._move("next", e);
                    break;
                case t.ui.keyCode.HOME:
                case t.ui.keyCode.PAGE_UP:
                    this._move("first", e);
                    break;
                case t.ui.keyCode.END:
                case t.ui.keyCode.PAGE_DOWN:
                    this._move("last", e);
                    break;
                default:
                    this.menu.trigger(e),
                    i = !1
                }
                i && e.preventDefault()
            }
        },
        _selectFocusedItem: function(t) {
            var e = this.menuItems.eq(this.focusIndex);
            e.hasClass("ui-state-disabled") || this._select(e.data("ui-selectmenu-item"), t)
        },
        _select: function(t, e) {
            var i = this.element[0].selectedIndex;
            this.element[0].selectedIndex = t.index,
            this._setText(this.buttonText, t.label),
            this._setAria(t),
            this._trigger("select", e, {
                item: t
            }),
            t.index !== i && this._trigger("change", e, {
                item: t
            }),
            this.close(e)
        },
        _setAria: function(t) {
            var e = this.menuItems.eq(t.index).attr("id");
            this.button.attr({
                "aria-labelledby": e,
                "aria-activedescendant": e
            }),
            this.menu.attr("aria-activedescendant", e)
        },
        _setOption: function(t, e) {
            "icons" === t && this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(e.button),
            this._super(t, e),
            "appendTo" === t && this.menuWrap.appendTo(this._appendTo()),
            "disabled" === t && (this.menuInstance.option("disabled", e), this.button.toggleClass("ui-state-disabled", e).attr("aria-disabled", e), this.element.prop("disabled", e), e ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0)),
            "width" === t && this._resizeButton()
        },
        _appendTo: function() {
            var e = this.options.appendTo;
            return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)),
            e && e[0] || (e = this.element.closest(".ui-front")),
            e.length || (e = this.document[0].body),
            e
        },
        _toggleAttr: function() {
            this.button.toggleClass("ui-corner-top", this.isOpen).toggleClass("ui-corner-all", !this.isOpen).attr("aria-expanded", this.isOpen),
            this.menuWrap.toggleClass("ui-selectmenu-open", this.isOpen),
            this.menu.attr("aria-hidden", !this.isOpen)
        },
        _resizeButton: function() {
            var t = this.options.width;
            t || (t = this.element.show().outerWidth(), this.element.hide()),
            this.button.outerWidth(t)
        },
        _resizeMenu: function() {
            this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
        },
        _getCreateOptions: function() {
            return {
                disabled: this.element.prop("disabled")
            }
        },
        _parseOptions: function(e) {
            var i = [];
            e.each(function(e, n) {
                var s = t(n),
                o = s.parent("optgroup");
                i.push({
                    element: s,
                    index: e,
                    value: s.val(),
                    label: s.text(),
                    optgroup: o.attr("label") || "",
                    disabled: o.prop("disabled") || s.prop("disabled")
                })
            }),
            this.items = i
        },
        _destroy: function() {
            this.menuWrap.remove(),
            this.button.remove(),
            this.element.show(),
            this.element.removeUniqueId(),
            this.label.attr("for", this.ids.element)
        }
    }),
    t.widget("ui.slider", t.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function() {
            this._keySliding = !1,
            this._mouseSliding = !1,
            this._animateOff = !0,
            this._handleIndex = null,
            this._detectOrientation(),
            this._mouseInit(),
            this._calculateNewMax(),
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"),
            this._refresh(),
            this._setOption("disabled", this.options.disabled),
            this._animateOff = !1
        },
        _refresh: function() {
            this._createRange(),
            this._createHandles(),
            this._setupEvents(),
            this._refreshValue()
        },
        _createHandles: function() {
            var e, i, n = this.options,
            s = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
            o = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
            a = [];
            for (i = n.values && n.values.length || 1, s.length > i && (s.slice(i).remove(), s = s.slice(0, i)), e = s.length; i > e; e++) a.push(o);
            this.handles = s.add(t(a.join("")).appendTo(this.element)),
            this.handle = this.handles.eq(0),
            this.handles.each(function(e) {
                t(this).data("ui-slider-handle-index", e)
            })
        },
        _createRange: function() {
            var e = this.options,
            i = "";
            e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                left: "",
                bottom: ""
            }) : (this.range = t("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range: ""))) : (this.range && this.range.remove(), this.range = null)
        },
        _setupEvents: function() {
            this._off(this.handles),
            this._on(this.handles, this._handleEvents),
            this._hoverable(this.handles),
            this._focusable(this.handles)
        },
        _destroy: function() {
            this.handles.remove(),
            this.range && this.range.remove(),
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),
            this._mouseDestroy()
        },
        _mouseCapture: function(e) {
            var i, n, s, o, a, r, l, h, u = this,
            c = this.options;
            return c.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            },
            this.elementOffset = this.element.offset(), i = {
                x: e.pageX,
                y: e.pageY
            },
            n = this._normValueFromMouse(i), s = this._valueMax() - this._valueMin() + 1, this.handles.each(function(e) {
                var i = Math.abs(n - u.values(e)); (s > i || s === i && (e === u._lastChangedValue || u.values(e) === c.min)) && (s = i, o = t(this), a = e)
            }), r = this._start(e, a), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = a, o.addClass("ui-state-active").focus(), l = o.offset(), h = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = h ? {
                left: 0,
                top: 0
            }: {
                left: e.pageX - l.left - o.width() / 2,
                top: e.pageY - l.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0)
            },
            this.handles.hasClass("ui-state-hover") || this._slide(e, a, n), this._animateOff = !0, !0))
        },
        _mouseStart: function() {
            return ! 0
        },
        _mouseDrag: function(t) {
            var e = {
                x: t.pageX,
                y: t.pageY
            },
            i = this._normValueFromMouse(e);
            return this._slide(t, this._handleIndex, i),
            !1
        },
        _mouseStop: function(t) {
            return this.handles.removeClass("ui-state-active"),
            this._mouseSliding = !1,
            this._stop(t, this._handleIndex),
            this._change(t, this._handleIndex),
            this._handleIndex = null,
            this._clickOffset = null,
            this._animateOff = !1,
            !1
        },
        _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical": "horizontal"
        },
        _normValueFromMouse: function(t) {
            var e, i, n, s, o;
            return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left: 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top: 0)),
            n = i / e,
            n > 1 && (n = 1),
            0 > n && (n = 0),
            "vertical" === this.orientation && (n = 1 - n),
            s = this._valueMax() - this._valueMin(),
            o = this._valueMin() + n * s,
            this._trimAlignValue(o)
        },
        _start: function(t, e) {
            var i = {
                handle: this.handles[e],
                value: this.value()
            };
            return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()),
            this._trigger("start", t, i)
        },
        _slide: function(t, e, i) {
            var n, s, o;
            this.options.values && this.options.values.length ? (n = this.values(e ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === e && i > n || 1 === e && n > i) && (i = n), i !== this.values(e) && (s = this.values(), s[e] = i, o = this._trigger("slide", t, {
                handle: this.handles[e],
                value: i,
                values: s
            }), n = this.values(e ? 0 : 1), o !== !1 && this.values(e, i))) : i !== this.value() && (o = this._trigger("slide", t, {
                handle: this.handles[e],
                value: i
            }), o !== !1 && this.value(i))
        },
        _stop: function(t, e) {
            var i = {
                handle: this.handles[e],
                value: this.value()
            };
            this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()),
            this._trigger("stop", t, i)
        },
        _change: function(t, e) {
            if (!this._keySliding && !this._mouseSliding) {
                var i = {
                    handle: this.handles[e],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()),
                this._lastChangedValue = e,
                this._trigger("change", t, i)
            }
        },
        value: function(t) {
            return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), void this._change(null, 0)) : this._value()
        },
        values: function(e, i) {
            var n, s, o;
            if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i),
            this._refreshValue(),
            void this._change(null, e);
            if (!arguments.length) return this._values();
            if (!t.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(e) : this.value();
            for (n = this.options.values, s = arguments[0], o = 0; o < n.length; o += 1) n[o] = this._trimAlignValue(s[o]),
            this._change(null, o);
            this._refreshValue()
        },
        _setOption: function(e, i) {
            var n, s = 0;
            switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (s = this.options.values.length), "disabled" === e && this.element.toggleClass("ui-state-disabled", !!i), this._super(e, i), e) {
            case "orientation":
                this._detectOrientation(),
                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation),
                this._refreshValue(),
                this.handles.css("horizontal" === i ? "bottom": "left", "");
                break;
            case "value":
                this._animateOff = !0,
                this._refreshValue(),
                this._change(null, 0),
                this._animateOff = !1;
                break;
            case "values":
                for (this._animateOff = !0, this._refreshValue(), n = 0; s > n; n += 1) this._change(null, n);
                this._animateOff = !1;
                break;
            case "step":
            case "min":
            case "max":
                this._animateOff = !0,
                this._calculateNewMax(),
                this._refreshValue(),
                this._animateOff = !1;
                break;
            case "range":
                this._animateOff = !0,
                this._refresh(),
                this._animateOff = !1
            }
        },
        _value: function() {
            var t = this.options.value;
            return t = this._trimAlignValue(t)
        },
        _values: function(t) {
            var e, i, n;
            if (arguments.length) return e = this.options.values[t],
            e = this._trimAlignValue(e);
            if (this.options.values && this.options.values.length) {
                for (i = this.options.values.slice(), n = 0; n < i.length; n += 1) i[n] = this._trimAlignValue(i[n]);
                return i
            }
            return []
        },
        _trimAlignValue: function(t) {
            if (t <= this._valueMin()) return this._valueMin();
            if (t >= this._valueMax()) return this._valueMax();
            var e = this.options.step > 0 ? this.options.step: 1,
            i = (t - this._valueMin()) % e,
            n = t - i;
            return 2 * Math.abs(i) >= e && (n += i > 0 ? e: -e),
            parseFloat(n.toFixed(5))
        },
        _calculateNewMax: function() {
            var t = this.options.max,
            e = this._valueMin(),
            i = this.options.step,
            n = Math.floor( + (t - e).toFixed(this._precision()) / i) * i;
            t = n + e,
            this.max = parseFloat(t.toFixed(this._precision()))
        },
        _precision: function() {
            var t = this._precisionOf(this.options.step);
            return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))),
            t
        },
        _precisionOf: function(t) {
            var e = t.toString(),
            i = e.indexOf(".");
            return - 1 === i ? 0 : e.length - i - 1
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.max
        },
        _refreshValue: function() {
            var e, i, n, s, o, a = this.options.range,
            r = this.options,
            l = this,
            h = this._animateOff ? !1 : r.animate,
            u = {};
            this.options.values && this.options.values.length ? this.handles.each(function(n) {
                i = (l.values(n) - l._valueMin()) / (l._valueMax() - l._valueMin()) * 100,
                u["horizontal" === l.orientation ? "left": "bottom"] = i + "%",
                t(this).stop(1, 1)[h ? "animate": "css"](u, r.animate),
                l.options.range === !0 && ("horizontal" === l.orientation ? (0 === n && l.range.stop(1, 1)[h ? "animate": "css"]({
                    left: i + "%"
                },
                r.animate), 1 === n && l.range[h ? "animate": "css"]({
                    width: i - e + "%"
                },
                {
                    queue: !1,
                    duration: r.animate
                })) : (0 === n && l.range.stop(1, 1)[h ? "animate": "css"]({
                    bottom: i + "%"
                },
                r.animate), 1 === n && l.range[h ? "animate": "css"]({
                    height: i - e + "%"
                },
                {
                    queue: !1,
                    duration: r.animate
                }))),
                e = i
            }) : (n = this.value(), s = this._valueMin(), o = this._valueMax(), i = o !== s ? (n - s) / (o - s) * 100 : 0, u["horizontal" === this.orientation ? "left": "bottom"] = i + "%", this.handle.stop(1, 1)[h ? "animate": "css"](u, r.animate), "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate": "css"]({
                width: i + "%"
            },
            r.animate), "max" === a && "horizontal" === this.orientation && this.range[h ? "animate": "css"]({
                width: 100 - i + "%"
            },
            {
                queue: !1,
                duration: r.animate
            }), "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate": "css"]({
                height: i + "%"
            },
            r.animate), "max" === a && "vertical" === this.orientation && this.range[h ? "animate": "css"]({
                height: 100 - i + "%"
            },
            {
                queue: !1,
                duration: r.animate
            }))
        },
        _handleEvents: {
            keydown: function(e) {
                var i, n, s, o, a = t(e.target).data("ui-slider-handle-index");
                switch (e.keyCode) {
                case t.ui.keyCode.HOME:
                case t.ui.keyCode.END:
                case t.ui.keyCode.PAGE_UP:
                case t.ui.keyCode.PAGE_DOWN:
                case t.ui.keyCode.UP:
                case t.ui.keyCode.RIGHT:
                case t.ui.keyCode.DOWN:
                case t.ui.keyCode.LEFT:
                    if (e.preventDefault(), !this._keySliding && (this._keySliding = !0, t(e.target).addClass("ui-state-active"), i = this._start(e, a), i === !1)) return
                }
                switch (o = this.options.step, n = s = this.options.values && this.options.values.length ? this.values(a) : this.value(), e.keyCode) {
                case t.ui.keyCode.HOME:
                    s = this._valueMin();
                    break;
                case t.ui.keyCode.END:
                    s = this._valueMax();
                    break;
                case t.ui.keyCode.PAGE_UP:
                    s = this._trimAlignValue(n + (this._valueMax() - this._valueMin()) / this.numPages);
                    break;
                case t.ui.keyCode.PAGE_DOWN:
                    s = this._trimAlignValue(n - (this._valueMax() - this._valueMin()) / this.numPages);
                    break;
                case t.ui.keyCode.UP:
                case t.ui.keyCode.RIGHT:
                    if (n === this._valueMax()) return;
                    s = this._trimAlignValue(n + o);
                    break;
                case t.ui.keyCode.DOWN:
                case t.ui.keyCode.LEFT:
                    if (n === this._valueMin()) return;
                    s = this._trimAlignValue(n - o)
                }
                this._slide(e, a, s)
            },
            keyup: function(e) {
                var i = t(e.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), t(e.target).removeClass("ui-state-active"))
            }
        }
    }),
    t.widget("ui.sortable", t.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _isOverAxis: function(t, e, i) {
            return t >= e && e + i > t
        },
        _isFloating: function(t) {
            return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"));

        },
        _create: function() {
            this.containerCache = {},
            this.element.addClass("ui-sortable"),
            this.refresh(),
            this.offset = this.element.offset(),
            this._mouseInit(),
            this._setHandleClassName(),
            this.ready = !0
        },
        _setOption: function(t, e) {
            this._super(t, e),
            "handle" === t && this._setHandleClassName()
        },
        _setHandleClassName: function() {
            this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"),
            t.each(this.items,
            function() { (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
            })
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"),
            this._mouseDestroy();
            for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
            return this
        },
        _mouseCapture: function(e, i) {
            var n = null,
            s = !1,
            o = this;
            return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function() {
                return t.data(this, o.widgetName + "-item") === o ? (n = t(this), !1) : void 0
            }), t.data(e.target, o.widgetName + "-item") === o && (n = t(e.target)), n && (!this.options.handle || i || (t(this.options.handle, n).find("*").addBack().each(function() {
                this === e.target && (s = !0)
            }), s)) ? (this.currentItem = n, this._removeCurrentsFromItems(), !0) : !1)
        },
        _mouseStart: function(e, i, n) {
            var s, o, a = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            },
            t.extend(this.offset, {
                click: {
                    left: e.pageX - this.offset.left,
                    top: e.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            },
            this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", a.cursor), this.storedStylesheet = t("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(o)), a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !n) for (s = this.containers.length - 1; s >= 0; s--) this.containers[s]._trigger("activate", e, this._uiHash(this));
            return t.ui.ddmanager && (t.ui.ddmanager.current = this),
            t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e),
            this.dragging = !0,
            this.helper.addClass("ui-sortable-helper"),
            this._mouseDrag(e),
            !0
        },
        _mouseDrag: function(e) {
            var i, n, s, o, a = this.options,
            r = !1;
            for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + a.scrollSpeed: e.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - a.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + a.scrollSpeed: e.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (e.pageY - this.document.scrollTop() < a.scrollSensitivity ? r = this.document.scrollTop(this.document.scrollTop() - a.scrollSpeed) : this.window.height() - (e.pageY - this.document.scrollTop()) < a.scrollSensitivity && (r = this.document.scrollTop(this.document.scrollTop() + a.scrollSpeed)), e.pageX - this.document.scrollLeft() < a.scrollSensitivity ? r = this.document.scrollLeft(this.document.scrollLeft() - a.scrollSpeed) : this.window.width() - (e.pageX - this.document.scrollLeft()) < a.scrollSensitivity && (r = this.document.scrollLeft(this.document.scrollLeft() + a.scrollSpeed))), r !== !1 && t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--) if (n = this.items[i], s = n.item[0], o = this._intersectsWithPointer(n), o && n.instance === this.currentContainer && s !== this.currentItem[0] && this.placeholder[1 === o ? "next": "prev"]()[0] !== s && !t.contains(this.placeholder[0], s) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], s) : !0)) {
                if (this.direction = 1 === o ? "down": "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(n)) break;
                this._rearrange(e, n),
                this._trigger("change", e, this._uiHash());
                break
            }
            return this._contactContainers(e),
            t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
            this._trigger("sort", e, this._uiHash()),
            this.lastPositionAbs = this.positionAbs,
            !1
        },
        _mouseStop: function(e, i) {
            if (e) {
                if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                    var n = this,
                    s = this.placeholder.offset(),
                    o = this.options.axis,
                    a = {};
                    o && "x" !== o || (a.left = s.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)),
                    o && "y" !== o || (a.top = s.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)),
                    this.reverting = !0,
                    t(this.helper).animate(a, parseInt(this.options.revert, 10) || 500,
                    function() {
                        n._clear(e)
                    })
                } else this._clear(e, i);
                return ! 1
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                }),
                "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)),
                this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)),
            this
        },
        serialize: function(e) {
            var i = this._getItemsAsjQuery(e && e.connected),
            n = [];
            return e = e || {},
            t(i).each(function() {
                var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                i && n.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
            }),
            !n.length && e.key && n.push(e.key + "="),
            n.join("&")
        },
        toArray: function(e) {
            var i = this._getItemsAsjQuery(e && e.connected),
            n = [];
            return e = e || {},
            i.each(function() {
                n.push(t(e.item || this).attr(e.attribute || "id") || "")
            }),
            n
        },
        _intersectsWith: function(t) {
            var e = this.positionAbs.left,
            i = e + this.helperProportions.width,
            n = this.positionAbs.top,
            s = n + this.helperProportions.height,
            o = t.left,
            a = o + t.width,
            r = t.top,
            l = r + t.height,
            h = this.offset.click.top,
            u = this.offset.click.left,
            c = "x" === this.options.axis || n + h > r && l > n + h,
            d = "y" === this.options.axis || e + u > o && a > e + u,
            p = c && d;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width": "height"] > t[this.floating ? "width": "height"] ? p: o < e + this.helperProportions.width / 2 && i - this.helperProportions.width / 2 < a && r < n + this.helperProportions.height / 2 && s - this.helperProportions.height / 2 < l
        },
        _intersectsWithPointer: function(t) {
            var e = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
            i = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width),
            n = e && i,
            s = this._getDragVerticalDirection(),
            o = this._getDragHorizontalDirection();
            return n ? this.floating ? o && "right" === o || "down" === s ? 2 : 1 : s && ("down" === s ? 2 : 1) : !1
        },
        _intersectsWithSides: function(t) {
            var e = this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
            i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
            n = this._getDragVerticalDirection(),
            s = this._getDragHorizontalDirection();
            return this.floating && s ? "right" === s && i || "left" === s && !i: n && ("down" === n && e || "up" === n && !e)
        },
        _getDragVerticalDirection: function() {
            var t = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== t && (t > 0 ? "down": "up")
        },
        _getDragHorizontalDirection: function() {
            var t = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== t && (t > 0 ? "right": "left")
        },
        refresh: function(t) {
            return this._refreshItems(t),
            this._setHandleClassName(),
            this.refreshPositions(),
            this
        },
        _connectWith: function() {
            var t = this.options;
            return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
        },
        _getItemsAsjQuery: function(e) {
            function i() {
                r.push(this)
            }
            var n, s, o, a, r = [],
            l = [],
            h = this._connectWith();
            if (h && e) for (n = h.length - 1; n >= 0; n--) for (o = t(h[n], this.document[0]), s = o.length - 1; s >= 0; s--) a = t.data(o[s], this.widgetFullName),
            a && a !== this && !a.options.disabled && l.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a]);
            for (l.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), n = l.length - 1; n >= 0; n--) l[n][0].each(i);
            return t(r)
        },
        _removeCurrentsFromItems: function() {
            var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = t.grep(this.items,
            function(t) {
                for (var i = 0; i < e.length; i++) if (e[i] === t.item[0]) return ! 1;
                return ! 0
            })
        },
        _refreshItems: function(e) {
            this.items = [],
            this.containers = [this];
            var i, n, s, o, a, r, l, h, u = this.items,
            c = [[t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                item: this.currentItem
            }) : t(this.options.items, this.element), this]],
            d = this._connectWith();
            if (d && this.ready) for (i = d.length - 1; i >= 0; i--) for (s = t(d[i], this.document[0]), n = s.length - 1; n >= 0; n--) o = t.data(s[n], this.widgetFullName),
            o && o !== this && !o.options.disabled && (c.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, {
                item: this.currentItem
            }) : t(o.options.items, o.element), o]), this.containers.push(o));
            for (i = c.length - 1; i >= 0; i--) for (a = c[i][1], r = c[i][0], n = 0, h = r.length; h > n; n++) l = t(r[n]),
            l.data(this.widgetName + "-item", a),
            u.push({
                item: l,
                instance: a,
                width: 0,
                height: 0,
                left: 0,
                top: 0
            })
        },
        refreshPositions: function(e) {
            this.floating = this.items.length ? "x" === this.options.axis || this._isFloating(this.items[0].item) : !1,
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var i, n, s, o;
            for (i = this.items.length - 1; i >= 0; i--) n = this.items[i],
            n.instance !== this.currentContainer && this.currentContainer && n.item[0] !== this.currentItem[0] || (s = this.options.toleranceElement ? t(this.options.toleranceElement, n.item) : n.item, e || (n.width = s.outerWidth(), n.height = s.outerHeight()), o = s.offset(), n.left = o.left, n.top = o.top);
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else for (i = this.containers.length - 1; i >= 0; i--) o = this.containers[i].element.offset(),
            this.containers[i].containerCache.left = o.left,
            this.containers[i].containerCache.top = o.top,
            this.containers[i].containerCache.width = this.containers[i].element.outerWidth(),
            this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
            return this
        },
        _createPlaceholder: function(e) {
            e = e || this;
            var i, n = e.options;
            n.placeholder && n.placeholder.constructor !== String || (i = n.placeholder, n.placeholder = {
                element: function() {
                    var n = e.currentItem[0].nodeName.toLowerCase(),
                    s = t("<" + n + ">", e.document[0]).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    return "tbody" === n ? e._createTrPlaceholder(e.currentItem.find("tr").eq(0), t("<tr>", e.document[0]).appendTo(s)) : "tr" === n ? e._createTrPlaceholder(e.currentItem, s) : "img" === n && s.attr("src", e.currentItem.attr("src")),
                    i || s.css("visibility", "hidden"),
                    s
                },
                update: function(t, s) { (!i || n.forcePlaceholderSize) && (s.height() || s.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), s.width() || s.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
                }
            }),
            e.placeholder = t(n.placeholder.element.call(e.element, e.currentItem)),
            e.currentItem.after(e.placeholder),
            n.placeholder.update(e, e.placeholder)
        },
        _createTrPlaceholder: function(e, i) {
            var n = this;
            e.children().each(function() {
                t("<td>&#160;</td>", n.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(i)
            })
        },
        _contactContainers: function(e) {
            var i, n, s, o, a, r, l, h, u, c, d = null,
            p = null;
            for (i = this.containers.length - 1; i >= 0; i--) if (!t.contains(this.currentItem[0], this.containers[i].element[0])) if (this._intersectsWith(this.containers[i].containerCache)) {
                if (d && t.contains(this.containers[i].element[0], d.element[0])) continue;
                d = this.containers[i],
                p = i
            } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", e, this._uiHash(this)), this.containers[i].containerCache.over = 0);
            if (d) if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1);
            else {
                for (s = 1e4, o = null, u = d.floating || this._isFloating(this.currentItem), a = u ? "left": "top", r = u ? "width": "height", c = u ? "clientX": "clientY", n = this.items.length - 1; n >= 0; n--) t.contains(this.containers[p].element[0], this.items[n].item[0]) && this.items[n].item[0] !== this.currentItem[0] && (l = this.items[n].item.offset()[a], h = !1, e[c] - l > this.items[n][r] / 2 && (h = !0), Math.abs(e[c] - l) < s && (s = Math.abs(e[c] - l), o = this.items[n], this.direction = h ? "up": "down"));
                if (!o && !this.options.dropOnEmpty) return;
                if (this.currentContainer === this.containers[p]) return void(this.currentContainer.containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash()), this.currentContainer.containerCache.over = 1));
                o ? this._rearrange(e, o, null, !0) : this._rearrange(e, null, this.containers[p].element, !0),
                this._trigger("change", e, this._uiHash()),
                this.containers[p]._trigger("change", e, this._uiHash(this)),
                this.currentContainer = this.containers[p],
                this.options.placeholder.update(this.currentContainer, this.placeholder),
                this.containers[p]._trigger("over", e, this._uiHash(this)),
                this.containers[p].containerCache.over = 1
            }
        },
        _createHelper: function(e) {
            var i = this.options,
            n = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
            return n.parents("body").length || t("parent" !== i.appendTo ? i.appendTo: this.currentItem[0].parentNode)[0].appendChild(n[0]),
            n[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }),
            (!n[0].style.width || i.forceHelperSize) && n.width(this.currentItem.width()),
            (!n[0].style.height || i.forceHelperSize) && n.height(this.currentItem.height()),
            n
        },
        _adjustOffsetFromHelper: function(e) {
            "string" == typeof e && (e = e.split(" ")),
            t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }),
            "left" in e && (this.offset.click.left = e.left + this.margins.left),
            "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left),
            "top" in e && (this.offset.click.top = e.top + this.margins.top),
            "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var e = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()),
            (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                top: 0,
                left: 0
            }),
            {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var t = this.currentItem.position();
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var e, i, n, s = this.options;
            "parent" === s.containment && (s.containment = this.helper[0].parentNode),
            ("document" === s.containment || "window" === s.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === s.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === s.containment ? this.document.width() : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]),
            /^(document|window|parent)$/.test(s.containment) || (e = t(s.containment)[0], i = t(s.containment).offset(), n = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (n ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (n ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function(e, i) {
            i || (i = this.position);
            var n = "absolute" === e ? 1 : -1,
            s = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent: this.offsetParent,
            o = /(html|body)/i.test(s[0].tagName);
            return {
                top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * n,
                left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * n
            }
        },
        _generatePosition: function(e) {
            var i, n, s = this.options,
            o = e.pageX,
            a = e.pageY,
            r = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent: this.offsetParent,
            l = /(html|body)/i.test(r[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()),
            this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), s.grid && (i = this.originalPageY + Math.round((a - this.originalPageY) / s.grid[1]) * s.grid[1], a = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i: i - this.offset.click.top >= this.containment[1] ? i - s.grid[1] : i + s.grid[1] : i, n = this.originalPageX + Math.round((o - this.originalPageX) / s.grid[0]) * s.grid[0], o = this.containment ? n - this.offset.click.left >= this.containment[0] && n - this.offset.click.left <= this.containment[2] ? n: n - this.offset.click.left >= this.containment[0] ? n - s.grid[0] : n + s.grid[0] : n)),
            {
                top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : r.scrollTop()),
                left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : r.scrollLeft())
            }
        },
        _rearrange: function(t, e, i, n) {
            i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling),
            this.counter = this.counter ? ++this.counter: 1;
            var s = this.counter;
            this._delay(function() {
                s === this.counter && this.refreshPositions(!n)
            })
        },
        _clear: function(t, e) {
            function i(t, e, i) {
                return function(n) {
                    i._trigger(t, n, e._uiHash(e))
                }
            }
            this.reverting = !1;
            var n, s = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (n in this._storedCSS)("auto" === this._storedCSS[n] || "static" === this._storedCSS[n]) && (this._storedCSS[n] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            for (this.fromOutside && !e && s.push(function(t) {
                this._trigger("receive", t, this._uiHash(this.fromOutside))
            }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || s.push(function(t) {
                this._trigger("update", t, this._uiHash())
            }), this !== this.currentContainer && (e || (s.push(function(t) {
                this._trigger("remove", t, this._uiHash())
            }), s.push(function(t) {
                return function(e) {
                    t._trigger("receive", e, this._uiHash(this))
                }
            }.call(this, this.currentContainer)), s.push(function(t) {
                return function(e) {
                    t._trigger("update", e, this._uiHash(this))
                }
            }.call(this, this.currentContainer)))), n = this.containers.length - 1; n >= 0; n--) e || s.push(i("deactivate", this, this.containers[n])),
            this.containers[n].containerCache.over && (s.push(i("out", this, this.containers[n])), this.containers[n].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "": this._storedZIndex), this.dragging = !1, e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !e) {
                for (n = 0; n < s.length; n++) s[n].call(this, t);
                this._trigger("stop", t, this._uiHash())
            }
            return this.fromOutside = !1,
            !this.cancelHelperRemoval
        },
        _trigger: function() {
            t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function(e) {
            var i = e || this;
            return {
                helper: i.helper,
                placeholder: i.placeholder || t([]),
                position: i.position,
                originalPosition: i.originalPosition,
                offset: i.positionAbs,
                item: i.currentItem,
                sender: e ? e.element: null
            }
        }
    }),
    t.widget("ui.spinner", {
        version: "1.11.4",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            culture: null,
            icons: {
                down: "ui-icon-triangle-1-s",
                up: "ui-icon-triangle-1-n"
            },
            incremental: !0,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._setOption("max", this.options.max),
            this._setOption("min", this.options.min),
            this._setOption("step", this.options.step),
            "" !== this.value() && this._value(this.element.val(), !0),
            this._draw(),
            this._on(this._events),
            this._refresh(),
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _getCreateOptions: function() {
            var e = {},
            i = this.element;
            return t.each(["min", "max", "step"],
            function(t, n) {
                var s = i.attr(n);
                void 0 !== s && s.length && (e[n] = s)
            }),
            e
        },
        _events: {
            keydown: function(t) {
                this._start(t) && this._keydown(t) && t.preventDefault()
            },
            keyup: "_stop",
            focus: function() {
                this.previous = this.element.val()
            },
            blur: function(t) {
                return this.cancelBlur ? void delete this.cancelBlur: (this._stop(), this._refresh(), void(this.previous !== this.element.val() && this._trigger("change", t)))
            },
            mousewheel: function(t, e) {
                if (e) {
                    if (!this.spinning && !this._start(t)) return ! 1;
                    this._spin((e > 0 ? 1 : -1) * this.options.step, t),
                    clearTimeout(this.mousewheelTimer),
                    this.mousewheelTimer = this._delay(function() {
                        this.spinning && this._stop(t)
                    },
                    100),
                    t.preventDefault()
                }
            },
            "mousedown .ui-spinner-button": function(e) {
                function i() {
                    var t = this.element[0] === this.document[0].activeElement;
                    t || (this.element.focus(), this.previous = n, this._delay(function() {
                        this.previous = n
                    }))
                }
                var n;
                n = this.element[0] === this.document[0].activeElement ? this.previous: this.element.val(),
                e.preventDefault(),
                i.call(this),
                this.cancelBlur = !0,
                this._delay(function() {
                    delete this.cancelBlur,
                    i.call(this)
                }),
                this._start(e) !== !1 && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e)
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function(e) {
                return t(e.currentTarget).hasClass("ui-state-active") ? this._start(e) === !1 ? !1 : void this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e) : void 0
            },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _draw: function() {
            var t = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton"),
            this.buttons = t.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"),
            this.buttons.height() > Math.ceil(.5 * t.height()) && t.height() > 0 && t.height(t.height()),
            this.options.disabled && this.disable()
        },
        _keydown: function(e) {
            var i = this.options,
            n = t.ui.keyCode;
            switch (e.keyCode) {
            case n.UP:
                return this._repeat(null, 1, e),
                !0;
            case n.DOWN:
                return this._repeat(null, -1, e),
                !0;
            case n.PAGE_UP:
                return this._repeat(null, i.page, e),
                !0;
            case n.PAGE_DOWN:
                return this._repeat(null, -i.page, e),
                !0
            }
            return ! 1
        },
        _uiSpinnerHtml: function() {
            return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
        },
        _buttonHtml: function() {
            return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>"
        },
        _start: function(t) {
            return this.spinning || this._trigger("start", t) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
        },
        _repeat: function(t, e, i) {
            t = t || 500,
            clearTimeout(this.timer),
            this.timer = this._delay(function() {
                this._repeat(40, e, i)
            },
            t),
            this._spin(e * this.options.step, i)
        },
        _spin: function(t, e) {
            var i = this.value() || 0;
            this.counter || (this.counter = 1),
            i = this._adjustValue(i + t * this._increment(this.counter)),
            this.spinning && this._trigger("spin", e, {
                value: i
            }) === !1 || (this._value(i), this.counter++)
        },
        _increment: function(e) {
            var i = this.options.incremental;
            return i ? t.isFunction(i) ? i(e) : Math.floor(e * e * e / 5e4 - e * e / 500 + 17 * e / 200 + 1) : 1
        },
        _precision: function() {
            var t = this._precisionOf(this.options.step);
            return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))),
            t
        },
        _precisionOf: function(t) {
            var e = t.toString(),
            i = e.indexOf(".");
            return - 1 === i ? 0 : e.length - i - 1
        },
        _adjustValue: function(t) {
            var e, i, n = this.options;
            return e = null !== n.min ? n.min: 0,
            i = t - e,
            i = Math.round(i / n.step) * n.step,
            t = e + i,
            t = parseFloat(t.toFixed(this._precision())),
            null !== n.max && t > n.max ? n.max: null !== n.min && t < n.min ? n.min: t
        },
        _stop: function(t) {
            this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", t))
        },
        _setOption: function(t, e) {
            if ("culture" === t || "numberFormat" === t) {
                var i = this._parse(this.element.val());
                return this.options[t] = e,
                void this.element.val(this._format(i))
            } ("max" === t || "min" === t || "step" === t) && "string" == typeof e && (e = this._parse(e)),
            "icons" === t && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(e.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(e.down)),
            this._super(t, e),
            "disabled" === t && (this.widget().toggleClass("ui-state-disabled", !!e), this.element.prop("disabled", !!e), this.buttons.button(e ? "disable": "enable"))
        },
        _setOptions: l(function(t) {
            this._super(t)
        }),
        _parse: function(t) {
            return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t),
            "" === t || isNaN(t) ? null: t
        },
        _format: function(t) {
            return "" === t ? "": window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t
        },
        _refresh: function() {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            })
        },
        isValid: function() {
            var t = this.value();
            return null === t ? !1 : t === this._adjustValue(t)
        },
        _value: function(t, e) {
            var i;
            "" !== t && (i = this._parse(t), null !== i && (e || (i = this._adjustValue(i)), t = this._format(i))),
            this.element.val(t),
            this._refresh()
        },
        _destroy: function() {
            this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),
            this.uiSpinner.replaceWith(this.element)
        },
        stepUp: l(function(t) {
            this._stepUp(t)
        }),
        _stepUp: function(t) {
            this._start() && (this._spin((t || 1) * this.options.step), this._stop())
        },
        stepDown: l(function(t) {
            this._stepDown(t)
        }),
        _stepDown: function(t) {
            this._start() && (this._spin((t || 1) * -this.options.step), this._stop())
        },
        pageUp: l(function(t) {
            this._stepUp((t || 1) * this.options.page)
        }),
        pageDown: l(function(t) {
            this._stepDown((t || 1) * this.options.page)
        }),
        value: function(t) {
            return arguments.length ? void l(this._value).call(this, t) : this._parse(this.element.val())
        },
        widget: function() {
            return this.uiSpinner
        }
    }),
    t.widget("ui.tabs", {
        version: "1.11.4",
        delay: 300,
        options: {
            active: null,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _isLocal: function() {
            var t = /#.*$/;
            return function(e) {
                var i, n;
                e = e.cloneNode(!1),
                i = e.href.replace(t, ""),
                n = location.href.replace(t, "");
                try {
                    i = decodeURIComponent(i)
                } catch(s) {}
                try {
                    n = decodeURIComponent(n)
                } catch(s) {}
                return e.hash.length > 1 && i === n
            }
        } (),
        _create: function() {
            var e = this,
            i = this.options;
            this.running = !1,
            this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible),
            this._processTabs(),
            i.active = this._initialActive(),
            t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"),
            function(t) {
                return e.tabs.index(t)
            }))).sort()),
            this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(i.active) : t(),
            this._refresh(),
            this.active.length && this.load(i.active)
        },
        _initialActive: function() {
            var e = this.options.active,
            i = this.options.collapsible,
            n = location.hash.substring(1);
            return null === e && (n && this.tabs.each(function(i, s) {
                return t(s).attr("aria-controls") === n ? (e = i, !1) : void 0
            }), null === e && (e = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === e || -1 === e) && (e = this.tabs.length ? 0 : !1)),
            e !== !1 && (e = this.tabs.index(this.tabs.eq(e)), -1 === e && (e = i ? !1 : 0)),
            !i && e === !1 && this.anchors.length && (e = 0),
            e
        },
        _getCreateEventData: function() {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : t()
            }
        },
        _tabKeydown: function(e) {
            var i = t(this.document[0].activeElement).closest("li"),
            n = this.tabs.index(i),
            s = !0;
            if (!this._handlePageNav(e)) {
                switch (e.keyCode) {
                case t.ui.keyCode.RIGHT:
                case t.ui.keyCode.DOWN:
                    n++;
                    break;
                case t.ui.keyCode.UP:
                case t.ui.keyCode.LEFT:
                    s = !1,
                    n--;
                    break;
                case t.ui.keyCode.END:
                    n = this.anchors.length - 1;
                    break;
                case t.ui.keyCode.HOME:
                    n = 0;
                    break;
                case t.ui.keyCode.SPACE:
                    return e.preventDefault(),
                    clearTimeout(this.activating),
                    void this._activate(n);
                case t.ui.keyCode.ENTER:
                    return e.preventDefault(),
                    clearTimeout(this.activating),
                    void this._activate(n === this.options.active ? !1 : n);
                default:
                    return
                }
                e.preventDefault(),
                clearTimeout(this.activating),
                n = this._focusNextTab(n, s),
                e.ctrlKey || e.metaKey || (i.attr("aria-selected", "false"), this.tabs.eq(n).attr("aria-selected", "true"), this.activating = this._delay(function() {
                    this.option("active", n)
                },
                this.delay))
            }
        },
        _panelKeydown: function(e) {
            this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.focus())
        },
        _handlePageNav: function(e) {
            return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
        },
        _findNextTab: function(e, i) {
            function n() {
                return e > s && (e = 0),
                0 > e && (e = s),
                e
            }
            for (var s = this.tabs.length - 1; - 1 !== t.inArray(n(), this.options.disabled);) e = i ? e + 1 : e - 1;
            return e
        },
        _focusNextTab: function(t, e) {
            return t = this._findNextTab(t, e),
            this.tabs.eq(t).focus(),
            t
        },
        _setOption: function(t, e) {
            return "active" === t ? void this._activate(e) : "disabled" === t ? void this._setupDisabled(e) : (this._super(t, e), "collapsible" === t && (this.element.toggleClass("ui-tabs-collapsible", e), e || this.options.active !== !1 || this._activate(0)), "event" === t && this._setupEvents(e), void("heightStyle" === t && this._setupHeightStyle(e)))
        },
        _sanitizeSelector: function(t) {
            return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function() {
            var e = this.options,
            i = this.tablist.children(":has(a[href])");
            e.disabled = t.map(i.filter(".ui-state-disabled"),
            function(t) {
                return i.index(t)
            }),
            this._processTabs(),
            e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()),
            this._refresh()
        },
        _refresh: function() {
            this._setupDisabled(this.options.disabled),
            this._setupEvents(this.options.event),
            this._setupHeightStyle(this.options.heightStyle),
            this.tabs.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }),
            this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-hidden": "true"
            }),
            this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }), this._getPanelForTab(this.active).show().attr({
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function() {
            var e = this,
            i = this.tabs,
            n = this.anchors,
            s = this.panels;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace,
            function(e) {
                t(this).is(".ui-state-disabled") && e.preventDefault()
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace,
            function() {
                t(this).closest("li").is(".ui-state-disabled") && this.blur()
            }),
            this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            }),
            this.anchors = this.tabs.map(function() {
                return t("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            }),
            this.panels = t(),
            this.anchors.each(function(i, n) {
                var s, o, a, r = t(n).uniqueId().attr("id"),
                l = t(n).closest("li"),
                h = l.attr("aria-controls");
                e._isLocal(n) ? (s = n.hash, a = s.substring(1), o = e.element.find(e._sanitizeSelector(s))) : (a = l.attr("aria-controls") || t({}).uniqueId()[0].id, s = "#" + a, o = e.element.find(s), o.length || (o = e._createPanel(a), o.insertAfter(e.panels[i - 1] || e.tablist)), o.attr("aria-live", "polite")),
                o.length && (e.panels = e.panels.add(o)),
                h && l.data("ui-tabs-aria-controls", h),
                l.attr({
                    "aria-controls": a,
                    "aria-labelledby": r
                }),
                o.attr("aria-labelledby", r)
            }),
            this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel"),
            i && (this._off(i.not(this.tabs)), this._off(n.not(this.anchors)), this._off(s.not(this.panels)))
        },
        _getList: function() {
            return this.tablist || this.element.find("ol,ul").eq(0)
        },
        _createPanel: function(e) {
            return t("<div>").attr("id", e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        },
        _setupDisabled: function(e) {
            t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1);
            for (var i, n = 0; i = this.tabs[n]; n++) e === !0 || -1 !== t.inArray(n, e) ? t(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
            this.options.disabled = e
        },
        _setupEvents: function(e) {
            var i = {};
            e && t.each(e.split(" "),
            function(t, e) {
                i[e] = "_eventHandler"
            }),
            this._off(this.anchors.add(this.tabs).add(this.panels)),
            this._on(!0, this.anchors, {
                click: function(t) {
                    t.preventDefault()
                }
            }),
            this._on(this.anchors, i),
            this._on(this.tabs, {
                keydown: "_tabKeydown"
            }),
            this._on(this.panels, {
                keydown: "_panelKeydown"
            }),
            this._focusable(this.tabs),
            this._hoverable(this.tabs)
        },
        _setupHeightStyle: function(e) {
            var i, n = this.element.parent();
            "fill" === e ? (i = n.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                var e = t(this),
                n = e.css("position");
                "absolute" !== n && "fixed" !== n && (i -= e.outerHeight(!0))
            }), this.element.children().not(this.panels).each(function() {
                i -= t(this).outerHeight(!0)
            }), this.panels.each(function() {
                t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
            }).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function() {
                i = Math.max(i, t(this).height("").height())
            }).height(i))
        },
        _eventHandler: function(e) {
            var i = this.options,
            n = this.active,
            s = t(e.currentTarget),
            o = s.closest("li"),
            a = o[0] === n[0],
            r = a && i.collapsible,
            l = r ? t() : this._getPanelForTab(o),
            h = n.length ? this._getPanelForTab(n) : t(),
            u = {
                oldTab: n,
                oldPanel: h,
                newTab: r ? t() : o,
                newPanel: l
            };
            e.preventDefault(),
            o.hasClass("ui-state-disabled") || o.hasClass("ui-tabs-loading") || this.running || a && !i.collapsible || this._trigger("beforeActivate", e, u) === !1 || (i.active = r ? !1 : this.tabs.index(o), this.active = a ? t() : o, this.xhr && this.xhr.abort(), h.length || l.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), l.length && this.load(this.tabs.index(o), e), this._toggle(e, u))
        },
        _toggle: function(e, i) {
            function n() {
                o.running = !1,
                o._trigger("activate", e, i)
            }
            function s() {
                i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),
                a.length && o.options.show ? o._show(a, o.options.show, n) : (a.show(), n())
            }
            var o = this,
            a = i.newPanel,
            r = i.oldPanel;
            this.running = !0,
            r.length && this.options.hide ? this._hide(r, this.options.hide,
            function() {
                i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),
                s()
            }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), r.hide(), s()),
            r.attr("aria-hidden", "true"),
            i.oldTab.attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            }),
            a.length && r.length ? i.oldTab.attr("tabIndex", -1) : a.length && this.tabs.filter(function() {
                return 0 === t(this).attr("tabIndex")
            }).attr("tabIndex", -1),
            a.attr("aria-hidden", "false"),
            i.newTab.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            })
        },
        _activate: function(e) {
            var i, n = this._findActive(e);
            n[0] !== this.active[0] && (n.length || (n = this.active), i = n.find(".ui-tabs-anchor")[0], this._eventHandler({
                target: i,
                currentTarget: i,
                preventDefault: t.noop
            }))
        },
        _findActive: function(e) {
            return e === !1 ? t() : this.tabs.eq(e)
        },
        _getIndex: function(t) {
            return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))),
            t
        },
        _destroy: function() {
            this.xhr && this.xhr.abort(),
            this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),
            this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),
            this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),
            this.tablist.unbind(this.eventNamespace),
            this.tabs.add(this.panels).each(function() {
                t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
            }),
            this.tabs.each(function() {
                var e = t(this),
                i = e.data("ui-tabs-aria-controls");
                i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls")
            }),
            this.panels.show(),
            "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function(e) {
            var i = this.options.disabled;
            i !== !1 && (void 0 === e ? i = !1 : (e = this._getIndex(e), i = t.isArray(i) ? t.map(i,
            function(t) {
                return t !== e ? t: null
            }) : t.map(this.tabs,
            function(t, i) {
                return i !== e ? i: null
            })), this._setupDisabled(i))
        },
        disable: function(e) {
            var i = this.options.disabled;
            if (i !== !0) {
                if (void 0 === e) i = !0;
                else {
                    if (e = this._getIndex(e), -1 !== t.inArray(e, i)) return;
                    i = t.isArray(i) ? t.merge([e], i).sort() : [e]
                }
                this._setupDisabled(i)
            }
        },
        load: function(e, i) {
            e = this._getIndex(e);
            var n = this,
            s = this.tabs.eq(e),
            o = s.find(".ui-tabs-anchor"),
            a = this._getPanelForTab(s),
            r = {
                tab: s,
                panel: a
            },
            l = function(t, e) {
                "abort" === e && n.panels.stop(!1, !0),
                s.removeClass("ui-tabs-loading"),
                a.removeAttr("aria-busy"),
                t === n.xhr && delete n.xhr
            };
            this._isLocal(o[0]) || (this.xhr = t.ajax(this._ajaxSettings(o, i, r)), this.xhr && "canceled" !== this.xhr.statusText && (s.addClass("ui-tabs-loading"), a.attr("aria-busy", "true"), this.xhr.done(function(t, e, s) {
                setTimeout(function() {
                    a.html(t),
                    n._trigger("load", i, r),
                    l(s, e)
                },
                1)
            }).fail(function(t, e) {
                setTimeout(function() {
                    l(t, e)
                },
                1)
            })))
        },
        _ajaxSettings: function(e, i, n) {
            var s = this;
            return {
                url: e.attr("href"),
                beforeSend: function(e, o) {
                    return s._trigger("beforeLoad", i, t.extend({
                        jqXHR: e,
                        ajaxSettings: o
                    },
                    n))
                }
            }
        },
        _getPanelForTab: function(e) {
            var i = t(e).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + i))
        }
    }),
    t.widget("ui.tooltip", {
        version: "1.11.4",
        options: {
            content: function() {
                var e = t(this).attr("title") || "";
                return t("<a>").text(e).html()
            },
            hide: !0,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: !0,
            tooltipClass: null,
            track: !1,
            close: null,
            open: null
        },
        _addDescribedBy: function(e, i) {
            var n = (e.attr("aria-describedby") || "").split(/\s+/);
            n.push(i),
            e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(n.join(" ")))
        },
        _removeDescribedBy: function(e) {
            var i = e.data("ui-tooltip-id"),
            n = (e.attr("aria-describedby") || "").split(/\s+/),
            s = t.inArray(i, n); - 1 !== s && n.splice(s, 1),
            e.removeData("ui-tooltip-id"),
            n = t.trim(n.join(" ")),
            n ? e.attr("aria-describedby", n) : e.removeAttr("aria-describedby")
        },
        _create: function() {
            this._on({
                mouseover: "open",
                focusin: "open"
            }),
            this.tooltips = {},
            this.parents = {},
            this.options.disabled && this._disable(),
            this.liveRegion = t("<div>").attr({
                role: "log",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)
        },
        _setOption: function(e, i) {
            var n = this;
            return "disabled" === e ? (this[i ? "_disable": "_enable"](), void(this.options[e] = i)) : (this._super(e, i), void("content" === e && t.each(this.tooltips,
            function(t, e) {
                n._updateContent(e.element)
            })))
        },
        _disable: function() {
            var e = this;
            t.each(this.tooltips,
            function(i, n) {
                var s = t.Event("blur");
                s.target = s.currentTarget = n.element[0],
                e.close(s, !0)
            }),
            this.element.find(this.options.items).addBack().each(function() {
                var e = t(this);
                e.is("[title]") && e.data("ui-tooltip-title", e.attr("title")).removeAttr("title")
            })
        },
        _enable: function() {
            this.element.find(this.options.items).addBack().each(function() {
                var e = t(this);
                e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"))
            })
        },
        open: function(e) {
            var i = this,
            n = t(e ? e.target: this.element).closest(this.options.items);
            n.length && !n.data("ui-tooltip-id") && (n.attr("title") && n.data("ui-tooltip-title", n.attr("title")), n.data("ui-tooltip-open", !0), e && "mouseover" === e.type && n.parents().each(function() {
                var e, n = t(this);
                n.data("ui-tooltip-open") && (e = t.Event("blur"), e.target = e.currentTarget = this, i.close(e, !0)),
                n.attr("title") && (n.uniqueId(), i.parents[this.id] = {
                    element: this,
                    title: n.attr("title")
                },
                n.attr("title", ""))
            }), this._registerCloseHandlers(e, n), this._updateContent(n, e))
        },
        _updateContent: function(t, e) {
            var i, n = this.options.content,
            s = this,
            o = e ? e.type: null;
            return "string" == typeof n ? this._open(e, t, n) : (i = n.call(t[0],
            function(i) {
                s._delay(function() {
                    t.data("ui-tooltip-open") && (e && (e.type = o), this._open(e, t, i))
                })
            }), void(i && this._open(e, t, i)))
        },
        _open: function(e, i, n) {
            function s(t) {
                h.of = t,
                a.is(":hidden") || a.position(h)
            }
            var o, a, r, l, h = t.extend({},
            this.options.position);
            if (n) {
                if (o = this._find(i)) return void o.tooltip.find(".ui-tooltip-content").html(n);
                i.is("[title]") && (e && "mouseover" === e.type ? i.attr("title", "") : i.removeAttr("title")),
                o = this._tooltip(i),
                a = o.tooltip,
                this._addDescribedBy(i, a.attr("id")),
                a.find(".ui-tooltip-content").html(n),
                this.liveRegion.children().hide(),
                n.clone ? (l = n.clone(), l.removeAttr("id").find("[id]").removeAttr("id")) : l = n,
                t("<div>").html(l).appendTo(this.liveRegion),
                this.options.track && e && /^mouse/.test(e.type) ? (this._on(this.document, {
                    mousemove: s
                }), s(e)) : a.position(t.extend({
                    of: i
                },
                this.options.position)),
                a.hide(),
                this._show(a, this.options.show),
                this.options.show && this.options.show.delay && (r = this.delayedShow = setInterval(function() {
                    a.is(":visible") && (s(h.of), clearInterval(r))
                },
                t.fx.interval)),
                this._trigger("open", e, {
                    tooltip: a
                })
            }
        },
        _registerCloseHandlers: function(e, i) {
            var n = {
                keyup: function(e) {
                    if (e.keyCode === t.ui.keyCode.ESCAPE) {
                        var n = t.Event(e);
                        n.currentTarget = i[0],
                        this.close(n, !0)
                    }
                }
            };
            i[0] !== this.element[0] && (n.remove = function() {
                this._removeTooltip(this._find(i).tooltip)
            }),
            e && "mouseover" !== e.type || (n.mouseleave = "close"),
            e && "focusin" !== e.type || (n.focusout = "close"),
            this._on(!0, i, n)
        },
        close: function(e) {
            var i, n = this,
            s = t(e ? e.currentTarget: this.element),
            o = this._find(s);
            return o ? (i = o.tooltip, void(o.closing || (clearInterval(this.delayedShow), s.data("ui-tooltip-title") && !s.attr("title") && s.attr("title", s.data("ui-tooltip-title")), this._removeDescribedBy(s), o.hiding = !0, i.stop(!0), this._hide(i, this.options.hide,
            function() {
                n._removeTooltip(t(this))
            }), s.removeData("ui-tooltip-open"), this._off(s, "mouseleave focusout keyup"), s[0] !== this.element[0] && this._off(s, "remove"), this._off(this.document, "mousemove"), e && "mouseleave" === e.type && t.each(this.parents,
            function(e, i) {
                t(i.element).attr("title", i.title),
                delete n.parents[e]
            }), o.closing = !0, this._trigger("close", e, {
                tooltip: i
            }), o.hiding || (o.closing = !1)))) : void s.removeData("ui-tooltip-open")
        },
        _tooltip: function(e) {
            var i = t("<div>").attr("role", "tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")),
            n = i.uniqueId().attr("id");
            return t("<div>").addClass("ui-tooltip-content").appendTo(i),
            i.appendTo(this.document[0].body),
            this.tooltips[n] = {
                element: e,
                tooltip: i
            }
        },
        _find: function(t) {
            var e = t.data("ui-tooltip-id");
            return e ? this.tooltips[e] : null
        },
        _removeTooltip: function(t) {
            t.remove(),
            delete this.tooltips[t.attr("id")]
        },
        _destroy: function() {
            var e = this;
            t.each(this.tooltips,
            function(i, n) {
                var s = t.Event("blur"),
                o = n.element;
                s.target = s.currentTarget = o[0],
                e.close(s, !0),
                t("#" + i).remove(),
                o.data("ui-tooltip-title") && (o.attr("title") || o.attr("title", o.data("ui-tooltip-title")), o.removeData("ui-tooltip-title"))
            }),
            this.liveRegion.remove()
        }
    })
}),
function(t, e) {
    function i() {
        this._state = [],
        this._defaults = {
            classHolder: "sbHolder",
            classHolderDisabled: "sbHolderDisabled",
            classSelector: "sbSelector",
            classOptions: "sbOptions",
            classGroup: "sbGroup",
            classSub: "sbSub",
            classDisabled: "sbDisabled",
            classToggleOpen: "sbToggleOpen",
            classToggle: "sbToggle",
            classFocus: "sbFocus",
            speed: 200,
            effect: "slide",
            onChange: null,
            onOpen: null,
            onClose: null
        }
    }
    var n = "selectbox",
    s = !1,
    o = !0;
    t.extend(i.prototype, {
        _isOpenSelectbox: function(t) {
            if (!t) return s;
            var e = this._getInst(t);
            return e.isOpen
        },
        _isDisabledSelectbox: function(t) {
            if (!t) return s;
            var e = this._getInst(t);
            return e.isDisabled
        },
        _attachSelectbox: function(e, i) {
            function a() {
                var e, i, n = this.attr("id").split("_")[1];
                for (e in p._state) e !== n && p._state.hasOwnProperty(e) && (i = t("select[sb='" + e + "']")[0], i && p._closeSelectbox(i))
            }
            function r() {
                var i = arguments[1] && arguments[1].sub ? !0 : !1,
                n = arguments[1] && arguments[1].disabled ? !0 : !1;
                arguments[0].each(function(s) {
                    var a, r = t(this),
                    l = t("<li>");
                    r.is(":selected") && (h.text(r.text()), m = o),
                    s === v - 1 && l.addClass("last"),
                    r.is(":disabled") || n ? (a = t("<span>", {
                        text: r.text()
                    }).addClass(f.settings.classDisabled), i && a.addClass(f.settings.classSub), a.appendTo(l)) : (a = t("<a>", {
                        href: "#" + r.val(),
                        rel: r.val()
                    }).text(r.text()).bind("click.sb",
                    function(i) {
                        i && i.preventDefault && i.preventDefault(); {
                            var n = u,
                            s = t(this);
                            n.attr("id").split("_")[1]
                        }
                        p._changeSelectbox(e, s.attr("rel"), s.text()),
                        p._closeSelectbox(e)
                    }).bind("mouseover.sb",
                    function() {
                        var e = t(this);
                        e.parent().siblings().find("a").removeClass(f.settings.classFocus),
                        e.addClass(f.settings.classFocus)
                    }).bind("mouseout.sb",
                    function() {
                        t(this).removeClass(f.settings.classFocus)
                    }), i && a.addClass(f.settings.classSub), r.is(":selected") && a.addClass(f.settings.classFocus), a.appendTo(l)),
                    l.appendTo(c)
                })
            }
            if (this._getInst(e)) return s;
            var l, h, u, c, d = t(e),
            p = this,
            f = p._newInst(d),
            m = s,
            g = (d.find("optgroup"), d.find("option")),
            v = g.length;
            d.attr("sb", f.uid),
            t.extend(f.settings, p._defaults, i),
            p._state[f.uid] = s,
            d.hide(),
            l = t("<div>", {
                id: "sbHolder_" + f.uid,
                "class": f.settings.classHolder,
                tabindex: d.attr("tabindex")
            }),
            h = t("<a>", {
                id: "sbSelector_" + f.uid,
                href: "#",
                "class": f.settings.classSelector,
                click: function(i) {
                    i.preventDefault(),
                    a.apply(t(this), []);
                    var n = t(this).attr("id").split("_")[1];
                    p._state[n] ? p._closeSelectbox(e) : p._openSelectbox(e)
                }
            }),
            u = t("<a>", {
                id: "sbToggle_" + f.uid,
                href: "#",
                "class": f.settings.classToggle,
                click: function(i) {
                    i.preventDefault(),
                    a.apply(t(this), []);
                    var n = t(this).attr("id").split("_")[1];
                    p._state[n] ? p._closeSelectbox(e) : p._openSelectbox(e)
                }
            }),
            u.appendTo(l),
            c = t("<ul>", {
                id: "sbOptions_" + f.uid,
                "class": f.settings.classOptions,
                css: {
                    display: "none"
                }
            }),
            d.children().each(function(e) {
                var i, n = t(this),
                s = {};
                n.is("option") ? r(n) : n.is("optgroup") && (i = t("<li>"), t("<span>", {
                    text: n.attr("label")
                }).addClass(f.settings.classGroup).appendTo(i), i.appendTo(c), n.is(":disabled") && (s.disabled = !0), s.sub = !0, r(n.find("option"), s))
            }),
            m || h.text(g.first().text()),
            t.data(e, n, f),
            l.data("uid", f.uid).bind("keydown.sb",
            function(e) {
                var i = e.charCode ? e.charCode: e.keyCode ? e.keyCode: 0,
                s = t(this),
                o = s.data("uid"),
                a = s.siblings("select[sb='" + o + "']").data(n),
                r = s.siblings(["select[sb='", o, "']"].join("")).get(0),
                l = s.find("ul").find("a." + a.settings.classFocus);
                switch (i) {
                case 37:
                case 38:
                    if (l.length > 0) {
                        var h;
                        t("a", s).removeClass(a.settings.classFocus),
                        h = l.parent().prevAll("li:has(a)").eq(0).find("a"),
                        h.length > 0 && (h.addClass(a.settings.classFocus).focus(), t("#sbSelector_" + o).text(h.text()))
                    }
                    break;
                case 39:
                case 40:
                    var h;
                    t("a", s).removeClass(a.settings.classFocus),
                    h = l.length > 0 ? l.parent().nextAll("li:has(a)").eq(0).find("a") : s.find("ul").find("a").eq(0),
                    h.length > 0 && (h.addClass(a.settings.classFocus).focus(), t("#sbSelector_" + o).text(h.text()));
                    break;
                case 13:
                    l.length > 0 && p._changeSelectbox(r, l.attr("rel"), l.text()),
                    p._closeSelectbox(r);
                    break;
                case 9:
                    if (r) {
                        var a = p._getInst(r);
                        a && (l.length > 0 && p._changeSelectbox(r, l.attr("rel"), l.text()), p._closeSelectbox(r))
                    }
                    var u = parseInt(s.attr("tabindex"), 10);
                    e.shiftKey ? u--:u++,
                    t("*[tabindex='" + u + "']").focus();
                    break;
                case 27:
                    p._closeSelectbox(r)
                }
                return e.stopPropagation(),
                !1
            }).delegate("a", "mouseover",
            function(e) {
                t(this).addClass(f.settings.classFocus)
            }).delegate("a", "mouseout",
            function(e) {
                t(this).removeClass(f.settings.classFocus)
            }),
            h.appendTo(l),
            c.appendTo(l),
            l.insertAfter(d),
            t("html").on("mousedown",
            function(e) {
                e.stopPropagation(),
                t("select").selectbox("close")
            }),
            t([".", f.settings.classHolder, ", .", f.settings.classSelector].join("")).mousedown(function(t) {
                t.stopPropagation()
            })
        },
        _detachSelectbox: function(e) {
            var i = this._getInst(e);
            return i ? (t("#sbHolder_" + i.uid).remove(), t.data(e, n, null), void t(e).show()) : s
        },
        _changeSelectbox: function(e, i, n) {
            var s, a = this._getInst(e);
            a && (s = this._get(a, "onChange"), t("#sbSelector_" + a.uid).text(n)),
            i = i.replace(/\'/g, "\\'"),
            t(e).find("option[selected='selected']").removeAttr("selected"),
            t(e).find("option[value='" + i + "']").attr("selected", o),
            a && s ? s.apply(a.input ? a.input[0] : null, [i, a]) : a && a.input && a.input.trigger("change")
        },
        _enableSelectbox: function(e) {
            var i = this._getInst(e);
            return i && i.isDisabled ? (t("#sbHolder_" + i.uid).removeClass(i.settings.classHolderDisabled), i.isDisabled = s, void t.data(e, n, i)) : s
        },
        _disableSelectbox: function(e) {
            var i = this._getInst(e);
            return ! i || i.isDisabled ? s: (t("#sbHolder_" + i.uid).addClass(i.settings.classHolderDisabled), i.isDisabled = o, void t.data(e, n, i))
        },
        _optionSelectbox: function(e, i, o) {
            var a = this._getInst(e);
            return a ? (a[i] = o, void t.data(e, n, a)) : s
        },
        _openSelectbox: function(e) {
            var i = this._getInst(e);
            if (i && !i.isOpen && !i.isDisabled) {
                var s = t("#sbOptions_" + i.uid),
                a = parseInt(t(window).height(), 10),
                r = t("#sbHolder_" + i.uid).offset(),
                l = t(window).scrollTop(),
                h = s.prev().height(),
                u = a - (r.top - l) - h / 2,
                c = this._get(i, "onOpen");
                s.css({
                    top: h + "px",
                    maxHeight: u - h + "px"
                }),
                "fade" === i.settings.effect ? s.fadeIn(i.settings.speed) : s.slideDown(i.settings.speed),
                t("#sbToggle_" + i.uid).addClass(i.settings.classToggleOpen),
                this._state[i.uid] = o,
                i.isOpen = o,
                c && c.apply(i.input ? i.input[0] : null, [i]),
                t.data(e, n, i)
            }
        },
        _closeSelectbox: function(e) {
            var i = this._getInst(e);
            if (i && i.isOpen) {
                var o = this._get(i, "onClose");
                "fade" === i.settings.effect ? t("#sbOptions_" + i.uid).fadeOut(i.settings.speed) : t("#sbOptions_" + i.uid).slideUp(i.settings.speed),
                t("#sbToggle_" + i.uid).removeClass(i.settings.classToggleOpen),
                this._state[i.uid] = s,
                i.isOpen = s,
                o && o.apply(i.input ? i.input[0] : null, [i]),
                t.data(e, n, i)
            }
        },
        _newInst: function(t) {
            var e = t[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
            return {
                id: e,
                input: t,
                uid: Math.floor(99999999 * Math.random()),
                isOpen: s,
                isDisabled: s,
                settings: {}
            }
        },
        _getInst: function(e) {
            try {
                return t.data(e, n)
            } catch(i) {
                throw "Missing instance data for this selectbox"
            }
        },
        _get: function(t, i) {
            return t.settings[i] !== e ? t.settings[i] : this._defaults[i]
        }
    }),
    t.fn.selectbox = function(e) {
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" == typeof e && "isDisabled" == e ? t.selectbox["_" + e + "Selectbox"].apply(t.selectbox, [this[0]].concat(i)) : "option" == e && 2 == arguments.length && "string" == typeof arguments[1] ? t.selectbox["_" + e + "Selectbox"].apply(t.selectbox, [this[0]].concat(i)) : this.each(function() {
            "string" == typeof e ? t.selectbox["_" + e + "Selectbox"].apply(t.selectbox, [this].concat(i)) : t.selectbox._attachSelectbox(this, e)
        })
    },
    t.selectbox = new i,
    t.selectbox.version = "0.2"
} (jQuery),
+
function(t) {
    "use strict";
    function e() {
        var t = document.createElement("bootstrap"),
        e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var i in e) if (void 0 !== t.style[i]) return {
            end: e[i]
        };
        return ! 1
    }
    t.fn.emulateTransitionEnd = function(e) {
        var i = !1,
        n = this;
        t(this).one("bsTransitionEnd",
        function() {
            i = !0
        });
        var s = function() {
            i || t(n).trigger(t.support.transition.end)
        };
        return setTimeout(s, e),
        this
    },
    t(function() {
        t.support.transition = e(),
        t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
} (jQuery),
+
function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var i = t(this),
            s = i.data("bs.alert");
            s || i.data("bs.alert", s = new n(this)),
            "string" == typeof e && s[e].call(i)
        })
    }
    var i = '[data-dismiss="alert"]',
    n = function(e) {
        t(e).on("click", i, this.close)
    };
    n.VERSION = "3.3.2",
    n.TRANSITION_DURATION = 150,
    n.prototype.close = function(e) {
        function i() {
            a.detach().trigger("closed.bs.alert").remove()
        }
        var s = t(this),
        o = s.attr("data-target");
        o || (o = s.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, ""));
        var a = t(o);
        e && e.preventDefault(),
        a.length || (a = s.closest(".alert")),
        a.trigger(e = t.Event("close.bs.alert")),
        e.isDefaultPrevented() || (a.removeClass("in"), t.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) : i())
    };
    var s = t.fn.alert;
    t.fn.alert = e,
    t.fn.alert.Constructor = n,
    t.fn.alert.noConflict = function() {
        return t.fn.alert = s,
        this
    },
    t(document).on("click.bs.alert.data-api", i, n.prototype.close)
} (jQuery),
+
function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var n = t(this),
            s = n.data("bs.button"),
            o = "object" == typeof e && e;
            s || n.data("bs.button", s = new i(this, o)),
            "toggle" == e ? s.toggle() : e && s.setState(e)
        })
    }
    var i = function(e, n) {
        this.$element = t(e),
        this.options = t.extend({},
        i.DEFAULTS, n),
        this.isLoading = !1
    };
    i.VERSION = "3.3.2",
    i.DEFAULTS = {
        loadingText: "loading..."
    },
    i.prototype.setState = function(e) {
        var i = "disabled",
        n = this.$element,
        s = n.is("input") ? "val": "html",
        o = n.data();
        e += "Text",
        null == o.resetText && n.data("resetText", n[s]()),
        setTimeout(t.proxy(function() {
            n[s](null == o[e] ? this.options[e] : o[e]),
            "loadingText" == e ? (this.isLoading = !0, n.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1, n.removeClass(i).removeAttr(i))
        },
        this), 0)
    },
    i.prototype.toggle = function() {
        var t = !0,
        e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") && (i.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")),
            t && i.prop("checked", !this.$element.hasClass("active")).trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        t && this.$element.toggleClass("active")
    };
    var n = t.fn.button;
    t.fn.button = e,
    t.fn.button.Constructor = i,
    t.fn.button.noConflict = function() {
        return t.fn.button = n,
        this
    },
    t(document).on("click.bs.button.data-api", '[data-toggle^="button"]',
    function(i) {
        var n = t(i.target);
        n.hasClass("btn") || (n = n.closest(".btn")),
        e.call(n, "toggle"),
        i.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]',
    function(e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
} (jQuery),
+
function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var n = t(this),
            s = n.data("bs.carousel"),
            o = t.extend({},
            i.DEFAULTS, n.data(), "object" == typeof e && e),
            a = "string" == typeof e ? e: o.slide;
            s || n.data("bs.carousel", s = new i(this, o)),
            "number" == typeof e ? s.to(e) : a ? s[a]() : o.interval && s.pause().cycle()
        })
    }
    var i = function(e, i) {
        this.$element = t(e),
        this.$indicators = this.$element.find(".carousel-indicators"),
        this.options = i,
        this.paused = this.sliding = this.interval = this.$active = this.$items = null,
        this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)),
        "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    i.VERSION = "3.3.2",
    i.TRANSITION_DURATION = 600,
    i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    },
    i.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
            }
            t.preventDefault()
        }
    },
    i.prototype.cycle = function(e) {
        return e || (this.paused = !1),
        this.interval && clearInterval(this.interval),
        this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)),
        this
    },
    i.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"),
        this.$items.index(t || this.$active)
    },
    i.prototype.getItemForDirection = function(t, e) {
        var i = this.getItemIndex(e),
        n = "prev" == t && 0 === i || "next" == t && i == this.$items.length - 1;
        if (n && !this.options.wrap) return e;
        var s = "prev" == t ? -1 : 1,
        o = (i + s) % this.$items.length;
        return this.$items.eq(o)
    },
    i.prototype.to = function(t) {
        var e = this,
        i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel",
        function() {
            e.to(t)
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next": "prev", this.$items.eq(t))
    },
    i.prototype.pause = function(e) {
        return e || (this.paused = !0),
        this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)),
        this.interval = clearInterval(this.interval),
        this
    },
    i.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    },
    i.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    },
    i.prototype.slide = function(e, n) {
        var s = this.$element.find(".item.active"),
        o = n || this.getItemForDirection(e, s),
        a = this.interval,
        r = "next" == e ? "left": "right",
        l = this;
        if (o.hasClass("active")) return this.sliding = !1;
        var h = o[0],
        u = t.Event("slide.bs.carousel", {
            relatedTarget: h,
            direction: r
        });
        if (this.$element.trigger(u), !u.isDefaultPrevented()) {
            if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var c = t(this.$indicators.children()[this.getItemIndex(o)]);
                c && c.addClass("active")
            }
            var d = t.Event("slid.bs.carousel", {
                relatedTarget: h,
                direction: r
            });
            return t.support.transition && this.$element.hasClass("slide") ? (o.addClass(e), o[0].offsetWidth, s.addClass(r), o.addClass(r), s.one("bsTransitionEnd",
            function() {
                o.removeClass([e, r].join(" ")).addClass("active"),
                s.removeClass(["active", r].join(" ")),
                l.sliding = !1,
                setTimeout(function() {
                    l.$element.trigger(d)
                },
                0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (s.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger(d)),
            a && this.cycle(),
            this
        }
    };
    var n = t.fn.carousel;
    t.fn.carousel = e,
    t.fn.carousel.Constructor = i,
    t.fn.carousel.noConflict = function() {
        return t.fn.carousel = n,
        this
    };
    var s = function(i) {
        var n, s = t(this),
        o = t(s.attr("data-target") || (n = s.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""));
        if (o.hasClass("carousel")) {
            var a = t.extend({},
            o.data(), s.data()),
            r = s.attr("data-slide-to");
            r && (a.interval = !1),
            e.call(o, a),
            r && o.data("bs.carousel").to(r),
            i.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", s).on("click.bs.carousel.data-api", "[data-slide-to]", s),
    t(window).on("load",
    function() {
        t('[data-ride="carousel"]').each(function() {
            var i = t(this);
            e.call(i, i.data())
        })
    })
} (jQuery),
+
function(t) {
    "use strict";
    function e(e) {
        var i, n = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(n)
    }
    function i(e) {
        return this.each(function() {
            var i = t(this),
            s = i.data("bs.collapse"),
            o = t.extend({},
            n.DEFAULTS, i.data(), "object" == typeof e && e); ! s && o.toggle && "show" == e && (o.toggle = !1),
            s || i.data("bs.collapse", s = new n(this, o)),
            "string" == typeof e && s[e]()
        })
    }
    var n = function(e, i) {
        this.$element = t(e),
        this.options = t.extend({},
        n.DEFAULTS, i),
        this.$trigger = t(this.options.trigger).filter('[href="#' + e.id + '"], [data-target="#' + e.id + '"]'),
        this.transitioning = null,
        this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle()
    };
    n.VERSION = "3.3.2",
    n.TRANSITION_DURATION = 350,
    n.DEFAULTS = {
        toggle: !0,
        trigger: '[data-toggle="collapse"]'
    },
    n.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width": "height"
    },
    n.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, s = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (! (s && s.length && (e = s.data("bs.collapse"), e && e.transitioning))) {
                var o = t.Event("show.bs.collapse");
                if (this.$element.trigger(o), !o.isDefaultPrevented()) {
                    s && s.length && (i.call(s, "hide"), e || s.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0),
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0),
                    this.transitioning = 1;
                    var r = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[a](""),
                        this.transitioning = 0,
                        this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return r.call(this);
                    var l = t.camelCase(["scroll", a].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(n.TRANSITION_DURATION)[a](this.$element[0][l])
                }
            }
        }
    },
    n.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight,
                this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1),
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
                this.transitioning = 1;
                var s = function() {
                    this.transitioning = 0,
                    this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(s, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : s.call(this)
            }
        }
    },
    n.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide": "show"]()
    },
    n.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(i, n) {
            var s = t(n);
            this.addAriaAndCollapsedClass(e(s), s)
        },
        this)).end()
    },
    n.prototype.addAriaAndCollapsedClass = function(t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i),
        e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var s = t.fn.collapse;
    t.fn.collapse = i,
    t.fn.collapse.Constructor = n,
    t.fn.collapse.noConflict = function() {
        return t.fn.collapse = s,
        this
    },
    t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]',
    function(n) {
        var s = t(this);
        s.attr("data-target") || n.preventDefault();
        var o = e(s),
        a = o.data("bs.collapse"),
        r = a ? "toggle": t.extend({},
        s.data(), {
            trigger: this
        });
        i.call(o, r)
    })
} (jQuery),
+
function(t) {
    "use strict";
    function e(e) {
        e && 3 === e.which || (t(s).remove(), t(o).each(function() {
            var n = t(this),
            s = i(n),
            o = {
                relatedTarget: this
            };
            s.hasClass("open") && (s.trigger(e = t.Event("hide.bs.dropdown", o)), e.isDefaultPrevented() || (n.attr("aria-expanded", "false"), s.removeClass("open").trigger("hidden.bs.dropdown", o)))
        }))
    }
    function i(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var n = i && t(i);
        return n && n.length ? n: e.parent()
    }
    function n(e) {
        return this.each(function() {
            var i = t(this),
            n = i.data("bs.dropdown");
            n || i.data("bs.dropdown", n = new a(this)),
            "string" == typeof e && n[e].call(i)
        })
    }
    var s = ".dropdown-backdrop",
    o = '[data-toggle="dropdown"]',
    a = function(e) {
        t(e).on("click.bs.dropdown", this.toggle)
    };
    a.VERSION = "3.3.2",
    a.prototype.toggle = function(n) {
        var s = t(this);
        if (!s.is(".disabled, :disabled")) {
            var o = i(s),
            a = o.hasClass("open");
            if (e(), !a) {
                "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e);
                var r = {
                    relatedTarget: this
                };
                if (o.trigger(n = t.Event("show.bs.dropdown", r)), n.isDefaultPrevented()) return;
                s.trigger("focus").attr("aria-expanded", "true"),
                o.toggleClass("open").trigger("shown.bs.dropdown", r)
            }
            return ! 1
        }
    },
    a.prototype.keydown = function(e) {
        if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
            var n = t(this);
            if (e.preventDefault(), e.stopPropagation(), !n.is(".disabled, :disabled")) {
                var s = i(n),
                a = s.hasClass("open");
                if (!a && 27 != e.which || a && 27 == e.which) return 27 == e.which && s.find(o).trigger("focus"),
                n.trigger("click");
                var r = " li:not(.divider):visible a",
                l = s.find('[role="menu"]' + r + ', [role="listbox"]' + r);
                if (l.length) {
                    var h = l.index(e.target);
                    38 == e.which && h > 0 && h--,
                    40 == e.which && h < l.length - 1 && h++,
                    ~h || (h = 0),
                    l.eq(h).trigger("focus")
                }
            }
        }
    };
    var r = t.fn.dropdown;
    t.fn.dropdown = n,
    t.fn.dropdown.Constructor = a,
    t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = r,
        this
    },
    t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form",
    function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", o, a.prototype.toggle).on("keydown.bs.dropdown.data-api", o, a.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', a.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', a.prototype.keydown)
} (jQuery),
+
function(t) {
    "use strict";
    function e(e, n) {
        return this.each(function() {
            var s = t(this),
            o = s.data("bs.modal"),
            a = t.extend({},
            i.DEFAULTS, s.data(), "object" == typeof e && e);
            o || s.data("bs.modal", o = new i(this, a)),
            "string" == typeof e ? o[e](n) : a.show && o.show(n)
        })
    }
    var i = function(e, i) {
        this.options = i,
        this.$body = t(document.body),
        this.$element = t(e),
        this.$backdrop = this.isShown = null,
        this.scrollbarWidth = 0,
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        },
        this))
    };
    i.VERSION = "3.3.2",
    i.TRANSITION_DURATION = 300,
    i.BACKDROP_TRANSITION_DURATION = 150,
    i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    },
    i.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t)
    },
    i.prototype.show = function(e) {
        var n = this,
        s = t.Event("show.bs.modal", {
            relatedTarget: e
        });
        this.$element.trigger(s),
        this.isShown || s.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.backdrop(function() {
            var s = t.support.transition && n.$element.hasClass("fade");
            n.$element.parent().length || n.$element.appendTo(n.$body),
            n.$element.show().scrollTop(0),
            n.options.backdrop && n.adjustBackdrop(),
            n.adjustDialog(),
            s && n.$element[0].offsetWidth,
            n.$element.addClass("in").attr("aria-hidden", !1),
            n.enforceFocus();
            var o = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            s ? n.$element.find(".modal-dialog").one("bsTransitionEnd",
            function() {
                n.$element.trigger("focus").trigger(o)
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : n.$element.trigger("focus").trigger(o)
        }))
    },
    i.prototype.hide = function(e) {
        e && e.preventDefault(),
        e = t.Event("hide.bs.modal"),
        this.$element.trigger(e),
        this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
    },
    i.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        },
        this))
    },
    i.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide()
        },
        this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    },
    i.prototype.resize = function() {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    },
    i.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(),
        this.backdrop(function() {
            t.$body.removeClass("modal-open"),
            t.resetAdjustments(),
            t.resetScrollbar(),
            t.$element.trigger("hidden.bs.modal")
        })
    },
    i.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(),
        this.$backdrop = null
    },
    i.prototype.backdrop = function(e) {
        var n = this,
        s = this.$element.hasClass("fade") ? "fade": "";
        if (this.isShown && this.options.backdrop) {
            var o = t.support.transition && s;
            if (this.$backdrop = t('<div class="modal-backdrop ' + s + '" />').prependTo(this.$element).on("click.dismiss.bs.modal", t.proxy(function(t) {
                t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            },
            this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            o ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function() {
                n.removeBackdrop(),
                e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : a()
        } else e && e()
    },
    i.prototype.handleUpdate = function() {
        this.options.backdrop && this.adjustBackdrop(),
        this.adjustDialog()
    },
    i.prototype.adjustBackdrop = function() {
        this.$backdrop.css("height", 0).css("height", this.$element[0].scrollHeight)
    },
    i.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth: "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth: ""
        })
    },
    i.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    },
    i.prototype.checkScrollbar = function() {
        this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight,
        this.scrollbarWidth = this.measureScrollbar()
    },
    i.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    },
    i.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", "")
    },
    i.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure",
        this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t),
        e
    };
    var n = t.fn.modal;
    t.fn.modal = e,
    t.fn.modal.Constructor = i,
    t.fn.modal.noConflict = function() {
        return t.fn.modal = n,
        this
    },
    t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]',
    function(i) {
        var n = t(this),
        s = n.attr("href"),
        o = t(n.attr("data-target") || s && s.replace(/.*(?=#[^\s]+$)/, "")),
        a = o.data("bs.modal") ? "toggle": t.extend({
            remote: !/#/.test(s) && s
        },
        o.data(), n.data());
        n.is("a") && i.preventDefault(),
        o.one("show.bs.modal",
        function(t) {
            t.isDefaultPrevented() || o.one("hidden.bs.modal",
            function() {
                n.is(":visible") && n.trigger("focus")
            })
        }),
        e.call(o, a, this)
    })
} (jQuery),
+
function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var n = t(this),
            s = n.data("bs.tooltip"),
            o = "object" == typeof e && e; (s || "destroy" != e) && (s || n.data("bs.tooltip", s = new i(this, o)), "string" == typeof e && s[e]())
        })
    }
    var i = function(t, e) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null,
        this.init("tooltip", t, e)
    };
    i.VERSION = "3.3.2",
    i.TRANSITION_DURATION = 150,
    i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    },
    i.prototype.init = function(e, i, n) {
        this.enabled = !0,
        this.type = e,
        this.$element = t(i),
        this.options = this.getOptions(n),
        this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport);
        for (var s = this.options.trigger.split(" "), o = s.length; o--;) {
            var a = s[o];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != a) {
                var r = "hover" == a ? "mouseenter": "focusin",
                l = "hover" == a ? "mouseleave": "focusout";
                this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)),
                this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({},
        this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    },
    i.prototype.getDefaults = function() {
        return i.DEFAULTS
    },
    i.prototype.getOptions = function(e) {
        return e = t.extend({},
        this.getDefaults(), this.$element.data(), e),
        e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }),
        e
    },
    i.prototype.getDelegateOptions = function() {
        var e = {},
        i = this.getDefaults();
        return this._options && t.each(this._options,
        function(t, n) {
            i[t] != n && (e[t] = n)
        }),
        e
    },
    i.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e: t(e.currentTarget).data("bs." + this.type);
        return i && i.$tip && i.$tip.is(":visible") ? void(i.hoverState = "in") : (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show()
        },
        i.options.delay.show)) : i.show())
    },
    i.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e: t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)),
        clearTimeout(i.timeout),
        i.hoverState = "out",
        i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide()
        },
        i.options.delay.hide)) : i.hide()
    },
    i.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var n = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !n) return;
            var s = this,
            o = this.tip(),
            a = this.getUID(this.type);
            this.setContent(),
            o.attr("id", a),
            this.$element.attr("aria-describedby", a),
            this.options.animation && o.addClass("fade");
            var r = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
            l = /\s?auto?\s?/i,
            h = l.test(r);
            h && (r = r.replace(l, "") || "top"),
            o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(r).data("bs." + this.type, this),
            this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element);
            var u = this.getPosition(),
            c = o[0].offsetWidth,
            d = o[0].offsetHeight;
            if (h) {
                var p = r,
                f = this.options.container ? t(this.options.container) : this.$element.parent(),
                m = this.getPosition(f);
                r = "bottom" == r && u.bottom + d > m.bottom ? "top": "top" == r && u.top - d < m.top ? "bottom": "right" == r && u.right + c > m.width ? "left": "left" == r && u.left - c < m.left ? "right": r,
                o.removeClass(p).addClass(r)
            }
            var g = this.getCalculatedOffset(r, u, c, d);
            this.applyPlacement(g, r);
            var v = function() {
                var t = s.hoverState;
                s.$element.trigger("shown.bs." + s.type),
                s.hoverState = null,
                "out" == t && s.leave(s)
            };
            t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", v).emulateTransitionEnd(i.TRANSITION_DURATION) : v()
        }
    },
    i.prototype.applyPlacement = function(e, i) {
        var n = this.tip(),
        s = n[0].offsetWidth,
        o = n[0].offsetHeight,
        a = parseInt(n.css("margin-top"), 10),
        r = parseInt(n.css("margin-left"), 10);
        isNaN(a) && (a = 0),
        isNaN(r) && (r = 0),
        e.top = e.top + a,
        e.left = e.left + r,
        t.offset.setOffset(n[0], t.extend({
            using: function(t) {
                n.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        },
        e), 0),
        n.addClass("in");
        var l = n[0].offsetWidth,
        h = n[0].offsetHeight;
        "top" == i && h != o && (e.top = e.top + o - h);
        var u = this.getViewportAdjustedDelta(i, e, l, h);
        u.left ? e.left += u.left: e.top += u.top;
        var c = /top|bottom/.test(i),
        d = c ? 2 * u.left - s + l: 2 * u.top - o + h,
        p = c ? "offsetWidth": "offsetHeight";
        n.offset(e),
        this.replaceArrow(d, n[0][p], c)
    },
    i.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i ? "left": "top", 50 * (1 - t / e) + "%").css(i ? "top": "left", "")
    },
    i.prototype.setContent = function() {
        var t = this.tip(),
        e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html": "text"](e),
        t.removeClass("fade in top bottom left right")
    },
    i.prototype.hide = function(e) {
        function n() {
            "in" != s.hoverState && o.detach(),
            s.$element.removeAttr("aria-describedby").trigger("hidden.bs." + s.type),
            e && e()
        }
        var s = this,
        o = this.tip(),
        a = t.Event("hide.bs." + this.type);
        return this.$element.trigger(a),
        a.isDefaultPrevented() ? void 0 : (o.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n(), this.hoverState = null, this)
    },
    i.prototype.fixTitle = function() {
        var t = this.$element; (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    },
    i.prototype.hasContent = function() {
        return this.getTitle()
    },
    i.prototype.getPosition = function(e) {
        e = e || this.$element;
        var i = e[0],
        n = "BODY" == i.tagName,
        s = i.getBoundingClientRect();
        null == s.width && (s = t.extend({},
        s, {
            width: s.right - s.left,
            height: s.bottom - s.top
        }));
        var o = n ? {
            top: 0,
            left: 0
        }: e.offset(),
        a = {
            scroll: n ? document.documentElement.scrollTop || document.body.scrollTop: e.scrollTop()
        },
        r = n ? {
            width: t(window).width(),
            height: t(window).height()
        }: null;
        return t.extend({},
        s, a, r, o)
    },
    i.prototype.getCalculatedOffset = function(t, e, i, n) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        }: "top" == t ? {
            top: e.top - n,
            left: e.left + e.width / 2 - i / 2
        }: "left" == t ? {
            top: e.top + e.height / 2 - n / 2,
            left: e.left - i
        }: {
            top: e.top + e.height / 2 - n / 2,
            left: e.left + e.width
        }
    },
    i.prototype.getViewportAdjustedDelta = function(t, e, i, n) {
        var s = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return s;
        var o = this.options.viewport && this.options.viewport.padding || 0,
        a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var r = e.top - o - a.scroll,
            l = e.top + o - a.scroll + n;
            r < a.top ? s.top = a.top - r: l > a.top + a.height && (s.top = a.top + a.height - l)
        } else {
            var h = e.left - o,
            u = e.left + o + i;
            h < a.left ? s.left = a.left - h: u > a.width && (s.left = a.left + a.width - u)
        }
        return s
    },
    i.prototype.getTitle = function() {
        var t, e = this.$element,
        i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    },
    i.prototype.getUID = function(t) {
        do t += ~~ (1e6 * Math.random());
        while (document.getElementById(t));
        return t
    },
    i.prototype.tip = function() {
        return this.$tip = this.$tip || t(this.options.template)
    },
    i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    },
    i.prototype.enable = function() {
        this.enabled = !0
    },
    i.prototype.disable = function() {
        this.enabled = !1
    },
    i.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    },
    i.prototype.toggle = function(e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type), i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))),
        i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    },
    i.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout),
        this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type)
        })
    };
    var n = t.fn.tooltip;
    t.fn.tooltip = e,
    t.fn.tooltip.Constructor = i,
    t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = n,
        this
    }
} (jQuery),
+
function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var n = t(this),
            s = n.data("bs.popover"),
            o = "object" == typeof e && e; (s || "destroy" != e) && (s || n.data("bs.popover", s = new i(this, o)), "string" == typeof e && s[e]())
        })
    }
    var i = function(t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.3.2",
    i.DEFAULTS = t.extend({},
    t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }),
    i.prototype = t.extend({},
    t.fn.tooltip.Constructor.prototype),
    i.prototype.constructor = i,
    i.prototype.getDefaults = function() {
        return i.DEFAULTS
    },
    i.prototype.setContent = function() {
        var t = this.tip(),
        e = this.getTitle(),
        i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html": "text"](e),
        t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html": "append": "text"](i),
        t.removeClass("fade top bottom left right in"),
        t.find(".popover-title").html() || t.find(".popover-title").hide()
    },
    i.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    },
    i.prototype.getContent = function() {
        var t = this.$element,
        e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    },
    i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    },
    i.prototype.tip = function() {
        return this.$tip || (this.$tip = t(this.options.template)),
        this.$tip
    };
    var n = t.fn.popover;
    t.fn.popover = e,
    t.fn.popover.Constructor = i,
    t.fn.popover.noConflict = function() {
        return t.fn.popover = n,
        this
    }
} (jQuery),
+
function(t) {
    "use strict";
    function e(i, n) {
        var s = t.proxy(this.process, this);
        this.$body = t("body"),
        this.$scrollElement = t(t(i).is("body") ? window: i),
        this.options = t.extend({},
        e.DEFAULTS, n),
        this.selector = (this.options.target || "") + " .nav li > a",
        this.offsets = [],
        this.targets = [],
        this.activeTarget = null,
        this.scrollHeight = 0,
        this.$scrollElement.on("scroll.bs.scrollspy", s),
        this.refresh(),
        this.process()
    }
    function i(i) {
        return this.each(function() {
            var n = t(this),
            s = n.data("bs.scrollspy"),
            o = "object" == typeof i && i;
            s || n.data("bs.scrollspy", s = new e(this, o)),
            "string" == typeof i && s[i]()
        })
    }
    e.VERSION = "3.3.2",
    e.DEFAULTS = {
        offset: 10
    },
    e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    },
    e.prototype.refresh = function() {
        var e = "offset",
        i = 0;
        t.isWindow(this.$scrollElement[0]) || (e = "position", i = this.$scrollElement.scrollTop()),
        this.offsets = [],
        this.targets = [],
        this.scrollHeight = this.getScrollHeight();
        var n = this;
        this.$body.find(this.selector).map(function() {
            var n = t(this),
            s = n.data("target") || n.attr("href"),
            o = /^#./.test(s) && t(s);
            return o && o.length && o.is(":visible") && [[o[e]().top + i, s]] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            n.offsets.push(this[0]),
            n.targets.push(this[1])
        })
    },
    e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
        i = this.getScrollHeight(),
        n = this.options.offset + i - this.$scrollElement.height(),
        s = this.offsets,
        o = this.targets,
        a = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= n) return a != (t = o[o.length - 1]) && this.activate(t);
        if (a && e < s[0]) return this.activeTarget = null,
        this.clear();
        for (t = s.length; t--;) a != o[t] && e >= s[t] && (!s[t + 1] || e <= s[t + 1]) && this.activate(o[t])
    },
    e.prototype.activate = function(e) {
        this.activeTarget = e,
        this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
        n = t(i).parents("li").addClass("active");
        n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")),
        n.trigger("activate.bs.scrollspy")
    },
    e.prototype.clear = function() {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var n = t.fn.scrollspy;
    t.fn.scrollspy = i,
    t.fn.scrollspy.Constructor = e,
    t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = n,
        this
    },
    t(window).on("load.bs.scrollspy.data-api",
    function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            i.call(e, e.data())
        })
    })
} (jQuery),
+
function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var n = t(this),
            s = n.data("bs.tab");
            s || n.data("bs.tab", s = new i(this)),
            "string" == typeof e && s[e]()
        })
    }
    var i = function(e) {
        this.element = t(e)
    };
    i.VERSION = "3.3.2",
    i.TRANSITION_DURATION = 150,
    i.prototype.show = function() {
        var e = this.element,
        i = e.closest("ul:not(.dropdown-menu)"),
        n = e.data("target");
        if (n || (n = e.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var s = i.find(".active:last a"),
            o = t.Event("hide.bs.tab", {
                relatedTarget: e[0]
            }),
            a = t.Event("show.bs.tab", {
                relatedTarget: s[0]
            });
            if (s.trigger(o), e.trigger(a), !a.isDefaultPrevented() && !o.isDefaultPrevented()) {
                var r = t(n);
                this.activate(e.closest("li"), i),
                this.activate(r, r.parent(),
                function() {
                    s.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }),
                    e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: s[0]
                    })
                })
            }
        }
    },
    i.prototype.activate = function(e, n, s) {
        function o() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1),
            e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0),
            r ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"),
            e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0),
            s && s()
        }
        var a = n.find("> .active"),
        r = s && t.support.transition && (a.length && a.hasClass("fade") || !!n.find("> .fade").length);
        a.length && r ? a.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(),
        a.removeClass("in")
    };
    var n = t.fn.tab;
    t.fn.tab = e,
    t.fn.tab.Constructor = i,
    t.fn.tab.noConflict = function() {
        return t.fn.tab = n,
        this
    };
    var s = function(i) {
        i.preventDefault(),
        e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', s).on("click.bs.tab.data-api", '[data-toggle="pill"]', s)
} (jQuery),
+
function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var n = t(this),
            s = n.data("bs.affix"),
            o = "object" == typeof e && e;
            s || n.data("bs.affix", s = new i(this, o)),
            "string" == typeof e && s[e]()
        })
    }
    var i = function(e, n) {
        this.options = t.extend({},
        i.DEFAULTS, n),
        this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)),
        this.$element = t(e),
        this.affixed = this.unpin = this.pinnedOffset = null,
        this.checkPosition()
    };
    i.VERSION = "3.3.2",
    i.RESET = "affix affix-top affix-bottom",
    i.DEFAULTS = {
        offset: 0,
        target: window
    },
    i.prototype.getState = function(t, e, i, n) {
        var s = this.$target.scrollTop(),
        o = this.$element.offset(),
        a = this.$target.height();
        if (null != i && "top" == this.affixed) return i > s ? "top": !1;
        if ("bottom" == this.affixed) return null != i ? s + this.unpin <= o.top ? !1 : "bottom": t - n >= s + a ? !1 : "bottom";
        var r = null == this.affixed,
        l = r ? s: o.top,
        h = r ? a: e;
        return null != i && i >= s ? "top": null != n && l + h >= t - n ? "bottom": !1
    },
    i.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
        e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    },
    i.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    },
    i.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(),
            n = this.options.offset,
            s = n.top,
            o = n.bottom,
            a = t("body").height();
            "object" != typeof n && (o = s = n),
            "function" == typeof s && (s = n.top(this.$element)),
            "function" == typeof o && (o = n.bottom(this.$element));
            var r = this.getState(a, e, s, o);
            if (this.affixed != r) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (r ? "-" + r: ""),
                h = t.Event(l + ".bs.affix");
                if (this.$element.trigger(h), h.isDefaultPrevented()) return;
                this.affixed = r,
                this.unpin = "bottom" == r ? this.getPinnedOffset() : null,
                this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == r && this.$element.offset({
                top: a - e - o
            })
        }
    };
    var n = t.fn.affix;
    t.fn.affix = e,
    t.fn.affix.Constructor = i,
    t.fn.affix.noConflict = function() {
        return t.fn.affix = n,
        this
    },
    t(window).on("load",
    function() {
        t('[data-spy="affix"]').each(function() {
            var i = t(this),
            n = i.data();
            n.offset = n.offset || {},
            null != n.offsetBottom && (n.offset.bottom = n.offsetBottom),
            null != n.offsetTop && (n.offset.top = n.offsetTop),
            e.call(i, n)
        })
    })
} (jQuery),
function(t, e, i) {
    "use strict";
    function n(i) {
        if (s = e.documentElement, o = e.body, U(), rt = this, i = i || {},
        dt = i.constants || {},
        i.easing) for (var n in i.easing) K[n] = i.easing[n];
        yt = i.edgeStrategy || "set",
        ut = {
            beforerender: i.beforerender,
            render: i.render,
            keyframe: i.keyframe
        },
        ct = i.forceHeight !== !1,
        ct && (zt = i.scale || 1),
        pt = i.mobileDeceleration || C,
        mt = i.smoothScrolling !== !1,
        gt = i.smoothScrollingDuration || S,
        vt = {
            targetTop: rt.getScrollTop()
        },
        Vt = (i.mobileCheck ||
        function() {
            return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || t.opera)
        })(),
        Vt ? (ht = e.getElementById(i.skrollrBody || T), ht && at(), G(), Pt(s, [b, w], [y])) : Pt(s, [b, _], [y]),
        rt.refresh(),
        xt(t, "resize orientationchange",
        function() {
            var t = s.clientWidth,
            e = s.clientHeight; (e !== Lt || t !== Bt) && (Lt = e, Bt = t, Rt = !0)
        });
        var a = q();
        return function r() {
            Z(),
            wt = a(r)
        } (),
        rt
    }
    var s, o, a = {
        get: function() {
            return rt
        },
        init: function(t) {
            return rt || new n(t)
        },
        VERSION: "0.6.29"
    },
    r = Object.prototype.hasOwnProperty,
    l = t.Math,
    h = t.getComputedStyle,
    u = "touchstart",
    c = "touchmove",
    d = "touchcancel",
    p = "touchend",
    f = "skrollable",
    m = f + "-before",
    g = f + "-between",
    v = f + "-after",
    b = "skrollr",
    y = "no-" + b,
    _ = b + "-desktop",
    w = b + "-mobile",
    x = "linear",
    k = 1e3,
    C = .004,
    T = "skrollr-body",
    S = 200,
    D = "start",
    M = "end",
    I = "center",
    P = "bottom",
    E = "___skrollable_id",
    j = /^(?:input|textarea|button|select)$/i,
    A = /^\s+|\s+$/g,
    N = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,
    F = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,
    z = /^(@?[a-z\-]+)\[(\w+)\]$/,
    H = /-([a-z0-9_])/g,
    O = function(t, e) {
        return e.toUpperCase()
    },
    W = /[\-+]?[\d]*\.?[\d]+/g,
    B = /\{\?\}/g,
    L = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,
    R = /[a-z\-]+-gradient/g,
    $ = "",
    V = "",
    U = function() {
        var t = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
        if (h) {
            var e = h(o, null);
            for (var i in e) if ($ = i.match(t) || +i == i && e[i].match(t)) break;
            if (!$) return void($ = V = "");
            $ = $[0],
            "-" === $.slice(0, 1) ? (V = $, $ = {
                "-webkit-": "webkit",
                "-moz-": "Moz",
                "-ms-": "ms",
                "-o-": "O"
            } [$]) : V = "-" + $.toLowerCase() + "-"
        }
    },
    q = function() {
        var e = t.requestAnimationFrame || t[$.toLowerCase() + "RequestAnimationFrame"],
        i = At();
        return (Vt || !e) && (e = function(e) {
            var n = At() - i,
            s = l.max(0, 1e3 / 60 - n);
            return t.setTimeout(function() {
                i = At(),
                e()
            },
            s)
        }),
        e
    },
    Y = function() {
        var e = t.cancelAnimationFrame || t[$.toLowerCase() + "CancelAnimationFrame"];
        return (Vt || !e) && (e = function(e) {
            return t.clearTimeout(e)
        }),
        e
    },
    K = {
        begin: function() {
            return 0
        },
        end: function() {
            return 1
        },
        linear: function(t) {
            return t
        },
        quadratic: function(t) {
            return t * t
        },
        cubic: function(t) {
            return t * t * t
        },
        swing: function(t) {
            return - l.cos(t * l.PI) / 2 + .5
        },
        sqrt: function(t) {
            return l.sqrt(t)
        },
        outCubic: function(t) {
            return l.pow(t - 1, 3) + 1
        },
        bounce: function(t) {
            var e;
            if (.5083 >= t) e = 3;
            else if (.8489 >= t) e = 9;
            else if (.96208 >= t) e = 27;
            else {
                if (! (.99981 >= t)) return 1;
                e = 91
            }
            return 1 - l.abs(3 * l.cos(t * e * 1.028) / e)
        }
    };
    n.prototype.refresh = function(t) {
        var n, s, o = !1;
        for (t === i ? (o = !0, lt = [], $t = 0, t = e.getElementsByTagName("*")) : t.length === i && (t = [t]), n = 0, s = t.length; s > n; n++) {
            var a = t[n],
            r = a,
            l = [],
            h = mt,
            u = yt,
            c = !1;
            if (o && E in a && delete a[E], a.attributes) {
                for (var d = 0,
                p = a.attributes.length; p > d; d++) {
                    var m = a.attributes[d];
                    if ("data-anchor-target" !== m.name) if ("data-smooth-scrolling" !== m.name) if ("data-edge-strategy" !== m.name) if ("data-emit-events" !== m.name) {
                        var g = m.name.match(N);
                        if (null !== g) {
                            var v = {
                                props: m.value,
                                element: a,
                                eventType: m.name.replace(H, O)
                            };
                            l.push(v);
                            var b = g[1];
                            b && (v.constant = b.substr(1));
                            var y = g[2];
                            /p$/.test(y) ? (v.isPercentage = !0, v.offset = (0 | y.slice(0, -1)) / 100) : v.offset = 0 | y;
                            var _ = g[3],
                            w = g[4] || _;
                            _ && _ !== D && _ !== M ? (v.mode = "relative", v.anchors = [_, w]) : (v.mode = "absolute", _ === M ? v.isEnd = !0 : v.isPercentage || (v.offset = v.offset * zt))
                        }
                    } else c = !0;
                    else u = m.value;
                    else h = "off" !== m.value;
                    else if (r = e.querySelector(m.value), null === r) throw 'Unable to find anchor target "' + m.value + '"'
                }
                if (l.length) {
                    var x, k, C; ! o && E in a ? (C = a[E], x = lt[C].styleAttr, k = lt[C].classAttr) : (C = a[E] = $t++, x = a.style.cssText, k = It(a)),
                    lt[C] = {
                        element: a,
                        styleAttr: x,
                        classAttr: k,
                        anchorTarget: r,
                        keyFrames: l,
                        smoothScrolling: h,
                        edgeStrategy: u,
                        emitEvents: c,
                        lastFrameIndex: -1
                    },
                    Pt(a, [f], [])
                }
            }
        }
        for (St(), n = 0, s = t.length; s > n; n++) {
            var T = lt[t[n][E]];
            T !== i && (J(T), et(T))
        }
        return rt
    },
    n.prototype.relativeToAbsolute = function(t, e, i) {
        var n = s.clientHeight,
        o = t.getBoundingClientRect(),
        a = o.top,
        r = o.bottom - o.top;
        return e === P ? a -= n: e === I && (a -= n / 2),
        i === P ? a += r: i === I && (a += r / 2),
        a += rt.getScrollTop(),
        a + .5 | 0
    },
    n.prototype.animateTo = function(t, e) {
        e = e || {};
        var n = At(),
        s = rt.getScrollTop();
        return ft = {
            startTop: s,
            topDiff: t - s,
            targetTop: t,
            duration: e.duration || k,
            startTime: n,
            endTime: n + (e.duration || k),
            easing: K[e.easing || x],
            done: e.done
        },
        ft.topDiff || (ft.done && ft.done.call(rt, !1), ft = i),
        rt
    },
    n.prototype.stopAnimateTo = function() {
        ft && ft.done && ft.done.call(rt, !0),
        ft = i
    },
    n.prototype.isAnimatingTo = function() {
        return !! ft
    },
    n.prototype.isMobile = function() {
        return Vt
    },
    n.prototype.setScrollTop = function(e, i) {
        return bt = i === !0,
        Vt ? Ut = l.min(l.max(e, 0), Ft) : t.scrollTo(0, e),
        rt
    },
    n.prototype.getScrollTop = function() {
        return Vt ? Ut: t.pageYOffset || s.scrollTop || o.scrollTop || 0
    },
    n.prototype.getMaxScrollTop = function() {
        return Ft
    },
    n.prototype.on = function(t, e) {
        return ut[t] = e,
        rt
    },
    n.prototype.off = function(t) {
        return delete ut[t],
        rt
    },
    n.prototype.destroy = function() {
        var t = Y();
        t(wt),
        Ct(),
        Pt(s, [y], [b, _, w]);
        for (var e = 0,
        n = lt.length; n > e; e++) ot(lt[e].element);
        s.style.overflow = o.style.overflow = "",
        s.style.height = o.style.height = "",
        ht && a.setStyle(ht, "transform", "none"),
        rt = i,
        ht = i,
        ut = i,
        ct = i,
        Ft = 0,
        zt = 1,
        dt = i,
        pt = i,
        Ht = "down",
        Ot = -1,
        Bt = 0,
        Lt = 0,
        Rt = !1,
        ft = i,
        mt = i,
        gt = i,
        vt = i,
        bt = i,
        $t = 0,
        yt = i,
        Vt = !1,
        Ut = 0,
        _t = i
    };
    var G = function() {
        var n, a, r, h, f, m, g, v, b, y, _, w;
        xt(s, [u, c, d, p].join(" "),
        function(t) {
            var s = t.changedTouches[0];
            for (h = t.target; 3 === h.nodeType;) h = h.parentNode;
            switch (f = s.clientY, m = s.clientX, y = t.timeStamp, j.test(h.tagName) || t.preventDefault(), t.type) {
            case u:
                n && n.blur(),
                rt.stopAnimateTo(),
                n = h,
                a = g = f,
                r = m,
                b = y;
                break;
            case c:
                j.test(h.tagName) && e.activeElement !== h && t.preventDefault(),
                v = f - g,
                w = y - _,
                rt.setScrollTop(Ut - v, !0),
                g = f,
                _ = y;
                break;
            default:
            case d:
            case p:
                var o = a - f,
                x = r - m,
                k = x * x + o * o;
                if (49 > k) {
                    if (!j.test(n.tagName)) {
                        n.focus();
                        var C = e.createEvent("MouseEvents");
                        C.initMouseEvent("click", !0, !0, t.view, 1, s.screenX, s.screenY, s.clientX, s.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null),
                        n.dispatchEvent(C)
                    }
                    return
                }
                n = i;
                var T = v / w;
                T = l.max(l.min(T, 3), -3);
                var S = l.abs(T / pt),
                D = T * S + .5 * pt * S * S,
                M = rt.getScrollTop() - D,
                I = 0;
                M > Ft ? (I = (Ft - M) / D, M = Ft) : 0 > M && (I = -M / D, M = 0),
                S *= 1 - I,
                rt.animateTo(M + .5 | 0, {
                    easing: "outCubic",
                    duration: S
                })
            }
        }),
        t.scrollTo(0, 0),
        s.style.overflow = o.style.overflow = "hidden";

    },
    X = function() {
        var t, e, i, n, o, a, r, h, u, c, d, p = s.clientHeight,
        f = Dt();
        for (h = 0, u = lt.length; u > h; h++) for (t = lt[h], e = t.element, i = t.anchorTarget, n = t.keyFrames, o = 0, a = n.length; a > o; o++) r = n[o],
        c = r.offset,
        d = f[r.constant] || 0,
        r.frame = c,
        r.isPercentage && (c *= p, r.frame = c),
        "relative" === r.mode && (ot(e), r.frame = rt.relativeToAbsolute(i, r.anchors[0], r.anchors[1]) - c, ot(e, !0)),
        r.frame += d,
        ct && !r.isEnd && r.frame > Ft && (Ft = r.frame);
        for (Ft = l.max(Ft, Mt()), h = 0, u = lt.length; u > h; h++) {
            for (t = lt[h], n = t.keyFrames, o = 0, a = n.length; a > o; o++) r = n[o],
            d = f[r.constant] || 0,
            r.isEnd && (r.frame = Ft - r.offset + d);
            t.keyFrames.sort(Nt)
        }
    },
    Q = function(t, e) {
        for (var i = 0,
        n = lt.length; n > i; i++) {
            var s, o, l = lt[i],
            h = l.element,
            u = l.smoothScrolling ? t: e,
            c = l.keyFrames,
            d = c.length,
            p = c[0],
            b = c[c.length - 1],
            y = u < p.frame,
            _ = u > b.frame,
            w = y ? p: b,
            x = l.emitEvents,
            k = l.lastFrameIndex;
            if (y || _) {
                if (y && -1 === l.edge || _ && 1 === l.edge) continue;
                switch (y ? (Pt(h, [m], [v, g]), x && k > -1 && (Tt(h, p.eventType, Ht), l.lastFrameIndex = -1)) : (Pt(h, [v], [m, g]), x && d > k && (Tt(h, b.eventType, Ht), l.lastFrameIndex = d)), l.edge = y ? -1 : 1, l.edgeStrategy) {
                case "reset":
                    ot(h);
                    continue;
                case "ease":
                    u = w.frame;
                    break;
                default:
                case "set":
                    var C = w.props;
                    for (s in C) r.call(C, s) && (o = st(C[s].value), 0 === s.indexOf("@") ? h.setAttribute(s.substr(1), o) : a.setStyle(h, s, o));
                    continue
                }
            } else 0 !== l.edge && (Pt(h, [f, g], [m, v]), l.edge = 0);
            for (var T = 0; d - 1 > T; T++) if (u >= c[T].frame && u <= c[T + 1].frame) {
                var S = c[T],
                D = c[T + 1];
                for (s in S.props) if (r.call(S.props, s)) {
                    var M = (u - S.frame) / (D.frame - S.frame);
                    M = S.props[s].easing(M),
                    o = nt(S.props[s].value, D.props[s].value, M),
                    o = st(o),
                    0 === s.indexOf("@") ? h.setAttribute(s.substr(1), o) : a.setStyle(h, s, o)
                }
                x && k !== T && ("down" === Ht ? Tt(h, S.eventType, Ht) : Tt(h, D.eventType, Ht), l.lastFrameIndex = T);
                break
            }
        }
    },
    Z = function() {
        Rt && (Rt = !1, St());
        var t, e, n = rt.getScrollTop(),
        s = At();
        if (ft) s >= ft.endTime ? (n = ft.targetTop, t = ft.done, ft = i) : (e = ft.easing((s - ft.startTime) / ft.duration), n = ft.startTop + e * ft.topDiff | 0),
        rt.setScrollTop(n, !0);
        else if (!bt) {
            var o = vt.targetTop - n;
            o && (vt = {
                startTop: Ot,
                topDiff: n - Ot,
                targetTop: n,
                startTime: Wt,
                endTime: Wt + gt
            }),
            s <= vt.endTime && (e = K.sqrt((s - vt.startTime) / gt), n = vt.startTop + e * vt.topDiff | 0)
        }
        if (Vt && ht && a.setStyle(ht, "transform", "translate(0, " + -Ut + "px) " + _t), bt || Ot !== n) {
            Ht = n > Ot ? "down": Ot > n ? "up": Ht,
            bt = !1;
            var r = {
                curTop: n,
                lastTop: Ot,
                maxTop: Ft,
                direction: Ht
            },
            l = ut.beforerender && ut.beforerender.call(rt, r);
            l !== !1 && (Q(n, rt.getScrollTop()), Ot = n, ut.render && ut.render.call(rt, r)),
            t && t.call(rt, !1)
        }
        Wt = s
    },
    J = function(t) {
        for (var e = 0,
        i = t.keyFrames.length; i > e; e++) {
            for (var n, s, o, a, r = t.keyFrames[e], l = {}; null !== (a = F.exec(r.props));) o = a[1],
            s = a[2],
            n = o.match(z),
            null !== n ? (o = n[1], n = n[2]) : n = x,
            s = s.indexOf("!") ? tt(s) : [s.slice(1)],
            l[o] = {
                value: s,
                easing: K[n]
            };
            r.props = l
        }
    },
    tt = function(t) {
        var e = [];
        return L.lastIndex = 0,
        t = t.replace(L,
        function(t) {
            return t.replace(W,
            function(t) {
                return t / 255 * 100 + "%"
            })
        }),
        V && (R.lastIndex = 0, t = t.replace(R,
        function(t) {
            return V + t
        })),
        t = t.replace(W,
        function(t) {
            return e.push( + t),
            "{?}"
        }),
        e.unshift(t),
        e
    },
    et = function(t) {
        var e, i, n = {};
        for (e = 0, i = t.keyFrames.length; i > e; e++) it(t.keyFrames[e], n);
        for (n = {},
        e = t.keyFrames.length - 1; e >= 0; e--) it(t.keyFrames[e], n)
    },
    it = function(t, e) {
        var i;
        for (i in e) r.call(t.props, i) || (t.props[i] = e[i]);
        for (i in t.props) e[i] = t.props[i]
    },
    nt = function(t, e, i) {
        var n, s = t.length;
        if (s !== e.length) throw "Can't interpolate between \"" + t[0] + '" and "' + e[0] + '"';
        var o = [t[0]];
        for (n = 1; s > n; n++) o[n] = t[n] + (e[n] - t[n]) * i;
        return o
    },
    st = function(t) {
        var e = 1;
        return B.lastIndex = 0,
        t[0].replace(B,
        function() {
            return t[e++]
        })
    },
    ot = function(t, e) {
        t = [].concat(t);
        for (var i, n, s = 0,
        o = t.length; o > s; s++) n = t[s],
        i = lt[n[E]],
        i && (e ? (n.style.cssText = i.dirtyStyleAttr, Pt(n, i.dirtyClassAttr)) : (i.dirtyStyleAttr = n.style.cssText, i.dirtyClassAttr = It(n), n.style.cssText = i.styleAttr, Pt(n, i.classAttr)))
    },
    at = function() {
        _t = "translateZ(0)",
        a.setStyle(ht, "transform", _t);
        var t = h(ht),
        e = t.getPropertyValue("transform"),
        i = t.getPropertyValue(V + "transform"),
        n = e && "none" !== e || i && "none" !== i;
        n || (_t = "")
    };
    a.setStyle = function(t, e, i) {
        var n = t.style;
        if (e = e.replace(H, O).replace("-", ""), "zIndex" === e) n[e] = isNaN(i) ? i: "" + (0 | i);
        else if ("float" === e) n.styleFloat = n.cssFloat = i;
        else try {
            $ && (n[$ + e.slice(0, 1).toUpperCase() + e.slice(1)] = i),
            n[e] = i
        } catch(s) {}
    };
    var rt, lt, ht, ut, ct, dt, pt, ft, mt, gt, vt, bt, yt, _t, wt, xt = a.addEvent = function(e, i, n) {
        var s = function(e) {
            return e = e || t.event,
            e.target || (e.target = e.srcElement),
            e.preventDefault || (e.preventDefault = function() {
                e.returnValue = !1,
                e.defaultPrevented = !0
            }),
            n.call(this, e)
        };
        i = i.split(" ");
        for (var o, a = 0,
        r = i.length; r > a; a++) o = i[a],
        e.addEventListener ? e.addEventListener(o, n, !1) : e.attachEvent("on" + o, s),
        qt.push({
            element: e,
            name: o,
            listener: n
        })
    },
    kt = a.removeEvent = function(t, e, i) {
        e = e.split(" ");
        for (var n = 0,
        s = e.length; s > n; n++) t.removeEventListener ? t.removeEventListener(e[n], i, !1) : t.detachEvent("on" + e[n], i)
    },
    Ct = function() {
        for (var t, e = 0,
        i = qt.length; i > e; e++) t = qt[e],
        kt(t.element, t.name, t.listener);
        qt = []
    },
    Tt = function(t, e, i) {
        ut.keyframe && ut.keyframe.call(rt, t, e, i)
    },
    St = function() {
        var t = rt.getScrollTop();
        Ft = 0,
        ct && !Vt && (o.style.height = ""),
        X(),
        ct && !Vt && (o.style.height = Ft + s.clientHeight + "px"),
        Vt ? rt.setScrollTop(l.min(rt.getScrollTop(), Ft)) : rt.setScrollTop(t, !0),
        bt = !0
    },
    Dt = function() {
        var t, e, i = s.clientHeight,
        n = {};
        for (t in dt) e = dt[t],
        "function" == typeof e ? e = e.call(rt) : /p$/.test(e) && (e = e.slice(0, -1) / 100 * i),
        n[t] = e;
        return n
    },
    Mt = function() {
        var t, e = 0;
        return ht && (e = l.max(ht.offsetHeight, ht.scrollHeight)),
        t = l.max(e, o.scrollHeight, o.offsetHeight, s.scrollHeight, s.offsetHeight, s.clientHeight),
        t - s.clientHeight
    },
    It = function(e) {
        var i = "className";
        return t.SVGElement && e instanceof t.SVGElement && (e = e[i], i = "baseVal"),
        e[i]
    },
    Pt = function(e, n, s) {
        var o = "className";
        if (t.SVGElement && e instanceof t.SVGElement && (e = e[o], o = "baseVal"), s === i) return void(e[o] = n);
        for (var a = e[o], r = 0, l = s.length; l > r; r++) a = jt(a).replace(jt(s[r]), " ");
        a = Et(a);
        for (var h = 0,
        u = n.length; u > h; h++) - 1 === jt(a).indexOf(jt(n[h])) && (a += " " + n[h]);
        e[o] = Et(a)
    },
    Et = function(t) {
        return t.replace(A, "")
    },
    jt = function(t) {
        return " " + t + " "
    },
    At = Date.now ||
    function() {
        return + new Date
    },
    Nt = function(t, e) {
        return t.frame - e.frame
    },
    Ft = 0,
    zt = 1,
    Ht = "down",
    Ot = -1,
    Wt = At(),
    Bt = 0,
    Lt = 0,
    Rt = !1,
    $t = 0,
    Vt = !1,
    Ut = 0,
    qt = [];
    "function" == typeof define && define.amd ? define([],
    function() {
        return a
    }) : "undefined" != typeof module && module.exports ? module.exports = a: t.skrollr = a
} (window, document);
var mejs = mejs || {};
mejs.version = "2.16.4",
mejs.meIndex = 0,
mejs.plugins = {
    silverlight: [{
        version: [3, 0],
        types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"]
    }],
    flash: [{
        version: [9, 0, 124],
        types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/youtube", "video/x-youtube", "application/x-mpegURL"]
    }],
    youtube: [{
        version: null,
        types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"]
    }],
    vimeo: [{
        version: null,
        types: ["video/vimeo", "video/x-vimeo"]
    }]
},
mejs.Utility = {
    encodeUrl: function(t) {
        return encodeURIComponent(t)
    },
    escapeHTML: function(t) {
        return t.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
    },
    absolutizeUrl: function(t) {
        var e = document.createElement("div");
        return e.innerHTML = '<a href="' + this.escapeHTML(t) + '">x</a>',
        e.firstChild.href
    },
    getScriptPath: function(t) {
        for (var e, i, n, s, o, a, r = 0,
        l = "",
        h = "",
        u = document.getElementsByTagName("script"), c = u.length, d = t.length; c > r; r++) {
            for (s = u[r].src, i = s.lastIndexOf("/"), i > -1 ? (a = s.substring(i + 1), o = s.substring(0, i + 1)) : (a = s, o = ""), e = 0; d > e; e++) if (h = t[e], n = a.indexOf(h), n > -1) {
                l = o;
                break
            }
            if ("" !== l) break
        }
        return l
    },
    secondsToTimeCode: function(t, e, i, n) {
        "undefined" == typeof i ? i = !1 : "undefined" == typeof n && (n = 25);
        var s = Math.floor(t / 3600) % 24,
        o = Math.floor(t / 60) % 60,
        a = Math.floor(t % 60),
        r = Math.floor((t % 1 * n).toFixed(3)),
        l = (e || s > 0 ? (10 > s ? "0" + s: s) + ":": "") + (10 > o ? "0" + o: o) + ":" + (10 > a ? "0" + a: a) + (i ? ":" + (10 > r ? "0" + r: r) : "");
        return l
    },
    timeCodeToSeconds: function(t, e, i, n) {
        "undefined" == typeof i ? i = !1 : "undefined" == typeof n && (n = 25);
        var s = t.split(":"),
        o = parseInt(s[0], 10),
        a = parseInt(s[1], 10),
        r = parseInt(s[2], 10),
        l = 0,
        h = 0;
        return i && (l = parseInt(s[3]) / n),
        h = 3600 * o + 60 * a + r + l
    },
    convertSMPTEtoSeconds: function(t) {
        if ("string" != typeof t) return ! 1;
        t = t.replace(",", ".");
        var e = 0,
        i = -1 != t.indexOf(".") ? t.split(".")[1].length: 0,
        n = 1;
        t = t.split(":").reverse();
        for (var s = 0; s < t.length; s++) n = 1,
        s > 0 && (n = Math.pow(60, s)),
        e += Number(t[s]) * n;
        return Number(e.toFixed(i))
    },
    removeSwf: function(t) {
        var e = document.getElementById(t);
        e && /object|embed/i.test(e.nodeName) && (mejs.MediaFeatures.isIE ? (e.style.display = "none",
        function() {
            4 == e.readyState ? mejs.Utility.removeObjectInIE(t) : setTimeout(arguments.callee, 10)
        } ()) : e.parentNode.removeChild(e))
    },
    removeObjectInIE: function(t) {
        var e = document.getElementById(t);
        if (e) {
            for (var i in e)"function" == typeof e[i] && (e[i] = null);
            e.parentNode.removeChild(e)
        }
    }
},
mejs.PluginDetector = {
    hasPluginVersion: function(t, e) {
        var i = this.plugins[t];
        return e[1] = e[1] || 0,
        e[2] = e[2] || 0,
        i[0] > e[0] || i[0] == e[0] && i[1] > e[1] || i[0] == e[0] && i[1] == e[1] && i[2] >= e[2] ? !0 : !1
    },
    nav: window.navigator,
    ua: window.navigator.userAgent.toLowerCase(),
    plugins: [],
    addPlugin: function(t, e, i, n, s) {
        this.plugins[t] = this.detectPlugin(e, i, n, s)
    },
    detectPlugin: function(t, e, i, n) {
        var s, o, a, r = [0, 0, 0];
        if ("undefined" != typeof this.nav.plugins && "object" == typeof this.nav.plugins[t]) {
            if (s = this.nav.plugins[t].description, s && ("undefined" == typeof this.nav.mimeTypes || !this.nav.mimeTypes[e] || this.nav.mimeTypes[e].enabledPlugin)) for (r = s.replace(t, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split("."), o = 0; o < r.length; o++) r[o] = parseInt(r[o].match(/\d+/), 10)
        } else if ("undefined" != typeof window.ActiveXObject) try {
            a = new ActiveXObject(i),
            a && (r = n(a))
        } catch(l) {}
        return r
    }
},
mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash",
function(t) {
    var e = [],
    i = t.GetVariable("$version");
    return i && (i = i.split(" ")[1].split(","), e = [parseInt(i[0], 10), parseInt(i[1], 10), parseInt(i[2], 10)]),
    e
}),
mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl",
function(t) {
    var e = [0, 0, 0, 0],
    i = function(t, e, i, n) {
        for (; t.isVersionSupported(e[0] + "." + e[1] + "." + e[2] + "." + e[3]);) e[i] += n;
        e[i] -= n
    };
    return i(t, e, 0, 1),
    i(t, e, 1, 1),
    i(t, e, 2, 1e4),
    i(t, e, 2, 1e3),
    i(t, e, 2, 100),
    i(t, e, 2, 10),
    i(t, e, 2, 1),
    i(t, e, 3, 1),
    e
}),
mejs.MediaFeatures = {
    init: function() {
        var t, e, i = this,
        n = document,
        s = mejs.PluginDetector.nav,
        o = mejs.PluginDetector.ua.toLowerCase(),
        a = ["source", "track", "audio", "video"];
        i.isiPad = null !== o.match(/ipad/i),
        i.isiPhone = null !== o.match(/iphone/i),
        i.isiOS = i.isiPhone || i.isiPad,
        i.isAndroid = null !== o.match(/android/i),
        i.isBustedAndroid = null !== o.match(/android 2\.[12]/),
        i.isBustedNativeHTTPS = "https:" === location.protocol && (null !== o.match(/android [12]\./) || null !== o.match(/macintosh.* version.* safari/)),
        i.isIE = -1 != s.appName.toLowerCase().indexOf("microsoft") || null !== s.appName.toLowerCase().match(/trident/gi),
        i.isChrome = null !== o.match(/chrome/gi),
        i.isChromium = null !== o.match(/chromium/gi),
        i.isFirefox = null !== o.match(/firefox/gi),
        i.isWebkit = null !== o.match(/webkit/gi),
        i.isGecko = null !== o.match(/gecko/gi) && !i.isWebkit && !i.isIE,
        i.isOpera = null !== o.match(/opera/gi),
        i.hasTouch = "ontouchstart" in window,
        i.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
        for (t = 0; t < a.length; t++) e = document.createElement(a[t]);
        i.supportsMediaTag = "undefined" != typeof e.canPlayType || i.isBustedAndroid;
        try {
            e.canPlayType("video/mp4")
        } catch(r) {
            i.supportsMediaTag = !1
        }
        i.hasSemiNativeFullScreen = "undefined" != typeof e.webkitEnterFullscreen,
        i.hasNativeFullscreen = "undefined" != typeof e.requestFullscreen,
        i.hasWebkitNativeFullScreen = "undefined" != typeof e.webkitRequestFullScreen,
        i.hasMozNativeFullScreen = "undefined" != typeof e.mozRequestFullScreen,
        i.hasMsNativeFullScreen = "undefined" != typeof e.msRequestFullscreen,
        i.hasTrueNativeFullScreen = i.hasWebkitNativeFullScreen || i.hasMozNativeFullScreen || i.hasMsNativeFullScreen,
        i.nativeFullScreenEnabled = i.hasTrueNativeFullScreen,
        i.hasMozNativeFullScreen ? i.nativeFullScreenEnabled = document.mozFullScreenEnabled: i.hasMsNativeFullScreen && (i.nativeFullScreenEnabled = document.msFullscreenEnabled),
        i.isChrome && (i.hasSemiNativeFullScreen = !1),
        i.hasTrueNativeFullScreen && (i.fullScreenEventName = "", i.hasWebkitNativeFullScreen ? i.fullScreenEventName = "webkitfullscreenchange": i.hasMozNativeFullScreen ? i.fullScreenEventName = "mozfullscreenchange": i.hasMsNativeFullScreen && (i.fullScreenEventName = "MSFullscreenChange"), i.isFullScreen = function() {
            return i.hasMozNativeFullScreen ? n.mozFullScreen: i.hasWebkitNativeFullScreen ? n.webkitIsFullScreen: i.hasMsNativeFullScreen ? null !== n.msFullscreenElement: void 0
        },
        i.requestFullScreen = function(t) {
            i.hasWebkitNativeFullScreen ? t.webkitRequestFullScreen() : i.hasMozNativeFullScreen ? t.mozRequestFullScreen() : i.hasMsNativeFullScreen && t.msRequestFullscreen()
        },
        i.cancelFullScreen = function() {
            i.hasWebkitNativeFullScreen ? document.webkitCancelFullScreen() : i.hasMozNativeFullScreen ? document.mozCancelFullScreen() : i.hasMsNativeFullScreen && document.msExitFullscreen()
        }),
        i.hasSemiNativeFullScreen && o.match(/mac os x 10_5/i) && (i.hasNativeFullScreen = !1, i.hasSemiNativeFullScreen = !1)
    }
},
mejs.MediaFeatures.init(),
mejs.HtmlMediaElement = {
    pluginType: "native",
    isFullScreen: !1,
    setCurrentTime: function(t) {
        this.currentTime = t
    },
    setMuted: function(t) {
        this.muted = t
    },
    setVolume: function(t) {
        this.volume = t
    },
    stop: function() {
        this.pause()
    },
    setSrc: function(t) {
        for (var e = this.getElementsByTagName("source"); e.length > 0;) this.removeChild(e[0]);
        if ("string" == typeof t) this.src = t;
        else {
            var i, n;
            for (i = 0; i < t.length; i++) if (n = t[i], this.canPlayType(n.type)) {
                this.src = n.src;
                break
            }
        }
    },
    setVideoSize: function(t, e) {
        this.width = t,
        this.height = e
    }
},
mejs.PluginMediaElement = function(t, e, i) {
    this.id = t,
    this.pluginType = e,
    this.src = i,
    this.events = {},
    this.attributes = {}
},
mejs.PluginMediaElement.prototype = {
    pluginElement: null,
    pluginType: "",
    isFullScreen: !1,
    playbackRate: -1,
    defaultPlaybackRate: -1,
    seekable: [],
    played: [],
    paused: !0,
    ended: !1,
    seeking: !1,
    duration: 0,
    error: null,
    tagName: "",
    muted: !1,
    volume: 1,
    currentTime: 0,
    play: function() {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.playVideo() : this.pluginApi.playMedia(), this.paused = !1)
    },
    load: function() {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType || this.pluginApi.loadMedia(), this.paused = !1)
    },
    pause: function() {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.pauseVideo() : this.pluginApi.pauseMedia(), this.paused = !0)
    },
    stop: function() {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.stopVideo() : this.pluginApi.stopMedia(), this.paused = !0)
    },
    canPlayType: function(t) {
        var e, i, n, s = mejs.plugins[this.pluginType];
        for (e = 0; e < s.length; e++) if (n = s[e], mejs.PluginDetector.hasPluginVersion(this.pluginType, n.version)) for (i = 0; i < n.types.length; i++) if (t == n.types[i]) return "probably";
        return ""
    },
    positionFullscreenButton: function(t, e, i) {
        null != this.pluginApi && this.pluginApi.positionFullscreenButton && this.pluginApi.positionFullscreenButton(Math.floor(t), Math.floor(e), i)
    },
    hideFullscreenButton: function() {
        null != this.pluginApi && this.pluginApi.hideFullscreenButton && this.pluginApi.hideFullscreenButton()
    },
    setSrc: function(t) {
        if ("string" == typeof t) this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(t)),
        this.src = mejs.Utility.absolutizeUrl(t);
        else {
            var e, i;
            for (e = 0; e < t.length; e++) if (i = t[e], this.canPlayType(i.type)) {
                this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(i.src)),
                this.src = mejs.Utility.absolutizeUrl(t);
                break
            }
        }
    },
    setCurrentTime: function(t) {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.seekTo(t) : this.pluginApi.setCurrentTime(t), this.currentTime = t)
    },
    setVolume: function(t) {
        null != this.pluginApi && (this.pluginApi.setVolume("youtube" == this.pluginType ? 100 * t: t), this.volume = t)
    },
    setMuted: function(t) {
        null != this.pluginApi && ("youtube" == this.pluginType ? (t ? this.pluginApi.mute() : this.pluginApi.unMute(), this.muted = t, this.dispatchEvent("volumechange")) : this.pluginApi.setMuted(t), this.muted = t)
    },
    setVideoSize: function(t, e) {
        this.pluginElement && this.pluginElement.style && (this.pluginElement.style.width = t + "px", this.pluginElement.style.height = e + "px"),
        null != this.pluginApi && this.pluginApi.setVideoSize && this.pluginApi.setVideoSize(t, e)
    },
    setFullscreen: function(t) {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.pluginApi.setFullscreen(t)
    },
    enterFullScreen: function() {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!0)
    },
    exitFullScreen: function() {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!1)
    },
    addEventListener: function(t, e, i) {
        this.events[t] = this.events[t] || [],
        this.events[t].push(e)
    },
    removeEventListener: function(t, e) {
        if (!t) return this.events = {},
        !0;
        var i = this.events[t];
        if (!i) return ! 0;
        if (!e) return this.events[t] = [],
        !0;
        for (var n = 0; n < i.length; n++) if (i[n] === e) return this.events[t].splice(n, 1),
        !0;
        return ! 1
    },
    dispatchEvent: function(t) {
        var e, i, n = this.events[t];
        if (n) for (i = Array.prototype.slice.call(arguments, 1), e = 0; e < n.length; e++) n[e].apply(this, i)
    },
    hasAttribute: function(t) {
        return t in this.attributes
    },
    removeAttribute: function(t) {
        delete this.attributes[t]
    },
    getAttribute: function(t) {
        return this.hasAttribute(t) ? this.attributes[t] : ""
    },
    setAttribute: function(t, e) {
        this.attributes[t] = e
    },
    remove: function() {
        mejs.Utility.removeSwf(this.pluginElement.id),
        mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id)
    }
},
mejs.MediaPluginBridge = {
    pluginMediaElements: {},
    htmlMediaElements: {},
    registerPluginElement: function(t, e, i) {
        this.pluginMediaElements[t] = e,
        this.htmlMediaElements[t] = i
    },
    unregisterPluginElement: function(t) {
        delete this.pluginMediaElements[t],
        delete this.htmlMediaElements[t]
    },
    initPlugin: function(t) {
        var e = this.pluginMediaElements[t],
        i = this.htmlMediaElements[t];
        if (e) {
            switch (e.pluginType) {
            case "flash":
                e.pluginElement = e.pluginApi = document.getElementById(t);
                break;
            case "silverlight":
                e.pluginElement = document.getElementById(e.id),
                e.pluginApi = e.pluginElement.Content.MediaElementJS
            }
            null != e.pluginApi && e.success && e.success(e, i)
        }
    },
    fireEvent: function(t, e, i) {
        var n, s, o, a = this.pluginMediaElements[t];
        if (a) {
            n = {
                type: e,
                target: a
            };
            for (s in i) a[s] = i[s],
            n[s] = i[s];
            o = i.bufferedTime || 0,
            n.target.buffered = n.buffered = {
                start: function(t) {
                    return 0
                },
                end: function(t) {
                    return o
                },
                length: 1
            },
            a.dispatchEvent(n.type, n)
        }
    }
},
mejs.MediaElementDefaults = {
    mode: "auto",
    plugins: ["flash", "silverlight", "youtube", "vimeo"],
    enablePluginDebug: !1,
    httpsBasicAuthSite: !1,
    type: "",
    pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
    flashName: "flashmediaelement.swf",
    flashStreamer: "",
    enablePluginSmoothing: !1,
    enablePseudoStreaming: !1,
    pseudoStreamingStartQueryParam: "start",
    silverlightName: "silverlightmediaelement.xap",
    defaultVideoWidth: 480,
    defaultVideoHeight: 270,
    pluginWidth: -1,
    pluginHeight: -1,
    pluginVars: [],
    timerRate: 250,
    startVolume: .8,
    success: function() {},
    error: function() {}
},
mejs.MediaElement = function(t, e) {
    return mejs.HtmlMediaElementShim.create(t, e)
},
mejs.HtmlMediaElementShim = {
    create: function(t, e) {
        var i, n, s = mejs.MediaElementDefaults,
        o = "string" == typeof t ? document.getElementById(t) : t,
        a = o.tagName.toLowerCase(),
        r = "audio" === a || "video" === a,
        l = o.getAttribute(r ? "src": "href"),
        h = o.getAttribute("poster"),
        u = o.getAttribute("autoplay"),
        c = o.getAttribute("preload"),
        d = o.getAttribute("controls");
        for (n in e) s[n] = e[n];
        return l = "undefined" == typeof l || null === l || "" == l ? null: l,
        h = "undefined" == typeof h || null === h ? "": h,
        c = "undefined" == typeof c || null === c || "false" === c ? "none": c,
        u = !("undefined" == typeof u || null === u || "false" === u),
        d = !("undefined" == typeof d || null === d || "false" === d),
        i = this.determinePlayback(o, s, mejs.MediaFeatures.supportsMediaTag, r, l),
        i.url = null !== i.url ? mejs.Utility.absolutizeUrl(i.url) : "",
        "native" == i.method ? (mejs.MediaFeatures.isBustedAndroid && (o.src = i.url, o.addEventListener("click",
        function() {
            o.play()
        },
        !1)), this.updateNative(i, s, u, c)) : "" !== i.method ? this.createPlugin(i, s, h, u, c, d) : (this.createErrorMessage(i, s, h), this)
    },
    determinePlayback: function(t, e, i, n, s) {
        var o, a, r, l, h, u, c, d, p, f, m, g = [],
        v = {
            method: "",
            url: "",
            htmlMediaElement: t,
            isVideo: "audio" != t.tagName.toLowerCase()
        };
        if ("undefined" != typeof e.type && "" !== e.type) if ("string" == typeof e.type) g.push({
            type: e.type,
            url: s
        });
        else for (o = 0; o < e.type.length; o++) g.push({
            type: e.type[o],
            url: s
        });
        else if (null !== s) u = this.formatType(s, t.getAttribute("type")),
        g.push({
            type: u,
            url: s
        });
        else for (o = 0; o < t.childNodes.length; o++) h = t.childNodes[o],
        1 == h.nodeType && "source" == h.tagName.toLowerCase() && (s = h.getAttribute("src"), u = this.formatType(s, h.getAttribute("type")), m = h.getAttribute("media"), (!m || !window.matchMedia || window.matchMedia && window.matchMedia(m).matches) && g.push({
            type: u,
            url: s
        }));
        if (!n && g.length > 0 && null !== g[0].url && this.getTypeFromFile(g[0].url).indexOf("audio") > -1 && (v.isVideo = !1), mejs.MediaFeatures.isBustedAndroid && (t.canPlayType = function(t) {
            return null !== t.match(/video\/(mp4|m4v)/gi) ? "maybe": ""
        }), mejs.MediaFeatures.isChromium && (t.canPlayType = function(t) {
            return null !== t.match(/video\/(webm|ogv|ogg)/gi) ? "maybe": ""
        }), !(!i || "auto" !== e.mode && "auto_plugin" !== e.mode && "native" !== e.mode || mejs.MediaFeatures.isBustedNativeHTTPS && e.httpsBasicAuthSite === !0)) {
            for (n || (f = document.createElement(v.isVideo ? "video": "audio"), t.parentNode.insertBefore(f, t), t.style.display = "none", v.htmlMediaElement = t = f), o = 0; o < g.length; o++) if ("video/m3u8" == g[o].type || "" !== t.canPlayType(g[o].type).replace(/no/, "") || "" !== t.canPlayType(g[o].type.replace(/mp3/, "mpeg")).replace(/no/, "") || "" !== t.canPlayType(g[o].type.replace(/m4a/, "mp4")).replace(/no/, "")) {
                v.method = "native",
                v.url = g[o].url;
                break
            }
            if ("native" === v.method && (null !== v.url && (t.src = v.url), "auto_plugin" !== e.mode)) return v
        }
        if ("auto" === e.mode || "auto_plugin" === e.mode || "shim" === e.mode) for (o = 0; o < g.length; o++) for (u = g[o].type, a = 0; a < e.plugins.length; a++) for (c = e.plugins[a], d = mejs.plugins[c], r = 0; r < d.length; r++) if (p = d[r], null == p.version || mejs.PluginDetector.hasPluginVersion(c, p.version)) for (l = 0; l < p.types.length; l++) if (u == p.types[l]) return v.method = c,
        v.url = g[o].url,
        v;
        return "auto_plugin" === e.mode && "native" === v.method ? v: ("" === v.method && g.length > 0 && (v.url = g[0].url), v)
    },
    formatType: function(t, e) {
        return t && !e ? this.getTypeFromFile(t) : e && ~e.indexOf(";") ? e.substr(0, e.indexOf(";")) : e
    },
    getTypeFromFile: function(t) {
        t = t.split("?")[0];
        var e = t.substring(t.lastIndexOf(".") + 1).toLowerCase();
        return (/(mp4|m4v|ogg|ogv|m3u8|webm|webmv|flv|wmv|mpeg|mov)/gi.test(e) ? "video": "audio") + "/" + this.getTypeFromExtension(e)
    },
    getTypeFromExtension: function(t) {
        switch (t) {
        case "mp4":
        case "m4v":
        case "m4a":
            return "mp4";
        case "webm":
        case "webma":
        case "webmv":
            return "webm";
        case "ogg":
        case "oga":
        case "ogv":
            return "ogg";
        default:
            return t
        }
    },
    createErrorMessage: function(t, e, i) {
        var n = t.htmlMediaElement,
        s = document.createElement("div");
        s.className = "me-cannotplay";
        try {
            s.style.width = n.width + "px",
            s.style.height = n.height + "px"
        } catch(o) {}
        s.innerHTML = e.customError ? e.customError: "" !== i ? '<a href="' + t.url + '"><img src="' + i + '" width="100%" height="100%" /></a>': '<a href="' + t.url + '"><span>' + mejs.i18n.t("Download File") + "</span></a>",
        n.parentNode.insertBefore(s, n),
        n.style.display = "none",
        e.error(n)
    },
    createPlugin: function(t, e, i, n, s, o) {
        var a, r, l, h = t.htmlMediaElement,
        u = 1,
        c = 1,
        d = "me_" + t.method + "_" + mejs.meIndex++,
        p = new mejs.PluginMediaElement(d, t.method, t.url),
        f = document.createElement("div");
        p.tagName = h.tagName;
        for (var m = 0; m < h.attributes.length; m++) {
            var g = h.attributes[m];
            1 == g.specified && p.setAttribute(g.name, g.value)
        }
        for (r = h.parentNode; null !== r && "body" !== r.tagName.toLowerCase() && null != r.parentNode;) {
            if ("p" === r.parentNode.tagName.toLowerCase()) {
                r.parentNode.parentNode.insertBefore(r, r.parentNode);
                break
            }
            r = r.parentNode
        }
        switch (t.isVideo ? (u = e.pluginWidth > 0 ? e.pluginWidth: e.videoWidth > 0 ? e.videoWidth: null !== h.getAttribute("width") ? h.getAttribute("width") : e.defaultVideoWidth, c = e.pluginHeight > 0 ? e.pluginHeight: e.videoHeight > 0 ? e.videoHeight: null !== h.getAttribute("height") ? h.getAttribute("height") : e.defaultVideoHeight, u = mejs.Utility.encodeUrl(u), c = mejs.Utility.encodeUrl(c)) : e.enablePluginDebug && (u = 320, c = 240), p.success = e.success, mejs.MediaPluginBridge.registerPluginElement(d, p, h), f.className = "me-plugin", f.id = d + "_container", t.isVideo ? h.parentNode.insertBefore(f, h) : document.body.insertBefore(f, document.body.childNodes[0]), l = ["id=" + d, "jsinitfunction=mejs.MediaPluginBridge.initPlugin", "jscallbackfunction=mejs.MediaPluginBridge.fireEvent", "isvideo=" + (t.isVideo ? "true": "false"), "autoplay=" + (n ? "true": "false"), "preload=" + s, "width=" + u, "startvolume=" + e.startVolume, "timerrate=" + e.timerRate, "flashstreamer=" + e.flashStreamer, "height=" + c, "pseudostreamstart=" + e.pseudoStreamingStartQueryParam], null !== t.url && l.push("flash" == t.method ? "file=" + mejs.Utility.encodeUrl(t.url) : "file=" + t.url), e.enablePluginDebug && l.push("debug=true"), e.enablePluginSmoothing && l.push("smoothing=true"), e.enablePseudoStreaming && l.push("pseudostreaming=true"), o && l.push("controls=true"), e.pluginVars && (l = l.concat(e.pluginVars)), t.method) {
        case "silverlight":
            f.innerHTML = '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + d + '" name="' + d + '" width="' + u + '" height="' + c + '" class="mejs-shim"><param name="initParams" value="' + l.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + e.pluginPath + e.silverlightName + '" /></object>';
            break;
        case "flash":
            mejs.MediaFeatures.isIE ? (a = document.createElement("div"), f.appendChild(a), a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + d + '" width="' + u + '" height="' + c + '" class="mejs-shim"><param name="movie" value="' + e.pluginPath + e.flashName + "?x=" + new Date + '" /><param name="flashvars" value="' + l.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="scale" value="default" /></object>') : f.innerHTML = '<embed id="' + d + '" name="' + d + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + e.pluginPath + e.flashName + '" flashvars="' + l.join("&") + '" width="' + u + '" height="' + c + '" scale="default"class="mejs-shim"></embed>';
            break;
        case "youtube":
            var v; - 1 != t.url.lastIndexOf("youtu.be") ? (v = t.url.substr(t.url.lastIndexOf("/") + 1), -1 != v.indexOf("?") && (v = v.substr(0, v.indexOf("?")))) : v = t.url.substr(t.url.lastIndexOf("=") + 1),
            youtubeSettings = {
                container: f,
                containerId: f.id,
                pluginMediaElement: p,
                pluginId: d,
                videoId: v,
                height: c,
                width: u
            },
            mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) ? mejs.YouTubeApi.createFlash(youtubeSettings) : mejs.YouTubeApi.enqueueIframe(youtubeSettings);
            break;
        case "vimeo":
            var b = d + "_player";
            if (p.vimeoid = t.url.substr(t.url.lastIndexOf("/") + 1), f.innerHTML = '<iframe src="//player.vimeo.com/video/' + p.vimeoid + "?api=1&portrait=0&byline=0&title=0&player_id=" + b + '" width="' + u + '" height="' + c + '" frameborder="0" class="mejs-shim" id="' + b + '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>', "function" == typeof $f) {
                var y = $f(f.childNodes[0]);
                y.addEvent("ready",
                function() {
                    function t(t, e, i, n) {
                        var s = {
                            type: i,
                            target: e
                        };
                        "timeupdate" == i && (e.currentTime = s.currentTime = n.seconds, e.duration = s.duration = n.duration),
                        e.dispatchEvent(s.type, s)
                    }
                    y.playVideo = function() {
                        y.api("play")
                    },
                    y.stopVideo = function() {
                        y.api("unload")
                    },
                    y.pauseVideo = function() {
                        y.api("pause")
                    },
                    y.seekTo = function(t) {
                        y.api("seekTo", t)
                    },
                    y.setVolume = function(t) {
                        y.api("setVolume", t)
                    },
                    y.setMuted = function(t) {
                        t ? (y.lastVolume = y.api("getVolume"), y.api("setVolume", 0)) : (y.api("setVolume", y.lastVolume), delete y.lastVolume)
                    },
                    y.addEvent("play",
                    function() {
                        t(y, p, "play"),
                        t(y, p, "playing")
                    }),
                    y.addEvent("pause",
                    function() {
                        t(y, p, "pause")
                    }),
                    y.addEvent("finish",
                    function() {
                        t(y, p, "ended")
                    }),
                    y.addEvent("playProgress",
                    function(e) {
                        t(y, p, "timeupdate", e)
                    }),
                    p.pluginElement = f,
                    p.pluginApi = y,
                    mejs.MediaPluginBridge.initPlugin(d)
                })
            } else console.warn("You need to include froogaloop for vimeo to work")
        }
        return h.style.display = "none",
        h.removeAttribute("autoplay"),
        p
    },
    updateNative: function(t, e, i, n) {
        var s, o = t.htmlMediaElement;
        for (s in mejs.HtmlMediaElement) o[s] = mejs.HtmlMediaElement[s];
        return e.success(o, o),
        o
    }
},
mejs.YouTubeApi = {
    isIframeStarted: !1,
    isIframeLoaded: !1,
    loadIframeApi: function() {
        if (!this.isIframeStarted) {
            var t = document.createElement("script");
            t.src = "//www.youtube.com/player_api";
            var e = document.getElementsByTagName("script")[0];
            e.parentNode.insertBefore(t, e),
            this.isIframeStarted = !0
        }
    },
    iframeQueue: [],
    enqueueIframe: function(t) {
        this.isLoaded ? this.createIframe(t) : (this.loadIframeApi(), this.iframeQueue.push(t))
    },
    createIframe: function(t) {
        var e = t.pluginMediaElement,
        i = new YT.Player(t.containerId, {
            height: t.height,
            width: t.width,
            videoId: t.videoId,
            playerVars: {
                controls: 0
            },
            events: {
                onReady: function() {
                    t.pluginMediaElement.pluginApi = i,
                    mejs.MediaPluginBridge.initPlugin(t.pluginId),
                    setInterval(function() {
                        mejs.YouTubeApi.createEvent(i, e, "timeupdate")
                    },
                    250)
                },
                onStateChange: function(t) {
                    mejs.YouTubeApi.handleStateChange(t.data, i, e)
                }
            }
        })
    },
    createEvent: function(t, e, i) {
        var n = {
            type: i,
            target: e
        };
        if (t && t.getDuration) {
            e.currentTime = n.currentTime = t.getCurrentTime(),
            e.duration = n.duration = t.getDuration(),
            n.paused = e.paused,
            n.ended = e.ended,
            n.muted = t.isMuted(),
            n.volume = t.getVolume() / 100,
            n.bytesTotal = t.getVideoBytesTotal(),
            n.bufferedBytes = t.getVideoBytesLoaded();
            var s = n.bufferedBytes / n.bytesTotal * n.duration;
            n.target.buffered = n.buffered = {
                start: function(t) {
                    return 0
                },
                end: function(t) {
                    return s
                },
                length: 1
            }
        }
        e.dispatchEvent(n.type, n)
    },
    iFrameReady: function() {
        for (this.isLoaded = !0, this.isIframeLoaded = !0; this.iframeQueue.length > 0;) {
            var t = this.iframeQueue.pop();
            this.createIframe(t)
        }
    },
    flashPlayers: {},
    createFlash: function(t) {
        this.flashPlayers[t.pluginId] = t;
        var e, i = "//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + t.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
        mejs.MediaFeatures.isIE ? (e = document.createElement("div"), t.container.appendChild(e), e.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + t.pluginId + '" width="' + t.width + '" height="' + t.height + '" class="mejs-shim"><param name="movie" value="' + i + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>') : t.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + t.pluginId + '" data="' + i + '" width="' + t.width + '" height="' + t.height + '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"></object>'
    },
    flashReady: function(t) {
        var e = this.flashPlayers[t],
        i = document.getElementById(t),
        n = e.pluginMediaElement;
        n.pluginApi = n.pluginElement = i,
        mejs.MediaPluginBridge.initPlugin(t),
        i.cueVideoById(e.videoId);
        var s = e.containerId + "_callback";
        window[s] = function(t) {
            mejs.YouTubeApi.handleStateChange(t, i, n)
        },
        i.addEventListener("onStateChange", s),
        setInterval(function() {
            mejs.YouTubeApi.createEvent(i, n, "timeupdate")
        },
        250),
        mejs.YouTubeApi.createEvent(i, n, "canplay")
    },
    handleStateChange: function(t, e, i) {
        switch (t) {
        case - 1 : i.paused = !0,
            i.ended = !0,
            mejs.YouTubeApi.createEvent(e, i, "loadedmetadata");
            break;
        case 0:
            i.paused = !1,
            i.ended = !0,
            mejs.YouTubeApi.createEvent(e, i, "ended");
            break;
        case 1:
            i.paused = !1,
            i.ended = !1,
            mejs.YouTubeApi.createEvent(e, i, "play"),
            mejs.YouTubeApi.createEvent(e, i, "playing");
            break;
        case 2:
            i.paused = !0,
            i.ended = !1,
            mejs.YouTubeApi.createEvent(e, i, "pause");
            break;
        case 3:
            mejs.YouTubeApi.createEvent(e, i, "progress");
            break;
        case 5:
        }
    }
},
window.mejs = mejs,
window.MediaElement = mejs.MediaElement,
function(t, e, i) {
    "use strict";
    var n = {
        locale: {
            language: e.i18n && e.i18n.locale.language || "",
            strings: e.i18n && e.i18n.locale.strings || {}
        },
        ietf_lang_regex: /^(x\-)?[a-z]{2,}(\-\w{2,})?(\-\w{2,})?$/,
        methods: {}
    };
    n.getLanguage = function() {
        var t = n.locale.language || window.navigator.userLanguage || window.navigator.language;
        return n.ietf_lang_regex.exec(t) ? t: null
    },
    "undefined" != typeof mejsL10n && (n.locale.language = mejsL10n.language),
    n.methods.checkPlain = function(t) {
        var e, i, n = {
            "&": "&amp;",
            '"': "&quot;",
            "<": "&lt;",
            ">": "&gt;"
        };
        t = String(t);
        for (e in n) n.hasOwnProperty(e) && (i = new RegExp(e, "g"), t = t.replace(i, n[e]));
        return t
    },
    n.methods.t = function(t, e) {
        return n.locale.strings && n.locale.strings[e.context] && n.locale.strings[e.context][t] && (t = n.locale.strings[e.context][t]),
        n.methods.checkPlain(t)
    },
    n.t = function(t, e) {
        if ("string" == typeof t && t.length > 0) {
            var i = n.getLanguage();
            return e = e || {
                context: i
            },
            n.methods.t(t, e)
        }
        throw {
            name: "InvalidArgumentException",
            message: "First argument is either not a string or empty."
        }
    },
    e.i18n = n
} (document, mejs),
function(t, e) {
    "use strict";
    "undefined" != typeof mejsL10n && (t[mejsL10n.language] = mejsL10n.strings)
} (mejs.i18n.locale.strings),
"undefined" != typeof jQuery ? mejs.$ = jQuery: "undefined" != typeof ender && (mejs.$ = ender),
function(t) {
    mejs.MepDefaults = {
        poster: "",
        showPosterWhenEnded: !1,
        defaultVideoWidth: 480,
        defaultVideoHeight: 270,
        videoWidth: -1,
        videoHeight: -1,
        defaultAudioWidth: 400,
        defaultAudioHeight: 30,
        defaultSeekBackwardInterval: function(t) {
            return.05 * t.duration
        },
        defaultSeekForwardInterval: function(t) {
            return.05 * t.duration
        },
        setDimensions: !0,
        audioWidth: -1,
        audioHeight: -1,
        startVolume: .8,
        loop: !1,
        autoRewind: !0,
        enableAutosize: !0,
        alwaysShowHours: !1,
        showTimecodeFrameCount: !1,
        framesPerSecond: 25,
        autosizeProgress: !0,
        alwaysShowControls: !1,
        hideVideoControlsOnLoad: !1,
        clickToPlayPause: !0,
        iPadUseNativeControls: !1,
        iPhoneUseNativeControls: !1,
        AndroidUseNativeControls: !1,
        features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
        isVideo: !0,
        enableKeyboard: !0,
        pauseOtherPlayers: !0,
        keyActions: [{
            keys: [32, 179],
            action: function(t, e) {
                e.paused || e.ended ? t.play() : t.pause()
            }
        },
        {
            keys: [38],
            action: function(t, e) {
                t.container.find(".mejs-volume-slider").css("display", "block"),
                t.isVideo && (t.showControls(), t.startControlsTimer());
                var i = Math.min(e.volume + .1, 1);
                e.setVolume(i)
            }
        },
        {
            keys: [40],
            action: function(t, e) {
                t.container.find(".mejs-volume-slider").css("display", "block"),
                t.isVideo && (t.showControls(), t.startControlsTimer());
                var i = Math.max(e.volume - .1, 0);
                e.setVolume(i)
            }
        },
        {
            keys: [37, 227],
            action: function(t, e) {
                if (!isNaN(e.duration) && e.duration > 0) {
                    t.isVideo && (t.showControls(), t.startControlsTimer());
                    var i = Math.max(e.currentTime - t.options.defaultSeekBackwardInterval(e), 0);
                    e.setCurrentTime(i)
                }
            }
        },
        {
            keys: [39, 228],
            action: function(t, e) {
                if (!isNaN(e.duration) && e.duration > 0) {
                    t.isVideo && (t.showControls(), t.startControlsTimer());
                    var i = Math.min(e.currentTime + t.options.defaultSeekForwardInterval(e), e.duration);
                    e.setCurrentTime(i)
                }
            }
        },
        {
            keys: [70],
            action: function(t, e) {
                "undefined" != typeof t.enterFullScreen && (t.isFullScreen ? t.exitFullScreen() : t.enterFullScreen())
            }
        },
        {
            keys: [77],
            action: function(t, e) {
                t.container.find(".mejs-volume-slider").css("display", "block"),
                t.isVideo && (t.showControls(), t.startControlsTimer()),
                t.setMuted(t.media.muted ? !1 : !0)
            }
        }]
    },
    mejs.mepIndex = 0,
    mejs.players = {},
    mejs.MediaElementPlayer = function(e, i) {
        if (! (this instanceof mejs.MediaElementPlayer)) return new mejs.MediaElementPlayer(e, i);
        var n = this;
        return n.$media = n.$node = t(e),
        n.node = n.media = n.$media[0],
        "undefined" != typeof n.node.player ? n.node.player: (n.node.player = n, "undefined" == typeof i && (i = n.$node.data("mejsoptions")), n.options = t.extend({},
        mejs.MepDefaults, i), n.id = "mep_" + mejs.mepIndex++, mejs.players[n.id] = n, n.init(), n)
    },
    mejs.MediaElementPlayer.prototype = {
        hasFocus: !1,
        controlsAreVisible: !0,
        init: function() {
            var e = this,
            i = mejs.MediaFeatures,
            n = t.extend(!0, {},
            e.options, {
                success: function(t, i) {
                    e.meReady(t, i)
                },
                error: function(t) {
                    e.handleError(t)
                }
            }),
            s = e.media.tagName.toLowerCase();
            if (e.isDynamic = "audio" !== s && "video" !== s, e.isVideo = e.isDynamic ? e.options.isVideo: "audio" !== s && e.options.isVideo, i.isiPad && e.options.iPadUseNativeControls || i.isiPhone && e.options.iPhoneUseNativeControls) e.$media.attr("controls", "controls"),
            i.isiPad && null !== e.media.getAttribute("autoplay") && e.play();
            else if (i.isAndroid && e.options.AndroidUseNativeControls);
            else {
                e.$media.removeAttr("controls");
                var o = mejs.i18n.t(e.isVideo ? "Video Player": "Audio Player");
                if (t('<span class="mejs-offscreen">' + o + "</span>").insertBefore(e.$media), e.container = t('<div id="' + e.id + '" class="mejs-container ' + (mejs.MediaFeatures.svg ? "svg": "no-svg") + '" tabindex="0" role="application" aria-label="' + o + '"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>').addClass(e.$media[0].className).insertBefore(e.$media).focus(function(t) {
                    if (!e.controlsAreVisible) {
                        e.showControls(!0);
                        var i = e.container.find(".mejs-playpause-button > button");
                        i.focus()
                    }
                }), e.container.addClass((i.isAndroid ? "mejs-android ": "") + (i.isiOS ? "mejs-ios ": "") + (i.isiPad ? "mejs-ipad ": "") + (i.isiPhone ? "mejs-iphone ": "") + (e.isVideo ? "mejs-video ": "mejs-audio ")), i.isiOS) {
                    var a = e.$media.clone();
                    e.container.find(".mejs-mediaelement").append(a),
                    e.$media.remove(),
                    e.$node = e.$media = a,
                    e.node = e.media = a[0]
                } else e.container.find(".mejs-mediaelement").append(e.$media);
                e.controls = e.container.find(".mejs-controls"),
                e.layers = e.container.find(".mejs-layers");
                var r = e.isVideo ? "video": "audio",
                l = r.substring(0, 1).toUpperCase() + r.substring(1);
                e.width = e.options[r + "Width"] > 0 || e.options[r + "Width"].toString().indexOf("%") > -1 ? e.options[r + "Width"] : "" !== e.media.style.width && null !== e.media.style.width ? e.media.style.width: null !== e.media.getAttribute("width") ? e.$media.attr("width") : e.options["default" + l + "Width"],
                e.height = e.options[r + "Height"] > 0 || e.options[r + "Height"].toString().indexOf("%") > -1 ? e.options[r + "Height"] : "" !== e.media.style.height && null !== e.media.style.height ? e.media.style.height: null !== e.$media[0].getAttribute("height") ? e.$media.attr("height") : e.options["default" + l + "Height"],
                e.setPlayerSize(e.width, e.height),
                n.pluginWidth = e.width,
                n.pluginHeight = e.height
            }
            mejs.MediaElement(e.$media[0], n),
            "undefined" != typeof e.container && e.controlsAreVisible && e.container.trigger("controlsshown")
        },
        showControls: function(t) {
            var e = this;
            t = "undefined" == typeof t || t,
            e.controlsAreVisible || (t ? (e.controls.css("visibility", "visible").stop(!0, !0).fadeIn(200,
            function() {
                e.controlsAreVisible = !0,
                e.container.trigger("controlsshown")
            }), e.container.find(".mejs-control").css("visibility", "visible").stop(!0, !0).fadeIn(200,
            function() {
                e.controlsAreVisible = !0
            })) : (e.controls.css("visibility", "visible").css("display", "block"), e.container.find(".mejs-control").css("visibility", "visible").css("display", "block"), e.controlsAreVisible = !0, e.container.trigger("controlsshown")), e.setControlsSize())
        },
        hideControls: function(e) {
            var i = this;
            e = "undefined" == typeof e || e,
            !i.controlsAreVisible || i.options.alwaysShowControls || i.keyboardAction || (e ? (i.controls.stop(!0, !0).fadeOut(200,
            function() {
                t(this).css("visibility", "hidden").css("display", "block"),
                i.controlsAreVisible = !1,
                i.container.trigger("controlshidden")
            }), i.container.find(".mejs-control").stop(!0, !0).fadeOut(200,
            function() {
                t(this).css("visibility", "hidden").css("display", "block")
            })) : (i.controls.css("visibility", "hidden").css("display", "block"), i.container.find(".mejs-control").css("visibility", "hidden").css("display", "block"), i.controlsAreVisible = !1, i.container.trigger("controlshidden")))
        },
        controlsTimer: null,
        startControlsTimer: function(t) {
            var e = this;
            t = "undefined" != typeof t ? t: 1500,
            e.killControlsTimer("start"),
            e.controlsTimer = setTimeout(function() {
                e.hideControls(),
                e.killControlsTimer("hide")
            },
            t)
        },
        killControlsTimer: function(t) {
            var e = this;
            null !== e.controlsTimer && (clearTimeout(e.controlsTimer), delete e.controlsTimer, e.controlsTimer = null)
        },
        controlsEnabled: !0,
        disableControls: function() {
            var t = this;
            t.killControlsTimer(),
            t.hideControls(!1),
            this.controlsEnabled = !1
        },
        enableControls: function() {
            var t = this;
            t.showControls(!1),
            t.controlsEnabled = !0
        },
        meReady: function(e, i) {
            var n, s, o = this,
            a = mejs.MediaFeatures,
            r = i.getAttribute("autoplay"),
            l = !("undefined" == typeof r || null === r || "false" === r);
            if (!o.created) {
                if (o.created = !0, o.media = e, o.domNode = i, !(a.isAndroid && o.options.AndroidUseNativeControls || a.isiPad && o.options.iPadUseNativeControls || a.isiPhone && o.options.iPhoneUseNativeControls)) {
                    o.buildposter(o, o.controls, o.layers, o.media),
                    o.buildkeyboard(o, o.controls, o.layers, o.media),
                    o.buildoverlays(o, o.controls, o.layers, o.media),
                    o.findTracks();
                    for (n in o.options.features) if (s = o.options.features[n], o["build" + s]) try {
                        o["build" + s](o, o.controls, o.layers, o.media)
                    } catch(h) {}
                    o.container.trigger("controlsready"),
                    o.setPlayerSize(o.width, o.height),
                    o.setControlsSize(),
                    o.isVideo && (mejs.MediaFeatures.hasTouch ? o.$media.bind("touchstart",
                    function() {
                        o.controlsAreVisible ? o.hideControls(!1) : o.controlsEnabled && o.showControls(!1)
                    }) : (o.clickToPlayPauseCallback = function() {
                        o.options.clickToPlayPause && (o.media.paused ? o.play() : o.pause())
                    },
                    o.media.addEventListener("click", o.clickToPlayPauseCallback, !1), o.container.bind("mouseenter mouseover",
                    function() {
                        o.controlsEnabled && (o.options.alwaysShowControls || (o.killControlsTimer("enter"), o.showControls(), o.startControlsTimer(2500)))
                    }).bind("mousemove",
                    function() {
                        o.controlsEnabled && (o.controlsAreVisible || o.showControls(), o.options.alwaysShowControls || o.startControlsTimer(2500))
                    }).bind("mouseleave",
                    function() {
                        o.controlsEnabled && (o.media.paused || o.options.alwaysShowControls || o.startControlsTimer(1e3))
                    })), o.options.hideVideoControlsOnLoad && o.hideControls(!1), l && !o.options.alwaysShowControls && o.hideControls(), o.options.enableAutosize && o.media.addEventListener("loadedmetadata",
                    function(t) {
                        o.options.videoHeight <= 0 && null === o.domNode.getAttribute("height") && !isNaN(t.target.videoHeight) && (o.setPlayerSize(t.target.videoWidth, t.target.videoHeight), o.setControlsSize(), o.media.setVideoSize(t.target.videoWidth, t.target.videoHeight))
                    },
                    !1)),
                    e.addEventListener("play",
                    function() {
                        var t;
                        for (t in mejs.players) {
                            var e = mejs.players[t];
                            e.id == o.id || !o.options.pauseOtherPlayers || e.paused || e.ended || e.pause(),
                            e.hasFocus = !1
                        }
                        o.hasFocus = !0
                    },
                    !1),
                    o.media.addEventListener("ended",
                    function(e) {
                        if (o.options.autoRewind) try {
                            o.media.setCurrentTime(0),
                            window.setTimeout(function() {
                                t(o.container).find(".mejs-overlay-loading").parent().hide()
                            },
                            20)
                        } catch(i) {}
                        o.media.pause(),
                        o.setProgressRail && o.setProgressRail(),
                        o.setCurrentRail && o.setCurrentRail(),
                        o.options.loop ? o.play() : !o.options.alwaysShowControls && o.controlsEnabled && o.showControls()
                    },
                    !1),
                    o.media.addEventListener("loadedmetadata",
                    function(t) {
                        o.updateDuration && o.updateDuration(),
                        o.updateCurrent && o.updateCurrent(),
                        o.isFullScreen || (o.setPlayerSize(o.width, o.height), o.setControlsSize())
                    },
                    !1),
                    o.container.focusout(function(e) {
                        if (e.relatedTarget) {
                            var i = t(e.relatedTarget);
                            o.keyboardAction && 0 === i.parents(".mejs-container").length && (o.keyboardAction = !1, o.hideControls(!0))
                        }
                    }),
                    setTimeout(function() {
                        o.setPlayerSize(o.width, o.height),
                        o.setControlsSize()
                    },
                    50),
                    o.globalBind("resize",
                    function() {
                        o.isFullScreen || mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen || o.setPlayerSize(o.width, o.height),
                        o.setControlsSize()
                    }),
                    "youtube" == o.media.pluginType && (a.isiOS || a.isAndroid) && o.container.find(".mejs-overlay-play").hide()
                }
                l && "native" == e.pluginType && o.play(),
                o.options.success && ("string" == typeof o.options.success ? window[o.options.success](o.media, o.domNode, o) : o.options.success(o.media, o.domNode, o))
            }
        },
        handleError: function(t) {
            var e = this;
            e.controls.hide(),
            e.options.error && e.options.error(t)
        },
        setPlayerSize: function(e, i) {
            var n = this;
            if (!n.options.setDimensions) return ! 1;
            if ("undefined" != typeof e && (n.width = e), "undefined" != typeof i && (n.height = i), n.height.toString().indexOf("%") > 0 || "100%" === n.$node.css("max-width") || n.$node[0].currentStyle && "100%" === n.$node[0].currentStyle.maxWidth) {
                var s = function() {
                    return n.isVideo ? n.media.videoWidth && n.media.videoWidth > 0 ? n.media.videoWidth: null !== n.media.getAttribute("width") ? n.media.getAttribute("width") : n.options.defaultVideoWidth: n.options.defaultAudioWidth
                } (),
                o = function() {
                    return n.isVideo ? n.media.videoHeight && n.media.videoHeight > 0 ? n.media.videoHeight: null !== n.media.getAttribute("height") ? n.media.getAttribute("height") : n.options.defaultVideoHeight: n.options.defaultAudioHeight
                } (),
                a = n.container.parent().closest(":visible").width(),
                r = n.container.parent().closest(":visible").height(),
                l = n.isVideo || !n.options.autosizeProgress ? parseInt(a * o / s, 10) : o;
                isNaN(l) && (l = r),
                "body" === n.container.parent()[0].tagName.toLowerCase() && (a = t(window).width(), l = t(window).height()),
                l && a && (n.container.width(a).height(l), n.$media.add(n.container.find(".mejs-shim")).width("100%").height("100%"), n.isVideo && n.media.setVideoSize && n.media.setVideoSize(a, l), n.layers.children(".mejs-layer").width("100%").height("100%"))
            } else n.container.width(n.width).height(n.height),
            n.layers.children(".mejs-layer").width(n.width).height(n.height);
            var h = n.layers.find(".mejs-overlay-play"),
            u = h.find(".mejs-overlay-button");
            h.height(n.container.height() - n.controls.height()),
            u.css("margin-top", "-" + (u.height() / 2 - n.controls.height() / 2).toString() + "px")
        },
        setControlsSize: function() {
            var e = this,
            i = 0,
            n = 0,
            s = e.controls.find(".mejs-time-rail"),
            o = e.controls.find(".mejs-time-total"),
            a = (e.controls.find(".mejs-time-current"), e.controls.find(".mejs-time-loaded"), s.siblings()),
            r = a.last(),
            l = null;
            if (e.container.is(":visible") && s.length && s.is(":visible")) {
                e.options && !e.options.autosizeProgress && (n = parseInt(s.css("width"), 10)),
                0 !== n && n || (a.each(function() {
                    var e = t(this);
                    "absolute" != e.css("position") && e.is(":visible") && (i += t(this).outerWidth(!0))
                }), n = e.controls.width() - i - (s.outerWidth(!0) - s.width()));
                do s.width(n),
                o.width(n - (o.outerWidth(!0) - o.width())),
                "absolute" != r.css("position") && (l = r.position(), n--);
                while (null !== l && l.top > 0 && n > 0);
                e.setProgressRail && e.setProgressRail(),
                e.setCurrentRail && e.setCurrentRail()
            }
        },
        buildposter: function(e, i, n, s) {
            var o = this,
            a = t('<div class="mejs-poster mejs-layer"></div>').appendTo(n),
            r = e.$media.attr("poster");
            "" !== e.options.poster && (r = e.options.poster),
            r ? o.setPoster(r) : a.hide(),
            s.addEventListener("play",
            function() {
                a.hide()
            },
            !1),
            e.options.showPosterWhenEnded && e.options.autoRewind && s.addEventListener("ended",
            function() {
                a.show()
            },
            !1)
        },
        setPoster: function(e) {
            var i = this,
            n = i.container.find(".mejs-poster"),
            s = n.find("img");
            0 === s.length && (s = t('<img width="100%" height="100%" />').appendTo(n)),
            s.attr("src", e),
            n.css({
                "background-image": "url(" + e + ")"
            })
        },
        buildoverlays: function(e, i, n, s) {
            var o = this;
            if (e.isVideo) {
                var a = t('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>').hide().appendTo(n),
                r = t('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>').hide().appendTo(n),
                l = t('<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button"></div></div>').appendTo(n).bind("click",
                function() {
                    o.options.clickToPlayPause && s.paused && s.play()
                });
                s.addEventListener("play",
                function() {
                    l.hide(),
                    a.hide(),
                    i.find(".mejs-time-buffering").hide(),
                    r.hide()
                },
                !1),
                s.addEventListener("playing",
                function() {
                    l.hide(),
                    a.hide(),
                    i.find(".mejs-time-buffering").hide(),
                    r.hide()
                },
                !1),
                s.addEventListener("seeking",
                function() {
                    a.show(),
                    i.find(".mejs-time-buffering").show()
                },
                !1),
                s.addEventListener("seeked",
                function() {
                    a.hide(),
                    i.find(".mejs-time-buffering").hide()
                },
                !1),
                s.addEventListener("pause",
                function() {
                    mejs.MediaFeatures.isiPhone || l.show()
                },
                !1),
                s.addEventListener("waiting",
                function() {
                    a.show(),
                    i.find(".mejs-time-buffering").show()
                },
                !1),
                s.addEventListener("loadeddata",
                function() {
                    a.show(),
                    i.find(".mejs-time-buffering").show(),
                    mejs.MediaFeatures.isAndroid && (s.canplayTimeout = window.setTimeout(function() {
                        if (document.createEvent) {
                            var t = document.createEvent("HTMLEvents");
                            return t.initEvent("canplay", !0, !0),
                            s.dispatchEvent(t)
                        }
                    },
                    300))
                },
                !1),
                s.addEventListener("canplay",
                function() {
                    a.hide(),
                    i.find(".mejs-time-buffering").hide(),
                    clearTimeout(s.canplayTimeout)
                },
                !1),
                s.addEventListener("error",
                function() {
                    a.hide(),
                    i.find(".mejs-time-buffering").hide(),
                    r.show(),
                    r.find("mejs-overlay-error").html("Error loading this resource")
                },
                !1),
                s.addEventListener("keydown",
                function(t) {
                    o.onkeydown(e, s, t)
                },
                !1)
            }
        },
        buildkeyboard: function(e, i, n, s) {
            var o = this;
            o.container.keydown(function() {
                o.keyboardAction = !0
            }),
            o.globalBind("keydown",
            function(t) {
                return o.onkeydown(e, s, t)
            }),
            o.globalBind("click",
            function(i) {
                e.hasFocus = 0 !== t(i.target).closest(".mejs-container").length
            })
        },
        onkeydown: function(t, e, i) {
            if (t.hasFocus && t.options.enableKeyboard) for (var n = 0,
            s = t.options.keyActions.length; s > n; n++) for (var o = t.options.keyActions[n], a = 0, r = o.keys.length; r > a; a++) if (i.keyCode == o.keys[a]) return "function" == typeof i.preventDefault && i.preventDefault(),
            o.action(t, e, i.keyCode),
            !1;
            return ! 0
        },
        findTracks: function() {
            var e = this,
            i = e.$media.find("track");
            e.tracks = [],
            i.each(function(i, n) {
                n = t(n),
                e.tracks.push({
                    srclang: n.attr("srclang") ? n.attr("srclang").toLowerCase() : "",
                    src: n.attr("src"),
                    kind: n.attr("kind"),
                    label: n.attr("label") || "",
                    entries: [],
                    isLoaded: !1
                })
            })
        },
        changeSkin: function(t) {
            this.container[0].className = "mejs-container " + t,
            this.setPlayerSize(this.width, this.height),
            this.setControlsSize()
        },
        play: function() {
            this.load(),
            this.media.play()
        },
        pause: function() {
            try {
                this.media.pause()
            } catch(t) {}
        },
        load: function() {
            this.isLoaded || this.media.load(),
            this.isLoaded = !0
        },
        setMuted: function(t) {
            this.media.setMuted(t)
        },
        setCurrentTime: function(t) {
            this.media.setCurrentTime(t)
        },
        getCurrentTime: function() {
            return this.media.currentTime
        },
        setVolume: function(t) {
            this.media.setVolume(t)
        },
        getVolume: function() {
            return this.media.volume
        },
        setSrc: function(t) {
            this.media.setSrc(t)
        },
        remove: function() {
            var t, e, i = this;
            for (t in i.options.features) if (e = i.options.features[t], i["clean" + e]) try {
                i["clean" + e](i)
            } catch(n) {}
            i.isDynamic ? i.$node.insertBefore(i.container) : (i.$media.prop("controls", !0), i.$node.clone().insertBefore(i.container).show(), i.$node.remove()),
            "native" !== i.media.pluginType && i.media.remove(),
            delete mejs.players[i.id],
            "object" == typeof i.container && i.container.remove(),
            i.globalUnbind(),
            delete i.node.player
        },
        rebuildtracks: function() {
            var t = this;
            t.findTracks(),
            t.buildtracks(t, t.controls, t.layers, t.media)
        }
    },
    function() {
        function e(e, n) {
            var s = {
                d: [],
                w: []
            };
            return t.each((e || "").split(" "),
            function(t, e) {
                var o = e + "." + n;
                0 === o.indexOf(".") ? (s.d.push(o), s.w.push(o)) : s[i.test(e) ? "w": "d"].push(o)
            }),
            s.d = s.d.join(" "),
            s.w = s.w.join(" "),
            s
        }
        var i = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
        mejs.MediaElementPlayer.prototype.globalBind = function(i, n, s) {
            var o = this;
            i = e(i, o.id),
            i.d && t(document).bind(i.d, n, s),
            i.w && t(window).bind(i.w, n, s)
        },
        mejs.MediaElementPlayer.prototype.globalUnbind = function(i, n) {
            var s = this;
            i = e(i, s.id),
            i.d && t(document).unbind(i.d, n),
            i.w && t(window).unbind(i.w, n)
        }
    } (),
    "undefined" != typeof t && (t.fn.mediaelementplayer = function(e) {
        return this.each(e === !1 ?
        function() {
            var e = t(this).data("mediaelementplayer");
            e && e.remove(),
            t(this).removeData("mediaelementplayer")
        }: function() {
            t(this).data("mediaelementplayer", new mejs.MediaElementPlayer(this, e))
        }),
        this
    },
    t(document).ready(function() {
        t(".mejs-player").mediaelementplayer()
    })),
    window.MediaElementPlayer = mejs.MediaElementPlayer
} (mejs.$),
function(t) {
    t.extend(mejs.MepDefaults, {
        playText: mejs.i18n.t("Play"),
        pauseText: mejs.i18n.t("Pause")
    }),
    t.extend(MediaElementPlayer.prototype, {
        buildplaypause: function(e, i, n, s) {
            function o(t) {
                "play" === t ? (l.removeClass("mejs-play").addClass("mejs-pause"), h.attr({
                    title: r.pauseText,
                    "aria-label": r.pauseText
                })) : (l.removeClass("mejs-pause").addClass("mejs-play"), h.attr({
                    title: r.playText,
                    "aria-label": r.playText
                }))
            }
            var a = this,
            r = a.options,
            l = t('<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="' + a.id + '" title="' + r.playText + '" aria-label="' + r.playText + '"></button></div>').appendTo(i).click(function(t) {
                return t.preventDefault(),
                s.paused ? s.play() : s.pause(),
                !1
            }),
            h = l.find("button");
            o("pse"),
            s.addEventListener("play",
            function() {
                o("play")
            },
            !1),
            s.addEventListener("playing",
            function() {
                o("play")
            },
            !1),
            s.addEventListener("pause",
            function() {
                o("pse")
            },
            !1),
            s.addEventListener("paused",
            function() {
                o("pse")
            },
            !1)
        }
    })
} (mejs.$),
function(t) {
    t.extend(mejs.MepDefaults, {
        stopText: "Stop"
    }),
    t.extend(MediaElementPlayer.prototype, {
        buildstop: function(e, i, n, s) {
            {
                var o = this;
                t('<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="' + o.id + '" title="' + o.options.stopText + '" aria-label="' + o.options.stopText + '"></button></div>').appendTo(i).click(function() {
                    s.paused || s.pause(),
                    s.currentTime > 0 && (s.setCurrentTime(0), s.pause(), i.find(".mejs-time-current").width("0px"), i.find(".mejs-time-handle").css("left", "0px"), i.find(".mejs-time-float-current").html(mejs.Utility.secondsToTimeCode(0)), i.find(".mejs-currenttime").html(mejs.Utility.secondsToTimeCode(0)), n.find(".mejs-poster").show())
                })
            }
        }
    })
} (mejs.$),
function(t) {
    t.extend(mejs.MepDefaults, {
        progessHelpText: mejs.i18n.t("Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.")
    }),
    t.extend(MediaElementPlayer.prototype, {
        buildprogress: function(e, i, n, s) {
            t('<div class="mejs-time-rail"><span  class="mejs-time-total mejs-time-slider"><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></div>').appendTo(i),
            i.find(".mejs-time-buffering").hide();
            var o = this,
            a = i.find(".mejs-time-total"),
            r = i.find(".mejs-time-loaded"),
            l = i.find(".mejs-time-current"),
            h = i.find(".mejs-time-handle"),
            u = i.find(".mejs-time-float"),
            c = i.find(".mejs-time-float-current"),
            d = i.find(".mejs-time-slider"),
            p = function(t) {
                var e, i = a.offset(),
                n = a.outerWidth(!0),
                o = 0,
                r = 0,
                l = 0;
                e = t.originalEvent.changedTouches ? t.originalEvent.changedTouches[0].pageX: t.pageX,
                s.duration && (e < i.left ? e = i.left: e > n + i.left && (e = n + i.left), l = e - i.left, o = l / n, r = .02 >= o ? 0 : o * s.duration, f && r !== s.currentTime && s.setCurrentTime(r), mejs.MediaFeatures.hasTouch || (u.css("left", l), c.html(mejs.Utility.secondsToTimeCode(r)), u.show()))
            },
            f = !1,
            m = !1,
            g = 0,
            v = !1,
            b = e.options.autoRewind,
            y = function(t) {
                var e = s.currentTime,
                i = mejs.i18n.t("Time Slider"),
                n = mejs.Utility.secondsToTimeCode(e),
                o = s.duration;
                d.attr({
                    "aria-label": i,
                    "aria-valuemin": 0,
                    "aria-valuemax": o,
                    "aria-valuenow": e,
                    "aria-valuetext": n,
                    role: "slider",
                    tabindex: 0
                })
            },
            _ = function() {
                var t = new Date;
                t - g >= 1e3 && s.play()
            };
            d.bind("focus",
            function(t) {
                e.options.autoRewind = !1
            }),
            d.bind("blur",
            function(t) {
                e.options.autoRewind = b
            }),
            d.bind("keydown",
            function(t) {
                new Date - g >= 1e3 && (v = s.paused);
                var e = t.keyCode,
                i = s.duration,
                n = s.currentTime;
                switch (e) {
                case 37:
                    n -= 1;
                    break;
                case 39:
                    n += 1;
                    break;
                case 38:
                    n += Math.floor(.1 * i);
                    break;
                case 40:
                    n -= Math.floor(.1 * i);
                    break;
                case 36:
                    n = 0;
                    break;
                case 35:
                    n = i;
                    break;
                case 10:
                    return void(s.paused ? s.play() : s.pause());
                case 13:
                    return void(s.paused ? s.play() : s.pause());
                default:
                    return
                }
                return n = 0 > n ? 0 : n >= i ? i: Math.floor(n),
                g = new Date,
                v || s.pause(),
                n < s.duration && !v && setTimeout(_, 1100),
                s.setCurrentTime(n),
                t.preventDefault(),
                t.stopPropagation(),
                !1
            }),
            a.bind("mousedown touchstart",
            function(t) { (1 === t.which || 0 === t.which) && (f = !0, p(t), o.globalBind("mousemove.dur touchmove.dur",
                function(t) {
                    p(t)
                }), o.globalBind("mouseup.dur touchend.dur",
                function(t) {
                    f = !1,
                    u.hide(),
                    o.globalUnbind(".dur")
                }))
            }).bind("mouseenter",
            function(t) {
                m = !0,
                o.globalBind("mousemove.dur",
                function(t) {
                    p(t)
                }),
                mejs.MediaFeatures.hasTouch || u.show()
            }).bind("mouseleave",
            function(t) {
                m = !1,
                f || (o.globalUnbind(".dur"), u.hide())
            }),
            s.addEventListener("progress",
            function(t) {
                e.setProgressRail(t),
                e.setCurrentRail(t)
            },
            !1),
            s.addEventListener("timeupdate",
            function(t) {
                e.setProgressRail(t),
                e.setCurrentRail(t),
                y(t)
            },
            !1),
            o.loaded = r,
            o.total = a,
            o.current = l,
            o.handle = h
        },
        setProgressRail: function(t) {
            var e = this,
            i = void 0 !== t ? t.target: e.media,
            n = null;
            i && i.buffered && i.buffered.length > 0 && i.buffered.end && i.duration ? n = i.buffered.end(0) / i.duration: i && void 0 !== i.bytesTotal && i.bytesTotal > 0 && void 0 !== i.bufferedBytes ? n = i.bufferedBytes / i.bytesTotal: t && t.lengthComputable && 0 !== t.total && (n = t.loaded / t.total),
            null !== n && (n = Math.min(1, Math.max(0, n)), e.loaded && e.total && e.loaded.width(e.total.width() * n))
        },
        setCurrentRail: function() {
            var t = this;
            if (void 0 !== t.media.currentTime && t.media.duration && t.total && t.handle) {
                var e = Math.round(t.total.width() * t.media.currentTime / t.media.duration),
                i = e - Math.round(t.handle.outerWidth(!0) / 2);
                t.current.width(e),
                t.handle.css("left", i)
            }
        }
    })
} (mejs.$),
function(t) {
    t.extend(mejs.MepDefaults, {
        duration: -1,
        timeAndDurationSeparator: "<span> | </span>"
    }),
    t.extend(MediaElementPlayer.prototype, {
        buildcurrent: function(e, i, n, s) {
            var o = this;
            t('<div class="mejs-time" role="timer" aria-live="off"><span class="mejs-currenttime">' + (e.options.alwaysShowHours ? "00:": "") + (e.options.showTimecodeFrameCount ? "00:00:00": "00:00") + "</span></div>").appendTo(i),
            o.currenttime = o.controls.find(".mejs-currenttime"),
            s.addEventListener("timeupdate",
            function() {
                e.updateCurrent()
            },
            !1)
        },
        buildduration: function(e, i, n, s) {
            var o = this;
            i.children().last().find(".mejs-currenttime").length > 0 ? t(o.options.timeAndDurationSeparator + '<span class="mejs-duration">' + (o.options.duration > 0 ? mejs.Utility.secondsToTimeCode(o.options.duration, o.options.alwaysShowHours || o.media.duration > 3600, o.options.showTimecodeFrameCount, o.options.framesPerSecond || 25) : (e.options.alwaysShowHours ? "00:": "") + (e.options.showTimecodeFrameCount ? "00:00:00": "00:00")) + "</span>").appendTo(i.find(".mejs-time")) : (i.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container"), t('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">' + (o.options.duration > 0 ? mejs.Utility.secondsToTimeCode(o.options.duration, o.options.alwaysShowHours || o.media.duration > 3600, o.options.showTimecodeFrameCount, o.options.framesPerSecond || 25) : (e.options.alwaysShowHours ? "00:": "") + (e.options.showTimecodeFrameCount ? "00:00:00": "00:00")) + "</span></div>").appendTo(i)),
            o.durationD = o.controls.find(".mejs-duration"),
            s.addEventListener("timeupdate",
            function() {
                e.updateDuration()
            },
            !1)
        },
        updateCurrent: function() {
            var t = this;
            t.currenttime && t.currenttime.html(mejs.Utility.secondsToTimeCode(t.media.currentTime, t.options.alwaysShowHours || t.media.duration > 3600, t.options.showTimecodeFrameCount, t.options.framesPerSecond || 25))
        },
        updateDuration: function() {
            var t = this;
            t.container.toggleClass("mejs-long-video", t.media.duration > 3600),
            t.durationD && (t.options.duration > 0 || t.media.duration) && t.durationD.html(mejs.Utility.secondsToTimeCode(t.options.duration > 0 ? t.options.duration: t.media.duration, t.options.alwaysShowHours, t.options.showTimecodeFrameCount, t.options.framesPerSecond || 25))
        }
    })
} (mejs.$),
function(t) {
    t.extend(mejs.MepDefaults, {
        muteText: mejs.i18n.t("Mute Toggle"),
        allyVolumeControlText: mejs.i18n.t("Use Up/Down Arrow keys to increase or decrease volume."),
        hideVolumeOnTouchDevices: !0,
        audioVolume: "horizontal",
        videoVolume: "vertical"
    }),
    t.extend(MediaElementPlayer.prototype, {
        buildvolume: function(e, i, n, s) {
            if (!mejs.MediaFeatures.isAndroid && !mejs.MediaFeatures.isiOS || !this.options.hideVolumeOnTouchDevices) {
                var o = this,
                a = o.isVideo ? o.options.videoVolume: o.options.audioVolume,
                r = "horizontal" == a ? t('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + o.id + '" title="' + o.options.muteText + '" aria-label="' + o.options.muteText + '"></button></div><a href="javascript:void(0);" class="mejs-horizontal-volume-slider"><span class="mejs-offscreen">' + o.options.allyVolumeControlText + '</span><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></a>').appendTo(i) : t('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + o.id + '" title="' + o.options.muteText + '" aria-label="' + o.options.muteText + '"></button><a href="javascript:void(0);" class="mejs-volume-slider"><span class="mejs-offscreen">' + o.options.allyVolumeControlText + '</span><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></a></div>').appendTo(i),
                l = o.container.find(".mejs-volume-slider, .mejs-horizontal-volume-slider"),
                h = o.container.find(".mejs-volume-total, .mejs-horizontal-volume-total"),
                u = o.container.find(".mejs-volume-current, .mejs-horizontal-volume-current"),
                c = o.container.find(".mejs-volume-handle, .mejs-horizontal-volume-handle"),
                d = function(t, e) {
                    if (!l.is(":visible") && "undefined" == typeof e) return l.show(),
                    d(t, !0),
                    void l.hide();
                    t = Math.max(0, t),
                    t = Math.min(t, 1),
                    0 === t ? r.removeClass("mejs-mute").addClass("mejs-unmute") : r.removeClass("mejs-unmute").addClass("mejs-mute");
                    var i = h.position();
                    if ("vertical" == a) {
                        var n = h.height(),
                        s = n - n * t;
                        c.css("top", Math.round(i.top + s - c.height() / 2)),
                        u.height(n - s),
                        u.css("top", i.top + s)
                    } else {
                        var o = h.width(),
                        p = o * t;
                        c.css("left", Math.round(i.left + p - c.width() / 2)),
                        u.width(Math.round(p))
                    }
                },
                p = function(t) {
                    var e = null,
                    i = h.offset();
                    if ("vertical" === a) {
                        var n = h.height(),
                        o = (parseInt(h.css("top").replace(/px/, ""), 10), t.pageY - i.top);
                        if (e = (n - o) / n, 0 === i.top || 0 === i.left) return
                    } else {
                        var r = h.width(),
                        l = t.pageX - i.left;
                        e = l / r
                    }
                    e = Math.max(0, e),
                    e = Math.min(e, 1),
                    d(e),
                    s.setMuted(0 === e ? !0 : !1),
                    s.setVolume(e)
                },
                f = !1,
                m = !1;
                r.hover(function() {
                    l.show(),
                    m = !0
                },
                function() {
                    m = !1,
                    f || "vertical" != a || l.hide()
                });
                var g = function(t) {
                    var e = Math.floor(100 * s.volume);
                    l.attr({
                        "aria-label": mejs.i18n.t("volumeSlider"),
                        "aria-valuemin": 0,
                        "aria-valuemax": 100,
                        "aria-valuenow": e,
                        "aria-valuetext": e + "%",
                        role: "slider",
                        tabindex: 0
                    })
                };
                l.bind("mouseover",
                function() {
                    m = !0
                }).bind("mousedown",
                function(t) {
                    return p(t),
                    o.globalBind("mousemove.vol",
                    function(t) {
                        p(t)
                    }),
                    o.globalBind("mouseup.vol",
                    function() {
                        f = !1,
                        o.globalUnbind(".vol"),
                        m || "vertical" != a || l.hide()
                    }),
                    f = !0,
                    !1
                }).bind("keydown",
                function(t) {
                    var e = t.keyCode,
                    i = s.volume;
                    switch (e) {
                    case 38:
                        i += .1;
                        break;
                    case 40:
                        i -= .1;
                        break;
                    default:
                        return ! 0
                    }
                    return f = !1,
                    d(i),
                    s.setVolume(i),
                    !1
                }).bind("blur",
                function() {
                    l.hide()
                }),
                r.find("button").click(function() {
                    s.setMuted(!s.muted)
                }),
                r.find("button").bind("focus",
                function() {
                    l.show()
                }),
                s.addEventListener("volumechange",
                function(t) {
                    f || (s.muted ? (d(0), r.removeClass("mejs-mute").addClass("mejs-unmute")) : (d(s.volume), r.removeClass("mejs-unmute").addClass("mejs-mute"))),
                    g(t)
                },
                !1),
                o.container.is(":visible") && (d(e.options.startVolume), 0 === e.options.startVolume && s.setMuted(!0), "native" === s.pluginType && s.setVolume(e.options.startVolume))
            }
        }
    })
} (mejs.$),
function(t) {
    t.extend(mejs.MepDefaults, {
        usePluginFullScreen: !0,
        newWindowCallback: function() {
            return ""
        },
        fullscreenText: mejs.i18n.t("Fullscreen")
    }),
    t.extend(MediaElementPlayer.prototype, {
        isFullScreen: !1,
        isNativeFullScreen: !1,
        isInIframe: !1,
        buildfullscreen: function(e, i, n, s) {
            if (e.isVideo) {
                if (e.isInIframe = window.location != window.parent.location, mejs.MediaFeatures.hasTrueNativeFullScreen) {
                    var o = function(t) {
                        e.isFullScreen && (mejs.MediaFeatures.isFullScreen() ? (e.isNativeFullScreen = !0, e.setControlsSize()) : (e.isNativeFullScreen = !1, e.exitFullScreen()))
                    };
                    e.globalBind(mejs.MediaFeatures.fullScreenEventName, o)
                }
                var a = this,
                r = (e.container, t('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' + a.id + '" title="' + a.options.fullscreenText + '" aria-label="' + a.options.fullscreenText + '"></button></div>').appendTo(i));
                if ("native" === a.media.pluginType || !a.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox) r.click(function() {
                    var t = mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || e.isFullScreen;
                    t ? e.exitFullScreen() : e.enterFullScreen()
                });
                else {
                    var l = null,
                    h = function() {
                        var t, e = document.createElement("x"),
                        i = document.documentElement,
                        n = window.getComputedStyle;
                        return "pointerEvents" in e.style ? (e.style.pointerEvents = "auto", e.style.pointerEvents = "x", i.appendChild(e), t = n && "auto" === n(e, "").pointerEvents, i.removeChild(e), !!t) : !1
                    } ();
                    if (h && !mejs.MediaFeatures.isOpera) {
                        var u, c, d = !1,
                        p = function() {
                            if (d) {
                                for (var t in f) f[t].hide();
                                r.css("pointer-events", ""),
                                a.controls.css("pointer-events", ""),
                                a.media.removeEventListener("click", a.clickToPlayPauseCallback),
                                d = !1
                            }
                        },
                        f = {},
                        m = ["top", "left", "right", "bottom"],
                        g = function() {
                            var t = r.offset().left - a.container.offset().left,
                            e = r.offset().top - a.container.offset().top,
                            i = r.outerWidth(!0),
                            n = r.outerHeight(!0),
                            s = a.container.width(),
                            o = a.container.height();
                            for (u in f) f[u].css({
                                position: "absolute",
                                top: 0,
                                left: 0
                            });
                            f.top.width(s).height(e),
                            f.left.width(t).height(n).css({
                                top: e
                            }),
                            f.right.width(s - t - i).height(n).css({
                                top: e,
                                left: t + i
                            }),
                            f.bottom.width(s).height(o - n - e).css({
                                top: e + n
                            })
                        };
                        for (a.globalBind("resize",
                        function() {
                            g()
                        }), u = 0, c = m.length; c > u; u++) f[m[u]] = t('<div class="mejs-fullscreen-hover" />').appendTo(a.container).mouseover(p).hide();
                        r.on("mouseover",
                        function() {
                            if (!a.isFullScreen) {
                                var t = r.offset(),
                                i = e.container.offset();
                                s.positionFullscreenButton(t.left - i.left, t.top - i.top, !1),
                                r.css("pointer-events", "none"),
                                a.controls.css("pointer-events", "none"),
                                a.media.addEventListener("click", a.clickToPlayPauseCallback);
                                for (u in f) f[u].show();
                                g(),
                                d = !0
                            }
                        }),
                        s.addEventListener("fullscreenchange",
                        function(t) {
                            a.isFullScreen = !a.isFullScreen,
                            a.isFullScreen ? a.media.removeEventListener("click", a.clickToPlayPauseCallback) : a.media.addEventListener("click", a.clickToPlayPauseCallback),
                            p()
                        }),
                        a.globalBind("mousemove",
                        function(t) {
                            if (d) {
                                var e = r.offset(); (t.pageY < e.top || t.pageY > e.top + r.outerHeight(!0) || t.pageX < e.left || t.pageX > e.left + r.outerWidth(!0)) && (r.css("pointer-events", ""), a.controls.css("pointer-events", ""), d = !1)
                            }
                        })
                    } else r.on("mouseover",
                    function() {
                        null !== l && (clearTimeout(l), delete l);
                        var t = r.offset(),
                        i = e.container.offset();
                        s.positionFullscreenButton(t.left - i.left, t.top - i.top, !0)
                    }).on("mouseout",
                    function() {
                        null !== l && (clearTimeout(l), delete l),
                        l = setTimeout(function() {
                            s.hideFullscreenButton()
                        },
                        1500)
                    })
                }
                e.fullscreenBtn = r,
                a.globalBind("keydown",
                function(t) { (mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || a.isFullScreen) && 27 == t.keyCode && e.exitFullScreen()
                })
            }
        },
        cleanfullscreen: function(t) {
            t.exitFullScreen()
        },
        containerSizeTimeout: null,
        enterFullScreen: function() {
            var e = this;
            if ("native" === e.media.pluginType || !mejs.MediaFeatures.isFirefox && !e.options.usePluginFullScreen) {
                if (t(document.documentElement).addClass("mejs-fullscreen"), normalHeight = e.container.height(), normalWidth = e.container.width(), "native" === e.media.pluginType) if (mejs.MediaFeatures.hasTrueNativeFullScreen) mejs.MediaFeatures.requestFullScreen(e.container[0]),
                e.isInIframe && setTimeout(function n() {
                    if (e.isNativeFullScreen) {
                        var i = window.devicePixelRatio || 1,
                        s = .002,
                        o = i * t(window).width(),
                        a = screen.width,
                        r = Math.abs(a - o),
                        l = a * s;
                        r > l ? e.exitFullScreen() : setTimeout(n, 500)
                    }
                },
                500);
                else if (mejs.MediaFeatures.hasSemiNativeFullScreen) return void e.media.webkitEnterFullscreen();
                if (e.isInIframe) {
                    var i = e.options.newWindowCallback(this);
                    if ("" !== i) {
                        if (!mejs.MediaFeatures.hasTrueNativeFullScreen) return e.pause(),
                        void window.open(i, e.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no");
                        setTimeout(function() {
                            e.isNativeFullScreen || (e.pause(), window.open(i, e.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no"))
                        },
                        250)
                    }
                }
                e.container.addClass("mejs-container-fullscreen").width("100%").height("100%"),
                e.containerSizeTimeout = setTimeout(function() {
                    e.container.css({
                        width: "100%",
                        height: "100%"
                    }),
                    e.setControlsSize()
                },
                500),
                "native" === e.media.pluginType ? e.$media.width("100%").height("100%") : (e.container.find(".mejs-shim").width("100%").height("100%"), e.media.setVideoSize(t(window).width(), t(window).height())),
                e.layers.children("div").width("100%").height("100%"),
                e.fullscreenBtn && e.fullscreenBtn.removeClass("mejs-fullscreen").addClass("mejs-unfullscreen"),
                e.setControlsSize(),
                e.isFullScreen = !0,
                e.container.find(".mejs-captions-text").css("font-size", screen.width / e.width * 1 * 100 + "%"),
                e.container.find(".mejs-captions-position").css("bottom", "45px")
            }
        },
        exitFullScreen: function() {
            var e = this;
            return clearTimeout(e.containerSizeTimeout),
            "native" !== e.media.pluginType && mejs.MediaFeatures.isFirefox ? void e.media.setFullscreen(!1) : (mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || e.isFullScreen) && mejs.MediaFeatures.cancelFullScreen(), t(document.documentElement).removeClass("mejs-fullscreen"), e.container.removeClass("mejs-container-fullscreen").width(normalWidth).height(normalHeight), "native" === e.media.pluginType ? e.$media.width(normalWidth).height(normalHeight) : (e.container.find(".mejs-shim").width(normalWidth).height(normalHeight), e.media.setVideoSize(normalWidth, normalHeight)), e.layers.children("div").width(normalWidth).height(normalHeight), e.fullscreenBtn.removeClass("mejs-unfullscreen").addClass("mejs-fullscreen"), e.setControlsSize(), e.isFullScreen = !1, e.container.find(".mejs-captions-text").css("font-size", ""), void e.container.find(".mejs-captions-position").css("bottom", ""))
        }
    })
} (mejs.$),
function(t) {
    t.extend(mejs.MepDefaults, {
        speeds: ["2.00", "1.50", "1.25", "1.00", "0.75"],
        defaultSpeed: "1.00",
        speedChar: "x"
    }),
    t.extend(MediaElementPlayer.prototype, {
        buildspeed: function(e, i, n, s) {
            var o = this;
            if ("native" == o.media.pluginType) {
                var a = null,
                r = null,
                l = '<div class="mejs-button mejs-speed-button"><button type="button">' + o.options.defaultSpeed + o.options.speedChar + '</button><div class="mejs-speed-selector"><ul>'; - 1 === t.inArray(o.options.defaultSpeed, o.options.speeds) && o.options.speeds.push(o.options.defaultSpeed),
                o.options.speeds.sort(function(t, e) {
                    return parseFloat(e) - parseFloat(t)
                });
                for (var h = 0,
                u = o.options.speeds.length; u > h; h++) l += '<li><input type="radio" name="speed" value="' + o.options.speeds[h] + '" id="' + o.options.speeds[h] + '" ' + (o.options.speeds[h] == o.options.defaultSpeed ? " checked": "") + ' /><label for="' + o.options.speeds[h] + '" ' + (o.options.speeds[h] == o.options.defaultSpeed ? ' class="mejs-speed-selected"': "") + ">" + o.options.speeds[h] + o.options.speedChar + "</label></li>";
                l += "</ul></div></div>",
                a = t(l).appendTo(i),
                r = a.find(".mejs-speed-selector"),
                playbackspeed = o.options.defaultSpeed,
                r.on("click", 'input[type="radio"]',
                function() {
                    var e = t(this).attr("value");
                    playbackspeed = e,
                    s.playbackRate = parseFloat(e),
                    a.find("button").html(e + o.options.speedChar),
                    a.find(".mejs-speed-selected").removeClass("mejs-speed-selected"),
                    a.find('input[type="radio"]:checked').next().addClass("mejs-speed-selected")
                }),
                r.height(a.find(".mejs-speed-selector ul").outerHeight(!0) + a.find(".mejs-speed-translations").outerHeight(!0)).css("top", -1 * r.height() + "px")
            }
        }
    })
} (mejs.$),
function(t) {
    t.extend(mejs.MepDefaults, {
        startLanguage: "",
        tracksText: mejs.i18n.t("Captions/Subtitles"),
        hideCaptionsButtonWhenEmpty: !0,
        toggleCaptionsButtonWhenOnlyOne: !1,
        slidesSelector: ""
    }),
    t.extend(MediaElementPlayer.prototype, {
        hasChapters: !1,
        cleartracks: function(t, e, i, n) {
            t && (t.captions && t.captions.remove(), t.chapters && t.chapters.remove(), t.captionsText && t.captionsText.remove(), t.captionsButton && t.captionsButton.remove())
        },
        buildtracks: function(e, i, n, s) {
            if (0 !== e.tracks.length) {
                var o, a = this;
                if (a.domNode.textTracks) for (o = a.domNode.textTracks.length - 1; o >= 0; o--) a.domNode.textTracks[o].mode = "hidden";
                a.cleartracks(e, i, n, s),
                e.chapters = t('<div class="mejs-chapters mejs-layer"></div>').prependTo(n).hide(),
                e.captions = t('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover" role="log" aria-live="assertive" aria-atomic="false"><span class="mejs-captions-text"></span></div></div>').prependTo(n).hide(),
                e.captionsText = e.captions.find(".mejs-captions-text"),
                e.captionsButton = t('<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="' + a.id + '" title="' + a.options.tracksText + '" aria-label="' + a.options.tracksText + '"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="' + e.id + '_captions" id="' + e.id + '_captions_none" value="none" checked="checked" /><label for="' + e.id + '_captions_none">' + mejs.i18n.t("None") + "</label></li></ul></div></div>").appendTo(i);
                var r = 0;
                for (o = 0; o < e.tracks.length; o++)"subtitles" == e.tracks[o].kind && r++;
                for (a.options.toggleCaptionsButtonWhenOnlyOne && 1 == r ? e.captionsButton.on("click",
                function() {
                    lang = null === e.selectedTrack ? e.tracks[0].srclang: "none",
                    e.setTrack(lang)
                }) : (e.captionsButton.on("mouseenter focusin",
                function() {
                    t(this).find(".mejs-captions-selector").css("visibility", "visible")
                }).on("click", "input[type=radio]",
                function() {
                    lang = this.value,
                    e.setTrack(lang)
                }), e.captionsButton.on("mouseleave focusout",
                function() {
                    t(this).find(".mejs-captions-selector").css("visibility", "hidden")
                })), e.options.alwaysShowControls ? e.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover") : e.container.bind("controlsshown",
                function() {
                    e.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover")
                }).bind("controlshidden",
                function() {
                    s.paused || e.container.find(".mejs-captions-position").removeClass("mejs-captions-position-hover")
                }), e.trackToLoad = -1, e.selectedTrack = null, e.isLoadingTrack = !1, o = 0; o < e.tracks.length; o++)"subtitles" == e.tracks[o].kind && e.addTrackButton(e.tracks[o].srclang, e.tracks[o].label);
                e.loadNextTrack(),
                s.addEventListener("timeupdate",
                function(t) {
                    e.displayCaptions()
                },
                !1),
                "" !== e.options.slidesSelector && (e.slidesContainer = t(e.options.slidesSelector), s.addEventListener("timeupdate",
                function(t) {
                    e.displaySlides()
                },
                !1)),
                s.addEventListener("loadedmetadata",
                function(t) {
                    e.displayChapters()
                },
                !1),
                e.container.hover(function() {
                    e.hasChapters && (e.chapters.css("visibility", "visible"), e.chapters.fadeIn(200).height(e.chapters.find(".mejs-chapter").outerHeight()))
                },
                function() {
                    e.hasChapters && !s.paused && e.chapters.fadeOut(200,
                    function() {
                        t(this).css("visibility", "hidden"),
                        t(this).css("display", "block")
                    })
                }),
                null !== e.node.getAttribute("autoplay") && e.chapters.css("visibility", "hidden")
            }
        },
        setTrack: function(t) {
            var e, i = this;
            if ("none" == t) i.selectedTrack = null,
            i.captionsButton.removeClass("mejs-captions-enabled");
            else for (e = 0; e < i.tracks.length; e++) if (i.tracks[e].srclang == t) {
                null === i.selectedTrack && i.captionsButton.addClass("mejs-captions-enabled"),
                i.selectedTrack = i.tracks[e],
                i.captions.attr("lang", i.selectedTrack.srclang),
                i.displayCaptions();
                break
            }
        },
        loadNextTrack: function() {
            var t = this;
            t.trackToLoad++,
            t.trackToLoad < t.tracks.length ? (t.isLoadingTrack = !0, t.loadTrack(t.trackToLoad)) : (t.isLoadingTrack = !1, t.checkForTracks())
        },
        loadTrack: function(e) {
            var i = this,
            n = i.tracks[e],
            s = function() {
                n.isLoaded = !0,
                i.enableTrackButton(n.srclang, n.label),
                i.loadNextTrack()
            };
            t.ajax({
                url: n.src,
                dataType: "text",
                success: function(t) {
                    n.entries = "string" == typeof t && /<tt\s+xml/gi.exec(t) ? mejs.TrackFormatParser.dfxp.parse(t) : mejs.TrackFormatParser.webvtt.parse(t),
                    s(),
                    "chapters" == n.kind && i.media.addEventListener("play",
                    function(t) {
                        i.media.duration > 0 && i.displayChapters(n)
                    },
                    !1),
                    "slides" == n.kind && i.setupSlides(n)
                },
                error: function() {
                    i.loadNextTrack()
                }
            })
        },
        enableTrackButton: function(e, i) {
            var n = this;
            "" === i && (i = mejs.language.codes[e] || e),
            n.captionsButton.find("input[value=" + e + "]").prop("disabled", !1).siblings("label").html(i),
            n.options.startLanguage == e && t("#" + n.id + "_captions_" + e).prop("checked", !0).trigger("click"),
            n.adjustLanguageBox()
        },
        addTrackButton: function(e, i) {
            var n = this;
            "" === i && (i = mejs.language.codes[e] || e),
            n.captionsButton.find("ul").append(t('<li><input type="radio" name="' + n.id + '_captions" id="' + n.id + "_captions_" + e + '" value="' + e + '" disabled="disabled" /><label for="' + n.id + "_captions_" + e + '">' + i + " (loading)</label></li>")),
            n.adjustLanguageBox(),
            n.container.find(".mejs-captions-translations option[value=" + e + "]").remove()
        },
        adjustLanguageBox: function() {
            var t = this;
            t.captionsButton.find(".mejs-captions-selector").height(t.captionsButton.find(".mejs-captions-selector ul").outerHeight(!0) + t.captionsButton.find(".mejs-captions-translations").outerHeight(!0))
        },
        checkForTracks: function() {
            var t = this,
            e = !1;
            if (t.options.hideCaptionsButtonWhenEmpty) {
                for (i = 0; i < t.tracks.length; i++) if ("subtitles" == t.tracks[i].kind) {
                    e = !0;
                    break
                }
                e || (t.captionsButton.hide(), t.setControlsSize())
            }
        },
        displayCaptions: function() {
            if ("undefined" != typeof this.tracks) {
                var t, e = this,
                i = e.selectedTrack;
                if (null !== i && i.isLoaded) {
                    for (t = 0; t < i.entries.times.length; t++) if (e.media.currentTime >= i.entries.times[t].start && e.media.currentTime <= i.entries.times[t].stop) return e.captionsText.html(i.entries.text[t]).attr("class", "mejs-captions-text " + (i.entries.times[t].identifier || "")),
                    void e.captions.show().height(0);
                    e.captions.hide()
                } else e.captions.hide()
            }
        },
        setupSlides: function(t) {
            var e = this;
            e.slides = t,
            e.slides.entries.imgs = [e.slides.entries.text.length],
            e.showSlide(0)
        },
        showSlide: function(e) {
            if ("undefined" != typeof this.tracks && "undefined" != typeof this.slidesContainer) {
                var i = this,
                n = i.slides.entries.text[e],
                s = i.slides.entries.imgs[e];
                "undefined" == typeof s || "undefined" == typeof s.fadeIn ? i.slides.entries.imgs[e] = s = t('<img src="' + n + '">').on("load",
                function() {
                    s.appendTo(i.slidesContainer).hide().fadeIn().siblings(":visible").fadeOut()
                }) : s.is(":visible") || s.is(":animated") || s.fadeIn().siblings(":visible").fadeOut()
            }
        },
        displaySlides: function() {
            if ("undefined" != typeof this.slides) {
                var t, e = this,
                i = e.slides;
                for (t = 0; t < i.entries.times.length; t++) if (e.media.currentTime >= i.entries.times[t].start && e.media.currentTime <= i.entries.times[t].stop) return void e.showSlide(t)
            }
        },
        displayChapters: function() {
            var t, e = this;
            for (t = 0; t < e.tracks.length; t++) if ("chapters" == e.tracks[t].kind && e.tracks[t].isLoaded) {
                e.drawChapters(e.tracks[t]),
                e.hasChapters = !0;
                break
            }
        },
        drawChapters: function(e) {
            var i, n, s = this,
            o = 0,
            a = 0;
            for (s.chapters.empty(), i = 0; i < e.entries.times.length; i++) n = e.entries.times[i].stop - e.entries.times[i].start,
            o = Math.floor(n / s.media.duration * 100),
            (o + a > 100 || i == e.entries.times.length - 1 && 100 > o + a) && (o = 100 - a),
            s.chapters.append(t('<div class="mejs-chapter" rel="' + e.entries.times[i].start + '" style="left: ' + a.toString() + "%;width: " + o.toString() + '%;"><div class="mejs-chapter-block' + (i == e.entries.times.length - 1 ? " mejs-chapter-block-last": "") + '"><span class="ch-title">' + e.entries.text[i] + '</span><span class="ch-time">' + mejs.Utility.secondsToTimeCode(e.entries.times[i].start) + "&ndash;" + mejs.Utility.secondsToTimeCode(e.entries.times[i].stop) + "</span></div></div>")),
            a += o;
            s.chapters.find("div.mejs-chapter").click(function() {
                s.media.setCurrentTime(parseFloat(t(this).attr("rel"))),
                s.media.paused && s.media.play()
            }),
            s.chapters.show()
        }
    }),
    mejs.language = {
        codes: {
            af: "Afrikaans",
            sq: "Albanian",
            ar: "Arabic",
            be: "Belarusian",
            bg: "Bulgarian",
            ca: "Catalan",
            zh: "Chinese",
            "zh-cn": "Chinese Simplified",
            "zh-tw": "Chinese Traditional",
            hr: "Croatian",
            cs: "Czech",
            da: "Danish",
            nl: "Dutch",
            en: "English",
            et: "Estonian",
            fl: "Filipino",
            fi: "Finnish",
            fr: "French",
            gl: "Galician",
            de: "German",
            el: "Greek",
            ht: "Haitian Creole",
            iw: "Hebrew",
            hi: "Hindi",
            hu: "Hungarian",
            is: "Icelandic",
            id: "Indonesian",
            ga: "Irish",
            it: "Italian",
            ja: "Japanese",
            ko: "Korean",
            lv: "Latvian",
            lt: "Lithuanian",
            mk: "Macedonian",
            ms: "Malay",
            mt: "Maltese",
            no: "Norwegian",
            fa: "Persian",
            pl: "Polish",
            pt: "Portuguese",
            ro: "Romanian",
            ru: "Russian",
            sr: "Serbian",
            sk: "Slovak",
            sl: "Slovenian",
            es: "Spanish",
            sw: "Swahili",
            sv: "Swedish",
            tl: "Tagalog",
            th: "Thai",
            tr: "Turkish",
            uk: "Ukrainian",
            vi: "Vietnamese",
            cy: "Welsh",
            yi: "Yiddish"
        }
    },
    mejs.TrackFormatParser = {
        webvtt: {
            pattern_timecode: /^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
            parse: function(e) {
                for (var i, n, s, o = 0,
                a = mejs.TrackFormatParser.split2(e, /\r?\n/), r = {
                    text: [],
                    times: []
                }; o < a.length; o++) {
                    if (i = this.pattern_timecode.exec(a[o]), i && o < a.length) {
                        for (o - 1 >= 0 && "" !== a[o - 1] && (s = a[o - 1]), o++, n = a[o], o++;
                        "" !== a[o] && o < a.length;) n = n + "\n" + a[o],
                        o++;
                        n = t.trim(n).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"),
                        r.text.push(n),
                        r.times.push({
                            identifier: s,
                            start: 0 === mejs.Utility.convertSMPTEtoSeconds(i[1]) ? .2 : mejs.Utility.convertSMPTEtoSeconds(i[1]),
                            stop: mejs.Utility.convertSMPTEtoSeconds(i[3]),
                            settings: i[5]
                        })
                    }
                    s = ""
                }
                return r
            }
        },
        dfxp: {
            parse: function(e) {
                e = t(e).filter("tt");
                var i, n, s = 0,
                o = e.children("div").eq(0),
                a = o.find("p"),
                r = e.find("#" + o.attr("style")),
                l = {
                    text: [],
                    times: []
                };
                if (r.length) {
                    var h = r.removeAttr("id").get(0).attributes;
                    if (h.length) for (i = {},
                    s = 0; s < h.length; s++) i[h[s].name.split(":")[1]] = h[s].value
                }
                for (s = 0; s < a.length; s++) {
                    var u, c = {
                        start: null,
                        stop: null,
                        style: null
                    };
                    if (a.eq(s).attr("begin") && (c.start = mejs.Utility.convertSMPTEtoSeconds(a.eq(s).attr("begin"))), !c.start && a.eq(s - 1).attr("end") && (c.start = mejs.Utility.convertSMPTEtoSeconds(a.eq(s - 1).attr("end"))), a.eq(s).attr("end") && (c.stop = mejs.Utility.convertSMPTEtoSeconds(a.eq(s).attr("end"))), !c.stop && a.eq(s + 1).attr("begin") && (c.stop = mejs.Utility.convertSMPTEtoSeconds(a.eq(s + 1).attr("begin"))), i) {
                        u = "";
                        for (var d in i) u += d + ":" + i[d] + ";"
                    }
                    u && (c.style = u),
                    0 === c.start && (c.start = .2),
                    l.times.push(c),
                    n = t.trim(a.eq(s).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"),
                    l.text.push(n),
                    0 === l.times.start && (l.times.start = 2)
                }
                return l
            }
        },
        split2: function(t, e) {
            return t.split(e)
        }
    },
    3 != "x\n\ny".split(/\n/gi).length && (mejs.TrackFormatParser.split2 = function(t, e) {
        var i, n = [],
        s = "";
        for (i = 0; i < t.length; i++) s += t.substring(i, i + 1),
        e.test(s) && (n.push(s.replace(e, "")), s = "");
        return n.push(s),
        n
    })
} (mejs.$),
function(t) {
    t.extend(mejs.MepDefaults, {
        contextMenuItems: [{
            render: function(t) {
                return "undefined" == typeof t.enterFullScreen ? null: mejs.i18n.t(t.isFullScreen ? "Turn off Fullscreen": "Go Fullscreen")
            },
            click: function(t) {
                t.isFullScreen ? t.exitFullScreen() : t.enterFullScreen()
            }
        },
        {
            render: function(t) {
                return mejs.i18n.t(t.media.muted ? "Unmute": "Mute")
            },
            click: function(t) {
                t.setMuted(t.media.muted ? !1 : !0)
            }
        },
        {
            isSeparator: !0
        },
        {
            render: function(t) {
                return mejs.i18n.t("Download Video")
            },
            click: function(t) {
                window.location.href = t.media.currentSrc
            }
        }]
    }),
    t.extend(MediaElementPlayer.prototype, {
        buildcontextmenu: function(e, i, n, s) {
            e.contextMenu = t('<div class="mejs-contextmenu"></div>').appendTo(t("body")).hide(),
            e.container.bind("contextmenu",
            function(t) {
                return e.isContextMenuEnabled ? (t.preventDefault(), e.renderContextMenu(t.clientX - 1, t.clientY - 1), !1) : void 0
            }),
            e.container.bind("click",
            function() {
                e.contextMenu.hide()
            }),
            e.contextMenu.bind("mouseleave",
            function() {
                e.startContextMenuTimer()
            })
        },
        cleancontextmenu: function(t) {
            t.contextMenu.remove()
        },
        isContextMenuEnabled: !0,
        enableContextMenu: function() {
            this.isContextMenuEnabled = !0
        },
        disableContextMenu: function() {
            this.isContextMenuEnabled = !1
        },
        contextMenuTimeout: null,
        startContextMenuTimer: function() {
            var t = this;
            t.killContextMenuTimer(),
            t.contextMenuTimer = setTimeout(function() {
                t.hideContextMenu(),
                t.killContextMenuTimer()
            },
            750)
        },
        killContextMenuTimer: function() {
            var t = this.contextMenuTimer;
            null != t && (clearTimeout(t), delete t, t = null)
        },
        hideContextMenu: function() {
            this.contextMenu.hide()
        },
        renderContextMenu: function(e, i) {
            for (var n = this,
            s = "",
            o = n.options.contextMenuItems,
            a = 0,
            r = o.length; r > a; a++) if (o[a].isSeparator) s += '<div class="mejs-contextmenu-separator"></div>';
            else {
                var l = o[a].render(n);
                null != l && (s += '<div class="mejs-contextmenu-item" data-itemindex="' + a + '" id="element-' + 1e6 * Math.random() + '">' + l + "</div>")
            }
            n.contextMenu.empty().append(t(s)).css({
                top: i,
                left: e
            }).show(),
            n.contextMenu.find(".mejs-contextmenu-item").each(function() {
                var e = t(this),
                i = parseInt(e.data("itemindex"), 10),
                s = n.options.contextMenuItems[i];
                "undefined" != typeof s.show && s.show(e, n),
                e.click(function() {
                    "undefined" != typeof s.click && s.click(n),
                    n.contextMenu.hide()
                })
            }),
            setTimeout(function() {
                n.killControlsTimer("rev3")
            },
            100)
        }
    })
} (mejs.$),
function(t) {
    t.extend(mejs.MepDefaults, {
        postrollCloseText: mejs.i18n.t("Close")
    }),
    t.extend(MediaElementPlayer.prototype, {
        buildpostroll: function(e, i, n, s) {
            var o = this,
            a = o.container.find('link[rel="postroll"]').attr("href");
            "undefined" != typeof a && (e.postroll = t('<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">' + o.options.postrollCloseText + '</a><div class="mejs-postroll-layer-content"></div></div>').prependTo(n).hide(), o.media.addEventListener("ended",
            function(i) {
                t.ajax({
                    dataType: "html",
                    url: a,
                    success: function(t, e) {
                        n.find(".mejs-postroll-layer-content").html(t)
                    }
                }),
                e.postroll.show()
            },
            !1))
        }
    })
} (mejs.$),
!
function(t) {
    var e, i, n = "0.4.2",
    s = "hasOwnProperty",
    o = /[\.\/]/,
    a = "*",
    r = function() {},
    l = function(t, e) {
        return t - e
    },
    h = {
        n: {}
    },
    u = function(t, n) {
        t = String(t);
        var s, o = i,
        a = Array.prototype.slice.call(arguments, 2),
        r = u.listeners(t),
        h = 0,
        c = [],
        d = {},
        p = [],
        f = e;
        e = t,
        i = 0;
        for (var m = 0,
        g = r.length; g > m; m++)"zIndex" in r[m] && (c.push(r[m].zIndex), r[m].zIndex < 0 && (d[r[m].zIndex] = r[m]));
        for (c.sort(l); c[h] < 0;) if (s = d[c[h++]], p.push(s.apply(n, a)), i) return i = o,
        p;
        for (m = 0; g > m; m++) if (s = r[m], "zIndex" in s) if (s.zIndex == c[h]) {
            if (p.push(s.apply(n, a)), i) break;
            do
            if (h++, s = d[c[h]], s && p.push(s.apply(n, a)), i) break;
            while (s)
        } else d[s.zIndex] = s;
        else if (p.push(s.apply(n, a)), i) break;
        return i = o,
        e = f,
        p.length ? p: null
    };
    u._events = h,
    u.listeners = function(t) {
        var e, i, n, s, r, l, u, c, d = t.split(o),
        p = h,
        f = [p],
        m = [];
        for (s = 0, r = d.length; r > s; s++) {
            for (c = [], l = 0, u = f.length; u > l; l++) for (p = f[l].n, i = [p[d[s]], p[a]], n = 2; n--;) e = i[n],
            e && (c.push(e), m = m.concat(e.f || []));
            f = c
        }
        return m
    },
    u.on = function(t, e) {
        if (t = String(t), "function" != typeof e) return function() {};
        for (var i = t.split(o), n = h, s = 0, a = i.length; a > s; s++) n = n.n,
        n = n.hasOwnProperty(i[s]) && n[i[s]] || (n[i[s]] = {
            n: {}
        });
        for (n.f = n.f || [], s = 0, a = n.f.length; a > s; s++) if (n.f[s] == e) return r;
        return n.f.push(e),
        function(t) { + t == +t && (e.zIndex = +t)
        }
    },
    u.f = function(t) {
        var e = [].slice.call(arguments, 1);
        return function() {
            u.apply(null, [t, null].concat(e).concat([].slice.call(arguments, 0)))
        }
    },
    u.stop = function() {
        i = 1
    },
    u.nt = function(t) {
        return t ? new RegExp("(?:\\.|\\/|^)" + t + "(?:\\.|\\/|$)").test(e) : e
    },
    u.nts = function() {
        return e.split(o)
    },
    u.off = u.unbind = function(t, e) {
        if (!t) return void(u._events = h = {
            n: {}
        });
        var i, n, r, l, c, d, p, f = t.split(o),
        m = [h];
        for (l = 0, c = f.length; c > l; l++) for (d = 0; d < m.length; d += r.length - 2) {
            if (r = [d, 1], i = m[d].n, f[l] != a) i[f[l]] && r.push(i[f[l]]);
            else for (n in i) i[s](n) && r.push(i[n]);
            m.splice.apply(m, r)
        }
        for (l = 0, c = m.length; c > l; l++) for (i = m[l]; i.n;) {
            if (e) {
                if (i.f) {
                    for (d = 0, p = i.f.length; p > d; d++) if (i.f[d] == e) {
                        i.f.splice(d, 1);
                        break
                    } ! i.f.length && delete i.f
                }
                for (n in i.n) if (i.n[s](n) && i.n[n].f) {
                    var g = i.n[n].f;
                    for (d = 0, p = g.length; p > d; d++) if (g[d] == e) {
                        g.splice(d, 1);
                        break
                    } ! g.length && delete i.n[n].f
                }
            } else {
                delete i.f;
                for (n in i.n) i.n[s](n) && i.n[n].f && delete i.n[n].f
            }
            i = i.n
        }
    },
    u.once = function(t, e) {
        var i = function() {
            return u.unbind(t, i),
            e.apply(this, arguments)
        };
        return u.on(t, i)
    },
    u.version = n,
    u.toString = function() {
        return "You are running Eve " + n
    },
    "undefined" != typeof module && module.exports ? module.exports = u: "undefined" != typeof define ? define("eve", [],
    function() {
        return u
    }) : t.eve = u
} (this),
function(t, e) {
    "function" == typeof define && define.amd ? define(["eve"],
    function(i) {
        return e(t, i)
    }) : e(t, t.eve)
} (this,
function(t, e) {
    var i = function(e) {
        var i = {},
        n = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame ||
        function(t) {
            setTimeout(t, 16)
        },
        s = Array.isArray ||
        function(t) {
            return t instanceof Array || "[object Array]" == Object.prototype.toString.call(t)
        },
        o = 0,
        a = "M" + ( + new Date).toString(36),
        r = function() {
            return a + (o++).toString(36)
        },
        l = Date.now ||
        function() {
            return + new Date
        },
        h = function(t) {
            var e = this;
            if (null == t) return e.s;
            var i = e.s - t;
            e.b += e.dur * i,
            e.B += e.dur * i,
            e.s = t
        },
        u = function(t) {
            var e = this;
            return null == t ? e.spd: void(e.spd = t)
        },
        c = function(t) {
            var e = this;
            return null == t ? e.dur: (e.s = e.s * t / e.dur, void(e.dur = t))
        },
        d = function() {
            var t = this;
            delete i[t.id],
            e("mina.stop." + t.id, t)
        },
        p = function() {
            var t = this;
            t.pdif || (delete i[t.id], t.pdif = t.get() - t.b)
        },
        f = function() {
            var t = this;
            t.pdif && (t.b = t.get() - t.pdif, delete t.pdif, i[t.id] = t)
        },
        m = function() {
            var t = 0;
            for (var o in i) if (i.hasOwnProperty(o)) {
                var a, r = i[o],
                l = r.get();
                if (t++, r.s = (l - r.b) / (r.dur / r.spd), r.s >= 1 && (delete i[o], r.s = 1, t--,
                function(t) {
                    setTimeout(function() {
                        e("mina.finish." + t.id, t)
                    })
                } (r)), s(r.start)) {
                    a = [];
                    for (var h = 0,
                    u = r.start.length; u > h; h++) a[h] = +r.start[h] + (r.end[h] - r.start[h]) * r.easing(r.s)
                } else a = +r.start + (r.end - r.start) * r.easing(r.s);
                r.set(a)
            }
            t && n(m)
        },
        g = function(t, e, s, o, a, l, v) {
            var b = {
                id: r(),
                start: t,
                end: e,
                b: s,
                s: 0,
                dur: o - s,
                spd: 1,
                get: a,
                set: l,
                easing: v || g.linear,
                status: h,
                speed: u,
                duration: c,
                stop: d,
                pause: p,
                resume: f
            };
            i[b.id] = b;
            var y, _ = 0;
            for (y in i) if (i.hasOwnProperty(y) && (_++, 2 == _)) break;
            return 1 == _ && n(m),
            b
        };
        return g.time = l,
        g.getById = function(t) {
            return i[t] || null
        },
        g.linear = function(t) {
            return t
        },
        g.easeout = function(t) {
            return Math.pow(t, 1.7)
        },
        g.easein = function(t) {
            return Math.pow(t, .48)
        },
        g.easeinout = function(t) {
            if (1 == t) return 1;
            if (0 == t) return 0;
            var e = .48 - t / 1.04,
            i = Math.sqrt(.1734 + e * e),
            n = i - e,
            s = Math.pow(Math.abs(n), 1 / 3) * (0 > n ? -1 : 1),
            o = -i - e,
            a = Math.pow(Math.abs(o), 1 / 3) * (0 > o ? -1 : 1),
            r = s + a + .5;
            return 3 * (1 - r) * r * r + r * r * r
        },
        g.backin = function(t) {
            if (1 == t) return 1;
            var e = 1.70158;
            return t * t * ((e + 1) * t - e)
        },
        g.backout = function(t) {
            if (0 == t) return 0;
            t -= 1;
            var e = 1.70158;
            return t * t * ((e + 1) * t + e) + 1
        },
        g.elastic = function(t) {
            return t == !!t ? t: Math.pow(2, -10 * t) * Math.sin(2 * (t - .075) * Math.PI / .3) + 1
        },
        g.bounce = function(t) {
            var e, i = 7.5625,
            n = 2.75;
            return 1 / n > t ? e = i * t * t: 2 / n > t ? (t -= 1.5 / n, e = i * t * t + .75) : 2.5 / n > t ? (t -= 2.25 / n, e = i * t * t + .9375) : (t -= 2.625 / n, e = i * t * t + .984375),
            e
        },
        t.mina = g,
        g
    } ("undefined" == typeof e ?
    function() {}: e),
    n = function() {
        function n(t, e) {
            if (t) {
                if (t.tagName) return T(t);
                if (t instanceof _) return t;
                if (null == e) return t = N.doc.querySelector(t),
                T(t)
            }
            return t = null == t ? "100%": t,
            e = null == e ? "100%": e,
            new C(t, e)
        }
        function s(t, e) {
            if (e) {
                if ("string" == typeof t && (t = s(t)), "string" == typeof e) return "xlink:" == e.substring(0, 6) ? t.getAttributeNS(ot, e.substring(6)) : "xml:" == e.substring(0, 4) ? t.getAttributeNS(at, e.substring(4)) : t.getAttribute(e);
                for (var i in e) if (e[F](i)) {
                    var n = z(e[i]);
                    n ? "xlink:" == i.substring(0, 6) ? t.setAttributeNS(ot, i.substring(6), n) : "xml:" == i.substring(0, 4) ? t.setAttributeNS(at, i.substring(4), n) : t.setAttribute(i, n) : t.removeAttribute(i)
                }
            } else t = N.doc.createElementNS(at, t);
            return t
        }
        function o(t, e) {
            return e = z.prototype.toLowerCase.call(e),
            "finite" == e ? isFinite(t) : "array" == e && (t instanceof Array || Array.isArray && Array.isArray(t)) ? !0 : "null" == e && null === t || e == typeof t && null !== t || "object" == e && t === Object(t) || q.call(t).slice(8, -1).toLowerCase() == e
        }
        function a(t) {
            if ("function" == typeof t || Object(t) !== t) return t;
            var e = new t.constructor;
            for (var i in t) t[F](i) && (e[i] = a(t[i]));
            return e
        }
        function r(t, e) {
            for (var i = 0,
            n = t.length; n > i; i++) if (t[i] === e) return t.push(t.splice(i, 1)[0])
        }
        function l(t, e, i) {
            function n() {
                var s = Array.prototype.slice.call(arguments, 0),
                o = s.join("â€"),
                a = n.cache = n.cache || {},
                l = n.count = n.count || [];
                return a[F](o) ? (r(l, o), i ? i(a[o]) : a[o]) : (l.length >= 1e3 && delete a[l.shift()], l.push(o), a[o] = t.apply(e, s), i ? i(a[o]) : a[o])
            }
            return n
        }
        function h(t, e, i, n, s, o) {
            if (null == s) {
                var a = t - i,
                r = e - n;
                return a || r ? (180 + 180 * W.atan2( - r, -a) / $ + 360) % 360 : 0
            }
            return h(t, e, s, o) - h(i, n, s, o)
        }
        function u(t) {
            return t % 360 * $ / 180
        }
        function c(t) {
            return 180 * t / $ % 360
        }
        function d(t, e, i, n, s, o) {
            return null == e && "[object SVGMatrix]" == q.call(t) ? (this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.e = t.e, void(this.f = t.f)) : void(null != t ? (this.a = +t, this.b = +e, this.c = +i, this.d = +n, this.e = +s, this.f = +o) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0))
        }
        function p(t) {
            var e = [];
            return t = t.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g,
            function(t, i, n) {
                return n = n.split(/\s*,\s*|\s+/),
                "rotate" == i && 1 == n.length && n.push(0, 0),
                "scale" == i && (2 == n.length && n.push(0, 0), 1 == n.length && n.push(n[0], 0, 0)),
                e.push("skewX" == i ? ["m", 1, 0, W.tan(u(n[0])), 1, 0, 0] : "skewY" == i ? ["m", 1, W.tan(u(n[0])), 0, 1, 0, 0] : [i.charAt(0)].concat(n)),
                t
            }),
            e
        }
        function f(t, e) {
            var i = gt(t),
            n = new d;
            if (i) for (var s = 0,
            o = i.length; o > s; s++) {
                var a, r, l, h, u, c = i[s],
                p = c.length,
                f = z(c[0]).toLowerCase(),
                m = c[0] != f,
                g = m ? n.invert() : 0;
                "t" == f && 2 == p ? n.translate(c[1], 0) : "t" == f && 3 == p ? m ? (a = g.x(0, 0), r = g.y(0, 0), l = g.x(c[1], c[2]), h = g.y(c[1], c[2]), n.translate(l - a, h - r)) : n.translate(c[1], c[2]) : "r" == f ? 2 == p ? (u = u || e, n.rotate(c[1], u.x + u.width / 2, u.y + u.height / 2)) : 4 == p && (m ? (l = g.x(c[2], c[3]), h = g.y(c[2], c[3]), n.rotate(c[1], l, h)) : n.rotate(c[1], c[2], c[3])) : "s" == f ? 2 == p || 3 == p ? (u = u || e, n.scale(c[1], c[p - 1], u.x + u.width / 2, u.y + u.height / 2)) : 4 == p ? m ? (l = g.x(c[2], c[3]), h = g.y(c[2], c[3]), n.scale(c[1], c[1], l, h)) : n.scale(c[1], c[1], c[2], c[3]) : 5 == p && (m ? (l = g.x(c[3], c[4]), h = g.y(c[3], c[4]), n.scale(c[1], c[2], l, h)) : n.scale(c[1], c[2], c[3], c[4])) : "m" == f && 7 == p && n.add(c[1], c[2], c[3], c[4], c[5], c[6])
            }
            return n
        }
        function m(t, e) {
            if (null == e) {
                var i = !0;
                if (e = t.node.getAttribute("linearGradient" == t.type || "radialGradient" == t.type ? "gradientTransform": "pattern" == t.type ? "patternTransform": "transform"), !e) return new d;
                e = p(e)
            } else e = n._.rgTransform.test(e) ? z(e).replace(/\.{3}|\u2026/g, t._.transform || V) : p(e),
            o(e, "array") && (e = n.path ? n.path.toString.call(e) : z(e)),
            t._.transform = e;
            var s = f(e, t.getBBox(1));
            return i ? s: void(t.matrix = s)
        }
        function v(t) {
            var e = n._.someDefs;
            if (e && vt(e.ownerDocument.documentElement, e)) return e;
            var i = t.node.ownerSVGElement && T(t.node.ownerSVGElement) || t.node.parentNode && T(t.node.parentNode) || n.select("svg") || n(0, 0),
            s = i.select("defs"),
            o = null == s ? !1 : s.node;
            return o || (o = k("defs", i.node).node),
            n._.someDefs = o,
            o
        }
        function b(t, e, i) {
            function n(t) {
                return null == t ? V: t == +t ? t: (s(h, {
                    width: t
                }), h.getBBox().width)
            }
            function o(t) {
                return null == t ? V: t == +t ? t: (s(h, {
                    height: t
                }), h.getBBox().height)
            }
            function a(n, s) {
                null == e ? l[n] = s(t.attr(n)) : n == e && (l = s(null == i ? t.attr(n) : i))
            }
            var r = v(t),
            l = {},
            h = r.querySelector(".svg---mgr");
            switch (h || (h = s("rect"), s(h, {
                width: 10,
                height: 10,
                "class": "svg---mgr"
            }), r.appendChild(h)), t.type) {
            case "rect":
                a("rx", n),
                a("ry", o);
            case "image":
                a("width", n),
                a("height", o);
            case "text":
                a("x", n),
                a("y", o);
                break;
            case "circle":
                a("cx", n),
                a("cy", o),
                a("r", n);
                break;
            case "ellipse":
                a("cx", n),
                a("cy", o),
                a("rx", n),
                a("ry", o);
                break;
            case "line":
                a("x1", n),
                a("x2", n),
                a("y1", o),
                a("y2", o);
                break;
            case "marker":
                a("refX", n),
                a("markerWidth", n),
                a("refY", o),
                a("markerHeight", o);
                break;
            case "radialGradient":
                a("fx", n),
                a("fy", o);
                break;
            case "tspan":
                a("dx", n),
                a("dy", o);
                break;
            default:
                a(e, n)
            }
            return l
        }
        function y(t) {
            o(t, "array") || (t = Array.prototype.slice.call(arguments, 0));
            for (var e = 0,
            i = 0,
            n = this.node; this[e];) delete this[e++];
            for (e = 0; e < t.length; e++)"set" == t[e].type ? t[e].forEach(function(t) {
                n.appendChild(t.node)
            }) : n.appendChild(t[e].node);
            var s = n.childNodes;
            for (e = 0; e < s.length; e++) this[i++] = T(s[e]);
            return this
        }
        function _(t) {
            if (t.snap in rt) return rt[t.snap];
            var e, i = this.id = st();
            try {
                e = t.ownerSVGElement
            } catch(n) {}
            if (this.node = t, e && (this.paper = new C(e)), this.type = t.tagName, this.anims = {},
            this._ = {
                transform: []
            },
            t.snap = i, rt[i] = this, "g" == this.type) {
                this.add = y;
                for (var s in C.prototype) C.prototype[F](s) && (this[s] = C.prototype[s])
            }
        }
        function w(t) {
            for (var e, i = 0,
            n = t.length; n > i; i++) if (e = e || t[i]) return e
        }
        function x(t) {
            this.node = t
        }
        function k(t, e) {
            var i = s(t);
            e.appendChild(i);
            var n = T(i);
            return n.type = t,
            n
        }
        function C(t, e) {
            var i, n, o, a = C.prototype;
            if (t && "svg" == t.tagName) {
                if (t.snap in rt) return rt[t.snap];
                i = new _(t),
                n = t.getElementsByTagName("desc")[0],
                o = t.getElementsByTagName("defs")[0],
                n || (n = s("desc"), n.appendChild(N.doc.createTextNode("Created with Snap")), i.node.appendChild(n)),
                o || (o = s("defs"), i.node.appendChild(o)),
                i.defs = o;
                for (var r in a) a[F](r) && (i[r] = a[r]);
                i.paper = i.root = i
            } else i = k("svg", N.doc.body),
            s(i.node, {
                height: e,
                version: 1.1,
                width: t,
                xmlns: at
            });
            return i
        }
        function T(t) {
            return t ? t instanceof _ || t instanceof x ? t: "svg" == t.tagName ? new C(t) : new _(t) : t
        }
        function S() {
            return this.selectAll("stop")
        }
        function D(t, e) {
            var i = s("stop"),
            o = {
                offset: +e + "%"
            };
            return t = n.color(t),
            o["stop-color"] = t.hex,
            t.opacity < 1 && (o["stop-opacity"] = t.opacity),
            s(i, o),
            this.node.appendChild(i),
            this
        }
        function M() {
            if ("linearGradient" == this.type) {
                var t = s(this.node, "x1") || 0,
                e = s(this.node, "x2") || 1,
                i = s(this.node, "y1") || 0,
                o = s(this.node, "y2") || 0;
                return n._.box(t, i, W.abs(e - t), W.abs(o - i))
            }
            var a = this.node.cx || .5,
            r = this.node.cy || .5,
            l = this.node.r || 0;
            return n._.box(a - l, r - l, 2 * l, 2 * l)
        }
        function I(t, i) {
            function n(t, e) {
                for (var i = (e - h) / (t - u), n = u; t > n; n++) r[n].offset = +( + h + i * (n - u)).toFixed(2);
                u = t,
                h = e
            }
            var o, a = w(e("snap.util.grad.parse", null, i));
            if (!a) return null;
            a.params.unshift(t),
            o = "l" == a.type.toLowerCase() ? P.apply(0, a.params) : E.apply(0, a.params),
            a.type != a.type.toLowerCase() && s(o.node, {
                gradientUnits: "userSpaceOnUse"
            });
            var r = a.stops,
            l = r.length,
            h = 0,
            u = 0;
            l--;
            for (var c = 0; l > c; c++)"offset" in r[c] && n(c, r[c].offset);
            for (r[l].offset = r[l].offset || 100, n(l, r[l].offset), c = 0; l >= c; c++) {
                var d = r[c];
                o.addStop(d.color, d.offset)
            }
            return o
        }
        function P(t, e, i, n, o) {
            var a = k("linearGradient", t);
            return a.stops = S,
            a.addStop = D,
            a.getBBox = M,
            null != e && s(a.node, {
                x1: e,
                y1: i,
                x2: n,
                y2: o
            }),
            a
        }
        function E(t, e, i, n, o, a) {
            var r = k("radialGradient", t);
            return r.stops = S,
            r.addStop = D,
            r.getBBox = M,
            null != e && s(r.node, {
                cx: e,
                cy: i,
                r: n
            }),
            null != o && null != a && s(r.node, {
                fx: o,
                fy: a
            }),
            r
        }
        function j(t) {
            return function(i) {
                if (e.stop(), i instanceof x && 1 == i.node.childNodes.length && ("radialGradient" == i.node.firstChild.tagName || "linearGradient" == i.node.firstChild.tagName || "pattern" == i.node.firstChild.tagName) && (i = i.node.firstChild, v(this).appendChild(i), i = T(i)), i instanceof _) if ("radialGradient" == i.type || "linearGradient" == i.type || "pattern" == i.type) {
                    i.node.id || s(i.node, {
                        id: i.id
                    });
                    var o = lt(i.node.id)
                } else o = i.attr(t);
                else if (o = n.color(i), o.error) {
                    var a = I(v(this), i);
                    a ? (a.node.id || s(a.node, {
                        id: a.id
                    }), o = lt(a.node.id)) : o = i
                } else o = z(o);
                var r = {};
                r[t] = o,
                s(this.node, r),
                this.node.style[t] = V;

            }
        }
        function A(t) {
            for (var e = [], i = t.childNodes, n = 0, s = i.length; s > n; n++) {
                var o = i[n];
                3 == o.nodeType && e.push(o.nodeValue),
                "tspan" == o.tagName && e.push(1 == o.childNodes.length && 3 == o.firstChild.nodeType ? o.firstChild.nodeValue: A(o))
            }
            return e
        }
        n.version = "0.2.0",
        n.toString = function() {
            return "Snap v" + this.version
        },
        n._ = {};
        var N = {
            win: t,
            doc: t.document
        };
        n._.glob = N;
        var F = "hasOwnProperty",
        z = String,
        H = parseFloat,
        O = parseInt,
        W = Math,
        B = W.max,
        L = W.min,
        R = W.abs,
        $ = (W.pow, W.PI),
        V = (W.round, ""),
        U = " ",
        q = Object.prototype.toString,
        Y = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,
        K = /^url\(#?([^)]+)\)$/,
        G = "   \n\f\r Â áš€á Žâ€€â€â€‚â€ƒâ€„â€…â€†â€‡â€ˆâ€‰â€Šâ€¯âŸã€€\u2028\u2029",
        X = new RegExp("[," + G + "]+"),
        Q = (new RegExp("[" + G + "]", "g"), new RegExp("[" + G + "]*,[" + G + "]*")),
        Z = {
            hs: 1,
            rg: 1
        },
        J = new RegExp("([a-z])[" + G + ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[" + G + "]*,?[" + G + "]*)+)", "ig"),
        tt = new RegExp("([rstm])[" + G + ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[" + G + "]*,?[" + G + "]*)+)", "ig"),
        et = new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[" + G + "]*,?[" + G + "]*", "ig"),
        it = 0,
        nt = "S" + ( + new Date).toString(36),
        st = function() {
            return nt + (it++).toString(36)
        },
        ot = "http://www.w3.org/1999/xlink",
        at = "http://www.w3.org/2000/svg",
        rt = {},
        lt = n.url = function(t) {
            return "url('#" + t + "')"
        };
        n._.$ = s,
        n._.id = st,
        n.format = function() {
            var t = /\{([^\}]+)\}/g,
            e = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
            i = function(t, i, n) {
                var s = n;
                return i.replace(e,
                function(t, e, i, n, o) {
                    e = e || n,
                    s && (e in s && (s = s[e]), "function" == typeof s && o && (s = s()))
                }),
                s = (null == s || s == n ? t: s) + ""
            };
            return function(e, n) {
                return z(e).replace(t,
                function(t, e) {
                    return i(t, e, n)
                })
            }
        } ();
        var ht = function() {
            function t() {
                this.parentNode.removeChild(this)
            }
            return function(e, i) {
                var n = N.doc.createElement("img"),
                s = N.doc.body;
                n.style.cssText = "position:absolute;left:-9999em;top:-9999em",
                n.onload = function() {
                    i.call(n),
                    n.onload = n.onerror = null,
                    s.removeChild(n)
                },
                n.onerror = t,
                s.appendChild(n),
                n.src = e
            }
        } ();
        n._.clone = a,
        n._.cacher = l,
        n.rad = u,
        n.deg = c,
        n.angle = h,
        n.is = o,
        n.snapTo = function(t, e, i) {
            if (i = o(i, "finite") ? i: 10, o(t, "array")) {
                for (var n = t.length; n--;) if (R(t[n] - e) <= i) return t[n]
            } else {
                t = +t;
                var s = e % t;
                if (i > s) return e - s;
                if (s > t - i) return e - s + t
            }
            return e
        },
        function(t) {
            function e(t) {
                return t[0] * t[0] + t[1] * t[1]
            }
            function i(t) {
                var i = W.sqrt(e(t));
                t[0] && (t[0] /= i),
                t[1] && (t[1] /= i)
            }
            t.add = function(t, e, i, n, s, o) {
                var a, r, l, h, u = [[], [], []],
                c = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]],
                p = [[t, i, s], [e, n, o], [0, 0, 1]];
                for (t && t instanceof d && (p = [[t.a, t.c, t.e], [t.b, t.d, t.f], [0, 0, 1]]), a = 0; 3 > a; a++) for (r = 0; 3 > r; r++) {
                    for (h = 0, l = 0; 3 > l; l++) h += c[a][l] * p[l][r];
                    u[a][r] = h
                }
                return this.a = u[0][0],
                this.b = u[1][0],
                this.c = u[0][1],
                this.d = u[1][1],
                this.e = u[0][2],
                this.f = u[1][2],
                this
            },
            t.invert = function() {
                var t = this,
                e = t.a * t.d - t.b * t.c;
                return new d(t.d / e, -t.b / e, -t.c / e, t.a / e, (t.c * t.f - t.d * t.e) / e, (t.b * t.e - t.a * t.f) / e)
            },
            t.clone = function() {
                return new d(this.a, this.b, this.c, this.d, this.e, this.f)
            },
            t.translate = function(t, e) {
                return this.add(1, 0, 0, 1, t, e)
            },
            t.scale = function(t, e, i, n) {
                return null == e && (e = t),
                (i || n) && this.add(1, 0, 0, 1, i, n),
                this.add(t, 0, 0, e, 0, 0),
                (i || n) && this.add(1, 0, 0, 1, -i, -n),
                this
            },
            t.rotate = function(t, e, i) {
                t = u(t),
                e = e || 0,
                i = i || 0;
                var n = +W.cos(t).toFixed(9),
                s = +W.sin(t).toFixed(9);
                return this.add(n, s, -s, n, e, i),
                this.add(1, 0, 0, 1, -e, -i)
            },
            t.x = function(t, e) {
                return t * this.a + e * this.c + this.e
            },
            t.y = function(t, e) {
                return t * this.b + e * this.d + this.f
            },
            t.get = function(t) {
                return + this[z.fromCharCode(97 + t)].toFixed(4)
            },
            t.toString = function() {
                return "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")"
            },
            t.offset = function() {
                return [this.e.toFixed(4), this.f.toFixed(4)]
            },
            t.split = function() {
                var t = {};
                t.dx = this.e,
                t.dy = this.f;
                var n = [[this.a, this.c], [this.b, this.d]];
                t.scalex = W.sqrt(e(n[0])),
                i(n[0]),
                t.shear = n[0][0] * n[1][0] + n[0][1] * n[1][1],
                n[1] = [n[1][0] - n[0][0] * t.shear, n[1][1] - n[0][1] * t.shear],
                t.scaley = W.sqrt(e(n[1])),
                i(n[1]),
                t.shear /= t.scaley;
                var s = -n[0][1],
                o = n[1][1];
                return 0 > o ? (t.rotate = c(W.acos(o)), 0 > s && (t.rotate = 360 - t.rotate)) : t.rotate = c(W.asin(s)),
                t.isSimple = !( + t.shear.toFixed(9) || t.scalex.toFixed(9) != t.scaley.toFixed(9) && t.rotate),
                t.isSuperSimple = !+t.shear.toFixed(9) && t.scalex.toFixed(9) == t.scaley.toFixed(9) && !t.rotate,
                t.noRotation = !+t.shear.toFixed(9) && !t.rotate,
                t
            },
            t.toTransformString = function(t) {
                var e = t || this.split();
                return e.isSimple ? (e.scalex = +e.scalex.toFixed(4), e.scaley = +e.scaley.toFixed(4), e.rotate = +e.rotate.toFixed(4), (e.dx || e.dy ? "t" + [ + e.dx.toFixed(4), +e.dy.toFixed(4)] : V) + (1 != e.scalex || 1 != e.scaley ? "s" + [e.scalex, e.scaley, 0, 0] : V) + (e.rotate ? "r" + [ + e.rotate.toFixed(4), 0, 0] : V)) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
            }
        } (d.prototype),
        n.Matrix = d,
        n.getRGB = l(function(t) {
            if (!t || (t = z(t)).indexOf("-") + 1) return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                error: 1,
                toString: pt
            };
            if ("none" == t) return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                toString: pt
            };
            if (! (Z[F](t.toLowerCase().substring(0, 2)) || "#" == t.charAt()) && (t = ut(t)), !t) return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                error: 1,
                toString: pt
            };
            var e, i, s, a, r, l, h = t.match(Y);
            return h ? (h[2] && (s = O(h[2].substring(5), 16), i = O(h[2].substring(3, 5), 16), e = O(h[2].substring(1, 3), 16)), h[3] && (s = O((r = h[3].charAt(3)) + r, 16), i = O((r = h[3].charAt(2)) + r, 16), e = O((r = h[3].charAt(1)) + r, 16)), h[4] && (l = h[4].split(Q), e = H(l[0]), "%" == l[0].slice( - 1) && (e *= 2.55), i = H(l[1]), "%" == l[1].slice( - 1) && (i *= 2.55), s = H(l[2]), "%" == l[2].slice( - 1) && (s *= 2.55), "rgba" == h[1].toLowerCase().slice(0, 4) && (a = H(l[3])), l[3] && "%" == l[3].slice( - 1) && (a /= 100)), h[5] ? (l = h[5].split(Q), e = H(l[0]), "%" == l[0].slice( - 1) && (e /= 100), i = H(l[1]), "%" == l[1].slice( - 1) && (i /= 100), s = H(l[2]), "%" == l[2].slice( - 1) && (s /= 100), ("deg" == l[0].slice( - 3) || "Â°" == l[0].slice( - 1)) && (e /= 360), "hsba" == h[1].toLowerCase().slice(0, 4) && (a = H(l[3])), l[3] && "%" == l[3].slice( - 1) && (a /= 100), n.hsb2rgb(e, i, s, a)) : h[6] ? (l = h[6].split(Q), e = H(l[0]), "%" == l[0].slice( - 1) && (e /= 100), i = H(l[1]), "%" == l[1].slice( - 1) && (i /= 100), s = H(l[2]), "%" == l[2].slice( - 1) && (s /= 100), ("deg" == l[0].slice( - 3) || "Â°" == l[0].slice( - 1)) && (e /= 360), "hsla" == h[1].toLowerCase().slice(0, 4) && (a = H(l[3])), l[3] && "%" == l[3].slice( - 1) && (a /= 100), n.hsl2rgb(e, i, s, a)) : (e = L(W.round(e), 255), i = L(W.round(i), 255), s = L(W.round(s), 255), a = L(B(a, 0), 1), h = {
                r: e,
                g: i,
                b: s,
                toString: pt
            },
            h.hex = "#" + (16777216 | s | i << 8 | e << 16).toString(16).slice(1), h.opacity = o(a, "finite") ? a: 1, h)) : {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                error: 1,
                toString: pt
            }
        },
        n),
        n.hsb = l(function(t, e, i) {
            return n.hsb2rgb(t, e, i).hex
        }),
        n.hsl = l(function(t, e, i) {
            return n.hsl2rgb(t, e, i).hex
        }),
        n.rgb = l(function(t, e, i, n) {
            if (o(n, "finite")) {
                var s = W.round;
                return "rgba(" + [s(t), s(e), s(i), +n.toFixed(2)] + ")"
            }
            return "#" + (16777216 | i | e << 8 | t << 16).toString(16).slice(1)
        });
        var ut = function(t) {
            var e = N.doc.getElementsByTagName("head")[0],
            i = "rgb(255, 0, 0)";
            return (ut = l(function(t) {
                if ("red" == t.toLowerCase()) return i;
                e.style.color = i,
                e.style.color = t;
                var n = N.doc.defaultView.getComputedStyle(e, V).getPropertyValue("color");
                return n == i ? null: n
            }))(t)
        },
        ct = function() {
            return "hsb(" + [this.h, this.s, this.b] + ")"
        },
        dt = function() {
            return "hsl(" + [this.h, this.s, this.l] + ")"
        },
        pt = function() {
            return 1 == this.opacity || null == this.opacity ? this.hex: "rgba(" + [this.r, this.g, this.b, this.opacity] + ")"
        },
        ft = function(t, e, i) {
            if (null == e && o(t, "object") && "r" in t && "g" in t && "b" in t && (i = t.b, e = t.g, t = t.r), null == e && o(t, string)) {
                var s = n.getRGB(t);
                t = s.r,
                e = s.g,
                i = s.b
            }
            return (t > 1 || e > 1 || i > 1) && (t /= 255, e /= 255, i /= 255),
            [t, e, i]
        },
        mt = function(t, e, i, s) {
            t = W.round(255 * t),
            e = W.round(255 * e),
            i = W.round(255 * i);
            var a = {
                r: t,
                g: e,
                b: i,
                opacity: o(s, "finite") ? s: 1,
                hex: n.rgb(t, e, i),
                toString: pt
            };
            return o(s, "finite") && (a.opacity = s),
            a
        };
        n.color = function(t) {
            var e;
            return o(t, "object") && "h" in t && "s" in t && "b" in t ? (e = n.hsb2rgb(t), t.r = e.r, t.g = e.g, t.b = e.b, t.opacity = 1, t.hex = e.hex) : o(t, "object") && "h" in t && "s" in t && "l" in t ? (e = n.hsl2rgb(t), t.r = e.r, t.g = e.g, t.b = e.b, t.opacity = 1, t.hex = e.hex) : (o(t, "string") && (t = n.getRGB(t)), o(t, "object") && "r" in t && "g" in t && "b" in t && !("error" in t) ? (e = n.rgb2hsl(t), t.h = e.h, t.s = e.s, t.l = e.l, e = n.rgb2hsb(t), t.v = e.b) : (t = {
                hex: "none"
            },
            t.r = t.g = t.b = t.h = t.s = t.v = t.l = -1, t.error = 1)),
            t.toString = pt,
            t
        },
        n.hsb2rgb = function(t, e, i, n) {
            o(t, "object") && "h" in t && "s" in t && "b" in t && (i = t.b, e = t.s, t = t.h, n = t.o),
            t *= 360;
            var s, a, r, l, h;
            return t = t % 360 / 60,
            h = i * e,
            l = h * (1 - R(t % 2 - 1)),
            s = a = r = i - h,
            t = ~~t,
            s += [h, l, 0, 0, l, h][t],
            a += [l, h, h, l, 0, 0][t],
            r += [0, 0, l, h, h, l][t],
            mt(s, a, r, n)
        },
        n.hsl2rgb = function(t, e, i, n) {
            o(t, "object") && "h" in t && "s" in t && "l" in t && (i = t.l, e = t.s, t = t.h),
            (t > 1 || e > 1 || i > 1) && (t /= 360, e /= 100, i /= 100),
            t *= 360;
            var s, a, r, l, h;
            return t = t % 360 / 60,
            h = 2 * e * (.5 > i ? i: 1 - i),
            l = h * (1 - R(t % 2 - 1)),
            s = a = r = i - h / 2,
            t = ~~t,
            s += [h, l, 0, 0, l, h][t],
            a += [l, h, h, l, 0, 0][t],
            r += [0, 0, l, h, h, l][t],
            mt(s, a, r, n)
        },
        n.rgb2hsb = function(t, e, i) {
            i = ft(t, e, i),
            t = i[0],
            e = i[1],
            i = i[2];
            var n, s, o, a;
            return o = B(t, e, i),
            a = o - L(t, e, i),
            n = 0 == a ? null: o == t ? (e - i) / a: o == e ? (i - t) / a + 2 : (t - e) / a + 4,
            n = 60 * ((n + 360) % 6) / 360,
            s = 0 == a ? 0 : a / o,
            {
                h: n,
                s: s,
                b: o,
                toString: ct
            }
        },
        n.rgb2hsl = function(t, e, i) {
            i = ft(t, e, i),
            t = i[0],
            e = i[1],
            i = i[2];
            var n, s, o, a, r, l;
            return a = B(t, e, i),
            r = L(t, e, i),
            l = a - r,
            n = 0 == l ? null: a == t ? (e - i) / l: a == e ? (i - t) / l + 2 : (t - e) / l + 4,
            n = 60 * ((n + 360) % 6) / 360,
            o = (a + r) / 2,
            s = 0 == l ? 0 : .5 > o ? l / (2 * o) : l / (2 - 2 * o),
            {
                h: n,
                s: s,
                l: o,
                toString: dt
            }
        },
        n.parsePathString = function(t) {
            if (!t) return null;
            var e = n.path(t);
            if (e.arr) return n.path.clone(e.arr);
            var i = {
                a: 7,
                c: 6,
                o: 2,
                h: 1,
                l: 2,
                m: 2,
                r: 4,
                q: 4,
                s: 4,
                t: 2,
                v: 1,
                u: 3,
                z: 0
            },
            s = [];
            return o(t, "array") && o(t[0], "array") && (s = n.path.clone(t)),
            s.length || z(t).replace(J,
            function(t, e, n) {
                var o = [],
                a = e.toLowerCase();
                if (n.replace(et,
                function(t, e) {
                    e && o.push( + e)
                }), "m" == a && o.length > 2 && (s.push([e].concat(o.splice(0, 2))), a = "l", e = "m" == e ? "l": "L"), "o" == a && 1 == o.length && s.push([e, o[0]]), "r" == a) s.push([e].concat(o));
                else for (; o.length >= i[a] && (s.push([e].concat(o.splice(0, i[a]))), i[a]););
            }),
            s.toString = n.path.toString,
            e.arr = n.path.clone(s),
            s
        };
        var gt = n.parseTransformString = function(t) {
            if (!t) return null;
            var e = [];
            return o(t, "array") && o(t[0], "array") && (e = n.path.clone(t)),
            e.length || z(t).replace(tt,
            function(t, i, n) {
                var s = [];
                i.toLowerCase(),
                n.replace(et,
                function(t, e) {
                    e && s.push( + e)
                }),
                e.push([i].concat(s))
            }),
            e.toString = n.path.toString,
            e
        };
        n._.svgTransform2string = p,
        n._.rgTransform = new RegExp("^[a-z][" + G + "]*-?\\.?\\d", "i"),
        n._.transform2matrix = f,
        n._unit2px = b;
        var vt = N.doc.contains || N.doc.compareDocumentPosition ?
        function(t, e) {
            var i = 9 == t.nodeType ? t.documentElement: t,
            n = e && e.parentNode;
            return t == n || !(!n || 1 != n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
        }: function(t, e) {
            if (e) for (; e;) if (e = e.parentNode, e == t) return ! 0;
            return ! 1
        };
        n._.getSomeDefs = v,
        n.select = function(t) {
            return T(N.doc.querySelector(t))
        },
        n.selectAll = function(t) {
            for (var e = N.doc.querySelectorAll(t), i = (n.set || Array)(), s = 0; s < e.length; s++) i.push(T(e[s]));
            return i
        },
        function(t) {
            function a(t) {
                function e(t, e) {
                    var i = s(t.node, e);
                    i = i && i.match(a),
                    i = i && i[2],
                    i && "#" == i.charAt() && (i = i.substring(1), i && (l[i] = (l[i] || []).concat(function(i) {
                        var n = {};
                        n[e] = lt(i),
                        s(t.node, n)
                    })))
                }
                function i(t) {
                    var e = s(t.node, "xlink:href");
                    e && "#" == e.charAt() && (e = e.substring(1), e && (l[e] = (l[e] || []).concat(function(e) {
                        t.attr("xlink:href", "#" + e)
                    })))
                }
                for (var n, o = t.selectAll("*"), a = /^\s*url\(("|'|)(.*)\1\)\s*$/, r = [], l = {},
                h = 0, u = o.length; u > h; h++) {
                    n = o[h],
                    e(n, "fill"),
                    e(n, "stroke"),
                    e(n, "filter"),
                    e(n, "mask"),
                    e(n, "clip-path"),
                    i(n);
                    var c = s(n.node, "id");
                    c && (s(n.node, {
                        id: n.id
                    }), r.push({
                        old: c,
                        id: n.id
                    }))
                }
                for (h = 0, u = r.length; u > h; h++) {
                    var d = l[r[h].old];
                    if (d) for (var p = 0,
                    f = d.length; f > p; p++) d[p](r[h].id)
                }
            }
            function r(t, e, i) {
                return function(n) {
                    var s = n.slice(t, e);
                    return 1 == s.length && (s = s[0]),
                    i ? i(s) : s
                }
            }
            function l(t) {
                return function() {
                    var e = t ? "<" + this.type: "",
                    i = this.node.attributes,
                    n = this.node.childNodes;
                    if (t) for (var s = 0,
                    o = i.length; o > s; s++) e += " " + i[s].name + '="' + i[s].value.replace(/"/g, '\\"') + '"';
                    if (n.length) {
                        for (t && (e += ">"), s = 0, o = n.length; o > s; s++) 3 == n[s].nodeType ? e += n[s].nodeValue: 1 == n[s].nodeType && (e += T(n[s]).toString());
                        t && (e += "</" + this.type + ">")
                    } else t && (e += "/>");
                    return e
                }
            }
            t.attr = function(t, i) {
                var n = this;
                if (n.node, !t) return n;
                if (o(t, "string")) {
                    if (! (arguments.length > 1)) return w(e("snap.util.getattr." + t, n));
                    var s = {};
                    s[t] = i,
                    t = s
                }
                for (var a in t) t[F](a) && e("snap.util.attr." + a, n, t[a]);
                return n
            },
            t.getBBox = function(t) {
                var e = this;
                if ("use" == e.type && (e = e.original), e.removed) return {};
                var i = e._;
                return t ? (i.bboxwt = n.path.get[e.type] ? n.path.getBBox(e.realPath = n.path.get[e.type](e)) : n._.box(e.node.getBBox()), n._.box(i.bboxwt)) : (e.realPath = (n.path.get[e.type] || n.path.get.deflt)(e), i.bbox = n.path.getBBox(n.path.map(e.realPath, e.matrix)), n._.box(i.bbox))
            };
            var h = function() {
                return this.string
            };
            t.transform = function(t) {
                var e = this._;
                if (null == t) {
                    var i = new d(this.node.getCTM()),
                    n = m(this),
                    o = n.toTransformString(),
                    a = z(n) == z(this.matrix) ? e.transform: o;
                    return {
                        string: a,
                        globalMatrix: i,
                        localMatrix: n,
                        diffMatrix: i.clone().add(n.invert()),
                        global: i.toTransformString(),
                        local: o,
                        toString: h
                    }
                }
                return t instanceof d && (t = t.toTransformString()),
                m(this, t),
                this.node && ("linearGradient" == this.type || "radialGradient" == this.type ? s(this.node, {
                    gradientTransform: this.matrix
                }) : "pattern" == this.type ? s(this.node, {
                    patternTransform: this.matrix
                }) : s(this.node, {
                    transform: this.matrix
                })),
                this
            },
            t.parent = function() {
                return T(this.node.parentNode)
            },
            t.append = t.add = function(t) {
                if (t) {
                    if ("set" == t.type) {
                        var e = this;
                        return t.forEach(function(t) {
                            e.add(t)
                        }),
                        this
                    }
                    t = T(t),
                    this.node.appendChild(t.node),
                    t.paper = this.paper
                }
                return this
            },
            t.appendTo = function(t) {
                return t && (t = T(t), t.append(this)),
                this
            },
            t.prepend = function(t) {
                if (t) {
                    t = T(t);
                    var e = t.parent();
                    this.node.insertBefore(t.node, this.node.firstChild),
                    this.add && this.add(),
                    t.paper = this.paper,
                    this.parent() && this.parent().add(),
                    e && e.add()
                }
                return this
            },
            t.prependTo = function(t) {
                return t = T(t),
                t.prepend(this),
                this
            },
            t.before = function(t) {
                if ("set" == t.type) {
                    var e = this;
                    return t.forEach(function(t) {
                        var i = t.parent();
                        e.node.parentNode.insertBefore(t.node, e.node),
                        i && i.add()
                    }),
                    this.parent().add(),
                    this
                }
                t = T(t);
                var i = t.parent();
                return this.node.parentNode.insertBefore(t.node, this.node),
                this.parent() && this.parent().add(),
                i && i.add(),
                t.paper = this.paper,
                this
            },
            t.after = function(t) {
                t = T(t);
                var e = t.parent();
                return this.node.nextSibling ? this.node.parentNode.insertBefore(t.node, this.node.nextSibling) : this.node.parentNode.appendChild(t.node),
                this.parent() && this.parent().add(),
                e && e.add(),
                t.paper = this.paper,
                this
            },
            t.insertBefore = function(t) {
                t = T(t);
                var e = this.parent();
                return t.node.parentNode.insertBefore(this.node, t.node),
                this.paper = t.paper,
                e && e.add(),
                t.parent() && t.parent().add(),
                this
            },
            t.insertAfter = function(t) {
                t = T(t);
                var e = this.parent();
                return t.node.parentNode.insertBefore(this.node, t.node.nextSibling),
                this.paper = t.paper,
                e && e.add(),
                t.parent() && t.parent().add(),
                this
            },
            t.remove = function() {
                var t = this.parent();
                return this.node.parentNode && this.node.parentNode.removeChild(this.node),
                delete this.paper,
                this.removed = !0,
                t && t.add(),
                this
            },
            t.select = function(t) {
                return T(this.node.querySelector(t))
            },
            t.selectAll = function(t) {
                for (var e = this.node.querySelectorAll(t), i = (n.set || Array)(), s = 0; s < e.length; s++) i.push(T(e[s]));
                return i
            },
            t.asPX = function(t, e) {
                return null == e && (e = this.attr(t)),
                +b(this, t, e)
            },
            t.use = function() {
                var t, e = this.node.id;
                return e || (e = this.id, s(this.node, {
                    id: e
                })),
                t = "linearGradient" == this.type || "radialGradient" == this.type || "pattern" == this.type ? k(this.type, this.node.parentNode) : k("use", this.node.parentNode),
                s(t.node, {
                    "xlink:href": "#" + e
                }),
                t.original = this,
                t
            },
            t.clone = function() {
                var t = T(this.node.cloneNode(!0));
                return s(t.node, "id") && s(t.node, {
                    id: t.id
                }),
                a(t),
                t.insertAfter(this),
                t
            },
            t.toDefs = function() {
                var t = v(this);
                return t.appendChild(this.node),
                this
            },
            t.pattern = function(t, e, i, n) {
                var a = k("pattern", v(this));
                return null == t && (t = this.getBBox()),
                o(t, "object") && "x" in t && (e = t.y, i = t.width, n = t.height, t = t.x),
                s(a.node, {
                    x: t,
                    y: e,
                    width: i,
                    height: n,
                    patternUnits: "userSpaceOnUse",
                    id: a.id,
                    viewBox: [t, e, i, n].join(" ")
                }),
                a.node.appendChild(this.node),
                a
            },
            t.marker = function(t, e, i, n, a, r) {
                var l = k("marker", v(this));
                return null == t && (t = this.getBBox()),
                o(t, "object") && "x" in t && (e = t.y, i = t.width, n = t.height, a = t.refX || t.cx, r = t.refY || t.cy, t = t.x),
                s(l.node, {
                    viewBox: [t, e, i, n].join(U),
                    markerWidth: i,
                    markerHeight: n,
                    orient: "auto",
                    refX: a || 0,
                    refY: r || 0,
                    id: l.id
                }),
                l.node.appendChild(this.node),
                l
            };
            var u = function(t, e, n, s) {
                "function" != typeof n || n.length || (s = n, n = i.linear),
                this.attr = t,
                this.dur = e,
                n && (this.easing = n),
                s && (this.callback = s)
            };
            n.animation = function(t, e, i, n) {
                return new u(t, e, i, n)
            },
            t.inAnim = function() {
                var t = this,
                e = [];
                for (var i in t.anims) t.anims[F](i) && !
                function(t) {
                    e.push({
                        anim: new u(t._attrs, t.dur, t.easing, t._callback),
                        curStatus: t.status(),
                        status: function(e) {
                            return t.status(e)
                        },
                        stop: function() {
                            t.stop()
                        }
                    })
                } (t.anims[i]);
                return e
            },
            n.animate = function(t, n, s, o, a, r) {
                "function" != typeof a || a.length || (r = a, a = i.linear);
                var l = i.time(),
                h = i(t, n, l, l + o, i.time, s, a);
                return r && e.once("mina.finish." + h.id, r),
                h
            },
            t.stop = function() {
                for (var t = this.inAnim(), e = 0, i = t.length; i > e; e++) t[e].stop();
                return this
            },
            t.animate = function(t, n, s, a) {
                "function" != typeof s || s.length || (a = s, s = i.linear),
                t instanceof u && (a = t.callback, s = t.easing, n = s.dur, t = t.attr);
                var l, h, c, d, p = [],
                f = [],
                m = {},
                g = this;
                for (var v in t) if (t[F](v)) {
                    g.equal ? (d = g.equal(v, z(t[v])), l = d.from, h = d.to, c = d.f) : (l = +g.attr(v), h = +t[v]);
                    var b = o(l, "array") ? l.length: 1;
                    m[v] = r(p.length, p.length + b, c),
                    p = p.concat(l),
                    f = f.concat(h)
                }
                var y = i.time(),
                _ = i(p, f, y, y + n, i.time,
                function(t) {
                    var e = {};
                    for (var i in m) m[F](i) && (e[i] = m[i](t));
                    g.attr(e)
                },
                s);
                return g.anims[_.id] = _,
                _._attrs = t,
                _._callback = a,
                e.once("mina.finish." + _.id,
                function() {
                    delete g.anims[_.id],
                    a && a.call(g)
                }),
                e.once("mina.stop." + _.id,
                function() {
                    delete g.anims[_.id]
                }),
                g
            };
            var c = {};
            t.data = function(t, i) {
                var s = c[this.id] = c[this.id] || {};
                if (0 == arguments.length) return e("snap.data.get." + this.id, this, s, null),
                s;
                if (1 == arguments.length) {
                    if (n.is(t, "object")) {
                        for (var o in t) t[F](o) && this.data(o, t[o]);
                        return this
                    }
                    return e("snap.data.get." + this.id, this, s[t], t),
                    s[t]
                }
                return s[t] = i,
                e("snap.data.set." + this.id, this, i, t),
                this
            },
            t.removeData = function(t) {
                return null == t ? c[this.id] = {}: c[this.id] && delete c[this.id][t],
                this
            },
            t.outerSVG = t.toString = l(1),
            t.innerSVG = l()
        } (_.prototype),
        n.parse = function(t) {
            var e = N.doc.createDocumentFragment(),
            i = !0,
            n = N.doc.createElement("div");
            if (t = z(t), t.match(/^\s*<\s*svg(?:\s|>)/) || (t = "<svg>" + t + "</svg>", i = !1), n.innerHTML = t, t = n.getElementsByTagName("svg")[0]) if (i) e = t;
            else for (; t.firstChild;) e.appendChild(t.firstChild);
            return n.innerHTML = V,
            new x(e)
        },
        x.prototype.select = _.prototype.select,
        x.prototype.selectAll = _.prototype.selectAll,
        n.fragment = function() {
            for (var t = Array.prototype.slice.call(arguments, 0), e = N.doc.createDocumentFragment(), i = 0, s = t.length; s > i; i++) {
                var o = t[i];
                o.node && o.node.nodeType && e.appendChild(o.node),
                o.nodeType && e.appendChild(o),
                "string" == typeof o && e.appendChild(n.parse(o).node)
            }
            return new x(e)
        },
        function(t) {
            t.el = function(t, e) {
                return k(t, this.node).attr(e)
            },
            t.rect = function(t, e, i, n, s, a) {
                var r;
                return null == a && (a = s),
                o(t, "object") && "x" in t ? r = t: null != t && (r = {
                    x: t,
                    y: e,
                    width: i,
                    height: n
                },
                null != s && (r.rx = s, r.ry = a)),
                this.el("rect", r)
            },
            t.circle = function(t, e, i) {
                var n;
                return o(t, "object") && "cx" in t ? n = t: null != t && (n = {
                    cx: t,
                    cy: e,
                    r: i
                }),
                this.el("circle", n)
            },
            t.image = function(t, e, i, n, a) {
                var r = k("image", this.node);
                if (o(t, "object") && "src" in t) r.attr(t);
                else if (null != t) {
                    var l = {
                        "xlink:href": t,
                        preserveAspectRatio: "none"
                    };
                    null != e && null != i && (l.x = e, l.y = i),
                    null != n && null != a ? (l.width = n, l.height = a) : ht(t,
                    function() {
                        s(r.node, {
                            width: this.offsetWidth,
                            height: this.offsetHeight
                        })
                    }),
                    s(r.node, l)
                }
                return r
            },
            t.ellipse = function(t, e, i, n) {
                var s = k("ellipse", this.node);
                return o(t, "object") && "cx" in t ? s.attr(t) : null != t && s.attr({
                    cx: t,
                    cy: e,
                    rx: i,
                    ry: n
                }),
                s
            },
            t.path = function(t) {
                var e = k("path", this.node);
                return o(t, "object") && !o(t, "array") ? e.attr(t) : t && e.attr({
                    d: t
                }),
                e
            },
            t.group = t.g = function(e) {
                var i = k("g", this.node);
                i.add = y;
                for (var n in t) t[F](n) && (i[n] = t[n]);
                return 1 == arguments.length && e && !e.type ? i.attr(e) : arguments.length && i.add(Array.prototype.slice.call(arguments, 0)),
                i
            },
            t.text = function(t, e, i) {
                var n = k("text", this.node);
                return o(t, "object") ? n.attr(t) : null != t && n.attr({
                    x: t,
                    y: e,
                    text: i || ""
                }),
                n
            },
            t.line = function(t, e, i, n) {
                var s = k("line", this.node);
                return o(t, "object") ? s.attr(t) : null != t && s.attr({
                    x1: t,
                    x2: i,
                    y1: e,
                    y2: n
                }),
                s
            },
            t.polyline = function(t) {
                arguments.length > 1 && (t = Array.prototype.slice.call(arguments, 0));
                var e = k("polyline", this.node);
                return o(t, "object") && !o(t, "array") ? e.attr(t) : null != t && e.attr({
                    points: t
                }),
                e
            },
            t.polygon = function(t) {
                arguments.length > 1 && (t = Array.prototype.slice.call(arguments, 0));
                var e = k("polygon", this.node);
                return o(t, "object") && !o(t, "array") ? e.attr(t) : null != t && e.attr({
                    points: t
                }),
                e
            },
            function() {
                t.gradient = function(t) {
                    return I(this.defs, t)
                },
                t.gradientLinear = function(t, e, i, n) {
                    return P(this.defs, t, e, i, n)
                },
                t.gradientRadial = function(t, e, i, n, s) {
                    return E(this.defs, t, e, i, n, s)
                },
                t.toString = function() {
                    var t, e = N.doc.createDocumentFragment(),
                    i = N.doc.createElement("div"),
                    n = this.node.cloneNode(!0);
                    return e.appendChild(i),
                    i.appendChild(n),
                    s(n, {
                        xmlns: at
                    }),
                    t = i.innerHTML,
                    e.removeChild(e.firstChild),
                    t
                },
                t.clear = function() {
                    for (var t, e = this.node.firstChild; e;) t = e.nextSibling,
                    "defs" != e.tagName && e.parentNode.removeChild(e),
                    e = t
                }
            } ()
        } (C.prototype),
        n.ajax = function(t, i, n, s) {
            var a = new XMLHttpRequest,
            r = st();
            if (a) {
                if (o(i, "function")) s = n,
                n = i,
                i = null;
                else if (o(i, "object")) {
                    var l = [];
                    for (var h in i) i.hasOwnProperty(h) && l.push(encodeURIComponent(h) + "=" + encodeURIComponent(i[h]));
                    i = l.join("&")
                }
                return a.open(i ? "POST": "GET", t, !0),
                a.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                i && a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
                n && (e.once("snap.ajax." + r + ".0", n), e.once("snap.ajax." + r + ".200", n), e.once("snap.ajax." + r + ".304", n)),
                a.onreadystatechange = function() {
                    4 == a.readyState && e("snap.ajax." + r + "." + a.status, s, a)
                },
                4 == a.readyState ? a: (a.send(i), a)
            }
        },
        n.load = function(t, e, i) {
            n.ajax(t,
            function(t) {
                var s = n.parse(t.responseText);
                i ? e.call(i, s) : e(s)
            })
        },
        e.on("snap.util.attr.mask",
        function(t) {
            if (t instanceof _ || t instanceof x) {
                if (e.stop(), t instanceof x && 1 == t.node.childNodes.length && (t = t.node.firstChild, v(this).appendChild(t), t = T(t)), "mask" == t.type) var i = t;
                else i = k("mask", v(this)),
                i.node.appendChild(t.node),
                !i.node.id && s(i.node, {
                    id: i.id
                });
                s(this.node, {
                    mask: lt(i.id)
                })
            }
        }),
        function(t) {
            e.on("snap.util.attr.clip", t),
            e.on("snap.util.attr.clip-path", t),
            e.on("snap.util.attr.clipPath", t)
        } (function(t) {
            if (t instanceof _ || t instanceof x) {
                if (e.stop(), "clipPath" == t.type) var i = t;
                else i = k("clipPath", v(this)),
                i.node.appendChild(t.node),
                !i.node.id && s(i.node, {
                    id: i.id
                });
                s(this.node, {
                    "clip-path": lt(i.id)
                })
            }
        }),
        e.on("snap.util.attr.fill", j("fill")),
        e.on("snap.util.attr.stroke", j("stroke"));
        var bt = /^([lr])(?:\(([^)]*)\))?(.*)$/i;
        e.on("snap.util.grad.parse",
        function(t) {
            t = z(t);
            var e = t.match(bt);
            if (!e) return null;
            var i = e[1],
            n = e[2],
            s = e[3];
            return n = n.split(/\s*,\s*/).map(function(t) {
                return + t == t ? +t: t
            }),
            1 == n.length && 0 == n[0] && (n = []),
            s = s.split("-"),
            s = s.map(function(t) {
                t = t.split(":");
                var e = {
                    color: t[0]
                };
                return t[1] && (e.offset = t[1]),
                e
            }),
            {
                type: i,
                params: n,
                stops: s
            }
        }),
        e.on("snap.util.attr.d",
        function(t) {
            e.stop(),
            o(t, "array") && o(t[0], "array") && (t = n.path.toString.call(t)),
            t = z(t),
            t.match(/[ruo]/i) && (t = n.path.toAbsolute(t)),
            s(this.node, {
                d: t
            })
        })( - 1),
        e.on("snap.util.attr.#text",
        function(t) {
            e.stop(),
            t = z(t);
            for (var i = N.doc.createTextNode(t); this.node.firstChild;) this.node.removeChild(this.node.firstChild);
            this.node.appendChild(i)
        })( - 1),
        e.on("snap.util.attr.path",
        function(t) {
            e.stop(),
            this.attr({
                d: t
            })
        })( - 1),
        e.on("snap.util.attr.viewBox",
        function(t) {
            var i;
            i = o(t, "object") && "x" in t ? [t.x, t.y, t.width, t.height].join(" ") : o(t, "array") ? t.join(" ") : t,
            s(this.node, {
                viewBox: i
            }),
            e.stop()
        })( - 1),
        e.on("snap.util.attr.transform",
        function(t) {
            this.transform(t),
            e.stop()
        })( - 1),
        e.on("snap.util.attr.r",
        function(t) {
            "rect" == this.type && (e.stop(), s(this.node, {
                rx: t,
                ry: t
            }))
        })( - 1),
        e.on("snap.util.attr.textpath",
        function(t) {
            if (e.stop(), "text" == this.type) {
                var i, n, a;
                if (!t && this.textPath) {
                    for (n = this.textPath; n.node.firstChild;) this.node.appendChild(n.node.firstChild);
                    return n.remove(),
                    void delete this.textPath
                }
                if (o(t, "string")) {
                    var r = v(this),
                    l = T(r.parentNode).path(t);
                    r.appendChild(l.node),
                    i = l.id,
                    l.attr({
                        id: i
                    })
                } else t = T(t),
                t instanceof _ && (i = t.attr("id"), i || (i = t.id, t.attr({
                    id: i
                })));
                if (i) if (n = this.textPath, a = this.node, n) n.attr({
                    "xlink:href": "#" + i
                });
                else {
                    for (n = s("textPath", {
                        "xlink:href": "#" + i
                    }); a.firstChild;) n.appendChild(a.firstChild);
                    a.appendChild(n),
                    this.textPath = T(n)
                }
            }
        })( - 1),
        e.on("snap.util.attr.text",
        function(t) {
            if ("text" == this.type) {
                for (var i = this.node,
                n = function(t) {
                    var e = s("tspan");
                    if (o(t, "array")) for (var i = 0; i < t.length; i++) e.appendChild(n(t[i]));
                    else e.appendChild(N.doc.createTextNode(t));
                    return e.normalize && e.normalize(),
                    e
                }; i.firstChild;) i.removeChild(i.firstChild);
                for (var a = n(t); a.firstChild;) i.appendChild(a.firstChild)
            }
            e.stop()
        })( - 1);
        var yt = {
            "alignment-baseline": 0,
            "baseline-shift": 0,
            clip: 0,
            "clip-path": 0,
            "clip-rule": 0,
            color: 0,
            "color-interpolation": 0,
            "color-interpolation-filters": 0,
            "color-profile": 0,
            "color-rendering": 0,
            cursor: 0,
            direction: 0,
            display: 0,
            "dominant-baseline": 0,
            "enable-background": 0,
            fill: 0,
            "fill-opacity": 0,
            "fill-rule": 0,
            filter: 0,
            "flood-color": 0,
            "flood-opacity": 0,
            font: 0,
            "font-family": 0,
            "font-size": 0,
            "font-size-adjust": 0,
            "font-stretch": 0,
            "font-style": 0,
            "font-variant": 0,
            "font-weight": 0,
            "glyph-orientation-horizontal": 0,
            "glyph-orientation-vertical": 0,
            "image-rendering": 0,
            kerning: 0,
            "letter-spacing": 0,
            "lighting-color": 0,
            marker: 0,
            "marker-end": 0,
            "marker-mid": 0,
            "marker-start": 0,
            mask: 0,
            opacity: 0,
            overflow: 0,
            "pointer-events": 0,
            "shape-rendering": 0,
            "stop-color": 0,
            "stop-opacity": 0,
            stroke: 0,
            "stroke-dasharray": 0,
            "stroke-dashoffset": 0,
            "stroke-linecap": 0,
            "stroke-linejoin": 0,
            "stroke-miterlimit": 0,
            "stroke-opacity": 0,
            "stroke-width": 0,
            "text-anchor": 0,
            "text-decoration": 0,
            "text-rendering": 0,
            "unicode-bidi": 0,
            visibility: 0,
            "word-spacing": 0,
            "writing-mode": 0
        };
        e.on("snap.util.attr",
        function(t) {
            var i = e.nt(),
            n = {};
            i = i.substring(i.lastIndexOf(".") + 1),
            n[i] = t;
            var o = i.replace(/-(\w)/gi,
            function(t, e) {
                return e.toUpperCase()
            }),
            a = i.replace(/[A-Z]/g,
            function(t) {
                return "-" + t.toLowerCase()
            });
            yt[F](a) ? this.node.style[o] = null == t ? V: t: s(this.node, n)
        }),
        e.on("snap.util.getattr.transform",
        function() {
            return e.stop(),
            this.transform()
        })( - 1),
        e.on("snap.util.getattr.textpath",
        function() {
            return e.stop(),
            this.textPath
        })( - 1),
        function() {
            function t(t) {
                return function() {
                    e.stop();
                    var i = N.doc.defaultView.getComputedStyle(this.node, null).getPropertyValue("marker-" + t);
                    return "none" == i ? i: n(N.doc.getElementById(i.match(K)[1]))
                }
            }
            function i(t) {
                return function(i) {
                    e.stop();
                    var n = "marker" + t.charAt(0).toUpperCase() + t.substring(1);
                    if ("" == i || !i) return void(this.node.style[n] = "none");
                    if ("marker" == i.type) {
                        var o = i.node.id;
                        return o || s(i.node, {
                            id: i.id
                        }),
                        void(this.node.style[n] = lt(o))
                    }
                }
            }
            e.on("snap.util.getattr.marker-end", t("end"))( - 1),
            e.on("snap.util.getattr.markerEnd", t("end"))( - 1),
            e.on("snap.util.getattr.marker-start", t("start"))( - 1),
            e.on("snap.util.getattr.markerStart", t("start"))( - 1),
            e.on("snap.util.getattr.marker-mid", t("mid"))( - 1),
            e.on("snap.util.getattr.markerMid", t("mid"))( - 1),
            e.on("snap.util.attr.marker-end", i("end"))( - 1),
            e.on("snap.util.attr.markerEnd", i("end"))( - 1),
            e.on("snap.util.attr.marker-start", i("start"))( - 1),
            e.on("snap.util.attr.markerStart", i("start"))( - 1),
            e.on("snap.util.attr.marker-mid", i("mid"))( - 1),
            e.on("snap.util.attr.markerMid", i("mid"))( - 1)
        } (),
        e.on("snap.util.getattr.r",
        function() {
            return "rect" == this.type && s(this.node, "rx") == s(this.node, "ry") ? (e.stop(), s(this.node, "rx")) : void 0
        })( - 1),
        e.on("snap.util.getattr.text",
        function() {
            if ("text" == this.type || "tspan" == this.type) {
                e.stop();
                var t = A(this.node);
                return 1 == t.length ? t[0] : t
            }
        })( - 1),
        e.on("snap.util.getattr.#text",
        function() {
            return this.node.textContent
        })( - 1),
        e.on("snap.util.getattr.viewBox",
        function() {
            e.stop();
            var t = s(this.node, "viewBox").split(X);
            return n._.box( + t[0], +t[1], +t[2], +t[3])
        })( - 1),
        e.on("snap.util.getattr.points",
        function() {
            var t = s(this.node, "points");
            return e.stop(),
            t.split(X)
        }),
        e.on("snap.util.getattr.path",
        function() {
            var t = s(this.node, "d");
            return e.stop(),
            t
        }),
        e.on("snap.util.getattr",
        function() {
            var t = e.nt();
            t = t.substring(t.lastIndexOf(".") + 1);
            var i = t.replace(/[A-Z]/g,
            function(t) {
                return "-" + t.toLowerCase()
            });
            return yt[F](i) ? N.doc.defaultView.getComputedStyle(this.node, null).getPropertyValue(i) : s(this.node, t)
        });
        var _t = function(t) {
            var e = t.getBoundingClientRect(),
            i = t.ownerDocument,
            n = i.body,
            s = i.documentElement,
            o = s.clientTop || n.clientTop || 0,
            a = s.clientLeft || n.clientLeft || 0,
            r = e.top + (g.win.pageYOffset || s.scrollTop || n.scrollTop) - o,
            l = e.left + (g.win.pageXOffset || s.scrollLeft || n.scrollLeft) - a;
            return {
                y: r,
                x: l
            }
        };
        return n.getElementByPoint = function(t, e) {
            var i = this,
            n = (i.canvas, N.doc.elementFromPoint(t, e));
            if (N.win.opera && "svg" == n.tagName) {
                var s = _t(n),
                o = n.createSVGRect();
                o.x = t - s.x,
                o.y = e - s.y,
                o.width = o.height = 1;
                var a = n.getIntersectionList(o, null);
                a.length && (n = a[a.length - 1])
            }
            return n ? T(n) : null
        },
        n.plugin = function(t) {
            t(n, _, C, N)
        },
        N.win.Snap = n,
        n
    } ();
    return n.plugin(function(t, e) {
        function i(t) {
            var e = i.ps = i.ps || {};
            return e[t] ? e[t].sleep = 100 : e[t] = {
                sleep: 100
            },
            setTimeout(function() {
                for (var i in e) e[H](i) && i != t && (e[i].sleep--, !e[i].sleep && delete e[i])
            }),
            e[t]
        }
        function n(t, e, i, n) {
            return null == t && (t = e = i = n = 0),
            null == e && (e = t.y, i = t.width, n = t.height, t = t.x),
            {
                x: t,
                y: e,
                width: i,
                w: i,
                height: n,
                h: n,
                x2: t + i,
                y2: e + n,
                cx: t + i / 2,
                cy: e + n / 2,
                r1: B.min(i, n) / 2,
                r2: B.max(i, n) / 2,
                r0: B.sqrt(i * i + n * n) / 2,
                path: x(t, e, i, n),
                vb: [t, e, i, n].join(" ")
            }
        }
        function s() {
            return this.join(",").replace(O, "$1")
        }
        function o(t) {
            var e = z(t);
            return e.toString = s,
            e
        }
        function a(t, e, i, n, s, o, a, r, h) {
            return null == h ? p(t, e, i, n, s, o, a, r) : l(t, e, i, n, s, o, a, r, f(t, e, i, n, s, o, a, r, h))
        }
        function r(i, n) {
            function s(t) {
                return + ( + t).toFixed(3)
            }
            return t._.cacher(function(t, o, r) {
                t instanceof e && (t = t.attr("d")),
                t = E(t);
                for (var h, u, c, d, p, f = "",
                m = {},
                g = 0,
                v = 0,
                b = t.length; b > v; v++) {
                    if (c = t[v], "M" == c[0]) h = +c[1],
                    u = +c[2];
                    else {
                        if (d = a(h, u, c[1], c[2], c[3], c[4], c[5], c[6]), g + d > o) {
                            if (n && !m.start) {
                                if (p = a(h, u, c[1], c[2], c[3], c[4], c[5], c[6], o - g), f += ["C" + s(p.start.x), s(p.start.y), s(p.m.x), s(p.m.y), s(p.x), s(p.y)], r) return f;
                                m.start = f,
                                f = ["M" + s(p.x), s(p.y) + "C" + s(p.n.x), s(p.n.y), s(p.end.x), s(p.end.y), s(c[5]), s(c[6])].join(),
                                g += d,
                                h = +c[5],
                                u = +c[6];
                                continue
                            }
                            if (!i && !n) return p = a(h, u, c[1], c[2], c[3], c[4], c[5], c[6], o - g)
                        }
                        g += d,
                        h = +c[5],
                        u = +c[6]
                    }
                    f += c.shift() + c
                }
                return m.end = f,
                p = i ? g: n ? m: l(h, u, c[0], c[1], c[2], c[3], c[4], c[5], 1)
            },
            null, t._.clone)
        }
        function l(t, e, i, n, s, o, a, r, l) {
            var h = 1 - l,
            u = V(h, 3),
            c = V(h, 2),
            d = l * l,
            p = d * l,
            f = u * t + 3 * c * l * i + 3 * h * l * l * s + p * a,
            m = u * e + 3 * c * l * n + 3 * h * l * l * o + p * r,
            g = t + 2 * l * (i - t) + d * (s - 2 * i + t),
            v = e + 2 * l * (n - e) + d * (o - 2 * n + e),
            b = i + 2 * l * (s - i) + d * (a - 2 * s + i),
            y = n + 2 * l * (o - n) + d * (r - 2 * o + n),
            _ = h * t + l * i,
            w = h * e + l * n,
            x = h * s + l * a,
            k = h * o + l * r,
            C = 90 - 180 * B.atan2(g - b, v - y) / L;
            return {
                x: f,
                y: m,
                m: {
                    x: g,
                    y: v
                },
                n: {
                    x: b,
                    y: y
                },
                start: {
                    x: _,
                    y: w
                },
                end: {
                    x: x,
                    y: k
                },
                alpha: C
            }
        }
        function h(e, i, s, o, a, r, l, h) {
            t.is(e, "array") || (e = [e, i, s, o, a, r, l, h]);
            var u = P.apply(null, e);
            return n(u.min.x, u.min.y, u.max.x - u.min.x, u.max.y - u.min.y)
        }
        function u(t, e, i) {
            return e >= t.x && e <= t.x + t.width && i >= t.y && i <= t.y + t.height
        }
        function c(t, e) {
            return t = n(t),
            e = n(e),
            u(e, t.x, t.y) || u(e, t.x2, t.y) || u(e, t.x, t.y2) || u(e, t.x2, t.y2) || u(t, e.x, e.y) || u(t, e.x2, e.y) || u(t, e.x, e.y2) || u(t, e.x2, e.y2) || (t.x < e.x2 && t.x > e.x || e.x < t.x2 && e.x > t.x) && (t.y < e.y2 && t.y > e.y || e.y < t.y2 && e.y > t.y)
        }
        function d(t, e, i, n, s) {
            var o = -3 * e + 9 * i - 9 * n + 3 * s,
            a = t * o + 6 * e - 12 * i + 6 * n;
            return t * a - 3 * e + 3 * i
        }
        function p(t, e, i, n, s, o, a, r, l) {
            null == l && (l = 1),
            l = l > 1 ? 1 : 0 > l ? 0 : l;
            for (var h = l / 2,
            u = 12,
            c = [ - .1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], p = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], f = 0, m = 0; u > m; m++) {
                var g = h * c[m] + h,
                v = d(g, t, i, s, a),
                b = d(g, e, n, o, r),
                y = v * v + b * b;
                f += p[m] * B.sqrt(y)
            }
            return h * f
        }
        function f(t, e, i, n, s, o, a, r, l) {
            if (! (0 > l || p(t, e, i, n, s, o, a, r) < l)) {
                var h, u = 1,
                c = u / 2,
                d = u - c,
                f = .01;
                for (h = p(t, e, i, n, s, o, a, r, d); U(h - l) > f;) c /= 2,
                d += (l > h ? 1 : -1) * c,
                h = p(t, e, i, n, s, o, a, r, d);
                return d
            }
        }
        function m(t, e, i, n, s, o, a, r) {
            if (! ($(t, i) < R(s, a) || R(t, i) > $(s, a) || $(e, n) < R(o, r) || R(e, n) > $(o, r))) {
                var l = (t * n - e * i) * (s - a) - (t - i) * (s * r - o * a),
                h = (t * n - e * i) * (o - r) - (e - n) * (s * r - o * a),
                u = (t - i) * (o - r) - (e - n) * (s - a);
                if (u) {
                    var c = l / u,
                    d = h / u,
                    p = +c.toFixed(2),
                    f = +d.toFixed(2);
                    if (! (p < +R(t, i).toFixed(2) || p > +$(t, i).toFixed(2) || p < +R(s, a).toFixed(2) || p > +$(s, a).toFixed(2) || f < +R(e, n).toFixed(2) || f > +$(e, n).toFixed(2) || f < +R(o, r).toFixed(2) || f > +$(o, r).toFixed(2))) return {
                        x: c,
                        y: d
                    }
                }
            }
        }
        function g(t, e, i) {
            var n = h(t),
            s = h(e);
            if (!c(n, s)) return i ? 0 : [];
            for (var o = p.apply(0, t), a = p.apply(0, e), r = ~~ (o / 5), u = ~~ (a / 5), d = [], f = [], g = {},
            v = i ? 0 : [], b = 0; r + 1 > b; b++) {
                var y = l.apply(0, t.concat(b / r));
                d.push({
                    x: y.x,
                    y: y.y,
                    t: b / r
                })
            }
            for (b = 0; u + 1 > b; b++) y = l.apply(0, e.concat(b / u)),
            f.push({
                x: y.x,
                y: y.y,
                t: b / u
            });
            for (b = 0; r > b; b++) for (var _ = 0; u > _; _++) {
                var w = d[b],
                x = d[b + 1],
                k = f[_],
                C = f[_ + 1],
                T = U(x.x - w.x) < .001 ? "y": "x",
                S = U(C.x - k.x) < .001 ? "y": "x",
                D = m(w.x, w.y, x.x, x.y, k.x, k.y, C.x, C.y);

                if (D) {
                    if (g[D.x.toFixed(4)] == D.y.toFixed(4)) continue;
                    g[D.x.toFixed(4)] = D.y.toFixed(4);
                    var M = w.t + U((D[T] - w[T]) / (x[T] - w[T])) * (x.t - w.t),
                    I = k.t + U((D[S] - k[S]) / (C[S] - k[S])) * (C.t - k.t);
                    M >= 0 && 1 >= M && I >= 0 && 1 >= I && (i ? v++:v.push({
                        x: D.x,
                        y: D.y,
                        t1: M,
                        t2: I
                    }))
                }
            }
            return v
        }
        function v(t, e) {
            return y(t, e)
        }
        function b(t, e) {
            return y(t, e, 1)
        }
        function y(t, e, i) {
            t = E(t),
            e = E(e);
            for (var n, s, o, a, r, l, h, u, c, d, p = i ? 0 : [], f = 0, m = t.length; m > f; f++) {
                var v = t[f];
                if ("M" == v[0]) n = r = v[1],
                s = l = v[2];
                else {
                    "C" == v[0] ? (c = [n, s].concat(v.slice(1)), n = c[6], s = c[7]) : (c = [n, s, n, s, r, l, r, l], n = r, s = l);
                    for (var b = 0,
                    y = e.length; y > b; b++) {
                        var _ = e[b];
                        if ("M" == _[0]) o = h = _[1],
                        a = u = _[2];
                        else {
                            "C" == _[0] ? (d = [o, a].concat(_.slice(1)), o = d[6], a = d[7]) : (d = [o, a, o, a, h, u, h, u], o = h, a = u);
                            var w = g(c, d, i);
                            if (i) p += w;
                            else {
                                for (var x = 0,
                                k = w.length; k > x; x++) w[x].segment1 = f,
                                w[x].segment2 = b,
                                w[x].bez1 = c,
                                w[x].bez2 = d;
                                p = p.concat(w)
                            }
                        }
                    }
                }
            }
            return p
        }
        function _(t, e, i) {
            var n = w(t);
            return u(n, e, i) && 1 == y(t, [["M", e, i], ["H", n.x2 + 10]], 1) % 2
        }
        function w(t) {
            var e = i(t);
            if (e.bbox) return z(e.bbox);
            if (!t) return n();
            t = E(t);
            for (var s, o = 0,
            a = 0,
            r = [], l = [], h = 0, u = t.length; u > h; h++) if (s = t[h], "M" == s[0]) o = s[1],
            a = s[2],
            r.push(o),
            l.push(a);
            else {
                var c = P(o, a, s[1], s[2], s[3], s[4], s[5], s[6]);
                r = r.concat(c.min.x, c.max.x),
                l = l.concat(c.min.y, c.max.y),
                o = s[5],
                a = s[6]
            }
            var d = R.apply(0, r),
            p = R.apply(0, l),
            f = $.apply(0, r),
            m = $.apply(0, l),
            g = n(d, p, f - d, m - p);
            return e.bbox = z(g),
            g
        }
        function x(t, e, i, n, o) {
            if (o) return [["M", t + o, e], ["l", i - 2 * o, 0], ["a", o, o, 0, 0, 1, o, o], ["l", 0, n - 2 * o], ["a", o, o, 0, 0, 1, -o, o], ["l", 2 * o - i, 0], ["a", o, o, 0, 0, 1, -o, -o], ["l", 0, 2 * o - n], ["a", o, o, 0, 0, 1, o, -o], ["z"]];
            var a = [["M", t, e], ["l", i, 0], ["l", 0, n], ["l", -i, 0], ["z"]];
            return a.toString = s,
            a
        }
        function k(t, e, i, n, o) {
            if (null == o && null == n && (n = i), null != o) var a = Math.PI / 180,
            r = t + i * Math.cos( - n * a),
            l = t + i * Math.cos( - o * a),
            h = e + i * Math.sin( - n * a),
            u = e + i * Math.sin( - o * a),
            c = [["M", r, h], ["A", i, i, 0, +(o - n > 180), 0, l, u]];
            else c = [["M", t, e], ["m", 0, -n], ["a", i, n, 0, 1, 1, 0, 2 * n], ["a", i, n, 0, 1, 1, 0, -2 * n], ["z"]];
            return c.toString = s,
            c
        }
        function C(e) {
            var n = i(e),
            a = String.prototype.toLowerCase;
            if (n.rel) return o(n.rel);
            t.is(e, "array") && t.is(e && e[0], "array") || (e = t.parsePathString(e));
            var r = [],
            l = 0,
            h = 0,
            u = 0,
            c = 0,
            d = 0;
            "M" == e[0][0] && (l = e[0][1], h = e[0][2], u = l, c = h, d++, r.push(["M", l, h]));
            for (var p = d,
            f = e.length; f > p; p++) {
                var m = r[p] = [],
                g = e[p];
                if (g[0] != a.call(g[0])) switch (m[0] = a.call(g[0]), m[0]) {
                case "a":
                    m[1] = g[1],
                    m[2] = g[2],
                    m[3] = g[3],
                    m[4] = g[4],
                    m[5] = g[5],
                    m[6] = +(g[6] - l).toFixed(3),
                    m[7] = +(g[7] - h).toFixed(3);
                    break;
                case "v":
                    m[1] = +(g[1] - h).toFixed(3);
                    break;
                case "m":
                    u = g[1],
                    c = g[2];
                default:
                    for (var v = 1,
                    b = g.length; b > v; v++) m[v] = +(g[v] - (v % 2 ? l: h)).toFixed(3)
                } else {
                    m = r[p] = [],
                    "m" == g[0] && (u = g[1] + l, c = g[2] + h);
                    for (var y = 0,
                    _ = g.length; _ > y; y++) r[p][y] = g[y]
                }
                var w = r[p].length;
                switch (r[p][0]) {
                case "z":
                    l = u,
                    h = c;
                    break;
                case "h":
                    l += +r[p][w - 1];
                    break;
                case "v":
                    h += +r[p][w - 1];
                    break;
                default:
                    l += +r[p][w - 2],
                    h += +r[p][w - 1]
                }
            }
            return r.toString = s,
            n.rel = o(r),
            r
        }
        function T(e) {
            var n = i(e);
            if (n.abs) return o(n.abs);
            if (F(e, "array") && F(e && e[0], "array") || (e = t.parsePathString(e)), !e || !e.length) return [["M", 0, 0]];
            var a, r = [],
            l = 0,
            h = 0,
            u = 0,
            c = 0,
            d = 0;
            "M" == e[0][0] && (l = +e[0][1], h = +e[0][2], u = l, c = h, d++, r[0] = ["M", l, h]);
            for (var p, f, m = 3 == e.length && "M" == e[0][0] && "R" == e[1][0].toUpperCase() && "Z" == e[2][0].toUpperCase(), g = d, v = e.length; v > g; g++) {
                if (r.push(p = []), f = e[g], a = f[0], a != a.toUpperCase()) switch (p[0] = a.toUpperCase(), p[0]) {
                case "A":
                    p[1] = f[1],
                    p[2] = f[2],
                    p[3] = f[3],
                    p[4] = f[4],
                    p[5] = f[5],
                    p[6] = +(f[6] + l),
                    p[7] = +(f[7] + h);
                    break;
                case "V":
                    p[1] = +f[1] + h;
                    break;
                case "H":
                    p[1] = +f[1] + l;
                    break;
                case "R":
                    for (var b = [l, h].concat(f.slice(1)), y = 2, _ = b.length; _ > y; y++) b[y] = +b[y] + l,
                    b[++y] = +b[y] + h;
                    r.pop(),
                    r = r.concat(A(b, m));
                    break;
                case "O":
                    r.pop(),
                    b = k(l, h, f[1], f[2]),
                    b.push(b[0]),
                    r = r.concat(b);
                    break;
                case "U":
                    r.pop(),
                    r = r.concat(k(l, h, f[1], f[2], f[3])),
                    p = ["U"].concat(r[r.length - 1].slice( - 2));
                    break;
                case "M":
                    u = +f[1] + l,
                    c = +f[2] + h;
                default:
                    for (y = 1, _ = f.length; _ > y; y++) p[y] = +f[y] + (y % 2 ? l: h)
                } else if ("R" == a) b = [l, h].concat(f.slice(1)),
                r.pop(),
                r = r.concat(A(b, m)),
                p = ["R"].concat(f.slice( - 2));
                else if ("O" == a) r.pop(),
                b = k(l, h, f[1], f[2]),
                b.push(b[0]),
                r = r.concat(b);
                else if ("U" == a) r.pop(),
                r = r.concat(k(l, h, f[1], f[2], f[3])),
                p = ["U"].concat(r[r.length - 1].slice( - 2));
                else for (var w = 0,
                x = f.length; x > w; w++) p[w] = f[w];
                if (a = a.toUpperCase(), "O" != a) switch (p[0]) {
                case "Z":
                    l = u,
                    h = c;
                    break;
                case "H":
                    l = p[1];
                    break;
                case "V":
                    h = p[1];
                    break;
                case "M":
                    u = p[p.length - 2],
                    c = p[p.length - 1];
                default:
                    l = p[p.length - 2],
                    h = p[p.length - 1]
                }
            }
            return r.toString = s,
            n.abs = o(r),
            r
        }
        function S(t, e, i, n) {
            return [t, e, i, n, i, n]
        }
        function D(t, e, i, n, s, o) {
            var a = 1 / 3,
            r = 2 / 3;
            return [a * t + r * i, a * e + r * n, a * s + r * i, a * o + r * n, s, o]
        }
        function M(e, i, n, s, o, a, r, l, h, u) {
            var c, d = 120 * L / 180,
            p = L / 180 * ( + o || 0),
            f = [],
            m = t._.cacher(function(t, e, i) {
                var n = t * B.cos(i) - e * B.sin(i),
                s = t * B.sin(i) + e * B.cos(i);
                return {
                    x: n,
                    y: s
                }
            });
            if (u) C = u[0],
            T = u[1],
            x = u[2],
            k = u[3];
            else {
                c = m(e, i, -p),
                e = c.x,
                i = c.y,
                c = m(l, h, -p),
                l = c.x,
                h = c.y;
                var g = (B.cos(L / 180 * o), B.sin(L / 180 * o), (e - l) / 2),
                v = (i - h) / 2,
                b = g * g / (n * n) + v * v / (s * s);
                b > 1 && (b = B.sqrt(b), n = b * n, s = b * s);
                var y = n * n,
                _ = s * s,
                w = (a == r ? -1 : 1) * B.sqrt(U((y * _ - y * v * v - _ * g * g) / (y * v * v + _ * g * g))),
                x = w * n * v / s + (e + l) / 2,
                k = w * -s * g / n + (i + h) / 2,
                C = B.asin(((i - k) / s).toFixed(9)),
                T = B.asin(((h - k) / s).toFixed(9));
                C = x > e ? L - C: C,
                T = x > l ? L - T: T,
                0 > C && (C = 2 * L + C),
                0 > T && (T = 2 * L + T),
                r && C > T && (C -= 2 * L),
                !r && T > C && (T -= 2 * L)
            }
            var S = T - C;
            if (U(S) > d) {
                var D = T,
                I = l,
                P = h;
                T = C + d * (r && T > C ? 1 : -1),
                l = x + n * B.cos(T),
                h = k + s * B.sin(T),
                f = M(l, h, n, s, o, 0, r, I, P, [T, D, x, k])
            }
            S = T - C;
            var E = B.cos(C),
            j = B.sin(C),
            A = B.cos(T),
            N = B.sin(T),
            F = B.tan(S / 4),
            z = 4 / 3 * n * F,
            H = 4 / 3 * s * F,
            O = [e, i],
            W = [e + z * j, i - H * E],
            R = [l + z * N, h - H * A],
            $ = [l, h];
            if (W[0] = 2 * O[0] - W[0], W[1] = 2 * O[1] - W[1], u) return [W, R, $].concat(f);
            f = [W, R, $].concat(f).join().split(",");
            for (var V = [], q = 0, Y = f.length; Y > q; q++) V[q] = q % 2 ? m(f[q - 1], f[q], p).y: m(f[q], f[q + 1], p).x;
            return V
        }
        function I(t, e, i, n, s, o, a, r, l) {
            var h = 1 - l;
            return {
                x: V(h, 3) * t + 3 * V(h, 2) * l * i + 3 * h * l * l * s + V(l, 3) * a,
                y: V(h, 3) * e + 3 * V(h, 2) * l * n + 3 * h * l * l * o + V(l, 3) * r
            }
        }
        function P(t, e, i, n, s, o, a, r) {
            var l, h = s - 2 * i + t - (a - 2 * s + i),
            u = 2 * (i - t) - 2 * (s - i),
            c = t - i,
            d = ( - u + B.sqrt(u * u - 4 * h * c)) / 2 / h,
            p = ( - u - B.sqrt(u * u - 4 * h * c)) / 2 / h,
            f = [e, r],
            m = [t, a];
            return U(d) > "1e12" && (d = .5),
            U(p) > "1e12" && (p = .5),
            d > 0 && 1 > d && (l = I(t, e, i, n, s, o, a, r, d), m.push(l.x), f.push(l.y)),
            p > 0 && 1 > p && (l = I(t, e, i, n, s, o, a, r, p), m.push(l.x), f.push(l.y)),
            h = o - 2 * n + e - (r - 2 * o + n),
            u = 2 * (n - e) - 2 * (o - n),
            c = e - n,
            d = ( - u + B.sqrt(u * u - 4 * h * c)) / 2 / h,
            p = ( - u - B.sqrt(u * u - 4 * h * c)) / 2 / h,
            U(d) > "1e12" && (d = .5),
            U(p) > "1e12" && (p = .5),
            d > 0 && 1 > d && (l = I(t, e, i, n, s, o, a, r, d), m.push(l.x), f.push(l.y)),
            p > 0 && 1 > p && (l = I(t, e, i, n, s, o, a, r, p), m.push(l.x), f.push(l.y)),
            {
                min: {
                    x: R.apply(0, m),
                    y: R.apply(0, f)
                },
                max: {
                    x: $.apply(0, m),
                    y: $.apply(0, f)
                }
            }
        }
        function E(t, e) {
            var n = !e && i(t);
            if (!e && n.curve) return o(n.curve);
            for (var s = T(t), a = e && T(e), r = {
                x: 0,
                y: 0,
                bx: 0,
                by: 0,
                X: 0,
                Y: 0,
                qx: null,
                qy: null
            },
            l = {
                x: 0,
                y: 0,
                bx: 0,
                by: 0,
                X: 0,
                Y: 0,
                qx: null,
                qy: null
            },
            h = (function(t, e) {
                var i, n;
                if (!t) return ["C", e.x, e.y, e.x, e.y, e.x, e.y];
                switch (! (t[0] in {
                    T: 1,
                    Q: 1
                }) && (e.qx = e.qy = null), t[0]) {
                case "M":
                    e.X = t[1],
                    e.Y = t[2];
                    break;
                case "A":
                    t = ["C"].concat(M.apply(0, [e.x, e.y].concat(t.slice(1))));
                    break;
                case "S":
                    i = e.x + (e.x - (e.bx || e.x)),
                    n = e.y + (e.y - (e.by || e.y)),
                    t = ["C", i, n].concat(t.slice(1));
                    break;
                case "T":
                    e.qx = e.x + (e.x - (e.qx || e.x)),
                    e.qy = e.y + (e.y - (e.qy || e.y)),
                    t = ["C"].concat(D(e.x, e.y, e.qx, e.qy, t[1], t[2]));
                    break;
                case "Q":
                    e.qx = t[1],
                    e.qy = t[2],
                    t = ["C"].concat(D(e.x, e.y, t[1], t[2], t[3], t[4]));
                    break;
                case "L":
                    t = ["C"].concat(S(e.x, e.y, t[1], t[2]));
                    break;
                case "H":
                    t = ["C"].concat(S(e.x, e.y, t[1], e.y));
                    break;
                case "V":
                    t = ["C"].concat(S(e.x, e.y, e.x, t[1]));
                    break;
                case "Z":
                    t = ["C"].concat(S(e.x, e.y, e.X, e.Y))
                }
                return t
            }), u = function(t, e) {
                if (t[e].length > 7) {
                    t[e].shift();
                    for (var i = t[e]; i.length;) t.splice(e++, 0, ["C"].concat(i.splice(0, 6)));
                    t.splice(e, 1),
                    p = $(s.length, a && a.length || 0)
                }
            },
            c = function(t, e, i, n, o) {
                t && e && "M" == t[o][0] && "M" != e[o][0] && (e.splice(o, 0, ["M", n.x, n.y]), i.bx = 0, i.by = 0, i.x = t[o][1], i.y = t[o][2], p = $(s.length, a && a.length || 0))
            },
            d = 0, p = $(s.length, a && a.length || 0); p > d; d++) {
                s[d] = h(s[d], r),
                u(s, d),
                a && (a[d] = h(a[d], l)),
                a && u(a, d),
                c(s, a, r, l, d),
                c(a, s, l, r, d);
                var f = s[d],
                m = a && a[d],
                g = f.length,
                v = a && m.length;
                r.x = f[g - 2],
                r.y = f[g - 1],
                r.bx = W(f[g - 4]) || r.x,
                r.by = W(f[g - 3]) || r.y,
                l.bx = a && (W(m[v - 4]) || l.x),
                l.by = a && (W(m[v - 3]) || l.y),
                l.x = a && m[v - 2],
                l.y = a && m[v - 1]
            }
            return a || (n.curve = o(s)),
            a ? [s, a] : s
        }
        function j(t, e) {
            if (!e) return t;
            var i, n, s, o, a, r, l;
            for (t = E(t), s = 0, a = t.length; a > s; s++) for (l = t[s], o = 1, r = l.length; r > o; o += 2) i = e.x(l[o], l[o + 1]),
            n = e.y(l[o], l[o + 1]),
            l[o] = i,
            l[o + 1] = n;
            return t
        }
        function A(t, e) {
            for (var i = [], n = 0, s = t.length; s - 2 * !e > n; n += 2) {
                var o = [{
                    x: +t[n - 2],
                    y: +t[n - 1]
                },
                {
                    x: +t[n],
                    y: +t[n + 1]
                },
                {
                    x: +t[n + 2],
                    y: +t[n + 3]
                },
                {
                    x: +t[n + 4],
                    y: +t[n + 5]
                }];
                e ? n ? s - 4 == n ? o[3] = {
                    x: +t[0],
                    y: +t[1]
                }: s - 2 == n && (o[2] = {
                    x: +t[0],
                    y: +t[1]
                },
                o[3] = {
                    x: +t[2],
                    y: +t[3]
                }) : o[0] = {
                    x: +t[s - 2],
                    y: +t[s - 1]
                }: s - 4 == n ? o[3] = o[2] : n || (o[0] = {
                    x: +t[n],
                    y: +t[n + 1]
                }),
                i.push(["C", ( - o[0].x + 6 * o[1].x + o[2].x) / 6, ( - o[0].y + 6 * o[1].y + o[2].y) / 6, (o[1].x + 6 * o[2].x - o[3].x) / 6, (o[1].y + 6 * o[2].y - o[3].y) / 6, o[2].x, o[2].y])
            }
            return i
        }
        var N = e.prototype,
        F = t.is,
        z = t._.clone,
        H = "hasOwnProperty",
        O = /,?([a-z]),?/gi,
        W = parseFloat,
        B = Math,
        L = B.PI,
        R = B.min,
        $ = B.max,
        V = B.pow,
        U = B.abs,
        q = r(1),
        Y = r(),
        K = r(0, 1),
        G = t._unit2px,
        X = {
            path: function(t) {
                return t.attr("path")
            },
            circle: function(t) {
                var e = G(t);
                return k(e.cx, e.cy, e.r)
            },
            ellipse: function(t) {
                var e = G(t);
                return k(e.cx, e.cy, e.rx, e.ry)
            },
            rect: function(t) {
                var e = G(t);
                return x(e.x, e.y, e.width, e.height, e.rx, e.ry)
            },
            image: function(t) {
                var e = G(t);
                return x(e.x, e.y, e.width, e.height)
            },
            text: function(t) {
                var e = t.node.getBBox();
                return x(e.x, e.y, e.width, e.height)
            },
            g: function(t) {
                var e = t.node.getBBox();
                return x(e.x, e.y, e.width, e.height)
            },
            symbol: function(t) {
                var e = t.getBBox();
                return x(e.x, e.y, e.width, e.height)
            },
            line: function(t) {
                return "M" + [t.attr("x1"), t.attr("y1"), t.attr("x2"), t.attr("y2")]
            },
            polyline: function(t) {
                return "M" + t.attr("points")
            },
            polygon: function(t) {
                return "M" + t.attr("points") + "z"
            },
            svg: function(t) {
                var e = t.node.getBBox();
                return x(e.x, e.y, e.width, e.height)
            },
            deflt: function(t) {
                var e = t.node.getBBox();
                return x(e.x, e.y, e.width, e.height)
            }
        };
        t.path = i,
        t.path.getTotalLength = q,
        t.path.getPointAtLength = Y,
        t.path.getSubpath = function(t, e, i) {
            if (this.getTotalLength(t) - i < 1e-6) return K(t, e).end;
            var n = K(t, i, 1);
            return e ? K(n, e).end: n
        },
        N.getTotalLength = function() {
            return this.node.getTotalLength ? this.node.getTotalLength() : void 0
        },
        N.getPointAtLength = function(t) {
            return Y(this.attr("d"), t)
        },
        N.getSubpath = function(e, i) {
            return t.path.getSubpath(this.attr("d"), e, i)
        },
        t._.box = n,
        t.path.findDotsAtSegment = l,
        t.path.bezierBBox = h,
        t.path.isPointInsideBBox = u,
        t.path.isBBoxIntersect = c,
        t.path.intersection = v,
        t.path.intersectionNumber = b,
        t.path.isPointInside = _,
        t.path.getBBox = w,
        t.path.get = X,
        t.path.toRelative = C,
        t.path.toAbsolute = T,
        t.path.toCubic = E,
        t.path.map = j,
        t.path.toString = s,
        t.path.clone = o
    }),
    n.plugin(function(t) {
        var e = Math.max,
        i = Math.min,
        n = function(t) {
            if (this.items = [], this.length = 0, this.type = "set", t) for (var e = 0,
            i = t.length; i > e; e++) t[e] && (this[this.items.length] = this.items[this.items.length] = t[e], this.length++)
        },
        s = n.prototype;
        s.push = function() {
            for (var t, e, i = 0,
            n = arguments.length; n > i; i++) t = arguments[i],
            t && (e = this.items.length, this[e] = this.items[e] = t, this.length++);
            return this
        },
        s.pop = function() {
            return this.length && delete this[this.length--],
            this.items.pop()
        },
        s.forEach = function(t, e) {
            for (var i = 0,
            n = this.items.length; n > i; i++) if (t.call(e, this.items[i], i) === !1) return this;
            return this
        },
        s.remove = function() {
            for (; this.length;) this.pop().remove();
            return this
        },
        s.attr = function(t) {
            for (var e = 0,
            i = this.items.length; i > e; e++) this.items[e].attr(t);
            return this
        },
        s.clear = function() {
            for (; this.length;) this.pop()
        },
        s.splice = function(t, s) {
            t = 0 > t ? e(this.length + t, 0) : t,
            s = e(0, i(this.length - t, s));
            var o, a = [],
            r = [],
            l = [];
            for (o = 2; o < arguments.length; o++) l.push(arguments[o]);
            for (o = 0; s > o; o++) r.push(this[t + o]);
            for (; o < this.length - t; o++) a.push(this[t + o]);
            var h = l.length;
            for (o = 0; o < h + a.length; o++) this.items[t + o] = this[t + o] = h > o ? l[o] : a[o - h];
            for (o = this.items.length = this.length -= s - h; this[o];) delete this[o++];
            return new n(r)
        },
        s.exclude = function(t) {
            for (var e = 0,
            i = this.length; i > e; e++) if (this[e] == t) return this.splice(e, 1),
            !0;
            return ! 1
        },
        s.insertAfter = function(t) {
            for (var e = this.items.length; e--;) this.items[e].insertAfter(t);
            return this
        },
        s.getBBox = function() {
            for (var t = [], n = [], s = [], o = [], a = this.items.length; a--;) if (!this.items[a].removed) {
                var r = this.items[a].getBBox();
                t.push(r.x),
                n.push(r.y),
                s.push(r.x + r.width),
                o.push(r.y + r.height)
            }
            return t = i.apply(0, t),
            n = i.apply(0, n),
            s = e.apply(0, s),
            o = e.apply(0, o),
            {
                x: t,
                y: n,
                x2: s,
                y2: o,
                width: s - t,
                height: o - n,
                cx: t + (s - t) / 2,
                cy: n + (o - n) / 2
            }
        },
        s.clone = function(t) {
            t = new n;
            for (var e = 0,
            i = this.items.length; i > e; e++) t.push(this.items[e].clone());
            return t
        },
        s.toString = function() {
            return "Snapâ€˜s set"
        },
        s.type = "set",
        t.set = function() {
            var t = new n;
            return arguments.length && t.push.apply(t, Array.prototype.slice.call(arguments, 0)),
            t
        }
    }),
    n.plugin(function(t, e) {
        function i(t) {
            var e = t[0];
            switch (e.toLowerCase()) {
            case "t":
                return [e, 0, 0];
            case "m":
                return [e, 1, 0, 0, 1, 0, 0];
            case "r":
                return 4 == t.length ? [e, 0, t[2], t[3]] : [e, 0];
            case "s":
                return 5 == t.length ? [e, 1, 1, t[3], t[4]] : 3 == t.length ? [e, 1, 1] : [e, 1]
            }
        }
        function n(e, n, s) {
            n = c(n).replace(/\.{3}|\u2026/g, e),
            e = t.parseTransformString(e) || [],
            n = t.parseTransformString(n) || [];
            for (var o, a, h, u, d = Math.max(e.length, n.length), p = [], f = [], m = 0; d > m; m++) {
                if (h = e[m] || i(n[m]), u = n[m] || i(h), h[0] != u[0] || "r" == h[0].toLowerCase() && (h[2] != u[2] || h[3] != u[3]) || "s" == h[0].toLowerCase() && (h[3] != u[3] || h[4] != u[4])) {
                    e = t._.transform2matrix(e, s()),
                    n = t._.transform2matrix(n, s()),
                    p = [["m", e.a, e.b, e.c, e.d, e.e, e.f]],
                    f = [["m", n.a, n.b, n.c, n.d, n.e, n.f]];
                    break
                }
                for (p[m] = [], f[m] = [], o = 0, a = Math.max(h.length, u.length); a > o; o++) o in h && (p[m][o] = h[o]),
                o in u && (f[m][o] = u[o])
            }
            return {
                from: l(p),
                to: l(f),
                f: r(p)
            }
        }
        function s(t) {
            return t
        }
        function o(t) {
            return function(e) {
                return + e.toFixed(3) + t
            }
        }
        function a(e) {
            return t.rgb(e[0], e[1], e[2])
        }
        function r(t) {
            var e, i, n, s, o, a, r = 0,
            l = [];
            for (e = 0, i = t.length; i > e; e++) {
                for (o = "[", a = ['"' + t[e][0] + '"'], n = 1, s = t[e].length; s > n; n++) a[n] = "val[" + r+++"]";
                o += a + "]",
                l[e] = o
            }
            return Function("val", "return Snap.path.toString.call([" + l + "])")
        }
        function l(t) {
            for (var e = [], i = 0, n = t.length; n > i; i++) for (var s = 1,
            o = t[i].length; o > s; s++) e.push(t[i][s]);
            return e
        }
        var h = {},
        u = /[a-z]+$/i,
        c = String;
        h.stroke = h.fill = "colour",
        e.prototype.equal = function(e, i) {
            var d, p, f = c(this.attr(e) || ""),
            m = this;
            if (f == +f && i == +i) return {
                from: +f,
                to: +i,
                f: s
            };
            if ("colour" == h[e]) return d = t.color(f),
            p = t.color(i),
            {
                from: [d.r, d.g, d.b, d.opacity],
                to: [p.r, p.g, p.b, p.opacity],
                f: a
            };
            if ("transform" == e || "gradientTransform" == e || "patternTransform" == e) return i instanceof t.Matrix && (i = i.toTransformString()),
            t._.rgTransform.test(i) || (i = t._.svgTransform2string(i)),
            n(f, i,
            function() {
                return m.getBBox(1)
            });
            if ("d" == e || "path" == e) return d = t.path.toCubic(f, i),
            {
                from: l(d[0]),
                to: l(d[1]),
                f: r(d[0])
            };
            if ("points" == e) return d = c(f).split(","),
            p = c(i).split(","),
            {
                from: d,
                to: p,
                f: function(t) {
                    return t
                }
            };
            var g = f.match(u),
            v = c(i).match(u);
            return g && g == v ? {
                from: parseFloat(f),
                to: parseFloat(i),
                f: o(g)
            }: {
                from: this.asPX(e),
                to: this.asPX(e, i),
                f: s
            }
        }
    }),
    n.plugin(function(t, i, n, s) {
        for (var o = i.prototype,
        a = "hasOwnProperty",
        r = ("createTouch" in s.doc), l = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "touchstart", "touchmove", "touchend", "touchcancel"], h = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        },
        u = function(t) {
            var e = "y" == t ? "scrollTop": "scrollLeft";
            return s.doc.documentElement[e] || s.doc.body[e]
        },
        c = function() {
            this.returnValue = !1
        },
        d = function() {
            return this.originalEvent.preventDefault()
        },
        p = function() {
            this.cancelBubble = !0
        },
        f = function() {
            return this.originalEvent.stopPropagation()
        },
        m = function() {
            return s.doc.addEventListener ?
            function(t, e, i, n) {
                var s = r && h[e] ? h[e] : e,
                o = function(s) {
                    var o = u("y"),
                    l = u("x");
                    if (r && h[a](e)) for (var c = 0,
                    p = s.targetTouches && s.targetTouches.length; p > c; c++) if (s.targetTouches[c].target == t || t.contains(s.targetTouches[c].target)) {
                        var m = s;
                        s = s.targetTouches[c],
                        s.originalEvent = m,
                        s.preventDefault = d,
                        s.stopPropagation = f;
                        break
                    }
                    var g = s.clientX + l,
                    v = s.clientY + o;
                    return i.call(n, s, g, v)
                };
                return e !== s && t.addEventListener(e, o, !1),
                t.addEventListener(s, o, !1),
                function() {
                    return e !== s && t.removeEventListener(e, o, !1),
                    t.removeEventListener(s, o, !1),
                    !0
                }
            }: s.doc.attachEvent ?
            function(t, e, i, n) {
                var o = function(t) {
                    t = t || s.win.event;
                    var e = u("y"),
                    o = u("x"),
                    a = t.clientX + o,
                    r = t.clientY + e;
                    return t.preventDefault = t.preventDefault || c,
                    t.stopPropagation = t.stopPropagation || p,
                    i.call(n, t, a, r)
                };
                t.attachEvent("on" + e, o);
                var a = function() {
                    return t.detachEvent("on" + e, o),
                    !0
                };
                return a
            }: void 0
        } (), g = [], v = function(i) {
            for (var n, s = i.clientX,
            o = i.clientY,
            a = u("y"), l = u("x"), h = g.length; h--;) {
                if (n = g[h], r) {
                    for (var c, d = i.touches && i.touches.length; d--;) if (c = i.touches[d], c.identifier == n.el._drag.id || n.el.node.contains(c.target)) {
                        s = c.clientX,
                        o = c.clientY,
                        (i.originalEvent ? i.originalEvent: i).preventDefault();
                        break
                    }
                } else i.preventDefault();
                var p = n.el.node;
                t._.glob,
                p.nextSibling,
                p.parentNode,
                p.style.display,
                s += l,
                o += a,
                e("snap.drag.move." + n.el.id, n.move_scope || n.el, s - n.el._drag.x, o - n.el._drag.y, s, o, i)
            }
        },
        b = function(i) {
            t.unmousemove(v).unmouseup(b);
            for (var n, s = g.length; s--;) n = g[s],
            n.el._drag = {},
            e("snap.drag.end." + n.el.id, n.end_scope || n.start_scope || n.move_scope || n.el, i);
            g = []
        },
        y = l.length; y--;) !
        function(e) {
            t[e] = o[e] = function(i, n) {
                return t.is(i, "function") && (this.events = this.events || [], this.events.push({
                    name: e,
                    f: i,
                    unbind: m(this.shape || this.node || s.doc, e, i, n || this)
                })),
                this
            },
            t["un" + e] = o["un" + e] = function(t) {
                for (var i = this.events || [], n = i.length; n--;) if (i[n].name == e && (i[n].f == t || !t)) return i[n].unbind(),
                i.splice(n, 1),
                !i.length && delete this.events,
                this;
                return this
            }
        } (l[y]);
        o.hover = function(t, e, i, n) {
            return this.mouseover(t, i).mouseout(e, n || i)
        },
        o.unhover = function(t, e) {
            return this.unmouseover(t).unmouseout(e)
        };
        var _ = [];
        o.drag = function(i, n, s, o, a, r) {
            function l(l, h, u) { (l.originalEvent || l).preventDefault(),
                this._drag.x = h,
                this._drag.y = u,
                this._drag.id = l.identifier,
                !g.length && t.mousemove(v).mouseup(b),
                g.push({
                    el: this,
                    move_scope: o,
                    start_scope: a,
                    end_scope: r
                }),
                n && e.on("snap.drag.start." + this.id, n),
                i && e.on("snap.drag.move." + this.id, i),
                s && e.on("snap.drag.end." + this.id, s),
                e("snap.drag.start." + this.id, a || o || this, h, u, l)
            }
            if (!arguments.length) {
                var h;
                return this.drag(function(t, e) {
                    this.attr({
                        transform: h + (h ? "T": "t") + [t, e]
                    })
                },
                function() {
                    h = this.transform().local
                })
            }
            return this._drag = {},
            _.push({
                el: this,
                start: l
            }),
            this.mousedown(l),
            this
        },
        o.undrag = function() {
            for (var i = _.length; i--;) _[i].el == this && (this.unmousedown(_[i].start), _.splice(i, 1), e.unbind("snap.drag.*." + this.id));
            return ! _.length && t.unmousemove(v).unmouseup(b),
            this
        }
    }),
    n.plugin(function(t, i, n) {
        var s = (i.prototype, n.prototype),
        o = /^\s*url\((.+)\)/,
        a = String,
        r = t._.$;
        t.filter = {},
        s.filter = function(e) {
            var n = this;
            "svg" != n.type && (n = n.paper);
            var s = t.parse(a(e)),
            o = t._.id(),
            l = (n.node.offsetWidth, n.node.offsetHeight, r("filter"));
            return r(l, {
                id: o,
                filterUnits: "userSpaceOnUse"
            }),
            l.appendChild(s.node),
            n.defs.appendChild(l),
            new i(l)
        },
        e.on("snap.util.getattr.filter",
        function() {
            e.stop();
            var i = r(this.node, "filter");
            if (i) {
                var n = a(i).match(o);
                return n && t.select(n[1])
            }
        }),
        e.on("snap.util.attr.filter",
        function(n) {
            if (n instanceof i && "filter" == n.type) {
                e.stop();
                var s = n.node.id;
                s || (r(n.node, {
                    id: n.id
                }), s = n.id),
                r(this.node, {
                    filter: t.url(s)
                })
            }
            n && "none" != n || (e.stop(), this.node.removeAttribute("filter"))
        }),
        t.filter.blur = function(e, i) {
            null == e && (e = 2);
            var n = null == i ? e: [e, i];
            return t.format('<feGaussianBlur stdDeviation="{def}"/>', {
                def: n
            })
        },
        t.filter.blur.toString = function() {
            return this()
        },
        t.filter.shadow = function(e, i, n, s) {
            return s = s || "#000",
            null == n && (n = 4),
            "string" == typeof n && (s = n, n = 4),
            null == e && (e = 0, i = 2),
            null == i && (i = e),
            s = t.color(s),
            t.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>', {
                color: s,
                dx: e,
                dy: i,
                blur: n
            })
        },
        t.filter.shadow.toString = function() {
            return this()
        },
        t.filter.grayscale = function(e) {
            return null == e && (e = 1),
            t.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>', {
                a: .2126 + .7874 * (1 - e),
                b: .7152 - .7152 * (1 - e),
                c: .0722 - .0722 * (1 - e),
                d: .2126 - .2126 * (1 - e),
                e: .7152 + .2848 * (1 - e),
                f: .0722 - .0722 * (1 - e),
                g: .2126 - .2126 * (1 - e),
                h: .0722 + .9278 * (1 - e)
            })
        },
        t.filter.grayscale.toString = function() {
            return this()
        },
        t.filter.sepia = function(e) {
            return null == e && (e = 1),
            t.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>', {
                a: .393 + .607 * (1 - e),
                b: .769 - .769 * (1 - e),
                c: .189 - .189 * (1 - e),
                d: .349 - .349 * (1 - e),
                e: .686 + .314 * (1 - e),
                f: .168 - .168 * (1 - e),
                g: .272 - .272 * (1 - e),
                h: .534 - .534 * (1 - e),
                i: .131 + .869 * (1 - e)
            })
        },
        t.filter.sepia.toString = function() {
            return this()
        },
        t.filter.saturate = function(e) {
            return null == e && (e = 1),
            t.format('<feColorMatrix type="saturate" values="{amount}"/>', {
                amount: 1 - e
            })
        },
        t.filter.saturate.toString = function() {
            return this()
        },
        t.filter.hueRotate = function(e) {
            return e = e || 0,
            t.format('<feColorMatrix type="hueRotate" values="{angle}"/>', {
                angle: e
            })
        },
        t.filter.hueRotate.toString = function() {
            return this()
        },
        t.filter.invert = function(e) {
            return null == e && (e = 1),
            t.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>', {
                amount: e,
                amount2: 1 - e
            })
        },
        t.filter.invert.toString = function() {
            return this()
        },
        t.filter.brightness = function(e) {
            return null == e && (e = 1),
            t.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>', {
                amount: e
            })
        },
        t.filter.brightness.toString = function() {
            return this()
        },
        t.filter.contrast = function(e) {
            return null == e && (e = 1),
            t.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>', {
                amount: e,
                amount2: .5 - e / 2
            })
        },
        t.filter.contrast.toString = function() {
            return this()
        }
    }),
    n
});
var heritageVideo = '<video controls="controls" style="width:100%;height:100%;" width="100%" height="100%" id="heritage-video" preload=""><source src="http://ditaeyewear.s3.amazonaws.com/Dita%20Heritage.mp4" type="video/mp4"><source src="http://ditaeyewear.s3.amazonaws.com/Dita%20Heritage.ogg" type="video/ogg"><object data="https://dita.com/js/tiny_mce/plugins/media/moxieplayer.swf" height="240" id="heritage-video" type="application/x-shockwave-flash" width="320"><param name="src" value="https://dita.com/js/tiny_mce/plugins/media/moxieplayer.swf"><param name="flashvars" value="url=http%3A//ditaeyewear.s3.amazonaws.com/Dita%2520Heritage.mp4&amp;poster=/index.php/admin/cms_page/edit/page_id/2/key/8e89649e2a89e267c21ba4222d8da6342289d28302e971a5d6c2dbe6f1b5779a/"><param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="true"></object></video>',
stylistVideo = '<video controls="controls" id="stylist-video" preload=""><source src="http://ditaeyewear.s3.amazonaws.com/DitaStylist.mp4" type="video/mp4"><source src="http://ditaeyewear.s3.amazonaws.com/DitaStylist.ogg" type="video/ogg"><object data="https://dita.com/js/tiny_mce/plugins/media/moxieplayer.swf" height="240" id="heritage-video" type="application/x-shockwave-flash" width="320"><param name="src" value="https://dita.com/js/tiny_mce/plugins/media/moxieplayer.swf"><param name="flashvars" value="url=http%3A%2F%2Fditaeyewear.s3.amazonaws.com%2FDitaStylist.mp4&amp;poster=/index.php/admin/cms_page/edit/page_id/2/key/8e89649e2a89e267c21ba4222d8da6342289d28302e971a5d6c2dbe6f1b5779a/"><param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="true"></object></video>';
window.mobileAndTabletcheck = function() {
    var t = !1;
    return function(e) { (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0)
    } (navigator.userAgent || navigator.vendor || window.opera),
    t
},
function(t) {
    function e() {
        var e = t("#heritageVideo");
        e.on("click", ".play i",
        function() {
            0 === e.find(".video-container video").length && (e.find(".video-container").append(heritageVideo), t("video").mediaelementplayer()),
            e.addClass("playing").find(".video-container").css({
                display: "block",
                opacity: 0
            }).stop().animate({
                opacity: 1
            },
            800, "swing",
            function() {
                t("html,body").animate({
                    scrollTop: t(this).offset().top
                },
                450),
                e.find(".mejs-play button").delay(450).trigger("click")
            })
        }).on("click", "video",
        function() {
            e.removeClass("playing").find(".video-container").fadeOut(500,
            function() {
                t(this).css({
                    display: "none"
                })
            })
        })
    }
    t.fn.scrollClass = function(e) {
        var i = {
            top: 0,
            "class": ""
        };
        e = t.extend(i, e),
        Math.max(t("body").scrollTop(), t("html").scrollTop()) >= e.top ? t(this).addClass(e["class"]) : t(this).removeClass(e["class"])
    };
    var i = {
        common: {
            init: function() {
                var e = t("header.navbar ul.nav.navbar-collapse");
                t("header.navbar-default").on("click", "button.toggle, .close a",
                function(t) {
                    t.preventDefault(),
                    e.toggleClass("shown")
                }),
                t(window).on("scroll",
                function() {
                    t("header.navbar-default").scrollClass({
                        top: 50,
                        "class": "scroll"
                    })
                }),
                t("header.navbar-default").scrollClass({
                    top: 50,
                    "class": "scroll"
                }),
                t("#accountNav").on("click", ".active a",
                function(e) {
                    e.preventDefault(),
                    t(this).parents("ul").toggleClass("open")
                })
            },
            finalize: function() {}
        },
        home: {
            init: function() {
                t(".mens .toggle_points li").click(function(e) {
                    t(this).hasClass("active") || t(this).toggleClass("active").siblings().removeClass("active"),
                    t(".mens img.glasses.active").animate({
                        opacity: 0
                    }).removeClass("active"),
                    t("#" + t(this).data("toggleTarget")).animate({
                        opacity: 1
                    }).toggleClass("active")
                }),
                t(".womens .toggle_points li").click(function(e) {
                    t(this).hasClass("active") || t(this).toggleClass("active").siblings().removeClass("active"),
                    t(".womens img.glasses.active").animate({
                        opacity: 0
                    }).removeClass("active"),
                    t("#" + t(this).data("toggleTarget")).animate({
                        opacity: 1
                    }).toggleClass("active")
                });
                var e = t("#vid-block");
                t(".stopMe").click(function() {
                    t(".mejs-pause button").trigger("click")
                }),
                t(".wp-svg-custom-play2").click(function() {
                    e.addClass("playing"),
                    e.find(".container, .vid_block_bg").fadeOut(500),
                    0 === e.find("video").length && (e.find(".video-container").append(heritageVideo), e.find("video").mediaelementplayer({
                        success: function(t, e) {
                            t.play()
                        }
                    })),
                    t(".video-container").fadeIn(800,
                    function() {
                        t("html,body").animate({
                            scrollTop: t(this).offset().top - (t(window).height() - t(this).outerHeight(!0)) / 2
                        },
                        450),
                        t(".mejs-play button").delay(450).trigger("click")
                    })
                }),
                e.on("click", "video",
                function() {
                    e.removeClass("playing"),
                    t(".video-container").fadeOut(500,
                    function() {
                        e.find(".container,.vid_block_bg").fadeIn(500,
                        function() {
                            t("html,body").animate({
                                scrollTop: e.offset().top - (t(window).height() - t(this).outerHeight(!0)) / 2
                            },
                            450)
                        })
                    })
                });
                var i = t("#opening-section");
                if (t(window).on("scroll",
                function() {
                    t("body").scrollTop() > i.height() ? i.addClass("invisible") : i.removeClass("invisible")
                }).load(function() {
                    i.find("img").removeClass("on_load"),
                    i.find(".content").delay(500).addClass("visible"),
                    setTimeout(function() {
                        i.find(".content").addClass("above")
                    },
                    2e3)
                }), window.onresize = function() {},
                !window.mobileAndTabletcheck()) {
                    t("#glasses-main .row:first-child").prepend('<div class="explosionWrapper col-sm-6"><div id="explosion"></div></div>'); {
                        var n = t("#explosion");
                        n.offset().top - .6 * t(window).height()
                    }
                    n.css({
                        "background-position": "0 0"
                    });
                    for (var s = 0,
                    o = 50; o >= 0;) n.attr("data-" + (200 - s) + "-bottom", "background-position:0 -" + 299 * o + "px"),
                    s % 11 === 1 && o--,
                    s++; {
                        var a = t(".one_way_1"),
                        r = t(".one_way_2"),
                        l = t(".one_way_3"),
                        h = t(".one_way_4");
                        skrollr.init({
                            forceHeight: !1,
                            render: function() {
                                a.hasClass("skrollable-after") && t(".one_way_1").addClass("POW"),
                                r.hasClass("skrollable-after") && t(".one_way_2").addClass("POW"),
                                l.hasClass("skrollable-after") && t(".one_way_3").addClass("POW"),
                                h.hasClass("skrollable-after") && t(".one_way_4").addClass("POW")
                            }
                        })
                    }
                }
            },
            finalize: function() {}
        },
        stylist: {
            init: function() {
                t.fn.ditaStylist = function(e) {
                    var i = {
                        container: t(this),
                        step: "sex",
                        steps: []
                    };
                    e = t.extend(i, e),
                    e.steps.sex = !1,
                    e.steps.type = !1,
                    e.steps.shape = !1,
                    e.steps.style = !1,
                    e.product = function(e) {
                        var i = "",
                        n = 0;
                        return t.each(e.children,
                        function() {
                            n++
                        }),
                        n > 0 && (i += '<li class="item"><div class="owl-carousel">', t.each(e.children,
                        function(t, e) {
                            i += '<a href="' + e.url + '"><img data-src="' + e.front + '" alt="' + e.name + '" class="lazyOwl" /></a>'
                        }), i += '</div><h2><a href="' + e.url + '">' + e.name + "</a></h2></li>"),
                        i
                    },
                    e.post = function() {
                        var i = {
                            sex: e.steps.sex,
                            type: e.steps.type,
                            shape: e.steps.shape,
                            style: e.steps.style
                        };
                        t.post("/shop/stylist/index/index", i,
                        function(i) {
                            e.container.find("#steps .step").css({
                                display: "none"
                            }),
                            i.products.length > 0 ? (e.container.find("#products").children("h2,.bg").remove(), e.container.find("#products").append('<h2>Your Perfect Pair</h2><div class="bg"><div class="container"><ul class="products-grid"></ul></div></div>'), t.each(i.products,
                            function(t, i) {
                                e.container.find("#products .products-grid").append(e.product(i))
                            }), t(".owl-carousel").owlCarousel({
                                singleItem: !0,
                                lazyLoad: !0
                            }), 0 === e.container.find(".item").length && (e.container.find("#products").children("h2,.bg").remove(), e.container.find("#products").append("<p>No products were found that matched your selection.</p>"))) : (e.container.find("#products").children("h2,.bg").remove(), e.container.find("#products").append("<p>No products were found that matched your selection.</p>")),
                            e.container.find("#products").css({
                                display: "block",
                                opacity: 0
                            }).stop().animate({
                                opacity: 1
                            },
                            500, "swing")
                        })
                    },
                    e.removeVideo = function() {
                        e.container.find("#products").removeClass("video").children(".mejs-offscreen,.mejs-container").remove()
                    },
                    e.fetch = function() {
                        if (e.container.find("#steps .step").css({
                            opacity: .5
                        }), e.container.find("#products").html(""), e.post(), "undefined" == typeof getCookie("stylistVideo") && !window.mobileAndTabletcheck()) {
                            document.cookie = "stylistVideo=played;path=/",
                            e.container.find("#steps .step").css({
                                display: "none"
                            }),
                            e.container.find("#products").addClass("video").prepend(stylistVideo);
                            var i = e.container.find("#products video").mediaelementplayer();
                            e.container.find(".mejs-play button").trigger("click"),
                            t("html,body").stop().animate({
                                scrollTop: e.container.find("#products").offset().top - 15
                            },
                            250, "swing"),
                            i.on("ended",
                            function() {
                                e.removeVideo()
                            }),
                            i.on("pause",
                            function() {
                                e.removeVideo()
                            })
                        }
                    },
                    e.keyIndex = function(t, e) {
                        var i = -1;
                        for (var n in t) if (i++, n === e) break;
                        return i
                    },
                    e.canDo = function(t) {
                        e.container.find("#products").css({
                            display: "none"
                        }).find(".products-grid").html("");
                        var i = e.keyIndex(e.steps, t) <= e.keyIndex(e.steps, e.step);
                        return i || e.steps[e.step] === !1 || e.keyIndex(e.steps, t) !== e.keyIndex(e.steps, e.step) + 1 || (i = !0),
                        i
                    },
                    e["do"] = function(t) {
                        if ("undefined" != typeof e.steps[t] && e.canDo(t)) {
                            var i = t;
                            e.container.find("#steps ." + t).length > 1 && (i += "." + e.steps.sex),
                            "style" === t && (i += "." + e.steps.type),
                            e.step = t,
                            e.container.find(".progress a").removeClass("active").filter("[rel=" + t + "]").addClass("active"),
                            e.container.find("#steps .step").stop().animate({
                                opacity: 0
                            },
                            300, "swing",
                            function() {
                                e.container.find("#steps .step").css({
                                    display: "none"
                                }).filter("." + i).css({
                                    display: "block"
                                }).stop().animate({
                                    opacity: 1
                                },
                                300, "swing")
                            })
                        }
                    },
                    e.container.on("click", ".progress a",
                    function(i) {
                        i.preventDefault(),
                        e["do"](t(this).attr("rel"))
                    }).on("click", "#steps .sex span",
                    function() {
                        e.steps.sex = t(this).attr("rel"),
                        e["do"]("type")
                    }).on("click", "#steps .type span",
                    function() {
                        e.steps.type = t(this).attr("rel"),
                        e["do"]("shape")
                    }).on("click", "#steps .shape span",
                    function() {
                        e.steps.shape = t(this).attr("rel"),
                        e["do"]("style")
                    }).on("click", "#steps .style span",
                    function() {
                        e.steps.style = t(this).attr("rel"),
                        e.fetch()
                    }),
                    e["do"]("sex")
                },
                t("#basic.stylist").ditaStylist()
            }
        },
        about: {
            init: function() {
                if (!window.mobileAndTabletcheck()) {
                    skrollr.init({
                        forceHeight: !1
                    })
                }
            }
        },
        about_intl: {
            init: function() {
                if (!window.mobileAndTabletcheck()) {
                    skrollr.init({
                        forceHeight: !1
                    })
                }
            }
        },
        heritage: {
            init: function() {
                e()
            }
        },
        heritage_intl: {
            init: function() {
                e()
            }
        },
        catalog_category_view: {
            init: function() {
                function e(t) {
                    if (1 === t.length) return t[0];
                    for (var i = [], n = e(t.slice(1)), s = 0; s < n.length; s++) for (var o = 0; o < t[0].length; o++) i.push(t[0][o] + n[s]);
                    return i
                }
                function i() {
                    var i = {
                        filters: [],
                        temp: []
                    };
                    s.find(".filterGroup").each(function() {
                        t(this).find(".selected").length > 0 && (i.temp = [], t(this).find(".selected").each(function() {
                            i.temp.push("." + t(this).attr("rel"))
                        }), i.filters.push(i.temp))
                    }),
                    o.removeClass("empty"),
                    0 === i.filters.length ? (o.removeClass("filtered"), o.find(".item").removeClass("matched")) : (o.addClass("filtered").find(".item").removeClass("matched"), t(e(i.filters).join(",")).addClass("matched"), 0 === o.find(".item.matched").length && o.addClass("empty"))
                }
                function n(e) {
                    o.find(".item.matched").each(function() {
                        var i = t(this).find(".owl-carousel ." + e);
                        if (i.length > 0) {
                            var n = t(this).find(".owl-carousel a").index(i);
                            t(this).find(".owl-carousel").data("owlCarousel").goTo(n)
                        }
                    })
                }
                t(".owl-carousel").owlCarousel({
                    singleItem: !0,
                    lazyLoad: !0
                });
                var s = t("#crumbs"),
                o = t("#products"),
                a = t("#filterView");
                a.on("click", "a",
                function(e) {
                    e.preventDefault(),
                    $show = "front",
                    $hide = "angle",
                    (t(this).hasClass("angle") && !t(this).hasClass("selected") || t(this).hasClass("front") && t(this).hasClass("selected")) && ($show = "angle", $hide = "front"),
                    a.find("a").removeClass("selected"),
                    a.find("." + $show).addClass("selected"),
                    o.find(".item").each(function() {
                        t(this).find("." + $hide).hide(),
                        t(this).find("." + $show).show()
                    })
                }).find(".front").click(),
                s.on("click", ".filterGroup a.filter",
                function(e) {
                    e.preventDefault();
                    var s = t(this);
                    s.toggleClass("selected"),
                    i(),
                    s.hasClass("selected") && /color-/i.test(s.attr("rel")) && n(s.attr("rel"))
                }).on("click", "a.showMore",
                function() {
                    t(this).parent().toggleClass("more")
                }),
                t(".toggleFilters").on("click",
                function() {
                    s.toggleClass("show")
                });
                var r = getParameterByName("filter");
                if ("" !== r) {
                    r = r.split("|");
                    for (var l = 0; l < r.length; l++) t("#crumbs").find('a[rel="' + r[l] + '"]').click()
                }
            }
        },
        catalog_product_view: {
            init: function() {
                function e(t) {
                    i = o.find("a.thumb-link").length,
                    o.hasClass("active") || (n = 0, o.addClass("active")),
                    t ? n++:n--,
                    0 > n ? n = i - 1 : n >= i && (n = 0),
                    o.find("a").eq(n).click()
                }
                var i, n = 0,
                s = t(".product-image"),
                o = t(".product-image-thumbs");
                s.find("a.arrow").remove(),
                t("<a></a>").attr({
                    href: "#",
                    "class": "arrow prev"
                }).on("click",
                function(t) {
                    t.preventDefault(),
                    e(!1)
                }).appendTo(".product-image"),
                t("<a></a>").attr({
                    href: "#",
                    "class": "arrow next"
                }).on("click",
                function(t) {
                    t.preventDefault(),
                    e(!0)
                }).appendTo(".product-image");
                var a, r = t("#configurable_swatch_frame_color"),
                l = t("#configurable_swatch_lens_color");
                t.moveI = function() {
                    r.find(".selected").length > 0 && (0 === r.parent().find("i").length && r.after("<i></i>"), a = r.find(".selected a").first().position(), r.parent().find("i").stop().animate({
                        left: a.left
                    },
                    150, "swing",
                    function() {
                        t(this).stop().animate({
                            top: a.top
                        },
                        300, "swing")
                    }))
                },
                t(window).on("resize",
                function() {
                    t.moveI()
                }),
                r.on("click", ".swatch-label",
                function() {
                    t(".product-image-gallery").addClass("loading"),
                    l.find("li").not(".not-available").first().find(".swatch-label").click()
                }),
                t(".testimonials.owl-carousel").owlCarousel({
                    singleItem: !0,
                    autoPlay: !0,
                    pagination: !1
                }),
                t(".item .owl-carousel").owlCarousel({
                    singleItem: !0,
                    lazyLoad: !0
                });
                var h, u = t(".modelImage");
                u.each(function() {
                    0 === t(this).find("img").length && (h = t(this).data(t(window).width() <= 768 ? "small": "large"), t(this).append('<img src="' + h + '" alt="Model Image" />'))
                })
            },
            finalize: function() {}
        },
        checkout_cart_index: {
            init: function() {}
        }
    },
    n = {
        fire: function(t, e, n) {
            var s, o = i;
            e = void 0 === e ? "init": e,
            s = "" !== t,
            s = s && o[t],
            s = s && "function" == typeof o[t][e],
            s && o[t][e](n)
        },
        loadEvents: function() {
            n.fire("common"),
            t.each(document.body.className.replace(/-/g, "_").split(/\s+/),
            function(t, e) {
                n.fire(e),
                n.fire(e, "finalize")
            }),
            n.fire("common", "finalize")
        }
    };
    t(document).ready(n.loadEvents)
} (jQuery);
//# sourceMappingURL=main.js.map
