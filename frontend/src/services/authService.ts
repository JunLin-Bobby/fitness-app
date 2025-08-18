const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Encapsulates all backend calls related to user authentication
export async function loginAPI(
  email: string,
  password: string
): Promise<string> {
  // Send credentials to the login endpoint and return the JWT on success
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();
  return data.token;  // Expecting response shape: { token: '...' }
}

// Logs out the current user.
// If you need to notify the server, you can call fetch('/api/logout') here.
// Otherwise, simply clear any stored tokens or session data on the client.
// export function logout(): void {
  
   
// }

// Registers a new user and returns a JWT upon successful signup.
// Sends a POST request to /api/auth/register with username, email, and password.
export async function registerAPI(
  username: string,
  email: string,
  password: string
): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  if (!res.ok) {
    // Try to extract error message from response body
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Registration error');
  }
  const data = await res.json();
  return data.token;  // Expecting response shape: { token: '...' }
}
