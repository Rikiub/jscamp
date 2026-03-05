import { test, describe } from "node:test";
import assert from "node:assert";
import { safeParse } from "valibot";
import { JobsResponseSchema } from "#/routes/jobs/validation";
import { app } from "#/app";
import { FullJobSchema } from "#/schemas/jobs/validation";

describe("/jobs", () => {
	test("Return array of jobs", async () => {
		const res = await app.request("/api/jobs");
		assert.strictEqual(res.status, 200);

		const data = await res.json();
		const result = safeParse(JobsResponseSchema, data);
		assert.ok(result.success);
	});

	test("Get job by ID", async () => {
		const res = await app.request(
			"/api/jobs/e62bb411-1e99-4f72-9097-8cef40853b56",
		);
		assert.strictEqual(res.status, 200);

		const data = await res.json();
		const result = safeParse(FullJobSchema, data);
		assert.ok(result.success);
	});

	test("Get job by ID", async () => {
		const res = await app.request(
			"/api/jobs/e62bb411-1e99-4f72-9097-8cef40853b56",
		);
		assert.strictEqual(res.status, 200);

		const data = await res.json();
		const result = safeParse(FullJobSchema, data);
		assert.ok(result.success);
	});
});
