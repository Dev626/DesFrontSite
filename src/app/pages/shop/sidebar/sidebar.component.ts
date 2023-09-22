import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Category } from '@classe/category';

import { Observable, combineLatest } from 'rxjs';

@Component({
	selector: 'shop-sidebar-page',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})

export class SidebarPageComponent implements OnInit {
  queryParams: any = {};
	products = [];
	perPage = 12;
  type = 'list';
	totalCount = 0;
  orderBy = 'default';
  store_subcategory_id = 0;
	pageTitle = 'List';
	toggle = false;
	searchTerm = '';
	loaded = false;
	firstLoad = false;

	constructor(public activeRoute: ActivatedRoute, public router: Router, public utilsService: UtilsService, public apiService: ApiService) {
    this.activeRoute.params.subscribe(params => {
      this.type = params['type'];

			if (this.type == 'list') {
        this.pageTitle = 'list';
			} else if (this.type == '2cols') {
				this.pageTitle = 'Grid 2 Columns';
			} else if (this.type == '3cols') {
				this.pageTitle = 'Grid 3 Columns';
			} else if (this.type == '4cols') {
				this.pageTitle = 'Grid 4 Columns';
			}
		});

		this.activeRoute.queryParams.subscribe(params => {
      this.loaded = false;
      this.queryParams = params;
      this.store_subcategory_id = this.queryParams.slug;
      this.pageTitle = this.queryParams.name;

			if (params['searchTerm']) {
				this.searchTerm = params['searchTerm'];
			} else {
        this.searchTerm = '';
			}

			if (params['orderBy']) {
				this.orderBy = params['orderBy'];
			} else {
				this.orderBy = 'default';
      }
      // desstoreProductSubcategoryList
      const data_1$: Observable<any> = this.apiService.desstoreProductSubcategoryList({
        estado: 20253,
        tienda_id: this.apiService.getStorage({ key: 'tienda_id' }),
        store_subcategory_id: this.store_subcategory_id,
        nombre: this.searchTerm,
        page: this.queryParams.page,
        size: this.perPage
      });
      // desstoreProducVariantsList
      const data_2$: Observable<any> = this.apiService.desstoreProducVariantsList({
        tienda_id: this.apiService.getStorage({ key: 'tienda_id' }),
        store_subcategory_id: this.store_subcategory_id,
      })

      combineLatest(data_1$, data_2$, (desstoreProductSubcategoryList, desstoreProducVariantsList) => ({ desstoreProductSubcategoryList, desstoreProducVariantsList })).subscribe(response => {

        let db_variants = response.desstoreProducVariantsList.result[1];
        let db_products = response.desstoreProductSubcategoryList.result[1];

        let variants = [];
        // db_variants.forEach((value, index, array) => {
        //   variants.push({
        //     color: '#' + JSON.parse(value.colour_data)[0],
        //     color_name: value.catalogo_colour,
        //     price: value.price || db_product.price,
        //     size: [{
        //       name: value.catalogo_size
        //     }]
        //   })
        // });
        /*

        obj = {
          "103": []
        }

        */


        let products = []
        db_products.forEach((value, index, array) => {
          products.push({
            id: value.id,
            sku: value.sku,
            name: value.name,
            short_desc: value.short_desc,
            description: value.descripcion ? value.descripcion : value.short_desc,
            addtional_info: value.addtional_info,
            shipp_returns: value.shipp_returns,
            price: value.price,
            slug: value.id,
            review: 2,
            ratings: 4,
            until: null,
            stock: value.stock,
            category: [{
              slug: value.store_subcategory_id,
              name: value.store_subcategory,
            }],
            pictures: [{
              width: 800,
              height: 800,
              url: value.thumbnail_url
            }],
            sm_pictures: [{
              width: 300,
              height: 300,
              url: value.thumbnail_url
            }],
            variants: [], // obj[value.id]
            featured: true,
            top: null,
            new: null,
          })
        })
        this.products = products;
        this.totalCount = response.desstoreProductSubcategoryList.result[0][0].total_registros;

        this.loaded = true;
        if (!this.firstLoad) {
          this.firstLoad = true;
        }
        this.utilsService.scrollToPageContent();
      });
		})
	}

	ngOnInit(): void {
		if (window.innerWidth > 991) this.toggle = false;
		else this.toggle = true;
	}

	@HostListener('window: resize', ['$event'])
	onResize(event: Event) {
		if (window.innerWidth > 991) this.toggle = false;
		else this.toggle = true;
	}

	changeOrderBy(event: any) {
		this.router.navigate([], { queryParams: { orderBy: event.currentTarget.value, page: 1 }, queryParamsHandling: 'merge' });
	}

	toggleSidebar() {
		if (document.querySelector('body').classList.contains('sidebar-filter-active'))
			document.querySelector('body').classList.remove('sidebar-filter-active');
		else
			document.querySelector('body').classList.add('sidebar-filter-active');
	}

	hideSidebar() {
		document.querySelector('body').classList.remove('sidebar-filter-active');
	}
}
