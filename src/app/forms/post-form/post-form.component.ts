import { environment } from './../../../environments/environment';
import { CreatePost } from './../../models/commands/CreatePost';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent {
  public author!: string;
  public title!: string;
  public content!: string;
  private url: string;

  constructor(private httpClient: HttpClient) {
    this.author = '';
    this.title = '';
    this.content = '';
    this.url = `${environment.ALPHA_URL}/create/post`;
  }

  public handleSubmit() {
    const command: CreatePost = {
      author: this.author,
      content: this.content,
      title: this.title,
      postedAt: new Date().toJSON(),
    };

    this.httpClient
      .post<unknown>(this.url, command, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe();
  }
}
