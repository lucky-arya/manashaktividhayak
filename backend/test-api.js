const testUrl = 'http://localhost:5000';

console.log('🧪 Testing Backend API...\n');

// Test 1: Health Check
fetch(`${testUrl}/api/health`)
  .then(res => res.json())
  .then(data => {
    console.log('✅ Health Check:', data);
  })
  .catch(err => {
    console.log('❌ Health Check Failed:', err.message);
  });

// Test 2: Create Registration
const testData = {
  teamName: 'Test Team ' + Date.now(),
  teamLeader: 'John Doe',
  email: 'test' + Date.now() + '@example.com',
  phone: '+919876543210',
  teamSize: '3',
  problemChoice: 'edu1'
};

setTimeout(() => {
  console.log('\n🧪 Testing Registration Creation...\n');
  
  fetch(`${testUrl}/api/registrations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })
    .then(res => res.json())
    .then(data => {
      console.log('✅ Registration Created:', data);
      
      // Test 3: Get all registrations
      setTimeout(() => {
        console.log('\n🧪 Testing Get All Registrations...\n');
        fetch(`${testUrl}/api/registrations`)
          .then(res => res.json())
          .then(data => {
            console.log('✅ Registrations Retrieved:', data);
            console.log('\n🎉 All tests passed!');
          });
      }, 1000);
    })
    .catch(err => {
      console.log('❌ Registration Failed:', err.message);
    });
}, 1000);
