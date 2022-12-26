import isEqual from '../../system/f/comparisson/Equals/f'
import assert from '../../util/assert'
import { clone } from '../../util/object'

const obj = { a: 1, b: { c: 2 } }
const cloned_obj = clone(obj)

delete cloned_obj['b']['c']
delete cloned_obj['b']

assert(isEqual(cloned_obj, { a: 1 }))
assert(isEqual(obj, { a: 1, b: { c: 2 } }))
