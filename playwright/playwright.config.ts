import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	use: {
		baseURL: "http://localhost:3001",
		actionTimeout: 30 * 1000,
		trace: "on-first-retry",
	},
	retries: 1,
	reporter: [["html"], ["list"]],
});
