//https://github.com/nzakas/professional-javascript/blob/master/professional-javascript3/Ch18/CrossBrowserXmlExample01.htm
//Cross-Browser XML Example
    
function createDocument(){
    if (typeof arguments.callee.activeXString != "string"){
        var versions = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0",
                        "MSXML2.DOMDocument"];

        for (var i=0,len=versions.length; i < len; i++){
            try {
                var xmldom = new ActiveXObject(versions[i]);
                arguments.callee.activeXString = versions[i];
                return xmldom;
            } catch (ex){
                //skip
            }
        }
    }

    return new ActiveXObject(arguments.callee.activeXString);
}
    
function parseXml(xml){
    var xmldom = null;
    
    if (typeof DOMParser != "undefined"){
        xmldom = (new DOMParser()).parseFromString(xml, "text/xml");
        var errors = xmldom.getElementsByTagName("parsererror");
        if (errors.length){
            throw new Error("XML parsing error:" + errors[0].textContent);
        }        
    } else if (typeof ActiveXObject != "undefined"){
        xmldom = createDocument();
        xmldom.loadXML(xml);
        if (xmldom.parseError != 0){
            throw new Error("XML parsing error: " + xmldom.parseError.reason);
        }
    } else {
        throw new Error("No XML parser available.");
    }
    
    return xmldom;
}
    
var xmldom = null;
try {
    xmldom = parseXml("<root><child/></root>");
} catch (ex){
    print(ex.message);
}

print(xmldom.documentElement.tagName);  //"root"
print(xmldom.documentElement.firstChild.tagName); //"child"

var anotherChild = xmldom.createElement("child");
xmldom.documentElement.appendChild(anotherChild);

var children = xmldom.getElementsByTagName("child");
print(children.length);   //2        

try {
    xmldom = parseXml("<root>");
} catch (ex){
    print("Parsing error: " + ex.message);
}


    