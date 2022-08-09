import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { CacheKey, CachingService } from 'src/app/services/caching.service';
import { filter } from 'rxjs/operators';
import { MenulistService } from 'src/app/services/menulist.service';
import { ProfileTabPage } from '../profile-tab/profile-tab.page';
import { IonButton } from '@ionic/angular';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  providers: [ProfileTabPage],
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {
  public menu: Menu;
  product = [];
  public btn_txt: string;
  public add_btn: IonButton;
  public logincomponent: LoginComponent;
  public loggedIn: boolean;

  variants = [
    {
      name: 'Size',
      childVariants: [
        {
          name: 'Half',
          pirce: 0,
        },
        {
          name: 'Medium',
          price: 10,
        },
        {
          name: 'Large',
          price: 15,
        },
      ],
    },
    {
      name: 'Masala',
      childVariants: [
        { name: 'Chaat Masala', price: 5 },
        { name: 'Paan Masala', price: 7 },
        { name: 'Paneer Masala', price: 4 },
        { name: 'Teekha Masala', price: 3 },
      ],
    },
    {
      name: 'Chutney',
      childVariants: [
        { name: 'Tomato chutney', price: 11 },
        { name: 'Peanut chutney', price: 5.6 },
        { name: 'Guava chutney', price: 4.5 },
        { name: 'Chilli chutney', price: 5 },
      ],
    },
  ];
  addOns = [
    { name: 'Boondi raita', price: 3 },
    { name: 'Mango lassi', price: 5 },
    { name: 'Masala papad', price: 2 },
    { name: 'French fries', price: 10 },
    { name: 'Coriander chutney', price: 5 },
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private cachingService: CachingService,
    private menulistservice: MenulistService,
    public profile: ProfileTabPage,
    public appcomponent: AppComponent
  ) {
    if (this.appcomponent.loggedIn) {
      this.btn_txt = 'Add to Cart';
      this.loggedIn = true;
    } else {
      this.btn_txt = 'Login to add to Cart';
      this.loggedIn = false;
    }
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (paramMap) => {
      if (paramMap.has('id')) {
        this.menulistservice
          .getProduct(paramMap.get('id'))
          .subscribe((result) => {
            const resultproduct = result as Menu[];
            this.cachingService.set(CacheKey.AllProducts, resultproduct);
            this.product = resultproduct;
          });
      }
    });
  }
}
