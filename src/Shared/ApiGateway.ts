import { API_BASE } from "./config";

export default class ApiGateway {
	private async request(path: string, options: RequestInit): Promise<any> {
		const response = await fetch(`${API_BASE}${path}`, options);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return await response.json();
	}

	get = async (path: string) => {
		return await this.request(path, { method: "GET" });
	};

	post = async (path: string, payload: any) => {
		return await this.request(path, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
	};

	put = async (path: string) => {
		return await this.request(path, { method: "PUT" });
	};
}
