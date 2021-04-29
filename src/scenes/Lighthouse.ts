import { ImageDescriptor } from '../assets/ImageDescriptor'
import { Canvas } from '../Canvas'
import { ClickHandlerFactory } from '../mechanics/ClickHandlerFactory'
import { BoatOnShelf } from './BoatOnShelf'
import { Scene } from './generic/Scene'

const lighthouseImage = new ImageDescriptor(
  'lighthouse',
  'assets/lighthouse-sketch.png'
)
const orangeBoatImage = new ImageDescriptor(
  'orangeBoat',
  'assets/orange-boat-200px.png'
)
const jollyRogerBoatImage = new ImageDescriptor(
  'jollyRogerBoat',
  'assets/jolly-roger-boat-200px.png'
)
const whiteBoatImage = new ImageDescriptor(
  'whiteBoat',
  'assets/the-ram-200px.png'
)

export class Lighthouse extends Scene {
  constructor(public readonly key: string) {
    super(key)
  }

  preload() {
    this.load.image(lighthouseImage.key, lighthouseImage.location)
    this.load.image(orangeBoatImage.key, orangeBoatImage.location)
    this.load.image(jollyRogerBoatImage.key, jollyRogerBoatImage.location)
    this.load.image(whiteBoatImage.key, whiteBoatImage.location)
  }

  create() {
    this.add.image(Canvas.widthPx / 2, Canvas.heightPx / 2, lighthouseImage.key)
    const stoneBasinDropZone = this.add
      .zone(730, 630, 290, 270)
      .setDropZone(undefined, undefined)
    new BoatOnShelf(620, 120, orangeBoatImage.key).addToScene(
      this,
      stoneBasinDropZone
    )
    new BoatOnShelf(770, 120, jollyRogerBoatImage.key).addToScene(
      this,
      stoneBasinDropZone
    )
    new BoatOnShelf(930, 130, whiteBoatImage.key).addToScene(
      this,
      stoneBasinDropZone
    )

    const clickHandlerFactory = new ClickHandlerFactory(this)

    clickHandlerFactory.createClickBox(380, 440, 300, 200, () => {
      this.scene.switch('battleMap')
    })
    clickHandlerFactory.createClickBox(730, 630, 290, 270, () => {
      this.scene.switch('stoneBasinGame')
    })

    clickHandlerFactory.createClickBox(1130, 580, 300, 200, () => {
      this.scene.switch('amulet')
    })
    clickHandlerFactory.createClickCircle(1200, 280, 130, () => {
      this.scene.switch('viewFromWindow')
    })
    clickHandlerFactory.createClickCircle(400, 230, 110, () => {
      this.scene.switch('sharks')
    })
  }
}
