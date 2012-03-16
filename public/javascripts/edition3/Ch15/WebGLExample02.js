//https://github.com/nzakas/professional-javascript/blob/master/professional-javascript3/Ch15/WebGLExample02.htm
//WebGL Example
    attribute vec2 aVertexPosition;
    
    void main() {
gl_Position = vec4(aVertexPosition, 0.0, 1.0);
    }
    
    uniform vec4 uColor;
    
    void main() {
gl_FragColor = uColor;
    }  
    
    window.onload = function(){
var drawing = document.getElementById("drawing"),
    gl, program, vertexShader, fragmentShader, node;

if (drawing.getContext){
    gl = drawing.getContext("experimental-webgl");
    if (gl){
    
        gl.viewport(0, drawing.height, drawing.width, drawing.height);
        gl.clearColor(1, 1, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        //create the vertex shader
        node = document.getElementById("vertex-shader");
        vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, node.text);
        gl.compileShader(vertexShader);
        
        //create the fragment shader
        node = document.getElementById("fragment-shader");
        fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, node.text);
        gl.compileShader(fragmentShader);
        
        //create the shader program
        program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        
        //debugging
        if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
            console.log(gl.getShaderInfoLog(vertexShader));
        }
                
        if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
            console.log(gl.getShaderInfoLog(fragmentShader));
        }
                
        if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
            console.log(gl.getProgramInfoLog(program));
        }
        
        //define three vertices, x and y for each
        var vertices = new Float32Array([ 0, 1, 1, -1, -1, -1 ]),
            buffer = gl.createBuffer(),
            vertexSetSize = 2,
            vertexSetCount = vertices.length/vertexSetSize,
            uColor, aVertexPosition;

        //put data into the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);					
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        //pass color to fragment shader
        uColor = gl.getUniformLocation(program, "uColor");
        gl.uniform4fv(uColor, [ 0, 0, 0, 1 ]);

        //pass vertex information to shader
        aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(aVertexPosition);
        gl.vertexAttribPointer(aVertexPosition, vertexSetSize, gl.FLOAT, false, 0, 0);

        //draw the triangle
        gl.drawArrays(gl.TRIANGLES, 0, vertexSetCount);
        
    } else {
        print("Your browser doesn't support WebGL");
    }
}
    };    
    