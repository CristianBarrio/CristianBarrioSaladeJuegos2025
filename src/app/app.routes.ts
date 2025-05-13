import { Routes } from '@angular/router';
import { JuegosComponent } from './pages/juegos/juegos.component';
import { estaLogueadoGuard } from './guards/esta-logueado.guard';

export const routes: Routes = [
{
    title: "Sala de Juegos",
    path: '', 
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    //canActivate: [estaLogueadoGuard]
},
{
    title: "Crear Cuenta",
    path: "registro", 
    loadComponent: () => import('./pages/registro/registro.component').then(m => m.RegistroComponent)
},
{
    title: "Iniciar Sesión",
    path: "login", 
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
},
{
    title: "Quién Soy",
    path: "quiensoy", 
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
{
    title: "Sala de Chat",
    path: "chat", 
    loadComponent: () => import('./pages/chat/chat.component').then(m => m.ChatComponent),
    canActivate: [estaLogueadoGuard]
},
{
    title: "Resultados",
    path: "resultados",
    loadComponent: () => import('./pages/resultados/resultados.component').then(m => m.ResultadosComponent),
    canActivate: [estaLogueadoGuard]
}
];
