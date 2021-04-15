import * as path from 'path'

export interface IAssetDescriptor {
  key: string
  path: string
}

const resolvePath = (partialPath: string) => path.join('../src/assets', partialPath)

export const AssetIndex = {
  amuletImage: {
    key: 'amuletImage',
    path: resolvePath('amulet.png')
  },
}
