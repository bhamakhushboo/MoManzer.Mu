import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  // {
  //   path: 'location-tab',
  //   loadChildren: () => import('./location-tab/location-tab.module').then( m => m.LocationTabPageModule)
  // },
  {
    path: 'menu-tab',
    loadChildren: () => import('./pages/menu-tab/menu-tab.module').then( m => m.MenuTabPageModule)
  },

  {
    path: 'menu-tab',
    children: [
      {path:'', loadChildren: () => import('./pages/menu-tab/menu-tab.module').then( m => m.MenuTabPageModule)},
      {path:':id', loadChildren: () => import('src/app/pages/view-product/view-product.module').then( m => m.ViewProductPageModule) }
    ]
  },

    // {
    //   path: 'view-product',
    //   loadChildren: () => import('./menu-tab/view-product/view-product.module').then( m => m.ViewProductPageModule)
    // },

  {
    path: 'cart-tab',
    loadChildren: () => import('./pages/cart-tab/cart-tab.module').then( m => m.CartTabPageModule)
  },
  {
    path: 'profile-tab',
    loadChildren: () => import('./pages/profile-tab/profile-tab.module').then( m => m.ProfileTabPageModule)
  },
  {
    path: 'view-product',
    loadChildren: () => import('./pages/view-product/view-product.module').then( m => m.ViewProductPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
