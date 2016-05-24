// Initialize your app
var myApp = new Framework7({ animatePages: false, swipeBackPage: false });
// Export selectors engine
var $$ = Dom7;
// Add view
var mainView = myApp.addView(".view-main", {});
//* Load 医生主页
var loadpagename = GetQueryString("loadpagename");
if (loadpagename == undefined || loadpagename.length <= 0)
    loadpagename = "PatientIndex.html";

mainView.loadPage({ url: loadpagename + window.location.search, animatePages: false });
//===================================================================定义全局参数
var doctorsno = GetQueryString("doctorsno");
//两个页面共用的搜索NewAddPatient和MyPatient传过去的
var searchtype; //按姓名或项目搜索
var searchcontent; //模糊搜索的内容
var type;//进入的类型
var pagegroupinfo; //患者数据分组信息
var pagesorteddate; //患者字母排序数据

//=====================================================各种指定的返回路径

$$(document).on('pageBack', function (e) {
    var page = e.detail.page;
    //患者主页回退记录back属性
    if (page.name === 'PatientInfo') {
        //回退到患者列表
        if (page.query.pageback == "PatientIndex") {
            window.location = "MyPatient.html?loadpagename=PatientIndex.html&doctorsno=" + doctorsno;
        }

        if (page.query.fp == "MyPatient") {
            window.location = "MyPatient.html?loadpagename=PatientIndex.html&doctorsno=" + doctorsno;
        }

    }

    //患者列表回退记录back属性
    if (page.name === 'PatientIndex') {
        //回退到患者列表
            window.location = "index.html";
    }

})


/***===我的患者上传-查看-诊疗记录-跳转====***/
function GoTreatRecord(obj)
{
    var uploaddoctorsno = obj.dataset.doctorsno
    var uploadordersno = obj.dataset.ordersno
    var uploadsno = obj.dataset.sno
    window.location = "treat-record.html?doctorsno=" + uploaddoctorsno + "&sno=" + uploadsno + "&ordersno=" + uploadordersno + "&fp=mypatient";
}



function ReturnIndex() {
    window.location = "index.html?doctorsno=" + doctorsno;
    //mainView.router.loadPage({ url: "index.html?doctorsno=" + doctorsno, animatePages: false });
}
function ReturnMyPatient() {
    window.location ="MyPatient.html?doctorsno=" + doctorsno
    //mainView.router.loadPage({ url: "MyPatient.html?doctorsno=" + doctorsno, animatePages: false });
}
function ReturnGroupManage() {

    if (ClickPlusOrDelte == 0) {
        mainView.router.loadPage({ url: "GroupManage.html", animatePages: false })
    }
    else
    {
        myApp.confirm('是否保存更改', '提示',
        function () { },
        function () {
            ClickPlusOrDelte = 0;
            mainView.router.loadPage({ url: "GroupManage.html", animatePages: false })
        });
       
    }

}
function ReturnAlphaSort() {
    mainView.router.loadPage({url:"AlphaSort.html",animatePages:false})
}
function ReturnNewAddPatient() {
    mainView.router.loadPage({ url: "NewAddPatient.html?type=enter",animatePages:false })
}
//得到患者
function GetPatientInfo(obj) {


    mainView.router.loadPage({ url: "PatientInfo.html?doctorsno=" + doctorsno + "&sno=" + obj.dataset.sno + "&mark=" + obj.dataset.mark, animatePages: false });
}

//患者中心添加-跳转到添加随访计划
function GotoVisitPlan()
{
    var sno = $(".collectstylediv").attr("sno");
    window.location = 'VisitPlan.html?drsno=' + doctorsno + "&sno=" + sno;
}

//患者中心添加－跳转到术后随访日程
function CheckVisitPlan()
{
    var sno = $(".collectstylediv").attr("sno");
    window.location = 'VisitPlan.html?drsno=' + doctorsno + "&sno=" + sno + "&page=VisitTemplateSchedule";
}


