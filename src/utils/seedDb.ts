// import { db, auth } from '../../firebase';

const users = [
  { email: 'user@gmail.com', password: '123456', role: 'user' },
  { email: 'user2@example.com', password: 'password2', role: 'prestador' },
  { email: 'admin@example.com', password: 'password3', role: 'admin' },
];

export function seedDb() {
  console.log(users);
}
