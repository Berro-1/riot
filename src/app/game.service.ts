import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://localhost:8080/riot';

  constructor(private http: HttpClient) { }

  getUserGames(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get_user_games.php?userId=${userId}`);
  }

  getAllGames(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get_games.php`);
  }

  addUserGame(userId: number, gameId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add_user_game.php`, { userId, gameId });
  }
}
