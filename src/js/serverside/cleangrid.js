const fs = require('fs')
const d3 = require('d3')
const settings = {
    filePath: 'dist/data/output/gridJsonDataFinal_0.json'
}
clean()
function clean() {
    const json = JSON.parse(loadFile(settings.filePath))
    const mesodata = JSON.parse(loadFile('dist/data/fieldsheet/mesosquares2.json'))
    // TODO dynamisch berekenen welke coords er nodig zijn per tilename
    const squares = [
        {
            tilename: 'c/',
        },
        {
            tilename: 'c/b/',
        },
        {
            tilename: 'b/',
        },
        {
            tilename: 'b/a/',
        },
        {
            tilename: 'a/',
        },
        {
            tilename: 'a/a',
        },
        {
            tilename: 'a',
        },
        {
            tilename: 'ab',
        },
        {
            tilename: 'b',
        },
        {
            tilename: 'bc',
        },
        {
            tilename: 'c',
        },
        {
            tilename: 'cd',
        },
        {
            tilename: 'd',
        },
        {
            tilename: 'de',
        },
        {
            tilename: 'e',
        },
        {
            tilename: 'ef',
        },
        {
            tilename: 'f',
        },
        {
            tilename: 'fg',
        },
        {
            tilename: 'g',
        },
        {
            tilename: 'gh',
        },
        {
            tilename: 'h',
        },
        {
            tilename: 'hi',
        },
        {
            tilename: 'i',
        },
        {
            tilename: 'ij',
        },
        {
            tilename: 'j',
        },
        {
            tilename: 'jk',
        },
        {
            tilename: 'k',
        },
        {
            tilename: 'kl',
        },
        {
            tilename: 'l',
        },
        {
            tilename: 'lm',
        },
        {
            tilename: 'm',
        },
        {
            tilename: 'mn',
        },
        {
            tilename: 'n',
        },
        {
            tilename: 'no',
        },
        {
            tilename: 'o',
        },
        {
            tilename: 'op',
        },
        {
            tilename: 'p',
        },
        {
            tilename: 'pq',
        },
        {
            tilename: 'q',
        },
        {
            tilename: 'qr',
        },
        {
            tilename: 'r',
        }
    ]
    const rows = [
        53,
        52.5,
        52,
        51.5,
        51,
        0.5,
        1,
        1.5,
        2,
        2.5,
        3,
        3.5,
        4,
        4.5,
        5
    ]

    const featureCollection = {
        type: "FeatureCollection",
        features: []
    }
    const mesosquareTiles = []
    mesodata.forEach((entry) => {
        const newObj = new Object()
        const firstchar = entry.Mesosquare.charAt(0)
        const secondchar = entry.Mesosquare.charAt(1)
        if(secondchar == "'") {
            const split = entry.Mesosquare.split("'")
            const split1 = split[1].split('.')
            newObj.squarename = split[0]+'/'
            newObj.rownumber = split1[0]
            newObj.mesosquarenumber = split1[1]
            newObj.context = entry.Context
        } else {
            const split = entry.Mesosquare.split(firstchar)
            const split1 = split[1].split('.')
            newObj.squarename = firstchar
            newObj.rownumber = split1[0]
            newObj.mesosquarenumber = split1[1]
            newObj.context = entry.Context
        }
        mesosquareTiles.push(newObj)
    })

    rows.forEach((row,rowindex) => {
        if(rows[(rowindex+1)] != undefined){
            const filtereddata = json.filter((entry) => {
                return entry.properties.row === row.toString() || entry.properties.row === rows[(rowindex + 1)].toString()
            })
            squares.forEach((square,squareindex)=> {
                // If rowindex == oneven getal then
                // If rowindex == even getal
                if(squares[(squareindex+1)] != undefined) {
                    const featureObject = new Object()
                    featureObject.type = 'Feature'
                    featureObject.properties = {
                        name: square.tilename,
                        row: row
                    }
                    if ( rowindex % 2 == 0) {
                        if ( squareindex % 2 == 0) {
                            featureObject.properties.mesoindex = 1
                        } else {
                            featureObject.properties.mesoindex = 2
                        }
                    }else{
                        if ( squareindex % 2 == 0) {
                            featureObject.properties.mesoindex = 3
                        } else {
                            featureObject.properties.mesoindex = 4
                        }
                    }
                    featureObject.geometry = {}
                    featureObject.geometry.type = 'Polygon'
                    featureObject.geometry.coordinates = [[]]
                    const row1 = filtereddata.filter((entry) => {
                        return entry.properties.row === row.toString()
                    })
                    const row2 = filtereddata.filter((entry) => {
                        return entry.properties.row === rows[(rowindex+1)].toString()
                    })
                    const squaresRow1 = row1.filter((entry) => {
                        return entry.properties.name.toLowerCase() === square.tilename || entry.properties.name.toLowerCase() === squares[(squareindex+1)].tilename
                    })
                    const squaresRow2 = row2.filter((entry) => {
                        return entry.properties.name.toLowerCase() === square.tilename || entry.properties.name.toLowerCase() === squares[(squareindex+1)].tilename
                    })
                    const foo = mesosquareTiles.filter((entry) => {
                        if(square.tilename.charAt(1) && square.tilename.charAt(1) != '/') {
                            if(row % 1) {
                                if(rows[rowindex -1] > 10) {
                                    if(row == 0.5) {
                                        const rowRoundUp = 51
                                        return entry.squarename.toLowerCase() === square.tilename.charAt(0).toLowerCase() && entry.rownumber === rowRoundUp.toString()
                                    } else {
                                        const rowRoundUp = row + 0.5
                                        return entry.squarename.toLowerCase() === square.tilename.charAt(0).toLowerCase() && entry.rownumber === rowRoundUp.toString()
                                    }
                                } else {
                                    const rowRoundUp = row - 0.5
                                    return entry.squarename.toLowerCase() === square.tilename.charAt(0).toLowerCase() && entry.rownumber === rowRoundUp.toString()
                                }
                            } else {
                                return entry.squarename.toLowerCase() === square.tilename.charAt(0).toLowerCase() && entry.rownumber === row.toString()
                            }
                        } else if(square.tilename.charAt(1) == '/' && square.tilename.charAt(2)) {
                            if(row % 1) {
                                if(rows[rowindex -1] > 10) {
                                    if(row == 0.5) {
                                        const rowRoundUp = 51
                                        return entry.squarename.toLowerCase() === (square.tilename.charAt(0).toLowerCase() + square.tilename.charAt(1).toLowerCase()) && entry.rownumber === rowRoundUp.toString()
                                    } else {
                                        const rowRoundUp = row + 0.5
                                        return entry.squarename.toLowerCase() === (square.tilename.charAt(0).toLowerCase() + square.tilename.charAt(1).toLowerCase()) && entry.rownumber === rowRoundUp.toString()
                                    }
                                } else {
                                    const rowRoundUp = row - 0.5
                                    return entry.squarename.toLowerCase() === (square.tilename.charAt(0).toLowerCase() + square.tilename.charAt(1).toLowerCase()) && entry.rownumber === rowRoundUp.toString()
                                }
                            } else {
                                return entry.squarename.toLowerCase() === (square.tilename.charAt(0).toLowerCase() + square.tilename.charAt(1).toLowerCase()) && entry.rownumber === row.toString()
                            }
                        } else {
                            if(row % 1) {
                                if(rows[rowindex -1] > 10) {
                                    if(row == 0.5) {
                                        const rowRoundUp = 51
                                        return entry.squarename.toLowerCase() === square.tilename.toLowerCase() && entry.rownumber === rowRoundUp.toString()
                                    } else {
                                        const rowRoundUp = row + 0.5
                                        return entry.squarename.toLowerCase() === square.tilename.toLowerCase() && entry.rownumber === rowRoundUp.toString()
                                    }
                                } else {
                                    const rowRoundUp = row - 0.5
                                    return entry.squarename.toLowerCase() === square.tilename.toLowerCase() && entry.rownumber === rowRoundUp.toString()
                                }
                            } else {
                                return entry.squarename.toLowerCase() === square.tilename.toLowerCase() && entry.rownumber === row.toString()
                            }
                        }
                    })
                    if(foo.length != 0) {
                        featureObject.properties.context = foo[0].context
                    }
                    featureObject.geometry.coordinates[0].push(squaresRow1[0].geometry.coordinates)
                    featureObject.geometry.coordinates[0].push(squaresRow1[1].geometry.coordinates)
                    featureObject.geometry.coordinates[0].push(squaresRow2[1].geometry.coordinates)
                    featureObject.geometry.coordinates[0].push(squaresRow2[0].geometry.coordinates)
                    featureObject.geometry.coordinates[0].push(squaresRow1[0].geometry.coordinates)
                    featureCollection.features.push(featureObject)
                }
            })
        }
    })
    writeData(featureCollection)
}

function loadFile(filepath){
    const data = fs.readFileSync(filepath, 'utf8')
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
    fs.writeFile('dist/data/output/' + 'tilegridJsonDataFinal' +"_"+ fileIndex +".json",
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