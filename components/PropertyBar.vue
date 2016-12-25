/**
* Created by Pan on 2016-12-14.
*/
<template>
    <div id="property-bar">
        <div class="title">Property</div>
        <div class="content">
            <div v-if="activeWidget">

                <!-- Public -->
                <fieldset class="form-group">
                    <label>Left</label>
                    <input type="number"
                           class="form-control form-control-sm"
                           id="widget-left"
                           placeholder="widget left"
                           v-bind="{ value: activeWidget.left }"
                           @input="updateWidget({ left: $event.target.value })">
                </fieldset>

                <fieldset class="form-group">
                    <label>Top</label>
                    <input type="number"
                           class="form-control form-control-sm"
                           id="widget-top"
                           placeholder="widget top"
                           v-bind="{ value: activeWidget.top }"
                           @input="updateWidget({ top: $event.target.value })">
                </fieldset>

                <fieldset class="form-group">
                    <label>Z index</label>
                    <input type="number"
                    class="form-control form-control-sm"
                           v-bind="{ value:activeWidget.zIndex }"
                           @input="updateWidget({ zIndex: $event.target.value })"
                    >
                </fieldset>

                <!-- Text -->
                <div v-if="activeWidget.type === WIDGET_TYPES.TEXT">
                    <fieldset class="form-group">
                        <label>Font size</label>
                        <input type="number"
                               class="form-control form-control-sm"
                               id="text-size"
                               placeholder="(number 5 - 20)"
                               v-bind="{ value: activeWidget.fontSize }"
                               @input="updateWidget({ fontSize: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Font family</label>
                        <select class="form-control form-control-sm"
                                v-bind="{ value: activeWidget.fontFamily }"
                                @change="updateWidget({ fontFamily: $event.target.value })"
                        >
                            <option v-for="font in FONT_FAMILY" v-bind:value="font.value">{{ font.name }}</option>
                        </select>
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Font Color</label>
                        <input class="form-control form-control-sm"
                               type="color"
                               v-bind="{ value: activeWidget.fontColor }"
                               @input="updateWidget({ fontColor: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Font Weight</label>
                        <select class="form-control form-control-sm"
                                v-bind="{ value: activeWidget.fontWeight }"
                                @change="updateWidget({ fontWeight: $event.target.value })"
                        >
                            <option v-for="item in FONT_WEIGHT" v-bind:value="item.value">{{ item.name }}</option>
                        </select>
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Font Style</label>
                        <select class="form-control form-control-sm"
                                v-bind="{ value: activeWidget. fontStyle }"
                                @change="updateWidget({  fontStyle: $event.target.value })"
                        >
                            <option v-for="item in FONT_STYLE" v-bind:value="item.value">{{ item.name }}</option>
                        </select>
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Content</label>
                        <input type="text"
                               class="form-control form-control-sm"
                               placeholder="Please input content"
                               v-bind="{ value: activeWidget.value }"
                               @input="updateWidget({ value: $event.target.value })"
                        >
                    </fieldset>
                </div>


                <!-- Image --> <!-- TODO: write with canvas -->
                <div v-if="activeWidget.type === WIDGET_TYPES.IMAGE">
                    <fieldset class="form-group"
                              :disabled="activeWidget.displayMode === IMAGE_DISPLAY_MODE.FIT_HEIGHT.value">
                        <label>Width</label>
                        <input type="number"
                               class="form-control form-control-sm"
                               id="widget-width"
                               placeholder="widget width"
                               v-bind="{ value: activeWidget.width }"
                               @input="updateWidget({ width: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group"
                              :disabled="activeWidget.displayMode === IMAGE_DISPLAY_MODE.FIT_WIDTH.value">
                        <label> Height </label>
                        <input type="number"
                               class="form-control form-control-sm"
                               id="widget-height"
                               placeholder="widget hieght"
                               v-bind="{ value: activeWidget.height }"
                               @input="updateWidget({ height: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Pictrue </label>
                        <select class="form-control form-control-sm"
                                v-bind="{ value: activeWidget.displayMode }"
                                @change="updateWidget({ displayMode: $event.target.value })"
                        >
                            <option v-for="item in IMAGE_DISPLAY_MODE" v-bind="{ value: item.value }">{{ item.name }}
                            </option>
                        </select>
                    </fieldset>

                    <fieldset class="form-group">
                        <label>File</label>
                        <div class="input-group">
                            <input type="file"
                                   class="form-control form-control-sm"
                                   id="image-file"
                                   placeholder="Please select an image file">
                            <div class="input-group-addon">
                                <button>Update</button>
                            </div>
                        </div>
                    </fieldset>
                </div>


                <!-- Barcode -->
                <div v-if="activeWidget.type === WIDGET_TYPES.BARCODE">
                    <fieldset class="form-group">
                        <label>Code value</label>
                        <input type="text"
                               class="form-control form-control-sm"
                               placeholder="Please input number"
                               v-bind="{ value: activeWidget.value }"
                               @input="updateWidget({ value: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Width</label>
                        <input type="number"
                               min=1
                               class="form-control form-control-sm"
                               placeholder="Just integer"
                               v-bind="{ value: activeWidget.width }"
                               @input="updateWidget({ width: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Height</label>
                        <input type="number"
                               min=10
                               class="form-control form-control-sm"
                               v-bind="{ value: activeWidget.height }"
                               @input="updateWidget({ height: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Text</label>
                        <input type="text"
                               class="form-control form-control-sm"
                               v-bind="{ value: activeWidget.text }"
                               @input="updateWidget({ text: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Font Options</label>
                        <select class="form-control form-control-sm"
                                v-bind="{ value: activeWidget.fontOptions }"
                                @change="updateWidget({ fontOptions: $event.target.value })"
                        >
                            <option v-for="item in BARCODE_FONT_OPTIONS" v-bind:value="item.value">{{ item.name }}
                            </option>
                        </select>
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Font</label>
                        <select class="form-control form-control-sm"
                                v-bind="{ value: activeWidget.font }"
                                @change="updateWidget({ font: $event.target.value })"
                        >
                            <option v-for="item in FONT_FAMILY" v-bind:value="item.value">{{ item.name }}</option>
                        </select>
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Font Size</label>
                        <input type="number"
                               min="5"
                               class="form-control form-control-sm"
                               v-bind="{ value: activeWidget.fontSize }"
                               @input="updateWidget({ fontSize: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Text Align</label>
                        <select class="form-control form-control-sm"
                                v-bind="{ value: activeWidget.textAlign }"
                                @change="updateWidget({ textAlign: $event.target.value })"
                        >
                            <option v-for="item in BARCODE_TEXT_ALIGN" v-bind:value="item.value">{{ item.name }}
                            </option>
                        </select>
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Text Position</label>
                        <select class="form-control form-control-sm"
                                v-bind="{ value: activeWidget.textPosition }"
                                @change="updateWidget({ textPosition: $event.target.value })"
                        >
                            <option v-for="item in BARCODE_TEXT_POSITION" v-bind:value="item.value">{{ item.name }}
                            </option>
                        </select>
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Text Margin</label>
                        <input type="number"
                               min=0
                               class="form-control form-control-sm"
                               v-bind="{ value: activeWidget.textMargin }"
                               @input="updateWidget({ textMargin: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-gorup">
                        <label>Background</label>
                        <input type="color"
                               class="form-control form-control-sm"
                               v-bind="{ value: activeWidget.background }"
                               @input="updateWidget({ background: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Line Color</label>
                        <input type="color"
                               class="form-control form-control-sm"
                               v-bind="{ value: activeWidget.lineColor }"
                               @input="updateWidget({ lineColor: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Margin Top</label>
                        <input type="number"
                               min=0
                               class="form-control form-control-sm"
                               v-bind="{ value: activeWidget.marginTop }"
                               @input="updateWidget({ marginTop: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Margin Bottom</label>
                        <input type="number"
                               min=0
                               class="form-control form-control-sm"
                               v-bind="{ value: activeWidget.marginBottom }"
                               @input="updateWidget({ marginBottom: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Margin Left</label>
                        <input type="number"
                               min=0
                               class="form-control form-control-sm"
                               v-bind="{ value: activeWidget.marginLeft }"
                               @input="updateWidget({ marginLeft: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Margin Right</label>
                        <input type="number"
                               min=0
                               class="form-control form-control-sm"
                               v-bind="{ value: activeWidget.marginRight }"
                               @input="updateWidget({ marginRight: $event.target.value })"
                        >
                    </fieldset>
                </div>

                <!-- QR Code -->
                <div v-if="activeWidget.type === WIDGET_TYPES.QR_CODE">
                    <fieldset class="form-group">
                        <label>Value</label>
                        <input type="text"
                               class="form-control form-control-sm"
                               v-bind="{ value: activeWidget.value }"
                               @input="updateWidget({ value: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Width</label>
                        <input type="number"
                               class="form-control form-control-sm"
                               v-bind="{ value: activeWidget.width }"
                               @input="updateWidget({ width: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Height</label>
                        <input type="number"
                               class="form-control form-control-sm"
                               v-bind="{ value: activeWidget.height }"
                               @input="updateWidget({ height: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Background Color</label>
                        <input type="color"
                               class="form-control form-control-sm"
                               v-bind="{ value: activeWidget.background }"
                               @input="updateWidget({ background: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Foreground Color</label>
                        <input type="color"
                               class="form-control form-control-sm"
                               v-bind="{ value: activeWidget.foreground }"
                               @input="updateWidget({ foreground: $event.target.value })"
                        >
                    </fieldset>
                </div>

                <!-- Delete Button -->
                <hr/>
                <button class="btn btn-danger btn-block"
                        @click="deleteWidget">Delete
                </button>
            </div>

            <div v-else>

                <fieldset class="form-group">
                    <label>Width</label>
                    <input type="number"
                           class="form-control form-control-sm"
                           placeholder="page width"
                           v-bind="{ value: page.width }"
                           @input="updatePage({ width: $event.target.value })">
                </fieldset>

                <fieldset class="form-group">
                    <label>Height</label>
                    <input type="number"
                           class="form-control form-control-sm"
                           placeholder="page height"
                           v-bind="{ value: page.height }"
                           @input="updatePage({ height: $event.target.value })">
                </fieldset>

            </div>
        </div>
    </div>
