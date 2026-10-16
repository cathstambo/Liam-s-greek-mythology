const path = require('node:path');
const projectPath = encodeURIComponent(path.basename(process.cwd()));
const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests', workers: 1,
  use: { baseURL: `http://127.0.0.1:8123/${projectPath}/dist/`, browserName: 'chromium', launchOptions: { executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] } },
  webServer: { command: 'python3 -m http.server 8123 --bind 127.0.0.1 --directory ..', url: 'http://127.0.0.1:8123/', reuseExistingServer: false },
});
