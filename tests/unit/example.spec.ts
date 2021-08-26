import { render } from '@testing-library/vue'
import About from '@/views/About.vue'

describe('About.vue', () => {
  it('renders props.msg when passed', () => {
    const about = render(About)
    about.getByText('Code Brunch Calculator')
    console.log(about.html())
  })
})
