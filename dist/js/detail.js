// 详情页的主模块

requirejs.config({
    paths:{
        "jquery":"/lib/jquery-3.4.1.min"
    } 
});

define(['jquery', '/api/server.js', '/js/modules/banner.js','/js/modules/cartStorage.js'], function($, { getBanner2Data, getDetailData }, initBanner,{addCartStorage}){

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
                        <input class="detail_message_number" type="text" value="1">
                        <span class="detail_message_addbtn">+</span>
                        <span class="detail_message_removebtn">-</span>
                    </div>
                    <div class="detail_message_cart l"><a href="javascript:;">加入购物车</a></div>
                    <div class="detail_message_computed l"><a href="/views/cart.html">立即下单</a></div>
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

        bindGallery();
        bindMessage(data);
    }

    // 完成放大镜功能
    function bindGallery(){
        $detail_gallery.on('mouseover','.detail_gallery_normal',function(){
            let $span = $(this).find('span');
            let $big = $(this).next();
            $span.show();
            $big.show();
        });

        $detail_gallery.on('mouseout','.detail_gallery_normal',function(){
            let $span = $(this).find('span');
            let $big = $(this).next();

            $span.hide();
            $big.hide();

        });

        $detail_gallery.on('mousemove','.detail_gallery_normal',function(ev){
            let $span = $(this).find('span'); 
            let $big = $(this).next();
            let L =  ev.pageX - $(this).offset().left - $span.width()/2; 
            let T = ev.pageY - $(this).offset().top - $span.height()/2;
             if(L<0){
                L = 0;
             }
             else if(L>$(this).width() - $span.width()){
                 L = $(this).width() - $span.width();
             }
             if(T<0){
                T = 0;
             }
             else if(T>$(this).height() - $span.height()){
                 T = $(this).height() - $span.height();
             }
            $span.css({
                left: L,
                top: T
            });

            let scaleX = L/($(this).width() - $span.width());
            let scaleY = T/($(this).height() - $span.height());

            $big.children().css({
                left: - scaleX * ($big.children().width() - $big.width()),
                top: - scaleY *  ($big.children().height() - $big.height())
            })

        });      
    }

    // 完成商品的详情功能
    function bindMessage(data){
        
        let nowColor;
        

         $detail_message.on('click','.detail_message_box',function(){

            $(this).addClass('active').siblings().removeClass('active');
            nowColor = $(this).html();

         });

         let $detail_message_number = $detail_message.find('.detail_message_number');  
         $detail_message.on('click','.detail_message_addbtn',function(){
            let newNumber = Number($detail_message_number.val()) + 1;
            $detail_message_number.val(newNumber);
         });

         $detail_message.on('click','.detail_message_removebtn',function(){
            let newNumber = Number($detail_message_number.val()) - 1;
            if(newNumber>0){
                $detail_message_number.val(newNumber);
            }
            
         });

         $detail_message_number.on('input',function(){
            //  不能为空，并且非数字，这样就会触发if
             if($(this).val() !== '' && !Number($(this).val())){
                 $(this).val(1);
             }
         });

         $detail_message.on('click','.detail_message_cart',function(){
            console.log(111)
            let nowData = {
                goodsName:data.goodsName ,
                goodsColor:nowColor ,
                goodsPrice:data.goodsPrice,
                goodsNumber:Number($detail_message_number.val()) ,
                isChecked:true,
            };

            addCartStorage(nowData, function(){
                alert('添加购物车成功')
            });

         });
    }
     
}); 