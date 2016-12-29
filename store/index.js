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
    config: {
        pageScale: 1
    },
    page: {
        width: 700,
        height: 300,
        backgroundImage: "../assets/page_back_ground_default.jpg",
        dataFile: "f003",
    },
    widgets: [
        {
            type: "TEXT",
            id: "11",
            left: 35,
            top: 50,
            contentWidth: 0,
            contentHeight: 0,
            zIndex: 1110,
            value: "产品名称：",
            fontFamily: "幼圆",
            fontSize: 20,
            fontColor: "#ff3b00",
            fontWeight: TYPES.FONT_WEIGHT.BOLD.value,
            fontStyle: TYPES.FONT_STYLE.OBLIQUE.value,
            dataId:""
        }, {
            type: "IMAGE",
            id: "22",
            left: 32,
            top: 113,
            contentWidth: 0,
            contentHeight: 0,
            zIndex: 20,
            width: 200,
            height: 160,
            src: "../assets/XiQiJwelry.png",
            displayMode: TYPES.IMAGE_DISPLAY_MODE.FIT_HEIGHT.value
        }, {
            type: "IMAGE",
            id: "322",
            left: 300,
            top: 30,
            contentWidth: 0,
            contentHeight: 0,
            width: 100,
            height: 160,
            zIndex: 150,
            src: "../assets/JuDianTech.png",
            displayMode: TYPES.IMAGE_DISPLAY_MODE.FIT_WIDTH.value
        }, {
            type: "IMAGE",
            id: "3232",
            left: 470,
            top: 69,
            contentWidth: 0,
            contentHeight: 0,
            zIndex: 10,
            width: 100,
            height: 60,
            src: "../assets/ByeaseTech.png",
            displayMode: TYPES.IMAGE_DISPLAY_MODE.STRETCH.value
        }, {
            type: "TEXT",
            id: "33",
            left: 223,
            top: 55,
            contentWidth: 0,
            contentHeight: 0,
            zIndex: 10,
            value: "价格：",
            fontFamily: "楷体",
            fontSize: 20,
            fontColor: "#9484ff",
            fontWeight: TYPES.FONT_WEIGHT.BOLD.value,
            fontStyle: TYPES.FONT_STYLE.OBLIQUE.value,
            dataId:""
        }, {
            id: "44",
            type: "BARCODE",
            left: 400,
            top: 160,
            contentWidth: 0,
            contentHeight: 0,
            zIndex: 10,
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
            background: "#828285",
            lineColor: "#ffad00",
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 20,
            marginRight: 20,
            dataId:""
        }, {
            type: "QR_CODE",
            id: "55",
            left: 560,
            top: 170,
            contentWidth: 0,
            contentHeight: 0,
            zIndex: 10,
            value: "JiuFuJiuJiu",
            width: 100,
            height: 100,
            background: "#FFFFFF",
            foreground: "#000000",
            dataId:""
        }
    ],
    activeWidget: null,

    imageList: [
        {src: "../assets/ByeaseTech.png", name: "Byease Tech Logo"},
        {src: "../assets/JuDianTech.png", name: "Ju Dian Tech  Logo"},
        {src: "../assets/XiQiJwelry.png", name: "XiQi Jwelry  Logo"},
        {src: "../assets/Vue.png", name: "Vuejs  Logo"},
        {src: "../assets/page_back_ground_default.jpg", name: "Defalul page background"},
        {src: "../assets/page_back_ground_xiqi.jpg", name: "XiQi Jewlry page background"}
    ],

    dataFiles: [
        {
            src: "f001",
            name: "File_01",
            index: [
                {id: "bianhao", name: "编号"},
                {id: "mingchen", name: "名称"},
                {id: "jiage", name: "价格"},
                {id: "zhongliang", name: "重量"},
                {id: "beizhu", name: "备注"}
            ],
            content: [
                ["010101001", "和田玉", "18000", "10.5", "新疆"],
                ["010101002", "珊瑚", "1200", "3.9", "台湾"],
                ["010101003", "珍珠", "340", "5.7", "海南"],
                ["010101004", "翡翠", "5600", "2.7", "云南"]
            ]
        },
        {
            src: "f002",
            name: "File_02",
            index: [
                {id: "2bianhao", name: "编号2"},
                {id: "2mingchen", name: "名称2"},
                {id: "2jiage", name: "价格2"},
                {id: "2zhongliang", name: "重量2"},
                {id: "2beizhu", name: "备注2"}
            ],
            content: [
                ["2010101001", "2和田玉", "218000", "210.5", "2新疆"],
                ["2010101002", "2珊瑚", "21200", "23.9", "2台湾"],
                ["2010101003", "2珍珠", "2340", "25.7", "2海南"],
                ["2010101004", "2翡翠", "25600", "22.7", "2云南"]
            ]
        },
        {
            src: "f003",
            name: "File_03",
            index: [
                {id: "3bianhao", name: "3编号"},
                {id: "3mingchen", name: "3名称"},
                {id: "3jiage", name: "3价格"},
                {id: "3zhongliang", name: "3重量"},
                {id: "3beizhu", name: "3备注"}
            ],
            content: [
                ["3010101001", "3和田玉", "318000", "310.5", "3新疆"],
                ["3010101002", "3珊瑚", "31200", "33.9", "3台湾"],
                ["3010101003", "3珍珠", "3340", "35.7", "3海南"],
                ["3010101004", "3翡翠", "35600", "32.7", "3云南"]
            ]
        }
    ]
}

export default new Vuex.Store({
    state,
    actions,
    getters: {

        config: state => state.config,

        page: state => state.page,
        widgets: state => state.widgets,
        activeWidget: state => state.activeWidget,
        maxLeft: state => {
            return Math.round(state.page.width - state.activeWidget.contentWidth / state.config.pageScale);
        },
        maxTop: state => {
            return Math.round(state.page.height - state.activeWidget.contentHeight / state.config.pageScale);
        },

        imageList: state => state.imageList,
        dataFiles: state => state.dataFiles
    },
    mutations
})