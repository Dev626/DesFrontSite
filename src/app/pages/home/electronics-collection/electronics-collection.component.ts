import { Component, OnInit, Input } from '@angular/core';

import { productSlider } from '../data';

@Component({
	selector: 'molla-electronics-collection',
	templateUrl: './electronics-collection.component.html',
	styleUrls: ['./electronics-collection.component.scss']
})

export class ElectronicsCollectionComponent implements OnInit {

	@Input() products = [];
	@Input() loaded = false;

	sliderOption = productSlider;
  // attrs = ['featured'];
  attrs = ['featured', 'new', 'top'];
  // titles = { "featured": "Featured" };
  titles = { "featured": "Featured", "new": "New", "top": "Best Seller" };

	constructor() { }

	ngOnInit(): void {
	}
}
