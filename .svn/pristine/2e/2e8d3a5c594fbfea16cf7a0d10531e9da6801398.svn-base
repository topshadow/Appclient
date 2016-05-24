; (function ($) {
    $.Frame = function () { }
    $.Frame.Config = {}; FrameNameSpace = $.Frame; if (typeof js == "undefined") { document.write("<script language=javascript src='/Scripts/FrameJs/js.Util/js.lang.Class.min.js'></script>"); document.write("<script language=javascript src='/Scripts/FrameJs/js.Util/js.events.EventDispatcher.min.js'></script>"); document.write("<script language=javascript src='/Scripts/FrameJs/js.Util/js.util.ArrayList.min.js'></script>"); document.write("<script language=javascript src='/Scripts/FrameJs/js.Util/js.util.Dictionary.min.js'></script>"); }
    if (typeof $.fn.ajaxSubmit == "undefined") { document.write("<script language=javascript src='/Scripts/FrameJs/jquery.form.min.js'></script>"); }
    if (typeof FrameNameSpace.ExceptionProcess == "undefined") { document.write("<script language=javascript src='/Scripts/FrameJs/frame.exception.min.js'></script>"); }
    if (typeof FrameNameSpace.Control == "undefined") { document.write("<script language=javascript src='/Scripts/FrameJs/frame.control.min.js'></script>"); }
    if (typeof FrameNameSpace.Validation == "undefined") { document.write("<script language=javascript src='/Scripts/FrameJs/configs/validation.config.js'></script>"); document.write("<script language=javascript src='/Scripts/FrameJs/frame.validation.min.js'></script>"); }
    if (typeof FrameNameSpace.Ajax == "undefined") { document.write("<script language=javascript src='/Scripts/FrameJs/frame.ajax.js'></script>"); }
    if (typeof FrameNameSpace.Message == "undefined") { document.write("<script language=javascript src='/Scripts/FrameJs/configs/message.config.js'></script>"); document.write("<script language=javascript src='/Scripts/FrameJs/frame.message.js'></script>"); }
    if (typeof FrameNameSpace.Bind == "undefined") { document.write("<script language=javascript src='/Scripts/FrameJs/frame.bind.js'></script>"); }
    if (typeof $.popup == "undefined") { document.write("<script language=javascript src='/Scripts/jumidialog/popup.js'></script>"); document.write("<link type='text/css' rel='stylesheet' href='/Scripts/jumidialog/popup.css' />") }
    if (typeof $.fancybox == "undefined") { document.write("<script src='/Scripts/fancyapps-fancyBox/source/jquery.fancybox.pack.js?v=2.1.5'></script>"); document.write("<script src='/Scripts/fancyapps-fancyBox/lib/jquery.mousewheel-3.0.6.pack.js'></script>"); document.write("<link type='text/css' rel='stylesheet' href='/Scripts/fancyapps-fancyBox/source/jquery.fancybox.css?v=2.1.5' />") }
    if (typeof $.attrchange == "undefined") { document.write("<script language=javascript src='/Scripts/FrameJs/attrchange.min.js'></script>"); }
}(jQuery)); String.format = function () {
    if (arguments.length == 0)
        return null; var str = arguments[0]; for (var i = 1; i < arguments.length; i++) { var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm'); str = str.replace(re, arguments[i]); }
    return str;
}; String.prototype.replaceAll = function (s1, s2) { return this.replace(new RegExp(s1, "gm"), s2); }
function GetQueryString(name) { var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); var r = window.location.search.substr(1).match(reg); if (r != null) return unescape(r[2]); return ""; }
Date.prototype.format = function (fmt) {
    var o = { "M+": this.getMonth() + 1, "d+": this.getDate(), "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, "H+": this.getHours(), "m+": this.getMinutes(), "s+": this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), "S": this.getMilliseconds() }; var week = { "0": "/u65e5", "1": "/u4e00", "2": "/u4e8c", "3": "/u4e09", "4": "/u56db", "5": "/u4e94", "6": "/u516d" }; if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); }
    if (/(E+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]); }
    for (var k in o) { if (new RegExp("(" + k + ")").test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))); } }
    return fmt;
}
function fmoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2; s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1]; t = ""; for (i = 0; i < l.length; i++) { t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); }
    return t.split("").reverse().join("") + "." + r;
}