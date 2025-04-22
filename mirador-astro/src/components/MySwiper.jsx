
import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper core styles
import 'swiper/css/navigation'; // Optional: Navigation styles
import 'swiper/css/pagination'; // Pagination styles
import { Navigation, Pagination } from 'swiper/modules';
import "../styles/myswiper.scss";

const MySwiper = ({ slides, type = 'video', slidesPerView = 1 }) => {

  const [playingIndex, setPlayingIndex] = useState(null); // Tracks the currently playing video index
  const swiperRef = useRef(null); // Ref for the Swiper instance

  // Handle video play/pause
  const toggleVideoPlay = (index) => {
    const allVideos = document.querySelectorAll('.story-video');
    const currentVideo = allVideos[index];

    if (currentVideo.paused) {
      // Pause all other videos
      allVideos.forEach((video, i) => {
        if (i !== index) {
          video.pause();
        }
      });

      // Play the current video
      currentVideo.play();
      setPlayingIndex(index);
    } else {
      // Pause the current video
      currentVideo.pause();
      setPlayingIndex(null);
    }
  };

  // Pause video on slide change
  const handleSlideChange = () => {
    const allVideos = document.querySelectorAll('.story-video');
    allVideos.forEach((video) => video.pause());
    setPlayingIndex(null); // Reset playing index
  };

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.on('slideChange', handleSlideChange); // Add event listener
    }

    return () => {
      if (swiperRef.current) {
        const swiperInstance = swiperRef.current.swiper;
        swiperInstance.off('slideChange', handleSlideChange); // Clean up listener
      }
    };
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination]} // Add Pagination to the modules
      spaceBetween={30} // Space between slides
      slidesPerView={slidesPerView} // Number of slides to show
      navigation // Enable navigation arrows
      pagination={{ clickable: true }} // Enable clickable pagination
      ref={swiperRef} // Attach swiperRef to Swiper
      loop={true}
      className={"swiper-" + type}
      autoHeight={true} 
    >
      {slides && slides.length > 0 && type === 'video' && slides.map((slide, index) => {
        return (
          <SwiperSlide key={slide.src + index}>
            <div className="video-wrapper">
              <video className="story-video" poster={slide.image}>
                <source src={slide.src} type="video/x-m4v"></source>
                Your browser does not support the video tag.
              </video>
              <div
                className={`play-overlay ${playingIndex === index ? 'playing' : ''}`}
                onClick={() => toggleVideoPlay(index)}
              >
                {/* {playingIndex === index ? '⏸️' : '▶️'} */}
                <svg width="154" height="154" viewBox="0 0 154 154" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_17_2)">
                  <path d="M57.72 107.39V48.45L108.65 77.9199L57.72 107.39Z" fill="#8FBEE6"></path>
                  <path d="M76.9 152.8C118.818 152.8 152.8 118.818 152.8 76.9C152.8 34.9816 118.818 1 76.9 1C34.9816 1 1 34.9816 1 76.9C1 118.818 34.9816 152.8 76.9 152.8Z" stroke="#12819E" strokeWidth="2" strokeMiterlimit="10"></path>
                  </g>
                  <defs>
                  <clipPath id="clip0_17_2">
                  <rect width="153.8" height="153.8" fill="white"></rect>
                  </clipPath>
                  </defs>
                </svg>
                {slide.title &&
                  <>
                    <h5>Real Stories</h5>
                    <h2>{slide.title}</h2>
                  </>
                }
              </div>
            </div>
          </SwiperSlide>
        )
      })
      }

{slides && slides.length > 0 && type === 'image' && slides.map((slide, index) => {
        return (
          <SwiperSlide key={slide.src + index}>
            <img src={slide.src} alt={slide.alt} />
          </SwiperSlide>
        )
      })
      }
      {slides && slides.length > 0 && type === 'text' && slides.map((slide, index) => {
        return (
          <SwiperSlide key={slide.src + index}>
            <p><em>"{slide.text}"</em></p>
            <svg width="209" height="36" viewBox="0 0 209 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_46_2)">
                <path d="M18.92 0L24.46 12.26L37.83 13.74L27.88 22.8L30.61 35.98L18.92 29.32L7.23 35.98L9.95 22.8L0 13.74L13.37 12.26L18.92 0Z" fill="url(#paint0_linear_46_2)"></path>
                <path d="M61.4701 0L67.0101 12.26L80.38 13.74L70.43 22.8L73.1601 35.98L61.4701 29.32L49.7701 35.98L52.5 22.8L42.55 13.74L55.92 12.26L61.4701 0Z" fill="url(#paint1_linear_46_2)"></path>
                <path d="M104.01 0L109.56 12.26L122.93 13.74L112.98 22.8L115.71 35.98L104.01 29.32L92.32 35.98L95.05 22.8L85.1 13.74L98.47 12.26L104.01 0Z" fill="url(#paint2_linear_46_2)"></path>
                <path d="M146.56 0L152.11 12.26L165.48 13.74L155.53 22.8L158.25 35.98L146.56 29.32L134.87 35.98L137.6 22.8L127.65 13.74L141.02 12.26L146.56 0Z" fill="url(#paint3_linear_46_2)"></path>
                <path d="M189.11 0L194.66 12.26L208.03 13.74L198.08 22.8L200.8 35.98L189.11 29.32L177.42 35.98L180.15 22.8L170.2 13.74L183.57 12.26L189.11 0Z" fill="url(#paint4_linear_46_2)"></path>
              </g>
              <defs>
                <linearGradient id="paint0_linear_46_2" x1="0" y1="17.99" x2="37.83" y2="17.99" gradientUnits="userSpaceOnUse"><stop stopColor="#33baba"></stop><stop offset="1" stopColor="#8fbee6"></stop></linearGradient>
                <linearGradient id="paint1_linear_46_2" x1="42.55" y1="0" x2="80.38" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#33baba"></stop><stop offset="1" stopColor="#8fbee6"></stop></linearGradient>
                <linearGradient id="paint2_linear_46_2" x1="85.1" y1="0" x2="122.93" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#33baba"></stop><stop offset="1" stopColor="#8fbee6"></stop></linearGradient>
                <linearGradient id="paint3_linear_46_2" x1="127.65" y1="0" x2="165.48" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#33baba"></stop><stop offset="1" stopColor="#8fbee6"></stop></linearGradient>
                <linearGradient id="paint4_linear_46_2" x1="170.2" y1="0" x2="208.03" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#33baba"></stop><stop offset="1" stopColor="#8fbee6"></stop></linearGradient>
                <clipPath id="clip0_46_2"><rect width="208.03" height="35.98" fill="white"></rect></clipPath>
              </defs>
            </svg>
            <p className="body-lg">— {slide.name}</p>
          </SwiperSlide>
        )
      })
      }
    </Swiper>
  );
};

export default MySwiper;
