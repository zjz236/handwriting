// func函数可能会有返回值，所以需要返回函数结果，但是immediate为false的时候，
// 因为使用setTimeout，我们将func.apply(context, args)的返回值赋给变量，
// 最后再return的时候，值将会一直是undefined，所以只在immediate为true的时候返回函数的执行结果
function debounce(func, wait, immediate) {
    let timeout, result
    return function () {
        const context = this
        const args = arguments
        if (timeout) clearTimeout(timeout)
        if (immediate) {
            const callNow = !timeout
            timeout = setTimeout(function () {
                timeout = null
            }, wait)
            if (callNow) result = func.apply(context, args)
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait)
        }
        return result
    }
}
