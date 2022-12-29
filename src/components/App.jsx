import './styles.css';
import { Component } from 'react';

import { fetchImages } from 'services/API';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
export class App extends Component {
  state = {
    query: '',
    images: [],
    largeImgUrl: '',
    page: 1,
    showBtn: false,
    error: null,
    isEmpty: false,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      fetchImages(query, page)
        .then(({ hits, totalHits }) => {
          console.log(hits);
          if (hits.length === 0) {
            this.setState({ isEmpty: true });
            return;
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            showBtn: page < Math.ceil(totalHits / 12),
          }));
        })
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  onFormSubmit = query => {
    this.setState({ query: query, images: [], page: 1, error: null });
  };

  setLargeImageURL = largeImageURL => {
    this.setState({ largeImgUrl: largeImageURL });
  };

  render() {
    return (
      <>
        <Searchbar onFormSubmit={this.onFormSubmit} />
        {this.state.error && <p>something wrong {this.state.error}</p>}
        <div>{this.state.selectedPostId}</div>
        <ul>
          {this.state.images.map(el => {
            return (
              <li
                key={el.id}
                class="gallery-item"
                onClick={() => this.setLargeImageURL(el.largeImageURL)}
              >
                <img src={el.webformatURL} alt={el.title} />
              </li>
            );
          })}
        </ul>
        {this.state.largeImgUrl && (
          <Modal
            setLargeImageURL={this.setLargeImageURL}
            largeImageURL={this.state.largeImgUrl}
          />
        )}
        {this.state.isLoading && (
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        )}
      </>
    );
  }
}
