import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './UI/components/header/header.component';
import { PostCardComponent } from './UI/components/post-card/post-card.component';
import { MainComponent } from './UI/pages/main/main.component';
import { PostFormComponent } from './UI/forms/post-form/post-form.component';
import { CommentFormComponent } from './UI/forms/comment-form/comment-form.component';
import { CommentComponent } from './UI/components/comment/comment.component';
import { FormsModule } from '@angular/forms';
import { PostDetailComponent } from './UI/pages/post-detail/post-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostCardComponent,
    MainComponent,
    PostFormComponent,
    CommentFormComponent,
    CommentComponent,
    PostDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
