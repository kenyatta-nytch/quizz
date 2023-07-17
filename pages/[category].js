import { useSettings } from '../context/settings'
import { Quiz } from "../components";

export default function Index() {
	const {category} = useSettings()

	if (!category) return(
		<div>Select a category first</div>
	);

	return(
		<div className="h-full">
			<Quiz />
		</div>
	)
}