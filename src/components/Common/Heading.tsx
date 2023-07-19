import React from "react";
interface IheadingProps {
  children: string;
}
const Heading = ({ children }: IheadingProps) => {
  return (
    <div className="product-title">
      <h5>{children}</h5>
    </div>
  );
};

export default Heading;
