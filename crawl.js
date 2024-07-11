import { JSDOM } from 'jsdom'

async function crawlPage(currentURL) {
    // uses fetch to fetch the webpage of the currentURL
    console.log(`actively crawling: ${currentURL}`)

    try {
        const response = await fetch(currentURL)

        if (!response.ok) {
            throw new Error('Response network was not ok ' + response.statusText)
        }
        
        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`ignoring non html response: ${contentType} on page: ${currentURL}`)
            return
        }
        console.log(await response.text())

    } catch (err) {
        console.log(`error: ${err.message} on page: ${currentURL}`)
    }
}

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
            console.log(`error with relative/absolute url: ${err.message}`)
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
    getURLsFromHTML,
    crawlPage
};