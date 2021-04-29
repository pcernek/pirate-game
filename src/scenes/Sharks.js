import Phaser from 'phaser'

const BOAT_SPEED = 160
let cursors
let player

export class Sharks extends Phaser.Scene {
  constructor() {
    super({
      key: 'sharks',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 }
        }
      }
    })
  }

  preload() {
    this.load.image('logo', 'assets/sharkGame/nico-shark-300px.png')
    this.load.image('ship', 'assets/sharkGame/pirate-ship-black-sail-800.png')
    this.load.image('rowboat', 'assets/sharkGame/rowboat-100.png')
  }

  create() {
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

    player = this.physics.add.sprite(400, 540, 'rowboat')
    cursors = this.input.keyboard.createCursorKeys()

    this.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.scene.switch('lighthouse')
    })
  }

  update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-BOAT_SPEED)
    } else if (cursors.right.isDown) {
      player.setVelocityX(BOAT_SPEED)
    } else if (cursors.up.isDown) {
      player.setVelocityY(-BOAT_SPEED)
    } else if (cursors.down.isDown) {
      player.setVelocityY(BOAT_SPEED)
    } else {
      player.setVelocityX(0)
      player.setVelocityY(0)
    }
  }
}
