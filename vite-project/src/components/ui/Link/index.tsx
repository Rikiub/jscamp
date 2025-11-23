import type { LinkProps } from "react-router";

export function Link({ children, ...rest }: LinkProps) {
	return (
		<Link {...rest} viewTransition>
			{children}
		</Link>
	);
}
