import React, { useState, MouseEvent, JSX } from "react";
import { HeartIcon } from "@heroicons/react/24/solid"
import "./css/likebutton.css";

function LikeButton(props: { bundled?: boolean; liked?: boolean; } = { bundled: false, liked: undefined }): JSX.Element {
  const [active, setActive] = useState(false);

  const toggleActive = (e: MouseEvent<HTMLElement>) => {
    setActive((prev) => !prev);
  };

  if (props.liked !== undefined) {
    setActive(props.liked);
  }

  return (
    <>
      <div
        className={props.bundled
          ? "like-btn-bundled"
          : "large-font text-center fixed w-[70px] h-[70px] right-[30px] translate-y-[-50vh]"}
        style={props.bundled ? { width: 32, height: 32, position: "relative" } : undefined}
        onClick={toggleActive}
      >
        <HeartIcon
          className={active ? "active like-svg" : "like-svg"}
          style={{ position: "relative", display: "inline-block" }}
          color="red" />
      </div>
    </>
  );
}

export default LikeButton;