//从PatientInfo页面返回到其它的页面
function FromPatientInfoTo(obj) {
    var topage = $(obj).data("mark");
    if (topage == "patientindex") {
        ReturnPatientIndex();
    }
    if (topage == "alphasort") {
        ReturnAlphaSort();
    }
    if (topage == "newaddpatient") {
        ReturnNewAddPatient();
    }
}
//向收藏的患者中添加成员
function AddCollectPatient(sno) {
    //myApp.alert($(obj).data("sno"));
    $.Frame.Ajax.Ajax({
        url: $.Frame.Config.Constant.ServerUrl + "mypatient.savecollectpatient.go",
        postdata: {
            doctorsno: doctorsno,
            sno: sno
        },
        success: function (rtn) {
            if (rtn.issuccess) {
                $("#collectoruncollect").attr("src", "img/clickuncollect.png");
                $("#forcollect").text("已收藏");
                $("#collectoruncollect").unbind("click");
                // $("#collectoruncollect").click(CancelAddCollectPatient(sno));
                $("#collectoruncollect").click(function () {
                    CancelAddCollectPatient(sno)
                })
                myApp.alert("收藏患者成功");
            }
            else {
                myApp.alert("收藏患者失败");
            }
        }
    })
}

//取消收藏的患者
function CancelAddCollectPatient(sno) {
    $.Frame.Ajax.Ajax({
        url: $.Frame.Config.Constant.ServerUrl + "mypatient.unsavecollectpatient.go",
        postdata: {
            doctorsno: doctorsno,
            sno: sno
        },
        success: function (rtn) {
            if (rtn.issuccess) {
                $("#collectoruncollect").attr("src", "img/clickcollect.png");
                $("#forcollect").text("收藏");
                $("#collectoruncollect").unbind("click");
                $("#collectoruncollect").click(function () {
                    AddCollectPatient(sno)
                })
                myApp.alert("取消收藏成功");
            }
            else {
                myApp.alert("取消收藏失败");
            }
        }
    })
}
//联系人
function ContactPatient(obj) {
    var a= $(obj).data("contactpatient");
    location.href = 'tel:' + a;
}
//得到最新添加的成员
function GetNewAddPatients() {
    $.Frame.Ajax.Ajax({
        url: $.Frame.Config.Constant.ServerUrl + "mypatient.getcollectpatients.go",
        postdata: {
            doctorsno: doctorsno,
        },
        success: function (rtn) {
            if (rtn.issuccess) {
                $("#bindsearchoraddlist").empty();
                $("#searchoraddlist").tmpl(rtn.collectpatients).appendTo("#bindsearchoraddlist");
            }
            else {
                myApp.alert("无结果")
            }
        }
    })
}

//得到患者详细信息的页面
function GetPatientDetailInfo(sno) {
    $.Frame.Ajax.Ajax({
        url: $.Frame.Config.Constant.ServerUrl + "mypatient.getpatientdetailinfo.go",
        postdata: {
            doctorsno: doctorsno,
            sno: sno
        },
        success: function (rtn) {
            if (rtn.issuccess) {
                $("#binddiagnosisrecord li").empty();
                $("#bindtreatrecord li").empty();

                //治疗记录
                for (var item in rtn.diagnosisrecord)
                { rtn.diagnosisrecord[item].doctorsno = doctorsno; }


                $("#diagnosisrecord").tmpl(rtn.diagnosisrecord).appendTo("#binddiagnosisrecord");

                //治疗记录
                for (var item in rtn.treatrecord)
                { rtn.treatrecord[item].doctorsno = doctorsno;}
                $("#treatrecord").tmpl(rtn.treatrecord).appendTo("#bindtreatrecord");
                $("#cname").text(rtn.userinfo[0].truename);
                $("#name").text(rtn.userinfo[0].truename);
                $("#headimg").attr("src", rtn.userinfo[0].picsrc);
                $("#telphone").text(rtn.userinfo[0].logincellphone);
                $("#contactpatient").data({ "contactpatient": rtn.userinfo[0].logincellphone });
                //得到收藏与否图标
                if (rtn.iscollect) {
                    $("#forcollect").text("已收藏");
                    $("#collectoruncollect").attr("src", "img/clickuncollect.png");
                    $("#collectoruncollect").unbind("click");
                    $("#collectoruncollect").click(function () {
                        CancelAddCollectPatient(sno);
                    })
                }
                else {
                    $("#forcollect").text("收藏");
                    $("#collectoruncollect").attr("src", "img/clickcollect.png");
                    $("#collectoruncollect").unbind("click");
                    $("#collectoruncollect").click(function () {
                        AddCollectPatient(sno);
                    })
                }
                //if (rtn.state == 0) {
                //    $("#tvisit").hide();
                //} else if (rtn.state == 1) {
                //    $("#chevisit").hide();

                //} else{
                //   $("#addvisit").hide(); 
                //}
                if (rtn.state == 0) {
                    $("#tvisit").hide();
                }
                else {
                    $("#bindvisitfunc").tmpl(rtn).appendTo("#tvisit");
                }

                //if (!rtn.isfocus) {
                //    $("#hideinfo").hide();
                //}
                //$("#contactpatient").attr("href", "tel:" + rtn.userinfo[0].logincellphone);
                //$("#telphone").html("<a href='tel:" + rtn.userinfo[0].logincellphone + "'>" + rtn.userinfo[0].logincellphone + "</a>")
            }
            else {
                myApp.alert("NoOk");
            }
        }
    })
}
//跳转至AddAllPatient页面前执行该方法判断是添加还是编辑
var ClickPlusOrDelte = 0;
function GetSelectPatient(obj) {
    var memberlist = GetAllMemberList();
    $allpatients = $('.deleteall');
    ClickPlusOrDelte++;
    if (memberlist == "") {
        mainView.router.loadPage('AddAllPatient.html?doctorsno=' + doctorsno);
    }
        //说明分组中有元素，需要将元素在AddAllPatient.html中选中
    else {
        mainView.router.loadPage('AddAllPatient.html?memberlist=' + memberlist);
    }
}

