/**
 * Created by Pan on 2016-12-17.
 */
import * as types from "./mutation-types"

const mutations = {
    [types.ADD_WIDGET] (state, type){
        console.log("add widget");
        const newWidget = {
            left: 50,
            top: 20,
            type: type
        }
        console.log(newWidget);
        state.widgets.push(newWidget)
        state.activeWidget = newWidget
    },

    [types.EDIT_WIDGET] (state, info){
        state.activeWidget.left = info.left
        state.activeWidget.top = info.top
    },

    [types.DELETE_WIDGET] (state){
        state.widgets.$remove(state.activeWidget)
        state.activeWidget = state.widgets[0]
    },

    [types.ACTIVE_WIDGET](state, widget){
        state.activeWidget = widget
    }
}

export  default mutations