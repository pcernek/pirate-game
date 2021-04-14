import { Canvas } from './Canvas';
import { BattleMap } from './scenes/BattleMap';
import { Lighthouse } from './scenes/Lighthouse';
import { Sharks } from './scenes/Sharks';

const config = {
    type: Phaser.AUTO,
    width: Canvas.widthPx,
    height: Canvas.heightPx,
    scene: [Lighthouse, Sharks, BattleMap],
};

const game = new Phaser.Game(config);
