/**
 * Created by Pan on 2016-12-14.
 */
import Vue from "vue"
import Vuex from "vuex"
import * as actions from "./actions"
import mutations from "./mutations"
import * as TYPES from "../components/Types"

Vue.use(Vuex)

const state = {
    page: {
        width: 360,
        height: 200
    },
    widgets: [
        {
            type: "TEXT",
            id: "11",
            left: 5,
            top: 5,
            value: "产品名称：",
            fontFamily: "幼圆",
            fontSize: 20,
            fontColor: "#ff3b00",
            fontWeight: TYPES.FONT_WEIGHT.BOLD.value,
            fontStyle: TYPES.FONT_STYLE.OBLIQUE.value
        }, {
            type: "IMAGE",
            id: "22",
            left: 120,
            top: 30,
            width: 200,
            height: 160,
            src: "../assets/widget_image_background.jpg",
            displayMode: TYPES.IMAGE_DISPLAY_MODE.FIT_HEIGHT.value
        }, {
            type: "IMAGE",
            id: "322",
            left: 120,
            top: 30,
            width: 80,
            height: 160,
            src: "../assets/widget_image_background.jpg",
            displayMode: TYPES.IMAGE_DISPLAY_MODE.FIT_WIDTH.value
        }, {
            type: "IMAGE",
            id: "3232",
            left: 120,
            top: 30,
            width: 100,
            height: 20,
            src: "../assets/widget_image_background.jpg",
            displayMode: TYPES.IMAGE_DISPLAY_MODE.STRETCH.value
        }, {
            type: "TEXT",
            id: "33",
            left: 55,
            top: 50,
            value: "价格：",
            fontFamily: "楷体",
            fontSize: 10,
            fontColor: "#9484ff",
            fontWeight: TYPES.FONT_WEIGHT.BOLD.value,
            fontStyle: TYPES.FONT_STYLE.OBLIQUE.value
        }, {
            id: "44",
            type: "BARCODE",
            left: 180,
            top: 20,
            value: "010101001",
            displayValue: true,
            width: 1,
            height: 30,
            text: "",
            fontOptions: TYPES.BARCODE_FONT_OPTIONS.NONE.value,
            font: "宋体",
            fontSize: 20,
            textAlign: TYPES.BARCODE_TEXT_ALIGN.CENTER.value,
            textPosition: TYPES.BARCODE_TEXT_POSITION.BOTTOM.value,
            textMargin: 10,
            background: "#ff3443",
            lineColor: "#4e44ff",
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 20,
            marginRight: 20
        }, {
            type: "QR_CODE",
            id: "55",
            left: 260,
            top: 20,
            value: "JiuFuJiuJiu",
            width: 100,
            height: 100,
            background: "#FFFFFF",
            foreground: "#000000"
        }
    ],
    activeWidget: null
}

export default new Vuex.Store({
    state,
    actions,
    getters: {
        page: state => state.page,
        widgets: state => state.widgets,
        activeWidget: state => state.activeWidget,
    },
    mutations
})