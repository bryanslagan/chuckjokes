import { debounce, throttle } from 'lodash';
import { useEffect, useState } from 'react';
import { PopupMenu, PopupMenuItem } from '../components/popup-menu';
import TextInput from '../components/text-input';
import '../styles/header.scss';

export default function Header({setSearchKey, setSelectedTag}) {

    const [isprofileMenuOpen, setProfileMenu] = useState(false);

    const toggleProfileMenu = () => {
        setProfileMenu(!isprofileMenuOpen);
    }

    useEffect(() => {
        console.log(isprofileMenuOpen);
    }, [isprofileMenuOpen])

    const handleSearch = debounce(e => {
        setSelectedTag('');
        setSearchKey(e)
    }, 600)

    return (
        <div className="header">
            <div className="navbar">
                <button>SO FUNKTIONIERT'S</button>
                <button>SONDERANGEBOTE</button>
                <div className='profile-menu'>
                    <p>MEIN BEREICH</p>
                    <button onClick={toggleProfileMenu}>
                        <img src="/icons/person.png" />
                        <PopupMenu isOpen={isprofileMenuOpen}>
                            <PopupMenuItem>My published jokes</PopupMenuItem>
                            <PopupMenuItem>My saved jokes</PopupMenuItem>
                            <PopupMenuItem>Account Information</PopupMenuItem>
                            <PopupMenuItem>Publish new joke</PopupMenuItem>
                        </PopupMenu>
                    </button>
                </div>
            </div>
            <div className='banner'>
                <img src="/img/banner-1.jpg" />
                <div className='title'>
                    <h1>The Joke Bible</h1>
                    <h3>Daily Laughs for you and yours</h3>
                    <TextInput onChange={(e) => handleSearch(e.target.value)} width={450} suffix={<img className="suffix-icon" src="/icons/search.png" style={{ filter: 'invert(.7)' }} />} />
                </div>
            </div>
        </div>
    );
}