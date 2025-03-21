import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Timer from "../UI/Timer";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [slice, setSlice] = useState(8)
  let filter

  useEffect(() => {
    getItems()
  }, [])

  async function getItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setExploreItems(data);
    setItems(data.slice(0, slice))
    setLoading(false);
  }

  function loadMore() {
    let num = slice + 4
    setSlice(num)
    setItems(exploreItems.slice(0, num))
  }
  
  function filterResults(e) {
    filter = e
      renderSorted()
  }

  async function renderSorted(){
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );
    setSlice(8)
    setExploreItems(data);
    setItems(data.slice(0, 8))
    setLoading(false);
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(e) => filterResults(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading ? (

        <>
        
        {new Array(8).fill(0).map((_, index) => (
          <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
          >
          <div className="nft__item skeleton-box" style={{ width: "90%", height: "400px", margin: "20 auto" }}>
          </div>
          </div>
          ))}
          </>
          )
        :
        (
          <>
        
        {items.map((item) => (
          <div
          key={item.nftId}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
          >
          <div className="nft__item">
          <div className="author_list_pp">
          <Link
          to={`/author/${item.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          >
          <img className="lazy" src={item.authorImage} alt="" />
          <i className="fa fa-check"></i>
          </Link>
          </div>
          {item.expiryDate &&
                   ( <Timer expiryDate={item.expiryDate} />)
                  }
          
          <div className="nft__item_wrap">
          <div className="nft__item_extra">
          <div className="nft__item_buttons">
          <button>Buy Now</button>
          <div className="nft__item_share">
          <h4>Share</h4>
          <a href="" target="_blank" rel="noreferrer">
          <i className="fa fa-facebook fa-lg"></i>
          </a>
          <a href="" target="_blank" rel="noreferrer">
          <i className="fa fa-twitter fa-lg"></i>
          </a>
          <a href="">
          <i className="fa fa-envelope fa-lg"></i>
          </a>
          </div>
          </div>
          </div>
          <Link to={`/item-details/${item.nftId}`}>
          <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
          </Link>
          </div>
          <div className="nft__item_info">
          <Link to="/item-details">
          <h4>{item.title}</h4>
          </Link>
          <div className="nft__item_price">{item.price} ETH</div>
          <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
          </div>
          </div>
          </div>
          </div>
          ))}
          </>
        )}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={loadMore}>
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
