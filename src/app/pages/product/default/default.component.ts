import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '@service/api.service';
import { Product } from '@classe/product';

import { Observable, combineLatest } from 'rxjs';

@Component({
	selector: 'product-default-page',
	templateUrl: './default.component.html',
	styleUrls: ['./default.component.scss']
})

export class DefaultPageComponent implements OnInit {

	product: Product;
	prev: Product;
	next: Product;
	related = [];
	loaded = false;

	constructor(
		public apiService: ApiService,
		private activeRoute: ActivatedRoute,
		public router: Router
	) {
    activeRoute.params.subscribe(params => {
      this.loaded = false;
      // desstoreProductSubcategoryList
      const data_1$: Observable<any> = this.apiService.desstoreProductSubcategoryList({
        tienda_id: this.apiService.getStorage({ key: 'tienda_id' }),
        tienda_producto_id: params.slug,
        estado: 20253
      });
      // desstoreProducVariantsList
      const data_2$: Observable<any> = this.apiService.desstoreProducVariantsList({
        store_product_id: params.slug,
        indicador_stock: 1
      })

      combineLatest(data_1$, data_2$, (desstoreProductSubcategoryList, desstoreProducVariantsList) => ({ desstoreProductSubcategoryList, desstoreProducVariantsList })).subscribe(response => {
        if (response.desstoreProductSubcategoryList.result[1].length == 0) {
          this.router.navigate(['/pages/404']);
        }

        let db_variants = response.desstoreProducVariantsList.result[1];
        let db_product = response.desstoreProductSubcategoryList.result[1][0];
        let variants = [];
        db_variants.forEach((value, index, array) => {
          variants.push({
            color: '#' +JSON.parse(value.colour_data)[0],
            color_name: value.catalogo_colour,
            price: value.price || db_product.price,
            size: [{
              name: value.catalogo_size
            }]
          })
        });
        this.product = {
          id: db_product.id,
          sku: db_product.sku,
          name: db_product.name,
          short_desc: db_product.short_desc,
          description: db_product.descripcion ? db_product.descripcion : db_product.short_desc,
          addtional_info: db_product.addtional_info,
          shipp_returns: db_product.shipp_returns,
          price: db_product.price,
          slug: db_product.id,
          review: 2,
          ratings: 4,
          until: null,
          stock: db_product.stock,
          category: [{
            slug: db_product.store_subcategory_id,
            name: db_product.store_subcategory,
          }],
          pictures: [{
            width: 800,
            height: 800,
            url: db_product.thumbnail_url
          }],
          sm_pictures: [{
            width: 300,
            height: 300,
            url: db_product.thumbnail_url
          }],
          variants: variants,
          featured: true,
          top: null,
          new: null,
        }
        this.loaded = true;
      });
    });
  }

	ngOnInit(): void {
	}
}
