import * as Phaser from 'phaser'
import { Scene } from './generic/Scene'

const BOAT_SPEED = 160

export class SharkGame extends Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

  constructor() {
    super('sharks', {
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 }
        }
      }
    })
  }

  public preload() {
    this.load.image('logo', 'assets/sharkGame/nico-shark-300px.png')
    this.load.image('ship', 'assets/sharkGame/pirate-ship-black-sail-800.png')
    this.load.image('rowboat', 'assets/sharkGame/rowboat-100.png')
  }

  public create() {
    this.add.image(400, 300, 'ship')
    const logo = this.add.image(400, 150, 'logo')

    this.tweens.add({
      targets: logo,
      y: 350,
      duration: 1500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1
    })

    this.player = this.physics.add.sprite(400, 540, 'rowboat')
    this.cursors = this.input.keyboard.createCursorKeys()

    this.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.scene.switch('lighthouse')
    })
  }

  public update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-BOAT_SPEED)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(BOAT_SPEED)
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-BOAT_SPEED)
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(BOAT_SPEED)
    } else {
      this.player.setVelocityX(0)
      this.player.setVelocityY(0)
    }
  }
}
