import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PostComponent } from './components/post/post.component';
import { MainComponent } from './pages/main/main.component';
import { PostFormComponent } from './forms/post-form/post-form.component';
import { CommentFormComponent } from './forms/comment-form/comment-form.component';
import { CommentComponent } from './components/comment/comment.component';
import { FormsModule } from '@angular/forms';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostComponent,
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
