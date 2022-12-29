import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import { useState } from "react";
import axios from "axios";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);

  async function getItem() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );
    setItem(data);
    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getItem();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {loading ? (
              <div class="row">
                <div class="col-md-6 text-center">
                  <div
                    class="skeleton-box"
                    style={{ width: "100%", height: "100%" }}
                  ></div>
                </div>
                <div class="col-md-6">
                  <div class="item_info">
                    <div
                      class="skeleton-box"
                      style={{ width: "300px", height: "40px" }}
                    ></div>
                    <div class="item_info_counts">
                      <div
                        class="skeleton-box"
                        style={{ width: "80px", height: "30px" }}
                      ></div>
                      <div
                        class="skeleton-box"
                        style={{ width: "80px", height: "30px" }}
                      ></div>
                    </div>
                    <div
                      class="skeleton-box"
                      style={{ width: "100px", height: "80px" }}
                    ></div>
                    <div class="d-flex flex-row">
                      <div class="mr40">
                        <h6>Owner</h6>
                        <div class="item_author">
                          <div class="author_list_pp">
                            <div
                              class="skeleton-box"
                              style={{
                                width: "50px",
                                height: "50px",
                                "border-radius": "50%",
                              }}
                            ></div>
                          </div>
                          <div class="author_list_info">
                            <div
                              class="skeleton-box"
                              style={{ width: "125px", height: "20px" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div class="de_tab tab_simple">
                      <div class="de_tab_content">
                        <h6>Creator</h6>
                        <div class="item_author">
                          <div class="author_list_pp">
                            <div
                              class="skeleton-box"
                              style={{
                                width: "55px",
                                height: "50px",
                                "border-radius": "50%",
                              }}
                            ></div>
                          </div>
                          <div class="author_list_info">
                            <div
                              class="skeleton-box"
                              style={{ width: "125px", height: "20px" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div class="spacer-40"></div>
                      <h6>Price</h6>
                      <div class="nft-item-price">
                        <div
                          class="skeleton-box"
                          style={{ width: "75px", height: "20px" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {item.title} #{item.tag}
                    </h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {item.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {item.likes}
                      </div>
                    </div>
                    <p>{item.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${item.ownerId}`}>
                              <img
                                className="lazy"
                                src={item.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item.ownerId}`}>
                              {item.ownerName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${item.creatorId}`}>
                              <img
                                className="lazy"
                                src={item.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item.creatorId}`}>
                              {item.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
