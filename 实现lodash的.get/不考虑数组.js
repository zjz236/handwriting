const get = (object, keys, val) => {
    console.log(keys.split(/\./))
    return keys.split(/\./).reduce((o, j) => ((o || {})[j]),
        object
    ) || val
}
console.log(get({a: null}, 'a.b.c', 3))
console.log(get({a: undefined}, 'a', 3))
console.log(get({a: null}, 'a', 3))
console.log(get({a: {b: 1}}, 'a.b', 3))
