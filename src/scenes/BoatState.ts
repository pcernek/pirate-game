import { Debug } from '../util/Debug'

export enum ToyBoat {
  TheDevil = 'devil',
  TheRam = 'ram'
}

type Callback = () => void

interface BoatStateComponents {
  isInBasin: boolean
  callbacks: Array<Callback>
}

export class BoatState {
  private static boatsInBasin: Record<ToyBoat, BoatStateComponents> = {
    [ToyBoat.TheDevil]: { isInBasin: false, callbacks: [] },
    [ToyBoat.TheRam]: { isInBasin: false, callbacks: [] },
  }

  public static placeInBasin(boat: ToyBoat) {
    Debug.log(`Placed ${boat} in basin`)
    this.boatsInBasin[boat].isInBasin = true
    const callbacks = this.boatsInBasin[boat].callbacks
    Debug.log(`Executing ${callbacks.length} callbacks for ${boat}`)
    for (const callback of callbacks) {
      callback()
    }
  }

  public static onMoveToBasin(boat: ToyBoat, callback: Callback) {
    if (this.isInBasin(boat)) {
      callback()
    } else {
      this.boatsInBasin[boat].callbacks.push(callback)
    }
  }

  private static isInBasin(boat: ToyBoat) {
    const isInBasin = this.boatsInBasin[boat].isInBasin
    const qualifier = isInBasin ? '' : ' NOT '
    Debug.log(`Boat ${boat} is ${qualifier} in the basin`)
    return isInBasin
  }
}