//选中分组成员（编辑分组中的）
function CheckOrNot(obj) {
    if ($(obj).hasClass("addHtml")) {
        //此时存在addHtml类，表示已插入了内容，接下来应该删掉,同时删掉addHtml类名；
        $(obj).siblings().remove();
        $(obj).removeClass("addHtml");
    } else { //不存在addHtml类名，接下来要添加html内容,同时也添加addHtml类名;
        $(obj).addClass("addHtml");
        $('<img src="img/iconfont-dui.png" style="position:absolute;width:15px;right:0;top:0" />').insertAfter(obj);
    }
}

//得到所有的成员的snolist
function GetAllMemberList() {
    var memberlist = [];
    $("#selectmemberlist").find('.deleteall').each(function () { memberlist.push(this.dataset.sno); });
    return memberlist;
}

//删除分组
function DelCurrentGroup(obj) {
    myApp.confirm('', '确定删除分组？', function () {
        $.Frame.Ajax.Ajax({
            url: $.Frame.Config.Constant.ServerUrl + "mypatient.delcurrentgroup.go",
            postdata: {
                doctorsno: doctorsno,
                groupid: $(obj).data("delgroup")
            },
            success: function (rtn) {
                if (rtn.issuccess) {
                    myApp.alert("删除分组成功");
                }
                else {
                    myApp.alert("删除分组失败");
                }
            }
        })
        mainView.router.loadPage("GroupManage.html");
    }, function () {
        return;
    })
    
}

//删除组成员
function DeleteGroupMember() {
    if (typeof ($('.addHtml').data("sno")) == "undefined") {
        myApp.alert("请选择要删除的组员")
        return;
    }
    if ($('.selectmember').length == $('.addHtml').length) {
        myApp.confirm('', '确定删除所有成员？', function () {
            ClickPlusOrDelte++;
            $("#deletegroupmember").parent().siblings('.AddList.deleteall.col-20').remove();
            return;
        })
    }
    else {
        $('.addHtml').parent().parent().remove();
    }
}
//选中成员，添加分组成员中的
function CheckedElement(memberlist) {
    var list = [];
    list = memberlist.split(",");
    var $allcheckElements = $("input[type='checkbox']");
    if (list.length > 0) {
        for (var i = 0; i < list.length; i++) {
            $("li[data-sno='" + list[i] + "']").find($allcheckElements).attr("checked", true);
        }
    }
}

