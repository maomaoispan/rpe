/**
* Created by Pan on 2016-12-14.
*/

<template>
    <div id="file">
        <div class="title">File</div>
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
    }

    #file > .content {
        overflow: hidden;
        height: calc(100% - 30px);
    }
</style>