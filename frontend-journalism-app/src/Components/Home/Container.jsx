import "./Container.scss";

const Container = () => {
  return (
    <div
      className="dashboard-container-1"
      style={{
        backgroundImage: `url("/assets/images/home/bg1.png")`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="inner-top-div"
        style={{
          backgroundImage: `url("/assets/images/home/bg2.png")`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <span className="top-button-1">
            <span>Share your snap with yeah</span>
          </span>
          <div className="top-container-left-text">
            <h2>
              Share your snap <br />
              Let the world know
            </h2>
            <p>
              What you are waiting for
              <br />
              Share your snap and show the world 
              <br />
              Snap it and share it
            </p>
          </div>
        </div>
        <div>
          <img src="/assets/images/home/man.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Container;