export class AssetManager {
  private static readonly assetKeys = new Set<string>()

  public static registerKey(key: string) {
    if (this.assetKeys.has(key)) {
      throw new Error(`Key ${key} has already been registered!`)
    }
    this.assetKeys.add(key)
  }
}
