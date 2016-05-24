/*
对页面数据的进行绑定作业
successfunc(contentobj):contentobj返回的json對象，FrameJson中的Content內容；返回值為bool
failedfunc(errorCode, errorMsg):errorCode錯誤代碼，errorMsg錯誤信息
*/
; (function ($,fns) {
    fns.Bind = {
        Bind : function(options){
            var defaults = {
                tmpl: null,//模板对象
                mapattribute: "map",//获取对照栏位
                data: null,//数据集，json对象或array对象
                proccessOnBind:null//function(columnname,val)，在数据进行绑定的时候进行数据的特殊处理，返回的结果为经过处理后的数据
            }
            var opts = $.extend(defaults, options);
            if (opts.tmpl == null) {
                return null;
            }
            if (opts.data == null) {
                return $(opts.tmpl);
            }
            //如果为数组
            if (Object.prototype.toString.call(opts.data) === '[object Array]') {
                $.each(opts.data, function (i, val) {
                    $(opts.tmpl).find("[" + opts.mapattribute + "]").each(function (j, item) {
                        var columnname = $(item).attr(opts.mapattribute);
                        var itemvalue = opts.proccessOnBind == null ? val[columnname] : opts.proccessOnBind(columnname, val[columnname]);
                        if (val.hasOwnProperty(columnname)){
                            if ($(item).is("input")) {
                                $(item).val(itemvalue);
                            } else {
                                $(item).html(itemvalue);
                            }
                        }
                    })
                });
            } else {
                var val = opts.data;
                $(opts.tmpl).find("[" + opts.mapattribute + "]").each(function (j, item) {
                    var columnname = $(item).attr(opts.mapattribute);
                    var itemvalue = opts.proccessOnBind == null ? val[columnname] : opts.proccessOnBind(columnname, val[columnname]);
                    if (val.hasOwnProperty(columnname)) {
                        if ($(item).is("input")) {
                            $(item).val(itemvalue);
                        } else {
                            $(item).html(itemvalue);
                        }
                    }
                })
            }
        }
    }
}(jQuery,FrameNameSpace))

