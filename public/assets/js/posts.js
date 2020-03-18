//获取分类和状态
var cid = $('#category').val();    //分类的id
var state = $('#state').val();   //状态

 //封装函数发送ajax    cid 是分类的id     page是页码    state表示发布状态
function render( cid, state,page=1) {  
    // 文章列表  最开始渲染页面发送ajax
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page,
            category: cid,
            state: state
        },
        success: function (res) {
            // console.log(res);// records一个数组  拿到了已发布的文章 (拿到的是有几页 每一页多少条数据以及总数)
            let html = template('pTp', { data: res.records });
            //console.log(html); //模板 循环
            $('tbody').html(html);
            //分页页码  
            let pageHtml = template('pageTp', res);
            // console.log(pageHtml); //循环模板
            $('.pagination').html(pageHtml);
        }
    })
}
         render(cid, state); //调用函数 开始渲染页面

//分页 
function changePage(index) {       //page文章页面
    //alert(index); //点击页码返回 数字
   /*  $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: index,     //index代表变化的页码数字  赋值给page当前页
            category: cid,  //所需要分类的id
            state: state    //所需要的状态
        },
        success: function (res) {
            let html = template('pTp', { data: res.records });
            //console.log(html); //模板 循环
            $('tbody').html(html);   //赋值给页面  此时页面没有变化  内容在变
            let pageHtml = template('pageTp', res);
            // console.log(pageHtml); //循环模板
            $('.pagination').html(pageHtml);  //页码开始变化了
        }
    }) */
     render(cid,state,index);
}

//获取所有文章的分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        let html = template('cTp', { data: res });
        //console.log(html);  //拿到了所有文章分类的 data-id值
        $('#category').html(html);  // 得到的数据 渲染到到分类 栏
    }
})

//search筛选功能    state是状态    //category分类的id
$('#search').on('click', function () {
    //获取分类和状态
    cid = $('#category').val();    //分类的id
    state = $('#state').val();   //状态
   /*  $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            category: cid,
            state: state
        },
        success: function (res) {
            let html = template('pTp', { data: res.records });
            //console.log(html); //模板 循环
            $('tbody').html(html);
            //分页页码  
            let pageHtml = template('pageTp', res);
            // console.log(pageHtml); //循环模板
            $('.pagination').html(pageHtml);
        }
    }) */
        render(cid,state);

});