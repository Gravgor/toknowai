import React from 'react'
import Link from 'next/link'
import { LinkedInLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons'
const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        {/* Logo */}
        <div className="mb-6 md:mb-0">
          <Link href="/" className="text-2xl font-bold">
            ToKnowAI
          </Link>
        </div>

        {/* Help Center */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Centrum pomocy</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/regulamin" className="hover:text-gray-300 transition-colors">
                Regulamin
              </Link>
            </li>
            <li>
              <Link href="/polityka-prywatnosci" className="hover:text-gray-300 transition-colors">
                Polityka prywatności
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Znajdź nas na</h3>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" className="hover:text-gray-300 transition-colors">
               <LinkedInLogoIcon className="h-6 w-6" />
            </Link>
            <Link href="https://tiktok.com" className="hover:text-gray-300 transition-colors">
              <InstagramLogoIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto mt-8 pt-4 border-t border-gray-800 text-center text-sm text-gray-500">
        ©2024 ToKnowAI
      </div>
    </footer>
  )
}

export default Footer