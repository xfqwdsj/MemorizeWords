$(function() {

	/*
		定义变量 - 开始
	*/
	
	var version = "1.2.3.13"  
	var versionS = "debug"
	var complete = false
	var allcount, helpcount, correct, name, notice, rightcount, trans, unit_xml, words, words_index, time, timer, timeresultM, timeresultS, timeresult, timecount, diyhelp, count, date, name
	
	/*
		定义变量 - 结束
		
		初始化 - 开始
	*/
	
	memorize_words()
	$("#version").html(versionS + " " +version)  
	version = versionS = null
	
	/*
		初始化 - 结束
		
		基本方法 - 开始
	*/
	
	$("#input-helpdiy").off("keydown").on("keydown",
	function(e) {
		if(e.keyCode == 13 && diyhelp != $("#input-helpdiy").val() && timer != null) {
			if($("#input-helpdiy").val() == 0) {
				$("#input-helpdiy").val("")
			}
			diyhelp = $("#input-helpdiy").val()
			memorize_words()
		}
	})
	$("#unit").off("change").on("change", 
	function() {
		memorize_words()  
	}) 
	$("#help").off("click").on("click",
	function() {
		if (!complete) {
			if($("#input-helpdiy").val() != 0) {
				$("#notice").html(words[words_index].name.substring(0, $("#input-helpdiy").val())) 
			} else if($("#input-helpdiy").val() == 0) {
				$("#notice").html(words[words_index].name)
			}
			helpcount++
		} else {
			count = "共默写" + allcount + "个单词 共提示" + helpcount + "次 使用提示字数" + diyhelp + " 用时" + timeresult + "\n获取分享链接？"
			if(confirm(count)) {
				name = prompt("请输入你的名字：", "没名字")
				if(diyhelp == "全部") {
					diyhelp = 0
				}
				if(name == null || name == "") {
					name = "没名字"
				}
				window.open("result.html?aff645cab7b897442173e9db545a7e11=" + date + "&0d11ccc47ab4ad4a233279a8909769d1=" + getKey() + "&unit=" + lockWords($("#unit").val()) + "&timer=" + lockTime(timeresult) + "&diyhelp=" + lockNumbers(diyhelp) + "&help=" + lockNumbers(helpcount) + "&name=" + lockWords(name), '_blank').location
				diyhelp = "全部"
				name = null
			}
		}
	})
	$("#play").off("click").on("click",
	function() {
		if (!complete) {
			new Audio("http://dict.youdao.com/speech?audio=" + words[words_index].name).play()
		} else {
			new Audio("/sounds/win.mp3").play()
		}
	})
	$("#again").off("click").on("click",
	function() {
		memorize_words()
	})
	$("#text").off("input").on("input",
	function() {
		var hint = $("#hint").html()
		$("#notice").html("")
		if (!complete) {
			if ($("#text").val().toLowerCase().trim() == words[words_index].name.trim().toLowerCase() ) {
				correct = true
			} else {
				correct = false
			}
		} else {
			$("#text").val("")
		}
	}) 
	$("#text").off("keydown").on("keydown",
	function(e) {
		if (e.keyCode == 13) {
			$("#notice").html("")
			if (correct == false && time == null) {
				$("#text").attr("class", "input-wrong")
				helpcount++
				$("#notice").html("<font color='red'>请输入正确的单词：" + words[words_index].name + "</font>")
				$("#text").val("")
				time = setTimeout(function() {
					$("#notice").html("")
					time = null
				},
				1000)
			} else if (correct == true) {
				setTimeout(function() {
					$("#text").attr("class", "myInput")
					if (++rightcount >= allcount) {
						clearInterval(timer)
						$("#text").val("") 
						$("#result").html("") 
						$("#notice").html("") 
						$("#help").html("统计") 
						$("#hint").html("<font color='green'>恭喜你 默写完成</font>")
						date = Date.parse(new Date())
						complete = true
						if(timeresult == "获取失败") {
							while(timecount >= 60) {
								timecount = timecount - 60
								timeresultM++
							}
							if(timecount < 10) {
								timeresultS = "0" + timecount
							} else if(timecount >= 10) {
								timeresultS = timecount
							} 
							timeresult = timeresultM + ":" + timeresultS
							timeresultM = timeresultS = timecount = 0
						}
						if(diyhelp == 0) {
							diyhelp = "全部"
						}
					} else {
						update()
					}
				},
				100)
			}
		}
	})
	function getKey() {
		if(date != null) {
			return date.toString().substring(4, 10) * date.toString().substring(0, 5)
		}
	}
	function lockWords(data) {
		var returnWords = ""
		$(data.split("")).each(function(index) {
			returnWords = returnWords + "/" + (parseInt($(this)[0].charCodeAt()) + parseInt(date.toString().substring(0, 5))) * parseInt(date.toString().substring(4, 10))
		})
		return returnWords
		returnWords = null
	}
	function lockNumbers(data) {
		return (parseInt(data) + parseInt(date.toString().substring(0, 5))) * parseInt(date.toString().substring(4, 10))
	}
	function lockTime(data) {
		data = data.replace(":", "/" + date.toString().substring(4, 10) * date.toString().substring(9, 10) + "/")
		dataArray = data.split("/")
		data = dataArray[0] + "/" + (parseInt(dataArray[1]) + (parseInt(dataArray[0]) * parseInt(date.toString().substring(8, 9)) + parseInt(dataArray[2]) * parseInt(date.toString().substring(9, 10))) * parseInt(date.toString().substring(4, 10))) + "/" + dataArray[2]
		return data
	}
	function startTimer() {
		$("#time").html(timecount)
		timer = setInterval(function(){
			$("#time").html(++timecount)
		},
		1000)
	}
	function randomsort(a, b) {
		return Math.random() > .5 ? -1 : 1  
	}
	function update() {
		correct = false
		$("#hint").html(words[++words_index].notice) 
		$("#text").val("") 
		$("#notice").html("")
		$("#result").html(rightcount + "/" + allcount)
	}
	
	/*
		基本方法 结束
	*/
	function memorize_words() {
		clearInterval(timer)
		$("#text").attr("class", "myInput")
		$("#text").val("")
		$("#hint").html("Loading...")
		$("#help").html("Please")
		$("#again").html("wait...")
		$("#result").html("0/0")
		var units = $("#unit").val()
		diyhelp = $("#input-helpdiy").val()
		words = new Array()
		complete = correct = false
		allcount = helpcount = rightcount = words_index = timecount = timeresultM = timeresultS = 0
		time = timer = count = null
		timeresult = "获取失败"
		
		//====================
		
		unit_xml = "/xml/words_" + units + ".xml"
		$.ajax({
			url: unit_xml,
			dataType: 'xml',
			type: 'GET',
			timeout: 5000,
			success: function(data) {
				$(data).find("item").each(function(index) {
					name = $(this).find("word").html() 
					trans = $(this).find("trans").html() 
					notice = trans.substring(9, trans.length - 3) 
					words[index] = {
						'name': name,
						'notice': notice
					}
					index = null
				}) 
				words.sort(randomsort)  
				allcount = words.length
				$("#hint").html(words[words_index].notice)
				$("#result").html(rightcount + "/" + allcount)
				$("#help").html("提示") 
				$("#again").html("重默")
				$("#notice").html("")
				startTimer()
				name = trans = notice = unit_xml = null
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