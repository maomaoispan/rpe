/**
* Created by Pan on 2016-12-14.
*/

<template>
    <div class="widget"
         v-bind:class="{w_selected:selected}"
         draggable="false"
         @mousedown="mouseDown"
         @mouseup="mouseUp"
         @mousemove="mouseMove"
         @mouseout="mouseUp"
         style="left:120px; top:80px"
    >
        <div draggable="false" v-if="type === 'text'" style="display: inline;">TextTextTextTextText</div>
        <img draggable="false" v-if="type === 'image'" style="display: inline;"
             src="../assets/widget_image_background.jpg">
        <!--<img draggable="false" v-if="type === 'barcode'" style="display: inline;"-->
             <!--src="../assets/widget_barcode_background.jpg">-->

    </div>
</template>

<script>
    export default{
        props: [
            "type"
        ],

        data: function () {
            return {
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

        created:function () {
            console.log(this.type);
        },

        methods: {
            mouseDown: function (event) {
                if (!this.selected) {
                    this.selected = true;
                }

                this.tempLeft = parseFloat(event.target.parentNode.style.left);
                this.tempTop = parseFloat(event.target.parentNode.style.top);
                this.moveStartX = parseFloat(event.clientX);
                this.moveStartY = parseFloat(event.clientY);
                this.isDown = true;
            },

            mouseMove: function (event) {
                var target = event.target.parentNode;
                if (this.isDown) {
                    var newLeft = this.tempLeft + parseFloat(event.clientX) - this.moveStartX;
                    var newTop = this.tempTop + parseFloat(event.clientY) - this.moveStartY;

                    if (newLeft < 0) {
                        newLeft = 0;
                    }
                    if (newTop < 0) {
                        newTop = 0;
                    }

                    target.style.left = newLeft + "px";
                    target.style.top = newTop + "px";

                    this.left = newLeft;
                    this.top = newTop;
                }
            },

            mouseUp: function (event) {
                if (this.isDown) {
                    this.isDown = false;
                }
            },
        }
    }
</script>

<style>

    .widget :hover {
        box-shadow: #d6d6d6 0 0 12px;
        cursor: default;
    }

    .widget {
        display: inline;
        margin: 0;
        position: absolute;
    }

    .w_selected {
        box-shadow: #3f3f3f 0 0 4px;
    }


</style>