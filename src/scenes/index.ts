import { DeadEndScene } from './generic/DeadEndScene';
import { Lighthouse } from './Lighthouse';
import { Sharks } from './Sharks';

const LighthouseScene = new Lighthouse('lighthouse')
const AmuletScene = new DeadEndScene('amulet', 'assets/amulet.png', LighthouseScene)
const BattleMapScene = new DeadEndScene('battleMap', 'assets/battle-map.png', LighthouseScene)
const ViewFromWindowScene = new DeadEndScene('viewFromWindow', 'assets/view-from-window.png', LighthouseScene)

export const scenes = [
  LighthouseScene,
  AmuletScene,
  BattleMapScene,
  ViewFromWindowScene,
  new Sharks()
]