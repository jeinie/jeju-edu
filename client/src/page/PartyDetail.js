import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseGoodCnt, increaseBadCnt } from "../store/userSlice.js";

export default function PartyDetail() {
  let test = useSelector((state) => state);
  console.log(test);

  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(increaseGoodCnt());
      }}
    >
      버튼
    </button>
  );
}
