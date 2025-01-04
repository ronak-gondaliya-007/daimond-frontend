import { useNavigate } from 'react-router-dom';
import '../../assets/css/search.css';

import searchIcon from '../../assets/images/search.svg';
import slidersIcon from '../../assets/images/sliders.svg';
import StockForm from '../../pages/Stock/Form';

const Search = () => {
    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate('/stock-add');
    };

    return (
        <div className="search-container">
            <div className="search-bar-inner">
                <img src={searchIcon} alt='Search Image' />
                <input type="text" placeholder="Search by: diamond ID, customer name, etc..." className='search-text' />
                <div className='search-buttons'>
                    <button>
                        <img src={slidersIcon} alt="Filters Image" />
                        <p>Filters</p>
                    </button>
                    <button>
                        <img src={slidersIcon} alt="Sort Image" />
                        <p>Sort</p>
                    </button>
                </div>
            </div>
            <div className="add-item-button">
                <button onClick={handleAddClick()}>+ Add New</button>
            </div>
        </div>
    );
};

export default Search;