import { Canvas } from './Canvas';
import { Amulet } from './scenes/Amulet';
import { BattleMap } from './scenes/BattleMap';
import { Lighthouse } from './scenes/Lighthouse';
import { Sharks } from './scenes/Sharks';
import { ViewFromWindow } from './scenes/ViewFromWindow';

const config = {
    type: Phaser.AUTO,
    width: Canvas.widthPx,
    height: Canvas.heightPx,
    scene: [Lighthouse, Sharks, BattleMap, Amulet, ViewFromWindow],
};

const game = new Phaser.Game(config);
