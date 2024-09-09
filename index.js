import express from "express";
import axios from "axios";

const app = express();
const port = 3001;

//middleware to use the static assets from 'public' folder
app.use(express.static("public"));

//home page
app.get("/", (req, res) => {
	try {
		res.render("index.ejs");
	} catch (error) {
		console.log(error);
		res.status(500);
	}
});

//list of books
app.get("/books", async (req, res) => {
	try {
		// get all books
		const result = await axios.get("https://gutendex.com/books");

		// Extract only title, copyright, and media-type
		const filteredData = result.data.results.map((book) => ({
			title: book.title,
			copyright: book.copyright,
			media_type: book.media_type,
			id: book.id,
		}));

		// Pass the filtered data to the EJS template
		res.render("index.ejs", {
			content: filteredData,
		});
	} catch (error) {
		console.log(error);
		res.status(500);
	}
});

//individual book page
app.get("/books/:id", async (req, res) => {
	const bookId = req.params.id;
	try {
		const response = await axios.get(
			`https://www.gutenberg.org/ebooks/${bookId}.txt.utf-8`
		);
		const findTitle = response.data
			.split("\n")
			.find((line) => line.startsWith("Title:"));
		const bookTitle = findTitle
			? findTitle.replace("Title:", "").trim()
			: "Title not found";
		res.render("book.ejs", { book: response.data, bookTitle: bookTitle });
	} catch (error) {
		res.status(500);
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
