//定义数组
 let userArr = [];

 $.ajax({
    type:'get',
    url:'/users',
    success:function(res){
        //console.log(res);
        userArr = res;    //把响应回来的数据给 空数组
        render(); //调用下面的函数
    }
 })

   //定义render()方法，用来渲染页面
   function render(){       //userTpl是模板id，响应的数据就是data  传给html
      let html = template('userTpl',{data:userArr});
      //console.log(html);  tbody表格打印
         
   
    $('tbody').html(html); 

   }
