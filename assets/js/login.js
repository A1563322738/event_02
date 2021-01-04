$(function() {

    // 注册事件，去注册界面
    $('#links_reg').on('click', function() {
            $('.reg_box').show()
            $('.login_box').hide()
        })
        // 点击登陆，去往登陆界面
    $('#links_login').on('click', function() {
        $('.login_box').show()
        $('.reg_box').hide()
    })
    var layer = layui.layer
    var form = layui.form
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                var psd = $('#form_reg [name=password]').val()
                console.log(psd);
                if (psd !== value) return layer.msg('两次密码不一致')
            }
        })
        // 注册页面发送Ajax请求
    $('#form_reg').on('submit', function(e) {
            e.preventDefault()
                // console.log(111);
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }
            $.ajax({
                type: "post",
                url: "/api/reguser",
                data: data,
                success: function(res) {
                    console.log(res);
                    if (res.status != 0) return layer.msg(res.message)
                    layer.msg('注册成功,请登录')
                        // 点一次去登陆
                    $('.login_box').click()
                }
            });
        })
        // 登陆页面发起Ajax请求
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) return layer.msg(res.message)
                layer.msg('登陆成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            },

        });
    })
})