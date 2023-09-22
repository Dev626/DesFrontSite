import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlModule } from 'ngx-owl-carousel';

import { SharedModule } from '../../shared/shared.module';

import { IndexComponent } from './index/index.component';
import { BlogCollectionComponent } from './blog-collection/blog-collection.component';
import { DealCollectionComponent } from './deal-collection/deal-collection.component';
import { ElectronicsCollectionComponent } from './electronics-collection/electronics-collection.component';
import { FurnitureCollectionComponent } from './furniture-collection/furniture-collection.component';
import { ClothingCollectionComponent } from './clothing-collection/clothing-collection.component';

@NgModule({
	declarations: [
		IndexComponent,
		BlogCollectionComponent,
		DealCollectionComponent,
		ElectronicsCollectionComponent,
		FurnitureCollectionComponent,
		ClothingCollectionComponent
	],

	imports: [
		CommonModule,
		RouterModule,
		NgbModule,
		OwlModule,
		SharedModule
	]
})

export class HomeModule { }
