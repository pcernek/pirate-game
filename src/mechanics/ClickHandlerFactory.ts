import * as Phaser from 'phaser'
import { Point } from '../geometry/Point'

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

  public createInvertedClickCircle(
    center: Point,
    radius: number,
    onClick: () => void
  ) {
    // TODO: Is graphics the best way to represent this?
    const graphics = this.scene.add.graphics()
    graphics.setInteractive({
      hitArea: new Phaser.Geom.Circle(center.x, center.y, radius),
      hitAreaCallback: (circle: Phaser.Geom.Circle, x: number, y: number) => {
        return !circle.contains(x, y)
      }
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
