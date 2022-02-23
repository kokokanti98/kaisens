import { Component, OnInit } from '@angular/core';
// Importer du module qu'on a besoin pour le formulaire
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
// Formulaire de login
  public loginForm: FormGroup;
// Constructeur
  constructor(private fb: FormBuilder) { }
// Cycle de vie OnInit ou se déclenche au chargement du component
  ngOnInit(): void {
  // Création du formulaire
    this.loginForm = this.fb.group({
      loginEmail: ['koko@gmail.com', [Validators.required,
      Validators.minLength(11),
      Validators.maxLength(150)]
      ],
      loginPassword: ['user', [Validators.required,
        Validators.minLength(11),
        Validators.maxLength(150)]
      ]
    });
  }
  // fonction declencher pour la connexion lors du validation du formulaire
  public VerifyLogin(): void {
    // affiche les valeurs entree dans le formulaire sur la console
    console.log(this.loginForm.value);
  }

}
