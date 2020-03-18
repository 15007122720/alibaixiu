
//写文章 模块
//发送ajax 获取所有的分类
$.ajax({
  type: 'get',
  url: '/categories',
  success: function (res) {
    // console.log(res); //得到所属分类  所有对象
    let html = template('cTp', { data: res })//循环模板
    //console.log(html); //得到所有的分类 数据
    $('#category').html(html);//写在页面上去
  }
})

//完成文件上传功能
$('#feature').on('change', function () {
  let formDdta = new FormData();    //获取表单数据
  formDdta.append('img', this.files[0]);//往表单里追加图片
  $.ajax({
    type: 'post',
    url: '/upload',
    data: formDdta,
    // 告诉$.ajax方法不要处理data属性对应的参数
    processData: false,
    contentType: false,  	// 告诉$.ajax方法不要设置参数类型
    success: function (res) {
      // console.log(res); //得到上传文件（图片）的的地址
      $('.thumbnail').show().attr('src', res[0].img);//将图片预览出来

      $('#hidden').val(res[0].img);//隐藏域 得到图片的id
    }
  })
});

//文章添加功能
$('#btnAdd').on('click', function () {
  let data = $('form').serialize();  //serialize() 方法通过序列化表单值创建 URL 编码文本字符串。
  $.ajax({
    type: 'post',
    url: '/posts',
    data: data,
    success: function (res) {
      location.href = 'posts.html';
    }
  })
});