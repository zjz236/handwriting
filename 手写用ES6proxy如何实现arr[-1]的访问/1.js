const negativeArray = els =>
    new Proxy(els, {
        get: ((target, propKey, receiver) => {
                console.log(receiver)
                return Reflect.get(
                    target,
                    +propKey < 0 ? String(target.length + +propKey) :
                        propKey,
                    receiver
                )
            }

        )
    })

const unicorn = negativeArray(['零', '一', '二', '三'])

console.log(unicorn[0])
