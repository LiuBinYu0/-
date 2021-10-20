// 详情页的主模块

requirejs.config({
    paths:{
        "jquery":"/lib/jquery-3.4.1.min"
    } 
});

define(['jquery', '/api/server.js', '/js/modules/banner.js'], function($, { getBanner2Data, getDetailData }, initBanner){

     //console.log($);

     getBanner2Data().then((res)=>{
        initBanner(res);
    });

    // 拿到URL传递过来的数据

    let goodsId = location.href.match(/goodsId=([^&]+)/)[1];
    let type = location.href.match(/type=([^&]+)/)[1];


    getDetailData(goodsId, type).then((data)=>{
        //data 就是 res.goods_list[i]
        // console.log(data);
        initDetail(data);
    });

    let $detail_gallery = $('.detail_gallery');
    let $detail_message = $('.detail_message');
    let $detailGoods = $('#detailGoods');

     //初始化详情页
     function initDetail(data){
        $detail_gallery.html(`
            <div class="detail_gallery_normal">
                <img src="${data.photoNormal}" alt="">
                <span></span>
            </div>
            <div class="detail_gallery_large">
                <img src="${data.photoLarge}" alt="">
            </div>
        `);
        $detail_message.html(`
            <h2>${data.goodsName}</h2>
            <p>价 格 <span class="detail_message_price">¥${data.goodsPrice}.00</span></p>
            <p>选择颜色 
                ${ data.chooseColor.map((v)=>{
                    return `<span class="detail_message_box">${v}</span>`;
                }).join('') }
            </p>
            <div class="detail_message_btn clearfix">
                <div class="detail_message_num l">
                    <input type="text" value="1">
                    <span>+</span>
                    <span>-</span>
                </div>
                <div class="detail_message_cart l"><a href="#">加入购物车</a></div>
                <div class="detail_message_computed l"><a href="#">立即下单</a></div>
            </div>
        `);
        $detailGoods.html(`
            <h3>-- 商品详情 --</h3>
            ${
                data.goodsInfo.map((v)=>{
                    return `<img src="${v}" alt="">`;
                }).join('')
            }
        `);

      
    }

     
});