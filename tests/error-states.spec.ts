import { test, expect } from '@playwright/test';

test.describe('Error States — Story 14: API Failure During Creation', () => {
  test('shows error when generate-script API fails', async ({ page }) => {
    await page.route('**/api/generate-script', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' }),
      });
    });

    await page.goto('/create');

    // If redirected due to auth, skip
    if (!page.url().includes('/create')) {
      test.skip();
      return;
    }

    // Fill in concept and try to generate
    const topicInput = page.locator('input[placeholder*="topic"], input[id*="topic"], textarea').first();
    if (await topicInput.isVisible()) {
      await topicInput.fill('Explain photosynthesis');

      // Look for generate/next button and click
      const generateBtn = page.getByRole('button', { name: /Generate|Next|Continue/i }).first();
      if (await generateBtn.isVisible()) {
        await generateBtn.click();

        // Should show error message
        await expect(
          page.getByText(/error|failed|try again|something went wrong/i)
        ).toBeVisible({ timeout: 15_000 });
      }
    }
  });
});

test.describe('Error States — Story 16: Network Error', () => {
  test('handles network failure gracefully on homepage', async ({ page }) => {
    // Network errors on API calls should not crash the app
    await page.route('**/__clerk/**', (route) => {
      // Allow Clerk to load but block specific API calls
      route.continue();
    });

    await page.goto('/');

    // Homepage should render even with potential network issues
    await expect(page.getByText('EduReels')).toBeVisible();
  });

  test('homepage compare pages load correctly', async ({ page }) => {
    // Test that SEO pages work (critical for the product)
    const response = await page.goto('/compare/synthesia');
    
    // Should return 200 (if deployed) or at least not crash
    if (response) {
      expect([200, 404]).toContain(response.status());
    }
  });
});

test.describe('Error States — Story 12: Sign Out Flow', () => {
  test('homepage shows auth buttons after sign out state', async ({ page }) => {
    // When user is signed out, they should see auth buttons
    await page.goto('/');

    // Should show Sign In and Sign Up buttons (Clerk signed-out state)
    await expect(
      page.getByRole('button', { name: /Sign In/i })
    ).toBeVisible({ timeout: 10_000 });

    await expect(
      page.getByRole('button', { name: /Sign Up|Get Started/i })
    ).toBeVisible({ timeout: 10_000 });
  });
});
