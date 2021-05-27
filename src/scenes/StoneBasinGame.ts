import * as Phaser from 'phaser'
import { Debug } from '../util/Debug'
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
const orangeBoatOverhead = new ImageDescriptor(
  'orangeBoatOverhead',
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
    this.load.image(orangeBoatOverhead.key, orangeBoatOverhead.location)
  }

  public create() {
    Debug.log(`Creating ${StoneBasinGame.name}`)

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
        startPosition: { x: 800, y: 650 },
        startRotation: 1.5,
        bounds: innerBasinArea
      },
      theRamOverhead.key
    ).addToScene(this)


    new OverheadBoat(
      ToyBoat.Orange,
      {
        startPosition: { x: 880, y: 140 },
        startRotation: -2.3,
        bounds: innerBasinArea
      },
      orangeBoatOverhead.key
    ).addToScene(this)

    const clickHandlerFactory = new ClickHandlerFactory(this)
    clickHandlerFactory.createInvertedClickCircle(outerBasinArea, () =>
      this.scene.switch('lighthouse')
    )
    this.scene.sendToBack('stoneBasinGame')
  }
}
