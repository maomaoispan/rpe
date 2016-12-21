/**
* Created by Pan on 2016-12-14.
*/
<template>
    <div id="space">
        <div class="title">Work Space</div>
        <div class="content">
            <div id="page" v-bind:style="{ width: pageWidth, height: pageHeight }" @click="pageClick">
                <app-widget
                        v-for="item in widgets"
                        v-bind:type="item.type"
                        v-bind:id="item.id">
                </app-widget>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "../store/mutation-types"
    import AppWidget from "./Widget.vue"

    module.exports = {
        data: function () {
            return {
                a: 20
            };
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
            }
        },

        methods: {
            pageClick: function (event) {
                console.log("Page clicked!");
                this.$store.commit(types.ACTIVE_WIDGET, null);

            },

        },

        components: {
            AppWidget
        }
    }
</script>

<style>

    #page {
        border: 2px solid rgba(0, 0, 0, 0.18);
        margin: 10px;
        background-color: #f6f6f6;
        position: relative;
    }
</style>