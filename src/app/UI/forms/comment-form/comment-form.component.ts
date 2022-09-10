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
  public pending: boolean;

  constructor(private httpClient: HttpClient) {
    this.author = '';
    this.content = '';
    this.baseURL = `${environment.ALPHA_URL}/add/comment`;
    this.pending = false;
  }

  public handleSubmit() {
    this.pending = true;
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
      .subscribe({
        next: () => {
          this.pending = false;
        },
        error: () => {
          this.pending = false;
        },
      });
  }
}
