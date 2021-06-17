import { ImageDescriptor } from '../assets/ImageDescriptor'
import { Canvas } from '../Canvas'
import { ClickHandlerFactory } from '../mechanics/ClickHandlerFactory'
import { BoatOnShelf } from './BoatOnShelf'
import { BoatPositionState } from './BoatPositionState'
import { BoatState, ToyBoat } from './BoatState'
import { Scene } from './generic/Scene'

const lighthouseImage = new ImageDescriptor(
  'lighthouse',
  'assets/inside lighthouse.png'
)
const theDevilImage = new ImageDescriptor(
  'theDevil',
  'assets/the devil.png'
)
const lighthouseBasin = new ImageDescriptor(
  'smallLighthouse',
  'assets/lighthouse.png'
)
  const light = new ImageDescriptor(
    'light',
    'assets/light.png'
  )

const theRamImage = new ImageDescriptor('theRam', 'assets/the-ram-200px.png')

export class Lighthouse extends Scene {
  constructor(public readonly key: string) {
    super(key, { active: true, visible: true })
  }

  preload() {
    this.load.image(lighthouseImage.key, lighthouseImage.location)
    this.load.image(theDevilImage.key, theDevilImage.location)
    this.load.image(theRamImage.key, theRamImage.location)
    this.load.image(lighthouseBasin.key, lighthouseBasin.location)
    this.load.image(light.key, light.location)
  }

  create() {
    const v = this.add.image(Canvas.widthPx / 2, Canvas.heightPx / 2, lighthouseImage.key);
    v.setScale(0.61)
    const stoneBasinDropZone = this.add
      .zone(880, 510, 200, 100)
      .setDropZone(undefined, undefined)
    this.add
      .image(850, 455, lighthouseBasin.key)
      .setScale(0.3)
      .setRotation(-.1)
    new BoatOnShelf(500, 530, theDevilImage.key, () => {
      BoatState.placeInBasin(ToyBoat.TheDevil)
    }).addToScene(this, stoneBasinDropZone)
   
    new BoatOnShelf(1250, 245, theRamImage.key, () => {
      BoatState.placeInBasin(ToyBoat.TheRam)
    }).addToScene(this, stoneBasinDropZone)
    BoatPositionState.onAllBoatsInPosition( () => { 
    this.add
      .image(970, 335, light.key)
      .setScale(0.9,1)
      .setRotation(2.45)
      .setAlpha(1)
  })

    
    const clickHandlerFactory = new ClickHandlerFactory(this)

    clickHandlerFactory.createClickBox({ x: 880, y: 510 }, 200, 100, () => {
      this.scene.switch('stoneBasinGame')
    })

    clickHandlerFactory.createClickBox({ x: 1300, y: 90 }, 50, 50, () => {
      this.scene.switch('amulet')
    })
    clickHandlerFactory.createClickCircle({ x: 950, y: 210 }, 130, () => {
      this.scene.switch('viewFromWindow')
    })
    clickHandlerFactory.createClickCircle({ x: 400, y: 230 }, 110, () => {
      this.scene.switch('sharks')
    })
  }
}
