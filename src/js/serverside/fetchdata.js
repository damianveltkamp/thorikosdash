const fetch = require('node-fetch')

export async function fetchData(fetchUrl) {
    const features = await processData(fetchUrl)
    return features
}

async function processData(fetchUrl) {
    const rawData = await fetch(fetchUrl)
    const json = await rawData.json()
    return json
}