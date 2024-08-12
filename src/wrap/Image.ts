import { $ } from '../Class/$'
import { ObjectPathTooDeepError } from '../exception/ObjectPathTooDeep'
import { ObjectUpdateType } from '../ObjectUpdateType'
import { System } from '../system'
import { IM } from '../types/interface/IM'
import { J } from '../types/interface/J'
import { Unlisten } from '../types/Unlisten'

const KNOWN_IMAGE_PROPERTIES = ['naturalWidth', 'naturalHeight']

export function wrapImage(image: HTMLImageElement, system: System): IM & J {
  const stream = new (class Image extends $ implements IM, J {
    __: string[] = ['IM', 'J']

    async get<K extends string>(name: K): Promise<any> {
      if (KNOWN_IMAGE_PROPERTIES.includes(name)) {
        // @ts-ignore
        return image[name]
      }

      return false
    }
    set<K extends string>(name: K, data: any): Promise<void> {
      throw new Error('image read only')
    }
    delete<K extends string>(name: K): Promise<void> {
      throw new Error('image read only')
    }
    async hasKey<K extends string>(name: K): Promise<boolean> {
      if (KNOWN_IMAGE_PROPERTIES.includes(name)) {
        return true
      }

      return false
    }
    keys(): Promise<string[]> {
      throw KNOWN_IMAGE_PROPERTIES
    }
    deepGet(path: string[]): Promise<any> {
      if (path.length > 1) {
        throw new ObjectPathTooDeepError()
      }

      return this.get(path[0])
    }
    deepSet(path: string[], data: any): Promise<void> {
      throw new Error('image read only')
    }
    deepDelete(path: string[]): Promise<void> {
      throw new Error('image read only')
    }
    subscribe(
      path: string[],
      key: string,
      listener: (
        type: ObjectUpdateType,
        path: string[],
        key: string,
        data: any
      ) => void
    ): Unlisten {
      throw new Error('image read only')
    }

    async image(): Promise<any> {
      return image
    }
  })(system)

  return stream
}