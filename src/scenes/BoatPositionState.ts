import { Debug } from '../util/Debug'
import { ToyBoat } from './BoatState'

type Callback = () => void

interface thisComponents {
  hasTargetRotation: boolean
  isAtTargetLocation: boolean
}

export class BoatPositionState {
  private static boatsInBasin: Record<ToyBoat, thisComponents> = {
    [ToyBoat.TheDevil]: { hasTargetRotation: false, isAtTargetLocation: false },
    [ToyBoat.TheRam]: { hasTargetRotation: false, isAtTargetLocation: false }
  }

  private static callbacks: Callback[] = []

  private static callbacksCompleted: boolean = false

  public static setTargetRotation(boat: ToyBoat, hasTargetRotation: boolean) {
    this.boatsInBasin[boat].hasTargetRotation = hasTargetRotation
    this.evaluateBoatPositionCallbacks()
  }

  public static setTargetLocation(boat: ToyBoat, isAtTargetLocation: boolean) {
    this.boatsInBasin[boat].isAtTargetLocation = isAtTargetLocation
    this.evaluateBoatPositionCallbacks()
  }

  public static onAllBoatsInPosition(callback: Callback) {
    if (this.everyBoatIsInPosition()) {
      callback()    
    } else {
      this.callbacks.push(callback)
    }
  }
  
  private static evaluateBoatPositionCallbacks() {
    Debug.log('this.callbacksComplete =' + this.callbacksCompleted)
    if (this.everyBoatIsInPosition() && !this.callbacksCompleted) {
      Debug.log('Every boat is in position!')
      Debug.log(`Executing ${this.callbacks.length} callbacks...`)
      for (const callback of this.callbacks) {
        Debug.log(`Callback: ${callback}`)
        callback()
      }
      this.callbacksCompleted = true
    }
  }

  private static everyBoatIsInPosition() {
    return this.everyBoatHasTargetRotation() && this.everyBoatIsAtTargetLocation()
  }

  private static everyBoatHasTargetRotation() {
    Debug.log(`Boat state: ${JSON.stringify(this.boatsInBasin)}`)
    return Object.values(this.boatsInBasin).every(({ hasTargetRotation }) => hasTargetRotation)
  }

  private static everyBoatIsAtTargetLocation() {
    return Object.values(this.boatsInBasin).every(({ isAtTargetLocation }) => isAtTargetLocation)
  }
}
