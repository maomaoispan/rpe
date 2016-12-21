/**
* Created by Pan on 2016-12-14.
*/
<template>
    <div id="property-bar">
        <div class="title">Property</div>
        <div class="content">
            <div v-if="activeWidget">

                <fieldset class="form-group">
                    <label>Left</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="widget-left" placeholder="widget left"
                               v-bind="{ value: activeWidget.left }" @input="updateWidget({left: $event.target.value})">
                        <div class="input-group-addon">mm</div>
                    </div>
                </fieldset>

                <fieldset class="form-group">
                    <label>Top</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="widget-top" placeholder="widget top"
                               v-bind="{ value: activeWidget.top }" @input="updateWidget({top: $event.target.value})">
                        <div class="input-group-addon">mm</div>
                    </div>
                </fieldset>

                <fieldset class="form-group">
                    <label>Width</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="widget-width" placeholder="widget width"
                               v-bind="{ value: activeWidget.width }">
                        <div class="input-group-addon">mm</div>
                    </div>
                </fieldset>

                <fieldset class="form-group">
                    <label>Height</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="widget-height" placeholder="widget hieght"
                               v-bind="{ value: activeWidget.height }">
                        <div class="input-group-addon">mm</div>
                    </div>
                </fieldset>

                <fieldset v-if="activeWidget.type === 'text' " class="form-group">
                    <label>Content</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="text-content" placeholder="Please input content"
                               v-bind="{ value: activeWidget.text }" @input="updateWidget({text:$event.target.value})">
                    </div>
                </fieldset>

                <fieldset v-if="activeWidget.type === 'image' " class="form-group">
                    <label>File</label>
                    <div class="input-group">
                        <input type="file" class="form-control" id="image-file"
                               placeholder="Please select an image file">
                        <div class="input-group-addon">
                            <button>Update</button>
                        </div>
                    </div>
                </fieldset>
                <hr/>
                <button class="btn btn-danger btn-block" @click="deleteWidget">Delete</button>
            </div>

            <div v-else>

                <fieldset class="form-group">
                    <label>Width</label>
                    <div class="input-group">
                        <input type="number" class="form-control" placeholder="page width"
                               v-bind="{ value: page.width }" @input="updatePage({width: $event.target.value})">
                    </div>
                </fieldset>

                <fieldset class="form-group">
                    <label>Height</label>
                    <div class="inpu-group">
                        <input type="number" class="form-control" placeholder="page height"
                               v-bind="{ value: page.height }" @input="updatePage({height: $event.target.value})">
                    </div>
                </fieldset>

            </div>
        </div>
    </div>
</template>


<script>
    import * as types from "../store/mutation-types"

    module.exports = {

        data: function () {
            return {
                type: "page",
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
                this.$store.commit(types.UPDATE_PAGE, info)
            },
            updateWidget: function (info) {
                this.$store.commit(types.UPDATE_WIDGET, info)
            },
            deleteWidget: function () {
                this.$store.commit(types.DELETE_WIDGET)
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