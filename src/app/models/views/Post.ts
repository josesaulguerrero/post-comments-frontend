import { CommentView } from './Comment';

export interface PostView {
  _id: string;
  author: string;
  title: string;
  content: string;
  postedAt: Date;
  comments: CommentView[];
}
