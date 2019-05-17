// See the LWC Recipes sample application fo many, many other
// test scenarios and best practices.
//
// https://github.com/trailheadapps/lwc-recipes

import { createElement } from 'lwc'
import MyApp from 'my/app'

const NUMBER_ITEMS = 5

describe('my-app', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild)
        }
    })

    it('populates a list of my-child on button click', () => {
        const element = createElement('my-app', {
            is: MyApp
        })
        document.body.appendChild(element)

        const buttonEl = element.shadowRoot.querySelector('button')
        buttonEl.click()

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise ends in the
        // rejected state.
        return Promise.resolve().then(() => {
            const childEls = element.shadowRoot.querySelectorAll('my-child')
            expect(childEls.length).toBe(NUMBER_ITEMS)
        })
    })
})
