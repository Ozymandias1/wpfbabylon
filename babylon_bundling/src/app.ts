import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import { ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene, Vector3 } from '@babylonjs/core';
import {LoadModel as ImportModel} from './loader';

class App {
    // variables
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    private scene: Scene;
    private camera: ArcRotateCamera;
    private light: HemisphericLight;

    /**
     * constructor
     */
    constructor() {
        // create canvas for babylon.js
        this.canvas = document.createElement('canvas');
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';
        this.canvas.id = 'babylonjsContainer';
        document.body.appendChild(this.canvas);

        // initialize engine, scene
        this.engine = new Engine(this.canvas, true);
        this.scene = new Scene(this.engine);

        // initialize camera
        this.camera = new ArcRotateCamera('MainCamera', -Math.PI / 2, Math.PI / 2.5, 10, new Vector3(0, 0, 0), this.scene);
        this.camera.attachControl(this.canvas, true);

        // initialize light
        this.light = new HemisphericLight('MainLight', new Vector3(1, 1, 0), this.scene);

        // test sphere
        const sphere = MeshBuilder.CreateSphere('testSphere', { diameter: 1}, this.scene);

        // resize event
        window.addEventListener('resize', this.onResize.bind(this));

        // run rendering loop
        this.engine.runRenderLoop(this.onRender.bind(this));
    }

    /**
     * rendering loop
     */
    private onRender() {
        this.scene.render();
    }

    /**
     * resize viewport on window resizing
     */
    public onResize() {
        this.engine.resize();
    }

    get Scene(): Scene {
        return this.scene;
    }
}

let app: App = null;
// create app instance when page loaded
window.addEventListener('load', ()=>{
    app = new App();
});

function LoadModel(dirPath: string, fileName: string) {
    if( app ) {
        ImportModel(app.Scene, dirPath, fileName);
    }
}

function ShowDebugLayer() {
    if( app ) {
        app.Scene.debugLayer.show();
    }
}

function HideDebugLayer() {
    if( app ) {
        app.Scene.debugLayer.hide();
    }
}

export {
    LoadModel,
    ShowDebugLayer,
    HideDebugLayer
}