$(function() {
    // 获得所有分类并渲染
    var laypage = layui.laypage
    var layer = layui.layer
    var form = layui.form
    var q = {
            pagenum: 1, //页码值,起始位1
            pagesize: 2, //每页显示几条
            cate_id: '', // 文章分类的id
            state: '' //文章的发布状态
        }
        // 定义补零
    function padZero(n) {
        return n < 10 ? "0" + n : n
    }
    // var now = new Date()
    // console.log(now);
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)
        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var nn = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + nn
    }
    initGetCate()
        // 初始化渲染文章分类
    function initGetCate() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                var htmlstr = template('tpl_cate', res)
                $('[name=cate_id]').html(htmlstr)
                form.render() //重新渲染
            }
        });
    }

    // 渲染文章分类列表
    initTable()

    function initTable() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: q,
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取失败')
                layer.msg('获取成功')
                var htmstr = template('tpl_table', res)
                $('tbody').html(htmstr)
                RenderPage(res.total)
            }
        });
    }
    // 筛选按钮

    $('#form_search').on('submit', function(e) {
            e.preventDefault()
            var cate_id = $('[name=cate_id').val()
            var state = $('[name=state').val()
            q.cate_id = cate_id
            q.state = state
        })
        // 渲染分页的方法
    function RenderPage(total) {
        laypage.render({
            elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
            count: total,
            limit: q.pagesize,
            curr: q.pagenum, //数据总数，从服务端得到
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候，触发 jump 回调
            // 触发 jump 回调的方式有两种：
            // 1. 点击页码的时候，会触发 jump 回调
            // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                console.log(obj.limit); //得到每页显示的条数
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr;
                q.pagesize = obj.limit
                    //首次不执行
                if (!first) {
                    initTable()
                }
            }

        });
    }
    // 删除文章
    $('tboday').on('click', '.btn_delate', function() {

        var id = $(this).attr('data-id')
        console.log(id);
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: "get",
                url: "/my/article/delete/" + id,
                success: function(res) {
                    if (res.status !== 0) return layer.msg('删除失败');
                    layer.msg('删除成功');
                    initTable()
                }
            });
            layer.close(index)
        })
    })
})