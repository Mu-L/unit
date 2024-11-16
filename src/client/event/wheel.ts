import { Listenable } from '../Listenable'
import { Listener } from '../Listener'

export interface IOWheelEvent {
  clientX: number
  clientY: number
  screenX: number
  screenY: number
  offsetX: number
  offsetY: number
  deltaX: number
  deltaY: number
  ctrlKey: boolean
  altKey: boolean
}

export function makeWheelListener(
  listener: (data: IOWheelEvent, _event: WheelEvent) => void
): Listener {
  return (component) => {
    return listenWheel(component, (event, _event) => {
      listener(event, _event)
    })
  }
}

export function listenWheel(
  component: Listenable,
  onWheel: (event: IOWheelEvent, _event: WheelEvent) => void
): () => void {
  const {
    $system: {
      api: {
        document: { elementFromPoint },
      },
    },
    $element,
  } = component

  const wheelListener = (_event: WheelEvent) => {
    const { $context, $element } = component

    const { $x, $y, $sx, $sy } = $context

    const {
      deltaX,
      deltaY,
      ctrlKey,
      altKey,
      clientX,
      clientY,
      offsetX,
      offsetY,
    } = _event

    if (ctrlKey) {
      return
    }

    onWheel(
      {
        deltaY,
        deltaX,
        ctrlKey,
        altKey,
        clientX: (clientX - $x) / $sx,
        clientY: (clientY - $y) / $sy,
        offsetX,
        offsetY,
        screenX: clientX,
        screenY: clientY,
      },
      _event
    )
  }

  // $element.addEventListener('wheel', wheelListener, { passive: true })
  $element.addEventListener('wheel', wheelListener, { passive: false })
  return () => {
    $element.removeEventListener('wheel', wheelListener)
  }
}
