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
         v-bind:style="{left:left, top:top}"
    >
        <div draggable="false"
             v-if="type === 'text'"
             style="display: inline;">{{text}}
        </div>

        <img draggable="false"
             v-if="type === 'image'"
             style="display: inline;"
             v-on:click.prevent
             src="../assets/widget_image_background.jpg">

        <!--<img draggable="false" v-if="type === 'barcode'" style="display: inline;"-->

        <!--src="../assets/widget_barcode_background.jpg">-->

    </div>
</template>

<script>
    import  * as types from "../store/mutation-types"

    export default{
        props: [
            "type",
            "id"
        ],

        data: function () {
            return {
                a_left: 190,
                a_top: 50,
                left: 0,
                top: 0,
                selected: false,

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

            text: function () {
                return this.widget.text;
            },

            src: function () {
                return this.widget.src;
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
            widget: function () {
                var widgets = this.$store.getters.widgets;
                for (let i = 0; i < widgets.length; i++) {
                    if (widgets[i].id === this.id) {
                        return widgets[i];
                    }
                }
                return null;
            },

            mouseDown: function (event) {
                console.log("widget clicked");
                this.$store.commit(types.ACTIVE_WIDGET, this.id);

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

                    this.$store.commit(types.UPDATE_WIDGET, {left: newLeft, top: newTop});
                }
            },

            mouseUp: function (event) {
                if (this.isDown) {
                    this.isDown = false;
                }
            },

            updateWidget: function (info) {
                this.$store.commit(types.UPDATE_WIDGET, info)
            }
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
    }

    .widget_selected {
        box-shadow: #ff3b00 0 0 5px;
    }

</style>