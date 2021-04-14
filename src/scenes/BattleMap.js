import Phaser from 'phaser';
import battleMap from '../assets/battle-map.png'
import { Canvas } from '../Canvas';

export class BattleMap extends Phaser.Scene {
  constructor() {
        super({
          key: 'battleMap'
        });
    }

    preload() {
        this.load.image('battleMap', battleMap);
    }

    create() {
        this.add.image(Canvas.widthPx/2, Canvas.heightPx/2, 'battleMap');
        this.input.on(Phaser.Input.Events.POINTER_DOWN, () => this.scene.switch('lighthouse'))
    }
}