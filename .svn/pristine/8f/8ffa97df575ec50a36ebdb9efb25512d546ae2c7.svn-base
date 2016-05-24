var myApp = new Framework7({ animatePages: false, swipeBackPage: false });
var $$ = Dom7;
var mainView = myApp.addView(".view-main", {});
//* Load 术后随访计划
mainView.params.doctorsno = GetQueryString("drsno");


/***======================页面跳转=start=========================***/

var ToPage = GetQueryString("page");
var Sno = GetQueryString("sno");

function GoToMore() {
    if (Sno) {
        window.location = "MyPatient.html?loadpagename=PatientInfo.html&doctorsno=" + mainView.params.doctorsno + "&sno=" + Sno + "&pageback=PatientIndex";
    }
    else
    {
        window.location = "more.html?drsno=" + mainView.params.doctorsno;         
    }    
}

function GoToHome()
{
    mainView.loadPage({ url: "VisitPlanIndex.html?doctorsno=" + mainView.params.doctorsno, animatePages: false });
}

//mainView.loadPage({ url: "VisitPlanIndex.html", animatePages: false });

if (Sno != "") {
    if (ToPage == "VisitTemplateSchedule") {
        mainView.loadPage({ url: "VisitTemplateSchedule.html?doctorsno=" + mainView.params.doctorsno + "&sno=" + Sno, animatePages: false });
    }
    else {
        mainView.loadPage({ url: "VisitPlanIndex.html?doctorsno=" + mainView.params.doctorsno + "&sno=" + Sno, animatePages: false });
    }

}
else {
    mainView.loadPage({ url: "VisitPlanIndex.html", animatePages: false });
}

/***======================页面跳转=end===========================***/


myApp.onPageInit('VisitPlanIndex', function (page) {
    var sno = page.query.sno;
    myApp.hidePreloader();
    GetVisitPlans()
    //获取随访计划
    function GetVisitPlans() {
        $.Frame.Ajax.Ajax({
            url: $.Frame.Config.Constant.ServerUrl + "visitplan.ngetdoctorvisitplans.go",
            postdata: {
                doctorsno: mainView.params.doctorsno,
            },
            success: function (rtn) {
                myApp.hidePreloader();
                if (rtn.issuccess) {
                    var VisitPlans = rtn.datalist;
                    if (VisitPlans.length > 0) {
                        for (var item in VisitPlans) {
                            VisitPlans[item].sno = sno;
                        }
                        $(".VisitImg").hide();
                        $(".VisitIndexList").show();
                        $("#VisitIndexList").empty();
                        $("#VisitIndexListTmpl").tmpl(VisitPlans).appendTo("#VisitIndexList");
                    }
                    else {
                        $(".VisitIndexList").hide();
                        $(".VisitImg").show();
                    }
                }
            },
            before: function () {
                myApp.showPreloader();
            }

        })
    }
});

/***============================Picker日期控件初始化=start=====================***/

var VisitDate = {
    SelDay: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    SelWeek: [1, 2, 3, 4],
    SelMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
};

//随访周期控件
var pickerVisitDate = myApp.picker({
    rotateEffect: true,
    formatValue: function (picker, values, displayValues) {
        return values[1] + displayValues[0];
    }, onClose: function (picker) {
        picker.close();
        picker.destroy();
    },
    cols: [
        {
            textAlign: 'left',
            values: ['SelDay', 'SelWeek', 'SelMonth'],
            displayValues: ['天', '周', '月'],
            onChange: function (picker, country, displayValues) {
                if (picker.cols[1].replaceValues) {
                    picker.cols[1].replaceValues(VisitDate[country]);
                }
            }
        },
        {
            values: VisitDate.SelDay,
            width: 100,
        },
    ]
});

//随访周期控件-编辑
var pickerVisitDateEdit = myApp.picker({
    rotateEffect: true,
    formatValue: function (picker, values, displayValues) {
        return values[1];
    }, onClose: function (picker) {
        picker.close();
        picker.destroy();
    },
    cols: [
        {
            textAlign: 'left',
            values: (function () {
                var arr = [];
                for (var i = 0; i <= 23; i++) { arr.push(i); }
                return arr;
            })(),
        }
    ]
});

