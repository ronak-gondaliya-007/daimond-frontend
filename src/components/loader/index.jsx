import React, { useState } from "react";
import "../../assets/css/loader.css";

import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="loader-container">
            <HashLoader size={50} color="#1E1E1E" loading={true} />
        </div>
    );
};

export default Loader;
