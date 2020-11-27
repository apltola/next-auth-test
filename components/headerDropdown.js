import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

export default function HeaderDropdown({ title, links }) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const linkIsSelected = (href) => {
    return href === router.pathname;
  };

  const renderLinks = () => {
    return links.map((link) => {
      if (link.type === 'label') {
        return <div className="text-left p-4 cursor-default">{link.text}</div>;
      }

      if (link.type === 'button') {
        return (
          <button
            onClick={link.onClick}
            className="text-left p-4 hover:bg-gray-100 active:bg-gray-200 rounded-lg"
          >
            <FontAwesomeIcon icon={link.iconName} className="mr-4" />
            {link.text}
          </button>
        );
      }

      if (link.type === 'link') {
        const isSelected = linkIsSelected(link.href);
        return (
          <Link href={link.href}>
            <button
              onClick={() => setShow(false)}
              className={`text-left p-4 hover:bg-gray-100 active:bg-gray-200 rounded-lg ${
                isSelected ? 'text-ultramarine-2' : 'text-inherit'
              }`}
            >
              <a>
                <FontAwesomeIcon icon={link.iconName} className="mr-4" />
                {link.text}
              </a>
            </button>
          </Link>
        );
      }
    });
  };

  return (
    <div
      className="relative text-white cursor-pointer ml-8"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div>
        {title} <FontAwesomeIcon icon="caret-down" className="ml-2" />
      </div>
      <div className="relative">
        {show && (
          <div className="absolute z-10 top-0 right-0 -ml-4 transform px-0 w-screen max-w-xs sm:px-0 sm:ml-0">
            <div className="flex flex-col p-2 mt-3 bg-white text-gray-900 shadow-md rounded-lg">
              {renderLinks()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
