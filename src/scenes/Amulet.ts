import * as Phaser from 'phaser';
import { AssetIndex } from '../AssetIndex';
import { Canvas } from '../Canvas';

export class Amulet extends Phaser.Scene {
  constructor() {
    super({
      key: 'amulet'
    });
  }

  public preload() {
    this.load.image(AssetIndex.amuletImage.key, AssetIndex.amuletImage.path);
  }

  public create() {
    this.add.image(Canvas.widthPx / 2, Canvas.heightPx / 2, AssetIndex.amuletImage.key);
    this.input.on(Phaser.Input.Events.POINTER_DOWN, () => this.scene.switch('lighthouse'))
  }
}