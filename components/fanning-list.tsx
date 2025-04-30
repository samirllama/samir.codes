"use client";

import React, { useState } from "react";
import { cn } from "../lib/utils";
/*

? Revealing the detailList items when an experience is expanded, Step-by-Step Explanation:
> 1. Absolute Positioning for Details: Position the details absolutely below each list item to prevent layout shifts affecting the fanning effect.

> 2. Animate maxHeight and Opacity: Use CSS transitions on maxHeight and opacity to create a smooth expansion effect.

> 3. Conditional Rendering Based on Active Index: Display details only for active item using activeIndex state.

> 4. Style Adjustments: Ensure details are styled appropriately and appear above other items using z-index.

*/

const FanningListV2 = ({ experiences }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const activeIndex = hoveredIndex !== null ? hoveredIndex : focusedIndex;

  //  Event Handlers ---
  const handleMouseEnter = (index) => {
    console.log("mouse entered::", index);
    // Only update if hover is supported (media query handled in CSS)
    // This prevents hover effects on touch devices where hover isn't a persistent state.
    // However, for simplicity in this React example, we'll let CSS handle the media query.
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const maxRotation = 15;
  const maxTranslationY = 30;
  const minOpacity = 0.3;

  return (
    <ul className="fanning-list uppercase border-t border-white/30">
      {experiences.map((job, index) => {
        const distance = activeIndex !== null ? index - activeIndex : 0;
        const dynamicStyles =
          activeIndex !== null
            ? {
                transform: `rotate(${distance * maxRotation}deg) translateY(${
                  distance * maxTranslationY
                }px)`,
                opacity: Math.max(
                  minOpacity,
                  1 - Math.abs(distance) / experiences.length
                ),
                ...(index === activeIndex && {
                  transform: "none",
                  opacity: 1,
                }),
              }
            : {};

        return (
          <li
            key={index}
            className="fanning-list-item block relative"
            style={dynamicStyles}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            tabIndex={0}
          >
            {/* Existing Content */}
            <span className="border-b border-color-accent w-full py-2 lg:py-1 block lg:flex lg:items-end">
              <span className="relative ">
                <span
                  className="block"
                  style={{ transform: "translateY(0%) translateZ(0px)" }}
                >
                  <span className="block ms-text-adjust">{job.company}</span>
                </span>
              </span>
            </span>
            <div>{job.title}</div>
            <div>{job?.company}</div>
            <span className="block">
              <span className="block ms-text-adjust">
                {job.startYear} - {job.endYear || "Present"}
              </span>
            </span>

            {/* Detail List Animation */}
            {job.detailList && job.detailList.length > 0 && (
              <div
                className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-sm z-10 transition-all duration-500 ease-in-out overflow-hidden"
                style={{
                  maxHeight: activeIndex === index ? "1000px" : "0",
                  opacity: activeIndex === index ? 1 : 0,
                }}
              >
                <div className="p-4 space-y-2">
                  {job.detailList.map((detail, i) => (
                    <div key={i} className="text-sm text-gray-700">
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const FanningList = ({ experiences }) => {
  // State to track the index of the currently hovered item
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // State to track the index of the currently focused item (for accessibility via keyboard)
  const [focusedIndex, setFocusedIndex] = useState(null);

  // Determine the active index. Hover takes precedence if both hover and focus are active.
  const activeIndex = hoveredIndex !== null ? hoveredIndex : focusedIndex;

  //  Event Handlers ---
  const handleMouseEnter = (index) => {
    // Only update if hover is supported (media query handled in CSS)
    // This prevents hover effects on touch devices where hover isn't a persistent state.
    // However, for simplicity in this React example, we'll let CSS handle the media query.
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  // Style Calculation ---
  // These values control the intensity of the fanning effect.
  // Adjust them to get the desired arc shape and opacity range.
  const maxRotation = 15; // Maximum rotation angle for items furthest from the active one
  const maxTranslationY = 30; // Maximum vertical translation
  const minOpacity = 0.3; // Minimum opacity for items furthest from the active one

  return (
    // Apply the base fanning-list class and existing Tailwind styles
    <ul className="fanning-list uppercase border-t border-white/30">
      {experiences.map((job, index) => {
        // Calculate the distance from the active item.
        // If no item is active, distance is 0 (no effect).
        const distance = activeIndex !== null ? index - activeIndex : 0;

        // Calculate dynamic styles based on distance
        const dynamicStyles =
          activeIndex !== null
            ? {
                // Rotation: More rotation for items further away
                transform: `rotate(${distance * maxRotation}deg) translateY(${
                  distance * maxTranslationY
                }px)`,
                // Opacity: Lower opacity for items further away
                opacity: Math.max(
                  minOpacity,
                  1 - Math.abs(distance) / experiences.length // Adjust denominator for opacity falloff
                ),
                // Ensure the active item has full opacity and no transform
                ...(index === activeIndex && {
                  transform: "none",
                  opacity: 1,
                }),
              }
            : {};

        const siblingIndex = ` ${activeIndex !== null ? index : 0}`;

        return (
          <li
            key={index} // Using index as key is acceptable here if the list order is static
            className={cn(["fanning-list-item", "block"])}
            style={{ "--sibling-index": siblingIndex }} // Apply calculated dynamic styles
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            // Add a tabIndex to make list items focusable (if they aren't already links/buttons)
            tabIndex={0}
          >
            <span className="border-b border-color-accent w-full py-2 lg:py-1 block lg:flex lg:items-end">
              <span className="relative ">
                <span
                  className="block"
                  style={{ transform: "translateY(0%) translateZ(0px)" }}
                >
                  <span className="block ms-text-adjust">{job.company}</span>
                </span>
              </span>
            </span>
            <div>{job.title}</div>
            <div>{job?.company}</div>
            {/* Date Range */}
            <span className="block">
              <span className="block ms-text-adjust">
                {job.startYear} - {job.endYear || "Present"}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default FanningList;
