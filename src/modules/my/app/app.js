import { LightningElement, track } from 'lwc'

export default class App extends LightningElement {

    // This is a private reactive property.
    @track items = [];
    @track offerAI = true;

    // This is a click handler for the button.
    showAI() {
        this.offerAI = false;
    }
}
