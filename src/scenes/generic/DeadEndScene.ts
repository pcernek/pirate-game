import * as Phaser from 'phaser';
import { ImageDescriptor } from '../../assets/ImageDescriptor';
import { Canvas } from '../../Canvas';
import { Scene } from './Scene';

export class DeadEndScene extends Scene {
  private readonly parentKey: string
  private readonly background: ImageDescriptor

  constructor(key: string, backgroundPath: string, parent: Scene) {
    super(key);
    this.background = new ImageDescriptor(key, backgroundPath)
    this.parentKey = parent.key
  }

  public preload() {
    this.load.image(this.background.key, this.background.location);
  }

  public create() {
    this.add.image(Canvas.widthPx / 2, Canvas.heightPx / 2, this.background.key);
    this.input.on(Phaser.Input.Events.POINTER_DOWN, () => this.scene.switch(this.parentKey))
  }
}
