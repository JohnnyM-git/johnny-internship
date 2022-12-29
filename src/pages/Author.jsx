import React, { useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import { useEffect } from "react";

const Author = () => {
  const [author, setAuthor] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    getAuthor();
  }, []);

  async function getAuthor() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthor(data);
    setFollowers(data.followers);
    console.log(followers);
    console.log(data.nftCollection);
    setLoading(false);
  }

  function addFollower() {
    let follower = followers + 1;
    setFollowers(follower);
    setFollowing(true);
  }
  function removeFollower() {
    let follower = followers - 1;
    setFollowers(follower);
    setFollowing(false);
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <div class="d_profile de-flex">
                    <div class="de-flex-col">
                      <div class="profile_avatar">
                        <div
                          class="skeleton-box"
                          style={{
                            width: "150px",
                            height: "150px",
                            "border-radius": "50%",
                          }}
                        ></div>
                        <i class="fa fa-check"></i>
                        <div class="profile_name">
                          <h4>
                            <div
                              class="skeleton-box"
                              style={{ width: "200px" }}
                            ></div>
                            <span class="profile_username">
                              <div
                                class="skeleton-box"
                                style={{ width: "100px" }}
                              ></div>
                            </span>
                            <span id="wallet" class="profile_wallet">
                              <div
                                class="skeleton-box"
                                style={{ width: "250px" }}
                              ></div>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div class="profile_follow de-flex">
                      <div class="de-flex-col">
                        <div class="profile_follower">
                          <div
                            class="skeleton-box"
                            style={{ width: "150px", height: "40px" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followers} followers
                        </div>
                        {following ? (
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={removeFollower}
                          >
                            UnFollow
                          </Link>
                        ) : (
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={addFollower}
                          >
                            Follow
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
