/**
* Created by Pan on 2016-12-14.
*/
<template>
    <div id="property-bar">
        <div class="title">Property</div>
        <div class="content">
            <form v-show="type ==='page'">
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
            <form v-show="type ==='text'">
                <fieldset class="form-group">
                    <label>Left</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="text-left" placeholder="text left">
                        <div class="input-group-addon">mm</div>
                    </div>
                </fieldset>
                <fieldset class="form-group">
                    <label>Top</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="text-top" placeholder="text top">
                        <div class="input-group-addon">mm</div>
                    </div>
                </fieldset>
                <fieldset class="form-group">
                    <label>Content</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="text-content" placeholder="Please input content">
                    </div>
                </fieldset>
            </form>
            <form v-show="type ==='image'">
                <fieldset class="form-group">
                    <label>Left</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="image-left" placeholder="image left">
                        <div class="input-group-addon">mm</div>
                    </div>
                </fieldset>
                <fieldset class="form-group">
                    <label>Top</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="image-top" placeholder="image top">
                        <div class="input-group-addon">mm</div>
                    </div>
                </fieldset>
                <fieldset class="form-group">
                    <label>Width</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="image-width" placeholder="image width">
                        <div class="input-group-addon">mm</div>
                    </div>
                </fieldset>
                <fieldset>
                    <label>Height</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="image-height" placeholder="image height">
                        <div class="input-group-addon">mm</div>
                    </div>
                </fieldset>
                <fieldset class="form-group">
                    <label>File</label>
                    <div class="input-group">
                        <input type="file" class="form-control" id="image-file"
                               placeholder="Please select an image file">
                        <div class="input-group-addon">
                            <button>Update</button>
                        </div>
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
                type: "page"
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