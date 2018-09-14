// ==UserScript==
// @name         BlackBarKilla
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*
// @match        https://*/*
// @match        http://*
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var BlackBarKilla = function(videoElement){
    	this.videoElement = videoElement;
    	this.dom = this.$html2dom([
    		"<div class='bbkilla'>",
    		"	<div class='bbkilla-trigger'>",
    		"		<div class='icon default'>",
    		"			<div class='inner'></div>",
    		"		</div>",
    		"	</div>",
    		"</div>"
    	].join("\n"));

    	this.dom.videoElement = videoElement;
    	document.body.appendChild(this.dom);

    	this.videoElement.addEventListener("mouseover", this.onVideoElementHovered.bind(this));	
    	this.videoElement.addEventListener("mousemove", this.onVideoElementHovered.bind(this));	

    	this.$updateStyleSheet();
    };

    BlackBarKilla.prototype = {
    	detectBlackBars : function(videoElement){
    		var ew = videoElement.getBoundingClientRect().width;
    		var eh = videoElement.getBoundingClientRect().height;

    		var vw = videoElement.videoWidth;
    		var vh = videoElement.videoHeight;

    		return (vh * (ew / vw)) / eh;

    	},
    	onVideoElementHovered : function(){
    		var videoElementBoundingRect = this.videoElement.getBoundingClientRect();
    		this.dom.style.left = videoElementBoundingRect.left + "px";
    		this.dom.style.top = videoElementBoundingRect.top + "px";
    	},
    	onVideoElementMousemove : function(){

    	},
    	$html2dom : function(html){
    		var temp = document.createElement("div");
    		temp.innerHTML = html;
    		var result = temp.children[0];
    		temp.remove();
    		return result;
    	},
    	$updateStyleSheet : function(){
    		var styleElement = document.querySelector(".bbkilla-stylesheet");

    		if (styleElement){
    			return;
    		}

    		styleElement = document.createElement("style");
    		styleElement.type = "text/css";
    		styleElement.classList.add("bbkilla-stylesheet");
			styleElement.appendChild(document.createTextNode(""));
			document.head.appendChild(styleElement);

			styleElement.innerText = [
				".bbkilla { position: fixed; z-index: 999999; visibility: visible; background: black; color: white; }",
				".icon { border: 1px solid #3c3c3c; }",
				".icon .inner { width: 32px; height: 24px; background: white; box-sizing: border-box; transition: 0.2s ease-out; }",
				".icon.default .inner { border-top: 0px solid black; border-bottom: 0px solid black; }",
				".icon.fullscreen .inner { border-top: 6px solid black; border-bottom: 6px solid black; }",
			].join("\n");
    	}
    };

    document.body.addEventListener("mouseover", function(evt){
    	if (evt.srcElement.tagName == "VIDEO" && !evt.srcElement.bbkilla){
    		evt.srcElement.bbkilla = new BlackBarKilla(evt.srcElement);
    	}
    });

})();