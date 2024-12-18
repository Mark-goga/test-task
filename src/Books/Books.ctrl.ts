import {makeAutoObservable, runInAction} from "mobx";
import booksModel from './Books.model'
import {Book} from "./Book.type";


class BooksController {
	books: Book[] = [];
	filter: "all" | "private" = "all";
	privateBooksCount: number = 0;
	ownerId: string = "mockUser";

	constructor() {
		makeAutoObservable(this);
	}

	async loadBooks() {
		try {
			const booksDto = await booksModel.getBooks(this.filter);
			runInAction(() => {
				this.books = booksDto;
				this.privateBooksCount = this.books.filter((book) => book.ownerId === this.ownerId).length;
			});
		} catch (error) {
			console.error("Failed to load books", error);
		}
	}

	async addBook(name: string, author: string) {
		try {
			const success = await booksModel.addBook({name, author, ownerId: this.ownerId});
			if (success) {
				runInAction(() => {
					this.books.push({name, author, ownerId: this.ownerId});

					this.privateBooksCount++;
				});
			}
		} catch (error) {
			console.error("Failed to add book", error);
		}
	}

	async deleteBook() {
		if (this.privateBooksCount > 0) {
			try {
				const success = await booksModel.deleteBook();
				if (success) {
					this.books = this.books.filter((book) => book.ownerId !== this.ownerId);
					this.privateBooksCount--;
				}
			} catch (error) {
				console.error("Failed to clear books", error);
			}
		}
	}

	async setFilter(newFilter: "all" | "private"): Promise<void> {
		this.filter = newFilter;
		await this.loadBooks();
	}
}

const booksController = new BooksController();
export default booksController;