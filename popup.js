document.addEventListener('DOMContentLoaded', function() {
  // Get form and student elements
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const usernameError = document.getElementById('usernameError');
  const passwordError = document.getElementById('passwordError');
  const loginButton = document.getElementById('loginButton');
  const loginError = document.getElementById('loginError');
  const loginContainer = document.querySelector('.login-container');
  const studentContainer = document.getElementById('studentContainer');
  const studentList = document.getElementById('studentList');
  const studentCount = document.getElementById('studentCount');
  const studentDetail = document.getElementById('studentDetail');
  const studentLoading = document.getElementById('studentLoading');
  const logoutButton = document.getElementById('logoutButton');

  // Student API endpoint (replace with actual endpoint)
  const STUDENT_API_ENDPOINT = 'YOUR_STUDENT_API_ENDPOINT';
  
  // Mock student data for testing
  const mockStudents = [
    { id: 1, name: 'John Doe', grade: 'A', major: 'Computer Science', email: 'john.doe@example.com', enrollmentDate: '2022-09-01' },
    { id: 2, name: 'Jane Smith', grade: 'B+', major: 'Mathematics', email: 'jane.smith@example.com', enrollmentDate: '2022-08-15' },
    { id: 3, name: 'Michael Johnson', grade: 'A-', major: 'Physics', email: 'michael.j@example.com', enrollmentDate: '2021-09-01' },
    { id: 4, name: 'Emily Williams', grade: 'B', major: 'Biology', email: 'emily.w@example.com', enrollmentDate: '2022-01-15' },
    { id: 5, name: 'David Brown', grade: 'A+', major: 'Chemistry', email: 'david.b@example.com', enrollmentDate: '2021-01-20' }
  ];

  // Check if user is already logged in
  chrome.storage.local.get(['authToken'], function(result) {
    if (result.authToken) {
      // User is already logged in, show student list
      showStudentList(result.authToken);
    }
  });

  // Add form validation and login handling
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Reset errors
    usernameError.style.display = 'none';
    passwordError.style.display = 'none';
    loginError.style.display = 'none';
    
    // Validate fields
    let isValid = true;
    
    if (!usernameInput.value.trim()) {
      usernameError.style.display = 'block';
      usernameInput.classList.add('invalid');
      isValid = false;
    } else {
      usernameInput.classList.remove('invalid');
    }
    
    if (!passwordInput.value.trim()) {
      passwordError.style.display = 'block';
      passwordInput.classList.add('invalid');
      isValid = false;
    } else {
      passwordInput.classList.remove('invalid');
    }
    
    if (isValid) {
      // Disable button and show loading state
      loginButton.disabled = true;
      loginButton.textContent = 'Logging in...';
      
      // Simulate API call (replace with actual API call in production)
      setTimeout(function() {
        // For demo purposes, accept "demo" / "password" as valid credentials
        if (usernameInput.value === 'demo' && passwordInput.value === 'password') {
          // Generate a mock token
          const authToken = 'sample-token-' + Math.random().toString(36).substring(2);
          
          // Store auth token in Chrome storage
          chrome.storage.local.set({ authToken: authToken }, function() {
            loginButton.textContent = 'Success!';
            
            // Show student list
            showStudentList(authToken);
          });
        } else {
          // Show error
          loginError.textContent = 'Invalid username or password.';
          loginError.style.display = 'block';
          loginButton.disabled = false;
          loginButton.textContent = 'Login';
        }
      }, 1000);
    }
  });
  
  // Function to show student list
  function showStudentList(token) {
    // Hide login, show student container
    loginContainer.style.display = 'none';
    studentContainer.style.display = 'block';
    studentList.innerHTML = '';
    studentDetail.style.display = 'none';
    studentLoading.style.display = 'block';
    
    // In a real application, fetch students from API
    fetchStudents(token);
  }
  
  // Function to fetch students from API
  function fetchStudents(token) {
    // For demo purposes, we'll use mock data
    // In production, replace with actual API call:
    
    /*
    fetch(STUDENT_API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      return response.json();
    })
    .then(data => {
      displayStudents(data);
    })
    .catch(error => {
      studentLoading.textContent = 'Error loading students: ' + error.message;
    });
    */
    
    // Using mock data instead
    setTimeout(() => {
      displayStudents(mockStudents);
    }, 800);
  }
  
  // Function to display students
  function displayStudents(students) {
    studentLoading.style.display = 'none';
    
    // Update student count
    studentCount.textContent = `Total Students: ${students.length}`;
    
    // Create list items for each student
    students.forEach(student => {
      const listItem = document.createElement('li');
      listItem.className = 'student-item';
      listItem.textContent = student.name;
      listItem.dataset.studentId = student.id;
      
      // Add click event to show details
      listItem.addEventListener('click', () => {
        showStudentDetails(student);
      });
      
      studentList.appendChild(listItem);
    });
  }
  
  // Function to show student details
  function showStudentDetails(student) {
    // Display student details
    studentDetail.style.display = 'block';
    studentDetail.innerHTML = `
      <h3>${student.name}</h3>
      <p><strong>ID:</strong> ${student.id}</p>
      <p><strong>Grade:</strong> ${student.grade}</p>
      <p><strong>Major:</strong> ${student.major}</p>
      <p><strong>Email:</strong> ${student.email}</p>
      <p><strong>Enrollment Date:</strong> ${student.enrollmentDate}</p>
      <button id="backToListButton" class="btn back-button">Back to List</button>
    `;
    
    // Add back button functionality
    document.getElementById('backToListButton').addEventListener('click', () => {
      studentDetail.style.display = 'none';
    });
  }
  
  // Add logout functionality
  logoutButton.addEventListener('click', function() {
    chrome.storage.local.remove('authToken', function() {
      // Reset and show login form
      loginContainer.style.display = 'block';
      studentContainer.style.display = 'none';
      loginButton.disabled = false;
      loginButton.textContent = 'Login';
      usernameInput.value = '';
      passwordInput.value = '';
    });
  });
  
  // Add input event listeners to hide error messages when typing
  usernameInput.addEventListener('input', function() {
    usernameError.style.display = 'none';
    usernameInput.classList.remove('invalid');
  });
  
  passwordInput.addEventListener('input', function() {
    passwordError.style.display = 'none';
    passwordInput.classList.remove('invalid');
  });
}); 