$(function() {
    // 定义时间过滤器
    var layer = layui.layer
    var form = layui.form
    innitArtCateList()

    function innitArtCateList() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status === 0) {
                    var htmlstr = template('tpl_cate', res)
                    $('tbody').html(htmlstr)
                }
            }
        });
    }

    // 初始化页面获取文章类别，并渲染到界面

    // 2.点击添加类别，弹出表单确定添加
    var indexAdd = null
    $('#btnAdd').on('click', function() {
            indexAdd = layer.open({
                type: 1,
                area: ['500px', '200px'],
                title: '添加文章分类',
                content: $('#dialog_add').html()
            });
        })
        // 通过代理添加提交输入信息
    $('body').on('submit', '#form_add', function(e) {
            e.preventDefault();
            // 更新分类，添加
            $.ajax({
                type: "post",
                url: "/my/article/addcates",
                data: $(this).serialize(),
                success: function(res) {
                    // console.log(res);
                    if (res.status !== 0) return layer.msg('添加失败')
                    innitArtCateList()
                    layer.msg('添加成功')
                    layer.close(indexAdd) //关掉弹出层
                }
            });
        })
        // 点击编辑，弹出层
    var indexEdit = null
    $('tbody').on('click', '.btn_edit', function(e) {
        e.preventDefault();
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '200px'],
            title: '编辑文章分类',
            content: $('#dialog_edit').html()
        });
        // 发送ajax根据id获得文章分类的数据
        var id = $(this).attr('data-id')
        console.log(id);
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                console.log(res);
                form.val('form_edit', res.data)
            }
        });
    })
    $('body').on('submit', '#form_edit', function(e) {
            e.preventDefault();
            // 更新分类，编辑成功
            $.ajax({
                type: "post",
                url: "/my/article/updatecate",
                data: $(this).serialize(),
                success: function(res) {
                    // console.log(res);
                    if (res.status !== 0) return layer.msg('编辑失败')

                    layer.msg('编辑成功')
                    layer.close(indexEdit) //关掉弹出层
                    innitArtCateList()
                }
            });
        })
        // 4.通过代理删除此行，拿到id
    $('tbody').on('click', '.btn_delete', function() {

        //do something
        var id = $(this).attr('data-id')
        $.ajax({
            type: "get",
            url: "/my/article/deletecate/" + id,
            success: function(res) {
                if (res.status !== 0) return layer.msg('删除失败')
                layer.msg('删除成功')
                innitArtCateList()
            }

        });


    })
})