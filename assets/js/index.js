function GetUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function(res) {
            console.log(res);
            if (res.status !== 0) return layui.layer.msg('获取信息失败')
            renderAvatar(res.data)
        }
    });
}
// 渲染用户头像

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎  ' + name)
    if (user.user_pic !== null) {
        // 不为空就是图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
    }
}

$(function() {
    // 获取头像如果上传的有头像就用图片头像，如果没有就用文字头像
    GetUserInfo()

    // 按退出有个弹出层

    $('#btnCloseBtn').on('click', function() {
        var layer = layui.layer
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });


    })
})