function get(source, path, defaultValue = undefined) {
    let paths = []
    if (Array.isArray(path)) {
        paths = [...path]
    } else {
        paths = path.replace(/\[(\d+)]/g, '.$1').split('.')
    }
    let result = source
    for (const p of paths) {
        result = Object(result)[p]
        if (result == undefined) {
            return defaultValue
        }
    }
    return result
}

console.log(get({a: 1}, ['a'], 3))
console.log(get({a: undefined}, 'a', 3))
console.log(get({a: null}, 'a', 3))
console.log(get({a: [{b: 1}]}, 'a[0].b', 3))

