// 文章列表 
$.ajax({
 type:'get',
 url:'/posts',
 data:{
     page:2
 },
 success:function(res){
   // console.log(res);// records一个数组  拿到了已发布的文章 (拿到的是有几页 每一页多少条数据以及总数)
   let html = template('pTp',{data:res.records});
    //console.log(html); //模板 循环
    $('tbody').html(html);
      //分页页码  
      let pageHtml = template('pageTp',res);
     // console.log(pageHtml); //循环模板
   $('.pagination').html(pageHtml);
      

 }
})   

 function changePage(index){
     //alert(index); //点击页码返回 数字
     $.ajax({
      type:'get',
      url:'/posts',
      data:{
          page:index     //index代表变化的页码数字  赋值给page当前页
      },
       success:function(res){
        let html = template('pTp',{data:res.records});
        //console.log(html); //模板 循环
        $('tbody').html(html);   //赋值给页面  此时页面没有变化  内容在变
        let pageHtml = template('pageTp',res);
        // console.log(pageHtml); //循环模板
      $('.pagination').html(pageHtml);  //页码开始变化了


       }


     })
 }


