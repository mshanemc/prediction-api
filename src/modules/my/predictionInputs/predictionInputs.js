/* eslint-disable no-console */
import { LightningElement, track, api } from 'lwc';

export default class PredictionInputs extends LightningElement {
    @api predictionId = '0ORB00000008OOTOA2';
    @api accessToken =
        '00DB0000000ECaj!AQ4AQDmKTgbVGIve3LTehcaqrQqhCCkrfyRwg8U09CMtqaeZc.THoCp_dXMpQojLmmQG8BZta6qjqyWRuVxej3njm3bUEJwv';
    @api customDomain = 'ackeynotedf18';
    @api recordId;

    tradeShowInvite = false;
    @track promo;
    @track product;

    @track prediction;

    get rawPrediction() {
        return JSON.stringify(this.prediction);
    }

    get predictionTotal() {
        try {
            return this.prediction.predictions[0].prediction.total.toFixed(2);
        } catch (e) {
            return undefined;
        }
    }

    updateTSI(event) {
        console.log(event.path[0].checked);
        this.tradeShowInvite = event.path[0].checked;
        this.getPrediction();
    }

    productChange(event) {
        console.log(event.path[0].value);
        this.product = event.path[0].value;
        this.getPrediction();
    }
    promoChange(event) {
        console.log(event.path[0].value);
        this.promo = event.path[0].value;
        this.getPrediction();
    }

    async getPrediction() {
        // call the API.
        const response = await fetch(
            `https://${
                this.customDomain
            }.my.salesforce.com/services/data/v46.0/smartdatadiscovery/predict`,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    Authorization: `Bearer ${this.accessToken}`,
                    Accept: 'application/json'
                },
                body: JSON.stringify(this.buildPredictionRequest())
            }
        );
        console.log(response);

        console.log(response.headers);
        this.prediction = await response.json();
        console.log(this.prediction);
    }

    buildPredictionRequest() {
        const output = {
            predictionDefinition: this.predictionId,
            type: 'RawData',
            columnNames: [
                'Trade_Show_Invite',
                'Industry',
                'State',
                'Marketing_Promo',
                'Product',
                'Annual Revenue'
            ],
            rows: [
                [
                    this.tradeShowInvite,
                    'Consulting',
                    'California',
                    this.promo,
                    this.product,
                    '2400000'
                ]
            ]
        };
        console.log(JSON.stringify(output));
        return output;
    }

    get products() {
        return [
            { label: 'GC1500 Series', value: 'GC1500 Series' },
            { label: 'GC2000 Series Plus', value: 'GC2000 Series Plus' },
            { label: 'GC5000 Series', value: 'GC5000 Series' },
            { label: 'GC2000 Series', value: 'GC2000 Series' }
        ];
    }
    get promos() {
        return [
            {
                label: 'CA Solar Energy Convention Promo',
                value: 'CA Solar Energy Convention Promo'
            },
            {
                label: 'Spring Early Bird Promo',
                value: 'Spring Early Bird Promo'
            },
            { label: 'Mid-Season Special', value: 'Mid-Season Special' },
            { label: "President's Day", value: "President's Day" },
            {
                label: 'Renewable Installation Promo',
                value: 'Renewable Installation Promo'
            },
            { label: 'Memorial Day', value: 'Memorial Day' },
            { label: 'Portable Panel Promo', value: 'Portable Panel Promo' },
            { label: 'Sunny Season Promo', value: 'Sunny Season Promo' }
        ];
    }
}
