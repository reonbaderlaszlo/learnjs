//https://github.com/nzakas/professional-javascript/blob/master/professional-javascript3/Ch18/IEXPathExample02.htm
//IE XPath Example
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

    var xmldom = createDocument();
    xmldom.async = false;
    xmldom.load("employees.xml");
    
    var names = xmldom.documentElement.selectNodes("employee/name");
    
    var message = "There are " + names.length + " matching nodes.\n";
    
    for (var i=0, len=names.length; i < names.len; i++) {
        message += names[i].xml + "\n";
    }
    
    print(message);
    
