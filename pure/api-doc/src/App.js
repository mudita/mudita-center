import "swagger-ui-react/swagger-ui.css";
import React from "react";
import SwaggerUI from "swagger-ui-react";
import schema from "./api.v1.json";

function App() {
  return <SwaggerUI spec={schema} docExpansion="list"/>;
}

export default App;
