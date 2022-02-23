import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// of qui permet de  créer un observable à partir d'un objet
import { Observable, throwError, of } from 'rxjs';
// Pour gérer les érreurs et tap pour afficher dans la console
import { tap, catchError, map } from 'rxjs/operators';
import { IArticles } from './articles';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
// Pour utiliser l'api angular in memory web api
  private readonly TASK_API_URL = 'http://localhost:3000/articles';
// Contructeur de notre service
  constructor(private http : HttpClient) { }
// Fonction pour prendre tous les données articles
  public getAllArticles(){
    // Va nous retourner la liste des articles via requête http GET
    return this.http.get<IArticles[]>(this.TASK_API_URL).pipe(
      tap(articles => console.log('articles: ', articles))
    );
  }
}
