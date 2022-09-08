import { PostView } from '../models/views/Post';
import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { CommentView } from '../models/views/Comment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public connectToPostSpace = (
    postId: string
  ): WebSocketSubject<CommentView> => {
    return webSocket(`${environment.GAMMA_URL}/retrieve/${postId}`);
  };

  public connectToMainSpace = (): WebSocketSubject<PostView> => {
    return webSocket(`${environment.GAMMA_URL}/retrieve/mainSpace`);
  };
}
