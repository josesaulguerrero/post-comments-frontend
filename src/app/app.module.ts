import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { LoginComponent } from './UI/pages/login/login.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

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
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
