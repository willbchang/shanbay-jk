// ==UserScript==
// @name         Shanbay JK
// @namespace    https://github.com/willbchang/shanbay-jk
// @version      1.2.1
// @description  在扇贝单词网页版上让 j 拥有 1 跟 d 的功能，k 拥有 2 的功能
// @author       Will B Chang
// @match        https://web.shanbay.com/wordsweb/*
// @grant        GPL-3.0
// ==/UserScript==

(function () {
    'use strict';

    // 监听按键事件
    // keydown 会制止浏览器本身的快捷键，且同 keyup 都无法在检查拼写后通过 j 正常跳转
    document.addEventListener('keypress', ({repeat, key}) => {
        // 避免重复按键导致意外触发多个 j 的功能
        if (repeat) return

        // 避免在输入单词时输入 j 而触发 next 元素的点击事件所导致拼写无法完成的情况,
        //  并且确保在单词界面拼写正确后按 j 可以直接跳到下一个单词, 而不用返回原页面
        //  k 同理
        const isSpelling = document.querySelector('p[class*=index_show]')
            ?.textContent === "你的拼写还不正确，请继续尝试。"
            || document.querySelector('#checkAnswer')?.value === ''
        if (isSpelling) return

        // 从页面上获取认识、不认识、下一个、撤销四个元素
        const know = document.querySelector('div[class*=index_green]')
        const dontKnow = document.querySelector('div[class*=index_red]')
        const next = document.querySelector('div[class*=StudyPage_nextBtn]')
        const undo = document.querySelector('div[class*=Message_message] div span')

        // j: 如果按键是 j，然后页面上有 know 元素，则触发其点击事件，没有的话就触发 next 的点击事件
        // k: 同理
        if (key === 'j') click(know || next)
        if (key === 'k') click(dontKnow || undo)

        // 模拟鼠标点击
        function click(element) {
            const event = document.createEvent('Events');
            event.initEvent('click', true, false);
            element.dispatchEvent(event);
        }
    })
})();