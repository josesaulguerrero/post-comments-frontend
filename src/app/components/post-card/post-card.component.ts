import { PostView } from './../../models/views/Post';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent {
  @Input()
  public post!: PostView;

  constructor() {}
}
