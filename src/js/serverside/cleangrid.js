const fs = require('fs')
const d3 = require('d3')
const settings = {
    filePath: 'dist/data/output/gridJsonData_0.json'
}
clean()
function clean() {
    const json = JSON.parse(loadFile())
    // TODO dynamisch berekenen welke coords er nodig zijn per tilename
    const squares = [
        // A
        {
            tilename: 'a53',
            coordinates: ['a53','b53','b52','a52']
        },
        {
            tilename: 'a52',
            coordinates: ['a52','b52','b1','a1']
        },
        {
            tilename: 'a1',
            coordinates: ['a1','b1','b2','a2']
        },
        {
            tilename: 'a2',
            coordinates: ['a2','b2','b3','a3']
        },
        {
            tilename: 'a3',
            coordinates: ['a3','b3','b4','a4']
        },
        {
            tilename: 'a4',
            coordinates: ['a4','b4','b5','a5']
        },
        {
            tilename: 'a5',
            coordinates: ['a5','b5','b6','a6']
        },
        // B
        {
            tilename: 'b53',
            coordinates: ['b53','c53','c52','b52']
        },
        {
            tilename: 'b52',
            coordinates: ['b52','c52','c1','b1']
        },
        {
            tilename: 'b1',
            coordinates: ['b1','c1','c2','b2']
        },
        {
            tilename: 'b2',
            coordinates: ['b2','c2','c3','b3']
        },
        {
            tilename: 'b3',
            coordinates: ['b3','c3','c4','b4']
        },
        {
            tilename: 'b4',
            coordinates: ['b4','c4','c5','b5']
        },
        {
            tilename: 'b5',
            coordinates: ['b5','c5','c6','b6']
        },
        // C
        {
            tilename: 'c53',
            coordinates: ['c53','d53','d52','c52']
        },
        {
            tilename: 'c52',
            coordinates: ['c52','d52','d1','c1']
        },
        {
            tilename: 'c1',
            coordinates: ['c1','d1','d2','c2']
        },
        {
            tilename: 'c2',
            coordinates: ['c2','d2','d3','c3']
        },
        {
            tilename: 'c3',
            coordinates: ['c3','d3','d4','c4']
        },
        {
            tilename: 'c4',
            coordinates: ['c4','d4','d5','c5']
        },
        {
            tilename: 'c5',
            coordinates: ['c5','d5','d6','c6']
        },
        // D
        {
            tilename: 'd53',
            coordinates: ['d53','e53','e52','d52']
        },
        {
            tilename: 'd52',
            coordinates: ['d52','e52','e1','d1']
        },
        {
            tilename: 'd1',
            coordinates: ['d1','e1','e2','d2']
        },
        {
            tilename: 'd2',
            coordinates: ['d2','e2','e3','d3']
        },
        {
            tilename: 'd3',
            coordinates: ['d3','e3','e4','d4']
        },
        {
            tilename: 'd4',
            coordinates: ['d4','e4','e5','d5']
        },
        {
            tilename: 'd5',
            coordinates: ['d5','e5','e6','d6']
        },
        // E
        {
            tilename: 'e53',
            coordinates: ['e53','f53','f52','e52']
        },
        {
            tilename: 'e52',
            coordinates: ['e52','f52','f1','e1']
        },
        {
            tilename: 'e1',
            coordinates: ['e1','f1','f2','e2']
        },
        {
            tilename: 'e2',
            coordinates: ['e2','f2','f3','e3']
        },
        {
            tilename: 'e3',
            coordinates: ['e3','f3','f4','e4']
        },
        {
            tilename: 'e4',
            coordinates: ['e4','f4','f5','e5']
        },
        {
            tilename: 'e5',
            coordinates: ['e5','f5','f6','e6']
        },
        // F
        {
            tilename: 'f53',
            coordinates: ['f53','g53','g52','f52']
        },
        {
            tilename: 'f52',
            coordinates: ['f52','g52','g1','f1']
        },
        {
            tilename: 'f1',
            coordinates: ['f1','g1','g2','f2']
        },
        {
            tilename: 'f2',
            coordinates: ['f2','g2','g3','f3']
        },
        {
            tilename: 'f3',
            coordinates: ['f3','g3','g4','f4']
        },
        {
            tilename: 'f4',
            coordinates: ['f4','g4','g5','f5']
        },
        {
            tilename: 'f5',
            coordinates: ['f5','g5','g6','f6']
        },
        // G
        {
            tilename: 'g53',
            coordinates: ['g53','h53','h52','g52']
        },
        {
            tilename: 'g52',
            coordinates: ['g52','h52','h1','g1']
        },
        {
            tilename: 'g1',
            coordinates: ['g1','h1','h2','g2']
        },
        {
            tilename: 'g2',
            coordinates: ['g2','h2','h3','g3']
        },
        {
            tilename: 'g3',
            coordinates: ['g3','h3','h4','g4']
        },
        {
            tilename: 'g4',
            coordinates: ['g4','h4','h5','g5']
        },
        {
            tilename: 'g5',
            coordinates: ['g5','h5','h6','g6']
        },
        // H
        {
            tilename: 'h53',
            coordinates: ['h53','i53','i52','h52']
        },
        {
            tilename: 'h52',
            coordinates: ['h52','i52','i1','h1']
        },
        {
            tilename: 'h1',
            coordinates: ['h1','i1','i2','h2']
        },
        {
            tilename: 'h2',
            coordinates: ['h2','i2','i3','h3']
        },
        {
            tilename: 'h3',
            coordinates: ['h3','i3','i4','h4']
        },
        {
            tilename: 'h4',
            coordinates: ['h4','i4','i5','h5']
        },
        {
            tilename: 'h5',
            coordinates: ['h5','i5','i6','h6']
        },
        // I
        {
            tilename: 'i53',
            coordinates: ['i53','j53','j52','i52']
        },
        {
            tilename: 'i52',
            coordinates: ['i52','j52','j1','i1']
        },
        {
            tilename: 'i1',
            coordinates: ['i1','j1','j2','i2']
        },
        {
            tilename: 'i2',
            coordinates: ['i2','j2','j3','i3']
        },
        {
            tilename: 'i3',
            coordinates: ['i3','j3','j4','i4']
        },
        {
            tilename: 'i4',
            coordinates: ['i4','j4','j5','i5']
        },
        {
            tilename: 'i5',
            coordinates: ['i5','j5','j6','i6']
        },
        // J
        {
            tilename: 'j53',
            coordinates: ['j53','k53','k52','j52']
        },
        {
            tilename: 'j52',
            coordinates: ['j52','k52','k1','j1']
        },
        {
            tilename: 'j1',
            coordinates: ['j1','k1','k2','j2']
        },
        {
            tilename: 'j2',
            coordinates: ['j2','k2','k3','j3']
        },
        {
            tilename: 'j3',
            coordinates: ['j3','k3','k4','j4']
        },
        {
            tilename: 'j4',
            coordinates: ['j4','k4','k5','j5']
        },
        {
            tilename: 'j5',
            coordinates: ['j5','k5','k6','j6']
        },
        // K
        {
            tilename: 'k53',
            coordinates: ['k53','l53','l52','k52']
        },
        {
            tilename: 'k52',
            coordinates: ['k52','l52','l1','k1']
        },
        {
            tilename: 'k1',
            coordinates: ['k1','l1','l2','k2']
        },
        {
            tilename: 'k2',
            coordinates: ['k2','l2','l3','k3']
        },
        {
            tilename: 'k3',
            coordinates: ['k3','l3','l4','k4']
        },
        {
            tilename: 'k4',
            coordinates: ['k4','l4','l5','k5']
        },
        {
            tilename: 'k5',
            coordinates: ['k5','l5','l6','k6']
        },
        // L
        {
            tilename: 'l53',
            coordinates: ['l53','m53','m52','l52']
        },
        {
            tilename: 'l52',
            coordinates: ['l52','m52','m1','l1']
        },
        {
            tilename: 'l1',
            coordinates: ['l1','m1','m2','l2']
        },
        {
            tilename: 'l2',
            coordinates: ['l2','m2','m3','l3']
        },
        {
            tilename: 'l3',
            coordinates: ['l3','m3','m4','l4']
        },
        {
            tilename: 'l4',
            coordinates: ['l4','m4','m5','l5']
        },
        {
            tilename: 'l5',
            coordinates: ['l5','m5','m6','l6']
        },
        // M
        {
            tilename: 'm53',
            coordinates: ['m53','n53','n52','m52']
        },
        {
            tilename: 'm52',
            coordinates: ['m52','n52','n1','m1']
        },
        {
            tilename: 'm1',
            coordinates: ['m1','n1','n2','m2']
        },
        {
            tilename: 'm2',
            coordinates: ['m2','n2','n3','m3']
        },
        {
            tilename: 'm3',
            coordinates: ['m3','n3','n4','m4']
        },
        {
            tilename: 'm4',
            coordinates: ['m4','n4','n5','m5']
        },
        {
            tilename: 'm5',
            coordinates: ['m5','n5','n6','m6']
        },
        // N
        {
            tilename: 'n53',
            coordinates: ['n53','o53','o52','n52']
        },
        {
            tilename: 'n52',
            coordinates: ['n52','o52','o1','n1']
        },
        {
            tilename: 'n1',
            coordinates: ['n1','o1','o2','n2']
        },
        {
            tilename: 'n2',
            coordinates: ['n2','o2','o3','n3']
        },
        {
            tilename: 'n3',
            coordinates: ['n3','o3','o4','n4']
        },
        {
            tilename: 'n4',
            coordinates: ['n4','o4','o5','n5']
        },
        {
            tilename: 'n5',
            coordinates: ['n5','o5','o6','n6']
        },
        // O
        {
            tilename: 'o53',
            coordinates: ['o53','p53','p52','o52']
        },
        {
            tilename: 'o52',
            coordinates: ['o52','p52','p1','o1']
        },
        {
            tilename: 'o1',
            coordinates: ['o1','p1','p2','o2']
        },
        {
            tilename: 'o2',
            coordinates: ['o2','p2','p3','o3']
        },
        {
            tilename: 'o3',
            coordinates: ['o3','p3','p4','o4']
        },
        {
            tilename: 'o4',
            coordinates: ['o4','p4','p5','o5']
        },
        {
            tilename: 'o5',
            coordinates: ['o5','p5','p6','o6']
        },
        // P
        {
            tilename: 'p53',
            coordinates: ['p53','q53','q52','p52']
        },
        {
            tilename: 'p52',
            coordinates: ['p52','q52','q1','p1']
        },
        {
            tilename: 'p1',
            coordinates: ['p1','q1','q2','p2']
        },
        {
            tilename: 'p2',
            coordinates: ['p2','q2','q3','p3']
        },
        {
            tilename: 'p3',
            coordinates: ['p3','q3','q4','p4']
        },
        {
            tilename: 'p4',
            coordinates: ['p4','q4','q5','p5']
        },
        {
            tilename: 'p5',
            coordinates: ['p5','q5','q6','p6']
        }
    ]
    const featureCollection = {
        type: "FeatureCollection",
        features: []
    }
    /* Gets the coordinates to draw tile */
    squares.forEach((square)=>{
        const featureObject = new Object()
        featureObject.type = 'Feature'
        featureObject.properties = {
            name: square.tilename
        }
        featureObject.geometry = {}
        featureObject.geometry.type = 'Polygon'
        featureObject.geometry.coordinates = [[]]
        square.coordinates.forEach((coord) => {
            let found = false
            let i = 0
            do {
                const nameLowercassed = normalizeString(json[i])
                if(nameLowercassed == coord) {
                    featureObject.geometry.coordinates[0].push(json[i].geometry.coordinates)
                    found = true
                }
                i += 1
            } while(i <= json.length && found == false)
        })
        featureCollection.features.push(featureObject)
    })
    featureCollection.features.forEach((feature) => {
        feature.geometry.coordinates[0].push(feature.geometry.coordinates[0][0])
    })
    writeData(featureCollection)
}

function loadFile(){
    const data = fs.readFileSync(settings.filePath, 'utf8')
    return data
}

function convertCsv(source) {
    const psv = d3.dsvFormat(',');
    const data = psv.parse(source)
    return data
}
function normalizeString(json) {
    return json.properties.name.toLowerCase();
}

function writeData(data, fileIndex = 0) {
    fs.writeFile('dist/data/output/' + 'tilegridJsonData' +"_"+ fileIndex +".json",
        JSON.stringify(data,null,4),
        { encoding: 'utf8', flag: 'wx'},
        function(err) {
            if (err && err.code == "EEXIST") {
                writeData(data, ++fileIndex)
            } else if (err) {
                return console.log(err)
            } else {
                console.log("The file was saved!")
            }
        })
}