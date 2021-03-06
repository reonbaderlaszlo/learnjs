//https://github.com/nzakas/professional-javascript/blob/master/professional-javascript3/Ch05/FunctionReturningFunctionExample01.htm
//Function returning Function Example
function createComparisonFunction(propertyName) {

    return function(object1, object2){
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];

        if (value1 < value2){
            return -1;
        } else if (value1 > value2){
            return 1;
        } else {
            return 0;
        }
    };
}

var data = [{name: "Zachary", age: 28}, {name: "Nicholas", age: 29}];

data.sort(createComparisonFunction("name"));
print(data[0].name);  //Nicholas

data.sort(createComparisonFunction("age"));
print(data[0].name);  //Zachary        

    