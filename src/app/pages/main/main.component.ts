import { HttpClient } from '@angular/common/http';
import { PostView } from './../../models/views/Post';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public posts!: PostView[];
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.BETA_URL}/api/v1/posts/all`;
  }

  ngOnInit(): void {
    this.httpClient
      .get<PostView[]>(this.baseUrl)
      .pipe(
        map((posts) =>
          posts.map((p) => ({
            ...p,
            postedAt: new Date(p.postedAt),
          }))
        ),
        map((posts) =>
          posts.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime())
        )
      )
      .subscribe((next) => {
        this.posts = next;
      });
  }
}
