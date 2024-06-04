import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { WhatsHappeningComponent } from './whats-happening/whats-happening.component';
import { GamesComponent } from './games/games.component';
import { EsportsComponent } from './esports/esports.component';
import { RiotForgeComponent } from './riot-forge/riot-forge.component';
import { HiringComponent } from './hiring/hiring.component';
import { FooterComponent } from './footer/footer.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { UserPageComponent } from './user-page/user-page.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    WhatsHappeningComponent,
    GamesComponent,
    EsportsComponent,
    RiotForgeComponent,
    HiringComponent,
    FooterComponent,
    SignupModalComponent,
    UserPageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent,SignupModalComponent]
})
export class AppModule { }
