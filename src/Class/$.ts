import { EventEmitter_, EventEmitter_EE } from '../EventEmitter'
import { deleteGlobalRef, setGlobalRef } from '../global'
import { System } from '../system'
import { Dict } from '../types/Dict'

export type $_EE = { destroy: []; register: []; unregister: [] }

export type $Events<_EE extends Dict<any[]>> = EventEmitter_EE<_EE & $_EE> &
  $_EE

export class $<
  _EE extends $Events<_EE> & Dict<any[]> = $Events<$_EE>,
> extends EventEmitter_<_EE> {
  public __: string[] = []
  public __system: System
  public __global_id: string
  public __async: boolean = false
  public __ref_count: number = 0
  public __done: boolean

  constructor(system: System) {
    super()

    this.__system = system

    this.register()
  }

  getGlobalId(): string {
    return this.__global_id
  }

  getInterface(): string[] {
    return this.__
  }

  refSystem(): System {
    return this.__system
  }

  register(): void {
    this.__ref_count++

    if (this.__ref_count === 1) {
      this.__global_id = setGlobalRef(this.__system, this)
    }

    this.emit('register')
  }

  unregister(): void {
    this.__ref_count--

    if (this.__ref_count === 0) {
      this.emit('unregister')
    }
  }

  destroy() {
    deleteGlobalRef(this.__system, this.__global_id)

    this.__done = true

    this.emit('destroy')
  }

  raw(): any {
    throw new Error("object doesn't have raw form")
  }
}
