module.exports = (data, a, b, c) => {
    const hashv = require('crypto').createHash(a)
    hashv.update(data, b)
    return hashv.digest(c)
}