//排序页面的查找，按姓名和项目
function SearchPatientsOnAlphaSortPage() {
    if (typeof (pagesorteddate) != "undefined") {
        //得到搜索类型和搜索内容
        var stype = $('#searchindex').text();
        var scontent = $('#searchmain').val();
    
        $(".list-group li.addshow").removeClass('addshow');
        var lilist = $(document.querySelectorAll('[data-truename]'));
        if (stype == "姓名"){
            for (var i = 0; i < lilist.length; i++) {
                if (lilist[i].dataset.truename.indexOf(scontent) >= 0) {
                    $(lilist[i]).addClass("addshow");
                    $(lilist[i]).siblings('.list-group-title').addClass("addshow");
                }
            }
            $(".list-group").has($('li.addshow')).show();
            $(".list-group li:not(.addshow)").hide();
            $(".addshow").show();

        }
        
        else {
            for (var i = 0; i < lilist.length; i++) {
                    if (lilist[i].dataset.product.indexOf(scontent) >= 0) {
                        $(lilist[i]).addClass("addshow");
                        $(lilist[i]).siblings('.list-group-title').addClass("addshow");
                }
            }
            $(".list-group").has($('li.addshow')).show();
            $(".list-group li:not(.addshow)").hide();
            $(".addshow").show();


        }
    }
}


//共用的搜索
function GetSearchPatient(type) {
    $.Frame.Ajax.Ajax({
        url: $.Frame.Config.Constant.ServerUrl + "mypatient.gosearch.go?searchtype=" + searchtype + "&searchcontent=" + searchcontent + "&type=" + type,
        postdata: {
            doctorsno: doctorsno
        },
        success: function (rtn) {
            if (rtn.issuccess) {
                if (rtn.searchpatients == "") {
                    myApp.alert("无结果");
                }
                else {
                    $("#bindsearchoraddlist li").remove();
                    $("#searchoraddlist").tmpl(rtn.searchpatients).appendTo("#bindsearchoraddlist");
                }
            }
            else {
                myApp.alert("NoOK");
            }
        },
        fail: function (msg) {
            myApp.alert(msg)
        }
    })
}

//得到所有公共的分组
function GetPatientGroup() {
    $.Frame.Ajax.Ajax({
        url: $.Frame.Config.Constant.ServerUrl + "mypatient.getmypatientgroup.go",
        postdata: {
            doctorsno: doctorsno
        },
        success: function (rtn) {
            if (rtn.issuccess) {
                //rtn.diagnosislist.patientcount = rtn.diagnosislist.length;
                //构造结果集
                pagegroupinfo = rtn;
                $("#diagnosiscount").html('就诊患者<span>（' + rtn.diagnosislist.length + '）</span>');
                $("#treatcount").html('治疗患者<span>（' + rtn.treatlist.length + '）</span>');
                $("#collectcount").html('收藏患者<span>（' + rtn.collectlist.length + '）</span>');
                $("#diagnosislist").tmpl(rtn.diagnosislist).appendTo("#binddiagnosislist");
                $("#treatlist").tmpl(rtn.treatlist).appendTo("#bindtreatlist");
                $("#collectlist").tmpl(rtn.collectlist).appendTo("#bindcollectlist");
                $(".accordion-item").addClass("accordion-item-expanded");
            }
            else {
                myApp.alert("NoOk");
            }
        }
    })
}

//绑定自定义分组于我的患者首页
function ShowDocDefinedGroup() {
    $.Frame.Ajax.Ajax({
        url: $.Frame.Config.Constant.ServerUrl + "mypatient.getdocdefinedgroup.go",
        postdata: {
            doctorsno: doctorsno
        },
        success: function (rtn) {
            if (rtn.issuccess) {
                $("#definedgroupinfo").tmpl(rtn.grouplist).appendTo("#docdefinedgroupindex");
            }
            else {
                myApp.alert("NoOk");
            }
        }
    })
}
//===================================================================初始化PatientIndex页面
myApp.onPageInit('PatientIndex', function (page) {
    //发送Ajax得到患者分组已诊断、已治疗、已收藏（tb_Uct_DoctorCustomerGroup)
    GetPatientGroup();
    //绑定自定义分组
    ShowDocDefinedGroup();
    //是否被选中
    //$("li").addclass("accordion-item-expanded");
    //点击#SelToggle会显示或隐藏Search-box
  
    $$('#SelToggle').on('click', function () {
        if ($(".Search-box").is(':visible')) {
            $(".Search-box").hide();
        }
        else {
            $(".Search-box").show();
        }
    });

    $$('.Search-box li').on('click', function () {
        $("#SelToggle").html($(this).text() + "<img src='css/images/arrow-down.png' />");
        $(".Search-box").hide();
    });
    //点击主页面的搜索，进入到NewAddPatient.html页面，并打个标记
    $$('.Search-bar a img').on('click', function () {
        searchcontent = $("[type='search']").val();
        searchtype = $("#SelToggle").text();
        mainView.router.loadPage('NewAddPatient.html?type=1');
    })

    $(document).bind('click', function (e) {
        var e = e || window.event; //浏览器兼容性 
        var elem = e.target || e.srcElement;
        while (elem) { //循环判断至跟节点，防止点击的是div子元素 
            if (elem.id && elem.id == 'SelToggle') {
                return;
            }
            if (elem.id && elem.id == 'searchindex') {
                return;
            }
            if (elem.id && elem.id == 'searchtype') {
                return;
            }
            if (elem.id && elem.id == 'selcondition') {
                return;
            }
            
            elem = elem.parentNode;
        }
        $(".Search-box").hide();
        $("#searchbox").hide();
        $("#sharesearchbox").hide();
        $("#selbox").hide();
        //$('#test').css('display', 'none'); //点击的不是div或其子元素 
    });
});

