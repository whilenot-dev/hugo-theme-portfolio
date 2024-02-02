import { initContainer } from './container'
import { initNav } from './nav'
import { initResources } from './resources'
import { initState } from './state'

document.addEventListener('DOMContentLoaded', main);

async function main(): Promise<void> {
  initContainer()
  const ijs = await initResources()
  initState(ijs.length)
  initNav()

  // NOTE: it seems firefox and chromnium don't like top layer await
  //       so we are using import then instead
  if (!ijs.length) {
    return;
  }

  if (isMobile()) {
    await import('./mobile/init')
      .then((m) => {
        m.initMobile(ijs)
      })
      .catch((e) => {
        console.log(e)
      })
    return
  }

  await import('./desktop/init')
      .then((d) => {
        d.initDesktop(ijs)
      })
      .catch((e) => {
        console.log(e)
      })
}

function isMobile(): boolean {
  return window.matchMedia('(hover: none)').matches
}
