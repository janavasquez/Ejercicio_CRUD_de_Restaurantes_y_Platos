import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Dish } from '../interfaces/dish.model';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.css'
})
export class RestaurantDetailComponent implements OnInit{

  restaurants: Restaurant[] = [];
  dish: Dish[] = [];

  constructor(private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(!id) {
        return;
      }

      this.httpClient.get<Restaurant[]>('http://localhost:3000/restaurant/' + id)
      .subscribe(restaurants => this.restaurants = restaurants);

      this.httpClient.get<Dish[]>('http://localhost:3000/dish/' + id)
      .subscribe(dish => this.dish = dish);

    });
  }

}
