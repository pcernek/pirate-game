import * as Phaser from 'phaser'
import { ImageDescriptor } from '../assets/ImageDescriptor'
import { Canvas } from '../Canvas'
import { ClickHandlerFactory } from '../mechanics/ClickHandlerFactory'
import { OverheadBoat } from './stoneBasin/OverheadBoat'

const stoneBasinBackground = new ImageDescriptor(
  'stoneBasinBackground',
  'assets/stoneBasinGame/stone-basin-scene.png'
)

const overheadBoat = new ImageDescriptor(
  'overheadBoat',
  'assets/stoneBasinGame/boat-overhead-silhouette.png'
)

export class StoneBasinGame extends Phaser.Scene {
  constructor() {
    super({
      key: 'stoneBasinGame',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 }
        }
      }
    })
  }

  public preload() {
    this.load.image(stoneBasinBackground.key, stoneBasinBackground.location)
    this.load.image(overheadBoat.key, overheadBoat.location)
  }

  public create() {
    this.add.image(
      Canvas.widthPx / 2,
      Canvas.heightPx / 2,
      stoneBasinBackground.key
    )

    const outerBasinArea = new Phaser.Geom.Circle(800, 400, 450)
    const innerBasinArea = new Phaser.Geom.Circle(800, 400, 400)
    new OverheadBoat(
      {
        startPosition: { x: 800, y: 400 },
        startRotation: 0,
        bounds: innerBasinArea
      },
      overheadBoat.key
    ).addToScene(this)

    const clickHandlerFactory = new ClickHandlerFactory(this)
    clickHandlerFactory.createInvertedClickCircle(outerBasinArea, () =>
      this.scene.switch('lighthouse')
    )
  }
}
