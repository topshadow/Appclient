; (function ($) {
    WaitObj = (function () {
        WaitObj.prototype.divbox = null;
        function WaitObj() {
            var self = this;
            if (self.divbox == null) {
                var waitBody = $("<div></div>").attr('id', 'wait-body');
                var waitDiv = $("<div></div>").attr('id', 'wait-div');
                waitDiv.appendTo(waitBody)
                var waitIconRotate = $("<ul></ul>").attr('id', 'wait-icon-rotate');
                for (var i = 0; i < 10 ; i++) {
                    waitIconRotate.append('<li class="wait-list-item"></li>');
                };
                var waitComplete = $("<div></div>").attr('id', 'wait-complete');
                waitComplete.append('<i class="icon-checkmark"></i><p></p>');
                var waitFail = $("<div></div>").attr('id', 'wait-fail');
                waitDiv.append(waitIconRotate, waitComplete, waitFail);
                self.divbox = waitBody;
                //waitBody.appendTo($('body'));
            }
        }
        WaitObj.prototype.showWait = function () {
            var self = this;
            if ($("body").find("#wait-body").size() <= 0) {
                $("body").append(self.divbox);
            }

            var waitDivTop = $(window).scrollTop() + $(window).height() * 0.5 - 100;
            $('#wait-div').css('top', waitDivTop + 'px');//设置wait-div的top距离，以适应屏幕的滑动
            $('#wait-body').css('height', $(document).height());//设置wait-body的高度为文档高度
            $('#wait-body').show();//等待背景
            $('#wait-icon-rotate').show();//旋转图像展示
        }
        WaitObj.prototype.showMsg = function (options) {
            var doption = {
                msg: "",//消息内容
                issuccess: true,//是否为成功消息
                timeout: 1000 //消息显示后多长时间消失，单位号秒
            }
            var opts = $.extend(doption, options);

            var self = this;
            if ($("body").find("#wait-body").size() <= 0) {
                $("body").append(self.divbox);
            }
            if (opts.issuccess) {
                $('#wait-icon-rotate').hide();
                $('#wait-fail').hide();
                $('#wait-complete').find("p").text(opts.msg);
                $('#wait-complete').show();
            } else {
                $('#wait-icon-rotate').hide();
                $('#wait-complete').hide();
                $('#wait-fail').text(opts.msg);
                $('#wait-fail').show();
            }

            setTimeout(function () {
                $('#wait-body').hide();
                $('#wait-complete').hide();
                $('#wait-fail').hide();
            }, opts.timeout);//等待完成，无论成功失败
        }
        WaitObj.prototype.close = function () {
            $('#wait-body').hide();
            $('#wait-complete').hide();
            $('#wait-fail').hide();
        }

        return WaitObj;
    })();


    //封装
    _wait_obj = {
        init: function () {
            var wo = new WaitObj();
            $(this).data("waitobj", wo);
            return this;
        },
        ShowWait: function () {
            $(this).data("waitobj").showWait();
        },
        ShowMsg: function (options) {
            return $(this).data("waitobj").showMsg(options);
        },
        Close: function () {
            return $(this).data("waitobj").close();
        }
    }

    $.waitAnimation = _wait_obj.init();
})(jQuery)




// 触发样例

//$('div').waitAnimation({
//    clickElClass: "exchange-btn",
//    successWord: "success",
//    failWord: "fail",
//});

// 后台返回数据 1后

// $.fn.waitAnimation.judgeStatus(1)



