/**
* Created by Pan on 2016-12-14.
*/
<template>
    <div id="work-space">
        <div class="title">Work Space</div>
        <div class="content">
            <div id="page"
                 v-bind:style="{
                    width: pageWidth,
                    height: pageHeight,
                    transform: getPageScale
                 }"
                 @click="pageClick"
            >
                <app-widget v-for="item in widgets"
                            v-bind="{type: item.type, id: item.id}">
                </app-widget>
            </div>
        </div>
        <div>
            <button class="" @click="setPageScale( pageScale - 0.25 )">-</button>
            <button class="" @click="setPageScale( 1 )">100%</button>
            <select @change="setPageScale( $event.target.value )"
                    v-bind="{ value: pageScale }"
            >
                <option value=0.25>25%</option>
                <option value=0.5>50%</option>
                <option value=0.75>75%</option>
                <option value=1>100%</option>
                <option value=1.25>125%</option>
                <option value=1.5>150%</option>
                <option value=1.75>175%</option>
                <option value=2>200%</option>
            </select>
            <button>FILL</button>
            <button class="" @click="setPageScale( pageScale + 0.25 )">+</button>
        </div>
    </div>
</template>

<script>
    import * as MUTATION_TYPES from "../store/mutationTypes"
    import {WIDGET_TYPES} from "./Types"
    import AppWidget from "./Widget.vue"

    module.exports = {
        data: function () {
            return {};
        },

        computed: {
            widgets: function () {
                return this.$store.getters.widgets;
            },
            pageWidth: function () {
                return this.$store.getters.page.width + "px";
            },
            pageHeight: function () {
                return this.$store.getters.page.height + "px";
            },
            pageScale: function () {
                return this.$store.getters.config.pageScale;
            },
            getPageScale: function () {
                return "scale(" + this.$store.getters.config.pageScale + ")";
            }
        },

        methods: {
            pageClick: function (event) {
                console.log("Page clicked!");
                this.$store.commit(MUTATION_TYPES.ACTIVE_WIDGET, null);

            },

            setPageScale: function (scale) {
                if (scale >= 0.25 && scale <= 2) {
                    this.$store.commit(MUTATION_TYPES.CONFIG_UPDATE, {pageScale: scale});
                }
            }

        },

        components: {
            AppWidget
        }
    }
</script>

<style>

    #work-space {
        float: left;
        height: 400px;
        width: calc(100% - 270px);
        background-color: #929292;
    }

    #work-space > .content {
        overflow: auto;
        background-color: #d8d4d7;
        height: calc(100% - 60px);
    }

    #page {
        /*border: 2px solid rgba(0, 0, 0, 0.18);*/
        margin: 20px;
        background-color: #ffffff;
        position: relative;
        left: 200px;
        top: 30px;
        outline-offset: 4px;
        outline: #c3c3c3 dashed 3px;
        border-radius: 2px;
    }

    #space {
        background-color: rgba(121, 118, 119, 0.4);
        position: relative;

    }
</style>