//提醒时间
var pickerVisitTime = myApp.picker({
    rotateEffect: true,
    formatValue: function (picker, values, displayValues) {
        return values[0] + ":" + values[1];
    },
    onClose: function (picker) {
        picker.close();
        picker.destroy();
    },
    cols: [
        {
            textAlign: 'left',
            values: (function () {
                var arr = [];
                for (var i = 0; i <= 23; i++) { arr.push(i); }
                return arr;
            })(),
        },
        {
            values: (function () {
                var arr = [];
                for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                return arr;
            })(),
            width: 160,
        },
    ]
});


/***============================Picker日期控件初始化=end=======================***/



/***===========================新增随访计划=start=========================***/
myApp.onPageInit('AddVisitTemplate', function (page) {
    //新增按钮插入子项
    $("#addvisitrecord").click(function () {
        var AddItem = $(".MoreTempItem").clone()[0];
        $(AddItem).addClass("intro")[0]
        $(AddItem).show();
        var ItemNum = $(".MoreTempItem").length + 1;
        $(AddItem).find(".list-block-title label").html("随访事项" + ItemNum);
        $(".AddTempList").append(AddItem);
        myApp.showPreloader('增加一项');
        $$('.modal-preloader').addClass('follow-modal');
        setTimeout(function () {
            myApp.hidePreloader();
        }, 500);
    })
    //点击保存
    $("#SaveVisitPlan").click(function () {
        myApp.confirm('确认保存信息吗?', '提示',
             function () {
                 //点击确定
                 var CanSave = true;
                 if ($("#AddTempName").val() == "") {
                     myApp.alert("请输入随访模板名称");
                     CanSave = false;
                     return false;
                 }

                 $(".AddTempItem .AddTmpl").each(function () {
                     if ($(this).val() == "") {
                         myApp.alert("请输入必填项");
                         CanSave = false;
                         return false;
                     }
                 });

                 var AddLength = $(".MoreTempItem")

                 if (AddLength.length > 1) {
                     $(".intro .AddTmpl").each(function () {


                         if ($(this).val() == "") {
                             myApp.alert("请输入必填项");
                             CanSave = false;
                             return false;
                         }
                     });
                 }
                 if (CanSave) {
                     $($(".MoreTempItem")[0]).remove()
                     var jsonstrings = PageToJson();
                     CreateTemplateWithMultiRecords(jsonstrings)
                 }

             },
             function () { });



    });
});
//编辑并保存模板和记录
function CreateTemplateWithMultiRecords(objstr) {
    $.Frame.Ajax.Ajax({
        url: $.Frame.Config.Constant.ServerUrl + "visitplan.ncreatetemplatewithmultirecords.go",
        postdata: {
            doctorsno: mainView.params.doctorsno,
            jsonstrings: $.base64({
                data: JSON.stringify(objstr)
            })
        },
        success: function (rtn) {
            if (rtn.issuccess) {
                myApp.alert("保存成功！", "提示", function ()
                {
                    mainView.loadPage({ url: "VisitPlanIndex.html", animatePages: false });
                });                
            }
            else {
                myApp.alert("保存失败！");
            }
        }
    })
}

//点击删除子项
function DelTempItem(obj) {
    myApp.confirm('确认删除该项?', '提示',
        function () {
            $(obj).parent().parent(".MoreTempItem").remove();
            myApp.showPreloader('删除一项');
            $$('.modal-preloader').addClass('follow-modal');
            setTimeout(function () {
                myApp.hidePreloader();
            }, 500);
        },
        function () { });
}

