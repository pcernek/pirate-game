import { ImageDescriptor } from '../assets/ImageDescriptor'
import { Canvas } from '../Canvas'
import { ClickHandlerFactory } from '../mechanics/ClickHandlerFactory'
import { BoatOnShelf } from './BoatOnShelf'
import { BoatState, ToyBoat } from './BoatState'
import { Scene } from './generic/Scene'

const lighthouseImage = new ImageDescriptor(
  'lighthouse',
  'assets/inside lighthouse.png'
)
const orangeBoatImage = new ImageDescriptor(
  'orangeBoat',
  'assets/the devil.png'
)

const theRamImage = new ImageDescriptor('theRam', 'assets/the-ram-200px.png')

export class Lighthouse extends Scene {
  constructor(public readonly key: string) {
    super(key, { active: true, visible: true })
  }

  preload() {
    this.load.image(lighthouseImage.key, lighthouseImage.location)
    this.load.image(orangeBoatImage.key, orangeBoatImage.location)
    this.load.image(theRamImage.key, theRamImage.location)
  }

  create() {
    const v = this.add.image(Canvas.widthPx / 2, Canvas.heightPx / 2, lighthouseImage.key);
    v.setScale(0.61)
    const stoneBasinDropZone = this.add
      .zone(880, 510, 200, 100)
      .setDropZone(undefined, undefined)
    new BoatOnShelf(500, 530, orangeBoatImage.key, () => {
      BoatState.placeInBasin(ToyBoat.Orange)
    }).addToScene(this, stoneBasinDropZone)
   
    new BoatOnShelf(1250, 245, theRamImage.key, () => {
      BoatState.placeInBasin(ToyBoat.TheRam)
    }).addToScene(this, stoneBasinDropZone)

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
