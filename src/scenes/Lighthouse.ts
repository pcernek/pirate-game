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
const theDevilImage = new ImageDescriptor(
  'theDevil',
  'assets/the devil.png'
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
  }

  create() {
    const v = this.add.image(Canvas.widthPx / 2, Canvas.heightPx / 2, lighthouseImage.key);
    v.setScale(0.61)
    const stoneBasinDropZone = this.add
      .zone(730, 630, 290, 270)
      .setDropZone(undefined, undefined)
    new BoatOnShelf(500, 530, theDevilImage.key, () => {
      BoatState.placeInBasin(ToyBoat.TheDevil)
    }).addToScene(this, stoneBasinDropZone)
   
    new BoatOnShelf(930, 130, theRamImage.key, () => {
      BoatState.placeInBasin(ToyBoat.TheRam)
    }).addToScene(this, stoneBasinDropZone)

    const clickHandlerFactory = new ClickHandlerFactory(this)

    clickHandlerFactory.createClickBox({ x: 380, y: 440 }, 300, 200, () => {
      this.scene.switch('battleMap')
    })
    clickHandlerFactory.createClickBox({ x: 730, y: 630 }, 290, 270, () => {
      this.scene.switch('stoneBasinGame')
    })

    clickHandlerFactory.createClickBox({ x: 1130, y: 580 }, 300, 200, () => {
      this.scene.switch('amulet')
    })
    clickHandlerFactory.createClickCircle({ x: 1200, y: 280 }, 130, () => {
      this.scene.switch('viewFromWindow')
    })
    clickHandlerFactory.createClickCircle({ x: 400, y: 230 }, 110, () => {
      this.scene.switch('sharks')
    })
  }
}
