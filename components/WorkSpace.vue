/**
* Created by Pan on 2016-12-14.
*/
<template>
    <div id="work-space">
        <div class="title">
            Work Space
            <button
                    @click="save"
            >
                Save
            </button>
        </div>
        <div class="content"
             @mousewheel="mouseWheel"
             @click="pageClick"
        >
            <div id="page"
                 v-bind:style="{
                    width: pageWidth,
                    height: pageHeight,
                    transform: getPageScale,
                    left: pageLeft + 'px',
                    top: pageTop + 'px',
                    backgroundImage: 'url(' + page.backgroundImage + ')',
                 }"
                 @click="pageClick"
                 @mousedown="mouseDown"
                 @mouseup="mouseUp"
                 @mousemove="mouseMove"
                 @mouseout="mouseUp"

            >
                <app-widget v-for="item in widgets"
                            v-bind="{type: item.type, id: item.id}">
                </app-widget>
            </div>
        </div>
        <div>
            <button class="" @click="setPageScale( pageScale - 0.1 )">-</button>
            <button class="" @click="resetPageToFill">Reset</button>
            <select @change="setPageScale( $event.target.value )"
                    v-bind="{ value: pageScale }"
            >
                <option v-for="item in scales" v-bind:value=" item.value ">{{ item.name }}</option>
            </select>
            <button @click="setPageScale(1)">100%</button>
            <button class="" @click="setPageScale( parseFloat(pageScale) + 0.1 )">+</button>
        </div>
    </div>
</template>

<script>
    import * as MUTATION_TYPES from "../store/mutationTypes"
    import {WIDGET_TYPES} from "./Types"
    import AppWidget from "./Widget.vue"
    parseFloat()
    module.exports = {
        data: function () {
            return {
                pageLeft: 110,
                pageTop: 10,
                tempLeft: 0,
                tempTop: 0,
                isDown: false,
                moveStartX: 0,
                moveStartY: 0,
                margin: 15,
                resetScale: 0
            };
        },

        computed: {
            page: function () {
                return this.$store.getters.page;
            },
            widgets: function () {
                return this.$store.getters.widgets;
            },
            pageWidth: function () {
                return this.$store.getters.page.width + "px";
            },
            pageHeight: function () {
                return this.$store.getters.page.height + "px";
            },
            pageScale: function () {
                return this.$store.getters.config.pageScale;
            },
            getPageScale: function () {
                return "scale(" + this.$store.getters.config.pageScale + ")";
            },
            scales: function () {
                return [
                    {value: 0.3, name: "30%"},
                    {value: 0.4, name: "40%"},
                    {value: 0.5, name: "50%"},
                    {value: 0.6, name: "60%"},
                    {value: 0.7, name: "70%"},
                    {value: 0.8, name: "80%"},
                    {value: 0.9, name: "90%"},
                    {value: "1.0", name: "100%"},
                    {value: 1.1, name: "110%"},
                    {value: 1.2, name: "120%"},
                    {value: 1.3, name: "130%"},
                    {value: 1.4, name: "140%"},
                    {value: 1.5, name: "150%"},
                    {value: 1.6, name: "160%"},
                    {value: 1.7, name: "170%"},
                    {value: 1.8, name: "180%"},
                    {value: 1.9, name: "190%"},
                    {value: "2.0", name: "200%"},
                ]
            }
        },

        methods: {
            pageClick: function (event) {
                this.$store.commit(MUTATION_TYPES.ACTIVE_WIDGET, null);
            },

            setPageScale: function (scale) {
                let _scale = parseFloat(scale).toFixed(1);
                if (_scale >= 0.3 && _scale <= 2) {
                    this.$store.commit(MUTATION_TYPES.CONFIG_UPDATE, {pageScale: _scale});
                }
            },

            mouseDown: function (event) {
                this.tempLeft = parseFloat(event.target.style.left);
                this.tempTop = parseFloat(event.target.style.top);
                this.moveStartX = parseFloat(event.clientX);
                this.moveStartY = parseFloat(event.clientY);
                this.isDown = true;
            },

            mouseMove: function (event) {
                if (this.isDown) {
                    $(event.target).css({
                        cursor: "move"
                    });

                    var newLeft = Math.round(this.tempLeft + ( parseFloat(event.clientX) - parseFloat(this.moveStartX)));
                    var newTop = Math.round(this.tempTop + (parseFloat(event.clientY) - parseFloat(this.moveStartY)));

                    this.pageLeft = newLeft;
                    this.pageTop = newTop;
                }
            },

            mouseUp: function (event) {
                if (this.isDown) {
                    this.isDown = false;
                    $(event.target).css({
                        cursor: "default"
                    });
                }
            },

            mouseWheel: function (event) {
                if (event.deltaY > 0) {
                    this.setPageScale(parseFloat(this.pageScale) - 0.1);
                } else if (event.deltaY < 0) {
                    this.setPageScale(parseFloat(this.pageScale) + 0.1);
                }
            },

            getFillScale: function () {
                let pageWidth = this.$store.getters.page.width,
                    pageHeight = this.$store.getters.page.height,
                    _contentWidth = $("#page").parent().width(),
                    _contentHeight = $("#page").parent().height(),
                    scaleX = _contentWidth / (pageWidth + this.margin * 2),
                    scaleY = _contentHeight / (pageHeight + this.margin * 2);
                let scale = scaleX < scaleY ? scaleX : scaleY;
                this.resetScale = scale;
                return scale;
            },

            resetPageToFill: function () {
                let pageWidth = this.$store.getters.page.width,
                    pageHeight = this.$store.getters.page.height,
                    contentWidth = $("#page").parent().width(),
                    contentHeight = $("#page").parent().height();

                this.pageLeft = (contentWidth - pageWidth) / 2;
                this.pageTop = (contentHeight - pageHeight) / 2;
                this.setPageScale(this.getFillScale());
            },

            save: function () {
                this.$store.commit
            }
        },

        mounted: function () {
            this.resetPageToFill();
            var reset = this.resetPageToFill;
            $(window).resize(reset)
        },

        components: {
            AppWidget
        }
    }
</script>

<style>

    #work-space {
        float: left;
        height: 400px;
        width: calc(100% - 270px);
        background-color: #929292;

    }

    #work-space > .content {
        overflow: hidden;
        background-color: #d8d4d7;
        height: calc(100% - 60px);
    }

    #page {
        background-color: #ffffff;
        position: relative;
        outline-offset: 4px;
        outline: #c3c3c3 dashed 3px;
        border-radius: 2px;
        background-size: 100% 100%;
    }

    #space {
        background-color: rgba(121, 118, 119, 0.4);
        position: relative;
    }
</style>