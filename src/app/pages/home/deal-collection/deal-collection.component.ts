import { Component, OnInit, Input } from '@angular/core';

import { productSlider } from '../data';

@Component({
	selector: 'molla-deal-collection',
	templateUrl: './deal-collection.component.html',
	styleUrls: ['./deal-collection.component.scss']
})

export class DealCollectionComponent implements OnInit {

	@Input() products = [];
	@Input() loaded = false;

	sliderOption = productSlider;
	cats = ['all', 'electronics', 'furniture', 'clothing', 'accessories'];
	titles = { "all": "All", "electronics": "Electronics", "furniture": "Furniture", "clothing": "Clothes", "accessories": "Accessroies" };

	constructor() { }

	ngOnInit(): void {
	}
}
