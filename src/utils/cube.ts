import createFace from './helpers'
import { Color, Face } from './types'

export default class RubiksCube {
  faces: {
    U: Face
    L: Face
    F: Face
    R: Face
    B: Face
    D: Face
  } = RubiksCube.createSolvedFaces()

  constructor() {}

  static createSolvedFaces() {
    return {
      U: createFace(Color.W), // Up
      L: createFace(Color.O), // Left
      F: createFace(Color.G), // Front
      R: createFace(Color.R), // Right
      B: createFace(Color.B), // Back
      D: createFace(Color.Y), // Down
    }
  }

  reset(): void {
    this.faces = RubiksCube.createSolvedFaces()
  }

  private rotateFaceClockwise(faceKey: keyof RubiksCube['faces']): void {
    const face = this.faces[faceKey]
    const N = 3
    for (let i = 0; i < N / 2; i++) {
      for (let j = i; j < N - i - 1; j++) {
        const temp = face[i][j]

        face[i][j] = face[N - 1 - j][i]
        face[N - 1 - j][i] = face[N - 1 - i][N - 1 - j]

        face[N - 1 - i][N - 1 - j] = face[j][N - 1 - i]
        face[j][N - 1 - i] = temp
      }
    }
  }

  private rotateFaceCounterClockwise(faceKey: keyof RubiksCube['faces']): void {
    const face = this.faces[faceKey]
    const N = 3
    for (let i = 0; i < N / 2; i++) {
      for (let j = i; j < N - i - 1; j++) {
        const temp = face[i][j]

        face[i][j] = face[j][N - 1 - i]
        face[j][N - 1 - i] = face[N - 1 - i][N - 1 - j]

        face[N - 1 - i][N - 1 - j] = face[N - 1 - j][i]
        face[N - 1 - j][i] = temp
      }
    }
  }

  frontFaceClockwise(): void {
    this.rotateFaceClockwise('F')
    const temp: Color[] = [
      this.faces.U[2][0],
      this.faces.U[2][1],
      this.faces.U[2][2],
    ]
    this.faces.U[2][0] = this.faces.L[2][2]
    this.faces.U[2][1] = this.faces.L[1][2]
    this.faces.U[2][2] = this.faces.L[0][2]

    this.faces.L[0][2] = this.faces.D[0][0]
    this.faces.L[1][2] = this.faces.D[0][1]
    this.faces.L[2][2] = this.faces.D[0][2]

    this.faces.D[0][0] = this.faces.R[2][0]
    this.faces.D[0][1] = this.faces.R[1][0]
    this.faces.D[0][2] = this.faces.R[0][0]

    this.faces.R[0][0] = temp[0]
    this.faces.R[1][0] = temp[1]
    this.faces.R[2][0] = temp[2]
  }

  frontFaceCounterClockwise(): void {
    this.rotateFaceCounterClockwise('F')
    const temp: Color[] = [
      this.faces.U[2][0],
      this.faces.U[2][1],
      this.faces.U[2][2],
    ]
    this.faces.U[2][0] = this.faces.R[0][0]
    this.faces.U[2][1] = this.faces.R[1][0]
    this.faces.U[2][2] = this.faces.R[2][0]

    this.faces.R[0][0] = this.faces.D[0][2]
    this.faces.R[1][0] = this.faces.D[0][1]
    this.faces.R[2][0] = this.faces.D[0][0]

    this.faces.D[0][0] = this.faces.L[0][2]
    this.faces.D[0][1] = this.faces.L[1][2]
    this.faces.D[0][2] = this.faces.L[2][2]

    this.faces.L[0][2] = temp[2]
    this.faces.L[1][2] = temp[1]
    this.faces.L[2][2] = temp[0]
  }

