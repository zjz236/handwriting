var obj = {
    a: function () {
        console.log('a')
        return this
    },
    b: function () {
        console.log('b')
        return this
    }
}

obj.a().b()
