import { Star } from "lucide-react";
import { Button, type ButtonProps } from "../Button";
// import styles from "./styles.module.css";

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
