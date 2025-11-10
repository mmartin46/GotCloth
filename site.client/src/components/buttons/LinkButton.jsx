
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import PlainLink from './PlainLink';

const LinkButton = (props) => {
    const { title, caption, buttonTitle, to } = props;

    return (
        <div className="make-big text-center">
            <h2>{title}</h2>
            <p>{caption}</p>


            <div className="typicalButton">
                <PlainLink to={to} >
                    <h5 style={{ color: 'white'}}>{buttonTitle.toUpperCase()}</h5>
                </PlainLink>
            </div>
        </div>
    );
};

export default LinkButton;