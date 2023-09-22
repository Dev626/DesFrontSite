import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '@service/api.service';
import { UtilsService } from '@service/utils.service';
import { ModalService } from '@service/modal.service';

@Component({
	selector: 'molla-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

	@Input() containerClass = "container";

	wishCount = 0;
  empresa_info

  constructor(public activeRoute: ActivatedRoute, public utilsService: UtilsService, public modalService: ModalService, public apiService: ApiService) {
	}

  ngOnInit(): void {
    this.empresa_info = this.apiService.getStorage({ key: 'empresa_info' }) || {};
	}

	showLoginModal(event: Event): void {
		event.preventDefault();
		this.modalService.showLoginModal();
	}
}
