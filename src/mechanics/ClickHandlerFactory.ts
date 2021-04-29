import * as Phaser from 'phaser'

let CLICK_HANDLER_FILL_COLOR = 0x00ff00
let CLICK_HANDLER_ALPHA = 0

export class ClickHandlerFactory {
  constructor(private readonly scene: Phaser.Scene) {}

  /**
   * Should be called only in a scene's "create" function
   */
  public createClickBox(
    x: number,
    y: number,
    width: number,
    height: number,
    onClick: () => void
  ) {
    let clickHandler = this.scene.add.rectangle(
      x,
      y,
      width,
      height,
      CLICK_HANDLER_FILL_COLOR,
      CLICK_HANDLER_ALPHA
    )
    clickHandler.setInteractive()
    clickHandler.on(Phaser.Input.Events.POINTER_DOWN, onClick)
    return clickHandler
  }

  /**
   * Should be called only in a scene's "create" function
   */
  public createClickCircle(
    x: number,
    y: number,
    radius: number,
    onClick: () => void
  ) {
    let clickHandler = this.scene.add.circle(
      x,
      y,
      radius,
      CLICK_HANDLER_FILL_COLOR,
      CLICK_HANDLER_ALPHA
    )
    clickHandler.setInteractive()
    clickHandler.on(Phaser.Input.Events.POINTER_DOWN, onClick)
    return clickHandler
  }
}
