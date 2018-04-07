import React, {Component} from 'react';
import Api from '../api';
import './style.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: null
    };

    this.api = new Api();
    this.generateLink = this.generateLink.bind(this);
  }

  componentDidMount() {
    console.log('component did mount');
    const player = window.location.search;

    // зашел не по ссылке
    // 1. Создать соккет
    // 2. Сгенерировать ссылку.
    if (!player) {
      this.api.getClientId((error, clientId) => {
        this.setState({
          clientId: clientId
        })
      });
    }
    // зашел по ссылке
    // /?player=sdsdsdsdwewe54
    // 1. вытащить clientId
    // 2. установить соккет соедиение
    else {
      return;
    }
  }

  componentWillMount() {
    console.log('component will mount');
    // this.api.setNewNamespace(this.state.clientId);
  }

  generateLink(clientId) {
    return `${window.location.origin}/?player=${clientId}`
  }

  render() {
    const link = this.generateLink(this.state.clientId);
    return (
      <div>
        <div className="share-link">
          <span>Share this link</span>
          <br/>
          <a href={link}>{link}</a>
        </div>
      </div>
    )
  }
}

export default Game;
