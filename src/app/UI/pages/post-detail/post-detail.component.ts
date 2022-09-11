import { environment } from 'src/environments/environment';
import { SocketService } from 'src/app/services/socket.service';
import { HttpClient } from '@angular/common/http';
import { PostView } from 'src/app/models/views/Post';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, Subscription } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit, OnDestroy {
  public post!: PostView;
  private socketSubscription!: Subscription;
  private baseURL: string;

  constructor(
    private httpClient: HttpClient,
    private socketService: SocketService,
    private routeService: ActivatedRoute
  ) {
    this.baseURL = `${environment.BETA_URL}/api/v1/posts/:id`;
  }

  ngOnInit(): void {
    this.fetchPost();
    this.connectToWS();
  }

  ngOnDestroy(): void {
    this.socketSubscription.unsubscribe();
  }

  private getPostIdFromRoute(): Observable<string> {
    return this.routeService.params.pipe(
      map((params) => {
        return params['id'];
      })
    );
  }

  private connectToWS(): void {
    this.socketSubscription = this.getPostIdFromRoute()
      .pipe(
        switchMap((postId) => {
          return this.socketService.listenToCommendAddedEvents(postId);
        })
      )
      .subscribe({
        next: (socketMessage) => {
          this.post.comments.unshift(JSON.parse(socketMessage.body));
        },
      });
  }

  private fetchPost(): void {
    this.getPostIdFromRoute()
      .pipe(
        switchMap((postId) => {
          return this.httpClient.get<PostView>(
            this.baseURL.replace(':id', postId)
          );
        })
      )
      .subscribe((post) => {
        this.post = post;
        this.post.comments.sort(
          (a, b) =>
            new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
        );
      });
  }
}
