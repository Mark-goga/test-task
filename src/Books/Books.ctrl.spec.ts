import { describe, it, expect, beforeEach, vi } from "vitest";
import booksController from "./Books.ctrl";
import booksModel from "./Books.model";
import { mockBooks} from "./Books.mock";


vi.mock("./Books.model");

describe("BooksController", () => {

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("loadBooks should fetch books and update state", async () => {

		(booksModel.getBooks as vi.Mock).mockResolvedValue(mockBooks);

		await booksController.loadBooks();

		expect(booksModel.getBooks).toHaveBeenCalledWith("all");
		expect(booksController.books).toEqual(mockBooks);
		expect(booksController.privateBooksCount).toBe(1);
	});

	it("addBook should add a book and update state", async () => {
		(booksModel.addBook as vi.Mock).mockResolvedValue(true);

		const newBook = { name: "New Book", author: "New Author" };
		await booksController.addBook(newBook.name, newBook.author);

		expect(booksModel.addBook).toHaveBeenCalledWith({
			...newBook,
			ownerId: "mockUser",
		});

		expect(booksController.books).toContainEqual({
			...newBook,
			ownerId: "mockUser",
		});
		expect(booksController.privateBooksCount).toBe(2);
	});

	it("deleteBook should remove books with ownerId 'mockUser'", async () => {
		(booksModel.deleteBook as vi.Mock).mockResolvedValue(true);

		booksController.books = [
			{ name: "Book 1", author: "Author 1", ownerId: "mockUser" },
			{ name: "Book 2", author: "Author 2", ownerId: "user2" },
		];
		booksController.privateBooksCount = 1;

		await booksController.deleteBook();

		expect(booksModel.deleteBook).toHaveBeenCalled();
		expect(booksController.books).toEqual([
			{ name: "Book 2", author: "Author 2", ownerId: "user2" },
		]);
		expect(booksController.privateBooksCount).toBe(0);
	});

	it("setFilter should update filter and reload books", async () => {
		(booksModel.getBooks as vi.Mock).mockResolvedValue(mockBooks);

		await booksController.setFilter("private");

		expect(booksController.filter).toBe("private");
		expect(booksModel.getBooks).toHaveBeenCalledWith("private");
		expect(booksController.books).toEqual(mockBooks);
	});
});
