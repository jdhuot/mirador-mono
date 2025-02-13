import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dots from "../assets/mirador-wealth-graphic-2.png";

export default function Tabs({ items, alwaysAccordion = false }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isAccordion, setIsAccordion] = useState(alwaysAccordion);
  const accordionRefs = useRef([]); // Store references to accordion sections

  // Detect if the screen should switch to accordion mode
  useEffect(() => {
    if (!alwaysAccordion) {
      const checkScreenSize = () => {
        setIsAccordion(window.innerWidth < 992);
      };

      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }
  }, [alwaysAccordion]);

  // // Scroll to the active accordion content when it's opened
  // useEffect(() => {
  //   if (isAccordion && activeTab !== -1) {
  //     const activeAccordion = accordionRefs.current[activeTab];
  //     if (activeAccordion) {
  //       setTimeout(() => {
  //         activeAccordion.scrollIntoView({ behavior: "smooth", block: "start" });
  //       }, 500); // Small delay to ensure the animation starts
  //     }
  //   }
  // }, [activeTab, isAccordion]);

  useEffect(() => {
    if (isAccordion && activeTab !== -1) {
      const activeAccordion = accordionRefs.current[activeTab];
      if (activeAccordion) {
        setTimeout(() => {
          requestAnimationFrame(() => {
            const offset = 140; // Adjust this based on your navbar height
            const elementPosition = activeAccordion.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;
  
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          });
        }, 300); // Increased delay to ensure animation is fully expanded
      }
    }
  }, [activeTab, isAccordion]);

  return (
    <div className={`tabs-wrapper ${isAccordion ? "accordion" : ""}`}>
      {isAccordion ? (
        <div className="accordion">
          {items.map((item, index) => (
            <div
              key={index}
              className="accordion-item"
              id={`accordion-item-${index}`} // Assign a unique ID
              ref={(el) => (accordionRefs.current[index] = el)} // Store ref
            >
              <button
                className={`accordion-header ${activeTab === index ? "active" : ""}`}
                onClick={() => setActiveTab(activeTab === index ? -1 : index)}
              >
                {item.title}
              </button>
              <AnimatePresence>
                {activeTab === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="accordion-content"
                  >
                    <img className="tabs-dots" src={dots.src} alt="" />
                    {typeof item.content === "string" ? (
                      <div dangerouslySetInnerHTML={{ __html: item.content }} />
                    ) : (
                      <div>{item.content}</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      ) : (
        <div className="tabs-menu flex-v">
          {items.map((item, index) => (
            <button
              key={index}
              className={`${activeTab === index ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}

      {!isAccordion && (
        <div className="tabs-content">
          <img className="tabs-dots" src={dots.src} alt="" />
          {typeof items[activeTab].content === "string" ? (
            <div dangerouslySetInnerHTML={{ __html: items[activeTab].content }} />
          ) : (
            <div>{items[activeTab].content}</div>
          )}
        </div>
      )}
    </div>
  );
}


// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import dots from '../assets/mirador-wealth-graphic-2.png';

// export default function Tabs({ items, alwaysAccordion = false }) {
//   const [activeTab, setActiveTab] = useState(0);
//   const [isAccordion, setIsAccordion] = useState(alwaysAccordion);

//   useEffect(() => {
//     if (!alwaysAccordion) {
//       const checkScreenSize = () => {
//         setIsAccordion(window.innerWidth < 992);
//       };

//       checkScreenSize();
//       window.addEventListener("resize", checkScreenSize);
//       return () => window.removeEventListener("resize", checkScreenSize);
//     }
//   }, [alwaysAccordion]);

//   return (
//     <div className={`tabs-wrapper ${isAccordion ? "accordion" : ""}`}>
//       {isAccordion ? (
//         <div className="accordion">
//           {items.map((item, index) => (
//             <div key={index} className="accordion-item">
//               <button
//                 className={`accordion-header ${activeTab === index ? "active" : ""}`}
//                 onClick={() => setActiveTab(activeTab === index ? -1 : index)}
//               >
//                 {item.title}
//               </button>
//               <AnimatePresence>
//                 {activeTab === index && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                     className="accordion-content"
//                   >
//                     <img className="tabs-dots" src={dots.src} alt="" />
//                     {typeof item.content === "string" ? (
//                       <div dangerouslySetInnerHTML={{ __html: item.content }} />
//                     ) : (
//                       <div>{item.content}</div>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="tabs-menu flex-v">
//           {items.map((item, index) => (
//             <button
//               key={index}
//               className={`${activeTab === index ? "active" : ""}`}
//               onClick={() => setActiveTab(index)}
//             >
//               {item.title}
//             </button>
//           ))}
//         </div>
//       )}

//       {!isAccordion && (
//         <div className="tabs-content">
//           <img className="tabs-dots" src={dots.src} alt="" />
//           {typeof items[activeTab].content === "string" ? (
//             <div dangerouslySetInnerHTML={{ __html: items[activeTab].content }} />
//           ) : (
//             <div>{items[activeTab].content}</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }