import express from "express";
import axios from "axios";

const app = express();
const port = 3001;

//middleware to use the static assets from 'public' folder
app.use(express.static("public"));

app.get("/", (req, res) => {
	try {
		res.render("index.ejs");
	} catch (error) {
		console.log(error);
		res.status(500);
	}
});

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

app.get("/books/:id", async (req, res) => {
	const bookId = req.params.id;
	try {
		const response = await axios.get(`https://gutendex.com/books/${bookId}`);
		res.render("index.ejs", { book: response.data });
	} catch (error) {
		console.log(req.params.id);
		res.status(500);
	}
	console.log(req.params);
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
