import { SocketService } from 'src/app/services/socket.service';
import { HttpClient } from '@angular/common/http';
import { PostView } from 'src/app/models/views/Post';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  public posts!: PostView[];
  private baseUrl: string;
  private socketSubscription!: Subscription;

  constructor(
    private httpClient: HttpClient,
    private socketService: SocketService
  ) {
    this.baseUrl = `${environment.BETA_URL}/api/v1/posts/all`;
  }

  ngOnInit(): void {
    this.fetchAllPosts();
    this.connectToWS();
  }

  ngOnDestroy(): void {
    this.socketSubscription.unsubscribe();
  }

  private connectToWS(): void {
    this.socketSubscription = this.socketService
      .listenToPostCreatedEvents()
      .subscribe({
        next: (socketMessage) => {
          this.posts.unshift(JSON.parse(socketMessage.body));
        },
      });
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
