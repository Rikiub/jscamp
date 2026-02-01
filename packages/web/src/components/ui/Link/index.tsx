import { type LinkProps, Link as RouterLink } from "react-router";

export function Link({ children, ...rest }: LinkProps) {
	return (
		<RouterLink {...rest} viewTransition>
			{children}
		</RouterLink>
	);
}
