import '@babylonjs/loaders/OBJ';
import '@babylonjs/loaders/glTF';
import '@babylonjs/loaders/STL';
import { SceneLoader, Scene, TransformNode, AbstractMesh } from '@babylonjs/core';

function LoadModel(scene: Scene, dirPath: string, fileName: string) {
    SceneLoader.ImportMesh("", dirPath, fileName, scene, (data) => {
        
        if (data.length > 0) {
            // i think first mesh of data is always be root of imported model, so rename it to filename.
            const root: AbstractMesh = data[0];
            root.name = fileName;
        }
    });
}

export {
    LoadModel
}