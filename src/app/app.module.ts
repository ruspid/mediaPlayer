import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistListComponent } from './playlist/playlist-list.component';
import { RuleComponent } from './rule/rule.component';
import { TrackComponent } from './track/track.component';
import { PlayerComponent } from './player/player.component';
import { PlaylistInerComponent } from './playlist/playlist-iner.component';
import { RuleListComponent } from './rule/rule-list/rule-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ConvertToSpacesPipe,
    StarComponent,
    PlaylistComponent,
    PlaylistInerComponent,
    PlaylistListComponent,
    RuleComponent,
    TrackComponent,
    PlayerComponent,
    RuleListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'playlists', component: PlaylistListComponent},
      {path: 'rules', component: RuleListComponent},
      {path: 'rules/new', component: RuleComponent},
      {path: 'tracks', component: TrackComponent},
      {path: 'playlists/:id', component: PlaylistComponent},
      {path: 'player', component: PlayerComponent},
      
      {path: '' ,  redirectTo: 'tracks', pathMatch: 'full'},
      {path: '**' ,  redirectTo: 'tracks', pathMatch: 'full'}
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
