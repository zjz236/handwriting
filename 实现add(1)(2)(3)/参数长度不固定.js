function add(...args) {
    return args.reduce((a, b) => a + b)
}

function currying(fn) {
    let args = []
    return function temp(...newsArgs) {
        if (newsArgs.length) {
            args = [
                ...args,
                ...newsArgs
            ]
            return temp
        } else {
            let val = fn(...args)
            args = []
            return val
        }
    }
}

let addCurry = currying(add)

console.log(addCurry(1)(2)(3)(4)(5)())
console.log(addCurry(1)(2)(3)(4, 5)())
console.log(addCurry(1)(2)(3, 4, 5)())
console.log(addCurry(1)(2, 3, 4, 5)())
