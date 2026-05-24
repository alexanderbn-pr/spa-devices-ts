import './device-details.scss';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDeviceDetails } from '../../../../hooks/useDeviceDetails';
import { useDeviceOptions } from '../../../../hooks/useDeviceOptions';
import { CURRENCY, WEIGHT, UNKNOWN } from '../../../../constants';
import { useCart } from '../../../../hooks/useCart';
import { DeviceListSkeleton } from '../../../../components/deviceList/DeviceListSkeleton';

const DeviceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const {
    deviceDetails,
    isLoadingDeviceDetails,
    isErrorDeviceDetails,
    getDeviceDetails,
  } = useDeviceDetails(id);

  const {
    storages,
    storageSelected,
    setStorageSelected,
    colors,
    colorSelected,
    setColorSelected,
  } = useDeviceOptions(deviceDetails);

  const { addToCart, isLoadingAddingCart } = useCart();

  const handleAddDeviceCart = (
    deviceId: string,
    color: string,
    storage: string,
  ) => {
    addToCart({
      id: deviceId,
      colorCode: color,
      storageCode: storage,
    });
  };

  const formatDetail = (value: string | undefined | null, suffix = '') =>
    value ? `${value}${suffix}` : UNKNOWN;

  if (isLoadingDeviceDetails) return <DeviceListSkeleton count={1} />;
  if (isErrorDeviceDetails)
    return (
      <section className="error-state">
        <p className="error-message">{t('error.loadingDetails')}</p>
        <button className="primary" onClick={() => getDeviceDetails()}>
          {t('error.reload')}
        </button>
      </section>
    );

  return (
    <main className="details-view">
      <section
        className="details-view-image"
        aria-label={t('common.productImage')}
      >
        <div className="image-container">
          <img
            src={deviceDetails!.imgUrl}
            alt={`${deviceDetails!.brand} ${deviceDetails!.model}`}
          />
        </div>
        <div className="image-price">
          <span className="price-amount">
            {formatDetail(deviceDetails!.price)}
          </span>
          <span className="price-currency">{CURRENCY}</span>
        </div>
      </section>

      <section className="details-view-side">
        <div className="details-view-side-header">
          <span className="product-brand">
            {deviceDetails!.brand || UNKNOWN}
          </span>
          <h1 className="product-model">
            {deviceDetails!.model || UNKNOWN}
          </h1>
        </div>

        <div
          className="details-view-side-specs"
          aria-label={t('common.technicalSpecs')}
        >
          <div className="spec-row">
            <span className="spec-label">
              {t('deviceDetails.processor')}
            </span>
            <span className="spec-value">
              {formatDetail(deviceDetails!.cpu)}
            </span>
          </div>
          <div className="spec-row">
            <span className="spec-label">{t('deviceDetails.ram')}</span>
            <span className="spec-value">
              {formatDetail(deviceDetails!.ram)}
            </span>
          </div>
          <div className="spec-row">
            <span className="spec-label">
              {t('deviceDetails.storage')}
            </span>
            <span className="spec-value">
              {formatDetail(deviceDetails!.internalMemory?.[0])}
            </span>
          </div>
          <div className="spec-row">
            <span className="spec-label">{t('deviceDetails.os')}</span>
            <span className="spec-value">
              {formatDetail(deviceDetails!.os)}
            </span>
          </div>
          <div className="spec-row">
            <span className="spec-label">
              {t('deviceDetails.display')}
            </span>
            <span className="spec-value">
              {formatDetail(deviceDetails!.displayResolution)}
            </span>
          </div>
          <div className="spec-row">
            <span className="spec-label">
              {t('deviceDetails.battery')}
            </span>
            <span className="spec-value">
              {formatDetail(deviceDetails!.battery)}
            </span>
          </div>
          <div className="spec-row">
            <span className="spec-label">
              {t('deviceDetails.camera')}
            </span>
            <span className="spec-value">
              {formatDetail(deviceDetails!.primaryCamera?.[0])}
            </span>
          </div>
          <div className="spec-row">
            <span className="spec-label">
              {t('deviceDetails.dimensions')}
            </span>
            <span className="spec-value">
              {formatDetail(deviceDetails!.dimentions)}
            </span>
          </div>
          <div className="spec-row">
            <span className="spec-label">
              {t('deviceDetails.weight')}
            </span>
            <span className="spec-value">
              {formatDetail(deviceDetails!.weight, WEIGHT)}
            </span>
          </div>
        </div>

        <div className="details-view-side-color">
          <span className="color-label">
            {t('deviceDetails.selectColor')}
          </span>
          <div
            className="color-options"
            role="radiogroup"
            aria-label={t('deviceDetails.selectColor')}
          >
            {colors.map((color) => (
              <button
                key={color.value}
                className={`color-swatch ${colorSelected === color.value ? 'selected' : ''}`}
                style={{ backgroundColor: color.value.toLowerCase() }}
                onClick={() => setColorSelected(color.value)}
                aria-label={`Color ${color.label}`}
                aria-pressed={colorSelected === color.value}
                title={color.label}
              />
            ))}
          </div>
        </div>

        <div className="details-view-side-storage">
          <span className="storage-label">
            {t('deviceDetails.selectStorage')}
          </span>
          <div
            className="storage-options"
            role="radiogroup"
            aria-label={t('deviceDetails.selectStorage')}
          >
            {storages.map((storage) => (
              <button
                key={storage.value}
                className={`storage-btn ${storageSelected === storage.value ? 'selected' : ''}`}
                onClick={() => setStorageSelected(storage.value)}
                aria-label={`${storage.label}`}
                aria-pressed={storageSelected === storage.value}
              >
                {storage.label}
              </button>
            ))}
          </div>
        </div>

        <div className="details-view-side-actions">
          <div className="stock-status">
            <span className="stock-dot" aria-hidden="true"></span>
            <span>{t('deviceDetails.inStock')}</span>
          </div>

          <button
            className="add-to-cart-btn"
            disabled={
              !storageSelected || !colorSelected || isLoadingAddingCart
            }
            onClick={() =>
              handleAddDeviceCart(id!, colorSelected, storageSelected)
            }
            aria-label={
              isLoadingAddingCart ? t('cart.adding') : t('cart.add')
            }
          >
            {isLoadingAddingCart ? (
              t('cart.adding')
            ) : (
              <>
                <span className="btn-icon" aria-hidden="true">
                  🛒
                </span>
                <span>{t('cart.add')}</span>
              </>
            )}
          </button>

          <div className="delivery-info">
            <div className="delivery-option">
              <span className="delivery-icon" aria-hidden="true">
                📦
              </span>
              <span>{t('deviceDetails.freeShipping')}</span>
            </div>
            <div className="delivery-option">
              <span className="delivery-icon" aria-hidden="true">
                🏪
              </span>
              <span>{t('deviceDetails.freePickup')}</span>
            </div>
          </div>

          <nav
            className="breadcrumb"
            aria-label={t('deviceDetails.backToDevices')}
          >
            <Link to="/device">
              {t('deviceDetails.backToDevices')}
            </Link>
          </nav>
        </div>
      </section>
    </main>
  );
};

export default DeviceDetailsPage;
