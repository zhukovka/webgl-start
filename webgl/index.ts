export default class WebGL {
    private gl: WebGLRenderingContext;

    constructor (canvas) {
        //https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
        const gl = canvas.getContext("webgl");
        /*
        Once we have the canvas, we try to get a WebGLRenderingContext
        for it by calling getContext and passing it the string "webgl".
        If the browser does not support webgl getContext will return null
        in which case we will display a message to the user and exit.
        */
        // Only continue if WebGL is available and working
        if (!gl) {
            throw "Unable to initialize WebGL. Your browser or machine may not support it.";
        }

        // Set clear color to black, fully opaque
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // Clear the color buffer with specified clear color
        gl.clear(gl.COLOR_BUFFER_BIT);
        this.gl = gl;
    }

    /**
     * creates a shader of the given type, uploads the source and compiles it.
     * @param type
     * @param source {string}
     * @returns {WebGLShader}
     */
    loadShader (type: number, source: string): WebGLShader {
        const shader = this.gl.createShader(type);

        // Send the source to the shader object

        this.gl.shaderSource(shader, source);

        // Compile the shader program

        this.gl.compileShader(shader);

        // See if it compiled successfully

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    /**
     * creates a shader of the vertex type, uploads the source and compiles it.
     * @param {string} source
     * @returns {WebGLShader}
     */
    loadVertexShader (source: string): WebGLShader {
        return this.loadShader(this.gl.VERTEX_SHADER, source);
    }

    /**
     * creates a shader of the fragment type, uploads the source and compiles it.
     * @param {string} source
     * @returns {WebGLShader}
     */
    loadFragmentShader (source: string): WebGLShader {
        return this.loadShader(this.gl.FRAGMENT_SHADER, source);
    }

    /**
     * Initialize a shader program, so WebGL knows how to draw our data
     * @param shaders
     * @returns {WebGLProgram}
     */
    initShaderProgram (...shaders: WebGLShader[]): WebGLProgram {

        // Create the shader program

        const shaderProgram = this.gl.createProgram();

        for (const shader of shaders) {
            this.gl.attachShader(shaderProgram, shader);
        }
        this.gl.linkProgram(shaderProgram);

        // If creating the shader program failed, alert

        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(shaderProgram));
            return null;
        }

        return shaderProgram;
    }

}