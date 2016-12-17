/**
 * Created by Pan on 2016-12-14.
 */
import Vue from "vue"
import Vuex from "vuex"
import * as actions from "./actions"
import mutations from "./mutations"

Vue.use(Vuex)

const state = {
    widgets: [],
    activeWidget: {}
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})