$(function() {
        var layer = layui.layer
        var form = layui.form
        initEditor()
            // 初始化文章分类
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
        // 1. 初始化图片裁剪器
        var $image = $('#image')

        // 2. 裁剪选项
        var options = {
            aspectRatio: 400 / 280,
            preview: '.img-preview'
        }

        // 3. 初始化裁剪区域
        $image.cropper(options)
            // 选择封面
        $('#cover_img').on('click', function() {
                $('#file').click()
            })
            // 选择文件
        $('#file').on('change', function(e) {
                var file = e.target.files[0]
                var newImgURL = URL.createObjectURL(file)
                $image
                    .cropper('destroy') // 销毁旧的裁剪区域
                    .attr('src', newImgURL) // 重新设置图片路径
                    .cropper(options) // 重新初始化裁剪区域
            })
            // 发布文章
        var art_state = '已发布'
        $('#art_save').on('click', function() {
            art_state = '存为草稿';
        })

        $('#form-pub').on('submit', function(e) {
            e.preventDefault
            var fd = new FormData($(this)[0]) //基于form快速创建对象
            fd.append('state', art_state)
            console.log(fd);
        })

    })
    // 定义发布文章的方法
function article_pub() {
    $.ajax({
        type: "post",
        url: "/my/article/add",
        data: fd,
        contentType: false,
        processData: false,
        success: function(res) {
            if (res.status !== 0) return layer.msg('发布失败')
            layer.msg('发布成功')
            location.href = '/article/art_list.html'
        }
    });
}