import Perlin from "proc-noise"
import {strats} from "./controller/strats.js"
import {genMap, Agent} from "./controller/world.js"
import {MAP_SIZE} from "./utils"

const START_ENERGY = 30

const world = genMap(MAP_SIZE, new Perlin())
const agents = []
for(let i = 0; i < strats.length; i++) {
  const x = Math.floor(Math.random() * MAP_SIZE)
  const y = Math.floor(Math.random() * MAP_SIZE)
  agents.push({id: i, team: i, x, y, e: START_ENERGY})
  world[x][y].object = new Agent(i, i)
}

function runRound(world, agents) {
  // TODO
}
