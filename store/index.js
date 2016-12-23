/**
 * Created by Pan on 2016-12-14.
 */
import Vue from "vue"
import Vuex from "vuex"
import * as actions from "./actions"
import mutations from "./mutations"

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
            fontColor: "#ff3b00"
        }, {
            type: "IMAGE",
            id: "22",
            left: 120,
            top: 30,
            width: 200,
            height: 160,
            src: "../assets/widget_image_background.jpg",
            displayMode: "FIT_WIDTH"
        }, {
            type: "IMAGE",
            id: "322",
            left: 120,
            top: 30,
            width: 80,
            height: 160,
            src: "../assets/widget_image_background.jpg",
            displayMode: "FIT_HEIGHT"
        }, {
            type: "IMAGE",
            id: "3232",
            left: 120,
            top: 30,
            width: 100,
            height: 20,
            src: "../assets/widget_image_background.jpg",
            displayMode: "STRETCH"
        }, {
            type: "TEXT",
            id: "33",
            left: 55,
            top: 50,
            value: "价格：",
            fontFamily: "楷体",
            fontSize: 10,
            fontColor: "#9484ff"
        }, {
            type: "BARCODE",
            id: "44",
            left: 180,
            top: 20,
            value: "010101001"
        }, {
            type: "QR_CODE",
            id: "55",
            left: 260,
            top: 20,
            value: "XQZB9999"
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