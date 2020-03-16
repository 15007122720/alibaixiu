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
        data: formData,    //上传数据
        //只要通过jQ中的ajax上传文件功能，就要设置
        processData: false,
        contentType: false,
        success: function (res) {
            // console.log(res);  //返回带有图片地址的数组
            $('#preImg').attr('src', res[0].avatar);// 找到索引为0  avatar的图片 替换掉(图片预览)
            //将图片地址保存到表单中的某一个表单控件属性中
            $('#hidden').val(res[0].avatar);
        }
    })
})

//完成用户添加功能（先给表单添加点击事件）
$('#btnAdd').on('click', function () {
    //serialize()收集表单数据（只对表单对象有用）
    let data = $('form').serialize();
    // console.log(data);  获取的是字符串

    $.ajax({
        type: 'post',
        url: '/users',
        data: data,
        success: function (res) {
            //console.log(res); //响应回一个对象
            userArr.unshift(res);//把res对象添加到userArr数组的最后面
            render(); //防止刷新
            //  数据添加到用户列表后，form表单数据应清空
            $('input[type="email"]').val('');
            $('input[name="nickName"]').val('');
            $('input[name="password"]').val('');
            $('#status0').prop('checked', false);   //将复选 设置为false 清空 复原
            $('#status1').prop('checked', false);  //prop()检索属性值
            $('#admin').prop('checked', false);
            $('#normal').prop('checked', false);
            $('#hidden').val('');  //隐藏域 里面的值清空
            $('#preImg').attr('src', '../assets/img/default.png');//把图像换回默认头像

        }, error: function (err) {
            console.log(err);
        }
    })
});
var userId;//定义变量 接受id
//给编辑添加注册点击事件，事件委托(将用户列表数据显示在左侧)
$('tbody').on('click', '.edit', function () {
    //console.log('ok');
    userId = $(this).attr('data-id')   //点击用户列表编辑获取 用户列表id

    $('h2').html('编辑用户'); // 将文字随着点击编辑而更换
    //获取当前被点击的元素的 父元素tr
    let tr = $(this).parents('tr');
    //console.log(tr.find('img').attr('src'));  //找到它的h后代img， 然后获取它的值
    $('#preImg').attr('src', tr.find('img').attr('src'))//把preImg的src图片用attr方法 替换成 tr的图片
    $('#hidden').attr('src', tr.find('img').attr('src'));  //更换隐藏域中的值

    // console.log(tr.children().eq(2).text()); //用children([]).eq(index)方法 找到第三个id(邮箱)
    $('input[name="email"]').prop('disabled', true).val(tr.children().eq(2).text());
    $('input[name="nickName"]').val(tr.children().eq(3).text());
    $('input[name="password"]').prop('disabled', true);// disabled禁用编辑

    //console.log(tr.children().eq(4).text());  打印出来是数字
    if (tr.children().eq(4).text() == '激活') {
        $('#status1').prop('checked', true)         //状态
    } else {
        $('#status0').prop('checked', true)   //判断状态为0就是未激活
    };

    if (tr.children().eq(5).text() == '超级管理') {
        $('#admin').prop('checked', true)                  //判断角色
    } else {
        $('#normal').prop('checked', true)
    }
    //将添加按钮显示， 编辑按钮隐藏
    $('#btnAdd').hide();
    $('#btnEdit').show();
})
//完成编辑功能
$('#btnEdit').on('click', function () {
    //console.log(userId);  //点击左边编辑获取 右边用户列表id(字符串)

    //收集表单数据
    let data = $('form').serialize();

    $.ajax({
        type: 'PUT',
        url: '/users/' + userId,
        data: data,   //将右边的data(表单数据昵称) 赋给左
        success: function (res) {
            //console.log(res);  //通过接口拿到用户的id（对象）
            //实现无刷新 编辑完，响应回一个对象，
            // 页面上的数据保存到userArr数组
            //从数组中将这元素的索引找到
            let index = userArr.findIndex(item => res._id == item._id); //获取到两边的id  做比较 是否相等
            userArr[index] = res;          //将响应回来的id 和用户修改的id替换     
            //console.log(userArr);
            render();

            //编辑完成后，表单按钮以及文字要恢复成 添加用户     值要清空 （ 为了还原页面）
            $('h2').html('添加新用户');//上面的文字替换
            $('#preImg').attr('src', '../assets/img/default.png');
            $('#hidden').val('');      //清空值
            $('input[name="email"]').prop('disabled', false).val('');
            $('input[name="nickName"]').val('');
            $('input[name="password"]').prop('disabled', false);
            //把复选框清空
            $('#status0').prop('checked', false);
            $('#status1').prop('checked', false);
            $('#admin').prop('checked', false);
            $('#normal').prop('checked', false);
            //按钮替换
            $('#btnAdd').show();  //添加用户显示
            $('#btnEdit').hide(); //编辑用户 隐藏
        },
        error: function (err) {
            console.log(err);

        }

    })

})
