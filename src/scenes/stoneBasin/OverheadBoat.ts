import * as Phaser from 'phaser'
import { Point } from 'geometry'

const grabbedGray = 0x999999

export interface OverheadBoatConfiguration {
  startPosition: Point
  startRotation: number
  // targetPosition: Point
  // targetRotation: number
  bounds: Phaser.Geom.Circle
}

export class OverheadBoat {
  constructor(
    private readonly config: OverheadBoatConfiguration,
    private readonly texture: string
  ) {}

  public addToScene(scene: Phaser.Scene) {
    const { x, y } = this.config.startPosition
    const boat = scene.add.sprite(0, 0, this.texture)

    const container = scene.add
      .container(x, y, [boat])
      .setSize(100, 200)
      .setRotation(this.config.startRotation)
      .setInteractive({ useHandCursor: true })
    scene.input.setDraggable(container)
    container.on(
      Phaser.Input.Events.GAMEOBJECT_DRAG,
      (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
        if (this.config.bounds.contains(dragX, dragY)) {
          container.x = dragX
          container.y = dragY
        }
      }
    )
  }

  public getTintColor() {
    return grabbedGray
  }
}
