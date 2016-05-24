// Initialize your app
var myApp = new Framework7();


// Export selectors engine
var $$ = Dom7;

// Add view
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



/* ============== 判断是否登录，未登录则弹出登录user-intro界面 ============ */
myApp.onPageBeforeInit('index-home', function(page) {
    var userLoggedIn = false;
    if (Boolean(userLoggedIn)==true) {
        $$('.login-screen').removeClass('modal-in');
    }
}).trigger();



/* ============== 登录 ============ */
//var loginContainer = $$('.login-screen');
//loginContainer.find('.btn-login').on('click', function() {
//    var phone = loginContainer.find('input[name="phone"]').val();
//    var password = loginContainer.find('input[name="password"]').val();

//    if (phone == '888' && password == '888') {
//        $$('.login-screen').removeClass('modal-in');
//    } else{
//        myApp.alert('登录失败<br/>密码或账号错误', '提示');
//    };
//});

// 点击登陆输入框，图标高亮
$$('.login-form input').on('focusin', function() {
    $$(this).parent().parent().prev().find('i').addClass('active');
});
$$('.login-form input').on('focusout', function() {
    var $$inputIcon = $$(this).parent().parent().prev().find('i');
    if ($$(this).val()=='') {
        $$inputIcon.removeClass('active');
    } else{
        $$inputIcon.addClass('active');
    }
});





/* ============== 注册 ============ */
/*
var registerContainer = $$('#register');
registerContainer.find('#register-btn').on('click', function () {
var registerPhone = registerContainer.find('input[name="phone"]').val();
var registerPassword = registerContainer.find('input[name="code"]').val();
if (registerPhone == "") {
    myApp.alert('请输入正确手机号码', '提示', function () {

    });
}else {
    mainView.router.loadPage('register-info.html');
};
});
*/
// 服务协议
$$('.agreement-text').on('click', function () {
  myApp.modal({
    title:  '',
    text:   '<div class="agreement-wrap"><h3>一、声明与承诺 </h3>'+
            '<p>（一）在接受本协议或您以本公司允许的其他方式实际使用聚美医服务之前，请您仔细阅读本协议的全部内容（特别是以粗体标注的内容）。如果您不同意本协议的任意内容，或者无法准确理解本公司对条款的解释，请不要进行后续操作，包括但不限于不要接受本协议，不使用本服务。如果您对本协议的条款有疑问，请通过本公司客服渠道进行询问，本公司将向您解释条款内容。 </p>'+
            '<p>（二）您同意，如本公司需要对本协议进行变更或修改的，须通过网站公告的方式提前予以公布，公告期限届满后即时生效；若您在本协议内容公告变更生效后继续使用聚美医服务的，表示您已充分阅读、理解并接受变更后的协议内容，也将遵循变更后的协议内容使用聚美医服务；若您不同意变更后的协议内容，您应在变更生效前停止使用聚美医服务。 </p>'+
            '<p>（三）如您为无民事行为能力人或为限制民事行为能力人，例如您未满18周岁，则您应在监护人监护、指导下阅读本协议和使用本服务。若您非自然人，则您确认，在您取得聚美医账户时，或您以其他本公司允许的方式实际使用聚美医服务时，您为在中国大陆地区合法设立并开展经营活动或其他业务的法人或其他组织，且您订立并履行本协议不受您所属、所居住或开展经营活动或其他业务的国家或地区法律法规的排斥。不具备前述条件的，您应立即终止注册或停止使用聚美医服务。 </p>'+
            '<p>（四）您在使用聚美医服务时，应自行判断交易对方是否具有完全民事行为能力并自行决定是否使用聚美医服务与对方进行交易，且您应自行承担与此相关的所有风险。</p>'+
            '<p>（五）您确认，您在聚美医上发生的所有交易，您已经不可撤销地授权聚美医按照其制定的《聚美医网服务协议》及《聚美医规则》、《聚美医争议处理规范》、《交易超时规则》等规则进行处理；同时， 您不可撤销地授权本公司按照聚美医的指令将争议款项的全部或部分支付给交易一方或双方，同时本公司有权从聚美医获取您的相关信息（包括但不限于交易商品描述、物流信息、行为信息、账户相关信息等）。本公司按照聚美医的指令进行资金的止付、扣划完全来自于您的授权，本公司对因此给您造成的任何损失均不承担责任。但您确认，您使用聚美医服务时，您仍应完全遵守本协议及本公司制定的各项规则及页面提示等。</p></div>',
    buttons: [
      {
        text: '已阅读',
        bold: true
      },
    ]
  })
});



/* ============== 完善个人信息 ============ */
myApp.onPageInit('register-info', function (page) {
  var pageContainer = $$(page.container);
  pageContainer.find('#register-info-btn').on('click', function () {
    var phone = pageContainer.find('input[name="name"]').val();
    var password = pageContainer.find('input[name="hospital"]').val();
    if (phone == "") {
        myApp.alert('请填写您的姓名', '提示', function () {

        });
    }else {
        mainView.router.loadPage('index.html');
    };
  });
});



/* ============== 首页 ============ */

//var view1 = myApp.addView('#view-home');
//var view2 = myApp.addView('message-list.html', {
//    dynamicNavbar: true
//});
//var view3 = myApp.addView('#view-news');
//var view4 = myApp.addView('#view-more', {
//    dynamicNavbar: true
//});


/* ============== 停诊时间 ============ */


