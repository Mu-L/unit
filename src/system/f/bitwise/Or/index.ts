import { Functional } from '../../../../Class/Functional'
import { Done } from '../../../../Class/Functional/Done'
import { System } from '../../../../system'
import { ID_OR } from '../../../_ids'

export interface I {
  a: boolean
  b: boolean
}

export interface O {
  'a | b': boolean
}

export default class And extends Functional<I, O> {
  constructor(system: System) {
    super(
      {
        i: ['a', 'b'],
        o: ['a | b'],
      },
      {},
      system,
      ID_OR
    )
  }

  f({ a, b }: I, done: Done<O>): void {
    done({ 'a | b': a || b })
  }
}
