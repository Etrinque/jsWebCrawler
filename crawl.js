const {JSDOM} = require('jsdom')

async function crawlPage(baseUrl, currentUrl, pages) {

    const currentUrlObj = new URL(currentUrl)
    const baseUrlObj = new URL(baseUrl)
    if (currentUrlObj.hostname !== baseUrlObj.hostname) {
        return pages
    }
    
    const normalizedURL = normalizeURL(currentUrl)

    if (pages[normalizedURL] > 0) {
        pages[normalizedURL]++
        return pages
    }

    if (currentUrl === baseUrl) {
        pages[normalizedURL] = 0
    } else {
        pages[normalizedURL] = 1
    }

    let htmlBody = ''
    console.log(`crawling ${currentUrl}`)
    try {
        const resp = await fetch(currentUrl)

    if (resp.status > 399){
        console.log(`HTTP Err, status code: ${resp.status}`)
        return pages
    } 
    
    const contentType = resp.headers.get('content-type')
    
    if (!contentType.includes('text/html')) {
        console.log(`HTTP Err, content-type: ${contentType}`)
        return pages
    }
    htmlBody = await resp.text()
    } catch (err) {
        console.log(err.message)
    }

    const nextUrls = getURLfromHTML(htmlBody, baseUrl)
    for (const nextUrl of nextUrls) {
        pages = await crawlPage(baseUrl, nextUrl, pages)
    }
    return pages
}



function normalizeURL(url) {
    const urlObj = new URL(url)
let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.length > 0 && fullPath.slice(-1) === '/'){
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath
}

function getURLfromHTML(htmlBody, baseUrl) {
    const urls = []
    const domObj = new JSDOM(htmlBody)
    const domArr = domObj.window.document.querySelectorAll('a')
    for (const dA of domArr) {
      if (dA.href.slice(0,1) === '/'){
        try {
            urls.push(new URL(dA.href, baseUrl).href)
        } catch (err) {
            console.log(`${err.message}: ${dA.href}`)
        }
    } else {
        try {
            urls.push(new URL(dA.href).href)
        } catch (err) {
            console.log(`${err.message}: ${dA.href}`)
        }
      }  
    }
    return urls
}

module.exports = {
    crawlPage,
    normalizeURL,
    getURLfromHTML
}
