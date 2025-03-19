import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dots from "../assets/mirador-wealth-graphic-2.png";

export default function Tabs({ items, alwaysAccordion = false }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isAccordion, setIsAccordion] = useState(alwaysAccordion);
  const [userClicked, setUserClicked] = useState(false); // ✅ Track if user clicked a tab
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

  // ✅ Only scroll when a user clicks, not on page load
  useEffect(() => {
    if (isAccordion && activeTab !== -1 && userClicked) {
      const activeAccordion = accordionRefs.current[activeTab];
      if (activeAccordion) {
        setTimeout(() => {
          requestAnimationFrame(() => {
            const offset = 140; // Adjust this based on navbar height
            const elementPosition = activeAccordion.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          });
        }, 300); // Delay to ensure animation is fully expanded
      }
    }
  }, [activeTab, isAccordion, userClicked]); // ✅ Only runs when userClicked is true

  return (
    <div className={`tabs-wrapper ${isAccordion ? "accordion" : ""}`}>
      {isAccordion ? (
        <div className="accordion">
          {items.map((item, index) => (
            <div
              key={index}
              className="accordion-item"
              id={`accordion-item-${index}`}
              ref={(el) => (accordionRefs.current[index] = el)}
            >
              <button
                className={`accordion-header ${activeTab === index ? "active" : ""}`}
                onClick={() => {
                  setUserClicked(true); // ✅ Mark that the user clicked
                  setActiveTab(activeTab === index ? -1 : index);
                }}
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
                    <img className="tabs-dots" src={dots.src} alt="" data-fade="from_top"/>
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
              onClick={() => {
                setUserClicked(true); // ✅ Mark that the user clicked
                setActiveTab(index);
              }}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}

      {!isAccordion && (
        <div className="tabs-content">
          <img className="tabs-dots" src={dots.src} alt="" data-fade="from_top"/>
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



// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import dots from "../assets/mirador-wealth-graphic-2.png";

// export default function Tabs({ items, alwaysAccordion = false }) {
//   const [activeTab, setActiveTab] = useState(0);
//   const [isAccordion, setIsAccordion] = useState(alwaysAccordion);
//   const accordionRefs = useRef([]); // Store references to accordion sections

//   // Detect if the screen should switch to accordion mode
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

//   useEffect(() => {
//     if (isAccordion && activeTab !== -1) {
//       const activeAccordion = accordionRefs.current[activeTab];
//       if (activeAccordion) {
//         setTimeout(() => {
//           requestAnimationFrame(() => {
//             const offset = 140; // Adjust this based on your navbar height
//             const elementPosition = activeAccordion.getBoundingClientRect().top + window.scrollY;
//             const offsetPosition = elementPosition - offset;
  
//             window.scrollTo({ top: offsetPosition, behavior: "smooth" });
//           });
//         }, 300); // Increased delay to ensure animation is fully expanded
//       }
//     }
//   }, [activeTab, isAccordion]);

//   return (
//     <div className={`tabs-wrapper ${isAccordion ? "accordion" : ""}`}>
//       {isAccordion ? (
//         <div className="accordion">
//           {items.map((item, index) => (
//             <div
//               key={index}
//               className="accordion-item"
//               id={`accordion-item-${index}`} // Assign a unique ID
//               ref={(el) => (accordionRefs.current[index] = el)} // Store ref
//             >
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
