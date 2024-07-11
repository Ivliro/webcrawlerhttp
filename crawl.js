import { JSDOM } from 'jsdom'

async function crawlPage(baseURL, currentURL = baseURL, pages={}) {
    // uses fetch to fetch the webpage of the currentURL
    console.log(`actively crawling: ${currentURL}`)
    
    try {
        const parsedURL = new URL(currentURL)
        const parsedBaseURL = new URL(baseURL)

        if (parsedURL.host !== parsedBaseURL.host) {
            console.log(`ignoring page: ${currentURL}`)
            return pages
        }

    } catch (err) {
        console.log(`error: ${err.message} on page: ${currentURL}`)
        return
    }

    const normalizedURL = normalizeURL(currentURL)

    // if the page has already been crawled, return
    try {
        if (pages[normalizedURL]) {
            console.log(`already crawled: ${currentURL}`)
            pages[normalizedURL] += 1
            return pages
        }
        else {
            pages[normalizedURL] = 1
        }

    } catch (err) {
        console.log(`error: ${err.message} on page: ${currentURL}`)
        return
    }

    let html = await fetchAndParseHTML(currentURL)
    const urls = getURLsFromHTML(html, baseURL)
    for (const url of urls) {
        pages = await crawlPage(baseURL, url, pages)
    }

    // if the currentURL is the same as the baseURL, we are done
    // if (currentURL === baseURL) {
    //     console.log(`crawling complete, found ${Object.keys(pages).length} pages`)
    //     return pages
    // }
    return pages
}

async function fetchAndParseHTML(currentURL) {
    let response
    try {
        response = await fetch(currentURL)

        if (!response.ok) {
            throw new Error('Response network was not ok ' + response.statusText)
        }
        
        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`ignoring non html response: ${contentType} on page: ${currentURL}`)
            return
        }
        // console.log(await response.text())

    } catch (err) {
        console.log(`error: ${err.message} on page: ${currentURL}`)
    }
    return response.text()
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