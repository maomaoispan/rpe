/**
 * Created by Pan on 2016-12-17.
 */
import * as types from "./mutation-types"
import {set} from "vue"

const mutations = {
    [types.ADD_WIDGET] (state, type){
        var newWidget = {
            id: (new Date()).getTime(),
            left: 20,
            top: 20,
        };

        switch (type) {
            case "text":
                newWidget.type = "text";
                newWidget.text = "New Content";

                break;

            case "image":
                newWidget.type = "image";
                newWidget.width = 100;
                newWidget.height = 60;
                break;

            default:
                break;
        }

        console.log(newWidget);
        state.widgets.push(newWidget);
        state.activeWidget = newWidget;
    },

    [types.UPDATE_WIDGET] (state, info){
        var _info = Object.keys(info)
        for (let item of _info) {
            state.activeWidget[item] = info[item]
        }
    },

    [types.DELETE_WIDGET] (state){
        state.widgets.splice(state.widgets.indexOf(state), 1);
        state.activeWidget = state.widgets[0]
    },

    [types.ACTIVE_WIDGET](state, id){
        if (id === null) {
            state.activeWidget = null;
        } else {
            let widgets = state.widgets;
            for (let i = 0; i < widgets.length; i++) {
                if (widgets[i].id === id) {
                    state.activeWidget = widgets[i];
                }
            }
        }
    },

    [types.UPDATE_PAGE](state, info){
        var _info = Object.keys(info);
        for (let item of _info) {
            state.page[item] = info[item];
        }
    }
}

function activeWidgetById(state, id) {
}

export  default mutations