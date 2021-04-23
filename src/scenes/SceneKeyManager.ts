import { Scene } from './generic/Scene'

export type SceneType = Scene

export class SceneKeyManager {
  private static keys = new Set<string>()

  public static addScene(key: string) {
    if (this.keys.has(key)) {
      throw new Error(`Duplicate scene key: ${key}`)
    }
    this.keys.add(key)
  }
}