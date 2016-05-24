; (function ($, fns) {
    fns.Ajax = {
        Ajax: function (options) {
            var defaults = { url: "", returntype: "json", postdata: "", before: null, success: null, complete: null, fail: null, async: true, xhr: null }
            var opts = $.extend(defaults, options); var datatype = opts.returntype == "json" ? "text" : opts.returntype; if (opts.url != "") {
                $.ajax({
                    type: "Post", url: opts.url, dataType: datatype, cache: false, data: opts.postdata, async: opts.async, beforeSend: function (XMLHttpRequest) { if (opts.before != null) { opts.before(XMLHttpRequest); } }, success: function (rtn) {
                        var jobj; if (rtn != null) {
                            if (jobj == null) { jobj = rtn; }
                            if (opts.returntype.toLowerCase() == "json") { var bobj = eval("(" + jobj + ")"); if (bobj.ErrorCode == "") { if (typeof (bobj.Content.__isvalid__) != "undefined" && !bobj.Content.__isvalid__) { fns.Message.DialogToUrl(bobj.Content.__msg__, bobj.Content.__tonurl__, true); } else { if (opts.success != null) { opts.success(bobj.Content); } } } else { fns.ExceptionProcess.ShowErrorMsg(bobj.ErrorCode + "\n" + bobj.ErrorMessage); if (opts.fail) { opts.fail(bobj.ErrorCode, bobj.ErrorMessage); } } } else { if (opts.success != null) { opts.success(jobj); } }
                        }
                    }, complete: function (XMLHttpRequest, textStatus) { if (opts.complete != null) { opts.complete(XMLHttpRequest, textStatus); } }, error: function (jqXHR, errormsg, errorThrown) { if (opts.fail) { opts.fail(errormsg, errormsg); } }
                });
            } else { fns.ExceptionProcess.ShowErrorMsg("需要提供url信息！"); }
        }, AjaxForm: function (options) {
            var defaults = { url: "", formid: "", returntype: "html", befersend: null, success: null, complete: null, fail: null }
            var opts = $.extend(defaults, options); if (opts.formid == "") { fns.ExceptionProcess.ShowErrorMsg("需要提供formid信息！"); return false; }
            if (opts.url == "") { fns.ExceptionProcess.ShowErrorMsg("需要提供url信息！"); return false; }
            var __f = $("#" + opts.formid); __f.unbind(); var dt = opts.returntype == "" ? "html" : opts.returntype; dt = dt == "json" ? "text" : dt; var __op = {
                url: opts.url, type: "post", cache: false, datatype: dt, beforeSubmit: function (dataarray, obj) { if (opts.befersend != null) { opts.befersend(dataarray, obj); } }, success: function (rtn) {
                    if (opts.returntype.toLowerCase() == "json") {
                        if (rtn != null) {
                            var jobj = eval("(" + rtn + ")"); if (jobj == null) { jobj = rtn; }
                            if (jobj.ErrorCode == "") { if (!jobj.Content.__isvalid__) { fns.Message.DialogToUrl(bobj.Content.__msg__, bobj.Content.__tonurl__, true); } else { if (opts.success != null) { opts.success(jobj.Content); } } } else { fns.ExceptionProcess.ShowErrorMsg(jobj.ErrorCode + "\n" + jobj.ErrorMessage); if (opts.fail) { opts.fail(jobj.ErrorCode, jobj.ErrorMessage); } }
                        }
                    } else { if (opts.success != null) { opts.success(rtn); } }
                }, complete: function (XMLHttpRequest, textStatus) { if (opts.complete != null) { opts.complete(XMLHttpRequest, textStatus); } }, error: function (jqXHR, errormsg, errorThrown) { if (opts.fail) { opts.fail(errormsg, errormsg); } }
            }; __f.submit(function () { $(this).ajaxSubmit(__op); return false; }); __f.submit();
        }
    }
}(jQuery, FrameNameSpace))