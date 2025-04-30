import { useState } from "react";
import fallbackImage from "../assets/fallback.jpg";
import PortableTextRendererSimple from "./PortableTextRendererSimple.jsx";

export default function PostList({ posts }) {
  const POSTS_PER_PAGE = 12;
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const handleLoadMore = () => {
    console.log("Clicked load more");
    setVisibleCount(prev => prev + POSTS_PER_PAGE);
  }

  const visiblePosts = posts.slice(0, visibleCount);


  return (
    <>
      <div className="flex-v no-gap">
        {visiblePosts.map((post) => (
          <div className="post-card" key={post.slug.current}>
            <div>
              <div className="flex">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-calendar"
              >
                <rect x="2.5" y="3" width="11" height="11" rx="1.5" ry="1.5" />
                <line x1="10" y1="1.5" x2="10" y2="4" />
                <line x1="6" y1="1.5" x2="6" y2="4" />
                <line x1="2.5" y1="6.5" x2="13.5" y2="6.5" />
              </svg> */}
                <p className="ct-muted body-sm">{new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                {post.tags && post.tags !== "" &&
                  <div className="flex">
                    {post.tags && post.tags.split(',').map((tag, i) => {
                      return (
                        <p key={i} class="tag">{tag}</p>
                      );
                    })
                    }
                  </div>
                }
              </div>
              <div class="text">
                <PortableTextRendererSimple content={post.text} />
              </div>
              {post.ctaLink &&
                <a href={post.ctaLink} target="_blank">
                  <button className="button-primary sm">Read More</button>
                </a>
              }
            </div>
            <div className="post-img">
              {post.imageUrl &&
                <img src={post.imageUrl} alt="" />
              }
            </div>
          </div>
        ))}
      </div>

      {visibleCount < posts.length && (
        <div className="tac smt-6">
          <button className="button-secondary" onClick={handleLoadMore}>Load More</button>
        </div>
      )}
    </>
  );
}
