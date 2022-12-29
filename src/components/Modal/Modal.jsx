import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onEscapePress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscapePress);
  }
  onEscapePress = e => {
    if (e.code === 'Escape') {
      this.props.setLargeImageURL('');
    }
  };
  handleClick = e => {
    if (e.target === e.currentTarget) {
      this.props.setLargeImageURL('');
    }
  };
  render() {
    return (
      <div className="Overlay" onClick={this.handleClick}>
        <div className="Modal">
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}
