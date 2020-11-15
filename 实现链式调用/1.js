function Class1() {
    console.log('初始化')
}
Class1.prototype.method = function (param) {
    console.log(param)
    return this
}
let c1 = new Class1()
c1.method('第一次调用').method('第二次调用').method('第三次调用').method('第四次调用').method('第五次调用')
