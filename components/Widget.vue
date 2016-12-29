/**
* Created by Pan on 2016-12-14.
*/

<template>
    <div class="widget"
         v-bind:class="{widget_selected:isActived}"
         draggable="false"
         @click.stop
         @mousedown="mouseDown"
         @mouseup="mouseUp"
         @mousemove="mouseMove"
         @mouseout="mouseUp"
         v-bind:style="{
             left: left + 'px',
             top: top + 'px',
             zIndex: zIndex
         }"
    >
        <div draggable="false"
             v-if="type === WIDGET_TYPES.TEXT"
             v-bind:style="{
                 fontFamily: widget.fontFamily,
                 fontSize: widget.fontSize + 'px',
                 color: widget.fontColor,
                 fontWeight: widget.fontWeight,
                 fontStyle: widget.fontStyle
            }"

        >
            {{ value }}
        </div>

        <img draggable="false"
             v-if="type === WIDGET_TYPES.IMAGE"
             v-bind:src="widget.src"
             v-bind:style="{
             width:  widget.displayMode === IMAGE_DISPLAY_MODE.FIT_HEIGHT.value ? 'auto' : widget.width + 'px',
             height: widget.displayMode === IMAGE_DISPLAY_MODE.FIT_WIDTH.value ? 'auto' : widget.height + 'px'
             }"
        >

        <canvas draggable="false"
                v-if="type === WIDGET_TYPES.BARCODE"
        ></canvas>

        <canvas draggable="false"
                v-if="type === WIDGET_TYPES.QR_CODE"
        ></canvas>

    </div>
</template>

