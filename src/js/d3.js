const d3 = require('d3')
const mapboxgl = require('mapbox-gl')
import {fetchData} from "./serverside/fetchdata";

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFtaWFudmVsdGthbXAiLCJhIjoiY2szNGdvcTA1MG0zYzNibnlyNW1nZWZreSJ9.fUYUVFTp1_PjhZ6HkC0SDQ'
const mapBox = new mapboxgl.Map({
    container: 'mapbox',
    style: 'mapbox://styles/damianveltkamp/ck372eqvz19fl1ctfeghxifun',
    center: [24.055929341400088,37.7378439620656],
    zoom: 14.8
})

// D3 base settings + base projection (Recalculate this projection when map is being interacted with)
const d3settings = {
    projection: getD3Projection(),
    path: d3.geoPath(),
    svg: d3.select(mapBox.getCanvasContainer()).append('svg')
}

mapBox.dragRotate.disable();
mapBox.touchZoomRotate.disableRotation();

initMap()
function initMap() {
    buildMap()
}
async function buildMap() {
    // Fetch data from json file
    const data = await fetchData('/data/grid/gridfeatures.json')
    // Plot squares on projection after fetching data from json file
    renderD3(data)
}

/* Calculates the d3 projection based on the mapbox view */
function getD3Projection() {
    const bbox = document.body.getBoundingClientRect();
    const center = mapBox.getCenter();
    const zoom = mapBox.getZoom();
    // 512 is hardcoded tile size, might need to be 256 or changed to suit your map config
    const scale = (512) * 0.5 / Math.PI * Math.pow(2, zoom);

    const d3projection = d3.geoMercator()
        .center([center.lng, center.lat])
        .translate([bbox.width/2, bbox.height/2])
        .scale(scale);
    return d3projection;
}
/* Function uses d3projection, d3path, d3svg, mapbox and data */
function renderD3(data) {

    function render(rerender) {
        if(rerender == true) {
            d3settings.svg.selectAll('path').remove().exit()
        }
        const pathprojection = d3settings.path.projection(getD3Projection())
        d3settings.svg.selectAll('path')
            .data(data.features)
            .enter().append('path')
            .attr('d', pathprojection)
            .attr('data-tile', (d) => {
                return d.properties.name
            })
            .style("fill", "red")
            .style("fill-opacity", "1")
            .style("stroke", "#004d60")
            .style("stroke-width", "1");
    }

    mapBox.on('viewreset', function() {
        render(true)
    })
    mapBox.on('move', function() {
        render(true)
    })

    render()
}