import React from "react";

const ComponentToPrintLetter = props => {
  return (
    <div ref={props.ref}>
      <div>Log wrapper</div>
      <div className="font-18">
        <div>Dear Families</div>
        <div>
          This year, in class, students are using MathFactLab to practice and
          learn the basic math facts (for example, 7 + 5, 14 - 9, 6 x 8, or 32 ÷
          4). What we particularly like about this program is that problems are
          represented visually and students are given strategies to solve them.{" "}
        </div>
        <div>
          Regular practice at home with MathFactLab will lead to improved math
          fact fluency and greater overall success in math.{" "}
        </div>
      </div>
      <div
        style={{ padding: "12px", border: "1px solid black" }}
        className="mt-10"
      >
        <ul>
          <li>
            Students progress through a series of levels, learning a new group
            of related math facts at each level
          </li>
          <li>
            he program automatically logs students off at the end of their
            session. Session lengths are set by the teacher and range from 5
          </li>
          <li>
            MathFactLab works on desktops, laptops, Chromebooks, iPads and other
            tablets. It is not optimized for smartphones.
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ComponentToPrintLetter;
