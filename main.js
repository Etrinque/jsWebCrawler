const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main() {
    if (process.argv.length < 3){
        console.log('to little args')
    }
    if (process.argv.length > 3){
        console.log('to many args')
    }
    const baseUrl = process.argv[2]
    
    console.log(`Crawler initialized at ${baseUrl}`)
    
    const pages = await crawlPage(baseUrl, baseUrl, {})
    
    printReport(pages)
}
main()

// crawling https://wagslane.dev
