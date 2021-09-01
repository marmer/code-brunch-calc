import * as fs from 'fs'

import simpleGit, { SimpleGit } from 'simple-git'

const git: SimpleGit = simpleGit();

(async () => {
  await fs.promises.copyFile('dist/index.html', 'dist/404.html')
  await fs.promises.rm('docs', {
    recursive: true,
    force: true
  })
  await fs.promises.rename('dist', 'docs')
  git.add('docs', err => {
    if (err) {
      console.error(err)
    }
  })
  console.log('Production build ready to rollout (just commit and push to master)')
})()
