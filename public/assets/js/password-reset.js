//密码修改功能
$('#btns').on('click',function(){
  let userPass = $('[name="userPass"]').val().trim();
  let newPass = $('[name="newPass"]').val().trim();
  let confirmPass = $('[name="confirmPass"]').val().trim();   //通过属性选择器  获取元素  trim()去掉两端空格
   if(userPass.length == 0) return alert('请输入旧密码');
   if(newPass.length == 0) return alert('请输入新密码');        //检测密码的长度是否为0
   if(confirmPass.length == 0) return alert('请输入确认密码');

    if(newPass !== confirmPass){        //新密码和确认密码不相等
         return alert('两次密码输入不一致');
        };

//发送ajax
 $.ajax({
      type:'PUT',
      url:'/users/password',
      data:{
        userPass:userPass,
        newPass:newPass,
        confirmPass:confirmPass
      },
       success:function(res){
            location.href = '../admin/login.html';  //改密码后， 跳转到登录页面
       }
 })



    

})