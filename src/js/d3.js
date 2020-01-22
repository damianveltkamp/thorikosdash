const d3 = require('d3')
const mapboxgl = require('mapbox-gl')
import {fetchData} from "./serverside/fetchdata"
import {normalize} from "./utilities/helpers"
import {readStorage} from "./utilities/helpers"
import {clearStorage} from "./utilities/helpers"

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFtaWFudmVsdGthbXAiLCJhIjoiY2szNGdvcTA1MG0zYzNibnlyNW1nZWZreSJ9.fUYUVFTp1_PjhZ6HkC0SDQ'
let mapBox = new mapboxgl.Map({
    container: 'mapbox',
    style: 'mapbox://styles/damianveltkamp/ck372eqvz19fl1ctfeghxifun',
    center: [24.054086874072482,37.739184054390634],
    zoom: 16.8
})
let stored_filters = readStorage('filters')
const d3settings = {
    projection: getD3Projection(),
    path: d3.geoPath(),
    svg: d3.select(mapBox.getCanvasContainer()).append('svg')
}

mapBox.dragRotate.disable()
mapBox.touchZoomRotate.disableRotation()

initMap()

async function initMap() {
    buildMap()

    // Fetch data
    const raw_data = await fetchData('/survey/surveydata_0.json')
    const clean_data = await nestData(raw_data)
    const grid_data = await fetchData('/output/gridFinal.json')
    makeFilters(grid_data, raw_data)
}

function nestData(raw_data) {
    const nestedArray = d3.nest()
        .key(d => {
            return d.Context_Survey_Homogenized
        })
        .entries(raw_data)
    return nestedArray
}

function makeFilters(grid_data, raw_data) {
    const clean_data = nestData(raw_data)
    const SHAPE_OBJECT = d3.nest()
        .key(d => {
            d['SHAPE OBJECT'] = d['SHAPE OBJECT'].toLowerCase()
            return d['SHAPE OBJECT']
        })
        .entries(raw_data)
    const CONSERVATION = d3.nest()
        .key(d => {
            d['CONSERVATION'] = d['CONSERVATION'].toLowerCase()
            return d['CONSERVATION']
        })
        .entries(raw_data)

    const filters = [
        SHAPE_OBJECT,
        CONSERVATION
    ]
    const filter_category = [
        'shape-object',
        'conservation'
    ]
    filters.forEach(function(item, i) {
        item.sort(function(a, b) {
            let textA = a.key.toUpperCase()
            let textB = b.key.toUpperCase()
            return textA < textB ? -1 : textA > textB ? 1 : 0
        })
    })
    filter_category.forEach(function(category, i) {
        appendFilters(filters[i], category)
    })
    const new_raw_data = [...raw_data]
    filter(grid_data, filters, new_raw_data)
}

function appendFilters(filters, category) {
    const cleaned_filters = filters.filter((node) => {
        return node.key !== ''
    })
    d3.selectAll(`.filter-container-${category}`)
        .selectAll("label")
        .data(cleaned_filters)
        .enter()
        .append("label")
        .attr("class", "filter-option")
        .html(function(d) {
            if(stored_filters != null) {
                const foo = stored_filters.find((stored_filter) => {
                    return stored_filter.id == d.key
                })
                if(foo) {
                    return (
                        `<input id="${d.key}" class="filter" type="checkbox" checked> ` +
                        d.key
                    )
                }
            }
            return (
                `<input id="${d.key}" class="filter" type="checkbox"> ` +
                d.key
            )
        })
}

function filter(grid_data, filters, clean_data) {
    let data = []
    filters = filters.flat()
    d3.selectAll('.filter').on('click', function() {
        let filter_button = this
        let category = this.id
        let filtered_array = []
        if (this.checked) {
            clean_data.forEach(function(item, i) {
                if (category === item['SHAPE OBJECT']) {
                    (item.Context_Survey_Homogenized != '') && data.push(item)
                } else if (category === item['CONSERVATION']) {
                    (item.Context_Survey_Homogenized != '') && data.push(item)
                } else {
                    return
                }
            })
            let nested_array = nestData(data)
            filtered_array = nested_array
        } else if (!this.checked) {
            removeLocalstorageEntry(this)
            data = data.filter(function(item) {
                if (category === item['SHAPE OBJECT']) {
                    return false;
                } else if (category === item['CONSERVATION']) {
                    return false;
                } else {
                    return true;
                }
            })
            let nested_array = nestData(data)
            filtered_array = nested_array
        } else {
            return
        }

        filterGrid(grid_data, filtered_array)
    })
}

