---
title: 背单词
---

<script type="text/javascript">
var currentUser = MW.User.current()
$(function() {
	if(currentUser) {
		$("#user").html("您已登录：<a href='/mword/mword-user.html'>" + currentUser.get("username") + "</a>")
	}
	else {
		$("#user").html("请<a href='/mword/mword-login.html'>登录</a> 或<a href=''>刷新</a>")
	}
})
</script>
<div style="text-align: center;">
	<p id="user"></p>
</div>

**全局排行榜已开放！即将开放全局查询！**
## 更新日志
```
**版本 1.2.8 更新内容
- 优化注册、登录页面
**版本 1.2.7.5 更新内容
- 删除默写错误后的提示
**版本 1.2.7.2 更新内容
- 不允许上传速度更慢的数据并在发现这样数据的时候自动跳转
**版本 1.2.7.1 更新内容
- 变量全部设为中文
**版本 1.2.7 我的成果新版 更新内容
- 优化逻辑
- 公测排行榜
**版本 1.2.5 我的成果2.0 更新内容
- 成果完全上传到服务器 2020/3/20 9:45 前数据将全部失效
- 完全使用用户验证制
```
## 传送门
[开始背单词](mword.html) | [根据ID查询结果](result.html) | [全局排行榜](lb.html) | [GitHub项目主页（可下载源代码）](https://github.com/xfqwdsj/MemorizeWords)