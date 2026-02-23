import { test, expect } from '@playwright/test';

test.describe('Homepage — Story 9: Homepage Renders', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders brand name', async ({ page }) => {
    await expect(page.getByText('EduReels')).toBeVisible();
  });

  test('renders main headline', async ({ page }) => {
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/Turn Ideas into|Reel/i);
  });

  test('renders hero description', async ({ page }) => {
    await expect(
      page.getByText(/educational|short-form|videos/i)
    ).toBeVisible();
  });

  test('shows Sign In button for unauthenticated users', async ({ page }) => {
    // Clerk provides SignInButton — should be visible when signed out
    await expect(
      page.getByRole('button', { name: /Sign In/i })
    ).toBeVisible();
  });

  test('shows Sign Up / Get Started button for unauthenticated users', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /Sign Up|Get Started/i })
    ).toBeVisible();
  });

  test('auth buttons are clickable', async ({ page }) => {
    const signIn = page.getByRole('button', { name: /Sign In/i });
    await expect(signIn).toBeEnabled();

    const signUp = page.getByRole('button', { name: /Sign Up|Get Started/i });
    await expect(signUp).toBeEnabled();
  });

  test('page loads within reasonable time', async ({ page }) => {
    const start = Date.now();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(10_000); // 10s max for CI (3s target for prod)
  });
});
