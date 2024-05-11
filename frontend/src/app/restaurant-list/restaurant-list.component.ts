import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Restaurant } from '../interfaces/restaurant.model';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.css'
})
export class RestaurantListComponent implements OnInit {

  restaurants: Restaurant[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    const url = 'http://localhost:3000/restaurants';
    this.httpClient.get<Restaurant[]>(url)
    .subscribe(restaurants => this.restaurants = restaurants);
  }

}
