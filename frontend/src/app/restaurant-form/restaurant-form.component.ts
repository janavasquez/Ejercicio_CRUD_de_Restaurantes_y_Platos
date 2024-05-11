import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './restaurant-form.component.html',
  styleUrl: './restaurant-form.component.css'
})
export class RestaurantFormComponent implements OnInit {

  restaurant: Restaurant[] = [];

  restaurantForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    webUrl: new FormControl(''),
    priceLevel: new FormControl('')
  });

  isUpdate: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(!id) return;
      this.httpClient.get<Restaurant[]>('http://localhost:3000/restaurant/' + id)
      .subscribe(restaurant => this.restaurant = restaurant);
    });
  }
  save(): void {

    const restaurant: Restaurant = {
      id: this.restaurantForm.get('id')?.value ?? 0,
      title: this.restaurantForm.get('title')?.value ?? '',
      address: this.restaurantForm.get('address')?.value ?? '',
      phone: this.restaurantForm.get('phone')?.value ?? '',
      email: this.restaurantForm.get('email')?.value ?? '',
      webUrl: this.restaurantForm.get('webUrl')?.value ?? '',
      priceLevel: this.restaurantForm.get('priceLevel')?.value ?? ''
    };
    if(this.isUpdate) {
      const urlForUpdate = 'http://localhost:3000/restaurant/' + restaurant.id;
      this.httpClient.put<Restaurant>(urlForUpdate, restaurant).subscribe(data => this.router.navigate(['/']));
    } else {
      const url = 'http://localhost:3000/restaurant';
      this.httpClient.post<Restaurant>(url, restaurant).subscribe(data => this.router.navigate(['/']));
    }

  }

}
