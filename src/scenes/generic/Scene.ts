import { SceneKeyManager } from '../SceneKeyManager'

export type SceneConfig = Omit<Phaser.Types.Scenes.SettingsConfig, 'key'>

export abstract class Scene extends Phaser.Scene {
  constructor(public readonly key: string, config: SceneConfig = {}) {
    super({ key, ...config })
    SceneKeyManager.addScene(key)
  }

  public abstract create(): void
}