function filterCheck(node,storedFilters) {
    const activeFilters = []
    storedFilters.forEach((storedFilter) => {
        if(node.dataset.object == storedFilter.filtervalue) {
            activeFilters.push(node)
        }
    })
    if(activeFilters) {
        activeFilters.forEach((activeFilter) => {
            activeFilter.checked = true
        })
    }
}

async function buildMap() {
    const data = await fetchData('/output/gridFinal.json')
    renderD3(data)
}

function getD3Projection() {
    const bbox = document.body.getBoundingClientRect()
    const center = mapBox.getCenter()
    const zoom = mapBox.getZoom()
    // 512 is hardcoded tile size, might need to be 256 or changed to suit your map config
    const scale = (512) * 0.5 / Math.PI * Math.pow(2, zoom)

    const d3projection = d3.geoMercator()
        .center([center.lng, center.lat])
        .translate([bbox.width/2, bbox.height/2])
        .scale(scale)
    return d3projection
}
// RENDERS BASIC GRID AND UPDATES GRID LOCATION ON VIEWRESET AND MOVE
function renderD3(data) {
    function render(rerender) {
        if(rerender == true) {
            d3settings.svg.selectAll('path').remove().exit()
        }
        const pathprojection = d3settings.path.projection(getD3Projection())
        d3settings.svg.selectAll('path')
            .data(data.features)
            .enter().append('g').append('path')
            .attr('d', pathprojection)
            .style("fill", "#fff")
            .style("fill-opacity", '0.8')
            .style("stroke", "#004d60")
            .style("stroke-width", "1")
            .classed('meso',true)
            .attr('data-tile', (d) => {
                return d.properties.context + '-' + d.properties.mesoindex
            })
            .on('mousemove', function() {
            })
            .on('mouseout', function() {

            })
    }

    mapBox.on('viewreset', function() {
        updategridLocation(data)
    })
    mapBox.on('move', function() {
        updategridLocation(data)
    })

    render()
}

function filterGrid(grid_data, filtered_array) {
    resetgrid()
    const selection = d3.selectAll('.meso')
    const maxValue = d3.max(filtered_array, function(d) {
        return d.values.length;
    })
    const color = d3
        .scaleLinear()
        .range(["#fff", "#ff0000"])
        .domain([0, maxValue]);
    if(filtered_array.length) {
        selection._groups[0].forEach((path) => {
            filtered_array.forEach((tile) => {
                if(path.dataset.tile == tile.key.substring(4)) {
                    d3.select(path)
                        .data([tile.values.length])
                        .style('fill', (d) => {
                            return (d != 0) && color(d)
                            // return "rgba(" + "255,0,0," + normalize(d,0,maxValue) + "1)"
                        })
                }
            })
        })
    }
}

function updategridLocation(data) {
    const pathprojection = d3settings.path.projection(getD3Projection())
    d3settings.svg.selectAll('path')
        .data(data.features)
        .attr('d', pathprojection)
}

async function addLocalstorageEntry(filter) {
    let existingEntries = JSON.parse(localStorage.getItem('filters'))
    if(existingEntries == null ) {
        existingEntries = []
    }
    const findEntry = existingEntries.find((entry) => {
        return entry.id == filter.id
    })

    if(findEntry == undefined) {
        let entry = {
            id: filter.id,
            node: filter
        }
        localStorage.setItem('entry', JSON.stringify(entry))
        existingEntries.push(entry)
        localStorage.setItem('filters', JSON.stringify(existingEntries))
    }
}

async function removeLocalstorageEntry(filter) {
    let existingEntries = JSON.parse(localStorage.getItem('filters'))
    // FIND KEY AND REMOVE THAT ONE
    if(existingEntries != null) {
        const filterObjectKey = Object.keys(existingEntries).find((key) => {
            return existingEntries[key].filtername == filter.name && existingEntries[key].filtervalue == filter.dataset.object
        })
        existingEntries.splice(filterObjectKey,1)
        localStorage.setItem('filters', JSON.stringify(existingEntries))
    }
}
function resetgrid() {
    d3settings.svg.selectAll('path')
        .style('fill', '#fff')
}

// TODO resetinputs script aanpassen om nieuwe nodes te unchecken
function resetinputs(input_filters) {
    input_filters.forEach((input) => {
        input.inputs.forEach((node) => {
            node.checked = false
        })
    })
}