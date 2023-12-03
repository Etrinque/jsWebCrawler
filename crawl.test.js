const { normalizeURL, getURLfromHTML } = require('./crawl.js');
const { test, expect } = require('@jest/globals');


test(`normalizeURL protocol`, () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test(`normalizeURL slash`, () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test(`normalizeURL normal`, () => {
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test(`normalizeURL normal slash`, () => {
    const input = 'http://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test(`getURLfromHTML absolute`, () => {
    const inputURL = 'https://blog.boot.dev/'
    const inputBODY = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
    const actual = getURLfromHTML(inputBODY, inputURL)
    const expected = [ 'https://blog.boot.dev/' ]
    expect(actual).toEqual(expected)
})

test(`getURLSfromHTML relative`, () => {
    const inputURL = 'https://blog.boot.dev/'
    const inputBODY = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLfromHTML(inputBODY, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one']
    expect(actual).toEqual(expected)
})

test(`getURLSfromHTML both`, () => {
    const inputURL = 'https://blog.boot.dev/'
    const inputBODY = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html><html><body><a href="https://other.boot.dev"><span>Boot.dev></span></a></body></html>'
    const actual = getURLfromHTML(inputBODY, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one', 'https://other.boot.dev/']
    expect(actual).toEqual(expected)
})

test(`getURLSfromHTML handle error`, () => {
    const inputURL = 'https://blog.boot.dev/'
    const inputBODY = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLfromHTML(inputBODY, inputURL)
    const expected = []
    expect(actual).toEqual(expected)
})

