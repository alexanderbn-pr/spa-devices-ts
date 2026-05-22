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
function Card({ children, className = '', onClick }) {
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

function CardImage({ src, alt, width, height, loading = 'lazy' }) {
  return (
    <figure className="card__image">
      <img src={src} alt={alt} width={width} height={height} loading={loading} />
    </figure>
  );
}

function CardBody({ children }) {
  return <div className="card__body">{children}</div>;
}

function CardTitle({ children }) {
  return <h3 className="card__title">{children}</h3>;
}

function CardDescription({ children }) {
  return <p className="card__description">{children}</p>;
}

function CardFooter({ children }) {
  return <footer className="card__footer">{children}</footer>;
}

Card.Image = CardImage;
Card.Body = CardBody;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Footer = CardFooter;

export default Card;