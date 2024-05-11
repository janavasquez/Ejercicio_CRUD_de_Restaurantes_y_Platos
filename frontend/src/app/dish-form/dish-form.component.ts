import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Dish } from '../interfaces/dish.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dish-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.css'
})
export class DishFormComponent implements OnInit{

  dish: Dish[] = [];

  dishForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl('')
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
      this.httpClient.get<Dish[]>('http://localhost:3000/dish/' + id)
      .subscribe(dish => this.dish = dish);
    });
  }
  save(): void {

    const dish: Dish = {
      id: this.dishForm.get('id')?.value ?? 0,
      title: this.dishForm.get('title')?.value ?? '',
      description: this.dishForm.get('description')?.value ?? '',
      price: this.dishForm.get('price')?.value ?? ''
    };
    if(this.isUpdate) {
      const urlForUpdate = 'http://localhost:3000/dish/' + dish.id;
      this.httpClient.put<Dish>(urlForUpdate, dish).subscribe(data => this.router.navigate(['/']));
    } else {
      const url = 'http://localhost:3000/restaurant';
      this.httpClient.post<Dish>(url, dish).subscribe(data => this.router.navigate(['/']));
    }

  }

}
