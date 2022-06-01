import './PlayButton.css';

export default function PlayButton(props) {
    return (
        <button className='play-button' onClick={() => props.handleClick()} >
            {props.playTime ? "Pause" : "▶️"}
          </button>
    );
};