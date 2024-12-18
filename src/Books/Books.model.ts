import ApiGateway from "../Shared/ApiGateway";
import {Book} from "./Book.type";

class BooksModel {
	private httpGateway = new ApiGateway();

	async getBooks(filter: string): Promise<Book[]> {
		const path = filter === "all" ? "" : "/private";
		const booksDto = await this.httpGateway.get(path);

		return booksDto.map((dto: any) => ({
			name: dto.name,
			author: dto.author,
			ownerId: dto.ownerId || "",
		}));
	}

	async addBook(book: { name: string; author: string, ownerId: string }): Promise<boolean> {
		const bookAddDto = await this.httpGateway.post("", book);
		return bookAddDto && bookAddDto.status === "ok";
	}

	async deleteBook(): Promise<boolean> {
		const response = await this.httpGateway.put('/reset');
		return response && response.status ==='ok';
	}
}


export default new BooksModel();
