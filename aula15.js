import {browser} from 'k6/experimental/browser';


export const options = {
    scenarios: {
        ui: {
          executor: 'shared-iterations',
          options: {
            browser: {
              type: 'chromium',
            },
          },
        },
      }
};

export default async function() {
    const context = browser.newContext();
    const page = context.newPage();

    try {
        await page.goto('https://test.k6.io/my_messages.php', {  waitUntil: 'networkidle' });
        page.locator('input[name="login"]').type('admin');
        page.locator('input[name="password"]').type('123');
        page.screenshot({ path: 'screenshot.png' });

    } finally {
        context.close();
    }
};
