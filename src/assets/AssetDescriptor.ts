import { AssetManager } from './AssetManager';

export class AssetDescriptor {
  constructor(public readonly key: string, public readonly location: string) {
    AssetManager.registerKey(key)
  }
}
