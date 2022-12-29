import { Component } from 'react';
import css from './App.module.css';
import { fetchImages } from 'services/API';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
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
  onBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    return (
      <div className={css.App}>
        <Searchbar onFormSubmit={this.onFormSubmit} />
        {this.state.isEmpty && (
          <p>Nothing is found for this {this.state.query}</p>
        )}
        {this.state.error && <p>something wrong {this.state.error}</p>}
        <div>{this.state.selectedPostId}</div>
        <ImageGallery
          images={this.state.images}
          setLargeImageURL={this.setLargeImageURL}
        />
        {this.state.isLoading && <Loader />}
        {this.state.showBtn && <Button onBtnClick={this.onBtnClick} />}
        {this.state.largeImgUrl && (
          <Modal
            setLargeImageURL={this.setLargeImageURL}
            largeImageURL={this.state.largeImgUrl}
          />
        )}
      </div>
    );
  }
}
