; (function ($) {
    //封装函数
    var popObj = (function () {
        popObj.prototype.divbox = null;
        function popObj() {
            var self = this;
            
            if (self.divbox == null) {
                //制作盒子
                var pluPopBox = $("<div id='plupopbox'></div>").attr('class', 'plu-pop-box');
                var pluBox = $("<div></div>").attr('class', 'plu-box');
                pluBox.appendTo(pluPopBox);
                //制作header
                var pluHeader = $("<div></div>").attr('class', 'plu-header');
                pluHeader.append('<em id="__plpopbox_title__"></em><textarea id="plu-textarea" readonly="readonly"></textarea>');
                pluHeader.appendTo(pluBox);
                //制作footer
                var pluBtnFooter = $("<ul id='__plpopbox_btns__'></ul>").attr('class', 'plu-btn-footer');
               
                pluBtnFooter.appendTo(pluBox);
                //将生成的HTML结构插入Body中
                //pluPopBox.appendTo($('body'));
                self.divbox = pluPopBox;
                //$(self).data("divbox", self.divbox);
            }
        }
        //点击显示
        popObj.prototype.show = function (options) {
            var self = this;
            var defaults = {
                title: "",//标题
                msg: "",//信息内容
                buttons: [
                    {
                        text: "",
                        click: function () { }
                    }
                ]
            }
            if ($("body").find("#plupopbox").size() <= 0) {
                $("body").append(self.divbox);
            }
            // 每次点击后检测滑动距离重新赋予高度
            var pluBoxTop = $(window).scrollTop() + $(window).height() * 0.5 - 64;
            $('.plu-box').css('top', pluBoxTop + 'px'); //设置top距离，以适应屏幕的滑动
            $('#plupopbox').css('height', $(document).height()); //设置高度为文档高度

            var opts = $.extend(defaults, options);
            $('#__plpopbox_title__').text(opts.title);
            $('#plu-textarea').text(opts.msg);
            $("#__plpopbox_btns__").empty();
            if (opts.buttons != null) {
                for (var i = 0; i < opts.buttons.length; i++) {
                    var btnobj = $('<li class="plu-pop-btn" index="' + i + '">' + opts.buttons[i].text + '</li>');
                    btnobj.click(function () {
                        if (opts.buttons[$(this).attr("index")].click != null) {
                            opts.buttons[$(this).attr("index")].click();
                        }
                    });
                    $("#__plpopbox_btns__").append(btnobj);
                }
                //根据btnNum的数字 动态分配每个元素的宽度
                $('.plu-btn-footer .plu-pop-btn').css('width', 96 / opts.buttons.length + '%');
            }
            
            $('#plupopbox').css('display', 'block');
        }
        //点击消失
        popObj.prototype.close = function () {
            $('#plupopbox').css('display', 'none');
        }

        return popObj;
    })();


    //封装
    _popup_obj = {
        init: function () {
            var wo = new popObj();
            $(this).data("popupobj", wo);
            return this;
        },
        ShowMsg: function (options) {
            $(this).data("popupobj").show(options);
        },
        Close: function () {
            $(this).data("popupobj").close();
        }
    }

    $.popup = _popup_obj.init();
})(jQuery)