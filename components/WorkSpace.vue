/**
* Created by Pan on 2016-12-14.
*/
<template>
    <div id="work-space">
        <div id="editor-area">
            <div id="editor-area-top-bar">
                Work Space
                <div class="btn-group btn-group-sm pull-right" role="group">
                    <button type="button" class="btn btn-secondary">Left</button>
                    <button type="button" class="btn btn-secondary">center</button>
                    <button type="button" class="btn btn-secondary">right</button>
                </div>
            </div>

            <div id="editor-area-center"
                 @mousewheel="mouseWheel"
                 @click="pageClick"
            >
                <div id="page"
                     v-bind:style="{
                        width: pageWidth,
                        height: pageHeight,
                        transform: getPageScale,
                        transformOrigin: transformOrigin.x +' ' + transformOrigin.y,
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

            <div id="editor-area-bottom-bar">
                <div class="pull-right">
                    <div class="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-secondary" @click="setPageScale( parseFloat(pageScale) + 0.1 )">+
                        </button>
                    </div>
                    <div class="btn-group btn-group-sm" role="group">
                        <select @change="setPageScale( $event.target.value )"
                                v-bind="{ value: pageScale }"
                                style="
                            border-radius: 3px;
                            border-color: #ccc;
                            height: 27px;
                            "
                        >
                            <option v-for="item in scales" v-bind:value=" item.value ">{{ item.name }}</option>
                        </select>
                    </div>
                    <div class="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-secondary" @click="setPageScale( pageScale - 0.1 )">-</button>
                    </div>
                    <div class="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-secondary" @click="setPageScale( 1 )">100%</button>
                        <button type="button" class="btn btn-secondary" @click="resetPageToFill">Reset</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="area-split"></div>

        <div id="printer-area">
            <div id="printer-area-top-bar">PDF File</div>
            <div id="printer-area-center">
                <!--<iframe src="http://m.oschina.net"></iframe>-->
                <iframe></iframe>
            </div>
        </div>


    </div>
</template>

<script>
    import * as MUTATION_TYPES from "../store/mutationTypes"
    import {WIDGET_TYPES} from "./Types"
    import AppWidget  from "./Widget.vue"

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
                resetScale: 0,
                transformOrigin: {
                    x: "50%",
                    y: "50%"
                }
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
                this.transformOrigin.x = Math.round(( event.clientX - this.pageLeft - 70) * 100 / this.page.width) + "%";
                this.transformOrigin.y = Math.round(( event.clientY - this.pageTop - (56 + 30)) * 100 / this.page.height) + "%";

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
                this.transformOrigin.x = "50%";
                this.transformOrigin.y = "50%";
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

<style scoped>

    #work-space {
        display: flex;
        background-color: #929292;
        flex: 1;
        flex-direction: column;
        overflow: hidden;
    }

    #editor-area {
        display: flex;
        flex: 66.6666%;
        background-color: #bfbfbf;
        flex-direction: column;

    }

    #area-split {
        display: flex;
        height: 6px;
        background-color: #fcfcff;
    }

    #printer-area {
        display: flex;
        flex: auto;
        background-color: aqua;
        flex-direction: column;
    }

    #editor-area-top-bar, #printer-area-top-bar {
        width: 100%;
        height: 31px;
        border: 1px solid #838383;
        padding: 1px;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, #b8b8b8 100%);
    }

    #editor-area-center {
        overflow: hidden;
        width: 100%;
        flex: auto;
    }

    #editor-area-bottom-bar {
        width: 100%;
        border: 1px solid #838383;
        padding: 1px;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, #b8b8b8 100%);
    }

    #page {
        background-color: #ffffff;
        position: relative;
        outline-offset: 4px;
        outline: #c3c3c3 dashed 3px;
        border-radius: 2px;
        background-size: 100% 100%;

    }

    #printer-area-center {
        display: flex;
        background-color: #9f9c9e;
        flex: auto;
    }

    iframe {
        flex: auto;
    }
</style>