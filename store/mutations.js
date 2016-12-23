/**
 * Created by Pan on 2016-12-17.
 */
import * as MUTATION_TYPES from "./mutationTypes"
import {WIDGET_TYPES} from "../components/Types"
import {IMAGE_DISPLAY_TYPES} from "../components/Types"
import {set} from "vue"

const mutations = {
    [MUTATION_TYPES.ADD_WIDGET] (state, type){
        var widget = null;

        // var a = [1, 2, 3];
        // var b = [...a, 4, 5, 6];
        // console.log(b);

        switch (type) {
            case WIDGET_TYPES.TEXT:
                widget = {
                    type: WIDGET_TYPES.TEXT,
                    value: "New Content",
                    fontFamily: "宋体",
                    fontSize: 10,
                    fontColor: "#000000"
                }
                break;

            case WIDGET_TYPES.IMAGE:
                widget = {
                    type: WIDGET_TYPES.IMAGE,
                    width: 100,
                    height: 60,
                    displayMode: IMAGE_DISPLAY_TYPES.FIT_HEIGHT,
                    src: "../assets/default_image.jpg"
                }

                break;

            case WIDGET_TYPES.BARCODE :
                widget = {
                    type: WIDGET_TYPES.BARCODE,
                    value: "999999999",
                }
                break;

            case WIDGET_TYPES.QR_CODE:
                widget = {
                    type: WIDGET_TYPES.QR_CODE,
                    value: "888888888",
                }
                break;

            default:
                break;
        }

        if (widget !== null) {
            widget.id = (new Date()).getTime();
            widget.left = state.page.width * 0.3;
            widget.top = state.page.height * 0.3;

            state.widgets.push(widget);
            state.activeWidget = widget;
        }
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