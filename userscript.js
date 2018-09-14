// ==UserScript==
// @name         BlackBarKilla
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       sanyabeast
// @match        https://*
// @match        https://*/*
// @match        http://*
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var BlackBarKilla = function(videoElement){
    	this.fit = false;
    	this.videoElement = videoElement;

    	window.addEventListener("keypress", function(evt){
    		if (evt.keyCode == 17 && evt.ctrlKey){
    			this.toggleState();
    		}
    	}.bind(this));

    };

    BlackBarKilla.prototype = {
    	toggleState : function(){
    		this.fit = !this.fit;

    		if (this.fit){
    			this.videoElement.style.objectFit = "cover";
    		} else {
    			this.videoElement.style.objectFit = "contain";
    		}
    	}
    };

    document.body.addEventListener("mouseover", function(evt){
    	if (evt.srcElement.tagName == "VIDEO" && !evt.srcElement.bbkilla){
    		evt.srcElement.bbkilla = new BlackBarKilla(evt.srcElement);
    	}
    });

})();