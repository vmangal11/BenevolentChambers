import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";

const dummyPosts = [
  {
    id: "post1",
    title: "Women Directors as Alternate Directors: Seeking Clarifications",
    date: "April 13, 2016",
    timeToRead: "8 min read",
    summary:
      "A version of this article was posted on April 13, 2016 on the author’s LinkedIn page, and can be accessed here Introduction In the August...",
    externalUrl:
      "https://www.linkedin.com/pulse/women-directors-alternate-seeking-clarifications-abhilash-agrawal/",
  },
  {
    id: "post2",
    title: "The curious case of Mary Roy",
    date: "May 18, 2020",
    timeToRead: "7 min read",
    summary:
      "A version of this article was posted on May 18, 2020 on the author’s LinkedIn page, and can be accessed here People who have read...",
    externalURL:
      "https://www.linkedin.com/pulse/curious-case-mary-roy-abhilash-agrawal/?trackingId=1TCI7OevDfCergFvWLIzZA%3D%3D",
  },
  {
    id: "post3",
    title: "“Atleast” flexibility in claims for having prior use of trademark",
    date: "—",
    timeToRead: "2 min read",
    summary:
      "A version of this article was published on LiveLaw.in on May 26, 2020, and can be accessed here In a judgment pronounced by a five judge...",
    externalURL:
      "https://www.livelaw.in/columns/broader-implications-of-the-pandurang-judgment-on-co-operative-banks-157318#:~:text=In%20the%20Pandurang%20case%2C%20it,)(d)of%20the%20SARFAESI",
  },
  {
    id: "post4",
    title:
      "“Banking on Force Majeure: Honouring Bank Guarantees in Times of a...",
    date: "—",
    timeToRead: "2 min read",
    summary:
      "A version of this article was published on the popular blawg, IndiaCorpLaw, on April 28, 2020, and can be accessed here “Banks deal with...",
    externalURL:
      "https://indiacorplaw.in/2020/04/28/banking-on-force-majeure-honouring-bank-guarantees-in-times-of-a-pandemic/",
  },
];

export default function BlogPage() {
  const [views, setViews] = useState({});

  useEffect(() => {
    const initialViews = {};
    dummyPosts.forEach((post) => {
      const stored = parseInt(localStorage.getItem(post.id)) || 0;
      initialViews[post.id] = stored;
    });
    setViews(initialViews);
  }, []);

  const handleExternalClick = (postId, url) => {
    const newCount = (views[postId] || 0) + 1;
    localStorage.setItem(postId, newCount);
    setViews((prev) => ({ ...prev, [postId]: newCount }));
    window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <div className="bg-[#06294D] min-h-screen font-serif">
      <Navbar />

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto bg-[#fefcf6] text-black p-8 rounded">
          <h1 className="text-4xl font-serif font-bold mb-8">All Posts</h1>
          <div className="grid md:grid-cols-3 gap-6">
            {dummyPosts.map((post) => (
              <div
                key={post.id}
                className="border p-5 rounded shadow-sm bg-[#fffdf7]"
              >
                <p className="text-sm text-gray-600">{post.timeToRead}</p>
                <h2 className="text-xl font-semibold mt-2 mb-2 leading-snug">
                  {post.externalUrl ? (
                    <button
                      onClick={() =>
                        handleExternalClick(post.id, post.externalUrl)
                      }
                      className="text-left text-blue-800 hover:underline"
                    >
                      {post.title}
                    </button>
                  ) : (
                    <Link
                      to={`/blogs/${post.id}`}
                      className="text-blue-800 hover:underline"
                    >
                      {post.title}
                    </Link>
                  )}
                </h2>
                <p className="text-gray-700 text-sm mb-4">{post.summary}</p>
                <hr />
                <div className="text-xs text-gray-500 mt-2 flex justify-between">
                  <span>{views[post.id] || 0} views</span>
                  <span>0 comments</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
