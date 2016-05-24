function dialog(msg,title,buttons,modal,width){if(!msg)return;var o;if(msg.jquery)
o=msg;else if(!(msg.charAt(0)==="<"&&msg.charAt(msg.length-1)===">"&&msg.length>=3))
o=$("<div>"+msg+"</div>");else
o=$(msg);var d=o.dialog({title:title||"",modal:(modal&&modal.toString().toLowerCase()=="false")?false:true,resizable:false,draggable:false,position:"center",width:(!width||isNaN(width))?undefined:width,buttons:buttons||[]});var e="resize."+d.attr("id");d.on("dialogclose",function(){$(window).unbind(e);d.dialog("destroy");});$(window).on(e,function(){d.dialog("widget").css("max-height",($(window).height()-48)+"px")
d.dialog("option","position",{my:"center",at:"center",of:window});}).trigger(e);return d;}
function Alert(msg,button,defaultButton){if(!defaultButton)
defaultButton=0;if(!$.isArray(button)||button.length==0)
button=[{text:"确定"}];$.each(button,function(i,j){var callback=button[i].click;button[i].click=function(){if(typeof callback==="function")
callback.call(this);defaultButton=undefined;$(this).dialog("close");}});dialog(msg,"提示",button).on("dialogclose",function(event,ui){if(defaultButton&&button.length>defaultButton)
button[defaultButton].click();});}