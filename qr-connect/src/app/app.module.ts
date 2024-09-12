import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OAuthModule } from 'angular-oauth2-oidc';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ListaComponent } from './user/lista/lista.component';
import { DetailComponent } from './user/detail/detail.component';
import { UpdateComponent } from './user/update/update.component';
import { DeleteComponent } from './user/delete/delete.component';
import { CreateComponent } from './user/create/create.component';
// import { ListaComponent } from './foo/lista/lista.component';
// import { DetailComponent } from './foo/detail/detail.component';
// import { CreateComponent } from './foo/create/create.component';
// import { UpdateComponent } from './foo/update/update.component';
// import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    HomeComponent,
    MenuComponent,
    ListaComponent,
    DetailComponent,
    UpdateComponent,
    DeleteComponent,
    CreateComponent,
    // ListaComponent,
    // DetailComponent,
    // CreateComponent,
    // UpdateComponent,
    // SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,MatToolbarModule,MatDividerModule,MatListModule,MatGridListModule,MatButtonModule,
    MatFormFieldModule,MatInputModule, MatIconModule,MatSelectModule,BrowserAnimationsModule,
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: ['http://localhost:8080/foo'],
          sendAccessToken: true
      }
  })
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
