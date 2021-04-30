import * as Phaser from 'phaser'
import { Point } from 'geometry'

const grabbedGray = 0x999999

export class OverheadBoat {
  constructor(
    private readonly initialPosition: Point,
    private readonly initialRotation: number,
    private readonly texture: string,
    private readonly bounds: Phaser.Geom.Circle
  ) {}

  public addToScene(scene: Phaser.Scene) {
    const { x, y } = this.initialPosition
    const sprite = scene.add
      .sprite(x, y, this.texture)
      .setRotation(this.initialRotation)
      .setInteractive({ useHandCursor: true })
    scene.input.setDraggable(sprite)
    sprite.on(
      Phaser.Input.Events.GAMEOBJECT_DRAG,
      (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
        sprite.setTint(this.getTintColor())
        if (this.bounds.contains(dragX, dragY)) {
          sprite.x = dragX
          sprite.y = dragY
        }
      }
    )
    sprite.on(Phaser.Input.Events.GAMEOBJECT_DRAG_END, () => {
      sprite.clearTint()
    })
  }

  public getTintColor() {
    return grabbedGray
  }
}