//=============================================================初始化NewAddPatient.html页面
myApp.onPageInit('NewAddPatient', function (page) {
    $$('#searchtype').on('click', function () {
        if ($("#sharesearchbox").is(':visible')) {
            $("#sharesearchbox").hide();
        }
        else {
            $("#sharesearchbox").show();
        }
    });

    $$('#sharesearchbox li').on('click', function () {
        $("#searchtype").html($(this).text() + "<img src='css/images/arrow-down.png' />");
        $("#sharesearchbox").hide();
    });



    //如果是从MyPatient主页点搜索进来的
    if (page.query.type == '1') {
        $("#sharedpagetitle").html("搜索");
        type = 1;
        //为搜索类型和搜索内容框赋值,发送Ajax,
        $("[type='searchcontent']").val(searchcontent);
        $("#searchtype").html(searchtype + "<img src='css/images/arrow-down.png' />");
        GetSearchPatient(1);
    }
    if ($("#sharedpagetitle").html() == "搜索") {
        $("#sharesearch").unbind("click");
        $("#sharesearch").on('click', function () {
            $("#bindsearchoraddlist li").remove();
            searchcontent = $("[type='searchcontent']").val();
            searchtype = $("#searchtype").text();
            GetSearchPatient(1);
        })
    }
    //如果 type=enter是从主页中点击最新添加进来的
    if (page.query.type == "enter") {
        $("#sharedpagetitle").html("最近添加");
        $("#bindsearchoraddlist li").remove();
        GetNewAddPatients();
        type = 0;
    }
    if ($("#sharedpagetitle").html() == "最近添加") {
        $("#sharesearch").unbind("click");
        $("#sharesearch").on('click', function () {
            searchcontent = $("[type='searchcontent']").val();
            searchtype = $("#searchtype").text();
            $("#bindsearchoraddlist li").remove();
            GetSearchPatient(0);
        })
    }
    
})

//===============================================================初始化AlphaSort页面
myApp.onPageInit('AlphaSort', function (page) {
    $.Frame.Ajax.Ajax({
        url: $.Frame.Config.Constant.ServerUrl + "mypatient.getdoctorpatients.go",
        postdata: {
            doctorsno: doctorsno
        },
        success: function (rtn) {

            if (rtn.issuccess) {
                //myApp.alert("OK")
                pagesorteddate = rtn;
                $('#capitallettersort').html("");
                $("#alphasortlist").tmpl(rtn.pinyinlist).appendTo("#capitallettersort");
                $("#binselectgroupmember").html("");
                $("#selectgroupmember").tmpl(pagesorteddate.pinyinlist).appendTo("#binselectgroupmember");
            }
            else {
                myApp.alert("NoOk");
            }
        }
    })
    var ullist;
    if ("undefined" == typeof (pagesorteddate)) {
        $.Frame.Ajax.Ajax({
            url: $.Frame.Config.Constant.ServerUrl + "mypatient.getdoctorpatients.go",
            postdata: {
                doctorsno: doctorsno
            },
            success: function (rtn) {

                if (rtn.issuccess) {
                    //myApp.alert("OK")
                    pagesorteddate = rtn;
                    $("#capitallettersort").html("");
                    $("#alphasortlist").tmpl(rtn.pinyinlist).appendTo("#capitallettersort");
                }
                else {
                    myApp.alert("NoOk");
                }
            }
        })
    }
    else {
        $("#capitallettersort").html("");
        $("#alphasortlist").tmpl(pagesorteddate).appendTo("#capitallettersort");
    }

    
    $$('#searchindex').on('click', function () {
        if ($("#searchbox").is(':visible')) {
            $("#searchbox").hide();
        }
        else {
            $("#searchbox").show();
        }
    });

    $$('#searchbox li').on('click', function () {
        $("#searchindex").html($(this).text() + "<img src='css/images/arrow-down.png' />");
        $("#searchbox").hide();
    });
   
})


//==============================================================初始化GroupManage.html
myApp.onPageInit('GroupManage', function (page) {
    $("#showdiagnosiscount").html('就诊患者<span>（' + pagegroupinfo.diagnosislist.length + '）</span>');
    $("#showtreatcount").html('治疗患者<span>（' + pagegroupinfo.treatlist.length + '）</span>');
    $("#showcollectcount").html('收藏患者<span>（' + pagegroupinfo.collectlist.length + '）</span>');
    $("#diagnosislist").tmpl(pagegroupinfo.diagnosislist).appendTo("#showbinddiagnosislist");
    $("#treatlist").tmpl(pagegroupinfo.treatlist).appendTo("#showbindtreatlist");
    $("#collectlist").tmpl(pagegroupinfo.collectlist).appendTo("#showbindcollectlist");
    GetDoctorDefinedGroup(doctorsno);
    function GetDoctorDefinedGroup(doctorsno) {
        $.Frame.Ajax.Ajax({
            url: $.Frame.Config.Constant.ServerUrl + "mypatient.getdoctordefinedgroup.go",
            postdata: {
                doctorsno:doctorsno
            },
            success: function (rtn) {
                if (rtn.issuccess) {
                    $("#docdefinedgrouplist").tmpl(rtn.docdefinedgroup).appendTo("#docdefinedgroup");
                    $('.doctordefined').on('click', function () {
                        mainView.router.loadPage('AddNewGroup.html?doctorsno=' + $(this)[0].dataset.doctorsno + '&groupid=' + $(this)[0].dataset.groupid + '&groupname=' + $(this)[0].dataset.groupname+'&typemark=edit');
                    })
                }
            }
        })
    }
    
})

myApp.onPageReinit('GroupManage', function (page) {
    alert(123);
});


