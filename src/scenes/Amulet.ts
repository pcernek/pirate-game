import * as Phaser from 'phaser';
import { Images } from '../assets/Images';
import { Canvas } from '../Canvas';

export class Amulet extends Phaser.Scene {
  constructor() {
    super({
      key: 'amulet'
    });
  }

  public preload() {
    this.load.image(Images.amulet.key, Images.amulet.location);
  }

  public create() {
    this.add.image(Canvas.widthPx / 2, Canvas.heightPx / 2, Images.amulet.key);
    this.input.on(Phaser.Input.Events.POINTER_DOWN, () => this.scene.switch('lighthouse'))
  }
}