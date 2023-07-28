import * as React from 'react';
import {useState} from 'react';
import {Camera} from "lucide-react";

export const DashboardComponent = () => {
	const [counter, setCounter] = useState(0);

	return (
		<div data-testid="app">
			<h1 className="tw-flex tw-bg-amber-50">{counter}</h1>
			<Camera size={24}/>
			<button onClick={() => {
				setCounter(prev => prev + 1);
			}}>
				lol
			</button>
		</div>
	);
};
