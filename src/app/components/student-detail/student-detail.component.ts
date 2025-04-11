import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student, StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  student: Student | null = null;
  isLoading = true;
  errorMessage = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.loadStudentDetails();
  }
  
  loadStudentDetails(): void {
    this.isLoading = true;
    
    // Get the student ID from the route parameters
    const studentId = this.route.snapshot.paramMap.get('id');
    
    if (studentId) {
      this.studentService.getStudentById(Number(studentId)).subscribe({
        next: (data: Student) => {
          this.student = data;
          this.isLoading = false;
        },
        error: (error: any) => {
          this.errorMessage = 'Failed to load student details. Please try again.';
          this.isLoading = false;
          console.error('Error fetching student details:', error);
        }
      });
    } else {
      this.errorMessage = 'Invalid student ID';
      this.isLoading = false;
    }
  }
  
  backToList(): void {
    this.router.navigate(['/students']);
  }
  
  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
} 