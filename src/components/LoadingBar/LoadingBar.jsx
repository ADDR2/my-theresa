import './LoadingBar.scss';

function LoadingBar() {
    return (
        <div role="loading-container" className="loading-bar-container">
            <div className="loaded-content" />
        </div>
    );
}

export default LoadingBar;
