import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  userGames = [
    { name: 'League of Legends', description: 'A multiplayer online battle arena game.', imageUrl: 'assets/images/lol.png' },
    { name: 'Valorant', description: 'A 5v5 character-based tactical FPS.', imageUrl: 'assets/images/valorant.png' },
    { name: 'Teamfight Tactics', description: 'An auto-battler game by Riot Games.', imageUrl: 'assets/images/tft.png' },
    { name: 'Legends of Runeterra', description: 'A digital collectible card game.', imageUrl: 'assets/images/lor.png' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
