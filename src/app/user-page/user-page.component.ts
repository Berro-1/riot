import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  userGames: any[] = [];
  allGames: any[] = [];
  userId: number = 2; 

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.fetchUserGames();
    this.fetchAllGames();
  }

  fetchUserGames(): void {
    this.gameService.getUserGames(this.userId).subscribe((data: any[]) => {
      this.userGames = data;
    }, error => {
      console.error('Error fetching user games:', error);
    });
  }

  fetchAllGames(): void {
    this.gameService.getAllGames().subscribe((data: any[]) => {
      this.allGames = data;
    }, error => {
      console.error('Error fetching all games:', error);
    });
  }

  addGame(gameId: number): void {
    this.gameService.addUserGame(this.userId, gameId).subscribe(response => {
      this.fetchUserGames();
    }, error => {
      console.error('Error adding game:', error);
    });
  }
}
