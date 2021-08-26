import { render } from '@testing-library/vue'
import About from '@/views/About.vue'

describe('About.vue', () => {
  it('rendering works', () => {
    const about = render(About)
    about.getByText('Code Brunch Calculator')
    console.log(about.html())
  })
})
