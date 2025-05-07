import { Routes } from '@angular/router';
import { JuegosComponent } from './pages/juegos/juegos.component';
import { estaLogueadoGuard } from './guards/esta-logueado.guard';
//import { HomeComponent } from './pages/home/home.component';
// import { LoginComponent } from './pages/login/login.component';
// import { QuiensoyComponent } from './pages/quiensoy/quiensoy.component';
// import { RegistroComponent } from './pages/registro/registro.component';
// import { ChatComponent } from './pages/chat/chat.component';
// import { AhorcadoComponent } from './pages/ahorcado/ahorcado.component';
// import { MayormenorComponent } from './pages/mayormenor/mayormenor.component';
// import { PreguntadosComponent } from './pages/preguntados/preguntados.component';

export const routes: Routes = [
{
    title: "Sala de Juegos",
    path: '', 
    //component: HomeComponent
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    //canActivate: [estaLogueadoGuard]
},
{
    title: "Crear Cuenta",
    path: "registro", 
    //component: RegistroComponent
    loadComponent: () => import('./pages/registro/registro.component').then(m => m.RegistroComponent)
},
{
    title: "Iniciar Sesión",
    path: "login", 
    //component: LoginComponent
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
},
{
    title: "Quién Soy",
    path: "quiensoy", 
    //component: QuiensoyComponent
    loadComponent: () => import('./pages/quiensoy/quiensoy.component').then(m => m.QuiensoyComponent)
},
{
    title: "Juegos",
    path: "juegos",
    component: JuegosComponent,
    loadChildren: () => import("./pages/juegos/juegos.routes").then((m) => m.routes),
    canActivate: [estaLogueadoGuard],
    // children: [
    //     { title: "Ahorcado", path: "ahorcado", component: AhorcadoComponent },
    //     { title: "Mayor O Menor", path: "mayormenor", component: MayormenorComponent },
    //     { title: "Preguntados", path: "preguntados", component: PreguntadosComponent }
    // ]
},
// {
//     path: "ahorcado", component: AhorcadoComponent
// },
// {
//     path: "mayormenor", component: MayormenorComponent
// },
{
    title: "Sala de Chat",
    path: "chat", 
    //component: ChatComponent
    loadComponent: () => import('./pages/chat/chat.component').then(m => m.ChatComponent),
    canActivate: [estaLogueadoGuard]
}
];
