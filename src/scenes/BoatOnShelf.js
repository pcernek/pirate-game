import Phaser from 'phaser';

const grabbedGray = 0x999999;
const droppableGreen = 0x00ff00;

export class BoatOnShelf {
  constructor(x, y, texture) {
    this.initialX = x
    this.initialY = y
    this.texture = texture
    this.isInDropZone = false
  }

  getInitialCoords() {
    return { x: this.initialX, y: this.initialY }
  }

  addToScene(scene, dragTarget) {
    const sprite = scene.add.sprite(this.initialX, this.initialY, this.texture).setInteractive()
    scene.input.setDraggable(sprite)
    sprite.on(Phaser.Input.Events.GAMEOBJECT_DRAG, (_pointer, dragX, dragY) => {
      sprite.setTint(this.getTintColor())
      sprite.x = dragX
      sprite.y = dragY
    })
    sprite.on(Phaser.Input.Events.GAMEOBJECT_DRAG_OVER, (_pointer, target) => {
      if (target === dragTarget) {
        this.isInDropZone = true
      }
    })
    sprite.on(Phaser.Input.Events.GAMEOBJECT_DRAG_LEAVE, (_pointer, target) => {
      if (target === dragTarget) {
        this.isInDropZone = false
      }
    })
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

  getTintColor() {
    return this.isInDropZone ? droppableGreen : grabbedGray
  }
}
