"use client";

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useLocale } from 'next-intl';
import { FC, PropsWithChildren } from 'react';

const isExternalLink = (href?: string): boolean => /^https?:\/\//.test(href ?? '');
const isMailtoLink = (href?: string): boolean => /^mailto:/.test(href ?? '');
const isAnchorLink = (href?: string): boolean => /^#/.test(href ?? '');

interface LocalizedLinkProps extends NextLinkProps {
  className?: string;
}

const LocalizedLink: FC<PropsWithChildren<LocalizedLinkProps>> = ({ href, children, ...props }) => {
  const locale = useLocale();
  const isExternal = isExternalLink(href?.toString());
  const isMailto = isMailtoLink(href?.toString());
  const isAnchor = isAnchorLink(href?.toString());

  // Don't add locale prefix for external links, mailto links, or anchor links
  const localizedHref = href && !isExternal && !isMailto && !isAnchor ? `/${locale}${href}` : href;

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
};

export default LocalizedLink;
