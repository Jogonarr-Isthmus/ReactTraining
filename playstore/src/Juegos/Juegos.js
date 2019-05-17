import React from 'react';
import './Juegos.css';

class Juegos extends React.Component {
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

  addUser = (newGame) => {
    var currentGames = this.state.games;
    currentGames.push(newGame);

    this.setState({
        games: currentGames
    });
  }

  render() {
    return (
        <div className="Juegos">
            <h3>Juegos</h3>
            <ul className="GameList">
                {this.getGames()}
            </ul>
        </div>
    );
  }
}

Juegos.defaultProps = {
  games: [
    { name: 'Quake', rating: '9.0', type: 'FPS' },
    { name: 'COD', rating: '9.5', type: 'FPS' },
    { name: 'Mario Kart', rating: '8.0', type: 'Racing' },
    { name: 'Grim Fandango', rating: '10.0', type: 'Adventure' }
  ]
}

export default Juegos;