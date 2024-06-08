import BigLabel from "../../labels/BigLabel";
import BodySection from "../../sections/BodySection";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../index.css';
import '../../../App.css';
import ImageColumns from "../../ImageColumns";

const GeneralImageLayout = ({ header, subheader, name, title, description, route, color }) => {
    return (
        <>
            <div>
                <BigLabel header={header} subheader={subheader} />
                <div className="my-container">
                    <ImageColumns name={name} />
                </div>
            </div>
            <BodySection title={title}
                description={description}
                route={route}
                color={color} />
        </>
    )
};

export default GeneralImageLayout;