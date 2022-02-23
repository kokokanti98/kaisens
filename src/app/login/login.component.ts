import { Component, OnInit } from '@angular/core';
// Importer du module qu'on a besoin pour le formulaire
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsers } from './users';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
// Error login message
  public ErrorLoginMsg: string|null;
// Les utilisateurs
  public users: IUsers[] = [];
// Formulaire de login
  public loginForm: FormGroup;
// Constructeur
  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) { }
// Cycle de vie OnInit ou se déclenche au chargement du component
  ngOnInit(): void {
  // Création du formulaire
    this.loginForm = this.fb.group({
      email: ['kokokantisambatra@gmail.com', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150)]
      ],
      password: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150)]
      ]
    });
  // Va déclencher la fonction pour prendre tous les tâches dans la base de données
    this.usersService.getAllUsers().subscribe({
      // users => ici veut dire la listes des tâches du fichier format json de l'api et this.users sera la liste des users de cette classe
      next: users => {
        // insérer la liste des users recus dans le fichier json dans la variable
        this.users = users;
        // Recharger la page
        //location.reload();
      }
    });
    console.log(this.ErrorLoginMsg);
  }
  // fonction declencher pour la connexion lors du validation du formulaire
  public VerifyLogin(): void {
    // affiche les valeurs entree dans le formulaire sur la console
    console.log(this.loginForm.value);
    for (var user of this.users) {
      // Dans le cas ou l utilisateur se trouve dans les données( grace au mdp et email)
      if(this.loginForm.value.email == user.email && this.loginForm.value.password == user.password){
        // Aller sur la page de la liste des articles
        this.router.navigate(['articles/0']);
      }
      else{
        // Notre message d'erreur quand l'utilisateur se connecte pas avec le bn mdp et email
        this.ErrorLoginMsg = 'Le mot de passe et email ne sont pas cohérents, veuillez réessayer svp.';
        console.log(this.ErrorLoginMsg);
      }
    }
  }
  // Met en null ErrorLoginMsg pour par la suite grâce au ngIf cacher le div pour le message d erreur Login
  public hideErrorLoginMsg(): void {
    this.ErrorLoginMsg = null;
  }

}
