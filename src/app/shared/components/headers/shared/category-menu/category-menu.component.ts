import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { UtilsService } from '@service/utils.service';
import { ApiService } from '@service/api.service';
import { Category } from '@classe/category';



@Component({
	selector: 'molla-category-menu',
	templateUrl: './category-menu.component.html',
	styleUrls: ['./category-menu.component.scss']
})

export class CategoryMenuComponent implements OnInit, OnDestroy {

	isHome = true;

  private subscr: Subscription;

  categories: Category[] = [];

  constructor(public utilsService: UtilsService, public router: Router, public apiService: ApiService) {
		this.subscr = this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				this.isHome = event.url === "/";
			} else if (event instanceof NavigationEnd) {
				this.isHome = event.url === "/";
			}
		})
	}

  ngOnInit(): void {
    this.apiService.desstoreSubcategoryList({
      store_id: this.apiService.getStorage({ key: 'tienda_id' }),
    }).subscribe(response => {
      let db_categories = response.result[1];
      db_categories.forEach((value, index, array) => {
        this.categories.push({
          slug: value.store_subcategory_id,
          name: value.name
        })
      })
    });
	}

	ngOnDestroy(): void {
		this.subscr.unsubscribe();
	}

	toggleMenu() {
		document.querySelector('.category-dropdown .dropdown-menu').classList.toggle('show');
	}
}
