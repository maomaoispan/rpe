/**
 * Created by Pan on 2016-12-17.
 */
import * as MUTATION_TYPES from "./mutationTypes"
import * as TYPES from "../components/Types"
import {IMAGE_DISPLAY_MODE} from "../components/Types"
import {set} from "vue"

const mutations = {
    [MUTATION_TYPES.ADD_WIDGET] (state, type){
        var widget = null;

        switch (type) {
            case TYPES.WIDGET_TYPES.TEXT:
                widget = {
                    type: TYPES.WIDGET_TYPES.TEXT,
                    value: "New Content",
                    fontFamily: TYPES.FONT_FAMILY.SUN_TI.value,
                    fontSize: 20,
                    fontColor: "#000000",
                    fontWeight: TYPES.FONT_WEIGHT.BOLD.value,
                    fontStyle: TYPES.FONT_STYLE.OBLIQUE.value,
                    dataId:""
                }
                break;

            case TYPES.WIDGET_TYPES.IMAGE:
                widget = {
                    type: TYPES.WIDGET_TYPES.IMAGE,
                    width: 100,
                    height: 60,
                    displayMode: IMAGE_DISPLAY_MODE.FIT_HEIGHT.value,
                    src: "../assets/default_image.jpg"
                }

                break;

            case TYPES.WIDGET_TYPES.BARCODE :
                widget = {
                    type: TYPES.WIDGET_TYPES.BARCODE,
                    value: "999999999",
                    displayValue: true,
                    width: 1,
                    height: 30,
                    text: "",
                    fontOptions: TYPES.BARCODE_FONT_OPTIONS.NONE.value,
                    font: TYPES.FONT_FAMILY.SUN_TI.value,
                    fontSize: 20,
                    textAlign: TYPES.BARCODE_TEXT_ALIGN.CENTER.value,
                    textPosition: TYPES.BARCODE_TEXT_POSITION.BOTTOM.value,
                    textMargin: 10,
                    background: "#FFFFFF",
                    lineColor: "#000000",
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    dataId:""
                }
                break;

            case TYPES.WIDGET_TYPES.QR_CODE:
                widget = {
                    type: TYPES.WIDGET_TYPES.QR_CODE,
                    value: "888888888",
                    width: 100,
                    height: 100,
                    background: "#FFFFFF",
                    foreground: "#000000",
                    dataId:""
                }
                break;

            default:
                break;
        }

        if (widget !== null) {
            let zIndex = 0;
            for (let i = 0; i < state.widgets.length; i++) {
                let widget = state.widgets[i];
                zIndex = zIndex < widget.zIndex ? widget.zIndex : zIndex;
            }

            widget.id = (new Date()).getTime();
            widget.left = state.page.width * 0.3;
            widget.top = state.page.height * 0.3;
            widget.contentWidth = 0;
            widget.contentHeight = 0;
            widget.zIndex = zIndex + 1;

            state.widgets.push(widget);
            state.activeWidget = widget;
        }
    },

    [MUTATION_TYPES.UPDATE_WIDGET] (state, info){
        var _info = Object.keys(info);

        for (let item of _info) {
            if (state.activeWidget && state.activeWidget.hasOwnProperty(item)) {
                state.activeWidget[item] = info[item];
            }
        }
    },

    [MUTATION_TYPES.DELETE_WIDGET] (state){
        let index = state.widgets.indexOf(state.activeWidget);
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
            if (state.page.hasOwnProperty(item)) {
                state.page[item] = info[item];

                if (item === "dataFile") {
                    for (let w of state.widgets) {
                        let dataId = "dataId";
                        if (w.hasOwnProperty(dataId)) {
                            w[dataId] = "";
                        }
                    }
                }
            }
        }
    },

    [MUTATION_TYPES.CONFIG_UPDATE](state, info){
        var _info = Object.keys(info);

        for (let item of _info) {
            if (state.config.hasOwnProperty(item)) {
                state.config[item] = info[item];
            }
        }
    }
}


export  default mutations