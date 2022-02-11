import './Header.css';

function Header() {
    return (
        <div className="Header">
            <span>
                <input type="text" placeholder="Number of Words" />
            </span>
            <span>
                <input type="text" placeholder="Number of Minutes" />
            </span>
            <span>
                <button>Start</button>
            </span>
        </div>
    );
}

export default Header;
