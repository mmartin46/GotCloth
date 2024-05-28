import '../App.css';


const BigLabel = (props) => {
    const { header, subheader, color } = props;

    let chosenColor = 'rgba(200, 0, 0, 1)';
    switch (color) {
        case 'red':
            chosenColor = 'rgba(200, 0, 0, 1)';
            break;
        case 'blue':
            chosenColor = 'rgba(0, 0, 200, 1)';
            break;
        case 'green':
            chosenColor = 'rgba(0, 200, 0, 1)';
            break;
    }



    return (
        <>
            <div className="big-label" style={{ backgroundColor: chosenColor }}>
                <h1 className="text-center">{header.toUpperCase()}</h1>
                <h4 className="text-center">{subheader}</h4>
            </div>
        </>
    );
}


export default BigLabel;