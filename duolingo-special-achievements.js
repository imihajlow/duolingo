// ==UserScript==
// @name         Duolingo achievements
// @namespace    http://imihajlow.github.io/
// @version      1.0
// @updateURL    https://imihajlow.github.io/duolingo/duolingo-special-achievements.js
// @downloadURL  https://imihajlow.github.io/duolingo/duolingo-special-achievements.js
// @description  Add special achievements to Duolingo.
// @author       Ivan Mikhailov
// @match        https://www.duolingo.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        GM_getResourceURL
// @resource     hedgehog https://imihajlow.github.io/duolingo/img/hedgehog.svg
// @resource     hare https://imihajlow.github.io/duolingo/img/hare.svg
// ==/UserScript==

(function() {
    'use strict';

    var isRunning = false;

    function getAchievement(streak) {
        var days = 0;
        var url = "";
        if (streak < 60) {
            return null;
        } else if (streak < 90) {
            days = 60;
            url = GM_getResourceURL("hedgehog", "");
        } else {
            days = 90;
            url = GM_getResourceURL("hare", "");
        }
        return {
            "days" : days,
            "url" : url
        };
    }

    function getStreak() {
        return parseInt($("li.streak").first().text().trim());
    }

    function getUserName() {
        return $("span.name").first().text();
    }

    function injectHomePage(achievement) {
        var id = "special-achievement-home";
        if ($("#" + id).length) {
            // already injected
            return;
        }
        var container = $(".inner")[0];
        if (typeof container === 'undefined') {
            return;
        }
        $(container).prepend("\
            <div class='box-colored bg-white' id='" + id + "'>\
               <h2>Special Achievement</h2>\
               <img alt='special achievement' src='" + achievement["url"] + "' width='100%'>\
               <span class='btn btn-white btn-block'>\
                " + achievement["days"] + " days streak!</span>\
            </div>");
    }

    function injectProfilePage(achievement) {
        var id = "special-achievement-profile";
        if ($("#" + id).length) {
            // already injected
            return;
        }
        $("\
            <ul class='sidebar-stats'>\
            <li id='" + id + "'>\
                <h3 class='gray'>Special</h3>\
                <img alt='special achievement' src='" + achievement["url"] + "' width='100%'>\
            </li>\
            </ul>").insertBefore("ul.sidebar-stats");
    }

    function main() {
        var streak = getStreak();
        if (isNaN(streak)) {
            return;
        }
        console.log("Streak is", streak);
        var achievement = getAchievement(streak);
        if (!achievement) {
            return;
        }
        var userName = getUserName();
        if (!userName) {
            return;
        }

        isRunning = true;
        switch (window.location.pathname) {
        case "/":
            injectHomePage(achievement);
            break;
        case "/" + userName:
            injectProfilePage(achievement);
            break;
        default:
            break;
        }
        isRunning = false;
    }
    $(function () {
        main();
        $("body").bind("DOMSubtreeModified", function() {
            if (!isRunning) {
                main();
            }
        });
    });
})();