//分类目录模块
let nArry = [];
//添加分类功能
$('#btnAdd').on('click', function () {
    let title = $('[name="title"]').val().trim();
    let className = $('[name="className"]').val().trim();
    if (title.length == 0) return alert('请填写分类名称');
    if (className.length == 0) return alert('请填写类名');
    //发送ajax
    $.ajax({
        type: 'post',
        url: '/categories',
        data: {
            title: title,
            className: className
        },
        success: function (res) {
            //  console.log(res); //返回的一个对象
            //把这个对象 添加到(push数组到)
            nArry.push(res);
            render();  //页面渲染
            $('[name="title"]').val('')
            $('[name="className"]').val('')

        }
        //在Network里面可以看到请求错误
    })
});

//定义render()
function render() {
    let html = template('cTp', { data: nArry });//讲数组中的对象 给html
    $('tbody').html(html)    //html模板渲染到页面
}

//发送ajax 获取所有的分类
$.ajax({
    type: 'GET',
    url: '/categories',
    success: function (res) {
        nArry = res;
        render();
    }
})

//编辑功能    //事件委托 编辑
$('tbody').on('click', '.edit', function () {
    id = $(this).parent().attr('data-id');  //通过父节点(td)获得id
    $('h2').text('编辑分类')   //替换文字
    let tr = $(this).parents('tr');  //当前tr这个父节点
    $('[name="title"]').val(tr.children().eq(1).text());
    $('[name="className"]').val(tr.children().eq(2).text()); //可找到索引为2的id

    $('#btnAdd').hide();
    $('#btnEdit').show();  //编辑按钮 显示

})

//根据id修改分类(编辑)
$('#btnEdit').on('click', function () {
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: {
            title: $('[name="title"]').val().trim(),
            className: $('[name="className"]').val().trim(),
        },
        success:function(res){                                      //如果相等 就找到了 索引
            let index = nArry.findIndex(item =>item._id == res._id);//因res返回的是个对象,从这个数组 把元素找到
            nArry[index] = res;  //返回的数据 赋给 新数组
            render();
    $('h2').text('添加分类'); //编辑完后  文字替换成添加分类
     
    $('[name="title"]').val('');
    $('[name="className"]').val(''); //可找到索引为2的id

    $('#btnAdd').show();
    $('#btnEdit').hide();  //编辑完后要将 编辑按钮 隐藏

        }

    })
});

//删除单个用户  （分类目录）   下面用委托删除del 事件
$('tbody').on('click','.del',function(){
   let id = $(this).parent().attr('data-id') //通过父节点(td)获得id
   if(confirm('真的要删除么?')){
   $.ajax({
    type:'DELETE',
    url:'/categories/'+id,
    success:function(res){
        //console.log(res); //返回的是当前点击的对象
        
     let index = nArry.findIndex(item =>item._id == res._id);//因res返回的是个对象,从这个数组 把元素找到
       nArry.splice(index,1); //删除数组 index（当前点击的id）  数量为1个
     
    render();
    }
   })
   }
});

//实现分类目录全选功能
$('thead input').on('click', function () {     //prop() 方法设置或返回被选元素的属性和值
    $('tbody input').prop('checked', $(this).prop('checked'));//获取到所有的单选按钮的状态，并与全选按钮保持一致
     //获取到所有的单选按钮的状态，并与全选按钮保持一致就显示出  批量删除按钮
     if($(this).prop('checked')){
        $('#allDel').show();
    }else{
        $('#allDel').hide();
    }
})

//全选随单选按钮状态而改变(分类目录)
$('tbody').on('click', '.check', function () {
    let length = $('.check').length;//拿到tbody里面所有单选按钮的总数量
    let checklength = $('.check:checked').length;
    // console.log(length,checklength);  //拿到每个选中的个数
    //上面复选框是否选中，如果选中的个数与下面单选按钮个数相等 =
    $('thead input').prop('checked',length === checklength);
   
    //如果下面单选按钮大于1就显示批量删除按钮
    if(checklength > 1){
        $('#allDel').show();
    }else{
        $('#allDel').hide();
    }
});


//分类目录
// 给批量删除按钮，添加点击事件
$('#allDel').on('click',function(){
   let arrs = [];
   $('.check:checked').each(function(index,item){         //index 索引号， item代表选中的元素 
        arrs.push($(this).parents('tr').children().eq(3).attr('data-id'));   //找儿子的  第三个
          // console.log(arrs);  //得到被点击的id
   });                 
 
 if(confirm('您真的删除么?')){

    //需要批量删除用户的id已经放在arrs数组里了，
    $.ajax({
        type:'delete',
        url:'/categories/' + arrs.join('-'),   //批量删除，多个id用-隔开
        success:function(res){
            // console.log(res);//得到一个数组 里面有选中的对象
            // 因为批量删除它 返回了一个数组 要实现无刷新
            res.forEach(item=>{
                   //console.log(item);//item里面的每一项代表一个对象
                let index = nArry.findIndex(ele=> ele._id === item._id); //item的id 与 选中返回的id对比
                      nArry.splice(index,1);
                       render();//页面执行完后重新渲染
            })
           
        }
   
       })
 }

})