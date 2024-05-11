import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Dish } from '../interfaces/dish.model';
import { Restaurant } from '../interfaces/restaurant.model';

@Component({
  selector: 'app-dish-detail',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './dish-detail.component.html',
  styleUrl: './dish-detail.component.css'
})
export class DishDetailComponent {

  dish: Dish[] = [];
  restaurant: Restaurant[] = [];

  constructor(private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(!id) {
        return;
      }

      this.httpClient.get<Dish[]>('http://localhost:3000/dish/' + id)
      .subscribe(dish => this.dish = dish);

      this.httpClient.get<Restaurant[]>('http://localhost:3000/restaurant/' + id)
      .subscribe(restaurant => this.restaurant = restaurant);

    });
  }

}
