import * as Phaser from 'phaser'
import { Debug } from '../util/Debug'
import { ImageDescriptor } from '../assets/ImageDescriptor'
import { Canvas } from '../Canvas'
import { ClickHandlerFactory } from '../mechanics/ClickHandlerFactory'
import { BoatState, ToyBoat } from './BoatState'
import { BoatPositionState } from './BoatPositionState'
import { OverheadBoat } from './stoneBasin/OverheadBoat'

/*const stoneBasinBackground = new ImageDescriptor(
  'stoneBasinBackground',
  'assets/stoneBasinGame/stone-basin-scene.png'
)*/

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

const floor = new ImageDescriptor(
  'floor',
  'assets/floor.png'
)

const basin = new ImageDescriptor(
  'basin',
  'assets/basintopview.png'
)
const OUTER_BASIN_AREA = new Phaser.Geom.Circle(900, 450, 450)
const INNER_BASIN_AREA = new Phaser.Geom.Circle(900, 450, 400)

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
   // this.load.image(stoneBasinBackground.key, stoneBasinBackground.location)
    this.load.image(floor.key, floor.location)
    this.load.image(basin.key, basin.location)
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
      floor.key
    )
    this.add.image(
      Canvas.widthPx / 2,
      Canvas.heightPx / 2,
      basin.key
    )
    this.add.image(
      780, 
      420, 
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
        startPosition: { x: 870, y: 720 },
        startRotation: 1.5,
        bounds: INNER_BASIN_AREA,
        targetPosition: { x: 1030, y: 430 },
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
        targetPosition: { x: 1030, y: 230 },
        targetRotation: -2.3
      },
      theDevilOverhead.key
    ).addToScene(this)
  }
  
  private addLight() {
    this.add.image(1350,-20, beamLight.key)
    .setScale(4)
    .setRotation(2.45)
    .setAlpha(1)
      }
}
