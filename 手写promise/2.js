function myPromise(constructor) {
    const self = this
    self.status = 'pending'
    self.value = undefined
    self.reason = undefined

    function resolve(value) {
        if (self.status === 'pending') {
            self.value = value
            self.status = 'resolved'
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.reason = reason
            self.status = 'rejected'
        }
    }

    try {
        constructor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
    const self = this
    switch (self.status) {
        case "resolved":
            onFulfilled(self.value)
            break
        case "rejected":
            onRejected(self.reason)
            break
    }
}
