/**
* Created by Pan on 2016-12-14.
*/

<template>
    <div id="app">

        <app-header></app-header>

        <app-tool-bar></app-tool-bar>

        <app-space></app-space>

        <app-file></app-file>

        <app-property-bar></app-property-bar>

        <app-footer></app-footer>
    </div>

</template>

<script>
    import AppHeader from "./Header.vue";
    import AppToolBar from "./ToolBar.vue";
    import AppSpace from "./WorkSpace.vue";
    import AppFile from "./File.vue";
    import AppPropertyBar from "./PropertyBar.vue";
    import AppFooter from "./Footer.vue"

    export default{
        components: {
            AppHeader,
            AppToolBar,
            AppSpace,
            AppFile,
            AppPropertyBar,
            AppFooter
        }
    }
</script>

<style>
    html, #app {
        height: 100%;
        font-size: 15px;
    }

    body {
        padding: 0;
        border: 0;
        height: 100%;
        max-height: 100%;
        position: relative;
    }

    #header {
        background-color: #4982a7;
        height: 35px;
    }

    #tool-bar {
        float: left;
        width: 70px;
        height: calc(100% - 70px);
        background-color: #eaeaec;
    }



    #file {
        float: left;
        height: calc(100% - 370px);
        width: calc(100% - 270px);
        background-color: #7c7a79;
    }


    #footer {
        left: 0;
        bottom: 0;
        height: 35px;
        width: 100%;
        background-color: #c0c0c0;
        position: absolute;
    }

    .title{
        height: 30px;
        border: 1px solid #838383;
        padding: 3px;
    }

     .title {
        background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, #b8b8b8 100%);
    }
</style>