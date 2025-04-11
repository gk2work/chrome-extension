import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { AuthGuard } from './guards/auth.guard';

// Define the routes for the application
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'students', 
    component: StudentListComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'students/:id', 
    component: StudentDetailComponent, 
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '/login' } // Redirect to login for any unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { } 