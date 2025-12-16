export function validateUserInput(name: string, email: string) {
    if (!name.trim() || !email.trim()) {
      throw new Error('Invalid input')
    }
  }
  