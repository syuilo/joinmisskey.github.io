const { createHash } = require("crypto")

module.exports = (data, a, b, c) => {
  const hashv = createHash(a)
  hashv.update(data, b)
  return hashv.digest(c)
}
