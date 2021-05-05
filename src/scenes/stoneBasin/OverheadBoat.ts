import * as Phaser from 'phaser'
import { Point } from 'geometry'
import { ToyBoat, BoatState } from '../BoatState'

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

  private bowOffset: Point = { x: 0, y: -90 }

  constructor(
    private readonly boat: ToyBoat,
    private readonly config: OverheadBoatConfiguration,
    private readonly imageKey: string
  ) {
    this.tempMatrix = new Phaser.GameObjects.Components.TransformMatrix()
    this.tempParentMatrix = new Phaser.GameObjects.Components.TransformMatrix()
  }

  public addToScene(scene: Phaser.Scene) {
    const { x, y } = this.config.startPosition
    const boat = scene.add.sprite(0, 0, this.imageKey)
    const bow = scene.add.circle(
      this.bowOffset.x,
      this.bowOffset.y,
      40,
      0x00ff00,
      0
    )

    const container = scene.add
      .container(x, y, [boat, bow])
      .setSize(100, 200)
      .setRotation(this.config.startRotation)
      .setInteractive({ useHandCursor: true })
      .setVisible(BoatState.isInBasin(this.boat))
    scene.input.setDraggable(container)

    container.on(
      Phaser.Input.Events.GAMEOBJECT_DRAG_START,
      (pointer: Phaser.Input.Pointer) => {
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
    )

    container.on(
      Phaser.Input.Events.GAMEOBJECT_DRAG,
      (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
        if (this.mode === 'rotate') {
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
        } else {
          if (this.config.bounds.contains(dragX, dragY)) {
            container.x = dragX
            container.y = dragY
          }
        }
      }
    )
  }
}
