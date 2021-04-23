import * as Phaser from 'phaser';
import { Canvas } from './Canvas';

import { scenes } from './scenes'

const config = {
    type: Phaser.AUTO,
    width: Canvas.widthPx,
    height: Canvas.heightPx,
    scene: scenes,
};

new Phaser.Game(config);
