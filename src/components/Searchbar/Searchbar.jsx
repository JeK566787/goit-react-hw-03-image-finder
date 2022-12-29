import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };
  inputChange = event => {
    this.setState({ searchValue: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.searchValue) {
      return;
    }
    this.props.onFormSubmit(this.state.searchValue);
    event.target.reset();
  };
  render() {
    return (
      <header class="searchbar">
        <form class="form" onSubmit={this.handleSubmit}>
          <button type="submit" class="button">
            <span class="button-label">Search</span>
          </button>

          <input
            onChange={this.inputChange}
            class="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
