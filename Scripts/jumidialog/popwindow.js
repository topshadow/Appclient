; (function ($) {
    //封装函数
    var popwindow = (function () {
        popwindow.prototype.divbox = null;
        function popwindow() {
            var self = this;

            if (self.divbox == null) {
                self.divbox = $('<div class="popwin-bg-container" id="__pop_win_"></div>');
                $("body").append(self.divbox);
            }
        }
        //点击显示
        popwindow.prototype.popdiv = function (options) {
            var self = this;
            var defaults = {
                target:null,//目标对象
            }
            var opts = $.extend(defaults, options);
            var div = $('<div class="popwin-register-container"></div>');
            if (opts.target) {
                div.append(opts.target);
                self.divbox.empty();
                self.divbox.append(div);
            }

            $('#__pop_win_').addClass('popwin-pop-up')
        }
        popwindow.prototype.popiframe = function (options) {
            var self = this;
            var defaults = {
                src:""//iframe的src
            }
            var opts = $.extend(defaults, options);
            var iframe = $('<iframe class="popwin-register-container" src="' + opts.src + '"></iframe>');
            if (opts.src != "") {
                self.divbox.empty();
                self.divbox.append(iframe);
            }

            $('#__pop_win_').addClass('popwin-pop-up')
        }
        //点击消失
        popwindow.prototype.close = function () {
            $('#__pop_win_').removeClass('popwin-pop-up');
        }
        popwindow.prototype.closeiframe = function () {
            $(window.parent.document).find("#__pop_win_").removeClass('popwin-pop-up');
        }

        return popwindow;
    })();


    //封装
    _popwindows_obj = {
        init: function () {
            var wo = new popwindow();
            $(this).data("popwindowsobj", wo);
            return this;
        },
        PopDiv: function (options) {
            $(this).data("popwindowsobj").popdiv(options);
        },
        PopIframe: function (options) {
            $(this).data("popwindowsobj").popiframe(options);
        },
        CloseDiv: function () {
            $(this).data("popwindowsobj").close();
        },
        CloseIframe: function () {
            $(this).data("popwindowsobj").closeiframe();
        }
    }

    $.popwindow = _popwindows_obj.init();
})(jQuery)
