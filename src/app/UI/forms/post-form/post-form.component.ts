import { environment } from 'src/environments/environment';
import { CreatePost } from 'src/app/models/commands/CreatePost';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  public author: string;
  public title: string;
  public content: string;
  private url: string;
  public pending: boolean;
  public userHasJWT: boolean;

  constructor(private httpClient: HttpClient, private jwtService: JwtService) {
    this.author = '';
    this.title = '';
    this.content = '';
    this.url = `${environment.ALPHA_URL}/create/post`;
    this.pending = false;
    this.userHasJWT = false;
  }

  ngOnInit(): void {
    this.jwtService.userHasLoggedIn().subscribe({
      next: (next) => {
        this.userHasJWT = next;
      },
    });
  }

  public handleSubmit() {
    this.pending = true;
    const command: CreatePost = {
      author: this.author,
      content: this.content,
      title: this.title,
      postedAt: new Date().toISOString(),
    };

    this.httpClient
      .post<unknown>(this.url, command, {
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
