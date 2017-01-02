/**
 * Created by Pan on 2016-12-23.
 */


// Widget Types
export const WIDGET_TYPES = {
    TEXT: "TEXT",
    IMAGE: "IMAGE",
    BARCODE: "BARCODE",
    QR_CODE: "QR_CODE"
}


// Text Types
export const FONT_STYLE = {
    NORMAL: {value: "normal", name: "Normal"},
    ITALIC: {value: "italic", name: "Italic"},
    OBLIQUE: {value: "oblique", name: "Oblique"}
}

export const FONT_WEIGHT = {
    NORMAL: {value: "normal", name: "Normal"},
    BOLD: {value: "bold", name: "Bold"},
    BOLDER: {value: "bolder", name: "Bolder"},
    LIGHTER: {value: "lighter", name: "Lighter"}
}

export const FONT_FAMILY = {
    SUN_TI: {value: "宋体", name: "宋体"},
    KAI_TI: {value: "楷体", name: "楷体"},
    HEI_TI: {value: "黑体", name: "黑体"},
    YOU_YUAN: {value: "幼圆", name: "幼圆"},
    MICROSOFT_YA_HEI: {value: "微软雅黑", name: "微软雅黑"}
}


// Image types
export const IMAGE_DISPLAY_MODE = {
    FIT_WIDTH: {value: "fitWidth", name: "Fit Width"},
    FIT_HEIGHT: {value: "fitHeight", name: "Fit Height"},
    STRETCH: {value: "stretch", name: "Stratch"}
}


// Barcode Types
export const BARCODE_FONT_OPTIONS = {
    NONE: {value: "", name: "None"},
    BOLD: {value: "bold", name: "Bold"},
    ITALIC: {value: "italic", name: "italic"},
    BOLD_ITALIC: {value: "bold italic", name: "Bold & Italic"},
}

export const BARCODE_TEXT_ALIGN = {
    LEFT: {value: "left", name: "Left"},
    CENTER: {value: "center", name: "Center"},
    RIGHT: {value: "right", name: "Right"}
}

export const BARCODE_TEXT_POSITION = {
    TOP: {value: "top", name: "Top"},
    BOTTOM: {value: "bottom", name: "Bottom"}
}

export const WORKSPACE_SPLIT = {
    VERTICAL: 0,
    HORIZONAL: 1
}