//=========================================================初始化AddAllPatient.html
myApp.onPageInit('AddAllPatient', function (page) {
    if ("undefined" == typeof (pagesorteddate)) {
        $.Frame.Ajax.Ajax({
            url: $.Frame.Config.Constant.ServerUrl + "mypatient.getdoctorpatients.go",
            postdata: {
                doctorsno: doctorsno
            },
            success: function (rtn) {

                if (rtn.issuccess) {
                    pagesorteddate = rtn;
                    $("#selectgroupmember").tmpl(pagesorteddate.pinyinlist).appendTo("#bindselectgroupmember");
                    if (typeof (page.query.memberlist) != "undefined") {
                        var list = page.query.memberlist;
                        CheckedElement(list);
                    }
                }
                else {
                    myApp.alert("NoOk");
                }
            }
        })
    }
    else {
        $("#selectgroupmember").tmpl(pagesorteddate.pinyinlist).appendTo("#bindselectgroupmember");
        if (typeof (page.query.memberlist) != "undefined") {
            var list = page.query.memberlist;
            CheckedElement(list);
        }
    }
    $$('#selcondition').on('click', function () {
        if ($("#selbox").is(':visible')) {
            $("#selbox").hide();
        }
        else {
            $("#selbox").show();
        }
    });

    $$('#selbox li').on('click', function () {
        $("#selcondition").html($(this).text() + "<img src='css/images/arrow-down.png' />");
        $("#selbox").hide();
    });
    $("#selpatient").click(function () {
        //执行AddAllPatient页面的搜索
        
        //通过两条件进行搜索
        if (typeof (pagesorteddate) != "undefined") {
            //得到搜索类型和搜索内容
            //var stype = $('#searchindex').text();
            //var scontent = $('#searchmain').val();
            var seltype = $('#selcondition').text();
            var selcontent = $('#selcontend').val();
            $(".list-group li.addshow").removeClass('addshow');
            var lilist = $(document.querySelectorAll('[data-truename]'));
            if (seltype == "姓名") {
                for (var i = 0; i < lilist.length; i++) {
                    if (lilist[i].dataset.truename.indexOf(selcontent) >= 0) {
                        $(lilist[i]).addClass("addshow");
                        $(lilist[i]).siblings('.list-group-title').addClass("addshow");
                    }
                }
                $(".list-group").has($('li.addshow')).show();
                $(".list-group li:not(.addshow)").hide();
                $(".addshow").show();

            }

            else {
                for (var i = 0; i < lilist.length; i++) {
                    if (lilist[i].dataset.product.indexOf(selcontent) >= 0) {
                        $(lilist[i]).addClass("addshow");
                        $(lilist[i]).siblings('.list-group-title').addClass("addshow");
                    }
                }
                $(".list-group").has($('li.addshow')).show();
                $(".list-group li:not(.addshow)").hide();
                $(".addshow").show();


            }
        }
    })
    
    $("#savegroupmember").on('click', function () {
        if ($("input[type='checkbox']:checked").length <= 0) {
            myApp.confirm('', '你未选择新增成员，是否返回？', function () {
                mainView.router.back();
            }, function () {
                return false;
            });
        }
        else {
            $('#bindaddgroupmember').siblings('.deleteall').remove();
            var list=[];
            var len = $("input[type='checkbox']:checked").parent().parent("li").length;
            for (var i = 0; i < len; i++) {
                //拼接特定格式的字符串
                list.push($("input[type='checkbox']:checked").parent().parent("li")[i].dataset);
            }
            $("#addgroupmember").tmpl(list).insertBefore("#bindaddgroupmember");
            mainView.router.back();
        }
    })
    $("#backgroupmember").on('click', function () {
        var len = $("input[type='checkbox']:checked").parent().parent("li").length;
        myApp.confirm('', '是否保存？', function () {
            $('#bindaddgroupmember').siblings('.deleteall').remove();
            var list = [];
            for (var i = 0; i < len; i++) {
                //拼接特定格式的字符串
                list.push($("input[type='checkbox']:checked").parent().parent("li")[i].dataset);
            }
            $("#addgroupmember").tmpl(list).insertBefore("#bindaddgroupmember");
            mainView.router.back();
        }, function () {
            return false;
        });
    })
 
})

//============================================================================初始化AddNewGroup
myApp.onPageInit("AddNewGroup", function (page) {

    if (page.query.typemark == 'edit') {
        //说明是编辑分组
        $("#sharedgroup").html("编辑分组");
        //为组名赋值,
        $("#inputgroupname").val(page.query.groupname);
        var groupid = page.query.groupid;
        $("#btndelgroup").data({ "delgroup": groupid });
        QueryDoctorGroup(groupid, doctorsno);
    }
    if (typeof (page.query.groupid) == "undefined") {
        $("#btndelgroup").parent().hide();
    }
    $("#savedocpatientgroup").on('click', function () {
        var groupname = $(".AddNewGroup .list-block textarea").val().trim();
        if (groupname == "") {
            myApp.alert("分组名不能为空！");
            return false;
        }
        //if ($('.row .AddList').length <= 0) {
        //    myApp.alert("请选择组成员");
        //    return false;
        //}
        var addmembercount = $('.row .AddList').length;
        var patientlist = [];
        for (var i = 0; i < addmembercount; i++) {
            patientlist.push($('.row .AddList')[i].dataset.sno);
        }
        var patients = patientlist.join(",");
        var groupid = page.query.groupid;
        if (typeof (page.query.groupid) == "undefined") {
            //说明是添加操作
            //判断组名是否可用
            IsDoctorGroupNameAvailable(doctorsno, groupname);
            function IsDoctorGroupNameAvailable(doctorsno, groupname) {
                $.Frame.Ajax.Ajax({
                    url: $.Frame.Config.Constant.ServerUrl + "mypatient.isdoctorgroupnameavailable.go",
                    postdata: {
                        doctorsno: doctorsno,
                        groupname: groupname,
                    },
                    success: function (rtn) {
                        if (rtn.issuccess) {
                            //分组不存在，作添加操作
                            myApp.alert("分组已经存在，请重新命名");
                        }
                        else {
                            //作添加操作
                           AddDoctorCustomerGroup(patients, groupname, groupid, 0);
                        }
                    }
                })
            }
        }
        else {
            //作编辑操作
            myApp.confirm('', '是否保存修改', function () {
                AddDoctorCustomerGroup(patients, groupname, groupid, 1);
            })
        }
        //IsDoctorCustomerGroupExits(patients, groupname,groupid);
        //console.log(patients);
    })
    function AddDoctorCustomerGroup(patients, groupname,groupid,edittype) {
        $.Frame.Ajax.Ajax({
            url: $.Frame.Config.Constant.ServerUrl + "mypatient.savedoctorcustomergroup.go",
            postdata: {
                doctorsno: doctorsno,
                patients: patients,
                groupname: groupname,
                edittype: edittype,
                groupid: groupid
            },
            success: function (rtn) {

                if (rtn.issuccess) {
                    myApp.alert(rtn.msg);
                    mainView.router.loadPage("GroupManage.html")
                   // mainView.router.reloadPreviousPage("GroupManage.html");
                }
                else {
                    myApp.alert("NoOk");
                }
            }
        })
    }
    function QueryDoctorGroup(groupid, doctorsno) {
        $.Frame.Ajax.Ajax({
            url: $.Frame.Config.Constant.ServerUrl + "mypatient.querydoctorgroup.go",
            postdata: {
                doctorsno: doctorsno,
                groupid: groupid,
            },
            success: function (rtn) {

                if (rtn.issuccess) {
                    $("#addgroupmember").tmpl(rtn.groupinfo).insertBefore("#bindaddgroupmember");
                }
                else {
                    myApp.alert("NoOk");
                }
            }
        })
    }
})


