import '@babylonjs/loaders/OBJ';
import {SceneLoader, Scene} from '@babylonjs/core';

function LoadModel(scene: Scene, dirPath: string, fileName: string) {
    SceneLoader.ImportMeshAsync("", dirPath, fileName, scene);
}

export {
    LoadModel
}