$(function() {

	/*
		定义变量 - 开始
	*/
	
	var 版本 = "1.2.7.1"
	var 完成 = false
	var 单词总数, 
		提示总数, 
		是否正确, 
		单词, 
		中文, 
		正确数量, 
		翻译数据, 
		单词表, 
		进度, 
		错误提示计时器, 
		计时器, 
		结果分, 
		结果秒, 
		最终计时, 
		计时秒, 
		自定义提示, 
		结果文案, 
		是否上传, 
		MwordsResult, 
		mwordsresult
	
	/*
		定义变量 - 结束
		
		初始化 - 开始
	*/
	
	背单词()
	$("#version").html("版本 " + 版本)  
	版本 =  null
	
	/*
		初始化 - 结束
		
		基本方法 - 开始
	*/
	
	$("#input-helpdiy").off("keydown").on("keydown",
	function(e) {
		if(e.keyCode == 13 && 自定义提示 != $("#input-helpdiy").val() && 计时器 != null) {
			if($("#input-helpdiy").val() == 0) {
				$("#input-helpdiy").val("")
			}
			自定义提示 = $("#input-helpdiy").val()
			背单词()
		}
	})
	$("#unit").off("change").on("change", 
	function() {
		背单词()  
	}) 
	$("#help").off("click").on("click",
	function() {
		if (!完成) {
			if($("#input-helpdiy").val() != 0) {
				$("#notice").html(单词表[进度].单词.substring(0, $("#input-helpdiy").val())) 
			} else if($("#input-helpdiy").val() == 0) {
				$("#notice").html(单词表[进度].单词)
			}
			提示总数++
		} else {
			if(confirm(结果文案)) {
				if(currentUser) {
					if(是否上传 == false) {
						MwordsResult = MW.Object.extend("MwordsResult")
						mwordsresult = new MwordsResult()
						mwordsresult.set("unit", $("#unit").val())
						mwordsresult.set("timer", 计时秒)
						mwordsresult.set("diyhelp", 自定义提示)
						mwordsresult.set("help", 提示总数)
						mwordsresult.set("userid", currentUser.id)
						mwordsresult.set("speed", 单词总数 / 计时秒)
						mwordsresult.save().then(function (saveresult) {
							新标签页打开("result.html?id=" + saveresult.id, '_blank')
							是否上传 = true
						}, function (error) {
							alert(error)
						})
					}
				} else {
					window.location = "/mword/mword-login.html"
				}
				MwordsResult = mwordsresult = null
			}
		}
	})
	$("#play").off("click").on("click",
	function() {
		if (!完成) {
			new Audio("http://dict.youdao.com/speech?audio=" + 单词表[进度].单词).play()
		} else {
			new Audio("/sounds/win.mp3").play()
		}
	})
	$("#again").off("click").on("click",
	function() {
		背单词()
	})
	$("#text").off("input").on("input",
	function() {
		var hint = $("#hint").html()
		$("#notice").html("")
		clearTimeout(错误提示计时器)
		if (!完成) {
			if ($("#text").val().toLowerCase().trim() == 单词表[进度].单词.trim().toLowerCase() ) {
				是否正确 = true
			} else {
				是否正确 = false
			}
		} else {
			$("#text").val("")
		}
	}) 
	$("#text").off("keydown").on("keydown",
	function(e) {
		if (e.keyCode == 13) {
			$("#notice").html("")
			if (是否正确 == false) {
				clearTimeout(错误提示计时器)
				$("#text").attr("class", "input-wrong")
				提示总数++
				$("#notice").html("<font color='red'>请输入正确的单词：" + 单词表[进度].单词 + "</font>")
				$("#text").val("")
				错误提示计时器 = setTimeout(function() {
					$("#notice").html("")
				},
				1000)
			} else if (是否正确 == true) {
				setTimeout(function() {
					$("#text").attr("class", "myInput")
					if (++正确数量 >= 单词总数) {
						clearInterval(计时器)
						$("#text").val("") 
						$("#result").html("") 
						$("#notice").html("") 
						$("#help").html("统计") 
						$("#hint").html("<font color='green'>恭喜你 默写完成</font>")
						完成 = true
						if(最终计时 == "获取失败") {
							结果秒 = 计时秒
							while(结果秒 >= 60) {
								结果秒 = 结果秒 - 60
								结果分++
							}
							if(结果秒 < 10) {
								结果秒 = "0" + 结果秒
							} 
							最终计时 = 结果分 + ":" + 结果秒
							结果分 = 结果秒 = 0
							if(自定义提示 == 0) {
								自定义提示 = "全部"
							}
							结果文案 = "共默写" + 单词总数 + "个单词 共提示" + 提示总数 + "次 使用提示字数" + 自定义提示 + " 用时" + 最终计时 + "\n上传到服务器？"
							if(自定义提示 == "全部") {
								自定义提示 = parseInt(0)
							}
							最终计时 = "获取失败"
						}
					} else {
						更新进度()
					}
				},
				100)
			}
		}
	})
	function 获取随机字符串(长度) {
		var ID = ""
		for(var i = 0; i < 长度; i++) {
			if(parseInt(Math.random() * (2 - 1 + 1) + 1) == 1) {
				if(parseInt(Math.random() * (2 - 1 + 1) + 1) == 1) {
					ID = ID + String.fromCharCode(parseInt(Math.random() * (90 - 65 + 1) + 65))
				} else {
					ID = ID + String.fromCharCode(parseInt(Math.random() * (122 - 97 + 1) + 97))
				}
			} else {
				ID = ID + parseInt(Math.random() * (9 - 0 + 1) + 0).toString()
			}
		}
		return ID
	}
	function 开始计时() {
		$("#time").html(计时秒)
		计时器 = setInterval(function(){
			$("#time").html(++计时秒)
		},
		1000)
	}
	function 随机排序(x, y) {
		return Math.random() > .5 ? -1 : 1  
	}
	function 更新进度() {
		是否正确 = false
		$("#hint").html(单词表[++进度].中文) 
		$("#text").val("") 
		$("#notice").html("")
		$("#result").html(正确数量 + "/" + 单词总数)
	}
	function 新标签页打开(url) {
		var el = document.createElement("a")
		document.body.appendChild(el)
		el.href = url
		el.target = '_new'
		el.click()
		document.body.removeChild(el)
	}
	
	/*
		基本方法 结束
	*/
	function 背单词() {
		clearInterval(计时器)
		$("#text").attr("class", "myInput")
		$("#text").val("")
		$("#hint").html("Loading...")
		$("#help").html("Please")
		$("#again").html("wait...")
		$("#result").html("0/0")
		var units = $("#unit").val()
		自定义提示 = $("#input-helpdiy").val()
		单词表 = new Array()
		完成 = 是否正确 = false
		单词总数 = 提示总数 = 正确数量 = 进度 = 计时秒 = 结果分 = 结果秒 = 0
		错误提示计时器 = 计时器 = 结果文案 = null
		是否上传 = false
		最终计时 = "获取失败"

		//====================
		
		$.ajax({
			url: "/xml/words_" + units + ".xml",
			dataType: 'xml',
			type: 'GET',
			timeout: 5000,
			success: function(data) {
				$(data).find("item").each(function(index) {
					单词 = $(this).find("word").html() 
					翻译数据 = $(this).find("trans").html() 
					中文 = 翻译数据.substring(9, 翻译数据.length - 3) 
					单词表[index] = {
						'单词': 单词,
						'中文': 中文
					}
					index = null
				}) 
				单词表.sort(随机排序)
				单词总数 = 单词表.length
				$("#hint").html(单词表[进度].中文)
				$("#result").html(正确数量 + "/" + 单词总数)
				$("#help").html("提示") 
				$("#again").html("重默")
				$("#notice").html("")
				开始计时()
				单词 = 翻译数据 = 中文 = null
			}
		})  
	}
	units = null
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