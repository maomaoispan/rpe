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
             left: left,
             top: top
         }"
    >
        <div draggable="false"
             v-if="type === WIDGET_TYPES.TEXT"

             v-bind:style="{
                 fontFamily: textInfo.fontFamily,
                 fontSize: textInfo.fontSize + 'px',
                 color: textInfo.fontColor
            }">
            {{ textInfo.value }}
        </div>

        <img draggable="false"
             v-if="type === WIDGET_TYPES.IMAGE"
             v-bind:src="imageInfo.src"
             v-bind:style="{
             width:  imageInfo.displayMode === IMAGE_DISPLAY_MODE.FIT_HEIGHT ? 'auto' : imageInfo.width + 'px',
             height: imageInfo.displayMode === IMAGE_DISPLAY_MODE.FIT_WIDTH ? 'auto' : imageInfo.height + 'px'
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
    import  {IMAGE_DISPLAY_TYPES}  from "./Types"

    export default{

        props: [
            "id",
            "type",
        ],

        data: function () {

            return {
                WIDGET_TYPES: WIDGET_TYPES,
                IMAGE_DISPLAY_MODE: IMAGE_DISPLAY_TYPES,
                tempLeft: 20,
                tempTop: 20,
                isDown: false,
                moveStartX: 0,
                moveStartY: 0,
            }
        },

        computed: {

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
                return this.widget.left + "px";
            },

            top: function () {
                return this.widget.top + "px";
            },

            textInfo: function () {
                if (this.type === WIDGET_TYPES.TEXT) {
                    return {
                        value: this.widget.value,
                        fontFamily: this.widget.fontFamily,
                        fontSize: this.widget.fontSize,
                        fontColor: this.widget.fontColor,
                    }
                }
            },

            imageInfo: function () {
                if (this.type === WIDGET_TYPES.IMAGE) {
                    return {
                        width: this.widget.width,
                        height: this.widget.height,
                        displayMode: this.widget.displayMode,
                        src: this.widget.src
                    }
                }
            },

            barcodeInfo: function () {
                if (this.type === WIDGET_TYPES.BARCODE) {
                    return {
                        value: this.widget.value
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
                console.log("widget clicked");
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
                    var newLeft = this.tempLeft + parseFloat(event.clientX) - parseFloat(this.moveStartX);
                    var newTop = this.tempTop + parseFloat(event.clientY) - parseFloat(this.moveStartY);

                    if (newLeft < 0) {
                        newLeft = 0;
                    }
                    if (newTop < 0) {
                        newTop = 0;
                    }

                    this.$store.commit(MUTATION_TYPES.UPDATE_WIDGET, {left: newLeft, top: newTop});
                }
            },

            mouseUp: function (event) {
                if (this.isDown) {
                    this.isDown = false;
                }
            },

            updateWidget: function (info) {
                this.$store.commit(MUTATION_TYPES.UPDATE_WIDGET, info)
            },

            generateCode: function () {
                if (this.type === WIDGET_TYPES.BARCODE) {
                    $(this.$el).children().JsBarcode(
                        this.barcodeInfo.value, {
                            width: 1,
                            height: 30,
                            displayValue: true,
                            margin: 0,
                            fontSize: 10,
                            background: "#ffffff"
                        })
                } else if (this.type === WIDGET_TYPES.QR_CODE) {
                    $(this.$el).children().qrcode({
                        text: this.qrCodeInfo.value,
                        width: 100,
                        height: 100
                    });
                }
            }
        },

        updated: function () {
            this.generateCode();
        },

        mounted: function () {
            this.generateCode();
        }
    }
</script>

<style>

    .widget :hover {
        box-shadow: #e2e2e2 0px 0px 15px;
        cursor: move;
    }

    .widget {
        display: inline;
        margin: 0;
        position: absolute;
        line-height: 1.0;
    }

    .widget_selected {
        box-shadow: #ff3b00 0 0 5px;
    }

</style>