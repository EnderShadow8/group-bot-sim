// Strats can import stuff from this file

export {Vegetation, Agent} from "./controller/world.js"
export const MAP_SIZE = 100

export function randint(a, b) {
  return Math.floor(Math.random() * (Math.abs(b - a) + 1)) + Math.min(a, b)
}

export function neighbours(x, y) {
  return [
    {x: x + 1, y},
    {x: x - 1, y},
    {x, y: y + 1},
    {x, y: y - 1},
  ].filter(i => validCoordinate(i.x, i.y))
}

export function vicinity(x, y, dist) {
  const a = []
  for(let ix = x - dist; ix <= x + dist; ix++) {
    for(let iy = y - dist; iy <= y + dist; iy++) {
      if(validCoordinate(ix, iy)) {
        a.push({x: ix, y: iy})
      }
    }
  }
  return a
}

export function validCoordinate(x, y) {
  return x < MAP_SIZE && x >= 0 && y < MAP_SIZE && y >= 0
}
