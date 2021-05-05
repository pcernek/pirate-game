import * as Phaser from 'phaser'
import { ImageDescriptor } from '../assets/ImageDescriptor'
import { Canvas } from '../Canvas'
import { ClickHandlerFactory } from '../mechanics/ClickHandlerFactory'
import { ToyBoat } from './BoatState'
import { OverheadBoat } from './stoneBasin/OverheadBoat'

const stoneBasinBackground = new ImageDescriptor(
  'stoneBasinBackground',
  'assets/stoneBasinGame/stone-basin-scene.png'
)

const theRamOverhead = new ImageDescriptor(
  'ramOverhead',
  'assets/stoneBasinGame/boat-overhead-silhouette.png'
)

export class StoneBasinGame extends Phaser.Scene {
  constructor() {
    super({
      key: 'stoneBasinGame',
      active: true,
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
    this.load.image(theRamOverhead.key, theRamOverhead.location)
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
      ToyBoat.TheRam,
      {
        startPosition: { x: 800, y: 400 },
        startRotation: 0,
        bounds: innerBasinArea
      },
      theRamOverhead.key
    ).addToScene(this)

    const clickHandlerFactory = new ClickHandlerFactory(this)
    clickHandlerFactory.createInvertedClickCircle(outerBasinArea, () =>
      this.scene.switch('lighthouse')
    )
    this.scene.sendToBack('stoneBasinGame')
  }
}