<script>
    import  * as MUTATION_TYPES from "../store/mutationTypes"
    import  {WIDGET_TYPES} from "./Types"
    import  {IMAGE_DISPLAY_MODE}  from "./Types"

    export default{

        props: [
            "id",
            "type",
        ],

        data: function () {

            return {
                WIDGET_TYPES: WIDGET_TYPES,
                IMAGE_DISPLAY_MODE: IMAGE_DISPLAY_MODE,
                tempLeft: 20,
                tempTop: 20,
                isDown: false,
                moveStartX: 0,
                moveStartY: 0,
            }
        },

        computed: {
            value: function () {
                let dataId = this.widget.dataId,
                    value;

                if (dataId === "") {
                    value = this.widget.value;
                } else {
                    value = this.getBindValue(this.widget.dataId);
                }

                return value;
            },

            pageScale: function () {
                return this.$store.getters.config.pageScale;
            },

            widget: function () {
                var widgets = this.$store.getters.widgets;

                for (let i = 0; i < widgets.length; i++) {
                    if (this.id === widgets[i].id) {
                        return widgets[i];
                    }
                }
                return null;
            },

            left: function () {
                return this.widget.left;
            },

            top: function () {
                return this.widget.top;
            },

            zIndex: function () {
                return this.widget.zIndex;
            },

            barcodeInfo: function () {
                if (this.type === WIDGET_TYPES.BARCODE) {
                    return {
                        value: this.widget.value,
                        displayValue: this.widget.displayValue,
                        width: this.widget.width,
                        height: this.widget.height,
                        fontSize: this.widget.fontSize,
                        background: this.widget.background
                    }
                }
            },

            qrCodeInfo: function () {
                if (this.type === WIDGET_TYPES.QR_CODE) {
                    return {
                        value: this.widget.value
                    }
                }
            },

            isActived: function () {
                var widget = this.$store.getters.activeWidget;

                if (widget !== null && widget.id === this.id) {
                    return true;
                }
                return false;
            },
        },

        methods: {

            mouseDown: function (event) {
                this.$store.commit(MUTATION_TYPES.ACTIVE_WIDGET, this.id);
                this.tempLeft = parseFloat(event.target.parentNode.style.left);
                this.tempTop = parseFloat(event.target.parentNode.style.top);
                this.moveStartX = parseFloat(event.clientX);
                this.moveStartY = parseFloat(event.clientY);
                this.isDown = true;
            },

            mouseMove: function (event) {
                var target = event.target.parentNode;

                if (this.isDown) {
                    $(event.target).css({
                        cursor: "move"
                    });

                    var newLeft = Math.round(this.tempLeft + ( parseFloat(event.clientX) - parseFloat(this.moveStartX)) / this.pageScale);
                    var newTop = Math.round(this.tempTop + (parseFloat(event.clientY) - parseFloat(this.moveStartY)) / this.pageScale);

                    if (newLeft < 0) {
                        newLeft = 0;
                    } else if (newLeft > this.$store.getters.maxLeft) {
                        newLeft = this.$store.getters.maxLeft;
                    }

                    if (newTop < 0) {
                        newTop = 0;
                    } else if (newTop > this.$store.getters.maxTop) {
                        newTop = this.$store.getters.maxTop;
                    }

                    this.$store.commit(MUTATION_TYPES.UPDATE_WIDGET, {left: newLeft, top: newTop});
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

            updateWidget: function (info) {
                this.$store.commit(MUTATION_TYPES.UPDATE_WIDGET, info)
            },

            generateCode: function () {
                let value = "",
                    dataId = "";

                if (this.type === WIDGET_TYPES.BARCODE || this.type === WIDGET_TYPES.QR_CODE) {
                    dataId = this.widget.dataId;

                    if (dataId === "") {
                        value = this.widget.value === '' ? "At least 1 characters" : this.widget.value;
                    } else {
                        value = this.getBindValue(this.widget.dataId);
                    }
                }

                if (this.type === WIDGET_TYPES.BARCODE) {
                    var reg = /^[0-9a-zA-Z]*$/;
                    if (reg.test(value)) {
                        $(this.$el).children().JsBarcode(
                            value, {
                                displayValue: this.widget.displayValue,
                                width: this.widget.width,
                                height: this.widget.height,
                                text: this.widget.text,
                                fontOptions: this.widget.fontOptions,
                                font: this.widget.font,
                                fontSize: this.widget.fontSize,
                                textAlign: this.widget.textAlign,
                                textPosition: this.widget.textPosition,
                                textMargin: this.widget.textMargin,
                                background: this.widget.background,
                                lineColor: this.widget.lineColor,
                                margin: 0,
                                marginTop: parseInt(this.widget.marginTop),
                                marginBottom: parseInt(this.widget.marginBottom),
                                marginLeft: parseInt(this.widget.marginLeft),
                                marginRight: parseInt(this.widget.marginRight)
                            })
                    }

                } else if (this.type === WIDGET_TYPES.QR_CODE) {
                    $(this.$el).children().qrcode({
                        text: value,
                        width: this.widget.width,
                        height: this.widget.height,
                        background: this.widget.background,
                        foreground: this.widget.foreground
                    });
                }
            },

            getBindValue: function (dataId) {
                let i = 0,
                    j = 0,
                    id = dataId,
                    page = this.$store.getters.page,
                    files = this.$store.getters.dataFiles,
                    file;

                for (i = 0; i < files.length; i++) {
                    file = files[i];

                    if (page.dataFile === file.src) {
                        for (j = 0; j < file.index.length; j++) {
                            if (file.index[j].id === id) {
                                return file.content[0][j];
                            }
                        }
                    }
                }

                return null;
            }
        },

        updated: function () {
            this.$store.commit(MUTATION_TYPES.UPDATE_WIDGET, {
                contentWidth: $(this.$el).width(),
                contentHeight: $(this.$el).height()
            });

            this.generateCode();
        },

        mounted: function () {
            this.generateCode();
        }
    }
</script>

<style>

    .widget :hover {
        box-shadow: #3ce238 0px 0px 15px;
        outline: #33ff04 solid 2px;
        outline-offset: 2px;
    }

    .widget {
        display: inline;
        margin: 0;
        position: absolute;
        line-height: 1.0;
    }

    .widget_selected {
        box-shadow: rgba(255, 0, 0, 0.51) 0px 0px 28px;
        outline: red solid 2px;
        outline-offset: 4px;
    }

</style>