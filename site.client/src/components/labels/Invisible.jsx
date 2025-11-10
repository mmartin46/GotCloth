import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import '../../App.css';


const Invisible = (props) => {
    const { children } = props;
    return (
        <div className="invisible">
            {children}
        </div>
    )
};

export default Invisible;