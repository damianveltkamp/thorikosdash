// TODO object aanmaken met initial min point and initial max point
// TODO object aanmaken met alle punten aan de linker kant wanneer die missen en alle punten aan de rechter kant wanneer die missen
// TODO correcte letter en getal als name mee geven aan de points
const fs = require('fs')
const geolib = require('geolib')

const settings = {
    outputPath: 'dist/data/output/',
    outputFileName: 'gridJsonData'
}
const extremeValues = [
    {
        row: '1',
        min: {
            '﻿ObjectID': '10',
            ID: '10',
            Name: 'A1',
            Latitude: '37.73958904',
            Longitude: '24.05164486',
            Height: '53.2231',
            Easting: '240200.604',
            Northing: '4181015.945',
            Elevation: '53.2231'
        },
        max: {
            '﻿ObjectID': '74',
            ID: '74',
            Name: 'K1',
            Latitude: '37.73940299',
            Longitude: '24.05730792',
            Height: '78.4474',
            Easting: '240699.0756',
            Northing: '4180979.577',
            Elevation: '78.4474'
        }
    },
    {
        row: '2',
        min: {
            '﻿ObjectID': '11',
            ID: '11',
            Name: 'A2',
            Latitude: '37.73913729',
            Longitude: '24.05162111',
            Height: '49.236',
            Easting: '240196.9302',
            Northing: '4180965.874',
            Elevation: '49.236'
        },
        max: {
            '﻿ObjectID': '85',
            ID: '85',
            Name: 'N2',
            Latitude: '37.73889013',
            Longitude: '24.05898237',
            Height: '38.3944',
            Easting: '240844.8659',
            Northing: '4180918.016',
            Elevation: '38.3944'
        }
    },
    {
        row: '3',
        min: {
            '﻿ObjectID': '12',
            ID: '12',
            Name: 'A3',
            Latitude: '37.73868486',
            Longitude: '24.05159762',
            Height: '40.3827',
            Easting: '240193.277',
            Northing: '4180915.727',
            Elevation: '40.3827'
        },
        max: {
            '﻿ObjectID': '68',
            ID: '68',
            Name: 'J3',
            Latitude: '37.73851961',
            Longitude: '24.05669403',
            Height: '62.9447',
            Easting: '240641.8842',
            Northing: '4180883.239',
            Elevation: '62.9447'
        }
    },
    {
        row: '4',
        min: {
            '﻿ObjectID': '8',
            ID: '8',
            Name: 'B4',
            Latitude: '37.73821804',
            Longitude: '24.05213961',
            Height: '32.6961',
            Easting: '240139.8168',
            Northing: '4180869.749',
            Elevation: '32.6961'
        },
        max: {
            '﻿ObjectID': '80',
            ID: '80',
            Name: 'L4',
            Latitude: '37.73803509',
            Longitude: '24.05780132',
            Height: '41.9471',
            Easting: '240737.7864',
            Northing: '4180826.394',
            Elevation: '41.9471'
        }
    },
    {
        row: '5',
        min: {
            '﻿ObjectID': '24',
            ID: '24',
            Name: 'C5',
            Latitude: '37.73774969',
            Longitude: '24.05268094',
            Height: '38.3127',
            Easting: '240285.4874',
            Northing: '4180808.928',
            Elevation: '38.3127'
        },
        max: {
            '﻿ObjectID': '81',
            ID: '81',
            Name: 'L5',
            Latitude: '37.73758431',
            Longitude: '24.05777968',
            Height: '35.9061',
            Easting: '240734.3053',
            Northing: '4180776.425',
            Elevation: '35.9061'
        }
    },
    {
        row: '6',
        min: {
            '﻿ObjectID': '43',
            ID: '43',
            Name: 'F6',
            Latitude: '37.73724545',
            Longitude: '24.05435647',
            Height: '33.0846',
            Easting: '240431.4037',
            Northing: '4180748.313',
            Elevation: '33.0846'
        },
        max: {
            '﻿ObjectID': '73',
            ID: '73',
            Name: 'J6',
            Latitude: '37.73717265',
            Longitude: '24.05661878',
            Height: '36.456',
            Easting: '240630.5474',
            Northing: '4180733.956',
            Elevation: '36.456'
        }
    },
    {
        row: '52',
        min: {
            '﻿ObjectID': '9',
            ID: '9',
            Name: 'A52',
            Latitude: '37.74003844',
            Longitude: '24.05166682',
            Height: '44.5943',
            Easting: '240154.3355',
            Northing: '4181069.407',
            Elevation: '44.5943'
        },
        max: {
            '﻿ObjectID': '77',
            ID: '77',
            Name: 'K52',
            Latitude: '37.73985209',
            Longitude: '24.05733217',
            Height: '96.2227',
            Easting: '240702.7812',
            Northing: '4181029.353',
            Elevation: '96.2227'
        }
    },
    {
        row: '53',
        min: {
            '﻿ObjectID': '56',
            ID: '56',
            Name: 'H53',
            Latitude: '37.74036111',
            Longitude: '24.05565492',
            Height: '134.5631',
            Easting: '240556.7336',
            Northing: '4181090.499',
            Elevation: '134.5631'
        },
        max: {
            '﻿ObjectID': '82',
            ID: '82',
            Name: 'L53',
            Latitude: '37.74028488',
            Longitude: '24.05792484',
            Height: '99.6662',
            Easting: '240756.5277',
            Northing: '4181075.743',
            Elevation: '99.6662'
        }
    }
]
const baseCases = [
    {
        identifier: 'C/',
        val: -3
    },
    {
        identifier: 'B/',
        val: -2
    },
    {
        identifier: 'A/',
        val: -1
    },
    {
        identifier: 'A',
        val: 0
    },
    {
        identifier: 'B',
        val: 1
    },
    {
        identifier: 'C',
        val: 2
    },
    {
        identifier: 'D',
        val: 3
    },
    {
        identifier: 'E',
        val: 4
    },
    {
        identifier: 'F',
        val: 5
    },
    {
        identifier: 'G',
        val: 6
    },
    {
        identifier: 'H',
        val: 7
    },
    {
        identifier: 'I',
        val: 8
    },
    {
        identifier: 'J',
        val: 9
    },
    {
        identifier: 'K',
        val: 10
    },
    {
        identifier: 'L',
        val: 11
    },
    {
        identifier: 'M',
        val: 12
    },
    {
        identifier: 'N',
        val: 13
    },
    {
        identifier: 'O',
        val: 14
    },
    {
        identifier: 'P',
        val: 15
    },
    {
        identifier: 'Q',
        val: 16
    }
]
coordcalc()
function coordcalc() {
    const rows = extremeValues
        .map(calcBearings)
        .map(calcBasecase)
        .map(calcPointsRight)
        .map(calcPointsLeft)
        .map(rewrite)
    writeData(rows)
}

