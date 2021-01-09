$(function() {
    var layer = layui.layer
    var form = layui.form
    form.verify = {
            nickname: function(value) {
                if (value.length > 6) return '昵称长度必须在1-6字符之间'
            }
        }
        // 获得用户基本信息，渲染
    initGetUserInfo()

    function initGetUserInfo() {
        // 
        // 获得用户信息
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg('获取信息失败')
                    // $('#username').val(res.data.username)
                    // $('#nickname').val(res.data.nickname)
                    // $('#email').val(res.data.email)
                    // $('#idd').val(res.data.id)
                form.val('layui_form', res.data)
            }
        });
    }
    // 实现表单的重置效果
    $('#btnReset').on('submit', function(e) {
        e.preventDefault()
        innitUserInfo();
    })


    //3.阻止表单的默认提交行为，并发起数据请求
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('更新信息失败')
                layer.msg('更新信息成功')
                window.parent.GetUserInfo()
            }
        });
    })
})