import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import FsLightbox from "fslightbox-react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { FaArrowUp } from "react-icons/fa";

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "LumiaSpark-Solutions",
  },
});

// Log SDK version
console.log("Cloudinary SDK version:", require("@cloudinary/url-gen/package.json").version);

const backgroundImageUrl = cld.image("b_g").format("auto").quality("auto").toURL();

// Helper function for generating thumbnail URLs
const generateThumbnailUrl = (publicId, isVideo, cloudName) => {
  const baseUrl = `https://res.cloudinary.com/${cloudName}`;
  if (isVideo) {
    return `${baseUrl}/video/upload/so_0,w_400,c_fill,f_jpg,q_auto/${publicId}.jpg`;
  }
  return cld.image(publicId).format("auto").quality("auto").resize(fill().width(400)).toURL();
};

const fetchImages = async () => {
  try {
    const response = await fetch("/gallery-data.json");
    if (!response.ok) throw new Error(`Failed to fetch gallery data: ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Gallery data is empty or invalid");
    }
    // Remove duplicates based on publicId
    const uniqueData = Array.from(new Map(data.map(item => [item.publicId, item])).values());
    console.log(`Fetched unique items: ${uniqueData.length}`);
    return uniqueData;
  } catch (error) {
    console.error("Error fetching gallery data:", error.message);
    return [
      {
        publicId: "work_pictures_116_mnq6ua",
        alt: "Close-up of engine repair in progress",
        category: "painting",
        type: "image",
      },
      {
        publicId: "work_pictures_3_idqfzm",
        alt: "Car being painted in spray booth",
        category: "in-progress-works",
        type: "image",
      },
      {
        publicId: "video_41_j6svrb",
        alt: "Before and after repair video",
        category: "videos",
        type: "video",
      },
    ];
  }
};

function Gallery() {
  const [toggler, setToggler] = useState(false);
  const [slide, setSlide] = useState(1);
  const [filter, setFilter] = useState("all");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const itemsPerPage = 20;
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "LumiaSpark-Solutions";

  useEffect(() => {
    let isMounted = true;
    fetchImages().then((data) => {
      if (isMounted) {
        setItems(data);
        setLoading(false);
      }
    }).catch((err) => {
      if (isMounted) {
        setError("Failed to load gallery items: " + err.message);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Memoize categories
  const categories = useMemo(() => [
    { label: "All Items", value: "all" },
    ...Array.from(new Set(items.map((item) => item.category))).map((cat) => ({
      label: cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " "),
      value: cat,
    })),
  ], [items]);

  // Memoize filtered items
  const filteredItems = useMemo(() => {
    console.log(`Filtering items: filter=${filter}, items.length=${items.length}`);
    const result = items.filter((item) => {
      if (filter === "all") return true;
      return item.category === filter;
    });
    console.log(`Filtered items: ${result.length}, items: ${result.map(i => i.publicId).join(", ")}`);
    return result;
  }, [items, filter]);

  // Pagination logic
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  console.log(`Pagination: page=${currentPage}, totalPages=${totalPages}, startIndex=${startIndex}, endIndex=${endIndex}, paginatedItems=${paginatedItems.length}`);

  const openLightbox = (globalIdx) => {
    console.log(`Attempting to open lightbox: globalIdx=${globalIdx}, publicId=${filteredItems[globalIdx]?.publicId}, slide=${globalIdx + 1}`);
    setSlide(globalIdx + 1);
    setToggler((prev) => {
      console.log(`Toggler state: ${prev} -> ${!prev}`);
      return !prev;
    });
  };

  const handleKeyDown = (e, globalIdx) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      console.log(`Keydown triggered for globalIdx=${globalIdx}`);
      openLightbox(globalIdx);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  if (loading) {
    return (
      <section>
        <div
          className="w-full bg-cover bg-center bg-no-repeat relative overflow-hidden pt-12 pb-10 sm:pt-14 sm:pb-12 md:pt-16 md:pb-14 min-h-[150px] sm:min-h-[180px] md:min-h-[200px]"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-10 bg-white/50 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-white/50 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-center py-16 text-bng-red">{error}</div>;
  }

  return (
    <section>
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative overflow-hidden pt-12 pb-10 sm:pt-14 sm:pb-12 md:pt-16 md:pb-14 min-h-[150px] sm:min-h-[180px] md:min-h-[200px]"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            Gallery Showcase
          </h1>
          <ul className="flex justify-center space-x-2 mt-4 text-white text-base md:text-lg lg:text-xl">
            <li>
              <Link to="/" className="text-white hover:underline" aria-label="Home">
                Home
              </Link>
            </li>
            <li className="text-white">/</li>
            <li className="text-white">Gallery</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-5 mb-12">
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {categories.map((btn) => (
            <button
              key={btn.value}
              className={`px-4 py-2 rounded transition-colors ${
                filter === btn.value
                  ? "bg-bng-blue text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setFilter(btn.value)}
              aria-current={filter === btn.value ? "true" : "false"}
              aria-label={`Filter by ${btn.label}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {paginatedItems.map((item, idx) => {
            const isVideo = item.type === "video";
            const globalIdx = startIndex + idx;
            let thumbnailUrl;
            try {
              thumbnailUrl = generateThumbnailUrl(item.publicId, isVideo, cloudName);
            } catch (err) {
              console.error(`Error generating thumbnail for ${item.publicId}:`, err.message);
              thumbnailUrl = isVideo
                ? `https://res.cloudinary.com/${cloudName}/video/upload/w_400,c_fill,f_jpg,q_auto/${item.publicId}.jpg`
                : cld.image(item.publicId).format("auto").quality("auto").resize(fill().width(400)).toURL();
            }

            console.log(`Rendering item: ${item.publicId}, URL: ${thumbnailUrl}, globalIdx: ${globalIdx}`);

            return (
              <div key={item.publicId} className="relative">
                <img
                  src={thumbnailUrl}
                  alt={item.alt}
                  className="w-full aspect-[4/3] object-cover rounded cursor-pointer transition-transform hover:scale-105 min-h-[150px]"
                  onClick={() => {
                    console.log(`Thumbnail clicked: publicId=${item.publicId}, globalIdx=${globalIdx}`);
                    openLightbox(globalIdx);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, globalIdx)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open ${item.alt} in lightbox`}
                  loading="eager"
                  onError={(e) => {
                    console.error(`Thumbnail failed for: ${item.publicId}, URL: ${thumbnailUrl}`);
                    e.target.src = "https://via.placeholder.com/400x300?text=Thumbnail+Unavailable";
                  }}
                />
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded transition-opacity hover:bg-black/20 pointer-events-none">
                    <svg
                      className="w-16 h-16 text-white opacity-90 hover:opacity-100"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 1
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-bng-blue text-white hover:bg-bng-dark"
              }`}
              aria-label="Previous page"
            >
              Previous
            </button>
            <span className="py-2 text-bng-gray">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-bng-blue text-white hover:bg-bng-dark"
              }`}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </div>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-5 right-5 z-50 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-bng-blue text-white rounded-full shadow-lg hover:bg-bng-dark transition-all duration-300 transform ${
          showBackToTop ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
        aria-label="Scroll back to top"
        tabIndex={showBackToTop ? 0 : -1}
      >
        <FaArrowUp className="text-lg md:text-xl" />
      </button>
      <FsLightbox
        toggler={toggler}
        sources={filteredItems.map((item) => {
          const url = item.type === "video"
            ? cld.video(item.publicId).format("mp4").toURL()
            : cld.image(item.publicId).format("auto").quality("auto").toURL();
          console.log(`FsLightbox source: publicId=${item.publicId}, url=${url}`);
          return url;
        })}
        slide={slide}
        onOpen={() => console.log("FsLightbox opened")}
        onClose={() => console.log("FsLightbox closed")}
        onInit={() => console.log("FsLightbox initialized")}
      />
    </section>
  );
}

export default Gallery;