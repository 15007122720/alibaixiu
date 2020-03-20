
//文章 模块

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

//文章添加功能(写文章)
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


//封装函数 根据参数来返回值
function getParams(key) {
  //先获取浏览器后面的数组,从?后面截取，使用&分隔为数组
  let params = location.search.substr(1).split('&');
  //遍历数组
  for (var i = 0; i < params.length; i++) {
    // console.log(params[i]); //得到以&分隔的两个字符串
    //因为数组元素key =value  这个形式，需要字符串转换为 数组元素
    let temp = params[i].split('=');
    //console.log(temp);
    //temp是数组，找它的 下标
    if (temp[0] === key) {     //key 是 id 它的下标1 是我们要找的
      return temp[1];
    }
  }
  return -1;

}
//console.log(getParams('id'));



//调用函数  (点写文章拿到-1,点击所有文章中的编辑拿到id数字)
let id = getParams('id');
//console.log(id);
if (id != -1) {
  //执行编辑功能
  //根据 id的值，将文章的相关内容获取到
  $.ajax({
    type: 'get',
    url: '/posts/' + id,
    success: function (res) {
      //console.log(res); //拿到编辑文章的内容
      $('h1').text('编辑文章');
      $('#title').val(res.title);   //标题
      $('#content').val(res.content); //获取内容
      $('.thumbnail').show().attr('src', res.thumbnail); //获取到图片
      $('#hidden').val(res.thumbnail);   //隐藏域
      //console.log(res.createAt.substr(0,16));//截取字符串 拿到时间   createAt创建时间
      $('#created').val(res.createAt.substr(0, 16));

      //先获取id=category  下面所有的option  让所属分类在编辑里面变化       
      //用服务器返回的id和 编辑文章页面的id 做比较
      $('#category option').each(function (index, item) {
        //console.log(item); //item代表option 下一步要获取option里面的id
        // console.log($(item).attr('value'));//把dom 转成jq
        if ($(item).attr('value') == res.category._id) { //如果服务器返回的id与 编辑的id相等
          $(item).prop('selected', true); //就获取到
        }
      });



      //点击编辑文章时 能获取发布状态
      $('#status option').each(function (index, item) {
        //console.log(item); //item代表option 下一步要获取option里面的id
        // console.log($(item).attr('value'));//把dom 转成jq
        if ($(item).attr('value') == res.state) { //如果服务器返回的id与 编辑的id相等
          $(item).prop('selected', true); //就获取到  //selected挑选
        }
      })
      $('#btnAdd').hide()   //保存隐藏
      $('#btnEdit').show();   //编辑显示 

    }
  })
}



//文章编辑
$('#btnEdit').on('click', function () {
  //获取表单数据
  let data = $('form').serialize();
  $.ajax({
    type: 'put',
    url: '/posts/' + id,
    data: data,
    success: function (res) {
      location.href = 'posts.html';
    }
  })
})
