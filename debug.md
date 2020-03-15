---
title: 背单词
---

<link rel="stylesheet" type="text/css" href="/css/normalize.css" />
<link rel="stylesheet" type="text/css" href="/css/component.css" />
<script type="text/javascript" src="/jquery.js"></script>
<script type="text/javascript" src="/js/debug.js"></script>
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
	@media (prefers-color-scheme: dark) {
		.bton, .darkBton {
			color: ;
			background-color: rgba(50,50,50,50.08);
			border-color: rgba(255,255,255,0.2);
		}
		.bton:hover, .darkBton:hover {
			color: rgba(255,255,255,0.4);
			text-decoration: none;
			background-color: rgba(0,0,0,0.2);
		}
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
	.myInput {
		transition: 0.5s;
		outline: none;
		text-align: center; 
		border-bottom: 2px solid #EEEEEE; 
		border-top: none; 
		border-left: none;
		border-right: none;
		background-color: rgba(0, 0, 0, 0);
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
		background-color: rgba(0, 0, 0, 0);
	}
	.select {
		outline: none;
		text-align: center; 
		border-top: none; 
		border-left: none;
		border-right: none;
		border-bottom: 2px solid #FF7070; 
		background-color: rgba(0, 0, 0, 0);
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
		<input class="myInput" type="text" id="text" autocomplete="off" style="height: 33px; width: 100%; font-size: 20px;" />
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