import { Routes } from '@angular/router';
import { AhorcadoComponent } from '../ahorcado/ahorcado.component';
import { PreguntadosComponent } from '../preguntados/preguntados.component';
import { MayormenorComponent } from '../mayormenor/mayormenor.component';

const routes: Routes = [
  { path: 'ahorcado', component: AhorcadoComponent }, 
  { path: 'mayormenor', component: MayormenorComponent },
  { path: 'preguntados', component: PreguntadosComponent }, 
];

export { routes };