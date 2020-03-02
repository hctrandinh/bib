import React from "react";
import MaitreRes from "./assets/maitre_res.json";
import "./GradientBorder.css";

//Note: Act like a return.
export const Maitre = () => (
  <div>
    <h2>Maitre restaurants</h2>
    {MaitreRes.map((Maitre, Name) => {
      return (
        <div className="gradient-border">
          <p>{Maitre.Name}</p>
        </div>
      );
    })}
  </div>
);
