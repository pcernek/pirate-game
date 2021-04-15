import * as Phaser from 'phaser';
import { ImageDescriptor } from '../assets/ImageDescriptor';
import { Canvas } from '../Canvas';
import { BoatOnShelf } from './BoatOnShelf';

let CLICK_HANDLER_FILL_COLOR = 0x00ff00
let CLICK_HANDLER_ALPHA = 0

const lighthouseImage = new ImageDescriptor('lighthouse', 'assets/lighthouse-sketch.png')
const orangeBoatImage = new ImageDescriptor('orangeBoat', 'assets/orange-boat-200px.png')
const jollyRogerBoatImage = new ImageDescriptor('jollyRogerBoat', 'assets/jolly-roger-boat-200px.png')
const whiteBoatImage = new ImageDescriptor('whiteBoat', 'assets/white-boat-200px.png')

export class Lighthouse extends Phaser.Scene {
  constructor() {
    super({
      key: 'lighthouse'
    });
  }

  preload() {
    this.load.image(lighthouseImage.key, lighthouseImage.location);
    this.load.image(orangeBoatImage.key, orangeBoatImage.location)
    this.load.image(jollyRogerBoatImage.key, jollyRogerBoatImage.location)
    this.load.image(whiteBoatImage.key, whiteBoatImage.location)
  }

  create() {
    this.add.image(Canvas.widthPx / 2, Canvas.heightPx / 2, lighthouseImage.key);
    const stoneBasinDropZone = this.add.zone(730, 630, 290, 270).setDropZone(undefined, undefined)
    new BoatOnShelf(620, 120, orangeBoatImage.key).addToScene(this, stoneBasinDropZone)
    new BoatOnShelf(770, 120, jollyRogerBoatImage.key).addToScene(this, stoneBasinDropZone)
    new BoatOnShelf(930, 130, whiteBoatImage.key).addToScene(this, stoneBasinDropZone)

    this.createClickBox(380, 440, 300, 200, () => {
      this.scene.switch('battleMap')
    })

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

  createClickBox(x: number, y: number, width: number, height: number, onClick: () => void) {
    let clickHandler = this.add.rectangle(x, y, width, height, CLICK_HANDLER_FILL_COLOR, CLICK_HANDLER_ALPHA)
    clickHandler.setInteractive()
    clickHandler.on(Phaser.Input.Events.POINTER_DOWN, onClick)
    return clickHandler
  }

  createClickCircle(x: number, y: number, radius: number, onClick: () => void) {
    let clickHandler = this.add.circle(x, y, radius, CLICK_HANDLER_FILL_COLOR, CLICK_HANDLER_ALPHA)
    clickHandler.setInteractive()
    clickHandler.on(Phaser.Input.Events.POINTER_DOWN, onClick)
    return clickHandler
  }
}
