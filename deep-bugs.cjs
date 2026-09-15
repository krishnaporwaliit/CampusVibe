const fs = require('fs');
const path = require('path');

// Fix Profile.jsx
let profilePath = path.join(__dirname, 'src/pages/Profile.jsx');
let profileStr = fs.readFileSync(profilePath, 'utf8');
profileStr = profileStr.replace(/border-\[#0F0A1A\]/g, 'border-white');
fs.writeFileSync(profilePath, profileStr);
console.log('Fixed Profile.jsx');

// Fix Signup.jsx
let signupPath = path.join(__dirname, 'src/pages/Signup.jsx');
let signupStr = fs.readFileSync(signupPath, 'utf8');
// Add email validation
if (!signupStr.includes('.endsWith(')) {
  signupStr = signupStr.replace(
    `if (formData.password !== formData.confirmPassword) {`,
    `if (!formData.email.endsWith('.edu') && !formData.email.endsWith('.ac.in')) {\n      return setError('You must use a valid college email (.edu or .ac.in)');\n    }\n    if (formData.password !== formData.confirmPassword) {`
  );
}
// Fix placeholder image
signupStr = signupStr.replace(
  `photoURL: 'https://via.placeholder.com/150'`,
  `photoURL: \`https://ui-avatars.com/api/?name=\${encodeURIComponent(formData.name)}&background=f43f5e&color=fff&size=150\``
);
fs.writeFileSync(signupPath, signupStr);
console.log('Fixed Signup.jsx');

// Fix VerifyEmail.jsx
let verifyPath = path.join(__dirname, 'src/pages/VerifyEmail.jsx');
let verifyStr = fs.readFileSync(verifyPath, 'utf8');
verifyStr = verifyStr.replace(`bg-white hover:bg-gray-50 border border-gray-200 text-white`, `bg-white hover:bg-gray-50 border border-gray-200 text-gray-900`);
fs.writeFileSync(verifyPath, verifyStr);
console.log('Fixed VerifyEmail.jsx');
