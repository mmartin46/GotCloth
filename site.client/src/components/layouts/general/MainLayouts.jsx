import GeneralImageLayout from "./GeneralImageLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../index.css';
import '../../../App.css';

const ShoesLayout = () => {
    return (
        <>
            <GeneralImageLayout
                header="SHOES"
                subheader="You may wanna wear more than socks today."
                name="shoe"
                title="LOW-PRICE PANTS"
                description="Looking for low-priced pants, feel free to look. Check here!"
                route="pants"
                color="antiquewhite" />
        </>
    );
};



const PantsLayout = () => {
    return (
        <>
            <GeneralImageLayout
                header="PANTS"
                subheader="Not in the mood to wear shorts, wear these instead"
                name="pants"
                title="LOW-PRICE SHOES"
                description="Looking for low-priced shoes, feel free to look. Check here!"
                route="shoes"
                color="antiquewhite" />
        </>
    );
};


const ShirtsLayout = () => {
    return (
        <>
            <GeneralImageLayout
                header="SHIRTS"
                subheader="Getting hot? You may not wanna wear a sweater."
                name="shirt"
                title="LOW-PRICE SHOES"
                description="Looking for low-priced shoes, feel free to look. Check here!"
                route="shoes"
                color="antiquewhite" />
        </>
    )
};

export { ShoesLayout, ShirtsLayout, PantsLayout };