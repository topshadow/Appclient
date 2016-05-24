 var doctorsno = GetQueryString("doctorsno")||localStorage.getItem("doctorSno");
function Days(num){
	var days28="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28".split(",");
	switch(num){
	case 28:
	return days28;
	case 29:
	return days28.concat(["29"]);
	break;
	case 30:
	return days28.concat(["29","30"]);
	break;
	case 31:
	return days28.concat(["29","30","31"]);
	}
}


      var myApp = new Framework7();
      var $$ = Dom7;
      var mainView = myApp.addView('.view-main', {
      	// Because we use fixed-through navbar we can enable dynamic navbar
      	dynamicNavbar: true,
      	domCache: true
      });
      // Generate dynamic page
      var dynamicPageIndex = 0;

      function createContentPage() {
      	mainView.router.loadContent(
      		'<!-- Top Navbar-->' +
      		'<div class="navbar">' +
      		'  <div class="navbar-inner">' +
      		'    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
      		'    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
      		'  </div>' +
      		'</div>' +
      		'<div class="pages">' +
      		'  <!-- Page, data-page contains page name-->' +
      		'  <div data-page="dynamic-pages" class="page">' +
      		'    <!-- Scrollable page content-->' +
      		'    <div class="page-content">' +
      		'      <div class="content-block">' +
      		'        <div class="content-block-inner">' +
      		'          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
      		'          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
      		'        </div>' +
      		'      </div>' +
      		'    </div>' +
      		'  </div>' +
      		'</div>'
      	);
      	return;
      }

//比较对象相等   http://www.2cto.com/kf/201410/347045.html   

 var isObjectValueEqual= function(a, b) {
          // Of course, we can do it use for in 
          // Create arrays of property names
          var aProps = Object.getOwnPropertyNames(a);
          var bProps = Object.getOwnPropertyNames(b);

          // If number of properties is different,
          // objects are not equivalent
          if (aProps.length != bProps.length) {
              return false;
          }

          for (var i = 0; i < aProps.length; i++) {
              var propName = aProps[i];

              if(typeof  a[propName]=="object"){

                  return  isObjectValueEqual(a[propName],b[propName]);
             
              }else{
                  // If values of same property are not equal,
                  // objects are not equivalent
                  if (a[propName] !== b[propName]) {
                      return false;
                  }
              }
          }

          // If we made it this far, objects
          // are considered equivalent
          return true;
      };
 
//valuechange事件 具体使用方法见  http://www.tuicool.com/articles/YzUb6v
   

   

/**
 *@description 重新加载面板
 *@param {string} 面板的字符串ID
 *
 */
