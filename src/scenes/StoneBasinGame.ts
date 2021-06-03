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
  'theRamOverhead',
  'assets/stoneBasinGame/the-ram-overhead.png'
)
const theDevilOverhead = new ImageDescriptor(
  'theDevilOverhead',
  'assets/stoneBasinGame/the-devil-overhead.png'
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
    this.load.image(theRamOverhead.key, theRamOverhead.location)
    this.load.image(theDevilOverhead.key, theDevilOverhead.location)
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
      ToyBoat.TheDevil,
      {
        startPosition: { x: 880, y: 140 },
        startRotation: -2.3,
        bounds: innerBasinArea
      },
      theDevilOverhead.key
    ).addToScene(this)

    const clickHandlerFactory = new ClickHandlerFactory(this)
    clickHandlerFactory.createInvertedClickCircle(outerBasinArea, () =>
      this.scene.switch('lighthouse')
    )
  }
}
