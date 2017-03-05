<template>
    <nav class="navbar navbar-full navbar-dark bg-inverse">

        <button class="navbar-toggler hidden-sm-up"
                type="button"
                data-toggle="collapse"
                data-target="#collapse-header">
        </button>

        <div class="collapse navbar-toggleable-xs" id="collapse-header">
            <a class="navbar-brand" href="#">Rapid Label</a>

            <ul class="nav navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home</a>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle"
                       href="#"
                       id="dropdown-file"
                       data-toggle="dropdown"
                    >File</a>
                    <div class="dropdown-menu" aria-labelledby="dropdown-file">
                        <a class="dropdown-item" href="#">Save</a>
                        <a class="dropdown-item" href="#">Open</a>
                    </div>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle"
                       href="#"
                       id="dropdown-database"
                       data-toggle="dropdown"
                    >DataBase</a>
                    <div class="dropdown-menu" aria-labelledby="dropdown-database">
                        <a class="dropdown-item" href="#">Import</a>
                        <a class="dropdown-item" href="#">Export</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Manage</a>
                    </div>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle"
                       href="#"
                       id="dropdonw-view"
                       data-toggle="dropdown"
                    >
                        View
                    </a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" @click="setWorkspaceSplit( SPLIT.VERTICAL )">[ - ]Vertical</a>
                        <a class="dropdown-item" href="#" @click="setWorkspaceSplit( SPLIT.HORIZONAL )">[ | ]Horizontal</a>
                    </div>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle"
                       href="#"
                       id="dropdown-help"
                       data-toggle="dropdown"
                    >
                        Help
                    </a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">About</a>
                        <a class="dropdown-item" href="#">Help</a>
                        <a class="dropdown-item" href="#">FAQ</a>
                    </div>
                </li>
            </ul>

            <button class="btn float-xs-right">Sign in</button>
        </div>
    </nav>
</template>

<script>

    import * as MUTATION_TYPES from "../store/mutationTypes";
    import * as TYPES from "./Types";


    module.exports = {
        data: function () {
            return {
                SPLIT: TYPES.WORKSPACE_SPLIT
            }
        },

        methods: {
            setWorkspaceSplit: function (type) {
                this.$store.commit(MUTATION_TYPES.CONFIG_UPDATE, {workspaceSplit: type});
                setTimeout(function () {
                    $(window).trigger("resize");
                },100)
            }
        }
    }

</script>

<style>

</style>
