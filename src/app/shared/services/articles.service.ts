import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// of qui permet de  créer un observable à partir d'un objet
import { Observable, throwError, of } from 'rxjs';
// Pour gérer les érreurs et tap pour afficher dans la console
import { tap, catchError, map } from 'rxjs/operators';
import { IArticles } from '../models/articles';


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
      // On va afficher sur la consoles tous les articles
      tap(articles => console.log('articles: ', articles))
    );
  }
// Fonction pour créer une article
  public createArticle(article: IArticles): Observable<IArticles>{
    article = {
      // on va prendre les valeur de l article
      ...article
      // Permet a InMemoryDb de faire un autoincrement
      //id: null
    };
    return this.http.post<IArticles>(this.TASK_API_URL, article).pipe(
      //catchError(this.handleHttpError)
    );
  }
  //Fonction pour supprimmer une article
  public deleteTask(article: IArticles): Observable<{}> {
    const url = `${this.TASK_API_URL}/${article.id}`;

    return this.http.delete<IArticles>(url).pipe(
      //catchError(this.handleHttpError)
    );
  }
  // Fonction sur le service pour faire la maj d'une article
  public updateArticle(article: IArticles, id: number): Observable<IArticles> {
    console.log(id);
    // URL de l'api pour la modification
    const url = `${this.TASK_API_URL}/${article.id}`;
    //Faire la modification
    return this.http.put<IArticles>(url, article).pipe(
      // autre requetes
    );
  }
}
