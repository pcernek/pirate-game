import Phaser from 'phaser';
import lighthouse from '../assets/lighthouse-sketch.png'
import { Canvas } from '../Canvas';

let CLICK_HANDLER_FILL_COLOR = 0x00ff00
let CLICK_HANDLER_ALPHA = 0.5

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
        this.createClickBox(380, 440, 300, 200, () => {
          this.scene.switch('battleMap')
        })
        // this.createClickBox(730, 630, 290, 270, () => {
        //   this.scene.switch('sharks')
        // })
        this.createClickBox(1130, 580, 300, 200, () => {
          this.scene.switch('amulet')
        })
        this.createClickCircle(1200, 280, 130, () => {
          this.scene.switch('viewFromWindow')
        })
        this.createClickCircle(400, 230, 110, () => {
          this.scene.switch('sharks')
        })
    }

    createClickBox(x, y, width, height, onClick) {
      let clickHandler = this.add.rectangle(x, y, width, height, CLICK_HANDLER_FILL_COLOR, CLICK_HANDLER_ALPHA)
      clickHandler.setInteractive()
      clickHandler.on(Phaser.Input.Events.POINTER_DOWN, onClick)
      return clickHandler
    }

    createClickCircle(x, y, radius, onClick) {
      let clickHandler = this.add.circle(x, y, radius, CLICK_HANDLER_FILL_COLOR, CLICK_HANDLER_ALPHA)
      clickHandler.setInteractive()
      clickHandler.on(Phaser.Input.Events.POINTER_DOWN, onClick)
      return clickHandler
    }
}
