import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Device } from '../../types/device.types';

type DeviceProps = {
  device: Device;
}

const Device = ({ device }: DeviceProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <article
      className="device-card"
      onClick={() => navigate(`/deviceDetails/${device.id}`)}
      role="button"
      tabIndex={0}
      aria-label={`${t('device.viewDetails')} ${device.brand} ${device.model}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/deviceDetails/${device.id}`);
        }
      }}
    >
      <div className="device-card-image-container">
        <img
          className="device-card-image"
          alt={`${device.brand} ${device.model}`}
          src={device.imgUrl}
          loading="lazy"
          width={80}
          height={80}
        />
      </div>

      <div className="device-card-content">
        <span className="device-card-brand">{device.brand}</span>

        <h3 className="device-card-model">{device.model}</h3>

        <div className="device-card-specs">
          {device.ram && <span className="spec-tag">{device.ram}</span>}
          {device.internalMemory?.[0] && (
            <span className="spec-tag">{device.internalMemory[0]}</span>
          )}
          {device.os && <span className="spec-tag">{device.os}</span>}
        </div>

        <div className="device-card-price">
          <span className="price-amount">{device.price || '—'}</span>
          <span className="price-currency">€</span>
        </div>
      </div>

      <div className="device-card-cta">
        <span className="cta-text">{t('device.viewDetails')}</span>
        <span className="cta-arrow" aria-hidden="true">›</span>
      </div>
    </article>
  );
};

export default memo(Device);
