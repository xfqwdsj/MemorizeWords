---
title: 我的成果1.0
---

<script type="text/javascript" src="/jquery.js"></script>
<script type="text/javascript">
$(function() {
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
		var r = window.location.search.substr(1).match(reg)
		if(r != undefined) {
			return unescape(r[2])
		}
	}
	function getLocalTime(nS) {
		return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
	}
	function ifOtherChar(data) {
		var isArray = Array.isArray(data)
		if (isArray) {
			var isTrue = false
			$(data).each(function(index) {
				if (data[index].toString().search(/[^0-9]/) != -1) {
					isTrue = true
				}
			})
			if (isTrue) {
				return true
			} else {
				return false
			}
		} else {
			if (data.toString().search(/[^0-9]/) != -1) {
				return true
			} else {
				return false
			}
		}
	}
	console.log("反伪造已加载")
	$("#result").html("数据非法！伪造数据请严惩！")
	var time = getQueryString("aff645cab7b897442173e9db545a7e11") / 1000
	var key = getQueryString("0d11ccc47ab4ad4a233279a8909769d1")
	var unitLocked = getQueryString("unit").split("/")
	var timerLocked = getQueryString("timer").split("/")
	var diyhelp = getQueryString("diyhelp") / time.toString().substring(4, 10) - time.toString().substring(0, 5)
	var help = getQueryString("help") / time.toString().substring(4, 10) - time.toString().substring(0, 5)
	var nameLocked = getQueryString("name").split("/")
	if(ifOtherChar(time) == false && ifOtherChar(key) == false && ifOtherChar(unitLocked) == false && ifOtherChar(timerLocked) == false && ifOtherChar(diyhelp) == false && ifOtherChar(help) == false && ifOtherChar(nameLocked) == false) {
		console.log("反伪造基础关 - 已通过")
		if(time != undefined && time.toString().indexOf(".") == -1 && time.toString().indexOf("-") == -1) {
			console.log("反伪造第一关 - 已通过")
			if(time <= Date.parse(new Date()) / 1000) {
				console.log("反伪造第二关 - 已通过")
				if(time.toString().substring(4, 10) * time.toString().substring(0, 5) == key) {
					console.log("反伪造第三关 - 已通过")
					key = undefined
					var unit = ""
					var unitIf = false
					$(unitLocked).each(function(index) {
						if(index > 0) {
							if((unitLocked[index] / time.toString().substring(4, 10) - time.toString().substring(0, 5)).toString().indexOf(".") == -1 && (unitLocked[index] / time.toString().substring(4, 10) - time.toString().substring(0, 5)).toString().indexOf("-") == -1) {
								unit = unit + String.fromCharCode(unitLocked[index] / time.toString().substring(4, 10) - time.toString().substring(0, 5))
								if(index == unitLocked.length - 1) {
									unitIf = true
								}
							}
						}
					})
					unitLocked = undefined
					if(unitIf == true) {
						console.log("反伪造第四关 - 已通过")
						unitIf = undefined
						var timer = ""
						if(parseInt(timerLocked[1]) - (parseInt(timerLocked[0]) * parseInt(time.toString().substring(8, 9)) + parseInt(timerLocked[2]) * parseInt(time.toString().substring(9, 10))) * parseInt(time.toString().substring(4, 10)) == parseInt(time.toString().substring(4, 10)) * parseInt(time.toString().substring(9, 10))) {
							console.log("反伪造第五关 - 已通过")
							timer = timerLocked[0] + ":" + timerLocked[2]
							timerLocked = undefined
							if (diyhelp.toString().indexOf(".") == -1 && diyhelp.toString().indexOf("-") == -1) {
								console.log("反伪造第六关 - 已通过")
								if(diyhelp == 0) {
									diyhelp = "全部"
								}
								if(help.toString().indexOf(".") == -1 && help.toString().indexOf("-") == -1) {
									console.log("反伪造第七关 - 已通过")
									var name = ""
									var nameIf = false
									$(nameLocked).each(function(index) {
										if(index > 0) {
											if((nameLocked[index] / time.toString().substring(4, 10) - time.toString().substring(0, 5)).toString().indexOf(".") == -1 && (nameLocked[index] / time.toString().substring(4, 10) - time.toString().substring(0, 5)).toString().indexOf("-") == -1) {
												name = name + String.fromCharCode(nameLocked[index] / time.toString().substring(4, 10) - time.toString().substring(0, 5))
												if(index == nameLocked.length - 1) {
													nameIf = true
												}
											}
										}
									})
									nameLocked = undefined
									if(nameIf == true) {
										console.log("反伪造第八关 - 已通过")
										console.log("人工反伪造（错误将会非常明显） - 等待验证")
										nameIf = undefined
										time = getLocalTime(time)
										$("#result").html("我是" + name + " 我在" + time + "（检查数据时请务必检查本时间）默写了" + unit + "的单词 用时" + timer + " 使用提示字数" + diyhelp + " 提示了" + help + "次\n如内容显示错误 请考虑本数据有伪造数据嫌疑")
									}
								}
							}
						}
					}
				}
			}
		}
	}
})
</script>
<p id="result"></p>