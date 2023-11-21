document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = new Date(document.getElementById('dob').value);
    const terms = document.getElementById('terms').checked;
  
    if (!validateAge(dob)) {
      alert('Age must be between 18 and 55.');
      return;
    }
  
    if (!terms) {
      alert('Please accept the terms and conditions.');
      return;
    }
  
    const userData = { name, email, dob: dob.toISOString().split('T')[0] };
    saveUserData(userData);
    displayUserData(userData);
    this.reset();
  });
  
  function validateAge(date) {
    const currentDate = new Date();
    const minAgeDate = new Date(currentDate.getFullYear() - 55, currentDate.getMonth(), currentDate.getDate());
    const maxAgeDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    return date >= minAgeDate && date <= maxAgeDate;
  }
  
  function saveUserData(userData) {
    let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    users.push(userData);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  }
  
  function displayUserData(userData) {
    const userTableBody = document.getElementById('userTableBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${userData.name}</td>
      <td>${userData.email}</td>
      <td>${userData.dob}</td>
    `;
    userTableBody.appendChild(newRow);
  }
  
  // Display existing users on page load
  window.onload = function() {
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    users.forEach(user => displayUserData(user));
  };
  
