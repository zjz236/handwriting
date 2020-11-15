// 使用时间戳，当触发事件的时候，我们取出当前的时间戳，
// 然后减去之前的时间戳（最一开始值设为0），
// 如果大于设置的时间周期，就执行函数，
// 然后更新时间戳为当前的时间戳，如果小于，就不执行。

function throttle(func, wait) {
    let context, args
    let previous = 0
    return function () {
        let now = +new Date()
        context = this
        args = arguments
        if (now - previous > wait) {
            func.apply(context, args)
            previous = now
        }
    }
}
