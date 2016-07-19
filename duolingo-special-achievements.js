// ==UserScript==
// @name         Duolingo achievements
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add special achievements to Duolingo.
// @author       Ivan Mikhailov
// @match        https://www.duolingo.com/*
// @require http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    var hedgehogUrl = "img/hedgehog.png";

    function main() {
        var container = $(".inner")[0];
        if (typeof container === 'undefined') {
            return;
        }
        $(container).prepend("\
            <div class='box-colored bg-white'>\
               <img alt='hedgehog' src='" + hedgehogUrl + "' width='100%'>\
            </div>");
    }
    main();
})();