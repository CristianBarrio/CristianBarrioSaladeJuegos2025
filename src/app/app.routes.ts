import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { QuiensoyComponent } from './pages/quiensoy/quiensoy.component';

export const routes: Routes = [{
    path: "login", component: LoginComponent},
// }, {
//     path: "registro", component: RegistroComponent
// },{
    {path: "", component: HomeComponent
},{
    path: "quiensoy", component: QuiensoyComponent
}];
