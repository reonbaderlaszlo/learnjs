//https://github.com/nzakas/professional-javascript/blob/master/edition2/Ch15/IEXsltExample2.htm
//IE XSLT Example

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
    
    function createThreadSafeDocument(){
        if (typeof arguments.callee.activeXString != "string"){
            var versions = ["MSXML2.FreeThreadedDOMDocument.6.0", 
                            "MSXML2.FreeThreadedDOMDocument.3.0",
                            "MSXML2.FreeThreadedDOMDocument"];
    
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
    
    function createXSLTemplate(){
        if (typeof arguments.callee.activeXString != "string"){
            var versions = ["MSXML2.XSLTemplate.6.0", 
                            "MSXML2.XSLTemplate.3.0",
                            "MSXML2.XSLTemplate"];
    
            for (var i=0,len=versions.length; i < len; i++){
                try {
                    var template = new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    return template;
                } catch (ex){
                    //skip
                }
            }
        }
    
        return new ActiveXObject(arguments.callee.activeXString);
    }
    

    window.onload = function () {
        var xmldom = createDocument();
        var xsltdom = createThreadSafeDocument()
        
        xmldom.load("employees.xml");
        xsltdom.load("employees.xslt");
        
        var template = createXSLTemplate();
        template.stylesheet = xsltdom;
        
        var processor = template.createProcessor();
        processor.input = xmldom;
        processor.transform();                
        
        var div = document.getElementById("divResult");
        div.innerHTML = processor.output;
        
      

    }
