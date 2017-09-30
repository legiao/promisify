'use strict';

const fs = require('fs')
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
      const promisified = () => promisify(fn)

      // then
      expect(promisified).to.throw()
    })

    it('when I pass a object', () => {
      // given
      const fn = {}

      // when
      const promisified = () => promisify(fn)

      // then
      expect(promisified).to.throw()
    })

    it('when I pass a number', () => {
      // given
      const fn = 1

      // when
      const promisified = () => promisify(fn)

      // then
      expect(promisified).to.throw()
    })

    it('when I pass a string', () => {
      // given
      const fn = 'hello'

      // when
      const promisified = () => promisify(fn)

      // then
      expect(promisified).to.throw()
    })
  })

  it('must returns a function', () => {
    // given
    const fn = () => (null)

    // when
    const promisified = () => promisify(fn)

    // then
    expect(promisified).to.be.a('function')
  })

  describe('when I call the promisified function', () => {
    describe('with single function callback', () => {
      it('must returns a promise', () => {
        // given
        const fn = () => (null)

        // when
        const promisified = promisify(fn)
        const promise = promisified()

        // then
        expect(promise).to.be.a('promise')
      })
    })

    describe('with success function callback', () => {
      it('must returns a fulfilled promise', async () => {
        // given
        const fn = (cb) => (cb(null, true))

        // when
        const promisified = promisify(fn)
        const result = await promisified()

        // then
        return expect(result).to.equal(true)
      })

      it('must returns a fulfilled promise with the correct result', async () => {
        // given
        const fn = (p1, p2, cb) => (cb(null, p1 + p2))

        // when
        const promisified = promisify(fn)
        const result = await promisified(1, 2)

        // then
        return expect(result).to.equal(3)
      })

      it('must work with fs.readdir', async () => {
        // given
        const expectedResult = fs.readdirSync('.')

        // when
        const readdirAsync = promisify(fs.readdir)
        const result = await readdirAsync('.')

        // then
        expect(result).to.deep.equal(expectedResult)
      })
    })

    describe('with error function callback', () => {
      it('must returns a rejected promise', () => {
        // given
        const fn = (cb) => (cb(new Error()))

        // when
        const promisified = promisify(fn)
        const promise = promisified()

        // then
        return expect(promise).to.be.rejectedWith(Error)
      })
    })
  })
})
