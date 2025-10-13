import { useMemo, useState } from "react";
import BlogList from "./BlogList";

export default function FilteredPosts({ posts = [], topics = [] }) {
  // use "all" as the default
  const [selectedTopic, setSelectedTopic] = useState("all");

  const filteredPosts = useMemo(() => {
    console.log("selectedTopic", selectedTopic);
    if (selectedTopic === "all") return posts;

    return posts.filter((post) => {
      // must have topics AND contain the selected one
      return Array.isArray(post.topics) &&
             post.topics.some((t) => t?.slug === selectedTopic);
    });
  }, [posts, selectedTopic]);

  return (
    <>
      <div className="blog-topics-wrapper">
        <a
          href="#"
          className={`tag filter-tag ${selectedTopic === "all" ? "active" : ""}`}
          onClick={(e) => { e.preventDefault(); setSelectedTopic("all"); }}
        >
          All
        </a>

        {topics.map((topic) => (
          <a
            href="#"
            key={topic.slug}
            className={`tag filter-tag ${selectedTopic === topic.slug ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); setSelectedTopic(topic.slug); }}
          >
            {topic.title}
          </a>
        ))}
      </div>

      <BlogList posts={filteredPosts} />
    </>
  );
}


// import { useState, useEffect } from "react";
// import BlogList from "./BlogList";

// export default function FilteredPosts({ posts, topics }) {
//   const [selectedTopic, setSelectedTopic] = useState(null);
//   const [filteredPosts, setFilteredPosts] = useState(posts ? posts : []);

//   const handleTopicClick = (topic) => {
//     setSelectedTopic(topic);
//   };

  

//   useEffect(() => {
    
//     if (selectedTopic) {
//       const filteredPostsLocal = posts.filter((post) => {
//         if (!post.topics || post.topics.length === 0) return false;
//         return post.topics.some((t) => t.slug === selectedTopic);
//       });
//       setFilteredPosts(filteredPostsLocal);
//     } else {
//       setFilteredPosts(posts);
//     }

//   }, [selectedTopic, posts]);



//   return (
//     <>
//       <div className="blog-topics-wrapper">

//         {topics.map((topic) => (
//           <a
//             key={topic._id}
//             className={`tag ${selectedTopic === topic.slug ? "active" : ""}`}
//             onClick={(e) => { 
//               e.preventDefault()
//               handleTopicClick(topic.slug)
//             }}
//           >
//             {topic.title}
//           </a>
//         ))}
//       </div>
//       <BlogList posts={filteredPosts} />
//     </>
    
//   )      
// }