//定义数组
let userArr = [];

$.ajax({
    type: 'get',
    url: '/users',
    success: function (res) {
        //console.log(res);
        userArr = res;    //把响应回来的数据给 空数组
        render(); //调用下面的函数
    }
})

//定义render()方法，用来渲染页面
function render() {       //userTpl是模板id，响应的数据就是data  传给html
    let html = template('userTpl', { data: userArr });
    //console.log(html);  tbody表格打印
    $('tbody').html(html);
}

//先上传图像 再用户添加
//用户图像上传功能  下面代码只是将图上传服务器，还要将图片地址写到数据库
//完成用户的时候才写入
$('#avatar').on('change', function () {
    let formData = new FormData();  //创建一个对象 二进制
    //console.log(this.files[0]);   //在图像文件数组中查寻 索引第一的数据
    formData.append('avatar', this.files[0]); //通过append() 方法向对象中添加键值对
    $.ajax({
        type: 'post',
        url: '/upload',
        data:formData,    //上传数据
        //只要通过jQ中的ajax上传文件功能，就要设置
        processData: false,
        contentType: false,
        success: function (res) {
           // console.log(res);  //返回带有图片地址的数组
           $('#preImg').attr('src',res[0].avatar);// 找到索引为0  avatar的图片 替换掉(图片预览)
        //将图片地址保存到表单中的某一个表单控件属性中
           $('#hidden').val(res[0].avatar);
   

        }



    })


})



