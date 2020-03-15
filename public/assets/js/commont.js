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