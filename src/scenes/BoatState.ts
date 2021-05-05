export enum ToyBoat {
  JollyRoger = 'jollyRoger',
  Orange = 'orange',
  TheRam = 'ram'
}

export class BoatState {
  private static boatsInBasin: Record<ToyBoat, boolean> = {
    [ToyBoat.JollyRoger]: false,
    [ToyBoat.Orange]: false,
    [ToyBoat.TheRam]: false
  }

  public static placeInBasin(boat: ToyBoat) {
    this.boatsInBasin[boat] = true
  }

  public static isInBasin(boat: ToyBoat) {
    return this.boatsInBasin[boat]
  }
}
