/**
* Created by Pan on 2016-12-14.
*/
<template>
    <div id="work-space"
         v-bind:style="{ flexFlow: splitMode }"
         @mousedown="spaceMouseDown"
         @mouseup="spaceMouseUp"
         @mousemove="spaceMouseMove"
    >
        <div id="editor-area"
             v-bind:style="{ flex: editorFlex }"
        >
            <div class="item-header">
                <div>Work Space</div>
                <div>
                    <div class="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-secondary">Left</button>
                        <button type="button" class="btn btn-secondary">center</button>
                        <button type="button" class="btn btn-secondary">right</button>
                    </div>
                    <div class="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-secondary">top</button>
                        <button type="button" class="btn btn-secondary">up</button>
                        <button type="button" class="btn btn-secondary">down</button>
                        <button type="button" class="btn btn-secondary">bottom</button>
                    </div>

                </div>
                <div class="btn-group btn-group-sm" role="group">
                    <button type="button" class="btn btn-secondary" @click="genaratePdf">Generate</button>
                </div>
            </div>

            <div id="editor-area-center"
                 @mousewheel="editorMouseWheel"
                 @click="editorClick"
            >
                <div id="page"
                     v-bind:style="{
                        width: pageWidth,
                        height: pageHeight,
                        transform: getPageScale,
                        transformOrigin: pageTransformOrigin.x +' ' + pageTransformOrigin.y,
                        left: pageLeft + 'px',
                        top: pageTop + 'px',
                        backgroundImage: 'url(' + page.backgroundImage + ')',
                        }"
                     @click="editorClick"
                     @mousedown="pageMouseDown"
                     @mouseup="pageMouseUp"
                     @mousemove="pageMouseMove"
                     @mouseout="pageMouseUp"

                >
                    <app-widget v-for="item in widgets"
                                v-bind="{type: item.type, id: item.id}">
                    </app-widget>
                </div>
            </div>

            <div class="item-footer">
                <div id="editor-area-msg">Message:Please input a number!</div>
                <div class="pull-right">
                    <div class="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-secondary"
                                @click="resetPageToFill"
                        >Reset
                        </button>

                        <button type="button" class="btn btn-secondary"
                                @click="setPageScale( parseFloat(pageScale) + 0.1 )"
                        >+
                        </button>
                    </div>
                    <div class="btn-group btn-group-sm" role="group">
                        <select @change="setPageScale( $event.target.value )"
                                v-bind="{ value: pageScale }"
                                style="
                                    border-radius: 3px;
                                    border-color: #ccc;
                                    height: 26.5px;
                                    "
                        >
                            <option v-for="item in scales" v-bind:value=" item.value ">{{ item.name }}</option>
                        </select>
                    </div>
                    <div class="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-secondary" @click="setPageScale( pageScale - 0.1 )">-
                        </button>

                        <button type="button" class="btn btn-secondary" @click="setPageScale( 1 )">100%</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="area-split" @mousedown="splitMouseDown" @mousemove="splitMouseMove" @mouseup="splitMouseUp"></div>

        <div id="printer-area">
            <div class="item-header">PDF File</div>
            <div id="printer-area-center">
                <iframe  v-show="!splitIsDown" src="http://m.oschina.net"></iframe>
                <!--&lt;!&ndash;<iframe></iframe>&ndash;&gt;-->
            </div>
        </div>


    </div>
</template>

