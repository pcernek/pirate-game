import * as Phaser from 'phaser'
import { Point } from 'geometry'

export interface OverheadBoatConfiguration {
  startPosition: Point
  startRotation: number
  // targetPosition: Point
  // targetRotation: number
  bounds: Phaser.Geom.Circle
}

export class OverheadBoat {
  private mode: 'rotate' | 'translate' = 'rotate'
  private tempMatrix: Phaser.GameObjects.Components.TransformMatrix
  private tempParentMatrix: Phaser.GameObjects.Components.TransformMatrix

  private bowOffset: Point

  constructor(
    private readonly config: OverheadBoatConfiguration,
    private readonly imageKey: string
  ) {
    this.tempMatrix = new Phaser.GameObjects.Components.TransformMatrix()
    this.tempParentMatrix = new Phaser.GameObjects.Components.TransformMatrix()
  }

  public addToScene(scene: Phaser.Scene) {
    const { x, y } = this.config.startPosition
    const boat = scene.add.sprite(0, 0, this.imageKey)
    
    this.bowOffset = { x: 0, y: -boat.height / 2 }
    const bowHandleRadius = boat.height / 4

    const bowHandle = scene.add.circle(
      this.bowOffset.x,
      this.bowOffset.y,
      bowHandleRadius,
      0x00ff00,
      0
    )

    const container = scene.add
      .container(x, y, [boat, bowHandle])
      .setSize(boat.width, boat.height)
      .setRotation(this.config.startRotation)
      .setInteractive({ useHandCursor: true })
    scene.input.setDraggable(container)

    container.on(
      Phaser.Input.Events.GAMEOBJECT_DRAG_START,
      (pointer: Phaser.Input.Pointer) => {
        this.setDragMode(bowHandle, pointer)
      }
    )

    container.on(
      Phaser.Input.Events.GAMEOBJECT_DRAG,
      (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
        if (this.mode === 'rotate') {
          this.rotate(pointer, container)
        } else {
          this.translate(dragX, dragY, container)
        }
      }
    )
  }

  private setDragMode(bow: Phaser.GameObjects.Arc, pointer: Phaser.Input.Pointer) {
    // TODO: There has got to be a better way!
    bow.getWorldTransformMatrix(this.tempMatrix, this.tempParentMatrix)
    var d = this.tempMatrix.decomposeMatrix() as any
    const currentCircle = new Phaser.Geom.Circle(
      d.translateX,
      d.translateY,
      bow.radius
    )
    if (currentCircle.contains(pointer.worldX, pointer.worldY)) {
      this.mode = 'rotate'
    } else {
      this.mode = 'translate'
    }
  }

  private translate(dragX: number, dragY: number, container: Phaser.GameObjects.Container) {
    if (this.config.bounds.contains(dragX, dragY)) {
      container.x = dragX
      container.y = dragY
    }
  }

  private rotate(pointer: Phaser.Input.Pointer, container: Phaser.GameObjects.Container) {
    const pointerPosition = { x: pointer.worldX, y: pointer.worldY }
    const origin = { x: container.x, y: container.y }
    const p0 = {
      x: this.bowOffset.x + container.x,
      y: this.bowOffset.y + container.y
    },
      p1 = pointerPosition
    var a0 = Phaser.Math.Angle.BetweenPoints(origin, p0),
      a1 = Phaser.Math.Angle.BetweenPoints(origin, p1)
    const deltaRotation = Phaser.Math.Angle.Wrap(a1 - a0)
    container.setRotation(deltaRotation)
  }
}