</template>


<script>
    import * as MUTATION_TYPES from "../store/mutationTypes"
    import * as TYPES from "./Types"

    module.exports = {

        data: function () {
            return {
                WIDGET_TYPES: TYPES.WIDGET_TYPES,
                FONT_FAMILY: TYPES.FONT_FAMILY,
                FONT_WEIGHT: TYPES.FONT_WEIGHT,
                FONT_STYLE: TYPES.FONT_STYLE,
                IMAGE_DISPLAY_MODE: TYPES.IMAGE_DISPLAY_MODE,
                BARCODE_FONT_OPTIONS: TYPES.BARCODE_FONT_OPTIONS,
                BARCODE_TEXT_ALIGN: TYPES.BARCODE_TEXT_ALIGN,
                BARCODE_TEXT_POSITION: TYPES.BARCODE_TEXT_POSITION
            }
        },
        computed: {
            page: function () {
                return this.$store.getters.page;
            },

            activeWidget: function () {
                return this.$store.getters.activeWidget;
            }
        },
        methods: {
            updatePage: function (info) {
                this.$store.commit(MUTATION_TYPES.UPDATE_PAGE, info)
            },
            updateWidget: function (info) {
                this.$store.commit(MUTATION_TYPES.UPDATE_WIDGET, info)
            },
            deleteWidget: function () {
                this.$store.commit(MUTATION_TYPES.DELETE_WIDGET)
            }
        }
    }

</script>


<style>

    #property-bar {
        top: 35px;
        right: 0;
        height: calc(100% - 70px);
        width: 200px;
        background-color: #eaeaec;
        position: absolute;
    }

    #property-bar > .content {
        padding: 10px;
        overflow: auto;
        height: calc(100% - 40px);
    }

    input[type=color] {
        padding: 0.3rem;
    }


</style>