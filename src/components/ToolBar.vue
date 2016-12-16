/**
* Created by Pan on 2016-12-14.
*/
<template>
    <div id="tool-bar">
        <div class="title">
            Tool
        </div>
        <div class="content">
            <div id="widget-text" @click="onclick"></div>
            <div id="widget-image" @click="onclick"></div>
            <div id="widget-barcode" @click="onclick"></div>
        </div>
    </div>
</template>

<script>

    module.exports = {
        data: function () {
            return {}
        },
        methods: {
            onclick: function (event) {
                console.log(event.target.id);
            }
        }
    }

</script>

<style>

    #widget-text, #widget-image, #widget-barcode {
        margin: 8px;
        border: 2px solid #797979;
        border-radius: 4px;
        padding: 1px;
        height: 55px;
        background-size: contain;
        /*cursor: pointer;;*/
    }

    #widget-text:hover, #widget-image:hover, #widget-barcode:hover {
        box-shadow: rgb(169, 169, 169) 0px 0px 18px;
    }

    #widget-text {
        background-image: url("../assets/widget_text_background.jpg");
    }

    #widget-image {
        background-image: url("../assets/widget_image_background.jpg");
    }

    #widget-barcode {
        background-image: url("../assets/widget_barcode_background.jpg");
    }

</style>