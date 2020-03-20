---
title: 您已登录 小番茄我的世界 - MemorizeWords
---

<script type="text/javascript" src="/jquery.js"></script>
<script type="text/javascript">
AV.init({
	appId: "{{ site.mwordLC.appId }}",
	appKey: "{{ site.mwordLC.appKey }}",
	serverURLs: "{{ site.mwordLC.sURL }}"
})
var currentUser = AV.User.current()

$(function() {
	if(!currentUser) {
		window.location = "/mword/mword-login.html"
	} else {
		$("#username").html("用户名 " + currentUser._serverData.username)
		$("#nickname").html("昵称 " + currentUser._serverData.nickname)
		$("#email").html("邮箱 " + currentUser._serverData.email)
		if(currentUser._serverData.mobilePhoneNumber)
			$("#mobilePhoneNumber").html("手机号 " + currentUser._serverData.mobilePhoneNumber)
		else
			$("#mobilePhoneNumber").html("手机号 " + currentUser._serverData.mobilePhoneNumber + " <a href='https://wpa.qq.com/msgrd?v=3&uin=2996681473&site=qq&menu=yes'>添加（暂时只对特别用户开放直接添加手机号服务）</a>")
	}
})

$.verifyEmail = function() {
	if(currentUser._serverData.email != undefined)
		AV.User.requestEmailVerify(currentUser._serverData.email)
}
</script>
<p id="username"></p>
<p id="nickname"></p>
<p id="email"></p>
<p id="mobilePhoneNumber"></p>
<p><a href="javascript:AV.User.logOut(); window.location.href = ''">注销</a> <a href="/mword/#%E4%BC%A0%E9%80%81%E9%97%A8">背单词</a></p>
<style type="text/css">
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	input[type="number"] {
		-moz-appearance: textfield;
	}
	input {
		outline: none;
		text-align: center; 
		border-bottom: 2px solid #EEEEEE; 
		border-top: none; 
		border-left: none;
		border-right: none;
		background-color: rgba(0, 0, 0, 0);
	}
</style>