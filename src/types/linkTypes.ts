export interface NavLinkProps {
   to: string,
   LogoComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>,
   title: string,
   style?: React.CSSProperties & { [key: string]: string | number };
}