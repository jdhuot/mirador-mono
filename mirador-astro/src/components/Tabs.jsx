import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dots from '../assets/mirador-wealth-graphic-2.png';

export default function Tabs({ items, alwaysAccordion = false }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isAccordion, setIsAccordion] = useState(alwaysAccordion);

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

  return (
    <div className={`tabs-wrapper ${isAccordion ? "accordion" : ""}`}>
      {isAccordion ? (
        <div className="accordion">
          {items.map((item, index) => (
            <div key={index} className="accordion-item">
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
//   const [isAccordion, setIsAccordion] = useState(false);

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
//     <div className="tabs-wrapper">
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

