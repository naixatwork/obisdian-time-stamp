import React, {ReactNode} from "react";

type ComingSoonProps = {
	children: ReactNode,
	extendClassName?: string
}

const ComingSoon = ({children, extendClassName = ''}: ComingSoonProps) => {
	return (
		<div
			className={`
				tw-h-full
				tw-shadow-lg
				tw-bg-obsidian-base-20
				tw-rounded-lg
				tw-flex
				tw-justify-center
				tw-items-center
				tw-relative
				${extendClassName}`}
		>
			<p className="tw-absolute tw-leading-4 tw-bottom-1 tw-left-1 tw-text-obsidian-primary tw-rounded tw-m-0 tw-p-0.5 tw-text-xs">
				coming soon
			</p>
			{children}
		</div>
	);
};

export default ComingSoon;
