import { Dict } from '../../Dict'

export const AsyncWrap = (
  unit: any,
  _: string[],
  wrapper: Dict<(unit: any) => any>
): any => {
  let $unit = unit

  for (const ___ of _) {
    const AsyncWrapper = wrapper[___]

    if (!AsyncWrapper) {
      throw new Error('async wrapper is not registered')
    }

    $unit = { ...$unit, ...AsyncWrapper(unit) }
  }

  return $unit
}
