// 购物车的主模块

requirejs.config({
    paths:{
        "jquery":"/lib/jquery-3.4.1.min"
    } 
});

define(['jquery', '/js/modules/cartStorage.js'],function($,{ getCartStorage,setCartStorage }){

    let $cart = $('#cart');
    let $cart_list = $cart.find('.cart_list');
    let $cart_title_selectAll = $cart.find('.cart_title_selectAll');
    let $cart_computed_all = $cart.find('.cart_computed_all');
    let $cart_computed_num = $cart.find('.cart_computed_num');
    initCart();
    bindCart();
    // 初始购物车列表渲染
    function initCart(){
        let cartList = getCartStorage();
        $cart_list.html(cartList.map((v)=>{
            return `
                <li>
                    <div>${v.isChecked ? '<input class="cart_list_cb" type="checkbox" checked>' :'<input class="cart_list_cb" type="checkbox">'}</div>
                    <div>${v.goodsName} ( ${v.goodsColor} )</div>
                    <div>¥ ${v.goodsPrice}.00</div>
                    <div>
                        <span class="cart_list_removebtn">-</span>
                        <input class="cart_list_text" type="text" value="${v.goodsNumber}">
                        <span class="cart_list_addbtn">+</span>
                    </div>
                    <div>¥ ${v.goodsPrice * v.goodsNumber}.00</div>
                    <div class="cart_list_close">删除</div>
                </li>
            `;
        }).join(''));

        let flag = true;
        for (let i=0;i<cartList.length;i++){
            if( cartList[i].isChecked === false){
                flag = false;
            }
        }

        // if(flag){ // 全部选中
            
        // }
        // else{   //有至少一个没有选中
             
        // }
        // arrt() -> 内存 ->getAttribute() setAttribute
        // prop() -> 内部 ->. []
        $cart_title_selectAll.prop('checked',flag);
  

        // 完成总计的渲染
        let all = 0;
        let num = 0;
        for(let i=0;i<cartList.length;i++){
            num += cartList[i].goodsNumber;
            all += cartList[i].goodsNumber * cartList[i].goodsPrice;

        }

        $cart_computed_all.html(all);
        $cart_computed_num.html(num);
    }
    // 给购物车添加交互操作 
    function bindCart(){
        // 进行DOM操作的同时，也要处理本地操作。那直接进行本地存储的操作

        $cart.on ('click','.cart_list_addbtn',function(){

            let cartList = getCartStorage();
            let index = $(this).closest('li').index();
            cartList[index].goodsNumber++;
            setCartStorage(cartList);
            initCart();
        });

        $cart.on ('click','.cart_list_removebtn',function(){

            let cartList = getCartStorage();
            let index = $(this).closest('li').index();
            cartList[index].goodsNumber--;
            setCartStorage(cartList);
            initCart();

        });

        // 删除
        $cart.on ('click','.cart_list_close',function(){
            let cartList = getCartStorage();
            let index = $(this).closest('li').index();
            cartList.splice(index,1);
            setCartStorage(cartList);
            initCart();

        });

        // 复选框
        $cart.on('click','.cart_list_cb',function(){
            let cartList = getCartStorage();
            let index = $(this).closest('li').index();
            cartList[index].isChecked = this.checked;
            setCartStorage(cartList);
            initCart();
        });

        //全选按钮
         $cart_title_selectAll.on('click',function(){
            let cartList = getCartStorage();
            let isChecked = this.checked;
            for(let i =0;i<cartList.length;i++){
                cartList[i].isChecked = isChecked;
                setCartStorage(cartList);
                initCart();
            }
         });

    }
});