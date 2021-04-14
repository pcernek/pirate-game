import Phaser from 'phaser';
import lighthouse from '../assets/lighthouse-sketch.png'
import { Canvas } from '../Canvas';

export class Lighthouse extends Phaser.Scene {
    constructor() {
        super({
          key: 'lighthouse'
        });
    }

    preload() {
        this.load.image('lighthouse', lighthouse);
    }

    create() {
        this.add.image(Canvas.widthPx/2, Canvas.heightPx/2, 'lighthouse');
        this.createClickHandler(300, 500, 400, 300, () => {
          this.scene.switch('battleMap')
        })
        this.createClickHandler(730, 700, 350, 300, () => {
          this.scene.switch('sharks')
        })
        this.createClickHandler(1200, 700, 350, 300, () => {
          this.scene.switch('amulet')
        })
    }

    createClickHandler(x, y, width, height, onClick) {
      let clickHandler = this.add.rectangle(x, y, width, height, 0x00ff00, 0)
      clickHandler.setInteractive()
      clickHandler.on(Phaser.Input.Events.POINTER_DOWN, onClick)
      return clickHandler
    }
}
