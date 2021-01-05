$(function() {
    var layer = layui.layer
    var form = layui.form
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            samePwd: function(value) {
                if (value === $('[name=oldPwd]').val()) return '新旧密码不能相同'
            },
            repwd: function(value) {
                var psd = $('.layui-form [name=newPwd]').val()
                console.log(psd);
                if (psd !== value) return layer.msg('两次密码不一致')
            },
        })
        // 提交
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('设置失败')
                layer.msg('更新密码成功')
                $('.layui-form')[0].reset()
            }
        });
    })
})