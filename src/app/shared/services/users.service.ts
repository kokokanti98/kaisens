import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// of qui permet de  créer un observable à partir d'un objet
import { Observable, throwError, of } from 'rxjs';
// Pour gérer les érreurs et tap pour afficher dans la console
import { tap, catchError, map } from 'rxjs/operators';
import { IUsers } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
// Pour utiliser l'api angular in memory web api
  private readonly TASK_API_URL = 'http://localhost:3000/users';
  constructor(private http : HttpClient) { }
// Fonction pour prendre tous les données articles
  public getAllUsers(){
    // Va nous retourner la liste des articles via requête http GET
    return this.http.get<IUsers[]>(this.TASK_API_URL).pipe(
      // On va afficher sur la consoles tous les users
      tap(users => console.log('articles: ', users))
    );
  }
  // Fonction qui nous retoune un Interface ITask pour récuperer les données de cette même ITask grâce à son email
  /* public getTaskById(email: string, password: string): Observable<IUsers> {
    // Retourne l'user qu'on cherche via son email
    return this.getAllUsers().pipe(
      map(users => users.find(user => user.email === email)),
    );
  } */
}