  rightFaceClockwise(): void {
    this.rotateFaceClockwise('R')
    const temp: Color[] = [
      this.faces.U[0][2],
      this.faces.U[1][2],
      this.faces.U[2][2],
    ]
    this.faces.U[0][2] = this.faces.F[0][2]
    this.faces.U[1][2] = this.faces.F[1][2]
    this.faces.U[2][2] = this.faces.F[2][2]

    this.faces.F[0][2] = this.faces.D[0][2]
    this.faces.F[1][2] = this.faces.D[1][2]
    this.faces.F[2][2] = this.faces.D[2][2]

    this.faces.D[0][2] = this.faces.B[2][0]
    this.faces.D[1][2] = this.faces.B[1][0]
    this.faces.D[2][2] = this.faces.B[0][0]

    this.faces.B[0][0] = temp[2]
    this.faces.B[1][0] = temp[1]
    this.faces.B[2][0] = temp[0]
  }

  rightFaceCounterClockwise(): void {
    this.rotateFaceCounterClockwise('R')
    const temp: Color[] = [
      this.faces.U[0][2],
      this.faces.U[1][2],
      this.faces.U[2][2],
    ]
    this.faces.U[0][2] = this.faces.B[2][0]
    this.faces.U[1][2] = this.faces.B[1][0]
    this.faces.U[2][2] = this.faces.B[0][0]

    this.faces.B[0][0] = this.faces.D[2][2]
    this.faces.B[1][0] = this.faces.D[1][2]
    this.faces.B[2][0] = this.faces.D[0][2]

    this.faces.D[0][2] = this.faces.F[0][2]
    this.faces.D[1][2] = this.faces.F[1][2]
    this.faces.D[2][2] = this.faces.F[2][2]

    this.faces.F[0][2] = temp[0]
    this.faces.F[1][2] = temp[1]
    this.faces.F[2][2] = temp[2]
  }

  upFaceClockwise(): void {
    this.rotateFaceClockwise('U')
    const temp: Color[] = this.faces.F[0].slice()
    this.faces.F[0] = this.faces.R[0].slice()
    this.faces.R[0] = this.faces.B[0].slice()
    this.faces.B[0] = this.faces.L[0].slice()
    this.faces.L[0] = temp
  }

  upFaceCounterClockwise(): void {
    this.rotateFaceCounterClockwise('U')
    const temp: Color[] = this.faces.F[0].slice()
    this.faces.F[0] = this.faces.L[0].slice()
    this.faces.L[0] = this.faces.B[0].slice()
    this.faces.B[0] = this.faces.R[0].slice()
    this.faces.R[0] = temp
  }

  backFaceClockwise(): void {
    this.rotateFaceClockwise('B')
    const temp: Color[] = this.faces.U[0].slice()

    this.faces.U[0][0] = this.faces.R[0][2]
    this.faces.U[0][1] = this.faces.R[1][2]
    this.faces.U[0][2] = this.faces.R[2][2]

    this.faces.R[0][2] = this.faces.D[2][2]
    this.faces.R[1][2] = this.faces.D[2][1]
    this.faces.R[2][2] = this.faces.D[2][0]

    this.faces.D[2][0] = this.faces.L[2][0]
    this.faces.D[2][1] = this.faces.L[1][0]
    this.faces.D[2][2] = this.faces.L[0][0]

    this.faces.L[0][0] = temp[2]
    this.faces.L[1][0] = temp[1]
    this.faces.L[2][0] = temp[0]
  }

  backFaceCounterClockwise(): void {
    this.rotateFaceCounterClockwise('B')
    const temp: Color[] = this.faces.U[0].slice()

    this.faces.U[0][0] = this.faces.L[2][0]
    this.faces.U[0][1] = this.faces.L[1][0]
    this.faces.U[0][2] = this.faces.L[0][0]

    this.faces.L[0][0] = this.faces.D[2][0]
    this.faces.L[1][0] = this.faces.D[2][1]
    this.faces.L[2][0] = this.faces.D[2][2]

    this.faces.D[2][0] = this.faces.R[2][2]
    this.faces.D[2][1] = this.faces.R[1][2]
    this.faces.D[2][2] = this.faces.R[0][2]

    this.faces.R[0][2] = temp[0]
    this.faces.R[1][2] = temp[1]
    this.faces.R[2][2] = temp[2]
  }

