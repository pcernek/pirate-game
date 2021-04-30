import * as Phaser from 'phaser'
import { Point } from 'geometry'

let CLICK_HANDLER_FILL_COLOR = 0x00ff00
let CLICK_HANDLER_ALPHA = 0

export class ClickHandlerFactory {
  constructor(private readonly scene: Phaser.Scene) {}

  /**
   * Should be called only in a scene's "create" function
   */
  public createClickBox(
    center: Point,
    width: number,
    height: number,
    onClick: () => void
  ) {
    let box = this.scene.add.rectangle(
      center.x,
      center.y,
      width,
      height,
      CLICK_HANDLER_FILL_COLOR,
      CLICK_HANDLER_ALPHA
    )
    return this.addClickHandler(box, onClick)
  }

  /**
   * Should be called only in a scene's "create" function
   */
  public createClickCircle(center: Point, radius: number, onClick: () => void) {
    let circle = this.scene.add.circle(
      center.x,
      center.y,
      radius,
      CLICK_HANDLER_FILL_COLOR,
      CLICK_HANDLER_ALPHA
    )
    return this.addClickHandler(circle, onClick)
  }

  // TODO: would be nice to make this generic for any shape
  public createInvertedClickCircle(
    circle: Phaser.Geom.Circle,
    onClick: () => void
  ) {
    // TODO: Is graphics the best way to represent this?
    const graphics = this.scene.add.graphics()
    graphics.setInteractive({
      hitArea: circle,
      hitAreaCallback: (hitArea: Phaser.Geom.Circle, x: number, y: number) => {
        return !hitArea.contains(x, y)
      },
      useHandCursor: true
    })
    // TODO: Avoid repeating this?
    graphics.on(Phaser.Input.Events.POINTER_DOWN, onClick)
    return graphics
  }

  private addClickHandler(
    shape: Phaser.GameObjects.Shape,
    onClick: () => void
  ) {
    shape.setInteractive({ useHandCursor: true })
    shape.on(Phaser.Input.Events.POINTER_DOWN, onClick)
    return shape
  }
}
