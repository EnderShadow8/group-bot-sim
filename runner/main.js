import Perlin from "proc-noise"
import {strats} from "./controller/strats.js"
import {genMap} from "./controller/world.js"

const MAP_SIZE = 100
const START_ENERGY = 30

const world = genMap(MAP_SIZE, new Perlin())
const agents = []
for(let i of strats.keys()) {
  const x = Math.floor(Math.random() * MAP_SIZE)
  const y = Math.floor(Math.random() * MAP_SIZE)
  agents.push({id: i, x, y, e: START_ENERGY})
  world[x][y]
}
