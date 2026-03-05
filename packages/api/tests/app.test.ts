import assert from "node:assert";
import { describe, it } from "node:test";
import { sql } from "drizzle-orm";
import { safeParse } from "valibot";
import { app } from "#/app";
import { db } from "#/db";
import { JobsResponseSchema } from "#/routes/jobs/validation";
import { FullJobSchema } from "#/schemas/jobs/validation";

describe("/jobs", () => {
	const ENDPOINT = "/api/jobs";

	it("GET array of jobs", async () => {
		const res = await app.request(ENDPOINT);
		assert.strictEqual(res.status, 200);

		const data = await res.json();
		const result = safeParse(JobsResponseSchema, data);
		assert.ok(result.success);
	});

	it("GET job by ID", async () => {
		const res = await app.request(
			`${ENDPOINT}/e62bb411-1e99-4f72-9097-8cef40853b56`,
		);
		assert.strictEqual(res.status, 200);

		const data = await res.json();
		const result = safeParse(FullJobSchema, data);
		assert.ok(result.success);
	});

	describe("POST/PATCH/DELETE", async () => {
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

			const res = await app.request(ENDPOINT, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newJob),
			});
			assert.strictEqual(res.status, 201);

			const data = await res.json();
			const result = safeParse(FullJobSchema, data);
			assert.ok(result.success);

			jobId = result.output.id;
		});

		it("PATCH", async () => {
			const updateJob = {
				title: "Web Design",
				company: "Orange",
				location: "Mexico",
				content: {
					description: "We need you",
					about: "Us",
				},
			};

			const res = await app.request(`${ENDPOINT}/${jobId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updateJob),
			});
			assert.strictEqual(res.status, 200);
		});

		describe("DELETE", () => {
			it("Delete created job", async () => {
				const res = await app.request(`${ENDPOINT}/${jobId}`, {
					method: "DELETE",
				});
				assert.strictEqual(res.status, 204);
			});

			it("Throws 404 Not found", async () => {
				const res = await app.request(`${ENDPOINT}/404-not-exists`, {
					method: "DELETE",
				});
				assert.strictEqual(res.status, 404);
			});
		});

		await db.run(sql`ROLLBACK`);
	});
});