function reloadTable(tabID){
var $tab=$(tabID);
var tableName;
var tmplObj;
switch(tabID){
	case "#tab1":
	tableName="todiagnosis";
	tmplObj=$("#todiagnosis");
	break;
	case "#tab2":
	tableName="diagnosis";
	tmplObj=$("#diagnosis");
	break;
	case "#tab3":
	tableName="totreat";
	tmplObj =$("#totreat");
	break;
	case "#tab4":
	tableName="treat";
	tmplObj =$("#treat");
	break;	
	default :
	myApp.alert("错误的面板类型","提示");
	break;
}
	console.log("加载面板%s   面板名字:%s",tabID,tableName);

//发送Ajax请求,请求对应数据

$.Frame.Ajax.Ajax({
	url:$.Frame.Config.Constant.ServerUrl+"myorder."+tableName+".go",
	postdata:{
		doctorsno:doctorsno
	}  ,
	success:function(rtn){
		if(rtn.issuccess){
			console.log("prefix"+prefix);
			//移除原有面板数据,添加新的面板数据
			$tab.find(".reserve-item").remove();
			  changePicSrc(prefix,rtn.data);
                              
			tmplObj.tmpl(rtn.data).appendTo($tab);
			autoHideAfternoonFirstOrder();
			AddCancelReserve();//取消预约
            AddReserveTreatment();//预约时间          
                            			
		}else{
			myApp.alert(rtn.msg,"错误");
		}
	}
	
});

}

				var reserveTime;
                    function AddReserveTreatment(){
                        //====================================预约时间,==========================================
                        $$('.reserve-treatment').on('click', function () {
                            if(reserveTime){
                            	reserveTime.close();
                            }
                            var  $this = $(this);//预约时间按钮
                            var $item = $(".reserve-item").has($(this));//预约时间的数据块
                            var ordersno = $(this).data("ordersno");
                            var today = new Date();
                              reserveTime= myApp.picker({
                                input: $$(this),
                                toolbarTemplate: '<div class="toolbar">' +
                                    '<div class="toolbar-inner">' +
                                    '<div class="left"><a href="#" class="link  destroy-picker">取消</a></div>' +
                                    '<div class="center">请选择预约时间</div>' +
                                    '<div class="right">' +
                                    '<a href="#" class="link destroy-picker save" id="save">完成</a>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>',
                                toolbar: true,
                                rotateEffect: true,
                                onClose: function () {
                                    $$('.modal-overlay').removeClass('modal-overlay-visible');
                                      reserveTime.close();
                                      reserveTime.destroy();
                                },
                                value: [today.getFullYear(), today.getMonth(), today.getDate(), '上午'],
                                onChange: function (picker, values, displayValues) {
                                    var daysInMonth = new Date(picker.value[2], picker.value[0] * 1 + 1, 0).getDate();
                                    if (values[1] > daysInMonth) {
                                        picker.cols[1].setValue(daysInMonth);
                                    }
                                 var maxDays = new Date(picker.value[0],picker.value[1]*1+1,0).getDate();
                                var days = Days(maxDays);
                                if(days.length!=picker.cols[2].values.length){
                                picker.cols[2].replaceValues(days,days);
                                }
                                },
                                formatValue: function (p, values, displayValues) {
                                    return displayValues[0] + '.' + displayValues[1] + '.' + values[2] + ' ' + values[3];
                                }, onOpen: function (picker) {
                                  $('.destroy-picker').on('click', function () {
                                      reserveTime.close();
                                      reserveTime.destroy();
                                 	
                                 });
                                  $(".save").click(function () {


                                    //treatdt = reserveTime.value.toString().replaceAll(',', '-');
                                    var values = reserveTime.value.toString().split(",");
                                   var treatDate ;
                                   var treatDateTime; 
                                  if(values[3]=="上午"){
                                  	treatDateTime="11:59";
                                  }else{
                                  	treatDateTime="23:59";
                                  }
                                  values[1]++;
                                  values.length=3;
                                  treatDate =values.join('-');
                  		                
                                   treatdt=treatDate+" "+treatDateTime;
                                   console.log("预约治疗时间 %s",treatdt);                   
                                       $item.hide();
                                     
                                        $.Frame.Ajax.Ajax({
                                            url: $.Frame.Config.Constant.ServerUrl + "myorder.settreatdt.go",
                                            postdata: {
                                                ordersno: ordersno,
                                                treatdt: treatdt,
                                            },
                                            success: function (rtn) {
                                                if (rtn.issuccess) {
                                                    //完成取消,移除当前的订单信息的html代码
                                                    myApp.alert(rtn.msg, "正确");
                                                   reloadTable("#tab2");
                                                   $("#tab3").html('');//清空$tab3
                                                   reloadTable("#tab3");
                                                   
                                                } else {
                                                    myApp.alert(rtn.msg, "抱歉");
                                                    $item.show();
                                                }
                                            }
                                        });
                                    });
                                },
                                cols: [
                                    // Years
                                    {
                                        values: (function () {
                                            var arr = [];
                                            for (var i = 1950; i <= 2030; i++) {
                                                arr.push(i);
                                            }
                                            return arr;
                                        })(),
                                        textAlign: 'right'
                                    },
                                    // Months
                                    {
                                        values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                                        displayValues: ('1 2 3 4 5 6 7 8 9 10 11 12').split(' '),
                                        textAlign: 'left'
                                    },
                                    // Days
                                    {
                                        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                                        textAlign: 'left'
                                    },
                                    // Hours
                                    {
                                        values: ['上午', '下午'],
                                        textAlign: 'left'
                                    }
                                ]
                            });
                            reserveTime.open();
                        });
        
                        // 已预约
                        $$('.reserve-done').on('click', function () {
                            myApp.modal({
                                title: '您已和患者预约治疗时间',
                                text: '<div class="reserve-done-modal"><h4>尊敬的医生您好：</h4><p>您已和患者XXX约定治疗时间为：2015年12月13日，系统已提醒您的患者，请您也按时准备手术，祝您顺利！</p></div>',
                                afterText:
                                '',
                                buttons: [
                                {
                                    text: '知道了，谢谢',
                                }
                                ]
                            })
                        });

                        // 修改时间
                        $$('.reserve-edit').on('click', function () {
                            var $this =$(this);//当前修改对象
                            console.log("修改预约治疗时间的订单ordersno:"+$(this).data("ordersno"));
                            var ordersno = $(this).data("ordersno");
                            var popupHTML = '<div class="popup reserve-popup" >'+
                '<div class="view navbar-fixed">'+
                    '<div class="pages">'+
                        '<div class="page">'+
                            '<div class="navbar">'+
                                '<div class="navbar-inner">'+
                                    '<div class="left"><a href="#" class="link close-popup"><i class="icon icon-back"></i></a></div>'+
                                   ' <div class="center">温馨提示</div>'+
                                '</div>'+
                           ' </div>'+
                            '<div class="page-content">'+
                                '<p class="reserve-tip" style="margin-top: 50px;">由于您主动对患者治疗时间进行修改，“聚美医”不承担相关法律责任，请慎重决定！我们会主动下发通知给预约用户，请填写修改时间缘由，并确定修改的治疗时间。<p>'+
                                '<div class="list-block">'+
                                  '<div class="list-block-title">更改的原因：</div>'+
                                  '<ul>'+
                                    '<li class="align-top">'+
                                      '<div class="item-content">'+
                                        '<div class="item-inner">'+
                                          '<div class="item-input">'+
                                            '<textarea class="reason"></textarea>'+
                                          '</div>'+
                                        '</div>'+
                                      '</div>'+
                                    '</li>'+
                                  '</ul>'+
                                '</div>'+
                                '<div class="list-block">'+
                                  '<div class="list-block-title">更改治疗时间为：</div>'+
                                  '<input type="text" readonly id="change-date-picker-date" class="change-date-input">'+
                                  '<div id="change-date-picker"></div>'+
                                '</div>'+
                                '<div class="btns">'+
                                    '<a href="#" class="link close-popup define-btn " id="modify">任性，确定修改</a>'+
                                '</div>'

                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
                            myApp.popup(popupHTML);
                            //原因不能超过20个字,
                           $(".reason").on("valuechange",function(){
							console.log($(this).val());
							if($(this).val().length>20){
								$(this).val($(this).val().substring(0,20));
							}
                           });
                            var pickerInline;
                            $("#modify").on("click",
                                function (){
                                	if(pickerInline){
                                		pickerInline.close();
                                		pickerInline.destroy();
                                	}
                                	var reason = $(".reason").val();
                                    if(!reason){
                                    	myApp.alert("请填写更改原因");
                                    return false;
                                    }


                                    var item =    $(".reserve-item").has($this);        
                                    var modifyDt = pickerInline.value.toString().split(',');
                                    modifyDt[1]++;//picker的bug
                                  
                                  //修改界面显示的 时间
                                   item.find(".treat-time").html("<span>待就诊记录:</span>"+modifyDt[3]);
                                   item.find(".treat-date").text(modifyDt[0]+"年"+modifyDt[1]+"月"+modifyDt[2]+"日");
                                
                        			var time=modifyDt[3];
 									modifyDt.length=3;
 									var date = modifyDt.join("-")
 									switch(time){
 										case "上午":
 										 time="12:00"
 										break;
 										case "下午":
 										time="23:59";
 										break;
 										default:
 										myApp.alert("错误的日期格式","提示");
                                            break;
 									}
 									var treatdt=date+" "+time;
 									console.info(treatdt);
 									
 									
                                    //Ajxa请求修改时间
                                    $.Frame.Ajax.Ajax({
                                        url: $.Frame.Config.Constant.ServerUrl+"myorder.settreatdt.go",
                                        postdata: {
                                            ordersno: ordersno,
                                            modifytreatdtreason: reason,
                                            treatdt:treatdt,
                                        },
                                        success: function (rtn) {
                                            if (rtn.issuccess) {
                                                myApp.alert("保存成功。我们将短信通知患者治疗时间已修改","提示");
                                            	reloadTable("#tab3");
                                            } else {
                                                myApp.alert(rtn.msg, "错误");
                                                item.show();
                                            }
                                        }
                                    });
                                });
                            var today = new Date();
                             pickerInline = myApp.picker({
                                input: '#change-date-picker-date',
                                container: '#change-date-picker',
                                rotateEffect: true,
                                toolbar: false,
                                onClose: function () {
                                    $$('.modal-overlay').addClass('modal-overlay-visible')
                                },
                                value: [today.getFullYear(), today.getMonth(), today.getDate(), '上午'],
                                onChange: function (picker, values, displayValues) {
                                    var daysInMonth = new Date(picker.value[2], picker.value[0] * 1 + 1, 0).getDate();
                                    if (values[1] > daysInMonth) {
                                        picker.cols[1].setValue(daysInMonth);
                  }
                                
                                //重新设置值
                                var maxDays = new Date(picker.value[0],picker.value[1]*1+1,0).getDate();
                                var days = Days(maxDays);
                                if(days.length!=picker.cols[2].values.length)
                                picker.cols[2].replaceValues(days,days);
                  
                                },
                                
                                
                                formatValue: function (p, values, displayValues) {
                                    return displayValues[0] + '.' + displayValues[1] + '.' + values[2] + ' ' + values[3];
                                },
                                cols: [
                                    // Years
                                    {
                                        values: (function () {
                                            var arr = [];
                                            for (var i = 1950; i <= 2030; i++) {
                                                arr.push(i);
                                            }
                                            return arr;
                                        })(),
                                        textAlign: 'right'
                                    },
                                    // Months
                                    {
                                        values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                                        displayValues: ('1 2 3 4 5 6 7 8 9 10 11 12').split(' '),
                                        textAlign: 'left'
                                    },
                                    // Days
                                    {
                                        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                                        textAlign: 'left'
                                    },
                                    // Hours
                                    {
                                        values: ['上午', '下午'],
                                        textAlign: 'left'
                                    }
                                ]
                            });
                        });
                    }
    

                    

                 
                    var item;
                    function AddCancelReserve(){
                        //取消预约跳转界面
                        $('.cancel-reserve').on('click', function () {
                            //顶端的item
                            item = $(".reserve-item").has($(this));
                            var reservedate = item.find(".reserve-time");
                            var reservetime = item.find(".time");
                            var ordersno = $(this).data("ordersno");
                            console.log("订单日期:" + reservedate.html() + reservetime.text());
                            console.log("订单编号:" + ordersno);
                            var popupHTML = '<div class="popup reserve-popup">' +
                                    '<div class="view navbar-fixed">' +
                                        '<div class="pages">' +
                                            '<div class="page">' +
                                                '<div class="navbar">' +
                                                    '<div class="navbar-inner">' +
                                                        '<div class="left"><a href="#" class="link close-popup"><i class="icon icon-back"></i></a></div>' +
                                                       ' <div class="center">因故取消</div>' +
                                                    '</div>' +
                                               ' </div>' +
                                                '<div class="page-content">' +
                                                    '<p class="reserve-tip" style="margin-top:60px">立即取消预约，可能导致患者投诉，如果执行，聚美医不承担相关责任，建议推迟就诊时间和患者商议好后点击取消。<p>' +
                                                    '<div class="list-block">' +
                                                      '<div class="list-block-title">我需要取消的就诊时间</div>' +
                                                      '<p class="cancle-time">' + reservedate.html() + reservetime.text() + '</p>' +
                                                    '</div>' +
                                                    '<div class="list-block">' +
                                                      '<div class="list-block-title">我的取消原因：</div>' +
                                                      '<ul>' +
                                                        '<li class="align-top">' +
                                                          '<div class="item-content">' +
                                                            '<div class="item-inner">' +
                                                              '<div class="item-input">' +
                                                                '<textarea id="cancelreason"></textarea>' +
                                                              '</div>' +
                                                            '</div>' +
                                                          '</div>' +
                                                        '</li>' +
                                                      '</ul>' +
                                                    '</div>' +
                                                    '<div class="list-block">' +
                                                      '<div class="list-block-title">选择取消原因</div>' +
                                                      '<ul>' +
                                                        '<li>' +
                                                          '<label class="label-radio item-content">' +
                                                            '<input type="radio" name="my-radio" value="" checked="checked"/>' +
                                                           ' <div class="item-inner">' +
                                                              '<div class="item-title">临时就诊，改时间再约，抱歉</div>' +
                                                            '</div>' +
                                                          '</label>' +
                                                        '</li>' +
                                                        '<li>' +
                                                          '<label class="label-radio item-content">' +
                                                            '<input type="radio" name="my-radio" value=""/>' +
                                                            '<div class="item-inner">' +
                                                              '<div class="item-title">临时会议，改时间再约，抱歉</div>' +
                                                            '</div>' +
                                                          '</label>' +
                                                        '</li>' +
                                                        '<li>' +
                                                          '<label class="label-radio item-content">' +
                                                            '<input type="radio" name="my-radio" value=""/>' +
                                                            '<div class="item-inner">' +
                                                              '<div class="item-title">临时请假，改时间再约，抱歉</div>' +
                                                            '</div>' +
                                                          '</label>' +
                                                        '</li>' +
                                                      '</ul>' +
                                                    '</div>' +
                                                    '<a href="#" class="link close-popup cancel-btn button" data-ordersno="' + ordersno + '">立即取消</a>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>'
                            myApp.popup(popupHTML);
                            isOrderCanceling = true;
                            $(".close-popup").click(function () {
                                isOrderCanceling = false;
                            });

                            $(".cancel-btn").click(
                                function () {
                                    var cancelreason = $("#cancelreason").text();
//                                    若是没有填写原因，则选中的原因作为数据提交
                                    if (cancelreason == '' || cancelreason == undefined || cancelreason == null) {
                                        console.log($("input[name=my-radio]:checked").text());
                                        cancelreason = $("input[name=my-radio]:checked").next().text();
                                    }
                                    var reservedate = item.find(".reserve-time");
                                    var reservetime = item.find(".time");
                                    var ordersno = $(this).data("ordersno");
                                   console.log("取消订单编号是%s  取消原因是%s",ordersno,cancelreason);
                                    $.Frame.Ajax.Ajax({
                                        url: $.Frame.Config.Constant.ServerUrl + "myorder.cancelorder.go",
                                        postdata:{
                                            ordersno: ordersno,
                                            cancelreason: cancelreason
                                        },
                                        success: function (rtn) {
                                            if (rtn.issuccess) {
                                           
                                                myApp.alert(rtn.msg, "提示");
                                           		//重新加载当前面板
                                           		reloadTable("#tab1");
                                            } else {
                                                myApp.alert(rtn.msg, "错误");
                                            }
                                        },
                                        error:function(rtn){
                                        	myApp.alert(rtn.msg,"错误");
                                        }
                                    });
                                });
                        });
                    }

