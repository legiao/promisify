'use strict';

const promisify = require('./index')
const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect } = chai

describe('Promisify', () => {
  describe('must throws an error', () => {
    it('when not pass a function', () => {
      // given
      const fn = null

      // when
      const result = () => promisify(fn)

      // then
      expect(result).to.throw()
    })

    it('when I pass a object', () => {
      // given
      const fn = {}

      // when
      const result = () => promisify(fn)

      // then
      expect(result).to.throw()
    })

    it('when I pass a number', () => {
      // given
      const fn = 1

      // when
      const result = () => promisify(fn)

      // then
      expect(result).to.throw()
    })

    it('when I pass a string', () => {
      // given
      const fn = 'hello'

      // when
      const result = () => promisify(fn)

      // then
      expect(result).to.throw()
    })
  })

  it('must returns a function', () => {
    // given
    const fn = () => (null)

    // when
    const result = () => promisify(fn)

    // then
    expect(result).to.be.a('function')
  })

  describe('when I call the promisified function', () => {
    describe('with single function callback', () => {
      it('must returns a promise', () => {
        // given
        const fn = () => (null)

        // when
        const result = promisify(fn)
        const promise = result()

        // then
        expect(promise).to.be.a('promise')
      })
    })

    describe('with success function callback', () => {
      it('must returns a fulfilled promise', () => {
        // given
        const fn = (cb) => (cb(null, true))

        // when
        const result = promisify(fn)
        const promise = result()

        // then
        return expect(promise).to.eventually.equal(true)
      })

      it('must returns a fulfilled promise with the correct result', () => {
        // given
        const fn = (p1, p2, cb) => (cb(null, p1 + p2))

        // when
        const result = promisify(fn)
        const promise = result(1, 2)

        // then
        return expect(promise).to.eventually.equal(3)
      })
    })

    describe('with error function callback', () => {
      it('must returns a rejected promise', () => {
        // given
        const fn = (cb) => (cb(new Error()))

        // when
        const result = promisify(fn)
        const promise = result()

        // then
        return expect(promise).to.be.rejectedWith(Error)
      })
    })
  })
})