
// 首页的主模块

requirejs.config({
    paths:{
        "jquery":"/lib/jquery-3.4.1.min"
    } 
});

define(['jquery','/api/server.js','/js/modules/banner.js'],function($, {getBannerData},initBanner){

    // console.log($);

    getBannerData().then((res)=>{
        initBanner(res);
    });
});