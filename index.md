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

**即将开放查询功能 敬请期待！**
## 更新日志
```
  版本 1.2.7.1 更新内容
- 变量全部设为中文
  版本 1.2.7 我的成果新版 更新内容
- 优化逻辑
- 公测排行榜
  版本 1.2.5 我的成果2.0 更新内容
- 成果完全上传到服务器 2020/3/20 9:45 前数据将全部失效
- 完全使用用户验证制
  版本 1.2.3.13 更新内容
- 修改样式代码以适应新增加的夜间模式(需要从系统设置中打开)
- 优化部分逻辑
- 优化自定义提示的触发方法并修复由此产生的计时器BUG
  版本 1.2.3.9 更新内容
- 优化代码
- 优化布局
- 做了一些我自己也不知道什么的改动 反正是修复了BUG
- 修复获取分享链接功能
- 分享链接加密方案再次升级
- 支持增加名字
- 优化界面
```
## 传送门
[开始背单词](mword.html) | [根据ID查询结果](result.html) | [GitHub项目主页（可下载源代码）](https://github.com/xfqwdsj/MemorizeWords)