
// 首页的主模块

requirejs.config({
    paths:{
        "jquery":"/lib/jquery-3.4.1.min"
    } 
});

define(['jquery','/api/server.js','/js/modules/banner.js'],function($, {getBannerData,getGoodsData},initBanner){

    // console.log($);

    getBannerData().then((res)=>{
        initBanner(res);
    });
 
    let phone = 'phone';
    let book = 'book';
    let pad = 'pad';
    getGoodsData('phone').then((res)=>{
        initGoods(phone, res);
    });
    getGoodsData('book').then((res)=>{
        initGoods(book, res);
    });
    getGoodsData('pad').then((res)=>{
        initGoods(pad, res);
    });

    function initGoods(container,data){
        let $container = $('#'+container);
        $container.html(`
        <h2 class="goods_title">${data.title}</h2>
        <ul class="goods_list clearfix">
             ${
                data.goods_list.map((v,i)=>{
                    return `
                        <li>
                            <a href="/views/detail.html" target="_blank">
                                <div><img src="${v.goodsImg}" alt=""></div>
                                <h3>${v.goodsName}</h3>
                                <p>${v.goodsPrice}</p>
                            </a>
                        </li>
                    `;
                }).join('').repeat(3)
             }
        </ul>    
        `);
    }

});