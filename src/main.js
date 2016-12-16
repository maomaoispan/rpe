import Vue from 'vue'
import App from './App.vue'

new Vue({
    el: '#app',
    render: h => h(App)
});

// $(function () {
//     var resize = function () {
//         var $win = $(window);
//         var $toolBar = $("#tool-bar");
//         var $space = $("#space");
//         var $file = $("#file");
//         var $protertyBar = $("#property-bar");
//         var $footer = $("#footer");
//
//
//         var headerHeight = 90;
//         var winWidth = $win.width();
//         var winHeight = $win.height();
//         var barHeigth = winHeight  - 152;
//         var pageWidth = $("#header").width() - $toolBar.width() - $protertyBar.width() + 15;
//
//         $toolBar.css({
//             height: barHeigth
//         });
//
//         $space.css({
//             width: pageWidth,
//         });
//
//         $file.css({
//             tempTop: $space.height() + 113,
//             height: winHeight - $space.height() - headerHeight - 103,
//             width: pageWidth
//         });
//
//         $protertyBar.css({
//             tempLeft: $win.width() - $protertyBar.width() - 14.5,
//             height: barHeigth
//         });
//
//         $footer.css({
//             tempTop: winHeight - $footer.height() - 20,
//             width: winWidth - 30
//         })
//     };
//     resize();
//     $(window).resize(resize);
//
//     Vue.nextTick(function () {
//         resize();
//     })
// });

