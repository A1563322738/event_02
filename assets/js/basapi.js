$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options);
    if (options.url.indexOf('/my/') !== -1) {
        // 代表有my的地址有权限，设置请求头
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function(res) {
        console.log(res);
        // 
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            localStorage.removeItem('token') //强制清空token
            location.href = '/login.html'
        }
    }
})