import {MAP_SIZE, randint, vicinity} from "../utils.js"

class Vegetation {
  constructor(id) {
    this.id = id
  }
}

class Agent {
  constructor(id, team) {
    this.id = id
    this.team = team
  }
}

function genMap(n, p) {
  const ns = 0.025

  const g = new Array(n).fill().map(() => new Array(n))
  p.noiseDetail(3, 0.4)
  for(let x = 0; x < n; x++) {
    for(let y = 0; y < n; y++) {
      const range = [0, 1, 2, 3]
      const weight = [0.05, -0.1, -0.05, 0]
      const arr = range.map(i => p.noise(x * ns + i * 1e4, y * ns + i * 1e4) + weight[i])
      let t = arr.indexOf(Math.max(...arr))
      const treeRate = [0.015, 0.02, 0.01, 0]
      g[x][y] = {terrain: t}
      if(Math.random() < treeRate[t]) {
        g[x][y].object = new Vegetation(0)
      }
    }
  }
  const oasis = [
    [3, 1, 4, 3],
    [4, 1, 1, 1],
    [1, 1, 1, 4],
    [3, 4, 1, 3],
  ]
  let i = 400
  for(let x = 0; x < n; x++) {
    for(let y = 0; y < n; y++) {
      if(g[x][y].terrain === 3) {
        i += Math.random()
        if(i > 800) {
          i = 0
          for(let ix = 0; ix < 4; ix++) {
            for(let iy = 0; iy < 4; iy++) {
              const o = oasis[ix][iy]
              g[x - ix - 1][y - iy - 1] = o === 3
                ? {terrain: 3}
                : o === 1
                  ? {terrain: 1}
                  : {terrain: 1, object: new Vegetation(0)}
            }
          }
        }
      }
    }
  }
  return g
}

function genFood(world) {
  const bushRate = [0.001, 0.001, 0.0005, 0]
  const fernRate = 0.001
  const cactusRate = 0.0005
  const fruitRate = 0.1
  const jungleMult = 1.5
  for(let x = 0; x < MAP_SIZE; x++) {
    for(let y = 0; y < MAP_SIZE; y++) {
      const t = world[x][y]
      if(!t.object) {
        if(Math.random() < bushRate[t.terrain]) {
          t.object = new Vegetation(2)
        } else if(t.terrain === 1 && Math.random() < fernRate) {
          t.object = new Vegetation(3)
        } else if(t.terrain === 3 && Math.random() < cactusRate) {
          t.object = new Vegetation(4)
        }
      } else if(
        t.object instanceof Vegetation
        && t.object.id === 0
        && Math.random() < fruitRate * (t.terrain === 1 ? jungleMult : 1)
      ) {
        const poss = vicinity(x, y, 2).filter(i => !world[i.x][i.y].object)
        const choice = poss[randint(0, poss.length - 1)]
        if(choice) {
          world[choice.x][choice.y].object = new Vegetation(1)
        }
      }
    }
  }
}

export {genMap, genFood, Vegetation, Agent}
