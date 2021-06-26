import {genMap, Vegetation} from "../runner/controller/world.js"

window.setup = function() {
  const n = 100
  const s = 6
  const g = genMap(n, window)
  createCanvas(s * n, s * n)
  noStroke()
  const ct = [
    [50, 200, 0],
    [20, 150, 20],
    [150],
    [200, 200, 100],
  ]
  const cv = [
    [100, 100, 0],
  ]

  for(let x = 0; x < n; x++) {
    for(let y = 0; y < n; y++) {
      const t = g[x][y]
      fill(...(t.object instanceof Vegetation ? cv[t.object.id] : ct[t.terrain]))
      rect(x * s, y * s, s, s)
    }
  }
}
