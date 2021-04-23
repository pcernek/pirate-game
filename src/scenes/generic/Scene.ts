import { SceneKeyManager } from '../SceneKeyManager';

export class Scene extends Phaser.Scene {
  constructor(public readonly key: string) {
    super({ key });
    SceneKeyManager.addScene(key)
  }
}
