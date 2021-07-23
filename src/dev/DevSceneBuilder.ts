import { Scene } from './../scenes/generic/Scene'
import * as Phaser from 'phaser'

export class DevSceneBuilder {
  public static wrap(child: Scene): Scene {
    const oldCreate = child.create.bind(child)
    const newCreate = () => {
      const pointerPositionText = child.add.text(0, 0, renderPoint(' ', ' '), {
        color: '#0f0'
      })
      child.input.on(
        Phaser.Input.Events.POINTER_MOVE,
        (pointer: Phaser.Input.Pointer) => {
          pointerPositionText.setText(renderPoint(pointer.x, pointer.y))
        }
      )
      oldCreate()
    }
    child.create = newCreate.bind(child)

    return child
  }
}

function renderPoint(
  x: number | string,
  y: number | string
): string | string[] {
  return `x: ${x}, y: ${y}`
}
