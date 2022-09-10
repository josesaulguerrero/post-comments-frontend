import { Component, Input } from '@angular/core';
import { CommentView } from 'src/app/models/views/Comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  @Input()
  public comment!: CommentView;

  constructor() {}
}
