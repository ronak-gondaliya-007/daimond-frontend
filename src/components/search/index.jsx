import '../../assets/css/search.css';

import searchIcon from '../../assets/images/search.svg';
import slidersIcon from '../../assets/images/sliders.svg';

const Search = () => {
    return (
        <div className="search-container">
            <div className="search-bar-inner">
                <img src={searchIcon} alt='Search Image' />
                <input type="text" placeholder="Search by: diamond ID, customer name, etc..." />
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
                <button>+ Add New</button>
            </div>
        </div>
    );
};

export default Search;