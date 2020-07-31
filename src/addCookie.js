const setCookie = (value, time) => {
    var d = new Date()
    var month = d.getMonth() + 1
    var day = d.getDate()
    var year = d.getFullYear()
    var all = value + ',' + time + ',' + month + '.' + day + '.' + year
    var cookie = document.cookie, newCookie
    var name = 'minesweeper='
    var start = cookie.indexOf(name)
    if (start !== -1) {
        var end = cookie.indexOf(";", start);
        if (end === -1) {
            end = cookie.length;
        }
        newCookie = cookie.slice(start, end) + all + ',; expires=Sun, 31 Dec 2051 12:00:00 UTC' + cookie.slice(end)
        document.cookie = newCookie
    } else {
        newCookie = "minesweeper=" + all + ',; expires=Sun, 31 Dec 2051 12:00:00 UTC' + document.cookie
        document.cookie = newCookie
    }
}
const getCookieValue = (names) => {
    var name = escape(names);
    var allcookies = document.cookie;
    name += "=";
    var pos = allcookies.indexOf(name);
    if (pos !== -1) {
        var start = pos + name.length;
        var end = allcookies.indexOf(";", start);
        //这里是根据;分隔符来分隔出该名称的值，如果在设置Cookie时用的是,分隔，请替换成相应符号。
        if (end === -1) {
            end = allcookies.length;
        }
        var value = allcookies.substring(start, end);
        return unescape(value);
    } else {
        return "";
    }
}
const clearCookieValue = (names) => {
    var name = escape(names);
    var allcookies = document.cookie;
    name += "=";
    var pos = allcookies.indexOf(name);
    if (pos !== -1) {
        var start = pos + name.length;
        var end = allcookies.indexOf(";", start);
        //这里是根据;分隔符来分隔出该名称的值，如果在设置Cookie时用的是,分隔，请替换成相应符号。
        if (end === -1) {
            end = allcookies.length;
        }
        document.cookie = allcookies.slice(0, start) + '0' + allcookies.slice(end)
    }
}

export { setCookie, getCookieValue, clearCookieValue }
