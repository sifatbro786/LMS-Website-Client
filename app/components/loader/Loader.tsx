import "./loader.css";

const Loader = () => {
    return (
        <div className="loader-wrapper" role="status" aria-label="Loading">
            <div className="spinner-ring">
                <div className="circle" />
                <div className="circle" />
                <div className="circle" />
                <div className="circle" />
            </div>
        </div>
    );
};

export default Loader;
