const fs = require('fs')
const d3 = require('d3-dsv')

const settings = {
    filePath: 'dist/data/survey/survey-allentries.csv',
    outputPath: 'dist/data/fieldsheet/',
    outputFileName: 'surveydata'
}
loadFile()

function loadFile(){
    fs.readFile(settings.filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            parseData(data)
        } else {
            console.log(err);
        }
    })
}
function convertCsv(source) {
    const psv = d3.dsvFormat(',');
    const data = psv.parse(source)
    return data
}
function parseData(source){
    // Roept de functie aan die csv naar json omzet
    const json = convertCsv(source)

    writeData(json)
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