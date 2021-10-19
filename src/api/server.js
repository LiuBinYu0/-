


define(['jquery'],function($){

    function getBannerData(){
        // return出去的是promise对象，所以外面就可以 .then()的方式进行调用
        return $.ajax('/api/mock/banner.json');
    }

    function getBanner2Data(){
        return $.ajax('/api/mock/banner2.json');
    }

    return{
        getBannerData,
        getBanner2Data
    };
});