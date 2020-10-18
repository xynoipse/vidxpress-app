import React from 'react';
import { Link } from 'react-router-dom';
import auth from '../services/authService';
import Table from './common/Table';
import Like from './common/Like';

const MoviesTable = ({ movies, sortColumn, onSort, onLike, onDelete }) => {
  const columns = [
    {
      path: 'title',
      label: 'Title',
      content: movie => (
        <Link to={`/movies/${movie._id}`}>
          {movie.title}
        </Link>
      )
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: movie => (
        <Like
          liked={movie.liked}
          onClick={() => onLike(movie)}
        />
      )
    }
  ];

  const deleteColumn = {
    key: 'delete',
    content: movie => (
      <button
        onClick={() => onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  const user = auth.getAuthUser();
  if (user && user.isAdmin) columns.push(deleteColumn);

  return (
    <Table
      data={movies}
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}

export default MoviesTable;
