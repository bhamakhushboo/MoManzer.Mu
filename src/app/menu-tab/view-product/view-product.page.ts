import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CacheKey, CachingService } from 'src/app/services/caching.service';
import { MenulistService } from 'src/app/services/menulist.service';
import { Menu } from 'src/app/interfaces/menu';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {

  public menu: Menu;

  variants = [
    {
      name: 'Size',
      childVariants: [
        {
          name: "Half",
          pirce: 0
        },
        {
          name: "Medium",
          price: 10
        },
        {
          name: "Large",
          price: 15
        }
      ]
    },
    { name:  'Masala',
    childVariants: [
     { name:'Chaat Masala', price: 5 },  { name:'Paan Masala', price: 7 },
     { name:'Paneer Masala', price: 4 }, { name:'Teekha Masala', price: 3 }
    ]
  },
  { name:  'Chutney',
    childVariants: [
     { name:'Tomato chutney', price: 11 },  { name:'Peanut chutney', price: 5.6 },
     { name:'Guava chutney', price: 4.5 }, { name:'Chilli chutney', price: 5 }
    ]
  }
  ];
  addOns = [
    {name: 'Boondi raita', price: 3 }, {name: 'Mango lassi', price: 5 },
    {name: 'Masala papad', price: 2 }, {name: 'French fries', price: 10 }, {name: 'Coriander chutney', price: 5 }
  ];
  constructor(private activatedRoute: ActivatedRoute,
    private cachingService: CachingService,
    private menulistService: MenulistService
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async paramMap => {
      console.log(paramMap.get('id'));
    })
  }

}
