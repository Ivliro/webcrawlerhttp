import { crawlPage } from "./crawl.js"

function main() {
    if (process.argv.length < 3) {
        console.log("Usage: node main.js <url>")
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log("too many command line args")
        process.exit(1)
    }
    const baseURL = process.argv[2]

    console.log(`starting crawl of ${baseURL}`)
    crawlPage(baseURL)
}

main()