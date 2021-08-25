import '@babylonjs/loaders/OBJ';
import {SceneLoader, Scene} from '@babylonjs/core';

function LoadModel(scene: Scene, dirPath: string, fileName: string) {
    SceneLoader.ImportMesh("", dirPath, fileName, scene, (data)=>{
        console.log(data);
    });
}

export {
    LoadModel
}