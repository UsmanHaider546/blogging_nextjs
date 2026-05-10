import { House, Info, Shield, Search } from 'lucide-react';

const MenuLinks = () => [
  { href: '/', label: 'Home', icon: <House className='w-full h-full' /> },
  { href: '/about-us', label: 'About us', icon: <Info className='w-full h-full' /> },
  { href: '/privacy-policy', label: 'Privacy Policy', icon: <Shield className='w-full h-full' /> },
  { href: '/search', label: 'Search', icon: <Search className='w-full h-full' /> }
];

export default MenuLinks;
