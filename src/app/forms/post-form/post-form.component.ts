import { CreatePost } from './../../models/commands/CreatePost';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent {
  public author!: String;
  public title!: String;
  public content!: String;

  constructor(private httpClient: HttpClient) {
    this.author = '';
    this.title = '';
    this.content = '';
  }

  public handleSubmit() {
    const command: CreatePost = {
      author: this.author,
      content: this.content,
      title: this.title,
      postedAt: new Date(),
    };

    this.httpClient
      .post<unknown>('url', command, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe(console.log);
  }
}
