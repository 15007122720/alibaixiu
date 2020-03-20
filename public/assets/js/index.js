//仪表盘页面 
//获取文章数量
$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function (res) {
        // console.log(res);
        $('#post').html('<strong>' + res.postCount + '</strong>篇文章（<strong>' + res.draftCount + '</strong>篇草稿）</li>')

    }
});

//获取分类数量

$.ajax({
    type: 'get',
    url: '/categories/count',
 success: function (res) {
     // console.log(res);    
        $('#category').html('<strong>' + res.categoryCount + '</strong>个分类</li>')
    }
})

//评论数量
$.ajax({
   type:'get',
   url:'/comments/count',
   success:function(res){
        $('#ping').html('<strong>'+res.commentCount+'</strong>条评论</li>')
         
   }


    
})