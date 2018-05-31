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
}