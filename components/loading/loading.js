import React from "react";
import style from "./loading.module.css";

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className={style.loadingOverlay}>
      <div className={style.loadingSpinner}>
        <div className={style.spinner}></div>
      </div>
    </div>
  );
};

export default Loading;
