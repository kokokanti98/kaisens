import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Afin d'utiliser le ngModel
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Nous permettra d'enregistrer une nouvelle langue. Vient du paquet angular/common
import { registerLocaleData } from '@angular/common';
// Importer la langue francaise
import localeFr from '@angular/common/locales/fr';
// importer HttpClientModule du paquet angular/common/http pour utiliser HttpClient
import { HttpClientModule } from '@angular/common/http';
// Pour utiliser le routage
import { RouterModule } from '@angular/router';
// Pour utiliser l'api d'Angular
import  { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';



// On va appeller puis en passant par paramètre la langue et son abbréviation dans le code
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // Pour utiliser les FormGroup et autres
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      // Redirection vers page de connexion via '/login'
      { path: 'login', component: LoginComponent },
      // Redirection vers page des articles via '/articles/:id' dont id le numero id de l'utilisateur
      { path: 'articles/:id', component: ArticlesComponent },
      // Redirection vers page des articles via '/articles'
      { path: 'articles', component: ArticlesComponent },
      // Redirection vers login quand on accède au serveur
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      // Pour redirection sur les pages en cas de 404 vers login
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
