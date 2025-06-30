import { test, expect } from "@playwright/test";

// test("GET /books returns 200", async ({ request }) => {
// 	const res = await request.get("/books");
// 	expect(res.status()).toBe(200);
// });

test.describe("Books API", () => {
	test("GET /health returns status 200 and expected structure", async ({
		request,
	}) => {
		const res = await request.get("/health");
		expect(res.status()).toBe(200);
		const body = await res.json();
		expect(body).toHaveProperty("status", "OK");
		expect(body).toHaveProperty("timestamp");
		expect(body).toHaveProperty("uptime");
	});

	test("GET / returns HTML content", async ({ request }) => {
		const res = await request.get("/");
		expect(res.status()).toBe(200);
		const text = await res.text();
		expect(text).toContain("<!DOCTYPE html>");
	});

	test("GET /books/:id returns book content (fallback to ID 84)", async ({
		request,
	}) => {
		const res = await request.get("/books/84");
		expect(res.status()).toBe(200);
		const body = await res.text();
		const containsTitle = body.includes("Title");
		const containsTitleNotFound = body.includes("Title not found");
		expect(containsTitle || containsTitleNotFound).toBe(true);
	});

	test("GET /books/invalid-id returns 500 or error", async ({ request }) => {
		const res = await request.get("/books/invalid-id");
		expect([400, 404, 500]).toContain(res.status());
	});

	test("404 route returns JSON error", async ({ request }) => {
		const res = await request.get("/unknown-route");
		expect(res.status()).toBe(404);
		const body = await res.json();
		expect(body).toHaveProperty("error", "Route not found");
	});

	test("Static assets like /styles.css return 200 or 404", async ({
		request,
	}) => {
		const res = await request.get("/styles.css");
		expect([200, 404]).toContain(res.status());
	});

	test("GET /books returns valid HTML", async ({ request }) => {
		const res = await request.get("/books");
		const html = await res.text();
		expect(html).toContain("<html");
		expect(html).toContain("</html>");
	});

	test("GET /books/:id returns plain text content from Gutenberg", async ({
		request,
	}) => {
		const res = await request.get("/books/1342"); // Pride and Prejudice
		expect(res.status()).toBe(200);
		const text = await res.text();
		expect(text.length).toBeGreaterThan(1000); // Returns a long book
	});
});
