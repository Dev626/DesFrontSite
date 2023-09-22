import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter, first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';

import { StoreService } from '@appcore/store/store.service';
import { UtilsService } from '@service/utils.service';
import { ApiService } from '@service/api.service';

import { RefreshStoreAction } from '@appcore/actions/actions';
import { environment } from 'src/environments/environment';
import { combineLatest } from 'rxjs';

declare var $: any;

@Component({
	selector: 'molla-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {

	constructor(
		public store: Store<any>,
		public router: Router,
		public viewPort: ViewportScroller,
		public storeService: StoreService,
		public utilsService: UtilsService,
    public modalService: NgbModal,
    public apiService: ApiService
	) {
		const navigationEnd = this.router.events.pipe(
			filter(event => event instanceof NavigationEnd)
		);

		navigationEnd.pipe(first()).subscribe(() => {
			// document.querySelector('body')?.classList.add('loaded');
			var timer = setInterval(() => {
				if( window.getComputedStyle( document.querySelector('body') ).visibility == 'visible') {
					clearInterval(timer);
					$('.owl-carousel').trigger('refresh.owl.carousel');
				}
			}, 300);
		});

		navigationEnd.subscribe((event: any) => {
			if (!event.url.includes('/shop/sidebar') && !event.url.includes('/shop/nosidebar') && !event.url.includes('/shop/market') && !event.url.includes('/blog')) {
				this.viewPort.scrollToPosition([0, 0]);
			}

			this.modalService.dismissAll();
		})

		if (localStorage.getItem("molla-angular-demo") !== environment.demo) {
			this.store.dispatch(new RefreshStoreAction());
		}

    localStorage.setItem("molla-angular-demo", environment.demo);

    let tienda_id = this.apiService.getStorage({ key: 'tienda_id' });
    let empresa_id = this.apiService.getStorage({ key: 'empresa_id' });

    if (!(tienda_id && empresa_id)) {
      this.apiService.deswebStoreInit({
        virtual_store_domain: this.apiService.getHostname()
      }).subscribe(response => {
        let data = response.result[0]
        this.apiService.setStorage({
          key: 'empresa_id',
          value: data.empresa_id
        })
        this.apiService.setStorage({
          key: 'tienda_id',
          value: data.tienda_id
        })
        this.loadWebStoreData({ tienda_id: data.tienda_id });
      })
    } else {
      this.loadWebStoreData({ tienda_id: tienda_id });
    }
  }

  loadWebStoreData(fields: {
    tienda_id: number
  }) {
    const data_1$ = this.apiService.deswebStoreGetInfo(fields);
    const data_2$ = this.apiService.desstoreSocialNetworkList(fields);
    combineLatest(data_1$, data_2$, (deswebStoreGetInfo, desstoreSocialNetworkList) => ({ deswebStoreGetInfo, desstoreSocialNetworkList })).subscribe(response => {
      this.apiService.setStorage({
        key: 'empresa_info',
        value: response.deswebStoreGetInfo.result[0]
      })
      this.apiService.setStorage({
        key: 'social_network',
        value: response.desstoreSocialNetworkList.result[1]
      })
      document.querySelector('body')?.classList.add('loaded');
    })
  }

	@HostListener('window: scroll', ['$event'])
	onWindowScroll(e: Event) {
		this.utilsService.setStickyHeader();
	}

	hideMobileMenu() {
		document.querySelector('body').classList.remove('mmenu-active');
		document.querySelector('html').style.overflowX = 'unset';
	}
}
