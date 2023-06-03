export interface IRates {
  base: string
  rates: IRate
}

export interface IRate {
  [key: string]: number
}

