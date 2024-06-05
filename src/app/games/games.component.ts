import { Component, OnInit } from '@angular/core';
import { GameService } from '../game-service.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: any[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data: any[]) => {
      this.games = data;
    }, error => {
      console.error('Error fetching games:', error);
    });
  }
}
