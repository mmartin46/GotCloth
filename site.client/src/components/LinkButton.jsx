
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const LinkButton = (props) => {
    const { title, caption, buttonTitle } = props;

    return (
        <div className="make-big text-center">
            <h2>{title}</h2>
            <p>{caption}</p>

            <div className="typicalButton">
                <h3>{buttonTitle.toUpperCase()}</h3>
            </div>
        </div>
    );
};

export default LinkButton;