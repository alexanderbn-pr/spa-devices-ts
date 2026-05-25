/**
 * Card - Generic compound Card component
 * Provides consistent card layout with image, body, title, and description
 *
 * @example
 * <Card>
 *   <Card.Image src={url} alt={alt} />
 *   <Card.Body>
 *     <Card.Title>Title</Card.Title>
 *     <Card.Description>Description</Card.Description>
 *   </Card.Body>
 * </Card>
 */

import type { ReactNode, ReactElement } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function Card({ children, className = '', onClick }: CardProps) {
  return (
    <article
      className={`card ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </article>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

function CardImage({ src, alt, width, height, loading = 'lazy' }: CardImageProps) {
  return (
    <figure className="card__image">
      <img src={src} alt={alt} width={width} height={height} loading={loading} />
    </figure>
  );
}

interface CardBodyProps {
  children: ReactNode;
}

function CardBody({ children }: CardBodyProps) {
  return <div className="card__body">{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
}

function CardTitle({ children }: CardTitleProps) {
  return <h3 className="card__title">{children}</h3>;
}

interface CardDescriptionProps {
  children: ReactNode;
}

function CardDescription({ children }: CardDescriptionProps) {
  return <p className="card__description">{children}</p>;
}

interface CardFooterProps {
  children: ReactNode;
}

function CardFooter({ children }: CardFooterProps) {
  return <footer className="card__footer">{children}</footer>;
}

Card.Image = CardImage;
Card.Body = CardBody;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Footer = CardFooter;

export default Card;

export type {
  CardProps,
  CardImageProps,
  CardBodyProps,
  CardTitleProps,
  CardDescriptionProps,
  CardFooterProps,
};
