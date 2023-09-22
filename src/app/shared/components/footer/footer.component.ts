import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '@service/api.service';

@Component({
	selector: 'molla-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

	@Input() containerClass = "container";
	@Input() isBottomSticky = false;

  year: any;
  social_network: any[];
  empresa_info;

  constructor( public apiService: ApiService) {
    this.empresa_info = this.apiService.getStorage({ key: 'empresa_info' }) || {};
    this.social_network = this.apiService.getStorage({ key: 'social_network' }) || [];

    this.social_network.forEach((value, index, array) => {
      value.variable_2 = JSON.parse(value.variable_2);
    })
	}

	ngOnInit(): void {
		this.year = (new Date()).getFullYear();
	}
}
