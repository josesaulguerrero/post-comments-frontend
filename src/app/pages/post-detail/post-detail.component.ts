import { environment } from './../../../environments/environment';
import { CommentView } from './../../models/views/Comment';
import { WebSocketSubject } from 'rxjs/webSocket';
import { SocketService } from './../../services/socket.service';
import { HttpClient } from '@angular/common/http';
import { PostView } from './../../models/views/Post';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit, OnDestroy {
  public post!: PostView;
  private WSSubject!: WebSocketSubject<CommentView>;
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
    this.WSSubject.complete();
  }

  private getPostIdFromRoute(): Observable<string> {
    return this.routeService.params.pipe(
      map((params) => {
        return params['id'];
      })
    );
  }

  private connectToWS(): void {
    this.getPostIdFromRoute()
      .pipe(
        switchMap((postId) => {
          this.WSSubject = this.socketService.connectToPostSpace(postId);
          return this.WSSubject;
        })
      )
      .subscribe({
        next: (comment) => {
          this.post.comments.unshift(comment);
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
