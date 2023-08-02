import React, {useEffect} from "react";
import {useSignal} from "@preact/signals-react";
import {container} from "tsyringe";
import GraphPluginService from "../../core/graph-plugin-service/graphPlugin.service";
import {GraphGroup} from "../../core/graph-plugin-service/graphPlugin.types";
import {Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";

const GroupPie = () => {
	const data = useSignal<GraphGroup[]>([]);

	useEffect(() => {
		const graphPluginService = container.resolve(GraphPluginService);
		graphPluginService.filesCategoryByGroups().subscribe({
			next: (files) => {
				data.value = files;
			}
		});
	}, []);

	return (
		<div className="
			tw-flex
			tw-rounded-lg
			tw-items-center
			tw-justify-center
			tw-aspect-square
			tw-p-5">
			<ResponsiveContainer aspect={1} width="100%">
				<PieChart width={500} height={500}>
					<Pie
						innerRadius={60}
						outerRadius={80}
						label={(group: GraphGroup) => group.name}
						dataKey={(group: GraphGroup) => group.associatedFiles.length}
						data={data.value}
					/>
					<Tooltip/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default GroupPie;