//Picker的随访周期选择
function ShowPickerDate(obj) {
    var input = $(obj);
    var selvalue;
    pickerVisitDate.input = input;
    pickerVisitDate.params.onChange = function (picker, values, displayValues) {
        $(obj).val(displayValues[0]);
        $(obj).attr("data-tintervaldate", values[1]);
        switch (displayValues[0]) {
            case "天":
                selvalue = 1;
                break;
            case "周":
                selvalue = 2;
                break;
            case "月":
                selvalue = 3;
                break;
        }
        $(obj).attr("data-ttype", selvalue);
    },
    pickerVisitDate.params.onClose = function (picker) {
        //新增项选择周期提示和第一个保持一致
        if ($(obj).hasClass("FirstAdd")) {
        }
        else {
            var selvalue;
            var FirstSel = $(".FirstAdd").attr("data-ttype");
            switch (picker.displayValue[0]) {
                case "天":
                    selvalue = "1";
                    break;
                case "周":
                    selvalue = "2";
                    break;
                case "月":
                    selvalue = "3";
                    break;
            }

            if (selvalue != FirstSel) {
                myApp.alert("请和事项1的天、周、月保持一致");
                picker.input[0].value = "";
                return false;
            }
        }
        picker.destroy();
    }
    pickerVisitDate.params.onOpen = function (picker) {
        var selvalue;
        switch (picker.displayValue[0]) {
            case "天":
                selvalue = 1;
                break;
            case "周":
                selvalue = 2;
                break;
            case "月":
                selvalue = 3;
                break;
        }
        $(obj).attr("data-ttype", selvalue);

    }
    pickerVisitDate.open();
}
//Picker的提醒时间选择
function ShowPickerTime(obj) {
    var input = $(obj);
    pickerVisitTime.input = input;
    pickerVisitTime.params.onChange = function (picker, values, displayValues) {
        $(obj).val(values[0] + ":" + values[1]);
    },
    pickerVisitTime.open();
}
//验证随访事项
function ValidateTtitle(obj) {
    var input = $(obj);
    if (input.val().length > 12) {
        myApp.alert("输入内容超长请修改");
        input.val("");
    }
}
//验证消息内容
function ValidateContent(obj) {
    var input = $(obj);
    if (input.val().length > 42) {
        myApp.alert("输入内容超长请修改");
    }
}
//验证模板姓名
function ValidateTemplateName(obj) {
    var input = $(obj);
    if (input.val().length > 15) {
        myApp.alert("输入内容超长请修改");
        return false;
    }
    if (input.val() != "") {
        $("#templateidtxt").val(input.val());
    }

}

function PageToJson() {
    HeadJosn = "{myobj:["
    $(".AddTmpl").each(function () {
        if ($(this)[0].localName == 'input') {
            value = $(this).val();
            vTitle = $(this).attr("name");

            if ($(this).attr("mode") == "start") {
                value1 = $(this).attr("data-tintervaldate")
                value2 = $(this).attr("data-ttype")
                vTitle1 = "tintervaldate";
                vTitle2 = "ttype";
                HeadJosn = HeadJosn + "{" + vTitle1 + ":" + "'" + value1 + "'," + vTitle2 + ":" + "'" + value2 + "',";
            }
            else {
                if ($(this).attr("mode") == "end") {
                    HeadJosn = HeadJosn + vTitle + ":" + "'" + value + "'},";
                } else {
                    HeadJosn = HeadJosn + vTitle + ":" + "'" + value + "',";
                }


            }

        }
    })

    HeadJosn = HeadJosn.substring(0, HeadJosn.length - 1)
    HeadJosn = HeadJosn + "]}";
    HeadJosn = new Function('return' + HeadJosn)()
    //return HeadJosn[0];
    return HeadJosn;
}

/***===========================新增随访计划=end=========================***/


