import Phaser from 'phaser';
import amulet from '../assets/amulet.png'
import { Canvas } from '../Canvas';

export class Amulet extends Phaser.Scene {
  constructor() {
        super({
          key: 'amulet'
        });
    }

    preload() {
        this.load.image('amulet', amulet);
    }

    create() {
        this.add.image(Canvas.widthPx/2, Canvas.heightPx/2, 'amulet');
        this.input.on(Phaser.Input.Events.POINTER_DOWN, () => this.scene.switch('lighthouse'))
    }
}