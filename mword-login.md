---
title: 登录到 小番茄我的世界 - MemorizeWords
---

<script type="text/javascript" src="/jquery.js"></script>
<script type="text/javascript">
$(function() {

	AV.init({
		appId: "{{ site.mwordLC.appId }}",
		appKey: "{{ site.mwordLC.appKey }}",
		serverURLs: "{{ site.mwordLC.sURL }}"
	})
	
	var currentUser = AV.User.current()
	if(currentUser) {
		window.location = "/mword/mword-user.html"
	}
	$("#submit").off("click").on("click", 
	function() {
		if($("#username").val() != "" && $("#password").val() != "") {
			AV.User.logIn($("#username").val(), $("#password").val()).then(function (user) {
				window.location="/mword/mword-user.html"
			}, function (error) {
				alert(error)
			})
		} else {
			if ($("#username").val() == "") {
				$("#username").attr("class", "myInput-wrong")
			}
			if ($("#password").val() == "") {
				$("#password").attr("class", "myInput-wrong")
			}
		}
		$("#username").val("")
		$("#password").val("")
	})
	$("#username").off("focus").on("focus", 
	function() {
		$("#username").attr("class", "myInput")
	})
	$("#password").off("focus").on("focus", 
	function() {
		$("#password").attr("class", "myInput")
	})
	let media = window.matchMedia('(prefers-color-scheme: dark)')
	let callback = (e) => {
		let prefersDarkMode = e.matches
		if (prefersDarkMode) {
			$(".bton").addClass("darkBton")
		} else {
			$(".bton").removeClass("darkBton")
		}
	}
	if (typeof media.addEventListener === 'function') {
		media.addEventListener('change', callback)
	} else if (typeof media.addListener === 'function') {
		media.addListener(callback)
	}
})
</script>
<div style="text-align: center;">
	<p>账户信息不互通</p>
	<input type="text" id="username" placeholder="用户名" class="myInput"><br />
	<input type="password" id="password" placeholder="密码" class="myInput"><br />
	<button type="button" id="submit" class="bton">登录</button><br />
</div>
<p>没有账号？<a href="/mword/mword-signin.html">注册</a></p>
<style type="text/css">
	.myInput {
		margin-bottom: 5px;
		transition: 0.5s;
		outline: none;
		text-align: center; 
		border-bottom: 2px solid #EEEEEE; 
		border-top: none; 
		border-left: none;
		border-right: none;
		background-color: rgba(0, 0, 0, 0);
		width: 100%;
	}
	.myInput:focus {
		border-bottom: 3px solid #FF7070; 
	}
	.myInput-wrong {
		margin-bottom: 5px;
		transition: 0.5s;
		outline: none;
		text-align: center; 
		border-top: none; 
		border-left: none;
		border-right: none;
		border-bottom: 3px solid #FF0000; 
		background-color: rgba(0, 0, 0, 0);
		width: 100%;
	}
	.bton {
		padding:0.6rem 0.9rem;
		font-size: 0.9rem;
		color: rgba(0,0,0,0.7);
		background-color: rgba(0,0,0,0.08);
		outline:none;
		border-color: rgba(0,0,0,0.2);
		border-style: solid;
		border-width: 1px;
		border-radius: 0.3rem;
		transition: color 0.2s, background-color 0.2s, border-color 0.2s;
	}
	.bton:hover {
		color: rgba(0,0,0,0.8);
		text-decoration: none;
		background-color: rgba(0,0,0,0.2);
		border-color: rgba(0,0,0,0.3);
	}
	@media (prefers-color-scheme: dark) {
		.bton, .darkBton {
			color: ;
			background-color: rgba(50,50,50,50.08);
			border-color: rgba(255,255,255,0.2);
		}
		.bton:hover, .darkBton:hover {
			color: rgba(255,255,255,0.4);
			text-decoration: none;
			background-color: rgba(0,0,0,0.2);
		}
	}
</style>