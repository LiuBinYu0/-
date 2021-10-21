
// 本地存储中存储的就是数组 var cartList = [];

define(["jquery"],function(){

    let key = 'cartList';

    // 通过这个函数完成数据的筛选，本地存储已有的时候进行累加，购本地存储没有的时候进行新添加
    function addCartStorage(nowData,cb){
        // console.log(nowData);

        let cartList = getCartStorage();
        let flag = true;
        let index = 0;
        for(let i =0;i<cartList.length;i++){
            if( cartList[i].goodsName === nowData.goodsName && cartList[i].goodsColor === nowData.goodsColor){
                flag = false;
                index = i;
            }
        }   
        if(flag){   //要新添加一条数据到本地存储
            cartList.push(nowData);
           
            
        }
        else{      //对已有的数据进行累加操作

            cartList[index].goodsNumber += nowData.goodsNumber;     
        }
        setCartStorage(cartList);
        cb && cb();
       
    }

    // 普通的本地存储的设置操作
    function setCartStorage(cartList){
        localStorage.setItem(key,JSON.stringify(cartList));
    }

    // 本地存储的获取操作
    function getCartStorage(){
        if(localStorage.getItem(key)){
            return JSON.parse(localStorage.getItem(key));
        }
        else{
            return [];
        }
    }

    return {
        addCartStorage,
        setCartStorage,
        getCartStorage    
    };

});