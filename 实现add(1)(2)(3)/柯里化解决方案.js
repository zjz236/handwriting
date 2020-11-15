const curry = fn => {
    return (judge = (...args) => {
        return args.length === fn.length ? fn(...args) : (...arg) => judge(...args, ...arg)
    })
}
const add = (a, b, c) => a + b + c
const curryAdd = curry(add)
console.log(curryAdd(1)(2)(3))
console.log(curryAdd(1, 2)(3))
console.log(curryAdd(1)(2, 3))
