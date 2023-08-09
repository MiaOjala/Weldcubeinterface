import xml2js from "xml2js";

function ConvertToJson(data) {
    var res;
    const parser = new xml2js.Parser()
    parser.parseString(data, function (err, result) {
        res = result
    })
    return res;
}

export default ConvertToJson