//========================================================初始化PatientInfo.html页面
myApp.onPageInit('PatientInfo', function (page) {
    $(".collectstylediv").attr("sno", page.query.sno);
    $("#turntodefinedpage").data({ "mark": page.query.mark });
    var mark = page.query.mark;
    $("#turntodefinedpage").attr("mark",page.query.mark );

    var viewer = page.query.asdoctorsno;
    if (viewer == undefined || viewer.length <= 0)
        viewer = doctorsno;
    var objPage = $("div.page[data-page='PatientInfo']");
<<<<<<< .mine
<<<<<<< .mine
    objPage.find("#tabTalk").click(function () { location.href = "MsgHome.html?loadpagename=MsgTalking.html&drsno=" + doctorsno + "&customersno=" + page.query.sno + "&asdoctorsno=" + viewer + "&&back=" + mainView.history.reverse()[2]; });//返回到上个页面
    objPage.find("#tabRecords").click(function () { location.href = "MsgHome.html?loadpagename=MsgConsultingRecords.html&drsno=" + doctorsno + "&customersno=" + page.query.sno + "&asdoctorsno=" + viewer + "&&back=PatientInfo"; });
=======
    objPage.find("#tabTalk").click(function () { location.href = "MsgHome.html?loadpagename=MsgTalking.html&drsno=" + doctorsno + "&customersno=" + page.query.sno + "&asdoctorsno=" + viewer+"&back=Mypatient&mark="+mark; });
    objPage.find("#tabRecords").click(function () { location.href = "MsgHome.html?loadpagename=MsgConsultingRecords.html&drsno=" + doctorsno + "&customersno=" + page.query.sno + "&asdoctorsno=" + viewer+"&bakc=Mypatient&mark="+mark; });
=======
    objPage.find("#tabTalk").click(function () { location.href = "MsgHome.html?loadpagename=MsgTalking.html&drsno=" + doctorsno + "&customersno=" + page.query.sno + "&asdoctorsno=" + viewer + "&pageback=MyPatient&mark=" + mark; });
    objPage.find("#tabRecords").click(function () { location.href = "MsgHome.html?loadpagename=MsgConsultingRecords.html&drsno=" + doctorsno + "&customersno=" + page.query.sno + "&asdoctorsno=" + viewer + "&pageback=MyPatient&mark=" + mark; });
>>>>>>> .r2110
>>>>>>> .r2066

    GetPatientDetailInfo(page.query.sno);
    //判断是否收藏
    //IsCollect();
})

