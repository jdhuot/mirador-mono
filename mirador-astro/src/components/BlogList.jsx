import { useState } from "react";
import PlainTextRenderer from "./PlainTextRenderer.jsx";
import fallbackImage from "../assets/fallback.jpg";

export default function BlogList({ posts }) {
  const POSTS_PER_PAGE = 9;
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const handleLoadMore = () => setVisibleCount(prev => prev + POSTS_PER_PAGE);

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <>
      <div className="grid-3 lg center">
        {visiblePosts.map((post) => (
          <div className="flex-v blog-card" key={post.slug.current}>
            <a href={`/blog/${post.slug.current}`} className="blog-card-image">
              <img src={post.imageUrl || fallbackImage.src} alt={post.title} />
            </a>
            <a href={`/blog/${post.slug.current}`}>
              <h5 className="smb-0">{post.title}</h5>
            </a>
            <div className="clamp">
              {post.excerpt
                ? PlainTextRenderer(post.excerpt)
                : post.body ? PlainTextRenderer(post.body) : ''}
            </div>
            <a href={`/blog/${post.slug.current}`}>
              <button className="button-primary sm">Read More</button>
            </a>
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
