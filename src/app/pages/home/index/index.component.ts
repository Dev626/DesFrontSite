import { Component, OnInit } from '@angular/core';

import { ModalService } from '@service/modal.service';
import { UtilsService } from '@service/utils.service';
import { ApiService } from '@service/api.service';
import { Product } from '@classe/product';

import { Observable, combineLatest } from 'rxjs';
import { introSlider, brandSlider } from '../data';

@Component({
  selector: 'molla-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {

  products: Product[] = [];
  posts = [];
  banners = [];
  hiddenSlider = true;
  loaded = false;
  introSlider = introSlider;
  brandSlider = brandSlider;

  constructor(public apiService: ApiService, public utilsService: UtilsService, private modalService: ModalService,) {
    this.modalService.openNewsletter();

    // this.apiService.fetchHomeData().subscribe(result => {
    //   this.products = result.products;
    //   this.posts = result.blogs;
    //   this.loaded = true;
    // })
  }

  ngOnInit(): void {
    // desbannerList
    const data_1$: Observable<any> = this.apiService.desbannerList({
      tienda_id: this.apiService.getStorage({ key: 'tienda_id' }),
      active: 1,
    });
    // destiendaProductoListar
    const data_2$: Observable<any> = this.apiService.desstoreProductSubcategoryList({
      tienda_id: this.apiService.getStorage({ key: 'tienda_id' }),
      estado: 20253
    })
    combineLatest(data_1$, data_2$, (desbannerList, destiendaProductoListar) => ({ desbannerList, destiendaProductoListar })).subscribe(response => {
      this.banners = response.desbannerList.result[1]
      this.hiddenSlider = false;
      let db_products = response.destiendaProductoListar.result[1];
      db_products.forEach((value, index, array) => {
        this.products.push({
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
        this.loaded = true;
      })
    })
  }
}
