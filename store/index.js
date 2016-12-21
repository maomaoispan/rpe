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
            type: "text",
            left: 5,
            top: 5,
            text: "产品名称：",
            font_family: "宋体",
            font_size: 16
        }, {
            id: "22",
            type: "image",
            left: 120,
            top: 30
        }, {
            id: "33",
            type: "text",
            left: 5,
            top: 50,
            text: "价格："
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