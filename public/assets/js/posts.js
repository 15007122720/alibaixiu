// 文章列表 
$.ajax({
 type:'get',
 url:'/posts',
 data:{
     page:1
 },
 success:function(res){
    //console.log(res);// records一个数组  拿到了已发布的文章 
   let html = template('pTp',{data:res.records});
    //console.log(html); //模板 循环
    $('tbody').html(html);

 }
})   