import { createEvent, sample } from 'effector'
import { isServerPageContext, PageContext, ServerPageContext } from 'nextjs-effector'
import { loadViewerOnPageStarted } from '../shared'

export const pageStarted = createEvent<PageContext>()
export const pageStartedOnServer = createEvent<ServerPageContext>()

sample({
  source: pageStarted,
  filter: isServerPageContext,
  target: pageStartedOnServer
})

loadViewerOnPageStarted(pageStartedOnServer)
