import { Component, OnInit, OnDestroy } from '@angular/core';
// Importer du module qu'on a besoin pour le formulaire
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from './articles.service';
import { IArticles } from './articles';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
// Boolean modif
  public isModif: boolean = false;
// article id
  private idArticle: number;
// article selectionne
  public article: IArticles;
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
  )
  {}
  ngOnInit(): void {
  // Création du formulaire
    this.articleForm = this.fb.group({
      id: [],
      title: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150)]
      ],
      description: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150)]
      ],
      isPublished: [false]
    });
    // Va déclencher la fonction pour prendre tous les tâches dans la base de données
    this.articlesService.getAllArticles().subscribe({
      // articles => ici veut dire la listes des tâches du fichier format json de l'api et this.articles sera la liste des articles de cette classe
      next: articles => {
        // insérer la liste des articles recus dans le fichier json dans la variable
        this.articles = articles;
      }
    });
    // On va récupérer l'id de l'article qui s est connecte
    // ! est un non-null assertion operator pour dire que c'est pas une variable null ou undefined
    this.idArticle = +this.route.snapshot.paramMap.get('id')!;
  }
  // Pour fixer valeur form
  public PatchFormData(id: number): void {
    //console.log('Id de l article est: ' + id);
    if(id != 0){
      for (var article of this.articles) {
        // Si l'id de l article est egale a celui sur la route on rempli le formulaire
        if(article.id == id){
          //console.log(article.id);
          // On va mettre les valeurs de la variable task sur les champs du formulaire
          this.articleForm.patchValue({
            id: article.id,
            title: article.title,
            description: article.description,
            isPublished: article.isPublished
          });
          // Changer la valeur de isModif
          this.isModif = true;
        }
      }
      //console.log('Id de l article est: ' + id);
    }
    else{
      this.isModif = false;
    }
  }
  // fonction declencher pour la connexion lors du validation du formulaire
  public SaveArticle(): void {
    // affiche les valeurs entree dans le formulaire sur la console
    //console.log(this.articleForm.value);
    // Si notre formulaire est valide
    if(this.articleForm.valid){
      if(this.articleForm.dirty){
        let article: IArticles =  {
          // change la valeur de l'article
          ...this.articleForm.value
        }
        //console.log(article);
        console.log(article);
        if(this.isModif == false){
          console.log(article);
          this.articlesService.createTask(article).subscribe({
            next: () => this.saveCompleted()
          });
        }
        else{
          this.articlesService.updateArticle(article, article.id).subscribe({
            next: () => this.saveCompleted()
          });
        }
        
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
    // Lancer la suppression
    this.articlesService.deleteTask(article).subscribe({
      next: () => this.saveCompleted()
    });
  }
  // Pour logout
  public Logout(){
    // Aller sur la page login et la rafraichis
      this.router.navigate(['login'])
      .then(() => {
        window.location.reload();
      });
  }
}
