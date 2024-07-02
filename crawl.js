function normalizeURL(urlString) {
    const url = new URL(urlString)
    let fullPath = `${url.host}${url.pathname}`
    if (fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0,-1)
    }
    return fullPath
}

export {
    normalizeURL
};