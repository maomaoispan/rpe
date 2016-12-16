/**
* Created by Pan on 2016-12-14.
*/
<template>
    <div id="property-bar">
        <div class="title">Property</div>
        <div class="content">
            <form>
                <fieldset class="form-group">
                    <label>Width</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="page-width" placeholder="page width">
                        <div class="input-group-addon">mm</div>
                    </div>
                </fieldset>
                <fieldset class="form-group">
                    <label>Height</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="page-height" placeholder="page hieght">
                        <div class="input-group-addon">mm</div>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                selectedType: "image"
            }
        },
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