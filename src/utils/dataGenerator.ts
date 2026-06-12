export interface GeneratedUser {
  name: string;
  email: string;
  password: string;
}

export function generateUser(): GeneratedUser {
  const timestamp = Date.now();

  return {
    name: `User${timestamp}`,
    email: `user${timestamp}@yopmail.com`,
    password: 'Test@123'
  };
}