/***===========================编辑随访计划=start=======================***/
myApp.onPageInit('EditVisitTemplate', function (page) {
    var templateid = page.query.templateid;
    myApp.hidePreloader();
    $.Frame.Ajax.Ajax({
        url: $.Frame.Config.Constant.ServerUrl + "visitplan.ngettemplatedetailinfo.go",
        postdata: {
            doctorsno: mainView.params.doctorsno,
            TemplateId: templateid
        },
        success: function (rtn) {
            if (rtn.issuccess) {
                myApp.hidePreloader();
                var VisitPlanInfo = rtn.datalist;
                if (VisitPlanInfo.length > 0 && VisitPlanInfo.length == 1) {
                    var EditArr = new Object();
                    EditArr.createdt = "";
                    EditArr.sno = "";
                    EditArr.tcontent = "";
                    EditArr.templateid = "";
                    EditArr.tinterval = "";
                    EditArr.ttime = "";
                    EditArr.ttitle = VisitPlanInfo[0].ttitle;
                    EditArr.type = VisitPlanInfo[0].type;
                    VisitPlanInfo.push(EditArr);
                    for (var item in VisitPlanInfo) {
                        VisitPlanInfo[item].no = item
                        switch (VisitPlanInfo[item].type) {
                            case 1:
                                VisitPlanInfo[item].BeforeTime = "距离" + VisitPlanInfo[item].tinterval + "天";
                                break;
                            case 2:
                                VisitPlanInfo[item].BeforeTime = "距离" + VisitPlanInfo[item].tinterval + "周";
                                break;
                            default:
                                VisitPlanInfo[item].BeforeTime = "距离" + VisitPlanInfo[item].tinterval + "月";
                                break;
                        }
                        VisitPlanInfo[item].tcontent = "提醒消息:" + VisitPlanInfo[item].tcontent
                    }
                    $("#Time-line-TitleText").val(VisitPlanInfo[0].templatename);
                    //填入随访模板记录
                    $("#EditVisitList").empty();
                    $("#EditVisitTmpl").tmpl(VisitPlanInfo).appendTo("#EditVisitList");
                    if ($(".Time-line-Edit").length = 1) {
                        $(".Time-line-Edit").hide();
                    }
                }
                else {
                    for (var item in VisitPlanInfo) {
                        VisitPlanInfo[item].no = item
                        switch (VisitPlanInfo[item].type) {
                            case 1:
                                VisitPlanInfo[item].BeforeTime = "距离" + VisitPlanInfo[item].tinterval + "天";
                                break;
                            case 2:
                                VisitPlanInfo[item].BeforeTime = "距离" + VisitPlanInfo[item].tinterval + "周";
                                break;
                            default:
                                VisitPlanInfo[item].BeforeTime = "距离" + VisitPlanInfo[item].tinterval + "月";
                                break;
                        }
                        VisitPlanInfo[item].tcontent = "提醒消息:" + VisitPlanInfo[item].tcontent
                    }
                    $("#Time-line-TitleText").val(VisitPlanInfo[0].templatename);
                    //填入随访模板记录
                    $("#EditVisitList").empty();
                    $("#EditVisitTmpl").tmpl(VisitPlanInfo).appendTo("#EditVisitList");
                }
            }
        },
        before: function () {
            myApp.showPreloader();
        }
    })

    $("#SaveEditTemplate").click(function () {
        myApp.confirm('确认保存信息吗?', '提示',
     function () {

         //点击确定
         var CanSave = true;
         if ($("#Time-line-TitleText").val() == "") {
             myApp.alert("请输入随访模板名称");
             CanSave = false;
             return false;
         }

         if ($($(".Time-line-Edit")[0]).is(':hidden')) {//移除编辑模板-确定拼json不出空数据
             $($(".Time-line-Edit")[0]).remove()
         }

         $(".EditTmpl").each(function () {
             if ($(this)[0].localName == "input" && $(this)[0].type !="hidden")
             {
                 if ($(this).val() == "") {
                     myApp.alert("请输入必填项");
                     CanSave = false;
                     return false;
                 }
             }
         });

         if (CanSave) {
             $("#templatenameEdit").val($("#Time-line-TitleText").val());

             var str = PageToJsonEdit();
             EditAndSaveTemplateRecords(str);
         }




     },
     function () { });
    });
});

