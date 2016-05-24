; (function ($, fns) {
    fns.Message = {}
    FrameMessage = (function () {
        function FrameMessage(options) {
            var defaults = { Dialog: null, ConfirmMsg: null, ShowMsg: null }
            this.opts = $.extend(defaults, options);
        }
        FrameMessage.prototype.ShowMsg = function (msg) {
            var self = this; var opts = { msg: "" }
            if (typeof msg === "string") { opts.msg = msg; } else { opts = $.extend(opts, msg); }
            self.opts.ShowMsg(opts);
        }
        FrameMessage.prototype.ShowConfirm = function (msg, okhandler) {
            var self = this; var opts = { msg: "", ok: { text: "", click: function () { if (okhandler != null) { okhandler(); } else { self.Close(); } } }, cancel: { text: "", click: function () { self.Close(); } } }
            self.opts.ConfirmMsg(opts);
        }
        FrameMessage.prototype.Dialog = function (reoptions) {
            var defaultoptions = { title: "", msg: "", buttons: null }
            var opts = $.extend(defaultoptions, reoptions); var self = this; return self.opts.Dialog(opts);
        }
        FrameMessage.prototype.Close = function () { var self = this; return self.opts.Close(); }
        return FrameMessage;
    })(); _frame_msg_methods = {
        init: function (options) {
            var op = options; if (options == null)
                op = fns.Config.Message; var message = new FrameMessage(op); $(this).data("message", message); return this;
        }, ShowMsg: function (msg) { $(this).data("message").ShowMsg(msg); }, ShowConfirm: function (msg) { return $(this).data("message").ConfirmMsg(msg); }, Dialog: function (reoptions) { $(this).data("message").Dialog(reoptions); }, DialogToUrl: function (msg, tourl, ispop) { var self = this; $(this).data("message").Dialog({ msg: msg, buttons: [{ text: "确定", click: function () { if (tourl != null && tourl != "") { self.Close(); if (ispop) { $.fancybox({ type: "iframe", href: tourl, padding: 5, closeBtn: true }); } else { if (parent) { parent.location.href = tourl; } else { location.href = tourl; } } } else { self.Close(); } } }] }); }, Close: function () { $(this).data("message").Close(); }
    }
    fns.Message = _frame_msg_methods.init();
}(jQuery, FrameNameSpace));