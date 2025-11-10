// John 3:5
import { Link } from 'react-router-dom';

const PlainLink = (props) => {

    const { to , fontColor, children, className } = props;


    return (
        <Link to={to} style={{ textDecoration: 'none', color: fontColor }}>
            <span className={className}>
                {children}
            </span>
        </Link>
    );
};

export default PlainLink;

