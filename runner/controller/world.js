class GameObject {
  constructor(id) {
    this.id = id
  }
}
class Vegetation extends GameObject {}
class Agent extends GameObject {}

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
      const tree = [0.02, 0.03, 0.01, 0]
      g[x][y] = {terrain: t}
      if(Math.random() < tree[t]) {
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

export {genMap, Vegetation, Agent}
