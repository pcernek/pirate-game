import Phaser from 'phaser';
import viewFromWindow from '../assets/view-from-window.png'
import { Canvas } from '../Canvas';

export class ViewFromWindow extends Phaser.Scene {
  constructor() {
        super({
          key: 'viewFromWindow'
        });
    }

    preload() {
        this.load.image('viewFromWindow', viewFromWindow);
    }

    create() {
        this.add.image(Canvas.widthPx/2, Canvas.heightPx/2, 'viewFromWindow');
        this.input.on(Phaser.Input.Events.POINTER_DOWN, () => this.scene.switch('lighthouse'))
    }
}
