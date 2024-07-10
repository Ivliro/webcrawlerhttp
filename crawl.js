import { JSDOM } from 'jsdom'

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    const links = dom.window.document.querySelectorAll('a')
    const urls = []
    for (const link of links) {
        try {
            const url = link.getAttribute('href')
            //console.log(url)
            if (url.startsWith('/')) {
                const urlObj = new URL(`${baseURL}${link.href}`)
                urls.push(urlObj.href)
            } else {
                const urlObj = new URL(url)
                urls.push(urlObj.href)
            }
        } catch (err) {
            console.log(`error with relative url: ${err.message}`)
        }
    }
    return urls
}

function normalizeURL(urlString) {
    const url = new URL(urlString)
    let fullPath = `${url.host}${url.pathname}`
    if (fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0,-1)
    }
    return fullPath
}

export {
    normalizeURL,
    getURLsFromHTML
};