import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class CachingService {

  constructor() { }

  public async get<T>(key: CacheKey): Promise<T> {
    const keys = await Storage.keys();

    if(keys.keys.includes(key)){
      const result = await Storage.get({ key: key });
      const value = result.value;
      return JSON.parse(value) as T;
    }
    return null;
  }

  public async set(key: CacheKey, value: object) {
    const jsonValue = JSON.stringify(value);
    await Storage.set({ key: key, value: jsonValue});
  }

  public async remove(key: CacheKey) {
    await Storage.remove({ key });
  }
}

export enum CacheKey {
  PizzaProducts = 'pizzaProducts',
  BurgerProducts = 'burgerProducts',
  DessertsProducts = 'dessertsProducts',
  SnacksProducts = 'snacksProducts',
  DrinksProducts = 'drinksProducts',
  AllProducts = 'allproducts',
  Customer = 'customer'
}
