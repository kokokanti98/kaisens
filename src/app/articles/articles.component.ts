import { Component, OnInit } from '@angular/core';
// Importer du module qu'on a besoin pour le formulaire
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from './articles.service';
import { IArticles } from './articles';

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
      title: ['Un article', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150)]
      ],
      description: ['article non publie', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150)]
      ],
      isPublished: [false]
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
    //console.log(this.articleForm.value);
    // Si notre formulaire est valide
    if(this.articleForm.valid){
      if(this.articleForm.dirty){
        const article: IArticles =  {
          // change la valeur de l'task
          ...this.articleForm.value
        }
        console.log(article);
        this.articlesService.createTask(article).subscribe({
          next: () => this.saveCompleted()
        });
      }
    }
  }
  // Fonction qui se déclenche après avoir finis d apporter des changements ds la bdd
  public saveCompleted(): void{
    // Reset le formulaire
    this.articleForm.reset();
    // Recharger la page
    location.reload();
  }
  // Pour supprimer un article
  public DeleteArticle(article: IArticles){
    if (article.id === 0) {
      this.saveCompleted();
    }
    // Si l article existe
    else {
      // Demander une confirmation à l'utilisateur avant de supprimer
      if (confirm(`Voulez-vous réelement supprimer ${article.title} ?`)) {
        // Lancer la suppression
        this.articlesService.deleteTask(article).subscribe({
          next: () => this.saveCompleted()
        });
      }
    }
  }
  // Pour logout
  public Logout(){
    // Demander une confirmation à l'utilisateur avant de se deconnecter
    if (confirm(`Voulez-vous vous déconnecter ?`)) {
      // Aller sur la page login
      this.router.navigate(['login']);
      
    }
  }
}
