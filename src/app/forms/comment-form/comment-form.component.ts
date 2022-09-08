import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { CreateComment } from 'src/app/models/commands/CreateComment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent {
  @Input()
  public postId!: string;
  public author!: string;
  public content!: string;
  private baseURL: string;

  constructor(private httpClient: HttpClient) {
    this.author = '';
    this.content = '';
    this.baseURL = `${environment.ALPHA_URL}/add/comment`;
  }

  public handleSubmit() {
    const command: CreateComment = {
      postId: this.postId,
      author: this.author,
      content: this.content,
      postedAt: new Date(),
    };
    this.httpClient
      .post<unknown>(this.baseURL, command, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe();
  }
}
