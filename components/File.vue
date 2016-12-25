/**
* Created by Pan on 2016-12-14.
*/

<template>
    <div id="file">
        <div class="title">PDF File</div>
        <div class="content">
            <!--<iframe src="http://m.oschina.net"></iframe>-->
            <iframe ></iframe>
        </div>
    </div>
</template>


<style>


    #file > .content > iframe {
        width: 100%;
        height: 100%;
        /*font-family: 文鼎霹雳体;*/
    }

    #file > .content {
        overflow: hidden;
        height: calc(100% - 30px);
    }


    #file {
        float: left;
        height: calc(100% - 470px);
        width: calc(100% - 270px);
        background-color: #7c7a79;
    }
</style>