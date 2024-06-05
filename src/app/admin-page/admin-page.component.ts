import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GameService } from '../game.service';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  gameForm!: FormGroup;
  games: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient,private gameService: GameService) {}

  ngOnInit() {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      lastPlayed: ['', Validators.required],
      image: [null, Validators.required]
    });this.fetchAllGames();
  }
  fetchAllGames(): void {
    this.gameService.getAllGames().subscribe((data: any[]) => {
      this.games = data;
    }, error => {
      console.error('Error fetching all games:', error);
    });
  }
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.gameForm.patchValue({
        image: file
      });
      this.gameForm.get('image')!.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.gameForm.patchValue({ imageUrl: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.gameForm.valid) {
      const formData = new FormData();
      formData.append('title', this.gameForm.get('title')!.value);
      formData.append('description', this.gameForm.get('description')!.value);
      formData.append('lastPlayed', this.gameForm.get('lastPlayed')!.value);
      formData.append('image', this.gameForm.get('image')!.value);

      this.http.post('http://localhost/riot/add_game.php', formData).subscribe((response: any) => {
        if (response.success) {
          const game = {
            title: formData.get('title'),
            description: formData.get('description'),
            lastPlayed: formData.get('lastPlayed'),
            imageUrl: 'http://localhost/riot/upload/' + response.image
          };
          this.games.push(game);
          this.gameForm.reset();
        }
      });
    }
  }
}
