import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class MenulistService {

  baseUrl = 'https://mo-manzer.herokuapp.com/'

  constructor(
    public http: HttpClient
  ) { }

  getPizzaProducts() {
    return this.http['get'](`${this.baseUrl}pizzaProducts`);
  }

  getBurgerProducts() {
    return this.http['get'](`${this.baseUrl}burgerProducts`);
  }

  getDessertsProducts() {
    return this.http['get'](`${this.baseUrl}dessertsProducts`);
  }

  getSnacksProducts() {
    return this.http['get'](`${this.baseUrl}snacksProducts`);
  }

  getDrinksProducts() {
    return this.http['get'](`${this.baseUrl}drinksProducts`);
  }

  getProduct(id: string) {
    return this.http['get'](`${this.baseUrl}allproducts/${id}`);
  }

  AddNewCustomer(customer: Customer) {
    return this.http['post'](`${this.baseUrl}customer`, customer);
  }

  getCustomer(id: string){
    return this.http['get'](`${this.baseUrl}customer/${id}`);
  }


}
