//https://github.com/nzakas/professional-javascript/blob/master/professional-javascript3/Ch12/IERangeExample5.htm
//IE Range Example
    function useRanges() {
        var range1 = document.body.createTextRange();
        var range2 = document.body.createTextRange();
        range1.findText("Hello world!");
        range2.findText("Hello");
        print(range1.compareEndPoints("StartToStart", range2));  //outputs 0
        print(range1.compareEndPoints("EndToEnd", range2));      //outputs 1;

    }
