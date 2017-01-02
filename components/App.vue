/**
* Created by Pan on 2016-12-14.
*/

<template>
    <div id="app">

        <AppHeader></AppHeader>

        <div id="container">
            <AppWidgetBar></AppWidgetBar>

            <AppWorkSpace></AppWorkSpace>

            <AppPropertyBar></AppPropertyBar>
        </div>

        <AppFooter></AppFooter>
    </div>

</template>

<script>
    import AppHeader from "./Header.vue";
    import AppWidgetBar from "./WidgetBar.vue";
    import AppWorkSpace from "./WorkSpace.vue";
    import AppPropertyBar from "./PropertyBar.vue";
    import AppFooter from "./Footer.vue"

    export default{
        components: {
            AppHeader,
            AppWidgetBar,
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
        min-width: 600px;
        min-height: 400px;
        padding: 0;
        margin: 0;
        display: flex;
        overflow: auto;
    }

    #app {
        display: flex;
        flex: auto;
        flex-flow: column;
        overflow: auto;
    }

    #container {
        display: flex;
        flex: auto;
        flex-flow: row;
    }

    .item-header, .item-footer {
        padding: 1px 4px 1px 4px;
        border: 1px solid #838383;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, #b8b8b8 100%);
        display: flex;
        flex: 0 0 32px;
        flex-flow: row;
        justify-content: space-between;
        overflow: auto;
    }

    .item-content {
        flex-flow:column;
        display: flex;
        padding: 10px;
        flex: auto;
        overflow: auto;
        border: 1px solid #838383;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, #b8b8b8 100%);
    }

</style>