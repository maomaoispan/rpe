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

    .title {
        height: 30px;
        border: 1px solid #838383;
        padding: 3px;
    }

    .title {
        background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, #b8b8b8 100%);
    }
</style>