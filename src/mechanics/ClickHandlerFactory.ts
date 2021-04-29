import * as Phaser from 'phaser'
import { Point } from '../geometry/Point'

let CLICK_HANDLER_FILL_COLOR = 0x00ff00
let CLICK_HANDLER_ALPHA = 50

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

  /**
   * Should be called only in a scene's "create" function
   */
  public createClickTriangle(
    center: Point,
    p1: Point,
    p2: Point,
    p3: Point,
    onClick: () => void
  ) {
    let triangle = this.scene.add.triangle(
      center.x,
      center.y,
      p1.x,
      p1.y,
      p2.x,
      p2.y,
      p3.x,
      p3.y,
      CLICK_HANDLER_FILL_COLOR,
      CLICK_HANDLER_ALPHA
    )
    return this.addClickHandler(triangle, onClick)
  }

  private addClickHandler(
    shape: Phaser.GameObjects.Shape,
    onClick: () => void
  ) {
    shape.setInteractive()
    shape.on(Phaser.Input.Events.POINTER_DOWN, onClick)
    return shape
  }
}
