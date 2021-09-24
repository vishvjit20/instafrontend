import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="card home-card">
        <h5>Ramesh</h5>
        <div className="card-image">
          <img src="https://media.istockphoto.com/photos/glueing-wallpapers-at-home-picture-id1153449145?b=1&k=20&m=1153449145&s=170667a&w=0&h=xb9-y2o79g7wOSjGce48LibF5A9Hwlti3X0eBo5U3Mw=" />
        </div>
        <div className="card-content">
          <i className="material-icons">favorite</i>
          <h6>title</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
            nostrum vitae, totam dignissimos consequuntur nemo deserunt
            explicabo unde! Illo consequuntur quia iusto officiis, eligendi enim
            tempora earum similique!
          </p>
          <input type="text" placeholder="comment" />
        </div>
      </div>
    </div>
  );
};

export default Home;
