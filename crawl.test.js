import { test,expect } from "@jest/globals";
import { normalizeURL,getURLsFromHTML } from "./crawl.js";

test("normalizeURL protocol", () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
});

test("normalizeURL slash", () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
});

test("normalizeURL capitals", () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
});

test("normalizeURL http", () => {
    const input = 'http://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
});

test("getURLsFromHTML multiple urls", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">Boot.dev Blog</a>
            <a href="https://github.com/">GitHub</a>
            <a href="https://twitter.com/">Twitter</a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/path/',
        'https://github.com/',
        'https://twitter.com/'
    ]
    expect(actual).toEqual(expected)
})

test("getURLsFromHTML single url", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/">Boot.dev Blog</a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/']
    expect(actual).toEqual(expected)
})

test("getURLsFromHTML relative url", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">Boot.dev Blog</a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test("getURLsFromHTML invalid url", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">Invalid URL</a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})