import * as React from 'react';
import ClockComponent from "../shared/clock/clock.component";

export const DashboardComponent = () => {
	return (
		<main
			data-testid="app"
			className="tw-@container tw-container tw-mx-auto tw-w-full tw-h-full tw-scroll-auto"
		>
			<div
				className="
					tw-w-full
					tw-grid
					tw-grid-cols-2 @md:tw-grid-cols-4 @2xl:@4xl:tw-grid-cols-6 @6xl:tw-grid-cols-8
					tw-gap-5
			">
				<div className="
					tw-col-span-2
					tw-h-full
					tw-aspect-[2/1]
					tw-shadow-lg
					tw-bg-obsidian-base-10
					tw-rounded-lg
					tw-text-xl
					tw-flex
					tw-justify-center
					tw-items-center
				">
					<ClockComponent/>
				</div>
			</div>
		</main>
	);
};
