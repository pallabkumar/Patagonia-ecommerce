import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/spinner";
import heroBg from "../assets/images/image4.jpg";
import mainBg from "../assets/images/image5.webp";
import image1 from "../assets/images/image1.webp";
import image2 from "../assets/images/image2.webp";
import { DataContext } from "../context/dataContext";
import softechBg from "../assets/images/Softech-min.webp";
import rrdBg from "../assets/images/RRD-min.webp";
import libtechBg from "../assets/images/LibTech-min.webp";
import logo from "../assets/icons/logo.svg";
import IGVerified from "../assets/icons/IGVerified.svg";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { categories: cards } = useContext(DataContext);
  const [state, setState] = useState({ data: [], hasError: false });
  const covers = [softechBg, rrdBg, libtechBg];
  const routeParams = [
    {
      pathname: `/shop/surfboard/${cards[2].products[0].refrence}`,
      state: cards[2].products[0]
    },
    {
      pathname: `/shop/surfboard/${cards[0].products[2].refrence}`,
      state: cards[0].products[2]
    }
  ];
  const styles = {
    backgroundImage: `url(${mainBg})`,
    height: 395
  };

  useEffect(() => {
    let isSubscribed = true;
    const instagramAPI =
      'https://cors-anywhere.herokuapp.com/https://www.instagram.com/graphql/query/?query_hash=472f257a40c653c64c666ce877d59d2b&variables={"id":"4079200134","first":6}';
    const getThumbnails = async () => {
      try {
        let res = await axios.get(instagramAPI);
        let { edges } = res.data.data.user.edge_owner_to_timeline_media;
        if (isSubscribed) {
          setState({ ...state, data: edges });
        }
      } catch (error) {
        if (isSubscribed) {
          setState({ ...state, hasError: true });
        }
      }
    };
    if (!!state.data.length === false && state.hasError === false) {
      getThumbnails();
    }
    return () => (isSubscribed = false);
  }, [state]);

  const cardsMapper = cards.map((card, i) => {
    return <Card key={i} name={card.name} id={card.id} bg={covers[i]} />;
  });

  return (
    <React.Fragment>
      <div className="main--hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="main--hero-over">
          <div className="container">
            <div className="main--hero-over-txt">
              <h1>
                WE HAVE
                <br />
                THE WORKS
              </h1>
              <p>ITS ALL FUN AND GAMES UNTIL YOU CATCH TOO MUCH AIR</p>
              <Link to={routeParams[0]}>
                <button>LOST SWORDFISH</button>
              </Link>
            </div>
            <div className="main--hero-over-comp">
              <span>TAKE A DEEPER LOOK AT THE</span>
              <span>LIB-TECH SURFBOARDS</span>
            </div>
          </div>
        </div>
      </div>
      <div className="main--section-intro">
        <div className="main--section-intro-box">
          <div>
            <img src={logo} alt="patagonia" />
          </div>
          <p>
            Staying true to our core values during thirty-plus years in business
            has helped us create a company we’re proud to run and work for. And
            our focus on making the best products possible has brought us
            success in the marketplace.
          </p>
          <button>
            <Link to="/about">OUR STORY</Link>
          </button>
        </div>
      </div>
      <div className="main--section-prods">
        <div className="main--section-prods-box">
          <div className="container">
            <h3>DISCOVER OUR SURFBOARDS</h3>
            <div className="main--section-prods-grid">{cardsMapper}</div>
          </div>
        </div>
        <div className="main--section-cover container" style={styles}>
          <div className="cover-over">
            <div className="cover-over-txt">
              <h3>NO MORE BAILOUTS</h3>
              <p>slide your way to mastery with the new Mason Twin v2</p>
              <button>
                <Link to={routeParams[1]}>DISCOVER NOW</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="main--section-iframe container">
          <iframe
            src="https://www.youtube.com/embed/XqeP2fYyw4g"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            secure="true"
            height="300"
            width="560"
            gesture="media"
            allowFullScreen
            title="video"
          />
        </div>
        <div className="main--section-grid container">
          <GridItems />
        </div>
      </div>
      <div className="main--section-instagram">
        <div className="container">
          <div className="instagram-username">
            <span>
              FOLLOW US @PATAGONIA_SURF <img src={IGVerified} alt="" />
            </span>
          </div>
          {!!state.data.length ? (
            <Thumbnails data={state.data} />
          ) : (
            state.hasError || <Spinner />
          )}
          {state.hasError && (
            <div className="spinner--block">
              <p>An unexpected error occurred while fetching data</p>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;

const Card = ({ name, bg, id }) => {
  return (
    <Link to={`shop/surfboards/${id}`}>
      <div className="card" style={{ backgroundImage: `url(${bg})` }}>
        <div className="card--over">
          <span>{name}</span>
        </div>
      </div>
    </Link>
  );
};

const Thumbnails = ({ data }) => {
  const dataMapper = data.map(edge => {
    const { id, thumbnail_src } = edge.node;
    return (
      <div key={id} className="instagram--img">
        <img src={thumbnail_src} alt="thumbnail" />
      </div>
    );
  });
  return <div className="instagram--grid">{dataMapper}</div>;
};

const GridItems = () => {
  return (
    <React.Fragment>
      <div className="grid-txt">
        <h3>FCS II SYSTEM</h3>
        <p>
          Selected new season models now come with the FCS II system (no screws
          or key). Change your fins depending on conditions & how you want to
          surf.
        </p>
        <button className="btn btn-outline">DISCOVER NOW</button>
      </div>
      <div className="grid-img">
        <img src={image1} alt="" />
      </div>
      <div className="grid-img">
        <img src={image2} alt="" />
      </div>
      <div className="grid-txt">
        <h3>THE LOST PUDDLE JUMPER HP</h3>
        <p>
          The lost puddle jumper has just dropped, you can buy your own now !
        </p>
        <button className="btn btn-outline">DISCOVER NOW</button>
      </div>
    </React.Fragment>
  );
};
