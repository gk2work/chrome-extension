import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student, StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  isLoading = true;
  errorMessage = '';
  
  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loadStudents();
  }
  
  loadStudents(): void {
    this.isLoading = true;
    this.studentService.getStudents().subscribe({
      next: (data: Student[]) => {
        this.students = data;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = 'Failed to load students. Please try again.';
        this.isLoading = false;
        console.error('Error fetching students:', error);
      }
    });
  }
  
  viewStudentDetails(student: Student): void {
    this.router.navigate(['/students', student.id]);
  }
  
  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
} 