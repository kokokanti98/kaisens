import { Component, OnInit } from '@angular/core';
// Importer du module qu'on a besoin pour le formulaire
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from './articles.service';
import { IArticles } from './articles';
import { Low, JSONFile } from 'lowdb';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
// Les articles
  public articles: IArticles[] = [];
// Formulaire de login
  public articleForm: FormGroup;
// Constructeur
  constructor(
    private fb: FormBuilder, 
    private router: Router,  
    private route: ActivatedRoute,
    private articlesService: ArticlesService
  ){ 
    /* type Data = {
      words: string[]
    };
    const adapter = new JSONFile<Data>('db.json');
    const db = new Low(adapter); */
  }

  ngOnInit(): void {
  // Création du formulaire
    this.articleForm = this.fb.group({
      articleTitre: ['Un article', [Validators.required,
      Validators.minLength(11),
      Validators.maxLength(150)]
      ],
      articleDescription: ['article non publie', [Validators.required,
        Validators.minLength(11),
        Validators.maxLength(150)]
      ],
      articlePublie: [null, Validators.required]
    });
    // Va déclencher la fonction pour prendre tous les tâches dans la base de données
    this.articlesService.getAllArticles().subscribe({
      // next et error sont deux fonctions de base dans le subscribe
      // articles => ici veut dire la listes des tâches du fichier format json de l'api et this.articles sera la liste des articles de cette classe
      next: articles => {
        // insérer la liste des articles recus dans le fichier json dans la variable
        this.articles = articles;
      }
    });
  }
  // fonction declencher pour la connexion lors du validation du formulaire
  public SaveArticle(): void {
    // On va récupérer l'id de l'utilisateur qui s est connecte
    // ! est un non-null assertion operator pour dire que c'est pas une variable null ou undefined
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    console.log(id);
    // affiche les valeurs entree dans le formulaire sur la console
    console.log(this.articleForm.value);
  }
}
