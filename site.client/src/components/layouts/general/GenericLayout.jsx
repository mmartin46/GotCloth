import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../index.css';
import '../../../App.css';


const GenericLayout = (props) => {
    const { message } = props;
    return (
        <div className="generic-page">
            <h3>{message}</h3>
        </div>
    );
};

export default GenericLayout;