/**
 * Created by Pan on 2016-12-17.
 */
import * as MUTATION_TYPES from "./mutationTypes"
import * as WIDGET_TYPES from "../components/WidgetTypes"
import {set} from "vue"

const mutations = {
    [MUTATION_TYPES.ADD_WIDGET] (state, type){
        var _widget = {
            id: (new Date()).getTime(),
            left: 20,
            top: 20,
        };

        switch (type) {
            case WIDGET_TYPES.TEXT:
                _widget.type = WIDGET_TYPES.TEXT;
                _widget.value = "New Content";
                break;

            case WIDGET_TYPES.IMAGE:
                _widget.type = WIDGET_TYPES.IMAGE;
                _widget.width = 100;
                _widget.height = 60;
                _widget.src = "../assets/default_image.jpg"
                break;

            case WIDGET_TYPES.BARCODE :
                _widget.type = WIDGET_TYPES.BARCODE;
                _widget.value = "999999999";
                break;

            case WIDGET_TYPES.QR_CODE:
                _widget.type = WIDGET_TYPES.QR_CODE;
                _widget.value = "久久";
                break;

            default:
                break;
        }

        state.widgets.push(_widget);
        state.activeWidget = _widget;
    },

    [MUTATION_TYPES.UPDATE_WIDGET] (state, info){
        var _info = Object.keys(info)
        for (let item of _info) {
            state.activeWidget[item] = info[item]
        }
    },

    [MUTATION_TYPES.DELETE_WIDGET] (state){
        let index = state.widgets.indexOf(state.activeWidget);
        console.log("index:" + index);
        console.log(state.widgets);
        state.widgets.splice(index, 1);
        state.activeWidget = state.widgets[0];
        console.log(state.widgets);

    },

    [MUTATION_TYPES.ACTIVE_WIDGET](state, id){
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

    [MUTATION_TYPES.UPDATE_PAGE](state, info){
        var _info = Object.keys(info);
        for (let item of _info) {
            state.page[item] = info[item];
        }
    }
}

function activeWidgetById(state, id) {
}

export  default mutations