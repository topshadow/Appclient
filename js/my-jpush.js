var G_JPUSH_REGISTR_ID = "";
var G_DEVICE_TYPE = "";

//* 初始化JPUSH并且生成JPUSH
var onDeviceReady = function() {
    console.log("JPushPlugin:Device ready!");
    initiateUI();
};
var initiateUI = function() {
    try {
        window.plugins.jPushPlugin.init();
        getRegistrationID();
        if (device.platform != "Android") {
            G_DEVICE_TYPE = "Ios";
            window.plugins.jPushPlugin.setDebugModeFromIos();
            window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
        } else {
            G_DEVICE_TYPE = "Android";
            window.plugins.jPushPlugin.setDebugMode(true);
            window.plugins.jPushPlugin.setStatisticsOpen(true);
        }
    } catch (exception) {
        console.log(exception);
    }
};
//* 取得设备号
var getRegistrationID = function() {
    window.plugins.jPushPlugin.getRegistrationID(onGetRegistrationID);
};
var onGetRegistrationID = function(data) {
    try {
        console.log("JPushPlugin:registrationID is " + data);
        if (data.length == 0) {
            var t1 = window.setTimeout(getRegistrationID, 1000);
        }
        G_JPUSH_REGISTR_ID = data;
        //myApp.alert("device:"+G_JPUSH_REGISTR_ID);
    } catch (exception) {
        console.log(exception);
    }
};

//* 从通知栏打开
var onOpenNotification = function(event) {
    try {
        var alertContent;
        if (device.platform == "Android") {
            alertContent = window.plugins.jPushPlugin.openNotification.alert;
        } else {
            alertContent = event.aps.alert;
        }

        addUnreadMsgCount();
        var docsno = localStorage.getItem("doctorSno");
        if(docsno != null && docsno.length > 0)
        {
            window.location.href="MsgHome.html?drsno="+docsno;
        }else{
			
        }


    } catch (exception) {
        console.log("JPushPlugin:onOpenNotification" + exception);
    }
};
//* 画面中收到消息
var onReceiveNotification = function(event) {
    try {
        var alertContent;
        if (device.platform == "Android") {
            alertContent = window.plugins.jPushPlugin.receiveNotification.alert;
        } else {
            alertContent = event.aps.alert;
        }
        //myApp.alert("推送:" + alertContent);
        addUnreadMsgCount();
    } catch (exception) {
        console.log(exception)
    }
};

var onReceiveMessage = function(event) {
    try {
        var message;
        if (device.platform == "Android") {
            message = window.plugins.jPushPlugin.receiveMessage.message;
        } else {
            message = event.content;
        }
        //alert("messageResult:" + alertContent);
        addUnreadMsgCount();
    } catch (exception) {
        console.log("JPushPlugin:onReceiveMessage-->" + exception);
    }
};

/*localStorage.setItem("messPhone", targetPhone);
localStorage.getItem("doctorSno");*/
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("jpush.openNotification", onOpenNotification, false);
document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);
document.addEventListener("jpush.receiveMessage", onReceiveMessage, false);

var setUnreadMsgIcon = function(){
    var unread = localStorage.getItem("unreadcount");
    if(unread == undefined || unread.length <=0)
        unread = 0;

    if(unread > 99)
        $(".tab-link.view2 .icon-dongtai").html("<span class='badge bg-red'>99+</span>");
    else if(unread > 0)
        $(".tab-link.view2 .icon-dongtai").html("<span class='badge bg-red'>" + unread + "</span>");
    else
        $(".tab-link.view2 .icon-dongtai").html("");

};

var getUnreadMsgCount = function(){
    var unread = localStorage.getItem("unreadcount");
    if(unread == undefined || unread.length <=0)
        unread = 0;
    return unread;
};
var addUnreadMsgCount = function(){
    var unread = getUnreadMsgCount();
    unread = parseInt(unread) + 1;
    setUnreadMsgCount(unread);
};
var setUnreadMsgCount = function(unread){
    localStorage.setItem("unreadcount", unread);
    setUnreadMsgIcon();
};

var $$ = Dom7;
$$(document).on("pageInit", function(e) {
    setUnreadMsgIcon();
});