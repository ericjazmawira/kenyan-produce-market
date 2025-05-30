
// Configuration for initial admin users
// Update these email addresses to match your two authorized admin users
export const INITIAL_ADMIN_EMAILS = [
  'admin1@example.com', // Replace with first admin email
  'admin2@example.com'  // Replace with second admin email
];

// Function to check if an email is an authorized admin
export const isAuthorizedAdminEmail = (email: string): boolean => {
  return INITIAL_ADMIN_EMAILS.includes(email.toLowerCase());
};
