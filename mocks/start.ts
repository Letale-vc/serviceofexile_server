import { setupServer } from "msw/node"
import poeHandlers from "./pathofexile"

const server = setupServer(
  ...poeHandlers
)

server.listen({onUnhandledRequest: 'warn'})
console.info('🔶 Mock server installed')


process.once('SIGINT', () => server.close())
process.once('SIGTERM', () => server.close())