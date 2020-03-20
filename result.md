---
title: 我的成果2.0
---

<script type="text/javascript" src="/jquery.js"></script>
<script type="text/javascript">
$(function() {

	AV.init({
		appId: "{{ site.mwordLC.appId }}",
		appKey: "{{ site.mwordLC.appKey }}",
		serverURLs: "{{ site.mwordLC.sURL }}"
	})

	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
		var r = window.location.search.substr(1).match(reg)
		if(r != null) {
			return unescape(r[2])
		}
	}
	function getLocalTime(nS) {
		return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ').replace(/(^\s*)|(\s*$)/g, "")
	}
	if(getQueryString("id") != null) {
		var query = new AV.Query("MwordsResult")
		var user = new AV.Query("_User")
		query.get(getQueryString("id")).then(function(res) {
			var id = res.get("userid")
			user.get(id).then(function(userres) {
				$("#result").html("我是" + userres.get("nickname") 
								+ " 我的唯一用户名是" + userres.get("username")
								+ " 我在" + res.createdAt.toLocaleString()
								+ " 默写了" + res.get("unit") + "的单词" 
								+ " 用时" + res.get("timer") 
								+ " 使用提示字数" + res.get("diyhelp") 
								+ " 提示了" + res.get("help") + "次")
				$("#result2").html("数据更新于" + res.updatedAt.toLocaleString())
				$("#result3").html("\n\n数据ID " + res.id)
			})
		})
	}
})
</script>
<!--
<style type="text/css">
	.back {
		background-color: #FF0000;
		height: 2px;
		margin-bottom: 5px;
		width: 100%;
	}
	.progress {
		background-color: #226DDD;
		width: 0%;
		height: 100%;
		transition: 1.5s;
	}
</style>
<div class="back">
	<div id="progress" class="progress"></div>
</div>
-->
<p id="result"></p>
<p id="result2"></p>
<p id="result3"></p>
<a href="/mword/#%E4%BC%A0%E9%80%81%E9%97%A8">我也试一试！</a>