'use client';

import { IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';
import { ConfigProvider, Tabs, theme } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { MenuButton } from './components/menuButton';
import { companyInfo } from './constants';
import { menuItems, useMenuContext } from './contexts/menuProvider';
import { useWindowParam } from './hooks/useWindowParam';
import { t } from './i18n';
import { getPhoneNumber } from './utils';

const { defaultAlgorithm, darkAlgorithm } = theme;

export default function Page() {
  const { colorScheme, width } = useWindowParam();
  const { onMenuChange, isMenuOpen, activeTab, content, title } = useMenuContext();

  const isDark = useMemo(() => colorScheme === 'dark', [colorScheme]);
  const isMobile = useMemo(() => width < 640, [width]);
  const isTinyMobile = useMemo(() => width < 320, [width]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
        components: {
          Card: {
            headerFontSize: 20,
            headerHeight: 80,
          },
          Form: {
            labelFontSize: 16,
          },
        },
      }}
    >
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <header className="bg-white dark:bg-[#001529] shadow-sm fixed top-0 left-0 right-0 z-10">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Image
              className="self-start z-10 cursor-pointer"
              src="/Logo.png"
              alt="CMD Logo"
              width={!isMobile ? 112 : 100}
              height={!isMobile ? 112 : 100}
              priority
              onClick={() => onMenuChange()}
            />
            <div className={twMerge('flex z-10', isMobile ? 'self-start w-full justify-end' : '')}>
              <div
                className={twMerge(
                  isMobile ? 'transition transform' : 'visible max-h-28 flex items-center',
                  isMenuOpen || !isMobile ? 'opacity-100 scale-y-100 h-40' : 'opacity-0 scale-y-0 h-0',
                  isTinyMobile ? (isMenuOpen ? 'h-[280px]' : 'h-36') : '',
                )}
              >
                <Tabs
                  style={{
                    width: isMobile ? width - 210 : 'auto',
                    marginLeft: isTinyMobile ? 80 - width : 0,
                    marginTop: isTinyMobile ? 120 : 0,
                  }}
                  activeKey={activeTab}
                  items={menuItems}
                  onChange={onMenuChange}
                  size="large"
                  tabPosition={isMobile ? 'right' : 'top'}
                />
              </div>

              {isMobile && <MenuButton />}
            </div>
            {isMobile && (
              <div
                className={twMerge(
                  'absolute text-center w-full self-end',
                  isTinyMobile ? 'top-32 left-0' : 'top-7 pl-28 pr-20',
                  !isMenuOpen ? 'transition-all delay-300 opacity-100' : 'opacity-0',
                )}
              >
                <h1 className="text-2xl font-bold text-center mb-8">{title}</h1>
              </div>
            )}
          </nav>
        </header>
        <div
          className={twMerge(
            'flex flex-col min-h-screen transition transform',
            isMenuOpen && isMobile ? 'pt-40' : isTinyMobile ? 'pt-36' : 'pt-28',
            isMenuOpen && isTinyMobile ? 'pt-[280px]' : '',
          )}
        >
          <main className="flex-grow">{content}</main>
          <footer className="bg-[#aaa27d] text-white py-8">
            <div className="container px-4 justify-self-center">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold mb-2">{companyInfo.companyName}</h3>
                  <p className="text-sm">{t('footer')}</p>
                </div>
                <div className="flex flex-col gap-2 items-center md:items-end">
                  <div className="flex items-center">
                    <IconMapPin className="mr-2" size={18} />
                    <span className="cursor-pointer whitespace-nowrap" onClick={() => onMenuChange('About')}>
                      {companyInfo.address}
                    </span>
                  </div>
                  <div className="flex items-center whitespace-nowrap">
                    <IconPhone className="mr-2" size={18} />
                    <Link href={`tel:${getPhoneNumber(companyInfo.phone)}`}>{companyInfo.phone}</Link>
                  </div>
                  <div className="flex items-center whitespace-nowrap">
                    <IconMail className="mr-2" size={18} />
                    <Link href={`mailto:${companyInfo.email}`}>{companyInfo.email}</Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ConfigProvider>
  );
}
