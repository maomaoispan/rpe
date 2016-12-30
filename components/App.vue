/**
* Created by Pan on 2016-12-14.
*/

<template>
    <div id="app">

        <AppHeader></AppHeader>

        <div id="content">
            <AppToolBar></AppToolBar>

            <AppWorkSpace></AppWorkSpace>

            <AppPropertyBar></AppPropertyBar>
        </div>

        <AppFooter></AppFooter>
    </div>

</template>

<script>
    import AppHeader from "./Header.vue";
    import AppToolBar from "./WidgetBar.vue";
    import AppWorkSpace from "./WorkSpace.vue";
    import AppPropertyBar from "./PropertyBar.vue";
    import AppFooter from "./Footer.vue"

    export default{
        components: {
            AppHeader,
            AppToolBar,
            AppWorkSpace,
            AppPropertyBar,
            AppFooter
        }
    }
</script>

<style>

    html, body {
        width: 100%;
        height: 100%;
        min-width: 500px;
        min-height: 400px;
    }

    #app {
        width: 100%;
        height: 100%;
    }

    #content {
        display: flex;
        height: calc(100% - 110px);
    }

</style>