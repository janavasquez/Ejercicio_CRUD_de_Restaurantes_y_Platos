import { Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { DishFormComponent } from './dish-form/dish-form.component';

export const routes: Routes = [
  {
    path: 'restaurant',
    component: RestaurantListComponent
  },
  {
    path: 'restaurant/:id',
    component: RestaurantDetailComponent
  },
  {
    path: 'restaurant/new',
    component: RestaurantFormComponent
  },
  {
    path: 'restaurant/:id/edit',
    component: RestaurantFormComponent
  },
  {
    path: 'dish/:id',
    component: DishDetailComponent
  },
  {
    path: 'dish/new',
    component: DishFormComponent
  },
  {
    path: 'dish/:id/edit',
    component: DishFormComponent
  }
];
