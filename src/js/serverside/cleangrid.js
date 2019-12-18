const fs = require('fs')
const d3 = require('d3')
const settings = {
    filePath: 'dist/data/griddata/Grid_Datacsv.csv'
}
clean()
function clean() {
    const json = loadFile()
    const squares = [
        {
            tilename: 'a1',
            coordinates: ['a1','a2','b1','b2']
        },
        {
            tilename: 'a2',
            coordinates: ['a2','a3','b2','b3']
        }
    ]
    squares.forEach((square)=>{
        const tileObject = new Object()
        tileObject.name = square.tilename
        square.coordinates.forEach((coord) => {
            let found = false
            let i = 0
            do {
                const nameLowercassed = json[i].Name.toLowerCase();
                if(nameLowercassed.includes(coord)) {
                    tileObject[coord] = json[i]
                    found = true
                }
                i += 1
            } while(i <= json.length && found == false)
        })
        console.log(tileObject)
    })
}

function loadFile(){
    const data = fs.readFileSync(settings.filePath, 'utf8')
    const json = convertCsv(data)
    return json
}

function convertCsv(source) {
    const psv = d3.dsvFormat(',');
    const data = psv.parse(source)
    return data
}