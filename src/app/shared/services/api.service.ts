import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { WINDOW } from '../../window.providers';
@Injectable({
	providedIn: 'root'
})

export class ApiService {

  moduleBack = 'ovnDES/module/des';

	constructor(@Inject(WINDOW) private window: Window, private http: HttpClient) {
  }

  /**
   * Get Hostname
   */
  getHostname(): string {
    return this.window.location.hostname;
  }

  /**
   * Manage data by localstorage
   */
  public setStorage(input: {
    key: string,
    value: any
  }) {
    input.value = (typeof input.value == 'object' ? JSON.stringify(input.value) : String(input.value))
    localStorage.setItem(input.key, input.value);
  }
  public getStorage(input: {
    key: string
  }): any {
    let value = localStorage.getItem(input.key);
    value = this.isJsonString(value) ? JSON.parse(value) : value
    return value || false;
  }
  public isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
  /**
   * For any request
   */
  public callRequest(input: {
    module: string,
    payload: any
  }): Observable<any> {
    return this.http.post(`${environment.SERVER_BACK_URL}/${this.moduleBack}/${input.module}`, { "DES": { "F": input.payload } });
  }
  /**
   * Get Web Store Info Init
   */
  public deswebStoreInit(fields: {
    virtual_store_domain?: string
  }): Observable<any> {
    return this.callRequest({
      module: 'DESPrincipalWebServiceImp/deswebStoreInit',
      payload: fields
    });
  }

  /**
   * Get Web Store Info
   */
  public deswebStoreGetInfo(fields: {
    tienda_id?: number
  }): Observable<any> {
    return this.callRequest({
      module: 'DESPrincipalWebServiceImp/deswebStoreGetInfo',
      payload: fields
    });
  }

  /**
   * Get Web Store Social Network
   */
  public desstoreSocialNetworkList(fields: {
    tienda_id?: number
  }): Observable<any> {
    return this.callRequest({
      module: 'DESSocialNetworkServiceImp/desstoreSocialNetworkList',
      payload: fields
    });
  }

  /**
   * Get Web Store Categories
   */
  public desstoreSubcategoryList(fields: {
    store_subcategory_id?: number, // INT,
    store_id?: number, // INT,
    name?: string, // VRCHAR(100),
    active?: boolean, // BIT,
    user_registration_id?: number, // NUMERIC,
    registration_date_from?: string, // DATETIME,
    registration_date_to?: string, // DATETIME,
    use_modification_id?: number, // NUMERIC,
    modification_date_from?: string, // DATETIME,
    modification_date_to?: string, // DATETIME,
    pf_page?: number, // INT,
    pf_size?: number, // INT
  }): Observable<any> {
    return this.callRequest({
      module: 'DESSubCategoriaServiceImp/desstoreSubcategoryList',
      payload: fields
    });
  }

  /**
   * Get Web Store Products
   */
  public desstoreProductSubcategoryList(fields: {
    tienda_producto_id?: number,
    tienda_id?: number,
    store_subcategory_id?: number,
    categoria_producto_id?: number,
    nombre?: string,
    descripcion?: string,
    precio_min?: number,
    precio_max?: number,
    estado?: number,
    fecha_registro_min?: string,
    fecha_registro_max?: string,
    catalogo_id?: number,
    fecha_modificacion_min?: string,
    fecha_modificacion_max?: string,
    page?: number,
    size?: number
  }): Observable<any> {
    return this.callRequest({
      module: 'DESTiendaProductoWebServiceImp/desstoreProductSubcategoryList',
      payload: fields
    });
  }

  /**
   * Get Web Store Products
   */
  public desstoreProducVariantsList(fields: {
    store_product_variant_id?: number,
    store_product_id?: number,
    tienda_id?: number,
    store_subcategory_id?: number,
    size_id?: number,
    colour_id?: number,
    indicador_stock?: number,
    user_registration_id?: number,
    registration_date_from?: string,
    registration_date_to?: string,
    user_modification_id?: number,
    modification_date_from?: string,
    modification_date_to?: string,
    pf_page?: number,
    pf_size?: number,

  }): Observable<any> {
    return this.callRequest({
      module: 'DESProductVariantServiceImp/desstoreProductVariantList',
      payload: fields
    });
  }

  /**
   * Get Web Banners
   */
  public desbannerList(fields: {
    tienda_id?: number,
    active?: number,
  }): Observable<any> {
    return this.callRequest({
      module: 'DESBannerWebServiceImp/desbannerList',
      payload: fields
    });
  }

  /**
   * Get Web Products
   */

  /**
   * Get Products
   */
  public fetchShopData(params: any, perPage: number, initial = 'shop'): Observable<any> {
    let temp = initial;
    if (!initial.includes('?')) {
      temp += '?';
    }

    for (let key in params) {
      temp += key + '=' + params[key] + '&';
    }

    if (!params.page) {
      temp += 'page=1';
    }

    if (!params.perPage) {
      temp += '&perPage=' + perPage;
    }

    temp += '&demo=' + environment.demo;

    return this.http.get(`${environment.SERVER_URL}/${temp}`);
  }

	/**
	 * Get Products
	 */
	public fetchBlogData(params: any, initial = 'blogs/classic', perPage: number,): Observable<any> {
		let temp = initial;
		if (!initial.includes('?')) {
			temp += '?';
		}

		for (let key in params) {
			temp += key + '=' + params[key] + '&';
		}

		if (!params.page) {
			temp += 'page=1';
		}

		if (!params.perPage) {
			temp += '&perPage=' + perPage;
		}

		return this.http.get(`${environment.SERVER_URL}/${temp}`);
	}

	/**
	 * Get Products
	 */
	public fetchSinglePost(slug: string): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/${'single/' + slug + '?demo=' + environment.demo}`);
	}

	/**
	 * Get Products for home page
	 */
	public fetchHomeData(): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/${environment.demo}`);
	}

	/**
	 * Get products by demo
	 */
	public getSingleProduct(slug: string, isQuickView = false): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/product/${slug}?demo=${environment.demo}&isQuickView=${isQuickView}`);
	}

	/**
	 * Get Products
	 */
	public fetchHeaderSearchData(searchTerm: string, cat = null): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/shop?perPage=5&searchTerm=${searchTerm}&category=${cat}&demo=${environment.demo}`);
	}

	/**
	 * Get Element Products
	 */
	public fetchElementData(): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/elements/products`);
	}

	/**
	 * Get Element Blog
	 */
	public fetchElementBlog(): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/elements/blogs`);
	}
}
