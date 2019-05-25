import React from 'react';
import './Games.css';

class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        games: this.props.games
    };
  }

  getGames = () => {
    let games = this.state.games.map((game) => {
        return <li><b>Name:</b> {game.name}. <b>Rating:</b> {game.rating}. <b>Type:</b> {game.type}</li>
    });

    return games;
  }

  addGame = (newGame) => {
    var currentGames = this.state.games;
    currentGames.push(newGame);

    this.setState({
        games: currentGames
    });
  }

  render() {
    return (
        <div className="Games">
            <h3>Games</h3>
            <ul className="GameList">
                {this.getGames()}
            </ul>
        </div>
    );
  }
}

Games.defaultProps = {
  games: [
    { name: 'Quake', rating: '9.0', type: 'FPS' },
    { name: 'COD', rating: '9.5', type: 'FPS' },
    { name: 'Mario Kart', rating: '8.0', type: 'Racing' },
    { name: 'Grim Fandango', rating: '10.0', type: 'Adventure' }
  ]
}

export default Games;