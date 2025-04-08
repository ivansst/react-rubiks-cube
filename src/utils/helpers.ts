import { Color, Face } from './types'

export default function createFace(color: Color): Face {
  return [
    [color, color, color],
    [color, color, color],
    [color, color, color],
  ]
}
