import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import MovieTable from './MoviesTable';
import Pagination from './common/Pagination';
import ListGroup from './common/ListGroup';
import Search from './common/Search';
import paginate from '../utils/paginate';
import * as Movie from '../services/movieService';
import * as Genre from '../services/genreService';
import { toast } from 'react-toastify';

const Movies = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });

  useEffect(() => {
    populateData();
  }, []);

  const populateData = async () => {
    const { data } = await Genre.get();
    const genres = [{ _id: '', name: 'All Genres' }, ...data];
    setGenres(genres);

    const { data: movies } = await Movie.get();
    setMovies(movies);
  }

  const handleLike = movie => {
    const movieData = [...movies];
    const index = movieData.indexOf(movie);
    movieData[index] = { ...movie };
    movieData[index].liked = !movieData[index].liked;
    setMovies(movieData);
  }

  const handleDelete = async movie => {
    const originalMovies = movies;

    const newMovies = originalMovies.filter(m => m._id !== movie._id);
    setMovies(newMovies);

    try {
      await Movie.destroy(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error('This movie has already been deleted');

      setMovies(originalMovies);
    }
  }

  const handleGenreSelect = genre => {
    setSelectedGenre(genre);
    setSearchQuery('');
    setCurrentPage(1);
  }

  const handleSearch = query => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setCurrentPage(1);
  }

  const getPagedData = (data) => {
    let filtered = data;
    if (searchQuery)
      filtered = data.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = data.filter(m => m.genre._id === selectedGenre._id)

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const { length: count } = filtered;
    const movies = paginate(sorted, currentPage, pageSize);

    return { count, movies };
  }

  const render = () => {
    const { count, movies: data } = getPagedData(movies);

    return (
      <div className="row">
        <div className="col-12 col-lg-3 order-2 order-lg-1">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={handleGenreSelect}
          />
        </div>
        <div className="col order-1 order-lg-2">
          {user && <Link to="/movies/new" className="btn btn-primary mb-3">New Movie</Link>}
          <p>Showing {count} movies in the database.</p>
          <Search value={searchQuery} onChange={handleSearch} />
          <MovieTable
            movies={data}
            sortColumn={sortColumn}
            onSort={sortColumn => setSortColumn(sortColumn)}
            onLike={handleLike}
            onDelete={handleDelete}
          />
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={page => setCurrentPage(page)}
          />
        </div>
      </div>
    )
  }

  return render();
}

export default Movies;
