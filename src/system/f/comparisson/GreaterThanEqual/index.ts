import { Functional } from '../../../../Class/Functional'
import { System } from '../../../../system'
import { ID_GREATER_THAN_EQUAL } from '../../../_ids'

export interface I {
  a: number
  b: number
}

export interface O {
  'a ≥ b': boolean
}

export default class GreaterThanEqual extends Functional<I, O> {
  constructor(system: System) {
    super(
      {
        i: ['a', 'b'],
        o: ['a ≥ b'],
      },
      {},
      system,
      ID_GREATER_THAN_EQUAL
    )
  }

  f({ a, b }: I, done): void {
    done({ 'a ≥ b': a >= b })
  }
}
