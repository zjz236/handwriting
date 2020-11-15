class MyPromise {
    constructor(executor) {
        this.state = 'pending'
        this.value = undefined
        this.reason = undefined
        let resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value
            }
        }
        let reject = reason => {
            if (this.state === 'pending') {
                this.state = 'reject'
                this.reason = reason
            }
        }
        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then(onFulfilled, onRejected) {
        if (this.state === 'fulfilled') {
            let x = onFulfilled(this.value)
        }
        if (this.state === 'rejected') {
            let x = onRejected(this.reason)
        }
    }
}
