import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

const errorRate = new Rate("errors");

export const options = {
	stages: [
		{ duration: "10s", target: 10 }, // Normal load
		{ duration: "1m", target: 10 }, // Stay at normal load
		{ duration: "10s", target: 50 }, // Spike to 50 users
		{ duration: "3m", target: 50 }, // Stay at spike load
		{ duration: "10s", target: 10 }, // Scale down to normal
		{ duration: "3m", target: 10 }, // Recovery at normal load
		{ duration: "10s", target: 0 }, // Scale down to 0
	],
	thresholds: {
		http_req_duration: ["p(99)<1500"], // 99% of requests should be below 1.5s
		http_req_failed: ["rate<0.1"],
		errors: ["rate<0.1"],
	},
};

const BASE_URL = "http://localhost:3001";

export default function () {
	// Home page
	let response = http.get(`${BASE_URL}`);
	check(response, {
		"homepage status is 200": (r) => r.status === 200,
	}) || errorRate.add(1);

	response = http.get(`${BASE_URL}/books`);
	check(response, {
		"books page status is 200": (r) => r.status === 200,
	}) || errorRate.add(1);

	sleep(Math.random() * 2 + 1); // Random sleep between 1-3 seconds
}
