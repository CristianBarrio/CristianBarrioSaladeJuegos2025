import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { QuiensoyComponent } from './pages/quiensoy/quiensoy.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado.component';
import { MayormenorComponent } from './pages/mayormenor/mayormenor.component';
import { ChatComponent } from './pages/chat/chat.component';

export const routes: Routes = [{
    path: "login", component: LoginComponent},
  {
     path: "registro", component: RegistroComponent
 },
    {path: "", component: HomeComponent
},{
    path: "quiensoy", component: QuiensoyComponent
},{
    path: "ahorcado", component: AhorcadoComponent
},{
    path: "mayormenor", component: MayormenorComponent
},{
    path: "chat", component: ChatComponent
}
    ];
