import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './UI/pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './UI/pages/main/main.component';
import { PostDetailComponent } from './UI/pages/post-detail/post-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },
  {
    path: 'app',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/posts/:id',
    component: PostDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/auth/login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
