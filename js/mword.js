$(function() {

	/*
		定义变量 - 开始
	*/
	
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
		计时器,
		结果分, 
		结果秒, 
		最终计时, 
		计时秒, 
		自定义提示, 
		结果文案, 
		是否上传, 
		速度, 
		加载中,
		MwordsResult, 
		mwordsresult
	
	/*
		定义变量 - 结束
		
		初始化 - 开始
	*/
	
	背单词()
	
	/*
		初始化 - 结束
		
		基本方法 - 开始
	*/
	
	$("#选项自定义提示").off("keydown").on("keydown",
	function(e) {
		if(e.keyCode == 13 && 自定义提示 != $("#选项自定义提示").val() && 加载中 != false) {
			if($("#选项自定义提示").val() == 0) {
				$("#选项自定义提示").val("")
			}
			自定义提示 = $("#选项自定义提示").val()
			背单词()
		}
	})
	$("#单元").off("change").on("change", 
	function() {
		背单词()  
	})
	$("#按钮左").off("click").on("click",
	function() {
		if (!完成) {
			if($("#选项自定义提示").val() != 0) {
				$("#文左上").html(单词表[进度].单词.substring(0, $("#选项自定义提示").val())) 
			} else if($("#选项自定义提示").val() == 0) {
				$("#文左上").html(单词表[进度].单词)
			}
			提示总数++
		} else {
			if(confirm(结果文案)) {
				if(currentUser) {
					if(是否上传 == false) {
						var 结果查询 = new MW.Query("MwordsResult")
						var 允许上传 = true
						var 记录
						结果查询.equalTo("userid", currentUser.id)
						结果查询.equalTo("unit", $("#单元").val())
						结果查询.find().then(function (查询结果) {
							if(查询结果.length > 0) {
								查询结果.sort(排序)
								$(查询结果).each(function(index) {
									if(查询结果[index].get("speed") <= 速度) {
										MW.Object.createWithoutData("MwordsResult", 查询结果[index].id).destroy()
									} else {
										允许上传 = false
										记录 = 查询结果[index].id
									}
								})
							}
							if(允许上传 != false) {
								MwordsResult = MW.Object.extend("MwordsResult")
								mwordsresult = new MwordsResult()
								mwordsresult.set("unit", $("#单元").val())
								mwordsresult.set("timer", 计时秒)
								mwordsresult.set("diyhelp", 自定义提示)
								mwordsresult.set("help", 提示总数)
								mwordsresult.set("userid", currentUser.id)
								mwordsresult.set("speed", 速度)
								mwordsresult.save().then(function (saveresult) {
									新标签页打开("result.html?id=" + saveresult.id)
									是否上传 = true
								}, function (error) {
									alert(error)
								})
							} else {
								if(confirm("你有一个成绩更好的记录 要跳转吗？")) {
									新标签页打开("result.html?id=" + 记录)
									是否上传 = true
								}
							}
						}, function(e) {
							console.log(e)
						})
					} else {
						alert("你已经上传/跳转过了！")
					}
				} else {
					window.location = "/mword/mword-login.html"
				}
				MwordsResult = mwordsresult = null
			}
		}
	})
	$("#播放").off("click").on("click",
	function() {
		if (!完成) {-
			new Audio("http://dict.youdao.com/speech?audio=" + 单词表[进度].单词).play()
		} else {
			new Audio("/sounds/win.mp3").play()
		}
	})
	$("#按钮右").off("click").on("click",
	function() {
		if(加载中 == false) {
			背单词()
		}
	})
	$("#输入").off("input").on("input",
	function() {
		var hint = $("#顶部").html()
		$("#文左上").html("")
		if (!完成) {
			if ($("#输入").val().toLowerCase().trim() == 单词表[进度].单词.trim().toLowerCase() ) {
				是否正确 = true
			} else {
				是否正确 = false
			}
		} else {
			$("#输入").val("")
		}
	}) 
	$("#输入").off("keydown").on("keydown",
	function(e) {
		if (e.keyCode == 13) {
			$("#文左上").html("")
			if (是否正确 == false) {
				$("#输入").attr("class", "input-wrong")
				$("#文左上").html("<font color='red'>请输入正确的单词</font>")
				$("#输入").val("")
			} else if (是否正确 == true) {
				setTimeout(function() {
					$("#输入").attr("class", "myInput")
					if (++正确数量 >= 单词总数) {
						clearInterval(计时器)
						$("#输入").val("") 
						$("#文右上").html("") 
						$("#文左上").html("") 
						$("#按钮左").html("统计") 
						$("#顶部").html("<font color='green'>恭喜你 默写完成</font>")
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
							速度 = 单词总数 / 计时秒
							if(自定义提示 == 0) {
								自定义提示 = "全部"
							}
							结果文案 = "共默写" + 单词总数 + "个单词 共提示" + 提示总数 + "次 使用提示字数" + 自定义提示 + " 用时" + 最终计时 + " 速度" + 速度 + "个单词/秒\n上传到服务器？"
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
		clearInterval(计时器)
		$("#文左下").html(计时秒)
		计时器 = setInterval(function(){
			$("#文左下").html(++计时秒)
		},
		1000)
	}
	function 随机排序(x, y) {
		return Math.random() > .5 ? -1 : 1 
	}
	function 更新进度() {
		是否正确 = false
		$("#顶部").html(单词表[++进度].中文) 
		$("#输入").val("") 
		$("#文左上").html("")
		$("#文右上").html(正确数量 + "/" + 单词总数)
	}
	function 新标签页打开(url) {
		var el = document.createElement("a")
		document.body.appendChild(el)
		el.href = url
		el.target = '_new'
		el.click()
		document.body.removeChild(el)
	}
	function 排序(x, y){
		return y.get("speed") - x.get("speed")
	}
	
	/*
		基本方法 结束
	*/
	function 背单词() {
		$("#输入").attr("class", "myInput")
		$("#输入").val("")
		$("#顶部").html("Loading...")
		$("#按钮左").html("Please")
		$("#按钮右").html("wait...")
		$("#文右上").html("0/0")
		自定义提示 = $("#选项自定义提示").val()
		单词表 = new Array()
		加载中 = true
		完成 = 是否正确 = 是否上传 = false
		单词总数 = 提示总数 = 正确数量 = 进度 = 计时秒 = 结果分 = 结果秒 = 0
		结果文案 = null
		最终计时 = "获取失败"

		//====================
		
		$.ajax({
			url: "/xml/words_" + $("#单元").val() + ".xml",
			dataType: 'xml',
			type: 'GET',
			timeout: 5000,
			success: function(data) {
				加载中 = false
				$(data).find("item").each(function(index) {
					单词 = $(this).find("word").html() 
					翻译数据 = $(this).find("trans").html() 
					中文 = 翻译数据.substring(9, 翻译数据.length - 3) 
					单词表[index] = {
						'单词': 单词,
						'中文': 中文
					}
				}) 
				单词表.sort(随机排序)
				单词总数 = 单词表.length
				$("#顶部").html(单词表[进度].中文)
				$("#文右上").html(正确数量 + "/" + 单词总数)
				$("#按钮左").html("提示") 
				$("#按钮右").html("重默")
				$("#文左上").html("")
				开始计时()
				单词 = 翻译数据 = 中文 = null
			}
		})
	}


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