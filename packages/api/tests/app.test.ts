import { it, describe } from "node:test";
import assert from "node:assert";
import { safeParse } from "valibot";
import { JobsResponseSchema } from "#/routes/jobs/validation";
import { app } from "#/app";
import { FullJobSchema } from "#/schemas/jobs/validation";
import { db } from "#/db";
import { sql } from "drizzle-orm";

describe("/jobs", () => {
	it("GET array of jobs", async () => {
		const res = await app.request("/api/jobs");
		assert.strictEqual(res.status, 200);

		const data = await res.json();
		const result = safeParse(JobsResponseSchema, data);
		assert.ok(result.success);
	});

	it("GET job by ID", async () => {
		const res = await app.request(
			"/api/jobs/e62bb411-1e99-4f72-9097-8cef40853b56",
		);
		assert.strictEqual(res.status, 200);

		const data = await res.json();
		const result = safeParse(FullJobSchema, data);
		assert.ok(result.success);
	});

	describe("POST/DELETE", async () => {
		await db.run(sql`BEGIN`);
		let jobId: string;

		it("POST", async () => {
			const newJob = {
				title: "Developer Full Stack",
				description: "Searching developer.",
				company: "TechCorp",
				location: "Madrid, España",
				level: "Senior",
				technologies: ["TypeScript", "React", "Node.js", "PostgreSQL"],
				content: {
					description: "Info",
					responsibilities: "Do something",
					requirements: "Bread",
					about: "Yes",
				},
			};

			const res = await app.request("/api/jobs", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newJob),
			});
			assert.strictEqual(res.status, 200);

			const data = await res.json();
			const result = safeParse(FullJobSchema, data);
			assert.ok(result.success);

			jobId = result.output.id;
		});

		describe("DELETE", () => {
			it("Delete created job", async () => {
				const res = await app.request(`/api/jobs/${jobId}`, {
					method: "DELETE",
				});
				assert.strictEqual(res.status, 204);
			});

			it("Throws 404 Not found", async () => {
				const res = await app.request(`/api/jobs/404-not-exists`, {
					method: "DELETE",
				});
				assert.strictEqual(res.status, 404);
			});
		});

		await db.run(sql`ROLLBACK`);
	});
});
