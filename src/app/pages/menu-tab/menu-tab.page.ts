import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { CacheKey, CachingService } from 'src/app/services/caching.service';
import { filter } from 'rxjs/operators';
import { MenulistService } from 'src/app/services/menulist.service';

@Component({
  selector: 'app-menu-tab',
  templateUrl: './menu-tab.page.html',
  styleUrls: ['./menu-tab.page.scss'],
})
export class MenuTabPage implements OnInit {
  public menuList: Menu[];
  public PizzaList: Menu[];
  public BurgerList: Menu[];
  public DessertsList: Menu[];
  public SnacksList: Menu[];
  public DrinksList: Menu[];
  public showFilteredList = false;

  selectedCategory: string = 'PIZZA';
  categories: string[] = ['PIZZA', 'BURGER', 'DESSERTS', 'SNACKS', 'DRINKS'];

  viewProducts = [];
  constructor(
    private cachingService: CachingService,
    private menulistService: MenulistService,
    private router: Router
  ) {}

  ngOnInit() {

    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(async () => {
      await this.getpizzaProducts();
      await this.getburgerProducts();
      await this.getdessertsProducts();
      await this.getsnacksProducts();
      await this.getdrinksProducts();
      this.viewProducts = this.PizzaList;
    });
  }

  onCategoryTabChange(event) {

    if (event.detail.value == 'PIZZA') {
      this.viewProducts = this.PizzaList;
    }
    else if(event.detail.value == 'BURGER'){
      this.viewProducts =  this.BurgerList;
    }
    else if(event.detail.value == 'DESSERTS'){
      this.viewProducts =  this.DessertsList;
    }
    else if(event.detail.value == 'SNACKS'){
      this.viewProducts =  this.SnacksList;
    }
    else if(event.detail.value == 'DRINKS'){
      this.viewProducts =  this.DrinksList;
    }
  }

  public async getpizzaProducts() {
    const pizzaproducts = await this.cachingService.get<Menu[]>(
      CacheKey.PizzaProducts
    );
    if (pizzaproducts) {
      this.PizzaList = this.showFilteredList
        ? pizzaproducts.filter((d) => !d.isAvailable)
        : pizzaproducts;
    }

    this.menulistService.getPizzaProducts().subscribe((result) => {
      const allMenu = result as Menu[];
      this.cachingService.set(CacheKey.PizzaProducts, allMenu);
      this.PizzaList = this.showFilteredList
        ? allMenu.filter((d) => !d.isAvailable)
        : allMenu;
    });
  }

  public async getburgerProducts() {
    const burgerproducts = await this.cachingService.get<Menu[]>(
      CacheKey.BurgerProducts
    );
    if (burgerproducts) {
      this.BurgerList = this.showFilteredList
        ? burgerproducts.filter((d) => !d.isAvailable)
        : burgerproducts;
    }

    this.menulistService.getBurgerProducts().subscribe((result) => {
      const allMenu = result as Menu[];
      this.cachingService.set(CacheKey.BurgerProducts, allMenu);
      this.BurgerList = this.showFilteredList
        ? allMenu.filter((d) => !d.isAvailable)
        : allMenu;
    });
  }

  public async getdessertsProducts() {
    const dessertsproducts = await this.cachingService.get<Menu[]>(
      CacheKey.DessertsProducts
    );
    if (dessertsproducts) {
      this.DessertsList = this.showFilteredList
        ? dessertsproducts.filter((d) => !d.isAvailable)
        : dessertsproducts;
    }

    this.menulistService.getDessertsProducts().subscribe((result) => {
      const allMenu = result as Menu[];
      this.cachingService.set(CacheKey.DessertsProducts, allMenu);
      this.DessertsList = this.showFilteredList
        ? allMenu.filter((d) => !d.isAvailable)
        : allMenu;
    });
  }

  public async getsnacksProducts() {
    const snacksproducts = await this.cachingService.get<Menu[]>(
      CacheKey.SnacksProducts
    );
    if (snacksproducts) {
      this.SnacksList = this.showFilteredList
        ? snacksproducts.filter((d) => !d.isAvailable)
        : snacksproducts;
    }

    this.menulistService.getSnacksProducts().subscribe((result) => {
      const allMenu = result as Menu[];
      this.cachingService.set(CacheKey.SnacksProducts, allMenu);
      this.SnacksList = this.showFilteredList
        ? allMenu.filter((d) => !d.isAvailable)
        : allMenu;
    });
  }

  public async getdrinksProducts() {
    const drinksproducts = await this.cachingService.get<Menu[]>(
      CacheKey.DrinksProducts
    );
    if (drinksproducts) {
      this.DrinksList = this.showFilteredList
        ? drinksproducts.filter((d) => !d.isAvailable)
        : drinksproducts;
    }

    this.menulistService.getDrinksProducts().subscribe((result) => {
      const allMenu = result as Menu[];
      this.cachingService.set(CacheKey.DrinksProducts, allMenu);
      this.DrinksList = this.showFilteredList
        ? allMenu.filter((d) => !d.isAvailable)
        : allMenu;
    });
  }

  onProductClick(id) {
    this.router.navigate([`/menu-tab/view-product/` + id]);
  }
}
