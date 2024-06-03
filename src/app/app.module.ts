import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { WhatsHappeningComponent } from './whats-happening/whats-happening.component';
import { GamesComponent } from './games/games.component';
import { EsportsComponent } from './esports/esports.component';
import { RiotForgeComponent } from './riot-forge/riot-forge.component';
import { HiringComponent } from './hiring/hiring.component';
import { FooterComponent } from './footer/footer.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';

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
    SignupModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent,SignupModalComponent]
})
export class AppModule { }
