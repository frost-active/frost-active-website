import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const BlogSection = () => {
  const navigate = useNavigate();

  const [bookmarked, setBookmarked] = useState(() => {
    const saved = localStorage.getItem("bookmarkedBlogs");
    return saved ? JSON.parse(saved) : {};
  });

  const posts = [
    {
      id: 1,
      title: "Why 80% of Professionals Are Working Unknowingly Dehydrated",
      excerpt: "3-Minute Read",
      image: "/images/blog1image.png",
      url: "/blog1",
    },
    {
      id: 2,
      title: "Hidden Health Risks of Not Drinking Enough Water at Work",
      excerpt: "3-Minute Read",
      image: "/images/blog2image.png",
      url: "/blog2",
    },
    {
      id: 3,
      title: "Thirst Isn’t Always the First Sign of Body Dehydration",
      excerpt: "3-Minute Read",
      image: "/images/blog3image.png",
      url: "/blog3",
    },
    {
      id: 4,
      title: "Can Sound Frequencies Energize Your Water?",
      excerpt: "3-Minute Read",
      image: "/images/blog4image.png",
      url: "/blog4",
    },
  ];

  const toggleBookmark = (id) => {
    const updated = {
      ...bookmarked,
      [id]: !bookmarked[id],
    };

    setBookmarked(updated);
    localStorage.setItem("bookmarkedBlogs", JSON.stringify(updated));
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="relative w-full py-20 lg:py-24 overflow-hidden bg-white">
      {/* ===================== HEADING ===================== */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mb-12 md:mb-16"
      >
        <div className="s-gallery-inner">
          <div className="eyebrow">Blogs/Resources</div>

          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              color: "var(--gray-900)",
              marginBottom: 12,
              lineHeight: 1.15,
            }}
          >
            Frost Aura in Action
          </h2>

          <p
            style={{
              fontSize: "clamp(14px, 1.6vw, 16px)",
              color: "var(--gray-600)",
              maxWidth: 520,
              lineHeight: 1.7,
            }}
          >
            Dive deeper into hydration, wellness, and the science behind FROST.
            Tips, guides, and inspiring reads curated to elevate your lifestyle.
          </p>
        </div>
      </motion.div>

      {/* ===================== BLOG CARDS ===================== */}
      <div className="w-full overflow-hidden">
        <div className="overflow-x-auto overflow-y-hidden custom-scrollbar pb-4">
          <div className="s-gallery-inner">
            <div className="flex gap-5 md:gap-7 min-w-max">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="
                    w-[85vw]
                    xs:w-[78vw]
                    sm:w-[340px]
                    md:w-[360px]
                    lg:w-[380px]
                    flex-shrink-0
                  "
                >
                  <Card
                    className="
                      group
                      h-full
                      overflow-hidden
                      rounded-[28px]
                      border
                      border-gray-200
                      bg-white
                      shadow-md
                      hover:shadow-2xl
                      transition-all
                      duration-500
                    "
                  >
                    {/* IMAGE */}
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="
                          w-full
                          h-[240px]
                          sm:h-[280px]
                          md:h-[320px]
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-105
                        "
                      />

                      {/* BOOKMARK */}
                      <button
                        onClick={() => toggleBookmark(post.id)}
                        className="
                          absolute
                          top-4
                          right-4
                          z-10
                          bg-white/90
                          backdrop-blur-md
                          rounded-full
                          p-2.5
                          shadow-lg
                          transition-all
                          duration-300
                          hover:scale-110
                        "
                      >
                        {bookmarked[post.id] ? (
                          <BookmarkCheck className="w-5 h-5 text-[#5B869D]" />
                        ) : (
                          <Bookmark className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                    </div>

                    {/* CONTENT */}
                    <CardHeader className="px-5 md:px-6 pt-5 pb-3">
                      <CardTitle
                        className="
                          text-[20px]
                          md:text-[22px]
                          leading-snug
                          text-gray-900
                          whitespace-normal
                        "
                        style={{
                          fontFamily: "'Roboto', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {post.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="px-5 md:px-6 pb-6 flex flex-col">
                      <p
                        className="text-sm md:text-base text-gray-500 mb-5"
                        style={{
                          fontFamily: "'Roboto', sans-serif",
                        }}
                      >
                        {post.excerpt}
                      </p>

                      {/* BUTTON */}
                      <button
                        onClick={() => navigate(post.url)}
                        className="
                          mt-auto
                          relative
                          flex
                          items-center
                          justify-between
                          gap-4
                          border-2
                          border-[#5B869D]
                          text-[#5B869D]
                          font-medium
                          px-5
                          py-3
                          rounded-full
                          hover:bg-[#eef8fd]
                          transition-all
                          duration-300
                          w-fit
                          shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                        "
                        style={{
                          fontFamily: "'Roboto', sans-serif",
                        }}
                      >
                        <span>Read More</span>

                        <span
                          className="w-6 h-6 rounded-full"
                          style={{
                            backgroundColor: "#B7E6FF",
                            boxShadow:
                              "inset -4px -4px 10px rgba(255,255,255,0.6), inset 4px 4px 10px rgba(0,0,0,0.08)",
                          }}
                        />
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===================== STYLES ===================== */}
      <style jsx>{`
        .s-gallery-inner {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: clamp(16px, 4vw, 80px);
          padding-right: clamp(16px, 4vw, 80px);
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          margin-bottom: 18px;
          border-radius: 999px;
          background: rgba(91, 134, 157, 0.08);
          color: #5b869d;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: "Roboto", sans-serif;
        }

        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(91, 134, 157, 0.4);
          border-radius: 999px;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(91, 134, 157, 0.4) transparent;
        }

        @media (max-width: 768px) {
          .eyebrow {
            font-size: 12px;
            padding: 7px 14px;
          }
        }
      `}</style>
    </section>
  );
};

export default BlogSection;