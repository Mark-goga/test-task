import React, { useEffect } from "react";
import {observer} from "mobx-react";
import '../styles.css';
import booksController from "./Books.ctrl";


const Books: React.FC = observer(() => {
	useEffect(() => {
		booksController.loadBooks();
	}, []);

	return (
			<div>
				<header>
					<h1>Your books: {booksController.privateBooksCount}</h1>
					<button onClick={() => booksController.setFilter("all")}>All books</button>
					<button onClick={() => booksController.setFilter("private")}>Private books</button>
				</header>

				<div className="books-container">
					{booksController.books.map((book, index) => (
							<div key={index} className="book-card">
								<h3>{book.author}</h3>
								<p>{book.name}</p>
							</div>
					))}
				</div>

				<div className="books-buttons">
					<button
							onClick={() => {
								const name = prompt("Enter book name:");
								const author = prompt("Enter author name:");
								if (name && author) booksController.addBook(name, author);
							}}
					>
						Add Book
					</button>
					<button onClick={() => {
						booksController.deleteBook();
					}}>
						delete books
					</button>
				</div>

			</div>
	);
});

export default Books;