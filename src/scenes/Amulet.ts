import * as Phaser from 'phaser';
import { ImageDescriptor } from '../assets/ImageDescriptor';
import { Canvas } from '../Canvas';

const amuletImage = new ImageDescriptor('amulet', 'assets/amulet.png')

export class Amulet extends Phaser.Scene {
  constructor() {
    super({
      key: 'amulet'
    });
  }

  public preload() {
    this.load.image(amuletImage.key, amuletImage.location);
  }

  public create() {
    this.add.image(Canvas.widthPx / 2, Canvas.heightPx / 2, amuletImage.key);
    this.input.on(Phaser.Input.Events.POINTER_DOWN, () => this.scene.switch('lighthouse'))
  }
}