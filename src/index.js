import React from "react";
import ReactDOM from "react-dom";


import "./styles.css";

import Books from "./Books/Books";

function App() {

	return (
			<div>
				<Books/>
			</div>
	);
}

const ObservedApp = App;

const rootElement = document.getElementById("root");
ReactDOM.render(<ObservedApp/>, rootElement);