  leftFaceClockwise(): void {
    this.rotateFaceClockwise('L')
    const temp: Color[] = [
      this.faces.U[0][0],
      this.faces.U[1][0],
      this.faces.U[2][0],
    ]
    this.faces.U[0][0] = this.faces.B[2][2]
    this.faces.U[1][0] = this.faces.B[1][2]
    this.faces.U[2][0] = this.faces.B[0][2]

    this.faces.B[0][2] = this.faces.D[2][0]
    this.faces.B[1][2] = this.faces.D[1][0]
    this.faces.B[2][2] = this.faces.D[0][0]

    this.faces.D[0][0] = this.faces.F[0][0]
    this.faces.D[1][0] = this.faces.F[1][0]
    this.faces.D[2][0] = this.faces.F[2][0]

    this.faces.F[0][0] = temp[0]
    this.faces.F[1][0] = temp[1]
    this.faces.F[2][0] = temp[2]
  }

  leftFaceCounterClockwise(): void {
    this.rotateFaceCounterClockwise('L')
    const temp: Color[] = [
      this.faces.U[0][0],
      this.faces.U[1][0],
      this.faces.U[2][0],
    ]
    this.faces.U[0][0] = this.faces.F[0][0]
    this.faces.U[1][0] = this.faces.F[1][0]
    this.faces.U[2][0] = this.faces.F[2][0]

    this.faces.F[0][0] = this.faces.D[0][0]
    this.faces.F[1][0] = this.faces.D[1][0]
    this.faces.F[2][0] = this.faces.D[2][0]

    this.faces.D[0][0] = this.faces.B[2][2]
    this.faces.D[1][0] = this.faces.B[1][2]
    this.faces.D[2][0] = this.faces.B[0][2]

    this.faces.B[0][2] = temp[2]
    this.faces.B[1][2] = temp[1]
    this.faces.B[2][2] = temp[0]
  }

  downFaceClockwise(): void {
    this.rotateFaceClockwise('D')
    const temp: Color[] = this.faces.F[2].slice()
    this.faces.F[2] = this.faces.L[2].slice()
    this.faces.L[2] = this.faces.B[2].slice()
    this.faces.B[2] = this.faces.R[2].slice()
    this.faces.R[2] = temp
  }

  downFaceCounterClockwise(): void {
    this.rotateFaceCounterClockwise('D')
    const temp: Color[] = this.faces.F[2].slice()
    this.faces.F[2] = this.faces.R[2].slice()
    this.faces.R[2] = this.faces.B[2].slice()
    this.faces.B[2] = this.faces.L[2].slice()
    this.faces.L[2] = temp
  }

  applyMove(move: string): void {
    switch (move) {
      case 'F':
        this.frontFaceClockwise()
        break
      case "F'":
        this.frontFaceCounterClockwise()
        break
      case 'R':
        this.rightFaceClockwise()
        break
      case "R'":
        this.rightFaceCounterClockwise()
        break
      case 'U':
        this.upFaceClockwise()
        break
      case "U'":
        this.upFaceCounterClockwise()
        break
      case 'B':
        this.backFaceClockwise()
        break
      case "B'":
        this.backFaceCounterClockwise()
        break
      case 'L':
        this.leftFaceClockwise()
        break
      case "L'":
        this.leftFaceCounterClockwise()
        break
      case 'D':
        this.downFaceClockwise()
        break
      case "D'":
        this.downFaceCounterClockwise()
        break
      default:
        console.warn(`Unknown move: ${move}`)
    }
  }

  applyMoves(moves: string): void {
    const moveList = moves.split(' ').filter((move) => move.trim() !== '')
    for (const move of moveList) {
      this.applyMove(move)
    }
  }

  // Method to get a deep copy of the cube state
  getFacesState() {
    const state = { ...this.faces }
    return JSON.parse(JSON.stringify(state))
  }
}
