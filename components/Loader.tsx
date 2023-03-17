import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        flexDirection: "column",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <p
        style={{
          color: "black",
          fontSize: "24px",
          fontFamily: "Roboto, sans-serif",
          textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
        }}
      >
        Your little ass is going to wait. You got that?
      </p>
      <img src="/images/loading.gif" alt="loading..." />
    </div>
  );
};

export default Loader;





