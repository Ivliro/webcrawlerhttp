function printReport(pages) {
    console.log('starting the printing of report...')
    const sortedPages = sortPages(pages)
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log(`Found ${hits} at ${url}`)
    }
    console.log('END REPORT')
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a, b) => {
        return b[1] - a[1]
    })
    return pagesArr
}

export {
    sortPages,
    printReport
};