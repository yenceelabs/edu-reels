/**
 * Require an environment variable at runtime.
 * Throws immediately if the variable is missing or empty,
 * preventing silent misconfiguration.
 */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
