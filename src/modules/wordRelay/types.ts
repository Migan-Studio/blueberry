export interface APIResponse {
	channel: {
		title: string;
		link: string;
		description: string;
		total: number;
		start: number;
		num: number;
		item: Item[];
	};
}

export interface Item {
	word: string;
	sense: {
		target_code: number;
		sense_no: number;
		definition: string;
		pos: string;
		link: string;
		type: string;
	}[];
}
