const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function myPromise(executor) {
    const self = this // 缓存当前promise实例对象
    self.status = PENDING // 初始状态
    self.value = undefined // fulfilled状态时 返回的信息
    self.reason = undefined //rejected状态时 拒绝的原因
    self.onFulfilledCallbacks = [] // 存储fulfilled状态对应的onFulfilled函数
    self.onRejectedCallbacks = [] // 存储rejected状态对应的onRejected函数
    function resolve(value) {
        if (value instanceof myPromise) {
            return value.then(resolve, reject)
        }
        // 实践中确保onFulfilled和onRejected方法异步执行，且应该在then方法被调用的那一轮事件循环之后的新执行栈中执行
        setTimeout(() => {
            // 调用resolve回调对应onFulfilled的函数
            if (self.status === PENDING) {
                self.status = FULFILLED
                self.value = value
                self.onFulfilledCallbacks.forEach(cb => cb(self.value))
            }
        })
    }

    function reject(reason) { // reason失败时接受的拒因
        setTimeout(() => {
            // 调用reject回调对应onRejected函数
            if (self.status === PENDING) {
                self.status = REJECTED
                self.reason = reason
                self.onRejectedCallbacks.forEach(cb => cb(self.value))
            }
        })
    }

    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

myPromise.prototype.then = function () {
    const self = this
    let newPromise
    // 处理参数默认值 保证参数后续能够继续执行
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
        throw reason
    }
    if (self.status === FULFILLED) {
        return newPromise = new myPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const x = onFulfilled(self.value)
                    resolvePromise(newPromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
    if (self.status === REJECTED) {
        return newPromise = new myPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const x = onRejected(self.reason)
                    resolvePromise(newPromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
    if (self.status === PENDING) {
        // 当营部调用resolve/rejected时，将onFulfilled/onRejected收集暂存到集合中
        return newPromise = new myPromise((resolve, reject) => {
            self.onFulfilledCallbacks.push(value => {
                try {
                    const x = onFulfilled(value)
                    resolvePromise(newPromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
            self.onRejectedCallbacks.push(reason => {
                try {
                    const x = onFulfilled(reason)
                    resolvePromise(newPromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
}
