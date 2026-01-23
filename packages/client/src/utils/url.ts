export function serializeObject(
	// biome-ignore lint/suspicious/noExplicitAny: <helper>
	obj: Record<string, any>,
): Record<string, string> {
	const result = Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [key, String(value)]),
	);
	return result;
}
