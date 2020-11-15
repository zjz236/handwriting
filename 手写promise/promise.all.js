function promiseAll(promises) {
    return new Promise(function (resolve, reject) {
        if (!Array.isArray(promises)) {
            throw new TypeError('argument must be an array')
        }
        let resolvedCounter = 0
        const promiseNum = promises.length
        const resolvedResult = []
        for (let i = 0; i < promiseNum; i++) {
            Promise.resolve(promises[i]).then(value => {
                resolvedCounter++
                resolvedResult[i] = value
                if (resolvedCounter === promiseNum) {
                    return resolve(resolvedResult)
                }
            }, error => {
                return reject(error)
            })
        }
    })
}
