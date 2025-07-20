import { Routes } from '@angular/router';
import { SignUpFormComponent } from './features/auth/components/sign-up-form/sign-up-form.component';

export const routes: Routes = [
    {path:'sign-up-page' , loadComponent: ()=> import('./features/auth/components/sign-up-form/sign-up-form.component').then(m=>m.SignUpFormComponent) },
    {path: 'sign-in-page' , loadComponent: ()=> import('./features/auth/components/sign-in-form/sign-in-form.component').then(m=>m.SignInFormComponent)}
];
