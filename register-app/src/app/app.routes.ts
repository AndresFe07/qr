import { Routes,RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { UserFormComponent } from './user-form/user-form.component'; // Ajusta la ruta según sea necesario


  export const routes: Routes = [
  { path: '', component: UserFormComponent }, // Redirige la ruta base al formulario
  { path: '**', redirectTo: '' } // Redirige cualquier ruta desconocida al formulario
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }