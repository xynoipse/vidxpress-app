import React from 'react';
import Joi from 'joi';
import Form from './common/Form';
import * as Movie from '../services/movieService';
import * as Genre from '../services/genreService';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().integer().min(0).max(100).required().label('Stock'),
    dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
  };

  async populateGenres() {
    const { data: genres } = await Genre.get();
    this.setState({ genres });
  }

  async populateMovies() {
    const { history, match } = this.props;

    const movieId = match.params.id;
    if (movieId === 'new') return;

    try {
      const { data: movie } = await Movie.show(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      return history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = async () => {
    await Movie.save(this.state.data);

    this.props.history.push('/movies');
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate', 'number')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;