function calcBearings(extremeValues) {
    const bearing = new Object()
    bearing.row = []
    bearing.row = extremeValues.row
    bearing.bearing = geolib.getRhumbLineBearing(
        { latitude: extremeValues.min.Latitude, longitude: extremeValues.min.Longitude },
        { latitude: extremeValues.max.Latitude, longitude: extremeValues.max.Longitude }
    )
    bearing.min = {
        name: extremeValues.min.Name,
        latitude: parseFloat(extremeValues.min.Latitude),
        longitude: parseFloat(extremeValues.min.Longitude)
    }
    bearing.max = {
        name: extremeValues.max.Name,
        latitude: parseFloat(extremeValues.max.Latitude),
        longitude: parseFloat(extremeValues.max.Longitude)
    }
    return bearing
}
function calcBasecase(row) {
    let found = false
    do {
        baseCases.forEach((basecase) => {
            if(row.min.name.charAt(0) == basecase.identifier) {
                row.basecase = {
                    minLetter: row.min.name.charAt(0),
                    val: basecase.val
                }
                found = true
            }
        })
    } while(found == false)
    return row
}
function calcPointsRight(row) {
    let i = row.basecase.val
    let foo = 0
    let initial = true
    row.rightpoints = []
    do{
        const point = new Object()
        if(initial == true) {
            const identifierName = baseCases.find(x => x.val === i).identifier
            point.identifier = identifierName + row.row
            point.coordinates = {
                latitude: row.min.latitude,
                longitude: row.min.longitude
            }
            row.rightpoints.push(point)
            initial = false
        } else {
            const identifierName = baseCases.find(x => x.val === (row.basecase.val+ (foo +1) )).identifier
            point.identifier = identifierName + row.row
            point.coordinates = geolib.computeDestinationPoint(
                { latitude: row.rightpoints[foo].coordinates.latitude, longitude: row.rightpoints[foo].coordinates.longitude },
                50,
                row.bearing
            )
            row.rightpoints.push(point)
            foo +=1
        }
    i+=1
    } while(i <= 16)
    return row
}
function calcPointsLeft(row) {
    let i = row.basecase.val
    let foo = 0
    let initial = true
    row.leftpoints = []
    do {
        const point = new Object()
        if(initial == true) {
            const identifierName = baseCases.find(x => x.val === (row.basecase.val-1)).identifier
            point.identifier = identifierName + row.row
            point.coordinates = geolib.computeDestinationPoint(
                { latitude: row.min.latitude, longitude: row.min.longitude },
                -50,
                row.bearing
            )
            row.leftpoints.push(point)
            initial = false
        } else {
            const identifierName = baseCases.find(x => x.val === (i-1)).identifier
            point.identifier = identifierName + row.row
            point.coordinates = geolib.computeDestinationPoint(
                { latitude: row.leftpoints[foo].coordinates.latitude, longitude: row.leftpoints[foo].coordinates.longitude },
                -50,
                row.bearing
            )
            row.leftpoints.push(point)
            foo +=1
        }
        i-=1
    } while(i > -3)
    return row
}
function rewrite(row) {
    const cleanedArray = []
    row.rightpoints.forEach((rightpoint) => {
        const newObj = new Object()
        newObj.type = "Feature"
        newObj.properties = {
            name: rightpoint.identifier
        }
        newObj.geometry = {
            type: "Point",
            coordinates: [
                rightpoint.coordinates.longitude,rightpoint.coordinates.latitude
            ]
        }
        cleanedArray.push(newObj)
    })
    row.leftpoints.forEach((leftpoint) => {
        const newObj = new Object()
        newObj.type = "Feature"
        newObj.properties = {
            name: leftpoint.identifier
        }
        newObj.geometry = {
            type: "Point",
            coordinates: [
                leftpoint.coordinates.longitude,leftpoint.coordinates.latitude
            ]
        }
        cleanedArray.unshift(newObj)
    })

    return cleanedArray
}

function writeData(data, fileIndex = 0) {
    fs.writeFile(settings.outputPath + settings.outputFileName +"_"+ fileIndex +".json",
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