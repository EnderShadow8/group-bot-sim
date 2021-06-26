import * as fs from "fs"
import * as path from "path"
import {fileURLToPath} from "url"

const STRATEGY_FOLDER = "../strats/"

const strats = []
for(let f of fs.readdirSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), STRATEGY_FOLDER))) {
  strats.push((await import(STRATEGY_FOLDER + f)).default)
}

export {strats}
