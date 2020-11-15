class Math {
    constructor(value) {
        this.hasInit = true
        this.value = value
        if (!value) {
            this.value = 0
            this.hasInit = false
        }
    }

    add() {
        let args = [...arguments]
        let initValue = this.hasInit ? this.value : args.shift()
        const value = args.reduce((prev, curv) => prev + curv, initValue)
        return new Math(value)
    }

    minus() {
        let args = [...arguments]
        let initValue = this.hasInit ? this.value : args.shift()
        const value = args.reduce((prev, curv) => prev - curv, initValue)
        return new Math(value)
    }

    mul() {
        let args = [...arguments]
        let initValue = this.hasInit ? this.value : args.shift()
        const value = args.reduce((prev, curv) => prev * curv, initValue)
        return new Math(value)
    }

    divide() {
        let args = [...arguments]
        let initValue = this.hasInit ? this.value : args.shift()
        const value = args.reduce((prev, curv) => prev / (+curv ? curv : 1), initValue)
        return new Math(value)
    }
}

let test = new Math()
const res = test.add(222, 333, 444).minus(333, 222).mul(3, 3).divide(2, 3)
console.log(res.value)

Number.prototype.add = function () {
    let _that = this
    _that = [...arguments].reduce((prev, curv) => prev + curv, _that)
    return _that
}

Number.prototype.minus = function () {
    let _that = this
    _that = [...arguments].reduce((prev, curv) => prev - curv, _that)
    return _that
}

Number.prototype.mul = function () {
    let _that = this
    _that = [...arguments].reduce((prev, curv) => prev * curv, _that)
    return _that
}

Number.prototype.divide = function () {
    let _that = this
    _that = [...arguments].reduce((prev, curv) => prev / (+curv ? curv : 1), _that)
    return _that
}

let num = 0
let newNum = num.add(222, 333, 444).minus(333, 222).mul(3, 3).divide(2, 3)
console.log(newNum)
