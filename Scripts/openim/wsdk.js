﻿window.Messenger = function () {
    function a(a, b) {
        var c = "";
        if (arguments.length < 2 ? c = "target error - target and name are both required" : "object" != typeof a ? c = "target error - target itself must be window object" : "string" != typeof b && (c = "target error - target name must be string type"), c)
            throw new Error(c);
        this.target = a,
		this.name = b
    }
    function b(a, b) {
        this.targets = {},
		this.name = a,
		this.listenFunc = [],
		c = b || c,
		"string" != typeof c && (c = c.toString()),
		this.initListen()
    }
    var c = "[PROJECT_NAME]",
	d = "postMessage" in window;
    return d ? a.prototype.send = function (a) {
        this.target.postMessage(c + a, "*")
    }
	 : a.prototype.send = function (a) {
	     var b = window.navigator[c + this.name];
	     if ("function" != typeof b)
	         throw new Error("target callback function is not defined");
	     b(c + a, window)
	 },
	b.prototype.addTarget = function (b, c) {
	    var d = new a(b, c);
	    this.targets[c] = d
	},
	b.prototype.initListen = function () {
	    var a = this,
		b = function (b) {
		    "object" == typeof b && b.data && (b = b.data),
			b = b.slice(c.length);
		    for (var d = 0; d < a.listenFunc.length; d++)
		        a.listenFunc[d](b)
		};
	    d ? "addEventListener" in document ? window.addEventListener("message", b, !1) : "attachEvent" in document && window.attachEvent("onmessage", b) : window.navigator[c + this.name] = b
	},
	b.prototype.listen = function (a) {
	    this.listenFunc.push(a)
	},
	b.prototype.clear = function () {
	    this.listenFunc = []
	},
	b.prototype.send = function (a) {
	    var b,
		c = this.targets;
	    for (b in c)
	        c.hasOwnProperty(b) && c[b].send(a)
	},
	b
}
(), function (a) {
    "use strict";
    function b() {
        try {
            return g in e && e[g]
        } catch (a) {
            return !1
        }
    }
    var c,
	d = {},
	e = window,
	f = e.document,
	g = "localStorage",
	h = "script";
    if (d.disabled = !1, d.version = "1.3.17", d.set = function (a, b) { }, d.get = function (a, b) { }, d.has = function (a) {
		return void 0 !== d.get(a)
    }, d.remove = function (a) { }, d.clear = function () { }, d.transact = function (a, b, c) {
		null == c && (c = b, b = null),
		null == b && (b = {});
		var e = d.get(a, b);
		c(e),
		d.set(a, e)
    }, d.getAll = function () { }, d.forEach = function () { }, d.serialize = function (a) {
		return JSON.stringify(a)
    }, d.deserialize = function (a) {
		if ("string" != typeof a)
			return void 0;
		try {
			return JSON.parse(a)
    } catch (b) {
			return a || void 0
    }
    }, b())
        c = e[g], d.set = function (a, b) {
            return void 0 === b ? d.remove(a) : (c.setItem(a, d.serialize(b)), b)
        },
	d.get = function (a, b) {
	    var e = d.deserialize(c.getItem(a));
	    return void 0 === e ? b : e
	},
	d.remove = function (a) {
	    c.removeItem(a)
	},
	d.clear = function () {
	    c.clear()
	},
	d.getAll = function () {
	    var a = {};
	    return d.forEach(function (b, c) {
	        a[b] = c
	    }),
		a
	},
	d.forEach = function (a) {
	    for (var b = 0; b < c.length; b++) {
	        var e = c.key(b);
	        a(e, d.get(e))
	    }
	};
    else if (f.documentElement.addBehavior) {
        var i,
		j;
        try {
            j = new ActiveXObject("htmlfile"),
			j.open(),
			j.write("<" + h + ">document.w=window</" + h + '><iframe src="/favicon.ico"></iframe>'),
			j.close(),
			i = j.w.frames[0].document,
			c = i.createElement("div")
        } catch (k) {
            c = f.createElement("div"),
			i = f.body
        }
        var l = function (a) {
            return function () {
                var b = Array.prototype.slice.call(arguments, 0);
                b.unshift(c),
				i.appendChild(c),
				c.addBehavior("#default#userData"),
				c.load(g);
                var e = a.apply(d, b);
                return i.removeChild(c),
				e
            }
        },
		m = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"),
		n = function (a) {
		    return a.replace(/^d/, "___$&").replace(m, "___")
		};
        d.set = l(function (a, b, c) {
            return b = n(b),
            void 0 === c ? d.remove(b) : (a.setAttribute(b, d.serialize(c)), a.save(g), c)
        }),
		d.get = l(function (a, b, c) {
		    b = n(b);
		    var e = d.deserialize(a.getAttribute(b));
		    return void 0 === e ? c : e
		}),
		d.remove = l(function (a, b) {
		    b = n(b),
            a.removeAttribute(b),
            a.save(g)
		}),
		d.clear = l(function (a) {
		    var b = a.XMLDocument.documentElement.attributes;
		    for (a.load(g) ; b.length;)
		        a.removeAttribute(b[0].name);
		    a.save(g)
		}),
		d.getAll = function (a) {
		    var b = {};
		    return d.forEach(function (a, c) {
		        b[a] = c
		    }),
			b
		},
		d.forEach = l(function (a, b) {
		    for (var c, e = a.XMLDocument.documentElement.attributes, f = 0; c = e[f]; ++f)
		        b(c.name, d.deserialize(a.getAttribute(c.name)))
		})
    }
    try {
        var o = "__storejs__";
        d.set(o, o),
		d.get(o) != o && (d.disabled = !0),
		d.remove(o)
    } catch (k) {
        d.disabled = !0
    }
    return d.enabled = !d.disabled,
	a.store = d,
	d
}
(this), function () {
    Array.prototype.forEach || (Array.prototype.forEach = function (a) {
        if (!a)
            return !1;
        for (var b = 0, c = this.length; c > b; b++)
            a(this[b], b, this)
    })
}
(), function (a) {
    a.CODE = {
        1e3: "SUCCESS",
        1001: "NOT_LOGIN",
        1002: "TIMEOUT",
        1003: "OTHER_ERROR",
        1004: "PARSE_ERROR",
        1005: "NET_ERROR",
        1006: "KICK_OFF",
        1007: "LOGIN_INFO_ERROR",
        1008: "ALREADY_LOGIN",
        1009: "NO_MESSAGE",
        1010: "PARAM_ERROR"
    }
}
(window.WSDKCons || (window.WSDKCons = {})), function (a) {
    function b(a) {
        return Object.prototype.toString.call(a)
    }
    var c = ["String", "Array", "Object", "Function", "Number", "Boolean", "Date", "RegExp", " Null", "Undefined", "NaN", "Arguments"];
    c.forEach(function (c) {
        a["is" + c] = function (a) {
            return b(a) === "[object " + c + "]"
        }
    })
}
(window.WSDKUtil || (window.WSDKUtil = {})), function (a) {
    a.unparam = function (a) {
        var b = {};
        if (a) {
            a = a.split("&");
            for (var c = 0, d = a.length; d > c; c++) {
                var e = a[c].split("=");
                try {
                    b[e[0]] = decodeURIComponent(e[1])
                } catch (f) {
                    b[e[0]] = e[1]
                }
            }
        }
        return b
    }
}
(window.WSDKUtil || (window.WSDKUtil = {})), function (a) {
    a.param = function (a) {
        var b = "";
        if (a) {
            for (var c in a)
                b += "&" + c + "=" + encodeURIComponent(a[c]);
            b = b.substr(1)
        }
        return b
    }
}
(window.WSDKUtil || (window.WSDKUtil = {})), function (a) {
    a.checkParam = function (a, b) {
        var c = "param lost:",
		d = !1;
        if (a ? b.forEach(function (b) {
				"undefined" == typeof a[b] && (c += b + ";", d = !0)
        }) : (c += "param", d = !0), d)
            throw new Error(c);
        return a.uid && (a.uid = a.uid.toLowerCase()),
		a.touid && (a.touid = a.touid.toLowerCase()),
		!0
    }
}
(window.WSDKUtil || (window.WSDKUtil = {})), function (a) {
    a.callbackHandler = function (b, c) {
        c && (c.success || c.failure || c.error) && a.Event.one(b, function (a) {
            a && 1e3 === a.code ? c.success && c.success.call(null, a) : (c.failure && c.failure.call(null, a), c.error && c.error.call(null, a))
        })
    }
}
(window.WSDKUtil || (window.WSDKUtil = {})), function (a) {
    var b = "WSDK_FORM";
    a.formpost = function (a, c) {
        var d,
		e = document.createElement("form"),
		f = "",
		g = +new Date,
		h = b + g;
        try {
            d = document.createElement('<iframe name="' + h + '">')
        } catch (i) {
            d = document.createElement("iframe")
        }
        d.name = h,
		d.style.display = "none",
		document.body.appendChild(d);
        for (var j in c)
            f += '<input type="hidden" name="' + j + '" value="' + c[j] + '" />';
        e.innerHTML = f,
		e.action = a,
		e.method = "post",
		e.target = h,
		document.body.appendChild(e),
		e.submit(),
		d.onload = function () {
		    e.parentNode.removeChild(e),
			d.parentNode.removeChild(d)
		}
    }
}
(window.WSDKUtil || (window.WSDKUtil = {})), function (a) {
    a.getScript = function (a, b, c, d) {
        var e,
		f = document.createElement("script"),
		g = document.getElementsByTagName("head")[0],
		h = function () {
		    e && clearTimeout(e),
			b && b()
		};
        window.addEventListener ? f.addEventListener("load", function () {
            h()
        }, !1) : f.onreadystatechange = function () {
            ("loaded" == this.readyState || "complete" == this.readyState) && (f.onreadystatechange = null, h())
        },
		f.src = a,
		g.insertBefore(f, g.firstChild),
		e = setTimeout(function () {
		    c && c()
		}, d || 3e3)
    }
}
(window.WSDKUtil || (window.WSDKUtil = {})), function (a) {
    var b = "wsdk_";
    a.jsonp = function (a, c, d, e) {
        var f = +new Date,
		g = document.createElement("script"),
		h = document.getElementsByTagName("head")[0],
		i = b + f,
		j = null;
        e && g.setAttribute("charset", e),
		g.type = "text/javascript",
		g.id = i,
		window[i] = function (a) {
		    try {
		        var b = document.getElementById(i);
		        j && clearTimeout(j),
				b && b.parentNode.removeChild(b),
				delete window[i],
				c && c.call(null, a)
		    } catch (d) { }

		},
		a += (a.indexOf("?") > -1 ? "&" : "?") + "callback=" + i,
		h.insertBefore(g, h.firstChild),
		g.src = a,
		j = setTimeout(function () {
		    d && d.call(null, {
		        code: 1002,
		        resultText: "TIMEOUT"
		    })
		}, 4e3)
    }
}
(window.WSDKUtil || (window.WSDKUtil = {})), function (a) {
    var b = {};
    a.Event = {
        on: function (c, d, e, f) {
            if ("function" == typeof d) {
                if (f) {
                    var g = c,
					h = d;
                    d = function () {
                        a.Event.off(g, d, e),
						h.apply(this, arguments)
                    }
                }
                return c = c.split(/\s+/),
				c.forEach(function (a) {
				    var c = b[a] || (b[a] = []);
				    c.push({
				        callback: d,
				        context: e || this
				    })
				}),
				this
            }
        },
        one: function (b, c, d) {
            return a.Event.on(b, c, d, 1)
        },
        off: function (a, c) {
            return a || c ? (a = a.split(/\s+/), a.forEach(function (a) {
                var d = b[a];
                if (!d)
                    return this;
                if (!c)
                    return delete b[a], this;
                for (var e = 0, f = d.length; f > e; e++)
                    if (c === d[e].callback) {
                        d.splice(e, 1);
                        break
                    }
            }), this) : (b = {}, this)
        },
        fire: function (a, c) {
            return arguments.length ? (a = a.split(/\s+/), a.forEach(function (a) {
                var d = b[a];
                return d ? void d.forEach(function (a) {
                    a.callback.call(a.context, c)
                }) : this
            }), this) : this
        }
    }
}
(window.WSDKUtil || (window.WSDKUtil = {})), function (a) {
    a.htmlEncode = function (a) {
        return a = a.replace(/&/g, "&amp;"),
		a = a.replace(/>/g, "&gt;"),
		a = a.replace(/</g, "&lt;"),
		a = a.replace(/"/g, "&quot;"),
		a = a.replace(/'/g, "&#39;")
    }
}
(window.WSDKUtil || (window.WSDKUtil = {})), function (a) {
    a.extend = function (a) {
        for (var b, c = a || {}, d = 0, e = arguments.length; e > d; d++)
            for (b in arguments[d])
                if (arguments[d].hasOwnProperty(b)) {
                    var f = arguments[d][b];
                    "" !== f && null !== f && "undefined" != typeof f && (c[b] = f)
                }
        return c
    }
}
(window.WSDKUtil || (window.WSDKUtil = {})), function (a) {
    var b = "https://chat.etao.com/collect/info";
    a.log = function (c) {
        c && (c.ua = navigator.userAgent, c.time = +new Date, c.referrer = encodeURIComponent(location.href), a.formpost(b, c))
    }
}
(window.WSDKUtil || (window.WSDKUtil = {})), function (a) {
    function b(a, b) {
        this.init(a, b)
    }
    function c(a, b, c, j) {
        d(b.frameObj);
        var k,
		l = {
		    __ProxyFrame: null,
		    __ProxyFrameLoadTimeOut: null,
		    __ProxyFrameCallback: function () {
		        c && (c.__IsProxyFrameLoad = !0, c.__setLoginInfo.call(c))
		    }
		},
		n = b.timeout;
        delete b.timeout,
		delete b.frameObj;
        try {
            k = document.createElement('<iframe name="WSDK_FRAME">')
        } catch (o) {
            k = document.createElement("iframe")
        }
        if (k.style.display = "none", k.name = "WSDK_FRAME", document.body.appendChild(k), l.__ProxyFrameLoadTimeOut = setTimeout(function () {
					g.log({
            uid: b.uid,
            appkey: b.appkey,
            ver: WSDK.version,
            frameUrl: a,
            errText: (c.__IsProxyFrameLoad ? "login frame loaded but timeout" : "login frame not loaded") + "!!sendCheck:" + c.__IsSendCheck
        }),
					l.__ProxyFrameLoadTimeOut = null,
					h.fire("LOGIN", {
            code: 1002,
            resultText: i[1002]
        })
        }, n), k.attachEvent ? k.attachEvent("onload", l.__ProxyFrameCallback) : k.onload = l.__ProxyFrameCallback, l.__ProxyFrame = k, k)
            try {
                c.context.__Messenger.addTarget(k.contentWindow, m)
            } catch (p) {
                g.log({
                    uid: b.uid,
                    appkey: b.appkey,
                    ver: WSDK.version,
                    frameUrl: a,
                    errText: "add messenger traget error: " + JSON.stringify(p)
                })
            }
        else
            g.log({
                uid: b.uid,
                appkey: b.appkey,
                ver: WSDK.version,
                frameUrl: a,
                errText: "frame is not exist after create frame"
            });
        return c.context.__Messenger.listen(function (a) {
            e(a)
        }),
		j && "POST" != j.toUpperCase() ? (a += "?" + g.param(b), k.src = a) : f(a, b),
		l
    }
    function d(a) {
        a && a.__ProxyFrame && (a.__ProxyFrame.detachEvent ? a.__ProxyFrame.detachEvent("onload", a.__ProxyFrameCallback) : a.__ProxyFrame.onload = null, a.__ProxyFrame.parentNode.removeChild(a.__ProxyFrame), clearTimeout(a.__ProxyFrameLoadTimeOut), a.__ProxyFrameLoadTimeOut = null, a.__ProxyFrame = null)
    }
    function e(a) {
        a = JSON.parse(a),
		h.fire(a.action, a.result),
		a.result && 1e3 == a.result.code && ("CHAT_START_RECEIVE_MSG" === a.action ? (h.fire("MSG_RECEIVED", a.result), 16908304 == a.result.data.cmdid && h.fire("CHAT.MSG_RECEIVED", a.result)) : "START_RECEIVE_ALL_MSG" === a.action && (h.fire("MSG_RECEIVED", a.result), 16908304 == a.result.data.cmdid ? h.fire("CHAT.MSG_RECEIVED", a.result) : 16908545 == a.result.data.cmdid && h.fire("TRIBE.MSG_RECEIVED", a.result)))
    }
    function f(a, b) {
        var c = document.createElement("form"),
		d = "";
        for (var e in b)
            d += '<input type="hidden" name="' + e + '" value="' + b[e] + '" />';
        c.action = a,
		c.target = "WSDK_FRAME",
		c.method = "post",
		c.innerHTML = d,
		c.style.display = "none",
		document.body.appendChild(c),
		c.submit()
    }
    var g = window.WSDKUtil,
	h = g.Event,
	i = window.WSDKCons.CODE,
	j = "__WSDK__",
	k = 6e5,
	l = 8e3,
	m = "PROXY_PAGE",
	n = "https://chat.etao.com/login/oauth",
	o = "https://chat.etao.com/proxy.htm",
	p = "http://tcms-openim.wangxin.taobao.com/getprefix";
    b.prototype = {
        constructor: b,
        init: function (a, b) {
            b && b.debug && "daily" === b.env && (n = "http://chat.daily.etao.net:7001/login/oauth", o = "http://chat.daily.etao.net:7001/proxy.htm"),
			this.context = a,
			this.__events()
        },
        __events: function () {
            var a = this;
            h.on("SET_LOGIN_INFO", function (b) {
                if (a.frameObj.__ProxyFrameLoadTimeOut) {
                    clearTimeout(a.frameObj.__ProxyFrameLoadTimeOut),
					a.__IsLogin = !0,
					a.LoginInfo.prefix = b.data.prefix,
					a.LoginInfo.toPrefix = b.data.toPrefix,
					a.context.LoginInfo = a.LoginInfo,
					h.fire("LOGIN", {
					    code: 1e3,
					    resultText: i[1e3]
					});
                    var c = {};
                    c[a.LoginInfo.uid] = {
                        lt: +new Date,
                        at: b.data.token,
                        pf: b.data.prefix,
                        tpf: b.data.toPrefix,
                        uid: a.LoginInfo.uid,
                        ak: a.LoginInfo.appkey,
                        tak: a.LoginInfo.toAppkey,
                        cdt: a.LoginInfo.credential
                    },
					store.set(j, c)
                }
            }),
			h.on("KICK_OFF", function () {
			    a.__IsLogin = !1
			})
        },
        login: function (a) {
            g.checkParam(a, ["uid", "appkey", "credential"]),
			this.context && this.context.__Messenger && this.context.__Messenger.clear();
            var b = this,
			d = a.uid,
			e = a.appkey,
			f = a.toAppkey || e,
			m = a.credential,
			p = void 0 === a.tokenFlag ? 64 : a.tokenFlag,
			q = a.timeout || l,
			r = a.error || function () { };
            if (g.log({
                uid: d,
                appkey: e,
                ver: WSDK.version,
                msgText: "log before login"
            }), a.error = function (a) {
				b.__IsLogin = !1,
				clearTimeout(b.frameObj.__ProxyFrameLoadTimeOut),
				r(a)
            }, g.callbackHandler("LOGIN", a), this.__IsLogin)
                return h.fire("LOGIN", {
                    code: 1008,
                    resultText: i[1008]
                }), void g.log({
                    uid: d,
                    appkey: e,
                    ver: WSDK.version,
                    errText: "block login by sdk because login already"
                });
            var s,
			t,
			u,
			v = +new Date,
			w = store.get(j),
			x = "";
            this.LoginInfo = {
                uid: d,
                appkey: e,
                toAppkey: f,
                credential: m
            },
			w && w[d] && (u = w[d], (!u.lt || u.lt + k < v) && (u = null)),
			u && u.ak == e && u.tak == f && u.uid == d && u.cdt == m && u.at && u.pf && u.tpf ? (t = o, s = {
			    prefix: u.pf,
			    toPrefix: u.tpf,
			    ver: WSDK.version,
			    accessToken: u.at,
			    timeout: q,
			    frameObj: b.frameObj
			}, x = "GET") : (store.remove(j), t = n, s = {
			    cross: !0,
			    tokenFlag: p,
			    uid: d,
			    credential: m,
			    appkey: e,
			    toAppkey: f,
			    ver: WSDK.version,
			    timeout: q,
			    frameObj: b.frameObj
			}, x = "POST");
            try {
                b.frameObj = c(t, s, b, x)
            } catch (y) {
                g.log({
                    uid: d,
                    appkey: e,
                    ver: WSDK.version,
                    errText: "login frame create error: " + JSON.stringify(y)
                })
            }
            return this
        },
        messengerSender: function (a, b) {
            b && !this.__IsLogin ? h.fire(a.action, {
                code: 1001,
                resultText: i[1001]
            }) : this.context.__Messenger.targets[m].send(JSON.stringify(a))
        },
        getUnreadMsgCount: function (a) {
            return g.callbackHandler("GET_UNREAD_MSG_COUNT", a),
			this.messengerSender({
			    action: "GET_UNREAD_MSG_COUNT",
			    result: {
			        count: a && a.count || 30
			    }
			}, !0),
			this
        },
        getRecentContact: function (a) {
            return g.callbackHandler("GET_RECENT_CONTACT", a),
			this.messengerSender({
			    action: "GET_RECENT_CONTACT",
			    result: {
			        count: a && a.count || 30
			    }
			}, !0),
			this
        },
        startListenAllMsg: function () {
            if (!this.__IsLogin)
                throw new Error("未登录");
            var a = this;
            return this.__IsStartListen || (this.__IsStartListen = !0, this.messengerSender({
                action: "START_RECEIVE_ALL_MSG"
            }, !0), h.one("STOP_RECEIVE_ALL_MSG", function () {
                a.__IsStartListen = !1
            })),
			this
        },
        stopListenAllMsg: function () {
            return this.__IsStartListen && (this.__IsStartListen = !1, this.messengerSender({
                action: "STOP_RECEIVE_ALL_MSG"
            })),
			this
        },
        getNick: function (a) {
            return a && a.length > 8 && (0 == a.indexOf(this.LoginInfo.prefix) || 0 == a.indexOf(this.LoginInfo.toPrefix)) ? a.substring(8) : a
        },
        getPrefixByAppkey: function (a) {
            return g.checkParam(a, ["appkey"]),
			g.jsonp(p + "?appkey=" + a.appkey, function (b) {
			    b.prefix ? a.success && a.success({
			        code: 1e3,
			        data: {
			            prefix: b.prefix
			        }
			    }) : a.error && a.error({
			        code: 1003,
			        resultText: b.errmsg
			    })
			}, function (b) {
			    a.error && a.error(b)
			}),
			this
        },
        destroy: function () {
            d(this.frameObj),
			this.stopListenAllMsg(),
			h.fire("$destroy")
        },
        __setLoginInfo: function () {
            this.__IsSendCheck = !0,
			this.messengerSender({
			    action: "SET_LOGIN_INFO",
			    result: {
			        uid: this.LoginInfo.uid,
			        appkey: this.LoginInfo.appkey,
			        toAppkey: this.LoginInfo.toAppkey
			    }
			})
        }
    },
	a.Base = b
}
(window.WSDKModules || (window.WSDKModules = {})), function (a) {
    function b(a) {
        this.init(a)
    }
    function c(a, b) {
        window.online && (d = window.online),
		window.online = [],
		e.getScript(h + "?" + e.param({
		    uids: a,
		    charset: b.charset || "utf-8",
		    beginnum: 0
		}), function () {
		    b.success && b.success({
		        code: 1e3,
		        resultText: g[1e3],
		        data: {
		            status: window.online
		        }
		    }),
			d && (window.online = d),
			d = null
		}, function () {
		    b.error && b.error({
		        code: 1005,
		        resultText: g[1005]
		    })
		})
    }
    var d,
	e = window.WSDKUtil,
	f = e.Event,
	g = window.WSDKCons.CODE,
	h = "https://amos.alicdn.com/mullidstatus.aw";
    b.prototype = {
        constructor: b,
        init: function (a) {
            this.Base = a.Base,
			this.messengerSender = a.Base.messengerSender,
			this.__events()
        },
        __events: function () {
            var a = this;
            f.on("$destroy", function () {
                a.stopListenMsg()
            })
        },
        sendMsg: function (a) {
            return e.checkParam(a, ["touid", "msg"]),
			e.callbackHandler("CHAT_SEND_MSG", a),
			this.messengerSender.call(this.Base, {
			    action: "CHAT_SEND_MSG",
			    result: {
			        touid: a.touid,
			        msg: a.msg,
			        msgType: a.msgType || 0,
			        hasPrefix: !!a.hasPrefix
			    }
			}, !0),
			this
        },
        sendCustomMsg: function (a) {
            return e.checkParam(a, ["touid", "msg"]),
			e.callbackHandler("CHAT_SEND_CUSTOM_MSG", a),
			this.messengerSender.call(this.Base, {
			    action: "CHAT_SEND_CUSTOM_MSG",
			    result: {
			        touid: a.touid,
			        msg: a.msg,
			        summary: a.summary,
			        hasPrefix: !!a.hasPrefix
			    }
			}, !0),
			this
        },
        sendMsgToCustomService: function (a) {
            return e.checkParam(a, ["touid", "msg"]),
			e.callbackHandler("CHAT_SEND_MSG_TO_CUSTOM_SERVICE", a),
			this.messengerSender.call(this.Base, {
			    action: "CHAT_SEND_MSG_TO_CUSTOM_SERVICE",
			    result: {
			        touid: a.touid,
			        msg: a.msg,
			        msgType: a.msgType,
			        nocache: a.nocache,
			        groupid: a.groupid,
			        hasPrefix: !!a.hasPrefix
			    }
			}, !0),
			this
        },
        sendCustomData: function (a) {
            return e.checkParam(a, ["touid", "customData"]),
			"object" == typeof a.customData && (a.customData = JSON.stringify(a.customData)),
			e.callbackHandler("CHAT_SEND_CUSTOM_DATA", a),
			this.messengerSender.call(this.Base, {
			    action: "CHAT_SEND_CUSTOM_DATA",
			    result: {
			        touid: a.touid,
			        msg: a.customData,
			        nocache: a.nocache,
			        groupid: a.groupid,
			        hasPrefix: !!a.hasPrefix,
			        sendMsgToCustomService: a.sendMsgToCustomService
			    }
			}, !0),
			this
        },
        getHistory: function (a) {
            return e.checkParam(a, ["touid"]),
			e.callbackHandler("GET_HISTORY_MSG", a),
			this.messengerSender.call(this.Base, {
			    action: "GET_HISTORY_MSG",
			    result: {
			        touid: a.touid,
			        count: a.count || 20,
			        nextkey: a.nextkey || "",
			        hasPrefix: !!a.hasPrefix,
			        type: 1
			    }
			}, !0),
			this
        },
        setReadState: function (a) {
            return e.checkParam(a, ["touid"]),
			e.callbackHandler("CHAT_SET_READ_STATE", a),
			this.messengerSender.call(this.Base, {
			    action: "CHAT_SET_READ_STATE",
			    result: {
			        touid: a.touid,
			        timestamp: a.timestamp || parseInt(+new Date / 1e3),
			        hasPrefix: !!a.hasPrefix
			    }
			}, !0),
			this
        },
        startListenMsg: function (a) {
            e.checkParam(a, ["touid"]);
            var b = this;
            return this.__IsStartRecv || (this.__IsStartRecv = !0, this.messengerSender.call(this.Base, {
                action: "CHAT_START_RECEIVE_MSG",
                result: {
                    touid: a.touid,
                    hasPrefix: !!a.hasPrefix
                }
            }, !0), f.one("CHAT_STOP_RECEIVE_MSG", function () {
                b.__IsStartRecv = !1
            })),
			this
        },
        stopListenMsg: function () {
            return this.__IsStartRecv && (this.__IsStartRecv = !1, this.messengerSender({
                action: "CHAT_STOP_RECEIVE_MSG"
            })),
			this
        },
        getRealChatId: function (a) {
            return e.checkParam(a, ["touid"]),
			e.callbackHandler("CHAT_GET_REAL_ID", a),
			this.messengerSender.call(this.Base, {
			    action: "CHAT_GET_REAL_ID",
			    result: {
			        touid: a.touid,
			        nocache: a.nocache,
			        groupid: a.groupid,
			        hasPrefix: !!a.hasPrefix
			    }
			}, !0),
			this
        },
        getUserStatus: function (a) {
            if (e.checkParam(a, ["uids"]), !e.isArray(a.uids))
                throw new Error("uids必须为数组");
            if (a.uids.length && a.uids.length > 30)
                throw new Error("一次最多传30个用户id");
            var b = "";
            return a.hasPrefix ? (b = a.uids.join(";"), c(b, a)) : this.Base.getPrefixByAppkey({
                appkey: a.appkey,
                success: function (d) {
                    var e = d.prefix,
					f = [];
                    a.uids.forEach(function (a) {
                        f.push(e + a)
                    }),
					b = f.join(";"),
					c(b, a)
                },
                error: function () {
                    a.error && a.error({
                        code: 1002,
                        resultText: g[1002]
                    })
                }
            }),
			this
        }
    },
	a.Chat = b
}
(window.WSDKModules || (window.WSDKModules = {})), function (a) {
    function b(a) {
        this.init(a)
    }
    var c = window.WSDKUtil;
    b.prototype = {
        constructor: b,
        init: function (a) {
            this.Base = a.Base,
			this.messengerSender = a.Base.messengerSender
        },
        sendMsg: function (a) {
            c.checkParam(a, ["tid", "msg"]),
			c.callbackHandler("TRIBE_SEND_MSG", a);
            var b = +new Date;
            return this.messengerSender.call(this.Base, {
                action: "TRIBE_SEND_MSG",
                result: {
                    tid: parseInt(a.tid),
                    msgTime: a.msgTime || parseInt(b / 1e3),
                    uuid: b,
                    msgType: a.msgType || 0,
                    msg: a.msg
                }
            }, !0),
			this
        },
        getHistory: function (a) {
            return c.checkParam(a, ["tid"]),
			c.callbackHandler("TRIBE_GET_HISTORY_MSG", a),
			this.messengerSender.call(this.Base, {
			    action: "TRIBE_GET_HISTORY_MSG",
			    result: {
			        tid: a.tid + "",
			        count: a.count || 20,
			        nextkey: a.nextkey || "",
			        type: 2
			    }
			}, !0),
			this
        },
        getTribeInfo: function (a) {
            return c.checkParam(a, ["tid"]),
			c.callbackHandler("TRIBE_GET_INTO", a),
			this.messengerSender.call(this.Base, {
			    action: "TRIBE_GET_INTO",
			    result: {
			        tid: parseInt(a.tid),
			        excludeFlag: a.excludeFlag || 0
			    }
			}, !0),
			this
        },
        getTribeList: function (a) {
            return c.callbackHandler("TRIBE_GET_LIST", a),
			this.messengerSender.call(this.Base, {
			    action: "TRIBE_GET_LIST",
			    result: {
			        tribeTypes: a.types || [0, 1, 2]
			    }
			}, !0),
			this
        },
        getTribeMembers: function (a) {
            return c.checkParam(a, ["tid"]),
			c.callbackHandler("TRIBE_GET_MEMBERS", a),
			this.messengerSender.call(this.Base, {
			    action: "TRIBE_GET_MEMBERS",
			    result: {
			        tid: parseInt(a.tid)
			    }
			}, !0),
			this
        },
        responseInviteIntoTribe: function (a) {
            return c.checkParam(a, ["tid", "validatecode", "manager", "recommender"]),
			c.callbackHandler("TRIBE_RESPONSE_INVITE", a),
			this.messengerSender.call(this.Base, {
			    action: "TRIBE_RESPONSE_INVITE",
			    result: {
			        tid: parseInt(a.tid),
			        recommender: a.recommender,
			        validatecode: a.validatecode,
			        manager: a.manager
			    }
			}, !0),
			this
        }
    },
	a.Tribe = b
}
(window.WSDKModules || (window.WSDKModules = {})), function (a) {
    function b(a) {
        this.init(a)
    }
    function c(a, b, c) {
        var d = document.createElement("form"),
		e = "";
        d.action = l,
		d.method = "post",
		d.enctype = "multipart/form-data",
		d.name = c,
		d.target = b,
		d.style.display = "none";
        for (var f in a)
            e += '<input type="hidden" name="' + f + '" value="' + a[f] + '" />';
        return d.innerHTML = e,
		document.body.appendChild(d),
		d
    }
    function d(a) {
        var b;
        try {
            b = document.createElement('<iframe name="' + a + '">')
        } catch (c) {
            b = document.createElement("iframe")
        }
        return b.name = a,
		b.style.display = "none",
		document.body.appendChild(b),
		b
    }
    var e = window.WSDKUtil,
	f = e.Event,
	g = "UPLOAD_PAGE",
	h = 5242880,
	i = 3e4,
	j = "WSDK_FORM",
	k = "WSDK_FRAME",
	l = "https://mobileim.etao.com/api/file/uploadFile.json",
	m = "https://chat.etao.com/uploadproxy.htm",
	n = {
	    wx_web_token: "",
	    user_id: "",
	    mimetype: "",
	    base64ed_file_data: "",
	    redirect_url: m,
	    type: 1,
	    msgType: 0,
	    receiver_id: "",
	    message_id: "",
	    width: "",
	    height: "",
	    mediaSize: ""
	},
	o = {
	    "-1": "PARAM ERROR",
	    "-2": "EMPTY FILE",
	    "-3": "NOT SUPPORT",
	    "-4": "SIZE LIMIT",
	    "-5": "CAN NOT LOAD IMAGE",
	    "-6": "TIME OUT",
	    "-7": "UPLOAD FAIL",
	    "-8": "GET TOKEN ERROR"
	};
    b.prototype = {
        constructor: b,
        __IsTokenFetching: !1,
        __Token: "",
        init: function (a) {
            this.Base = a.Base,
			this.messengerSender = a.Base.messengerSender,
			this.Messenger = a.__Messenger,
			this.__events()
        },
        upload: function (a) {
            e.checkParam(a, ["success"]);
            var b = a.error || function () { };
            (!a.maxSize || a.maxSize > h) && (a.maxSize = h),
			this.param = a,
			a.target ? this.upTarget(a) : a.base64Img && a.ext ? this.upBase64(a) : b({
			    code: -1,
			    errorText: o[-1]
			})
        },
        __events: function () {
            var a = this;
            f.on("GET_UPLOAD_TOKEN", function (b) {
                a.__IsTokenFetching = !1,
				1e3 === b.code ? (a.__Token = b.data.token, a.onGetUpTokenSuccess(), setTimeout(function () {
				    a.__Token = ""
				}, parseInt(b.data.expire) / 3 * 2 * 1e3)) : a.onGetUpTokenError()
            }),
			f.on("UPLOAD_IMAGE", function (b) {
			    a.timeout && clearTimeout(a.timeout),
				a.timoeut = null,
				1e3 == b.code ? a.uploadSuccess(b) : a.uploadError(b)
			})
        },
        getUpToken: function () {
            this.__IsTokenFetching || (this.__IsTokenFetching = !0, this.__Token ? this.onGetUpTokenSuccess() : this.messengerSender.call(this.Base, {
                action: "GET_UPLOAD_TOKEN"
            }, !0))
        },
        upTarget: function () {
            var a = this.param,
			b = a.target.files,
			c = a.target.value;
            if (!c)
                return a.error({
                    code: -2,
                    errorText: o[-3]
                });
            if (!this.isSupport() || !b || !b[0])
                return a.error({
                    code: -3,
                    errorText: o[-3]
                });
            var d = b[0],
			e = d.size,
			f = c.split("."),
			g = f[f.length - 1];
            if (e > a.maxSize)
                return a.error({
                    code: -4,
                    errorText: o[-4]
                });
            var h = this;
            this.getImageWH(d, function (a) {
                var b = h.getImageBase64(a, g);
                h.param.base64Img = b,
				h.param.ext = g,
				h.upBase64()
            }, function () {
                a.error({
                    code: -5,
                    errorText: o[-5]
                })
            })
        },
        upBase64: function () {
            var a = this.param.base64Img;
            return a = a.substring(a.indexOf(",") + 1),
			this.param.base64ImgForUpload = a,
			a.length > this.param.maxSize ? this.param.error({
			    code: -4,
			    errorText: o[-4]
			}) : void this.getUpToken()
        },
        getImageWH: function (a, b, c) {
            var d = this;
            try {
                var e = window.URL || window.webkitURL,
				f = e.createObjectURL(a),
				g = new Image;
                g.onload = function () {
                    b && b(this),
					g.onload = g.onerror = null
                },
				g.onerror = function () {
				    c && c(),
					g.onload = g.onerror = null
				},
				g.src = f
            } catch (h) {
                return d.param.error({
                    code: -3,
                    errorText: o[-3]
                })
            }
        },
        getType: function (a) {
            return a = a.toLowerCase(),
			"png" == a ? "image/png" : "image/jpeg"
        },
        getImageBase64: function (a, b) {
            var c = this,
			d = "";
            try {
                var e = document.createElement("canvas"),
				f = e.getContext("2d");
                e.width = a.width,
				e.height = a.height,
				f.drawImage(a, 0, 0, a.width, a.height),
				d = e.toDataURL(this.getType(b), 1)
            } catch (g) {
                c.param.error({
                    code: -3,
                    errorText: o[-3]
                })
            }
            return d
        },
        onGetUpTokenSuccess: function () {
            this.__IsTokenFetching = !1,
			n.wx_web_token = this.__Token,
			n.base64ed_file_data = this.param.base64ImgForUpload,
			n.mimetype = this.param.ext,
			n.user_id = this.Base.LoginInfo.prefix + this.Base.LoginInfo.uid;
            var a = this,
			b = +new Date;
            this.form = c(n, k + b, j + b),
			this.frame = d(k + b),
			this.timeout = setTimeout(function () {
			    a.param.error && a.param.error({
			        code: -3,
			        errorText: o[-3]
			    }),
                a.__Token = "",
                a.clear()
			}, this.param.timeout || i),
			this.Messenger.addTarget(this.frame.contentWindow, g),
			this.form.submit()
        },
        uploadSuccess: function (a) {
            this.param.success && this.param.success({
                code: 1e3,
                resultCode: "SUCCESS",
                data: {
                    url: a.data,
                    base64Img: this.param.base64Img
                }
            }),
			this.clear()
        },
        uploadError: function (a) {
            this.param.error && this.param.error({
                code: -7,
                errorText: o[-7] + " " + a.resultText
            }),
			this.__Token = "",
			this.clear()
        },
        clear: function () {
            this.form && this.form.parentNode.removeChild(this.form),
			this.frame && this.frame.parentNode.removeChild(this.frame),
			this.form = null,
			this.frame = null
        },
        onGetUpTokenError: function () {
            this.param.error && this.param.error({
                code: -8,
                errorText: o[-8]
            })
        },
        isSupport: function () {
            return !!document.createElement("canvas").getContext
        }
    },
	a.ImgUp = b
}
(window.WSDKPlugin || (window.WSDKPlugin = {})), function (a) {
    function b() {
        this.init()
    }
    function c(a) {
        return a = a.replace(/\[([A-Z\u4e00-\u9fa5]{1,20}?)\]/gi, "@#[$1]@#"),
		a.split("@#")
    }
    function d(a) {
        return /\[([A-Z\u4e00-\u9fa5]{1,20}?)\]/gi.test(a)
    }
    function e(a) {
        for (var b = a.replace("[", "").replace("]", ""), c = !1, d = 0, e = i.length; e > d; d++)
            if (i[d].title == b) {
                c = i[d].code;
                break
            }
        return c
    }
    function f(a, b, c) {
        var d = b * c,
		e = [],
		f = 0,
		g = 0;
        return a.forEach(function (a) {
            f == d && (f = 0),
			0 == f && (e[g++] = []),
			d > f && (f++, e[g - 1].push(a))
        }),
		e
    }
    var g = window.WSDKUtil,
	h = ["加油", "色情狂", "委屈", "悲泣", "飞机", "生病", "不会吧", "痛哭", "怀疑", "花痴", "偷笑", "握手", "玫瑰", "享受", "对不起", "感冒", "凄凉", "困了", "尴尬", "生气", "残花", "电话", "害羞", "流口水", "皱眉", "鼓掌", "迷惑", "忧伤", "时钟", "大笑", "邪恶", "单挑", "大哭", "隐形人", "CS", "I服了U", "欠扁", "炸弹", "惊声尖叫", "微笑", "钱", "购物", "好累", "嘘", "成交", "红唇", "招财猫", "抱抱", "好主意", "很晚了", "收邮件", "举杯庆祝", "疑问", "惊讶", "露齿笑", "天使", "呼叫", "闭嘴", "小样", "跳舞", "无奈", "查找", "大怒", "算帐", "爱慕", "再见", "恭喜发财", "强", "胜利", "财迷", "思考", "晕", "流汗", "爱心", "摇头", "背", "没钱了", "惊愕", "小二", "支付宝", "鄙视你", "吐舌头", "鬼脸", "财神", "等待", "傻笑", "学习雷锋", "心碎", "吐", "漂亮MM", "亲亲", "飞吻", "帅哥", "礼物", "无聊", "呆若木鸡", "再见", "老大", "安慰"],
	i = [{
	    title: "加油",
	    img: "10",
	    code: "/:012"
	}, {
	    title: "色情狂",
	    img: "26",
	    code: "/:015"
	}, {
	    title: "委屈",
	    img: "47",
	    code: "/:>_<"
	}, {
	    title: "悲泣",
	    img: "48",
	    code: "/:018"
	}, {
	    title: "飞机",
	    img: "97",
	    code: "/:plane"
	}, {
	    title: "生病",
	    img: "56",
	    code: "/:>M<"
	}, {
	    title: "不会吧",
	    img: "40",
	    code: "/:816"
	}, {
	    title: "痛哭",
	    img: "50",
	    code: "/:020"
	}, {
	    title: "怀疑",
	    img: "33",
	    code: "/:817"
	}, {
	    title: "花痴",
	    img: "14",
	    code: "/:814"
	}, {
	    title: "偷笑",
	    img: "3",
	    code: "/:815"
	}, {
	    title: "握手",
	    img: "82",
	    code: "/:)-("
	}, {
	    title: "玫瑰",
	    img: "84",
	    code: "/:-F"
	}, {
	    title: "享受",
	    img: "25",
	    code: "/:818"
	}, {
	    title: "对不起",
	    img: "52",
	    code: "/:819"
	}, {
	    title: "感冒",
	    img: "37",
	    code: "/:028"
	}, {
	    title: "凄凉",
	    img: "43",
	    code: "/:027"
	}, {
	    title: "困了",
	    img: "44",
	    code: "/:(Zz...)"
	}, {
	    title: "尴尬",
	    img: "38",
	    code: "/:026"
	}, {
	    title: "生气",
	    img: "65",
	    code: "/:>W<"
	}, {
	    title: "残花",
	    img: "85",
	    code: "/:-W"
	}, {
	    title: "电话",
	    img: "92",
	    code: "/:~B"
	}, {
	    title: "害羞",
	    img: "1",
	    code: "/:^$^"
	}, {
	    title: "流口水",
	    img: "24",
	    code: "/:813"
	}, {
	    title: "皱眉",
	    img: "54",
	    code: "/:812"
	}, {
	    title: "鼓掌",
	    img: "81",
	    code: "/:8*8"
	}, {
	    title: "迷惑",
	    img: "29",
	    code: "/:811"
	}, {
	    title: "忧伤",
	    img: "46",
	    code: "/:810"
	}, {
	    title: "时钟",
	    img: "94",
	    code: "/:clock"
	}, {
	    title: "大笑",
	    img: "5",
	    code: "/:^O^"
	}, {
	    title: "邪恶",
	    img: "71",
	    code: "/:036"
	}, {
	    title: "单挑",
	    img: "72",
	    code: "/:039"
	}, {
	    title: "大哭",
	    img: "49",
	    code: "/:>O<"
	}, {
	    title: "隐形人",
	    img: "74",
	    code: "/:046"
	}, {
	    title: "CS",
	    img: "73",
	    code: "/:045"
	}, {
	    title: "I服了U",
	    img: "51",
	    code: "/:044"
	}, {
	    title: "欠扁",
	    img: "62",
	    code: "/:043"
	}, {
	    title: "炸弹",
	    img: "75",
	    code: "/:048"
	}, {
	    title: "惊声尖叫",
	    img: "76",
	    code: "/:047"
	}, {
	    title: "微笑",
	    img: "0",
	    code: "/:^_^"
	}, {
	    title: "钱",
	    img: "88",
	    code: "/:$"
	}, {
	    title: "购物",
	    img: "89",
	    code: "/:%"
	}, {
	    title: "好累",
	    img: "55",
	    code: '/:"'
	}, {
	    title: "嘘",
	    img: "34",
	    code: "/:!"
	}, {
	    title: "成交",
	    img: "80",
	    code: "/:(OK)"
	}, {
	    title: "红唇",
	    img: "83",
	    code: "/:lip"
	}, {
	    title: "招财猫",
	    img: "79",
	    code: "/:052"
	}, {
	    title: "抱抱",
	    img: "9",
	    code: "/:H"
	}, {
	    title: "好主意",
	    img: "20",
	    code: "/:071"
	}, {
	    title: "很晚了",
	    img: "96",
	    code: "/:C"
	}, {
	    title: "收邮件",
	    img: "91",
	    code: "/:@"
	}, {
	    title: "举杯庆祝",
	    img: "93",
	    code: "/:U*U"
	}, {
	    title: "疑问",
	    img: "30",
	    code: "/:?"
	}, {
	    title: "惊讶",
	    img: "59",
	    code: "/:069"
	}, {
	    title: "露齿笑",
	    img: "15",
	    code: "/:^W^"
	}, {
	    title: "天使",
	    img: "22",
	    code: "/:065"
	}, {
	    title: "呼叫",
	    img: "17",
	    code: "/:066"
	}, {
	    title: "闭嘴",
	    img: "61",
	    code: "/:067"
	}, {
	    title: "小样",
	    img: "35",
	    code: "/:068"
	}, {
	    title: "跳舞",
	    img: "6",
	    code: "/:081"
	}, {
	    title: "无奈",
	    img: "41",
	    code: '/:\'""'
	}, {
	    title: "查找",
	    img: "16",
	    code: "/:080"
	}, {
	    title: "大怒",
	    img: "64",
	    code: "/:808"
	}, {
	    title: "算帐",
	    img: "18",
	    code: "/:807"
	}, {
	    title: "爱慕",
	    img: "4",
	    code: "/:809"
	}, {
	    title: "再见",
	    img: "23",
	    code: "/:804"
	}, {
	    title: "恭喜发财",
	    img: "68",
	    code: "/:803"
	}, {
	    title: "强",
	    img: "12",
	    code: "/:b"
	}, {
	    title: "胜利",
	    img: "11",
	    code: "/:806"
	}, {
	    title: "财迷",
	    img: "19",
	    code: "/:805"
	}, {
	    title: "思考",
	    img: "28",
	    code: "/:801"
	}, {
	    title: "晕",
	    img: "45",
	    code: "/:*&*"
	}, {
	    title: "流汗",
	    img: "42",
	    code: "/:802"
	}, {
	    title: "爱心",
	    img: "86",
	    code: "/:Y"
	}, {
	    title: "摇头",
	    img: "36",
	    code: "/:079"
	}, {
	    title: "背",
	    img: "58",
	    code: "/:076"
	}, {
	    title: "没钱了",
	    img: "31",
	    code: "/:077"
	}, {
	    title: "老大",
	    img: "70",
	    code: "/:O=O"
	}, {
	    title: "小二",
	    img: "69",
	    code: "/:074"
	}, {
	    title: "支付宝",
	    img: "98",
	    code: "/:075"
	}, {
	    title: "鄙视你",
	    img: "63",
	    code: "/:P"
	}, {
	    title: "吐舌头",
	    img: "2",
	    code: "/:Q"
	}, {
	    title: "鬼脸",
	    img: "21",
	    code: "/:072"
	}, {
	    title: "财神",
	    img: "66",
	    code: "/:073"
	}, {
	    title: "等待",
	    img: "95",
	    code: "/:R"
	}, {
	    title: "傻笑",
	    img: "39",
	    code: "/:007"
	}, {
	    title: "学习雷锋",
	    img: "67",
	    code: "/:008"
	}, {
	    title: "心碎",
	    img: "87",
	    code: "/:qp"
	}, {
	    title: "吐",
	    img: "57",
	    code: "/:>@<"
	}, {
	    title: "漂亮MM",
	    img: "77",
	    code: "/:girl"
	}, {
	    title: "亲亲",
	    img: "13",
	    code: "/:^x^"
	}, {
	    title: "飞吻",
	    img: "7",
	    code: "/:087"
	}, {
	    title: "帅哥",
	    img: "78",
	    code: "/:man"
	}, {
	    title: "礼物",
	    img: "90",
	    code: "/:(&)"
	}, {
	    title: "无聊",
	    img: "32",
	    code: "/:083"
	}, {
	    title: "呆若木鸡",
	    img: "27",
	    code: "/:084"
	}, {
	    title: "再见",
	    img: "53",
	    code: "/:085"
	}, {
	    title: "惊愕",
	    img: "60",
	    code: "/:O"
	}, {
	    title: "安慰",
	    img: "8",
	    code: "/:086"
	}
	],
	j = "https://g.alicdn.com/aliww/h5-openim/0.0.1/faces/",
	k = "https://gw.alicdn.com/tps/TB1.eFIKXXXXXbUXFXXXXXXXXXX-320-675.jpg",
	l = "https://img.alicdn.com/tps/TB1O2CKHVXXXXbMXVXXXXXXXXXX.jpg",
	m = {
	    trigger: !0,
	    emots: h,
	    emotsImg: k,
	    emotSize: 45,
	    row: 7,
	    col: 3,
	    customStyle: !1,
	    onEmotClick: function () { }

	};
    b.prototype = {
        constructor: b,
        emotTitles: h,
        emotW640: l,
        emotW320: k,
        init: function () { },
        render: function (a) {
            g.checkParam(a, ["container"]);
            var b = g.extend({}, m, a),
			c = "",
			d = "",
			e = 0,
			h = b.row * b.col,
			i = b.row * b.emotSize,
			j = b.emotSize * b.col,
			k = b.emotsImg == l ? 2 : 0,
			n = document.createElement("div"),
			o = f(b.emots, b.col, b.row);
            if (o.forEach(function (a, e) {
					emotWrapItemStyle = b.customStyle ? "" : 'style="display:' + (0 == e ? "block" : "none") + ";background:url(" + b.emotsImg + ") no-repeat 0 -" + e * (j - k) + "px;width:" + i + "px;height:" + j + "px;" + (k ? "background-size:100%;" : "") + '"',
					emotItemStyle = b.customStyle ? "" : 'style="display:block;float:left;cursor:pointer;width:' + b.emotSize + "px;height:" + b.emotSize + 'px;"',
					c += '<div class="wsdk-emot-wrap" ' + emotWrapItemStyle + ">",
					b.trigger && (d += '<i class="wsdk-emot-trigger-item' + (0 == e ? " wsdk-active" : "") + '" data-index="' + e + '"></i>'),
					a.forEach(function (a, b) {
						c += '<span title="' + a + '" data-index="' + (b + e * h) + '" ' + emotItemStyle + "></span>"
            }),
					c += "</div>"
            }), n.innerHTML = c, b.customStyle || (n.style.width = i + "px", n.style.height = j + "px", n.style.overflow = "hidden"), n.className = "wsdk-emot-con", b.container.appendChild(n), b.trigger) {
                var p = document.createElement("div");
                p.innerHTML = d,
				p.className = "wsdk-emot-trigger",
				b.container.appendChild(p);
                var q = p.getElementsByTagName("i")
            }
            var r = n.getElementsByTagName("div"),
			s = function (a) {
			    a = a || window.event;
			    var c = a.target || a.srcElement;
			    c && "SPAN" == c.tagName.toUpperCase() && b.onEmotClick("[" + c.title + "]")
			},
			t = function (a) {
			    a = a || window.event;
			    var b = a.target || a.srcElement;
			    if (b && "I" == b.tagName.toUpperCase()) {
			        var c = b.getAttribute("data-index");
			        if (c == e)
			            return;
			        r[e].style.display = "none",
					r[c].style.display = "block",
					q[e].className = "wsdk-emot-trigger-item",
					q[c].className = "wsdk-emot-trigger-item wsdk-active",
					e = c
			    }
			};
            window.addEventListener ? (n.addEventListener("click", s, !1), b.trigger && p.addEventListener("mouseover", t, !1)) : window.attachEvent && (n.attachEvent("onclick", s), b.trigger && p.attachEvent("onmouseover", t))
        },
        encode: function (a) {
            var b,
			f = "";
            return a = c(a),
			a.forEach(function (a) {
			    f += d(a) && (b = e(a)) ? b : a
			}),
			f
        },
        htmlEncode: function (a) {
            var b,
			f = "";
            return a = c(a),
			a.forEach(function (a) {
			    f += d(a) && (b = e(a)) ? b : g.htmlEncode(a)
			}),
			f
        },
        decode: function () {
            var a = "",
			b = i.length;
            return i.forEach(function (b) {
                a += "|" + b.code.substring(2)
            }),
			a = a.substring(1),
			a = a.replace(/([\^?()\.\*\$])/g, "\\$1"),
			a = new RegExp("/:(" + a + ")", "g"),
			function (c) {
			    return c && (c = c.replace(a, function (a) {
			        for (var c = !1, d = "", e = 0; b > e; e++)
			            if (i[e].code == a) {
			                c = i[e].img,
                            d = i[e].title;
			                break
			            }
			        if (c) {
			            var f = parseInt(c) + 1;
			            f = 10 > f ? "0" + f : f,
                        f = "s0" + f + ".png",
                        a = '<img class="wsdk-emot" src="' + j + f + '" alt="' + d + '" />'
			        }
			        return a
			    })),
				c
			}
        }
		(),
        isEmot: e,
        isEmotLike: d,
        splitByEmot: c
    },
	a.Emot = b
}
(window.WSDKPlugin || (window.WSDKPlugin = {})), function (a, b) {
    "use strict";
    "undefined" != typeof module && module.exports ? module.exports = b() : "function" == typeof define && (define.amd || define.cmd) ? define(b) : a.WSDK = b()
}
(this, function () {
    function a(b) {
        return this instanceof a ? this.init(b) : new a
    }
    var b = window.WSDKModules,
	c = window.WSDKUtil,
	d = window.WSDKPlugin,
	e = "WSDK",
	f = "CUSTOM_PAGE";
    return a.version = "1.0.6",
	a.prototype = {
	    constructor: a,
	    init: function (a) {
	        return this.__Messenger = new Messenger(f, e),
			this.Event = c.Event,
			this.Base = new b.Base(this, a),
			this.Chat = new b.Chat(this),
			this.Tribe = new b.Tribe(this),
			this.Plugin = {
			    Image: new d.ImgUp(this),
			    Emot: new d.Emot(this)
			},
			this
	    },
	    LoginInfo: {}

	},
	a
});