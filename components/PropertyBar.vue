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
                    <div class="input-group">
                        <input type="number"
                               class="form-control"
                               id="widget-left"
                               placeholder="widget left"
                               v-bind="{ value: activeWidget.left }"
                               @input="updateWidget({ left: $event.target.value })">
                        <div class="input-group-addon">mm</div>
                    </div>
                </fieldset>

                <fieldset class="form-group">
                    <label>Top</label>
                    <div class="input-group">
                        <input type="number"
                               class="form-control"
                               id="widget-top"
                               placeholder="widget top"
                               v-bind="{ value: activeWidget.top }"
                               @input="updateWidget({top: $event.target.value})">
                        <div class="input-group-addon">mm</div>
                    </div>
                </fieldset>


                <!-- Text -->
                <div v-if="activeWidget.type === WIDGET_TYPES.TEXT">
                    <fieldset class="form-group">
                        <label>Font size</label>
                        <input type="number"
                               class="form-control"
                               id="text-size"
                               placeholder="(number 5 - 20)"
                               v-bind="{ value: activeWidget.fontSize }"
                               @input="updateWidget({ fontSize: $event.target.value })"
                        >
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Font family</label>
                        <select class="form-control"
                                v-bind="{ value: activeWidget.fontFamily }"
                                @change="updateWidget({ fontFamily: $event.target.value })"
                        >
                            <option value="宋体">宋体</option>
                            <option value="楷体">楷体</option>
                            <option value="黑体">黑体</option>
                            <option value="幼圆">幼圆</option>
                            <option value="微软雅黑">微软雅黑</option>
                        </select>
                    </fieldset>

                    <!-- TODO: Font Color -->

                    <fieldset class="form-group">
                        <label>Content</label>
                        <input type="text"
                               class="form-control"
                               id="text-content"
                               placeholder="Please input content"
                               v-bind="{ value: activeWidget.value }"
                               @input="updateWidget({ value: $event.target.value })"
                        >
                    </fieldset>
                </div>


                <!-- Image -->
                <div v-if="activeWidget.type === WIDGET_TYPES.IMAGE">
                    <fieldset class="form-group"
                              :disabled="activeWidget.displayMode === IMAGE_DISPLAY_TYPES.FIT_HEIGHT">
                        <label>Width</label>
                        <div class="input-group">
                            <input type="number"
                                   class="form-control"
                                   id="widget-width"
                                   placeholder="widget width"
                                   v-bind="{ value: activeWidget.width }"
                                   @input="updateWidget({ width: $event.target.value })"
                            >
                            <div class="input-group-addon">mm</div>
                        </div>
                    </fieldset>

                    <fieldset class="form-group" :disabled="activeWidget.displayMode === IMAGE_DISPLAY_TYPES.FIT_WIDTH">
                        <label> Height </label>
                        <div class="input-group ">
                            <input type="number"
                                   class="form-control"
                                   id="widget-height"
                                   placeholder="widget hieght"
                                   v-bind="{ value: activeWidget.height }"
                                   @input="updateWidget({ height: $event.target.value })"
                            >
                            <div class="input-group-addon">mm</div>
                        </div>
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Pictrue </label>
                        <select class="form-control"
                                v-bind="{ value: activeWidget.displayMode }"
                                @change="updateWidget({ displayMode: $event.target.value })"
                        >
                            <option value="FIT_WIDTH">Fit width</option>
                            <option value="FIT_HEIGHT">Fit height</option>
                            <option value="STRETCH">Stretch</option>
                        </select>
                    </fieldset>

                    <fieldset v-if="activeWidget.type === WIDGET_TYPES.IMAGE" class="form-group">
                        <label>File</label>
                        <div class="input-group">
                            <input type="file"
                                   class="form-control"
                                   id="image-file"
                                   placeholder="Please select an image file">
                            <div class="input-group-addon">
                                <button>Update</button>
                            </div>
                        </div>
                    </fieldset>
                </div>


                <!-- Barcode -->


                <!-- QR Code -->


                <!-- Delete Button -->
                <hr/>
                <button class="btn btn-danger btn-block"
                        @click="deleteWidget">Delete
                </button>
            </div>

            <div v-else>

                <fieldset class="form-group">
                    <label>Width</label>
                    <div class="input-group">
                        <input type="number"
                               class="form-control"
                               placeholder="page width"
                               v-bind="{ value: page.width }"
                               @input="updatePage({ width: $event.target.value })">
                        <div class="input-group-addon">mm</div>
                    </div>
                </fieldset>

                <fieldset class="form-group">
                    <label>Height</label>
                    <div class="input-group">
                        <input type="number"
                               class="form-control"
                               placeholder="page height"
                               v-bind="{ value: page.height }"
                               @input="updatePage({ height: $event.target.value })">
                        <div class="input-group-addon">mm</div>
                    </div>
                </fieldset>

            </div>
        </div>
    </div>
</template>


<script>
    import * as MUTATION_TYPES from "../store/mutationTypes"
    import  {WIDGET_TYPES} from "./Types"
    import  {IMAGE_DISPLAY_TYPES} from "./Types"

    module.exports = {

        data: function () {
            return {
                type: "page",
                WIDGET_TYPES: WIDGET_TYPES,
                IMAGE_DISPLAY_TYPES: IMAGE_DISPLAY_TYPES
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

    }

    #property-bar > .content {
        padding: 10px;
        overflow: auto;
        height: calc(100% - 40px);
        /*background-color: #d2cdcf;*/
    }

</style>