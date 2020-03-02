<link rel="stylesheet" type="text/css" href="/css/normalize.css" />
<link rel="stylesheet" type="text/css" href="/css/component.css" />
<script type="text/javascript" src="/jquery.js"></script>
<script type="text/javascript">
$(function() {

	/*
		定义变量 - 开始
	*/
	
	var selected = "7b_u1"
	var version = "1.2.2 - preview - 15"  
	var versionS = "release"
	var complete = false
	var allcount, helpcount, correct, name, notice, rightcount, trans, unit_xml, words, words_index, time, timer, timeresultM, timeresultS, timeresult, timecount, diyhelp
	
	/*
		定义变量 - 结束
		
		初始化 - 开始
	*/
	
	memorize_words("7b_u1") 
	$("#version").html(versionS + " " +version)  
	version = versionS = undefined
	
	/*
		初始化 - 结束
		
		基本方法 - 开始
	*/
	
	$("#input-helpdiy").off("input").on("input",
	function() {
		if($("#input-helpdiy").val() == 0) {
			$("#input-helpdiy").val("")
		}
		diyhelp = $("#input-helpdiy").val()
		memorize_words(selected)
	})
	$("#unit").off("change").on("change", 
	function() {
		selected = $(this).children('option:selected').val() 
		memorize_words(selected)  
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
			alert("共默写" + allcount + "个单词 共提示" + helpcount + "次 使用提示字数" + diyhelp + " 用时" + timeresult)
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
		memorize_words(selected)
	})
	function memorize_words(units) {
		clearInterval(timer)
		$("#text").attr("class", "myInput")
		diyhelp = $("#input-helpdiy").val()
		words = new Array()
		complete = correct = false
		allcount = helpcount = rightcount = words_index = timecount = timeresultM = timeresultS = 0
		time = timer = undefined
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
				$("#help").html("提示") 
				$("#again").html("重默")
				$("#notice").html("")
				name = trans = notice = unit_xml = undefined
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
						$("#text").attr("class", "myInput")
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
	.myInput, select {
		transition: 0.5s;
		outline: none;
		text-align: center; 
		border-bottom: 2px solid #EEEEEE; 
		border-top: none; 
		border-left: none;
		border-right: none;
	}
	.myInput:focus {
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
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	input[type="number"] {
		-moz-appearance: textfield;
	}
</style>
<div style="text-align: center; padding:2rem 1rem;">
	<div>
		<select class="select" id="unit" style="margin-bottom: 2px">
			<option value="7b_u1">Unit 1</option>
			<option value="7b_u2">Unit 2</option>
			<option value="7b_u3">Unit 3</option>
			<option value="7b_u4">Unit 4</option>
			<option value="7b_u5">Unit 5</option>
			<option value="7b_u6">Unit 6</option>
			<option value="7b_u7">Unit 7</option>
			<option value="7b_u8">Unit 8</option>
			<option value="test">测试</option>
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
	<div style="margin-top: 5px;">
		<button type="button" id="help" style="margin-right: 5px;" class="bton">Please</button>
		<button type="button" id="again" style="margin-left: 5px;" class="bton">wait...</button>
	</div>
	<div style="margin-bottom: 15px;">
		<span id="time" style="float: left">0</span>
		<span id="version" style="float: right;">version 0</span>
	</div>
</div>
<hr />
<div style="text-align: center; padding:2rem 1rem;">
	<div>
		<span>提示选项</span>
	</div>
	<div>
		<span><font color="red">设置一次即重默一次</font></span>
	</div>
	<div style="margin-top: 20px;">
		<span class="input input--akira">
			<input class="input__field input__field--akira" type="number" id="input-helpdiy" οnkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" />
			<label class="input__label input__label--akira" for="input-helpdiy">
				<span class="input__label-content input__label-content--akira">提示字数（留空为全部提示）</span>
			</label>
		</span>
	</div>
</div>
<script type="text/javascript" src="/js/classie.js"></script>
<script type="text/javascript">
(function() {
	// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	if (!String.prototype.trim) {
		(function() {
			// Make sure we trim BOM and NBSP
			var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
			String.prototype.trim = function() {
				return this.replace(rtrim, '')
			}
		})
	}
	[].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
		// in case the input is already filled..
		if( inputEl.value.trim() !== '' ) {
			classie.add( inputEl.parentNode, 'input--filled' )
		}
		// events:
		inputEl.addEventListener( 'focus', onInputFocus )
		inputEl.addEventListener( 'blur', onInputBlur )
	} )
	function onInputFocus( ev ) {
		classie.add( ev.target.parentNode, 'input--filled' )
	}
	function onInputBlur( ev ) {
		if( ev.target.value.trim() === '' ) {
			classie.remove( ev.target.parentNode, 'input--filled' )
		}
	}
})()
</script>