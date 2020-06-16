import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailGuard } from './product/product-detail.guard';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistListComponent } from './playlist/playlist-list.component';
import { RuleComponent } from './rule/rule.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductDetailComponent,
    PlaylistComponent,
    WelcomeComponent,
    PlaylistListComponent,
    RuleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'welcome' , component: WelcomeComponent},
      {path: 'products', component: ProductListComponent},
      {path: 'playlists', component: PlaylistListComponent},
      {path: 'rules', component: RuleComponent},
      {path: 'playlists/:id', component: PlaylistComponent},
      {path: 'products/:id', 
      canActivate: [ProductDetailGuard],
      component: ProductDetailComponent},
      
      {path: '' ,  redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**' ,  redirectTo: 'welcome', pathMatch: 'full'}
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
