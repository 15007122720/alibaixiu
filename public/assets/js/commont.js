//退出功能
$('#logout').on('click', function () {
    // alert('ok');
    if (window.confirm('你真的要退出吗')) {
       $.ajax({
            type: 'post',
            url: '/logout',
            success: function (res) {
                   //console.log(res);
                location.href = '/admin/login.html'
            },
            error:function(err){
                  alert('退出失败');
            }


        })



    }


})
 //console.log(userId);

 $.ajax({
     type:'get',
     url:'/users/'+userId,
     success:function(res){
        // console.log(res);  //目前登录的用户账号信息
        $('.profile img').attr('src',res.avatar);  //用户图像
        $('.profile h3').attr(res.nickName);   //用户昵称
         
     }
 })
 