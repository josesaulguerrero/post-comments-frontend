import { SocketService } from './../../services/socket.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { HttpClient } from '@angular/common/http';
import { PostView } from './../../models/views/Post';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  public posts!: PostView[];
  private baseUrl: string;
  private WSSubject$!: WebSocketSubject<PostView>;

  constructor(
    private httpClient: HttpClient,
    private socketService: SocketService
  ) {
    this.baseUrl = `${environment.BETA_URL}/api/v1/posts/all`;
  }

  ngOnInit(): void {
    this.fetchAllPosts();
    this.WSSubject$ = this.connectToWS();
    this.WSSubject$.subscribe({
      next: (post) => {
        this.posts.unshift(post);
      },
    });
  }

  ngOnDestroy(): void {
    this.WSSubject$.complete();
  }

  private connectToWS(): WebSocketSubject<PostView> {
    return this.socketService.connectToMainSpace();
  }

  private fetchAllPosts(): void {
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
