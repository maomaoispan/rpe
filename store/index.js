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
            id: "11",
            type: "TEXT",
            left: 5,
            top: 5,
            value: "产品名称：",
            font_family: "宋体",
            font_size: 16
        }, {
            id: "22",
            type: "IMAGE",
            left: 120,
            top: 30,
            src:"../assets/widget_image_background.jpg"
        }, {
            id: "33",
            type: "TEXT",
            left: 5,
            top: 50,
            value: "价格："
        }, {
            id: "44",
            type: "BARCODE",
            left: 20,
            top: 20,
            value: "010101001"
        }, {
            id: "55",
            type: "QR_CODE",
            left: 20,
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