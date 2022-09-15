import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CreateComment } from 'src/app/models/commands/CreateComment';
import { JwtService } from 'src/app/services/jwt.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  @Input()
  public postId!: string;
  public author!: string;
  public content!: string;
  private baseURL: string;
  public pending: boolean;
  public userHasJWT: boolean;

  constructor(private httpClient: HttpClient, private jwtService: JwtService) {
    this.author = '';
    this.content = '';
    this.baseURL = `${environment.ALPHA_URL}/add/comment`;
    this.pending = false;
    this.userHasJWT = false;
  }

  ngOnInit(): void {
    this.jwtService.getJWT().subscribe({
      next: (next) => {
        this.userHasJWT = !!next;
      },
    });
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
