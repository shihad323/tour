import React from 'react';
import { Link } from 'react-router-dom';
import { resolveImageSrc } from '../utils/image';

interface Tour {
  _id: string;
  slug: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  costFrom: number;
  startDate: string;
  endDate: string;
  tourType: any;
}

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  // use central resolver; pass slug for fallback
  const imgSrc = (img?: string) => resolveImageSrc({ img, slug: tour.slug, title: tour.title, index: undefined });
  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <Link to={`/tour/${tour.slug}`} className="tour-card-link">
      <div className="tour-card">
        <div className="tour-image">
          {tour.images && tour.images.length > 0 ? (
            <img src={imgSrc(tour.images[0])} alt={tour.title} />
          ) : (
            <img src={imgSrc()} alt={tour.title} />
          )}
          <div className="tour-type-badge">{tour.tourType?.name || 'Tour'}</div>
        </div>

        <div className="tour-card-content">
          <h3 className="tour-title">{truncateText(tour.title, 30)}</h3>
          
          <p className="tour-location">
            <span>📍</span> {truncateText(tour.location, 25)}
          </p>

          <p className="tour-description">
            {truncateText(tour.description, 80)}
          </p>

          <div className="tour-dates">
            <small>
              {new Date(tour.startDate).toLocaleDateString()} -{' '}
              {new Date(tour.endDate).toLocaleDateString()}
            </small>
          </div>

          <div className="tour-card-footer">
            <div className="price-section">
              <span className="label">From</span>
              <span className="price">${tour.costFrom}</span>
            </div>
            <button className="btn-explore">Explore →</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
