// 有时候希望立即执行函数，然后等到停止触发n秒后，才可以重新触发执行。
function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this
        const args = arguments
        if (timeout) clearTimeout(timeout)
        if (immediate) {
            const callNow = !timeout
            timeout = setTimeout(function () {
                timeout = null
            }, wait)
            if (callNow) func.apply(context, args)
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait)
        }
    }
}