<script>
    import * as MUTATION_TYPES from "../store/mutationTypes"
    import * as TYPES from "./Types"
    import AppWidget  from "./Widget.vue"

    module.exports = {
        data: function () {
            return {
                pageLeft: 110,
                pageTop: 10,
                pageTempLeft: 0,
                pageTempTop: 0,
                pageIsDown: false,
                pageMoveStartX: 0,
                pageMoveStartY: 0,
                pageMargin: 15,
                pageResetScale: 0,
                pageTransformOrigin: {
                    x: "50%",
                    y: "50%"
                },

                splitIsDown: false,
                splitMoveStartX: 0,
                splitMoveStartY: 0,

                editorFlexSize: 300,
                editorFlexTempSize: 0
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
                    {value: 0.1, name: "10%"},
                    {value: 0.2, name: "20%"},
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
            },
            splitMode: function () {
                if (this.$store.getters.config.workspaceSplit === TYPES.WORKSPACE_SPLIT.HORIZONAL) {
                    return "row";
                }
                return "column";
            },

            editorFlex: function () {
                return "0 0 " + this.editorFlexSize + "px";
            }
        },

        methods: {
            editorClick: function (event) {
                this.$store.commit(MUTATION_TYPES.ACTIVE_WIDGET, null);
            },

            setPageScale: function (scale) {
                let _scale = parseFloat(scale).toFixed(1);
                if (_scale >= 0.1 && _scale <= 2) {
                    this.$store.commit(MUTATION_TYPES.CONFIG_UPDATE, {pageScale: _scale});
                }
            },

            pageMouseDown: function (event) {
                this.pageTempLeft = parseFloat(event.target.style.left);
                this.pageTempTop = parseFloat(event.target.style.top);
                this.pageMoveStartX = parseFloat(event.clientX);
                this.pageMoveStartY = parseFloat(event.clientY);
                this.pageIsDown = true;
            },

            pageMouseMove: function (event) {
                if (this.pageIsDown) {
                    $(event.target).css({
                        cursor: "move"
                    });

                    var newLeft = Math.round(this.pageTempLeft + ( parseFloat(event.clientX) - parseFloat(this.pageMoveStartX)));
                    var newTop = Math.round(this.pageTempTop + (parseFloat(event.clientY) - parseFloat(this.pageMoveStartY)));

                    this.pageLeft = newLeft;
                    this.pageTop = newTop;
                }
            },

            pageMouseUp: function (event) {
                if (this.pageIsDown) {
                    this.pageIsDown = false;
                    $(event.target).css({
                        cursor: "default"
                    });
                }
            },

            editorMouseWheel: function (event) {
                this.pageTransformOrigin.x = Math.round(( event.clientX - this.pageLeft - 70) * 100 / this.page.width) + "%";
                this.pageTransformOrigin.y = Math.round(( event.clientY - this.pageTop - (56 + 30)) * 100 / this.page.height) + "%";

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
                    scaleX = _contentWidth / (pageWidth + this.pageMargin * 2),
                    scaleY = _contentHeight / (pageHeight + this.pageMargin * 2);
                let scale = scaleX < scaleY ? scaleX : scaleY;
                this.pageResetScale = scale;
                return scale;
            },

            resetPageToFill: function () {
                let pageWidth = this.$store.getters.page.width,
                    pageHeight = this.$store.getters.page.height,
                    contentWidth = $("#page").parent().width(),
                    contentHeight = $("#page").parent().height();

                this.pageLeft = (contentWidth - pageWidth) / 2;
                this.pageTop = (contentHeight - pageHeight) / 2;
                this.pageTransformOrigin.x = "50%";
                this.pageTransformOrigin.y = "50%";
                this.setPageScale(this.getFillScale());
            },


            splitMouseDown: function (event) {
                this.splitIsDown = true;
//                $("iframe").hide();
            },
            splitMouseMove: function (event) {
                let cursor = "";
                if (this.$store.getters.config.workspaceSplit === TYPES.WORKSPACE_SPLIT.VERTICAL) {
                    cursor = "s-resize";
                } else {
                    cursor = "w-resize";
                }

                $(event.target).css({cursor: cursor});
            },
            splitMouseUp: function (event) {
                this.splitIsDown = false;
//                $("iframe").show();
                $(event).css({cursor: "default"});
            },


            spaceMouseDown: function (event) {
                if (this.splitIsDown) {
                    this.editorFlexTempSize = this.editorFlexSize;
                    this.splitMoveStartX = parseFloat(event.clientX);
                    this.splitMoveStartY = parseFloat(event.clientY);

                }
            },
            spaceMouseMove: function (event) {
                let $workSpace = $("#work-space"),
                    cursor = "",
                    newHeight = 0,
                    newWidth = 0,
                    newSize = this.editorFlexSize;
                if (this.splitIsDown) {
                    newHeight = this.editorFlexTempSize + ( parseFloat(event.clientX) - parseFloat(this.splitMoveStartX));
                    newWidth = this.editorFlexTempSize + ( parseFloat(event.clientY) - parseFloat(this.splitMoveStartY));

                    if (this.$store.getters.config.workspaceSplit === TYPES.WORKSPACE_SPLIT.VERTICAL) {
                        cursor = "s-resize";
                        newSize = newWidth;
                    } else {
                        cursor = "w-resize";
                        newSize = newHeight;
                    }

                    $workSpace.css({cursor: cursor});
                    this.editorFlexSize = newSize;

                    setTimeout(function () {
                        $(window).trigger("resize");
                    }, 100)
                }
            },
            spaceMouseUp: function (event) {
                $("#work-space").css({cursor: "default"});
                this.splitIsDown = false;
//                $("iframe").show();
            },

            genaratePdf: function () {
                console.log("generatePdf");

                let doc = new PDFDocument({
                        info: {
                            Title: "www.rapidlabel.com",
                            Author: "www.rapidlabel.com"
                        },
                        autoFirstPage: false
                    }),
                    stream = doc.pipe(blobStream()),
                    i = 0,
                    widgets = this.$store.getters.widgets,
                    page = this.$store.getters.page,
                    url = "";


                stream.on("finish", function () {
                    url = stream.toBlobURL("application/pdf");
                    $("iframe")[0].src = url;
                })


                for (i = 0; i < widgets.length; i++) {
                    doc.addPage({
                        size: [page.width / 10, page.height / 10],
                        margin: 0
                    });

                    doc.fontSize(5)
                        .fillColor("#000000")
                        .text("www.itopdf.com", 10, 10);

                    doc.rect(10, 20, 50, 10)
                        .fill("#EEEEEE");
                }

                doc.save();
                doc.end();
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
        flex: 1 1 0;
        flex-flow: row;
        overflow: hidden;
    }

    #editor-area {
        display: flex;
        background-color: #d2d2d2;
        flex-flow: column;
        overflow: auto;
    }

    #area-split {
        background-color: #efefef;
        flex: 0 0 2px;
        border: 1px solid #838383;
        overflow: hidden;
    }

    #printer-area {
        display: flex;
        flex: 1 1 0;
        flex-direction: column;
    }

    #editor-area-center {
        overflow: hidden;
        flex: auto;
    }

    #editor-area-msg {
        overflow: hidden;
        flex: auto;
    }

    #page {
        background-color: #ffffff;
        position: relative;
        outline-offset: 4px;
        outline: #ffffff dashed 3px;
        border-radius: 2px;
        background-size: 100% 100%;
        display: block;
    }

    #printer-area-center {
        background-color: rgba(252, 150, 37, 0.47);
        flex: auto;
        height: 100%;
        width: 100%;

    }

    iframe {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>