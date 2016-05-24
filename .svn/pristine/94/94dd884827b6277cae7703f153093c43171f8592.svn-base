; (function ($) {
    $.Frame.Config.Message =
        {
            Dialog: function (options) {
                if (options) {
                    //$.popup.ShowMsg({
                    //    title: options.title ? options.title : "提示",
                    //    msg: options.msg,
                    //    buttons: options.buttons
                    //})
                    //Alert(options.msg, options.buttons);
                    var moption = {
                        title: options.title,
                        text: options.msg,
                        buttons:[]
                    }
                    if (options.buttons) {
                        for (var i = 0; i < options.buttons.length; i++) {
                            moption.buttons[i] = {
                                text: options.buttons[i].text,
                                click: options.buttons[i].onClick
                            }
                        }
                    }
                    
                    myApp.modal(moption);
                    
                }
            },
            ConfirmMsg: function (options) {
                if (options) {
                    //$.popup.ShowMsg({
                    //    title: "提示",
                    //    msg: options.msg,
                    //    buttons: [
                    //        {
                    //            text: options.ok.text,
                    //            click: options.ok.click
                    //        },
                    //        {
                    //            text: (options.cancel.text == "" ? "取消" : options.cancel.text),
                    //            click:options.cancel.click
                    //        }
                    //    ]
                    //})
                    //dialog(options.msg, "确认", options.buttons);
                    this.Dialog({
                        title: "提示",
                        msg: options.msg,
                        buttons: [
                            {
                                text: options.ok.text,
                                click: options.ok.click
                            },
                            {
                                text: (options.cancel.text == "" ? "取消" : options.cancel.text),
                                click:options.cancel.click
                            }
                        ]
                    })
                    
                }
            },
            ShowMsg: function (options) {
                //$.popup.ShowMsg({
                //    title: "提示",
                //    msg: options.msg,
                //    buttons: [
                //        {
                //            text: "确定",
                //            click: function () {
                //                $.popup.Close();
                //            }
                //        }
                //    ]
                //})
                //Alert(options.msg);
                myApp.alert(options.msg);
            },
            Close: function () {
                //$.popup.Close();
                myApp.closeModal();
            }
        }
}(jQuery));
