import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'sign-up-page' , loadComponent: ()=> import('./features/auth/components/sign-up-form/sign-up-form.component').then(m=>m.SignUpFormComponent) },
    {path: 'sign-in-page' , loadComponent: ()=> import('./features/auth/components/sign-in-form/sign-in-form.component').then(m=>m.SignInFormComponent)},
    {path: 'shop' , loadComponent : ()=> import('./features/products/pages/products-page/products-page.component').then(m=>m.ProductsPageComponent)}
];
