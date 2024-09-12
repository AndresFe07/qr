// import { SignupGuard } from './guards/signup.guard';
// import { FooGuard } from './guards/foo.guard';
// import { SignupComponent } from './signup/signup.component';
// import { CreateComponent } from './foo/create/create.component';
// import { UpdateComponent } from './foo/update/update.component';
// import { DetailComponent } from './foo/detail/detail.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './user/lista/lista.component';
import { DetailComponent } from './user/detail/detail.component';
import { UpdateComponent } from './user/update/update.component';
import { DeleteComponent } from './user/delete/delete.component';
import { UserGuard } from './guards/user.guard';
import { CreateComponent } from './user/create/create.component';


const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'lista', component: ListaComponent, canActivate: [UserGuard], data: {requiredRoles: ['admin', 'user']}},
  {path: 'detail/:id', component: DetailComponent, canActivate: [UserGuard], data: {requiredRoles: ['admin','user']}},
  {path: 'update/:id', component: UpdateComponent, canActivate: [UserGuard], data: {requiredRoles: ['admin']}},
  {path: 'delete/:id', component: DeleteComponent, canActivate: [UserGuard], data: {requiredRoles: ['admin']}},
  {path: 'create', component: CreateComponent, canActivate: [UserGuard], data: {requiredRoles: ['admin']}},
  // {path: 'signup', component: SignupComponent, canActivate: [SignupGuard]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