//编辑数据-从容器
function PageToJsonEdit() {
    HeadJosn = "{myobj:["
    $(".EditTmpl").each(function () {
        if ($(this)[0].localName == 'input') {
            value = $(this).val();
            vTitle = $(this).attr("name");

            if ($(this).attr("mode") == "start") {
                value1 = $(this).attr("data-tintervaldate")
                value2 = $(this).attr("data-ttype")
                vTitle1 = "tinterval";
                vTitle2 = "ttype";
                HeadJosn = HeadJosn + "{" + vTitle1 + ":" + "'" + value1 + "'," + vTitle2 + ":" + "'" + value2 + "',";
            }
            else {
                HeadJosn = HeadJosn + vTitle + ":" + "'" + value + "',";
            }

        }

        if ($(this)[0].localName == 'textarea') {
            value = $(this).val().replace('提醒消息:', '');
            vTitle = $(this).attr("name");
            HeadJosn = HeadJosn + vTitle + ":" + "'" + value + "'},";
        }

        if ($(this)[0].localName == 'label') {
            value = $(this).text();
            vTitle = $(this).attr("name");
            HeadJosn = HeadJosn + vTitle + ":" + "'" + value + "',";
        }
    })

    HeadJosn = HeadJosn.substring(0, HeadJosn.length - 1)
    HeadJosn = HeadJosn + "]}";
    HeadJosn = new Function('return' + HeadJosn)()
    //return HeadJosn[0];
    return HeadJosn;
}

//Picker的随访周期选择-编辑
function EditPickerDate(obj, type) {
    var input = $(obj);
    var selvalue;
    pickerVisitDateEdit.input = input;
    var PickerValue;
    switch (type) {
        case "1":
            PickerValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
            break;
        case "2":
            PickerValue = [1, 2, 3, 4];
            break;
        case "3":
            PickerValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
    pickerVisitDateEdit.params.cols[0].values = PickerValue

    pickerVisitDateEdit.params.onChange = function (picker, values, displayValues) {
        var displaytxt;
        switch (type) {
            case "1":
                displaytxt = "天"
                break;
            case "2":
                displaytxt = "周"
                break;
            case "3":
                displaytxt = "月"
        }
        $(obj).val("距离" + displayValues[0] + displaytxt);
        $(obj).attr("data-tintervaldate", values[0]);
    }
    pickerVisitDateEdit.open();
}

//编辑并保存模板和记录
function EditAndSaveTemplateRecords(objstr) {
    $.Frame.Ajax.Ajax({
        url: $.Frame.Config.Constant.ServerUrl + "visitplan.neditandsavetemplaterecords.go",
        postdata: {
            doctorsno: mainView.params.doctorsno,
            jsonstrings: $.base64({
                data: JSON.stringify(objstr)
            })
        },
        success: function (rtn) {
            if (rtn.issuccess) {
                myApp.alert("保存成功！", "提示", function () {
                    mainView.loadPage({ url: "VisitPlanIndex.html", animatePages: false });
                });

            }
            else {

                myApp.alert("修改失败！");
            }
        }
    })
}

//编辑模板删除子项
function DelVisitPlan(obj) {
    myApp.confirm('确认删除该项?', '提示',
  function () {
      $(obj).parent().parent().remove();
  },
  function () { }
);
}

//编辑模板新增子项
function AddVisitPlan() {
    var AddItem = $(".Time-line-Edit").clone()[0];//克隆默认模板
    $(AddItem).find(".EditTmpl").each(function () {
        if ($(this)[0].localName == 'input') {
            $(this).val("");
        }
        if ($(this)[0].localName == 'textarea') {
            $(this).val("");
        }
    });
    
    $("#EditVisitList").append(AddItem);
    $(AddItem).show();
    if ($($(".Time-line-Edit")[0]).is(':hidden')) {//移除编辑模板-确定拼json不出空数据
        $($(".Time-line-Edit")[0]).remove()
    }
    myApp.showPreloader('增加一项');
    $$('.modal-preloader').addClass('follow-modal');
    setTimeout(function () {
        myApp.hidePreloader();
    }, 500);
}

/***===========================编辑随访计划=end=========================***/

/***===========================预约项目的随访模板=start=================***/
var productodertime;
var producttimeline;
var apm;
//预约项目的随访模板
myApp.onPageInit('VisitTemplateBase', function (page) {
    myApp.hidePreloader();
    productodertime = page.query.ordertime;
    producttimeline = page.query.timeline;
    apm = page.query.apm;
    $.Frame.Ajax.Ajax({
        url: $.Frame.Config.Constant.ServerUrl + "baike.loadbaike.go",
        postdata: {
        },
        async: true,
        success: function (rtn) {
            if (rtn.issuccess) {
                myApp.hidePreloader();
                $("#ProductList").empty();
                $("#datalist").tmpl(rtn.data).appendTo("#ProductList");

                $("#ProductList2").empty();
                $("#datalist2").tmpl(rtn.data).appendTo("#ProductList2");
            } else {
                myApp.alert(rtn.msg);
            }
        },
        before: function () {
            myApp.showPreloader();
        }
    })
})
//选择预约项目
function GetSno(itemno, itemname) {
    if (itemno != '06c0d552-5c34-42f2-a2fa-6e5a9a6e39e6') {
        myApp.alert("还未定义该模板");
        return false;
    }
    mainView.router.loadPage('CheckVisitTemplate.html?itemno=' + itemno + '&itemname=' + itemname);
}
/***===========================预约项目的随访模板=end===================***/

/***===========================查看随访模板=start=======================***/
var itemno
myApp.onPageInit('CheckVisitTemplate', function (page) {
    myApp.hidePreloader();
    itemno = page.query.itemno;
    var itemname = page.query.itemname
    $.Frame.Ajax.Ajax({
        url: $.Frame.Config.Constant.ServerUrl + "visitplan.ngetproductvisittemplate.go",
        postdata: {
            TemplateName: itemname,
            TemplateId: itemno
        },
        success: function (rtn) {
            if (rtn.issuccess) {
                var VisitPlanInfo = rtn.datalist;
                for (var item in VisitPlanInfo) {
                    VisitPlanInfo[item].no = item
                    switch (VisitPlanInfo[item].type) {
                        case 1:
                            VisitPlanInfo[item].BeforeTime = "距离" + VisitPlanInfo[item].tinterval + "天";
                            break;
                        case 2:
                            VisitPlanInfo[item].BeforeTime = "距离" + VisitPlanInfo[item].tinterval + "周";
                            break;
                        default:
                            VisitPlanInfo[item].BeforeTime = "距离" + VisitPlanInfo[item].tinterval + "月";
                            break;
                    }
                    VisitPlanInfo[item].tcontent = "提醒消息:" + VisitPlanInfo[item].tcontent
                }
                $("#Time-line-TitleLabel").val(itemname);
                //填入随访模板记录
                $("#CheckVisitList").empty();
                $("#CheckVisitTmpl").tmpl(VisitPlanInfo).appendTo("#CheckVisitList");
            }
        }
    })

    $("#AddToMyTemp").click(function () {
        $.Frame.Ajax.Ajax({
            url: $.Frame.Config.Constant.ServerUrl + "visitplan.nadddoctortemplatefromlibrary.go",
            postdata: {
                doctorsno: mainView.params.doctorsno,
                templateid: itemno
            },
            success: function (rtn) {
                if (rtn.issuccess) {
                    myApp.hidePreloader();
                    myApp.alert("添加成功", "提示", function () {
                        mainView.router.loadPage('VisitPlanIndex.html?doctorsno=' + mainView.params.doctorsno);
                    });
                    
                }
            },
            before: function () {
                myApp.showPreloader();
            }
        })
    });
})
/***===========================查看随访模板=end=========================***/

/***===========================添加术后随访模板=start===================***/
//保存消息
function SaveDoctorCustomerVisitPlanMessages(str) {
    $.Frame.Ajax.Ajax({
        url: $.Frame.Config.Constant.ServerUrl + "visitplan.nsavedoctorcustomervisitplanmessages.go",
        postdata: {
            doctorsno: mainView.params.doctorsno,
            jsonstrings: $.base64({
                data: JSON.stringify(str)
            })
        },
        success: function (rtn) {

            if (rtn.issuccess) {
                myApp.alert(rtn.msg, "提示", function () {
                    mainView.loadPage({ url: "VisitPlanIndex.html", animatePages: false });
                });
            }
            else {
                myApp.alert(rtn.msg);
            }

        }
    })
}

myApp.onPageInit('AddVisitToCustomer', function (page) {
    var sno = page.query.sno;
    var templateid = page.query.templateid;
    var DataList;
    $.Frame.Ajax.Ajax({
        url: $.Frame.Config.Constant.ServerUrl + "visitplan.ngetcustomeraddvisitplan.go",
        postdata: {
            customersno: sno,
            templateid: templateid,
            doctorsno: mainView.params.doctorsno
        },
        success: function (rtn) {
            if (rtn.issuccess) {
                //debugger;
                $("#VisitCustomerName").text(rtn.cusomertreatinfo[0].truename);
                // var newDate = DateAdd("d ", 2, rtn.cusomertreatinfo[0].lasttreattime);
                $("#VisitCustomerDateGMT").val(rtn.cusomertreatinfo[0].lasttreattime);
                $("#VisitCustomerDate").text(format(rtn.cusomertreatinfo[0].lasttreattime, 'yyyy-MM-dd HH:mm:ss'));

                DataList = rtn;

                var VisitPlanInfo = rtn.templatedetailinfo;

                for (var item in VisitPlanInfo) {
                    VisitPlanInfo[item].no = item
                    switch (VisitPlanInfo[item].type) {
                        case 1:
                            VisitPlanInfo[item].BeforeTime = "距离" + VisitPlanInfo[item].tinterval + "天";
                            break;
                        case 2:
                            VisitPlanInfo[item].BeforeTime = "距离" + VisitPlanInfo[item].tinterval + "周";
                            break;
                        default:
                            VisitPlanInfo[item].BeforeTime = "距离" + VisitPlanInfo[item].tinterval + "月";
                            break;
                    }
                    VisitPlanInfo[item].tcontent = "提醒消息:" + VisitPlanInfo[item].tcontent

                }
                $("#AddVisitTempName").val(VisitPlanInfo[0].templatename);
                //填入随访模板记录
                $("#AddVisitToCustomerList").empty();
                $("#AddVisitToCustomerTmpl").tmpl(VisitPlanInfo).appendTo("#AddVisitToCustomerList");
            }
        }
    })

    $("#IsSendMe").click(function () {

        if ($(this).attr("data-isinformdoc") == "0") {
            $(this).attr("data-isinformdoc", "1")
        }
        else {
            $(this).attr("data-isinformdoc", "0");
        }
    });

    //保存术后随访模板
    $("#SaveAddVisit").click(function () {
        myApp.confirm('确认保存信息吗?', '提示',
            function () {
                var str = PageToJsonEdit();

                var LastTreatTime = new Date($("#VisitCustomerDateGMT").val());
                var ArrList = str.myobj;
                for (var item in ArrList) {
                    var formatDate;
                    switch (ArrList[item].ttype) {
                        case "1":
                            formatDate = "d";
                            break;
                        case "2":
                            formatDate = "w";
                            break;
                        case "3":
                            formatDate = "m";
                            break;
                    }
                    var newDate = DateAdd(formatDate, parseInt(ArrList[item].tinterval), LastTreatTime)
                    ArrList[item].Sendtime = format(newDate, 'yyyy-MM-dd HH:mm:ss');//距离时间
                    ArrList[0].doctorsno = DataList.doctorinfo[0].doctorsno
                    ArrList[0].doctellphone = DataList.doctorinfo[0].logincellphone
                    ArrList[0].docname = DataList.doctorinfo[0].truename
                    ArrList[0].cussno = DataList.cusomertreatinfo[0].customersno
                    ArrList[0].lasttreattime = format(DataList.cusomertreatinfo[0].lasttreattime, "yyyy-MM-dd HH:mm:ss")
                    ArrList[0].custellphone = DataList.cusomertreatinfo[0].logincellphone
                    ArrList[0].orderno = DataList.cusomertreatinfo[0].orderno
                    ArrList[0].ordersno = DataList.cusomertreatinfo[0].ordersno
                    ArrList[0].productname = DataList.cusomertreatinfo[0].productname
                    ArrList[0].cusname = DataList.cusomertreatinfo[0].truename
                    ArrList[0].templatename = $("#AddVisitTempName").val();
                    ArrList[0].isinformdoc = $("#IsSendMe").attr("data-isinformdoc");
                }
                SaveDoctorCustomerVisitPlanMessages(str);

            },
            function () { });
    });
});



//时间转换
var format = function (time, format) {
    var t = new Date(time);
    var tf = function (i) { return (i < 10 ? '0' : '') + i };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}

function DateAdd(interval, number, date) {
    /*
    *   功能:实现js的DateAdd功能.
    *   参数:interval,字符串表达式，表示要添加的时间间隔.
    *   参数:number,数值表达式，表示要添加的时间间隔的个数.
    *   参数:date,时间对象.
    *   返回:新的时间对象.
    *   var   now   =   new   Date();
    *   var   newDate   =   DateAdd( "d ",5,now);
    *---------------   DateAdd(interval,number,date)   -----------------
    */
    switch (interval) {
        case "y":
            {
                date.setFullYear(date.getFullYear() + number);
                return date;
                break;
            }
        case "q":
            {
                date.setMonth(date.getMonth() + number * 3);
                return date;
                break;
            }
        case "m":
            {
                date.setMonth(date.getMonth() + number);
                return date;
                break;
            }
        case "w":
            {
                date.setDate(date.getDate() + number * 7);
                return date;
                break;
            }
        case "d":
            {
                date.setDate(date.getDate() + number);
                return date;
                break;
            }
        case "h":
            {
                date.setHours(date.getHours() + number);
                return date;
                break;
            }
            //case "m ":
            //    {
            //        date.setMinutes(date.getMinutes() + number);
            //        return date;
            //        break;
            //    }
        case "s":
            {
                date.setSeconds(date.getSeconds() + number);
                return date;
                break;
            }
        default:
            {
                date.setDate(d.getDate() + number);
                return date;
                break;
            }
    }
}

/***===========================添加术后随访模板=end=====================***/


/***===========================术后随访计划=start=======================***/
myApp.onPageInit('VisitTemplateSchedule', function (page) {

    var sno = page.query.sno;

    $.Frame.Ajax.Ajax({
        url: $.Frame.Config.Constant.ServerUrl + "visitplan.ngetdoctorcustomermessagerecords.go",
        postdata: {
            customersno: sno,
            doctorsno: mainView.params.doctorsno
        },
        success: function (rtn) {
            if (rtn.issuccess) {

                var sel;
                switch (rtn.templates[0].messtemplatetype) {
                    case 1:
                        sel = "天";
                        break;
                    case 2:
                        sel = "周";
                        break;
                    case 3:
                        sel = "月";
                        break;

                }
                for (i = 0; i < rtn.templates[0].items.length; i++) {
                    if (i == rtn.templates[0].items.length - 1) {
                        rtn.templates[0].items[i].itemno = "end";
                    }
                    else {
                        rtn.templates[0].items[i].itemno = "";
                    }

                    rtn.templates[0].items[i].messinterval = rtn.templates[0].items[i].messinterval + sel
                }

                $("#VisitTemplateScheduleList").empty();
                $("#VisitTemplateScheduleTmpl").tmpl(rtn.templates).appendTo("#VisitTemplateScheduleList");



                $("#VisitPlanToAdd").append('<div class=" Time-line-scheduleTreat"><img src="img/icon-treattime.png" /><label>治疗时间：' + rtn.templates[0].treatdate.format("yyyy-MM-dd HH:mm") + '</label></div>');
            }
        }
    })
});

/***===========================术后随访计划=end=========================***/







