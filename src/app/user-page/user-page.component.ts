import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { AuthService } from '../auth.service';  // Ensure AuthService is imported

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  userGames: any[] = [];
  allGames: any[] = [];
  userId!: number;  // Removed the default value to be fetched from session or backend

  constructor(private gameService: GameService, private authService: AuthService) { }

  ngOnInit(): void {
    this.initializeUser();
  }

  initializeUser(): void {
    const storedUserId = this.authService.getSessionUserId();
    if (storedUserId) {
      this.userId = storedUserId;
      this.fetchUserGames();
      this.fetchAllGames();
      console.log('User ID from Session:', this.userId);
    } else {
      this.authService.checkSession().subscribe(response => {
        if (response.success) {
          sessionStorage.setItem('userId', response.userId);
          this.userId = response.userId;
          this.fetchUserGames();
          this.fetchAllGames();
          console.log('User ID from Backend:', this.userId);
        } else {
          console.error('No active session:', response.message);
          // Redirect or handle user not logged in scenario
        }
      });
    }
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
      this.allGames =  data;
    }, error => {
      console.error('Error fetching all games:', error);
    });
  }

  addGame(gameId: number): void {
    this.gameService.addUserGame(this.userId, gameId).subscribe(response => {
      this.fetchUserGames();  // Refresh the list of user games after adding a new one
    }, error => {
      console.error('Error adding game:', error);
    });
  }
}
