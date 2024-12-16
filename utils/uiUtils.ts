export function generateRandomUsername(): string {
  let randomString: string = (Math.random()).toString().slice(-5)
  return `testUser_${randomString}`;
  }