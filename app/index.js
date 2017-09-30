"use strict";

module.exports = (fn) => {
  if (typeof(fn) !== 'function') throw new Error()

  return (...params) => new Promise((resolve, reject) => {
    fn.call(fn, ...params, (error, ...values) => {
      if (error) return reject(error)

      return resolve(...values)
    })
  })
}