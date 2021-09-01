import fs from 'fs'

(async () => {
  await fs.promises.copyFile('dist/index.html', 'dist/404.html')
  await fs.promises.rm('docs', {
    recursive: true,
    force: true
  })
  await fs.promises.rename('dist', 'docs')
})()
