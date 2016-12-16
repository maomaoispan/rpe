/**
* Created by Pan on 2016-12-14.
*/
<template>
    <div id="space">
        <div class="title">Space</div>
        <div class="content">
            <div id="page" v-bind:style="{ width: getPageWidth, height: getPageHeight }">
                <app-widget type="text"></app-widget>
                <app-widget type="image"></app-widget>
            </div>
        </div>
    </div>
</template>

<script>
    import AppWidget from "../components/Widget.vue"

    module.exports = {
        data: function () {
            return {
                pageWidth: "390",
                pageHeight: "250"
            }
        },

        computed: {
            getPageWidth: function () {
                return this.pageWidth + "px";
//                return ( $("#space").width() - 20) + "px";
            },
            getPageHeight: function () {
                return this.pageHeight + "px";
//                return ( $("#space").height() - 90) + "px";
            }
        },

        methods: {
            pageClick: function () {
                console.log("Page clicked!")
            }
        },

        components:{
            AppWidget
        }
    }
</script>

<style>

    #page {
        border: 2px solid rgba(0, 0, 0, 0.18);
        margin: 10px;
        background-color: #f6f6f6;
    }


</style>