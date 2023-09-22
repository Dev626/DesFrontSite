import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { environment } from 'src/environments/environment';

@Component({
	selector: 'molla-header-search',
	templateUrl: './header-search.component.html',
	styleUrls: ['./header-search.component.scss']
})

export class HeaderSearchComponent implements OnInit, OnDestroy {

	products = [];
	searchTerm = "";
	cat = null;
	suggestions = [];
	timer: any;
	SERVER_URL = environment.SERVER_URL;

	constructor(public activeRoute: ActivatedRoute, public router: Router, public utilsService: UtilsService, public apiService: ApiService) {
	}

	ngOnInit(): void {
		document.querySelector('body').addEventListener('click', this.closeSearchForm);
	}

	ngOnDestroy(): void {
		document.querySelector('body').removeEventListener('click', this.closeSearchForm);
	}

	fetchProducts() {
		if (this.searchTerm.length > 2) {
			if (this.timer) {
				window.clearTimeout(this.timer);
			}

			this.timer = setTimeout(() => {


        this.apiService.desstoreProductSubcategoryList({
          estado: 20253,
          tienda_id: this.apiService.getStorage({ key: 'tienda_id' }),
          nombre: this.searchTerm
        }).subscribe(response => {
          let db_products = response.result[1];
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
              variants: [],
              featured: true,
              top: null,
              new: null,
            })
          })
          this.suggestions = products.reduce(
            (acc, cur) => {
              let max = 0;
              let min = 99999;
              cur.variants.map(item => {
                if (min > item.price)
                  min = item.price;
                if (max < item.price)
                  max = item.price;
              }, []);

              if (cur.variants.length == 0) {
                min = cur.sale_price
                  ? cur.sale_price
                  : cur.price;
                max = cur.price;
              }
              return [
                ...acc,
                {
                  ...cur,
                  minPrice: min,
                  maxPrice: max
                }
              ];
            },
            []
          );
        })

				// this.apiService.fetchHeaderSearchData(this.searchTerm, this.cat).subscribe(result => {
				// 	this.suggestions = result.products.reduce(
				// 		(acc, cur) => {
				// 			let max = 0;
				// 			let min = 99999;
				// 			cur.variants.map(item => {
				// 				if (min > item.price)
				// 					min = item.price;
				// 				if (max < item.price)
				// 					max = item.price;
				// 			}, []);

				// 			if (cur.variants.length == 0) {
				// 				min = cur.sale_price
				// 					? cur.sale_price
				// 					: cur.price;
				// 				max = cur.price;
				// 			}
				// 			return [
				// 				...acc,
				// 				{
				// 					...cur,
				// 					minPrice: min,
				// 					maxPrice: max
				// 				}
				// 			];
				// 		},
				// 		[]
				// 	);
        // })

			}, 500)
		} else {
			window.clearTimeout(this.timer);
			this.suggestions = [];
		}
	}

	searchProducts(event: any) {
		this.searchTerm = event.target.value;
		this.fetchProducts();
	}

	matchEmphasize(name: string) {
		var regExp = new RegExp(this.searchTerm, 'i');
		return name.replace(
			regExp,
			match => '<strong>' + match + '</strong>'
		);
	}

	goProductPage() {
		this.searchTerm = '';
		this.suggestions = [];
		var inputElement: any = document.querySelector('.header-search .form-control');
		inputElement.value = "";
		this.closeSearchForm();
	}

	searchToggle(e: Event) {
		document.querySelector('.header-search').classList.toggle('show');
		e.stopPropagation();
	}

	showSearchForm(e: Event) {
		document
			.querySelector('.header .header-search')
			.classList.add('show');
		e.stopPropagation();
	}

	closeSearchForm() {
		document
			.querySelector('.header .header-search')
			.classList.remove('show');
	}

	submitSearchForm(e: Event) {
		e.preventDefault();
		this.router.navigate(['/shop/sidebar/3cols'], { queryParams: { searchTerm: this.searchTerm, category: this.cat } });
	}

	onCatSelect(event: any) {
		this.cat = event.currentTarget.value;
		this.fetchProducts();
	}
}
