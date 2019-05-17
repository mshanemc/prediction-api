// See the LWC Recipes sample application fo many, many other
// test scenarios and best practices.
//
// https://github.com/trailheadapps/lwc-recipes

import { createElement } from 'lwc'
import MyChild from 'my/child'

describe('my-child', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild)
        }
    })

    it('renders UI text based on public property value', () => {
        const INPUT_TEXT = 'This is the value'
        const FIXED_TEXT = 'The value of the public property is: '
        const RESULT_TEXT = FIXED_TEXT.concat(INPUT_TEXT)

        const element = createElement('my-app', {
            is: MyChild
        })
        element.myPublicProperty = INPUT_TEXT
        document.body.appendChild(element)

        const pEl = element.shadowRoot.querySelector('p')
        expect(pEl.textContent).toEqual(RESULT_TEXT)
    })
})
