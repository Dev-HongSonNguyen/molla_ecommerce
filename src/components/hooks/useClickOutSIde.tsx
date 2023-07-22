import { useEffect, useRef, useState } from "react";

export default function useClickOutSide(dom: any) {
  const [show, setShow] = useState(false);
  const nodeRef: any = useRef(null);
  useEffect(() => {
    function handleClickOutSide(e: any) {
      if (
        nodeRef.current &&
        !nodeRef.current.contains(e.target) &&
        !e.target.matches(dom)
      ) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  });
  return {
    show,
    setShow,
    nodeRef,
  };
}
