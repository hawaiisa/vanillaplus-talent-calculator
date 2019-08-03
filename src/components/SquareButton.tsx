import React from "react";

import "./SquareButton.css";
import border from "../assets/border-default.png";
import highlightedBorder from "../assets/border-highlight.png";
import talentOutlines from "../assets/talent-outlines.gif";

interface Props {
  icon: string;
  state: "maxed" | "unlocked" | "locked";
  selected?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onRightClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const SquareButton = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      icon,
      onRightClick = () => {},
      selected = false,
      className = "",
      state,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={`SquareButton ${className}`}
        onContextMenu={e => {
          e.preventDefault();
          onRightClick();
        }}
        {...rest}
      >
        <div
          className={`SquareButton-content ${
            state === "locked" ? "SquareButton-content--disabled" : ""
          }`}
          style={{
            backgroundImage: `url(${border}), url(${icon})`,
          }}
        />
        <div
          className="SquareButton-aura"
          style={{ backgroundImage: `url(${highlightedBorder})` }}
        />
        {state && (
          <div
            className={`SquareButton-outline SquareButton-outline--${state}`}
            style={{ backgroundImage: `url(${talentOutlines})` }}
          />
        )}
      </button>
    );
  },
);
