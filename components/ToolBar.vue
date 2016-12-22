/**
* Created by Pan on 2016-12-14.
*/
<template>
    <div id="tool-bar">
        <div class="title">
            Tool
        </div>
        <div class="content">
            <div id="addWidgetText" @click="addWidget"></div>
            <div id="addWidgetImage" @click="addWidget"></div>
            <div id="addWidgetBarcode" @click="addWidget"></div>
            <div id="addWidgetQRCode" @click="addWidget"></div>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from "vuex"
    import * as MUTATION_TYPES from "../store/mutationTypes"
    import * as WIDGET_TYPES from "./WidgetTypes"

    export default {
        data: function () {
            return {}
        },
        methods: {
            addWidget: function (event) {
                let _type = "";

                switch (event.target.id) {
                    case "addWidgetText":
                        _type = WIDGET_TYPES.TEXT;
                        break;

                    case "addWidgetImage":
                        _type = WIDGET_TYPES.IMAGE;
                        break;

                    case "addWidgetBarcode":
                        _type = WIDGET_TYPES.BARCODE;
                        break;

                    case"addWidgetQRCode":
                        _type = WIDGET_TYPES.QR_CODE;
                        break;

                    default:
                        break;
                }
                if (_type !== "") {
                    this.$store.commit(MUTATION_TYPES.ADD_WIDGET, _type);
                }
            }
        }
    }

</script>

<style>

    #addWidgetText, #addWidgetImage, #addWidgetBarcode, #addWidgetQRCode {
        margin: 8px;
        border: 2px solid #797979;
        border-radius: 4px;
        padding: 1px;
        height: 55px;
        background-size: contain;
        /*cursor: pointer;;*/
    }

    #addWidgetText:hover, #addWidgetImage:hover, #addWidgetBarcode:hover, #addWidgetQRCode:hover {
        box-shadow: rgb(169, 169, 169) 0px 0px 18px;
    }

    #addWidgetText {
        background-image: url("../assets/widget_text_background.jpg");
    }

    #addWidgetImage {
        background-image: url("../assets/widget_image_background.jpg");
    }

    #addWidgetBarcode {
        background-image: url("../assets/widget_barcode_background.jpg");
    }

    #addWidgetQRCode {
        background-image: url("../assets/widget_qr_code_background.jpg");
    }

</style>