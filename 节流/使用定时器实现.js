// 当触发事件的时候，我们设置一个定时器，
// 再触发事件的时候，如果定时器存在，
// 就不执行，直到定时器执行，然后执行函数，
// 清空定时器，这样就可以设置下个定时器。

function throttle(func, wait) {
    let timeout
    return function () {
        const context = this
        const args = arguments
        if (!timeout) {
            timeout = setTimeout(function () {
                timeout = null
                func.apply(context, args)
            }, wait)
        }
    }
}
