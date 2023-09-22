import { Component, OnInit, Input } from '@angular/core';

import { productSlider } from '../data';

@Component({
	selector: 'molla-furniture-collection',
	templateUrl: './furniture-collection.component.html',
	styleUrls: ['./furniture-collection.component.scss']
})

export class FurnitureCollectionComponent implements OnInit {

	@Input() products = [];
	@Input() loaded = false;

	sliderOption = productSlider;
	attrs = ['featured', 'new', 'top'];
	titles = { "featured": "Featured", "new": "New", "top": "Best Seller" };

	constructor() { }

	ngOnInit(): void {
	}
}
