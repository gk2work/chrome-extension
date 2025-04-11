import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// Student interface
export interface Student {
  id: number;
  name: string;
  email: string;
  grade: string;
  major: string;
  enrollmentDate: string;
  address?: string;
  phone?: string;
  dateOfBirth?: string;
  currentGPA?: number;
  credits?: number;
  academicStatus?: string;
  advisorName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) {}
  
  /**
   * Get list of all students
   */
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${environment.apiUrl}/students`).pipe(
      catchError(error => {
        console.error('Error fetching students:', error);
        return of(this.getMockStudents());
      })
    );
  }
  
  /**
   * Get details of a specific student
   * @param id Student ID
   */
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${environment.apiUrl}/students/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching student ${id}:`, error);
        return of(this.getMockStudentById(id));
      })
    );
  }
  
  /**
   * Mock data for development/testing
   */
  private getMockStudents(): Student[] {
    return [
      { id: 1, name: 'John Doe', grade: 'A', major: 'Computer Science', email: 'john.doe@example.com', enrollmentDate: '2022-09-01' },
      { id: 2, name: 'Jane Smith', grade: 'B+', major: 'Mathematics', email: 'jane.smith@example.com', enrollmentDate: '2022-08-15' },
      { id: 3, name: 'Michael Johnson', grade: 'A-', major: 'Physics', email: 'michael.j@example.com', enrollmentDate: '2021-09-01' },
      { id: 4, name: 'Emily Williams', grade: 'B', major: 'Biology', email: 'emily.w@example.com', enrollmentDate: '2022-01-15' },
      { id: 5, name: 'David Brown', grade: 'A+', major: 'Chemistry', email: 'david.b@example.com', enrollmentDate: '2021-01-20' }
    ];
  }
  
  /**
   * Get mock student by ID
   * @param id Student ID
   */
  private getMockStudentById(id: number): Student {
    const mockStudents = this.getMockStudents();
    const student = mockStudents.find(s => s.id === id);
    
    if (student) {
      // Add additional details for the detailed view
      return {
        ...student,
        address: '123 Campus Ave, University City, ST 12345',
        phone: '(555) 123-4567',
        dateOfBirth: '1999-05-15',
        currentGPA: 3.85,
        credits: 78,
        academicStatus: 'Good Standing',
        advisorName: 'Dr. Robert Smith'
      };
    }
    
    // Return a default student if ID not found
    return {
      id: 0,
      name: 'Student Not Found',
      email: 'N/A',
      grade: 'N/A',
      major: 'N/A',
      enrollmentDate: 'N/A'
    };
  }
} 