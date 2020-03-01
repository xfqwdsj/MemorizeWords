<script type="text/javascript" src="/jquery.js">
</script>
<script type="text/javascript">
$(function() {

	/*
		定义变量 - 开始
	*/
	
	var selected = "7b_u1"
	var version = "1.2.2 - preview - 8"  
	var versionS = "release"
	var complete = false
	var allcount
	var audio
	var helpcount
	var correct
	var name
	var notice
	var rightcount
	var trans
	var unit_xml
	var value_index
	var words
	var words_index
	var time
	var timer
	var timeresultM
	var timeresultS
	var timeresult
	
	/*
		定义变量 - 结束
		
		初始化 - 开始
	*/
	
	memorize_words("7b_u1") 
	$("#version").html(versionS + " " +version)  
	version = undefined
	
	/*
		初始化 - 结束
		
		基本方法 - 开始
	*/
	
	$("#unit").off("change").on("change", 
	function() {
		selected = $(this).children('option:selected').val() 
		memorize_words(selected)  
	}) 
	$("#help").off("click").on("click",
	function() {
		if (!complete) {
			if(versionS == "release") {
				$("#notice").html(words[words_index].name.substring(0, 2)) 
			} else {
				$("#notice").html(words[words_index].name)
			}
			helpcount++
		} else {
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
				timeresultM = 0
				timeresultS = 0
				timecount = 0
			}
			alert("共默写" + allcount + "个单词 共提示" + helpcount + "次 用时" + timeresult)
		}
	})
	$("#play").off("click").on("click",
	function() {
		if (!complete) {
			audio = new Audio("http://dict.youdao.com/speech?audio=" + words[words_index].name)
			audio.play()
		} else {
			audio = new Audio("/sounds/win.mp3")
			audio.play()
		}
	})
	$("#again").off("click").on("click",
	function() {
		memorize_words(selected)
	})
	function memorize_words(units) {
		clearInterval(timer)
		words = new Array()
		complete = false
		correct = false
		allcount = 0
		helpcount = 0 
		rightcount = 0
		value_index = 0
		words_index = 0
		time = undefined
		timer = undefined
		timecount = 0
		timeresultM = 0
		timeresultS = 0
		timeresult = "获取失败"
		
		//====================
		
		$("#text").val("")
		$("#hint").html("Loading...")
		$("#help").html("Please")
		$("#again").html("wait...")
		$("#result").html("0/0")
		
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
					index = undefined
				}) 
				words.sort(randomsort)  
				allcount = words.length
				$("#hint").html(words[words_index].notice)
				$("#result").html(rightcount + "/" + allcount)
				unit_xml = undefined
				$("#help").html("提示") 
				$("#again").html("重默")
				$("#notice").html("")
				name = undefined
				trans = undefined
				notice = undefined
			}
		}) 
		
		//====================
		
		$("#time").html(timecount)
		timer = setInterval(function(){
			$("#time").html(++timecount)
		},
		1000)
		
		//====================
		
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
		$("#text").off("input").on("input",
		function() {
			var hint = $("#hint").html()
			$("#notice").html("")
			if (!complete) {
				var value = words[words_index].name.trim() 
				value = value.toLowerCase() 
				if ($("#text").val().toLowerCase().trim() == value) {
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
				if (correct == false && time == undefined) {
					$("#text").attr("class", "input-wrong")
					helpcount++
					$("#notice").html("<font color='red'>请输入正确的单词：" + words[words_index].name + "</font>")
					$("#text").val("")
					time = setTimeout(function() {
						$("#notice").html("")
						time = undefined
					},
					1000)
				} else if (correct == true) {
					setTimeout(function() {
						$("#text").attr("class", "input")
						if (++rightcount >= allcount) {
							clearInterval(timer)
							$("#text").val("") 
							$("#result").html("") 
							$("#notice").html("") 
							$("#help").html("统计") 
							$("#hint").html("<font color='green'>恭喜你 默写完成</font>")
							complete = true
						} else {
							update()
						}
					},
					100)
				}
			}
		}) 
	}
	
	/*
		基本方法 - 结束
	*/
	
})
</script>
<style type="text/css">
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
	.play {
		background: url('/images/youdao-img.png') no-repeat;
		background-position: -119px 3px; 
		border: none; 
		width: 16px; 
		height: 25px;
		outline: none;
	}
	.play:hover {
		background-position: -90px 3px; 
	}
	.input, select {
		transition: 0.5s;
		outline: none;
		text-align: center; 
		border-bottom: 2px solid #EEEEEE; 
		border-top: none; 
		border-left: none;
		border-right: none;
	}
	.input:focus {
		border-bottom: 3px solid #30FF30; 
	}
	.input-wrong {
		transition: 0.5s;
		outline: none;
		text-align: center; 
		border-top: none; 
		border-left: none;
		border-right: none;
		border-bottom: 3px solid #FF0000; 
	}
	.select:focus {
		border-bottom: 2px solid #FF7070; 
	}
</style>
<div style="text-align: center; padding:2rem 1rem;">
	<div>
		<select class="select" id="unit" style="margin-bottom: 2px">
			<option value="7b_u1">
				Unit 1
			</option>
			<option value="7b_u2">
				Unit 2
			</option>
			<option value="7b_u3">
				Unit 3
			</option>
			<option value="7b_u4">
				Unit 4
			</option>
			<option value="7b_u5">
				Unit 5
			</option>
			<option value="7b_u6">
				Unit 6
			</option>
			<option value="7b_u7">
				Unit 7
			</option>
			<option value="7b_u8">
				Unit 8
			</option>
			<option value="test">
				测试
			</option>
		</select>
	</div>
	<div>
		<span id="hint">Loading...</span>
	</div>
	<div>
		<input id="play" class="play" type="button" />
	</div>
	<div style="margin-bottom: 15px;">
		<span id="notice" style="float: left">就快好了！ ヾ(≧▽≦*)o</span>
		<span id="result" style="float: right">0/0</span>
	</div>
	<div>
		<input class="input" type="text" id="text" autocomplete="off" style="height: 33px; width: 100%; font-size: 20px;" />
	</div>
	<div>
		<button type="button" id="help" style="margin-top: 5px; margin-right: 10px;" class="bton">Please</button>
		<button type="button" id="again" style="margin-top: 5px;" class="bton">wait...</button>
	</div>
	<div style="margin-bottom: 15px;">
		<span id="time" style="float: left">0</span>
		<span id="version" style="float: right;">version 0</span>
	</div>
</div>