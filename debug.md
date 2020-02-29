<script type="text/javascript" src="/jquery.js">
</script>
<script type="text/javascript">
$(function() {

	/*
		定义变量 - 开始
	*/
	
	var selected = "7b_u1"
	var version = "1.2.1.2"  
	var versionS = "debug"
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
	
	/*
		定义变量 - 结束
		
		初始化 - 开始
	*/
	
	memorize_words("7b_u1") 
	$("#version").html(versionS + " " +version)  
	version = undefined
	$("#again").html("重默")
	
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
			alert("共默写" + allcount + "个单词 共提示" + helpcount + "次")
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
		words = new Array()
		complete = false
		correct = false
		allcount = 0
		helpcount = 0 
		rightcount = 0
		value_index = 0
		words_index = 0
		
		//====================
		
		$("#help").html("提示") 
		$("#notice").html("")
		$("#text").val("")
		
		//====================
		
		unit_xml = "/xml/words_" + units + ".xml"
		$.ajax({
			url: unit_xml,
			dataType: 'xml',
			type: 'GET',
			timeout: 2000,
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
				$("#result").html("" + rightcount + "/" + allcount)
				name = undefined
				trans = undefined
				notice = undefined
			}
		}) 
		unit_xml = undefined
		
		//====================
		
		function randomsort(a, b) {
			return Math.random() > .5 ? -1 : 1  
		}
		function update() {
			correct = false
			$("#hint").html(words[++words_index].notice) 
			$("#text").val("") 
			$("#notice").html("")
			$("#result").html("" + rightcount + "/" + allcount)
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
				if (correct == false) {
					helpcount++
					$("#notice").html("<font color='red'>请输入正确的单词：" + words[words_index].name + "</font>")
					$("#text").val("")
					setTimeout(function() {
						$("#notice").html("")
					},
					1000)
				} else {
					setTimeout(function() {
						if (++rightcount >= allcount) {
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
</style>
<div style="text-align: center; padding:2rem 1rem;">
	<select id="unit">
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
	<div style="margin: auto;">
		<span id="hint">Loading...</span>
		<br />
		<input id="play" style="margin-left: 5px; border: none;" type="image" src="/images/play.png" />
	</div>
	<div style="margin: auto; margin-bottom: 10px;">
		<span id="notice" style="float: left"></span>
		<span id="result" style="float: right"></span>
	</div>
	<br />
	<input type="text" id="text" autocomplete="off" style="font-size: 20px; outline: none; text-align: center; height: 33px; width: 100%; border-bottom: 1px solid #dbdbdb; border-top:0px; border-left:0px; border-right:0px;" />
	<br />
	<button type="button" id="help" style="margin-top: 5px; margin-right: 10px;" class="bton">Please</button>
	<button type="button" id="again" style="margin-top: 5px;" class="bton">wait...</button>
	<br />
	<span id="version" style="float: right;"></p>
</div>