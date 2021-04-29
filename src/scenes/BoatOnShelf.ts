import * as Phaser from 'phaser'

const grabbedGray = 0x999999
const droppableGreen = 0x00ff00

export class BoatOnShelf {
  private readonly initialX: number
  private readonly initialY: number
  private isInDropZone: boolean = false

  constructor(x: number, y: number, private readonly texture: string) {
    this.initialX = x
    this.initialY = y
  }

  public getInitialCoords() {
    return { x: this.initialX, y: this.initialY }
  }

  public addToScene(scene: Phaser.Scene, dragTarget: Phaser.GameObjects.Zone) {
    const sprite = scene.add
      .sprite(this.initialX, this.initialY, this.texture)
      .setInteractive()
    scene.input.setDraggable(sprite)
    sprite.on(
      Phaser.Input.Events.GAMEOBJECT_DRAG,
      (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
        sprite.setTint(this.getTintColor())
        sprite.x = dragX
        sprite.y = dragY
      }
    )
    sprite.on(
      Phaser.Input.Events.GAMEOBJECT_DRAG_OVER,
      (_pointer: Phaser.Input.Pointer, target: Phaser.GameObjects.Zone) => {
        if (target === dragTarget) {
          this.isInDropZone = true
        }
      }
    )
    sprite.on(
      Phaser.Input.Events.GAMEOBJECT_DRAG_LEAVE,
      (_pointer: Phaser.Input.Pointer, target: Phaser.GameObjects.Zone) => {
        if (target === dragTarget) {
          this.isInDropZone = false
        }
      }
    )
    sprite.on(Phaser.Input.Events.GAMEOBJECT_DRAG_END, () => {
      sprite.clearTint()
      if (this.isInDropZone) {
        sprite.setVisible(false)
      } else {
        sprite.x = this.initialX
        sprite.y = this.initialY
      }
    })
  }

  public getTintColor() {
    return this.isInDropZone ? droppableGreen : grabbedGray
  }
}
