import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CreateComment } from 'src/app/models/commands/CreateComment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent {
  public author!: String;
  public content!: String;

  constructor(private httpClient: HttpClient) {
    this.author = '';
    this.content = '';
  }

  public handleSubmit() {
    const command: CreateComment = {
      author: this.author,
      content: this.content,
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
