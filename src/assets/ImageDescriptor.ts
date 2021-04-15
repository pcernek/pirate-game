import { AssetDescriptor } from './AssetDescriptor';

export class ImageDescriptor extends AssetDescriptor {
  constructor(key: string, location: string) {
    super(`image/${key}`, location)
  }
}
