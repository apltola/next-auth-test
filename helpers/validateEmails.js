export default function validateEmails(recipients) {
  if (!recipients) {
    return null;
  }

  const rgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return recipients
    .split(',')
    .map((email) => email.trim())
    .every((email) => rgx.test(email));
}
