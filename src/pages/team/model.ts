import { createEvent } from 'effector'
import { StaticPageContext } from 'nextjs-effector'

export const pageStarted = createEvent<StaticPageContext>()
