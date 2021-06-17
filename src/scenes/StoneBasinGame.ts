import * as Phaser from 'phaser'
import { Debug } from '../util/Debug'
import { ImageDescriptor } from '../assets/ImageDescriptor'
import { Canvas } from '../Canvas'
import { ClickHandlerFactory } from '../mechanics/ClickHandlerFactory'
import { BoatState, ToyBoat } from './BoatState'
import { BoatPositionState } from './BoatPositionState'
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

const lighthouseOverhead = new ImageDescriptor(
  'lighthouseOverhead',
  'assets/stoneBasinGame/lighthouse-overhead.png'
)

const beamLight = new ImageDescriptor(
  'beamlight',
  'assets/light.png'
)

const OUTER_BASIN_AREA = new Phaser.Geom.Circle(800, 400, 450)
const INNER_BASIN_AREA = new Phaser.Geom.Circle(800, 400, 400)

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
    this.load.image(lighthouseOverhead.key, lighthouseOverhead.location)
    this.load.image(beamLight.key, beamLight.location)
  }

  public create() {
    Debug.log(`Creating ${StoneBasinGame.name}`)

    this.add.image(
      Canvas.widthPx / 2,
      Canvas.heightPx / 2,
      stoneBasinBackground.key
    )
    this.add.image(
      800, 
      400, 
      lighthouseOverhead.key)
    
    BoatState.onMoveToBasin(ToyBoat.TheRam, () => 
      this.addTheRam()
    )
    BoatState.onMoveToBasin(ToyBoat.TheDevil, () => 
      this.addTheDevil()
    )
    BoatPositionState.onAllBoatsInPosition(() => 
      this.addLight()
    )

    const clickHandlerFactory = new ClickHandlerFactory(this)
    clickHandlerFactory.createInvertedClickCircle(OUTER_BASIN_AREA, () =>
      this.scene.switch('lighthouse')
    )
  }

  private addTheRam() {
    new OverheadBoat(
      ToyBoat.TheRam,
      {
        startPosition: { x: 800, y: 650 },
        startRotation: 1.5,
        bounds: INNER_BASIN_AREA,
        targetPosition: { x: 800, y: 650 },
        targetRotation: 1.5
      },
      theRamOverhead.key
    ).addToScene(this)
  }

  private addTheDevil() {
    new OverheadBoat(
      ToyBoat.TheDevil,
      {
        startPosition: { x: 880, y: 140 },
        startRotation: -2.3,
        bounds: INNER_BASIN_AREA,
        targetPosition: { x: 880, y: 140 },
        targetRotation: -2.3
      },
      theDevilOverhead.key
    ).addToScene(this)
  }
  
  private addLight() {
    this.add.image(1350,-20, beamLight.key)
    .setScale(4)
    .setRotation(2.45)
    .setAlpha(0.3)
      }
}
