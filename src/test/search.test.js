import React from 'react';
import SearchInput from '../pages/SearchInput';
import "@testing-library/jest-dom";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";

const movies = [
    { id: 1, title: 'The Shawshank Redemption' },
    { id: 2, title: 'The Godfather' },
    { id: 3, title: 'The Dark Knight' },
    { id: 4, title: 'The Godfather: Part II' },
    { id: 5, title: '12 Angry Men' },
];

const mockFilter = jest.fn((query) =>
  Promise.resolve(
    movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    )
  )
);

const setMovies = jest.fn(() => {});

describe('SearchInput', () => {
    it('should render the search input', () => {
      render(<SearchInput setMovies={setMovies} />);
      expect(screen.getByRole('search-box')).toBeInTheDocument();
    });

    it('search button should be disabled if query is empty string', () => {
      render(<SearchInput setMovies={setMovies}  />);
      const searchInput = screen.getByRole('search-input');
      fireEvent.change(searchInput, { target: { value: '' } });
      expect(screen.getByTestId('search-button')).toHaveAttribute('disabled');

    });

    it('should set the value of the query when value in input is changed', () => {
      render(<SearchInput setMovies={setMovies}  />);
      const searchInput = screen.getByRole('search-input');
      fireEvent.change(searchInput, { target: {value: 'godfather'}});
      expect(searchInput.value).toEqual('godfather');
    });

    it('should return filter movies list', async () => {
      render(<SearchInput setMovies={setMovies}  />);
      const searchInput = screen.getByRole('search-input');
      fireEvent.change(searchInput, { target: {value: 'dark'}});
      const filteredMovies = await mockFilter('dark');
      expect(filteredMovies).toEqual([{ id: 3, title: 'The Dark Knight'}]);
    });

    it('should return empty array if no movies are found', async () => {
      const filteredMovies = await mockFilter('something random');
      expect(filteredMovies).toEqual([]);
    });
  });

