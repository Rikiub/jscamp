import { Star } from "lucide-react";
import { Button, type ButtonProps } from "../Button";

export function FavoriteIcon({
	fill = false,
	...rest
}: { fill?: boolean } & ButtonProps) {
	return (
		<Button variant="ghost" {...rest}>
			<Star fill={fill ? "yellow" : "transparent"} />
		</Button>
	);
}
