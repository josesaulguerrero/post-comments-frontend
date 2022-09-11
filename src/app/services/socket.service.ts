import { Injectable } from '@angular/core';
import { STOMPService } from './stomp.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public constructor(private stompService: STOMPService) {
    this.stompService.activate();
  }

  public listenToPostCreatedEvents() {
    return this.stompService.watch('/topic/post.created');
  }

  public listenToCommendAddedEvents(postId: string) {
    return this.stompService.watch(`/topic/${postId}/comment.added`);
  }
}
