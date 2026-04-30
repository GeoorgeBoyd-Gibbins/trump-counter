import { test, expect } from "@playwright/test";

test.describe("Trump Presidency Countdown", () => {
  test("renders the headline and all five units", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /time remaining in the trump presidency/i }),
    ).toBeVisible();

    for (const label of ["Years", "Days", "Hours", "Minutes", "Seconds"]) {
      await expect(page.getByText(label, { exact: true })).toBeVisible();
    }
  });

  test("seconds digit decrements over time", async ({ page }) => {
    await page.goto("/");

    // Locate the Seconds card by finding the label, then walking up to its container.
    const secondsLabel = page.getByText("Seconds", { exact: true });
    await expect(secondsLabel).toBeVisible();

    // The digit lives in a sibling above the label inside the same flex column.
    const secondsCard = secondsLabel.locator("..");
    const initialText = (await secondsCard.innerText()).trim();
    const initialDigits = initialText.match(/\d+/)?.[0];
    expect(initialDigits, "should find a numeric seconds value").toBeTruthy();

    // Wait long enough for at least one tick, then read again.
    await page.waitForTimeout(2200);
    const nextText = (await secondsCard.innerText()).trim();
    const nextDigits = nextText.match(/\d+/)?.[0];

    expect(nextDigits).not.toBe(initialDigits);
  });

  test("page metadata is correct", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/trump presidency countdown/i);
  });
});
