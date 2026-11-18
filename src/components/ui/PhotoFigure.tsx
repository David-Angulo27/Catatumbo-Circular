import type { Photo } from '../../data/photos';

interface PhotoFigureProps {
  photo: Photo;
  /** Clases del contenedor de la imagen (proporción, alto, bordes). */
  frameClassName?: string;
  className?: string;
  /** Ajuste de la imagen dentro del marco. */
  fit?: 'cover' | 'contain';
  caption?: string | false;
  dark?: boolean;
}

/** Fotografía con carga diferida, proporción fija y pie de foto opcional. */
export default function PhotoFigure({
  photo,
  frameClassName = 'aspect-[4/3]',
  className = '',
  fit = 'cover',
  caption,
  dark = false,
}: PhotoFigureProps) {
  const text = caption === false ? undefined : (caption ?? photo.caption);
  return (
    <figure className={`group ${className}`}>
      <div className={`overflow-hidden rounded-2xl ${fit === 'contain' ? 'bg-white' : 'bg-forest-900/10'} ${frameClassName}`}>
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
          className={`h-full w-full transition duration-700 group-hover:scale-105 ${fit === 'contain' ? 'object-contain p-3' : 'object-cover'}`}
        />
      </div>
      {text && (
        <figcaption className={`mt-2 text-xs leading-relaxed ${dark ? 'text-forest-100/70' : 'text-ink-500'}`}>{text}</figcaption>
      )}
    </figure>
  );
}
