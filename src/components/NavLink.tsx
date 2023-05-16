import Link from 'next/link';

interface NavLinkProps {
  href: string;
  text: string;
}

export default function NavLink({ href, text }: NavLinkProps ) {

  return (
    <Link href={href}>
      {text}
    </Link>
  )
}