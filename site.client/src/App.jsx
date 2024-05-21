import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import shirtsImage from 'C:\\Users\\mitch\\Downloads\\WebApp\\Site\\site.client\\src\\images\\store_0.jpg';

const Header = () => {

    return (
        <div className="header">
            <ul>
            </ul>
        </div>
    );
};


const Footer = () => {
    return (
        <div className="footer">
        </div>
    );
};




function App() {
    return (
        <>
            <Header />
            <div>
                <div className="sections row text-center">
                    <div id="shirt" className="col">
                        <h2 className="display-4">SHIRTS</h2>
                    </div>
                    <div id="jeans" className="col">
                        <h2 className="display-4">JEANS</h2>
                    </div>
                    <div id="shoes" className="col">
                        <h2 className="display-4">SHOES</h2>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default App;