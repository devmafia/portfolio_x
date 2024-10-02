import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  progress: number;
}

interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

// Початковий стан
const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
};

// Асинхронна дія для отримання книг з бекенду
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get('http://127.0.0.1:5000/api/books');
  return response.data;
});

// Асинхронна дія для додавання книги
export const addBook = createAsyncThunk('books/addBook', async (newBook: Omit<Book, 'id'>) => {
  const response = await axios.post('http://127.0.0.1:5000/api/books', newBook, { headers: {
    'Content-Type': 'application/json',
}});
  return response.data;
});

// Асинхронна дія для видалення книги
export const deleteBook = createAsyncThunk('books/deleteBook', async (id: number) => {
  await axios.delete(`http://127.0.0.1:5000/api/books/${id}`);
  return id;
});

// Асинхронна дія для редагування книги
export const editBook = createAsyncThunk('books/editBook', async (editedBook: Book) => {
  const response = await axios.put(`http://127.0.0.1:5000/api/books/${editedBook.id}`, editedBook);
  return response.data;
});

// Слайс для книг
const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обробка fetchBooks
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch books';
      })

      // Обробка addBook
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })

      // Обробка deleteBook
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
      })

      // Обробка editBook
      .addCase(editBook.fulfilled, (state, action) => {
        const index = state.books.findIndex((book) => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      });
  },
});

export default bookSlice.reducer;
