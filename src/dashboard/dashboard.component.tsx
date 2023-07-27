import * as React from 'react';
import {useState} from "react";

export const DashboardComponent = () => {
	const [counter, setCounter] = useState(0);

	return (
		<div data-testid="app">
			<h1 className="text-3xl font-bold underline">{counter}</h1>
			<button onClick={() => {
				setCounter(prev => prev + 1);
			}}>
				lol
			</button>
		</div>
	);
};
