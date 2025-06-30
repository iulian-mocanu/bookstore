import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

// Custom metrics
const errorRate = new Rate("errors");

// Load test configuration
export const options = {
	stages: [
		{ duration: "30s", target: 2 },
		{ duration: "30s", target: 4 },
		{ duration: "30s", target: 5 },
		{ duration: "30s", target: 5 },
		{ duration: "30s", target: 0 },
	],
	thresholds: {
		http_req_duration: ["p(95)<500"],
		http_req_failed: ["rate<0.1"],
		errors: ["rate<0.1"],
	},
};

const BASE_URL = "http://localhost:3001";

export default function () {
	// 1. Health check
	let res = http.get(`${BASE_URL}/health`);
	check(res, {
		"health check status is 200": (r) => r.status === 200,
	}) || errorRate.add(1);

	// 2. Home page
	res = http.get(`${BASE_URL}/`);
	check(res, {
		"home page status is 200": (r) => r.status === 200,
		"home page contains HTML": (r) => r.body.includes("<!DOCTYPE html>"),
	}) || errorRate.add(1);

	// 3. Books listing
	res = http.get(`${BASE_URL}/books`);
	check(res, {
		"books list status is 200": (r) => r.status === 200,
	}) || errorRate.add(1);

	// 4. Fetch book IDs and use them in next request (simulate user interaction)
	const bookList = http.get(`${BASE_URL}/books`);
	let bookId;
	try {
		const booksJson = bookList.body.match(/data-book-id="(\d+)"/);
		bookId = booksJson ? booksJson[1] : "84"; // fallback to known ID
	} catch {
		bookId = "84"; // fallback
	}

	// 5. Single book page
	res = http.get(`${BASE_URL}/books/${bookId}`);
	check(res, {
		"book detail status is 200": (r) => r.status === 200,
		"book detail contains Title or fallback": (r) =>
			r.body.includes("Title:") ||
			r.body.includes("The Project Gutenberg eBook"),
	}) || errorRate.add(1);

	// 6. 404 for non-existent route
	res = http.get(`${BASE_URL}/nonexistent`);
	check(res, {
		"404 status is returned": (r) => r.status === 404,
		"404 error message present": (r) =>
			r.body.includes("Route not found") || r.body.includes("404"),
	}) || errorRate.add(1);

	// 7. Static assets test
	res = http.get(`${BASE_URL}/styles.css`);
	check(res, {
		"static file may be served or 404": (r) => [200, 404].includes(r.status),
	}) || errorRate.add(1);

	sleep(1);
}
