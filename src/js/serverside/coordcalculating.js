// TODO REFACTOR THE WHOLE THING!
// TODO ROWS KOPPELEN
const fs = require('fs')
const geolib = require('geolib')

const settings = {
    outputPath: 'dist/data/output/',
    outputFileName: 'gridJsonDataFinalhalf'
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
        row: '51',
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
        },
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
    },
    {
        row: '53',
        min: {
            '﻿ObjectID': '9',
            ID: '9',
            Name: 'C/53',
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
        },
        min: {
            '﻿ObjectID': '56',
            ID: '56',
            Name: 'R53',
            Latitude: '37.74100146276254',
            Longitude: '24.049985023339868',
            Height: '134.5631',
            Easting: '240556.7336',
            Northing: '4181090.499',
            Elevation: '134.5631'
        },
        max: {
            '﻿ObjectID': '82',
            ID: '82',
            Name: 'L53',
            Latitude: '37.74061987222393',
            Longitude: '24.06134725897303',
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
        identifier: 'C/B/',
        val: -2.5
    },
    {
        identifier: 'B/',
        val: -2
    },
    {
        identifier: 'B/A/',
        val: -1.5
    },
    {
        identifier: 'A/',
        val: -1
    },
    {
        identifier: 'A/A',
        val: -0.5
    },
    {
        identifier: 'A',
        val: 0
    },
    {
        identifier: 'AB',
        val: 0.5
    },
    {
        identifier: 'B',
        val: 1
    },
    {
        identifier: 'BC',
        val: 1.5
    },
    {
        identifier: 'C',
        val: 2
    },
    {
        identifier: 'CD',
        val: 2.5
    },
    {
        identifier: 'D',
        val: 3
    },
    {
        identifier: 'DE',
        val: 3.5
    },
    {
        identifier: 'E',
        val: 4
    },
    {
        identifier: 'EF',
        val: 4.5
    },
    {
        identifier: 'F',
        val: 5
    },
    {
        identifier: 'FG',
        val: 5.5
    },
    {
        identifier: 'G',
        val: 6
    },
    {
        identifier: 'GH',
        val: 6.5
    },
    {
        identifier: 'H',
        val: 7
    },
    {
        identifier: 'HI',
        val: 7.5
    },
    {
        identifier: 'I',
        val: 8
    },
    {
        identifier: 'IJ',
        val: 8.5
    },
    {
        identifier: 'J',
        val: 9
    },
    {
        identifier: 'JK',
        val: 9.5
    },
    {
        identifier: 'K',
        val: 10
    },
    {
        identifier: 'KL',
        val: 10.5
    },
    {
        identifier: 'L',
        val: 11
    },
    {
        identifier: 'LM',
        val: 11.5
    },
    {
        identifier: 'M',
        val: 12
    },
    {
        identifier: 'MN',
        val: 12.5
    },
    {
        identifier: 'N',
        val: 13
    },
    {
        identifier: 'NO',
        val: 13.5
    },
    {
        identifier: 'O',
        val: 14
    },
    {
        identifier: 'OP',
        val: 14.5
    },
    {
        identifier: 'P',
        val: 15
    },
    {
        identifier: 'PQ',
        val: 15.5
    },
    {
        identifier: 'Q',
        val: 16
    },
    {
        identifier: 'QR',
        val: 16.5
    },
    {
        identifier: 'R',
        val: 17
    }
]
coordcalc()
function coordcalc() {
    const rows = extremeValues
        .map(calcBearings)
        .map(calcBasecase)
        .map(calcPointsRight)
        .map(calcPointsLeft)
    //     .map(rewrite)
    // writeData(rows)
    const minpoint1 = { identifier: 'C/',
        row: '53',
        coordinates:
            { latitude: 37.74100146276254, longitude: 24.049985023339868 } }

    const minpoint2 = { identifier: 'C/',
        row: '52',
        coordinates:
            { latitude: 37.74055188911277, longitude: 24.049973828497215 } }
    const maxpoint1 = { identifier: 'R',
        row: '53',
        coordinates:
            { latitude: 37.74061987222393, longitude: 24.06134725897303 } }
    const maxpoint2 = { identifier: 'R',
        row: '52',
        coordinates:
            { latitude: 37.740170317254474, longitude: 24.06130295418022 } }
    const halfRows = [
        {
            row: '1.5',
            //0
            minpoint1: rows[0].leftpoints[(rows[0].leftpoints.length -1)],
            //1
            minpoint2: rows[1].leftpoints[(rows[1].leftpoints.length -1)],
            //0
            maxpoint1: rows[0].rightpoints[(rows[0].rightpoints.length -1)],
            //1
            maxpoint2: rows[1].rightpoints[(rows[1].rightpoints.length -1)],
        },
        {
            row: '2.5',
            //1
            minpoint1: rows[1].leftpoints[(rows[1].leftpoints.length -1)],
            //2
            minpoint2: rows[2].leftpoints[(rows[2].leftpoints.length -1)],
            //1
            maxpoint1: rows[1].rightpoints[(rows[1].rightpoints.length -1)],
            //2
            maxpoint2: rows[2].rightpoints[(rows[2].rightpoints.length -1)],
        },
        {
            row: '3.5',
            //2
            minpoint1: rows[2].leftpoints[(rows[2].leftpoints.length -1)],
            //3
            minpoint2: rows[3].leftpoints[(rows[3].leftpoints.length -1)],
            //2
            maxpoint1: rows[2].rightpoints[(rows[2].rightpoints.length -1)],
            //3
            maxpoint2: rows[3].rightpoints[(rows[3].rightpoints.length -1)],
        },
        {
            row: '4.5',
            //3
            minpoint1: rows[3].leftpoints[(rows[3].leftpoints.length -1)],
            //4
            minpoint2: rows[4].leftpoints[(rows[4].leftpoints.length -1)],
            //3
            maxpoint1: rows[3].rightpoints[(rows[3].rightpoints.length -1)],
            //4
            maxpoint2: rows[4].rightpoints[(rows[4].rightpoints.length -1)],
        },
        //51
        {
            row: '0.5',
            //5
            minpoint1: rows[5].leftpoints[(rows[5].leftpoints.length -1)],
            //0
            minpoint2: rows[0].leftpoints[(rows[0].leftpoints.length -1)],
            //5
            maxpoint1: rows[5].rightpoints[(rows[5].rightpoints.length -1)],
            //0
            maxpoint2: rows[0].rightpoints[(rows[0].rightpoints.length -1)],

        },
        //52
        {
            row: '51.5',
            //5
            minpoint1: rows[5].leftpoints[(rows[5].leftpoints.length -1)],
            //6
            minpoint2: rows[6].leftpoints[(rows[6].leftpoints.length -1)],
            //5
            maxpoint1: rows[5].rightpoints[(rows[5].rightpoints.length -1)],
            //6
            maxpoint2: rows[6].rightpoints[(rows[6].rightpoints.length -1)],
        },
        {
            row: '51.5',
            //5
            minpoint1: rows[5].leftpoints[(rows[5].leftpoints.length -1)],
            //6
            minpoint2: rows[6].leftpoints[(rows[6].leftpoints.length -1)],
            //5
            maxpoint1: rows[5].rightpoints[(rows[5].rightpoints.length -1)],
            //6
            maxpoint2: rows[6].rightpoints[(rows[6].rightpoints.length -1)],
        },
        ,
        {
            row: '52.5',
            //5
            minpoint1: minpoint1,
            //6
            minpoint2: minpoint2,
            //5
            maxpoint1: maxpoint1,
            //6
            maxpoint2: maxpoint2,
        }
    ]

    const foo = halfRows
        .map(calcMinPoint)
        .map(calcMaxPoint)
        .map(calcBasecase)
        .map(calcBearings2)
        .map(calcPointsRight2)
        .map(rewrite)
    writeData(foo)
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
            if(row.min.name.charAt(1) !== '/') {
                if(row.min.name.charAt(0) == basecase.identifier) {
                    row.basecase = {
                        minLetter: row.min.name.charAt(0),
                        val: basecase.val
                    }
                    found = true
                }
            } else {
                if(row.min.name.charAt(0) == basecase.identifier.charAt(0) && basecase.identifier.charAt(1) == '/' && !basecase.identifier.charAt(2)) {
                    row.basecase = {
                        minLetter: row.min.name.charAt(0)+row.min.name.charAt(1),
                        val: basecase.val
                    }
                    found = true
                }
            }
        })
    } while(found == false)
    return row
}
function calcPointsRight(row) {
    let i = row.basecase.val
    let prevPoint = 0
    let initial = true
    row.rightpoints = []

    do{
        const point = new Object()
        if(initial == true) {
            const identifierName = baseCases.find(x => x.val === i).identifier
            point.identifier = identifierName
            point.row = row.row
            point.coordinates = {
                latitude: row.min.latitude,
                longitude: row.min.longitude
            }
            row.rightpoints.push(point)
            initial = false
        } else {
            const identifierName = baseCases.find(x => x.val === (i)).identifier
            point.identifier = identifierName
            point.row = row.row
            point.coordinates = geolib.computeDestinationPoint(
                { latitude: row.rightpoints[prevPoint].coordinates.latitude, longitude: row.rightpoints[prevPoint].coordinates.longitude },
                25,
                row.bearing
            )
            row.rightpoints.push(point)
            prevPoint +=1
        }
        i+=0.5
    } while(i <= 17)
    return row
}
function calcPointsLeft(row) {
    let i = (row.basecase.val-0.5)
    let prevPoint = 0
    let initial = true
    row.leftpoints = []
    do {
        const point = new Object()
        if(initial == true) {
            const identifierName = baseCases.find(x => x.val === (row.basecase.val-0.5)).identifier
            point.identifier = identifierName
            point.row = row.row
            point.coordinates = geolib.computeDestinationPoint(
                { latitude: row.min.latitude, longitude: row.min.longitude },
                -25,
                row.bearing
            )
            row.leftpoints.push(point)
            initial = false
        } else {
            const identifierName = baseCases.find(x => x.val === (i)).identifier
            point.identifier = identifierName
            point.row = row.row
            point.coordinates = geolib.computeDestinationPoint(
                { latitude: row.leftpoints[prevPoint].coordinates.latitude, longitude: row.leftpoints[prevPoint].coordinates.longitude },
                -25,
                row.bearing
            )
            row.leftpoints.push(point)
            prevPoint +=1
        }
        i-=0.5
    } while(i >= -3)
    return row
}
function rewrite(row) {
    const cleanedArray = []
    if(row.rightpoints) {
        row.rightpoints.forEach((rightpoint) => {
            const newObj = new Object()
            newObj.type = "Feature"
            newObj.properties = {
                name: rightpoint.identifier,
                row: rightpoint.row
            }
            newObj.geometry = {
                type: "Point",
                coordinates: [
                    rightpoint.coordinates.longitude,rightpoint.coordinates.latitude
                ]
            }
            cleanedArray.push(newObj)
        })
    }
    if(row.leftpoints) {
        row.leftpoints.forEach((leftpoint) => {
            const newObj = new Object()
            newObj.type = "Feature"
            newObj.properties = {
                name: leftpoint.identifier,
                row: leftpoint.row
            }
            newObj.geometry = {
                type: "Point",
                coordinates: [
                    leftpoint.coordinates.longitude,leftpoint.coordinates.latitude
                ]
            }
            cleanedArray.unshift(newObj)
        })
    }

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



function calcBearings2(extremeValues) {
    extremeValues.bearing = geolib.getRhumbLineBearing(
        { latitude: extremeValues.min.Latitude, longitude: extremeValues.min.Longitude },
        { latitude: extremeValues.max.Latitude, longitude: extremeValues.max.Longitude }
    )
    return extremeValues
}
function calcMinPoint(halfRow) {
    halfRow.min = {}
    halfRow.min.name = halfRow.minpoint1.identifier
    const bearing = geolib.getRhumbLineBearing(
        { latitude: halfRow.minpoint1.coordinates.latitude, longitude: halfRow.minpoint1.coordinates.longitude },
        { latitude: halfRow.minpoint2.coordinates.latitude, longitude: halfRow.minpoint2.coordinates.longitude }
    )
    const coords = geolib.computeDestinationPoint(
        { latitude: halfRow.minpoint1.coordinates.latitude, longitude: halfRow.minpoint1.coordinates.longitude },
        25,
        bearing
    )
    halfRow.min.Latitude = coords.latitude
    halfRow.min.Longitude = coords.longitude
    return halfRow
}
function calcMaxPoint(halfRow) {
    halfRow.max = {}
    halfRow.max.name = halfRow.maxpoint1.identifier
    const bearing = geolib.getRhumbLineBearing(
        { latitude: halfRow.maxpoint1.coordinates.latitude, longitude: halfRow.maxpoint1.coordinates.longitude },
        { latitude: halfRow.maxpoint2.coordinates.latitude, longitude: halfRow.maxpoint2.coordinates.longitude }
    )
    const coords = geolib.computeDestinationPoint(
        { latitude: halfRow.maxpoint1.coordinates.latitude, longitude: halfRow.maxpoint1.coordinates.longitude },
        25,
        bearing
    )
    halfRow.max.Latitude = coords.latitude
    halfRow.max.Longitude = coords.longitude
    return halfRow
}
function calcPointsRight2(row) {
    let i = row.basecase.val
    let prevPoint = 0
    let initial = true
    row.rightpoints = []

    do{
        const point = new Object()
        if(initial == true) {
            const identifierName = baseCases.find(x => x.val === i).identifier
            point.identifier = identifierName
            point.row = row.row
            point.coordinates = {
                latitude: row.min.Latitude,
                longitude: row.min.Longitude
            }
            row.rightpoints.push(point)
            initial = false
        } else {
            const identifierName = baseCases.find(x => x.val === (i)).identifier
            point.identifier = identifierName
            point.row = row.row
            point.coordinates = geolib.computeDestinationPoint(
                { latitude: row.rightpoints[prevPoint].coordinates.latitude, longitude: row.rightpoints[prevPoint].coordinates.longitude },
                25,
                row.bearing
            )
            row.rightpoints.push(point)
            prevPoint +=1
        }
        i+=0.5
    } while(i <= 17)
    return row
}